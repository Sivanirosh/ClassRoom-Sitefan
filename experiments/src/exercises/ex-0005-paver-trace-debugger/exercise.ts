import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0005',
  slug: 'paver-trace-debugger',
  title: 'Le contrôle des traces',
  summary: 'Rejouer une mesure, localiser sa première relation défectueuse, modifier l’état réel puis construire une trace neuve sans modèle.',
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
    concepts: ['length-measurement', 'unit-iteration', 'measurement-error-analysis']
  },
  learning: {
    objective: 'Diagnostiquer et réparer la première relation invalide d’une mesure par unité itérée, puis construire indépendamment une trace valide avec un comptage coordonné.',
    prerequisites: [
      'Identifier le début et la fin d’une longueur droite.',
      'Suivre une courte suite d’étapes dans l’ordre.',
      'Comparer la longueur d’un pavé utilisé à plusieurs reprises.'
    ],
    misconceptions: [
      'Corriger seulement le nombre final sans modifier la procédure.',
      'Accepter un trou ou un chevauchement parce que la trace paraît régulière.',
      'Changer la longueur de l’unité en cours de mesure.',
      'Reconnaître une erreur chez autrui sans pouvoir construire soi-même la mesure.'
    ],
    evidence: [
      'Arrêter un replay sur la première relation invalide et modifier directement le départ ou la longueur de l’intervalle.',
      'Relancer la trace et observer la conséquence en aval de la réparation.',
      'Construire une trace complète depuis un plan vide, avec un comptage par intervalle.',
      'Énoncer la mesure avec son unité et justifier sa reproductibilité.'
    ]
  },
  gameplay: {
    coreMechanic: 'Rejouer pas à pas une trace causale, marquer le premier défaut, éditer directement la géométrie, relancer puis construire une trace indépendante.',
    interactionModes: ['step-replay', 'causal-debugging', 'direct-state-editing', 'blank-trace-authoring'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-seq-m1',
    'pilot-seq-m1',
    'lens-debugging',
    'checkpoint-mes-01',
    'statement-per-c2-math-p24-02',
    'statement-per-c2-math-p24-06'
  ],
  dates: {
    created: '2026-07-16',
    updated: '2026-07-16'
  }
});
