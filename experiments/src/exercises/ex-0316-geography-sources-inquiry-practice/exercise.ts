import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0316',
  slug: 'geography-sources-inquiry-practice',
  title: 'La table de confrontation',
  summary: 'Comparer deux sources et qualifier ce qu’elles permettent ensemble d’affirmer sur un espace proche.',
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
    concepts: ['source-comparison', 'geographic-inquiry', 'evidence-quality']
  },
  learning: {
    objective: 'Qualifier, dans trois cas, la relation entre deux sources comme concordante, complémentaire ou contradictoire afin de formuler une réponse limitée aux indices disponibles.',
    prerequisites: [
      'Lire deux documents courts à propos d’un même espace proche.',
      'Repérer le lieu, le moment et l’information principale d’une source.',
      'Comprendre les mots « confirmer », « compléter » et « contredire ».'
    ],
    misconceptions: [
      'Hypothèse de conception : garder la première source et ignorer ce que la seconde change.',
      'Hypothèse de conception : croire que deux sources différentes doivent toujours être en désaccord.',
      'Hypothèse de conception : transformer un indice limité dans le temps en affirmation générale.'
    ],
    evidence: [
      'Comparer explicitement les informations communes et différentes des deux sources.',
      'Réviser une qualification après un retour qui nomme la relation entre les sources.',
      'Formuler une conclusion prudente lorsque les sources concordent, se complètent ou se contredisent.'
    ]
  },
  gameplay: {
    coreMechanic: 'Poser deux sources sur une balance documentaire puis régler le verdict qui décrit leur relation.',
    interactionModes: ['comparison', 'classification', 'varied-practice'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-sources-inquiry',
    'lens-practice',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-q01',
    'statement-per-c2-geo-p56-i01',
    'statement-per-c2-geo-p56-i02',
    'statement-per-c2-geo-af-c2-11',
    'statement-per-c2-geo-af-c2-12'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
