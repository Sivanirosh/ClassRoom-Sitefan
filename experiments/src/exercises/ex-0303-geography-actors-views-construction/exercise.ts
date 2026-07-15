import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0303',
  slug: 'geography-actors-views-construction',
  title: 'Le cabinet des regards',
  summary:
    'Composer le profil d’un acteur d’un lieu proche, puis relier son rôle documenté au point de vue qu’il met au premier plan.',
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
    concepts: ['actor-categories', 'roles', 'spatial-representations', 'points-of-view']
  },
  learning: {
    objective:
      'À partir d’une fiche de rôle située, classer l’acteur et relier son point de vue sur le lieu à un indice explicite de ce rôle.',
    prerequisites: [
      'Distinguer une personne d’un groupe ou d’une organisation.',
      'Lire une courte fiche et repérer qui agit, ce que cette personne ou ce groupe fait et dans quel lieu.',
      'Comprendre qu’un même lieu peut avoir plusieurs usages.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir le point de vue que l’on préfère soi-même au lieu de suivre le rôle et les paroles de l’acteur du dossier.',
      'Hypothèse de conception : confondre une personne avec l’organisation pour laquelle elle agit, ou confondre public et privé.',
      'Hypothèse de conception : croire qu’une catégorie impose toujours une opinion identique, même lorsque les indices du dossier disent autre chose.'
    ],
    evidence: [
      'Composer un profil cohérent sur les axes individuel ou collectif, public ou privé, et social, économique ou politique.',
      'Choisir un point de vue compatible avec les actes et les paroles fournis, puis conserver le lien rôle–regard dans trois situations contrastées.',
      'Après une réponse incohérente, réviser la catégorie ou le regard à partir des indices signalés plutôt qu’à partir d’une préférence personnelle.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Placer un acteur dans une catégorie, orienter une lentille vers ce que son rôle met au premier plan, puis soumettre le lien construit.',
    interactionModes: ['classification', 'lens-selection', 'evidence-linking', 'revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-actors-views',
    'lens-construction',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-a01',
    'statement-per-c2-geo-p56-a02',
    'statement-per-c2-geo-af-c2-02'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
