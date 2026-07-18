<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import introArt from './assets/imagegen/intro.webp';
  import retryArt from './assets/imagegen/outro-retry.webp';
  import victoryArt from './assets/imagegen/outro-victory.webp';
  import {
    advanceTugRound,
    answerTugRound,
    createTugRound,
    type TugConfig
  } from './tug-engine';

  type View = 'intro' | 'active' | 'success' | 'failure' | 'complete';
  type Reaction = 'correct' | 'wrong' | null;
  type TerminalOutcome = 'won' | 'lost';
  type Problem = { left: number; right: number; options: number[] };
  type Scene = {
    id: string;
    eyebrow: string;
    title: string;
    prompt: string;
    goal: number;
    opponentPace: number;
    problems: Problem[];
  };

  const TERMINAL_SETTLE_MS = 180;
  const REDUCED_TERMINAL_SETTLE_MS = 100;

  const scenes: Scene[] = [
    {
      id: 'orientation',
      eyebrow: 'Manche 1 · traction lente',
      title: 'Trouve la somme. Reprends la corde.',
      prompt: 'Le bleu avance doucement. Chaque réponse exacte déclenche un contre-tirage rouge.',
      goal: 2,
      opponentPace: 0.04,
      problems: [
        { left: 4, right: 3, options: [6, 8, 7, 9] },
        { left: 6, right: 2, options: [9, 7, 10, 8] },
        { left: 5, right: 4, options: [8, 10, 9, 7] },
        { left: 7, right: 3, options: [11, 10, 9, 12] }
      ]
    },
    {
      id: 'pressure',
      eyebrow: 'Manche 2 · rythme soutenu',
      title: 'Le bleu accélère.',
      prompt: 'La traction adverse augmente. Reste précis pour regagner du terrain.',
      goal: 2,
      opponentPace: 0.06,
      problems: [
        { left: 8, right: 5, options: [12, 14, 13, 11] },
        { left: 9, right: 6, options: [16, 14, 17, 15] },
        { left: 7, right: 8, options: [15, 14, 16, 13] },
        { left: 9, right: 4, options: [12, 13, 14, 11] }
      ]
    },
    {
      id: 'independent',
      eyebrow: 'Manche 3 · défi final',
      title: 'Tiens jusqu’à la balise.',
      prompt: 'Trois crans à reprendre face à la traction la plus forte.',
      goal: 3,
      opponentPace: 0.075,
      problems: [
        { left: 9, right: 8, options: [16, 18, 15, 17] },
        { left: 6, right: 7, options: [14, 12, 13, 15] },
        { left: 8, right: 8, options: [15, 16, 17, 14] },
        { left: 7, right: 9, options: [17, 15, 16, 18] },
        { left: 6, right: 9, options: [14, 16, 13, 15] }
      ]
    }
  ];

  let view: View = 'intro';
  let sceneIndex = 0;
  let problemIndex = 0;
  let tugRound = createTugRound();
  let reaction: Reaction = null;
  let terminalOutcome: TerminalOutcome | null = null;
  let lastMiss: string | null = null;
  let errorProbeCompleted = false;
  let announcement = '';
  let rootElement: HTMLElement;
  let animationFrame: number | undefined;
  let reactionTimer: ReturnType<typeof setTimeout> | undefined;
  let terminalTimer: ReturnType<typeof setTimeout> | undefined;
  let lastFrameTime = 0;

  $: scene = scenes[sceneIndex];
  $: tugConfig = { goal: scene.goal, opponentPace: scene.opponentPace } satisfies TugConfig;
  $: problem = scene.problems[problemIndex % scene.problems.length];
  $: answer = problem.left + problem.right;
  $: ropePosition = tugRound.position;
  $: redLead = Math.round(Math.max(0, -ropePosition) * 10) / 10;
  $: blueLead = Math.round(Math.max(0, ropePosition) * 10) / 10;
  $: ropeLabel = Math.abs(ropePosition) < 0.05
    ? 'La corde est au centre.'
    : ropePosition < 0
      ? `L’équipe rouge mène de ${redLead.toFixed(1)} cran.`
      : `L’équipe bleue mène de ${blueLead.toFixed(1)} cran.`;
  $: smokeState = view === 'intro' ? 'ready' : view === 'active' ? 'active' : view === 'success' ? 'success' : 'complete';
  $: pullsNeeded = Math.max(1, Math.ceil(scene.goal + ropePosition));
  $: smokeSuccessPlan = view === 'active'
    ? Array.from({ length: pullsNeeded }, () => 'answer').join(',')
    : undefined;
  $: smokeErrorPlan = view === 'active' && scene.id === 'orientation' && !errorProbeCompleted && lastMiss === null
    ? 'wrong'
    : undefined;
  $: smokeRecoveryPlan = view === 'active' && lastMiss !== null ? 'answer' : undefined;

  onDestroy(() => {
    stopOpponentPull();
    clearReactionTimer();
    clearTerminalTimer();
  });

  function stopOpponentPull(): void {
    if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
  }

  function clearReactionTimer(): void {
    if (reactionTimer !== undefined) clearTimeout(reactionTimer);
    reactionTimer = undefined;
  }

  function clearTerminalTimer(): void {
    if (terminalTimer !== undefined) clearTimeout(terminalTimer);
    terminalTimer = undefined;
  }

  function showReaction(nextReaction: Exclude<Reaction, null>): void {
    clearReactionTimer();
    reaction = nextReaction;
    reactionTimer = setTimeout(() => {
      reaction = null;
      reactionTimer = undefined;
    }, 220);
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function terminalSettleDuration(): number {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? REDUCED_TERMINAL_SETTLE_MS
      : TERMINAL_SETTLE_MS;
  }

  function settleTerminalOutcome(outcome: TerminalOutcome): void {
    stopOpponentPull();
    clearTerminalTimer();
    terminalOutcome = outcome;
    announcement = outcome === 'won'
      ? `${announcement} Balise rouge atteinte.`
      : 'L’équipe bleue a atteint sa balise. La manche est terminée.';

    terminalTimer = setTimeout(() => {
      terminalTimer = undefined;
      clearReactionTimer();
      reaction = null;
      terminalOutcome = null;

      if (outcome === 'won') {
        view = 'success';
        void focus('[data-smoke-feedback="success"]');
        return;
      }

      view = 'failure';
      void focus('#failure-title');
    }, terminalSettleDuration());
  }

  function startOpponentPull(): void {
    stopOpponentPull();
    if (view !== 'active') return;
    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(advanceOpponentPull);
  }

  function advanceOpponentPull(now: number): void {
    if (view !== 'active') {
      stopOpponentPull();
      return;
    }

    const elapsedSeconds = (now - lastFrameTime) / 1000;
    lastFrameTime = now;
    tugRound = advanceTugRound(tugRound, elapsedSeconds, tugConfig);

    if (tugRound.outcome === 'lost') {
      settleTerminalOutcome('lost');
      return;
    }

    animationFrame = requestAnimationFrame(advanceOpponentPull);
  }

  function loadScene(index: number): void {
    stopOpponentPull();
    clearReactionTimer();
    clearTerminalTimer();
    sceneIndex = index;
    problemIndex = 0;
    tugRound = createTugRound();
    reaction = null;
    terminalOutcome = null;
    lastMiss = null;
    errorProbeCompleted = false;
    view = 'active';
    void tick().then(startOpponentPull);
  }

  async function start(): Promise<void> {
    loadScene(0);
    announcement = 'Première manche. La corde est au centre et l’équipe bleue commence à tirer.';
    await focus('#scene-title');
  }

  function selectAnswer(option: number): void {
    if (view !== 'active' || terminalOutcome !== null || tugRound.outcome !== 'playing') return;

    lastMiss = null;
    const isCorrect = option === answer;
    tugRound = answerTugRound(tugRound, isCorrect, tugConfig);

    if (isCorrect) {
      showReaction('correct');
      announcement = `${problem.left} plus ${problem.right} égale ${answer}. Contre-tirage rouge.`;

      if (tugRound.outcome === 'won') {
        settleTerminalOutcome('won');
        return;
      }
    } else {
      showReaction('wrong');
      errorProbeCompleted = true;
      lastMiss = `Contre-tirage bleu : ${problem.left} + ${problem.right} = ${answer}.`;
      announcement = `${problem.left} plus ${problem.right} égale ${answer}. L’équipe bleue reprend un cran en continu.`;
    }

    problemIndex += 1;
  }

  async function retryScene(): Promise<void> {
    loadScene(sceneIndex);
    announcement = `La manche ${sceneIndex + 1} recommence. La corde revient au centre.`;
    await focus('#scene-title');
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      stopOpponentPull();
      view = 'complete';
      announcement = 'Les trois manches de la corde des sommes sont terminées.';
      await focus('[data-smoke-completion]');
      return;
    }

    loadScene(sceneIndex + 1);
    announcement = `${scenes[sceneIndex].title} La corde revient au centre.`;
    await focus('#scene-title');
  }

  async function restart(): Promise<void> {
    stopOpponentPull();
    clearReactionTimer();
    clearTerminalTimer();
    view = 'intro';
    sceneIndex = 0;
    problemIndex = 0;
    tugRound = createTugRound();
    reaction = null;
    terminalOutcome = null;
    lastMiss = null;
    errorProbeCompleted = false;
    announcement = 'Retour à la présentation de la corde des sommes.';
    await focus('#intro-title');
  }
</script>

<svelte:head>
  <title>La corde des sommes · EX-0006</title>
  <meta name="description" content="Un jeu de calcul mental où chaque somme exacte contre la traction continue d’un adversaire." />
  <meta name="color-scheme" content="light only" />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-root
  data-smoke-exercise="EX-0006"
  data-smoke-program="program-graybox-precedents"
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
      <div class="intro-copy">
        <div class="intro-meta">
          <div class="brand-pill"><span aria-hidden="true">↔</span> Calcul mental</div>
          <p class="kicker">Sommes jusqu’à 20</p>
        </div>
        <h1 id="intro-title" tabindex="-1">La corde<br /><em>des sommes</em></h1>
        <p class="lead">Le bleu tire sans s’arrêter. Trouve la bonne somme pour reprendre la corde, une réponse après l’autre.</p>
        <div class="intro-actions">
          <button class="primary" type="button" data-smoke-action="start" onclick={start}>
            Entrer dans l’arène <span aria-hidden="true">→</span>
          </button>
          <div class="intro-facts" aria-label="Règles du jeu">
            <span><b>3</b> manches</span>
            <span><b>4</b> choix</span>
            <span><b>1</b> corde</span>
          </div>
        </div>
      </div>
      <img class="intro-art" src={introArt} alt="" />
    </section>
  {:else if view === 'active'}
    <section class="game-shell" aria-labelledby="scene-title">
      <header class="topbar">
        <div class="wordmark"><span aria-hidden="true">↔</span><strong>La corde des sommes</strong></div>
        <ol aria-label={`Manche ${sceneIndex + 1} sur ${scenes.length}`}>
          {#each scenes as _item, index}
            <li
              class:done={index < sceneIndex}
              class:current={index === sceneIndex}
              aria-current={index === sceneIndex ? 'step' : undefined}
            >
              <span class="sr-only">Manche </span>{index + 1}
            </li>
          {/each}
        </ol>
      </header>

      <div class="play-layout">
        <section class="match-card" aria-labelledby="scene-title">
          <header class="match-heading">
            <div>
              <p class="kicker">{scene.eyebrow}</p>
              <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
            </div>
            <div class="live-badge"><i></i> Traction continue</div>
          </header>
          <p class="scene-prompt">{scene.prompt}</p>

          <section
            class:counter={reaction === 'correct' || terminalOutcome === 'won'}
            class:miss={reaction === 'wrong' || terminalOutcome === 'lost'}
            class:terminal={terminalOutcome !== null}
            class="arena"
            style={`--goal-offset: ${scene.goal * 4.9}%`}
            aria-label={ropeLabel}
          >
            <div class="arena-team red-team"><span>Ton équipe</span><strong>ROUGE</strong></div>
            <div class="arena-team blue-team"><span>Adversaire</span><strong>BLEU</strong></div>
            <div class="goal-marker goal-marker-left" aria-hidden="true"><i></i></div>
            <div class="goal-marker goal-marker-right" aria-hidden="true"><i></i></div>

            <div class="tug-line" style={`--rope-shift: ${ropePosition * 7}%`}>
              <div class="figure figure-red" aria-hidden="true"></div>
              <div class="rope"><b></b></div>
              <div class="figure figure-blue" aria-hidden="true"></div>
            </div>
          </section>

          <div
            class:leading-red={ropePosition < -0.05}
            class:leading-blue={ropePosition > 0.05}
            class="tug-readout"
            style={`--tug-progress: ${50 + Math.max(-1, Math.min(1, ropePosition / scene.goal)) * 50}%`}
            aria-hidden="true"
          >
            <span class="readout-team readout-red">← Rouge</span>
            <span class="readout-track"><i></i><b>Centre</b></span>
            <span class="readout-team readout-blue">Bleu →</span>
          </div>
        </section>

        <section class:correct={reaction === 'correct'} class:wrong={reaction === 'wrong'} class="challenge-card" aria-labelledby="problem-title">
          <div class="challenge-meta">
            <p id="problem-title">Choisis la somme</p>
            <span>Question {(problemIndex % scene.problems.length) + 1} sur {scene.problems.length}</span>
          </div>
          <div class="equation" aria-label={`${problem.left} plus ${problem.right} égale combien ?`}>
            <span>{problem.left}</span><i>+</i><span>{problem.right}</span><i>=</i><b>?</b>
          </div>
          <div class="answer-grid" aria-label="Quatre résultats proposés">
            {#each problem.options as option, optionIndex}
              <button
                type="button"
                data-smoke-control={option === answer ? 'answer' : optionIndex === 0 && option !== answer ? 'wrong' : undefined}
                aria-label={`${problem.left} plus ${problem.right} égale ${option}`}
                onclick={() => selectAnswer(option)}
              >{option}</button>
            {/each}
          </div>
          <div class="feedback-slot">
            <p class:feedback-hidden={lastMiss !== null} class="quiet-rule" aria-hidden={lastMiss !== null ? 'true' : undefined}>
              <span aria-hidden="true">←</span> Une réponse exacte tire vers le rouge.
            </p>
            <p
              class:feedback-visible={lastMiss !== null}
              class="miss-note"
              aria-hidden={lastMiss === null ? 'true' : undefined}
              data-smoke-feedback={lastMiss !== null ? 'error' : undefined}
              data-smoke-feedback-detail={lastMiss !== null ? 'true' : undefined}
            >{lastMiss ?? ''}</p>
          </div>
        </section>
      </div>
    </section>
  {:else if view === 'success'}
    <section class="result-screen success" aria-labelledby="success-title" data-round-outcome="success">
      <div class="result-card">
        <img class="result-art" src={victoryArt} alt="" />
        <div class="result-body">
          <p class="kicker">Manche {sceneIndex + 1} sur {scenes.length}</p>
          <h1 id="success-title" tabindex="-1">Balise rouge atteinte.</h1>
          <p class="result-copy" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true">
            Tes réponses exactes ont été plus fortes que la traction continue.
          </p>
          <div class="result-actions">
            <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>
              {sceneIndex === scenes.length - 1 ? 'Voir le bilan' : 'Manche suivante'} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  {:else if view === 'failure'}
    <section
      class="result-screen failure"
      aria-labelledby="failure-title"
      tabindex="-1"
      data-round-outcome="loss"
      data-smoke-completion
    >
      <div class="result-card">
        <img class="result-art" src={retryArt} alt="" />
        <div class="result-body">
          <p class="kicker">Manche {sceneIndex + 1} sur {scenes.length}</p>
          <h1 id="failure-title" tabindex="-1">Balise bleue atteinte.</h1>
          <p class="result-copy">La traction adverse a remporté cette manche. Repars du centre et garde tes additions précises.</p>
          <div class="result-actions">
            <button class="primary" type="button" onclick={retryScene}>Rejouer la manche <span aria-hidden="true">↺</span></button>
            <button class="secondary" type="button" onclick={restart}>Quitter la partie</button>
          </div>
        </div>
      </div>
    </section>
  {:else}
    <section class="result-screen complete" aria-labelledby="complete-title" tabindex="-1" data-smoke-completion>
      <div class="result-card complete-card">
        <div class="medal" aria-hidden="true"><span>3</span><i></i></div>
        <p class="kicker">Défi terminé</p>
        <h1 id="complete-title">Trois manches.<br />Une corde bien tenue.</h1>
        <p class="result-copy">Tu as gardé tes additions précises pendant que la traction adverse augmentait.</p>
        <div class="result-actions">
          <button class="secondary" type="button" onclick={restart}>Rejouer les manches</button>
        </div>
        <p class="privacy-note">Aucun score ni résultat n’est conservé.</p>
      </div>
    </section>
  {/if}
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(button) { font: inherit; }
  :global(button:focus-visible), [tabindex="-1"]:focus-visible { outline: 3px solid #3F876A; outline-offset: 4px; }

  .prototype-root {
    --cyan: #50E2F2;
    --olive: #BBBF36;
    --cream: #F2E8C9;
    --green: #3F876A;
    --coral: #F25749;
    --ink: #243b34;
    --muted: #536d64;
    --paper: color-mix(in srgb, var(--cream) 44%, white);
    --surface: #ffffff;
    --surface-sky: color-mix(in srgb, var(--cyan) 14%, white);
    --surface-warm: color-mix(in srgb, var(--cream) 66%, white);
    --line: color-mix(in srgb, var(--green) 20%, white);
    --line-strong: color-mix(in srgb, var(--green) 34%, white);
    --red: var(--coral);
    --red-dark: color-mix(in srgb, var(--coral) 58%, var(--ink));
    --red-soft: color-mix(in srgb, var(--coral) 13%, white);
    --blue: var(--cyan);
    --blue-dark: color-mix(in srgb, var(--cyan) 38%, var(--ink));
    --blue-soft: color-mix(in srgb, var(--cyan) 16%, white);
    --teal: var(--green);
    --yellow: var(--olive);
    --ease-out: cubic-bezier(.23, 1, .32, 1);
    --prototype-height: calc(100svh - 42px);
    min-height: var(--prototype-height);
    color-scheme: only light;
    overflow-x: clip;
    color: var(--ink);
    background:
      radial-gradient(circle at 8% 0%, rgba(80,226,242,.18), transparent 30rem),
      radial-gradient(circle at 96% 14%, rgba(242,232,201,.48), transparent 30rem),
      linear-gradient(180deg, #f8fdfb 0%, #fbfcf5 52%, #fffdf8 100%);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-optical-sizing: auto;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .kicker { margin: 0; color: var(--red-dark); font-size: .72rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  h1 { margin: 0; font-weight: 850; letter-spacing: -.055em; line-height: .94; }
  button { cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .primary, .secondary { min-height: 54px; display: inline-flex; align-items: center; justify-content: center; gap: 16px; padding: 14px 20px; border-radius: 15px; font-weight: 800; transition: transform 140ms var(--ease-out), box-shadow 140ms var(--ease-out), background-color 140ms ease; }
  .primary { border: 1px solid color-mix(in srgb, var(--green) 72%, var(--ink)); color: white; background: color-mix(in srgb, var(--green) 88%, var(--ink)); box-shadow: 0 8px 18px rgba(63,135,106,.2), inset 0 1px rgba(255,255,255,.18); }
  .primary span { color: var(--olive); font-size: 1.3rem; }
  .secondary { border: 1px solid var(--line-strong); color: var(--ink); background: color-mix(in srgb, var(--cream) 28%, white); box-shadow: 0 5px 14px rgba(63,135,106,.08); }
  .primary:active, .secondary:active { transform: scale(.97); box-shadow: 0 2px 6px rgba(63,135,106,.14); }

  .intro {
    --intro-ink: var(--ink);
    --intro-coral: var(--coral);
    --intro-coral-dark: var(--red-dark);
    --intro-sky: var(--cyan);
    --intro-teal: var(--green);
    --intro-teal-dark: color-mix(in srgb, var(--green) 78%, var(--ink));
    --intro-gold: var(--olive);
    --intro-cloud: var(--cream);
    --intro-paper: color-mix(in srgb, var(--cream) 62%, white);
    --intro-line: color-mix(in srgb, var(--green) 28%, var(--cream));
    position: relative;
    isolation: isolate;
    min-height: var(--prototype-height);
    display: grid;
    place-items: start center;
    overflow: hidden;
    color-scheme: only light;
    background: var(--intro-cloud);
  }
  .intro::after { position: absolute; z-index: 1; inset: 0; pointer-events: none; content: ""; background:
      radial-gradient(ellipse 68% 54% at 50% 20%, rgba(255,255,255,.32), transparent 74%),
      linear-gradient(180deg, rgba(255,255,255,.88) 0%, rgba(255,255,255,.68) 30%, rgba(255,255,255,.34) 54%, rgba(255,255,255,.08) 74%, transparent 88%);
  }
  .intro-copy { position: relative; z-index: 2; width: min(900px, calc(100% - 32px)); display: grid; justify-items: center; gap: 18px; margin-top: clamp(30px, 6svh, 68px); padding: 24px; color: var(--intro-ink); text-align: center; }
  .intro-copy::before { position: absolute; top: 0; left: 50%; width: 96px; height: 5px; content: ""; border-radius: 999px; background: linear-gradient(90deg, var(--intro-coral) 0 46%, var(--intro-gold) 46% 56%, var(--intro-sky) 56%); transform: translateX(-50%); }
  .intro-meta { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 14px; }
  .intro-art { position: absolute; z-index: 0; inset: 0; width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 58%; transition: opacity 220ms ease; }
  @starting-style {
    .intro-art { opacity: 0; }
  }
  .brand-pill { display: inline-flex; align-items: center; gap: 9px; padding: 7px 11px 7px 7px; border: 1px solid var(--intro-line); border-radius: 999px; background: var(--intro-paper); color: var(--muted); box-shadow: 0 5px 14px rgba(63,135,106,.08); font-size: .76rem; font-weight: 750; }
  .brand-pill span { width: 25px; height: 25px; display: grid; place-items: center; border-radius: 50%; color: white; background: var(--intro-teal); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); }
  .intro .kicker { color: var(--intro-coral-dark); }
  .intro h1 { color: var(--intro-ink); font-size: clamp(3.7rem, 7vw, 6.6rem); line-height: .9; letter-spacing: -.045em; text-wrap: balance; }
  .intro h1 em { color: var(--intro-coral); font-style: normal; }
  .intro .lead { max-width: 42rem; margin: 0; color: var(--muted); font-size: clamp(1rem, 1.7vw, 1.14rem); line-height: 1.55; text-wrap: balance; }
  .intro-actions { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 12px; }
  .intro .primary { border-color: var(--intro-teal-dark); background: color-mix(in srgb, var(--green) 88%, var(--ink)); box-shadow: 0 9px 20px rgba(63,135,106,.22), inset 0 1px rgba(255,255,255,.18); }
  .intro .primary span { color: var(--intro-gold); }
  .intro-facts { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; color: var(--muted); font-size: .74rem; }
  .intro-facts span { padding: 7px 9px; border: 1px solid var(--intro-line); border-radius: 9px; background: var(--intro-paper); }
  .intro-facts span:first-child b { color: var(--intro-coral-dark); }
  .intro-facts span:nth-child(2) b { color: var(--intro-teal-dark); }
  .intro-facts span:nth-child(3) b { color: color-mix(in srgb, var(--olive) 64%, var(--ink)); }
  .intro-facts b { color: var(--intro-ink); }

  .game-shell { min-height: var(--prototype-height); }
  .topbar { position: relative; z-index: 10; min-height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 9px clamp(14px, 4vw, 48px); border-bottom: 1px solid var(--line); background: rgba(255,255,255,.94); box-shadow: 0 1px 0 rgba(63,135,106,.05); backdrop-filter: blur(16px) saturate(125%); }
  .wordmark { display: flex; align-items: center; gap: 10px; }
  .wordmark > span { width: 36px; height: 36px; display: grid; place-items: center; border: 1px solid var(--line-strong); border-radius: 11px; color: var(--green); background: var(--surface-sky); font-weight: 900; }
  .wordmark strong { color: var(--ink); font-size: .88rem; }
  .topbar ol { display: flex; gap: 7px; margin: 0; padding: 0; list-style: none; }
  .topbar li { width: 30px; height: 30px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--muted); background: #fff; font-size: .7rem; font-weight: 850; }
  .topbar li.done { border-color: color-mix(in srgb, var(--coral) 34%, white); color: var(--red-dark); background: var(--red-soft); }
  .topbar li.current { border-color: color-mix(in srgb, var(--green) 42%, white); color: color-mix(in srgb, var(--green) 74%, var(--ink)); background: color-mix(in srgb, var(--cyan) 22%, white); box-shadow: 0 0 0 3px rgba(80,226,242,.14); }

  .play-layout { width: min(1240px, calc(100% - 40px)); display: grid; grid-template-columns: minmax(0, 1.24fr) minmax(340px, .76fr); align-items: start; gap: 20px; margin: auto; padding: clamp(20px, 3.4vw, 38px) 0 44px; }
  .match-card, .challenge-card { border: 1px solid var(--line); border-radius: 26px; background: var(--surface); box-shadow: 0 16px 42px rgba(63,135,106,.075), 0 2px 8px rgba(63,135,106,.035); }
  .match-card { min-width: 0; padding: clamp(18px, 2.6vw, 28px); }
  .match-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
  .match-heading > div:first-child { display: grid; gap: 9px; }
  .match-heading h1 { max-width: 610px; color: var(--ink); font-size: clamp(2rem, 3.6vw, 3.05rem); }
  .live-badge { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; padding: 8px 11px; border: 1px solid color-mix(in srgb, var(--cyan) 46%, var(--green)); border-radius: 999px; color: var(--blue-dark); background: var(--blue-soft); font-size: .7rem; font-weight: 780; }
  .live-badge i { width: 7px; height: 7px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 4px rgba(80,226,242,.22); }
  .scene-prompt { max-width: 650px; margin: 14px 0 18px; color: var(--muted); font-size: .94rem; line-height: 1.5; }

  .arena { position: relative; height: 326px; overflow: hidden; color-scheme: only light; border: 1px solid color-mix(in srgb, var(--green) 34%, var(--cream)); border-radius: 19px; background:
      linear-gradient(90deg, rgba(242,87,73,.035), transparent 34%, transparent 66%, rgba(80,226,242,.05)),
      url('./assets/imagegen/arena.webp') center 54% / cover no-repeat;
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--cream) 58%, white), inset 0 1px rgba(255,255,255,.9), inset 0 -16px 28px rgba(63,135,106,.06);
    transition: border-color 160ms ease, box-shadow 160ms ease;
  }
  .arena.counter { border-color: rgba(242,87,73,.76); box-shadow: 0 0 0 6px var(--red-soft), inset 0 0 0 3px rgba(242,87,73,.12); }
  .arena.miss { border-color: rgba(80,226,242,.9); box-shadow: 0 0 0 6px var(--blue-soft), inset 0 0 0 3px rgba(80,226,242,.16); }
  .arena-team { position: absolute; z-index: 7; top: 14px; display: grid; gap: 1px; padding: 7px 10px; border: 1px solid rgba(63,135,106,.18); border-radius: 10px; background: rgba(255,255,255,.93); box-shadow: 0 4px 12px rgba(63,135,106,.06); font-size: .61rem; backdrop-filter: blur(8px); }
  .arena-team span { color: var(--muted); }
  .arena-team strong { letter-spacing: .12em; }
  .red-team { left: 14px; color: var(--red-dark); }
  .blue-team { right: 14px; color: var(--blue-dark); text-align: right; }
  .goal-marker { position: absolute; z-index: 3; top: 121px; width: 2px; height: 84px; border-radius: 2px 2px 0 0; background: color-mix(in srgb, var(--green) 42%, var(--cream)); box-shadow: 0 1px 3px rgba(36,59,52,.14); }
  .goal-marker::after { position: absolute; bottom: -3px; left: 50%; width: 12px; height: 5px; border-radius: 50%; content: ""; background: rgba(73,62,44,.26); transform: translateX(-50%); }
  .goal-marker-left { left: calc(50% - var(--goal-offset)); }
  .goal-marker-right { left: calc(50% + var(--goal-offset)); }
  .goal-marker i { position: absolute; top: 3px; width: 25px; height: 16px; filter: drop-shadow(0 2px 2px rgba(24,36,47,.14)); }
  .goal-marker-left i { right: 2px; background: var(--red); clip-path: polygon(0 10%, 100% 0, 100% 100%, 18% 84%); }
  .goal-marker-right i { left: 2px; background: var(--blue); clip-path: polygon(0 0, 100% 10%, 82% 84%, 0 100%); }

  .tug-line { position: absolute; z-index: 5; top: 126px; left: 13%; width: 74%; height: 88px; transform: translateX(var(--rope-shift)); transition: transform 90ms linear; will-change: transform; }
  .arena.terminal .tug-line { transition: transform 160ms var(--ease-out); }
  .rope { position: absolute; z-index: 1; top: 31px; right: 54px; left: 54px; height: 9px; border: 2px solid #4a3524; border-radius: 999px; background: repeating-linear-gradient(110deg, #a96f3d 0 7px, #e4b275 8px 12px); box-shadow: 0 3px 5px rgba(63,43,27,.2), inset 0 1px rgba(255,255,255,.35); }
  .rope b { position: absolute; top: -12px; left: 50%; width: 5px; height: 34px; border-radius: 3px; background: #52636a; box-shadow: 0 2px 4px rgba(24,36,47,.18); }
  .figure { position: absolute; z-index: 2; top: -31px; width: 110px; height: 147px; background-image: url('./assets/imagegen/sprites.webp'); background-repeat: no-repeat; background-size: 400% 200%; filter: drop-shadow(0 6px 5px rgba(24,36,47,.15)); transition: transform 120ms var(--ease-out); will-change: transform; }
  .figure-red { left: -18px; background-position: 0 0; transform-origin: 65.5% 45.2%; }
  .figure-blue { right: -18px; background-position: 0 100%; transform-origin: 34.5% 45.2%; }
  .arena.counter .figure, .arena.miss .figure { transition-duration: 140ms; }
  .arena.counter .figure-red { background-position: 33.333% 0; transform: rotate(-1.5deg); }
  .arena.counter .figure-blue { background-position: 66.666% 100%; transform: rotate(-.75deg); }
  .arena.miss .figure-red { background-position: 66.666% 0; transform: rotate(.75deg); }
  .arena.miss .figure-blue { background-position: 33.333% 100%; transform: rotate(1.5deg); }

  .tug-readout { display: grid; grid-template-columns: auto minmax(92px, 1fr) auto; align-items: center; gap: 12px; min-height: 28px; margin: 15px 4px 0; color: var(--muted); font-size: .65rem; font-weight: 780; }
  .readout-team { white-space: nowrap; }
  .readout-red { color: var(--red-dark); }
  .readout-blue { color: var(--blue-dark); }
  .readout-track { position: relative; height: 8px; border: 1px solid var(--line); border-radius: 999px; background: linear-gradient(90deg, var(--red-soft) 0%, var(--surface-warm) 47%, var(--surface-warm) 53%, var(--blue-soft) 100%); }
  .readout-track::after { position: absolute; top: -3px; bottom: -3px; left: 50%; width: 1px; content: ""; background: color-mix(in srgb, var(--green) 32%, var(--cream)); }
  .readout-track i { position: absolute; z-index: 2; top: 50%; left: var(--tug-progress); width: 16px; height: 16px; border: 4px solid #fff; border-radius: 50%; background: var(--olive); box-shadow: 0 1px 5px rgba(63,135,106,.24); transform: translate(-50%, -50%); transition: left 90ms linear, background-color 130ms ease; }
  .readout-track b { position: absolute; top: 13px; left: 50%; color: var(--muted); font-size: .55rem; font-weight: 700; transform: translateX(-50%); }
  .tug-readout.leading-red .readout-track i { background: var(--red); }
  .tug-readout.leading-blue .readout-track i { background: var(--blue); }

  .challenge-card { position: relative; align-self: start; min-width: 0; overflow: hidden; padding: clamp(22px, 3vw, 30px); transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms var(--ease-out); }
  .challenge-card::before { position: absolute; top: 0; right: 0; left: 0; height: 4px; content: ""; background: linear-gradient(90deg, var(--coral) 0 46%, var(--olive) 46% 54%, var(--cyan) 54%); opacity: .86; }
  .challenge-card.correct { border-color: color-mix(in srgb, var(--coral) 38%, white); box-shadow: 0 16px 42px rgba(242,87,73,.12); }
  .challenge-card.wrong { border-color: color-mix(in srgb, var(--cyan) 56%, var(--green)); box-shadow: 0 16px 42px rgba(80,226,242,.12); }
  .challenge-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .challenge-meta p { margin: 0; color: var(--muted); font-size: .69rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  .challenge-meta span { padding: 6px 9px; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); background: var(--paper); font-size: .66rem; font-weight: 750; white-space: nowrap; }
  .equation { display: flex; align-items: center; justify-content: center; gap: clamp(8px, 1.6vw, 16px); min-height: 154px; margin: 17px 0 14px; border: 1px solid var(--cream); border-radius: 19px; background: linear-gradient(145deg, color-mix(in srgb, var(--cream) 38%, white), var(--surface-warm)); font-size: clamp(3rem, 6.5vw, 4.75rem); font-weight: 900; letter-spacing: -.05em; line-height: 1; }
  .equation i { color: var(--muted); font-style: normal; font-weight: 500; }
  .equation b { width: 1em; color: var(--coral); }
  .answer-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .answer-grid button { min-width: 0; min-height: 72px; border: 1px solid var(--line-strong); border-radius: 15px; color: var(--ink); background: color-mix(in srgb, var(--cyan) 5%, white); box-shadow: 0 3px 0 var(--line); font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 850; transition: transform 130ms var(--ease-out), box-shadow 130ms var(--ease-out), border-color 130ms ease, background-color 130ms ease; }
  .answer-grid button:active { transform: translateY(2px) scale(.98); box-shadow: 0 1px 0 var(--line); }
  .feedback-slot { min-height: 37px; display: grid; margin-top: 15px; }
  .feedback-slot > p { grid-area: 1 / 1; margin: 0; transition: opacity 140ms ease, transform 140ms var(--ease-out); }
  .quiet-rule { min-height: 37px; display: flex; align-items: center; justify-content: center; gap: 7px; padding: 8px 10px; border: 1px solid var(--cream); border-radius: 12px; color: var(--muted); background: color-mix(in srgb, var(--cream) 46%, white); font-size: .7rem; text-align: center; }
  .quiet-rule span { color: var(--coral); font-size: 1rem; font-weight: 900; }
  .quiet-rule.feedback-hidden { opacity: 0; pointer-events: none; transform: translateY(-4px); }
  .miss-note { min-height: 37px; padding: 9px 10px; border: 1px solid color-mix(in srgb, var(--cyan) 58%, var(--green)); border-radius: 12px; color: var(--blue-dark); background: var(--blue-soft); font-size: .7rem; font-weight: 750; opacity: 0; pointer-events: none; text-align: center; transform: translateY(4px); }
  .miss-note.feedback-visible { opacity: 1; transform: none; }

  .result-screen { width: 100%; min-height: var(--prototype-height); display: grid; place-items: center; padding: clamp(20px, 4vw, 48px); transition: opacity 220ms ease, transform 220ms var(--ease-out); }
  @starting-style {
    .result-screen { opacity: 0; transform: translateY(8px) scale(.985); }
  }
  .result-card { width: min(1000px, 100%); display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(280px, .88fr); align-items: center; gap: clamp(22px, 4vw, 42px); padding: clamp(16px, 2.2vw, 24px); border: 1px solid var(--line); border-radius: 30px; background: #fff; box-shadow: 0 20px 54px rgba(63,135,106,.09), 0 2px 8px rgba(63,135,106,.04); }
  .result-body { display: grid; justify-items: start; gap: 18px; padding: clamp(8px, 2vw, 22px) clamp(8px, 2vw, 24px) clamp(8px, 2vw, 22px) 0; text-align: left; }
  .result-screen h1 { color: var(--ink); font-size: clamp(2.8rem, 6vw, 4.9rem); }
  .result-copy { max-width: 570px; margin: 0; color: var(--muted); font-size: 1.03rem; line-height: 1.62; }
  .result-art { width: 100%; aspect-ratio: 16 / 11; object-fit: cover; object-position: center; border: 1px solid var(--line); border-radius: 22px; box-shadow: 0 8px 22px rgba(63,135,106,.09); }
  .result-actions { display: flex; flex-wrap: wrap; gap: 10px; }
  .failure .kicker { color: var(--blue-dark); }
  .complete-card { width: min(680px, 100%); grid-template-columns: 1fr; justify-items: center; gap: 18px; padding: clamp(34px, 6vw, 62px); text-align: center; }
  .complete-card .result-copy { text-align: center; }
  .medal { position: relative; width: 108px; height: 116px; transition: opacity 280ms ease 60ms, transform 280ms var(--ease-out) 60ms; }
  @starting-style {
    .complete .medal { opacity: 0; transform: scale(.92); }
  }
  .medal span { position: absolute; z-index: 2; top: 0; left: 14px; width: 80px; height: 80px; display: grid; place-items: center; border: 6px solid var(--cream); border-radius: 50%; color: var(--ink); background: var(--olive); box-shadow: 0 9px 20px rgba(63,135,106,.16); font-size: 2rem; font-weight: 900; }
  .medal i::before, .medal i::after { position: absolute; top: 64px; width: 32px; height: 48px; content: ""; background: var(--red); clip-path: polygon(0 0, 100% 0, 78% 100%, 50% 72%, 20% 100%); }
  .medal i::before { left: 25px; transform: rotate(8deg); }
  .medal i::after { right: 25px; transform: rotate(-8deg); }
  .privacy-note { margin: 0; color: var(--muted); font-size: .76rem; }

  @media (hover: hover) and (pointer: fine) {
    .primary:hover { background: color-mix(in srgb, var(--green) 82%, var(--ink)); transform: translateY(-1px); box-shadow: 0 10px 22px rgba(63,135,106,.24); }
    .intro .primary:hover { background: color-mix(in srgb, var(--green) 82%, var(--ink)); box-shadow: 0 11px 24px rgba(63,135,106,.26); }
    .secondary:hover { border-color: var(--green); background: color-mix(in srgb, var(--cream) 48%, white); transform: translateY(-1px); }
    .answer-grid button:hover { border-color: var(--green); background: color-mix(in srgb, var(--cyan) 14%, white); transform: translateY(-1px); box-shadow: 0 4px 0 var(--line); }
  }

  @media (min-width: 561px) {
    .arena { background-position: center 68%; background-size: 120% auto; }
  }

  @media (max-width: 860px) {
    .intro { min-height: max(720px, var(--prototype-height)); }
    .intro-copy { margin-top: clamp(18px, 4svh, 36px); padding: 22px; }
    .intro-art { object-position: 58% center; }
    .intro::after { background:
        radial-gradient(ellipse 90% 58% at 50% 18%, rgba(255,255,255,.36), transparent 76%),
        linear-gradient(180deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.76) 42%, rgba(255,255,255,.38) 66%, rgba(255,255,255,.06) 84%, transparent 94%);
    }
    .play-layout { grid-template-columns: 1fr; width: min(740px, calc(100% - 28px)); padding-top: 18px; }
    .challenge-card { width: 100%; }
    .result-card { max-width: 700px; grid-template-columns: 1fr; gap: 20px; }
    .result-art { max-height: 330px; }
    .result-body { justify-items: center; padding: 8px 12px 18px; text-align: center; }
    .result-actions { justify-content: center; }
    .complete-card { max-width: 680px; }
  }

  @media (max-width: 560px) {
    .intro { min-height: max(700px, var(--prototype-height)); }
    .intro-copy { gap: 15px; margin-top: 10px; padding: 22px 18px; }
    .intro-copy::before { width: 68px; }
    .intro-meta { flex-direction: column; gap: 9px; }
    .intro h1 { font-size: clamp(3.1rem, 17vw, 4.6rem); }
    .intro-actions { flex-direction: column; }
    .intro-art { object-position: 58% center; }
    .topbar { min-height: 56px; padding: 8px 11px; }
    .wordmark > span { width: 34px; height: 34px; }
    .wordmark strong { max-width: 148px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .play-layout { width: min(100% - 18px, 520px); gap: 12px; padding: 12px 0 24px; }
    .match-card, .challenge-card { border-radius: 20px; }
    .match-card { padding: 15px; }
    .match-heading { display: grid; gap: 10px; }
    .match-heading h1 { font-size: clamp(1.95rem, 10.5vw, 2.55rem); line-height: .98; }
    .live-badge { width: max-content; padding: 6px 9px; }
    .scene-prompt { margin: 9px 0 13px; font-size: .88rem; }
    .arena { height: 220px; border-radius: 16px; box-shadow: 0 0 0 4px color-mix(in srgb, var(--cream) 58%, white), inset 0 -12px 24px rgba(63,135,106,.06); }
    .arena.counter { box-shadow: 0 0 0 4px var(--red-soft), inset 0 0 0 2px rgba(242,87,73,.12); }
    .arena.miss { box-shadow: 0 0 0 4px var(--blue-soft), inset 0 0 0 2px rgba(80,226,242,.16); }
    .arena-team { top: 9px; padding: 6px 8px; }
    .goal-marker { top: 78px; height: 69px; }
    .tug-line { top: 80px; left: 5%; width: 90%; transform: translateX(var(--rope-shift)) scale(.82); }
    .tug-readout { grid-template-columns: auto minmax(64px, 1fr) auto; gap: 7px; margin-top: 12px; font-size: .59rem; }
    .readout-track b { display: none; }
    .challenge-card { padding: 17px 14px 15px; }
    .challenge-meta { gap: 8px; }
    .challenge-meta span { padding: 5px 8px; font-size: .61rem; }
    .equation { min-height: 108px; margin: 13px 0 12px; border-radius: 15px; font-size: clamp(2.65rem, 15vw, 4rem); }
    .answer-grid { gap: 9px; }
    .answer-grid button { min-height: 60px; }
    .feedback-slot { margin-top: 12px; }
    .result-screen { padding: 12px; }
    .result-card { gap: 16px; padding: 12px; border-radius: 22px; }
    .result-art { max-height: 270px; border-radius: 16px; }
    .result-body { gap: 14px; padding: 4px 7px 10px; }
    .result-screen h1 { font-size: clamp(2.5rem, 13vw, 3.7rem); }
    .result-copy { font-size: .96rem; }
    .result-actions { width: 100%; }
    .result-actions .primary, .result-actions .secondary { flex: 1 1 100%; }
    .complete-card { gap: 16px; padding: 34px 20px; }
  }

  @media (max-width: 360px) {
    .wordmark strong { max-width: 128px; }
    .topbar ol { gap: 4px; }
    .topbar li { width: 27px; height: 27px; }
    .match-card { padding: 13px; }
    .arena { height: 205px; }
    .goal-marker { top: 70px; }
    .tug-line { top: 73px; }
    .readout-team { font-size: .55rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .primary, .secondary, .answer-grid button, .arena, .challenge-card, .readout-track i { transition-duration: 0ms !important; }
    .tug-line { transition-duration: 0ms !important; }
    .arena.terminal .tug-line { transition: transform 100ms linear !important; }
    .figure { transition: transform 100ms linear !important; }
    .arena.counter .figure-red { transform: rotate(-.4deg); }
    .arena.counter .figure-blue { transform: rotate(-.2deg); }
    .arena.miss .figure-red { transform: rotate(.2deg); }
    .arena.miss .figure-blue { transform: rotate(.4deg); }
    .feedback-slot > p { transform: none; transition: opacity 100ms linear; }
    .intro-art, .result-screen, .complete .medal { transform: none; transition: opacity 120ms linear; }
    @starting-style {
      .intro-art, .result-screen, .complete .medal { opacity: 0; transform: none; }
    }
  }

  @media (prefers-reduced-transparency: reduce) {
    .brand-pill, .topbar, .arena-team { background: #fff; backdrop-filter: none; }
  }

  @media (prefers-contrast: more) {
    .match-card, .challenge-card, .arena, .answer-grid button { border-color: var(--ink); }
  }
</style>
