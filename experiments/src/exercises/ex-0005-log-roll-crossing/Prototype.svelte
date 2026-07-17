<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import terraceAtmosphere from './assets/terrace-atmosphere-safe.webp';
  import RollStage from './RollStage.svelte';
  import {
    WORLD,
    requiredRemaining,
    scenes,
    selectVariant,
    type Scene,
    type Variant
  } from './content';

  type View = 'intro' | 'active' | 'success' | 'complete';
  type MessageKind = 'instruction' | 'action' | 'error';
  type Outcome = 'idle' | 'short' | 'exact' | 'over';

  let view: View = 'intro';
  let sceneIndex = 0;
  let generation = 0;
  let variant: Variant = scenes[0].variants[0];
  let coveredRolls = 0;
  let prediction: number | null = null;
  let predictionText = '';
  let firstPrediction: number | null = null;
  let attempts = 0;
  let running = false;
  let calibrating = false;
  let outcome: Outcome = 'idle';
  let message = '';
  let messageKind: MessageKind = 'instruction';
  let announcement = '';
  let errorProbeCompleted = false;
  let rootElement: HTMLElement;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let runEpoch = 0;

  const CALIBRATION_MOTION_MS = 440;
  const ROLL_MOTION_MS = 310;

  $: scene = scenes[sceneIndex];
  $: remainingRolls = requiredRemaining(variant);
  $: predictionInvalid = predictionText !== '' && !/^[1-7]$/.test(predictionText);
  $: smokeState = view === 'intro' ? 'ready' : view === 'active' ? 'active' : view === 'success' ? 'success' : 'complete';
  $: smokeSuccessPlan = view === 'active'
    ? scene.mode === 'tutorial'
      ? Array.from({ length: variant.totalRolls }, () => 'roll').join(',')
      : 'prediction'
    : undefined;
  $: smokeErrorPlan = view === 'active' && scene.id === 'exploration' && !errorProbeCompleted
    ? 'prediction'
    : undefined;
  $: smokeRecoveryPlan = view === 'active' && scene.id === 'exploration' && !errorProbeCompleted
    ? 'retry'
    : undefined;
  $: smokePredictionValue = scene.id === 'exploration' && !errorProbeCompleted
    ? String(scene.smokeErrorValue)
    : String(remainingRolls);

  onDestroy(() => {
    runEpoch += 1;
    clearTimer();
  });

  function clearTimer(): void {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function initialMessage(current: Scene): string {
    if (current.mode === 'tutorial') {
      return 'Chaque activation produit un tour complet et une empreinte de même longueur.';
    }
    if (current.support === 'full') {
      return 'Le premier tour va rester dans le paysage. Il devient l’unité à répéter mentalement jusqu’à l’Arrivée.';
    }
    if (current.support === 'reduced') {
      return 'Observe la distance du premier tour le long du passage.';
    }
    return 'Observe un tour, puis prévois la suite.';
  }

  function loadScene(index: number): void {
    runEpoch += 1;
    clearTimer();
    sceneIndex = index;
    const nextScene = scenes[index];
    variant = selectVariant(nextScene, generation);
    coveredRolls = 0;
    prediction = null;
    predictionText = '';
    firstPrediction = null;
    attempts = 0;
    running = false;
    calibrating = false;
    outcome = 'idle';
    message = initialMessage(nextScene);
    messageKind = 'instruction';
    errorProbeCompleted = false;
    view = 'active';
  }

  async function demonstrateUnitRoll(epoch: number): Promise<void> {
    calibrating = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      if (epoch !== runEpoch || view !== 'active') return;
      coveredRolls = 1;
      finishCalibration(epoch);
      return;
    }

    await tick();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    if (epoch !== runEpoch || view !== 'active') return;
    coveredRolls = 1;
    timer = setTimeout(() => finishCalibration(epoch), CALIBRATION_MOTION_MS);
  }

  function finishCalibration(epoch: number): void {
    if (epoch !== runEpoch || view !== 'active') return;
    clearTimer();
    calibrating = false;
    message = scene.support === 'minimal'
      ? 'Premier tour terminé.'
      : scene.support === 'reduced'
        ? 'Le premier tour reste ton unité, même si la direction a changé.'
        : 'Le premier tour reste en place. Ta prévision commence depuis son point d’arrivée.';
    messageKind = 'action';
    announcement = message;
  }

  async function start(): Promise<void> {
    loadScene(0);
    announcement = 'Orientation chargée. Le rouleau attend au Départ.';
    await focus('#scene-title');
  }

  async function tutorialRoll(): Promise<void> {
    if (running || calibrating || scene.mode !== 'tutorial') return;
    const epoch = runEpoch;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    running = true;

    if (!reducedMotion) {
      await tick();
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (epoch !== runEpoch || view !== 'active') return;
    }

    coveredRolls += 1;
    message = `Tour ${coveredRolls} : le rouleau avance encore d’une même distance.`;
    messageKind = 'action';
    announcement = message;

    if (!reducedMotion) {
      await new Promise<void>((resolve) => {
        timer = setTimeout(() => {
          timer = undefined;
          resolve();
        }, ROLL_MOTION_MS);
      });
      if (epoch !== runEpoch || view !== 'active') return;
    }

    running = false;
    if (coveredRolls === variant.totalRolls) {
      outcome = 'exact';
      message = scene.success;
      view = 'success';
      announcement = `Tutoriel terminé. ${message}`;
      await focus('[data-smoke-feedback="success"]');
    }
  }

  function handlePredictionInput(event: Event): void {
    if (running || calibrating || outcome !== 'idle') return;
    const input = event.currentTarget as HTMLInputElement;
    predictionText = input.value.replace(/\D/g, '').slice(0, 1);
    input.value = predictionText;

    if (predictionText === '') {
      message = 'Observe le premier tour, puis entre le nombre de tours encore nécessaires.';
      messageKind = 'instruction';
      return;
    }
    if (!/^[1-7]$/.test(predictionText)) {
      message = `Entre un nombre entier de 1 à ${WORLD.acceptedPredictionMax}.`;
      messageKind = 'error';
      announcement = message;
      return;
    }
    void executePrediction(Number(predictionText));
  }

  async function executePrediction(value: number): Promise<void> {
    clearTimer();
    const epoch = runEpoch;
    prediction = value;
    if (firstPrediction === null) firstPrediction = value;
    attempts += 1;
    running = true;
    coveredRolls = 1;
    outcome = 'idle';
    message = `Prévision engagée : ${value} tour${value === 1 ? '' : 's'} encore. Le premier tour reste en place.`;
    messageKind = 'action';
    announcement = message;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      coveredRolls = 1 + value;
      await resolvePrediction(epoch);
      return;
    }
    runAnimatedRoll(value, epoch);
  }

  function runAnimatedRoll(remaining: number, epoch: number): void {
    if (epoch !== runEpoch || view !== 'active') return;
    if (remaining === 0) {
      void resolvePrediction(epoch);
      return;
    }
    coveredRolls += 1;
    announcement = `Tour automatique ${coveredRolls - 1} sur ${prediction}.`;
    timer = setTimeout(() => runAnimatedRoll(remaining - 1, epoch), ROLL_MOTION_MS);
  }

  async function resolvePrediction(epoch: number): Promise<void> {
    if (epoch !== runEpoch || view !== 'active') return;
    clearTimer();
    running = false;

    if (coveredRolls === variant.totalRolls) {
      outcome = 'exact';
      message = scene.id === 'independence'
        ? attempts === 1
          ? 'Ta première prévision termine exactement le passage.'
          : 'Tu as ajusté ta prévision jusqu’à l’Arrivée exacte.'
        : `${scene.success} 1 tour observé + ${prediction} tour${prediction === 1 ? '' : 's'} prévu${prediction === 1 ? '' : 's'} = ${variant.totalRolls} tours au total.`;
      messageKind = 'action';
      view = 'success';
      announcement = `Arrivée exacte. ${message}`;
      await focus('[data-smoke-feedback="success"]');
      return;
    }

    outcome = coveredRolls < variant.totalRolls ? 'short' : 'over';
    message = outcome === 'short'
      ? `Avec 1 tour observé et ${prediction} tour${prediction === 1 ? '' : 's'} prévu${prediction === 1 ? '' : 's'}, le rouleau s’arrête avant l’Arrivée. La distance restante est visible.`
      : `Avec 1 tour observé et ${prediction} tours prévus, le rouleau dépasse l’Arrivée. La distance dépassée est visible.`;
    messageKind = 'error';
    announcement = message;
    await focus('[data-smoke-feedback="error"]');
  }

  async function retry(): Promise<void> {
    if (running || (outcome !== 'short' && outcome !== 'over')) return;
    if (scene.id === 'exploration') errorProbeCompleted = true;
    coveredRolls = 1;
    prediction = null;
    predictionText = '';
    outcome = 'idle';
    message = scene.support === 'minimal'
      ? 'Les tours de l’essai sont retirés. Le premier tour reste en place.'
      : 'Les tours de l’essai disparaissent. Le premier tour reste en place comme unité de référence.';
    messageKind = 'instruction';
    announcement = message;
    await focus('[data-smoke-control="prediction"]');
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      runEpoch += 1;
      clearTimer();
      view = 'complete';
      announcement = 'La mission des Hautes-Cascades est terminée.';
      await focus('[data-smoke-completion]');
      return;
    }
    const nextIndex = sceneIndex + 1;
    loadScene(nextIndex);
    announcement = `${scenes[nextIndex].chapter}. Nouveau passage chargé.`;
    if (scenes[nextIndex].mode === 'prediction') void demonstrateUnitRoll(runEpoch);
    await focus('#scene-title');
  }

  async function restart(): Promise<void> {
    runEpoch += 1;
    clearTimer();
    generation += 1;
    view = 'intro';
    sceneIndex = 0;
    variant = scenes[0].variants[0];
    coveredRolls = 0;
    prediction = null;
    outcome = 'idle';
    announcement = 'Retour au départ de la mission.';
    await focus('#intro-title');
  }
</script>

<svelte:head>
  <title>Fais rouler · EX-0005</title>
  <meta name="description" content="Observer un tour complet, prévoir les tours restants et inspecter une arrivée trop courte, exacte ou dépassée." />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-root
  data-smoke-exercise="EX-0005"
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
      <div class="hero-art" aria-hidden="true" data-decorative-atmosphere="intro">
        <img src={terraceAtmosphere} alt="" />
        <span class="hero-wash"></span>
        <b class="hero-log"></b>
      </div>
      <div class="intro-copy">
        <p class="kicker">Mission des Hautes-Cascades</p>
        <h1 id="intro-title" tabindex="-1">Fais<br /><em>rouler</em></h1>
        <p class="lead">Les passages des terrasses se sont refermés. Découvre la distance d’un tour, puis prévois les tours qui conduiront le rouleau jusqu’à chaque balise.</p>
        <button class="primary" type="button" data-smoke-action="start" onclick={start}>Rejoindre la première terrasse <span aria-hidden="true">→</span></button>
        <p class="boundary">Un tutoriel direct · cinq prévisions · aucun chronomètre</p>
      </div>
    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <header class="topbar">
        <strong><span aria-hidden="true">◉</span> Hautes-Cascades</strong>
        <p><span>{scene.chapter}</span><b>{sceneIndex + 1} / {scenes.length}</b></p>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <header class="scene-copy">
          <p class="kicker">{scene.chapter}</p>
          <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
          <p>{scene.prompt}</p>
        </header>

        <RollStage {scene} {variant} {coveredRolls} {outcome} {calibrating} {running} />

        {#if scene.mode === 'tutorial'}
          <div class="control-dock tutorial-dock">
            <button type="button" data-smoke-control="roll" onclick={tutorialRoll} disabled={running || coveredRolls >= variant.totalRolls}>
              <span aria-hidden="true">↻</span><strong>{running ? 'Tour complet en cours…' : 'Faire un tour complet'}</strong><small>{coveredRolls} tour{coveredRolls === 1 ? '' : 's'} observé{coveredRolls === 1 ? '' : 's'}</small>
            </button>
            <p>Chaque activation déplace le même rouleau d’une distance identique.</p>
          </div>
        {:else}
          <div class="control-dock prediction-dock">
            <div class="calibration-status" aria-live="polite">
              <span class:done={!calibrating}>1</span>
              <p><strong>{calibrating ? 'Le premier tour se déroule…' : 'Le premier tour reste en place.'}</strong><small>{scene.support === 'minimal' ? 'Ta prévision commence ici.' : 'Il est l’unité visible et le point de départ de ta prévision.'}</small></p>
            </div>
            <label for="prediction">{scene.id === 'integration' ? 'Tours encore nécessaires' : 'Combien de tours faut-il encore ?'}</label>
            <div class="prediction-entry">
              <input
                id="prediction"
                type="text"
                inputmode="numeric"
                pattern="[1-7]"
                maxlength="1"
                autocomplete="off"
                value={predictionText}
                aria-describedby="prediction-help"
                aria-invalid={predictionInvalid}
                data-smoke-control="prediction"
                data-smoke-input-value={smokePredictionValue}
                oninput={handlePredictionInput}
                disabled={calibrating || running || outcome !== 'idle'}
              />
              <span>tour{predictionText === '1' ? '' : 's'} encore</span>
            </div>
            <p id="prediction-help">Entre un nombre de 1 à {WORLD.acceptedPredictionMax}. Les tours ajoutés démarrent automatiquement.</p>
            {#if running}<p class="running-copy">Exécution : {Math.max(0, coveredRolls - 1)} / {prediction} tours ajoutés</p>{/if}
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
          <button class="retry" type="button" data-smoke-control="retry" onclick={retry}>
            {scene.support === 'minimal' ? 'Ajuster ma prévision' : 'Revenir à la fin du premier tour'}
          </button>
        {/if}
      </section>
    </div>
  {:else if view === 'success'}
    <section class="success" aria-labelledby="success-title">
      <p class="kicker">Arrivée exacte · {scene.chapter}</p>
      <RollStage {scene} {variant} {coveredRolls} outcome="exact" />
      <h1 id="success-title" tabindex="-1">Le dernier tour tombe exactement sur l’Arrivée.</h1>
      <p class="success-feedback" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true">{message}</p>
      {#if scene.mode === 'prediction'}
        <p class="composition"><strong>1 tour observé</strong> + <strong>{prediction} tour{prediction === 1 ? '' : 's'} prévu{prediction === 1 ? '' : 's'}</strong> = <strong>{variant.totalRolls} tours au total</strong></p>
      {/if}
      <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>
        {sceneIndex === scenes.length - 1 ? 'Clore la mission' : 'Passage suivant'} <span aria-hidden="true">→</span>
      </button>
    </section>
  {:else}
    <section class="complete" tabindex="-1" data-smoke-completion aria-labelledby="complete-title">
      <div class="completion-emblem" aria-hidden="true">◎</div>
      <p class="kicker">Mission terminée</p>
      <h1 id="complete-title">Les passages des Hautes-Cascades sont ouverts.</h1>
      <p>Tu as observé un tour, engagé des prévisions et ajusté les arrivées. Ce parcours est terminé ; il ne prétend pas mesurer une maîtrise.</p>
      <button class="secondary" type="button" onclick={restart}>Rejouer avec de nouveaux passages</button>
      <p class="boundary">EX-0005 · progression complète · aucun score</p>
    </section>
  {/if}
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { min-width: 0; background: #e9f1e4; }
  :global(body) { min-width: 0; margin: 0; background: #e9f1e4; color: #17333a; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  :global(button), :global(input) { font: inherit; }
  :global(button:focus-visible), :global(input:focus-visible), [tabindex="-1"]:focus-visible { outline: 3px solid #f2b84b; outline-offset: 3px; }
  .prototype-root { min-height: 100vh; overflow-x: clip; background: radial-gradient(circle at 76% 0%, #fff1b9 0, transparent 30%), #e9f1e4; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .intro { position: relative; display: grid; width: min(1080px, calc(100% - 32px)); min-height: 100vh; grid-template-columns: minmax(0, .82fr) minmax(360px, 1.18fr); align-items: center; gap: clamp(24px, 5vw, 68px); margin: auto; padding: 48px 0; }
  .intro-copy { position: relative; z-index: 2; grid-column: 1; grid-row: 1; }
  .hero-art { position: relative; grid-column: 2; grid-row: 1; height: min(680px, 78vh); overflow: hidden; border-radius: 48% 48% 28% 36% / 24% 30% 44% 44%; background: #8bcce7; box-shadow: 0 24px 80px rgba(25,64,63,.24); }
  .hero-art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 48% center; filter: saturate(.88) contrast(.92); pointer-events: none; }
  .hero-wash { position: absolute; inset: 0; background: linear-gradient(155deg, rgba(255,246,208,.06) 12%, transparent 48%, rgba(24,72,63,.24)); }
  .hero-log { position: absolute; right: 14%; bottom: 15%; width: 78px; aspect-ratio: 1; border: 10px solid #5b3724; border-radius: 50%; background: radial-gradient(circle,#7c4b2d 0 8%,#d39350 9% 54%,#9f633b 55%); box-shadow: 0 12px 0 rgba(38,50,45,.2), 0 0 0 3px rgba(255,249,236,.38); }
  .kicker { margin: 0 0 10px; color: #a64f35; font-size: .74rem; font-weight: 950; letter-spacing: .15em; text-transform: uppercase; }
  h1 { max-width: 800px; margin: 0; font-family: ui-rounded, "Arial Rounded MT Bold", Inter, sans-serif; font-size: clamp(2.4rem, 7vw, 5.4rem); letter-spacing: -.065em; line-height: .92; }
  h1 em { color: #1a735e; font-family: Georgia, serif; font-weight: 500; }
  .lead { max-width: 650px; margin: 24px 0; color: #486067; font-size: clamp(1rem, 2vw, 1.24rem); line-height: 1.65; }
  .primary, .secondary, .retry { min-height: 48px; max-width: 100%; padding: 13px 20px; border-radius: 999px; font-weight: 900; line-height: 1.25; cursor: pointer; }
  .primary { border: 0; color: white; background: #173e43; box-shadow: 0 7px 0 #bdcdbb; }
  .secondary, .retry { border: 2px solid #173e43; color: #173e43; background: #fff9ec; }
  .boundary { margin: 14px 0 0; color: #64777a; font-size: .82rem; }
  .game-shell { min-height: 100vh; }
  .topbar { display: flex; min-height: 64px; align-items: center; justify-content: space-between; gap: 14px; padding: 11px clamp(14px, 4vw, 50px); border-bottom: 1px solid #b9cbc1; background: rgba(255,249,236,.9); }
  .topbar strong { display: flex; align-items: center; gap: 8px; }
  .topbar strong span { color: #d96345; }
  .topbar p { display: flex; gap: 10px; margin: 0; font-size: .82rem; }
  .topbar p span { color: #63767a; }
  .scene { width: min(1020px, calc(100% - 32px)); margin: auto; padding: 32px 0 58px; }
  .scene-copy { display: grid; gap: 8px; max-width: 850px; margin-bottom: 20px; }
  .scene-copy h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .scene-copy > p:last-child { margin: 0; color: #4c6268; line-height: 1.5; }
  .control-dock { display: grid; justify-items: center; gap: 12px; width: min(680px, calc(100% - 24px)); margin: -8px auto 0; padding: 20px; border: 1px solid #c7d0bd; border-radius: 0 0 24px 24px; background: linear-gradient(rgba(255,249,236,.98),rgba(250,242,219,.98)); box-shadow: 0 8px 0 rgba(67,82,69,.12); }
  .tutorial-dock button { display: grid; min-width: 0; min-height: 66px; max-width: 100%; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 0 10px; padding: 10px 18px; border: 0; border-radius: 16px; color: white; background: #173e43; cursor: pointer; }
  .tutorial-dock button:disabled { cursor: wait; opacity: .82; }
  .tutorial-dock button > span { grid-row: 1 / 3; font-size: 1.5rem; }
  .tutorial-dock button strong, .tutorial-dock button small { display: block; }
  .tutorial-dock button small { opacity: .8; }
  .tutorial-dock p, .prediction-dock p { margin: 0; color: #596d70; font-size: .86rem; text-align: center; }
  .calibration-status { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 13px; background: #f5e8bd; }
  .calibration-status > span { display: grid; width: 38px; height: 38px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #fff; background: #a64f35; font-weight: 950; }
  .calibration-status > span.done { background: #1a735e; }
  .calibration-status p { display: grid; text-align: left; }
  .calibration-status strong, .calibration-status small { display: block; }
  .prediction-dock > label { font-size: clamp(1.1rem, 3vw, 1.45rem); font-weight: 950; text-align: center; }
  .prediction-entry { display: flex; align-items: baseline; gap: 10px; }
  .prediction-entry input { width: 90px; min-height: 66px; border: 3px solid #a64f35; border-radius: 17px; color: #17333a; background: white; font-size: 2.2rem; font-weight: 950; text-align: center; }
  .prediction-entry input:disabled { opacity: .68; }
  .prediction-entry span { font-weight: 850; }
  .running-copy { color: #1a735e !important; font-weight: 900; }
  .world-message { display: grid; min-height: 62px; grid-template-columns: 30px 1fr; align-items: center; gap: 10px; max-width: 900px; margin: 16px auto 0; padding: 12px 15px; border: 1px solid #c4cdc3; border-radius: 15px; background: #fff9ec; }
  .world-message.error { border-color: #bd6a4f; color: #782f22; background: #fff1eb; }
  .world-message > span { display: grid; width: 28px; height: 28px; place-items: center; border-radius: 50%; color: white; background: #a64f35; font-weight: 950; }
  .world-message p { margin: 0; line-height: 1.45; }
  .retry { display: block; margin: 14px auto 0; }
  .success, .complete { display: grid; width: min(980px, calc(100% - 32px)); min-height: 100vh; margin: auto; align-content: center; justify-items: center; gap: 18px; padding: 46px 0; text-align: center; }
  .success h1, .complete h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .success-feedback, .composition, .complete > p:not(.kicker):not(.boundary) { max-width: 700px; margin: 0; line-height: 1.55; }
  .success-feedback { padding: 14px 17px; border: 1px solid #c7d0bd; border-radius: 15px; background: #fff9ec; }
  .composition { color: #75431f; }
  .completion-emblem { display: grid; width: 92px; aspect-ratio: 1; place-items: center; border-radius: 50%; color: #fff; background: #1a735e; box-shadow: 0 0 0 12px #f3c85d; font-size: 2.8rem; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition: none !important; } }
  @media (max-width: 720px) {
    .intro { grid-template-columns: 1fr; align-content: center; }
    .intro-copy { grid-column: 1; }
    .hero-art { position: absolute; inset: 8% -20% auto 38%; z-index: 0; height: 58%; opacity: .27; }
    .intro-copy { text-shadow: 0 1px rgba(255,255,255,.9); }
  }
  @media (max-width: 520px) {
    .intro, .success, .complete { width: min(100% - 24px, 980px); padding: 34px 0; }
    .scene { width: min(100% - 20px, 1020px); padding-top: 24px; }
    .topbar { padding: 10px 12px; }
    .topbar p span { display: none; }
    .hero-art { display: none; }
    .control-dock { width: calc(100% - 12px); padding: 14px 10px; }
    .calibration-status { align-items: flex-start; }
    .prediction-entry { max-width: 100%; flex-wrap: wrap; justify-content: center; }
    .world-message { grid-template-columns: 28px minmax(0, 1fr); }
  }
</style>
