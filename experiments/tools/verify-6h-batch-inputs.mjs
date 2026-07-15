import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const batchPath = 'experiments/design/6h-batch-inputs.json';
const requireClean = process.argv.includes('--require-clean');
const failures = [];

function bytes(path) {
  return readFileSync(resolve(root, path));
}

function json(path) {
  return JSON.parse(bytes(path).toString('utf8'));
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function checkFileHash(entry, label = entry.path) {
  let actual;
  try {
    actual = sha256(bytes(entry.path));
  } catch (error) {
    failures.push(`${label}: cannot read ${entry.path}: ${error.message}`);
    return;
  }
  check(actual === entry.sha256, `${label}: SHA-256 ${actual} != ${entry.sha256}`);
}

const batch = json(batchPath);
check(batch.schemaVersion === 1, 'unsupported batch-input schemaVersion');

checkFileHash(batch.approvedDecision, 'approved decision');
for (const input of batch.inputs) checkFileHash(input, `input ${input.path}`);
checkFileHash(batch.workflowConfig, 'workflow config');
checkFileHash(batch.sliceGraph.manifest, 'slice manifest');

try {
  const blob = execFileSync('git', ['hash-object', batch.approvedDecision.path], {
    cwd: root,
    encoding: 'utf8'
  }).trim();
  check(blob === batch.approvedDecision.gitBlob, `approved decision Git blob ${blob} != ${batch.approvedDecision.gitBlob}`);
} catch (error) {
  failures.push(`cannot verify approved decision Git blob: ${error.message}`);
}

const manifest = json(batch.sliceGraph.manifest.path);
const expectedAlgorithm = 'sha256 of UTF-8 lines "<file-sha256>  <repo-relative-path>\\n" sorted by repo-relative path';
check(manifest.algorithm === expectedAlgorithm, 'slice manifest algorithm is not the documented canonical recipe');
check(manifest.selectedRoot === batch.sliceGraph.selectedRoot, 'slice manifest selected root differs from batch input');
check(manifest.sliceCount === batch.sliceGraph.newSliceCount, 'slice manifest count differs from batch input');

const sortedFiles = [...manifest.files].sort((left, right) => left.path.localeCompare(right.path));
check(JSON.stringify(sortedFiles) === JSON.stringify(manifest.files), 'slice manifest files are not sorted by path');
check(new Set(manifest.files.map((entry) => entry.path)).size === manifest.files.length, 'slice manifest contains duplicate paths');

for (const entry of manifest.files) {
  check(entry.path.startsWith('.workflow/slices/6h-') && entry.path.endsWith('.json'), `non-6H slice in manifest: ${entry.path}`);
  checkFileHash(entry, `slice ${entry.path}`);
}

const digestInput = Buffer.from(manifest.files.map((entry) => `${entry.sha256}  ${entry.path}\n`).join(''), 'utf8');
const graphDigest = sha256(digestInput);
check(graphDigest === manifest.digest, `computed graph digest ${graphDigest} != manifest ${manifest.digest}`);
check(graphDigest === batch.sliceGraph.sha256, `computed graph digest ${graphDigest} != batch ${batch.sliceGraph.sha256}`);

const slices = new Map();
for (const entry of manifest.files) {
  const slice = json(entry.path);
  check(slice.id && typeof slice.id === 'string', `${entry.path}: missing slice id`);
  check(!slices.has(slice.id), `${entry.path}: duplicate slice id ${slice.id}`);
  slices.set(slice.id, slice);
}

const reachable = new Set();
function visit(id, stack = []) {
  if (stack.includes(id)) {
    failures.push(`dependency cycle: ${[...stack, id].join(' -> ')}`);
    return;
  }
  if (reachable.has(id)) return;
  const slice = slices.get(id);
  if (!slice) {
    failures.push(`missing selected-graph dependency ${id} via ${stack.join(' -> ') || 'root'}`);
    return;
  }
  reachable.add(id);
  for (const dependency of slice.depends_on ?? []) visit(dependency, [...stack, id]);
}
visit(batch.sliceGraph.selectedRoot);
check(reachable.size === batch.sliceGraph.newSliceCount, `selected-root closure ${reachable.size} != ${batch.sliceGraph.newSliceCount}`);
check(reachable.size === slices.size, `manifest has ${slices.size - reachable.size} slice(s) outside selected-root closure`);
check(!reachable.has('foundation-sveltekit-fullstack'), 'selected 6H graph unexpectedly includes foundation-sveltekit-fullstack');

const workflow = json(batch.workflowConfig.path);
check(workflow.agent === batch.launchPolicy.agent, 'workflow agent differs from launch policy');
check(workflow.parallelism === batch.launchPolicy.parallelism, 'workflow parallelism differs from launch policy');

try {
  execFileSync('git', ['merge-base', '--is-ancestor', batch.baselineCommit, 'HEAD'], { cwd: root });
} catch {
  failures.push(`baseline ${batch.baselineCommit} is not an ancestor of HEAD`);
}

for (const prerequisite of batch.completedPrerequisites ?? []) {
  try {
    execFileSync('git', ['cat-file', '-e', `${prerequisite.commit}^{commit}`], { cwd: root });
    execFileSync('git', ['merge-base', '--is-ancestor', prerequisite.commit, 'HEAD'], { cwd: root });
  } catch {
    failures.push(`completed prerequisite ${prerequisite.sliceId} commit ${prerequisite.commit} is missing or not an ancestor of HEAD`);
  }
}

if (requireClean) {
  const status = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' });
  check(status.length === 0, `launch requires a clean tree; git status --porcelain:\n${status}`);
}

if (failures.length > 0) {
  console.error(`6H batch preflight failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`6H batch preflight passed: ${reachable.size} slices, graph ${graphDigest}, root ${batch.sliceGraph.selectedRoot}.`);
