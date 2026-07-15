<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Choice = 'incorrect' | 'correct';

  type NoteCase = {
    id: string;
    folio: string;
    family: string;
    context: string;
    before: string;
    vague: string;
    after: string;
    clue: string;
    incorrectWord: string;
    correctWord: string;
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
    strategy: string;
  };

  const notes: NoteCase[] = [
    {
      id: 'connected-stops',
      folio: 'Note 01 · échanges',
      family: 'Nommer une liaison',
      context: 'Observation indirecte d’un plan simplifié de trois arrêts de communes voisines.',
      before: 'Les trois arrêts forment',
      vague: 'un truc de transport',
      after: 'car les mêmes lignes les relient.',
      clue: 'Indice de terrain : plusieurs lieux + des liaisons entre eux.',
      incorrectWord: 'une zone',
      correctWord: 'un réseau',
      incorrectFeedback: '↺ « Zone » nomme une partie d’espace, mais la note insiste sur les lignes entre trois arrêts. Pour cette relation, le terme précis est celui qui nomme des lieux reliés.',
      scaffold: 'Relis le verbe « relient ». Cherche un mot qui contient à la fois les lieux et leurs liaisons.',
      correctFeedback: '✓ « Réseau » précise la note : les trois arrêts ne sont pas seulement proches, ils sont reliés par les mêmes lignes.',
      strategy: 'plusieurs lieux reliés → réseau'
    },
    {
      id: 'play-area',
      folio: 'Note 02 · loisirs',
      family: 'Nommer une surface',
      context: 'Observation directe d’un parc où une même partie est réservée aux jeux calmes.',
      before: 'Dans le parc,',
      vague: 'un coin',
      after: 'est réservé aux jeux calmes ; son bord est marqué au sol.',
      clue: 'Indice de terrain : toute une partie partage le même usage ; la ligne ne montre que son bord.',
      incorrectWord: 'une limite',
      correctWord: 'une zone',
      incorrectFeedback: '↺ « Limite » nomme le bord marqué au sol. La note doit nommer toute la partie du parc qui partage le même usage : les jeux calmes.',
      scaffold: 'Cache mentalement la ligne. Que veux-tu nommer : le bord, ou toute la surface où l’usage est le même ?',
      correctFeedback: '✓ « Zone » précise la surface réservée aux jeux calmes. Sa limite est seulement la ligne qui en marque le bord.',
      strategy: 'partie au caractère commun → zone'
    },
    {
      id: 'several-municipalities',
      folio: 'Note 03 · habitat',
      family: 'Nommer une étendue',
      context: 'Lecture d’un dossier fictif qui compare Valrive et quatre communes proches.',
      before: 'Valrive est une commune ; avec les communes voisines, elle appartient à',
      vague: 'un grand endroit',
      after: 'plus vaste étudié dans le dossier.',
      clue: 'Indice documentaire : l’espace étudié regroupe plusieurs communes, mais il ne couvre pas tout un pays.',
      incorrectWord: 'un pays',
      correctWord: 'une région',
      incorrectFeedback: '↺ « Pays » est trop vaste pour l’indice donné. Le dossier rassemble plusieurs communes dans un espace proche plus étendu : il décrit ici une région.',
      scaffold: 'Compare les étendues : une commune < plusieurs communes proches < un pays. Quel mot convient à l’étendue du milieu ?',
      correctFeedback: '✓ « Région » convient dans ce dossier fictif : elle désigne ici l’espace plus vaste qui regroupe plusieurs communes proches.',
      strategy: 'plusieurs communes proches → région'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentNote = notes[0];
  let selected: Choice | null = null;
  let submitted: Choice | null = null;
  let announcement = '';
  let stateFocusTarget: HTMLElement | null = null;
  let legacyState: 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' = 'ready';

  $: currentNote = notes[currentIndex];
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
    announcement = 'Première note ouverte. Repère le mot vague, puis choisis un terme précis.';
    void focusState();
  }

  function choose(choice: Choice): void {
    selected = choice;
    const word = choice === 'correct' ? currentNote.correctWord : currentNote.incorrectWord;
    announcement = `${word} est placé dans la note. Relis la phrase avant de valider.`;
  }

  function resolve(choice: Choice): void {
    selected = choice;
    submitted = choice;
    phase = choice === 'correct' ? 'correct' : 'incorrect';
    announcement = choice === 'correct' ? currentNote.correctFeedback : currentNote.incorrectFeedback;
    void focusState();
  }

  function submit(): void {
    if (selected) resolve(selected);
  }

  function retry(): void {
    selected = null;
    phase = 'retry';
    announcement = `Repère de relecture : ${currentNote.scaffold}`;
    void focusState();
  }

  function continueNotebook(): void {
    if (currentIndex === notes.length - 1) {
      phase = 'complete';
      announcement = 'Carnet terminé. Trois notes ont été rendues plus précises.';
      void focusState();
      return;
    }
    currentIndex += 1;
    selected = null;
    submitted = null;
    phase = 'active';
    announcement = `${notes[currentIndex].folio} ouverte.`;
    void focusState();
  }

  function chosenWord(choice = selected): string {
    if (choice === 'correct') return currentNote.correctWord;
    if (choice === 'incorrect') return currentNote.incorrectWord;
    return currentNote.vague;
  }
</script>

<svelte:head>
  <title>Le carnet de terrain précis · EX-0322</title>
  <meta name="description" content="Pratiquer le vocabulaire géographique en réparant trois notes de terrain." />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0322"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0322">
    <div class="legacy-root">
    <header class="notebook-header">
      <div class="pencil" aria-hidden="true">✎</div>
      <div><small>Carnet d’observation</small><strong>Préciser ce que l’on voit</strong></div>
      {#if phase !== 'intro' && phase !== 'complete'}
        <span>{currentIndex + 1} / {notes.length}</span>
      {/if}
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="cover">
          <span>GÉO<br />06</span>
          <i aria-hidden="true"></i>
          <small>Carnet de terrain</small>
        </div>
        <div class="intro-copy">
          <p class="kicker">EX—0322 · Pratique variée</p>
          <h1 id="intro-title">Un bon carnet remplace les mots vagues par des indices précis.</h1>
          <p>
            Chaque note contient une expression peu utile. Choisis un mot géographique,
            relis la phrase réparée, puis valide-la. Tu peux tout faire au clavier ou en touchant les boutons.
          </p>
          <div class="method">
            <span>1</span><p><strong>Repère</strong> ce que l’indice décrit.</p>
            <span>2</span><p><strong>Remplace</strong> le mot vague.</p>
            <span>3</span><p><strong>Relis</strong> la phrase entière.</p>
          </div>
          <button type="button" class="ink-button" data-smoke-action="start" onclick={start}>
            Ouvrir la première note
          </button>
        </div>
      </section>
    {:else if phase === 'active' || phase === 'retry'}
      <section
        class="desk"
        tabindex="-1"
        bind:this={stateFocusTarget}
        data-smoke-state={phase}
        data-smoke-variation={currentNote.id}
        aria-labelledby="note-title"
      >
        <aside class="margin-label">
          <span>{currentNote.folio}</span>
          <strong>{currentNote.family}</strong>
        </aside>

        <article class="note-page">
          <div class="page-top">
            <div>
              <p class="kicker">Note à réviser</p>
              <h1 id="note-title">Trouve le mot qui rend l’observation utile.</h1>
            </div>
            <span class="stamp">BROUILLON</span>
          </div>

          <p class="context">{currentNote.context}</p>
          <blockquote>
            {currentNote.before}
            <mark class:filled={selected !== null}>{chosenWord()}</mark>
            {currentNote.after}
          </blockquote>
          <p class="clue"><span aria-hidden="true">⌖</span>{currentNote.clue}</p>

          {#if phase === 'retry'}
            <aside class="retry-note" role="status">
              <strong><span aria-hidden="true">↺</span> Repère de relecture</strong>
              <p>{currentNote.scaffold}</p>
            </aside>
          {/if}

          <div class="word-bank">
            <span class="bank-title">Banque de mots</span>
            <div role="group" aria-label="Choisir le terme à placer dans la note">
              <button
                type="button"
                class:selected={selected === 'incorrect'}
                aria-pressed={selected === 'incorrect'}
                data-smoke-attempt="incorrect"
                onclick={() => choose('incorrect')}
              >
                <span aria-hidden="true">A</span>{currentNote.incorrectWord}
              </button>
              <button
                type="button"
                class:selected={selected === 'correct'}
                aria-pressed={selected === 'correct'}
                data-smoke-attempt="correct"
                onclick={() => choose('correct')}
              >
                <span aria-hidden="true">B</span>{currentNote.correctWord}
              </button>
            </div>
          </div>

          <button type="button" class="ink-button submit" disabled={!selected} data-smoke-action="submit" onclick={submit}>
            Valider la note réparée
          </button>
        </article>

        <aside class="direct-editor" aria-label="Alternative avec phrases complètes">
          <strong>Mode phrase complète</strong>
          <p>Choisis directement la note que tu laisserais à une autre personne.</p>
          <button type="button" data-smoke-answer="incorrect" onclick={() => resolve('incorrect')}>
            {currentNote.before} <b>{currentNote.incorrectWord}</b> {currentNote.after}
          </button>
          <button type="button" data-smoke-answer="correct" onclick={() => resolve('correct')}>
            {currentNote.before} <b>{currentNote.correctWord}</b> {currentNote.after}
          </button>
        </aside>
      </section>
    {:else if phase === 'incorrect'}
      <section
        class="result wrong"
        tabindex="-1"
        bind:this={stateFocusTarget}
        data-smoke-state="incorrect"
        data-smoke-variation={currentNote.id}
        data-smoke-feedback="incorrect"
        data-smoke-feedback-detail="specific"
        role="status"
        aria-labelledby="result-title"
      >
        <div class="result-symbol" aria-hidden="true">↺</div>
        <p class="kicker">Révision nécessaire</p>
        <h1 id="result-title">La phrase est correcte en français, mais l’indice demande un autre terme.</h1>
        <blockquote>
          {currentNote.before} <mark>{chosenWord(submitted)}</mark> {currentNote.after}
        </blockquote>
        <p>{currentNote.incorrectFeedback}</p>
        <button type="button" class="ink-button" data-smoke-action="retry" onclick={retry}>
          Reprendre avec un repère
        </button>
      </section>
    {:else if phase === 'correct'}
      <div class="correct-desk">
        <section
          class="result correct"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="correct"
          data-smoke-variation={currentNote.id}
          data-smoke-feedback="correct"
          data-smoke-feedback-detail="specific"
          role="status"
          aria-labelledby="result-title"
        >
          <div class="result-symbol" aria-hidden="true">✓</div>
          <p class="kicker">Note précise</p>
          <h1 id="result-title">{currentNote.before} {currentNote.correctWord} {currentNote.after}</h1>
          <p>{currentNote.correctFeedback}</p>
          <div class="strategy"><span>Repère à garder</span><strong>{currentNote.strategy}</strong></div>
        </section>
        <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentNote.id}>
          <span class="paperclip" aria-hidden="true">⌁</span>
          <p>La note reste lisible. Quand tu es prêt·e, tourne la page.</p>
          <button type="button" class="ink-button" data-smoke-action="continue" onclick={continueNotebook}>
            {currentIndex === notes.length - 1 ? 'Fermer le carnet' : 'Tourner la page'}
          </button>
        </aside>
      </div>
    {:else}
      <section class="completion" tabindex="-1" bind:this={stateFocusTarget} data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <div class="seal" aria-hidden="true">3×✓</div>
        <p class="kicker">Carnet relu</p>
        <h1 id="complete-title">La précision vient de l’indice, pas d’un mot compliqué.</h1>
        <p>
          Tu as réparé une liaison, une surface et une étendue. La stratégie à emporter :
          <strong>observer l’indice, choisir le terme, relire la phrase entière.</strong>
        </p>
        <div class="recap">
          {#each notes as note}
            <div><span aria-hidden="true">✓</span><strong>{note.correctWord}</strong><small>{note.strategy}</small></div>
          {/each}
        </div>
        <small class="privacy">Aucune réponse n’a été enregistrée ni envoyée.</small>
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
    --ink: #25324a;
    --blue: #315f7c;
    --red: #bd4a43;
    --paper: #fffdf3;
    --desk: #d8c9ad;
    --line: #bed3df;
    --muted: #5d6470;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background:
      radial-gradient(circle at 20% 20%, rgba(255,255,255,.22) 0 2px, transparent 3px),
      var(--desk);
    background-size: 22px 22px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .legacy-root { width: min(1120px, 100%); min-height: calc(100vh - 42px); margin: auto; padding: 16px clamp(12px, 3vw, 34px) 52px; }

  .notebook-header { display: flex; min-height: 62px; align-items: center; gap: 12px; padding: 8px 12px; border: 1px solid rgba(37,50,74,.35); background: rgba(255,253,243,.78); backdrop-filter: blur(5px); }
  .pencil { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 50%; color: white; background: var(--red); font-size: 1.4rem; }
  .notebook-header div:nth-child(2) { display: grid; }
  .notebook-header small { color: var(--muted); font-size: .65rem; letter-spacing: .09em; text-transform: uppercase; }
  .notebook-header strong { font-family: Georgia, serif; }
  .notebook-header > span { margin-left: auto; font: 800 .72rem ui-monospace, monospace; }

  .kicker { margin: 0; color: var(--red); font-size: .7rem; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
  h1, p, blockquote { overflow-wrap: anywhere; }

  .intro { display: grid; min-height: min(720px, calc(100vh - 120px)); grid-template-columns: minmax(220px, .62fr) minmax(0, 1.38fr); align-items: center; gap: clamp(30px, 7vw, 90px); padding: 54px 0; }
  .cover { position: relative; display: flex; min-height: 470px; flex-direction: column; align-items: center; justify-content: center; gap: 28px; border: 3px solid var(--ink); border-left: 22px solid var(--red); background: var(--blue); box-shadow: 16px 17px 0 rgba(37,50,74,.25); transform: rotate(-1.5deg); }
  .cover span { color: white; font: 800 clamp(3rem, 7vw, 6.2rem)/.85 Georgia, serif; text-align: center; }
  .cover i { width: 55%; border-top: 4px double white; }
  .cover small { color: white; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  .intro-copy h1,
  .note-page h1,
  .result h1,
  .completion h1 { margin: 12px 0 18px; font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.035em; line-height: 1.04; }
  .intro-copy h1 { font-size: clamp(2.7rem, 6vw, 5.8rem); }
  .intro-copy > p:not(.kicker) { color: var(--muted); font-size: 1.04rem; line-height: 1.65; }
  .method { display: grid; grid-template-columns: 36px 1fr; gap: 8px 12px; margin: 26px 0; }
  .method span { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; color: white; background: var(--red); font-weight: 900; }
  .method p { margin: 5px 0; }

  button { min-height: 48px; border: 2px solid var(--ink); border-radius: 2px; color: var(--ink); background: var(--paper); font: inherit; font-weight: 750; cursor: pointer; }
  button:focus-visible,
  [tabindex="-1"]:focus { outline: 4px solid var(--red); outline-offset: 3px; }
  button:disabled { opacity: .46; cursor: not-allowed; }
  .ink-button { padding: 12px 20px; color: white; background: var(--ink); box-shadow: 4px 4px 0 var(--red); }

  .desk { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 18px; margin-top: 34px; align-items: start; }
  .margin-label { position: sticky; top: 12px; padding: 16px; border: 1px solid var(--ink); background: #f4dda0; transform: rotate(-2deg); }
  .margin-label span,
  .margin-label strong { display: block; }
  .margin-label span { font: 800 .66rem ui-monospace, monospace; text-transform: uppercase; }
  .margin-label strong { margin-top: 8px; font-family: Georgia, serif; font-size: 1.25rem; }

  .note-page { min-width: 0; padding: clamp(20px, 5vw, 48px); border: 1px solid #9da7ae; background: repeating-linear-gradient(var(--paper) 0 39px, var(--line) 40px); box-shadow: 9px 11px 0 rgba(37,50,74,.25); }
  .page-top { display: flex; align-items: start; justify-content: space-between; gap: 18px; }
  .note-page h1 { font-size: clamp(2rem, 5vw, 3.8rem); }
  .stamp { padding: 7px 9px; border: 3px double var(--red); color: var(--red); font: 900 .68rem ui-monospace, monospace; transform: rotate(4deg); }
  .context { margin: 22px 0; color: var(--muted); font-style: italic; line-height: 1.5; }
  .note-page blockquote,
  .result blockquote { margin: 26px 0; padding: 19px; border-left: 7px solid var(--blue); background: rgba(255,255,255,.82); font: 500 clamp(1.25rem, 3vw, 1.85rem)/1.6 Georgia, serif; }
  mark { padding: 3px 6px; color: var(--ink); background: #f3d58a; text-decoration: underline wavy var(--red) 2px; text-underline-offset: 4px; }
  mark.filled { background: #cce3ea; }
  .clue { display: flex; gap: 10px; padding: 12px 14px; border: 1px dashed var(--blue); background: #edf5f7; line-height: 1.45; }
  .clue span { color: var(--red); font-size: 1.2rem; }

  .retry-note { margin: 16px 0; padding: 14px; border: 2px solid var(--red); background: #fff1d3; }
  .retry-note p { margin: 6px 0 0; line-height: 1.5; }

  .word-bank { margin-top: 24px; padding: 14px; border: 2px solid var(--ink); background: rgba(216,201,173,.42); }
  .bank-title { display: block; margin-bottom: 10px; font-size: .68rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
  .word-bank > div { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .word-bank button { display: flex; min-height: 58px; align-items: center; gap: 12px; padding: 10px 14px; text-align: left; }
  .word-bank button span { display: grid; width: 31px; height: 31px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: white; background: var(--blue); }
  .word-bank button.selected { background: #cce3ea; box-shadow: inset 0 -5px 0 var(--blue); }
  .submit { width: 100%; margin-top: 16px; }

  .direct-editor { grid-column: 2; display: grid; grid-template-columns: minmax(150px, .55fr) 1fr 1fr; gap: 9px; padding: 14px; border: 1px dashed var(--ink); background: rgba(255,253,243,.72); }
  .direct-editor > strong { align-self: end; }
  .direct-editor > p { grid-column: 1; margin: 3px 0; color: var(--muted); font-size: .76rem; }
  .direct-editor button { grid-row: 1 / span 2; padding: 12px; text-align: left; line-height: 1.35; }
  .direct-editor button:nth-of-type(1) { grid-column: 2; }
  .direct-editor button:nth-of-type(2) { grid-column: 3; }

  .result { width: min(840px, 100%); margin: 50px auto 0; padding: clamp(24px, 6vw, 54px); border: 1px solid #8e999e; background: repeating-linear-gradient(var(--paper) 0 39px, var(--line) 40px); box-shadow: 10px 12px 0 rgba(37,50,74,.24); }
  .result-symbol { display: grid; width: 58px; height: 58px; place-items: center; border-radius: 50%; color: white; background: var(--red); font-size: 1.8rem; }
  .correct .result-symbol { background: var(--blue); }
  .result h1 { font-size: clamp(2rem, 5vw, 3.7rem); }
  .result > p:not(.kicker) { color: var(--muted); line-height: 1.65; }
  .result blockquote { font-size: 1.12rem; }
  .strategy { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; padding: 14px; border: 1px solid var(--blue); background: #dcecf0; }
  .strategy span { font-size: .66rem; font-weight: 900; text-transform: uppercase; }

  .correct-desk { display: grid; grid-template-columns: minmax(0, 1fr) 270px; gap: 18px; margin-top: 40px; }
  .correct-desk .result { width: 100%; margin: 0; }
  .continuation { position: relative; align-self: stretch; padding: 28px 20px; border: 1px solid var(--ink); background: #f4dda0; box-shadow: 6px 7px 0 rgba(37,50,74,.25); }
  .paperclip { display: block; font-size: 3rem; }
  .continuation p { min-height: 140px; line-height: 1.5; }
  .continuation button { width: 100%; }

  .completion { width: min(820px, 100%); margin: 50px auto 0; padding: clamp(28px, 7vw, 62px); border: 2px solid var(--ink); background: var(--paper); text-align: center; box-shadow: 12px 13px 0 var(--red); }
  .seal { display: grid; width: 78px; height: 78px; place-items: center; margin: 0 auto 18px; border: 3px double white; border-radius: 50%; color: white; background: var(--blue); font-weight: 900; }
  .completion h1 { font-size: clamp(2.2rem, 6vw, 4.6rem); }
  .completion > p { line-height: 1.65; }
  .recap { display: grid; gap: 8px; margin: 26px 0; text-align: left; }
  .recap div { display: grid; grid-template-columns: 26px minmax(100px, .4fr) 1fr; gap: 10px; padding: 12px; border-bottom: 1px solid var(--line); }
  .recap small,
  .privacy { color: var(--muted); }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }

  @media (max-width: 780px) {
    .intro,
    .correct-desk { grid-template-columns: 1fr; }
    .cover { min-height: 230px; box-shadow: 8px 9px 0 rgba(37,50,74,.25); }
    .desk { grid-template-columns: 1fr; }
    .margin-label { position: static; transform: none; }
    .direct-editor { grid-column: 1; grid-template-columns: 1fr; }
    .direct-editor > p,
    .direct-editor button,
    .direct-editor button:nth-of-type(1),
    .direct-editor button:nth-of-type(2) { grid-column: 1; grid-row: auto; }
    .continuation p { min-height: auto; }
  }

  @media (max-width: 430px) {
    .legacy-root { padding: 9px 11px 36px; }
    .notebook-header strong { font-size: .84rem; }
    .notebook-header small { display: none; }
    .intro { padding: 30px 0; }
    .cover { display: none; }
    .intro-copy h1 { font-size: 2.5rem; }
    .note-page { padding: 17px 14px; box-shadow: 5px 6px 0 rgba(37,50,74,.24); }
    .page-top { display: block; }
    .stamp { display: inline-block; margin-bottom: 10px; }
    .word-bank > div { grid-template-columns: 1fr; }
    .result,
    .completion { box-shadow: 5px 6px 0 rgba(37,50,74,.24); }
    .completion { padding: 20px 14px; }
    .completion h1 { margin: 8px 0; font-size: 2rem; }
    .completion > p { margin: 8px 0; }
    .recap { margin: 14px 0; }
    .recap div { grid-template-columns: 22px 1fr; padding: 8px; }
    .recap small { grid-column: 2; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after { transition: none !important; animation: none !important; transform: none !important; scroll-behavior: auto !important; }
  }
</style>
