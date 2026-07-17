import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0005',
  slug: 'log-roll-crossing',
  title: 'Fais rouler',
  summary: 'Observer la distance d’un tour complet, puis prédire combien de tours identiques restent nécessaires à travers des passages dont la représentation et la direction évoluent.',
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
    concepts: ['length-measurement', 'unit-iteration', 'invariant-unit', 'measurement-estimation']
  },
  learning: {
    objective: 'Expérimenter un tour complet comme déplacement-unité invariant, puis projeter mentalement ses répétitions restantes avant de vérifier la prédiction dans le monde.',
    prerequisites: [
      'Identifier le début et la fin d’une longueur droite.',
      'Associer une rotation complète à un déplacement et une empreinte.',
      'Entrer un petit nombre entier sans chronomètre.'
    ],
    misconceptions: [
      'Traiter deux déplacements différents comme la même unité.',
      'Réutiliser une ancienne prédiction alors que la distance du tour observé a changé.',
      'Compter le premier tour observé parmi les tours encore demandés.',
      'Deviner successivement des nombres sans projeter l’unité sur la longueur restante.'
    ],
    evidence: [
      'Faire rouler directement le rondin et observer un déplacement invariant par tour complet.',
      'Conserver le premier tour de calibration comme unité et nouvel endpoint de départ.',
      'Engager une prédiction entière avant l’exécution automatique des tours restants.',
      'Interpréter une arrivée trop courte ou trop longue et réviser depuis la fin du premier tour.',
      'Transférer la relation vers une ligne sans surface, une direction diagonale, une direction inversée et un cas final sans stratégie rappelée.'
    ]
  },
  gameplay: {
    coreMechanic: 'Après un tutoriel de roulement direct, observer un premier tour qui reste en place, prédire les tours additionnels, puis inspecter l’arrivée physique de leur exécution automatique.',
    interactionModes: ['direct-roll-tutorial', 'unit-calibration', 'integer-prediction', 'automatic-resolution', 'world-state-retry', 'orientation-transfer'],
    estimatedMinutes: 7
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
