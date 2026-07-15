import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createServer } from 'vite';

type CatalogRecord = {
  definition: {
    id: string;
    title: string;
    curriculum: { years: string[] };
    classification: { disciplines: string[] };
    tags: string[];
  };
  hasPrototype: boolean;
};

type ProductionPlan = {
  programId: string;
  domains: Array<{
    key: string;
    clusters: Array<{
      id: string;
      exercises: Record<string, string>;
    }>;
  }>;
};

export type SmokeTarget = {
  id: string;
  title: string;
  programId: string;
  domain: string;
  cluster: string;
  lens: string;
};

export type SmokeManifest = {
  programId: string;
  legacyId: string;
  targets: SmokeTarget[];
};

const labRoot = fileURLToPath(new URL('../../', import.meta.url));

export async function discoverSmokeManifest(): Promise<SmokeManifest> {
  const server = await createServer({
    root: labRoot,
    configFile: false,
    appType: 'custom',
    logLevel: 'error',
    plugins: [svelte()],
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, hmr: false }
  });

  let records: CatalogRecord[];
  try {
    const module = await server.ssrLoadModule('/src/lib/catalog/discovery.ts');
    if (!Array.isArray(module.exerciseCatalog)) {
      throw new Error('The catalog did not expose an exercise list.');
    }
    records = module.exerciseCatalog as CatalogRecord[];
  } finally {
    await server.close();
  }

  let plan: ProductionPlan;
  try {
    plan = JSON.parse(
      await readFile(new URL('../../design/6h-production-plan.json', import.meta.url), 'utf8')
    ) as ProductionPlan;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    plan = { programId: 'no-active-6h-program', domains: [] };
  }
  const allocations = new Map<string, Omit<SmokeTarget, 'id' | 'title' | 'programId'>>();

  for (const domain of plan.domains) {
    for (const cluster of domain.clusters) {
      for (const [lens, id] of Object.entries(cluster.exercises)) {
        allocations.set(id, { domain: domain.key, cluster: cluster.id, lens });
      }
    }
  }

  const legacy = records.find((record) => record.definition.id === 'EX-0001');
  if (!legacy?.hasPrototype) {
    throw new Error('Legacy compatibility target EX-0001 is missing its prototype.');
  }

  const sixHPrototypes = records.filter(
    (record) => record.hasPrototype && record.definition.curriculum.years.includes('6H')
  );
  const unallocated = sixHPrototypes.filter((record) => !allocations.has(record.definition.id));

  if (plan.domains.length > 0 && unallocated.length > 0) {
    throw new Error(
      `${unallocated.map((record) => record.definition.id).join(', ')} are 6H prototypes without allocations in ${plan.programId}.`
    );
  }

  const allocatedTargets = sixHPrototypes
    .filter((record) => allocations.has(record.definition.id))
    .map((record): SmokeTarget => ({
      id: record.definition.id,
      title: record.definition.title,
      programId: plan.programId,
      ...allocations.get(record.definition.id)!
    }));

  // When no batch plan is active, explicitly tagged owner-led pilots still belong in the
  // generic keyboard and touch suite. Their tags provide the same routing information that
  // an allocation would normally provide without reviving the withdrawn bulk plan.
  const pilotTargets = plan.domains.length === 0
    ? unallocated.map((record): SmokeTarget => {
        const programId = record.definition.tags.find((tag) => tag.startsWith('pilot-'));
        const cluster = record.definition.tags.find((tag) => tag.startsWith('sequence-'));
        const lens = record.definition.tags.find((tag) => tag.startsWith('lens-'));
        const domain = record.definition.classification.disciplines[0];
        if (!programId || !cluster || !lens || !domain) {
          throw new Error(
            `${record.definition.id} is an unallocated 6H prototype without complete pilot, sequence, lens, and discipline metadata.`
          );
        }
        return {
          id: record.definition.id,
          title: record.definition.title,
          programId,
          domain,
          cluster: cluster.slice('sequence-'.length),
          lens: lens.slice('lens-'.length)
        };
      })
    : [];
  const targets = [...allocatedTargets, ...pilotTargets];
  const pilotPrograms = new Set(pilotTargets.map((target) => target.programId));
  const manifestProgramId =
    plan.domains.length === 0 && pilotPrograms.size === 1
      ? pilotTargets[0].programId
      : plan.programId;

  return { programId: manifestProgramId, legacyId: legacy.definition.id, targets };
}

export function selectSmokeTargets(
  targets: SmokeTarget[],
  selection = process.env.SMOKE_EXERCISES
): SmokeTarget[] {
  if (selection === undefined) return targets;

  const ids = selection.split(',').map((id) => id.trim());
  if (
    ![2, 3].includes(ids.length) ||
    new Set(ids).size !== ids.length ||
    ids.some((id) => id.length === 0)
  ) {
    throw new Error(
      'SMOKE_EXERCISES must contain exactly three distinct IDs, or two distinct IDs from one pilot pair.'
    );
  }

  const byId = new Map(targets.map((target) => [target.id, target]));
  const unknown = ids.filter((id) => !byId.has(id));
  if (unknown.length > 0) {
    throw new Error(
      `SMOKE_EXERCISES contains IDs that are not discovered 6H prototypes: ${unknown.join(', ')}.`
    );
  }

  const selected = ids.map((id) => byId.get(id)!);
  const clusters = new Set(selected.map((target) => `${target.domain}/${target.cluster}`));
  const lenses = new Set(selected.map((target) => target.lens));
  const programs = new Set(selected.map((target) => target.programId));
  const isPilotPair =
    selected.length === 2 &&
    programs.size === 1 &&
    selected.every((target) => target.programId.startsWith('pilot-'));
  if (clusters.size !== 1 || lenses.size !== selected.length || (selected.length === 2 && !isPilotPair)) {
    throw new Error(
      'SMOKE_EXERCISES must be three allocated lenses from one 6H cluster or two lenses from one pilot pair.'
    );
  }

  return selected;
}
