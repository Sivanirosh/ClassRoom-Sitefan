import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0319',
  slug: 'geography-represent-map-practice',
  title: 'La boussole des mini-plans',
  summary: 'Déplacer un repère sur trois mini-plans diversement orientés en utilisant la flèche du nord, la légende et un point de départ nommé.',
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
    concepts: ['map-reading', 'cardinal-orientation', 'legend-and-landmarks']
  },
  learning: {
    objective: 'Localiser un lieu voisin d’un repère nommé en traduisant une direction cardinale selon l’orientation visible du plan.',
    prerequisites: [
      'Reconnaître les quatre directions cardinales et les déplacements haut, droite, bas, gauche.',
      'Lire une légende courte et retrouver un lieu nommé sur une grille simple.'
    ],
    misconceptions: [
      'Hypothèse de conception : confondre le haut de l’écran avec le nord.',
      'Hypothèse de conception : partir du centre de la grille sans vérifier le repère de départ nommé.',
      'Hypothèse de conception : suivre seulement le dessin du symbole sans consulter la légende.'
    ],
    evidence: [
      'Utiliser la flèche du nord pour convertir une direction cardinale en déplacement sur la page.',
      'Conserver le repère de départ et la cible pendant une correction.',
      'Réappliquer la même stratégie sur trois rotations et trois familles de symboles.'
    ]
  },
  gameplay: {
    coreMechanic: 'Déplacer un jeton d’une case sur un mini-plan orienté, puis vérifier que sa position concorde avec la direction et la légende.',
    interactionModes: ['grid-navigation', 'cardinal-direction-practice', 'map-legend-reading'],
    estimatedMinutes: 6
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
    'lens-practice'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
