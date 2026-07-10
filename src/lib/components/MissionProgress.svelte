<script lang="ts">
  export let current: number;
  export let total: number;
  export let label = 'Défi';
  export let score: number | undefined = undefined;
  export let scoreLabel = 'Réussites';
  export let compact = false;

  $: safeTotal = Math.max(1, total);
  $: safeCurrent = Math.min(Math.max(1, current), safeTotal);
  $: percentage = Math.round((safeCurrent / safeTotal) * 100);
</script>

<div class="mission-progress" class:compact>
  <div class="mission-progress-copy">
    <span><strong>{label} {safeCurrent}</strong> sur {safeTotal}</span>
    {#if score !== undefined}<span>{scoreLabel} : <strong>{score}</strong></span>{/if}
  </div>
  <div
    class="progress-track"
    role="progressbar"
    aria-label={`Progression : ${label} ${safeCurrent} sur ${safeTotal}`}
    aria-valuemin="1"
    aria-valuemax={safeTotal}
    aria-valuenow={safeCurrent}
  >
    <span class="progress-fill" style={`width: ${percentage}%`}></span>
  </div>
</div>
