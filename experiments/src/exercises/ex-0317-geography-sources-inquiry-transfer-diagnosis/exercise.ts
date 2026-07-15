import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0317',
  slug: 'geography-sources-inquiry-transfer-diagnosis',
  title: 'La cellule des dossiers neufs',
  summary: 'Diagnostiquer une stratégie d’enquête en choisissant, pour un dossier inédit, une chaîne documentaire qui répond sans dépasser les indices.',
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
    concepts: ['inquiry-transfer', 'documentary-strategy', 'evidence-limits']
  },
  learning: {
    objective: 'Choisir et réviser, dans trois dossiers documentaires inédits, une chaîne qui relie la question, une hypothèse, des sources complémentaires et une conclusion limitée aux indices.',
    prerequisites: [
      'Distinguer question, hypothèse, source et conclusion.',
      'Comparer une observation avec une photographie décrite, un relevé ou un plan simplifié.',
      'Accepter qu’une conclusion puisse rester partielle quand les sources ne montrent pas tout.'
    ],
    misconceptions: [
      'Hypothèse de conception : conclure à partir d’une seule source alors que la question demande deux dimensions.',
      'Hypothèse de conception : choisir des sources intéressantes mais sans rapport avec la question.',
      'Hypothèse de conception : présenter comme certain ce que les indices permettent seulement de proposer.'
    ],
    evidence: [
      'Choisir une route d’enquête dont chaque source répond à une partie identifiable de la question.',
      'Réviser une route après un retour qui nomme le maillon absent ou la conclusion trop large.',
      'Transférer la stratégie à des dossiers d’ombre, de passage et d’approvisionnement non répétés dans les deux autres études.'
    ]
  },
  gameplay: {
    coreMechanic: 'Auditer deux routes documentaires complètes et ouvrir celle dont les sources soutiennent une conclusion bornée.',
    interactionModes: ['transfer', 'strategy-audit', 'diagnostic-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-sources-inquiry',
    'lens-transfer-diagnosis',
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
