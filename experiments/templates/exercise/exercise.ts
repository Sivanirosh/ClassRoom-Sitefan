import { defineExercise } from '../../lib/catalog/schema';

export default defineExercise({
  schemaVersion: 1,
  id: 'EX-0000',
  slug: 'short-name',
  title: 'Titre français affiché dans le catalogue',
  summary: 'Résumé français de l’objectif et de la manipulation proposée.',
  status: 'planned',
  curriculum: {
    framework: 'PER',
    cycle: 2,
    years: ['6H'],
    objectiveCodes: ['PER-CODE'],
    sourceIds: ['src-per-0000']
  },
  classification: {
    disciplines: ['discipline-slug'],
    concepts: ['concept-slug']
  },
  learning: {
    objective: 'Décrire précisément ce que l’élève devrait comprendre ou savoir faire.',
    prerequisites: ['List required prior knowledge.'],
    misconceptions: ['List the misconception or fragile strategy being addressed.'],
    evidence: ['Describe observable evidence that the learner understood.']
  },
  gameplay: {
    coreMechanic: 'Name the repeated action that carries the learning.',
    interactionModes: ['interaction-slug'],
    estimatedMinutes: 5
  },
  delivery: {
    devices: ['desktop', 'tablet'],
    inputMethods: ['pointer', 'touch', 'keyboard']
  },
  tags: ['retrieval-tag'],
  dates: {
    created: 'YYYY-MM-DD',
    updated: 'YYYY-MM-DD'
  }
});
