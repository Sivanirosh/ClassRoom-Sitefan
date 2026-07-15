<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Choice = 'incorrect' | 'correct';

  type BuildCase = {
    id: string;
    term: string;
    chapter: string;
    context: string;
    sketchLabel: string;
    sketchSymbol: string;
    prompt: string;
    incorrectAction: string;
    correctAction: string;
    incorrectDefinition: string;
    correctDefinition: string;
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
    formula: string;
  };

  const cases: BuildCase[] = [
    {
      id: 'stops-network',
      term: 'réseau',
      chapter: 'Relier des lieux',
      context: 'Trois arrêts de quartiers voisins sont reliés par les mêmes lignes de bus.',
      sketchLabel: 'Schéma : trois arrêts reliés, A — B — C',
      sketchSymbol: 'A ━━━ B ━━━ C',
      prompt: 'Quelle action construit le sens du mot « réseau » ici ?',
      incorrectAction: 'sépare un espace en deux parties',
      correctAction: 'relie plusieurs lieux entre eux',
      incorrectDefinition: 'Un réseau sépare un espace en deux parties.',
      correctDefinition: 'Un réseau relie plusieurs lieux entre eux.',
      incorrectFeedback: '↺ La ligne choisie ne ferme aucune partie : elle passe par A, B et C. Ici, le réseau sert à relier plusieurs lieux pour circuler entre eux.',
      scaffold: 'Suis la ligne avec le doigt ou le regard : arrive-t-elle à un bord, ou passe-t-elle par plusieurs arrêts ?',
      correctFeedback: '✓ « Réseau » convient : les lignes relient les trois arrêts. Le mot nomme un ensemble de lieux connectés, pas une séparation.',
      formula: 'réseau = lieux + liaisons'
    },
    {
      id: 'garden-boundary',
      term: 'limite',
      chapter: 'Marquer un changement',
      context: 'Une ligne en pointillés montre où le quartier se termine et où commencent les jardins.',
      sketchLabel: 'Schéma : quartier, ligne en pointillés, jardins',
      sketchSymbol: 'QUARTIER  · · · · ·  JARDINS',
      prompt: 'Quelle action construit le sens du mot « limite » ici ?',
      incorrectAction: 'organise des trajets entre plusieurs arrêts',
      correctAction: 'marque le passage d’un espace à un autre',
      incorrectDefinition: 'Une limite organise des trajets entre plusieurs arrêts.',
      correctDefinition: 'Une limite marque le passage d’un espace à un autre.',
      incorrectFeedback: '↺ Il n’y a ni arrêts ni trajets dans ce schéma. Les pointillés indiquent où le quartier finit et où les jardins commencent : ils marquent une limite.',
      scaffold: 'Observe ce qui se trouve de chaque côté des pointillés. La ligne relie-t-elle des points ou marque-t-elle un changement d’espace ?',
      correctFeedback: '✓ « Limite » convient : les pointillés marquent le bord entre le quartier et les jardins. Le texte et le symbole racontent le même changement.',
      formula: 'limite = bord + changement d’espace'
    },
    {
      id: 'stream-facility',
      term: 'aménagement',
      chapter: 'Rendre un usage possible',
      context: 'Une passerelle a été ajoutée pour traverser le ruisseau et rejoindre le terrain de sport.',
      sketchLabel: 'Schéma : sentier, passerelle au-dessus du ruisseau, terrain de sport',
      sketchSymbol: 'SENTIER  ═╪═  TERRAIN',
      prompt: 'Quelle action construit le sens du mot « aménagement » ici ?',
      incorrectAction: 'montre seulement qu’un objet a été fabriqué',
      correctAction: 'facilite un usage du lieu : traverser',
      incorrectDefinition: 'Un aménagement dit seulement qu’un objet a été fabriqué.',
      correctDefinition: 'Un aménagement facilite ici un usage du lieu : traverser.',
      incorrectFeedback: '↺ La passerelle est bien construite, mais le mot attendu relie aussi l’objet à sa fonction. Cet aménagement rend possible le passage au-dessus du ruisseau.',
      scaffold: 'Imagine le sentier sans la passerelle. Quelle action deviendrait difficile ou impossible ?',
      correctFeedback: '✓ « Aménagement » convient : la passerelle est une réalisation organisée pour faciliter le franchissement du ruisseau.',
      formula: 'aménagement = réalisation + fonction'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentCase = cases[0];
  let selected: Choice | null = null;
  let submitted: Choice | null = null;
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
    selected = null;
    submitted = null;
    phase = 'active';
    announcement = `Premier chantier : construire le mot ${currentCase.term}.`;
    void focusState();
  }

  function choose(choice: Choice): void {
    selected = choice;
    announcement = choice === 'correct'
      ? `Fragment choisi : ${currentCase.correctAction}.`
      : `Fragment choisi : ${currentCase.incorrectAction}.`;
  }

  function resolve(choice: Choice): void {
    selected = choice;
    submitted = choice;
    phase = choice === 'correct' ? 'correct' : 'incorrect';
    announcement = choice === 'correct' ? currentCase.correctFeedback : currentCase.incorrectFeedback;
    void focusState();
  }

  function submit(): void {
    if (selected) resolve(selected);
  }

  function retry(): void {
    selected = null;
    phase = 'retry';
    announcement = `Indice : ${currentCase.scaffold}`;
    void focusState();
  }

  function continueLoop(): void {
    if (currentIndex === cases.length - 1) {
      phase = 'complete';
      announcement = 'Chantier terminé : trois mots ont été reliés à leur fonction.';
      void focusState();
      return;
    }
    currentIndex += 1;
    selected = null;
    submitted = null;
    phase = 'active';
    announcement = `Nouveau chantier : construire le mot ${cases[currentIndex].term}.`;
    void focusState();
  }
</script>

<svelte:head>
  <title>Le chantier des mots géographiques · EX-0321</title>
  <meta name="description" content="Construire le sens de trois mots géographiques à partir de schémas proches." />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0321"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0321">
    <div class="legacy-root">
    <header class="site-header">
      <div class="mark" aria-hidden="true">MOT</div>
      <div>
        <p>Laboratoire de géographie</p>
        <strong>Le chantier des mots</strong>
      </div>
      {#if phase !== 'intro' && phase !== 'complete'}
        <span class="progress">Plan {currentIndex + 1} / {cases.length}</span>
      {/if}
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="intro-copy">
          <p class="eyebrow">EX—0321 · Construire le sens</p>
          <h1 id="intro-title">Un mot devient utile quand ses indices s’assemblent.</h1>
          <p>
            Tu vas observer trois schémas proches. Pour chaque mot, choisis l’action qui correspond
            aux deux indices visibles, puis vérifie ta construction.
          </p>
          <dl>
            <div><dt>Réseau</dt><dd>des lieux reliés</dd></div>
            <div><dt>Limite</dt><dd>un bord entre deux espaces</dd></div>
            <div><dt>Aménagement</dt><dd>une réalisation qui facilite un usage</dd></div>
          </dl>
          <button type="button" class="primary" data-smoke-action="start" onclick={start}>
            Ouvrir le premier plan <span aria-hidden="true">→</span>
          </button>
        </div>
        <div class="intro-poster" aria-hidden="true">
          <span>LIEU</span><i></i><span>INDICE</span><i></i><span>MOT</span>
        </div>
      </section>
    {:else if phase === 'active' || phase === 'retry'}
      <section
        class="workbench"
        class:retry-bench={phase === 'retry'}
        tabindex="-1"
        bind:this={stateFocusTarget}
        data-smoke-state={phase}
        data-smoke-variation={currentCase.id}
        aria-labelledby="case-title"
      >
        <div class="case-heading">
          <div>
            <p class="eyebrow">{currentCase.chapter}</p>
            <h1 id="case-title">Construis le mot <em>{currentCase.term}</em>.</h1>
          </div>
          <span class="number" aria-hidden="true">0{currentIndex + 1}</span>
        </div>

        {#if phase === 'retry'}
          <aside class="scaffold" role="status">
            <strong><span aria-hidden="true">↺</span> Indice de chantier</strong>
            <p>{currentCase.scaffold}</p>
          </aside>
        {/if}

        <div class="plan-grid">
          <article class="sketch-card">
            <span class="card-label">Situation observée</span>
            <p>{currentCase.context}</p>
            <div class="sketch" role="img" aria-label={currentCase.sketchLabel}>
              <b>{currentCase.sketchSymbol}</b>
            </div>
            <small>Deux indices doivent confirmer le mot.</small>
          </article>

          <article class="builder-card">
            <span class="card-label">Fais agir le mot</span>
            <h2>{currentCase.prompt}</h2>
            <div class="builder-options" aria-label={`Choisir la fonction de ${currentCase.term}`}>
              <button
                type="button"
                class:selected={selected === 'incorrect'}
                aria-pressed={selected === 'incorrect'}
                data-smoke-attempt="incorrect"
                onclick={() => choose('incorrect')}
              >
                <span aria-hidden="true">A</span>{currentCase.incorrectAction}
              </button>
              <button
                type="button"
                class:selected={selected === 'correct'}
                aria-pressed={selected === 'correct'}
                data-smoke-attempt="correct"
                onclick={() => choose('correct')}
              >
                <span aria-hidden="true">B</span>{currentCase.correctAction}
              </button>
            </div>
            <div class="draft" aria-live="polite">
              <span>Définition en construction</span>
              <p>
                {#if selected === 'correct'}
                  {currentCase.correctDefinition}
                {:else if selected === 'incorrect'}
                  {currentCase.incorrectDefinition}
                {:else}
                  Choisis l’action qui correspond au schéma.
                {/if}
              </p>
            </div>
            <button type="button" class="primary full" disabled={!selected} data-smoke-action="submit" onclick={submit}>
              Vérifier la construction
            </button>
          </article>
        </div>

        <aside class="direct-path" aria-label="Alternative de décision directe">
          <div>
            <strong>Ou choisis une définition complète</strong>
            <span>Même décision, boutons plus larges.</span>
          </div>
          <button type="button" data-smoke-answer="incorrect" onclick={() => resolve('incorrect')}>
            {currentCase.incorrectDefinition}
          </button>
          <button type="button" data-smoke-answer="correct" onclick={() => resolve('correct')}>
            {currentCase.correctDefinition}
          </button>
        </aside>
      </section>
    {:else if phase === 'incorrect'}
      <section
        class="feedback feedback-wrong"
        tabindex="-1"
        bind:this={stateFocusTarget}
        data-smoke-state="incorrect"
        data-smoke-variation={currentCase.id}
        data-smoke-feedback="incorrect"
        data-smoke-feedback-detail="specific"
        role="status"
        aria-labelledby="feedback-title"
      >
        <p class="signal"><span aria-hidden="true">↺</span> Construction à reprendre</p>
        <h1 id="feedback-title">Le mot et l’action ne racontent pas le même espace.</h1>
        <blockquote>{submitted === 'incorrect' ? currentCase.incorrectDefinition : ''}</blockquote>
        <p>{currentCase.incorrectFeedback}</p>
        <button type="button" class="primary" data-smoke-action="retry" onclick={retry}>
          Reprendre avec un indice
        </button>
      </section>
    {:else if phase === 'correct'}
      <div class="success-layout">
        <section
          class="feedback feedback-correct"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="correct"
          data-smoke-variation={currentCase.id}
          data-smoke-feedback="correct"
          data-smoke-feedback-detail="specific"
          role="status"
          aria-labelledby="feedback-title"
        >
          <p class="signal"><span aria-hidden="true">✓</span> Construction solide</p>
          <h1 id="feedback-title">{currentCase.correctDefinition}</h1>
          <p>{currentCase.correctFeedback}</p>
          <div class="formula"><span>À retenir</span><strong>{currentCase.formula}</strong></div>
        </section>
        <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentCase.id}>
          <span>{currentIndex + 1} mot sur {cases.length}</span>
          <p>Lis l’explication, puis ouvre un schéma qui fait agir un autre mot.</p>
          <button type="button" class="primary" data-smoke-action="continue" onclick={continueLoop}>
            {currentIndex === cases.length - 1 ? 'Fermer le chantier' : 'Plan suivant'}
          </button>
        </aside>
      </div>
    {:else}
      <section class="completion" tabindex="-1" bind:this={stateFocusTarget} data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <p class="eyebrow">Chantier terminé</p>
        <div class="completion-mark" aria-hidden="true">✓</div>
        <h1 id="complete-title">Trois mots, trois fonctions à vérifier.</h1>
        <p>
          Un mot géographique précis s’appuie sur des indices : un réseau <strong>relie</strong>,
          une limite <strong>sépare ou marque un bord</strong>, un aménagement
          <strong>facilite un usage</strong>.
        </p>
        <ul>
          {#each cases as item}
            <li><span aria-hidden="true">✓</span><strong>{item.term}</strong><small>{item.formula}</small></li>
          {/each}
        </ul>
        <p class="privacy">Cette activité n’a enregistré ni envoyé de réponse.</p>
      </section>
    {/if}

      <p class="sr-only" aria-live="polite">{announcement}</p>
    </div>
  </main>
</div>

<style>
  .prototype-root,
  .prototype-root * {
    box-sizing: border-box;
  }

  .prototype-root {
    --ink: #1e2927;
    --muted: #586561;
    --paper: #fbfaf4;
    --cream: #ece9dc;
    --orange: #dc5b35;
    --navy: #173f4f;
    --yellow: #f6c94c;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: var(--cream);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .legacy-root {
    width: min(1180px, 100%);
    min-height: calc(100vh - 42px);
    margin: 0 auto;
    padding: 18px clamp(14px, 3vw, 36px) 48px;
  }

  .site-header {
    display: flex;
    min-height: 62px;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #bcc2b8;
  }

  .site-header .mark {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--yellow);
    box-shadow: 3px 3px 0 var(--ink);
    font-family: ui-monospace, monospace;
    font-size: .72rem;
    font-weight: 900;
  }

  .site-header p,
  .site-header strong { margin: 0; }
  .site-header p { color: var(--muted); font-size: .68rem; text-transform: uppercase; letter-spacing: .08em; }
  .site-header strong { font-family: Georgia, serif; font-size: 1.05rem; }
  .progress { margin-left: auto; font-family: ui-monospace, monospace; font-size: .72rem; font-weight: 800; }

  .intro {
    display: grid;
    min-height: min(720px, calc(100vh - 122px));
    grid-template-columns: minmax(0, 1fr) minmax(280px, .72fr);
    align-items: center;
    gap: clamp(28px, 7vw, 90px);
    padding: 54px 0;
  }

  .eyebrow,
  .card-label {
    margin: 0;
    color: var(--orange);
    font-size: .7rem;
    font-weight: 900;
    letter-spacing: .13em;
    text-transform: uppercase;
  }

  h1,
  h2,
  p { overflow-wrap: anywhere; }

  .intro h1,
  .case-heading h1,
  .feedback h1,
  .completion h1 {
    margin: 14px 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 500;
    letter-spacing: -.035em;
    line-height: 1.03;
  }

  .intro h1 { max-width: 720px; font-size: clamp(2.8rem, 7vw, 6.5rem); }
  .intro-copy > p:not(.eyebrow) { max-width: 680px; color: var(--muted); font-size: 1.06rem; line-height: 1.65; }

  dl { display: grid; gap: 8px; margin: 28px 0; }
  dl div { display: grid; grid-template-columns: minmax(100px, .4fr) 1fr; gap: 12px; padding: 10px 0; border-top: 1px solid #c5c8bd; }
  dt { font-weight: 900; }
  dd { margin: 0; color: var(--muted); }

  button {
    min-height: 48px;
    border: 2px solid var(--ink);
    border-radius: 4px;
    color: var(--ink);
    background: var(--paper);
    font: inherit;
    font-weight: 750;
    cursor: pointer;
  }

  button:focus-visible,
  [tabindex="-1"]:focus { outline: 4px solid var(--orange); outline-offset: 3px; }
  button:disabled { cursor: not-allowed; opacity: .48; }
  .primary { display: inline-flex; align-items: center; justify-content: center; gap: 18px; padding: 12px 18px; color: white; background: var(--navy); box-shadow: 4px 4px 0 var(--ink); }
  .primary.full { width: 100%; margin-top: 16px; }

  .intro-poster {
    display: grid;
    min-height: 390px;
    place-items: center;
    padding: 35px;
    border: 2px solid var(--ink);
    background: var(--yellow);
    box-shadow: 16px 16px 0 var(--navy);
    transform: rotate(1.5deg);
  }
  .intro-poster span { padding: 10px 18px; border: 2px solid var(--ink); background: var(--paper); font: 900 1rem ui-monospace, monospace; }
  .intro-poster i { width: 4px; height: 60px; background: var(--ink); }

  .workbench { padding: 44px 0 0; }
  .case-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; }
  .case-heading h1 { font-size: clamp(2.2rem, 5vw, 4.6rem); }
  .case-heading em { color: var(--navy); }
  .number { color: #a8aaa0; font: 700 clamp(3rem, 8vw, 7rem) Georgia, serif; }

  .scaffold {
    margin: 18px 0;
    padding: 16px 18px;
    border-left: 7px solid var(--orange);
    background: #fff2cf;
  }
  .scaffold p { margin: 6px 0 0; line-height: 1.5; }

  .plan-grid { display: grid; grid-template-columns: .88fr 1.12fr; gap: 18px; margin-top: 22px; }
  .sketch-card,
  .builder-card { min-width: 0; padding: clamp(18px, 4vw, 34px); border: 2px solid var(--ink); background: var(--paper); box-shadow: 6px 6px 0 #b7baaf; }
  .sketch-card > p { min-height: 74px; line-height: 1.55; }
  .sketch { display: grid; min-height: 180px; place-items: center; margin: 22px 0 12px; padding: 18px; border: 1px dashed var(--navy); background: #e2ece9; text-align: center; }
  .sketch b { max-width: 100%; font: 800 clamp(1rem, 3vw, 1.8rem) ui-monospace, monospace; letter-spacing: .03em; }
  .sketch-card small { color: var(--muted); }
  .builder-card h2 { margin: 12px 0 18px; font: 500 clamp(1.45rem, 3vw, 2.3rem) Georgia, serif; }

  .builder-options { display: grid; gap: 10px; }
  .builder-options button { display: grid; min-height: 62px; grid-template-columns: 34px 1fr; align-items: center; gap: 10px; padding: 10px 14px; text-align: left; }
  .builder-options button span { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; color: white; background: var(--navy); font-size: .75rem; }
  .builder-options button.selected { background: #dbe9e4; box-shadow: inset 6px 0 0 var(--navy); }

  .draft { min-height: 96px; margin-top: 16px; padding: 14px; border: 1px solid #c1c5bb; background: #f2efe4; }
  .draft span { color: var(--muted); font-size: .66rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .draft p { margin: 8px 0 0; line-height: 1.45; }

  .direct-path { display: grid; grid-template-columns: minmax(150px, .72fr) 1fr 1fr; gap: 10px; align-items: stretch; margin-top: 18px; padding: 14px; border: 1px solid #babdb3; background: #dfddcf; }
  .direct-path > div { align-self: center; }
  .direct-path strong,
  .direct-path span { display: block; }
  .direct-path span { margin-top: 4px; color: var(--muted); font-size: .75rem; }
  .direct-path button { padding: 12px; text-align: left; line-height: 1.35; }

  .feedback { width: min(820px, 100%); margin: clamp(40px, 9vw, 100px) auto 0; padding: clamp(24px, 6vw, 56px); border: 2px solid var(--ink); background: var(--paper); box-shadow: 10px 10px 0 #b7baaf; }
  .feedback-wrong { border-top: 10px solid var(--orange); }
  .feedback-correct { width: 100%; margin: 0; border-top: 10px solid var(--navy); }
  .signal { font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
  .feedback h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .feedback > p:not(.signal) { color: var(--muted); line-height: 1.65; }
  blockquote { margin: 20px 0; padding: 16px; border-left: 5px solid var(--orange); background: #f7e4d9; font-family: Georgia, serif; font-size: 1.15rem; }
  .formula { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: 22px; padding: 14px; background: #dbe9e4; }
  .formula span { font-size: .7rem; font-weight: 900; text-transform: uppercase; }

  .success-layout { display: grid; grid-template-columns: minmax(0, 1fr) 290px; gap: 18px; margin-top: 48px; }
  .continuation { align-self: stretch; padding: 24px; border: 2px solid var(--ink); background: var(--yellow); box-shadow: 6px 6px 0 var(--ink); }
  .continuation > span { font: 900 .72rem ui-monospace, monospace; text-transform: uppercase; }
  .continuation p { min-height: 100px; line-height: 1.5; }
  .continuation button { width: 100%; }

  .completion { width: min(820px, 100%); margin: 52px auto 0; padding: clamp(26px, 6vw, 60px); border: 2px solid var(--ink); background: var(--paper); text-align: center; box-shadow: 12px 12px 0 var(--navy); }
  .completion-mark { display: grid; width: 72px; height: 72px; place-items: center; margin: 12px auto; border-radius: 50%; color: white; background: var(--navy); font-size: 2rem; }
  .completion h1 { font-size: clamp(2.2rem, 6vw, 4.8rem); }
  .completion > p { line-height: 1.6; }
  .completion ul { display: grid; gap: 8px; margin: 28px 0; padding: 0; list-style: none; text-align: left; }
  .completion li { display: grid; grid-template-columns: 28px minmax(90px, .4fr) 1fr; gap: 8px; padding: 12px; background: #ece9dc; }
  .completion li small { color: var(--muted); }
  .privacy { color: var(--muted); font-size: .78rem; }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }

  @media (max-width: 760px) {
    .intro,
    .plan-grid,
    .success-layout { grid-template-columns: 1fr; }
    .intro-poster { min-height: 220px; box-shadow: 8px 8px 0 var(--navy); }
    .direct-path { grid-template-columns: 1fr; }
    .continuation p { min-height: auto; }
  }

  @media (max-width: 420px) {
    .legacy-root { padding: 10px 12px 34px; }
    .site-header .mark { width: 44px; height: 44px; }
    .site-header p { display: none; }
    .progress { font-size: .64rem; }
    .intro { padding: 34px 0; }
    .intro h1 { font-size: 2.55rem; }
    dl div { grid-template-columns: 1fr; gap: 3px; }
    .intro-poster { display: none; }
    .case-heading { align-items: start; }
    .number { font-size: 2.5rem; }
    .sketch-card,
    .builder-card { padding: 16px; box-shadow: 4px 4px 0 #b7baaf; }
    .sketch { min-height: 130px; }
    .feedback,
    .completion { box-shadow: 5px 5px 0 #b7baaf; }
    .completion { padding: 20px 14px; }
    .completion h1 { margin: 8px 0; font-size: 2rem; }
    .completion > p { margin: 8px 0; }
    .completion ul { margin: 14px 0; }
    .completion li { grid-template-columns: 24px 1fr; padding: 8px; }
    .completion li small { grid-column: 2; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; transform: none !important; }
  }
</style>
