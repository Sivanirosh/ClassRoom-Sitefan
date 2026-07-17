<script lang="ts">
  import { tick } from 'svelte';

  type View = 'intro' | 'active' | 'success' | 'complete';
  type MessageKind = 'instruction' | 'action' | 'error';
  type SceneKind = 'gap' | 'unit' | 'blank';

  type TraceStep = {
    offsetHalf: number;
    lengthHalf: number;
    countEvents: number;
  };

  type DerivedStep = TraceStep & {
    startHalf: number;
    endHalf: number;
  };

  type Scene = {
    id: string;
    chapter: string;
    title: string;
    prompt: string;
    targetUnits: number;
    kind: SceneKind;
    initial: TraceStep[];
    success: string;
  };

  const scenes: Scene[] = [
    {
      id: 'gap',
      chapter: 'Orientation',
      title: 'Le trou qui décale tout',
      prompt: 'Rejoue la trace pas à pas. Arrête-toi sur la première relation qui ne respecte plus « le début juste au bout du précédent », puis modifie le vrai intervalle.',
      targetUnits: 3,
      kind: 'gap',
      initial: [
        { offsetHalf: 0, lengthHalf: 2, countEvents: 1 },
        { offsetHalf: 1, lengthHalf: 2, countEvents: 1 },
        { offsetHalf: 0, lengthHalf: 2, countEvents: 1 }
      ],
      success: 'Tu as réparé la première relation : le deuxième pavé part maintenant au bout du premier, et toute la suite revient sur l’Arrivée.'
    },
    {
      id: 'unit',
      chapter: 'Complication',
      title: 'L’unité qui a grandi',
      prompt: 'La couleur peut changer, pas la longueur de l’unité. Rejoue, marque la première unité qui ne correspond plus au pavé-étalon, puis raccourcis l’intervalle lui-même.',
      targetUnits: 3,
      kind: 'unit',
      initial: [
        { offsetHalf: 0, lengthHalf: 2, countEvents: 1 },
        { offsetHalf: 0, lengthHalf: 3, countEvents: 1 },
        { offsetHalf: 0, lengthHalf: 2, countEvents: 1 }
      ],
      success: 'Les trois intervalles utilisent maintenant la même longueur de pavé. La trace atteint l’Arrivée sans changer d’unité.'
    },
    {
      id: 'blank',
      chapter: 'Indépendance',
      title: 'Plan vierge',
      prompt: 'Le plan est vide. Ajoute chaque pavé, règle son début pour qu’il touche le bout du précédent, puis compte chaque intervalle une fois. Lance ensuite ta propre trace.',
      targetUnits: 4,
      kind: 'blank',
      initial: [],
      success: 'Ta trace ne dépend plus du plan d’un autre équipage : quatre unités identiques se suivent sans trou ni chevauchement. La ligne mesure 4 longueurs de pavé.'
    }
  ];

  const smokePlans: Record<string, string> = {
    gap: 'step,step,step,previous,mark,shift-left,run,cite-unit,cite-continuity,cite-measure,explain,declare',
    unit: 'step,step,step,previous,mark,shorten,run,cite-unit,cite-continuity,cite-measure,explain,declare',
    blank: 'add,count,add,shift-right,shift-right,count,add,shift-right,shift-right,count,add,shift-right,shift-right,count,run,cite-unit,cite-continuity,cite-measure,explain,declare'
  };

  let view: View = 'intro';
  let sceneIndex = 0;
  let trace: TraceStep[] = [];
  let replayIndex = 0;
  let selectedIndex: number | null = null;
  let message = '';
  let messageKind: MessageKind = 'instruction';
  let announcement = '';
  let runAttempts = 0;
  let edits = 0;
  let marks = 0;
  let initialTerminalHalf = 0;
  let reportMode = false;
  let reportUnit = false;
  let reportContinuity = false;
  let reportMeasure = false;
  let reportExplanation = '';
  let rootElement: HTMLElement;

  $: scene = scenes[sceneIndex];
  $: derivedTrace = derive(trace);
  $: visibleCount = scene.kind === 'blank' ? trace.length : replayIndex;
  $: reportExplanationValid = explanationMeetsContract(reportExplanation);
  $: smokeState = view === 'intro' ? 'ready' : view === 'active' ? 'active' : view === 'success' ? 'success' : 'complete';
  $: smokeSuccessPlan = view === 'active' ? smokePlans[scene.id] : undefined;
  $: smokeErrorPlan = view === 'active' && sceneIndex === 0 ? 'run' : undefined;

  function cloneTrace(source: TraceStep[]): TraceStep[] {
    return source.map((step) => ({ ...step }));
  }

  function derive(source: TraceStep[]): DerivedStep[] {
    const result: DerivedStep[] = [];
    let previousEnd = 0;
    for (const step of source) {
      const startHalf = previousEnd + step.offsetHalf;
      const endHalf = startHalf + step.lengthHalf;
      result.push({ ...step, startHalf, endHalf });
      previousEnd = endHalf;
    }
    return result;
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function loadScene(index: number): void {
    sceneIndex = index;
    trace = cloneTrace(scenes[index].initial);
    replayIndex = 0;
    selectedIndex = null;
    runAttempts = 0;
    edits = 0;
    marks = 0;
    reportMode = false;
    reportUnit = false;
    reportContinuity = false;
    reportMeasure = false;
    reportExplanation = '';
    initialTerminalHalf = derive(trace).at(-1)?.endHalf ?? 0;
    message = scenes[index].kind === 'blank'
      ? 'Le registre est vide. Ajoute le premier intervalle : il partira du drapeau Départ, mais son comptage restera vide.'
      : 'La trace est chargée mais masquée. Avance manuellement, un intervalle à la fois.';
    messageKind = 'instruction';
    view = 'active';
  }

  async function start(): Promise<void> {
    loadScene(0);
    announcement = 'Première trace chargée. Le replay attend ton premier pas.';
    await focus('#scene-title');
  }

  function stepReplay(): void {
    if (replayIndex >= trace.length) {
      message = 'Toute la trace est déjà visible. Marque une relation ou lance le contrôle complet.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    replayIndex += 1;
    selectedIndex = null;
    const current = derive(trace)[replayIndex - 1];
    message = `Pas ${replayIndex} révélé : ${relationDescription(current, replayIndex - 1)} Le système n’a pas décidé si tu dois le réparer.`;
    messageKind = 'action';
    announcement = message;
  }

  function stepBack(): void {
    if (replayIndex === 0) {
      message = 'Le replay est déjà revenu avant le premier intervalle.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    replayIndex -= 1;
    selectedIndex = null;
    message = replayIndex === 0
      ? 'Replay revenu au Départ. Avance quand tu veux inspecter le premier intervalle.'
      : `Replay revenu après l’intervalle ${replayIndex}. Le prochain pas révélera de nouveau l’intervalle ${replayIndex + 1}.`;
    messageKind = 'action';
    announcement = message;
  }

  function markCurrent(): void {
    if (replayIndex === 0) {
      message = 'Rejoue au moins un intervalle avant de marquer une relation.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    selectedIndex = replayIndex - 1;
    marks += 1;
    message = `Intervalle ${selectedIndex + 1} marqué. Modifie maintenant son état réel, ou poursuis le replay si tu n’es pas certain.`;
    messageKind = 'action';
    announcement = message;
  }

  function updateSelected(update: (step: TraceStep) => TraceStep, actionMessage: string): void {
    if (selectedIndex === null || !trace[selectedIndex]) {
      message = 'Marque d’abord l’intervalle que tu veux modifier.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    const current = trace[selectedIndex];
    const next = update(current);
    if (next.offsetHalf === current.offsetHalf && next.lengthHalf === current.lengthHalf && next.countEvents === current.countEvents) {
      message = 'Cette limite est déjà atteinte; aucun état n’a été modifié.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    trace = trace.map((step, index) => index === selectedIndex ? next : step);
    edits += 1;
    message = `${actionMessage} Les intervalles suivants sont recalculés depuis ce nouveau bout.`;
    messageKind = 'action';
    announcement = message;
  }

  function shiftSelected(delta: -1 | 1): void {
    updateSelected(
      (step) => ({ ...step, offsetHalf: Math.max(-4, Math.min(4, step.offsetHalf + delta)) }),
      delta < 0 ? 'Le début marqué a été décalé à gauche.' : 'Le début marqué a été décalé à droite.'
    );
  }

  function resizeSelected(delta: -1 | 1): void {
    updateSelected(
      (step) => ({ ...step, lengthHalf: Math.max(1, Math.min(4, step.lengthHalf + delta)) }),
      delta < 0 ? 'L’unité marquée a été raccourcie.' : 'L’unité marquée a été allongée.'
    );
  }

  function addInterval(): void {
    if (trace.length >= scene.targetUnits) {
      message = `Le plan possède déjà ${scene.targetUnits} emplacements. Contrôle leurs relations au lieu d’ajouter un autre pavé.`;
      messageKind = 'error';
      announcement = message;
      return;
    }
    const newStep: TraceStep = {
      offsetHalf: trace.length === 0 ? 0 : -2,
      lengthHalf: 2,
      countEvents: 0
    };
    trace = [...trace, newStep];
    selectedIndex = trace.length - 1;
    replayIndex = trace.length;
    message = trace.length === 1
      ? 'Premier intervalle ajouté au Départ. Son comptage reste vide.'
      : `Intervalle ${trace.length} ajouté : il chevauche d’abord le précédent. Déplace directement son début jusqu’au dernier bout.`;
    messageKind = 'action';
    announcement = message;
  }

  function countSelected(): void {
    updateSelected(
      (step) => ({ ...step, countEvents: step.countEvents + 1 }),
      'Un événement de comptage a été ajouté à l’intervalle marqué.'
    );
  }

  function uncountSelected(): void {
    updateSelected(
      (step) => ({ ...step, countEvents: Math.max(0, step.countEvents - 1) }),
      'Un événement de comptage a été retiré de l’intervalle marqué.'
    );
  }

  function firstProblem(): string | null {
    if (trace.length === 0) return 'Le plan est vide : aucun intervalle ne peut encore mesurer la ligne.';
    if (trace.length < scene.targetUnits) return `Le plan contient ${trace.length} intervalle${trace.length > 1 ? 's' : ''}; il en faut encore pour rejoindre l’Arrivée.`;
    if (trace.length > scene.targetUnits) return 'Le plan contient plus d’intervalles que la longueur entière prévue.';

    const derived = derive(trace);
    for (let index = 0; index < derived.length; index += 1) {
      const step = derived[index];
      if (step.offsetHalf > 0) {
        return index === 0
          ? 'Le premier intervalle commence après le drapeau Départ.'
          : `Un trou précède l’intervalle ${index + 1} : son début est après le bout de l’intervalle ${index}.`;
      }
      if (step.offsetHalf < 0) {
        return index === 0
          ? 'Le premier intervalle commence avant le drapeau Départ.'
          : `L’intervalle ${index + 1} chevauche l’intervalle ${index} : son début est avant le bout précédent.`;
      }
      if (step.lengthHalf !== 2) {
        return step.lengthHalf > 2
          ? `L’unité de l’intervalle ${index + 1} est plus longue que le pavé-étalon.`
          : `L’unité de l’intervalle ${index + 1} est plus courte que le pavé-étalon.`;
      }
      if (step.countEvents === 0) return `L’intervalle ${index + 1} n’a aucun événement de comptage.`;
      if (step.countEvents > 1) return `L’intervalle ${index + 1} possède ${step.countEvents} comptages au lieu d’un seul.`;
    }
    if (derived.at(-1)!.endHalf !== scene.targetUnits * 2) {
      return 'Le dernier bout ne coïncide pas avec le drapeau Arrivée.';
    }
    return null;
  }

  function terminalConsequence(): string {
    const end = derive(trace).at(-1)?.endHalf ?? 0;
    const target = scene.targetUnits * 2;
    if (end > target) return 'Le relevé finit après l’Arrivée.';
    if (end < target) return 'Le relevé finit avant l’Arrivée.';
    return 'Le dernier bout atteint l’Arrivée, mais une relation intermédiaire reste invalide.';
  }

  function firstInvalidIndex(): number | null {
    const derived = derive(trace);
    for (let index = 0; index < derived.length; index += 1) {
      const step = derived[index];
      if (step.offsetHalf !== 0 || step.lengthHalf !== 2 || step.countEvents !== 1) return index;
    }
    if (derived.length !== scene.targetUnits || derived.at(-1)?.endHalf !== scene.targetUnits * 2) {
      return derived.length > 0 ? derived.length - 1 : null;
    }
    return null;
  }

  async function runTrace(): Promise<void> {
    runAttempts += 1;
    const problem = firstProblem();
    if (problem) {
      const firstInvalid = firstInvalidIndex();
      const diagnosisVerified = scene.kind === 'blank' || (selectedIndex !== null && selectedIndex === firstInvalid);
      message = diagnosisVerified
        ? problem
        : `${terminalConsequence()} Une relation est encore invalide : rejoue la trace pas à pas et marque la première relation qui casse.`;
      messageKind = 'error';
      announcement = message;
      await focus('[data-smoke-feedback="error"]');
      return;
    }
    replayIndex = trace.length;
    reportMode = true;
    reportUnit = false;
    reportContinuity = false;
    reportMeasure = false;
    reportExplanation = '';
    message = 'La trace exécutée est valide. Construis maintenant un rapport à partir de l’unité, de la continuité et de la mesure que tu viens de produire.';
    messageKind = 'action';
    announcement = message;
    await focus('#report-title');
  }

  function citeUnit(): void {
    reportUnit = true;
    message = 'Rapport : tous les intervalles gardent la même longueur que le pavé-étalon.';
    messageKind = 'action';
    announcement = message;
  }

  function citeContinuity(): void {
    reportContinuity = true;
    message = 'Rapport : chaque début rejoint le bout précédent, depuis le Départ jusqu’à l’Arrivée.';
    messageKind = 'action';
    announcement = message;
  }

  function citeMeasure(): void {
    reportMeasure = true;
    message = `Rapport : ${scene.targetUnits} intervalles comptés une fois expriment ${scene.targetUnits} longueurs de pavé.`;
    messageKind = 'action';
    announcement = message;
  }

  function explanationMeetsContract(value: string): boolean {
    const normalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return value.trim().length >= 30
      && normalized.includes(String(scene.targetUnits))
      && normalized.includes('pave')
      && /(debut|bout|trou|chevauch|depart|unite|meme)/.test(normalized);
  }

  async function declareReport(): Promise<void> {
    if (!reportUnit || !reportContinuity || !reportMeasure || !reportExplanationValid) {
      message = 'Le rapport doit encore relier l’unité, la continuité, la mesure et ton explication écrite avant transmission.';
      messageKind = 'error';
      announcement = message;
      await focus('[data-smoke-feedback="error"]');
      return;
    }
    view = 'success';
    message = scene.success;
    messageKind = 'action';
    announcement = `Rapport transmis. ${scene.success}`;
    await focus('[data-smoke-feedback="success"]');
  }

  function reopenTrace(): void {
    reportMode = false;
    reportUnit = false;
    reportContinuity = false;
    reportMeasure = false;
    reportExplanation = '';
    message = 'Trace rouverte. Toute modification exige une nouvelle exécution avant transmission.';
    messageKind = 'action';
    announcement = message;
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      view = 'complete';
      announcement = 'Les trois scènes du contrôle des traces sont terminées.';
      await focus('[data-smoke-completion]');
      return;
    }
    loadScene(sceneIndex + 1);
    announcement = `Nouvelle scène : ${scenes[sceneIndex].title}.`;
    await focus('#scene-title');
  }

  async function restart(): Promise<void> {
    view = 'intro';
    sceneIndex = 0;
    trace = [];
    replayIndex = 0;
    selectedIndex = null;
    reportMode = false;
    announcement = 'Retour à la présentation du contrôle des traces.';
    await focus('#intro-title');
  }

  function relationDescription(step: DerivedStep, index: number): string {
    const anchor = index === 0 ? 'Départ' : `bout ${index}`;
    const startRelation = step.offsetHalf === 0
      ? `le début coïncide avec ${anchor}`
      : step.offsetHalf > 0
        ? `le début est après ${anchor}`
        : `le début est avant ${anchor}`;
    const unitRelation = step.lengthHalf === 2
      ? 'la longueur égale le pavé-étalon'
      : step.lengthHalf > 2
        ? 'la longueur dépasse le pavé-étalon'
        : 'la longueur est inférieure au pavé-étalon';
    return `${startRelation}; ${unitRelation}; ${step.countEvents} comptage${step.countEvents > 1 ? 's' : ''}.`;
  }

  function positionPercent(half: number): number {
    const safe = Math.max(0, Math.min(scene.targetUnits * 2, half));
    return (safe / (scene.targetUnits * 2)) * 100;
  }

  function widthPercent(step: DerivedStep): number {
    const visibleStart = Math.max(0, step.startHalf);
    const visibleEnd = Math.min(scene.targetUnits * 2, step.endHalf);
    return Math.max(0, positionPercent(visibleEnd) - positionPercent(visibleStart));
  }

  function endpointLabel(half: number): string {
    if (half === 0) return 'Départ';
    if (half === scene.targetUnits * 2) return 'Arrivée';
    if (half % 2 === 0) return `repère ${half / 2}`;
    return `cran intermédiaire après ${Math.floor(half / 2)}`;
  }
</script>

<svelte:head>
  <title>Le contrôle des traces · EX-0005</title>
  <meta name="description" content="Graybox MES-01 pour rejouer, réparer puis construire une trace de mesure." />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-root
  data-smoke-exercise="EX-0005"
  data-smoke-program="pilot-seq-m1"
  data-smoke-state={smokeState}
  data-smoke-success-plan={smokeSuccessPlan}
  data-smoke-error-plan={smokeErrorPlan}
  bind:this={rootElement}
>
  <p class="sr-only" aria-live="polite">{announcement}</p>

  {#if view === 'intro'}
    <section class="intro" aria-labelledby="intro-title">
      <div class="trace-emblem" aria-hidden="true"><span>1</span><i>→</i><span class="fault">2</span><i>→</i><span>3</span></div>
      <p class="kicker">EX-0005 · MES-01 · Graybox autorisé</p>
      <h1 id="intro-title" tabindex="-1">Le contrôle<br /><em>des traces</em></h1>
      <p class="lead">Un relevé peut finir au mauvais endroit pour une seule relation cassée. Rejoue sans animation, arrête-toi, modifie l’intervalle réel, puis prouve la règle sur un plan vide.</p>
      <div class="principles">
        <article><span>01</span><h2>Rejouer</h2><p>Un pas manuel révèle un seul intervalle et son effet.</p></article>
        <article><span>02</span><h2>Réparer</h2><p>Aucune liste d’erreurs : tu déplaces ou redimensionnes l’état.</p></article>
        <article><span>03</span><h2>Construire</h2><p>La dernière scène retire entièrement la trace fournie.</p></article>
      </div>
      <button class="primary" type="button" data-smoke-action="start" onclick={start}>Ouvrir le premier relevé <span aria-hidden="true">→</span></button>
      <p class="boundary">3 scènes · replay manuel · une faute racine par trace fournie</p>
    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <header class="topbar">
        <div><span class="brand-mark" aria-hidden="true">⌁</span><strong>Contrôle des traces</strong></div>
        <div class="progress"><span>{scene.chapter}</span><strong>{sceneIndex + 1} / {scenes.length}</strong></div>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <header class="scene-copy">
          <p class="kicker">Dossier {String(sceneIndex + 1).padStart(2, '0')} · {scene.chapter}</p>
          <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
          <p>{scene.prompt}</p>
        </header>

        <div class="debug-layout">
          <section class="replay-panel" aria-label="Replay de la trace de mesure">
            <div class="panel-heading">
              <div><span>Vue causale</span><h2>{scene.kind === 'blank' ? 'Trace en construction' : 'Trace rejouée pas à pas'}</h2></div>
              <p>{scene.kind === 'blank' ? `${trace.length} / ${scene.targetUnits} intervalles` : `${replayIndex} / ${trace.length} révélés`}</p>
            </div>

            <div class="path-map">
              <div class="flag start"><i aria-hidden="true"></i><span>Départ</span></div>
              <div class="flag finish"><i aria-hidden="true"></i><span>Arrivée</span></div>
              <div class="path-line" aria-hidden="true"></div>
              {#each derivedTrace as step, index}
                {#if index < visibleCount}
                  <div
                    class:selected={selectedIndex === index}
                    class:unit-changed={step.lengthHalf !== 2}
                    class="interval"
                    style={`left:${positionPercent(step.startHalf)}%;width:${widthPercent(step)}%`}
                    aria-hidden="true"
                  ><span>{index + 1}</span></div>
                {/if}
              {/each}
              <div class="reference" style={`width:${100 / scene.targetUnits}%`} role="img" aria-label="Pavé-étalon de 50 centimètres"><span>50 cm</span></div>
            </div>

            {#if scene.kind !== 'blank'}
              <div class="replay-controls">
                <button type="button" data-smoke-control="previous" onclick={stepBack} disabled={reportMode || replayIndex === 0}>
                  <span aria-hidden="true">|◀</span><strong>Pas précédent</strong><small>Revenir sans réinitialiser</small>
                </button>
                <button type="button" data-smoke-control="step" onclick={stepReplay} disabled={reportMode || replayIndex >= trace.length}>
                  <span aria-hidden="true">▶|</span><strong>Pas suivant</strong><small>Aucune lecture automatique</small>
                </button>
                <button type="button" data-smoke-control="mark" onclick={markCurrent} disabled={reportMode || replayIndex === 0}>
                  <span aria-hidden="true">⌖</span><strong>Marquer cette relation</strong><small>Intervalle actuellement révélé</small>
                </button>
              </div>
            {:else}
              <button class="add-button" type="button" data-smoke-control="add" onclick={addInterval} disabled={reportMode || trace.length >= scene.targetUnits}>
                <span aria-hidden="true">＋</span><strong>Ajouter un intervalle vide</strong><small>Le comptage reste séparé</small>
              </button>
            {/if}

            <ol class="trace-list" aria-label="États textuels de la trace">
              {#each derivedTrace as step, index}
                {#if index < visibleCount}
                  <li class:current={index === replayIndex - 1 && scene.kind !== 'blank'} class:selected={selectedIndex === index}>
                    <span class="step-number">{index + 1}</span>
                    <div><strong>Intervalle {index + 1}</strong><p>{endpointLabel(step.startHalf)} → {endpointLabel(step.endHalf)}</p></div>
                    <dl>
                      <div><dt>Unité</dt><dd>{step.lengthHalf === 2 ? 'étalon' : step.lengthHalf > 2 ? 'trop longue' : 'trop courte'}</dd></div>
                      <div><dt>Comptage</dt><dd>{step.countEvents}</dd></div>
                    </dl>
                  </li>
                {/if}
              {/each}
            </ol>
          </section>

          <aside class="inspector">
            <div class="panel-heading">
              <div><span>Éditeur direct</span><h2>{selectedIndex === null ? 'Aucun intervalle marqué' : `Intervalle ${selectedIndex + 1}`}</h2></div>
            </div>

            {#if selectedIndex === null}
              <div class="empty-inspector">
                <span aria-hidden="true">⌖</span>
                <p>{scene.kind === 'blank' ? 'Ajoute un intervalle : il devient l’état marqué et modifiable.' : 'Rejoue, puis marque la relation que tu veux réellement modifier.'}</p>
              </div>
            {:else}
              {@const selected = derivedTrace[selectedIndex]}
              <div class="selected-state">
                <p><span>Début</span><strong>{endpointLabel(selected.startHalf)}</strong></p>
                <p><span>Bout</span><strong>{endpointLabel(selected.endHalf)}</strong></p>
                <p><span>Longueur</span><strong>{selected.lengthHalf === 2 ? 'même étalon' : selected.lengthHalf > 2 ? 'plus longue' : 'plus courte'}</strong></p>
              </div>

              {#if scene.kind === 'unit'}
                <div class="edit-controls">
                  <button type="button" data-smoke-control="shorten" onclick={() => resizeSelected(-1)} disabled={reportMode || trace[selectedIndex].lengthHalf <= 1}>− <strong>Raccourcir l’unité</strong></button>
                  <button type="button" data-smoke-control="lengthen" onclick={() => resizeSelected(1)} disabled={reportMode || trace[selectedIndex].lengthHalf >= 4}>＋ <strong>Allonger l’unité</strong></button>
                </div>
              {:else}
                <div class="edit-controls">
                  <button type="button" data-smoke-control="shift-left" onclick={() => shiftSelected(-1)} disabled={reportMode || trace[selectedIndex].offsetHalf <= -4}>← <strong>Déplacer le début</strong></button>
                  <button type="button" data-smoke-control="shift-right" onclick={() => shiftSelected(1)} disabled={reportMode || trace[selectedIndex].offsetHalf >= 4}>→ <strong>Déplacer le début</strong></button>
                </div>
              {/if}

              {#if scene.kind === 'blank'}
                <div class="count-editor">
                  <p><span>Comptages liés</span><strong>{trace[selectedIndex].countEvents}</strong></p>
                  <div>
                    <button type="button" data-smoke-control="uncount" onclick={uncountSelected} disabled={reportMode || trace[selectedIndex].countEvents === 0}>Retirer un comptage</button>
                    <button type="button" data-smoke-control="count" onclick={countSelected} disabled={reportMode}>Compter cet intervalle</button>
                  </div>
                </div>
              {/if}
            {/if}

            <dl class="debug-stats">
              <div><dt>Marquages</dt><dd>{marks}</dd></div>
              <div><dt>Éditions</dt><dd>{edits}</dd></div>
              <div><dt>Exécutions</dt><dd>{runAttempts}</dd></div>
            </dl>

            {#if scene.kind !== 'blank'}
              <p class="before-after"><span>Avant réparation</span><strong>{initialTerminalHalf > scene.targetUnits * 2 ? 'après l’Arrivée' : initialTerminalHalf < scene.targetUnits * 2 ? 'avant l’Arrivée' : 'sur l’Arrivée'}</strong></p>
            {/if}
          </aside>
        </div>

        {#if reportMode}
          <section class="report-card" aria-labelledby="report-title">
            <div>
              <p class="kicker">Compte rendu après exécution</p>
              <h2 id="report-title" tabindex="-1">Justifie la trace avec son état, pas avec une réponse préparée.</h2>
              <p>Chaque preuve ci-dessous est dérivée des intervalles que tu as réparés ou construits.</p>
            </div>
            <div class="report-actions">
              <button class:reported={reportUnit} type="button" data-smoke-control="cite-unit" onclick={citeUnit} disabled={reportUnit}>
                <span aria-hidden="true">01</span><strong>Citer l’unité</strong><small>même pavé-étalon partout</small>
              </button>
              <button class:reported={reportContinuity} type="button" data-smoke-control="cite-continuity" onclick={citeContinuity} disabled={reportContinuity}>
                <span aria-hidden="true">02</span><strong>Citer la relation</strong><small>chaque début au bout précédent</small>
              </button>
              <button class:reported={reportMeasure} type="button" data-smoke-control="cite-measure" onclick={citeMeasure} disabled={reportMeasure}>
                <span aria-hidden="true">03</span><strong>Nommer la mesure</strong><small>{scene.targetUnits} longueurs de pavé</small>
              </button>
            </div>
            <label class="explanation-field">
              <span>Explique avec tes mots pourquoi la trace réparée ou construite mesure cette longueur.</span>
              <textarea
                rows="3"
                bind:value={reportExplanation}
                data-smoke-control="explain"
                data-smoke-input-value={`La ligne mesure ${scene.targetUnits} longueurs de pavé car chaque début rejoint le bout précédent avec la même unité.`}
                aria-describedby="debug-explanation-help"
                aria-invalid={reportExplanation.length > 0 && !reportExplanationValid}
                placeholder="Écris la mesure en longueurs de pavé et une raison liée à l’unité ou aux débuts et aux bouts…"
              ></textarea>
              <small id="debug-explanation-help">Le graybox vérifie seulement la présence de la mesure, de l’unité et d’une relation; le propriétaire doit encore juger la qualité du raisonnement.</small>
            </label>
            <blockquote>
              <span>{reportUnit ? 'Tous les intervalles gardent la même longueur que le pavé-étalon.' : 'Unité à justifier…'}</span>
              <span>{reportContinuity ? 'Chaque début rejoint le bout précédent, du Départ à l’Arrivée.' : 'Continuité à justifier…'}</span>
              <span>{reportMeasure ? `Les ${scene.targetUnits} intervalles comptés donnent ${scene.targetUnits} longueurs de pavé.` : 'Mesure à nommer…'}</span>
              <strong>{reportExplanationValid ? `Tes mots : « ${reportExplanation.trim()} »` : 'Ton explication reste à écrire…'}</strong>
            </blockquote>
            <div class="report-footer">
              <button type="button" onclick={reopenTrace}>Réouvrir la trace</button>
              <button class="declare-button" type="button" data-smoke-control="declare" onclick={declareReport} disabled={!reportUnit || !reportContinuity || !reportMeasure || !reportExplanationValid}>Transmettre mon compte rendu <span aria-hidden="true">→</span></button>
            </div>
          </section>
        {/if}

        <footer class="run-bar">
          <div
            class:error={messageKind === 'error'}
            class="message"
            role="status"
            tabindex="-1"
            data-smoke-feedback={messageKind === 'error' ? 'error' : undefined}
            data-smoke-feedback-detail={messageKind === 'error' ? 'true' : undefined}
          ><span aria-hidden="true">{messageKind === 'error' ? '!' : '↳'}</span><p>{message}</p></div>
          <button class="run-button" type="button" data-smoke-control="run" onclick={runTrace} disabled={reportMode}>Lancer toute la trace <span aria-hidden="true">▶</span></button>
        </footer>
      </section>
    </div>
  {:else if view === 'success'}
    <section class="success" aria-labelledby="success-title">
      <p class="kicker">Dossier {sceneIndex + 1} validé · état réparé</p>
      <div class="success-icon" aria-hidden="true"><span>✓</span><i></i><span>◎</span></div>
      <h1 id="success-title">La conséquence rejoint maintenant la règle.</h1>
      <p class="success-feedback" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true">{scene.success}</p>
      <blockquote class="reported-statement"><strong>Compte rendu de l’élève :</strong> « {reportExplanation.trim()} »<br /><span>État cité : même pavé-étalon · continuité des débuts et des bouts · {scene.targetUnits} longueurs de pavé.</span></blockquote>
      <div class="final-trace" aria-label="Résumé de la trace validée">
        {#each derivedTrace as step, index}
          <span><b>{index + 1}</b><strong>{endpointLabel(step.startHalf)} → {endpointLabel(step.endHalf)}</strong><em>{step.countEvents} comptage</em></span>
        {/each}
      </div>
      <p class="result-line">Résultat : <strong>{scene.targetUnits} longueurs de pavé</strong> · unité inchangée · origine et arrivée coordonnées.</p>
      <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>{sceneIndex === scenes.length - 1 ? 'Clore le graybox' : 'Ouvrir le dossier suivant'} <span aria-hidden="true">→</span></button>
    </section>
  {:else}
    <section class="complete" tabindex="-1" data-smoke-completion aria-labelledby="complete-title">
      <p class="kicker">EX-0005 · Replay prêt</p>
      <h1 id="complete-title">La réparation a survécu au plan vide.</h1>
      <p>Le graybox a testé une relation de départ, une unité changée et une construction indépendante sans réponse préparée. Cela établit seulement l’opérabilité du replay : le jugement du propriétaire reste à enregistrer.</p>
      <div class="gate-note"><strong>Gate actuel</strong><span>Aucun « mechanic approved for expansion » n’est enregistré pour EX-0005 + SEQ-M1 + MES-01.</span></div>
      <button type="button" onclick={restart}>Rejouer le graybox</button>
    </section>
  {/if}
</main>

<style>
  :global(body) { background: #e9ece8; }
  :global(button) { font: inherit; }
  :global(button:focus-visible) { outline: 3px solid #194f64; outline-offset: 3px; }
  .prototype-root { min-height: calc(100vh - 42px); color: #18282e; background: #e9ece8; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  .kicker { margin: 0 0 12px; color: #a64432; font-size: .7rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
  .primary { min-height: 50px; padding: 13px 18px; border: 0; border-radius: 10px; color: white; background: #194f64; font-weight: 900; cursor: pointer; }
  .primary:hover { background: #103b4c; }

  .intro { display: grid; width: min(900px, calc(100% - 34px)); min-height: calc(100vh - 42px); margin: auto; place-content: center; padding: 46px 0; }
  .trace-emblem { display: flex; width: min(430px, 100%); align-items: center; margin-bottom: 25px; }
  .trace-emblem span { display: grid; width: 48px; height: 48px; place-items: center; border: 2px solid #194f64; border-radius: 7px; color: #194f64; background: #f8faf8; font-weight: 900; }
  .trace-emblem span.fault { border-color: #a64432; color: #a64432; transform: translateY(8px); }
  .trace-emblem i { flex: 1; color: #7b898d; text-align: center; font-style: normal; }
  .intro h1 { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: clamp(3rem, 9vw, 6.5rem); font-weight: 800; letter-spacing: -.075em; line-height: .88; }
  .intro h1 em { color: #194f64; font-style: normal; }
  .lead { max-width: 760px; margin: 25px 0; color: #506168; font-size: clamp(1rem, 2vw, 1.22rem); line-height: 1.65; }
  .principles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 26px; }
  .principles article { padding: 15px; border: 1px solid #cbd3d1; border-radius: 10px; background: #f5f7f5; }
  .principles span { color: #a64432; font-family: ui-monospace, monospace; font-size: .7rem; font-weight: 900; }
  .principles h2 { margin: 8px 0 5px; font-size: 1rem; }
  .principles p { margin: 0; color: #68767a; font-size: .8rem; line-height: 1.45; }
  .intro .primary { width: fit-content; }
  .boundary { margin: 13px 0 0; color: #6d797d; font-size: .75rem; }

  .game-shell { min-height: calc(100vh - 42px); }
  .topbar { display: flex; min-height: 62px; align-items: center; justify-content: space-between; padding: 9px clamp(14px, 4vw, 48px); border-bottom: 1px solid #c7d0ce; background: rgba(246,248,246,.94); }
  .topbar > div { display: flex; align-items: center; gap: 10px; }
  .brand-mark { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 7px; color: #fff; background: #194f64; font-size: 1.2rem; }
  .progress { text-align: right; }
  .progress span, .progress strong { display: block; }
  .progress span { color: #a64432; font-size: .64rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .progress strong { font-size: .8rem; }
  .scene { width: min(1200px, calc(100% - 30px)); margin: auto; padding: 26px 0 44px; }
  .scene-copy { max-width: 980px; margin-bottom: 20px; }
  .scene-copy h1 { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: clamp(2rem, 5vw, 3.8rem); letter-spacing: -.055em; }
  .scene-copy > p:last-child { max-width: 900px; margin: 10px 0 0; color: #53646a; line-height: 1.55; }

  .debug-layout { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(270px, .72fr); gap: 14px; }
  .replay-panel, .inspector { min-width: 0; padding: clamp(16px, 2.5vw, 26px); border: 1px solid #c6cfcd; border-radius: 14px; background: #f7f9f7; box-shadow: 0 9px 28px rgba(32,51,57,.06); }
  .panel-heading { display: flex; align-items: start; justify-content: space-between; gap: 12px; }
  .panel-heading span { color: #a64432; font-family: ui-monospace, monospace; font-size: .64rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .panel-heading h2 { margin: 3px 0 0; font-size: 1.02rem; }
  .panel-heading > p { margin: 0; color: #69777b; font-size: .78rem; }

  .path-map { position: relative; height: 142px; margin: 30px 28px 18px; }
  .path-line { position: absolute; top: 76px; left: 0; width: 100%; height: 5px; background: #314b55; }
  .flag { position: absolute; top: 14px; z-index: 4; display: grid; justify-items: center; color: #526268; font-size: .66rem; font-weight: 850; }
  .flag.start { left: 0; transform: translateX(-50%); }
  .flag.finish { right: 0; transform: translateX(50%); }
  .flag i { width: 3px; height: 50px; background: #263b43; }
  .flag i::before { display: block; width: 19px; height: 13px; background: #a64432; content: ''; }
  .flag.finish i::before { background: #194f64; }
  .interval { position: absolute; top: 56px; z-index: 2; display: grid; height: 45px; place-items: center; border: 2px solid #2f6579; border-radius: 5px; color: #194254; background: #9bc4d2; font-size: .72rem; font-weight: 900; overflow: hidden; }
  .interval:nth-of-type(even) { background: #b6d3dc; }
  .interval.unit-changed { border-color: #a64432; background: #e7af9f; }
  .interval.selected { box-shadow: 0 0 0 4px rgba(166,68,50,.22); }
  .reference { position: absolute; right: 0; bottom: 3px; height: 24px; border-right: 2px solid #65777d; border-bottom: 2px solid #65777d; border-left: 2px solid #65777d; color: #647379; text-align: center; }
  .reference span { position: relative; top: 4px; padding: 0 5px; background: #f7f9f7; font-size: .62rem; font-weight: 800; }

  .replay-controls { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
  .replay-controls button, .add-button { display: grid; min-height: 62px; grid-template-columns: auto 1fr; align-items: center; column-gap: 9px; padding: 9px 12px; border: 1px solid #aebcba; border-radius: 9px; color: #234954; background: white; text-align: left; cursor: pointer; }
  .replay-controls button > span, .add-button > span { grid-row: 1 / 3; font-size: 1.2rem; }
  .replay-controls strong, .replay-controls small, .add-button strong, .add-button small { display: block; }
  .replay-controls small, .add-button small { color: #748186; font-size: .64rem; }
  .replay-controls button:disabled, .add-button:disabled { color: #9ba4a5; background: #edf0ed; cursor: not-allowed; }
  .add-button { width: 100%; border-color: #194f64; color: #fff; background: #194f64; }

  .trace-list { display: grid; gap: 7px; max-height: 270px; margin: 16px 0 0; padding: 0; overflow: auto; list-style: none; }
  .trace-list li { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 9px; border: 1px solid #d2d9d7; border-radius: 8px; background: #fff; }
  .trace-list li.current { border-color: #638b99; }
  .trace-list li.selected { border-color: #a64432; box-shadow: inset 4px 0 #a64432; }
  .step-number { display: grid; width: 27px; height: 27px; place-items: center; border-radius: 6px; color: #fff; background: #194f64; font-family: ui-monospace, monospace; font-size: .7rem; font-weight: 900; }
  .trace-list strong, .trace-list p { display: block; }
  .trace-list p { margin: 2px 0 0; overflow: hidden; color: #6b787c; font-size: .7rem; text-overflow: ellipsis; white-space: nowrap; }
  .trace-list dl { display: flex; gap: 5px; margin: 0; }
  .trace-list dl div { padding: 5px; border-radius: 5px; background: #edf1ef; text-align: center; }
  .trace-list dt { color: #7b8689; font-size: .55rem; text-transform: uppercase; }
  .trace-list dd { margin: 1px 0 0; font-size: .67rem; font-weight: 850; }

  .empty-inspector { display: grid; min-height: 200px; place-content: center; justify-items: center; padding: 20px; color: #6c797d; text-align: center; }
  .empty-inspector span { display: grid; width: 54px; height: 54px; place-items: center; border: 2px dashed #829195; border-radius: 50%; font-size: 1.5rem; }
  .empty-inspector p { max-width: 230px; font-size: .82rem; line-height: 1.5; }
  .selected-state { display: grid; gap: 7px; margin: 20px 0 12px; }
  .selected-state p { display: flex; min-height: 42px; align-items: center; justify-content: space-between; gap: 10px; margin: 0; padding: 7px 9px; border-radius: 7px; background: #e9eeec; }
  .selected-state span { color: #68767a; font-size: .7rem; }
  .selected-state strong { font-size: .76rem; text-align: right; }
  .edit-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .edit-controls button { min-height: 52px; padding: 8px; border: 1px solid #9daead; border-radius: 8px; color: #1d4b5a; background: #fff; cursor: pointer; }
  .edit-controls button:disabled { color: #9ea6a7; background: #ecefed; cursor: not-allowed; }
  .edit-controls strong { display: block; margin-top: 3px; font-size: .7rem; }
  .count-editor { margin-top: 12px; padding: 10px; border: 1px solid #cbd4d1; border-radius: 9px; background: #f0f3f1; }
  .count-editor > p { display: flex; align-items: center; justify-content: space-between; margin: 0 0 8px; font-size: .72rem; }
  .count-editor > p strong { font-size: 1.2rem; }
  .count-editor > div { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .count-editor button { min-height: 46px; padding: 6px; border: 1px solid #aebbb8; border-radius: 7px; background: white; font-size: .68rem; font-weight: 800; cursor: pointer; }
  .count-editor button:disabled { color: #9ca4a2; background: #e5e9e6; cursor: not-allowed; }
  .debug-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin: 15px 0 0; }
  .debug-stats div { padding: 7px 4px; border-radius: 6px; background: #e5ebe8; text-align: center; }
  .debug-stats dt { color: #6f7b7e; font-size: .56rem; }
  .debug-stats dd { margin: 2px 0 0; font-weight: 900; }
  .before-after { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 10px 0 0; padding: 8px; border-left: 3px solid #a64432; color: #657377; background: #f1e7e3; font-size: .66rem; }
  .before-after strong { color: #843726; }

  .report-card { display: grid; gap: 14px; margin-top: 13px; padding: clamp(16px, 3vw, 24px); border: 1px solid #91acb5; border-radius: 13px; background: #f7faf9; }
  .report-card h2 { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: clamp(1.35rem, 3vw, 2rem); letter-spacing: -.035em; }
  .report-card > div:first-child > p:last-child { margin: 6px 0 0; color: #667579; font-size: .81rem; }
  .report-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .report-actions button { display: grid; min-height: 72px; grid-template-columns: auto 1fr; align-items: center; column-gap: 9px; padding: 9px; border: 1px solid #aabbbf; border-radius: 8px; color: #194f64; background: #fff; text-align: left; cursor: pointer; }
  .report-actions button.reported { border-color: #194f64; background: #e1edf0; }
  .report-actions button:disabled { opacity: 1; cursor: default; }
  .report-actions button > span { grid-row: 1 / 3; color: #a64432; font-family: ui-monospace, monospace; font-size: .65rem; font-weight: 900; }
  .report-actions strong, .report-actions small { display: block; }
  .report-actions small { color: #69777b; font-size: .65rem; }
  .explanation-field { display: grid; gap: 6px; color: #314c56; font-size: .78rem; font-weight: 850; }
  .explanation-field textarea { box-sizing: border-box; width: 100%; min-height: 82px; resize: vertical; padding: 10px; border: 1px solid #9eb3b8; border-radius: 8px; color: #223a43; background: #fff; font: inherit; line-height: 1.45; }
  .explanation-field textarea[aria-invalid="true"] { border-color: #b95d4d; }
  .explanation-field small { color: #6c797d; font-size: .65rem; font-weight: 500; line-height: 1.4; }
  .report-card blockquote { display: grid; gap: 4px; margin: 0; padding: 12px; border-left: 4px solid #194f64; color: #40545b; background: #eaf1f2; font-size: .8rem; line-height: 1.45; }
  .report-footer { display: flex; justify-content: space-between; gap: 9px; }
  .report-footer button { min-height: 46px; padding: 9px 13px; border: 1px solid #9bafb3; border-radius: 8px; color: #36525c; background: #fff; font-weight: 850; cursor: pointer; }
  .report-footer .declare-button { border: 0; color: #fff; background: #194f64; }
  .report-footer .declare-button:disabled { color: #7d898c; background: #dce4e3; cursor: not-allowed; }

  .run-bar { display: grid; grid-template-columns: 1fr auto; gap: 11px; margin-top: 13px; }
  .message { display: flex; min-height: 58px; align-items: center; gap: 10px; padding: 10px 13px; border: 1px solid #c5cfcc; border-radius: 10px; background: #f7f9f7; }
  .message.error { border-color: #be6655; color: #732b20; background: #fff0ec; }
  .message > span { display: grid; width: 28px; height: 28px; flex: 0 0 auto; place-items: center; border-radius: 6px; color: #fff; background: #194f64; font-weight: 900; }
  .message.error > span { background: #a64432; }
  .message p { margin: 0; font-size: .83rem; line-height: 1.45; }
  .run-button { min-height: 58px; padding: 10px 17px; border: 0; border-radius: 10px; color: #fff; background: #1d4654; font-weight: 900; cursor: pointer; }
  .run-button:disabled { color: #8a9595; background: #d8e0de; cursor: not-allowed; }

  .success, .complete { display: grid; width: min(880px, calc(100% - 34px)); min-height: calc(100vh - 42px); margin: auto; place-content: center; padding: 44px 0; }
  .success-icon { display: flex; width: min(360px, 100%); align-items: center; }
  .success-icon span { display: grid; width: 54px; height: 54px; place-items: center; border: 2px solid #194f64; border-radius: 8px; color: #194f64; font-weight: 900; }
  .success-icon i { flex: 1; height: 3px; background: #194f64; }
  .success h1, .complete h1 { max-width: 820px; margin: 20px 0 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: clamp(2.2rem, 7vw, 4.8rem); letter-spacing: -.065em; line-height: .94; }
  .success-feedback { max-width: 760px; margin: 0; color: #4f6066; font-size: 1.04rem; line-height: 1.65; }
  .reported-statement { max-width: 760px; margin: 18px 0 0; padding: 12px 15px; border-left: 4px solid #194f64; color: #40545b; background: #f7f9f7; font-size: .84rem; line-height: 1.5; }
  .reported-statement strong, .reported-statement span { display: inline-block; }
  .reported-statement span { margin-top: 5px; color: #6b787c; font-size: .72rem; }
  .final-trace { display: flex; gap: 6px; margin: 18px 0 10px; overflow: auto; }
  .final-trace span { display: grid; min-width: 130px; padding: 9px; border: 1px solid #c5cfcd; border-radius: 8px; background: #f7f9f7; }
  .final-trace b { display: grid; width: 24px; height: 24px; place-items: center; border-radius: 5px; color: white; background: #194f64; font-size: .67rem; }
  .final-trace strong { margin-top: 7px; font-size: .7rem; }
  .final-trace em { color: #6c797d; font-size: .62rem; font-style: normal; }
  .result-line { margin: 0 0 22px; color: #627075; font-size: .78rem; }
  .result-line strong { color: #194f64; }
  .success .primary { width: fit-content; }
  .complete > p:not(.kicker) { max-width: 720px; color: #506168; line-height: 1.6; }
  .gate-note { display: grid; max-width: 720px; gap: 4px; margin: 20px 0; padding: 14px; border-left: 4px solid #a64432; background: #f7f9f7; }
  .gate-note span { color: #5e6d72; font-size: .82rem; }
  .complete button { width: fit-content; min-height: 46px; padding: 10px 15px; border: 1px solid #194f64; border-radius: 9px; color: #194f64; background: transparent; font-weight: 850; cursor: pointer; }

  @media (max-width: 820px) {
    .debug-layout { grid-template-columns: 1fr; }
    .principles { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .topbar > div:first-child strong { display: none; }
    .scene { width: min(100% - 20px, 1200px); padding-top: 19px; }
    .scene-copy h1 { font-size: 2rem; }
    .replay-panel, .inspector { border-radius: 11px; }
    .path-map { height: 132px; margin-right: 20px; margin-left: 20px; }
    .replay-controls, .edit-controls, .count-editor > div, .run-bar, .report-actions { grid-template-columns: 1fr; }
    .report-footer { flex-direction: column; }
    .report-footer button { width: 100%; }
    .trace-list li { grid-template-columns: auto minmax(0, 1fr); }
    .trace-list dl { grid-column: 2; }
    .run-button { width: 100%; }
    .intro h1 { font-size: clamp(2.6rem, 16vw, 4.2rem); }
    .final-trace { width: 100%; }
  }
</style>
