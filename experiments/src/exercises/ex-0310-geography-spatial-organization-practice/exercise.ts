import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0310',
  slug: 'geography-spatial-organization-practice',
  title: 'La table des calques utiles',
  summary:
    'Assembler sur trois plans proches une zone fonctionnelle, son réseau et un effet cohérent en variant les limites et les aménagements.',
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
    concepts: [
      'functional-zones',
      'spatial-relations',
      'networks',
      'spatial-planning-effects'
    ]
  },
  learning: {
    objective:
      'Délimiter une zone à partir de sa fonction, choisir le réseau qui la relie utilement, puis associer un effet directement soutenu par le plan.',
    prerequisites: [
      'Lire un plan schématique composé de neuf grandes cases nommées.',
      'Comprendre les relations relier, traverser, inclure et rester hors de.',
      'Distinguer une fonction, une limite, un réseau et un effet.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : regrouper des cases parce qu’elles se ressemblent visuellement plutôt que parce qu’elles ont la même fonction.',
      'Hypothèse de conception à observer : retenir le trajet le plus direct sans vérifier les zones qu’il traverse.',
      'Stratégie possible à observer : choisir un effet souhaitable mais non montré par la limite et le réseau assemblés.'
    ],
    evidence: [
      'Assembler trois calques cohérents selon la chaîne fonction → limite → réseau → effet.',
      'Réviser le premier lien incohérent après un retour qui cite le calque soumis.',
      'Réutiliser la stratégie avec une limite construite, une limite naturelle et une limite temporelle.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Piloter un plan grossier par de grands boutons pour superposer une délimitation, une liaison en réseau et un effet, puis éprouver la cohérence de l’assemblage.',
    interactionModes: ['layer-assembly', 'coarse-plan-comparison', 'guided-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-spatial-organization',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-o01',
    'statement-per-c2-geo-p56-o02',
    'statement-per-c2-geo-p56-o03',
    'statement-per-c2-geo-af-c2-05',
    'statement-per-c2-geo-af-c2-06',
    'statement-per-c2-geo-af-c2-07',
    'statement-per-c2-geo-af-c2-08',
    'statement-per-c2-geo-af-c2-09',
    'lens-practice'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
