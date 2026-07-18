<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import PondBoard from './PondBoard.svelte';
  import type { PondJourney, PondOutcome as Outcome, PondScene, PondTrace as Trace } from './PondBoard.svelte';
  import pondAtmosphere from './assets/pond-garden-atmosphere.webp';
  import pondIntro from './assets/pond-garden-intro.webp';
  import pondOutro from './assets/pond-garden-outro.webp';

  type View = 'intro' | 'active' | 'success' | 'complete';
  type MessageKind = 'instruction' | 'action' | 'error';

  type Scene = PondScene & {
    chapter: string;
    title: string;
    prompt: string;
    smokeErrorValue?: number;
  };

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
  let runGeneration = 0;
  let rootElement: HTMLElement;
  let timer: ReturnType<typeof setTimeout> | undefined;

  $: scene = scenes[sceneIndex];
  $: requiredActions = calculateRequiredActions(scene);
  $: pondJourney = {
    coveredUnits,
    executedActions,
    prediction,
    running,
    outcome,
    trace
  } satisfies PondJourney;
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

  onDestroy(invalidateRun);

  function calculateRequiredActions(current: Scene): number {
    let units = 0;
    let actions = 0;
    while (units < current.targetUnits) {
      units += current.obstacleUnits.includes(units + 1) ? 2 : 1;
      actions += 1;
    }
    return actions;
  }

  function clearTimer(): void {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }

  function invalidateRun(): void {
    runGeneration += 1;
    clearTimer();
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function baseMessage(current: Scene): string {
    if (current.mode === 'tutorial') {
      return 'Touche la grenouille pour voir son bond se répéter exactement jusqu’à l’Arrivée.';
    }
    if (current.obstacleUnits.length > 0) {
      return 'Entre le nombre d’actions. Un saut ordinaire couvre une unité; le saut au-dessus de la grenouille orange en couvre deux.';
    }
    return 'Projette les bonds jusqu’à l’Arrivée, puis entre un nombre entier.';
  }

  function loadScene(index: number): void {
    invalidateRun();
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
    if (predictionText === '0') {
      predictionText = '';
      input.value = '';
      message = 'Entre un chiffre de 1 à 9 : zéro saut ne fait pas avancer la grenouille.';
      messageKind = 'instruction';
      announcement = message;
      return;
    }
    if (!/^[1-9]$/.test(predictionText)) return;
    input.blur();
    void executePrediction(Number(predictionText));
  }

  async function executePrediction(value: number): Promise<void> {
    invalidateRun();
    const generation = runGeneration;
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
      await resolvePrediction(generation);
      return;
    }

    runAnimatedStep(value, generation);
  }

  function runAnimatedStep(total: number, generation: number): void {
    if (generation !== runGeneration || view !== 'active') return;
    if (executedActions >= total) {
      void resolvePrediction(generation);
      return;
    }
    advanceAutomaticStep();
    announcement = `Saut ${executedActions} sur ${total}.`;
    timer = setTimeout(() => {
      timer = undefined;
      runAnimatedStep(total, generation);
    }, 260);
  }

  function advanceAutomaticStep(): void {
    const distance = nextDistance(coveredUnits);
    const next = coveredUnits + distance;
    trace = [...trace, { from: coveredUnits, to: next, distance }];
    coveredUnits = next;
    executedActions += 1;
  }

  async function resolvePrediction(generation: number): Promise<void> {
    if (generation !== runGeneration || view !== 'active') return;
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
    invalidateRun();
    if (scene.id === 'horizontal') errorProbeCompleted = true;
    coveredUnits = 0;
    executedActions = 0;
    prediction = null;
    predictionText = '';
    trace = [];
    outcome = 'idle';
    message = `Le passage ${sceneIndex + 1} recommence ici. Observe encore l’unité et la longueur, puis engage une nouvelle prédiction.`;
    messageKind = 'instruction';
    announcement = `${scene.chapter}. ${message}`;
    await focus('[data-smoke-control="prediction"]');
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      view = 'complete';
      announcement = 'La traversée du jardin des unités est terminée.';
      await focus('[data-smoke-completion]');
      return;
    }
    const nextIndex = sceneIndex + 1;
    loadScene(nextIndex);
    announcement = `${scenes[nextIndex].chapter}. Nouveau passage chargé.`;
    await focus('#scene-title');
  }

  async function restart(): Promise<void> {
    invalidateRun();
    view = 'intro';
    sceneIndex = 0;
    coveredUnits = 0;
    trace = [];
    announcement = 'Retour à la présentation du jeu.';
    await focus('#intro-title');
  }
</script>

<svelte:head>
  <title>Le saut juste · Le jardin des unités</title>
  <meta name="description" content="Un jeu de prédiction calme dans un jardin-étang : mesure chaque trajet avec l’unité-saut." />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-root
  data-smoke-exercise="EX-0004"
  data-smoke-program="pilot-seq-m1"
  data-smoke-scene={scene.id}
  data-smoke-state={smokeState}
  data-smoke-success-plan={smokeSuccessPlan}
  data-smoke-error-plan={smokeErrorPlan}
  data-smoke-recovery-plan={smokeRecoveryPlan}
  bind:this={rootElement}
>
  <p class="sr-only" aria-live="polite">{announcement}</p>

  {#if view === 'intro'}
    <section class="intro" aria-labelledby="intro-title" data-visual-intro>
      <img class="generated-atmosphere" data-visual-role="pond-hero" src={pondIntro} alt="" aria-hidden="true" />
      <div class="intro-light" aria-hidden="true"></div>
      <div class="intro-copy">
        <p class="kicker">Prédire · bondir · atteindre</p>
        <h1 id="intro-title" tabindex="-1">Le saut<br /><em>juste</em></h1>
        <p class="lead">Au bord de l’étang, chaque carré donne le rythme. Découvre la longueur d’un saut, puis prévois le nombre d’actions qui mènera la grenouille exactement sur l’autre rive.</p>
        <button class="primary" type="button" data-smoke-action="start" onclick={start}>Commencer la traversée <span aria-hidden="true">→</span></button>
      </div>
    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <img class="world-atmosphere" src={pondAtmosphere} alt="" aria-hidden="true" />
      <header class="game-hud" data-game-hud>
        <p><strong>Le saut juste</strong></p>
        <div class="round-progress" aria-label={`Passage ${sceneIndex + 1} sur ${scenes.length} : ${scene.chapter}`}>
          {#each scenes as _progressScene, progressIndex}
            <span class:done={progressIndex < sceneIndex} class:current={progressIndex === sceneIndex}>{progressIndex + 1}</span>
          {/each}
        </div>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <header class="scene-heading">
          <p class="passage-label"><span>Passage 0{sceneIndex + 1}</span> {scene.chapter}</p>
          <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
          <p>{scene.prompt}</p>
        </header>

        <PondBoard {scene} journey={pondJourney} variant="active" onJump={tutorialJump} />

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
          <button class="retry" type="button" data-smoke-control="retry" onclick={retry}>Rejouer ce passage</button>
        {/if}
      </section>
    </div>
  {:else if view === 'success'}
    <section class="success" aria-labelledby="success-title">
      <img class="world-atmosphere" src={pondAtmosphere} alt="" aria-hidden="true" />
      <div class="success-seal" aria-hidden="true">✓</div>
      <div class="success-copy">
        <p class="kicker">Arrivée exacte</p>
        <h1 id="success-title" tabindex="-1">Le dernier saut rejoint la rive.</h1>
        <p class="success-feedback" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true">{message}</p>
        {#if scene.id === 'obstacle'}
          <p class="composition"><strong>5 actions</strong> ont couvert <strong>6 unités</strong> : le passage au-dessus de la grenouille orange compte comme une seule action de deux unités.</p>
        {/if}
        <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>
          {sceneIndex === scenes.length - 1 ? 'Quitter le jardin' : 'Passage suivant'} <span aria-hidden="true">→</span>
        </button>
      </div>

      <PondBoard {scene} journey={pondJourney} variant="success" />
    </section>
  {:else}
    <section class="complete" aria-labelledby="complete-title" tabindex="-1" data-smoke-completion>
      <img class="world-atmosphere outro-atmosphere" data-visual-role="pond-outro" src={pondOutro} alt="" aria-hidden="true" />
      <p class="kicker">Traversée terminée</p>
      <h1 id="complete-title">Les quatre rives sont reliées.</h1>
      <p>Tu as observé l’unité, prévu des sauts dans deux directions, puis composé un passage avec un saut double.</p>
      <button class="secondary" type="button" onclick={restart}>Recommencer la traversée</button>
    </section>
  {/if}
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { background: #e7ede1; }
  :global(body) {
    min-width: 0;
    margin: 0;
    background: #e7ede1;
    color: #17382f;
    font-family: "Avenir Next", Avenir, "Segoe UI", ui-sans-serif, system-ui, sans-serif;
  }
  :global(button), :global(input) { font: inherit; }
  :global(button:focus-visible), :global(input:focus-visible), [tabindex="-1"]:focus-visible {
    outline: 3px solid #b84d3a;
    outline-offset: 3px;
  }

  .prototype-root {
    --ink: #17382f;
    --jade: #2f7864;
    --jade-dark: #205347;
    --paper: #f8f2df;
    --paper-deep: #eee3c9;
    --gold: #d7a73d;
    --persimmon: #b84d3a;
    min-height: 100vh;
    background:
      radial-gradient(circle at 82% 6%, rgba(239, 203, 112, .32), transparent 24rem),
      radial-gradient(circle at 8% 86%, rgba(65, 129, 106, .16), transparent 28rem),
      linear-gradient(145deg, #eef2e8 0%, #e3eadf 54%, #edf0e5 100%);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .kicker {
    margin: 0;
    color: #9b4939;
    font-size: .74rem;
    font-weight: 900;
    letter-spacing: .17em;
    line-height: 1.4;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    color: var(--ink);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.6rem, 7vw, 5.7rem);
    font-weight: 600;
    letter-spacing: -.05em;
    line-height: .94;
  }
  h1 em { color: var(--jade); font-weight: 500; }
  .lead {
    max-width: 36rem;
    margin: 0;
    color: #405f55;
    font-size: clamp(1rem, 2vw, 1.22rem);
    line-height: 1.65;
  }
  .primary, .secondary, .retry {
    min-height: 50px;
    max-width: 100%;
    border-radius: 999px;
    padding: 13px 22px;
    font-weight: 850;
    line-height: 1.2;
    cursor: pointer;
    transition: transform 150ms cubic-bezier(.23, 1, .32, 1), box-shadow 150ms ease, background-color 150ms ease;
  }
  .primary {
    border: 1px solid #102f28;
    background: var(--ink);
    color: #fffdf5;
    box-shadow: 0 7px 0 #a9b9a6, 0 12px 28px rgba(23, 56, 47, .16);
  }
  .primary span { margin-left: .35em; }
  .secondary, .retry {
    border: 2px solid var(--ink);
    background: #fffdf6;
    color: var(--ink);
    box-shadow: 0 4px 0 #c8d1c3;
  }
  .primary:active, .secondary:active, .retry:active { transform: translateY(2px) scale(.98); box-shadow: 0 2px 0 #a9b9a6; }

  .round-progress { display: flex; align-items: center; gap: 7px; }
  .round-progress span {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: 1px solid #9eaea2;
    border-radius: 50%;
    background: #f7f3e6;
    color: #60756c;
    font-size: .72rem;
    font-weight: 900;
  }
  .round-progress span.done { border-color: var(--jade); background: #cce2d5; color: var(--jade-dark); }
  .round-progress span.current { border: 2px solid var(--persimmon); background: var(--persimmon); color: #fff; box-shadow: 0 0 0 4px rgba(184, 77, 58, .13); }

  .tutorial-control, .prediction-panel {
    position: relative;
    width: min(650px, 100%);
    display: grid;
    justify-items: center;
    gap: 9px;
    margin: 24px auto 0;
    padding: 18px 22px;
    border: 1px solid rgba(49, 96, 79, .24);
    border-radius: 22px;
    background: rgba(255, 252, 240, .9);
    box-shadow: 0 7px 0 #cad5c7, 0 13px 30px rgba(35, 74, 61, .09);
  }
  .tutorial-control::before, .prediction-panel::before {
    content: "";
    position: absolute;
    top: -5px;
    width: 42px;
    height: 9px;
    border-radius: 999px;
    background: var(--persimmon);
  }
  .tutorial-control strong { text-align: center; }
  .tutorial-control p, .prediction-panel p { margin: 0; color: #5b6d66; font-size: .88rem; line-height: 1.45; }
  .prediction-panel label { color: var(--ink); font-family: Georgia, serif; font-size: clamp(1.25rem, 3vw, 1.6rem); font-weight: 700; text-align: center; }
  .prediction-entry { display: flex; align-items: baseline; gap: 10px; }
  .prediction-entry input {
    width: 86px;
    min-height: 65px;
    border: 3px solid var(--jade);
    border-radius: 18px;
    background: #fffefa;
    color: var(--ink);
    font-family: Georgia, serif;
    font-size: 2.35rem;
    font-weight: 800;
    text-align: center;
    box-shadow: inset 0 3px 0 rgba(35, 88, 72, .08);
  }
  .prediction-entry input:disabled { opacity: .72; }
  .prediction-entry span { color: #35564b; font-weight: 850; }

  .world-message {
    min-height: 66px;
    max-width: 760px;
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    align-items: center;
    gap: 11px;
    margin: 18px auto 0;
    padding: 13px 16px;
    border: 1px solid rgba(44, 91, 74, .24);
    border-radius: 18px;
    background: rgba(247, 243, 226, .88);
    color: #2c4c42;
  }
  .world-message > span {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #cbe2d5;
    color: #245e4e;
    font-weight: 950;
  }
  .world-message p { margin: 0; line-height: 1.45; }
  .world-message.error { border-color: #bd6a4d; background: #fff0e4; color: #5f3224; }
  .world-message.error > span { background: #d06b4c; color: #fff; }
  .retry { display: block; margin: 15px auto 0; }

  .success {
    position: relative;
    width: min(1100px, calc(100% - 32px));
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(280px, .76fr) minmax(440px, 1.24fr);
    align-items: center;
    gap: clamp(30px, 6vw, 72px);
    margin: auto;
    padding: 48px 0;
  }
  .success-seal {
    position: absolute;
    z-index: 1;
    top: clamp(28px, 6vh, 70px);
    left: 0;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border: 2px solid #f7e8ce;
    border-radius: 13px;
    background: var(--persimmon);
    color: #fff8e8;
    font-size: 1.5rem;
    font-weight: 950;
    box-shadow: 0 0 0 3px var(--persimmon), 0 9px 20px rgba(116, 55, 40, .2);
    animation: seal-in 260ms cubic-bezier(.23, 1, .32, 1) both;
  }
  .success-copy { display: grid; justify-items: start; gap: 18px; }
  .success h1 { font-size: clamp(2.45rem, 5vw, 4.5rem); }
  .success-feedback, .composition { max-width: 34rem; margin: 0; line-height: 1.55; }
  .success-feedback {
    padding: 15px 17px;
    border-left: 4px solid var(--jade);
    border-radius: 5px 16px 16px 5px;
    background: rgba(255, 252, 239, .9);
    color: #35554a;
    box-shadow: 0 5px 18px rgba(39, 79, 65, .08);
  }
  .composition { color: #6f3f2c; }
  .complete {
    width: min(720px, calc(100% - 32px));
    min-height: 100vh;
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 18px;
    margin: auto;
    padding: 42px 0;
    text-align: center;
  }
  .complete h1 { max-width: 640px; font-size: clamp(2.5rem, 7vw, 5rem); }
  .complete > p:not(.kicker) { max-width: 560px; margin: 0; color: #446158; font-size: 1.05rem; line-height: 1.6; }

  @keyframes seal-in { from { opacity: 0; transform: scale(.9) rotate(-4deg); } to { opacity: 1; transform: scale(1) rotate(0); } }

  @media (hover: hover) and (pointer: fine) {
    .primary:hover { background: #205347; transform: translateY(-1px); }
    .secondary:hover, .retry:hover { background: #f4ead2; transform: translateY(-1px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .primary, .secondary, .retry { transition: none; }
    .success-seal { animation: none; }
  }

  /* Cohesive pond composition: generated atmosphere frames, never defines, the exact lattice. */
  .prototype-root {
    min-height: 100svh;
    overflow-x: clip;
    background: #eaf1e4;
  }

  .intro {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-height: 100svh;
    overflow: hidden;
    display: grid;
    align-items: center;
    margin: 0;
    padding: clamp(28px, 5vw, 76px) max(24px, calc((100vw - 1180px) / 2));
  }
  .generated-atmosphere {
    position: absolute;
    z-index: -2;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 46%;
    opacity: 1;
    filter: saturate(.98) contrast(.94) brightness(1.08);
    -webkit-mask-image: none;
    mask-image: none;
    pointer-events: none;
  }
  .intro-light {
    position: absolute;
    z-index: -1;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(250, 248, 226, .98) 0%, rgba(250, 248, 226, .9) 31%, rgba(250, 248, 226, .54) 48%, rgba(250, 248, 226, .08) 70%),
      linear-gradient(0deg, rgba(231, 241, 224, .32), transparent 40%);
    pointer-events: none;
  }
  .intro-copy {
    position: relative;
    z-index: 1;
    width: min(500px, 45vw);
    display: grid;
    justify-items: start;
    gap: clamp(15px, 2.3vh, 24px);
  }
  .intro-copy h1 { font-size: clamp(4rem, 8vw, 7rem); text-shadow: 0 2px 24px rgba(250, 248, 226, .58); }
  .intro-copy .lead { color: #294a40; font-size: clamp(1rem, 1.5vw, 1.2rem); line-height: 1.58; }
  .intro-copy .primary { margin-top: 3px; }

  .game-shell {
    position: relative;
    isolation: isolate;
    min-height: 100svh;
    overflow: hidden;
    background: rgba(239, 245, 232, .8);
  }
  .game-shell::after, .success::after, .complete::after {
    content: "";
    position: absolute;
    z-index: 0;
    inset: 0;
    background: linear-gradient(125deg, rgba(242, 247, 235, .93), rgba(235, 243, 228, .78) 46%, rgba(233, 242, 226, .66));
    pointer-events: none;
  }
  .world-atmosphere {
    position: absolute;
    z-index: 0;
    inset: -24px;
    width: calc(100% + 48px);
    height: calc(100% + 48px);
    object-fit: cover;
    object-position: center 36%;
    opacity: .44;
    filter: blur(12px) saturate(.72) brightness(1.18);
    transform: scale(1.03);
    pointer-events: none;
  }
  .game-hud {
    position: relative;
    z-index: 2;
    width: min(1180px, calc(100% - 32px));
    min-height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin: auto;
    border-bottom: 1px solid rgba(35, 83, 67, .2);
  }
  .game-hud p { display: flex; align-items: baseline; gap: 10px; margin: 0; }
  .game-hud strong { font-family: Georgia, serif; font-size: 1rem; }
  .round-progress span {
    width: 26px;
    height: 26px;
    border-color: rgba(51, 94, 77, .3);
    background: rgba(250, 248, 232, .64);
    color: #587066;
    box-shadow: none;
  }
  .round-progress span.done { border-color: #43806d; background: rgba(194, 222, 207, .75); }
  .round-progress span.current { border: 0; background: var(--persimmon); box-shadow: 0 0 0 4px rgba(184, 77, 58, .12); }

  .scene {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100% - 32px));
    min-height: calc(100svh - 58px);
    display: grid;
    grid-template-columns: minmax(270px, .7fr) minmax(500px, 1.3fr);
    grid-template-areas:
      "heading pond"
      "control pond"
      "message pond"
      "retry pond";
    grid-template-rows: auto auto auto minmax(0, 1fr);
    align-content: center;
    align-items: start;
    column-gap: clamp(28px, 4vw, 58px);
    row-gap: 15px;
    margin: auto;
    padding: 22px 0 28px;
  }
  .scene-heading {
    grid-area: heading;
    width: 100%;
    display: grid;
    gap: 9px;
    margin: 0;
    padding: 0;
  }
  .passage-label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: #8c493a;
    font-size: .7rem;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .passage-label span {
    padding: 5px 8px;
    border-radius: 999px;
    background: rgba(184, 77, 58, .1);
  }
  .scene-heading h1 { font-size: clamp(2.65rem, 5.4vw, 4.8rem); }
  .scene-heading > p:last-child { max-width: 31rem; margin: 0; color: #3d5d52; font-size: .98rem; line-height: 1.5; }

  .tutorial-control, .prediction-panel {
    grid-area: control;
    width: 100%;
    display: grid;
    justify-items: start;
    gap: 7px;
    margin: 0;
    padding: 14px 0 0;
    border: 0;
    border-top: 1px solid rgba(37, 83, 67, .22);
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
  .tutorial-control::before, .prediction-panel::before { display: none; }
  .tutorial-control strong, .prediction-panel label { text-align: left; }
  .tutorial-control p, .prediction-panel p { color: #556c62; }
  .prediction-panel label { font-size: clamp(1.18rem, 2vw, 1.45rem); }
  .prediction-entry input {
    width: 72px;
    min-height: 58px;
    border: 2px solid var(--jade);
    border-radius: 16px;
    background: rgba(255, 254, 245, .88);
    box-shadow: 0 7px 18px rgba(31, 77, 63, .1);
  }
  .world-message {
    grid-area: message;
    width: 100%;
    min-height: 0;
    grid-template-columns: 29px minmax(0, 1fr);
    gap: 9px;
    margin: 0;
    padding: 11px 0 0;
    border: 0;
    border-top: 1px solid rgba(37, 83, 67, .18);
    border-radius: 0;
    background: transparent;
    font-size: .9rem;
  }
  .world-message > span { width: 27px; height: 27px; }
  .world-message.error { border-color: rgba(166, 79, 56, .45); background: transparent; }
  .retry { grid-area: retry; justify-self: start; margin: 0; }

  .success, .complete {
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }
  .success {
    width: 100%;
    min-height: 100svh;
    grid-template-columns: minmax(280px, .72fr) minmax(460px, 1.28fr);
    gap: clamp(32px, 5vw, 68px);
    padding: 58px max(24px, calc((100vw - 1120px) / 2));
  }
  .success > :not(.world-atmosphere):not(.success-seal) { position: relative; z-index: 1; }
  .success::after { background: linear-gradient(105deg, rgba(241, 246, 231, .97), rgba(235, 242, 226, .81)); }
  .success-seal { top: 28px; left: max(24px, calc((100vw - 1120px) / 2)); }
  .success-feedback {
    padding: 13px 0 13px 16px;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
  .complete {
    width: 100%;
    padding-inline: max(24px, calc((100vw - 720px) / 2));
  }
  .complete > :not(.world-atmosphere) { position: relative; z-index: 1; }
  .complete::after {
    background:
      radial-gradient(circle at center, rgba(244, 247, 228, .93) 0 18%, rgba(241, 245, 226, .72) 40%, rgba(235, 241, 222, .22) 72%),
      linear-gradient(0deg, rgba(232, 239, 220, .54), transparent 42%);
  }
  .complete .outro-atmosphere {
    inset: 0;
    width: 100%;
    height: 100%;
    object-position: center 48%;
    opacity: 1;
    filter: saturate(.92) contrast(.96) brightness(1.02);
    transform: none;
  }

  @media (max-width: 820px) {
    .intro {
      min-height: calc(100svh - 43px);
      align-items: end;
      padding: 44svh 16px 28px;
    }
    .generated-atmosphere { height: 58%; object-position: center 30%; }
    .intro-light {
      background: linear-gradient(0deg, rgba(248, 247, 228, 1) 0%, rgba(248, 247, 228, .98) 42%, rgba(248, 247, 228, .55) 58%, transparent 79%);
    }
    .intro-copy { width: min(560px, 100%); gap: 14px; }
    .intro-copy h1 { font-size: clamp(3.5rem, 15vw, 5rem); }
    .intro-copy .lead { font-size: .96rem; line-height: 1.5; }

    .game-hud { width: calc(100% - 20px); min-height: 52px; }
    .game-hud p { display: grid; gap: 0; }
    .game-hud strong { font-size: .9rem; }
    .scene {
      width: calc(100% - 12px);
      min-height: calc(100svh - 52px);
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: "heading" "pond" "control" "message" "retry";
      grid-template-rows: auto;
      align-content: start;
      gap: 11px;
      padding: 10px 0 24px;
    }
    .scene-heading { gap: 5px; padding-inline: 4px; }
    .passage-label { gap: 5px; font-size: .62rem; }
    .passage-label span { padding: 3px 6px; }
    .scene-heading h1 { font-size: clamp(2rem, 10vw, 2.7rem); line-height: .98; }
    .scene-heading > p:last-child { font-size: .86rem; line-height: 1.38; }
    .tutorial-control, .prediction-panel { gap: 5px; padding: 10px 4px 0; }
    .tutorial-control p, .prediction-panel p { font-size: .78rem; }
    .tutorial-control strong { font-size: .9rem; }
    .prediction-panel label { font-size: 1.06rem; }
    .prediction-entry { gap: 8px; }
    .prediction-entry input { width: 64px; min-height: 52px; border-radius: 14px; font-size: 1.95rem; }
    .world-message { width: 100%; min-height: 0; padding: 9px 4px 0; font-size: .8rem; }
    .world-message p { line-height: 1.35; }
    .retry { min-height: 46px; margin-left: 4px; }

    .success {
      width: 100%;
      grid-template-columns: 1fr;
      gap: 22px;
      padding: 28px 16px 36px;
      text-align: center;
    }
    .success-seal { position: static; }
    .success-copy { justify-items: center; }
    .success-feedback { padding: 12px 0; border-left: 0; border-top: 3px solid var(--jade); }
  }

  @media (max-width: 360px) {
    .intro { padding-top: 40svh; }
    .generated-atmosphere { height: 53%; }
    .intro-copy h1 { font-size: 3.25rem; }
    .intro-copy .lead { font-size: .9rem; }
    .game-hud { min-height: 48px; }
    .round-progress { gap: 3px; }
    .round-progress span { width: 23px; height: 23px; font-size: .62rem; }
    .scene { min-height: calc(100svh - 48px); gap: 8px; padding-top: 8px; }
    .scene-heading h1 { font-size: 1.92rem; }
    .scene-heading > p:last-child { font-size: .8rem; }
    .tutorial-control, .prediction-panel { padding-top: 8px; }
    .world-message { padding-top: 7px; }
  }
</style>
