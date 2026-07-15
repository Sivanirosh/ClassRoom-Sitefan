import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0002',
  slug: 'bip-exchange-workshop',
  title: 'Le grand rangement de Bip',
  summary: 'Regrouper des pièces par 10, 100 et 1’000 afin de conserver une quantité tout en changeant son organisation.',
  status: 'prototyping',
  curriculum: {
    framework: 'PER',
    cycle: 2,
    years: ['6H'],
    objectiveCodes: ['MSN 22', 'MSN 25'],
    sourceIds: ['src-per-0002']
  },
  classification: {
    disciplines: ['mathematics'],
    concepts: ['base-ten-grouping', 'place-value', 'number-representations']
  },
  learning: {
    objective: 'Organiser une quantité naturelle en unités, dizaines, centaines et milliers, puis expliquer pourquoi les échanges par dix conservent la quantité.',
    prerequisites: [
      'Dénombrer une petite collection sans double comptage.',
      'Lire des nombres naturels familiers.',
      'Comprendre qu’un contenant peut représenter les éléments qu’il contient.'
    ],
    misconceptions: [
      'Croire que remplacer dix pièces par un sachet fait disparaître des pièces.',
      'Lire le nombre de contenants visibles au lieu de leur contenu total.',
      'Omettre un rang vide, par exemple écrire 13 au lieu de 103.'
    ],
    evidence: [
      'Choisir un échange de dix éléments du même rang.',
      'Reconnaître plusieurs organisations équivalentes d’une même quantité.',
      'Coordonner l’organisation matérielle avec l’écriture chiffrée et décomposée.'
    ]
  },
  gameplay: {
    coreMechanic: 'Choisir et observer des échanges réversibles de dix éléments afin de ranger l’atelier sans modifier la quantité.',
    interactionModes: ['choice', 'grouping', 'prediction', 'guided-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-seq-n1',
    'pilot-seq-n1',
    'lens-construction',
    'statement-per-c2-math-p22-02',
    'statement-per-c2-math-p22-04',
    'statement-per-c2-math-p22-05',
    'statement-per-c2-math-p22-12',
    'statement-per-c2-math-p22-13'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
