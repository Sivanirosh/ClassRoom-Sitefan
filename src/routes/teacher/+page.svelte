<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { worldById, worlds as worldDefinitions, type WorldId } from '$lib/worlds';

  export let data: PageData;
  export let form: ActionData;

  let search = '';
  let worldFilter = 'all';

  $: filteredResults = data.results.filter((result) => {
    const term = search.trim().toLocaleLowerCase('fr-FR');
    const matchesStudent = !term || result.studentName.toLocaleLowerCase('fr-FR').includes(term);
    const matchesWorld = worldFilter === 'all' || result.world === worldFilter;
    return matchesStudent && matchesWorld;
  });
  $: availableWorlds = Array.from(new Set(data.results.map((result) => result.world))).sort();
  $: supportItems = buildSupportItems();
  $: classAverage = data.results.length > 0
    ? Math.round(data.results.reduce((total, result) => total + rate(result.score, result.total), 0) / data.results.length)
    : 0;
  $: activeToday = new Set(data.results.filter((result) => isToday(result.createdAt)).map((result) => result.studentId)).size;

  function rate(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  function rateClass(score: number, total: number): string {
    const percent = rate(score, total);
    if (percent >= 80) return 'score-pill good';
    if (percent >= 50) return 'score-pill mid';
    return 'score-pill low';
  }

  function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
  }

  function isToday(timestamp: number): boolean {
    const date = new Date(timestamp);
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
  }

  function friendlyWorld(world: string): string {
    return world in worldById ? worldById[world as WorldId].shortTitle : world;
  }

  function parseErrorFamilies(raw: string | null): string[] {
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === 'string').slice(0, 4);
      if (typeof parsed === 'string') return [parsed];
      return [];
    } catch {
      return [raw].filter(Boolean);
    }
  }

  function buildSupportItems(): PageData['results'] {
    const seen = new Set<string>();
    return data.results.filter((result) => {
      if (rate(result.score, result.total) >= 65) return false;
      const key = `${result.studentId}:${result.world}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 6);
  }
</script>

<svelte:head>
  <title>Tableau enseignant — Classe Numérique</title>
  <meta name="description" content="Signaux d’intervention et résultats d’apprentissage de la classe." />
  <meta name="theme-color" content="#263457" />
</svelte:head>

<div class="page teacher-page">
  <a class="skip-link" href="#teacher-content">Aller au suivi</a>
  <header class="header teacher-header">
    <div class="header-inner">
      <div class="brand">
        <span class="brand-icon" aria-hidden="true">◫</span>
        <div>
          <h1 class="brand-title">Poste enseignant</h1>
          <p class="brand-subtitle">Des signaux pour accompagner, pas pour classer</p>
        </div>
      </div>
      <div class="actions no-print">
        <a class="btn ghost" href="/">Voir le camp élève</a>
        <form method="POST" action="/teacher/logout"><button class="btn ghost" type="submit">Déconnexion</button></form>
      </div>
    </div>
  </header>

  <main id="teacher-content" class="main teacher-main stack-lg">
    <section class="teacher-welcome">
      <div>
        <p class="eyebrow">Vue de la classe</p>
        <h1>À regarder aujourd’hui</h1>
        <p>Commencez par les tentatives qui peuvent mériter une relance, puis ouvrez les preuves détaillées.</p>
      </div>
      <span class="badge">Données locales · SQLite</span>
    </section>

    <section class="card support-section stack" aria-labelledby="support-title">
      <div class="support-heading">
        <div>
          <h2 id="support-title">Pistes d’accompagnement</h2>
          <p>Dernière tentative sous 65 %, une seule piste récente par élève et par monde. Ce n’est pas un diagnostic.</p>
        </div>
        <span class="badge">{supportItems.length} à regarder</span>
      </div>

      {#if supportItems.length === 0}
        <div class="panel-card compact center">
          <strong>Aucun signal prioritaire dans les résultats récents.</strong>
          <p class="muted small">Les preuves complètes restent disponibles plus bas.</p>
        </div>
      {:else}
        <div class="support-list">
          {#each supportItems as result}
            <article class="support-card">
              <p><strong>{result.studentName}</strong><br /><span class="small muted">{friendlyWorld(result.world)}</span></p>
              <div class="support-evidence">
                <strong>{result.mission}</strong><br />{result.score} sur {result.total} · {result.errorCount} erreur{result.errorCount > 1 ? 's' : ''} · {formatDate(result.createdAt)}
                {#if parseErrorFamilies(result.errorFamilies).length > 0}
                  <div class="error-chips">{#each parseErrorFamilies(result.errorFamilies) as family}<span class="error-chip">{family}</span>{/each}</div>
                {/if}
              </div>
              <span class={rateClass(result.score, result.total)}>{rate(result.score, result.total)} %</span>
            </article>
          {/each}
        </div>
      {/if}
    </section>

    <section class="metric-grid" aria-label="Activité de la classe">
      <div class="card compact metric-card" style="--metric:#5d55c8;"><span>Élèves suivis</span><strong>{data.students.length}</strong><small class="muted">identités actives</small></div>
      <div class="card compact metric-card" style="--metric:#29866a;"><span>Actifs aujourd’hui</span><strong>{activeToday}</strong><small class="muted">élèves avec une tentative</small></div>
      <div class="card compact metric-card" style="--metric:#d48b2d;"><span>Réussite moyenne</span><strong>{classAverage} %</strong><small class="muted">sur les résultats chargés</small></div>
      <div class="card compact metric-card" style="--metric:#d45d61;"><span>Traces enregistrées</span><strong>{data.results.length}</strong><small class="muted">tentatives récentes</small></div>
    </section>

    <section class="card filter-bar no-print" aria-labelledby="evidence-title">
      <div>
        <h2 id="evidence-title" style="margin:0;">Explorer les preuves</h2>
        <p class="muted small" style="margin:.25rem 0 0;">Filtrez par élève ou par monde sans modifier les données.</p>
      </div>
      <div class="filter-controls">
        <label class="label" for="teacher-search">Élève<input id="teacher-search" class="input" bind:value={search} placeholder="Rechercher un prénom…" /></label>
        <label class="label" for="world-filter">Monde<select id="world-filter" class="select" bind:value={worldFilter}><option value="all">Tous les mondes</option>{#each availableWorlds as world}<option value={world}>{friendlyWorld(world)}</option>{/each}</select></label>
      </div>
    </section>

    <section class="card stack">
      <div class="mission-top"><h2 style="margin:0;">Tentatives récentes</h2><span class="small muted">{filteredResults.length} résultat{filteredResults.length > 1 ? 's' : ''}</span></div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Élève</th><th>Monde</th><th>Mission</th><th>Score</th><th>Erreurs observées</th><th>Date</th></tr></thead>
          <tbody>
            {#if filteredResults.length === 0}
              <tr><td colspan="6" class="center muted">Aucun résultat pour ces filtres.</td></tr>
            {:else}
              {#each filteredResults as result}
                <tr>
                  <td><strong>{result.studentName}</strong></td>
                  <td>{friendlyWorld(result.world)}</td>
                  <td>{result.mission}<br /><span class="muted small">score {result.scoreBasis === 'best' ? 'au meilleur essai' : 'du dernier essai'}</span></td>
                  <td><span class={rateClass(result.score, result.total)}>{result.score} / {result.total} · {rate(result.score, result.total)} %</span></td>
                  <td>{result.errorCount}{#if parseErrorFamilies(result.errorFamilies).length > 0}<div class="error-chips">{#each parseErrorFamilies(result.errorFamilies) as family}<span class="error-chip">{family}</span>{/each}</div>{/if}</td>
                  <td>{formatDate(result.createdAt)}</td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </section>

    <section class="teacher-split">
      <div class="card stack">
        <div><h2 style="margin:0;">Progression par mission</h2><p class="muted small">Meilleur essai, dernier essai et nombre de passages — sans comparaison entre élèves.</p></div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Élève</th><th>Monde / mission</th><th>Meilleur</th><th>Dernier</th><th>Passages</th></tr></thead>
            <tbody>
              {#if data.progress.length === 0}<tr><td colspan="5" class="center muted">La progression apparaîtra après les premières activités.</td></tr>{/if}
              {#each data.progress as progress}
                <tr>
                  <td><strong>{progress.studentName}</strong></td>
                  <td>{friendlyWorld(progress.world)}<br /><span class="small muted">{progress.mission}</span></td>
                  <td>{progress.bestScore} / {progress.total}</td>
                  <td>{progress.lastScore} / {progress.total}</td>
                  <td>{progress.completions}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <aside class="card stack no-print">
        <div><h2 style="margin:0;">Carnet d’intervention</h2><p class="muted small">Une mémoire pédagogique privée pour préparer une relance.</p></div>
        {#if form?.message}<p class="feedback good" role="status">{form.message}</p>{/if}
        <form method="POST" action="?/addNote" class="stack">
          <label class="label">Élève concerné<select class="select" name="studentId"><option value="">Note générale</option>{#each data.students as student}<option value={student.id}>{student.displayName}</option>{/each}</select></label>
          <label class="label">Monde<select class="select" name="world"><option value="">Tous / non précisé</option>{#each worldDefinitions as world}<option value={world.id}>{world.shortTitle}</option>{/each}</select></label>
          <label class="label">Prochaine intervention<textarea class="textarea" name="body" required placeholder="Observation factuelle, relance prévue, matériel ou groupe de soutien…"></textarea></label>
          <button class="btn btn-primary" type="submit">Ajouter au carnet</button>
        </form>

        <div class="notes-list">
          {#if data.notes.length === 0}<p class="muted small">Aucune note pour le moment.</p>{/if}
          {#each data.notes as note}
            <article class="card compact note-card">
              <div class="mission-top"><strong>{note.studentName ?? 'Note générale'}</strong>{#if note.world}<span class="badge">{friendlyWorld(note.world)}</span>{/if}</div>
              <p>{note.body}</p>
              <p class="muted small">{formatDate(note.createdAt)}</p>
            </article>
          {/each}
        </div>
      </aside>
    </section>
  </main>
</div>
