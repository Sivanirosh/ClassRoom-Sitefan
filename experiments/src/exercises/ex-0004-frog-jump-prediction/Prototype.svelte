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
    <section class="intro" aria-labelledby="intro-title">
      <div class="intro-card">
        <div class="intro-copy">
          <p class="kicker">Le jardin des unités · EX-0004</p>
          <h1 id="intro-title" tabindex="-1">Le saut<br /><em>juste</em></h1>
          <p class="lead">Au bord de l’étang, chaque carré donne le rythme. Découvre la longueur d’un saut, puis prévois le nombre d’actions qui mènera la grenouille exactement sur l’autre rive.</p>
          <button class="primary" type="button" data-smoke-action="start" onclick={start}>Entrer dans le jardin <span aria-hidden="true">→</span></button>
          <p class="boundary">4 passages calmes · aucun chronomètre · réponses locales</p>
        </div>

        <div class="intro-art" aria-hidden="true">
          <svg viewBox="0 0 560 520">
            <defs>
              <linearGradient id="intro-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#f5e8c7"></stop>
                <stop offset="1" stop-color="#d7e4cf"></stop>
              </linearGradient>
              <linearGradient id="intro-water" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#8fc6b6"></stop>
                <stop offset="1" stop-color="#4e8f82"></stop>
              </linearGradient>
              <filter id="intro-shadow" x="-30%" y="-30%" width="160%" height="180%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#17382f" flood-opacity=".2"></feDropShadow>
              </filter>
            </defs>
            <rect width="560" height="520" rx="36" fill="url(#intro-sky)"></rect>
            <circle cx="408" cy="112" r="68" fill="#f7d879" opacity=".9"></circle>
            <path d="M0 214 C84 148 142 164 214 218 C284 145 376 148 438 214 C488 177 525 184 560 215 V330 H0Z" fill="#8ea792" opacity=".65"></path>
            <path d="M0 263 C76 211 145 218 218 268 C301 202 391 217 455 271 C496 244 530 246 560 266 V354 H0Z" fill="#547c6e" opacity=".75"></path>
            <g class="pavilion" transform="translate(82 185)">
              <path d="M-18 38 Q58 -9 134 38 Q112 31 97 32 H20 Q2 31 -18 38Z" fill="#713f33"></path>
              <path d="M0 42 H116 L104 52 H12Z" fill="#bd5a40"></path>
              <path d="M22 52 V135 M94 52 V135" stroke="#4a332b" stroke-width="10"></path>
              <path d="M12 136 H104" stroke="#4a332b" stroke-width="12" stroke-linecap="round"></path>
              <rect x="42" y="61" width="32" height="44" rx="4" fill="#f2d899" opacity=".9"></rect>
            </g>
            <path d="M0 322 C115 286 196 340 286 315 C376 290 448 308 560 277 V520 H0Z" fill="url(#intro-water)"></path>
            <path d="M311 360 C352 301 445 301 489 360" fill="none" stroke="#6c4537" stroke-width="18" stroke-linecap="round"></path>
            <path d="M312 361 C352 319 447 318 488 361" fill="none" stroke="#d5724f" stroke-width="10" stroke-linecap="round"></path>
            <path d="M303 367 H497" stroke="#5b4034" stroke-width="8" stroke-linecap="round"></path>
            <g class="water-lines" fill="none" stroke="#dcebdd" stroke-width="5" stroke-linecap="round" opacity=".7">
              <path d="M24 383 Q94 367 163 384"></path><path d="M66 426 Q151 408 230 429"></path>
              <path d="M325 424 Q409 407 525 425"></path><path d="M208 474 Q303 455 394 475"></path>
            </g>
            <g transform="translate(132 395)">
              <ellipse rx="48" ry="17" fill="#2f7765" transform="rotate(-8)"></ellipse>
              <path d="M0 0 L28 -22" stroke="#23584d" stroke-width="5"></path>
              <circle cx="23" cy="-29" r="16" fill="#f1c9b2"></circle>
              <circle cx="12" cy="-31" r="13" fill="#f6ddd0"></circle><circle cx="34" cy="-31" r="13" fill="#f6ddd0"></circle>
              <circle cx="23" cy="-40" r="13" fill="#fff2e4"></circle><circle cx="23" cy="-28" r="7" fill="#d8a13c"></circle>
            </g>
            <g class="intro-frog" transform="translate(250 407)" filter="url(#intro-shadow)">
              <ellipse cy="27" rx="45" ry="12" fill="#214b40" opacity=".25"></ellipse>
              <path d="M-35 8 Q-60 17 -63 35 Q-42 28 -24 21 M35 8 Q60 17 63 35 Q42 28 24 21" fill="#337f60" stroke="#183c33" stroke-width="5" stroke-linecap="round"></path>
              <ellipse rx="45" ry="36" fill="#43a877" stroke="#183c33" stroke-width="5"></ellipse>
              <circle cx="-20" cy="-30" r="16" fill="#5bbf87" stroke="#183c33" stroke-width="5"></circle><circle cx="20" cy="-30" r="16" fill="#5bbf87" stroke="#183c33" stroke-width="5"></circle>
              <circle cx="-20" cy="-31" r="6" fill="#183c33"></circle><circle cx="20" cy="-31" r="6" fill="#183c33"></circle>
              <path d="M-15 10 Q0 23 15 10" fill="none" stroke="#183c33" stroke-width="5" stroke-linecap="round"></path>
            </g>
            <g class="reeds" fill="none" stroke="#315f50" stroke-width="6" stroke-linecap="round">
              <path d="M18 390 Q24 332 15 290 M35 394 Q43 338 55 309 M51 400 Q60 362 79 341"></path>
            </g>
            <rect x="24" y="24" width="72" height="72" rx="14" fill="#b84d3a"></rect>
            <path d="M42 43 H78 M42 60 H78 M42 77 H63 M59 43 V77" stroke="#f8e9d0" stroke-width="7" stroke-linecap="round" opacity=".9"></path>
          </svg>
          <p><span></span> 1 carré = 1 unité-saut</p>
        </div>
      </div>
    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true"><i></i></span>
          <p><small>Le jardin des unités</small><strong>Le saut juste</strong></p>
        </div>
        <div class="round-progress" aria-label={`Passage ${sceneIndex + 1} sur ${scenes.length} : ${scene.chapter}`}>
          {#each scenes as _progressScene, progressIndex}
            <span class:done={progressIndex < sceneIndex} class:current={progressIndex === sceneIndex}>{progressIndex + 1}</span>
          {/each}
        </div>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <div class="scene-heading">
          <span class="chapter-number" aria-hidden="true">0{sceneIndex + 1}</span>
          <header class="scene-copy">
            <p class="kicker">{scene.chapter}</p>
            <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
            <p>{scene.prompt}</p>
          </header>
        </div>

        <div class="pond-frame">
          <div class="frame-plaque" aria-hidden="true"><span></span> Jardin de l’étang <span></span></div>
          <section class="playfield" aria-label={`Grille unitaire, trajet ${scene.orientation === 'vertical' ? 'vertical' : 'horizontal'} : ${coveredUnits} unités parcourues`}>
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
                <pattern id={`unit-grid-${scene.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2f6f65" stroke-opacity=".5" stroke-width=".72"></path>
                </pattern>
              </defs>

              <rect class="pond-water" width="120" height="100" fill={`url(#pond-water-${scene.id})`}></rect>
              <rect class="pond-light" width="120" height="100" fill={`url(#pond-light-${scene.id})`}></rect>
              <g class="garden-scenery" aria-hidden="true">
                <path class="far-bank" d="M0 0 H120 V9 C110 7 104 12 95 10 C85 8 80 4 69 8 C56 13 47 6 36 8 C24 11 13 7 0 13Z"></path>
                <path class="near-bank" d="M0 100 H120 V94 C112 90 104 94 94 92 C84 89 77 96 65 93 C52 89 43 96 30 93 C18 90 9 95 0 91Z"></path>
                <g class="garden-stones">
                  <ellipse cx="5" cy="14" rx="7" ry="3.8"></ellipse><ellipse cx="13" cy="9" rx="5" ry="3"></ellipse>
                  <ellipse cx="109" cy="94" rx="8" ry="3.5"></ellipse><ellipse cx="118" cy="88" rx="6" ry="4"></ellipse>
                </g>
                <g class="garden-bridge" transform="translate(91 14)">
                  <path d="M-10 2 Q2 -11 14 2"></path><path d="M-11 3 H15"></path>
                  <path d="M-7 -1 V4 M-2 -6 V4 M4 -7 V4 M10 -3 V4"></path>
                </g>
                <g class="stone-lantern" transform="translate(108 31)">
                  <path d="M-4 -4 H4 L6 -1 H-6Z"></path><rect x="-3.8" y="-1" width="7.6" height="6" rx="1"></rect>
                  <path d="M-5 5 H5 M-2 5 V11 M-5 11 H5"></path><circle cy="2" r="1.2"></circle>
                </g>
                <g class="lotus lotus-one" transform="translate(102 76)">
                  <ellipse rx="8" ry="3.5" transform="rotate(-9)"></ellipse><path d="M0 0 L5 -4"></path>
                  <circle class="petal" cx="5" cy="-5.4" r="2.2"></circle><circle class="petal" cx="2.8" cy="-5" r="1.8"></circle><circle class="petal" cx="7" cy="-4.7" r="1.8"></circle>
                </g>
                <g class="lotus lotus-two" transform="translate(13 79)"><ellipse rx="6.5" ry="3" transform="rotate(8)"></ellipse><path d="M0 0 L-4 -3"></path></g>
                <g class="garden-reeds">
                  <path d="M3 54 Q4 43 2 35 M7 56 Q8 44 12 38 M113 64 Q114 53 112 47 M117 66 Q117 56 120 51"></path>
                </g>
                <g class="pond-ripples">
                  <path d="M5 25 Q13 22 21 25 M7 28 Q13 26 19 28"></path>
                  <path d="M94 48 Q104 45 114 48 M98 51 Q104 49 111 51"></path>
                  <path d="M4 70 Q10 67 17 70 M106 87 Q112 84 119 87"></path>
                </g>
              </g>
              <rect class="grid-surface" width="120" height="100" fill={`url(#unit-grid-${scene.id})`}></rect>
              <line class="route-bed" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
              <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>

              <g class="unit-reference" aria-label="Un côté de carré vaut une unité-saut">
                <rect x={unitReferenceLabel.x - 16} y={unitReferenceLabel.y - 4.1} width="32" height="6" rx="2"></rect>
                <line x1={unitReferenceStart.x} y1={unitReferenceStart.y} x2={unitReferenceEnd.x} y2={unitReferenceEnd.y}></line>
                <circle cx={unitReferenceStart.x} cy={unitReferenceStart.y} r="1.5"></circle>
                <circle cx={unitReferenceEnd.x} cy={unitReferenceEnd.y} r="1.5"></circle>
                <text x={unitReferenceLabel.x} y={unitReferenceLabel.y}>1 carré = 1 unité-saut</text>
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
                <line class:double={item.distance === 2} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
                <circle class="landing" cx={to.x} cy={to.y} r="1.8"></circle>
              {/each}

              {#each scene.obstacleUnits as units}
                {@const obstacle = pointAt(units, scene)}
                <g class="obstacle" transform={`translate(${obstacle.x} ${obstacle.y})`} aria-label="Grenouille orange à franchir par un saut de deux unités">
                  <ellipse class="frog-shadow" cy="4.6" rx="5.2" ry="1.6"></ellipse>
                  <path class="frog-leg" d="M-3.7 1 Q-6.2 2 -6.6 4.5 Q-4.8 4.1 -2.8 3 M3.7 1 Q6.2 2 6.6 4.5 Q4.8 4.1 2.8 3"></path>
                  <ellipse class="frog-body" rx="5.1" ry="4.2"></ellipse>
                  <circle class="frog-eye-bump" cx="-2.3" cy="-3.5" r="1.65"></circle><circle class="frog-eye-bump" cx="2.3" cy="-3.5" r="1.65"></circle>
                  <circle class="eye" cx="-2.3" cy="-3.6" r=".55"></circle><circle class="eye" cx="2.3" cy="-3.6" r=".55"></circle>
                  <path class="frog-mouth" d="M-1.8 1 Q0 2.3 1.8 1"></path>
                  <text y="11">saut de 2 unités</text>
                </g>
              {/each}

              <g class:short={outcome === 'short'} class:over={outcome === 'over'} class:running class="frog" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label={`Grenouille après ${executedActions} action${executedActions === 1 ? '' : 's'}`}>
                <ellipse class="frog-shadow" cy="4.8" rx="5.5" ry="1.7"></ellipse>
                <path class="frog-leg" d="M-4 1 Q-6.6 2 -7 4.8 Q-5 4.3 -2.9 3.1 M4 1 Q6.6 2 7 4.8 Q5 4.3 2.9 3.1"></path>
                <ellipse class="frog-body" rx="5.6" ry="4.5"></ellipse>
                <ellipse class="frog-belly" cy="1.3" rx="3.3" ry="2.4"></ellipse>
                <circle class="frog-eye-bump" cx="-2.5" cy="-3.8" r="1.8"></circle><circle class="frog-eye-bump" cx="2.5" cy="-3.8" r="1.8"></circle>
                <circle class="eye" cx="-2.5" cy="-3.9" r=".58"></circle><circle class="eye" cx="2.5" cy="-3.9" r=".58"></circle>
                <circle class="frog-cheek" cx="-3.7" cy="-.1" r=".55"></circle><circle class="frog-cheek" cx="3.7" cy="-.1" r=".55"></circle>
                <path class="frog-mouth" d="M-2 1 Q0 2.6 2 1"></path>
              </g>
              {#if scene.mode === 'tutorial'}
                <foreignObject x={frogPoint.x - 9} y={frogPoint.y - 9} width="18" height="18">
                  <button class="world-frog-control" type="button" data-smoke-control="jump" onclick={tutorialJump} aria-label="Toucher la grenouille pour lui faire faire un saut d’une unité"></button>
                </foreignObject>
              {/if}
            </svg>
          </section>
          <p class="board-measure"><span aria-hidden="true"></span> Chaque côté de carré garde exactement la longueur d’un saut ordinaire.</p>
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
        <svg viewBox="0 0 120 100" role="img" aria-label="La trace complète sur la grille carrée se termine exactement à l’Arrivée">
          <defs>
            <linearGradient id={`success-water-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#c4dfcd"></stop><stop offset="1" stop-color="#75ad9f"></stop>
            </linearGradient>
            <pattern id={`success-grid-${scene.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2f6f65" stroke-opacity=".5" stroke-width=".72"></path>
            </pattern>
          </defs>
          <rect class="pond-water" width="120" height="100" fill={`url(#success-water-${scene.id})`}></rect>
          <g class="garden-scenery" aria-hidden="true">
            <path class="far-bank" d="M0 0 H120 V9 C109 7 103 12 94 10 C84 8 79 4 68 8 C55 13 46 6 35 8 C23 11 12 7 0 13Z"></path>
            <path class="near-bank" d="M0 100 H120 V94 C110 90 103 94 93 92 C82 89 75 96 64 93 C51 89 42 96 29 93 C17 90 8 95 0 91Z"></path>
            <g class="garden-stones"><ellipse cx="5" cy="14" rx="7" ry="3.8"></ellipse><ellipse cx="110" cy="94" rx="8" ry="3.5"></ellipse></g>
            <g class="garden-bridge" transform="translate(91 14)"><path d="M-10 2 Q2 -11 14 2"></path><path d="M-11 3 H15"></path><path d="M-7 -1 V4 M-2 -6 V4 M4 -7 V4 M10 -3 V4"></path></g>
            <g class="stone-lantern" transform="translate(108 31)"><path d="M-4 -4 H4 L6 -1 H-6Z"></path><rect x="-3.8" y="-1" width="7.6" height="6" rx="1"></rect><path d="M-5 5 H5 M-2 5 V11 M-5 11 H5"></path><circle cy="2" r="1.2"></circle></g>
            <g class="lotus lotus-one" transform="translate(102 76)"><ellipse rx="8" ry="3.5" transform="rotate(-9)"></ellipse><path d="M0 0 L5 -4"></path><circle class="petal" cx="5" cy="-5.4" r="2.2"></circle><circle class="petal" cx="2.8" cy="-5" r="1.8"></circle><circle class="petal" cx="7" cy="-4.7" r="1.8"></circle></g>
            <g class="lotus lotus-two" transform="translate(13 79)"><ellipse rx="6.5" ry="3" transform="rotate(8)"></ellipse><path d="M0 0 L-4 -3"></path></g>
            <g class="garden-reeds"><path d="M3 54 Q4 43 2 35 M7 56 Q8 44 12 38 M113 64 Q114 53 112 47 M117 66 Q117 56 120 51"></path></g>
            <g class="pond-ripples"><path d="M5 25 Q13 22 21 25 M7 28 Q13 26 19 28"></path><path d="M94 48 Q104 45 114 48 M98 51 Q104 49 111 51"></path></g>
          </g>
          <rect class="grid-surface" width="120" height="100" fill={`url(#success-grid-${scene.id})`}></rect>
          <line class="route-bed" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
          <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
          <circle class="success-origin" cx={originPoint.x} cy={originPoint.y} r="3"></circle>
          <circle class="success-finish-halo" cx={finishPoint.x} cy={finishPoint.y} r="7"></circle>
          <circle class="success-finish" cx={finishPoint.x} cy={finishPoint.y} r="4"></circle>
          {#each trace as item}
            {@const from = pointAt(item.from, scene)}
            {@const to = pointAt(item.to, scene)}
            <line class:double={item.distance === 2} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
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
          <g class="frog" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label="Grenouille exactement à l’Arrivée">
            <ellipse class="frog-shadow" cy="4.8" rx="5.5" ry="1.7"></ellipse>
            <path class="frog-leg" d="M-4 1 Q-6.6 2 -7 4.8 Q-5 4.3 -2.9 3.1 M4 1 Q6.6 2 7 4.8 Q5 4.3 2.9 3.1"></path>
            <ellipse class="frog-body" rx="5.6" ry="4.5"></ellipse><ellipse class="frog-belly" cy="1.3" rx="3.3" ry="2.4"></ellipse>
            <circle class="frog-eye-bump" cx="-2.5" cy="-3.8" r="1.8"></circle><circle class="frog-eye-bump" cx="2.5" cy="-3.8" r="1.8"></circle>
            <circle class="eye" cx="-2.5" cy="-3.9" r=".58"></circle><circle class="eye" cx="2.5" cy="-3.9" r=".58"></circle>
            <circle class="frog-cheek" cx="-3.7" cy="-.1" r=".55"></circle><circle class="frog-cheek" cx="3.7" cy="-.1" r=".55"></circle>
            <path class="frog-mouth" d="M-2 1 Q0 2.6 2 1"></path>
          </g>
        </svg>
      </div>
    </section>
  {:else}
    <section class="complete" aria-labelledby="complete-title" tabindex="-1" data-smoke-completion>
      <div class="completion-art" aria-hidden="true">
        <svg viewBox="0 0 260 150">
          <path d="M8 116 Q130 72 252 116 V150 H8Z" fill="#87b7a6"></path>
          <circle cx="205" cy="42" r="30" fill="#e7bd5c"></circle>
          <path d="M58 104 Q88 58 118 104 M52 105 H124" fill="none" stroke="#a95842" stroke-width="8" stroke-linecap="round"></path>
          <g transform="translate(158 100)"><ellipse cy="12" rx="28" ry="7" fill="#325f53" opacity=".25"></ellipse><ellipse rx="25" ry="20" fill="#45a979" stroke="#183c33" stroke-width="3"></ellipse><circle cx="-11" cy="-17" r="9" fill="#58bc87" stroke="#183c33" stroke-width="3"></circle><circle cx="11" cy="-17" r="9" fill="#58bc87" stroke="#183c33" stroke-width="3"></circle><circle cx="-11" cy="-18" r="3" fill="#183c33"></circle><circle cx="11" cy="-18" r="3" fill="#183c33"></circle><path d="M-8 5 Q0 12 8 5" fill="none" stroke="#183c33" stroke-width="3" stroke-linecap="round"></path></g>
        </svg>
      </div>
      <p class="kicker">Traversée terminée</p>
      <h1 id="complete-title">Les quatre rives sont reliées.</h1>
      <p>Tu as observé l’unité, prévu des sauts dans deux directions, puis composé un passage avec un saut double.</p>
      <button class="secondary" type="button" onclick={restart}>Recommencer la traversée</button>
      <p class="boundary">Ce prototype ne conserve ni n’envoie aucune réponse.</p>
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
  .boundary { margin: 0; color: #5e7069; font-size: .82rem; line-height: 1.5; }

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

  .intro {
    width: min(1120px, calc(100% - 32px));
    min-height: 100vh;
    display: grid;
    align-items: center;
    margin: auto;
    padding: 34px 0;
  }
  .intro-card {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, .92fr) minmax(360px, 1.08fr);
    align-items: center;
    gap: clamp(24px, 5vw, 68px);
    overflow: hidden;
    padding: clamp(28px, 5vw, 70px);
    border: 1px solid rgba(54, 87, 72, .22);
    border-radius: 38px;
    background:
      linear-gradient(90deg, rgba(184, 77, 58, .06) 1px, transparent 1px) 0 0 / 34px 34px,
      linear-gradient(rgba(184, 77, 58, .05) 1px, transparent 1px) 0 0 / 34px 34px,
      rgba(250, 246, 232, .94);
    box-shadow: 0 24px 70px rgba(35, 74, 61, .18), 0 5px 0 rgba(61, 95, 79, .18);
  }
  .intro-card::before {
    content: "";
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(157, 72, 54, .15);
    border-radius: 27px;
    pointer-events: none;
  }
  .intro-copy { position: relative; z-index: 1; display: grid; justify-items: start; gap: 20px; }
  .intro-copy .primary { margin-top: 6px; }
  .intro-art {
    position: relative;
    min-width: 0;
    filter: drop-shadow(0 16px 18px rgba(30, 66, 55, .15));
  }
  .intro-art svg { border: 9px solid #f7edd4; border-radius: 32px; box-shadow: 0 0 0 1px #a8b9a4; }
  .intro-art > p {
    position: absolute;
    right: 18px;
    bottom: 17px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 8px 11px;
    border: 1px solid rgba(24, 60, 51, .18);
    border-radius: 999px;
    background: rgba(255, 251, 235, .92);
    color: #244c41;
    font-size: .75rem;
    font-weight: 850;
    box-shadow: 0 5px 12px rgba(23, 56, 47, .12);
  }
  .intro-art > p span { width: 18px; height: 18px; border: 2px solid var(--persimmon); background: rgba(184, 77, 58, .08); }

  .game-shell { min-height: 100vh; }
  .topbar {
    min-height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 11px clamp(16px, 4vw, 52px);
    border-bottom: 1px solid rgba(38, 79, 65, .18);
    background: rgba(249, 246, 232, .88);
    box-shadow: 0 3px 18px rgba(35, 74, 61, .08);
    backdrop-filter: blur(14px);
  }
  .brand { min-width: 0; display: flex; align-items: center; gap: 11px; }
  .brand-mark {
    position: relative;
    flex: 0 0 auto;
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 13px 13px 18px 18px;
    background: var(--jade);
    box-shadow: inset 0 -4px 0 rgba(15, 55, 45, .23);
  }
  .brand-mark::before, .brand-mark::after, .brand-mark i {
    content: "";
    width: 13px;
    height: 16px;
    border-radius: 100% 0 100% 0;
    background: #f7e6ad;
    transform: rotate(-45deg) translate(2px, 1px);
  }
  .brand-mark::before { position: absolute; transform: rotate(-78deg) translate(-2px, -2px); opacity: .85; }
  .brand-mark::after { position: absolute; transform: rotate(-12deg) translate(2px, -2px); opacity: .85; }
  .brand-mark i { position: relative; z-index: 1; display: block; }
  .brand p { min-width: 0; display: grid; gap: 1px; margin: 0; }
  .brand small { color: #78887f; font-size: .64rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  .brand strong { overflow: hidden; color: var(--ink); font-family: Georgia, serif; font-size: 1.05rem; text-overflow: ellipsis; white-space: nowrap; }
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

  .scene { width: min(1040px, calc(100% - 32px)); margin: auto; padding: 34px 0 62px; }
  .scene-heading {
    width: min(820px, 100%);
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: 17px;
    margin: 0 auto 20px;
  }
  .chapter-number {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(39, 91, 73, .25);
    border-radius: 50%;
    background: #faf5e6;
    color: var(--jade);
    font-family: Georgia, serif;
    font-size: 1.15rem;
    font-weight: 700;
    box-shadow: inset 0 0 0 5px #e5eadb;
  }
  .scene-copy { display: grid; gap: 7px; }
  .scene-copy h1 { font-size: clamp(2rem, 5vw, 3.8rem); }
  .scene-copy > p:last-child { max-width: 47rem; margin: 0; color: #49645a; font-size: 1rem; line-height: 1.5; }

  .pond-frame {
    position: relative;
    width: min(820px, 100%);
    margin: 30px auto 0;
    padding: 9px;
    border: 7px solid #6c4836;
    border-radius: 30px;
    background: linear-gradient(145deg, #d69a5f, #9a5d3d 58%, #74432f);
    box-shadow: inset 0 0 0 2px rgba(255, 232, 187, .3), 0 12px 0 #b8c6b3, 0 24px 48px rgba(34, 73, 60, .19);
  }
  .frame-plaque {
    position: absolute;
    z-index: 2;
    top: -24px;
    left: 50%;
    display: flex;
    align-items: center;
    gap: 9px;
    transform: translateX(-50%);
    padding: 7px 14px;
    border: 1px solid #60402f;
    border-radius: 999px;
    background: #f6e8c6;
    color: #583c2e;
    font-size: .71rem;
    font-weight: 900;
    letter-spacing: .06em;
    text-transform: uppercase;
    white-space: nowrap;
    box-shadow: 0 4px 0 rgba(91, 61, 45, .25);
  }
  .frame-plaque span { width: 5px; height: 5px; border-radius: 50%; background: var(--persimmon); }
  .playfield { width: 100%; overflow: hidden; border: 1px solid rgba(18, 57, 48, .62); border-radius: 18px; background: #91c2b3; }
  .playfield svg, .success-map svg { aspect-ratio: 6 / 5; }
  .board-measure {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin: 8px 0 0;
    padding: 8px 10px 4px;
    color: #fff7e5;
    font-size: .78rem;
    font-weight: 750;
    line-height: 1.35;
    text-align: center;
  }
  .board-measure span { flex: 0 0 auto; width: 15px; height: 15px; border: 2px solid #f0d27b; background: rgba(255, 255, 255, .08); }

  .garden-scenery { pointer-events: none; }
  .far-bank { fill: #78947d; }
  .near-bank { fill: #587b68; }
  .garden-stones ellipse { fill: #d7d1bb; stroke: #65766c; stroke-width: .55; }
  .garden-bridge path { fill: none; stroke: #9f4e3d; stroke-width: 1.4; stroke-linecap: round; }
  .garden-bridge path:nth-child(2) { stroke: #684235; stroke-width: 1.8; }
  .garden-bridge path:nth-child(3) { stroke-width: .7; }
  .stone-lantern path, .stone-lantern rect { fill: #d6d0ba; stroke: #53675f; stroke-width: .55; }
  .stone-lantern circle { fill: #f1c85c; stroke: #725f34; stroke-width: .45; }
  .lotus ellipse { fill: #397967; stroke: #24594d; stroke-width: .55; }
  .lotus path { fill: none; stroke: #24594d; stroke-width: .55; }
  .lotus .petal { fill: #f0c0b1; stroke: #9d594f; stroke-width: .38; }
  .lotus-two { opacity: .78; }
  .garden-reeds path { fill: none; stroke: #2d6352; stroke-width: 1.1; stroke-linecap: round; }
  .pond-ripples path { fill: none; stroke: #e8f1dc; stroke-width: .75; stroke-linecap: round; opacity: .72; }
  .grid-surface { pointer-events: none; }
  .route-bed { stroke: rgba(251, 247, 220, .66); stroke-width: 5.8; stroke-linecap: round; }
  .target-line { stroke: #34594f; stroke-width: 1.25; stroke-dasharray: 1.8 1.5; stroke-linecap: round; }

  .unit-reference rect { fill: rgba(255, 249, 229, .94); stroke: rgba(101, 68, 47, .32); stroke-width: .35; }
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

  .completed-line { stroke: #f1bc42; stroke-linecap: round; filter: drop-shadow(0 1px .45px rgba(83, 58, 25, .5)); }
  .completed-line.double { stroke: #c95f3f; stroke-dasharray: 3 1.3; }
  .landing { fill: #fff5c5; stroke: #70462d; stroke-width: .75; }
  .frog { transition: transform 240ms cubic-bezier(.77, 0, .175, 1); }
  .frog-shadow { fill: #1b4c40; opacity: .25; stroke: none; }
  .frog .frog-leg { fill: #2d7658; stroke: #153c32; stroke-width: .65; stroke-linecap: round; stroke-linejoin: round; }
  .frog .frog-body { fill: #47ae79; stroke: #153c32; stroke-width: .7; }
  .frog .frog-belly { fill: #7dcc97; stroke: none; opacity: .75; }
  .frog .frog-eye-bump { fill: #62c68a; stroke: #153c32; stroke-width: .65; }
  .frog .eye { fill: #153c32; stroke: none; }
  .frog .frog-cheek { fill: #e9a381; stroke: none; opacity: .75; }
  .frog .frog-mouth { fill: none; stroke: #153c32; stroke-width: .65; stroke-linecap: round; }
  .frog.short { animation: worried 350ms ease-out 2; }
  .frog.over { animation: splash 450ms ease-out 1; }
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
  .success-finish-halo { fill: rgba(248, 220, 125, .36); stroke: #f8dc7d; stroke-width: 1.1; }
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
  .completion-art { width: min(310px, 76vw); margin-bottom: -6px; }
  .completion-art svg { filter: drop-shadow(0 12px 16px rgba(32, 72, 59, .16)); }
  .complete h1 { max-width: 640px; font-size: clamp(2.5rem, 7vw, 5rem); }
  .complete > p:not(.kicker, .boundary) { max-width: 560px; margin: 0; color: #446158; font-size: 1.05rem; line-height: 1.6; }

  @keyframes worried { 50% { filter: saturate(.45) brightness(1.16); } }
  @keyframes splash { 50% { opacity: .5; filter: hue-rotate(18deg); } }
  @keyframes seal-in { from { opacity: 0; transform: scale(.9) rotate(-4deg); } to { opacity: 1; transform: scale(1) rotate(0); } }

  @media (hover: hover) and (pointer: fine) {
    .primary:hover { background: #205347; transform: translateY(-1px); }
    .secondary:hover, .retry:hover { background: #f4ead2; transform: translateY(-1px); }
    .world-frog-control:hover { border-color: rgba(255, 249, 225, .92); background: rgba(255, 255, 255, .14); }
  }

  @media (prefers-reduced-motion: reduce) {
    .frog, .primary, .secondary, .retry { transition: none; animation: none !important; }
    .success-seal { animation: none; }
  }

  @media (max-width: 820px) {
    .intro-card { grid-template-columns: 1fr; width: min(660px, 100%); margin: auto; }
    .intro-copy { justify-items: center; text-align: center; }
    .intro-art { width: min(500px, 100%); justify-self: center; }
    .success { grid-template-columns: 1fr; width: min(680px, calc(100% - 32px)); justify-items: center; gap: 30px; text-align: center; }
    .success-seal { position: static; }
    .success-copy { justify-items: center; }
    .success-map { width: min(600px, 100%); }
    .success-feedback { border-left: 1px solid rgba(44, 91, 74, .2); border-top: 4px solid var(--jade); border-radius: 16px; }
  }

  @media (max-width: 520px) {
    .intro { width: calc(100% - 16px); padding: 8px 0; }
    .intro-card { gap: 20px; padding: 24px 18px 20px; border-radius: 26px; }
    .intro-card::before { inset: 8px; border-radius: 19px; }
    .intro-copy { gap: 15px; }
    .intro-copy h1 { font-size: clamp(2.8rem, 17vw, 4rem); }
    .intro-art svg { border-width: 5px; border-radius: 20px; }
    .intro-art > p { right: 9px; bottom: 9px; padding: 6px 8px; font-size: .66rem; }
    .intro-art > p span { width: 14px; height: 14px; }
    .primary, .secondary, .retry { min-height: 48px; padding: 12px 17px; }

    .topbar { min-height: 64px; gap: 10px; padding: 9px 10px; }
    .brand { gap: 7px; }
    .brand-mark { width: 32px; height: 32px; border-radius: 10px 10px 14px 14px; }
    .brand-mark::before, .brand-mark::after, .brand-mark i { width: 10px; height: 13px; }
    .brand small { display: none; }
    .brand strong { font-size: .9rem; }
    .round-progress { gap: 4px; }
    .round-progress span { width: 25px; height: 25px; font-size: .66rem; }

    .scene { width: calc(100% - 12px); padding: 22px 0 44px; }
    .scene-heading { gap: 10px; margin-bottom: 16px; padding-inline: 6px; }
    .chapter-number { width: 45px; height: 45px; box-shadow: inset 0 0 0 3px #e5eadb; font-size: .92rem; }
    .scene-copy { gap: 5px; }
    .scene-copy h1 { font-size: clamp(1.8rem, 10vw, 2.5rem); line-height: 1; }
    .scene-copy > p:last-child { font-size: .9rem; line-height: 1.42; }

    .pond-frame { margin-top: 25px; padding: 3px; border-width: 3px; border-radius: 18px; box-shadow: inset 0 0 0 1px rgba(255, 232, 187, .3), 0 7px 0 #b8c6b3, 0 14px 28px rgba(34, 73, 60, .15); }
    .frame-plaque { top: -20px; padding: 5px 10px; font-size: .62rem; box-shadow: 0 3px 0 rgba(91, 61, 45, .22); }
    .playfield { border-radius: 13px; }
    .unit-reference text { font-size: 3.75px; }
    .marker text { font-size: 4.25px; stroke-width: 2.1px; }
    .obstacle text { font-size: 3.45px; stroke-width: 1.9px; }
    .board-measure { margin-top: 5px; padding: 7px 6px 4px; font-size: .72rem; }
    .board-measure span { width: 13px; height: 13px; }

    .tutorial-control, .prediction-panel { width: calc(100% - 10px); margin-top: 19px; padding: 15px 10px; border-radius: 18px; }
    .prediction-panel label { font-size: 1.22rem; }
    .prediction-entry input { width: 78px; min-height: 59px; font-size: 2.1rem; }
    .world-message { width: calc(100% - 10px); min-height: 61px; grid-template-columns: 30px minmax(0, 1fr); gap: 8px; padding: 11px 12px; font-size: .88rem; }
    .world-message > span { width: 28px; height: 28px; }

    .success { width: calc(100% - 16px); gap: 22px; padding: 28px 0 38px; }
    .success-copy { gap: 14px; }
    .success h1 { font-size: clamp(2.3rem, 13vw, 3.4rem); }
    .success-feedback { padding: 13px; font-size: .92rem; }
    .success-map { border-width: 5px; border-radius: 18px; box-shadow: 0 7px 0 #b8c6b3, 0 16px 30px rgba(32, 72, 59, .16); }
    .complete { width: calc(100% - 24px); padding: 32px 0; }
  }
</style>
