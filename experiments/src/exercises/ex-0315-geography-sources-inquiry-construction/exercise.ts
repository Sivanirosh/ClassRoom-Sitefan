import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0315',
  slug: 'geography-sources-inquiry-construction',
  title: 'Le fil de l’enquête',
  summary: 'Construire une chaîne question–hypothèse–indice en reliant une source pertinente à une enquête géographique proche.',
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
    concepts: ['geographic-inquiry', 'source-selection', 'evidence-reasoning']
  },
  learning: {
    objective: 'Relier, dans trois situations proches, une question et une hypothèse à l’indice d’une source qui permet réellement de tester cette hypothèse.',
    prerequisites: [
      'Distinguer une question d’une affirmation.',
      'Comprendre qu’une hypothèse est une réponse possible qui doit être vérifiée.',
      'Lire une observation courte, une photographie décrite ou un plan simplifié.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir une source parce qu’elle parle du même lieu sans vérifier l’information qu’elle apporte.',
      'Hypothèse de conception : prendre une hypothèse plausible pour une réponse déjà prouvée.',
      'Hypothèse de conception : confondre un détail attirant avec un indice utile à la question.'
    ],
    evidence: [
      'Relier la source à l’information précise nécessaire pour tester l’hypothèse.',
      'Réviser une liaison après un retour qui distingue thème commun et indice pertinent.',
      'Maintenir la chaîne question–hypothèse–indice avec une observation, une série de photographies et un plan.'
    ]
  },
  gameplay: {
    coreMechanic: 'Compléter un fil d’enquête en branchant la source qui apporte l’indice nécessaire.',
    interactionModes: ['construction', 'source-linking', 'guided-revision'],
    estimatedMinutes: 7
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-sources-inquiry',
    'lens-construction',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-q01',
    'statement-per-c2-geo-p56-i01',
    'statement-per-c2-geo-p56-i02',
    'statement-per-c2-geo-af-c2-11',
    'statement-per-c2-geo-af-c2-12'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
