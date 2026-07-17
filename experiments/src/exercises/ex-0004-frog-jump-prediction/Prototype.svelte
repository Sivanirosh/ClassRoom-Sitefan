<script lang="ts">
  import { onDestroy, tick } from 'svelte';

  type View = 'intro' | 'active' | 'success' | 'complete';
  type Mode = 'tutorial' | 'prediction';
  type Orientation = 'horizontal' | 'vertical';
  type MessageKind = 'instruction' | 'action' | 'error';
  type Outcome = 'idle' | 'short' | 'exact' | 'over';

  type Scene = {
    id: string;
    chapter: string;
    title: string;
    prompt: string;
    mode: Mode;
    orientation: Orientation;
    targetUnits: number;
    obstacleUnits: number[];
    smokeErrorValue?: number;
  };

  type Point = { x: number; y: number };
  type Trace = { from: number; to: number; distance: 1 | 2 };

  const scenes: Scene[] = [
    {
      id: 'tutorial',
      chapter: 'Tutoriel',
      title: 'Découvre l’unité-saut',
      prompt: 'Touche la grenouille : chaque saut avance exactement de la même longueur.',
      mode: 'tutorial',
      orientation: 'horizontal',
      targetUnits: 4,
      obstacleUnits: []
    },
    {
      id: 'horizontal',
      chapter: 'Prédiction',
      title: 'Atteins la rive',
      prompt: 'Prévois le nombre de sauts avant de voir la trace.',
      mode: 'prediction',
      orientation: 'horizontal',
      targetUnits: 5,
      obstacleUnits: [],
      smokeErrorValue: 3
    },
    {
      id: 'vertical',
      chapter: 'Direction orthogonale',
      title: 'Monte jusqu’à la rive',
      prompt: 'Chaque côté de carré vaut toujours une unité-saut. Combien de sauts vers le haut ?',
      mode: 'prediction',
      orientation: 'vertical',
      targetUnits: 6,
      obstacleUnits: []
    },
    {
      id: 'obstacle',
      chapter: 'Saut double',
      title: 'Passe au-dessus',
      prompt: 'La grenouille orange oblige un saut de deux unités en une seule action. Combien d’actions faut-il ?',
      mode: 'prediction',
      orientation: 'horizontal',
      targetUnits: 6,
      obstacleUnits: [3]
    }
  ];

  let view: View = 'intro';
  let sceneIndex = 0;
  let coveredUnits = 0;
  let executedActions = 0;
  let prediction: number | null = null;
  let predictionText = '';
  let trace: Trace[] = [];
  let running = false;
  let outcome: Outcome = 'idle';
  let message = '';
  let messageKind: MessageKind = 'instruction';
  let announcement = '';
  let errorProbeCompleted = false;
  let rootElement: HTMLElement;
  let timer: ReturnType<typeof setTimeout> | undefined;

  $: scene = scenes[sceneIndex];
  $: requiredActions = calculateRequiredActions(scene);
  $: originPoint = originFor(scene);
  $: finishPoint = pointAt(scene.targetUnits, scene);
  $: unitReferenceStart = unitReferenceStartFor(scene);
  $: unitReferenceEnd = {
    x: unitReferenceStart.x + vectorFor(scene).x,
    y: unitReferenceStart.y + vectorFor(scene).y
  };
  $: unitReferenceLabel = scene.orientation === 'horizontal'
    ? { x: unitReferenceStart.x + 5, y: unitReferenceStart.y - 5 }
    : { x: unitReferenceStart.x - 13, y: unitReferenceStart.y - 4 };
  $: frogPoint = pointAt(coveredUnits, scene);
  $: smokeState = view === 'intro' ? 'ready' : view === 'active' ? 'active' : view === 'success' ? 'success' : 'complete';
  $: smokeSuccessPlan = view === 'active'
    ? scene.mode === 'tutorial'
      ? 'jump,jump,jump,jump'
      : 'prediction'
    : undefined;
  $: smokeErrorPlan = view === 'active' && scene.id === 'horizontal' && !errorProbeCompleted
    ? 'prediction'
    : undefined;
  $: smokeRecoveryPlan = view === 'active' && scene.id === 'horizontal' && !errorProbeCompleted
    ? 'retry'
    : undefined;
  $: smokePredictionValue = scene.id === 'horizontal' && !errorProbeCompleted
    ? String(scene.smokeErrorValue)
    : String(requiredActions);

  onDestroy(clearTimer);

  function calculateRequiredActions(current: Scene): number {
    let units = 0;
    let actions = 0;
    while (units < current.targetUnits) {
      units += current.obstacleUnits.includes(units + 1) ? 2 : 1;
      actions += 1;
    }
    return actions;
  }

  function vectorFor(current: Scene): Point {
    return current.orientation === 'horizontal' ? { x: 10, y: 0 } : { x: 0, y: -10 };
  }

  function originFor(current: Scene): Point {
    return current.orientation === 'horizontal' ? { x: 20, y: 60 } : { x: 60, y: 80 };
  }

  function unitReferenceStartFor(current: Scene): Point {
    return current.orientation === 'horizontal' ? { x: 20, y: 30 } : { x: 30, y: 80 };
  }

  function pointAt(units: number, current = scene): Point {
    const origin = originFor(current);
    const vector = vectorFor(current);
    return { x: origin.x + vector.x * units, y: origin.y + vector.y * units };
  }

  function traceWidth(item: Trace): number {
    return item.distance === 2 ? 3.2 : 2.4;
  }

  function clearTimer(): void {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function baseMessage(current: Scene): string {
    if (current.mode === 'tutorial') {
      return 'Chaque côté de carré vaut une unité-saut. Touche la grenouille pour voir cette unité se répéter sur la grille.';
    }
    if (current.obstacleUnits.length > 0) {
      return 'Entre le nombre d’actions. Un saut ordinaire couvre une unité; le saut au-dessus de la grenouille orange en couvre deux.';
    }
    return 'Chaque côté de carré vaut une unité-saut. Projette les sauts jusqu’à l’Arrivée, puis entre un nombre entier.';
  }

  function loadScene(index: number): void {
    clearTimer();
    sceneIndex = index;
    coveredUnits = 0;
    executedActions = 0;
    prediction = null;
    predictionText = '';
    trace = [];
    running = false;
    outcome = 'idle';
    message = baseMessage(scenes[index]);
    messageKind = 'instruction';
    errorProbeCompleted = false;
    view = 'active';
  }

  async function start(): Promise<void> {
    loadScene(0);
    announcement = 'Tutoriel chargé. La grenouille attend au Départ.';
    await focus('#scene-title');
  }

  function nextDistance(fromUnits: number): 1 | 2 {
    return scene.obstacleUnits.includes(fromUnits + 1) ? 2 : 1;
  }

  async function tutorialJump(): Promise<void> {
    if (running || scene.mode !== 'tutorial') return;
    const distance = nextDistance(coveredUnits);
    const next = coveredUnits + distance;
    trace = [...trace, { from: coveredUnits, to: next, distance }];
    coveredUnits = next;
    executedActions += 1;

    if (coveredUnits === scene.targetUnits) {
      outcome = 'exact';
      message = `${executedActions} sauts identiques relient exactement le Départ à l’Arrivée.`;
      messageKind = 'action';
      view = 'success';
      announcement = `Tutoriel terminé. ${message}`;
      await focus('[data-smoke-feedback="success"]');
      return;
    }

    message = `Saut ${executedActions} : la grenouille a avancé d’une unité-saut complète.`;
    messageKind = 'action';
    announcement = message;
  }

  function handlePredictionInput(event: Event): void {
    if (running || outcome !== 'idle') return;
    const input = event.currentTarget as HTMLInputElement;
    predictionText = input.value.replace(/\D/g, '').slice(0, 1);
    input.value = predictionText;
    if (!/^[1-9]$/.test(predictionText)) return;
    void executePrediction(Number(predictionText));
  }

  async function executePrediction(value: number): Promise<void> {
    clearTimer();
    prediction = value;
    running = true;
    coveredUnits = 0;
    executedActions = 0;
    trace = [];
    outcome = 'idle';
    message = `Prédiction engagée : ${value} saut${value > 1 ? 's' : ''}. Observe la chaîne automatique.`;
    messageKind = 'action';
    announcement = message;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      for (let index = 0; index < value; index += 1) advanceAutomaticStep();
      await resolvePrediction();
      return;
    }

    runAnimatedStep(value);
  }

  function runAnimatedStep(total: number): void {
    if (executedActions >= total) {
      void resolvePrediction();
      return;
    }
    advanceAutomaticStep();
    announcement = `Saut ${executedActions} sur ${total}.`;
    timer = setTimeout(() => runAnimatedStep(total), 260);
  }

  function advanceAutomaticStep(): void {
    const distance = nextDistance(coveredUnits);
    const next = coveredUnits + distance;
    trace = [...trace, { from: coveredUnits, to: next, distance }];
    coveredUnits = next;
    executedActions += 1;
  }

  async function resolvePrediction(): Promise<void> {
    clearTimer();
    running = false;

    if (coveredUnits === scene.targetUnits) {
      outcome = 'exact';
      message = scene.obstacleUnits.length > 0
        ? `${prediction} actions atteignent exactement l’Arrivée : le saut double a couvert deux unités en une action.`
        : `${prediction} sauts atteignent exactement l’Arrivée.`;
      messageKind = 'action';
      view = 'success';
      announcement = `Arrivée exacte. ${message}`;
      await focus('[data-smoke-feedback="success"]');
      return;
    }

    outcome = coveredUnits < scene.targetUnits ? 'short' : 'over';
    message = outcome === 'short'
      ? `${prediction} saut${prediction === 1 ? '' : 's'} ne suffisent pas : la grenouille s’arrête avant l’Arrivée. Observe l’écart restant.`
      : `${prediction} sauts vont trop loin : la grenouille dépasse l’Arrivée. Observe la distance dépassée.`;
    messageKind = 'error';
    announcement = message;
    await focus('[data-smoke-feedback="error"]');
  }

  async function retry(): Promise<void> {
    if (running || outcome === 'idle') return;
    if (scene.id === 'horizontal') errorProbeCompleted = true;
    coveredUnits = 0;
    executedActions = 0;
    prediction = null;
    predictionText = '';
    trace = [];
    outcome = 'idle';
    message = 'La trace est retirée. Observe encore l’unité et la longueur, puis engage une nouvelle prédiction.';
    messageKind = 'instruction';
    announcement = message;
    await focus('[data-smoke-control="prediction"]');
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      view = 'complete';
      announcement = 'Le graybox des sauts est terminé.';
      await focus('[data-smoke-completion]');
      return;
    }
    const nextIndex = sceneIndex + 1;
    loadScene(nextIndex);
    announcement = `${scenes[nextIndex].chapter}. Nouveau passage chargé.`;
    await focus('#scene-title');
  }

  async function restart(): Promise<void> {
    clearTimer();
    view = 'intro';
    sceneIndex = 0;
    coveredUnits = 0;
    trace = [];
    announcement = 'Retour à la présentation du jeu.';
    await focus('#intro-title');
  }
</script>

<svelte:head>
  <title>Le saut juste · EX-0004</title>
  <meta name="description" content="Graybox de prédiction : engager un nombre de sauts et observer l’arrivée." />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-root
  data-smoke-exercise="EX-0004"
  data-smoke-program="pilot-seq-m1"
  data-smoke-state={smokeState}
  data-smoke-success-plan={smokeSuccessPlan}
  data-smoke-error-plan={smokeErrorPlan}
  data-smoke-recovery-plan={smokeRecoveryPlan}
  bind:this={rootElement}
>
  <p class="sr-only" aria-live="polite">{announcement}</p>

  {#if view === 'intro'}
    <section class="intro" aria-labelledby="intro-title">
      <div class="intro-mark" aria-hidden="true"><span>●</span><i></i><span>●</span></div>
      <p class="kicker">EX-0004 · Graybox</p>
      <h1 id="intro-title" tabindex="-1">Le saut<br /><em>juste</em></h1>
      <p class="lead">Découvre la longueur d’un saut. Ensuite, prévois combien de sauts conduiront exactement du Départ à l’Arrivée.</p>
      <button class="primary" type="button" data-smoke-action="start" onclick={start}>Jouer <span aria-hidden="true">→</span></button>
      <p class="boundary">Tutoriel court · prédictions entières · aucun chronomètre</p>
    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <header class="topbar">
        <strong><span aria-hidden="true">●</span> Le saut juste</strong>
        <p><span>{scene.chapter}</span><b>{sceneIndex + 1} / {scenes.length}</b></p>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <header class="scene-copy">
          <p class="kicker">{scene.chapter}</p>
          <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
          <p>{scene.prompt}</p>
        </header>

        <section class="playfield" aria-label={`Grille unitaire, trajet ${scene.orientation === 'vertical' ? 'vertical' : 'horizontal'} : ${coveredUnits} unités parcourues`}>
          <svg viewBox="0 0 120 100" role="img" aria-labelledby="path-title path-desc">
            <title id="path-title">Trajet de la grenouille</title>
            <desc id="path-desc">La grenouille a exécuté {executedActions} action{executedActions === 1 ? '' : 's'} et parcouru {coveredUnits} unité{coveredUnits === 1 ? '' : 's'}.</desc>

            <defs>
              <pattern id={`unit-grid-${scene.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8eae96" stroke-width="0.7"></path>
              </pattern>
            </defs>
            <rect class="grid-surface" width="120" height="100" fill={`url(#unit-grid-${scene.id})`}></rect>
            <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>

            <g class="unit-reference" aria-label="Un côté de carré vaut une unité-saut">
              <line x1={unitReferenceStart.x} y1={unitReferenceStart.y} x2={unitReferenceEnd.x} y2={unitReferenceEnd.y}></line>
              <circle cx={unitReferenceStart.x} cy={unitReferenceStart.y} r="1.5"></circle>
              <circle cx={unitReferenceEnd.x} cy={unitReferenceEnd.y} r="1.5"></circle>
              <text x={unitReferenceLabel.x} y={unitReferenceLabel.y}>1 carré = 1 unité-saut</text>
            </g>

            <g class="marker origin-marker">
              <circle cx={originPoint.x} cy={originPoint.y} r="2.8"></circle>
              <text x={originPoint.x} y={originPoint.y + 10}>Départ</text>
            </g>
            <g class="marker finish-marker">
              <circle cx={finishPoint.x} cy={finishPoint.y} r="3.6"></circle>
              <text x={finishPoint.x + (scene.orientation === 'vertical' ? 12 : 0)} y={finishPoint.y + (scene.orientation === 'vertical' ? 1 : 10)}>Arrivée</text>
            </g>

            {#each trace as item}
              {@const from = pointAt(item.from, scene)}
              {@const to = pointAt(item.to, scene)}
              <line class:double={item.distance === 2} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
              <circle class="landing" cx={to.x} cy={to.y} r="1.7"></circle>
            {/each}

            {#each scene.obstacleUnits as units}
              {@const obstacle = pointAt(units, scene)}
              <g class="obstacle" transform={`translate(${obstacle.x} ${obstacle.y})`} aria-label="Grenouille orange à franchir par un saut de deux unités">
                <circle r="5"></circle><circle cx="-2.1" cy="-3.4" r="1.4"></circle><circle cx="2.1" cy="-3.4" r="1.4"></circle>
                <text y="10">2 unités</text>
              </g>
            {/each}

            <g class:short={outcome === 'short'} class:over={outcome === 'over'} class:running class="frog" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label={`Grenouille après ${executedActions} action${executedActions === 1 ? '' : 's'}`}>
              <ellipse rx="5.8" ry="4.6"></ellipse>
              <circle cx="-2.4" cy="-3.8" r="1.7"></circle><circle cx="2.4" cy="-3.8" r="1.7"></circle>
              <circle class="eye" cx="-2.4" cy="-3.8" r="0.55"></circle><circle class="eye" cx="2.4" cy="-3.8" r="0.55"></circle>
              <path d="M -2.2 1 Q 0 2.4 2.2 1"></path>
            </g>
            {#if scene.mode === 'tutorial'}
              <foreignObject x={frogPoint.x - 9} y={frogPoint.y - 9} width="18" height="18">
                <button class="world-frog-control" type="button" data-smoke-control="jump" onclick={tutorialJump} aria-label="Toucher la grenouille pour lui faire faire un saut d’une unité"></button>
              </foreignObject>
            {/if}
          </svg>
        </section>

        {#if scene.mode === 'tutorial'}
          <div class="tutorial-control">
            <strong>Touche directement la grenouille dans le paysage.</strong>
            <p>{executedActions} saut{executedActions === 1 ? '' : 's'} observé{executedActions === 1 ? '' : 's'}</p>
          </div>
        {:else}
          <div class="prediction-panel">
            <label for="prediction">{scene.obstacleUnits.length > 0 ? 'Combien d’actions faut-il ?' : 'Combien de sauts faut-il ?'}</label>
            <div class="prediction-entry">
              <input
                id="prediction"
                type="text"
                inputmode="numeric"
                pattern="[1-9]"
                maxlength="1"
                autocomplete="off"
                value={predictionText}
                aria-describedby="prediction-help"
                data-smoke-control="prediction"
                data-smoke-input-value={smokePredictionValue}
                oninput={handlePredictionInput}
                disabled={running || outcome !== 'idle'}
              />
              <span>{scene.obstacleUnits.length > 0 ? `action${predictionText === '1' ? '' : 's'}` : `saut${predictionText === '1' ? '' : 's'}`}</span>
            </div>
            <p id="prediction-help">Entre un chiffre : la chaîne démarre automatiquement.</p>
            {#if running}
              <p class="running-copy" role="status">Exécution : {executedActions} / {prediction} actions</p>
            {/if}
          </div>
        {/if}

        <div
          class:error={messageKind === 'error'}
          class="world-message"
          role="status"
          tabindex="-1"
          data-smoke-feedback={messageKind === 'error' ? 'error' : undefined}
          data-smoke-feedback-detail={messageKind === 'error' ? 'true' : undefined}
        >
          <span aria-hidden="true">{messageKind === 'error' ? '!' : '•'}</span><p>{message}</p>
        </div>

        {#if outcome === 'short' || outcome === 'over'}
          <button class="retry" type="button" data-smoke-control="retry" onclick={retry}>Réessayer avec un autre nombre</button>
        {/if}
      </section>
    </div>
  {:else if view === 'success'}
    <section class="success" aria-labelledby="success-title">
      <p class="kicker">Arrivée exacte</p>
      <div class="success-map" aria-label={`Trace finale : ${executedActions} actions pour ${scene.targetUnits} unités`}>
        <svg viewBox="0 0 120 100" role="img" aria-label="La trace complète sur la grille unitaire se termine exactement à l’Arrivée">
          <defs>
            <pattern id={`success-grid-${scene.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8eae96" stroke-width="0.7"></path>
            </pattern>
          </defs>
          <rect class="grid-surface" width="120" height="100" fill={`url(#success-grid-${scene.id})`}></rect>
          <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
          <circle class="success-origin" cx={originPoint.x} cy={originPoint.y} r="3"></circle>
          <circle class="success-finish" cx={finishPoint.x} cy={finishPoint.y} r="4"></circle>
          {#each trace as item}
            {@const from = pointAt(item.from, scene)}
            {@const to = pointAt(item.to, scene)}
            <line class:double={item.distance === 2} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
            <circle class="landing" cx={to.x} cy={to.y} r="1.7"></circle>
          {/each}
          {#each scene.obstacleUnits as units}
            {@const obstacle = pointAt(units, scene)}
            <g class="obstacle" transform={`translate(${obstacle.x} ${obstacle.y})`} aria-label="Obstacle conservé">
              <circle r="5"></circle><circle cx="-2.1" cy="-3.4" r="1.4"></circle><circle cx="2.1" cy="-3.4" r="1.4"></circle>
            </g>
          {/each}
          <g class="frog" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label="Grenouille exactement à l’Arrivée">
            <ellipse rx="5.8" ry="4.6"></ellipse>
            <circle cx="-2.4" cy="-3.8" r="1.7"></circle><circle cx="2.4" cy="-3.8" r="1.7"></circle>
            <circle class="eye" cx="-2.4" cy="-3.8" r="0.55"></circle><circle class="eye" cx="2.4" cy="-3.8" r="0.55"></circle>
            <path d="M -2.2 1 Q 0 2.4 2.2 1"></path>
          </g>
        </svg>
      </div>
      <h1 id="success-title" tabindex="-1">La dernière action tombe exactement sur l’Arrivée.</h1>
      <p class="success-feedback" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true">{message}</p>
      {#if scene.id === 'obstacle'}
        <p class="composition"><strong>5 actions</strong> ont couvert <strong>6 unités</strong> : une action en a couvert deux.</p>
      {/if}
      <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>
        {sceneIndex === scenes.length - 1 ? 'Terminer' : 'Passage suivant'} <span aria-hidden="true">→</span>
      </button>
    </section>
  {:else}
    <section class="complete" aria-labelledby="complete-title" tabindex="-1" data-smoke-completion>
      <p class="kicker">Graybox terminé</p>
      <h1 id="complete-title">Quatre passages observables sont prêts au replay.</h1>
      <p>Le tutoriel, les deux directions orthogonales et le saut double ont été traversés sans chronomètre ni précision motrice.</p>
      <button class="secondary" type="button" onclick={restart}>Recommencer le test</button>
      <p class="boundary">Réussite technique ≠ validation pédagogique ou autorité d’expansion.</p>
    </section>
  {/if}
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(body) { margin: 0; background: #eff5ed; color: #173128; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  :global(button), :global(input) { font: inherit; }
  :global(button:focus-visible), :global(input:focus-visible), [tabindex="-1"]:focus-visible { outline: 3px solid #175f4c; outline-offset: 3px; }
  .prototype-root { min-height: 100vh; background: radial-gradient(circle at 70% 0%, #fff9d9 0, transparent 32%), #eff5ed; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .intro, .success, .complete { width: min(760px, calc(100% - 32px)); min-height: 100vh; margin: auto; display: grid; align-content: center; justify-items: start; gap: 18px; padding: 48px 0; }
  .intro-mark { display: flex; align-items: center; width: min(260px, 75vw); color: #218269; }
  .intro-mark span { font-size: 34px; }
  .intro-mark i { flex: 1; border-top: 5px dashed #d99b35; }
  .kicker { margin: 0; color: #9b5720; font-size: .78rem; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
  h1 { margin: 0; max-width: 780px; font-size: clamp(2.25rem, 7vw, 5.4rem); line-height: .95; letter-spacing: -.055em; }
  h1 em { color: #1f8067; font-family: Georgia, serif; font-weight: 500; }
  .lead { max-width: 620px; margin: 0; color: #425a51; font-size: clamp(1rem, 2vw, 1.3rem); line-height: 1.65; }
  .primary, .secondary, .retry { min-height: 48px; border-radius: 999px; padding: 13px 20px; font-weight: 850; cursor: pointer; }
  .primary { border: 0; background: #173128; color: white; box-shadow: 0 8px 0 #c1cfbd; }
  .secondary, .retry { border: 2px solid #173128; background: white; color: #173128; }
  .boundary { margin: 0; color: #66766f; font-size: .84rem; }
  .game-shell { min-height: 100vh; }
  .topbar { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px clamp(16px, 4vw, 52px); border-bottom: 1px solid #cbd8c7; background: rgba(255,255,255,.76); }
  .topbar strong { display: flex; gap: 9px; align-items: center; }
  .topbar strong span { color: #218269; }
  .topbar p { display: flex; gap: 12px; margin: 0; font-size: .84rem; }
  .topbar p span { color: #66766f; }
  .scene { width: min(980px, calc(100% - 32px)); margin: auto; padding: 34px 0 56px; }
  .scene-copy { display: grid; gap: 9px; margin-bottom: 20px; }
  .scene-copy h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .scene-copy > p:last-child { max-width: 700px; margin: 0; color: #4f635b; line-height: 1.5; }
  .playfield { width: min(760px, 100%); margin-inline: auto; overflow: hidden; border: 2px solid #9bb5a2; border-radius: 24px; background: #e9f5df; box-shadow: 0 8px 0 #cfddca; }
  svg { display: block; width: 100%; }
  .playfield svg { aspect-ratio: 6 / 5; }
  .target-line { stroke: #64766d; stroke-width: 1.8; stroke-linecap: round; }
  .unit-reference line { stroke: #a75b26; stroke-width: 1.3; stroke-dasharray: 2 1; }
  .unit-reference circle { fill: #a75b26; }
  .unit-reference text { fill: #7a431d; font-size: 3.2px; font-weight: 800; text-anchor: middle; }
  .marker circle { fill: white; stroke: #173128; stroke-width: 1.5; }
  .marker text { fill: #173128; font-size: 3.6px; font-weight: 900; text-anchor: middle; }
  .finish-marker circle { fill: #ffd66b; }
  .completed-line { stroke: #e7b443; stroke-linecap: round; }
  .completed-line.double { stroke: #df742e; stroke-dasharray: 3 1; }
  .landing { fill: #fff5c9; stroke: #875322; stroke-width: .7; }
  .frog { color: #173128; transition: transform 240ms ease; }
  .frog ellipse, .frog > circle { fill: #36a87c; stroke: #173128; stroke-width: .65; }
  .frog .eye { fill: #173128; stroke: none; }
  .frog path { fill: none; stroke: #173128; stroke-width: .65; }
  .frog.short { animation: worried .35s ease 2; }
  .frog.over { animation: splash .45s ease 1; }
  .obstacle > circle { fill: #ef8c45; stroke: #713b1d; stroke-width: .7; }
  .obstacle text { fill: #713b1d; font-size: 3.1px; font-weight: 900; text-anchor: middle; }
  .world-frog-control { width: 100%; height: 100%; border: 2px solid transparent; border-radius: 50%; background: transparent; cursor: pointer; }
  .world-frog-control:hover { border-color: rgba(23,49,40,.45); background: rgba(255,255,255,.18); }
  .tutorial-control, .prediction-panel { display: grid; justify-items: center; gap: 10px; width: min(620px, 100%); margin: 22px auto 0; padding: 18px; border: 1px solid #c7d7c3; border-radius: 20px; background: rgba(255,255,255,.8); }
  .tutorial-control strong { text-align: center; }
  .tutorial-control p, .prediction-panel p { margin: 0; color: #5a6b64; font-size: .9rem; }
  .prediction-panel label { font-size: clamp(1.15rem, 3vw, 1.45rem); font-weight: 900; text-align: center; }
  .prediction-entry { display: flex; align-items: baseline; gap: 10px; }
  .prediction-entry input { width: 88px; min-height: 64px; border: 3px solid #1f8067; border-radius: 17px; background: white; color: #173128; font-size: 2.2rem; font-weight: 900; text-align: center; }
  .prediction-entry input:disabled { opacity: .72; }
  .prediction-entry span { font-weight: 800; }
  .running-copy { font-weight: 800; color: #1f8067 !important; }
  .world-message { min-height: 62px; display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 9px; max-width: 760px; margin: 18px auto 0; padding: 12px 15px; border: 1px solid #c4d4c0; border-radius: 16px; background: #fff; }
  .world-message > span { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: #dcebe0; font-weight: 950; }
  .world-message p { margin: 0; line-height: 1.42; }
  .world-message.error { border-color: #d78961; background: #fff6ed; }
  .world-message.error > span { background: #f5c49f; }
  .retry { display: block; margin: 14px auto 0; }
  .success, .complete { justify-items: center; text-align: center; }
  .success h1, .complete h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .success-map { width: min(560px, 100%); overflow: hidden; border: 2px solid #9bb5a2; border-radius: 22px; background: #e9f5df; box-shadow: 0 7px 0 #cfddca; }
  .success-map svg { width: 100%; aspect-ratio: 6 / 5; }
  .success-origin { fill: #fff; stroke: #173128; stroke-width: 1.4; }
  .success-finish { fill: #ffd66b; stroke: #173128; stroke-width: 1.4; }
  .success-feedback, .composition { max-width: 660px; margin: 0; line-height: 1.55; }
  .success-feedback { padding: 15px 18px; border-radius: 16px; background: #fff; border: 1px solid #c7d7c3; }
  .composition { color: #75431f; }
  @keyframes worried { 50% { filter: saturate(.45) brightness(1.15); } }
  @keyframes splash { 50% { opacity: .45; filter: hue-rotate(24deg); } }
  @media (prefers-reduced-motion: reduce) { .frog { transition: none; animation: none !important; } }
  @media (max-width: 520px) {
    .intro, .success, .complete { width: min(100% - 24px, 760px); padding: 34px 0; }
    .scene { width: min(100% - 20px, 980px); padding-top: 24px; }
    .topbar { padding: 10px 12px; }
    .topbar p span { display: none; }
    .playfield { border-radius: 18px; }
    .playfield svg, .success-map svg { aspect-ratio: 6 / 5; }
    .unit-reference text, .marker text, .obstacle text { font-size: 4.2px; }
    .tutorial-control, .prediction-panel { padding: 14px 10px; }
    .world-message { grid-template-columns: 28px minmax(0, 1fr); }
  }
</style>
