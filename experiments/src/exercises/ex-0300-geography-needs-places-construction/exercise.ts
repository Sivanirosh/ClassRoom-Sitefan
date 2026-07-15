import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0300',
  slug: 'geography-needs-places-construction',
  title: 'Le lieu prend fonction',
  summary: 'Construire un lieu proche en ajoutant l’aménagement qui relie un besoin à une fonction observable.',
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
    concepts: ['human-needs', 'place-functions', 'spatial-organization']
  },
  learning: {
    objective: 'Relier, dans trois situations proches, un besoin nommé à un lieu et à une fonction en ajoutant l’aménagement qui rend la relation visible.',
    prerequisites: [
      'Comprendre qu’un besoin décrit ce qui est nécessaire ou utile à des personnes.',
      'Reconnaître quelques lieux proches comme un logement, un marché ou une place de quartier.',
      'Lire de courtes consignes et comparer deux propositions illustrées par des symboles.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir un aménagement parce qu’il est attirant sans vérifier le besoin annoncé.',
      'Hypothèse de conception : nommer un lieu sans relier sa fonction aux activités qu’il rend possibles.',
      'Hypothèse de conception : penser qu’un lieu ne peut répondre qu’à un seul besoin.'
    ],
    evidence: [
      'Ajouter un aménagement qui rend possible l’activité liée au besoin annoncé.',
      'Réviser un choix après un retour qui met en relation besoin, aménagement et fonction.',
      'Reconnaître la même relation dans des contextes d’habitat, d’approvisionnement et de loisirs.'
    ]
  },
  gameplay: {
    coreMechanic: 'Transformer un site en lui ajoutant un aménagement, puis observer la fonction créée.',
    interactionModes: ['construction', 'cause-and-effect', 'guided-revision'],
    estimatedMinutes: 6
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-needs-places',
    'lens-construction',
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
