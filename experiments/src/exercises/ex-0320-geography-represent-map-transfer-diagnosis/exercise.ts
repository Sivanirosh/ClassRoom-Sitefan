import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0320',
  slug: 'geography-represent-map-transfer-diagnosis',
  title: 'Le bureau des cartes utiles',
  summary: 'Choisir un outil de représentation inédit et le contrôle de lisibilité qui permettrait à une autre personne de se repérer sans ambiguïté.',
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
    concepts: ['map-tool-selection', 'representation-readability', 'transfer-diagnosis']
  },
  learning: {
    objective: 'Choisir, pour une demande nouvelle, une représentation adaptée et l’indice qui permet d’en vérifier le repérage, l’orientation ou la localisation.',
    prerequisites: [
      'Distinguer une photographie, un plan et un croquis d’itinéraire.',
      'Reconnaître le rôle d’une légende, d’un repère de départ et d’une flèche du nord.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir le document le plus réaliste plutôt que celui qui permet de localiser.',
      'Hypothèse de conception : accepter un plan sans vérifier son orientation.',
      'Hypothèse de conception : accepter un itinéraire sans point de départ partagé.'
    ],
    evidence: [
      'Associer la demande à un outil qui rend la relation spatiale nécessaire visible.',
      'Justifier la lisibilité par un repère, une orientation ou une légende pertinente.',
      'Corriger une décision à partir d’une famille d’erreur liée à la réponse observable.'
    ]
  },
  gameplay: {
    coreMechanic: 'Composer un bon de carte avec un outil et un contrôle de lisibilité, puis diagnostiquer si une personne absente pourrait l’utiliser.',
    interactionModes: ['tool-selection', 'readability-audit', 'transfer-diagnosis'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-represent-map',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-i03',
    'statement-per-c2-geo-p56-r01',
    'statement-per-c2-geo-p56-r02',
    'statement-per-c2-geo-af-c2-14',
    'statement-per-c2-geo-af-c2-15',
    'lens-transfer-diagnosis'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
