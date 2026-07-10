<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type FeedbackKind = 'correct' | 'incorrect' | 'hint' | 'info';

  export let kind: FeedbackKind = 'info';
  export let title: string;
  export let explanation = '';
  export let continueLabel = 'Continuer';
  export let showContinue = true;
  export let disabled = false;

  const dispatch = createEventDispatcher<{ continue: void }>();

  $: icon = kind === 'correct' ? '✓' : kind === 'incorrect' ? '↻' : kind === 'hint' ? '✦' : 'i';
</script>

<section class="feedback-panel is-{kind}" aria-live="polite" aria-atomic="true">
  <span class="feedback-icon" aria-hidden="true">{icon}</span>
  <div class="feedback-copy">
    <strong>{title}</strong>
    {#if explanation}<p>{explanation}</p>{/if}
    <slot />
  </div>
  {#if showContinue}
    <button
      class="btn feedback-continue"
      class:btn-success={kind === 'correct'}
      class:btn-primary={kind !== 'correct'}
      type="button"
      {disabled}
      on:click={() => dispatch('continue')}
    >
      {continueLabel} <span aria-hidden="true">→</span>
    </button>
  {/if}
</section>
