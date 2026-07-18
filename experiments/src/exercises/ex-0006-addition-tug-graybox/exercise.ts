import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0006',
  slug: 'addition-tug-graybox',
  title: 'La corde des sommes',
  summary: 'Répondre à des additions dans 20 pour contre-tirer une corde pendant qu’un adversaire la déplace continuellement à vitesse constante.',
  status: 'prototyping',
  curriculum: {
    framework: 'PER',
    cycle: 2,
    years: ['6H'],
    objectiveCodes: ['MSN 23'],
    sourceIds: ['src-per-0002']
  },
  classification: {
    disciplines: ['mathematics'],
    concepts: ['addition-facts', 'mental-calculation', 'fluency-within-20']
  },
  learning: {
    objective: 'Retrouver avec exactitude des sommes de deux termes compris entre 1 et 9, puis maintenir cette exactitude lorsque la réponse doit être récupérée plus rapidement.',
    prerequisites: [
      'Lire une addition horizontale et quatre nombres entiers.',
      'Connaître ou reconstruire des faits additifs simples dans 20.',
      'Activer un grand bouton au pointeur, au toucher ou au clavier.'
    ],
    misconceptions: [
      'Choisir un distracteur voisin sans vérifier la somme.',
      'Confondre vitesse de sélection et exactitude mathématique.',
      'Répondre au hasard lorsque la pression adverse devient visible.'
    ],
    evidence: [
      'Choisir correctement plusieurs sommes dans 20 au sein d’une même manche.',
      'Voir qu’une réponse incorrecte déclenche un contre-tirage bleu d’un cran, égal et opposé à celui d’une réponse exacte.',
      'Conserver l’exactitude pendant que la traction adverse déplace continuellement la corde.',
      'Réussir plusieurs contre-tirages malgré l’augmentation graduelle de la vitesse adverse.',
      'Voir la manche se terminer exactement lorsque l’une des deux équipes atteint sa balise.'
    ]
  },
  gameplay: {
    coreMechanic: 'L’adversaire tire continuellement; chaque somme correcte produit un contre-tirage rouge d’un cran, tandis qu’une réponse incorrecte délivre le même cran vers le bleu sous forme de traction continue plutôt que de saut. La première équipe qui atteint sa balise termine la manche.',
    interactionModes: ['multiple-choice', 'tug-progress', 'continuous-opponent-pressure', 'seamless-answer-flow'],
    estimatedMinutes: 4
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-precedent-adaptations',
    'program-graybox-precedents',
    'lens-competitive-retrieval',
    'checkpoint-addition-fluency',
    'source-toy-theater-addition-pull'
  ],
  dates: {
    created: '2026-07-18',
    updated: '2026-07-18'
  }
});
