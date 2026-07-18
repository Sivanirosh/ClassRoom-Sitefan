<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import './prototype.css';
  import finalVictoryArtwork from './assets/screens/final-victory.webp';
  import introArtwork from './assets/screens/intro.webp';
  import roundSuccessArtwork from './assets/screens/round-success.webp';
  import timeoutRetryArtwork from './assets/screens/timeout-retry.webp';
  import flyerFrame1 from './assets/sprites/flyer-1.png';
  import flyerFrame2 from './assets/sprites/flyer-2.png';
  import flyerFrame3 from './assets/sprites/flyer-3.png';
  import runnerFrame1 from './assets/sprites/runner-1.png';
  import runnerFrame2 from './assets/sprites/runner-2.png';
  import runnerFrame3 from './assets/sprites/runner-3.png';
  import {
    createNumberPatternRace,
    type FocusTarget,
    type MotionPreference,
    type RaceEffect,
    type RaceIntent,
    type RaceUpdate
  } from './race-model';

  const race = createNumberPatternRace();
  const runnerFrames = [runnerFrame1, runnerFrame2, runnerFrame3] as const;
  const flyerFrames = [flyerFrame1, flyerFrame2, flyerFrame3] as const;
  let modelView = race.current().view;
  let announcement = '';
  let announcementRevision = 0;
  let errorProbeCompleted = false;
  let dragTargetIndex: number | null = null;
  let draggingTile: number | null = null;
  let dragX = 0;
  let dragY = 0;
  let landingIndex: number | null = null;
  let nativeDragGhost: HTMLElement | null = null;
  let raceFrame: number | null = null;
  let rootElement: HTMLElement;

  $: view = modelView.screen;
  $: scene = modelView.scene;
  $: sceneIndex = modelView.sceneIndex;
  $: sceneCount = modelView.sceneCount;
  $: stageMarkers = Array.from({ length: sceneCount });
  $: completedRuleLabels = modelView.completedRuleLabels;
  $: selectedTile = modelView.selectedNumber;
  $: placements = modelView.placements;
  $: solvedCount = modelView.solvedCount;
  $: currentHole = modelView.currentHole;
  $: availableTiles = modelView.availableNumbers;
  $: message = modelView.message;
  $: messageKind = modelView.messageKind;
  $: raceStarted = modelView.raceStarted;
  $: raceLost = modelView.raceLost;
  $: opponentProgress = modelView.opponentProgress;
  $: runnerProgress = modelView.runner.progress;
  $: runnerDurationMs = modelView.runner.durationMs;
  $: runnerMoving = modelView.runner.moving;
  $: mistakeIndex = modelView.mistakeIndex;
  $: timeLeft = modelView.timeLeft;
  $: smokeState = view;
  $: smokeSuccessPlan = view === 'active'
    ? scene.missing.flatMap((index) => [`tile-${scene.values[index]}`, `slot-${index}`]).join(',')
    : undefined;
  $: smokeErrorPlan = view === 'active' && scene.id === 'infer' && !errorProbeCompleted && messageKind !== 'error'
    ? 'tile-12,slot-1'
    : undefined;
  $: smokeRecoveryPlan = view === 'active' && raceLost ? 'retry' : undefined;

  onDestroy(() => {
    if (raceFrame !== null) cancelAnimationFrame(raceFrame);
    nativeDragGhost?.remove();
  });

  function motionPreference(): MotionPreference {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
  }

  function dispatch(intent: RaceIntent, now = performance.now()): RaceUpdate {
    const next = race.send(intent, now);
    modelView = next.view;
    for (const effect of next.effects) applyEffect(effect);
    scheduleTimeUpdates(next.needsTimeUpdates);
    return next;
  }

  function scheduleTimeUpdates(required: boolean): void {
    if (!required) {
      if (raceFrame !== null) cancelAnimationFrame(raceFrame);
      raceFrame = null;
      return;
    }
    if (raceFrame === null) raceFrame = requestAnimationFrame(updateTime);
  }

  function updateTime(now: number): void {
    raceFrame = null;
    dispatch({ type: 'time' }, now);
  }

  function applyEffect(effect: RaceEffect): void {
    if (effect.type === 'announce') {
      void writeAnnouncement(effect.message);
      return;
    }
    if (effect.type === 'clear-announcement') {
      announcementRevision += 1;
      announcement = '';
      return;
    }
    void focus(focusSelector(effect.target));
  }

  async function writeAnnouncement(message: string): Promise<void> {
    const revision = ++announcementRevision;
    announcement = '';
    await tick();
    if (revision === announcementRevision) announcement = message;
  }

  function focusSelector(target: FocusTarget): string {
    if (target === 'intro-title') return '#intro-title';
    if (target === 'scene-title') return '#scene-title';
    if (target === 'active-gap') return `#path-slot-${modelView.currentHole ?? ''}`;
    if (target === 'success-feedback') return '[data-smoke-feedback="success"]';
    return '[data-smoke-completion]';
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function start(): void {
    errorProbeCompleted = false;
    clearDragState();
    landingIndex = null;
    dispatch({ type: 'start', motion: motionPreference() });
  }

  function selectTile(value: number, event: MouseEvent): void {
    dispatch({
      type: 'select',
      value,
      source: event.detail === 0 ? 'keyboard' : 'pointer'
    });
  }

  function beginDrag(event: DragEvent, value: number): void {
    if (!raceStarted || raceLost) {
      event.preventDefault();
      return;
    }

    const next = dispatch({ type: 'select', value, source: 'drag' });
    if (!next.view.raceStarted || next.view.raceLost || next.view.currentHole === null) {
      event.preventDefault();
      clearDragState();
      return;
    }

    draggingTile = value;
    updateDragPosition(event, true);

    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', String(value));
      event.dataTransfer.effectAllowed = 'move';
      installTransparentNativeGhost(event.dataTransfer);
    }
  }

  function installTransparentNativeGhost(dataTransfer: DataTransfer): void {
    nativeDragGhost?.remove();
    nativeDragGhost = document.createElement('span');
    nativeDragGhost.className = 'native-drag-ghost';
    nativeDragGhost.setAttribute('aria-hidden', 'true');
    rootElement.appendChild(nativeDragGhost);
    dataTransfer.setDragImage(nativeDragGhost, 0, 0);
  }

  function updateDragPosition(event: DragEvent, useSourceFallback = false): void {
    if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY) && (event.clientX !== 0 || event.clientY !== 0)) {
      dragX = event.clientX;
      dragY = event.clientY;
      return;
    }
    if (!useSourceFallback || !(event.currentTarget instanceof HTMLElement)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    dragX = bounds.left + bounds.width / 2;
    dragY = bounds.top + bounds.height / 2;
  }

  function allowDrop(event: DragEvent, index: number): void {
    if (!raceStarted || raceLost || index !== currentHole) return;
    event.preventDefault();
    updateDragPosition(event);
    dragTargetIndex = index;
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  function leaveDropTarget(event: DragEvent, index: number): void {
    if (dragTargetIndex !== index) return;
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const bounds = target.getBoundingClientRect();
    if (
      event.clientX >= bounds.left && event.clientX <= bounds.right &&
      event.clientY >= bounds.top && event.clientY <= bounds.bottom
    ) return;
    dragTargetIndex = null;
  }

  function dropTile(event: DragEvent, index: number): void {
    event.preventDefault();
    const rawValue = event.dataTransfer?.getData('text/plain') ?? '';
    clearDragState();
    if (rawValue.trim() === '') return;
    const droppedTile = Number(rawValue);
    if (!Number.isFinite(droppedTile)) return;
    placeTile(index, droppedTile);
  }

  function finishDrag(): void {
    clearDragState();
  }

  function clearDragState(): void {
    dragTargetIndex = null;
    draggingTile = null;
    nativeDragGhost?.remove();
    nativeDragGhost = null;
  }

  function placeTile(index: number, tileValue?: number): void {
    const attemptedValue = tileValue ?? selectedTile;
    const next = dispatch({ type: 'place', index, value: tileValue });
    dragTargetIndex = null;
    landingIndex = attemptedValue !== null && next.view.placements[index] === attemptedValue && motionPreference() === 'full'
      ? index
      : null;
    if (next.view.scene.id === 'infer' && next.view.mistakeIndex === index) {
      errorProbeCompleted = true;
    }
  }

  function finishLanding(event: AnimationEvent, index: number): void {
    if (event.currentTarget === event.target && landingIndex === index) landingIndex = null;
  }

  function retry(): void {
    errorProbeCompleted = false;
    clearDragState();
    landingIndex = null;
    dispatch({ type: 'retry', motion: motionPreference() });
  }

  function continueStory(): void {
    errorProbeCompleted = false;
    clearDragState();
    landingIndex = null;
    dispatch({ type: 'continue', motion: motionPreference() });
  }

  function restart(): void {
    errorProbeCompleted = false;
    clearDragState();
    landingIndex = null;
    dispatch({ type: 'restart' });
  }
</script>

<svelte:head>
  <title>Le pas caché · La Course du Sentier</title>
  <meta name="description" content="Trouver les nombres manquants de trois suites pour reconstruire un sentier pendant une course." />
  <meta name="color-scheme" content="light" />
  <meta name="darkreader-lock" />
</svelte:head>

<main
  class="prototype-root ex0007-root"
  data-smoke-root
  data-smoke-exercise="EX-0007"
  data-smoke-program="program-graybox-precedents"
  data-smoke-scene={view === 'ready' ? 'intro' : scene.id}
  data-smoke-state={smokeState}
  data-smoke-success-plan={smokeSuccessPlan}
  data-smoke-error-plan={smokeErrorPlan}
  data-smoke-recovery-plan={smokeRecoveryPlan}
  bind:this={rootElement}
>
  <p class="sr-only" aria-live="polite">{announcement}</p>

  {#if view === 'ready'}
    <section class="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="kicker">Le pas caché · Mission du matin</p>
        <h1 id="intro-title" tabindex="-1">La Course du Sentier</h1>
        <p class="lead">Répare le sentier avant le planeur.</p>
        <button class="primary" type="button" data-smoke-action="start" onclick={start}>Commencer la mission</button>
        <p class="boundary">3 étapes · Chronométré</p>
      </div>

      <figure class="intro-race" aria-hidden="true" data-ex0007-art="intro">
        <img
          src={introArtwork}
          alt=""
          width="1672"
          height="941"
          loading="eager"
          decoding="async"
          draggable="false"
        />
      </figure>

    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <header class="topbar">
        <div>
          <strong>La Course du Sentier</strong>
        </div>
        <ol aria-label={`Progression : étape ${sceneIndex + 1} sur ${sceneCount}`}>
          {#each stageMarkers as _item, index}
            <li
              class:done={index < sceneIndex}
              class:current={index === sceneIndex}
              aria-current={index === sceneIndex ? 'step' : undefined}
              aria-label={index < sceneIndex ? `Étape ${index + 1} terminée` : index === sceneIndex ? `Étape ${index + 1} en cours` : `Étape ${index + 1} à venir`}
            >{index < sceneIndex ? '✓' : index + 1}</li>
          {/each}
        </ol>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <header class="scene-heading">
          <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
          <div class:urgent={raceStarted && timeLeft <= 8} class="timer" role="timer" aria-label={`${Math.ceil(timeLeft)} secondes restantes`}>
            <span>{Math.ceil(timeLeft)}</span><small>s</small>
          </div>
          <p class="sr-only">{scene.eyebrow}. {scene.prompt}</p>
        </header>

        <section
          class="race-card unified-race"
          aria-label="Sentier numérique aligné avec le parcours du planeur rival"
          data-location={scene.id}
          style={`--term-count: ${scene.values.length}`}
        >
          <p class="sr-only">{raceLost ? 'Passage fermé.' : currentHole === null ? 'Sentier reconstruit.' : `Portion ${currentHole + 1} effondrée.`} {solvedCount} sur {scene.missing.length} reconstruite{scene.missing.length > 1 ? 's' : ''}.</p>

          <div class="course-alignment">
            <p class="sr-only">Planeur rival : {Math.round(opponentProgress)}% du parcours.</p>
            <div
              class="sky-course"
              role="group"
              aria-label={`Progression du planeur rival : ${Math.round(opponentProgress)}% du parcours`}
            >
              <div class="sky-grid" role="list" aria-label={`${scene.values.length} segments du parcours aérien`}>
                {#each scene.values as _value, index}
                  <span class="sky-segment" role="listitem"><span class="sr-only">Segment aérien {index + 1} sur {scene.values.length}</span></span>
                {/each}
              </div>
              <span
                class:flying={raceStarted && !raceLost}
                class="flyer-token race-flyer"
                style={`left: clamp(62px, ${opponentProgress}%, calc(100% - 62px))`}
                aria-hidden="true"
                data-ex0007-sprite="flyer"
                data-frame-count="3"
              >
                <span class="flyer-figure asset-sprite">
                  {#each flyerFrames as frame}
                    <img class="sprite-frame" src={frame} alt="" width="520" height="380" draggable="false" />
                  {/each}
                </span>
              </span>
            </div>

            <p class="sr-only">Coureur au sol : {currentHole === null ? 'sentier ouvert' : currentHole === 0 ? 'arrêté au départ' : `attend avant la brèche ${currentHole + 1}`}.</p>
            <div
              class="ground-course"
              role="group"
              aria-label={`Progression du coureur : ${Math.round(runnerProgress)}% du parcours. ${currentHole === null ? 'Aucun passage effondré ne le bloque.' : currentHole === 0 ? 'La première portion manquante le bloque au départ.' : `Il attend après la portion ${currentHole}, devant la brèche ${currentHole + 1}.`}`}
            >
              <span class="start-line" aria-hidden="true"><i></i><b>DÉPART</b></span>
              <span class="finish-line" aria-hidden="true"><i></i><b>ARRIVÉE</b></span>
              <span
                class:waiting={!raceStarted}
                class:running={runnerMoving}
                class="runner-token race-runner"
                style={`--runner-duration: ${runnerDurationMs}ms; left: ${runnerProgress}%`}
                aria-hidden="true"
                data-ex0007-sprite="runner"
                data-frame-count="3"
              >
                <span class="runner-figure asset-sprite">
                  {#each runnerFrames as frame}
                    <img class="sprite-frame" src={frame} alt="" width="512" height="460" draggable="false" />
                  {/each}
                </span>
              </span>

              <div class="sequence" role="list" aria-label="Portions numérotées du sentier dans l’ordre">
                {#each scene.values as value, index}
                  {@const shown = scene.missing.includes(index) ? (placements[index] ?? null) : value}
                  <div
                    class:missing={scene.missing.includes(index)}
                    class:filled={shown !== null && scene.missing.includes(index)}
                    class:current-hole={index === currentHole && raceStarted}
                    class:drag-over={index === dragTargetIndex}
                    class:mistake={index === mistakeIndex}
                    class:landing={index === landingIndex}
                    class="term"
                    role="listitem"
                    onanimationend={(event) => finishLanding(event, index)}
                  >
                    <span class="ground-piece" aria-hidden="true"></span>
                    <span class="term-index sr-only">Portion {index + 1}</span>
                    {#if index === mistakeIndex}<span class="mistake-mark" aria-hidden="true">×</span>{/if}
                    {#if shown !== null}
                      <strong>{shown}</strong>
                      {#if scene.missing.includes(index)}<span class="state-mark" aria-hidden="true">✓</span>{/if}
                      <small class="sr-only">{scene.missing.includes(index) ? 'Reconstruite' : 'Portion intacte'}</small>
                    {:else}
                      <button
                        class="slot"
                        type="button"
                        id={`path-slot-${index}`}
                        aria-label={`Brèche ${index + 1} ${index === currentHole ? 'à reconstruire' : 'ensuite'}${selectedTile === null ? '. Choisir un nombre avant de réparer le sol.' : `. Placer le nombre ${selectedTile}.`}`}
                        aria-describedby="dock-guidance"
                        data-smoke-control={`slot-${index}`}
                        onclick={() => placeTile(index)}
                        ondragenter={(event) => allowDrop(event, index)}
                        ondragover={(event) => allowDrop(event, index)}
                        ondragleave={(event) => leaveDropTarget(event, index)}
                        ondrop={(event) => void dropTile(event, index)}
                        disabled={!raceStarted || raceLost || index !== currentHole}
                      >
                        <span aria-hidden="true">?</span>
                        <small class="sr-only">{index === currentHole ? 'À réparer' : 'Ensuite'}</small>
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>

        </section>

        <section class="workbench" aria-label="Nombres disponibles">
          <p class="selection-guidance sr-only" id="dock-guidance" aria-live="polite">
            {selectedTile === null
              ? currentHole === null ? 'Tout le sentier est reconstruit.' : `Choisis un nombre → brèche ${currentHole + 1}`
              : `${selectedTile} sélectionné → brèche ${(currentHole ?? 0) + 1}`}
          </p>
          <div class:hinted={scene.hint !== null} class="tile-panel">
            {#if scene.hint}
              <p class="given-rule" aria-label={`Pas donné : ${scene.stepLabel} entre chaque portion`}><strong>{scene.stepLabel}</strong></p>
            {/if}
            <div class="tile-bank" aria-label="Nombres disponibles">
              {#each availableTiles as tile}
                <button
                  class:selected={selectedTile === tile}
                  class:dragging={draggingTile === tile}
                  class="tile"
                  type="button"
                  draggable={raceStarted && !raceLost && currentHole !== null}
                  data-smoke-control={`tile-${tile}`}
                  aria-controls={currentHole === null ? undefined : `path-slot-${currentHole}`}
                  aria-describedby="dock-guidance"
                  aria-pressed={selectedTile === tile}
                  aria-label={`Nombre ${tile}${selectedTile === tile ? ', sélectionné' : ''}`}
                  onclick={(event) => void selectTile(tile, event)}
                  ondragstart={(event) => beginDrag(event, tile)}
                  ondrag={(event) => updateDragPosition(event)}
                  ondragend={finishDrag}
                  disabled={!raceStarted || raceLost || currentHole === null}
                ><span class="tile-number" aria-hidden="true">{tile}</span></button>
              {/each}
            </div>
          </div>

          {#if messageKind === 'error' && !raceLost}
            <div
              class="feedback error inline-error"
              role="status"
              tabindex="-1"
              data-smoke-feedback="error"
              data-smoke-feedback-detail="true"
            >
              <strong>À vérifier</strong>
              <p>{message}</p>
            </div>
          {/if}
        </section>

        {#if sceneIndex === 0 && !raceLost}
          <aside class="round-tutorial" aria-label="Tutoriel de la première étape">
            <ol class="tutorial-steps" aria-label="Comment jouer">
              <li><span>1</span><div><strong>Observe</strong><p>Repère le pas qui se répète entre les nombres.</p></div></li>
              <li><span>2</span><div><strong>Place</strong><p>Glisse un nombre sur le <b>?</b>, ou choisis le nombre puis la brèche.</p></div></li>
              <li><span>3</span><div><strong>Avance</strong><p>Une bonne réponse répare le sol et libère le coureur. En cas d’erreur, essaie encore.</p></div></li>
            </ol>
            <p class="sr-only">Au clavier, active un nombre avec Entrée. Le focus rejoint la brèche à reconstruire ; appuie encore sur Entrée pour le placer. Le chrono continue pendant une erreur.</p>
          </aside>
        {/if}

        {#if messageKind === 'error' && raceLost}
          <section class="timeout-card" aria-label="Temps écoulé" data-ex0007-art="timeout-retry">
            <img
              src={timeoutRetryArtwork}
              alt=""
              width="1672"
              height="941"
              loading="eager"
              decoding="async"
              draggable="false"
            />
            <div class="timeout-copy">
              <div
                class="feedback error timeout-feedback"
                role="status"
                tabindex="-1"
                data-smoke-feedback="error"
                data-smoke-feedback-detail="true"
              >
                <strong>Sentier fermé</strong>
                <p>{message}</p>
              </div>
              <button class="retry" type="button" data-smoke-control="retry" onclick={retry}>Reprendre cette étape</button>
            </div>
          </section>
        {/if}
      </section>

      {#if draggingTile !== null}
        <div
          class="drag-follower"
          style={`left: ${dragX}px; top: ${dragY}px`}
          aria-hidden="true"
          data-drag-preview
        >
          <span class:over-target={dragTargetIndex !== null}><span class="tile-number">{draggingTile}</span></span>
        </div>
      {/if}
    </div>
  {:else if view === 'success'}
    <section class="success outcome-screen" aria-labelledby="success-title" data-ex0007-art="round-success">
      <img
        class="outcome-art"
        src={roundSuccessArtwork}
        alt=""
        width="1672"
        height="941"
        loading="eager"
        decoding="async"
        draggable="false"
      />
      <div class="outcome-panel">
        <p class="kicker">Étape {sceneIndex + 1} terminée</p>
        <h1 id="success-title" tabindex="-1">Sentier reconstruit</h1>

        <div class="completed-line" aria-label={`Suite complète avec le pas ${scene.stepLabel}`}>
          {#each scene.values as value, index}
            <span>{value}</span>
            {#if index < scene.values.length - 1}<i>{scene.stepLabel}</i>{/if}
          {/each}
        </div>

        <p class="success-feedback" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true" aria-label={message}><span aria-hidden="true">✓</span> Pas constant vérifié : {scene.stepLabel}</p>
        <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory} aria-label={sceneIndex === sceneCount - 1 ? 'Voir le bilan' : 'Lancer l’étape suivante. Le chrono démarre immédiatement.'}>
          {sceneIndex === sceneCount - 1 ? 'Voir le bilan' : 'Étape suivante'}
        </button>
      </div>
    </section>
  {:else}
    <section class="complete outcome-screen" aria-labelledby="complete-title" tabindex="-1" data-smoke-completion data-ex0007-art="final-victory">
      <img
        class="outcome-art"
        src={finalVictoryArtwork}
        alt=""
        width="1774"
        height="887"
        loading="eager"
        decoding="async"
        draggable="false"
      />
      <div class="outcome-panel">
        <p class="kicker">La Course du Sentier</p>
        <h1 id="complete-title">Mission accomplie</h1>
        <div class="rule-summary" aria-label="Pas des trois suites rétablies">
          {#each completedRuleLabels as ruleLabel, index}
            <span><small class="sr-only">Ligne {index + 1} :</small>{ruleLabel}</span>
          {/each}
        </div>
        <button class="secondary" type="button" onclick={restart}>Recommencer</button>
      </div>
    </section>
  {/if}
</main>
