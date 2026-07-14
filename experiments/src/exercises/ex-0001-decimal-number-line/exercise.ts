import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0001',
  slug: 'decimal-number-line',
  title: 'La balise décimale',
  summary: 'Placer puis comparer des nombres décimaux sur une droite graduée pour rendre visible la valeur des dixièmes et des centièmes.',
  status: 'prototyping',
  curriculum: {
    framework: 'PER',
    cycle: 2,
    years: ['7H', '8H'],
    objectiveCodes: ['MSN 22'],
    sourceIds: ['src-per-0001']
  },
  classification: {
    disciplines: ['mathematics'],
    concepts: ['decimal-ordering', 'place-value', 'number-line']
  },
  learning: {
    objective: 'Comparer et ordonner deux nombres décimaux ayant au plus deux décimales en justifiant leur position sur une droite graduée.',
    prerequisites: [
      'Lire des nombres décimaux simples écrits avec une virgule.',
      'Identifier les unités, les dixièmes et les centièmes.',
      'Lire le sens croissant d’une droite graduée.'
    ],
    misconceptions: [
      'Traiter les parties situées de chaque côté de la virgule comme deux nombres entiers, par exemple déclarer 3,5 inférieur à 3,45 parce que 5 est inférieur à 45.',
      'Croire qu’une écriture comportant davantage de chiffres après la virgule représente toujours le plus grand nombre.',
      'Croire que l’ajout d’un zéro final change la valeur du nombre.'
    ],
    evidence: [
      'Placer deux nombres décimaux dans le bon ordre sur une droite graduée.',
      'Réécrire un nombre en centièmes, par exemple 3,5 en 3,50, sans en changer la valeur.',
      'Justifier une comparaison en mobilisant les dixièmes puis les centièmes.'
    ]
  },
  gameplay: {
    coreMechanic: 'Prédire, placer et comparer deux balises sur une droite graduée.',
    interactionModes: ['prediction', 'number-line-placement', 'guided-explanation'],
    estimatedMinutes: 5
  },
  delivery: {
    devices: ['desktop', 'tablet'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: ['decimals', 'comparison', 'misconception', 'visual-representation'],
  dates: {
    created: '2026-07-14',
    updated: '2026-07-14'
  }
});
