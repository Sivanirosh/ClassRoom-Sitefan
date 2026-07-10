<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { getStudentName, submitActivityResult } from '$lib/client/activity';
  import FeedbackPanel from '$lib/components/FeedbackPanel.svelte';
  import MissionProgress from '$lib/components/MissionProgress.svelte';
  import MissionResult from '$lib/components/MissionResult.svelte';
  import WorldArt from '$lib/components/WorldArt.svelte';
  import WorldShell from '$lib/components/WorldShell.svelte';

  type Phase = 'setup' | 'play' | 'done';
  type Level = 1 | 2 | 3;
  type DecimalQuestion = { left: string; right: string; operation: '+' | '-'; answer: number; level: Level };

  const TOTAL_QUESTIONS = 6;
  const levelDetails: Array<{ level: Level; name: string; description: string; example: string }> = [
    { level: 1, name: 'Premier repérage', description: 'Un entier et un nombre à une décimale.', example: '24 + 3,5' },
    { level: 2, name: 'Virgules alignées', description: 'Deux nombres avec des dixièmes.', example: '18,4 − 7,2' },
    { level: 3, name: 'Précision fine', description: 'Des centièmes à bien placer.', example: '12,45 + 6,08' }
  ];

  let studentName = 'Explorateur';
  let phase: Phase = 'setup';
  let selectedLevel: Level = 1;
  let questionNumber = 1;
  let score = 0;
  let current: DecimalQuestion = { left: '24', right: '3.5', operation: '+', answer: 27.5, level: 1 };
  let answerInput = '';
  let inputError = '';
  let answered = false;
  let wasCorrect = false;
  let feedbackTitle = '';
  let feedbackExplanation = '';
  let showAlignmentHint = false;
  let hintsUsed = 0;
  let hintCounted = false;
  let sentMessage = '';
  let finishing = false;
  let errorFamilies: string[] = [];
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let drawing = false;

  onMount(() => {
    studentName = getStudentName();
    const resize = () => setupCanvas();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  function setupCanvas() {
    if (!canvas || !canvas.isConnected) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(300, Math.round(rect.height * ratio));
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.strokeStyle = '#87c9ff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function pointerPosition(event: PointerEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function startDraw(event: PointerEvent) {
    if (!ctx) return;
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    const pos = pointerPosition(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function stopDraw() {
    drawing = false;
    ctx?.beginPath();
  }

  function draw(event: PointerEvent) {
    if (!drawing || !ctx) return;
    event.preventDefault();
    const pos = pointerPosition(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function clearCanvas() {
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  async function startMission() {
    phase = 'play';
    questionNumber = 1;
    score = 0;
    hintsUsed = 0;
    sentMessage = '';
    finishing = false;
    errorFamilies = [];
    loadQuestion();
    await tick();
    setupCanvas();
  }

  function decimal(min: number, max: number, digits: number): string {
    return (Math.random() * (max - min) + min).toFixed(digits);
  }

  function loadQuestion() {
    answered = false;
    wasCorrect = false;
    inputError = '';
    feedbackTitle = '';
    feedbackExplanation = '';
    answerInput = '';
    showAlignmentHint = false;
    hintCounted = false;
    const operation: '+' | '-' = Math.random() > 0.5 ? '+' : '-';
    let left = '0';
    let right = '0';

    if (selectedLevel === 1) {
      left = Math.random() > 0.5 ? decimal(10, 60, 1) : Math.floor(Math.random() * 80 + 20).toString();
      right = Math.random() > 0.5 ? decimal(1, 20, 1) : Math.floor(Math.random() * 20 + 2).toString();
    } else if (selectedLevel === 2) {
      left = decimal(10, 60, 1);
      right = decimal(5, 45, 1);
    } else {
      left = decimal(10, 60, 2);
      right = decimal(5, 45, 2);
    }

    if (operation === '-' && Number(left) < Number(right)) [left, right] = [right, left];

    const precision = selectedLevel === 3 ? 2 : 1;
    const answer = operation === '+' ? Number(left) + Number(right) : Number(left) - Number(right);
    current = { left, right, operation, answer: Number(answer.toFixed(precision)), level: selectedLevel };
    clearCanvas();
  }

  function frenchNumber(value: number | string): string {
    return String(value).replace('.', ',');
  }

  function alignedNumber(value: string): string {
    if (value.includes('.')) return frenchNumber(value);
    return selectedLevel === 3 ? `${value},00` : `${value},0`;
  }

  function toggleHint() {
    showAlignmentHint = !showAlignmentHint;
    if (showAlignmentHint && !hintCounted) {
      hintsUsed += 1;
      hintCounted = true;
    }
  }

  function validateAnswer() {
    if (answered) return;
    const value = Number(answerInput.trim().replace(',', '.'));
    if (!Number.isFinite(value)) {
      inputError = 'Écris un nombre, avec une virgule si tu en as besoin.';
      return;
    }

    inputError = '';
    answered = true;
    wasCorrect = Math.abs(value - current.answer) < 0.001;
    if (wasCorrect) {
      score += 1;
      feedbackTitle = 'Exact ! Les rangs sont bien alignés.';
    } else {
      errorFamilies = [...errorFamilies, `niveau ${current.level}`];
      feedbackTitle = 'Observe la virgule : elle sert de point de repère.';
    }
    feedbackExplanation = `${frenchNumber(current.left)} ${current.operation} ${frenchNumber(current.right)} = ${frenchNumber(current.answer)}. Place toujours les unités sous les unités et les dixièmes sous les dixièmes.`;
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
      world: 'calculs',
      mission: `Décimaux niveau ${selectedLevel}`,
      score,
      total: TOTAL_QUESTIONS,
      scoreBasis: 'last',
      errorCount: TOTAL_QUESTIONS - score,
      errorFamilies: Array.from(new Set(errorFamilies)),
      metadata: { hintsUsed }
    });
    sentMessage = report.message;
  }
</script>

<svelte:head>
  <title>L’Observatoire du Calcul Décimal — Camp des Curieux</title>
  <meta name="description" content="Comprendre l’alignement des nombres décimaux avec une ardoise libre." />
</svelte:head>

<WorldShell world="calculs" {studentName} section={phase === 'play' ? `Calcul ${questionNumber}/${TOTAL_QUESTIONS}` : ''}>
  {#if phase === 'setup'}
    <section class="world-hero">
      <div class="world-hero-copy">
        <p class="eyebrow">L’observatoire des nombres</p>
        <h1>Vise juste avec les décimaux</h1>
        <p>La virgule est ton étoile polaire : aligne-la, estime le résultat, puis calcule avec ton ardoise si tu en as besoin.</p>
        <div class="session-promise">
          <span class="promise-item"><strong>6</strong> calculs</span>
          <span class="promise-item">Ardoise <strong>libre</strong></span>
          <span class="promise-item">Environ <strong>6 min</strong></span>
        </div>
      </div>
      <div class="world-hero-art"><WorldArt world="calculs" /></div>
    </section>

    <section class="panel-card setup-panel stack-lg">
      <div>
        <p class="eyebrow">Choisis ton point d’observation</p>
        <h2>Un concept à la fois</h2>
        <p>Commence au niveau qui te paraît juste. Tu pourras en changer après la session.</p>
      </div>
      <div class="choice-grid decimal-levels" role="radiogroup" aria-label="Niveau de calcul décimal">
        {#each levelDetails as item}
          <button
            class="choice-card decimal-level"
            class:is-selected={selectedLevel === item.level}
            type="button"
            role="radio"
            aria-checked={selectedLevel === item.level}
            on:click={() => (selectedLevel = item.level)}
          >
            <span class="decimal-level-number">{item.level}</span>
            <span><strong>{item.name}</strong><small>{item.description}<br />Ex. {item.example}</small></span>
          </button>
        {/each}
      </div>
      <div class="start-row"><button class="btn btn-primary btn-large" type="button" on:click={startMission}>Ouvrir l’observatoire <span aria-hidden="true">→</span></button></div>
    </section>
  {:else if phase === 'play'}
    <section class="mission-layout with-tool">
      <div class="mission-shell">
        <MissionProgress current={questionNumber} total={TOTAL_QUESTIONS} label="Calcul" {score} />
        <div class="challenge-card">
          <p class="challenge-prompt">Calcule en gardant la virgule comme repère</p>
          <div class="question-display"><strong>{frenchNumber(current.left)} {current.operation} {frenchNumber(current.right)}</strong></div>

          <label class="label center" for="decimal-answer">Ta réponse</label>
          <input
            id="decimal-answer"
            class="input calculation-input"
            class:is-wrong={Boolean(inputError)}
            bind:value={answerInput}
            disabled={answered}
            inputmode="decimal"
            autocomplete="off"
            placeholder="0,0"
            aria-describedby={inputError ? 'decimal-error' : undefined}
            on:keydown={(event) => event.key === 'Enter' && validateAnswer()}
          />
          {#if inputError}<p id="decimal-error" class="feedback bad" role="alert">{inputError}</p>{/if}

          <div class="help-row">
            <button class="btn btn-quiet help-toggle" type="button" aria-pressed={showAlignmentHint} on:click={toggleHint}>⌁ Voir l’alignement</button>
          </div>
          {#if showAlignmentHint}
            <aside class="help-card">
              <h3>Imagine des zéros pour aligner les rangs</h3>
              <div class="place-value-demo">
                <div class="place-value-row"><span>{alignedNumber(current.left)}</span><strong>{current.operation}</strong><span>{alignedNumber(current.right)}</span></div>
              </div>
              <p>La virgule reste dans la même colonne. Fais ensuite une estimation rapide avant de calculer.</p>
            </aside>
          {/if}

          {#if !answered}
            <button class="btn btn-primary btn-large" type="button" on:click={validateAnswer}>Vérifier mon calcul</button>
          {:else}
            <FeedbackPanel
              kind={wasCorrect ? 'correct' : 'incorrect'}
              title={feedbackTitle}
              explanation={feedbackExplanation}
              continueLabel={questionNumber === TOTAL_QUESTIONS ? 'Voir mon bilan' : 'Calcul suivant'}
              on:continue={continueMission}
            />
          {/if}
        </div>
      </div>

      <aside class="scratchpad">
        <div class="scratchpad-head">
          <div><h2>Ardoise facultative</h2><p>Pose ton calcul ou dessine ton idée.</p></div>
          <button class="btn dark" type="button" on:click={clearCanvas}>Effacer</button>
        </div>
        <canvas
          bind:this={canvas}
          class="canvas-board"
          aria-label="Ardoise de brouillon facultative pour poser le calcul"
          on:pointerdown={startDraw}
          on:pointerup={stopDraw}
          on:pointercancel={stopDraw}
          on:pointerleave={stopDraw}
          on:pointermove={draw}
        >Ton navigateur ne peut pas afficher l’ardoise. Tu peux tout de même répondre dans le champ principal.</canvas>
      </aside>
    </section>
  {:else}
    <MissionResult
      {score}
      total={TOTAL_QUESTIONS}
      title="Observation terminée !"
      message={score >= 5 ? 'Tu gardes bien les unités, dixièmes et centièmes dans leur trajectoire.' : 'Tu sais maintenant exactement où regarder : aligne d’abord les virgules, puis calcule.'}
      transmissionMessage={sentMessage}
    >
      <p slot="detail" class="small muted">Niveau {selectedLevel} · {hintsUsed} rappel{hintsUsed > 1 ? 's' : ''} d’alignement consulté{hintsUsed > 1 ? 's' : ''}</p>
      <button class="btn btn-primary" type="button" on:click={startMission}>Refaire ce niveau</button>
      <button class="btn btn-quiet" type="button" on:click={() => (phase = 'setup')}>Changer de niveau</button>
      <a class="btn btn-quiet" href="/">Retour à la carte</a>
    </MissionResult>
  {/if}
</WorldShell>
