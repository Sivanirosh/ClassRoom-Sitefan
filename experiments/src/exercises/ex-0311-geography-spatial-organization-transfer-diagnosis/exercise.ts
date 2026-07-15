import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0311',
  slug: 'geography-spatial-organization-transfer-diagnosis',
  title: 'Le révélateur territorial',
  summary: 'Comparer trois territoires fictifs avant et après un aménagement, localiser ce qui change et relier un indice à un impact environnemental, social ou économique.',
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
    concepts: ['spatial-organization', 'parts-zones-networks', 'territorial-change', 'impact-evidence']
  },
  learning: {
    objective: 'Dans un dossier territorial inédit présenté avant et après un aménagement, identifier la partie, la zone ou le réseau principalement touché et relier un écart documenté à un impact environnemental, social ou économique.',
    prerequisites: [
      'Lire la légende et les flèches d’un croquis schématique simple.',
      'Distinguer une partie précise, une zone délimitée et un réseau de liaisons.',
      'Comparer deux états et repérer ce qui change ou reste stable.',
      'Comprendre qu’un impact est une conséquence appuyée par un indice du dossier.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : viser l’endroit où le nouvel objet est dessiné sans vérifier quelle organisation spatiale est effectivement modifiée.',
      'Stratégie possible à observer : choisir un fait vrai mais stable entre avant et après, donc incapable d’étayer l’impact proposé.',
      'Stratégie possible à observer : sélectionner un domaine d’impact à partir du thème du lieu plutôt qu’à partir de l’écart documenté.'
    ],
    evidence: [
      'Composer un constat cohérent qui associe une cible spatiale, un écart avant/après et une conséquence du même dossier.',
      'Après un retour ciblé, réviser la cible, l’indice ou l’impact plutôt que remplacer toute la réponse au hasard.',
      'Réutiliser la stratégie cible → écart → conséquence lorsque la cible passe d’une zone à un réseau puis à une partie et que le domaine d’impact change.'
    ]
  },
  gameplay: {
    coreMechanic: 'Utiliser une table de comparaison avant/après, puis déposer trois poinçons — cible spatiale, indice d’écart et impact — sur une fiche de constat révisable.',
    interactionModes: ['before-after-inspection', 'layer-switching', 'evidence-linking', 'diagnostic-revision'],
    estimatedMinutes: 9
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
    'lens-transfer-diagnosis',
    'geography',
    'before-after-dossier',
    'impact-reasoning'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
