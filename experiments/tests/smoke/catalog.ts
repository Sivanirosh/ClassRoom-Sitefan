import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createServer } from 'vite';

type CatalogRecord = {
  definition: {
    id: string;
    title: string;
    curriculum: { years: string[] };
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

  const targets = records
    .filter(
      (record) => record.hasPrototype && record.definition.curriculum.years.includes('6H')
    )
    .map((record): SmokeTarget => {
      const allocation = allocations.get(record.definition.id);
      if (!allocation) {
        throw new Error(
          `${record.definition.id} is a 6H prototype but has no allocation in ${plan.programId}.`
        );
      }
      return {
        id: record.definition.id,
        title: record.definition.title,
        programId: plan.programId,
        ...allocation
      };
    });

  return { programId: plan.programId, legacyId: legacy.definition.id, targets };
}

export function selectSmokeTargets(
  targets: SmokeTarget[],
  selection = process.env.SMOKE_EXERCISES
): SmokeTarget[] {
  if (selection === undefined) return targets;

  const ids = selection.split(',').map((id) => id.trim());
  if (ids.length !== 3 || new Set(ids).size !== 3 || ids.some((id) => id.length === 0)) {
    throw new Error('SMOKE_EXERCISES must contain exactly three distinct comma-separated IDs.');
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
  if (clusters.size !== 1 || lenses.size !== 3) {
    throw new Error(
      'SMOKE_EXERCISES must be the three distinct lens IDs allocated to one 6H cluster.'
    );
  }

  return selected;
}
