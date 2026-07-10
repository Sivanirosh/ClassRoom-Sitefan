<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<svelte:head>
  <title>Accès enseignant — Classe Numérique</title>
  <meta name="description" content="Connexion sécurisée au poste de suivi enseignant." />
  <meta name="theme-color" content="#263457" />
</svelte:head>

<div class="page teacher-page">
  <header class="header teacher-header">
    <div class="header-inner">
      <div class="brand">
        <span class="brand-icon" aria-hidden="true">◫</span>
        <div><h1 class="brand-title">Poste enseignant</h1><p class="brand-subtitle">Accès privé aux signaux pédagogiques</p></div>
      </div>
      <a class="btn ghost" href="/">← Camp élève</a>
    </div>
  </header>

  <main class="main login-shell">
    <form method="POST" class="card login-card stack-lg">
      <div class="center">
        <div class="login-icon" aria-hidden="true">⌁</div>
        <p class="eyebrow" style="margin-top:1rem;">Session protégée</p>
        <h1 style="font-size:2rem; margin:.3rem 0;">Ouvrir le suivi</h1>
        <p class="muted small">Les résultats et notes restent dans l’espace enseignant. Le mot de passe est vérifié uniquement par le serveur.</p>
      </div>

      {#if form?.message}<p class="feedback bad" role="alert">{form.message}</p>{/if}

      <label class="label" for="teacher-password">
        Mot de passe enseignant
        <input id="teacher-password" class="input" name="password" type="password" autocomplete="current-password" required />
      </label>
      <button class="btn btn-primary btn-large" type="submit">Accéder au tableau <span aria-hidden="true">→</span></button>
      <p class="privacy-note"><span aria-hidden="true">●</span><span>La session expire automatiquement après huit heures.</span></p>
    </form>
  </main>
</div>
