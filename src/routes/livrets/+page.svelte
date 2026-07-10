<script lang="ts">
  import { onMount } from 'svelte';
  import { getStudentName, submitActivityResult } from '$lib/client/activity';
  import FeedbackPanel from '$lib/components/FeedbackPanel.svelte';
  import MissionProgress from '$lib/components/MissionProgress.svelte';
  import MissionResult from '$lib/components/MissionResult.svelte';
  import WorldArt from '$lib/components/WorldArt.svelte';
  import WorldShell from '$lib/components/WorldShell.svelte';

  type Phase = 'setup' | 'play' | 'done';
  type ChallengeKind = 'product' | 'missing-factor';

  const TOTAL_QUESTIONS = 8;
  const tables = Array.from({ length: 11 }, (_, index) => index + 2);

  let phase: Phase = 'setup';
  let studentName = 'Explorateur';
  let selectedTables: number[] = [2, 5, 10];
  let questionNumber = 1;
  let score = 0;
  let factorA = 2;
  let factorB = 5;
  let expectedProduct = 10;
  let expectedAnswer = 10;
  let challengeKind: ChallengeKind = 'product';
  let typed = '';
  let answered = false;
  let wasCorrect = false;
  let feedbackTitle = '';
  let feedbackExplanation = '';
  let setupMessage = '';
  let showDots = false;
  let showTable = false;
  let supportsUsed = 0;
  let dotHelpCounted = false;
  let tableHelpCounted = false;
  let sentMessage = '';
  let finishing = false;
  let errorFamilies: string[] = [];

  onMount(() => {
    studentName = getStudentName();
  });

  function toggleTable(table: number) {
    selectedTables = selectedTables.includes(table)
      ? selectedTables.filter((item) => item !== table)
      : [...selectedTables, table].sort((a, b) => a - b);
    setupMessage = '';
  }

  function usePreset(nextTables: number[]) {
    selectedTables = nextTables;
    setupMessage = '';
  }

  function startMission() {
    if (selectedTables.length === 0) {
      setupMessage = 'Choisis au moins une table pour ouvrir l’atelier.';
      return;
    }

    phase = 'play';
    questionNumber = 1;
    score = 0;
    supportsUsed = 0;
    sentMessage = '';
    finishing = false;
    errorFamilies = [];
    loadQuestion();
  }

  function loadQuestion() {
    answered = false;
    wasCorrect = false;
    typed = '';
    feedbackTitle = '';
    feedbackExplanation = '';
    showDots = false;
    showTable = false;
    dotHelpCounted = false;
    tableHelpCounted = false;
    factorA = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    factorB = Math.floor(Math.random() * 10) + 1;
    expectedProduct = factorA * factorB;
    challengeKind = questionNumber > 1 && Math.random() < 0.35 ? 'missing-factor' : 'product';
    expectedAnswer = challengeKind === 'product' ? expectedProduct : factorB;
  }

  function pressKey(key: string) {
    if (answered) return;
    if (key === 'C') typed = '';
    else if (key === 'OK') validateAnswer();
    else if (typed.length < 3) typed += key;
  }

  function handleKeyboard(event: KeyboardEvent) {
    if (phase !== 'play' || answered) return;
    if (event.target instanceof HTMLElement && event.target.closest('button, input, select, textarea, a')) return;
    if (/^\d$/.test(event.key)) pressKey(event.key);
    else if (event.key === 'Backspace' || event.key === 'Delete') pressKey('C');
    else if (event.key === 'Enter') pressKey('OK');
  }

  function validateAnswer() {
    if (answered || typed === '') return;
    answered = true;
    const answer = Number.parseInt(typed, 10);
    wasCorrect = answer === expectedAnswer;

    if (wasCorrect) {
      score += 1;
      feedbackTitle = 'Bien vu ! Ton raisonnement tient debout.';
    } else {
      errorFamilies = [...errorFamilies, `table de ${factorA}`];
      feedbackTitle = 'Pas encore — regarde comment les groupes s’assemblent.';
    }

    feedbackExplanation = challengeKind === 'product'
      ? `${factorA} groupes de ${factorB}, cela fait ${factorA} × ${factorB} = ${expectedProduct}.`
      : `${expectedProduct} partagé en ${factorA} groupes donne ${factorB} dans chaque groupe. Donc ${factorA} × ${factorB} = ${expectedProduct}.`;
  }

  function toggleDots() {
    showDots = !showDots;
    if (showDots && !dotHelpCounted) {
      supportsUsed += 1;
      dotHelpCounted = true;
    }
  }

  function toggleTableHelp() {
    showTable = !showTable;
    if (showTable && !tableHelpCounted) {
      supportsUsed += 1;
      tableHelpCounted = true;
    }
  }

  function continueMission() {
    if (!answered || finishing) return;
    if (questionNumber >= TOTAL_QUESTIONS) {
      finishing = true;
      finishMission();
      return;
    }
    questionNumber += 1;
    loadQuestion();
  }

  async function finishMission() {
    phase = 'done';
    sentMessage = 'Ton résultat est gardé dans ton carnet…';
    const report = await submitActivityResult({
      studentName,
      world: 'livrets',
      mission: `Tables ${selectedTables.join(', ')}`,
      score,
      total: TOTAL_QUESTIONS,
      scoreBasis: 'last',
      errorCount: TOTAL_QUESTIONS - score,
      errorFamilies: Array.from(new Set(errorFamilies)),
      metadata: { supportsUsed }
    });
    sentMessage = report.message;
  }
</script>

<svelte:head>
  <title>L’Atelier des Livrets — Camp des Curieux</title>
  <meta name="description" content="Comprendre et entraîner les tables de multiplication avec des groupes visuels." />
</svelte:head>

<svelte:window on:keydown={handleKeyboard} />

<WorldShell world="livrets" {studentName} section={phase === 'play' ? `Défi ${questionNumber}/${TOTAL_QUESTIONS}` : ''}>
  {#if phase === 'setup'}
    <section class="world-hero">
      <div class="world-hero-copy">
        <p class="eyebrow">Comprendre avant de mémoriser</p>
        <h1>Bienvenue dans l’Atelier des Livrets</h1>
        <p>Assemble des groupes, repère les régularités et fabrique des tables qui ont du sens — pas seulement des réponses à réciter.</p>
        <div class="session-promise">
          <span class="promise-item"><strong>8</strong> petits défis</span>
          <span class="promise-item"><strong>2</strong> aides visuelles</span>
          <span class="promise-item">Environ <strong>6 min</strong></span>
        </div>
      </div>
      <div class="world-hero-art"><WorldArt world="livrets" /></div>
    </section>

    <section class="panel-card setup-panel stack-lg" aria-labelledby="table-choice-title">
      <div>
        <p class="eyebrow">Prépare ton établi</p>
        <h2 id="table-choice-title">Quelles tables veux-tu explorer ?</h2>
        <p>Le parcours « tranquille » est déjà prêt. Tu peux aussi composer ton propre mélange.</p>
      </div>

      <div class="quick-picks" aria-label="Choix rapides">
        <button type="button" on:click={() => usePreset([2, 5, 10])}>Tranquille · 2, 5, 10</button>
        <button type="button" on:click={() => usePreset([3, 4, 6])}>Constructeur · 3, 4, 6</button>
        <button type="button" on:click={() => usePreset([6, 7, 8, 9])}>Grand défi · 6 à 9</button>
      </div>

      <fieldset class="selection-group">
        <legend class="sr-only">Tables sélectionnées</legend>
        <div class="choice-grid table-pick-grid">
          {#each tables as table}
            <button
              class="choice-card table-pick"
              class:is-selected={selectedTables.includes(table)}
              type="button"
              aria-pressed={selectedTables.includes(table)}
              on:click={() => toggleTable(table)}
            >
              × {table}
            </button>
          {/each}
        </div>
      </fieldset>

      {#if setupMessage}<p class="feedback bad" role="alert">{setupMessage}</p>{/if}
      <div class="start-row"><button class="btn btn-primary btn-large" type="button" on:click={startMission}>Faire chauffer l’atelier <span aria-hidden="true">→</span></button></div>
    </section>
  {:else if phase === 'play'}
    <section class="mission-shell">
      <MissionProgress current={questionNumber} total={TOTAL_QUESTIONS} label="Assemblage" {score} />

      <div class="challenge-card">
        <p class="challenge-prompt">{challengeKind === 'product' ? 'Combien y en a-t-il en tout ?' : 'Quel nombre manque dans la machine ?'}</p>
        <div class="question-display">
          <strong>{challengeKind === 'product' ? `${factorA} × ${factorB}` : `${factorA} × ? = ${expectedProduct}`}</strong>
        </div>

        <div class:is-empty={!typed} class="answer-display" aria-live="polite">
          {typed || 'Ta réponse apparaîtra ici'}
        </div>

        <div class="help-row" aria-label="Aides facultatives">
          <button class="btn btn-quiet help-toggle" aria-pressed={showDots} type="button" on:click={toggleDots}>● Voir les groupes</button>
          <button class="btn btn-quiet help-toggle" aria-pressed={showTable} type="button" on:click={toggleTableHelp}>≡ Ouvrir la table</button>
        </div>

        {#if showDots}
          <aside class="help-card" aria-label={`Modèle de ${factorA} groupes de ${factorB}`}>
            <h3>{factorA} groupes de {factorB}</h3>
            <div class="array-model">
              {#each Array(factorA) as _}
                <span class="dot-group" aria-hidden="true">
                  {#each Array(factorB) as _}<span class="math-dot"></span>{/each}
                </span>
              {/each}
            </div>
            <p class="center small">Compte groupe par groupe, ou additionne {factorB} plusieurs fois.</p>
          </aside>
        {/if}

        {#if showTable}
          <aside class="help-card">
            <h3>La table de {factorA}</h3>
            <div class="times-table">
              {#each Array.from({ length: 10 }, (_, index) => index + 1) as row}
                <span class:is-current={row === factorB}>{factorA} × {row} = {factorA * row}</span>
              {/each}
            </div>
          </aside>
        {/if}

        {#if !answered}
          <div class="keypad" aria-label="Clavier numérique">
            {#each ['1','2','3','4','5','6','7','8','9','C','0','OK'] as key}
              <button
                class="choice-card"
                class:key-wide={key === 'C'}
                class:key-validate={key === 'OK'}
                type="button"
                on:click={() => pressKey(key)}
              >{key === 'C' ? 'Effacer' : key === 'OK' ? 'Valider' : key}</button>
            {/each}
          </div>
        {:else}
          <FeedbackPanel
            kind={wasCorrect ? 'correct' : 'incorrect'}
            title={feedbackTitle}
            explanation={feedbackExplanation}
            continueLabel={questionNumber === TOTAL_QUESTIONS ? 'Voir mon bilan' : 'Défi suivant'}
            on:continue={continueMission}
          />
        {/if}

        {#if supportsUsed > 0}<p class="support-used">{supportsUsed} aide{supportsUsed > 1 ? 's' : ''} consultée{supportsUsed > 1 ? 's' : ''} — utiliser une aide, c’est choisir une stratégie.</p>{/if}
      </div>
    </section>
  {:else}
    <MissionResult
      {score}
      total={TOTAL_QUESTIONS}
      title="L’atelier tourne rond !"
      message={score >= 7 ? 'Tes tables deviennent de vrais outils de calcul.' : 'Tu as repéré les assemblages à retravailler. Un deuxième passage les rendra déjà plus familiers.'}
      transmissionMessage={sentMessage}
    >
      <p slot="detail" class="small muted">Tables explorées : {selectedTables.join(', ')} · {supportsUsed} aide{supportsUsed > 1 ? 's' : ''} utilisée{supportsUsed > 1 ? 's' : ''}</p>
      <button class="btn btn-primary" type="button" on:click={startMission}>Refaire ce mélange</button>
      <button class="btn btn-quiet" type="button" on:click={() => (phase = 'setup')}>Changer de tables</button>
      <a class="btn btn-quiet" href="/">Retour à la carte</a>
    </MissionResult>
  {/if}
</WorldShell>
