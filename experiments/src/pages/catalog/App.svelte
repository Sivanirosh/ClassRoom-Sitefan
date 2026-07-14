<script lang="ts">
  import LabFooter from '../../lib/components/LabFooter.svelte';
  import LabHeader from '../../lib/components/LabHeader.svelte';
  import StatusBadge from '../../lib/components/StatusBadge.svelte';
  import { exerciseCatalog } from '../../lib/catalog/discovery';
  import { formatTechnicalSlug, formatYears, statusLabels } from '../../lib/catalog/presentation';
  import { EXERCISE_STATUSES, HARMOS_YEARS, type ExerciseStatus, type HarmosYear } from '../../lib/catalog/schema';

  let query = '';
  let selectedYear: 'all' | HarmosYear = 'all';
  let selectedStatus: 'all' | ExerciseStatus = 'all';
  let selectedDiscipline = 'all';

  $: disciplines = Array.from(
    new Set(exerciseCatalog.flatMap((record) => record.definition.classification.disciplines))
  ).sort();

  $: filteredRecords = exerciseCatalog.filter((record) => {
    const definition = record.definition;
    const searchable = [
      definition.id,
      definition.title,
      definition.summary,
      ...definition.classification.disciplines,
      ...definition.classification.concepts,
      ...definition.curriculum.objectiveCodes,
      ...definition.tags
    ].join(' ').toLocaleLowerCase('fr-FR');

    return (
      searchable.includes(query.trim().toLocaleLowerCase('fr-FR')) &&
      (selectedYear === 'all' || definition.curriculum.years.includes(selectedYear)) &&
      (selectedStatus === 'all' || definition.status === selectedStatus) &&
      (selectedDiscipline === 'all' || definition.classification.disciplines.includes(selectedDiscipline))
    );
  });

  function resetFilters() {
    query = '';
    selectedYear = 'all';
    selectedStatus = 'all';
    selectedDiscipline = 'all';
  }
</script>

<svelte:head>
  <title>Catalogue · Laboratoire d’exercices</title>
</svelte:head>

<div class="site-shell">
  <LabHeader active="catalog" />

  <main class="catalog-page">
    <section class="catalog-intro">
      <div>
        <p class="eyebrow"><span></span> Collection de travail</p>
        <h1>Catalogue des exercices</h1>
        <p>Retrouver une piste par objectif PER, degré HarmoS, discipline, concept ou état d’avancement.</p>
      </div>
      <div class="catalog-total" aria-label={`${exerciseCatalog.length} exercices`}>
        <strong>{String(exerciseCatalog.length).padStart(2, '0')}</strong>
        <span>fiches</span>
      </div>
    </section>

    <section class="filter-panel" aria-label="Filtres du catalogue">
      <label class="search-field">
        <span>Rechercher</span>
        <input bind:value={query} type="search" placeholder="Titre, concept, code PER…" />
      </label>

      <label>
        <span>Degré</span>
        <select bind:value={selectedYear}>
          <option value="all">Tous les degrés</option>
          {#each HARMOS_YEARS as year}<option value={year}>{year}</option>{/each}
        </select>
      </label>

      <label>
        <span>Discipline</span>
        <select bind:value={selectedDiscipline}>
          <option value="all">Toutes les disciplines</option>
          {#each disciplines as discipline}
            <option value={discipline}>{formatTechnicalSlug(discipline)}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>État</span>
        <select bind:value={selectedStatus}>
          <option value="all">Tous les états</option>
          {#each EXERCISE_STATUSES as status}<option value={status}>{statusLabels[status]}</option>{/each}
        </select>
      </label>
    </section>

    {#if exerciseCatalog.length === 0}
      <section class="empty-catalog" aria-labelledby="empty-title">
        <div class="empty-symbol" aria-hidden="true"><span></span><span></span><span></span></div>
        <p class="eyebrow"><span></span> Structure prête</p>
        <h2 id="empty-title">Le catalogue attend sa première fiche.</h2>
        <p>Aucun exercice n’a encore été défini. La prochaine étape consiste à documenter le PER, puis à concevoir les exercices sur papier.</p>
        <ol>
          <li><span>1</span>Consigner une source dans <code>curriculum/sources</code></li>
          <li><span>2</span>Synthétiser les objectifs par degré et discipline</li>
          <li><span>3</span>Copier le modèle dans <code>src/exercises</code></li>
        </ol>
      </section>
    {:else if filteredRecords.length === 0}
      <section class="empty-catalog compact" aria-live="polite">
        <p class="eyebrow"><span></span> Aucun résultat</p>
        <h2>Aucune fiche ne correspond à ces filtres.</h2>
        <button class="button button-secondary" type="button" on:click={resetFilters}>Effacer les filtres</button>
      </section>
    {:else}
      <section class="catalog-results" aria-live="polite">
        <p class="result-count">{filteredRecords.length} résultat{filteredRecords.length > 1 ? 's' : ''}</p>
        <div class="exercise-grid">
          {#each filteredRecords as record}
            <article class="exercise-card">
              <div class="exercise-card-top">
                <span class="exercise-id">{record.definition.id}</span>
                <StatusBadge status={record.definition.status} />
              </div>
              <div>
                <p class="exercise-years">{formatYears(record.definition.curriculum.years)}</p>
                <h2>{record.definition.title}</h2>
                <p>{record.definition.summary}</p>
              </div>
              <dl>
                <div><dt>Disciplines</dt><dd>{record.definition.classification.disciplines.map(formatTechnicalSlug).join(', ')}</dd></div>
                <div><dt>Objectifs PER</dt><dd>{record.definition.curriculum.objectiveCodes.join(', ')}</dd></div>
              </dl>
              <div class="tag-list">
                {#each record.definition.classification.concepts as concept}<span>{formatTechnicalSlug(concept)}</span>{/each}
              </div>
              <a class="card-link" href={`/exercise/?id=${encodeURIComponent(record.definition.id)}`}>Consulter la fiche <span aria-hidden="true">→</span></a>
            </article>
          {/each}
        </div>
      </section>
    {/if}
  </main>

  <LabFooter />
</div>
