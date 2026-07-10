<script lang="ts">
  export let score: number;
  export let total: number;
  export let title = 'Mission terminée !';
  export let message = '';
  export let transmissionMessage = '';
  export let label = 'réussites';

  $: safeTotal = Math.max(1, total);
  $: percent = Math.round(Math.min(100, Math.max(0, (score / safeTotal) * 100)));
  $: defaultMessage =
    percent >= 90
      ? 'Tu maîtrises très bien cette étape. Prêt·e à explorer la suite ?'
      : percent >= 65
        ? 'Beau travail : tes stratégies commencent à devenir solides.'
        : 'Tu as découvert ce qui mérite un nouvel essai. C’est exactement ainsi qu’on apprend.';
</script>

<section class="mission-result panel-card center">
  <div class="result-burst" aria-hidden="true"><span>✦</span><span>✦</span><span>✦</span></div>
  <p class="eyebrow">Bilan de l’exploration</p>
  <h1>{title}</h1>
  <div class="result-score" style={`--result-angle: ${percent * 3.6}deg`} aria-label={`${score} ${label} sur ${safeTotal}`}>
    <div><strong>{score}</strong><span>/ {safeTotal}</span></div>
  </div>
  <p class="result-message">{message || defaultMessage}</p>
  <slot name="detail" />
  {#if transmissionMessage}<p class="save-status"><span aria-hidden="true">✓</span> {transmissionMessage}</p>{/if}
  <div class="result-actions"><slot /></div>
</section>
