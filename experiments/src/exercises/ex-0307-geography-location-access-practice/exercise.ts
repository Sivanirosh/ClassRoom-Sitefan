import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0307',
  slug: 'geography-location-access-practice',
  title: 'Le carnet des quatre repères',
  summary:
    'Classer les indices de trois lieux proches fictifs pour bâtir une description ordonnée : site, situation, limites, puis accès.',
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
    concepts: ['place-description', 'site-situation', 'spatial-boundaries', 'access-routes']
  },
  learning: {
    objective:
      'Classer des indices d’un lieu proche selon site, situation, limites et accès, puis les relire dans cet ordre pour produire une description géographique structurée.',
    prerequisites: [
      'Comprendre des indications spatiales courtes comme près de, entre, au nord et par.',
      'Distinguer un lieu de ce qui l’entoure.',
      'Lire quatre phrases descriptives simples.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : confondre le site, qui décrit le terrain du lieu, avec la situation, qui le relie à d’autres lieux.',
      'Stratégie possible à observer : classer toute mention d’un chemin comme un accès, même lorsqu’une phrase décrit seulement une limite.'
    ],
    evidence: [
      'Attribuer chacune des quatre cartes-indices à une rubrique différente et conserver l’ordre site → situation → limites → accès.',
      'Réviser un classement après un retour qui oppose deux relations géographiques précises.',
      'Réutiliser la même stratégie sur trois dossiers dont le site, le type de limite et le réseau d’accès varient.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Trier quatre cartes-indices dans un carnet de description ordonné, valider l’arrangement, puis le corriger à l’aide d’un contraste ciblé.',
    interactionModes: ['classification', 'description-building', 'guided-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-location-access',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-l01',
    'statement-per-c2-geo-af-c2-03',
    'lens-practice'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
