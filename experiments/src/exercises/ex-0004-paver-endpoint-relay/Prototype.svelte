<script lang="ts">
  import { tick } from 'svelte';

  type View = 'intro' | 'active' | 'success' | 'complete';
  type MessageKind = 'instruction' | 'action' | 'error';

  type Scene = {
    id: string;
    chapter: string;
    title: string;
    prompt: string;
    targetUnits: number;
    lineOnly: boolean;
    support: string;
    success: string;
  };

  type Interval = {
    id: number;
    startHalf: number;
    endHalf: number;
  };

  type CountEvent = {
    intervalId: number | null;
  };

  type ReplayRow = {
    intervalId: number;
    startHalf: number;
    endHalf: number;
    expectedStartHalf: number;
    valid: boolean;
  };

  const scenes: Scene[] = [
    {
      id: 'orientation',
      chapter: 'Orientation',
      title: 'Premier relevé : trois pavés',
      prompt: 'Pars du drapeau Départ. Pose le même pavé jusqu’à l’Arrivée. Après chaque pose, compte ce pavé une seule fois.',
      targetUnits: 3,
      lineOnly: false,
      support: 'Le premier début doit coïncider avec le drapeau. Ensuite, compare toujours le début du pavé avec le dernier bout marqué.',
      success: 'Les 3 intervalles se touchent bout à bout et les 3 comptages leur correspondent. Le chemin mesure 3 longueurs de pavé.'
    },
    {
      id: 'coordination',
      chapter: 'Complication',
      title: 'Deux registres à accorder',
      prompt: 'Construis la trace sans modèle. Avant de transmettre le relevé, vérifie séparément les repères et les comptages.',
      targetUnits: 4,
      lineOnly: false,
      support: 'Une pose et un comptage sont deux gestes différents. L’audit compare les deux registres sans les corriger.',
      success: 'Les 4 poses forment une chaîne continue et chaque pose possède exactement un comptage. Le relevé est reproductible.'
    },
    {
      id: 'transfer',
      chapter: 'Indépendance',
      title: 'La ligne déplacée',
      prompt: 'Cette fois, seule la longueur compte. Mesure la ligne du Départ à l’Arrivée avec le même pavé de 50 cm, puis transmets un relevé que l’autre équipe peut reproduire.',
      targetUnits: 6,
      lineOnly: true,
      support: 'Aucun gabarit de surface n’est disponible : construis et contrôle toi-même la chaîne d’intervalles.',
      success: 'La trace indépendante contient 6 intervalles continus du même pavé et 6 comptages liés. Le rapport nomme 6 longueurs de pavé; les mots de l’élève sont conservés séparément.'
    }
  ];

  let view: View = 'intro';
  let sceneIndex = 0;
  let intervals: Interval[] = [];
  let countEvents: CountEvent[] = [];
  let selectedCountInterval: number | null = null;
  let nextIntervalId = 1;
  let previewStartHalf = 0;
  let message = '';
  let messageKind: MessageKind = 'instruction';
  let announcement = '';
  let audits = 0;
  let placementUndos = 0;
  let countUndos = 0;
  let reportMode = false;
  let reportMeasure = false;
  let reportContinuity = false;
  let reportReplay = false;
  let reportExplanation = '';
  let replayRows: ReplayRow[] = [];
  let rootElement: HTMLElement;

  $: scene = scenes[sceneIndex];
  $: previewEndHalf = previewStartHalf + 2;
  $: expectedStartHalf = intervals.length === 0 ? 0 : intervals.at(-1)!.endHalf;
  $: intervalCounts = intervals.map((interval) => countEvents.filter((event) => event.intervalId === interval.id).length);
  $: orphanCountEvents = countEvents.filter((event) => event.intervalId === null || !intervals.some((interval) => interval.id === event.intervalId));
  $: reportExplanationValid = explanationMeetsContract(reportExplanation);
  $: smokeState = view === 'intro' ? 'ready' : view === 'active' ? 'active' : view === 'success' ? 'success' : 'complete';
  $: smokeSuccessPlan = view === 'active' ? successPlan(scene.targetUnits) : undefined;
  $: smokeErrorPlan = view === 'active' && sceneIndex === 0 ? 'move-right,place,audit' : undefined;
  $: smokeRecoveryPlan = view === 'active' && sceneIndex === 0 ? 'undo-place,move-left' : undefined;

  function successPlan(units: number): string {
    const actions: string[] = ['place', 'move-right', 'move-right', 'place', 'count', 'count'];
    actions.push('select-count-1', 'count', 'select-count-2', 'undo-count');
    for (let index = 2; index < units; index += 1) {
      actions.push('move-right', 'move-right', 'place', 'count');
    }
    actions.push('audit', 'cite-measure', 'cite-continuity', 'replay', 'explain', 'declare');
    return actions.join(',');
  }

  async function focus(selector: string): Promise<void> {
    await tick();
    rootElement.querySelector<HTMLElement>(selector)?.focus();
  }

  function loadScene(index: number): void {
    sceneIndex = index;
    intervals = [];
    countEvents = [];
    selectedCountInterval = null;
    nextIntervalId = 1;
    previewStartHalf = 0;
    audits = 0;
    placementUndos = 0;
    countUndos = 0;
    reportMode = false;
    reportMeasure = false;
    reportContinuity = false;
    reportReplay = false;
    reportExplanation = '';
    replayRows = [];
    message = scenes[index].support;
    messageKind = 'instruction';
    view = 'active';
  }

  async function start(): Promise<void> {
    loadScene(0);
    announcement = 'Premier relevé chargé. Le pavé est placé sur le départ, sans être encore enregistré.';
    await focus('#scene-title');
  }

  function relationText(startHalf = previewStartHalf): string {
    const expected = intervals.length === 0 ? 0 : intervals.at(-1)!.endHalf;
    const anchor = intervals.length === 0 ? 'le drapeau Départ' : `le bout de la pose ${intervals.length}`;
    if (startHalf === expected) return `Le début du pavé coïncide avec ${anchor}.`;
    if (startHalf < expected) return `Le début du pavé est avant ${anchor} : les intervalles se chevaucheraient.`;
    return `Le début du pavé est après ${anchor} : un trou resterait entre les intervalles.`;
  }

  function movePreview(delta: -1 | 1): void {
    const maximum = scene.targetUnits * 2 - 2;
    const next = Math.max(0, Math.min(maximum, previewStartHalf + delta));
    if (next === previewStartHalf) {
      message = delta < 0
        ? 'Le pavé ne peut pas commencer avant le drapeau Départ.'
        : 'Le pavé ne peut pas dépasser la zone de relevé.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    previewStartHalf = next;
    message = relationText(next);
    messageKind = 'action';
    announcement = message;
  }

  function place(): void {
    intervals = [...intervals, { id: nextIntervalId, startHalf: previewStartHalf, endHalf: previewEndHalf }];
    nextIntervalId += 1;
    selectedCountInterval = intervals.length - 1;
    message = `Pose ${intervals.length} enregistrée de ${positionLabel(previewStartHalf)} à ${positionLabel(previewEndHalf)}. Cette pose est sélectionnée dans le registre B, mais son comptage n’a pas bougé.`;
    messageKind = 'action';
    announcement = message;
  }

  function selectCountInterval(index: number): void {
    selectedCountInterval = index;
    message = `Pose ${index + 1} sélectionnée dans le registre B. Tu peux ajouter ou retirer son comptage sans modifier la géométrie.`;
    messageKind = 'action';
    announcement = message;
  }

  function countCurrent(): void {
    const intervalIndex = selectedCountInterval ?? -1;
    const intervalId = intervalIndex < 0 ? null : intervals[intervalIndex]?.id ?? null;
    countEvents = [...countEvents, { intervalId }];
    message = intervalId === null
      ? 'Un comptage a été enregistré sans pose. L’audit pourra repérer ce désaccord.'
      : `Un comptage a été lié à la pose ${intervalIndex + 1}. Elle en possède maintenant ${countFor(intervalIndex)}; la géométrie n’a pas bougé.`;
    messageKind = 'action';
    announcement = message;
  }

  function undoPlacement(): void {
    const removed = intervals.at(-1);
    if (!removed) {
      message = 'Aucune pose à annuler. Le registre géométrique est déjà vide.';
      messageKind = 'error';
      announcement = message;
      return;
    }
    intervals = intervals.slice(0, -1);
    selectedCountInterval = intervals.length > 0 ? intervals.length - 1 : null;
    previewStartHalf = removed.startHalf;
    placementUndos += 1;
    message = 'Dernière pose annulée. Les comptages restent inchangés : corrige-les séparément si nécessaire.';
    messageKind = 'action';
    announcement = message;
  }

  function findLastCountIndex(predicate: (event: CountEvent) => boolean): number {
    for (let index = countEvents.length - 1; index >= 0; index -= 1) {
      if (predicate(countEvents[index])) return index;
    }
    return -1;
  }

  function undoCount(): void {
    const selected = selectedCountInterval === null ? undefined : intervals[selectedCountInterval];
    const removalIndex = selected
      ? findLastCountIndex((event) => event.intervalId === selected.id)
      : -1;
    if (removalIndex < 0) {
      message = selectedCountInterval === null
        ? 'Aucun comptage ciblé à annuler. Sélectionne une pose dans le registre B.'
        : `La pose ${selectedCountInterval + 1} n’a aucun comptage à retirer.`;
      messageKind = 'error';
      announcement = message;
      return;
    }
    countEvents = countEvents.filter((_, index) => index !== removalIndex);
    countUndos += 1;
    message = `Un comptage de la pose ${selectedCountInterval! + 1} a été annulé. Les poses restent exactement à leur place.`;
    messageKind = 'action';
    announcement = message;
  }

  function undoOrphanCount(): void {
    const currentIds = new Set(intervals.map((interval) => interval.id));
    const removalIndex = findLastCountIndex((event) => event.intervalId === null || !currentIds.has(event.intervalId));
    if (removalIndex < 0) return;
    countEvents = countEvents.filter((_, index) => index !== removalIndex);
    countUndos += 1;
    message = 'Le comptage sans pose correspondante a été annulé. La géométrie n’a pas bougé.';
    messageKind = 'action';
    announcement = message;
  }

  function countFor(intervalIndex: number): number {
    const interval = intervals[intervalIndex];
    if (!interval) return 0;
    return countEvents.filter((event) => event.intervalId === interval.id).length;
  }

  function firstProblem(): string | null {
    if (intervals.length === 0) return 'Aucune pose n’est encore enregistrée.';
    if (intervals[0].startHalf !== 0) {
      return 'La première pose ne part pas du drapeau Départ. Annule cette pose et ramène le début du pavé sur l’origine.';
    }
    for (let index = 1; index < intervals.length; index += 1) {
      const previousEnd = intervals[index - 1].endHalf;
      const currentStart = intervals[index].startHalf;
      if (currentStart > previousEnd) {
        return `Un trou apparaît avant la pose ${index + 1}. Son début doit rejoindre exactement le bout de la pose ${index}.`;
      }
      if (currentStart < previousEnd) {
        return `La pose ${index + 1} chevauche la pose ${index}. Recule dans l’historique et aligne leurs deux repères.`;
      }
    }
    if (intervals.length < scene.targetUnits) {
      return `La trace contient ${intervals.length} pose${intervals.length > 1 ? 's' : ''}, mais elle n’atteint pas encore l’Arrivée.`;
    }
    if (intervals.length > scene.targetUnits) {
      return `La trace contient trop de poses pour cette longueur. Vérifie les intervalles superposés.`;
    }
    if (intervals.at(-1)!.endHalf !== scene.targetUnits * 2) {
      return 'Le dernier bout ne coïncide pas avec l’Arrivée. Inspecte la chaîne avant de modifier le nombre.';
    }
    if (orphanCountEvents.length > 0) {
      return `${orphanCountEvents.length} comptage${orphanCountEvents.length > 1 ? 's sont enregistrés' : ' est enregistré'} sans pose correspondante. Retire ce comptage orphelin sans déplacer les poses.`;
    }
    for (let index = 0; index < intervals.length; index += 1) {
      const count = countFor(index);
      if (count === 0) return `La pose ${index + 1} n’a pas été comptée. Ajoute exactement un comptage pour cet intervalle.`;
      if (count > 1) return `La pose ${index + 1} a été comptée ${count} fois. Annule le comptage en trop sans déplacer le pavé.`;
    }
    return null;
  }

  async function audit(): Promise<void> {
    audits += 1;
    const problem = firstProblem();
    if (problem) {
      message = problem;
      messageKind = 'error';
      announcement = problem;
      await focus('[data-smoke-feedback="error"]');
      return;
    }
    reportMode = true;
    reportMeasure = false;
    reportContinuity = false;
    reportReplay = false;
    reportExplanation = '';
    replayRows = [];
    message = 'Les deux registres sont valides. Appuie maintenant ton rapport sur le total nommé, la continuité et le replay de tes propres repères.';
    messageKind = 'action';
    announcement = message;
    await focus('#report-title');
  }

  function citeMeasure(): void {
    reportMeasure = true;
    message = `Rapport : ${countEvents.length} comptages reliés deviennent ${scene.targetUnits} longueurs de pavé, et non un nombre sans unité.`;
    messageKind = 'action';
    announcement = message;
  }

  function citeContinuity(): void {
    reportContinuity = true;
    message = 'Rapport : chaque début rejoint le bout précédent; la trace ne laisse ni trou ni chevauchement.';
    messageKind = 'action';
    announcement = message;
  }

  function replayLedger(): void {
    let expectedStart = 0;
    const rows = intervals.map((interval) => {
      const row: ReplayRow = {
        intervalId: interval.id,
        startHalf: interval.startHalf,
        endHalf: interval.endHalf,
        expectedStartHalf: expectedStart,
        valid: interval.startHalf === expectedStart && interval.endHalf - interval.startHalf === 2
      };
      expectedStart = interval.endHalf;
      return row;
    });
    replayRows = rows;
    reportReplay = rows.length === scene.targetUnits
      && rows.every((row) => row.valid)
      && expectedStart === scene.targetUnits * 2;
    message = reportReplay
      ? `L’autre équipe a exécuté ${rows.length} poses depuis les repères enregistrés; son dernier bout rejoint l’Arrivée.`
      : 'Le rejeu des repères ne rejoint pas l’Arrivée. Réouvre les registres et répare la trace avant de transmettre.';
    messageKind = reportReplay ? 'action' : 'error';
    announcement = message;
  }

  function explanationMeetsContract(value: string): boolean {
    const normalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return value.trim().length >= 30
      && normalized.includes(String(scene.targetUnits))
      && normalized.includes('pave')
      && /(debut|bout|trou|chevauch|depart|repere)/.test(normalized);
  }

  async function declareReport(): Promise<void> {
    if (!reportMeasure || !reportContinuity || !reportReplay || !reportExplanationValid) {
      message = 'Le rapport doit encore relier la mesure, la continuité, le replay et ton explication écrite avant transmission.';
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

  function reopenLedgers(): void {
    reportMode = false;
    reportMeasure = false;
    reportContinuity = false;
    reportReplay = false;
    reportExplanation = '';
    replayRows = [];
    message = 'Registres rouverts. Toute modification exige un nouvel audit avant transmission.';
    messageKind = 'action';
    announcement = message;
  }

  async function continueStory(): Promise<void> {
    if (sceneIndex === scenes.length - 1) {
      view = 'complete';
      announcement = 'Les deux registres sont prêts pour le replay du propriétaire.';
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
    intervals = [];
    countEvents = [];
    selectedCountInterval = null;
    nextIntervalId = 1;
    reportMode = false;
    replayRows = [];
    announcement = 'Retour à la présentation du relais.';
    await focus('#intro-title');
  }

  function positionPercent(half: number): number {
    return (half / (scene.targetUnits * 2)) * 100;
  }

  function positionLabel(half: number): string {
    if (half === 0) return 'Départ';
    if (half === scene.targetUnits * 2) return 'Arrivée';
    if (half % 2 === 0) return `repère ${half / 2}`;
    return `cran intermédiaire après le repère ${Math.floor(half / 2)}`;
  }
</script>

<svelte:head>
  <title>Le relais du pavé-étalon · EX-0004</title>
  <meta name="description" content="Graybox MES-01 pour construire une mesure par unité répétée et comptage indépendant." />
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
      <div class="intro-mark" aria-hidden="true"><span></span><i></i><span></span></div>
      <p class="kicker">EX-0004 · MES-01 · Graybox autorisé</p>
      <h1 id="intro-title" tabindex="-1">Le relais du<br /><em>pavé-étalon</em></h1>
      <p class="lead">Un seul pavé de 50 cm, deux registres à tenir : ses repères sur la longueur et ton comptage. L’autre équipe doit pouvoir refaire exactement ton relevé.</p>
      <ul class="intro-rules">
        <li><strong>Déplacer</strong><span>Le système ne colle jamais le pavé au bon repère.</span></li>
        <li><strong>Poser</strong><span>Une pose laisse un intervalle, sans compter à ta place.</span></li>
        <li><strong>Auditer</strong><span>Les trous, chevauchements et comptages restent réparables.</span></li>
      </ul>
      <button class="primary" type="button" data-smoke-action="start" onclick={start}>Commencer le relevé <span aria-hidden="true">→</span></button>
      <p class="boundary">3 scènes · longueur seulement · sans règle graduée</p>
    </section>
  {:else if view === 'active'}
    <div class="game-shell">
      <header class="topbar">
        <div><span class="mini-mark" aria-hidden="true">↦</span><strong>Relais du pavé-étalon</strong></div>
        <div class="progress" aria-label={`Scène ${sceneIndex + 1} sur ${scenes.length}`}>
          <span>{scene.chapter}</span><strong>{sceneIndex + 1} / {scenes.length}</strong>
        </div>
      </header>

      <section class="scene" aria-labelledby="scene-title">
        <header class="scene-copy">
          <p class="kicker">Scène {String(sceneIndex + 1).padStart(2, '0')} · {scene.chapter}</p>
          <h1 id="scene-title" tabindex="-1">{scene.title}</h1>
          <p>{scene.prompt}</p>
        </header>

        <div class="workbench">
          <section class="survey-card" aria-label="Trace géométrique du relevé">
            <div class="card-heading">
              <div><span>Registre A</span><h2>Repères sur la longueur</h2></div>
              <p><strong>{intervals.length}</strong> pose{intervals.length > 1 ? 's' : ''}</p>
            </div>

            <div class:line-only={scene.lineOnly} class="path-map">
              <div class="flag start"><i aria-hidden="true"></i><span>Départ</span></div>
              <div class="flag finish"><i aria-hidden="true"></i><span>Arrivée</span></div>
              <div class="path-line" aria-hidden="true"></div>
              {#each intervals as interval, index (interval.id)}
                <div
                  class="interval committed"
                  style={`left:${positionPercent(interval.startHalf)}%;width:${positionPercent(interval.endHalf - interval.startHalf)}%`}
                  aria-hidden="true"
                ><span>{index + 1}</span></div>
              {/each}
              <div
                class:aligned={previewStartHalf === expectedStartHalf}
                class="interval preview"
                style={`left:${positionPercent(previewStartHalf)}%;width:${positionPercent(2)}%`}
                aria-hidden="true"
              ><span>étalon</span></div>
            </div>

            <p class="relation-readout"><span aria-hidden="true">◎</span>{relationText()}</p>

            <div class="move-controls" aria-label="Déplacer le début du pavé par crans relationnels">
              <button type="button" data-smoke-control="move-left" onclick={() => movePreview(-1)} disabled={reportMode || previewStartHalf === 0}>
                <span aria-hidden="true">←</span><strong>Décaler à gauche</strong>
              </button>
              <div><small>Début du pavé</small><strong>{positionLabel(previewStartHalf)}</strong></div>
              <button type="button" data-smoke-control="move-right" onclick={() => movePreview(1)} disabled={reportMode || previewEndHalf >= scene.targetUnits * 2}>
                <strong>Décaler à droite</strong><span aria-hidden="true">→</span>
              </button>
            </div>

            <div class="primary-actions">
              <button class="place-button" type="button" data-smoke-control="place" onclick={place} disabled={reportMode}>
                <span aria-hidden="true">▰</span><strong>Poser ici</strong><small>Le comptage ne bouge pas</small>
              </button>
              <button class="count-button" type="button" data-smoke-control="count" onclick={countCurrent} disabled={reportMode}>
                <span aria-hidden="true">●</span><strong>Compter la pose sélectionnée</strong><small>La géométrie ne bouge pas</small>
              </button>
            </div>
          </section>

          <aside class="ledger-card" aria-label="Registre indépendant des comptages">
            <div class="card-heading">
              <div><span>Registre B</span><h2>Comptages liés</h2></div>
              <p><strong>{countEvents.length}</strong> geste{countEvents.length > 1 ? 's' : ''}</p>
            </div>

            {#if intervals.length === 0 && countEvents.length === 0}
              <p class="empty-ledger">Aucune pose et aucun comptage. Les deux registres démarrent séparément.</p>
            {:else}
              <ol class="interval-list">
                {#each intervals as interval, index (interval.id)}
                  <li class:count-ok={intervalCounts[index] === 1} class:count-error={intervalCounts[index] !== 1} class:selected-count={selectedCountInterval === index}>
                    <button class="ledger-select" type="button" aria-pressed={selectedCountInterval === index} data-smoke-control={selectedCountInterval === index ? undefined : `select-count-${index + 1}`} onclick={() => selectCountInterval(index)} disabled={reportMode}>
                      <span><strong>Pose {index + 1}</strong><small>{positionLabel(interval.startHalf)} → {positionLabel(interval.endHalf)}</small></span>
                      <span class="count-state" aria-label={`${intervalCounts[index]} comptage pour la pose ${index + 1}`}>
                        {#if intervalCounts[index] === 0}<em>pas comptée</em>{:else}{#each Array(intervalCounts[index]) as _}<i aria-hidden="true">●</i>{/each}<small>{intervalCounts[index]} fois</small>{/if}
                      </span>
                    </button>
                  </li>
                {/each}
              </ol>
              {#if orphanCountEvents.length > 0}
                <div class="orphan-warning">
                  <p><strong>{orphanCountEvents.length} comptage{orphanCountEvents.length > 1 ? 's' : ''} sans pose</strong><span>Une ancienne pose annulée ne peut pas transmettre son comptage à une nouvelle pose.</span></p>
                  <button type="button" data-smoke-control="undo-orphan-count" onclick={undoOrphanCount} disabled={reportMode}>Retirer un comptage orphelin</button>
                </div>
              {/if}
            {/if}

            <div class="undo-row">
              <button type="button" data-smoke-control="undo-place" onclick={undoPlacement} disabled={reportMode || intervals.length === 0}>Annuler une pose</button>
              <button type="button" data-smoke-control="undo-count" onclick={undoCount} disabled={reportMode || selectedCountInterval === null || intervalCounts[selectedCountInterval] === 0}>Retirer un comptage ciblé</button>
            </div>
            <dl class="trace-stats">
              <div><dt>Audits</dt><dd>{audits}</dd></div>
              <div><dt>Poses réparées</dt><dd>{placementUndos}</dd></div>
              <div><dt>Comptages réparés</dt><dd>{countUndos}</dd></div>
            </dl>
          </aside>
        </div>

        {#if reportMode}
          <section class="report-card" aria-labelledby="report-title">
            <div>
              <p class="kicker">Transmission après audit</p>
              <h2 id="report-title" tabindex="-1">Appuie ton rapport sur trois preuves de ta trace.</h2>
              <p>Ces actions composent un relevé lié à tes propres intervalles; elles ne remplacent ni les poses ni les comptages.</p>
            </div>
            <div class="report-actions">
              <button class:reported={reportMeasure} type="button" data-smoke-control="cite-measure" onclick={citeMeasure} disabled={reportMeasure}>
                <span aria-hidden="true">01</span><strong>Nommer la mesure</strong><small>{scene.targetUnits} longueurs de pavé</small>
              </button>
              <button class:reported={reportContinuity} type="button" data-smoke-control="cite-continuity" onclick={citeContinuity} disabled={reportContinuity}>
                <span aria-hidden="true">02</span><strong>Citer la relation</strong><small>début au bout précédent</small>
              </button>
              <button class:reported={reportReplay} type="button" data-smoke-control="replay" onclick={replayLedger} disabled={reportReplay}>
                <span aria-hidden="true">03</span><strong>Faire rejouer</strong><small>mêmes repères, même Arrivée</small>
              </button>
            </div>
            {#if replayRows.length > 0}
              <ol class="replay-proof" aria-label="Exécution des repères par l’autre équipe">
                {#each replayRows as row, index (row.intervalId)}
                  <li class:invalid={!row.valid}>
                    <strong>Rejeu {index + 1}</strong>
                    <span>{positionLabel(row.startHalf)} → {positionLabel(row.endHalf)}</span>
                    <small>{row.valid ? `début attendu : ${positionLabel(row.expectedStartHalf)} · même pavé` : `attendu : ${positionLabel(row.expectedStartHalf)} · relation rompue`}</small>
                  </li>
                {/each}
              </ol>
            {/if}
            <label class="explanation-field">
              <span>Explique avec tes mots pourquoi une autre équipe obtient la même mesure.</span>
              <textarea
                rows="3"
                bind:value={reportExplanation}
                data-smoke-control="explain"
                data-smoke-input-value={`Le chemin mesure ${scene.targetUnits} longueurs de pavé car chaque début rejoint le bout précédent.`}
                aria-describedby="explanation-help"
                aria-invalid={reportExplanation.length > 0 && !reportExplanationValid}
                placeholder={`Écris la mesure en longueurs de pavé et une raison liée aux débuts et aux bouts…`}
              ></textarea>
              <small id="explanation-help">Le rapport doit nommer {scene.targetUnits} longueurs de pavé et citer une relation de la trace. Le graybox conserve tes mots; il ne juge pas leur qualité pédagogique.</small>
            </label>
            <blockquote>
              <span>{reportMeasure ? `Le chemin mesure ${scene.targetUnits} longueurs de pavé.` : 'Mesure à nommer…'}</span>
              <span>{reportContinuity ? 'Chaque début rejoint le bout précédent, sans trou ni chevauchement.' : 'Relation à justifier…'}</span>
              <span>{reportReplay ? 'Une autre équipe peut suivre ces repères et rejoindre la même Arrivée.' : 'Reproductibilité à vérifier…'}</span>
              <strong>{reportExplanationValid ? `Tes mots : « ${reportExplanation.trim()} »` : 'Ton explication reste à écrire…'}</strong>
            </blockquote>
            <div class="report-footer">
              <button type="button" onclick={reopenLedgers}>Réouvrir les registres</button>
              <button class="declare-button" type="button" data-smoke-control="declare" onclick={declareReport} disabled={!reportMeasure || !reportContinuity || !reportReplay || !reportExplanationValid}>Transmettre mon rapport <span aria-hidden="true">→</span></button>
            </div>
          </section>
        {/if}

        <footer class="audit-bar">
          <div
            class:error={messageKind === 'error'}
            class="message"
            role="status"
            tabindex="-1"
            data-smoke-feedback={messageKind === 'error' ? 'error' : undefined}
            data-smoke-feedback-detail={messageKind === 'error' ? 'true' : undefined}
          ><span aria-hidden="true">{messageKind === 'error' ? '!' : '↳'}</span><p>{message}</p></div>
          <button class="audit-button" type="button" data-smoke-control="audit" onclick={audit} disabled={reportMode}>Auditer les deux registres <span aria-hidden="true">✓</span></button>
        </footer>
      </section>
    </div>
  {:else if view === 'success'}
    <section class="success" aria-labelledby="success-title">
      <p class="kicker">Scène {sceneIndex + 1} validée · trace conservée</p>
      <div class="success-seal" aria-hidden="true">{scene.targetUnits}<small>unités</small></div>
      <h1 id="success-title">Les deux registres racontent la même mesure.</h1>
      <p class="success-feedback" tabindex="-1" data-smoke-feedback="success" data-smoke-feedback-detail="true">{scene.success}</p>
      <blockquote class="reported-statement"><strong>Rapport de l’élève :</strong> « {reportExplanation.trim()} »<br /><span>Éléments cités dans la trace : {scene.targetUnits} longueurs de pavé · continuité des débuts et des bouts · replay jusqu’à la même Arrivée.</span></blockquote>
      <div class="replay-strip" aria-label="Résumé du replay exécuté par l’autre équipe">
        {#each replayRows as row, index (row.intervalId)}<span><i aria-hidden="true">{index + 1}</i><b>{positionLabel(row.startHalf)} → {positionLabel(row.endHalf)}</b><em>même pavé · 1 comptage</em></span>{/each}
      </div>
      <p class="replay-note">Rejeu exécuté depuis le registre : {replayRows.length} poses bout à bout, dernier bout sur l’Arrivée.</p>
      <button class="primary" type="button" data-smoke-action="continue" onclick={continueStory}>{sceneIndex === scenes.length - 1 ? 'Clore le graybox' : 'Passer à la scène suivante'} <span aria-hidden="true">→</span></button>
    </section>
  {:else}
    <section class="complete" tabindex="-1" data-smoke-completion aria-labelledby="complete-title">
      <p class="kicker">EX-0004 · Replay prêt</p>
      <h1 id="complete-title">Le relais a tenu sur trois scènes.</h1>
      <p>Le graybox a conservé l’origine, les intervalles, le comptage indépendant et le transfert sur une ligne. Cela prouve seulement son opérabilité technique : le jugement du propriétaire reste à enregistrer.</p>
      <div class="gate-note"><strong>Gate actuel</strong><span>Aucun « mechanic approved for expansion » n’est enregistré pour EX-0004 + SEQ-M1 + MES-01.</span></div>
      <button type="button" onclick={restart}>Rejouer le graybox</button>
    </section>
  {/if}
</main>

<style>
  :global(body) { background: #f1eee4; }
  :global(button) { font: inherit; }
  :global(button:focus-visible) { outline: 3px solid #245f54; outline-offset: 3px; }
  .prototype-root { min-height: calc(100vh - 42px); color: #1c2b27; background: #f1eee4; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  .kicker { margin: 0 0 12px; color: #9a4b2f; font-size: .72rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  .primary { min-height: 50px; padding: 13px 18px; border: 0; border-radius: 12px; color: #fff; background: #245f54; font-weight: 850; cursor: pointer; }
  .primary:hover { background: #194a42; }

  .intro { display: grid; width: min(860px, calc(100% - 36px)); min-height: calc(100vh - 42px); margin: auto; place-content: center; padding: 48px 0; }
  .intro-mark { display: flex; align-items: center; width: min(420px, 100%); margin-bottom: 28px; }
  .intro-mark span { width: 14px; height: 24px; border: 3px solid #245f54; border-radius: 3px; }
  .intro-mark i { flex: 1; height: 4px; background: repeating-linear-gradient(90deg, #cf8c43 0 36px, #f2c889 36px 72px); box-shadow: inset 0 0 0 1px #9a5d26; }
  .intro h1 { max-width: 760px; margin: 0; font-family: Georgia, serif; font-size: clamp(3rem, 9vw, 6.8rem); font-weight: 500; letter-spacing: -.065em; line-height: .88; }
  .intro h1 em { color: #245f54; font-weight: 500; }
  .lead { max-width: 690px; margin: 28px 0; color: #52615c; font-size: clamp(1.05rem, 2vw, 1.28rem); line-height: 1.65; }
  .intro-rules { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 0 0 28px; padding: 0; list-style: none; }
  .intro-rules li { padding: 16px; border: 1px solid #d8d1c3; border-radius: 12px; background: #faf8f2; }
  .intro-rules strong, .intro-rules span { display: block; }
  .intro-rules strong { margin-bottom: 6px; color: #245f54; }
  .intro-rules span { color: #65716d; font-size: .84rem; line-height: 1.4; }
  .intro .primary { width: fit-content; }
  .boundary { margin: 14px 0 0; color: #707a76; font-size: .76rem; }

  .game-shell { min-height: calc(100vh - 42px); }
  .topbar { display: flex; min-height: 62px; align-items: center; justify-content: space-between; gap: 18px; padding: 10px clamp(16px, 4vw, 48px); border-bottom: 1px solid #d8d1c3; background: rgba(250,248,242,.92); }
  .topbar > div { display: flex; align-items: center; gap: 10px; }
  .mini-mark { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 8px; color: #fff; background: #245f54; }
  .progress span, .progress strong { display: block; }
  .progress { text-align: right; }
  .progress span { color: #9a4b2f; font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  .progress strong { font-size: .82rem; }
  .scene { width: min(1180px, calc(100% - 32px)); margin: auto; padding: 28px 0 44px; }
  .scene-copy { display: grid; max-width: 900px; margin-bottom: 22px; }
  .scene-copy h1 { margin: 0; font-family: Georgia, serif; font-size: clamp(2rem, 5vw, 4rem); font-weight: 500; letter-spacing: -.045em; }
  .scene-copy > p:last-child { max-width: 850px; margin: 12px 0 0; color: #52615c; line-height: 1.55; }

  .workbench { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(280px, .75fr); gap: 16px; align-items: stretch; }
  .survey-card, .ledger-card { min-width: 0; border: 1px solid #d3ccbe; border-radius: 16px; background: #fbfaf6; box-shadow: 0 10px 30px rgba(50,50,35,.06); }
  .survey-card { padding: clamp(16px, 3vw, 28px); }
  .ledger-card { padding: 20px; }
  .card-heading { display: flex; align-items: start; justify-content: space-between; gap: 14px; }
  .card-heading span { color: #9a4b2f; font-size: .66rem; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
  .card-heading h2 { margin: 3px 0 0; font-size: 1.05rem; }
  .card-heading p { margin: 0; color: #6e7773; font-size: .8rem; }
  .card-heading p strong { color: #245f54; font-size: 1.35rem; }

  .path-map { position: relative; height: 150px; margin: 34px 26px 22px; }
  .path-line { position: absolute; top: 68px; left: 0; width: 100%; height: 34px; border: 1px solid #b99a70; border-radius: 6px; background: repeating-linear-gradient(90deg, #eee2ca 0 16px, #f5ecdc 16px 32px); }
  .line-only .path-line { top: 82px; height: 5px; border: 0; border-radius: 0; background: #354f48; }
  .flag { position: absolute; top: 18px; z-index: 4; display: grid; justify-items: center; color: #4f5e59; font-size: .68rem; font-weight: 800; }
  .flag.start { left: 0; transform: translateX(-50%); }
  .flag.finish { right: 0; transform: translateX(50%); }
  .flag i { display: block; width: 3px; height: 46px; background: #253b35; }
  .flag.start i::before, .flag.finish i::before { display: block; width: 20px; height: 14px; background: #9a4b2f; content: ''; }
  .flag.finish i::before { background: #245f54; }
  .interval { position: absolute; top: 62px; z-index: 2; display: grid; height: 46px; place-items: center; border: 2px solid #81501f; border-radius: 5px; color: #563614; background: #dca65e; font-size: .72rem; font-weight: 900; overflow: hidden; }
  .line-only .interval { top: 63px; height: 42px; border-width: 0 2px; border-radius: 0; background: rgba(220,166,94,.28); }
  .interval.committed:nth-of-type(even) { background: #e8bb7d; }
  .interval.preview { z-index: 3; border-style: dashed; border-color: #245f54; color: #16463d; background: rgba(101,170,151,.36); }
  .interval.preview.aligned { box-shadow: 0 0 0 3px rgba(36,95,84,.18); }
  .relation-readout { display: flex; min-height: 44px; align-items: center; gap: 9px; margin: 0 0 16px; padding: 9px 12px; border-radius: 9px; color: #43514c; background: #f0eee7; font-size: .86rem; }
  .relation-readout span { color: #245f54; font-size: 1.2rem; }

  .move-controls { display: grid; grid-template-columns: 1fr minmax(150px, .8fr) 1fr; gap: 9px; align-items: stretch; }
  .move-controls button, .undo-row button { min-height: 48px; border: 1px solid #c8c4b9; border-radius: 10px; color: #29443d; background: #fff; font-weight: 800; cursor: pointer; }
  .move-controls button { display: flex; align-items: center; justify-content: center; gap: 8px; }
  .move-controls button:disabled, .undo-row button:disabled { color: #9ca29f; background: #efeee9; cursor: not-allowed; }
  .move-controls > div { display: grid; place-content: center; padding: 7px; border: 1px dashed #bdb9ad; border-radius: 10px; text-align: center; }
  .move-controls small, .move-controls strong { display: block; }
  .move-controls small { color: #717a76; font-size: .65rem; text-transform: uppercase; }
  .move-controls > div strong { margin-top: 2px; font-size: .76rem; }
  .primary-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .primary-actions button { display: grid; min-height: 68px; grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; padding: 10px 14px; border: 0; border-radius: 11px; color: #fff; text-align: left; cursor: pointer; }
  .primary-actions button > span { grid-row: 1 / 3; font-size: 1.4rem; }
  .primary-actions strong, .primary-actions small { display: block; }
  .primary-actions small { opacity: .78; font-size: .68rem; }
  .primary-actions button:disabled { opacity: .48; cursor: not-allowed; }
  .place-button { background: #9a4b2f; }
  .count-button { background: #245f54; }

  .empty-ledger { margin: 24px 0; padding: 18px; border: 1px dashed #cbc5b8; border-radius: 10px; color: #6b746f; font-size: .84rem; line-height: 1.5; }
  .interval-list { display: grid; gap: 7px; max-height: 310px; margin: 22px 0; padding: 0; overflow: auto; list-style: none; }
  .interval-list li { min-width: 0; border: 1px solid #ddd7ca; border-left: 4px solid #c4a578; border-radius: 8px; background: #fff; overflow: hidden; }
  .interval-list li.count-ok { border-left-color: #377c69; }
  .interval-list li.count-error { border-left-color: #b15f42; }
  .interval-list li.selected-count { box-shadow: 0 0 0 2px rgba(36,95,84,.24); }
  .ledger-select { display: flex; width: 100%; min-height: 50px; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 9px; border: 0; color: inherit; background: transparent; text-align: left; cursor: pointer; }
  .ledger-select:disabled { cursor: not-allowed; }
  .ledger-select > span, .ledger-select strong, .ledger-select small { display: block; min-width: 0; }
  .ledger-select small { overflow: hidden; color: #707975; font-size: .66rem; text-overflow: ellipsis; white-space: nowrap; }
  .count-state { display: flex !important; flex: 0 0 auto; align-items: center; gap: 3px; color: #245f54; }
  .count-state i { font-style: normal; }
  .count-state em { color: #a4472d; font-size: .68rem; font-style: normal; font-weight: 800; }
  .orphan-warning { display: grid; gap: 8px; padding: 9px; border-radius: 8px; color: #7f321f; background: #f9e4dc; font-size: .76rem; }
  .orphan-warning p, .orphan-warning strong, .orphan-warning span { display: block; margin: 0; }
  .orphan-warning span { margin-top: 3px; line-height: 1.35; }
  .orphan-warning button { min-height: 44px; border: 1px solid #a9573e; border-radius: 7px; color: #7f321f; background: #fff7f3; font-weight: 800; cursor: pointer; }
  .undo-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .undo-row button { min-height: 44px; padding: 8px; font-size: .75rem; }
  .trace-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin: 14px 0 0; }
  .trace-stats div { padding: 8px 5px; border-radius: 7px; background: #efeee8; text-align: center; }
  .trace-stats dt { color: #747d79; font-size: .6rem; }
  .trace-stats dd { margin: 3px 0 0; font-weight: 900; }

  .report-card { display: grid; gap: 14px; margin-top: 14px; padding: clamp(16px, 3vw, 24px); border: 1px solid #94afa7; border-radius: 14px; background: #f8fbf8; }
  .report-card h2 { margin: 0; font-family: Georgia, serif; font-size: clamp(1.4rem, 3vw, 2.1rem); font-weight: 500; }
  .report-card > div:first-child > p:last-child { margin: 6px 0 0; color: #65716d; font-size: .82rem; }
  .report-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .report-actions button { display: grid; min-height: 72px; grid-template-columns: auto 1fr; align-items: center; column-gap: 9px; padding: 9px; border: 1px solid #aec1ba; border-radius: 9px; color: #245f54; background: #fff; text-align: left; cursor: pointer; }
  .report-actions button.reported { border-color: #245f54; background: #e4f0eb; }
  .report-actions button:disabled { opacity: 1; cursor: default; }
  .report-actions button > span { grid-row: 1 / 3; font-size: .66rem; font-weight: 900; }
  .report-actions strong, .report-actions small { display: block; }
  .report-actions small { color: #687570; font-size: .66rem; }
  .replay-proof { display: grid; grid-template-columns: repeat(auto-fit, minmax(135px, 1fr)); gap: 7px; margin: 0; padding: 0; list-style: none; }
  .replay-proof li { display: grid; min-width: 0; gap: 3px; padding: 9px; border: 1px solid #9eb4ad; border-radius: 8px; background: #edf4f0; }
  .replay-proof li.invalid { border-color: #b85d42; background: #fff0ea; }
  .replay-proof strong, .replay-proof span, .replay-proof small { overflow-wrap: anywhere; }
  .replay-proof strong { color: #245f54; font-size: .72rem; }
  .replay-proof span { font-size: .76rem; font-weight: 800; }
  .replay-proof small { color: #687570; font-size: .64rem; line-height: 1.35; }
  .explanation-field { display: grid; gap: 6px; color: #314b43; font-size: .78rem; font-weight: 800; }
  .explanation-field textarea { box-sizing: border-box; width: 100%; min-height: 82px; resize: vertical; padding: 10px; border: 1px solid #9eb4ad; border-radius: 9px; color: #223a33; background: #fff; font: inherit; line-height: 1.45; }
  .explanation-field textarea[aria-invalid="true"] { border-color: #b85d42; }
  .explanation-field small { color: #6a7772; font-size: .66rem; font-weight: 500; line-height: 1.4; }
  .report-card blockquote { display: grid; gap: 4px; margin: 0; padding: 12px; border-left: 4px solid #245f54; color: #40514b; background: #edf4f0; font-size: .8rem; line-height: 1.45; }
  .report-footer { display: flex; justify-content: space-between; gap: 9px; }
  .report-footer button { min-height: 46px; padding: 9px 13px; border: 1px solid #9eb0aa; border-radius: 9px; color: #40544d; background: #fff; font-weight: 800; cursor: pointer; }
  .report-footer .declare-button { border: 0; color: #fff; background: #245f54; }
  .report-footer .declare-button:disabled { color: #7d8985; background: #dfe5e1; cursor: not-allowed; }

  .audit-bar { display: grid; grid-template-columns: 1fr auto; gap: 12px; margin-top: 14px; }
  .message { display: flex; min-height: 58px; align-items: center; gap: 10px; padding: 10px 14px; border: 1px solid #d4cdbf; border-radius: 11px; background: #faf8f2; }
  .message.error { border-color: #c56e52; color: #6f2a1b; background: #fff0ea; }
  .message > span { display: grid; width: 28px; height: 28px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #fff; background: #245f54; font-weight: 900; }
  .message.error > span { background: #9a4b2f; }
  .message p { margin: 0; font-size: .86rem; line-height: 1.45; }
  .audit-button { min-height: 58px; padding: 10px 18px; border: 0; border-radius: 11px; color: #fff; background: #1d453d; font-weight: 900; cursor: pointer; }
  .audit-button:disabled { color: #89938f; background: #d8ddda; cursor: not-allowed; }

  .success, .complete { display: grid; width: min(860px, calc(100% - 34px)); min-height: calc(100vh - 42px); margin: auto; place-content: center; padding: 44px 0; }
  .success-seal { display: grid; width: 94px; height: 94px; place-content: center; border: 2px solid #245f54; border-radius: 50%; color: #245f54; font-family: Georgia, serif; font-size: 2.5rem; text-align: center; }
  .success-seal small { display: block; font-family: ui-sans-serif, system-ui; font-size: .58rem; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
  .success h1, .complete h1 { max-width: 760px; margin: 20px 0 12px; font-family: Georgia, serif; font-size: clamp(2.4rem, 7vw, 5.2rem); font-weight: 500; letter-spacing: -.055em; line-height: .95; }
  .success-feedback { max-width: 760px; margin: 0; color: #4d5c57; font-size: 1.05rem; line-height: 1.65; }
  .reported-statement { max-width: 760px; margin: 18px 0 0; padding: 12px 15px; border-left: 4px solid #245f54; color: #40514b; background: #faf8f2; font-size: .86rem; line-height: 1.5; }
  .reported-statement strong, .reported-statement span { display: inline-block; }
  .reported-statement span { margin-top: 5px; color: #687570; font-size: .72rem; }
  .replay-strip { display: flex; gap: 6px; margin: 18px 0 10px; overflow: auto; }
  .replay-strip span { display: grid; min-width: 96px; padding: 9px; border: 1px solid #d3ccbe; border-radius: 9px; background: #faf8f2; }
  .replay-strip i { display: grid; width: 24px; height: 24px; place-items: center; border-radius: 50%; color: #fff; background: #245f54; font-size: .7rem; font-style: normal; }
  .replay-strip b { margin-top: 7px; font-size: .76rem; }
  .replay-strip em { color: #777f7b; font-size: .64rem; font-style: normal; }
  .replay-note { margin: 0 0 24px; color: #69736f; font-size: .82rem; }
  .success .primary { width: fit-content; }
  .complete > p:not(.kicker) { max-width: 720px; color: #52615c; line-height: 1.6; }
  .gate-note { display: grid; max-width: 720px; gap: 4px; margin: 20px 0; padding: 14px; border-left: 4px solid #9a4b2f; background: #faf8f2; }
  .gate-note span { color: #5e6965; font-size: .82rem; }
  .complete button { width: fit-content; min-height: 46px; padding: 10px 15px; border: 1px solid #245f54; border-radius: 10px; color: #245f54; background: transparent; font-weight: 850; cursor: pointer; }

  @media (max-width: 820px) {
    .workbench { grid-template-columns: 1fr; }
    .ledger-card { order: 2; }
    .intro-rules { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .topbar { align-items: flex-start; }
    .topbar > div:first-child strong { display: none; }
    .scene { width: min(100% - 20px, 1180px); padding-top: 20px; }
    .scene-copy h1 { font-size: 2.1rem; }
    .survey-card, .ledger-card { border-radius: 12px; }
    .path-map { height: 135px; margin-right: 20px; margin-left: 20px; }
    .move-controls { grid-template-columns: 1fr 1fr; }
    .move-controls > div { grid-column: 1 / 3; grid-row: 1; min-height: 48px; }
    .primary-actions, .undo-row, .audit-bar, .report-actions { grid-template-columns: 1fr; }
    .report-footer { flex-direction: column; }
    .report-footer button { width: 100%; }
    .audit-button { width: 100%; }
    .trace-stats { gap: 3px; }
    .intro h1 { font-size: clamp(2.8rem, 17vw, 4.4rem); }
    .replay-strip { width: 100%; }
  }
</style>
