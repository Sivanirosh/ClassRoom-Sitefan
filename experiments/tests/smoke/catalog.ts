import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createServer } from 'vite';

type CatalogRecord = {
  definition: {
    id: string;
    title: string;
    classification: { disciplines: string[] };
    tags: string[];
  };
  hasPrototype: boolean;
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

function valueAfterPrefix(tags: string[], prefix: string): string | undefined {
  return tags.find((tag) => tag.startsWith(prefix))?.slice(prefix.length);
}

function targetFromRecord(record: CatalogRecord): SmokeTarget {
  const programTag = record.definition.tags.find(
    (tag) => tag.startsWith('program-') || tag.startsWith('pilot-')
  );
  const sequence = valueAfterPrefix(record.definition.tags, 'sequence-');
  const lens = valueAfterPrefix(record.definition.tags, 'lens-') ?? 'prototype';
  const domain = record.definition.classification.disciplines[0];

  if (!programTag || !sequence || !domain) {
    throw new Error(
      `${record.definition.id} has a prototype but lacks a program/pilot tag, sequence tag, or discipline required for smoke discovery.`
    );
  }

  return {
    id: record.definition.id,
    title: record.definition.title,
    programId: programTag,
    domain,
    cluster: sequence,
    lens
  };
}

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

  const legacy = records.find((record) => record.definition.id === 'EX-0001');
  if (!legacy?.hasPrototype) {
    throw new Error('Legacy compatibility target EX-0001 is missing its prototype.');
  }

  const targets = records
    .filter((record) => record.hasPrototype && record.definition.id !== legacy.definition.id)
    .map(targetFromRecord);
  const programs = new Set(targets.map((target) => target.programId));
  const programId =
    targets.length === 0
      ? 'no-smoke-targets'
      : programs.size === 1
        ? targets[0].programId
        : 'multiple-smoke-programs';

  return { programId, legacyId: legacy.definition.id, targets };
}

export function selectSmokeTargets(
  targets: SmokeTarget[],
  selection = process.env.SMOKE_EXERCISES
): SmokeTarget[] {
  if (selection === undefined) return targets;

  const ids = selection.split(',').map((id) => id.trim());
  if (ids.length === 0 || new Set(ids).size !== ids.length || ids.some((id) => id.length === 0)) {
    throw new Error('SMOKE_EXERCISES must contain one or more distinct discovered exercise IDs.');
  }

  const byId = new Map(targets.map((target) => [target.id, target]));
  const unknown = ids.filter((id) => !byId.has(id));
  if (unknown.length > 0) {
    throw new Error(
      `SMOKE_EXERCISES contains IDs that are not discovered prototypes: ${unknown.join(', ')}.`
    );
  }

  return ids.map((id) => byId.get(id)!);
}
