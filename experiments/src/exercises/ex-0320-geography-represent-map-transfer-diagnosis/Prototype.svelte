<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Choice = 'incorrect' | 'correct';
  type ErrorFamily = 'TOOL_MISMATCH' | 'ORIENTATION_UNCHECKED' | 'REFERENCE_GAP' | null;

  type Mission = {
    id: string;
    theme: string;
    recipient: string;
    request: string;
    spatialAction: string;
    wrongTool: string;
    correctTool: string;
    wrongCheck: string;
    correctCheck: string;
    wrongFamily: Exclude<ErrorFamily, null>;
    proofFamily: Exclude<ErrorFamily, null>;
    incorrectFeedback: string;
    proofFeedback: string;
    scaffold: string;
    correctFeedback: string;
    formula: string;
  };

  const missions: Mission[] = [
    {
      id: 'delivery-localize',
      theme: 'Approvisionnement · Bon 01',
      recipient: 'Livreuse arrivée à la gare',
      request: 'Prépare un document pour localiser la maison communale dans le quartier, puis y aller par les rues.',
      spatialAction: 'Localiser un lieu et relier départ, rues et destination.',
      wrongTool: 'Une photo rapprochée de la façade de la maison communale',
      correctTool: 'Un plan simplifié du quartier montrant la gare, les rues et la maison communale',
      wrongCheck: 'Vérifier que les couleurs de la façade sont réalistes',
      correctCheck: 'Vérifier que la gare est nommée, le nord indiqué et la maison communale dans la légende',
      wrongFamily: 'TOOL_MISMATCH',
      proofFamily: 'REFERENCE_GAP',
      incorrectFeedback: '↺ La photo peut aider à reconnaître la façade une fois arrivée, mais elle ne montre ni la relation avec la gare ni les rues à suivre. Elle ne permet pas de localiser le lieu dans le quartier.',
      proofFeedback: '↺ Le plan contient les bons repères, mais ce contrôle porte seulement sur la couleur de la façade. Il ne vérifie ni le départ, ni l’orientation, ni le symbole de destination.',
      scaffold: 'La personne connaît son départ, mais pas la position de l’arrivée. Quel document montre les deux lieux et leurs relations ?',
      correctFeedback: '✓ Le plan représente le départ, le réseau de rues et la destination. Le repère nommé, le nord et la légende permettent à la livreuse de relier le document au quartier.',
      formula: 'localiser → plan + départ nommé + nord + légende'
    },
    {
      id: 'festival-orient',
      theme: 'Loisirs · Bon 02',
      recipient: 'Équipe du poste de secours',
      request: 'Prépare le plan temporaire du festival pour placer le poste au nord de l’entrée principale.',
      spatialAction: 'Orienter une position par rapport à une entrée commune.',
      wrongTool: 'Le plan des stands et de l’entrée, mais sans aucune flèche du nord',
      correctTool: 'Le plan des stands avec l’entrée principale nommée et une flèche du nord',
      wrongCheck: 'Vérifier seulement que le poste de secours est dessiné en grand',
      correctCheck: 'Vérifier que la flèche du nord permet de placer le poste au bon côté de l’entrée',
      wrongFamily: 'ORIENTATION_UNCHECKED',
      proofFamily: 'ORIENTATION_UNCHECKED',
      incorrectFeedback: '↺ Le document montre les stands, mais sans orientation « au nord de l’entrée » ne correspond à aucun côté vérifiable de la page. La taille du symbole ne remplace pas une flèche du nord.',
      proofFeedback: '↺ Le plan peut être orienté, mais un grand symbole ne prouve pas sa position au nord de l’entrée. Le contrôle doit comparer la flèche du nord et les deux repères.',
      scaffold: 'Imagine que le plan soit tourné sur une table. Quel élément permet encore de reconnaître le côté nord de l’entrée ?',
      correctFeedback: '✓ L’entrée fournit le repère commun et la flèche donne l’orientation. L’équipe peut vérifier que le symbole du poste se trouve au nord de l’entrée, quelle que soit la rotation de la feuille.',
      formula: 'orienter → repère commun + flèche du nord'
    },
    {
      id: 'reservoir-route',
      theme: 'Échanges · Bon 03',
      recipient: 'Technicienne qui ne connaît pas le village',
      request: 'Prépare un croquis pour suivre le chemin depuis l’arrêt du village jusqu’au petit réservoir.',
      spatialAction: 'Suivre un itinéraire avec un départ et une arrivée non ambigus.',
      wrongTool: 'Un tracé du chemin et du réservoir sans nommer l’arrêt de départ',
      correctTool: 'Un croquis d’itinéraire avec l’arrêt nommé, les bifurcations et le réservoir légendé',
      wrongCheck: 'Vérifier seulement que le trait du chemin est foncé',
      correctCheck: 'Vérifier que le départ et l’arrivée sont nommés et que chaque bifurcation possède un repère',
      wrongFamily: 'REFERENCE_GAP',
      proofFamily: 'REFERENCE_GAP',
      incorrectFeedback: '↺ Le chemin peut être visible, mais une personne absente ne sait pas où commencer. Sans arrêt nommé, le tracé ne relie pas un départ partagé au réservoir.',
      proofFeedback: '↺ Le croquis proposé contient le départ, les bifurcations et l’arrivée. Mais contrôler seulement l’épaisseur du trait ne vérifie aucun de ces repères nécessaires au trajet.',
      scaffold: 'Avant de suivre le premier trait, quelle information doit permettre aux deux personnes de parler du même point de départ ?',
      correctFeedback: '✓ Le croquis nomme le départ et l’arrivée et ajoute un repère à chaque choix de chemin. La technicienne peut relier les instructions au terrain sans connaître le village.',
      formula: 'suivre → départ nommé + bifurcations repérées + arrivée légendée'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentMission = missions[0];
  let toolChoice: Choice | null = null;
  let checkChoice: Choice | null = null;
  let submittedTool = '';
  let submittedCheck = '';
  let responsePath: string[] = [];
  let errorFamily: ErrorFamily = null;
  let lastFeedback = '';
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
    prepareMission();
    phase = 'active';
    announcement = 'Premier bon ouvert. Choisis un outil, puis un contrôle de lisibilité.';
    void focusState();
  }

  function prepareMission(): void {
    toolChoice = null;
    checkChoice = null;
    submittedTool = '';
    submittedCheck = '';
    errorFamily = null;
    lastFeedback = '';
  }

  function chooseTool(choice: Choice): void {
    toolChoice = choice;
    announcement = `Outil choisi : ${choice === 'correct' ? currentMission.correctTool : currentMission.wrongTool}.`;
  }

  function chooseCheck(choice: Choice): void {
    checkChoice = choice;
    announcement = `Contrôle choisi : ${choice === 'correct' ? currentMission.correctCheck : currentMission.wrongCheck}.`;
  }

  function submitOrder(): void {
    if (!toolChoice || !checkChoice) return;

    submittedTool = toolChoice === 'correct' ? currentMission.correctTool : currentMission.wrongTool;
    submittedCheck = checkChoice === 'correct' ? currentMission.correctCheck : currentMission.wrongCheck;
    responsePath = [
      ...responsePath,
      `${currentMission.id}:${submittedTool}|${submittedCheck}`
    ];

    if (toolChoice === 'correct' && checkChoice === 'correct') {
      errorFamily = null;
      lastFeedback = currentMission.correctFeedback;
      phase = 'correct';
    } else {
      errorFamily = toolChoice === 'incorrect' ? currentMission.wrongFamily : currentMission.proofFamily;
      lastFeedback = toolChoice === 'incorrect'
        ? currentMission.incorrectFeedback
        : currentMission.proofFeedback;
      phase = 'incorrect';
    }
    announcement = lastFeedback;
    void focusState();
  }

  function directSubmit(choice: Choice): void {
    toolChoice = choice;
    checkChoice = choice;
    submitOrder();
  }

  function retry(): void {
    toolChoice = null;
    checkChoice = null;
    phase = 'retry';
    announcement = `Fiche de reprise : ${currentMission.scaffold}`;
    void focusState();
  }

  function continueDesk(): void {
    if (currentIndex === missions.length - 1) {
      phase = 'complete';
      announcement = 'Bureau fermé. Trois demandes ont reçu un outil lisible.';
      void focusState();
      return;
    }
    currentIndex += 1;
    prepareMission();
    phase = 'active';
    announcement = `${missions[currentIndex].theme} ouvert. Une nouvelle personne attend un document.`;
    void focusState();
  }

  function toolPreview(): string {
    if (toolChoice === 'correct') return currentMission.correctTool;
    if (toolChoice === 'incorrect') return currentMission.wrongTool;
    return 'Outil à choisir';
  }

  function checkPreview(): string {
    if (checkChoice === 'correct') return currentMission.correctCheck;
    if (checkChoice === 'incorrect') return currentMission.wrongCheck;
    return 'Contrôle à choisir';
  }

  function responseDescription(): string {
    if (errorFamily === 'ORIENTATION_UNCHECKED') {
      return 'La paire soumise n’établit ou ne vérifie pas encore le lien entre la direction de la page et la direction demandée.';
    }
    if (errorFamily === 'REFERENCE_GAP') {
      return 'La paire soumise n’établit ou ne vérifie pas encore le repère commun nécessaire pour commencer.';
    }
    return 'Le document choisi ne représente pas la relation spatiale nécessaire à cette demande.';
  }
</script>

<svelte:head>
  <title>Le bureau des cartes utiles · EX-0320</title>
  <meta name="description" content="Choisir des outils géographiques et contrôler leur lisibilité dans trois demandes nouvelles." />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0320"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0320">
    <div class="page-shell">
      <header class="office-header">
        <div class="seal" aria-hidden="true">CARTE</div>
        <div><small>Service local des représentations</small><strong>Le bureau des cartes utiles</strong></div>
        {#if phase !== 'intro' && phase !== 'complete'}
          <span>Bon {currentIndex + 1} / {missions.length}</span>
        {/if}
      </header>

      {#if phase === 'intro'}
        <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
          <div class="intro-copy">
            <p class="eyebrow">EX—0320 · Mission nouvelle</p>
            <h1 id="intro-title">Une carte est utile si une autre personne peut y retrouver les bons repères.</h1>
            <p>
              Trois personnes absentes attendent un document. Pour chaque demande, choisis
              <strong>l’outil</strong> qui montre la bonne relation, puis le <strong>contrôle</strong>
              qui permet de vérifier son orientation ou ses repères.
            </p>
            <div class="formula">
              <span>DEMANDE</span><b aria-hidden="true">＋</b><span>OUTIL</span><b aria-hidden="true">＋</b><span>CONTRÔLE</span>
            </div>
            <p class="controls">Tous les bons se composent avec des boutons larges. Aucun résultat n’est envoyé.</p>
            <button type="button" class="primary" data-smoke-action="start" onclick={start}>
              Ouvrir le bureau
            </button>
          </div>
          <div class="filing-box" aria-hidden="true">
            <span>BONS<br />DE<br />CARTE</span>
            <div><i></i><i></i><i></i></div>
            <b>LOCALISER · ORIENTER · SUIVRE</b>
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
          <div class="ticket-strip">
            <span>{currentMission.theme}</span><strong>{currentMission.recipient}</strong>
          </div>

          {#if phase === 'retry'}
            <aside class="scaffold" role="status">
              <strong><span aria-hidden="true">↺</span> Fiche de reprise</strong>
              <p>{currentMission.scaffold}</p>
            </aside>
          {/if}

          <div class="mission-grid">
            <article class="request-card">
              <p class="eyebrow">Demande reçue</p>
              <h1 id="mission-title">{currentMission.request}</h1>
              <div class="action-note"><span>Action spatiale nécessaire</span><strong>{currentMission.spatialAction}</strong></div>
              <p class="question">Le document doit fonctionner pour une personne qui n’est pas devant cet écran.</p>
            </article>

            <article class="order-card">
              <p class="eyebrow">Composer le bon</p>
              <fieldset>
                <legend>1. Choisir l’outil</legend>
                <button
                  type="button"
                  class:selected={toolChoice === 'incorrect'}
                  aria-pressed={toolChoice === 'incorrect'}
                  data-smoke-attempt="incorrect"
                  data-smoke-step="1"
                  onclick={() => chooseTool('incorrect')}
                >
                  <span>A</span>{currentMission.wrongTool}
                </button>
                <button
                  type="button"
                  class:selected={toolChoice === 'correct'}
                  aria-pressed={toolChoice === 'correct'}
                  data-smoke-attempt="correct"
                  data-smoke-step="1"
                  onclick={() => chooseTool('correct')}
                >
                  <span>B</span>{currentMission.correctTool}
                </button>
              </fieldset>

              <fieldset>
                <legend>2. Choisir le contrôle de lisibilité</legend>
                <button
                  type="button"
                  class:selected={checkChoice === 'incorrect'}
                  aria-pressed={checkChoice === 'incorrect'}
                  data-smoke-attempt="incorrect"
                  data-smoke-step="2"
                  onclick={() => chooseCheck('incorrect')}
                >
                  <span>A</span>{currentMission.wrongCheck}
                </button>
                <button
                  type="button"
                  class:selected={checkChoice === 'correct'}
                  aria-pressed={checkChoice === 'correct'}
                  data-smoke-attempt="correct"
                  data-smoke-step="2"
                  onclick={() => chooseCheck('correct')}
                >
                  <span>B</span>{currentMission.correctCheck}
                </button>
              </fieldset>

              <div class="order-preview" aria-live="polite">
                <span>Bon en préparation</span>
                <p><b>Outil :</b> {toolPreview()}</p>
                <p><b>Contrôle :</b> {checkPreview()}</p>
              </div>
              <button
                type="button"
                class="primary full"
                disabled={!toolChoice || !checkChoice}
                data-smoke-action="submit"
                onclick={submitOrder}
              >
                Examiner ce bon
              </button>
            </article>
          </div>

          <aside class="complete-orders" aria-label="Alternative avec deux bons complets">
            <div><strong>Ou compare deux bons complets</strong><small>Même demande, outil et contrôle réunis.</small></div>
            {#if currentIndex % 2 === 0}
              <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit('incorrect')}>
                <b>{currentMission.wrongTool}</b><br />Contrôle : {currentMission.wrongCheck}
              </button>
              <button type="button" data-smoke-answer="correct" onclick={() => directSubmit('correct')}>
                <b>{currentMission.correctTool}</b><br />Contrôle : {currentMission.correctCheck}
              </button>
            {:else}
              <button type="button" data-smoke-answer="correct" onclick={() => directSubmit('correct')}>
                <b>{currentMission.correctTool}</b><br />Contrôle : {currentMission.correctCheck}
              </button>
              <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit('incorrect')}>
                <b>{currentMission.wrongTool}</b><br />Contrôle : {currentMission.wrongCheck}
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
          data-smoke-variation={currentMission.id}
          data-smoke-feedback="incorrect"
          data-smoke-feedback-detail="specific"
          role="status"
          aria-labelledby="feedback-title"
        >
          <div class="result-stamp" aria-hidden="true">↺</div>
          <p class="eyebrow">Bon à clarifier</p>
          <h1 id="feedback-title">Ce bon ne permet pas encore de vérifier la relation spatiale demandée.</h1>
          <div class="submitted-order"><p><b>Outil :</b> {submittedTool}</p><p><b>Contrôle :</b> {submittedCheck}</p></div>
          <p>{lastFeedback}</p>
          <div class="pattern-note">
            <span>Ce que montre cette réponse</span>
            <p>{responseDescription()}</p>
          </div>
          <button type="button" class="primary" data-smoke-action="retry" onclick={retry}>
            Recomposer avec une fiche
          </button>
        </section>
      {:else if phase === 'correct'}
        <div class="success-grid">
          <section
            class="feedback right"
            tabindex="-1"
            bind:this={stateFocusTarget}
            data-smoke-state="correct"
            data-smoke-variation={currentMission.id}
            data-smoke-feedback="correct"
            data-smoke-feedback-detail="specific"
            role="status"
            aria-labelledby="feedback-title"
          >
            <div class="result-stamp" aria-hidden="true">✓</div>
            <p class="eyebrow">Bon utilisable</p>
            <h1 id="feedback-title">L’outil et le contrôle répondent à la même demande.</h1>
            <div class="submitted-order"><p><b>Outil :</b> {submittedTool}</p><p><b>Contrôle :</b> {submittedCheck}</p></div>
            <p>{currentMission.correctFeedback}</p>
            <div class="decision"><span>Décision à garder</span><strong>{currentMission.formula}</strong></div>
          </section>
          <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentMission.id}>
            <span>VALIDÉ<br />0{currentIndex + 1}</span>
            <p>Le bon reste visible. Continue quand tu as fini de comparer demande, outil et contrôle.</p>
            <button type="button" class="primary" data-smoke-action="continue" onclick={continueDesk}>
              {currentIndex === missions.length - 1 ? 'Fermer le bureau' : 'Prendre le bon suivant'}
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
          <div class="archive-mark" aria-hidden="true">3<br />✓</div>
          <p class="eyebrow">Bureau fermé</p>
          <h1 id="complete-title">Trois personnes ont reçu une représentation adaptée et vérifiable.</h1>
          <p>
            La stratégie à garder : <strong>identifier la relation nécessaire, choisir l’outil qui la montre,
            puis vérifier orientation, repère et légende.</strong>
          </p>
          <ul>
            {#each missions as item}
              <li><span aria-hidden="true">✓</span><strong>{item.recipient}</strong><small>{item.formula}</small></li>
            {/each}
          </ul>
          <small>Le chemin de réponse est resté dans ce composant. Rien n’a été enregistré ni envoyé.</small>
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
    --ink: #202a2e;
    --navy: #263e59;
    --green: #31735f;
    --orange: #d7683e;
    --paper: #f8f4e7;
    --folder: #dec981;
    --muted: #5f696b;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: linear-gradient(rgba(38,62,89,.055) 1px, transparent 1px), #cfd8d3;
    background-size: 100% 28px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .page-shell { width: min(1160px, 100%); min-height: calc(100vh - 42px); margin: auto; padding: 15px clamp(12px, 3vw, 34px) 50px; }
  h1, p, button { overflow-wrap: anywhere; }

  .office-header { display: flex; min-height: 65px; align-items: center; gap: 12px; padding: 7px 11px; border: 2px solid var(--ink); background: var(--paper); }
  .seal { display: grid; width: 50px; height: 50px; place-items: center; border: 3px double white; border-radius: 50%; color: white; background: var(--green); font-size: .58rem; font-weight: 900; }
  .office-header div:nth-child(2) { display: grid; }
  .office-header small { color: var(--muted); font-size: .64rem; letter-spacing: .1em; text-transform: uppercase; }
  .office-header strong { font-family: Georgia, serif; }
  .office-header > span { margin-left: auto; font: 800 .7rem ui-monospace, monospace; }

  .eyebrow { margin: 0; color: var(--orange); font-size: .7rem; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
  .intro { display: grid; min-height: min(720px, calc(100vh - 122px)); grid-template-columns: minmax(0, 1.22fr) minmax(250px, .78fr); align-items: center; gap: clamp(30px, 7vw, 84px); padding: 52px 0; }
  .intro h1, .request-card h1, .feedback h1, .completion h1 { margin: 12px 0 18px; font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.035em; line-height: 1.03; }
  .intro h1 { font-size: clamp(2.8rem, 6vw, 5.75rem); }
  .intro-copy > p:not(.eyebrow) { max-width: 710px; color: var(--muted); line-height: 1.65; }
  .formula { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 25px 0; }
  .formula span { padding: 9px 11px; border: 2px solid var(--navy); background: var(--paper); font: 800 .72rem ui-monospace, monospace; }
  .controls { font-size: .8rem; }
  .filing-box { display: grid; min-height: 415px; place-items: center; padding: 28px; border: 3px solid var(--ink); background: var(--folder); box-shadow: 15px 16px 0 var(--navy); transform: rotate(1deg); }
  .filing-box > span { padding: 15px; border: 3px double var(--ink); font: 800 2rem/1.05 Georgia, serif; text-align: center; }
  .filing-box div { display: flex; gap: 8px; }
  .filing-box i { width: 42px; height: 55px; border: 2px solid var(--ink); background: var(--paper); }
  .filing-box > b { font-size: .7rem; letter-spacing: .08em; text-align: center; }

  button { min-height: 48px; border: 2px solid var(--ink); border-radius: 3px; color: var(--ink); background: var(--paper); font: inherit; font-weight: 760; cursor: pointer; }
  button:focus-visible, [tabindex="-1"]:focus { outline: 4px solid var(--orange); outline-offset: 3px; }
  button:disabled { opacity: .45; cursor: not-allowed; }
  .primary { padding: 12px 19px; color: white; background: var(--navy); box-shadow: 4px 4px 0 var(--ink); }
  .primary.full { width: 100%; margin-top: 14px; }

  .mission { padding-top: 27px; }
  .ticket-strip { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 15px; color: white; background: var(--navy); }
  .ticket-strip span { font: 800 .68rem ui-monospace, monospace; text-transform: uppercase; }
  .ticket-strip strong { margin-left: auto; }
  .scaffold { margin: 15px 0; padding: 14px 17px; border-left: 7px solid var(--orange); background: #fff0c9; }
  .scaffold p { margin: 6px 0 0; line-height: 1.5; }

  .mission-grid { display: grid; grid-template-columns: .78fr 1.22fr; gap: 16px; margin-top: 16px; }
  .request-card, .order-card { min-width: 0; padding: clamp(18px, 4vw, 34px); border: 2px solid var(--ink); background: var(--paper); box-shadow: 7px 7px 0 rgba(32,42,46,.2); }
  .request-card h1 { font-size: clamp(2rem, 4vw, 3.45rem); }
  .action-note { display: grid; gap: 7px; margin: 24px 0; padding: 14px; border-left: 7px solid var(--green); background: #dbe9df; }
  .action-note span { font-size: .66rem; font-weight: 900; text-transform: uppercase; }
  .question { color: var(--muted); line-height: 1.55; }

  fieldset { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin: 15px 0; padding: 12px; border: 1px solid #a7afab; }
  legend { padding: 0 6px; font-weight: 850; }
  fieldset button { display: grid; min-height: 70px; grid-template-columns: 31px 1fr; align-items: center; gap: 9px; padding: 10px; text-align: left; line-height: 1.35; }
  fieldset button span { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; color: white; background: var(--navy); font-size: .72rem; }
  fieldset button.selected { background: #dce8e2; box-shadow: inset 0 -5px 0 var(--green); }
  .order-preview { min-height: 150px; padding: 13px; border: 2px dashed var(--navy); background: #e9ece7; }
  .order-preview > span { font-size: .66rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .order-preview p { margin: 8px 0; line-height: 1.4; }

  .complete-orders { display: grid; grid-template-columns: minmax(145px, .5fr) 1fr 1fr; gap: 9px; margin-top: 15px; padding: 13px; border: 1px dashed var(--ink); background: rgba(248,244,231,.8); }
  .complete-orders > div { align-self: center; }
  .complete-orders strong, .complete-orders small { display: block; }
  .complete-orders small { margin-top: 4px; color: var(--muted); }
  .complete-orders button { padding: 11px; text-align: left; line-height: 1.35; }

  .feedback { width: min(880px, 100%); margin: 48px auto 0; padding: clamp(24px, 6vw, 54px); border: 2px solid var(--ink); background: var(--paper); box-shadow: 10px 11px 0 rgba(32,42,46,.25); }
  .feedback.wrong { border-top: 10px solid var(--orange); }
  .feedback.right { width: 100%; margin: 0; border-top: 10px solid var(--green); }
  .result-stamp { display: grid; width: 62px; height: 62px; place-items: center; border: 3px double white; border-radius: 50%; color: white; background: var(--orange); font-size: 1.7rem; font-weight: 900; }
  .right .result-stamp { background: var(--green); }
  .feedback h1 { font-size: clamp(2rem, 5vw, 3.85rem); }
  .feedback > p:not(.eyebrow) { color: var(--muted); line-height: 1.65; }
  .submitted-order { display: grid; gap: 6px; margin: 18px 0; padding: 13px; border-left: 6px solid var(--navy); background: #e7e9e4; }
  .submitted-order p { margin: 3px 0; line-height: 1.45; }
  .pattern-note { margin: 17px 0; padding: 13px; border: 1px solid #c89d76; background: #fff0d5; }
  .pattern-note span { font-size: .66rem; font-weight: 900; text-transform: uppercase; }
  .pattern-note p { margin: 6px 0 0; }
  .decision { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 9px; padding: 13px; background: #d8eadf; }
  .decision span { font-size: .67rem; font-weight: 900; text-transform: uppercase; }

  .success-grid { display: grid; grid-template-columns: minmax(0, 1fr) 285px; gap: 16px; margin-top: 42px; }
  .continuation { display: flex; flex-direction: column; padding: 24px; background: var(--folder); box-shadow: 6px 7px 0 var(--ink); }
  .continuation > span { padding: 9px; border: 3px double var(--ink); font: 900 1rem/1.25 ui-monospace, monospace; text-align: center; transform: rotate(-2deg); }
  .continuation p { flex: 1; line-height: 1.55; }
  .continuation button { width: 100%; }

  .completion { width: min(850px, 100%); margin: 48px auto 0; padding: clamp(27px, 7vw, 60px); border: 2px solid var(--ink); background: var(--paper); text-align: center; box-shadow: 12px 13px 0 var(--navy); }
  .archive-mark { display: grid; width: 80px; height: 80px; place-items: center; margin: auto; border-radius: 50%; color: white; background: var(--green); font-weight: 900; line-height: 1; }
  .completion h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); }
  .completion > p { line-height: 1.65; }
  .completion ul { display: grid; gap: 8px; margin: 24px 0; padding: 0; list-style: none; text-align: left; }
  .completion li { display: grid; grid-template-columns: 23px minmax(170px, .52fr) 1fr; gap: 9px; padding: 11px; background: #e7ebe6; }
  .completion li small, .completion > small { color: var(--muted); }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }

  @media (max-width: 780px) {
    .intro, .mission-grid, .success-grid { grid-template-columns: 1fr; }
    .filing-box { min-height: 230px; box-shadow: 7px 8px 0 var(--navy); }
    .complete-orders { grid-template-columns: 1fr; }
  }

  @media (max-width: 470px) {
    .page-shell { padding: 9px 11px 34px; }
    .office-header small { display: none; }
    .office-header strong { font-size: .83rem; }
    .office-header > span { font-size: .59rem; }
    .intro { padding: 30px 0; }
    .filing-box { display: none; }
    .intro h1 { font-size: 2.45rem; }
    .formula { display: grid; grid-template-columns: 1fr; text-align: center; }
    .formula b { display: none; }
    .ticket-strip { display: grid; }
    .ticket-strip strong { margin-left: 0; }
    .request-card, .order-card { padding: 16px 13px; box-shadow: 4px 4px 0 rgba(32,42,46,.2); }
    fieldset { grid-template-columns: 1fr; }
    .feedback, .completion { padding: 19px 14px; box-shadow: 5px 5px 0 rgba(32,42,46,.23); }
    .feedback h1, .completion h1 { margin: 8px 0; font-size: 1.9rem; }
    .feedback > p:not(.eyebrow), .completion > p { margin: 8px 0; line-height: 1.5; }
    .submitted-order, .pattern-note { margin: 10px 0; padding: 10px; }
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
