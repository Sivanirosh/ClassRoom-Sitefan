<script lang="ts">
  type Phase = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';

  type Addition = {
    id: string;
    label: string;
    detail: string;
    symbol: string;
    correct: boolean;
  };

  type BuildCase = {
    id: string;
    chapter: string;
    people: string;
    need: string;
    site: string;
    before: string;
    link: string;
    additions: [Addition, Addition];
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
  };

  const cases: BuildCase[] = [
    {
      id: 'habitat-abri',
      chapter: 'Construire pour habiter',
      people: 'Deux familles arrivent dans le quartier.',
      need: 'Elles ont besoin de se protéger du froid et d’habiter ici.',
      site: 'Une parcelle vide près de la rue',
      before: 'Pour le moment, on peut seulement traverser ce terrain.',
      link: 'Espace vécu : le quartier et ses logements.',
      additions: [
        {
          id: 'homes',
          label: 'Ajouter des logements isolés',
          detail: 'Des pièces abritées permettent de dormir, cuisiner et vivre au chaud.',
          symbol: '⌂',
          correct: true
        },
        {
          id: 'bus-quay',
          label: 'Ajouter un quai de bus',
          detail: 'Un quai aide à attendre un transport et à se déplacer.',
          symbol: '▤',
          correct: false
        }
      ],
      incorrectFeedback:
        '✗ Tu as construit un quai de bus : il facilite un déplacement, mais il ne donne pas aux familles un espace abrité pour habiter.',
      scaffold:
        'Indice : pars du verbe « habiter ». Quel ajout crée des pièces où l’on peut vivre et se protéger du froid ?',
      correctFeedback:
        '✓ Les logements créent une fonction d’habitat : leurs pièces abritées répondent au besoin de vivre et de se protéger du froid.'
    },
    {
      id: 'marche-approvisionnement',
      chapter: 'Construire pour s’approvisionner',
      people: 'Les habitantes et habitants cherchent des aliments près de chez eux.',
      need: 'Ils ont besoin de recevoir puis de choisir des produits pour leurs repas.',
      site: 'Une halle ouverte au centre du quartier',
      before: 'La halle est couverte, mais aucun espace ne permet encore de livrer ou présenter les aliments.',
      link: 'Lien proche–lointain : des produits arrivent de fermes de la région.',
      additions: [
        {
          id: 'market-stalls',
          label: 'Ajouter des étals et une zone de livraison',
          detail: 'Les produits peuvent arriver, être présentés puis choisis dans la halle.',
          symbol: '▦',
          correct: true
        },
        {
          id: 'stage',
          label: 'Ajouter une scène de spectacle',
          detail: 'Une scène permet d’assister à un spectacle ou d’en présenter un.',
          symbol: '★',
          correct: false
        }
      ],
      incorrectFeedback:
        '✗ La scène crée une fonction de loisir, mais elle ne permet ni de livrer ni de choisir les aliments annoncés dans la mission.',
      scaffold:
        'Indice : cherche les deux actions « recevoir des produits » puis « les choisir ». Quel ajout rend ces deux actions possibles ?',
      correctFeedback:
        '✓ Les étals et la zone de livraison donnent à la halle une fonction d’approvisionnement : les produits de la région peuvent arriver puis être choisis.'
    },
    {
      id: 'place-rencontre',
      chapter: 'Construire pour jouer et se rencontrer',
      people: 'Après l’école, des enfants et des adultes se retrouvent dehors.',
      need: 'Ils ont besoin d’un lieu pour jouer, s’asseoir et se rencontrer.',
      site: 'Une place minérale entre plusieurs immeubles',
      before: 'La place relie déjà les rues, mais rien n’invite encore à s’arrêter.',
      link: 'Espace fréquenté : une place du quartier peut avoir plusieurs usages.',
      additions: [
        {
          id: 'play-seats',
          label: 'Ajouter une aire de jeu et de grands bancs',
          detail: 'On peut jouer, s’asseoir, parler et partager la place.',
          symbol: '◉',
          correct: true
        },
        {
          id: 'closed-storage',
          label: 'Ajouter un dépôt fermé',
          detail: 'Un dépôt fermé sert à ranger du matériel sans accueillir le public.',
          symbol: '▣',
          correct: false
        }
      ],
      incorrectFeedback:
        '✗ Le dépôt permet de ranger du matériel, mais son espace fermé ne répond pas aux activités de jeu, de repos et de rencontre demandées.',
      scaffold:
        'Indice : la mission contient trois actions — jouer, s’asseoir, se rencontrer. Quel ajout en rend plusieurs possibles ?',
      correctFeedback:
        '✓ L’aire de jeu et les bancs donnent à la place des fonctions de loisir et de rencontre : plusieurs activités deviennent possibles au même endroit.'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentCase: BuildCase = cases[0];
  let retrying = false;
  let submitted: Addition | null = null;
  let builtIds: string[] = [];

  $: legacyState = phase === 'intro' ? 'ready' : phase;

  function start(): void {
    currentIndex = 0;
    currentCase = cases[0];
    retrying = false;
    submitted = null;
    builtIds = [];
    phase = 'question';
  }

  function build(addition: Addition): void {
    submitted = addition;
    retrying = false;
    builtIds = [...builtIds, `${currentCase.id}:${addition.id}`];
    phase = addition.correct ? 'correct' : 'incorrect';
  }

  function retry(): void {
    retrying = true;
    submitted = null;
    phase = 'question';
  }

  function continueJourney(): void {
    if (currentIndex === cases.length - 1) {
      phase = 'complete';
      return;
    }

    currentIndex += 1;
    currentCase = cases[currentIndex];
    retrying = false;
    submitted = null;
    phase = 'question';
  }
</script>

<main
  class="prototype"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0300"
  data-smoke-root
  data-smoke-exercise="EX-0300"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <div class="shell">
    <header class="masthead">
      <p class="eyebrow">Géographie · Atelier de construction</p>
      <p class="progress" aria-label={`Étape ${Math.min(currentIndex + 1, cases.length)} sur ${cases.length}`}>
        {#each cases as item, index}
          <span class:done={phase === 'complete' || index < currentIndex} class:current={index === currentIndex && phase !== 'intro' && phase !== 'complete'}>
            <span aria-hidden="true">{phase === 'complete' || index < currentIndex ? '●' : index === currentIndex && phase !== 'intro' ? '◉' : '○'}</span>
            <span class="sr-only">{item.chapter}</span>
          </span>
        {/each}
      </p>
    </header>

    {#if phase === 'intro'}
      <section class="intro-card" data-smoke-state="intro" aria-labelledby="intro-title">
        <p class="kicker">Besoin → lieu → fonction</p>
        <h1 id="intro-title">Le lieu prend fonction</h1>
        <p class="lead">
          Tu vas compléter trois lieux. Pour chaque mission, ajoute l’élément qui permet aux personnes de faire ce dont elles ont besoin.
        </p>
        <div class="definition">
          <span aria-hidden="true">⌘</span>
          <p><strong>La fonction d’un lieu</strong>, c’est ce que ce lieu permet de faire : habiter, acheter, jouer, se rencontrer…</p>
        </div>
        <p class="controls-note">Au clavier, avance avec <kbd>Tab</kbd> puis active un bouton avec <kbd>Entrée</kbd> ou <kbd>Espace</kbd>.</p>
        <button class="primary" type="button" on:click={start} data-smoke-action="start">
          Ouvrir le premier chantier
          <span aria-hidden="true">→</span>
        </button>
      </section>
    {:else if phase === 'question'}
      <section
        class="workbench"
        data-smoke-state={retrying ? 'retry' : 'active'}
        data-smoke-variation={currentCase.id}
        aria-labelledby="case-title"
      >
        <div class="brief">
          <p class="chapter">Chantier {currentIndex + 1} · {currentCase.chapter}</p>
          <h1 id="case-title">{currentCase.people}</h1>
          <p class="mission"><strong>Mission :</strong> {currentCase.need}</p>
        </div>

        {#if retrying}
          <div class="scaffold" role="status" aria-live="polite">
            <span class="cue" aria-hidden="true">?</span>
            <div>
              <strong>Reconstruis avec cet indice</strong>
              <p>{currentCase.scaffold}</p>
            </div>
          </div>
        {/if}

        <div class="site-card">
          <div class="site-visual" aria-hidden="true">
            <span class="ground">· · ·</span>
            <span class="site-symbol">◇</span>
          </div>
          <div>
            <p class="label">Site avant construction</p>
            <h2>{currentCase.site}</h2>
            <p>{currentCase.before}</p>
            <p class="spatial-link"><span aria-hidden="true">⌁</span> {currentCase.link}</p>
          </div>
        </div>

        <fieldset>
          <legend>Quel élément ajoutes-tu pour remplir la mission&nbsp;?</legend>
          <div class="addition-grid">
            {#each currentCase.additions as addition}
              <button
                class="addition"
                type="button"
                on:click={() => build(addition)}
                data-smoke-answer={addition.correct ? 'correct' : 'incorrect'}
                data-smoke-attempt={addition.correct ? 'correct' : 'incorrect'}
              >
                <span class="addition-symbol" aria-hidden="true">{addition.symbol}</span>
                <span>
                  <strong>{addition.label}</strong>
                  <small>{addition.detail}</small>
                </span>
                <span class="commit">Ajouter et vérifier</span>
              </button>
            {/each}
          </div>
        </fieldset>
      </section>
    {:else if phase === 'incorrect'}
      <section class="feedback-card incorrect" data-smoke-state="incorrect" data-smoke-variation={currentCase.id} aria-labelledby="incorrect-title">
        <div class="submitted-model">
          <span class="large-symbol" aria-hidden="true">{submitted?.symbol}</span>
          <div>
            <p class="label">Élément ajouté</p>
            <h2>{submitted?.label}</h2>
          </div>
        </div>
        <div role="status" aria-live="polite">
          <p class="feedback-title" id="incorrect-title"><span aria-hidden="true">✗</span> La fonction ne répond pas encore à la mission</p>
          <p data-smoke-feedback="incorrect" data-smoke-feedback-detail>{currentCase.incorrectFeedback}</p>
        </div>
        <button class="secondary" type="button" on:click={retry} data-smoke-action="retry">
          Voir l’indice et reconstruire
          <span aria-hidden="true">↺</span>
        </button>
      </section>
    {:else if phase === 'correct'}
      <section class="feedback-card correct" data-smoke-state="correct" data-smoke-variation={currentCase.id} aria-labelledby="correct-title">
        <div class="submitted-model built">
          <span class="large-symbol" aria-hidden="true">{submitted?.symbol}</span>
          <div>
            <p class="label">Lieu transformé</p>
            <h2>{currentCase.site}</h2>
            <p>{submitted?.label}</p>
          </div>
        </div>
        <div role="status" aria-live="polite">
          <p class="feedback-title" id="correct-title"><span aria-hidden="true">✓</span> La relation est construite</p>
          <p data-smoke-feedback="correct" data-smoke-feedback-detail>{currentCase.correctFeedback}</p>
        </div>
        <div class="relation" aria-label="Relation construite">
          <span>Besoin</span><b aria-hidden="true">→</b><span>Aménagement</span><b aria-hidden="true">→</b><span>Fonction</span>
        </div>
        <div class="continuation" data-smoke-state="continuation" data-smoke-variation={currentCase.id}>
          <p>{currentIndex === cases.length - 1 ? 'Les trois lieux sont prêts.' : 'Un autre lieu a besoin de toi.'}</p>
          <button class="primary" type="button" on:click={continueJourney} data-smoke-action="continue">
            {currentIndex === cases.length - 1 ? 'Terminer l’atelier' : 'Ouvrir le chantier suivant'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else}
      <section class="completion" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <p class="completion-mark" aria-hidden="true">⌂ · ▦ · ◉</p>
        <p class="kicker">Atelier terminé</p>
        <h1 id="complete-title">Trois lieux, trois fonctions construites</h1>
        <p class="lead">
          Pour choisir un aménagement, tu es parti du besoin, puis tu as cherché l’activité à rendre possible. Un même lieu peut aussi accueillir plusieurs fonctions.
        </p>
        <div class="takeaway">
          <strong>La stratégie à garder</strong>
          <p>« De quoi a-t-on besoin ? Qu’est-ce qu’on doit pouvoir faire ici ? »</p>
        </div>
      </section>
    {/if}
  </div>
</main>

<style>
  .prototype {
    --ink: #172a2b;
    --muted: #5b6b68;
    --paper: #fffdf7;
    --teal: #0f6b64;
    --teal-dark: #074b48;
    --sand: #f0e3c4;
    --line: #c9d4cd;
    min-height: calc(100vh - 42px);
    padding: clamp(12px, 3vw, 34px);
    color: var(--ink);
    background:
      radial-gradient(circle at 12% 12%, rgba(238, 179, 77, 0.2), transparent 22rem),
      linear-gradient(145deg, #eef5ee 0%, #f7f1df 100%);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .shell {
    width: min(100%, 980px);
    margin: 0 auto;
  }

  .masthead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .eyebrow,
  .chapter,
  .kicker,
  .label {
    margin: 0;
    color: var(--teal-dark);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .progress {
    display: flex;
    gap: 7px;
    margin: 0;
    color: #798682;
  }

  .progress .done,
  .progress .current {
    color: var(--teal);
  }

  .intro-card,
  .workbench,
  .feedback-card,
  .completion {
    overflow-wrap: anywhere;
    border: 1px solid rgba(23, 42, 43, 0.16);
    border-radius: 24px;
    background: var(--paper);
    box-shadow: 0 18px 50px rgba(32, 54, 48, 0.1);
  }

  .intro-card,
  .completion {
    padding: clamp(24px, 6vw, 58px);
  }

  h1 {
    max-width: 18ch;
    margin: 10px 0 14px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 7vw, 4.4rem);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 0.98;
  }

  h2 {
    margin: 4px 0 7px;
    font-size: clamp(1.2rem, 3vw, 1.65rem);
    line-height: 1.15;
  }

  p {
    line-height: 1.55;
  }

  .lead {
    max-width: 64ch;
    margin: 0 0 22px;
    color: #344744;
    font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  }

  .definition,
  .takeaway {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    max-width: 720px;
    padding: 16px;
    border-left: 5px solid #e4a937;
    border-radius: 10px;
    background: #fff4d9;
  }

  .definition > span {
    font-size: 1.5rem;
  }

  .definition p,
  .takeaway p {
    margin: 0;
  }

  .controls-note {
    color: var(--muted);
    font-size: 0.9rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #aebbb6;
    border-bottom-width: 2px;
    border-radius: 5px;
    background: white;
    font: inherit;
  }

  button {
    min-height: 48px;
    border: 0;
    font: inherit;
    cursor: pointer;
  }

  button:focus-visible {
    outline: 4px solid #1b75d0;
    outline-offset: 4px;
  }

  .primary,
  .secondary {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 13px 18px;
    border-radius: 12px;
    font-weight: 800;
  }

  .primary {
    color: white;
    background: var(--teal);
  }

  .primary:hover {
    background: var(--teal-dark);
  }

  .secondary {
    border: 2px solid var(--teal);
    color: var(--teal-dark);
    background: white;
  }

  .workbench {
    padding: clamp(16px, 4vw, 34px);
  }

  .brief {
    display: grid;
    gap: 4px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--line);
  }

  .brief h1 {
    max-width: 25ch;
    margin: 6px 0;
    font-size: clamp(1.75rem, 5vw, 3.2rem);
  }

  .mission {
    max-width: 70ch;
    margin: 3px 0 0;
    font-size: 1.05rem;
  }

  .scaffold {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    margin: 18px 0 0;
    padding: 14px;
    border: 2px dashed #b16b17;
    border-radius: 14px;
    background: #fff7e8;
  }

  .scaffold .cue {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: #9a5910;
    font-weight: 900;
  }

  .scaffold p {
    margin: 4px 0 0;
  }

  .site-card {
    display: grid;
    grid-template-columns: minmax(120px, 0.38fr) 1fr;
    gap: 22px;
    align-items: center;
    margin: 22px 0;
    padding: 18px;
    border-radius: 18px;
    background: #edf3ef;
  }

  .site-visual {
    display: grid;
    min-height: 150px;
    place-items: center;
    border: 2px dashed #79948a;
    border-radius: 14px;
    color: #46675f;
    background: repeating-linear-gradient(135deg, #ddeae2 0 12px, #e9f0eb 12px 24px);
  }

  .site-symbol {
    font-size: 4rem;
  }

  .ground {
    align-self: end;
    letter-spacing: 0.45em;
  }

  .site-card p {
    margin: 0;
  }

  .spatial-link {
    margin-top: 10px !important;
    color: var(--teal-dark);
    font-size: 0.9rem;
    font-weight: 700;
  }

  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    margin-bottom: 12px;
    font-size: 1.05rem;
    font-weight: 800;
  }

  .addition-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .addition {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    min-height: 148px;
    align-items: start;
    padding: 16px;
    border: 2px solid #b8c8c0;
    border-radius: 16px;
    color: var(--ink);
    background: white;
    text-align: left;
  }

  .addition:hover {
    border-color: var(--teal);
    background: #f3faf6;
  }

  .addition-symbol {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 12px;
    color: var(--teal-dark);
    background: var(--sand);
    font-size: 1.75rem;
  }

  .addition strong,
  .addition small,
  .commit {
    display: block;
  }

  .addition small {
    margin-top: 6px;
    color: var(--muted);
    font-size: 0.87rem;
    line-height: 1.4;
  }

  .commit {
    grid-column: 1 / -1;
    margin-top: auto;
    color: var(--teal-dark);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .feedback-card {
    display: grid;
    gap: 20px;
    padding: clamp(18px, 4vw, 36px);
    border-top: 8px solid #8e3d36;
  }

  .feedback-card.correct {
    border-top-color: var(--teal);
  }

  .submitted-model {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    align-items: center;
    padding: 17px;
    border-radius: 16px;
    background: #f6ece8;
  }

  .submitted-model.built {
    background: #e8f4ed;
  }

  .submitted-model p,
  .submitted-model h2 {
    margin-top: 0;
    margin-bottom: 3px;
  }

  .large-symbol {
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border: 2px solid currentColor;
    border-radius: 16px;
    font-size: 2.2rem;
  }

  .feedback-title {
    margin: 0 0 7px;
    font-size: 1.25rem;
    font-weight: 900;
  }

  [data-smoke-feedback-detail] {
    max-width: 72ch;
    margin: 0;
    font-size: 1.03rem;
  }

  .relation {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .relation span {
    padding: 8px 10px;
    border: 1px solid #92b8aa;
    border-radius: 999px;
    background: #edf7f1;
    font-weight: 800;
  }

  .continuation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
  }

  .continuation p {
    margin: 0;
    font-weight: 700;
  }

  .completion {
    text-align: center;
  }

  .completion h1,
  .completion .lead,
  .completion .takeaway {
    margin-right: auto;
    margin-left: auto;
  }

  .completion-mark {
    margin: 0 0 12px;
    color: var(--teal);
    font-size: 2rem;
    letter-spacing: 0.15em;
  }

  .takeaway {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }

  @media (max-width: 600px) {
    .prototype {
      padding: 12px;
    }

    .masthead {
      align-items: flex-start;
    }

    .eyebrow {
      max-width: 19ch;
    }

    .intro-card,
    .workbench,
    .feedback-card,
    .completion {
      border-radius: 17px;
    }

    .site-card,
    .addition-grid {
      grid-template-columns: 1fr;
    }

    .site-visual {
      min-height: 104px;
    }

    .addition {
      min-height: 128px;
    }

    .continuation {
      align-items: stretch;
      flex-direction: column;
    }

    .primary,
    .secondary {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype,
    .prototype * {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
