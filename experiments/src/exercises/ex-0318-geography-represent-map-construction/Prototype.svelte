<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Choice = 'incorrect' | 'correct';

  type MapCase = {
    id: string;
    theme: string;
    place: string;
    observation: string;
    gaze: string;
    correctNorth: string;
    wrongNorth: string;
    anchor: string;
    target: string;
    correctPosition: string;
    wrongPosition: string;
    northCorrection: string;
    positionCorrection: string;
    scaffold: string;
    correctFeedback: string;
    rule: string;
  };

  const cases: MapCase[] = [
    {
      id: 'station-north',
      theme: 'Échanges · Calque 01',
      place: 'Sortie de la gare',
      observation: 'Tu regardes vers le nord. La fontaine est devant toi. La bibliothèque est à droite de la fontaine.',
      gaze: 'Le haut du calque suit ton regard : nord.',
      correctNorth: 'Flèche N en haut du calque',
      wrongNorth: 'Flèche N en bas du calque',
      anchor: 'fontaine',
      target: 'bibliothèque',
      correctPosition: 'Bibliothèque à droite de la fontaine',
      wrongPosition: 'Bibliothèque à gauche de la fontaine',
      northCorrection: 'Tu regardes déjà vers le nord : sur ce calque, la flèche N doit donc pointer vers le haut.',
      positionCorrection: 'Depuis ton point de vue, la bibliothèque est annoncée à droite de la fontaine : elle doit rester à droite sur le calque.',
      scaffold: 'Pose mentalement le haut du calque devant toi. Dans quelle direction regardes-tu ? Puis relis le mot « droite ».',
      correctFeedback: 'Le haut suit le regard vers le nord, donc N est en haut. La bibliothèque reste à droite de la fontaine : les deux relations du terrain sont conservées.',
      rule: 'regard nord → N en haut ; droite reste droite'
    },
    {
      id: 'garden-south',
      theme: 'Loisirs · Calque 02',
      place: 'Entrée des jardins',
      observation: 'Tu regardes vers le sud. La passerelle est devant toi. Le terrain de sport est à gauche de la passerelle.',
      gaze: 'Le haut du calque suit ton regard : sud.',
      correctNorth: 'Flèche N en bas du calque',
      wrongNorth: 'Flèche N en haut du calque',
      anchor: 'passerelle',
      target: 'terrain de sport',
      correctPosition: 'Terrain à gauche de la passerelle',
      wrongPosition: 'Terrain à droite de la passerelle',
      northCorrection: 'Le haut suit le regard vers le sud. Le nord se trouve dans la direction opposée : en bas du calque.',
      positionCorrection: 'Le terrain est à gauche quand tu regardes la passerelle. Le calque suit ce même regard : le terrain reste à gauche.',
      scaffold: 'Le nord est opposé au sud. Place d’abord N, puis garde tes épaules tournées vers le haut du calque pour retrouver la gauche.',
      correctFeedback: 'Le nord est opposé au regard vers le sud : N passe en bas. Le terrain décrit à gauche reste à gauche de la passerelle.',
      rule: 'regard sud → N en bas ; gauche reste gauche'
    },
    {
      id: 'school-east',
      theme: 'Approvisionnement · Calque 03',
      place: 'Sortie de l’école',
      observation: 'Tu regardes vers l’est. La fontaine est devant toi. Le marché est à droite de la fontaine.',
      gaze: 'Le haut du calque suit ton regard : est.',
      correctNorth: 'Flèche N à gauche du calque',
      wrongNorth: 'Flèche N à droite du calque',
      anchor: 'fontaine',
      target: 'marché',
      correctPosition: 'Marché à droite de la fontaine',
      wrongPosition: 'Marché à gauche de la fontaine',
      northCorrection: 'Quand le haut du calque pointe vers l’est, le nord se trouve à gauche de cette direction.',
      positionCorrection: 'Le marché est décrit à droite de la fontaine depuis ce regard vers l’est : il doit rester à droite sur le calque.',
      scaffold: 'Pointe le haut vers l’est. Fais un quart de tour vers la gauche pour trouver le nord, puis reviens au mot « droite ».',
      correctFeedback: 'Le haut pointe vers l’est et le nord se place à gauche. Le marché reste à droite de la fontaine : le calque coordonne bien orientation et repère.',
      rule: 'regard est → N à gauche ; droite reste droite'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentCase = cases[0];
  let northChoice: Choice | null = null;
  let positionChoice: Choice | null = null;
  let submittedNorth = '';
  let submittedPosition = '';
  let incorrectDetail = '';
  let announcement = '';
  let stateFocusTarget: HTMLElement | null = null;
  let legacyState: 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' = 'ready';

  $: currentCase = cases[currentIndex];
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
    prepareCase();
    phase = 'active';
    announcement = 'Premier calque ouvert. Lis le regard, puis place le nord et le second repère.';
    void focusState();
  }

  function prepareCase(): void {
    northChoice = null;
    positionChoice = null;
    submittedNorth = '';
    submittedPosition = '';
    incorrectDetail = '';
  }

  function chooseNorth(choice: Choice): void {
    northChoice = choice;
    announcement = choice === 'correct' ? currentCase.correctNorth : currentCase.wrongNorth;
  }

  function choosePosition(choice: Choice): void {
    positionChoice = choice;
    announcement = choice === 'correct' ? currentCase.correctPosition : currentCase.wrongPosition;
  }

  function submitBuild(): void {
    if (!northChoice || !positionChoice) return;

    submittedNorth = northChoice === 'correct' ? currentCase.correctNorth : currentCase.wrongNorth;
    submittedPosition = positionChoice === 'correct'
      ? currentCase.correctPosition
      : currentCase.wrongPosition;

    if (northChoice === 'correct' && positionChoice === 'correct') {
      phase = 'correct';
      announcement = currentCase.correctFeedback;
    } else {
      incorrectDetail = northChoice === 'incorrect'
        ? currentCase.northCorrection
        : currentCase.positionCorrection;
      phase = 'incorrect';
      announcement = incorrectDetail;
    }
    void focusState();
  }

  function directSubmit(choice: Choice): void {
    northChoice = choice;
    positionChoice = choice;
    submitBuild();
  }

  function retry(): void {
    northChoice = null;
    positionChoice = null;
    phase = 'retry';
    announcement = `Indice : ${currentCase.scaffold}`;
    void focusState();
  }

  function continueWorkshop(): void {
    if (currentIndex === cases.length - 1) {
      phase = 'complete';
      announcement = 'Atelier terminé. Trois calques ont conservé le nord et les repères.';
      void focusState();
      return;
    }
    currentIndex += 1;
    prepareCase();
    phase = 'active';
    announcement = `${cases[currentIndex].theme} ouvert.`;
    void focusState();
  }

  function northPreview(): string {
    if (northChoice === 'correct') return currentCase.correctNorth;
    if (northChoice === 'incorrect') return currentCase.wrongNorth;
    return 'Flèche du nord à placer';
  }

  function positionPreview(): string {
    if (positionChoice === 'correct') return currentCase.correctPosition;
    if (positionChoice === 'incorrect') return currentCase.wrongPosition;
    return `${currentCase.target} à placer autour de ${currentCase.anchor}`;
  }
</script>

<svelte:head>
  <title>Le calque du quartier · EX-0318</title>
  <meta name="description" content="Construire trois schémas orientés à partir d’observations de terrain fictives." />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0318"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0318">
    <div class="page-shell">
      <header class="studio-header">
        <div class="logo" aria-hidden="true">N↟</div>
        <div><small>Atelier de représentation</small><strong>Le calque du quartier</strong></div>
        {#if phase !== 'intro' && phase !== 'complete'}
          <span>Calque {currentIndex + 1} / {cases.length}</span>
        {/if}
      </header>

      {#if phase === 'intro'}
        <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
          <div class="intro-copy">
            <p class="eyebrow">EX—0318 · Construire</p>
            <h1 id="intro-title">Un bon plan garde les relations, même quand la feuille tourne.</h1>
            <p>
              Pour trois lieux proches, le haut du calque suivra ton regard. Place d’abord la
              <strong>flèche du nord</strong>, puis un <strong>repère</strong> à gauche ou à droite.
            </p>
            <ol>
              <li><span>1</span>Repère la direction du regard.</li>
              <li><span>2</span>Place le nord sur la feuille.</li>
              <li><span>3</span>Place le second lieu et vérifie les deux relations.</li>
            </ol>
            <button type="button" class="primary" data-smoke-action="start" onclick={start}>
              Poser le premier calque
            </button>
          </div>
          <div class="intro-sheet" aria-hidden="true">
            <span class="north">N</span>
            <div class="cross"></div>
            <b>REPÈRE</b>
            <i>calque orienté</i>
          </div>
        </section>
      {:else if phase === 'active' || phase === 'retry'}
        <section
          class="workshop"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state={phase}
          data-smoke-variation={currentCase.id}
          aria-labelledby="case-title"
        >
          <div class="case-strip">
            <span>{currentCase.theme}</span><strong>{currentCase.place}</strong>
          </div>

          {#if phase === 'retry'}
            <aside class="scaffold" role="status">
              <strong><span aria-hidden="true">↺</span> Geste pour reconstruire</strong>
              <p>{currentCase.scaffold}</p>
            </aside>
          {/if}

          <div class="workspace-grid">
            <article class="field-note">
              <p class="eyebrow">Observation depuis le terrain</p>
              <h1 id="case-title">Regarde, puis transforme les phrases en relations.</h1>
              <blockquote>{currentCase.observation}</blockquote>
              <div class="gaze-card"><span aria-hidden="true">👁</span><strong>{currentCase.gaze}</strong></div>
              <p class="vocabulary"><b>Repère :</b> lieu facile à reconnaître et à retrouver sur le schéma.</p>
            </article>

            <article class="builder">
              <p class="eyebrow">Calque en construction</p>
              <fieldset>
                <legend>1. Où placer la flèche du nord ?</legend>
                <button
                  type="button"
                  class:selected={northChoice === 'incorrect'}
                  aria-pressed={northChoice === 'incorrect'}
                  data-smoke-attempt="incorrect"
                  data-smoke-step="1"
                  onclick={() => chooseNorth('incorrect')}
                >
                  <span>A</span>{currentCase.wrongNorth}
                </button>
                <button
                  type="button"
                  class:selected={northChoice === 'correct'}
                  aria-pressed={northChoice === 'correct'}
                  data-smoke-attempt="correct"
                  data-smoke-step="1"
                  onclick={() => chooseNorth('correct')}
                >
                  <span>B</span>{currentCase.correctNorth}
                </button>
              </fieldset>

              <fieldset>
                <legend>2. Où placer {currentCase.target} ?</legend>
                <button
                  type="button"
                  class:selected={positionChoice === 'incorrect'}
                  aria-pressed={positionChoice === 'incorrect'}
                  data-smoke-attempt="incorrect"
                  data-smoke-step="2"
                  onclick={() => choosePosition('incorrect')}
                >
                  <span>A</span>{currentCase.wrongPosition}
                </button>
                <button
                  type="button"
                  class:selected={positionChoice === 'correct'}
                  aria-pressed={positionChoice === 'correct'}
                  data-smoke-attempt="correct"
                  data-smoke-step="2"
                  onclick={() => choosePosition('correct')}
                >
                  <span>B</span>{currentCase.correctPosition}
                </button>
              </fieldset>

              <div class="preview" aria-live="polite">
                <span>Aperçu du calque</span>
                <div><b>N</b><p>{northPreview()}</p></div>
                <div><b>⌖</b><p>{positionPreview()}</p></div>
              </div>
              <button
                type="button"
                class="primary full"
                disabled={!northChoice || !positionChoice}
                data-smoke-action="submit"
                onclick={submitBuild}
              >
                Vérifier le calque
              </button>
            </article>
          </div>

          <aside class="complete-plans" aria-label="Alternative avec deux calques complets">
            <div><strong>Ou compare deux calques complets</strong><small>Mêmes relations, décision en un bouton large.</small></div>
            {#if currentIndex % 2 === 0}
              <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit('incorrect')}>
                {currentCase.wrongNorth} ; {currentCase.wrongPosition}.
              </button>
              <button type="button" data-smoke-answer="correct" onclick={() => directSubmit('correct')}>
                {currentCase.correctNorth} ; {currentCase.correctPosition}.
              </button>
            {:else}
              <button type="button" data-smoke-answer="correct" onclick={() => directSubmit('correct')}>
                {currentCase.correctNorth} ; {currentCase.correctPosition}.
              </button>
              <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit('incorrect')}>
                {currentCase.wrongNorth} ; {currentCase.wrongPosition}.
              </button>
            {/if}
          </aside>
        </section>
      {:else if phase === 'incorrect'}
        <section
          class="feedback wrong"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="incorrect"
          data-smoke-variation={currentCase.id}
          data-smoke-feedback="incorrect"
          data-smoke-feedback-detail="specific"
          role="status"
          aria-labelledby="feedback-title"
        >
          <div class="result-mark" aria-hidden="true">↺</div>
          <p class="eyebrow">Calque à reprendre</p>
          <h1 id="feedback-title">Une relation du terrain a changé sur la feuille.</h1>
          <div class="submitted"><span>{submittedNorth}</span><span>{submittedPosition}</span></div>
          <p>{incorrectDetail}</p>
          <button type="button" class="primary" data-smoke-action="retry" onclick={retry}>
            Reprendre avec un geste-guide
          </button>
        </section>
      {:else if phase === 'correct'}
        <div class="success-grid">
          <section
            class="feedback right"
            tabindex="-1"
            bind:this={stateFocusTarget}
            data-smoke-state="correct"
            data-smoke-variation={currentCase.id}
            data-smoke-feedback="correct"
            data-smoke-feedback-detail="specific"
            role="status"
            aria-labelledby="feedback-title"
          >
            <div class="result-mark" aria-hidden="true">✓</div>
            <p class="eyebrow">Relations conservées</p>
            <h1 id="feedback-title">Le terrain et le calque racontent le même espace.</h1>
            <div class="submitted"><span>{submittedNorth}</span><span>{submittedPosition}</span></div>
            <p>{currentCase.correctFeedback}</p>
            <div class="rule"><span>Relation à garder</span><strong>{currentCase.rule}</strong></div>
          </section>
          <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentCase.id}>
            <span>0{currentIndex + 1}</span>
            <strong>Calque lisible</strong>
            <p>Compare encore les deux relations, puis change de point de vue.</p>
            <button type="button" class="primary" data-smoke-action="continue" onclick={continueWorkshop}>
              {currentIndex === cases.length - 1 ? 'Fermer l’atelier' : 'Changer de point de vue'}
            </button>
          </aside>
        </div>
      {:else}
        <section
          class="completion"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="complete"
          data-smoke-completion
          aria-labelledby="complete-title"
        >
          <div class="compass" aria-hidden="true">N<br /><b>✓</b></div>
          <p class="eyebrow">Atelier terminé</p>
          <h1 id="complete-title">Trois calques ont gardé deux relations du terrain.</h1>
          <p>
            La stratégie à emporter : <strong>oriente d’abord la feuille avec le regard, place le nord,
            puis vérifie la position de chaque repère.</strong>
          </p>
          <ul>
            {#each cases as item}
              <li><span aria-hidden="true">✓</span><strong>{item.place}</strong><small>{item.rule}</small></li>
            {/each}
          </ul>
          <small>Aucune réponse n’a été enregistrée ni envoyée.</small>
        </section>
      {/if}

      <p class="sr-only" aria-live="polite">{announcement}</p>
    </div>
  </main>
</div>

<style>
  .legacy-smoke-root { display: contents; }

  .prototype-root,
  .prototype-root * { box-sizing: border-box; }

  .prototype-root {
    --ink: #19333a;
    --blue: #286a78;
    --coral: #d75b45;
    --yellow: #f2c85b;
    --paper: #fffdf5;
    --mist: #dbe8e5;
    --muted: #5c6c6d;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: linear-gradient(135deg, #dce8e5 0 50%, #cbdedb 50% 100%);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .page-shell { width: min(1160px, 100%); min-height: calc(100vh - 42px); margin: auto; padding: 15px clamp(12px, 3vw, 34px) 50px; }
  h1, p, blockquote, button { overflow-wrap: anywhere; }

  .studio-header { display: flex; min-height: 64px; align-items: center; gap: 12px; border-bottom: 2px solid var(--ink); }
  .logo { display: grid; width: 48px; height: 48px; place-items: center; border: 2px solid var(--ink); background: var(--yellow); box-shadow: 3px 3px 0 var(--ink); font-weight: 900; }
  .studio-header div:nth-child(2) { display: grid; }
  .studio-header small { color: var(--muted); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; }
  .studio-header strong { font-family: Georgia, serif; }
  .studio-header > span { margin-left: auto; font: 800 .7rem ui-monospace, monospace; }

  .eyebrow { margin: 0; color: var(--coral); font-size: .7rem; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
  .intro { display: grid; min-height: min(720px, calc(100vh - 120px)); grid-template-columns: minmax(0, 1.25fr) minmax(260px, .75fr); align-items: center; gap: clamp(30px, 7vw, 84px); padding: 52px 0; }
  .intro h1, .field-note h1, .feedback h1, .completion h1 { margin: 12px 0 18px; font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.035em; line-height: 1.03; }
  .intro h1 { font-size: clamp(2.8rem, 6vw, 5.8rem); }
  .intro-copy > p:not(.eyebrow) { max-width: 690px; color: var(--muted); line-height: 1.65; }
  .intro ol { display: grid; gap: 9px; margin: 26px 0; padding: 0; list-style: none; }
  .intro li { display: grid; grid-template-columns: 34px 1fr; align-items: center; gap: 10px; }
  .intro li span { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; color: white; background: var(--blue); font-weight: 900; }
  .intro-sheet { position: relative; display: grid; min-height: 420px; place-items: center; border: 2px solid var(--ink); background: rgba(255,253,245,.78); box-shadow: 14px 14px 0 var(--blue); transform: rotate(1.5deg); }
  .intro-sheet .north { position: absolute; top: 20px; left: 50%; font: 900 1.4rem Georgia, serif; }
  .cross { width: 62%; height: 62%; background: linear-gradient(90deg, transparent 49%, var(--ink) 49% 51%, transparent 51%), linear-gradient(transparent 49%, var(--ink) 49% 51%, transparent 51%); }
  .intro-sheet b { position: absolute; padding: 9px; border: 2px solid var(--ink); background: var(--yellow); }
  .intro-sheet i { position: absolute; bottom: 20px; font-size: .75rem; }

  button { min-height: 48px; border: 2px solid var(--ink); border-radius: 5px; color: var(--ink); background: var(--paper); font: inherit; font-weight: 760; cursor: pointer; }
  button:focus-visible, [tabindex="-1"]:focus { outline: 4px solid var(--coral); outline-offset: 3px; }
  button:disabled { opacity: .45; cursor: not-allowed; }
  .primary { padding: 12px 19px; color: white; background: var(--blue); box-shadow: 4px 4px 0 var(--ink); }
  .primary.full { width: 100%; margin-top: 14px; }

  .workshop { padding-top: 28px; }
  .case-strip { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 15px; color: white; background: var(--ink); }
  .case-strip span { font: 800 .68rem ui-monospace, monospace; text-transform: uppercase; }
  .case-strip strong { margin-left: auto; }
  .scaffold { margin: 15px 0; padding: 14px 17px; border-left: 7px solid var(--coral); background: #fff0c9; }
  .scaffold p { margin: 6px 0 0; line-height: 1.5; }

  .workspace-grid { display: grid; grid-template-columns: .88fr 1.12fr; gap: 17px; margin-top: 17px; }
  .field-note, .builder { min-width: 0; padding: clamp(18px, 4vw, 34px); border: 2px solid var(--ink); background: var(--paper); box-shadow: 7px 7px 0 rgba(25,51,58,.2); }
  .field-note h1 { font-size: clamp(2rem, 4vw, 3.5rem); }
  blockquote { margin: 24px 0; padding: 17px; border-left: 7px solid var(--coral); background: #f7e4d8; font: 500 1.15rem/1.55 Georgia, serif; }
  .gaze-card { display: flex; min-height: 72px; align-items: center; gap: 13px; padding: 13px; border: 1px dashed var(--blue); background: var(--mist); }
  .gaze-card span { font-size: 1.7rem; }
  .vocabulary { color: var(--muted); line-height: 1.5; }

  fieldset { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin: 15px 0; padding: 12px; border: 1px solid #a9b8b5; }
  legend { padding: 0 6px; font-weight: 850; }
  fieldset button { display: grid; min-height: 64px; grid-template-columns: 31px 1fr; align-items: center; gap: 9px; padding: 10px; text-align: left; }
  fieldset button span { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; color: white; background: var(--blue); font-size: .72rem; }
  fieldset button.selected { background: #d8ece8; box-shadow: inset 0 -5px 0 var(--blue); }
  .preview { min-height: 128px; padding: 13px; border: 2px dashed var(--blue); background: #eef5f2; }
  .preview > span { font-size: .65rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .preview div { display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 8px; }
  .preview p { margin: 7px 0; }

  .complete-plans { display: grid; grid-template-columns: minmax(145px, .55fr) 1fr 1fr; gap: 9px; margin-top: 16px; padding: 13px; border: 1px dashed var(--ink); background: rgba(255,253,245,.68); }
  .complete-plans > div { align-self: center; }
  .complete-plans strong, .complete-plans small { display: block; }
  .complete-plans small { margin-top: 4px; color: var(--muted); }
  .complete-plans button { padding: 11px; text-align: left; line-height: 1.35; }

  .feedback { width: min(850px, 100%); margin: 48px auto 0; padding: clamp(24px, 6vw, 54px); border: 2px solid var(--ink); background: var(--paper); box-shadow: 10px 10px 0 rgba(25,51,58,.28); }
  .feedback.wrong { border-top: 10px solid var(--coral); }
  .feedback.right { width: 100%; margin: 0; border-top: 10px solid var(--blue); }
  .result-mark { display: grid; width: 58px; height: 58px; place-items: center; border-radius: 50%; color: white; background: var(--coral); font-size: 1.7rem; font-weight: 900; }
  .right .result-mark { background: var(--blue); }
  .feedback h1 { font-size: clamp(2rem, 5vw, 3.9rem); }
  .feedback > p:not(.eyebrow) { color: var(--muted); line-height: 1.65; }
  .submitted { display: grid; gap: 7px; margin: 18px 0; }
  .submitted span { padding: 10px 12px; border-left: 5px solid var(--ink); background: var(--mist); }
  .rule { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding: 13px; background: #f7e5a9; }
  .rule span { font-size: .67rem; font-weight: 900; text-transform: uppercase; }

  .success-grid { display: grid; grid-template-columns: minmax(0, 1fr) 275px; gap: 17px; margin-top: 42px; }
  .continuation { display: flex; flex-direction: column; padding: 24px; border: 2px solid var(--ink); background: var(--yellow); box-shadow: 6px 6px 0 var(--ink); }
  .continuation > span { font: 800 3rem Georgia, serif; }
  .continuation > strong { margin-top: 8px; }
  .continuation p { flex: 1; line-height: 1.5; }
  .continuation button { width: 100%; }

  .completion { width: min(830px, 100%); margin: 48px auto 0; padding: clamp(27px, 7vw, 60px); border: 2px solid var(--ink); background: var(--paper); text-align: center; box-shadow: 12px 12px 0 var(--blue); }
  .compass { display: grid; width: 82px; height: 82px; place-items: center; margin: auto; border: 3px double white; border-radius: 50%; color: white; background: var(--blue); font-weight: 900; line-height: 1; }
  .completion h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); }
  .completion > p { line-height: 1.65; }
  .completion ul { display: grid; gap: 8px; margin: 25px 0; padding: 0; list-style: none; text-align: left; }
  .completion li { display: grid; grid-template-columns: 24px minmax(125px, .45fr) 1fr; gap: 9px; padding: 11px; background: var(--mist); }
  .completion li small { color: var(--muted); }
  .completion > small { color: var(--muted); }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }

  @media (max-width: 780px) {
    .intro, .workspace-grid, .success-grid { grid-template-columns: 1fr; }
    .intro-sheet { min-height: 230px; box-shadow: 7px 7px 0 var(--blue); }
    .complete-plans { grid-template-columns: 1fr; }
  }

  @media (max-width: 470px) {
    .page-shell { padding: 9px 11px 34px; }
    .studio-header small { display: none; }
    .studio-header strong { font-size: .86rem; }
    .studio-header > span { font-size: .6rem; }
    .intro { padding: 30px 0; }
    .intro h1 { font-size: 2.48rem; }
    .intro-sheet { display: none; }
    .case-strip { display: grid; }
    .case-strip strong { margin-left: 0; }
    .field-note, .builder { padding: 16px 13px; box-shadow: 4px 4px 0 rgba(25,51,58,.2); }
    fieldset { grid-template-columns: 1fr; }
    .feedback, .completion { padding: 19px 14px; box-shadow: 5px 5px 0 rgba(25,51,58,.25); }
    .feedback h1, .completion h1 { margin: 8px 0; font-size: 1.95rem; }
    .feedback > p:not(.eyebrow), .completion > p { margin: 8px 0; line-height: 1.5; }
    .completion ul { margin: 14px 0; }
    .completion li { grid-template-columns: 22px 1fr; padding: 8px; }
    .completion li small { grid-column: 2; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *, .prototype-root *::before, .prototype-root *::after {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      scroll-behavior: auto !important;
    }
  }
</style>
