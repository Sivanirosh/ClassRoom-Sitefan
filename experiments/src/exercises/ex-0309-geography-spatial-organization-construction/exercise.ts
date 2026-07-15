import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0309',
  slug: 'geography-spatial-organization-construction',
  title: 'L’atelier des trois maillons',
  summary: 'Assembler une fonction, un aménagement et son effet observable dans trois organisations de la région proche.',
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
    concepts: ['spatial-organization', 'facilities-and-functions', 'observable-impacts']
  },
  learning: {
    objective: 'Assembler puis réviser, dans trois schémas de la région proche, une chaîne cohérente fonction → aménagement → effet observable.',
    prerequisites: [
      'Lire un schéma simple et repérer des parties, des passages et des limites.',
      'Comprendre qu’une fonction indique ce qu’un lieu doit permettre de faire.',
      'Distinguer une réalisation ajoutée au lieu de l’effet qu’elle produit sur son organisation.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir un aménagement parce que son objet paraît utile sans le relier à la fonction demandée.',
      'Hypothèse de conception : confondre délimiter une zone et relier plusieurs parties d’un lieu.',
      'Hypothèse de conception : considérer seulement le but annoncé et ne pas inspecter l’effet spatial réellement visible.'
    ],
    evidence: [
      'Composer les trois maillons en s’appuyant sur les parties et les relations visibles du schéma.',
      'Réviser le premier maillon incohérent après un retour qui conserve la chaîne soumise.',
      'Réutiliser la relation fonction–aménagement–effet pour une place, un réseau de collecte et un franchissement de ruisseau.'
    ]
  },
  gameplay: {
    coreMechanic: 'Poser trois cartes liées, observer le schéma transformé, puis soumettre et réparer la chaîne causale.',
    interactionModes: ['chain-construction', 'spatial-model-inspection', 'guided-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-spatial-organization',
    'lens-construction',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-o01',
    'statement-per-c2-geo-p56-o02',
    'statement-per-c2-geo-p56-o03',
    'statement-per-c2-geo-af-c2-05',
    'statement-per-c2-geo-af-c2-06',
    'statement-per-c2-geo-af-c2-07',
    'statement-per-c2-geo-af-c2-08',
    'statement-per-c2-geo-af-c2-09'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
