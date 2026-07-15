import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0312',
  slug: 'geography-scale-construction',
  title: 'L’atlas à deux fenêtres',
  summary:
    'Construire deux vues locales emboîtées, puis poser un repère commun pour rendre visibles le changement d’étendue et le lien entre les échelles.',
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
    concepts: ['local-scales', 'nested-spaces', 'change-of-view', 'shared-landmarks']
  },
  learning: {
    objective:
      'Construire, dans trois contextes proches, une petite vue et une vue plus large qui l’englobe, puis les relier par un repère présent aux deux échelles.',
    prerequisites: [
      'Comprendre qu’un lieu peut être contenu dans un espace plus étendu.',
      'Reconnaître les mots appartement, quartier, ville, local et régional dans de courtes descriptions.',
      'Choisir plusieurs réglages avec des boutons et soumettre ensuite le montage.'
    ],
    misconceptions: [
      'Hypothèse de conception à observer : traiter les deux vues comme deux lieux séparés au lieu de chercher l’inclusion de l’une dans l’autre.',
      'Hypothèse de conception à observer : penser qu’une vue plus large montre les mêmes détails en plus grand plutôt qu’une étendue plus vaste avec d’autres relations.',
      'Hypothèse de conception à observer : choisir comme repère commun un détail visible à une seule des deux échelles.'
    ],
    evidence: [
      'Régler séparément l’étendue de deux fenêtres et inspecter la conséquence avant toute soumission.',
      'Choisir un repère qui permet de retrouver le même lieu dans la petite vue et dans la vue plus large.',
      'Réviser le cadre ou le repère ciblé après un retour tout en conservant le montage soumis.',
      'Reproduire la relation d’emboîtement pour appartement/quartier, quartier/ville et local/régional.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Ouvrir deux fenêtres cartographiques emboîtées, régler leur étendue, puis agrafer les vues avec un repère commun avant de soumettre la construction.',
    interactionModes: ['nested-frame-construction', 'scale-comparison', 'shared-landmark-linking'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-scale',
    'lens-construction',
    'statement-per-c2-geo-p56-00',
    'statement-per-c2-geo-p56-e01',
    'statement-per-c2-geo-af-c2-10'
  ],
  dates: {
    created: '2026-07-15',
    updated: '2026-07-15'
  }
});
