import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0004',
  slug: 'frog-jump-prediction',
  title: 'Le saut juste',
  summary: 'Découvrir une unité-saut, prévoir un nombre entier de sauts, puis observer une chaîne automatique finir avant, sur ou après l’arrivée.',
  status: 'prototyping',
  curriculum: {
    framework: 'PER',
    cycle: 2,
    years: ['6H'],
    objectiveCodes: ['MSN 24'],
    sourceIds: ['src-per-0002']
  },
  classification: {
    disciplines: ['mathematics'],
    concepts: ['length-measurement', 'unit-iteration', 'measurement-estimation', 'additive-composition']
  },
  learning: {
    objective: 'Projeter mentalement une unité-saut sur une longueur droite, engager un nombre entier de sauts, puis calibrer la prédiction à partir d’un écart spatial visible.',
    prerequisites: [
      'Identifier le début et la fin d’une longueur droite.',
      'Comprendre au tutoriel qu’un saut ordinaire avance d’une unité constante.',
      'Entrer un petit nombre entier sans contrainte de vitesse.'
    ],
    misconceptions: [
      'Deviner successivement des nombres sans utiliser l’unité visible.',
      'Confondre le nombre d’actions avec la longueur lorsque certains sauts couvrent deux unités.',
      'Réutiliser un résultat mémorisé malgré un changement de direction ou d’unité.',
      'Compter des actions sans relier chaque déplacement au côté d’un carré-unité.'
    ],
    evidence: [
      'Après un tutoriel gestuel, engager une prédiction entière avant toute trace de vérification.',
      'Interpréter un arrêt avant l’arrivée ou un dépassement et réviser la prédiction.',
      'Transférer la projection de l’unité d’une ligne horizontale vers une ligne verticale sur la même grille.',
      'Dans un défi tardif, tenir compte d’un saut obligatoire de deux unités qui réduit le nombre d’actions.'
    ]
  },
  gameplay: {
    coreMechanic: 'Entrer un nombre entier; la grenouille exécute automatiquement exactement ce nombre de sauts, puis le monde montre une arrivée trop courte, exacte ou dépassée.',
    interactionModes: ['tutorial-direct-jump', 'integer-prediction', 'automatic-resolution', 'world-state-retry'],
    estimatedMinutes: 4
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-seq-m1',
    'pilot-seq-m1',
    'lens-calm-microgame',
    'checkpoint-mes-01',
    'bridge-mes-02-hypothesis',
    'statement-per-c2-math-p24-02',
    'statement-per-c2-math-p24-03',
    'statement-per-c2-math-p24-06'
  ],
  dates: {
    created: '2026-07-16',
    updated: '2026-07-17'
  }
});
