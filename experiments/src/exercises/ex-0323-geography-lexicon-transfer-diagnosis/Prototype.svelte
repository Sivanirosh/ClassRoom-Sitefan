<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Choice = 'incorrect' | 'correct';
  type ErrorFamily = 'GENERIC_TERM' | 'NEARBY_CONCEPT' | 'EVIDENCE_MISMATCH' | null;

  type Mission = {
    id: string;
    callSign: string;
    chapter: string;
    mission: string;
    sketchLabel: string;
    sketch: string;
    wrongTerm: string;
    correctTerm: string;
    wrongEvidence: string;
    correctEvidence: string;
    wrongFamily: Exclude<ErrorFamily, null>;
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
    dispatch: string;
  };

  const missions: Mission[] = [
    {
      id: 'flood-edge',
      callSign: 'Équipe Lisière',
      chapter: 'Mission 01 · après l’orage',
      mission: 'Indique exactement où poser le panneau : au bord où le sol sec devient inondé.',
      sketchLabel: 'Croquis : sol sec, ligne en pointillés, zone inondée',
      sketch: 'SOL SEC  · · · · ·  EAU',
      wrongTerm: 'zone',
      correctTerm: 'limite',
      wrongEvidence: 'parce que toute la surface à droite est mouillée',
      correctEvidence: 'parce que les pointillés marquent le passage du sec à l’inondé',
      wrongFamily: 'NEARBY_CONCEPT',
      incorrectFeedback: '↺ Le message nomme la zone inondée, mais la mission demande son bord. Les pointillés marquent le changement entre le sol sec et l’eau : c’est cette limite qu’il faut signaler.',
      scaffold: 'Le panneau doit-il couvrir une surface ou être posé à l’endroit précis où l’espace change ?',
      correctFeedback: '✓ « Limite » et l’indice des pointillés concordent : le message désigne exactement le bord où le sol sec devient inondé.',
      dispatch: 'limite + changement de part et d’autre'
    },
    {
      id: 'mobile-collection',
      callSign: 'Équipe Collecte',
      chapter: 'Mission 02 · approvisionnement',
      mission: 'Décris l’organisation qui permet au véhicule de passer par trois points de collecte reliés.',
      sketchLabel: 'Croquis : dépôt relié au marché puis à la place',
      sketch: 'DÉPÔT ━ MARCHÉ ━ PLACE',
      wrongTerm: 'route',
      correctTerm: 'réseau',
      wrongEvidence: 'parce qu’un seul tronçon part du dépôt',
      correctEvidence: 'parce que trois lieux et leurs liaisons forment un ensemble',
      wrongFamily: 'GENERIC_TERM',
      incorrectFeedback: '↺ « Route » ne décrit qu’un tracé général ou un tronçon. La mission porte sur les trois lieux reliés et l’ensemble de leurs liaisons : le message doit nommer ce réseau.',
      scaffold: 'Regarde tout le croquis, pas seulement le premier trait : combien de lieux et de liaisons participent à l’organisation ?',
      correctFeedback: '✓ « Réseau » convient avec l’indice choisi : les trois points et les liaisons entre eux forment l’organisation complète.',
      dispatch: 'réseau + plusieurs lieux reliés'
    },
    {
      id: 'sports-crossing',
      callSign: 'Équipe Passage',
      chapter: 'Mission 03 · loisirs',
      mission: 'Explique pourquoi la passerelle compte dans l’organisation du chemin vers le terrain de sport.',
      sketchLabel: 'Croquis : chemin, passerelle franchissant le ruisseau, terrain',
      sketch: 'CHEMIN  ═╪═  TERRAIN',
      wrongTerm: 'construction',
      correctTerm: 'aménagement',
      wrongEvidence: 'parce que la passerelle est faite de planches',
      correctEvidence: 'parce qu’elle rend possible le franchissement du ruisseau',
      wrongFamily: 'GENERIC_TERM',
      incorrectFeedback: '↺ « Construction » dit seulement qu’un objet a été fabriqué, et les planches décrivent sa matière. La mission demande son rôle : cet aménagement permet de franchir le ruisseau.',
      scaffold: 'Imagine le chemin sans la passerelle. Quelle action ne serait plus possible facilement ?',
      correctFeedback: '✓ « Aménagement » et l’indice de franchissement concordent : la passerelle est une réalisation organisée pour permettre cet usage du lieu.',
      dispatch: 'aménagement + fonction rendue possible'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentMission = missions[0];
  let termChoice: Choice | null = null;
  let evidenceChoice: Choice | null = null;
  let submittedTerm = '';
  let submittedEvidence = '';
  let responsePath: string[] = [];
  let errorFamily: ErrorFamily = null;
  let announcement = '';
  let stateFocusTarget: HTMLElement | null = null;
  let legacyState: 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' = 'ready';

  $: currentMission = missions[currentIndex];
  $: legacyState = phase === 'intro'
    ? 'ready'
    : phase === 'active' || phase === 'retry'
      ? 'question'
      : phase;

  async function focusState(): Promise<void> {
    await tick();
    stateFocusTarget?.focus();
  }

  function start(): void {
    currentIndex = 0;
    responsePath = [];
    errorFamily = null;
    prepareMission();
    phase = 'active';
    announcement = `${currentMission.callSign} appelle. Compose un message avec un terme et un indice.`;
    void focusState();
  }

  function prepareMission(): void {
    termChoice = null;
    evidenceChoice = null;
    submittedTerm = '';
    submittedEvidence = '';
    errorFamily = null;
  }

  function chooseTerm(choice: Choice): void {
    termChoice = choice;
    announcement = `Terme choisi : ${choice === 'correct' ? currentMission.correctTerm : currentMission.wrongTerm}.`;
  }

  function chooseEvidence(choice: Choice): void {
    evidenceChoice = choice;
    announcement = `Indice choisi : ${choice === 'correct' ? currentMission.correctEvidence : currentMission.wrongEvidence}.`;
  }

  function submitMessage(): void {
    if (!termChoice || !evidenceChoice) return;

    submittedTerm = termChoice === 'correct' ? currentMission.correctTerm : currentMission.wrongTerm;
    submittedEvidence = evidenceChoice === 'correct'
      ? currentMission.correctEvidence
      : currentMission.wrongEvidence;
    responsePath = [...responsePath, `${currentMission.id}:${submittedTerm}|${submittedEvidence}`];

    if (termChoice === 'correct' && evidenceChoice === 'correct') {
      errorFamily = null;
      phase = 'correct';
      announcement = currentMission.correctFeedback;
      void focusState();
      return;
    }

    errorFamily = termChoice === 'incorrect' ? currentMission.wrongFamily : 'EVIDENCE_MISMATCH';
    phase = 'incorrect';
    announcement = currentMission.incorrectFeedback;
    void focusState();
  }

  function directSubmit(choice: Choice): void {
    termChoice = choice;
    evidenceChoice = choice;
    submitMessage();
  }

  function retry(): void {
    termChoice = null;
    evidenceChoice = null;
    phase = 'retry';
    announcement = `Canal rouvert. Indice : ${currentMission.scaffold}`;
    void focusState();
  }

  function continueMissions(): void {
    if (currentIndex === missions.length - 1) {
      phase = 'complete';
      announcement = 'Transmission terminée. Trois messages concordants ont été composés.';
      void focusState();
      return;
    }
    currentIndex += 1;
    prepareMission();
    phase = 'active';
    announcement = `${missions[currentIndex].callSign} appelle. Nouvelle mission.`;
    void focusState();
  }

  function selectedTerm(): string {
    if (termChoice === 'correct') return currentMission.correctTerm;
    if (termChoice === 'incorrect') return currentMission.wrongTerm;
    return '…';
  }

  function selectedEvidence(): string {
    if (evidenceChoice === 'correct') return currentMission.correctEvidence;
    if (evidenceChoice === 'incorrect') return currentMission.wrongEvidence;
    return '…';
  }

  function responseDescription(): string {
    if (errorFamily === 'EVIDENCE_MISMATCH') {
      return 'Le terme peut convenir, mais l’indice choisi ne le prouve pas dans cette situation.';
    }
    if (errorFamily === 'NEARBY_CONCEPT') {
      return 'Le message utilise une notion voisine, mais il ne nomme pas la relation demandée.';
    }
    return 'Le message reste trop général pour guider précisément l’action demandée.';
  }
</script>

<svelte:head>
  <title>Radio Quartier : le mot juste · EX-0323</title>
  <meta name="description" content="Transférer le vocabulaire géographique dans trois messages de coordination." />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0323"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0323">
    <div class="legacy-root">
    <header class="radio-header">
      <div class="signal-mark" aria-hidden="true"><i></i><i></i><i></i></div>
      <div><small>Canal local 06</small><strong>Radio Quartier</strong></div>
      {#if phase !== 'intro' && phase !== 'complete'}
        <span class="counter">Mission {currentIndex + 1} / {missions.length}</span>
      {/if}
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="intro-console" aria-hidden="true">
          <div class="speaker"></div>
          <div class="display"><span>CANAL</span><strong>06</strong><small>PRÊT</small></div>
          <div class="dial"></div>
        </div>
        <div class="intro-copy">
          <p class="eyebrow">EX—0323 · Transfert</p>
          <h1 id="intro-title">Un message précis dit le mot et l’indice qui le prouve.</h1>
          <p>
            Trois équipes ont besoin d’une indication géographique dans des situations nouvelles.
            Compose chaque message avec <strong>un terme</strong> et <strong>un indice concordant</strong>, puis envoie-le.
          </p>
          <div class="radio-rule">
            <span>TERME</span><b aria-hidden="true">＋</b><span>INDICE</span><b aria-hidden="true">＝</b><span>MESSAGE UTILE</span>
          </div>
          <p class="controls">Boutons larges, clavier ou toucher. Aucun son n’est nécessaire.</p>
          <button type="button" class="transmit" data-smoke-action="start" onclick={start}>
            Allumer le canal <span aria-hidden="true">◉</span>
          </button>
        </div>
      </section>
    {:else if phase === 'active' || phase === 'retry'}
      <section
        class="mission"
        tabindex="-1"
        bind:this={stateFocusTarget}
        data-smoke-state={phase}
        data-smoke-variation={currentMission.id}
        aria-labelledby="mission-title"
      >
        <div class="call-strip">
          <span class="live"><i aria-hidden="true"></i> Appel reçu</span>
          <strong>{currentMission.callSign}</strong>
          <small>{currentMission.chapter}</small>
        </div>

        <div class="mission-grid">
          <article class="briefing">
            <p class="eyebrow">Situation nouvelle</p>
            <h1 id="mission-title">{currentMission.mission}</h1>
            <div class="sketch" role="img" aria-label={currentMission.sketchLabel}>
              <span>{currentMission.sketch}</span>
            </div>
            {#if phase === 'retry'}
              <aside class="scaffold" role="status">
                <strong><span aria-hidden="true">↺</span> Question de contrôle</strong>
                <p>{currentMission.scaffold}</p>
              </aside>
            {/if}
          </article>

          <article class="composer">
            <p class="eyebrow">Composer la transmission</p>
            <fieldset>
              <legend>1. Choisis le terme</legend>
              <button
                type="button"
                class:selected={termChoice === 'incorrect'}
                aria-pressed={termChoice === 'incorrect'}
                data-smoke-attempt="incorrect"
                data-smoke-step="1"
                onclick={() => chooseTerm('incorrect')}
              >
                <span>A</span>{currentMission.wrongTerm}
              </button>
              <button
                type="button"
                class:selected={termChoice === 'correct'}
                aria-pressed={termChoice === 'correct'}
                data-smoke-attempt="correct"
                data-smoke-step="1"
                onclick={() => chooseTerm('correct')}
              >
                <span>B</span>{currentMission.correctTerm}
              </button>
            </fieldset>

            <fieldset>
              <legend>2. Choisis l’indice</legend>
              <button
                type="button"
                class:selected={evidenceChoice === 'incorrect'}
                aria-pressed={evidenceChoice === 'incorrect'}
                data-smoke-attempt="incorrect"
                data-smoke-step="2"
                onclick={() => chooseEvidence('incorrect')}
              >
                <span>A</span>{currentMission.wrongEvidence}
              </button>
              <button
                type="button"
                class:selected={evidenceChoice === 'correct'}
                aria-pressed={evidenceChoice === 'correct'}
                data-smoke-attempt="correct"
                data-smoke-step="2"
                onclick={() => chooseEvidence('correct')}
              >
                <span>B</span>{currentMission.correctEvidence}
              </button>
            </fieldset>

            <div class="message-preview" aria-live="polite">
              <span>Message préparé</span>
              <p><strong>{selectedTerm()}</strong>, {selectedEvidence()}</p>
            </div>
            <button
              type="button"
              class="transmit full"
              disabled={!termChoice || !evidenceChoice}
              data-smoke-action="submit"
              onclick={submitMessage}
            >
              Envoyer le message <span aria-hidden="true">▶</span>
            </button>
          </article>
        </div>

        <aside class="direct-channel" aria-label="Alternative de messages complets">
          <div><strong>Canal direct</strong><small>Deux messages complets, mêmes règles.</small></div>
          <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit('incorrect')}>
            <b>{currentMission.wrongTerm}</b>, {currentMission.wrongEvidence}
          </button>
          <button type="button" data-smoke-answer="correct" onclick={() => directSubmit('correct')}>
            <b>{currentMission.correctTerm}</b>, {currentMission.correctEvidence}
          </button>
        </aside>
      </section>
    {:else if phase === 'incorrect'}
      <section
        class="feedback incorrect"
        tabindex="-1"
        bind:this={stateFocusTarget}
        data-smoke-state="incorrect"
        data-smoke-variation={currentMission.id}
        data-smoke-feedback="incorrect"
        data-smoke-feedback-detail="specific"
        role="status"
        aria-labelledby="feedback-title"
      >
        <div class="status-icon" aria-hidden="true">↺</div>
        <p class="eyebrow">Message à clarifier</p>
        <h1 id="feedback-title">Le terme et l’indice ne guident pas encore la même action.</h1>
        <blockquote><strong>{submittedTerm}</strong>, {submittedEvidence}</blockquote>
        <p>{currentMission.incorrectFeedback}</p>
        <div class="pattern-note">
          <span>Ce que montre cette réponse</span>
          <p>{responseDescription()}</p>
        </div>
        <button type="button" class="transmit" data-smoke-action="retry" onclick={retry}>
          Réouvrir le canal
        </button>
      </section>
    {:else if phase === 'correct'}
      <div class="success-grid">
        <section
          class="feedback correct"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="correct"
          data-smoke-variation={currentMission.id}
          data-smoke-feedback="correct"
          data-smoke-feedback-detail="specific"
          role="status"
          aria-labelledby="feedback-title"
        >
          <div class="status-icon" aria-hidden="true">✓</div>
          <p class="eyebrow">Message concordant</p>
          <h1 id="feedback-title"><strong>{submittedTerm}</strong>, {submittedEvidence}</h1>
          <p>{currentMission.correctFeedback}</p>
          <div class="dispatch"><span>Structure utile</span><strong>{currentMission.dispatch}</strong></div>
        </section>
        <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentMission.id}>
          <span class="channel-number">0{currentIndex + 1}</span>
          <strong>Transmission lue</strong>
          <p>Le terme et la preuve restent visibles. Continue quand tu as fini de les comparer.</p>
          <button type="button" class="transmit" data-smoke-action="continue" onclick={continueMissions}>
            {currentIndex === missions.length - 1 ? 'Terminer la liaison' : 'Prendre l’appel suivant'}
          </button>
        </aside>
      </div>
    {:else}
      <section class="completion" tabindex="-1" bind:this={stateFocusTarget} data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <div class="signal-complete" aria-hidden="true"><i></i><i></i><i></i><b>✓</b></div>
        <p class="eyebrow">Liaison terminée</p>
        <h1 id="complete-title">Trois messages ont associé un mot précis à une preuve utile.</h1>
        <p>
          La stratégie reste la même dans un contexte nouveau :
          <strong>nommer la relation, puis vérifier que l’indice la justifie vraiment.</strong>
        </p>
        <ul>
          {#each missions as item}
            <li><span aria-hidden="true">✓</span><strong>{item.correctTerm}</strong><small>{item.dispatch}</small></li>
          {/each}
        </ul>
        <p class="privacy">Le chemin de réponse est resté dans ce composant. Rien n’a été enregistré ni envoyé.</p>
      </section>
    {/if}

      <p class="sr-only" aria-live="polite">{announcement}</p>
    </div>
  </main>
</div>

<style>
  .prototype-root,
  .prototype-root * { box-sizing: border-box; }

  .prototype-root {
    --night: #14252a;
    --panel: #20383c;
    --screen: #d7e0bf;
    --lime: #b8d45d;
    --orange: #f18b47;
    --paper: #f5f0df;
    --ink: #17272b;
    --muted: #617074;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--paper);
    background:
      linear-gradient(rgba(184,212,93,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184,212,93,.035) 1px, transparent 1px),
      var(--night);
    background-size: 30px 30px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .legacy-root { width: min(1160px, 100%); min-height: calc(100vh - 42px); margin: auto; padding: 16px clamp(12px, 3vw, 34px) 50px; }
  h1, p, blockquote { overflow-wrap: anywhere; }

  .radio-header { display: flex; min-height: 64px; align-items: center; gap: 13px; padding: 8px 12px; border: 1px solid #3b5559; background: rgba(20,37,42,.86); }
  .signal-mark { display: flex; width: 48px; height: 48px; align-items: end; justify-content: center; gap: 3px; padding: 10px; border-radius: 50%; background: var(--orange); }
  .signal-mark i { width: 5px; background: var(--night); }
  .signal-mark i:nth-child(1) { height: 8px; }
  .signal-mark i:nth-child(2) { height: 16px; }
  .signal-mark i:nth-child(3) { height: 25px; }
  .radio-header div:nth-child(2) { display: grid; }
  .radio-header small { color: #aab8b7; font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; }
  .radio-header strong { font-family: Georgia, serif; font-size: 1.05rem; }
  .counter { margin-left: auto; color: var(--lime); font: 800 .7rem ui-monospace, monospace; text-transform: uppercase; }

  .eyebrow { margin: 0; color: var(--orange); font-size: .7rem; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }

  .intro { display: grid; min-height: min(720px, calc(100vh - 122px)); grid-template-columns: minmax(270px, .8fr) minmax(0, 1.2fr); align-items: center; gap: clamp(30px, 7vw, 84px); padding: 54px 0; }
  .intro-console { display: grid; min-height: 430px; grid-template-columns: 1fr .85fr; gap: 22px; padding: 34px; border: 4px solid #0d181b; border-radius: 28px; background: var(--panel); box-shadow: 16px 18px 0 #091113; transform: rotate(-1deg); }
  .speaker { grid-row: 1 / span 2; border: 4px solid #101d20; border-radius: 50%; background: repeating-radial-gradient(circle, #0e1a1d 0 3px, #3c5558 4px 6px); }
  .display { display: grid; place-items: center; padding: 14px; border: 7px solid #101d20; border-radius: 8px; color: var(--ink); background: var(--screen); font-family: ui-monospace, monospace; box-shadow: inset 0 0 18px rgba(23,39,43,.3); }
  .display span,
  .display small { font-size: .68rem; font-weight: 900; letter-spacing: .1em; }
  .display strong { font-size: 4rem; line-height: 1; }
  .dial { width: 90px; height: 90px; place-self: center; border: 12px solid #101d20; border-radius: 50%; background: var(--orange); box-shadow: inset 0 0 0 3px #61361f; }
  .intro-copy h1,
  .briefing h1,
  .feedback h1,
  .completion h1 { margin: 13px 0 18px; font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.036em; line-height: 1.02; }
  .intro-copy h1 { font-size: clamp(2.8rem, 6vw, 5.9rem); }
  .intro-copy > p:not(.eyebrow) { color: #c0cbc9; font-size: 1.03rem; line-height: 1.65; }
  .radio-rule { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 24px 0; }
  .radio-rule span { padding: 9px 10px; border: 1px solid var(--lime); color: var(--lime); font: 800 .72rem ui-monospace, monospace; }
  .controls { font-size: .8rem !important; }

  button { min-height: 48px; border: 2px solid #0d181b; border-radius: 7px; color: var(--ink); background: var(--paper); font: inherit; font-weight: 750; cursor: pointer; }
  button:focus-visible,
  [tabindex="-1"]:focus { outline: 4px solid var(--orange); outline-offset: 3px; }
  button:disabled { opacity: .45; cursor: not-allowed; }
  .transmit { display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 12px 18px; border-color: var(--orange); color: var(--ink); background: var(--orange); box-shadow: 4px 4px 0 #091113; }
  .transmit.full { width: 100%; margin-top: 14px; }

  .mission { padding-top: 32px; }
  .call-strip { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #52696c; border-radius: 8px 8px 0 0; background: #1c3034; }
  .call-strip .live { display: flex; align-items: center; gap: 7px; color: var(--lime); font-size: .68rem; font-weight: 900; text-transform: uppercase; }
  .live i { width: 9px; height: 9px; border-radius: 50%; background: var(--lime); }
  .call-strip small { margin-left: auto; color: #a9b7b5; font-family: ui-monospace, monospace; }

  .mission-grid { display: grid; grid-template-columns: .88fr 1.12fr; gap: 18px; padding: 18px; border: 1px solid #52696c; border-top: 0; background: rgba(32,56,60,.72); }
  .briefing,
  .composer { min-width: 0; padding: clamp(18px, 4vw, 34px); border-radius: 11px; }
  .briefing { border: 1px solid #50666a; background: #182c30; }
  .briefing h1 { font-size: clamp(2rem, 4vw, 3.5rem); }
  .sketch { display: grid; min-height: 170px; place-items: center; margin-top: 26px; padding: 18px; border: 1px dashed var(--lime); color: var(--lime); background: #0f1e21; text-align: center; }
  .sketch span { font: 800 clamp(.95rem, 2.6vw, 1.6rem) ui-monospace, monospace; }
  .scaffold { margin-top: 16px; padding: 15px; border-left: 6px solid var(--orange); color: var(--ink); background: #f4d9b7; }
  .scaffold p { margin: 6px 0 0; line-height: 1.5; }

  .composer { color: var(--ink); background: var(--paper); }
  fieldset { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin: 16px 0 0; padding: 12px; border: 1px solid #aeb6ae; }
  legend { padding: 0 6px; color: var(--muted); font-size: .72rem; font-weight: 900; text-transform: uppercase; }
  fieldset button { display: flex; min-width: 0; min-height: 62px; align-items: center; gap: 9px; padding: 10px; text-align: left; line-height: 1.3; }
  fieldset button span { display: grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: var(--paper); background: var(--panel); font-size: .7rem; }
  fieldset button.selected { border-color: var(--orange); background: #f8ddc9; box-shadow: inset 0 -5px 0 var(--orange); }
  .message-preview { min-height: 96px; margin-top: 14px; padding: 13px; border: 1px solid #96a29b; background: var(--screen); }
  .message-preview span { font-size: .65rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .message-preview p { margin: 8px 0 0; font-family: Georgia, serif; line-height: 1.45; }

  .direct-channel { display: grid; grid-template-columns: minmax(130px, .5fr) 1fr 1fr; gap: 9px; margin-top: 15px; padding: 13px; border: 1px dashed #728487; background: #1c3034; }
  .direct-channel > div { align-self: center; }
  .direct-channel strong,
  .direct-channel small { display: block; }
  .direct-channel small { margin-top: 4px; color: #aab8b6; }
  .direct-channel button { padding: 11px; text-align: left; line-height: 1.35; }

  .feedback { width: min(850px, 100%); margin: 48px auto 0; padding: clamp(24px, 6vw, 54px); border: 1px solid #4e6568; border-radius: 12px; color: var(--ink); background: var(--paper); box-shadow: 10px 12px 0 #091113; }
  .status-icon { display: grid; width: 60px; height: 60px; place-items: center; border-radius: 50%; color: var(--ink); background: var(--orange); font-size: 1.8rem; font-weight: 900; }
  .correct .status-icon { background: var(--lime); }
  .feedback h1 { font-size: clamp(2rem, 5vw, 3.9rem); }
  .feedback > p:not(.eyebrow) { color: var(--muted); line-height: 1.65; }
  blockquote { margin: 20px 0; padding: 16px; border-left: 6px solid var(--orange); background: #f5dfca; font-family: Georgia, serif; font-size: 1.12rem; line-height: 1.5; }
  .pattern-note { margin: 18px 0; padding: 14px; border: 1px solid #c4a27f; background: #fff3d9; }
  .pattern-note span { font-size: .66rem; font-weight: 900; text-transform: uppercase; }
  .pattern-note p { margin: 6px 0 0; }
  .dispatch { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; margin-top: 20px; padding: 14px; background: var(--screen); }
  .dispatch span { font-size: .66rem; font-weight: 900; text-transform: uppercase; }

  .success-grid { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 18px; margin-top: 42px; }
  .success-grid .feedback { width: 100%; margin: 0; }
  .continuation { display: flex; flex-direction: column; padding: 24px; border: 1px solid #617376; border-radius: 12px; background: var(--panel); }
  .channel-number { color: var(--lime); font: 800 3.2rem Georgia, serif; }
  .continuation > strong { margin-top: 10px; }
  .continuation p { flex: 1; color: #bcc7c5; line-height: 1.55; }
  .continuation button { width: 100%; }

  .completion { width: min(840px, 100%); margin: 48px auto 0; padding: clamp(28px, 7vw, 62px); border: 1px solid #5d7376; border-radius: 16px; background: var(--panel); text-align: center; box-shadow: 12px 14px 0 #091113; }
  .signal-complete { display: flex; width: 120px; height: 85px; align-items: end; justify-content: center; gap: 5px; margin: auto; }
  .signal-complete i { width: 8px; background: var(--lime); }
  .signal-complete i:nth-child(1) { height: 20px; }
  .signal-complete i:nth-child(2) { height: 40px; }
  .signal-complete i:nth-child(3) { height: 60px; }
  .signal-complete b { display: grid; width: 50px; height: 50px; place-items: center; margin-left: 8px; border-radius: 50%; color: var(--ink); background: var(--lime); font-size: 1.5rem; }
  .completion h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); }
  .completion > p { color: #c4cecc; line-height: 1.65; }
  .completion ul { display: grid; gap: 8px; margin: 26px 0; padding: 0; list-style: none; text-align: left; }
  .completion li { display: grid; grid-template-columns: 25px minmax(100px, .4fr) 1fr; gap: 9px; padding: 12px; border: 1px solid #4a6265; background: #192f33; }
  .completion li span { color: var(--lime); }
  .completion li small { color: #aebcba; }
  .privacy { font-size: .78rem; }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }

  @media (max-width: 790px) {
    .intro,
    .mission-grid,
    .success-grid { grid-template-columns: 1fr; }
    .intro-console { min-height: 250px; box-shadow: 8px 9px 0 #091113; }
    .direct-channel { grid-template-columns: 1fr; }
  }

  @media (max-width: 470px) {
    .legacy-root { padding: 9px 11px 34px; }
    .radio-header small { display: none; }
    .radio-header strong { font-size: .9rem; }
    .counter { font-size: .6rem; }
    .intro { padding: 32px 0; }
    .intro-console { display: none; }
    .intro-copy h1 { font-size: 2.55rem; }
    .radio-rule { display: grid; grid-template-columns: 1fr; text-align: center; }
    .radio-rule b { display: none; }
    .call-strip { display: grid; }
    .call-strip small { margin-left: 0; }
    .mission-grid { padding: 10px; }
    .briefing,
    .composer { padding: 15px; }
    fieldset { grid-template-columns: 1fr; }
    .feedback,
    .completion { box-shadow: 5px 6px 0 #091113; }
    .feedback { padding: 18px 14px; }
    .feedback h1 { margin: 8px 0; font-size: 1.85rem; }
    .feedback > p:not(.eyebrow) { margin: 8px 0; line-height: 1.5; }
    .feedback blockquote { margin: 10px 0; padding: 10px; }
    .pattern-note { margin: 10px 0; padding: 10px; }
    .completion { padding: 20px 14px; }
    .completion h1 { margin: 8px 0; font-size: 2rem; }
    .completion > p { margin: 8px 0; }
    .completion ul { margin: 14px 0; }
    .completion li { grid-template-columns: 23px 1fr; padding: 8px; }
    .completion li small { grid-column: 2; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after { transition: none !important; animation: none !important; transform: none !important; scroll-behavior: auto !important; }
  }
</style>
