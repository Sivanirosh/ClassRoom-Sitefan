import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0321',
  slug: 'geography-lexicon-construction',
  title: 'Le chantier des mots géographiques',
  summary: 'Construire le sens de réseau, limite et aménagement en reliant chaque mot aux indices visibles d’un espace proche.',
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
    concepts: ['geographic-lexicon', 'spatial-relations', 'meaning-construction']
  },
  learning: {
    objective: 'Construire une définition en contexte qui associe un mot géographique à deux indices spatiaux observables.',
    prerequisites: [
      'Lire une phrase courte et observer un schéma simple de la région proche.',
      'Distinguer un lieu, une ligne et un équipement représentés par des symboles.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir un mot parce qu’il est familier sans vérifier les indices spatiaux.',
      'Hypothèse de conception : confondre une limite qui sépare avec un réseau qui relie.',
      'Hypothèse de conception : appeler tout objet construit un aménagement sans considérer sa fonction.'
    ],
    evidence: [
      'Associer le mot juste à deux indices concordants dans le schéma.',
      'Réviser une première construction après un retour qui oppose relier, séparer et faciliter.',
      'Formuler la relation stable entre le mot et sa fonction spatiale sur trois situations.'
    ]
  },
  gameplay: {
    coreMechanic: 'Assembler deux fragments d’une définition puis l’éprouver sur un schéma qui rend sa conséquence visible.',
    interactionModes: ['definition-building', 'diagram-inspection', 'guided-revision'],
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
    'lens-construction'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
