import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0304',
  slug: 'geography-actors-views-practice',
  title: 'Le bureau des rôles',
  summary:
    'Composer puis justifier la fiche de rôle de trois acteurs d’espaces proches, en reliant leur catégorie à des actions observables et en distinguant rôle et représentation.',
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
    concepts: ['spatial-actors', 'actor-roles', 'spatial-representations']
  },
  learning: {
    objective:
      'À partir d’indices sur un espace proche, catégoriser un acteur et expliciter son rôle par une action soutenue par ces indices, en distinguant ce rôle d’un regard sur le lieu.',
    prerequisites: [
      'Reconnaître qu’une personne, un groupe ou un service peut agir dans un lieu.',
      'Lire de courts indices et repérer qui accomplit une action.',
      'Connaître le sens courant des mots commune, service, association et coopérative, ou utiliser le lexique visible.'
    ],
    misconceptions: [
      'Hypothèse de conception : choisir une description de l’acteur sans préciser ce qu’il fait dans la situation.',
      'Hypothèse de conception : attribuer à l’acteur étudié l’usage ou le rôle d’un autre groupe cité dans le dossier.',
      'Hypothèse de conception : traiter un regard porté sur un lieu comme s’il décrivait une action vérifiable de l’acteur.'
    ],
    evidence: [
      'Assembler, pour chaque dossier, une catégorie d’acteur et un rôle compatibles avec les mêmes indices.',
      'Réviser une fiche après un retour qui distingue erreur de catégorie et erreur de rôle.',
      'Justifier le rôle par les verbes ou faits du dossier plutôt que par le seul nom de l’acteur ou par un avis sur le lieu.'
    ]
  },
  gameplay: {
    coreMechanic:
      'Examiner un mini-dossier puis assembler une fiche « type d’acteur + rôle » avant de la déposer et de la réviser si nécessaire.',
    interactionModes: ['evidence-reading', 'two-part-role-card', 'guided-revision'],
    estimatedMinutes: 8
  },
  delivery: {
    devices: ['desktop', 'tablet', 'mobile'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: [
    'program-per-6h',
    'cluster-geo56-actors-views',
    'lens-practice',
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
