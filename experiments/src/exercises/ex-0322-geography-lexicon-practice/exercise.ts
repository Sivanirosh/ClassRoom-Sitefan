import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0322',
  slug: 'geography-lexicon-practice',
  title: 'Le carnet de terrain précis',
  summary: 'Réviser des notes de terrain en remplaçant des formulations vagues par un vocabulaire géographique précis et justifié.',
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
    concepts: ['geographic-lexicon', 'terminological-precision', 'field-observation']
  },
  learning: {
    objective: 'Remplacer un mot vague dans une note d’observation par le terme géographique qui nomme précisément l’indice décrit.',
    prerequisites: [
      'Comprendre les verbes relier, séparer, équiper et situer.',
      'Lire une courte note associée à un croquis ou à des données simples.'
    ],
    misconceptions: [
      'Hypothèse de conception : considérer plusieurs termes proches comme interchangeables hors contexte.',
      'Hypothèse de conception : choisir le mot le plus général même lorsqu’un indice permet une désignation précise.',
      'Hypothèse de conception : privilégier un mot du décor plutôt que la relation décrite.'
    ],
    evidence: [
      'Repérer l’expression vague à réviser dans chaque note.',
      'Insérer un terme précis et conserver une phrase géographiquement cohérente.',
      'Réutiliser la stratégie indice puis terme sur trois familles lexicales différentes.'
    ]
  },
  gameplay: {
    coreMechanic: 'Réviser une note de terrain en remplaçant son étiquette vague par un terme précis, puis relire la phrase réparée.',
    interactionModes: ['field-note-editing', 'word-bank-placement', 'deliberate-practice'],
    estimatedMinutes: 6
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
    'lens-practice'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
