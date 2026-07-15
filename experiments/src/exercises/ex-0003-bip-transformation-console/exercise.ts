import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0003',
  slug: 'bip-transformation-console',
  title: 'La console qui n’en fait qu’à sa tête',
  summary: 'Prédire, exécuter et réparer des transformations de ±1, ±10, ±100 et ±1’000 dans une console de valeur de position.',
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
    concepts: ['counting-steps', 'place-value', 'base-ten-exchange']
  },
  learning: {
    objective: 'Prédire et expliquer l’effet de ±1, ±10, ±100 ou ±1’000 sur un nombre naturel, y compris lorsqu’un échange de rang est nécessaire.',
    prerequisites: [
      'Associer unités, dizaines, centaines et milliers à des groupements par dix.',
      'Lire et écrire des nombres naturels jusqu’à 10’000.',
      'Interpréter les symboles + et − dans une transformation.'
    ],
    misconceptions: [
      'Ajouter un chiffre ou un zéro au lieu d’ajouter une valeur de position.',
      'Modifier tous les chiffres lors d’un changement de rang.',
      'Considérer une soustraction impossible lorsque le rang visé est vide.'
    ],
    evidence: [
      'Composer des commandes de ±1, ±10, ±100 et ±1’000 adaptées à une transformation donnée.',
      'Prévoir un passage de rang comme 293 + 10 = 303.',
      'Diagnostiquer et remplacer une commande appliquée au mauvais rang.',
      'Expliquer un dégroupement comme 1’004 − 100 = 904.',
      'Composer plusieurs pas négatifs pour atteindre exactement une cible.'
    ]
  },
  gameplay: {
    coreMechanic: 'Programmer une commande, prédire son effet, observer la console et réparer ses raisonnements défectueux.',
    interactionModes: ['prediction', 'command-programming', 'debugging', 'guided-explanation'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-seq-n1',
    'pilot-seq-n1',
    'lens-practice',
    'statement-per-c2-math-p22-05',
    'statement-per-c2-math-p22-09',
    'statement-per-c2-math-p22-10',
    'statement-per-c2-math-p22-12',
    'statement-per-c2-math-p22-13'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
