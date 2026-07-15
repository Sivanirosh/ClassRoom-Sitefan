import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0302',
  slug: 'geography-needs-places-transfer-diagnosis',
  title: 'L’atelier des plans utiles',
  summary: 'Diagnostiquer puis réviser un plan inédit pour que les lieux proposés répondent aux besoins observés.',
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
    concepts: ['human-needs', 'place-functions', 'transfer-diagnosis']
  },
  learning: {
    objective: 'Réviser, dans trois contextes nouveaux, un plan de lieux en choisissant la modification dont la fonction répond au besoin attesté par les indices.',
    prerequisites: [
      'Relier une activité humaine à un besoin et à la fonction d’un lieu.',
      'Lire une mini-légende composée de symboles et de courtes phrases.',
      'Comprendre qu’un plan est une proposition que l’on peut tester et modifier.'
    ],
    misconceptions: [
      'Hypothèse de conception : conserver l’élément le plus séduisant sans tester sa fonction.',
      'Hypothèse de conception : choisir un nom familier sans utiliser les indices du contexte.',
      'Hypothèse de conception : répondre au besoin immédiat en oubliant la liaison nécessaire avec un autre lieu.'
    ],
    evidence: [
      'Sélectionner une révision de plan à partir de plusieurs indices concordants.',
      'Modifier sa décision après un retour qui distingue fonction annoncée et fonction réellement utile.',
      'Transférer la relation besoin–lieu–fonction à un refuge temporaire, un service mobile et un événement.'
    ]
  },
  gameplay: {
    coreMechanic: 'Auditer une proposition de plan et appliquer une modification fonctionnelle justifiée par les indices.',
    interactionModes: ['plan-audit', 'transfer', 'diagnostic-revision'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-needs-places',
    'lens-transfer-diagnosis',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-q01',
    'statement-per-c2-geo-p56-q02',
    'statement-per-c2-geo-p56-q03',
    'statement-per-c2-geo-p56-o01',
    'statement-per-c2-geo-af-c2-01',
    'statement-per-c2-geo-af-c2-04'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
