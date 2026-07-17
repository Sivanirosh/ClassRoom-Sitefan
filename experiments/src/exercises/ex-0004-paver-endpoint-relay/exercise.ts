import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0004',
  slug: 'paver-endpoint-relay',
  title: 'Le relais du pavé-étalon',
  summary: 'Mesurer une longueur en déplaçant le même pavé bout à bout, puis réconcilier la trace des intervalles avec un comptage indépendant.',
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
    concepts: ['length-measurement', 'unit-iteration', 'one-to-one-counting']
  },
  learning: {
    objective: 'Construire la mesure d’une longueur en répétant une même unité depuis l’origine jusqu’à l’extrémité, sans trou ni chevauchement, et coordonner chaque intervalle avec un comptage unique.',
    prerequisites: [
      'Identifier le début et la fin d’une longueur droite.',
      'Compter une petite suite ordonnée en gardant une correspondance terme à terme.',
      'Reconnaître que le même pavé reste l’unité lorsqu’il est déplacé.'
    ],
    misconceptions: [
      'Commencer ailleurs qu’à l’origine de la longueur.',
      'Laisser un trou ou créer un chevauchement entre deux répétitions.',
      'Compter deux fois un intervalle ou oublier de le compter.',
      'Donner un nombre sans nommer l’unité de longueur.'
    ],
    evidence: [
      'Construire une trace ordonnée dont le premier intervalle part de l’origine et dont chaque intervalle suivant commence au bout du précédent.',
      'Créer exactement un événement de comptage par intervalle et réparer un désaccord entre les deux traces.',
      'Mesurer indépendamment une ligne déplacée sans indice de surface.',
      'Expliquer pourquoi une autre équipe peut reproduire la même mesure à partir des repères.'
    ]
  },
  gameplay: {
    coreMechanic: 'Déplacer un pavé-étalon par relations explicites, poser des repères, compter séparément chaque intervalle, auditer puis réparer les deux traces.',
    interactionModes: ['endpoint-placement', 'independent-counting', 'trace-inspection', 'reversible-repair'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-seq-m1',
    'pilot-seq-m1',
    'lens-construction',
    'checkpoint-mes-01',
    'statement-per-c2-math-p24-02',
    'statement-per-c2-math-p24-06'
  ],
  dates: {
    created: '2026-07-16',
    updated: '2026-07-16'
  }
});
