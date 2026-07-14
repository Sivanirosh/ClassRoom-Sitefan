import type { Component } from 'svelte';
import type { ExerciseDefinition } from './schema';
import { validateExerciseDefinition } from './validation';

type DefinitionModule = { default: unknown };
type PrototypeModule = { default: Component };

export type ExerciseRecord = {
  definition: ExerciseDefinition;
  folder: string;
  sourcePath: string;
  hasPrototype: boolean;
  loadDesign: () => Promise<string>;
  loadPrototype?: () => Promise<Component>;
};

class CatalogConfigurationError extends Error {
  constructor(errors: string[]) {
    super(`Invalid exercise catalog:\n${errors.map((error) => `- ${error}`).join('\n')}`);
    this.name = 'CatalogConfigurationError';
  }
}

const definitionModules = import.meta.glob<DefinitionModule>('../../exercises/*/exercise.ts', {
  eager: true
});
const designLoaders = import.meta.glob('../../exercises/*/DESIGN.md', {
  import: 'default',
  query: '?raw'
}) as Partial<Record<string, () => Promise<string>>>;
const prototypeLoaders = import.meta.glob<PrototypeModule>(
  '../../exercises/*/Prototype.svelte'
) as Partial<Record<string, () => Promise<PrototypeModule>>>;

function folderFromPath(path: string): string | undefined {
  return path.match(/\/exercises\/([^/]+)\//)?.[1];
}

function siblingPath(definitionPath: string, filename: string): string {
  return definitionPath.replace(/exercise\.ts$/, filename);
}

function discoverExercises(): ExerciseRecord[] {
  const records: ExerciseRecord[] = [];
  const errors: string[] = [];
  const definitionFolders = new Set<string>();
  const seenIds = new Set<string>();

  for (const [sourcePath, module] of Object.entries(definitionModules)) {
    const folder = folderFromPath(sourcePath);
    if (!folder) {
      errors.push(`Could not determine the exercise folder for ${sourcePath}.`);
      continue;
    }
    definitionFolders.add(folder);

    const result = validateExerciseDefinition(module.default, folder);
    errors.push(...result.errors.map((error) => `${folder}: ${error}`));
    if (!result.definition) continue;

    if (seenIds.has(result.definition.id)) {
      errors.push(`${folder}: duplicate id ${result.definition.id}.`);
      continue;
    }
    seenIds.add(result.definition.id);

    const designPath = siblingPath(sourcePath, 'DESIGN.md');
    const prototypePath = siblingPath(sourcePath, 'Prototype.svelte');
    const loadDesign = designLoaders[designPath];
    const prototypeModuleLoader = prototypeLoaders[prototypePath];

    if (!loadDesign) errors.push(`${folder}: DESIGN.md is required.`);

    const needsPrototype = ['prototyping', 'testing', 'validated', 'promoted'].includes(
      result.definition.status
    );
    if (needsPrototype && !prototypeModuleLoader) {
      errors.push(`${folder}: status "${result.definition.status}" requires Prototype.svelte.`);
    }
    if (result.definition.status === 'planned' && prototypeModuleLoader) {
      errors.push(`${folder}: change status before adding Prototype.svelte.`);
    }

    if (loadDesign) {
      records.push({
        definition: result.definition,
        folder,
        sourcePath,
        hasPrototype: Boolean(prototypeModuleLoader),
        loadDesign,
        loadPrototype: prototypeModuleLoader
          ? async () => (await prototypeModuleLoader()).default
          : undefined
      });
    }
  }

  for (const path of [...Object.keys(designLoaders), ...Object.keys(prototypeLoaders)]) {
    const folder = folderFromPath(path);
    if (folder && !definitionFolders.has(folder)) {
      errors.push(`${folder}: ${path.split('/').at(-1)} has no matching exercise.ts.`);
    }
  }

  if (errors.length > 0) throw new CatalogConfigurationError(errors);

  return records.sort((left, right) =>
    left.definition.id.localeCompare(right.definition.id, undefined, { numeric: true })
  );
}

export const exerciseCatalog = discoverExercises();

export function findExercise(id: string | null): ExerciseRecord | undefined {
  if (!id) return undefined;
  return exerciseCatalog.find((record) => record.definition.id === id);
}
