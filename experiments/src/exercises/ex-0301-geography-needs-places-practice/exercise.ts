import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0301',
  slug: 'geography-needs-places-practice',
  title: 'Le tri des lieux utiles',
  summary: 'Classer des lieux proches par fonction en s’appuyant sur les activités qu’ils rendent possibles.',
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
    concepts: ['human-needs', 'place-functions', 'classification']
  },
  learning: {
    objective: 'Classer, dans trois cas variés, un lieu selon la fonction attestée par une activité ou un indice observable.',
    prerequisites: [
      'Distinguer un lieu de l’activité qui s’y déroule.',
      'Comprendre les verbes apprendre, s’approvisionner, se déplacer et échanger.',
      'Savoir comparer deux catégories écrites en français.'
    ],
    misconceptions: [
      'Hypothèse de conception : classer d’après l’apparence ou le nom du lieu plutôt que d’après l’activité décrite.',
      'Hypothèse de conception : confondre la personne qui utilise le lieu avec la fonction du lieu.',
      'Hypothèse de conception : ignorer un indice de liaison avec un autre espace.'
    ],
    evidence: [
      'Utiliser l’indice d’activité pour choisir une catégorie fonctionnelle.',
      'Corriger un classement en citant la relation entre l’action possible et le besoin satisfait.',
      'Maintenir la stratégie quand les indices passent d’une activité directe à une liaison entre lieux.'
    ]
  },
  gameplay: {
    coreMechanic: 'Acheminer chaque fiche-lieu vers la catégorie de fonction justifiée par son indice.',
    interactionModes: ['sorting', 'evidence-reading', 'varied-practice'],
    estimatedMinutes: 5
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-needs-places',
    'lens-practice',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-q01',
    'statement-per-c2-geo-p56-q02',
    'statement-per-c2-geo-p56-q03',
    'statement-per-c2-geo-p56-o01',
    'statement-per-c2-geo-af-c2-01',
    'statement-per-c2-geo-af-c2-04'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
