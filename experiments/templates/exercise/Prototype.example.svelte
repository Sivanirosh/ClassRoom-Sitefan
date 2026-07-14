<script lang="ts">
  type Phase = 'introduction' | 'exercise' | 'feedback';

  let phase: Phase = 'introduction';
</script>

<svelte:head>
  <title>Prototype EX-0000</title>
</svelte:head>

<main class="prototype-root">
  {#if phase === 'introduction'}
    <section>
      <p class="eyebrow">Prototype isolé</p>
      <h1>Remplacer ce cadre par une seule boucle d’exercice.</h1>
      <p>L’interface visible par l’élève reste en français.</p>
      <button type="button" on:click={() => (phase = 'exercise')}>Commencer</button>
    </section>
  {:else if phase === 'exercise'}
    <section>
      <p>Construire ici la manipulation centrale.</p>
      <button type="button" on:click={() => (phase = 'feedback')}>Vérifier</button>
    </section>
  {:else}
    <section>
      <h2>Rendre le raisonnement visible dans le retour.</h2>
      <button type="button" on:click={() => (phase = 'exercise')}>Essayer encore</button>
    </section>
  {/if}
</main>

<style>
  .prototype-root {
    display: grid;
    min-height: calc(100vh - 42px);
    place-items: center;
    padding: 24px;
    color: #17221f;
    background: #f5f3ea;
  }

  section {
    width: min(680px, 100%);
    padding: 40px;
    border: 1px solid #d8d9d1;
    border-radius: 20px;
    background: white;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 1.05;
  }

  .eyebrow {
    color: #195f55;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  button {
    min-height: 46px;
    margin-top: 18px;
    padding: 10px 18px;
    border: 0;
    border-radius: 10px;
    color: white;
    background: #195f55;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }
</style>
