<script lang="ts">
  import { onMount } from 'svelte';
  import LabFooter from '../../lib/components/LabFooter.svelte';
  import LabHeader from '../../lib/components/LabHeader.svelte';
  import StatusBadge from '../../lib/components/StatusBadge.svelte';
  import { findExercise } from '../../lib/catalog/discovery';
  import { formatTechnicalSlug, formatYears } from '../../lib/catalog/presentation';

  const requestedId = new URLSearchParams(window.location.search).get('id');
  const record = findExercise(requestedId);
  let designDocument = '';
  let designError = '';

  onMount(async () => {
    if (!record) return;
    try {
      designDocument = await record.loadDesign();
    } catch (error) {
      designError = error instanceof Error ? error.message : 'Erreur inconnue';
    }
  });
</script>

<div class="site-shell">
  <LabHeader active="catalog" />

  <main class="detail-page">
    {#if !record}
      <section class="not-found">
        <p class="eyebrow"><span></span> Fiche introuvable</p>
        <h1>Aucun exercice ne porte cet identifiant.</h1>
        <p>Vérifiez le lien ou revenez au catalogue.</p>
        <a class="button button-primary" href="/catalog/">Retour au catalogue</a>
      </section>
    {:else}
      <nav class="breadcrumbs" aria-label="Fil d’Ariane">
        <a href="/catalog/">Catalogue</a><span aria-hidden="true">/</span><span>{record.definition.id}</span>
      </nav>

      <header class="detail-header">
        <div>
          <div class="detail-meta"><span>{record.definition.id}</span><StatusBadge status={record.definition.status} /></div>
          <h1>{record.definition.title}</h1>
          <p>{record.definition.summary}</p>
        </div>
        {#if record.hasPrototype}
          <a class="button button-primary" href={`/runner/?id=${encodeURIComponent(record.definition.id)}`}>Lancer le prototype <span aria-hidden="true">↗</span></a>
        {:else}
          <span class="paper-only-label">Prototype non commencé</span>
        {/if}
      </header>

      <section class="detail-layout">
        <aside class="metadata-panel">
          <h2>Repères</h2>
          <dl>
            <div><dt>Degrés</dt><dd>{formatYears(record.definition.curriculum.years)}</dd></div>
            <div><dt>Cycle</dt><dd>Cycle {record.definition.curriculum.cycle}</dd></div>
            <div><dt>Objectifs PER</dt><dd>{record.definition.curriculum.objectiveCodes.join(', ')}</dd></div>
            <div><dt>Disciplines</dt><dd>{record.definition.classification.disciplines.map(formatTechnicalSlug).join(', ')}</dd></div>
            <div><dt>Concepts</dt><dd>{record.definition.classification.concepts.map(formatTechnicalSlug).join(', ')}</dd></div>
            <div><dt>Durée visée</dt><dd>{record.definition.gameplay.estimatedMinutes} min</dd></div>
            <div><dt>Mécanique</dt><dd>{record.definition.gameplay.coreMechanic}</dd></div>
          </dl>

          <h2>Objectif d’apprentissage</h2>
          <p>{record.definition.learning.objective}</p>
        </aside>

        <article class="design-panel">
          <div class="design-panel-heading">
            <div><p class="eyebrow"><span></span> Document de conception</p><h2>DESIGN.md</h2></div>
            <code>{record.folder}/DESIGN.md</code>
          </div>
          {#if designError}
            <p class="document-error" role="alert">Impossible de charger le document : {designError}</p>
          {:else if designDocument}
            <pre>{designDocument}</pre>
          {:else}
            <p class="document-loading">Chargement du document…</p>
          {/if}
        </article>
      </section>
    {/if}
  </main>

  <LabFooter />
</div>
