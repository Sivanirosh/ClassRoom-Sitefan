import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0313',
  slug: 'geography-scale-practice',
  title: 'L’aiguillage des deux échelles',
  summary:
    'Acheminer des demandes d’information vers le cadrage utile en coordonnant l’étendue couverte et le niveau de détail.',
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
    concepts: ['spatial-scale', 'map-extent', 'information-selection', 'nested-local-spaces']
  },
  learning: {
    objective:
      'Affecter une demande géographique à l’un de deux cadrages locaux en vérifiant que l’étendue contient les lieux cités et que le détail utile reste visible.',
    prerequisites: [
      'Comprendre qu’un appartement appartient à un quartier, qu’un quartier appartient à une ville et qu’un lieu local appartient à une région.',
      'Lire des indications courtes sur ce qu’un document couvre et montre.',
      'Distinguer un lieu cité de l’information précise demandée à son sujet.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : choisir toujours la vue la plus étendue parce qu’elle semble contenir davantage d’informations.',
      'Hypothèse de conception à observer : choisir toujours la vue la plus rapprochée parce qu’elle montre davantage de détails.',
      'Stratégie possible à observer : se fier au premier nom de lieu sans vérifier si tous les lieux cités entrent dans le cadrage.'
    ],
    evidence: [
      'Router quatre demandes vers deux cadrages en coordonnant inclusion spatiale et précision de l’information.',
      'Réviser une affectation après un retour qui distingue étendue couverte et détail conservé.',
      'Réutiliser la même stratégie sur les couples appartement/quartier, quartier/ville et local/régional.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Aiguiller des tickets d’information vers deux fenêtres d’échelle, inspecter les piles obtenues, puis soumettre l’ensemble du routage.',
    interactionModes: ['sorting', 'routing-workbench', 'comparison', 'scaffolded-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-scale',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-e01',
    'statement-per-c2-geo-af-c2-10',
    'lens-practice'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
