import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0308',
  slug: 'geography-location-access-transfer-diagnosis',
  title: 'Le bureau des accès',
  summary: 'Conseiller l’emplacement d’un service temporaire dans trois lieux documentés inconnus en reliant site, situation, limites, accès et faits du dossier.',
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
    concepts: ['site-and-situation', 'limits-and-access', 'location-reasoning', 'evidence-based-recommendation']
  },
  learning: {
    objective: 'Recommander un emplacement dans un lieu documenté inconnu et justifier ce choix par deux faits convergents concernant sa situation, ses limites ou ses accès.',
    prerequisites: [
      'Lire une légende simple et repérer une route, un obstacle et une limite sur un croquis.',
      'Distinguer un fait donné par un dossier d’un avis personnel.',
      'Comprendre les mots site, situation, limite et accès lorsqu’ils sont définis dans le contexte.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : choisir le lieu apparemment le plus proche sans vérifier si le service peut réellement y arriver.',
      'Stratégie possible à observer : retenir un espace vaste ou central tout en négligeant une limite naturelle, administrative ou horaire.',
      'Stratégie possible à observer : joindre des faits exacts mais qui ne soutiennent pas l’emplacement recommandé.'
    ],
    evidence: [
      'Assembler une recommandation cohérente comportant un site et exactement deux faits pertinents du dossier.',
      'Après un retour ciblé, réviser le site ou les faits en nommant l’accès ou la limite qui change la décision.',
      'Transférer la vérification origine du service → trajet ouvert → publics desservis à trois contraintes spatiales différentes.'
    ]
  },
  gameplay: {
    coreMechanic: 'Inspecter un dossier territorial inédit, épingler un site et deux faits, puis défendre ou réviser une recommandation de service temporaire.',
    interactionModes: ['document-inspection', 'recommendation-assembly', 'evidence-linking', 'diagnostic-revision'],
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
    'lens-transfer-diagnosis',
    'geography',
    'documented-place',
    'location-reasoning'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
