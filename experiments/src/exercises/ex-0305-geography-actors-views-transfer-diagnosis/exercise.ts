import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0305',
  slug: 'geography-actors-views-transfer-diagnosis',
  title: 'La table des points de vue',
  summary:
    'Composer une table de concertation à partir de rôles et de paroles divergentes pour relier les acteurs à leurs représentations d’un même lieu.',
  status: 'prototyping',
  curriculum: {
    framework: 'PER',
    cycle: 2,
    years: ['6H'],
    objectiveCodes: ['SHS 21', 'SHS 23'],
    sourceIds: ['src-per-0002']
  },
  classification: {
    disciplines: ['geography'],
    concepts: ['spatial-actors', 'actor-roles', 'spatial-representations', 'divergent-interests']
  },
  learning: {
    objective:
      'Dans un dossier spatial inédit, associer deux acteurs à leurs rôles et à leurs représentations divergentes du même lieu, puis choisir une question qui maintient visibles les deux intérêts.',
    prerequisites: [
      'Distinguer une personne d’un groupe et reconnaître un service public, une association ou une activité économique.',
      'Prélever une action et un besoin dans une courte parole rapportée.',
      'Comprendre qu’un acteur est une personne ou un groupe qui utilise, organise ou transforme un lieu.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir les personnes qui décrivent le plus de détails sur le lieu, sans relier leurs paroles à un rôle.',
      'Hypothèse de conception : ne retenir qu’un intérêt et traiter l’autre parole comme un obstacle sans point de vue propre.',
      'Hypothèse de conception : croire qu’un même lieu doit avoir une seule description correcte, indépendante de ses usages.'
    ],
    evidence: [
      'Sélectionner deux acteurs dont les rôles portent directement les deux usages en tension dans le dossier.',
      'Relier chaque représentation à une action, un besoin ou une responsabilité explicite dans la parole de l’acteur.',
      'Réviser une proposition après un retour ciblé sans effacer l’intérêt divergent.',
      'Choisir une question de concertation qui conserve les deux contraintes au lieu de désigner immédiatement un gagnant.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Occuper deux sièges d’une table de concertation avec des acteurs aux usages divergents, puis poser une question qui relie leurs deux représentations du lieu.',
    interactionModes: ['case-file-reading', 'actor-pair-construction', 'mediation-question-selection'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-actors-views',
    'lens-transfer-diagnosis',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-a01',
    'statement-per-c2-geo-p56-a02',
    'statement-per-c2-geo-af-c2-02'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
