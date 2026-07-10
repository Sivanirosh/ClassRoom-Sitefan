<script lang="ts">
  import { onMount } from 'svelte';
  import { clearStudentName, getStudentName, storeStudentName } from '$lib/client/activity';
  import { getStudentJourney, type StudentJourney } from '$lib/client/student-storage';
  import WorldArt from '$lib/components/WorldArt.svelte';
  import { worlds, type WorldDefinition } from '$lib/worlds';

  let ready = false;
  let studentName = '';
  let nameInput = '';
  let nameError = '';
  let journey: StudentJourney = {};

  $: exploredCount = worlds.filter((world) => journey[world.id]).length;
  $: totalSessions = worlds.reduce((total, world) => total + (journey[world.id]?.plays ?? 0), 0);
  $: latestWorld = worlds.reduce<WorldDefinition | null>((latest, world) => {
    const currentDate = journey[world.id]?.lastPlayedAt ?? 0;
    const latestDate = latest ? (journey[latest.id]?.lastPlayedAt ?? 0) : 0;
    return currentDate > latestDate ? world : latest;
  }, null);

  onMount(() => {
    const stored = getStudentName('');
    studentName = stored;
    nameInput = stored;
    if (stored) journey = getStudentJourney(stored);
    ready = true;
  });

  function login() {
    const nextName = nameInput.trim();
    if (nextName.length < 2) {
      nameError = 'Écris au moins deux lettres pour que ton carnet porte bien ton prénom.';
      return;
    }

    nameError = '';
    studentName = nextName;
    storeStudentName(nextName);
    journey = getStudentJourney(nextName);
  }

  function logout() {
    clearStudentName();
    studentName = '';
    nameInput = '';
    nameError = '';
    journey = {};
  }

  function routeFor(route: string): string {
    return `${route}?eleve=${encodeURIComponent(studentName)}`;
  }

  function initials(name: string): string {
    return name.trim().slice(0, 2).toLocaleUpperCase('fr-FR');
  }
</script>

<svelte:head>
  <title>Le Camp des Curieux — Portail de la classe</title>
  <meta name="description" content="Cinq mondes ludiques pour comprendre, essayer et progresser à son rythme." />
  <meta name="theme-color" content="#e9f3ee" />
</svelte:head>

<div class="page hub-page">
  <a class="skip-link" href="#hub-content">Aller aux mondes</a>
  <header class="hub-topbar">
    <a class="portal-brand" href="/" aria-label="Accueil du Camp des Curieux">
      <span class="portal-mark" aria-hidden="true">✦</span>
      <span>
        <strong>Le Camp des Curieux</strong>
        <span>Le portail de la classe</span>
      </span>
    </a>
    <a class="btn btn-quiet teacher-door" href="/teacher">
      <span aria-hidden="true">☰</span><span>Espace enseignant</span>
    </a>
  </header>

  <main id="hub-content" class="hub-main">
    {#if !ready}
      <section class="identity-wrap" aria-live="polite">
        <div class="panel-card center"><p class="muted">On prépare la carte…</p></div>
      </section>
    {:else if !studentName}
      <section class="identity-wrap">
        <div class="identity-card">
          <div class="identity-illustration" aria-hidden="true">
            <div class="camp-sky">
              <span class="camp-star">✦</span><span class="camp-star">●</span><span class="camp-star">✧</span>
            </div>
            <span class="camp-character">🎒</span>
          </div>
          <form class="identity-form" on:submit|preventDefault={login}>
            <p class="eyebrow">Bienvenue au camp de base</p>
            <h1>Prêt·e à explorer ?</h1>
            <p>Écris ton prénom. Ton petit carnet de route restera séparé de celui des autres élèves sur cet appareil.</p>
            <label class="label" for="student-name">Mon prénom</label>
            <div class="name-input-wrap">
              <span class="name-input-icon" aria-hidden="true">☺</span>
              <input
                id="student-name"
                class="input"
                bind:value={nameInput}
                required
                minlength="2"
                maxlength="40"
                autocomplete="given-name"
                placeholder="Par exemple : Léa"
                aria-describedby={nameError ? 'name-error privacy-note' : 'privacy-note'}
              />
            </div>
            {#if nameError}<p id="name-error" class="feedback bad" role="alert">{nameError}</p>{/if}
            <button class="btn btn-primary btn-large" type="submit">Ouvrir ma carte <span aria-hidden="true">→</span></button>
            <div id="privacy-note" class="privacy-note">
              <span aria-hidden="true">⌂</span>
              <span>Le portail fonctionne dans la classe. Il n’y a ni classement public, ni série à ne pas perdre.</span>
            </div>
          </form>
        </div>
      </section>
    {:else}
      <section class="basecamp-hero">
        <div class="basecamp-copy">
          <p class="eyebrow">Ton camp de base</p>
          <h1>Bonjour {studentName}, où va-t-on aujourd’hui ?</h1>
          <p>Choisis librement un monde. Ici, on apprend en observant, en essayant et en comprenant pourquoi.</p>
          <div class="student-bar">
            <span class="student-avatar" aria-hidden="true">{initials(studentName)}</span>
            <span class="student-name">Carnet de {studentName}</span>
            <button class="student-switch" type="button" on:click={logout}>Ce n’est pas moi</button>
          </div>
        </div>

        <aside class="basecamp-board" aria-label="Résumé de ton carnet de route">
          <div class="board-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span class="board-label">Carnet de route</span>
          <div class="board-stat">
            <strong>{exploredCount}<span class="sr-only"> sur 5</span></strong>
            <span>{exploredCount === 0 ? 'Cinq mondes t’attendent' : `${exploredCount} monde${exploredCount > 1 ? 's' : ''} déjà exploré${exploredCount > 1 ? 's' : ''}`}</span>
          </div>
          {#if latestWorld}
            <a class="btn btn-warning" href={routeFor(latestWorld.route)}>Continuer {latestWorld.shortTitle} →</a>
          {:else}
            <span class="small" style="color:#d5def0;">Commence par celui qui t’intrigue le plus.</span>
          {/if}
        </aside>
      </section>

      <section aria-labelledby="world-map-title">
        <div class="map-heading">
          <div>
            <p class="eyebrow">La grande carte</p>
            <h2 id="world-map-title">Cinq façons d’apprendre en jouant</h2>
          </div>
          <p>{totalSessions > 0 ? `${totalSessions} session${totalSessions > 1 ? 's' : ''} dans ton carnet. Aucun monde n’est verrouillé.` : 'Tous les mondes sont ouverts. Une session courte suffit pour découvrir.'}</p>
        </div>

        <div class="world-map">
          {#each worlds as world}
            {@const progress = journey[world.id]}
            <article class="world-card" data-theme={world.theme}>
              <div class="world-card-art"><WorldArt world={world.id} /></div>
              <div class="world-card-copy">
                <p class="eyebrow">{world.eyebrow}</p>
                <div>
                  <h3>{world.shortTitle}</h3>
                  <p>{world.description}</p>
                </div>
                <div class="world-card-tags">
                  <span class="world-tag"><span aria-hidden="true">◈</span> {world.skill}</span>
                  <span class="world-tag"><span aria-hidden="true">◷</span> {world.duration}</span>
                </div>
                <div class="world-progress-summary">
                  <span class:explored={Boolean(progress)} class="world-progress-dot" aria-hidden="true"></span>
                  {#if progress}
                    {progress.plays} exploration{progress.plays > 1 ? 's' : ''} · meilleur essai {progress.bestPercent}%
                  {:else}
                    Nouveau chemin à découvrir
                  {/if}
                </div>
                <a class="btn btn-primary btn-large" href={routeFor(world.route)}>
                  {progress ? 'Continuer le chemin' : 'Découvrir ce monde'} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          {/each}
        </div>
      </section>
    {/if}
  </main>

  <footer class="hub-footer">Fait pour apprendre sans pression — les erreurs sont des indices, pas des défaites.</footer>
</div>
