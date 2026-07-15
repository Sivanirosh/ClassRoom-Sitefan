import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0306',
  slug: 'geography-location-access-construction',
  title: 'Le portrait d’un lieu',
  summary:
    'Construire quatre couches d’un plan simplifié en choisissant le terrain, un repère voisin, une limite et une voie d’accès pour trois lieux fictifs.',
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
    concepts: ['site-and-situation', 'boundaries-and-access', 'location-reasoning']
  },
  learning: {
    objective:
      'Construire un plan simplifié à partir d’une fiche en choisissant le terrain du site, le repère voisin de la situation, la limite et la voie d’accès, puis réviser le composant signalé après un retour.',
    prerequisites: [
      'Lire les quatre repères courts d’une fiche de lieu.',
      'Reconnaître sur un plan simplifié un terrain, un lieu voisin, un bord et une voie.',
      'Utiliser des boutons à choix exclusif et comprendre qu’un tracé peut représenter une liaison ou une limite.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : choisir le terrain le plus visible sans vérifier s’il s’agit du site naturel ou construit indiqué.',
      'Hypothèse de conception à observer : traiter tout élément linéaire comme une route, même lorsqu’il marque le bord du lieu.',
      'Hypothèse de conception à observer : considérer qu’un accès franchit une limite partout, au lieu de chercher un passage aménagé précis.'
    ],
    evidence: [
      'Activer un composant dans chacun des quatre ateliers de construction et soumettre séparément le plan complet.',
      'Remplacer le composant ciblé après un retour tout en conservant les autres couches du montage.',
      'Assembler trois plans où varient le caractère naturel ou construit du site et de la limite ainsi que le franchissement par l’accès.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Piloter une table cartographique par quatre commandes discrètes — poser, relier, tracer et ouvrir — tandis que le plan superposé et ses conséquences textuelles se construisent en direct.',
    interactionModes: ['layer-construction', 'map-assembly', 'consequence-inspection'],
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
    'lens-construction'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
