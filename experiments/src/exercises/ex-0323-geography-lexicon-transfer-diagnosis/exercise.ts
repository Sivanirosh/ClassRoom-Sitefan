import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0323',
  slug: 'geography-lexicon-transfer-diagnosis',
  title: 'Radio Quartier : le mot juste',
  summary: 'Rédiger de courts messages de coordination dans des contextes nouveaux en choisissant un terme géographique et l’indice qui le justifie.',
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
    concepts: ['geographic-lexicon', 'contextual-transfer', 'diagnostic-reasoning']
  },
  learning: {
    objective: 'Choisir, dans un contexte spatial nouveau, le terme géographique et l’indice qui rendent un message non ambigu.',
    prerequisites: [
      'Connaître en contexte quelques notions du noyau lexical géographique.',
      'Prélever un indice explicite dans un croquis et une courte consigne.'
    ],
    misconceptions: [
      'Hypothèse de conception : employer un mot générique alors qu’une relation précise est observable.',
      'Hypothèse de conception : choisir un terme voisin dont la fonction spatiale ne correspond pas à l’indice.',
      'Hypothèse de conception : choisir le bon terme avec une justification sans rapport avec la situation.'
    ],
    evidence: [
      'Composer un message qui associe terme et indice concordants dans une situation non répétée à l’identique.',
      'Corriger un message ambigu à partir d’un retour sur sa famille d’erreur observable.',
      'Maintenir une stratégie interprétable terme plus preuve au fil de trois contextes.'
    ]
  },
  gameplay: {
    coreMechanic: 'Composer un message radio en deux éléments — terme et indice — puis vérifier s’il guiderait une action sans ambiguïté.',
    interactionModes: ['message-composition', 'evidence-linking', 'transfer-diagnosis'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-lexicon',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-i04',
    'statement-per-c2-geo-p56-i05',
    'statement-per-c2-geo-af-c2-13',
    'lens-transfer-diagnosis'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
