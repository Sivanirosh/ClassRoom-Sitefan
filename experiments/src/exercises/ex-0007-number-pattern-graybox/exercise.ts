import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0007',
  slug: 'number-pattern-graybox',
  title: 'Le pas caché',
  summary: 'Reconstruire les portions effondrées d’un sentier en trouvant les nombres manquants d’une suite arithmétique, pendant qu’un planeur rival poursuit sa route.',
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
    concepts: ['number-patterns', 'arithmetic-sequences', 'additive-step', 'skip-counting']
  },
  learning: {
    objective: 'Inférer un pas additif constant à partir de plusieurs termes, puis l’utiliser directement pour compléter et contrôler toute une suite arithmétique.',
    prerequisites: [
      'Additionner et soustraire mentalement de petits nombres naturels.',
      'Lire une suite ordonnée de gauche à droite.',
      'Sélectionner une tuile puis une case au pointeur, au toucher ou au clavier.'
    ],
    misconceptions: [
      'Choisir un nombre qui semble proche sans vérifier le même écart entre chaque paire de termes.',
      'Mesurer comme un seul pas l’écart entre deux termes séparés par une case vide.',
      'Continuer à additionner lorsque la suite est décroissante.'
    ],
    evidence: [
      'Inférer le pas sans indice à partir de la deuxième course et l’appliquer directement.',
      'Placer chaque nombre de manière compatible avec le terme précédent et le terme suivant.',
      'Après une erreur, utiliser le retour écrit sur l’écart pour corriger la tuile pendant que la course continue.',
      'Transférer le raisonnement d’une suite croissante vers une suite décroissante sans confondre vitesse de jeu et compréhension.'
    ]
  },
  gameplay: {
    coreMechanic: 'Pendant qu’un planeur rival avance en continu, identifier le pas et replacer dans l’ordre les portions numérotées du sol qui bloquent le coureur; chaque nombre correct reconstruit le sentier jusqu’à la prochaine brèche.',
    interactionModes: ['auto-start-race', 'continuous-opponent', 'direct-ordered-tile-placement', 'drag-and-drop', 'error-recovery', 'descending-transfer'],
    estimatedMinutes: 4
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'sequence-precedent-adaptations',
    'program-graybox-precedents',
    'lens-pattern-identification',
    'checkpoint-number-patterns',
    'source-toy-theater-number-pattern'
  ],
  dates: {
    created: '2026-07-18',
    updated: '2026-07-18'
  }
});
