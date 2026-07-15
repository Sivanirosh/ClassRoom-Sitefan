import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0314',
  slug: 'geography-scale-transfer-diagnosis',
  title: 'Le passeport des documents',
  summary:
    'Attribuer à trois documents inhabituels une étendue spatiale et une information réellement soutenue par leur contenu.',
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
    concepts: ['document-extent', 'local-scales', 'information-scope', 'transfer-diagnosis']
  },
  learning: {
    objective:
      'Composer, pour trois documents inhabituels, un passeport associant l’étendue spatiale couverte et une information réellement soutenue par les repères du document, puis réviser cette association.',
    prerequisites: [
      'Comprendre qu’un document représente seulement une portion d’espace.',
      'Repérer des noms de lieux, des limites et des liaisons dans de courts documents.',
      'Comparer site, quartier ou ville et région proche comme étendues emboîtées.'
    ],
    misconceptions: [
      'Hypothèse de conception : agrandir l’étendue dès qu’un lieu plus lointain est cité en marge.',
      'Hypothèse de conception : réduire l’étendue au premier lieu nommé malgré plusieurs lieux reliés.',
      'Hypothèse de conception : attribuer au document une information qui dépasse ses bords ou son niveau de détail.'
    ],
    evidence: [
      'Choisir une étendue à partir de tous les lieux effectivement couverts, et non d’un seul mot saillant.',
      'Associer à cette étendue une information vérifiable dans le document.',
      'Réviser séparément le cadre spatial ou la portée informative après un retour ciblé.',
      'Transférer la stratégie à une grille de jardin, un journal de casiers de jeux et un bordereau de bibliobus.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Examiner un document sans couverture, régler son cadre spatial puis viser l’information qu’il peut soutenir avant d’apposer un passeport.',
    interactionModes: ['document-forensics', 'two-part-calibration', 'diagnostic-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-scale',
    'lens-transfer-diagnosis',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-e01',
    'statement-per-c2-geo-af-c2-10'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
