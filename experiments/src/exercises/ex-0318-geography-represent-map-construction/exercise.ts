import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0318',
  slug: 'geography-represent-map-construction',
  title: 'Le calque du quartier',
  summary: 'Construire un plan lisible en coordonnant le sens du regard, la flèche du nord et la position relative de repères proches.',
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
    concepts: ['reality-map-coordination', 'map-orientation', 'spatial-landmarks']
  },
  learning: {
    objective: 'Construire un schéma orienté qui conserve deux relations observées depuis le terrain : la direction du nord et la position relative d’un repère.',
    prerequisites: [
      'Distinguer la gauche, la droite, le haut et le bas sur une feuille.',
      'Connaître les mots nord, repère, symbole et légende dans une situation guidée.'
    ],
    misconceptions: [
      'Hypothèse de conception : placer toujours le nord en haut même lorsque le haut du schéma suit une autre direction.',
      'Hypothèse de conception : conserver la droite de la page sans tenir compte du sens dans lequel la personne regarde.',
      'Hypothèse de conception : placer un symbole plausible sans vérifier les deux relations décrites.'
    ],
    evidence: [
      'Coordonner la direction du regard et la position de la flèche du nord.',
      'Placer un second repère du bon côté du premier sur trois orientations différentes.',
      'Réviser séparément l’orientation ou la position après un retour explicatif.'
    ]
  },
  gameplay: {
    coreMechanic: 'Assembler un calque en choisissant l’orientation du nord puis la position d’un repère, et comparer le résultat au terrain décrit.',
    interactionModes: ['map-building', 'orientation-coordination', 'select-then-place'],
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
    'lens-construction'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
