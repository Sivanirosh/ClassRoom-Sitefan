<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import pondAtmosphere from './assets/pond-garden-atmosphere.webp';
  import pondIntro from './assets/pond-garden-intro.webp';
  import pondOutro from './assets/pond-garden-outro.webp';

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
  let lastJumpDistance: 1 | 2 | null = null;
  let jumpEpoch = 0;
  let runGeneration = 0;
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
    ? { x: unitReferenceStart.x + 5, y: unitReferenceStart.y - 4 }
    : { x: unitReferenceStart.x - 8, y: unitReferenceStart.y - 4 };
  $: frogPoint = pointAt(coveredUnits, scene);
  $: discrepancyUnits = Math.abs(scene.targetUnits - coveredUnits);
  $: discrepancyStart = outcome === 'over' ? finishPoint : frogPoint;
  $: discrepancyEnd = outcome === 'over' ? frogPoint : finishPoint;
  $: discrepancyLabel = scene.orientation === 'horizontal'
    ? { x: (discrepancyStart.x + discrepancyEnd.x) / 2, y: originPoint.y - 5 }
    : { x: originPoint.x + 13, y: (discrepancyStart.y + discrepancyEnd.y) / 2 + 1 };
  $: showOverflowEvidence = outcome === 'over' && (
    frogPoint.x <= 7 || frogPoint.x >= 113 || frogPoint.y <= 7 || frogPoint.y >= 93
  );
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
    lastJumpDistance = null;
    jumpEpoch = 0;
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
    lastJumpDistance = distance;
    jumpEpoch += 1;
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
    invalidateRun();
    const generation = runGeneration;
    prediction = value;
    running = true;
    coveredUnits = 0;
    executedActions = 0;
    trace = [];
    lastJumpDistance = null;
    jumpEpoch = 0;
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
    lastJumpDistance = distance;
    jumpEpoch += 1;
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
    lastJumpDistance = null;
    jumpEpoch = 0;
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
    lastJumpDistance = null;
    jumpEpoch = 0;
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
  class:show-overflow-evidence={showOverflowEvidence}
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
        <p><strong>Le saut juste</strong><small>{scene.chapter}</small></p>
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

        <div class:overflow-evidence={showOverflowEvidence} class="pond-stage" data-visual-board data-pond-stage>
          <img class="board-atmosphere" data-decorative-atmosphere="stage" src={pondAtmosphere} alt="" aria-hidden="true" />
          <section class:overflow-evidence={showOverflowEvidence} class="playfield" aria-label={`Grille unitaire, trajet ${scene.orientation === 'vertical' ? 'vertical' : 'horizontal'} : ${coveredUnits} unités parcourues`}>
            <svg viewBox="0 0 120 100" role="img" aria-labelledby="path-title path-desc">
              <title id="path-title">Trajet de la grenouille dans le jardin-étang</title>
              <desc id="path-desc">Grille carrée. La grenouille a exécuté {executedActions} action{executedActions === 1 ? '' : 's'} et parcouru {coveredUnits} unité{coveredUnits === 1 ? '' : 's'}. Le départ, l’arrivée et les traces restent visibles.</desc>

              <defs>
                <linearGradient id={`pond-water-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#b9d9c8"></stop>
                  <stop offset=".48" stop-color="#8fc5b7"></stop>
                  <stop offset="1" stop-color="#72aa9f"></stop>
                </linearGradient>
                <radialGradient id={`pond-light-${scene.id}`} cx="50%" cy="42%" r="64%">
                  <stop offset="0" stop-color="#edf3d8" stop-opacity=".52"></stop>
                  <stop offset="1" stop-color="#dce9d8" stop-opacity="0"></stop>
                </radialGradient>
                <linearGradient id={`rock-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#bdc4ae"></stop>
                  <stop offset=".55" stop-color="#718679"></stop>
                  <stop offset="1" stop-color="#405f54"></stop>
                </linearGradient>
                <radialGradient id={`lily-${scene.id}`} cx="35%" cy="28%" r="78%">
                  <stop offset="0" stop-color="#80a96e"></stop>
                  <stop offset="1" stop-color="#3c745e"></stop>
                </radialGradient>
                <linearGradient id={`frog-green-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#8ad98e"></stop>
                  <stop offset=".52" stop-color="#45a968"></stop>
                  <stop offset="1" stop-color="#237052"></stop>
                </linearGradient>
                <linearGradient id={`frog-orange-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#ffc175"></stop>
                  <stop offset=".5" stop-color="#e97946"></stop>
                  <stop offset="1" stop-color="#a9442f"></stop>
                </linearGradient>
                <filter id={`pond-depth-${scene.id}`} x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="1.1" stdDeviation=".8" flood-color="#173f35" flood-opacity=".32"></feDropShadow>
                </filter>
                <pattern id={`unit-grid-${scene.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2f6f65" stroke-opacity=".22" stroke-width=".72"></path>
                </pattern>
              </defs>

              <rect class="pond-water" width="120" height="100" fill={`url(#pond-water-${scene.id})`}></rect>
              <rect class="pond-light" width="120" height="100" fill={`url(#pond-light-${scene.id})`}></rect>

              <g class="pond-life" data-pond-decor aria-hidden="true">
                <g class="koi-school">
                  <g transform="translate(7 16)">
                    <g class="koi-fish koi-a">
                      <path class="koi-tail" d="M-4.4 0 C-7.4 -3 -8.5 -2.4 -7.1 0 C-8.5 2.4 -7.4 3 -4.4 0Z"></path>
                      <ellipse class="koi-body" rx="4.8" ry="2.05"></ellipse>
                      <path class="koi-patch" d="M-2.8-1.5 C-1-.4-.9.7.3 1.7 C1.8 1.1 2.5-.1 2.2-1.5 C.4-2-1.4-2-2.8-1.5Z"></path>
                      <path class="koi-fin" d="M-.5 1.5 Q1.2 3 2.3 1.2 M-.8-1.5 Q.6-3 1.8-1.4"></path>
                      <circle class="koi-eye" cx="3.2" cy="-.75" r=".32"></circle>
                    </g>
                  </g>
                  <g transform="translate(98 37)">
                    <g class="koi-fish koi-b">
                      <g transform="scale(-1 1)">
                        <path class="koi-tail" d="M-4.4 0 C-7.4 -3 -8.5 -2.4 -7.1 0 C-8.5 2.4 -7.4 3 -4.4 0Z"></path>
                        <ellipse class="koi-body" rx="4.8" ry="2.05"></ellipse>
                        <path class="koi-patch koi-patch-gold" d="M-2.8-1.5 C-1-.4-.9.7.3 1.7 C1.8 1.1 2.5-.1 2.2-1.5 C.4-2-1.4-2-2.8-1.5Z"></path>
                        <path class="koi-fin" d="M-.5 1.5 Q1.2 3 2.3 1.2 M-.8-1.5 Q.6-3 1.8-1.4"></path>
                        <circle class="koi-eye" cx="3.2" cy="-.75" r=".32"></circle>
                      </g>
                    </g>
                  </g>
                  <g transform="translate(22 89)">
                    <g class="koi-fish koi-c">
                      <path class="koi-tail" d="M-4.4 0 C-7.4 -3 -8.5 -2.4 -7.1 0 C-8.5 2.4 -7.4 3 -4.4 0Z"></path>
                      <ellipse class="koi-body koi-body-gold" rx="4.8" ry="2.05"></ellipse>
                      <path class="koi-patch koi-patch-cream" d="M-2.8-1.5 C-1-.4-.9.7.3 1.7 C1.8 1.1 2.5-.1 2.2-1.5 C.4-2-1.4-2-2.8-1.5Z"></path>
                      <path class="koi-fin" d="M-.5 1.5 Q1.2 3 2.3 1.2 M-.8-1.5 Q.6-3 1.8-1.4"></path>
                      <circle class="koi-eye" cx="3.2" cy="-.75" r=".32"></circle>
                    </g>
                  </g>
                </g>

                <g class="rock-cluster rocks-north" filter={`url(#pond-depth-${scene.id})`}>
                  <ellipse cx="2.5" cy="5" rx="6.8" ry="5" fill={`url(#rock-${scene.id})`}></ellipse>
                  <ellipse cx="10" cy="2.4" rx="7" ry="4.6" fill={`url(#rock-${scene.id})`}></ellipse>
                  <path class="rock-highlight" d="M4 2 Q8-1 13 1"></path>
                  <circle class="moss" cx="7.6" cy="2" r="1.6"></circle>
                </g>
                <g class="rock-cluster rocks-south" filter={`url(#pond-depth-${scene.id})`}>
                  <ellipse cx="113" cy="97" rx="8.5" ry="5.5" fill={`url(#rock-${scene.id})`}></ellipse>
                  <ellipse cx="120" cy="91" rx="6.7" ry="7.5" fill={`url(#rock-${scene.id})`}></ellipse>
                  <path class="rock-highlight" d="M108 95 Q113 91 118 94"></path>
                  <circle class="moss" cx="116" cy="92.5" r="1.8"></circle>
                </g>

                <g class="lily-cluster lily-south">
                  <path class="lily-pad" fill={`url(#lily-${scene.id})`} d="M1 87 C1 80 8 77 14 81 C19 85 17 92 11 94 C5 96 1 92 1 87Z"></path>
                  <path class="lily-cut" d="M9 86 L15 80"></path>
                  <ellipse class="lily-pad small" cx="20" cy="94" rx="6" ry="3.7" fill={`url(#lily-${scene.id})`}></ellipse>
                  <g class="lotus" transform="translate(8 82)">
                    <path d="M0 2 C-4 0-3-3 0-1 C-1-5 2-5 2-1 C5-4 7-1 3 2 C2 4 1 4 0 2Z"></path>
                    <circle r=".8"></circle>
                  </g>
                </g>
                <g class="lily-cluster lily-north">
                  <ellipse class="lily-pad" cx="112" cy="10" rx="8" ry="4.8" fill={`url(#lily-${scene.id})`}></ellipse>
                  <path class="lily-cut" d="M112 10 L119 7"></path>
                  <ellipse class="lily-pad small" cx="102" cy="5" rx="5.6" ry="3.2" fill={`url(#lily-${scene.id})`}></ellipse>
                  <g class="lotus" transform="translate(111 8)">
                    <path d="M0 2 C-4 0-3-3 0-1 C-1-5 2-5 2-1 C5-4 7-1 3 2 C2 4 1 4 0 2Z"></path>
                    <circle r=".8"></circle>
                  </g>
                </g>

                <g class="reeds" transform="translate(113 69)">
                  <path d="M0 16 Q-2 6-1-2 M2 16 Q5 5 4-5 M4 16 Q9 8 10 0 M-2 16 Q-7 8-5 1"></path>
                  <path class="reed-head" d="M-1-2 Q-2-5 0-7 Q2-5-1-2Z M4-5 Q3-8 5-10 Q7-7 4-5Z M10 0 Q10-3 12-4 Q13-1 10 0Z"></path>
                </g>
                <g class="floating-petals">
                  <path d="M38 12 q3-2 4 1 q-2 3-4-1Z M87 84 q3-2 4 1 q-2 3-4-1Z M107 55 q2-2 3 0 q-1 3-3 0Z"></path>
                </g>
              </g>

              <rect class="grid-surface" width="120" height="100" fill={`url(#unit-grid-${scene.id})`}></rect>
              <line class="route-bed" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
              <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>

              <g class="unit-reference" role="img" aria-label="Un côté de carré vaut une unité-saut">
                <line x1={unitReferenceStart.x} y1={unitReferenceStart.y} x2={unitReferenceEnd.x} y2={unitReferenceEnd.y}></line>
                <circle cx={unitReferenceStart.x} cy={unitReferenceStart.y} r="1.25"></circle>
                <circle cx={unitReferenceEnd.x} cy={unitReferenceEnd.y} r="1.25"></circle>
                <text x={unitReferenceLabel.x} y={unitReferenceLabel.y}>1 saut</text>
              </g>

              <g class="marker origin-marker">
                <circle class="marker-halo" cx={originPoint.x} cy={originPoint.y} r="5"></circle>
                <circle cx={originPoint.x} cy={originPoint.y} r="2.8"></circle>
                <text x={originPoint.x} y={originPoint.y + 10}>Départ</text>
              </g>
              <g class="marker finish-marker">
                <circle class="marker-halo" cx={finishPoint.x} cy={finishPoint.y} r="6"></circle>
                <circle cx={finishPoint.x} cy={finishPoint.y} r="3.6"></circle>
                <path d={`M ${finishPoint.x - 1.7} ${finishPoint.y} l 1.2 1.3 2.5 -2.8`}></path>
                <text x={finishPoint.x + (scene.orientation === 'vertical' ? 12 : 0)} y={finishPoint.y + (scene.orientation === 'vertical' ? 1 : 10)}>Arrivée</text>
              </g>

              {#each trace as item}
                {@const from = pointAt(item.from, scene)}
                {@const to = pointAt(item.to, scene)}
                <line class:double={item.distance === 2} class:vertical={scene.orientation === 'vertical'} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
                <circle class="landing-ripple" cx={to.x} cy={to.y} r="3.4"></circle>
                <circle class="landing" cx={to.x} cy={to.y} r="1.8"></circle>
              {/each}

              {#if outcome === 'short' || outcome === 'over'}
                <g class="discrepancy" aria-hidden="true">
                  <line x1={discrepancyStart.x} y1={discrepancyStart.y} x2={discrepancyEnd.x} y2={discrepancyEnd.y}></line>
                  <rect x={discrepancyLabel.x - 9} y={discrepancyLabel.y - 3.8} width="18" height="5.5" rx="2"></rect>
                  <text x={discrepancyLabel.x} y={discrepancyLabel.y}>écart {discrepancyUnits}</text>
                </g>
              {/if}

              {#each scene.obstacleUnits as units}
                {@const obstacle = pointAt(units, scene)}
                <g class="obstacle" transform={`translate(${obstacle.x} ${obstacle.y})`} aria-label="Grenouille orange à franchir par un saut de deux unités">
                  <ellipse class="frog-shadow" cy="4.6" rx="5.2" ry="1.6"></ellipse>
                  <path class="frog-leg" d="M-3.7 1 Q-6.2 2 -6.6 4.5 Q-4.8 4.1 -2.8 3 M3.7 1 Q6.2 2 6.6 4.5 Q4.8 4.1 2.8 3"></path>
                  <ellipse class="frog-body" rx="5.1" ry="4.2"></ellipse>
                  <circle class="frog-eye-bump" cx="-2.3" cy="-3.5" r="1.65"></circle><circle class="frog-eye-bump" cx="2.3" cy="-3.5" r="1.65"></circle>
                  <circle class="eye" cx="-2.3" cy="-3.6" r=".55"></circle><circle class="eye" cx="2.3" cy="-3.6" r=".55"></circle>
                  <path class="frog-mouth" d="M-1.8 1 Q0 2.3 1.8 1"></path>
                  <text y="11">bond ×2</text>
                </g>
              {/each}

              <g class="frog" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label={`Grenouille après ${executedActions} action${executedActions === 1 ? '' : 's'}`}>
                {#key jumpEpoch}
                  <g class="frog-figure" class:jumping={jumpEpoch > 0} class:double-jump={lastJumpDistance === 2} class:short={outcome === 'short'} class:over={outcome === 'over'}>
                    <ellipse class="frog-shadow" cy="4.8" rx="5.5" ry="1.7"></ellipse>
                    <path class="frog-leg" d="M-4 1 Q-6.6 2 -7 4.8 Q-5 4.3 -2.9 3.1 M4 1 Q6.6 2 7 4.8 Q5 4.3 2.9 3.1"></path>
                    <ellipse class="frog-body" rx="5.6" ry="4.5"></ellipse>
                    <ellipse class="frog-belly" cy="1.3" rx="3.3" ry="2.4"></ellipse>
                    <circle class="frog-eye-bump" cx="-2.5" cy="-3.8" r="1.8"></circle><circle class="frog-eye-bump" cx="2.5" cy="-3.8" r="1.8"></circle>
                    <circle class="eye" cx="-2.5" cy="-3.9" r=".58"></circle><circle class="eye" cx="2.5" cy="-3.9" r=".58"></circle>
                    <circle class="frog-cheek" cx="-3.7" cy="-.1" r=".55"></circle><circle class="frog-cheek" cx="3.7" cy="-.1" r=".55"></circle>
                    <path class="frog-mouth" d="M-2 1 Q0 2.6 2 1"></path>
                  </g>
                {/key}
                {#if scene.mode === 'tutorial'}
                  <foreignObject x="-9" y="-9" width="18" height="18">
                    <button class="world-frog-control" type="button" data-smoke-control="jump" onclick={tutorialJump} aria-label="Toucher la grenouille pour lui faire faire un saut d’une unité"></button>
                  </foreignObject>
                {/if}
              </g>
            </svg>
          </section>
        </div>

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

      <div class="success-map" aria-label={`Trace finale : ${executedActions} actions pour ${scene.targetUnits} unités`}>
        <img class="board-atmosphere" src={pondAtmosphere} alt="" aria-hidden="true" />
        <svg viewBox="0 0 120 100" role="img" aria-label="La trace complète sur la grille carrée se termine exactement à l’Arrivée">
          <defs>
            <linearGradient id={`success-water-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#c4dfcd"></stop><stop offset="1" stop-color="#75ad9f"></stop>
            </linearGradient>
            <pattern id={`success-grid-${scene.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2f6f65" stroke-opacity=".22" stroke-width=".72"></path>
            </pattern>
          </defs>
          <rect class="pond-water" width="120" height="100" fill={`url(#success-water-${scene.id})`}></rect>
          <rect class="grid-surface" width="120" height="100" fill={`url(#success-grid-${scene.id})`}></rect>
          <line class="route-bed" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
          <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
          <circle class="success-origin" cx={originPoint.x} cy={originPoint.y} r="3"></circle>
          <circle class="success-finish-halo" cx={finishPoint.x} cy={finishPoint.y} r="7"></circle>
          <circle class="success-finish" cx={finishPoint.x} cy={finishPoint.y} r="4"></circle>
          {#each trace as item}
            {@const from = pointAt(item.from, scene)}
            {@const to = pointAt(item.to, scene)}
            <line class:double={item.distance === 2} class:vertical={scene.orientation === 'vertical'} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
            <circle class="landing" cx={to.x} cy={to.y} r="1.8"></circle>
          {/each}
          {#each scene.obstacleUnits as units}
            {@const obstacle = pointAt(units, scene)}
            <g class="obstacle" transform={`translate(${obstacle.x} ${obstacle.y})`} aria-label="Grenouille orange conservée après le saut double">
              <ellipse class="frog-shadow" cy="4.6" rx="5.2" ry="1.6"></ellipse>
              <path class="frog-leg" d="M-3.7 1 Q-6.2 2 -6.6 4.5 Q-4.8 4.1 -2.8 3 M3.7 1 Q6.2 2 6.6 4.5 Q4.8 4.1 2.8 3"></path>
              <ellipse class="frog-body" rx="5.1" ry="4.2"></ellipse>
              <circle class="frog-eye-bump" cx="-2.3" cy="-3.5" r="1.65"></circle><circle class="frog-eye-bump" cx="2.3" cy="-3.5" r="1.65"></circle>
              <circle class="eye" cx="-2.3" cy="-3.6" r=".55"></circle><circle class="eye" cx="2.3" cy="-3.6" r=".55"></circle>
              <path class="frog-mouth" d="M-1.8 1 Q0 2.3 1.8 1"></path>
            </g>
          {/each}
          <g class="frog arrived" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label="Grenouille exactement à l’Arrivée">
            <g class="frog-figure">
              <ellipse class="frog-shadow" cy="4.8" rx="5.5" ry="1.7"></ellipse>
              <path class="frog-leg" d="M-4 1 Q-6.6 2 -7 4.8 Q-5 4.3 -2.9 3.1 M4 1 Q6.6 2 7 4.8 Q5 4.3 2.9 3.1"></path>
              <ellipse class="frog-body" rx="5.6" ry="4.5"></ellipse><ellipse class="frog-belly" cy="1.3" rx="3.3" ry="2.4"></ellipse>
              <circle class="frog-eye-bump" cx="-2.5" cy="-3.8" r="1.8"></circle><circle class="frog-eye-bump" cx="2.5" cy="-3.8" r="1.8"></circle>
              <circle class="eye" cx="-2.5" cy="-3.9" r=".58"></circle><circle class="eye" cx="2.5" cy="-3.9" r=".58"></circle>
              <circle class="frog-cheek" cx="-3.7" cy="-.1" r=".55"></circle><circle class="frog-cheek" cx="3.7" cy="-.1" r=".55"></circle>
              <path class="frog-mouth" d="M-2 1 Q0 2.6 2 1"></path>
            </g>
          </g>
        </svg>
      </div>
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

  .prototype-root.show-overflow-evidence { overflow-x: clip; }

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

  svg { display: block; width: 100%; }
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

  .playfield { width: 100%; overflow: hidden; border: 1px solid rgba(18, 57, 48, .62); border-radius: 18px; background: #91c2b3; }
  .playfield.overflow-evidence, .playfield.overflow-evidence svg { overflow: visible; }
  .playfield svg, .success-map svg { aspect-ratio: 6 / 5; }
  .grid-surface { pointer-events: none; }
  .route-bed { stroke: rgba(251, 247, 220, .66); stroke-width: 5.8; stroke-linecap: round; }
  .target-line { stroke: #34594f; stroke-width: 1.25; stroke-dasharray: 1.8 1.5; stroke-linecap: round; }

  .unit-reference line { stroke: #a34d38; stroke-width: 1.35; stroke-dasharray: 2 1; }
  .unit-reference circle { fill: #f8ead0; stroke: #a34d38; stroke-width: .7; }
  .unit-reference text { fill: #743b2e; font-size: 3.2px; font-weight: 900; text-anchor: middle; }
  .marker .marker-halo { fill: rgba(255, 252, 235, .38); stroke: rgba(255, 252, 235, .78); stroke-width: 1; }
  .marker > circle:not(.marker-halo) { fill: #fff9e8; stroke: var(--ink); stroke-width: 1.35; }
  .marker text {
    fill: #17382f;
    font-size: 3.7px;
    font-weight: 950;
    paint-order: stroke;
    stroke: rgba(248, 244, 222, .95);
    stroke-width: 1.8px;
    stroke-linejoin: round;
    text-anchor: middle;
  }
  .finish-marker > circle:not(.marker-halo) { fill: #f2c95e; }
  .finish-marker > path { fill: none; stroke: #17382f; stroke-width: .8; stroke-linecap: round; stroke-linejoin: round; }

  .completed-line {
    stroke: #f1bc42;
    stroke-linecap: round;
    filter: drop-shadow(0 1px .45px rgba(83, 58, 25, .5));
    transform-box: fill-box;
    transform-origin: left center;
    animation: trace-horizontal 220ms cubic-bezier(.23, 1, .32, 1) both;
  }
  .completed-line.vertical { transform-origin: center bottom; animation-name: trace-vertical; }
  .completed-line.double { stroke: #c95f3f; stroke-dasharray: 3 1.3; }
  .landing {
    fill: #fff5c5;
    stroke: #70462d;
    stroke-width: .75;
    transform-box: fill-box;
    transform-origin: center;
    animation: landing-in 220ms cubic-bezier(.23, 1, .32, 1) both;
  }
  .landing-ripple {
    fill: none;
    stroke: rgba(255, 247, 201, .9);
    stroke-width: .75;
    transform-box: fill-box;
    transform-origin: center;
    animation: landing-ripple 340ms ease-out both;
  }
  .discrepancy line {
    stroke: #9f4938;
    stroke-width: 1.4;
    stroke-dasharray: 1.8 1.2;
    stroke-linecap: round;
    animation: discrepancy-in 240ms ease-out both;
  }
  .discrepancy rect { fill: rgba(255, 242, 222, .96); stroke: #9f4938; stroke-width: .45; }
  .discrepancy text { fill: #733528; font-size: 3px; font-weight: 950; text-anchor: middle; }
  .frog { transition: transform 240ms cubic-bezier(.77, 0, .175, 1); }
  .frog-figure { transform-box: fill-box; transform-origin: center 78%; }
  .frog-figure.jumping { animation: frog-hop 240ms cubic-bezier(.45, 0, .2, 1) both; }
  .frog-figure.jumping.double-jump { animation-name: frog-hop-double; }
  .frog-shadow { fill: #1b4c40; opacity: .25; stroke: none; }
  .frog .frog-leg { fill: #2d7658; stroke: #153c32; stroke-width: .65; stroke-linecap: round; stroke-linejoin: round; }
  .frog .frog-body { fill: #47ae79; stroke: #153c32; stroke-width: .7; }
  .frog .frog-belly { fill: #7dcc97; stroke: none; opacity: .75; }
  .frog .frog-eye-bump { fill: #62c68a; stroke: #153c32; stroke-width: .65; }
  .frog .eye { fill: #153c32; stroke: none; }
  .frog .frog-cheek { fill: #e9a381; stroke: none; opacity: .75; }
  .frog .frog-mouth { fill: none; stroke: #153c32; stroke-width: .65; stroke-linecap: round; }
  .frog-figure.short { animation: worried 350ms ease-out 2; }
  .frog-figure.over { animation: splash 450ms ease-out 1; }
  .frog.arrived .frog-figure { animation: arrival-settle 320ms cubic-bezier(.23, 1, .32, 1) both; }
  .obstacle .frog-shadow { fill: #653927; }
  .obstacle .frog-leg { fill: #d36f45; stroke: #673624; stroke-width: .65; }
  .obstacle .frog-body { fill: #e58050; stroke: #673624; stroke-width: .7; }
  .obstacle .frog-eye-bump { fill: #f19a65; stroke: #673624; stroke-width: .65; }
  .obstacle .eye { fill: #593022; }
  .obstacle .frog-mouth { fill: none; stroke: #593022; stroke-width: .65; stroke-linecap: round; }
  .obstacle text {
    fill: #663423;
    font-size: 3.2px;
    font-weight: 950;
    paint-order: stroke;
    stroke: rgba(249, 241, 214, .94);
    stroke-width: 1.7px;
    text-anchor: middle;
  }
  .world-frog-control { width: 100%; height: 100%; border: 2px solid transparent; border-radius: 50%; background: transparent; cursor: pointer; }
  .world-frog-control:focus-visible { border-color: #b84d3a; outline: 2px solid #fff7dc; outline-offset: -3px; background: rgba(255, 248, 221, .18); }

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
  .running-copy { color: var(--jade) !important; font-weight: 900; }

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
  .success-map {
    width: 100%;
    overflow: hidden;
    border: 10px solid #7c4c35;
    border-radius: 28px;
    background: #8fbeaf;
    box-shadow: 0 10px 0 #b8c6b3, 0 24px 55px rgba(32, 72, 59, .2);
  }
  .success-origin { fill: #fff9e8; stroke: #17382f; stroke-width: 1.4; }
  .success-finish-halo {
    fill: rgba(248, 220, 125, .36);
    stroke: #f8dc7d;
    stroke-width: 1.1;
    transform-box: fill-box;
    transform-origin: center;
    animation: arrival-halo 620ms ease-out both;
  }
  .success-finish { fill: #f1c552; stroke: #17382f; stroke-width: 1.4; }

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

  @keyframes trace-horizontal { from { opacity: .25; transform: scaleX(0); } to { opacity: 1; transform: scaleX(1); } }
  @keyframes trace-vertical { from { opacity: .25; transform: scaleY(0); } to { opacity: 1; transform: scaleY(1); } }
  @keyframes landing-in { from { opacity: .4; transform: scale(.55); } to { opacity: 1; transform: scale(1); } }
  @keyframes landing-ripple { from { opacity: .85; transform: scale(.45); } to { opacity: 0; transform: scale(1.55); } }
  @keyframes frog-hop {
    0% { transform: translateY(0) scale(1.04, .92); }
    42% { transform: translateY(-3.8px) scale(.96, 1.05); }
    76% { transform: translateY(-.8px) scale(1.03, .96); }
    100% { transform: translateY(0) scale(1); }
  }
  @keyframes frog-hop-double {
    0% { transform: translateY(0) scale(1.07, .88); }
    44% { transform: translateY(-6.2px) scale(.94, 1.08); }
    78% { transform: translateY(-1px) scale(1.05, .94); }
    100% { transform: translateY(0) scale(1); }
  }
  @keyframes discrepancy-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes worried { 50% { transform: translateX(-.7px); filter: saturate(.45) brightness(1.16); } }
  @keyframes splash { 50% { opacity: .62; transform: translateY(-1.2px) scale(1.05, .94); filter: hue-rotate(18deg); } }
  @keyframes arrival-settle { from { opacity: .7; transform: translateY(-3px) scale(.96, 1.04); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes arrival-halo { from { opacity: .35; transform: scale(.55); } 65% { opacity: 1; transform: scale(1.2); } to { opacity: 1; transform: scale(1); } }
  @keyframes seal-in { from { opacity: 0; transform: scale(.9) rotate(-4deg); } to { opacity: 1; transform: scale(1) rotate(0); } }

  @media (hover: hover) and (pointer: fine) {
    .primary:hover { background: #205347; transform: translateY(-1px); }
    .secondary:hover, .retry:hover { background: #f4ead2; transform: translateY(-1px); }
    .world-frog-control:hover { border-color: rgba(255, 249, 225, .92); background: rgba(255, 255, 255, .14); }
  }

  @media (prefers-reduced-motion: reduce) {
    .frog, .primary, .secondary, .retry { transition: none; }
    .frog-figure, .completed-line, .landing, .landing-ripple, .discrepancy line,
    .success-finish-halo, .success-seal {
      animation: none !important;
    }
    .landing-ripple { display: none; }
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
  .game-hud small { color: #63786e; font-size: .68rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
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

  .pond-stage {
    position: relative;
    isolation: isolate;
    grid-area: pond;
    width: 100%;
    overflow: hidden;
    align-self: center;
    padding: 8px;
    border: 1px solid rgba(255, 255, 244, .82);
    border-radius: 28px;
    background: rgba(219, 235, 218, .52);
    box-shadow: 0 26px 64px rgba(25, 66, 52, .2), 0 2px 0 rgba(255, 255, 244, .86) inset;
  }
  .board-atmosphere {
    position: absolute;
    z-index: 0;
    inset: -28px;
    width: calc(100% + 56px);
    height: calc(100% + 56px);
    object-fit: cover;
    object-position: center 8%;
    opacity: .9;
    filter: blur(9px) saturate(.86) brightness(1.16);
    transform: scale(1.09);
    pointer-events: none;
  }
  .pond-stage.overflow-evidence { overflow: visible; }
  .pond-stage::after {
    content: "";
    position: absolute;
    z-index: 0;
    inset: 0;
    background: rgba(228, 240, 224, .1);
    pointer-events: none;
  }
  .playfield {
    position: relative;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(247, 248, 224, .82);
    border-radius: 20px;
    background: transparent;
    box-shadow: 0 12px 36px rgba(18, 67, 57, .2);
  }
  .playfield svg, .success-map svg { aspect-ratio: 6 / 5; }
  .pond-water { opacity: .6; }
  .pond-light { opacity: .52; }
  .grid-surface { opacity: .46; }
  .route-bed { stroke: rgba(250, 245, 211, .42); stroke-width: 5; }
  .target-line { stroke: rgba(31, 76, 65, .72); stroke-width: 1; stroke-dasharray: 1.5 1.7; }
  .unit-reference line { stroke: #b4553d; stroke-width: 1.15; stroke-dasharray: none; }
  .unit-reference circle { fill: #f7d97d; stroke: #8f4435; stroke-width: .55; }
  .unit-reference text {
    fill: #74382d;
    font-size: 3.15px;
    font-weight: 950;
    paint-order: stroke;
    stroke: rgba(243, 245, 217, .92);
    stroke-width: 1.35px;
    text-anchor: middle;
  }
  .frog-figure, .obstacle { filter: drop-shadow(0 1.2px .9px rgba(20, 56, 47, .28)); }
  .completed-line { filter: drop-shadow(0 1.2px .65px rgba(65, 46, 22, .54)); }
  .landing-ripple { stroke-width: 1; }
  .marker .marker-halo { fill: rgba(255, 250, 217, .44); stroke: rgba(255, 250, 217, .88); }

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
  .success > :not(.world-atmosphere) { position: relative; z-index: 1; }
  .success::after { background: linear-gradient(105deg, rgba(241, 246, 231, .97), rgba(235, 242, 226, .81)); }
  .success-seal { top: 28px; left: max(24px, calc((100vw - 1120px) / 2)); }
  .success-map {
    position: relative;
    isolation: isolate;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(255, 252, 227, .9);
    border-radius: 26px;
    background: rgba(122, 180, 164, .76);
    box-shadow: 0 24px 58px rgba(26, 67, 54, .22);
  }
  .success-map svg { position: relative; z-index: 1; }
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
    .game-hud small { font-size: .58rem; }
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
    .pond-stage { padding: 4px; border-radius: 18px; box-shadow: 0 12px 30px rgba(25, 66, 52, .17); }
    .playfield { border-radius: 14px; }
    .board-atmosphere { opacity: .82; filter: blur(9px) saturate(.78) brightness(1.18); }
    .unit-reference text { font-size: 3.65px; stroke-width: 1.65px; }
    .marker text { font-size: 4px; stroke-width: 2px; }
    .obstacle text { font-size: 3.4px; }
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
    .success-map { width: min(600px, 100%); }
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
