export const HARMOS_YEARS = ['6H', '7H', '8H'] as const;
export type HarmosYear = (typeof HARMOS_YEARS)[number];

export const EXERCISE_STATUSES = [
  'planned',
  'prototyping',
  'testing',
  'validated',
  'promoted',
  'archived'
] as const;
export type ExerciseStatus = (typeof EXERCISE_STATUSES)[number];

export const DEVICE_TARGETS = ['desktop', 'tablet', 'mobile'] as const;
export type DeviceTarget = (typeof DEVICE_TARGETS)[number];

export const INPUT_METHODS = ['pointer', 'touch', 'keyboard', 'audio', 'camera'] as const;
export type InputMethod = (typeof INPUT_METHODS)[number];

export type PerReference = {
  framework: 'PER';
  cycle: 2;
  years: HarmosYear[];
  objectiveCodes: string[];
  sourceIds: string[];
};

export type ExerciseDefinition = {
  schemaVersion: 1;
  id: `EX-${string}`;
  slug: string;
  title: string;
  summary: string;
  status: ExerciseStatus;
  curriculum: PerReference;
  classification: {
    disciplines: string[];
    concepts: string[];
  };
  learning: {
    objective: string;
    prerequisites: string[];
    misconceptions: string[];
    evidence: string[];
  };
  gameplay: {
    coreMechanic: string;
    interactionModes: string[];
    estimatedMinutes: number;
  };
  delivery: {
    devices: DeviceTarget[];
    inputMethods: InputMethod[];
  };
  tags: string[];
  dates: {
    created: string;
    updated: string;
  };
};

/** Preserves literal metadata while checking each exercise against the catalog contract. */
export function defineExercise<const Definition extends ExerciseDefinition>(
  definition: Definition
): Definition {
  return definition;
}
