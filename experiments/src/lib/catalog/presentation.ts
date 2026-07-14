import type { ExerciseStatus, HarmosYear } from './schema';

export const statusLabels: Record<ExerciseStatus, string> = {
  planned: 'Sur papier',
  prototyping: 'En prototype',
  testing: 'À tester',
  validated: 'Validé',
  promoted: 'Intégré',
  archived: 'Archivé'
};

export const statusDescriptions: Record<ExerciseStatus, string> = {
  planned: 'La conception est documentée, sans prototype exécutable.',
  prototyping: 'L’interaction est en cours de construction.',
  testing: 'Le prototype est prêt à être observé avec des élèves.',
  validated: 'L’hypothèse pédagogique et l’interaction ont été vérifiées.',
  promoted: 'Le prototype a été intégré à l’application de classe.',
  archived: 'Cette piste est conservée comme référence, sans développement actif.'
};

export function formatYears(years: HarmosYear[]): string {
  return years.join(' · ');
}

export function formatTechnicalSlug(value: string): string {
  return value.replaceAll('-', ' ');
}
