import {
  DEVICE_TARGETS,
  EXERCISE_STATUSES,
  HARMOS_YEARS,
  INPUT_METHODS,
  type ExerciseDefinition
} from './schema';

type ValidationResult = {
  definition?: ExerciseDefinition;
  errors: string[];
};

const idPattern = /^EX-\d{4}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateStringList(
  value: unknown,
  path: string,
  errors: string[],
  options: { allowed?: readonly string[]; slugged?: boolean } = {}
): value is string[] {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${path} must be a non-empty array.`);
    return false;
  }

  let valid = true;
  for (const item of value) {
    if (!isNonEmptyString(item)) {
      errors.push(`${path} may contain only non-empty strings.`);
      valid = false;
      continue;
    }
    if (options.allowed && !options.allowed.includes(item)) {
      errors.push(`${path} contains unsupported value "${item}".`);
      valid = false;
    }
    if (options.slugged && !slugPattern.test(item)) {
      errors.push(`${path} value "${item}" must be a lowercase slug.`);
      valid = false;
    }
  }

  if (new Set(value).size !== value.length) {
    errors.push(`${path} may not contain duplicates.`);
    valid = false;
  }

  return valid;
}

function validateDate(value: unknown, path: string, errors: string[]): value is string {
  if (!isNonEmptyString(value) || !datePattern.test(value) || Number.isNaN(Date.parse(value))) {
    errors.push(`${path} must use a valid YYYY-MM-DD date.`);
    return false;
  }
  return true;
}

export function validateExerciseDefinition(value: unknown, folder: string): ValidationResult {
  const errors: string[] = [];

  if (!isObject(value)) {
    return { errors: [`${folder}/exercise.ts must default-export an object.`] };
  }

  if (value.schemaVersion !== 1) errors.push('schemaVersion must be 1.');

  if (!isNonEmptyString(value.id) || !idPattern.test(value.id)) {
    errors.push('id must follow EX-0001 format.');
  }
  if (!isNonEmptyString(value.slug) || !slugPattern.test(value.slug)) {
    errors.push('slug must contain lowercase words separated by hyphens.');
  }
  if (isNonEmptyString(value.id) && isNonEmptyString(value.slug)) {
    const expectedFolder = `${value.id.toLowerCase()}-${value.slug}`;
    if (folder !== expectedFolder) errors.push(`folder must be named ${expectedFolder}.`);
  }

  if (!isNonEmptyString(value.title)) errors.push('title must be a non-empty string.');
  if (!isNonEmptyString(value.summary)) errors.push('summary must be a non-empty string.');
  if (!isNonEmptyString(value.status) || !EXERCISE_STATUSES.includes(value.status as never)) {
    errors.push(`status must be one of: ${EXERCISE_STATUSES.join(', ')}.`);
  }

  if (!isObject(value.curriculum)) {
    errors.push('curriculum must be defined.');
  } else {
    if (value.curriculum.framework !== 'PER') errors.push('curriculum.framework must be PER.');
    if (value.curriculum.cycle !== 2) errors.push('curriculum.cycle must be 2.');
    validateStringList(value.curriculum.years, 'curriculum.years', errors, { allowed: HARMOS_YEARS });
    validateStringList(value.curriculum.objectiveCodes, 'curriculum.objectiveCodes', errors);
    validateStringList(value.curriculum.sourceIds, 'curriculum.sourceIds', errors, { slugged: true });
  }

  if (!isObject(value.classification)) {
    errors.push('classification must be defined.');
  } else {
    validateStringList(value.classification.disciplines, 'classification.disciplines', errors, { slugged: true });
    validateStringList(value.classification.concepts, 'classification.concepts', errors, { slugged: true });
  }

  if (!isObject(value.learning)) {
    errors.push('learning must be defined.');
  } else {
    if (!isNonEmptyString(value.learning.objective)) errors.push('learning.objective must be defined.');
    validateStringList(value.learning.prerequisites, 'learning.prerequisites', errors);
    validateStringList(value.learning.misconceptions, 'learning.misconceptions', errors);
    validateStringList(value.learning.evidence, 'learning.evidence', errors);
  }

  if (!isObject(value.gameplay)) {
    errors.push('gameplay must be defined.');
  } else {
    if (!isNonEmptyString(value.gameplay.coreMechanic)) errors.push('gameplay.coreMechanic must be defined.');
    validateStringList(value.gameplay.interactionModes, 'gameplay.interactionModes', errors, { slugged: true });
    if (!Number.isInteger(value.gameplay.estimatedMinutes) || Number(value.gameplay.estimatedMinutes) <= 0) {
      errors.push('gameplay.estimatedMinutes must be a positive integer.');
    }
  }

  if (!isObject(value.delivery)) {
    errors.push('delivery must be defined.');
  } else {
    validateStringList(value.delivery.devices, 'delivery.devices', errors, { allowed: DEVICE_TARGETS });
    validateStringList(value.delivery.inputMethods, 'delivery.inputMethods', errors, { allowed: INPUT_METHODS });
  }

  validateStringList(value.tags, 'tags', errors, { slugged: true });

  if (!isObject(value.dates)) {
    errors.push('dates must be defined.');
  } else {
    const created = value.dates.created;
    const updated = value.dates.updated;
    const createdIsValid = validateDate(created, 'dates.created', errors);
    const updatedIsValid = validateDate(updated, 'dates.updated', errors);
    if (createdIsValid && updatedIsValid && updated < created) {
      errors.push('dates.updated may not precede dates.created.');
    }
  }

  return errors.length > 0 ? { errors } : { definition: value as ExerciseDefinition, errors };
}
