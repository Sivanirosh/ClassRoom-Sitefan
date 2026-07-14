<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { findExercise } from '../../lib/catalog/discovery';

  const requestedId = new URLSearchParams(window.location.search).get('id');
  const record = findExercise(requestedId);
  let Prototype: Component | undefined;
  let loadError = '';

  onMount(async () => {
    if (!record?.loadPrototype) return;
    try {
      Prototype = await record.loadPrototype();
    } catch (error) {
      loadError = error instanceof Error ? error.message : 'Erreur inconnue';
    }
  });
</script>

{#if !record}
  <main class="runner-message">
    <p>Prototype introuvable</p>
    <h1>Aucun exercice ne porte cet identifiant.</h1>
    <a href="/catalog/">Retour au catalogue</a>
  </main>
{:else if !record.loadPrototype}
  <main class="runner-message">
    <p>{record.definition.id}</p>
    <h1>Ce prototype n’a pas encore été construit.</h1>
    <a href={`/exercise/?id=${encodeURIComponent(record.definition.id)}`}>Retour à la fiche</a>
  </main>
{:else if loadError}
  <main class="runner-message runner-error">
    <p>{record.definition.id}</p>
    <h1>Le prototype n’a pas pu démarrer.</h1>
    <pre>{loadError}</pre>
    <a href={`/exercise/?id=${encodeURIComponent(record.definition.id)}`}>Retour à la fiche</a>
  </main>
{:else if Prototype}
  <div class="prototype-frame">
    <aside class="runner-toolbar">
      <a href={`/exercise/?id=${encodeURIComponent(record.definition.id)}`} aria-label="Retour à la fiche">←</a>
      <span><strong>{record.definition.id}</strong> · {record.definition.title}</span>
      <span>Prototype isolé</span>
    </aside>
    <div class="prototype-mount"><Prototype /></div>
  </div>
{:else}
  <main class="runner-message" aria-live="polite">
    <p>{record.definition.id}</p>
    <h1>Chargement du prototype…</h1>
  </main>
{/if}
