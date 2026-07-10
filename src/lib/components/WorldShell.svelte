<script lang="ts">
  import { worldById, type WorldId } from '$lib/worlds';

  export let world: WorldId;
  export let studentName = '';
  export let section = '';
  export let backHref = '/';
  export let backLabel = 'Retour au QG';

  $: definition = worldById[world];
</script>

<div class="page world-page" data-world={world}>
  <a class="skip-link" href="#world-content">Aller à l’activité</a>
  <header class="world-header no-print">
    <div class="world-nav">
      <a class="world-brand" href={backHref} aria-label={`${backLabel} — ${definition.title}`}>
        <span class="world-brand-mark" aria-hidden="true">{definition.emoji}</span>
        <span>
          <span class="world-brand-eyebrow">{definition.eyebrow}</span>
          <strong>{definition.shortTitle}</strong>
        </span>
      </a>

      <div class="world-nav-actions">
        {#if studentName}
          <span class="player-chip" title="Élève actuellement connecté">
            <span aria-hidden="true">●</span>
            {studentName}
          </span>
        {/if}
        {#if section}<span class="section-chip">{section}</span>{/if}
        <a class="btn btn-quiet world-back" href={backHref}>
          <span aria-hidden="true">←</span> {backLabel}
        </a>
      </div>
    </div>
  </header>

  <main id="world-content" class="world-main">
    <slot />
  </main>

  <footer class="world-footer no-print">
    <span>Prends ton temps, observe, puis essaie.</span>
    <span aria-hidden="true">✦</span>
    <span>Chaque essai fait avancer.</span>
  </footer>
</div>
