<script lang="ts">
  type Phase = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';

  type Bin = {
    id: string;
    label: string;
    action: string;
    symbol: string;
    correct: boolean;
  };

  type SortCard = {
    id: string;
    place: string;
    descriptor: string;
    evidenceLabel: string;
    evidence: string;
    spatialNote: string;
    bins: [Bin, Bin];
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
  };

  const cards: SortCard[] = [
    {
      id: 'bibliotheque-action',
      place: 'Bibliothèque de quartier',
      descriptor: 'Une salle avec des livres, des tables et une personne qui renseigne.',
      evidenceLabel: 'Activité observée',
      evidence: 'On vient y lire, emprunter un livre ou chercher une information.',
      spatialNote: 'Lieu fréquenté près de l’école.',
      bins: [
        {
          id: 'learn',
          label: 'Apprendre et échanger des idées',
          action: 'Lire, chercher une information, partager un livre',
          symbol: 'A',
          correct: true
        },
        {
          id: 'shelter',
          label: 'Habiter et se protéger',
          action: 'Dormir, cuisiner, vivre dans un logement',
          symbol: '⌂',
          correct: false
        }
      ],
      incorrectFeedback:
        '✗ Tu as classé la fiche dans « Habiter et se protéger ». Or l’indice parle de lire, emprunter et chercher : ces actions soutiennent l’apprentissage et l’échange d’idées.',
      scaffold:
        'Loupe : souligne mentalement les verbes « lire », « emprunter » et « chercher ». Quel bac reprend ces actions ?',
      correctFeedback:
        '✓ L’indice décrit la lecture, l’emprunt et la recherche d’informations : il atteste ici la fonction « apprendre et échanger des idées ».'
    },
    {
      id: 'marche-flux',
      place: 'Marché couvert',
      descriptor: 'Des étals occupent une halle deux matins par semaine.',
      evidenceLabel: 'Chaîne observée',
      evidence: 'Des aliments arrivent de fermes de la région, puis les habitantes et habitants les choisissent.',
      spatialNote: 'Le quartier est relié à des espaces de production de la région.',
      bins: [
        {
          id: 'play',
          label: 'Jouer et se divertir',
          action: 'Pratiquer un jeu, regarder un spectacle, se détendre',
          symbol: '◇',
          correct: false
        },
        {
          id: 'supply',
          label: 'S’approvisionner',
          action: 'Recevoir, présenter puis choisir des produits',
          symbol: '▦',
          correct: true
        }
      ],
      incorrectFeedback:
        '✗ Le bac « Jouer et se divertir » ne reprend pas la chaîne décrite. Livrer des aliments puis les choisir correspond à la fonction d’approvisionnement du marché.',
      scaffold:
        'Loupe : suis les produits. Ils arrivent, sont présentés, puis choisis. Quel bac décrit ce parcours ?',
      correctFeedback:
        '✓ Les aliments sont livrés puis choisis : cet enchaînement prouve la fonction d’approvisionnement et relie le marché à la région.'
    },
    {
      id: 'arret-liaison',
      place: 'Arrêt de car du quartier',
      descriptor: 'Un poteau, un horaire et un abri marquent le point d’arrêt.',
      evidenceLabel: 'Relation observée',
      evidence: 'Le car relie le quartier au bourg proche pour l’école, les visites ou les courses.',
      spatialNote: 'Deux lieux proches sont reliés par un trajet régulier.',
      bins: [
        {
          id: 'move',
          label: 'Se déplacer et relier des lieux',
          action: 'Partir, arriver, rejoindre un autre lieu',
          symbol: '⇄',
          correct: true
        },
        {
          id: 'eat',
          label: 'Se nourrir',
          action: 'Préparer, servir ou manger des aliments',
          symbol: '○',
          correct: false
        }
      ],
      incorrectFeedback:
        '✗ L’arrêt ne prépare ni ne sert d’aliments. L’indice central est la liaison entre le quartier et le bourg : sa fonction attestée concerne le déplacement.',
      scaffold:
        'Loupe : repère les verbes « relie » et « rejoindre ». Dans quel bac les personnes changent-elles de lieu ?',
      correctFeedback:
        '✓ L’horaire et le trajet permettent de rejoindre le bourg depuis le quartier : ils attestent la fonction « se déplacer et relier des lieux ».'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentCard: SortCard = cards[0];
  let retrying = false;
  let submitted: Bin | null = null;
  let sortingPath: string[] = [];

  $: legacyState = phase === 'intro' ? 'ready' : phase;

  function start(): void {
    currentIndex = 0;
    currentCard = cards[0];
    retrying = false;
    submitted = null;
    sortingPath = [];
    phase = 'question';
  }

  function sortInto(bin: Bin): void {
    submitted = bin;
    retrying = false;
    sortingPath = [...sortingPath, `${currentCard.id}:${bin.id}`];
    phase = bin.correct ? 'correct' : 'incorrect';
  }

  function retry(): void {
    submitted = null;
    retrying = true;
    phase = 'question';
  }

  function nextCard(): void {
    if (currentIndex === cards.length - 1) {
      phase = 'complete';
      return;
    }

    currentIndex += 1;
    currentCard = cards[currentIndex];
    submitted = null;
    retrying = false;
    phase = 'question';
  }
</script>

<main
  class="prototype"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0301"
  data-smoke-root
  data-smoke-exercise="EX-0301"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <div class="desk">
    <header class="topline">
      <div>
        <p>Géographie · Centre de tri</p>
        <span>Fonction = ce que le lieu permet de faire</span>
      </div>
      <ol aria-label="Progression des trois fiches">
        {#each cards as card, index}
          <li class:past={phase === 'complete' || index < currentIndex} class:now={index === currentIndex && phase !== 'intro' && phase !== 'complete'}>
            <span aria-hidden="true">{phase === 'complete' || index < currentIndex ? '✓' : index + 1}</span>
            <span class="sr-only">{card.place}</span>
          </li>
        {/each}
      </ol>
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="stamp" aria-hidden="true">TRI</div>
        <p class="overline">Trois fiches · trois types d’indices</p>
        <h1 id="intro-title">Le tri des lieux utiles</h1>
        <p class="lead">
          Lis ce qu’on fait dans chaque lieu. Ensuite, envoie la fiche vers le bac dont la fonction correspond à l’indice.
        </p>
        <div class="rule-card">
          <span aria-hidden="true">1</span><p><strong>Repère l’action.</strong> Ne te fie pas seulement au nom ou à l’apparence du lieu.</p>
          <span aria-hidden="true">2</span><p><strong>Choisis la fonction attestée.</strong> Un lieu peut avoir d’autres usages, mais la fiche donne un indice précis.</p>
        </div>
        <p class="controls-note">Au clavier : <kbd>Tab</kbd> pour rejoindre un bac, puis <kbd>Entrée</kbd> ou <kbd>Espace</kbd> pour y classer la fiche.</p>
        <button class="start" type="button" on:click={start} data-smoke-action="start">Faire venir la première fiche <span aria-hidden="true">↓</span></button>
      </section>
    {:else if phase === 'question'}
      <section
        class="sorting"
        data-smoke-state={retrying ? 'retry' : 'active'}
        data-smoke-variation={currentCard.id}
        aria-labelledby="card-title"
      >
        <p class="counter">Fiche {currentIndex + 1} / {cards.length}</p>
        {#if retrying}
          <aside class="loupe" role="status" aria-live="polite">
            <span aria-hidden="true">⌕</span>
            <div><strong>Relis avec la loupe</strong><p>{currentCard.scaffold}</p></div>
          </aside>
        {/if}

        <article class="place-card">
          <div class="clip" aria-hidden="true"></div>
          <p class="place-label">Lieu à classer</p>
          <h1 id="card-title">{currentCard.place}</h1>
          <p class="descriptor">{currentCard.descriptor}</p>
          <blockquote>
            <span>{currentCard.evidenceLabel}</span>
            <strong>{currentCard.evidence}</strong>
          </blockquote>
          <p class="spatial"><span aria-hidden="true">⌁</span> {currentCard.spatialNote}</p>
        </article>

        <fieldset>
          <legend>Vers quelle fonction envoies-tu cette fiche&nbsp;?</legend>
          <div class="bins">
            {#each currentCard.bins as bin}
              <button
                class="bin"
                type="button"
                on:click={() => sortInto(bin)}
                data-smoke-answer={bin.correct ? 'correct' : 'incorrect'}
                data-smoke-attempt={bin.correct ? 'correct' : 'incorrect'}
              >
                <span class="bin-top"><span class="bin-symbol" aria-hidden="true">{bin.symbol}</span><strong>{bin.label}</strong></span>
                <span class="bin-action">{bin.action}</span>
                <span class="drop-label">Classer ici <span aria-hidden="true">↓</span></span>
              </button>
            {/each}
          </div>
        </fieldset>
      </section>
    {:else if phase === 'incorrect'}
      <section class="result wrong" data-smoke-state="incorrect" data-smoke-variation={currentCard.id} aria-labelledby="wrong-title">
        <div class="filed-card">
          <p class="mini-label">Fiche envoyée</p>
          <h2>{currentCard.place}</h2>
          <p>vers <strong>{submitted?.label}</strong></p>
        </div>
        <div class="result-copy" role="status" aria-live="polite">
          <p class="result-kicker" id="wrong-title"><span aria-hidden="true">✗</span> Le bac ne reprend pas l’indice</p>
          <p data-smoke-feedback="incorrect" data-smoke-feedback-detail>{currentCard.incorrectFeedback}</p>
        </div>
        <button class="retry" type="button" on:click={retry} data-smoke-action="retry">Relire avec la loupe <span aria-hidden="true">⌕</span></button>
      </section>
    {:else if phase === 'correct'}
      <section class="result right" data-smoke-state="correct" data-smoke-variation={currentCard.id} aria-labelledby="right-title">
        <div class="filed-card accepted">
          <p class="mini-label">Classement retenu</p>
          <h2>{currentCard.place}</h2>
          <p>vers <strong>{submitted?.label}</strong></p>
        </div>
        <div class="result-copy" role="status" aria-live="polite">
          <p class="result-kicker" id="right-title"><span aria-hidden="true">✓</span> L’indice soutient ce classement</p>
          <p data-smoke-feedback="correct" data-smoke-feedback-detail>{currentCard.correctFeedback}</p>
        </div>
        <div class="invariant">
          <span>Indice d’activité</span><b aria-hidden="true">→</b><span>Fonction attestée</span>
        </div>
        <div class="continuation" data-smoke-state="continuation" data-smoke-variation={currentCard.id}>
          <p>{currentIndex === cards.length - 1 ? 'Le casier contient les trois fiches.' : 'Une fiche différente attend sur le tapis.'}</p>
          <button class="next" type="button" on:click={nextCard} data-smoke-action="continue">
            {currentIndex === cards.length - 1 ? 'Fermer le centre de tri' : 'Faire venir la fiche suivante'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else}
      <section class="complete" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <div class="complete-symbols" aria-hidden="true"><span>A</span><span>▦</span><span>⇄</span></div>
        <p class="overline">Tri terminé</p>
        <h1 id="complete-title">Les trois fonctions sont justifiées</h1>
        <p class="lead">
          Tu as utilisé des actions, une chaîne de produits puis une liaison entre lieux. La stratégie reste la même : chercher ce que le lieu permet réellement de faire.
        </p>
        <div class="final-rule"><strong>Indice → activité → fonction</strong><p>Le nom du lieu donne une piste ; l’activité donne la preuve dans la situation.</p></div>
      </section>
    {/if}
  </div>
</main>

<style>
  .prototype {
    --navy: #16324a;
    --blue: #1f5e8c;
    --ink: #17222b;
    --paper: #fffefa;
    --yellow: #f2c94c;
    --cream: #f5f0df;
    min-height: calc(100vh - 42px);
    padding: clamp(12px, 3vw, 30px);
    color: var(--ink);
    background-color: #dce9ef;
    background-image:
      linear-gradient(rgba(31, 94, 140, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(31, 94, 140, 0.06) 1px, transparent 1px);
    background-size: 24px 24px;
    font-family: 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif;
  }

  .desk {
    width: min(100%, 960px);
    margin: 0 auto;
  }

  .topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    color: var(--navy);
  }

  .topline p {
    margin: 0;
    font-size: 0.76rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .topline > div > span {
    font-size: 0.76rem;
  }

  .topline ol {
    display: flex;
    gap: 7px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .topline li {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 2px solid #758b9b;
    border-radius: 4px;
    background: #eef5f7;
    font-weight: 900;
  }

  .topline li.past,
  .topline li.now {
    border-color: var(--navy);
  }

  .topline li.past {
    color: white;
    background: var(--navy);
  }

  .topline li.now {
    box-shadow: inset 0 -5px 0 var(--yellow);
  }

  .intro,
  .sorting,
  .result,
  .complete {
    position: relative;
    overflow-wrap: anywhere;
    border: 2px solid var(--navy);
    border-radius: 7px;
    background: var(--paper);
    box-shadow: 10px 10px 0 rgba(22, 50, 74, 0.16);
  }

  .intro,
  .complete {
    padding: clamp(24px, 6vw, 58px);
  }

  .stamp {
    position: absolute;
    top: 22px;
    right: 24px;
    padding: 8px;
    border: 3px double var(--blue);
    color: var(--blue);
    font-weight: 900;
    letter-spacing: 0.12em;
    transform: rotate(3deg);
  }

  .overline,
  .place-label,
  .counter,
  .mini-label,
  .result-kicker {
    margin: 0;
    color: var(--blue);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 18ch;
    margin: 10px 0 14px;
    color: var(--navy);
    font-size: clamp(2rem, 7vw, 4rem);
    letter-spacing: -0.045em;
    line-height: 0.98;
  }

  h2 {
    margin: 5px 0;
    color: var(--navy);
    font-size: clamp(1.3rem, 4vw, 2rem);
  }

  p {
    line-height: 1.5;
  }

  .lead {
    max-width: 62ch;
    margin: 0 0 22px;
    color: #354959;
    font-size: clamp(1rem, 2.2vw, 1.25rem);
  }

  .rule-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 9px 12px;
    max-width: 700px;
    padding: 17px;
    border: 1px solid #aabcc7;
    border-left: 8px solid var(--yellow);
    background: #f6fafb;
  }

  .rule-card > span {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--navy);
    font-weight: 900;
  }

  .rule-card p {
    margin: 2px 0 10px;
  }

  .controls-note {
    color: #4e6474;
    font-size: 0.9rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #8298a6;
    border-bottom-width: 3px;
    border-radius: 4px;
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
    outline: 4px solid #b04fd0;
    outline-offset: 4px;
  }

  .start,
  .retry,
  .next {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 13px 17px;
    border-radius: 4px;
    color: white;
    background: var(--navy);
    font-weight: 900;
  }

  .start:hover,
  .retry:hover,
  .next:hover {
    background: var(--blue);
  }

  .sorting {
    padding: clamp(16px, 4vw, 32px);
  }

  .counter {
    width: fit-content;
    padding: 5px 8px;
    color: var(--navy);
    background: var(--yellow);
  }

  .loupe {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    margin: 16px 0;
    padding: 14px;
    border: 2px solid #986b00;
    background: #fff7cf;
  }

  .loupe > span {
    font-size: 2rem;
  }

  .loupe p {
    margin: 4px 0 0;
  }

  .place-card {
    position: relative;
    max-width: 720px;
    margin: 20px auto 28px;
    padding: clamp(18px, 4vw, 30px);
    border: 1px solid #8ba1ae;
    background: #fffdf5;
    box-shadow: 5px 6px 0 #c7d4da;
  }

  .clip {
    position: absolute;
    top: -12px;
    left: 50%;
    width: 58px;
    height: 24px;
    border: 3px solid #71828c;
    border-radius: 20px 20px 0 0;
    transform: translateX(-50%);
  }

  .place-card h1 {
    max-width: 25ch;
    margin: 6px 0 10px;
    font-size: clamp(1.8rem, 5vw, 3rem);
  }

  .descriptor {
    margin: 0 0 15px;
    color: #4c5e68;
  }

  blockquote {
    margin: 0;
    padding: 14px;
    border-left: 6px solid var(--yellow);
    background: #f4f7f7;
  }

  blockquote span,
  blockquote strong {
    display: block;
  }

  blockquote span {
    margin-bottom: 5px;
    color: var(--blue);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .spatial {
    margin: 14px 0 0;
    color: var(--blue);
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
    margin-bottom: 11px;
    font-weight: 900;
  }

  .bins {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .bin {
    display: grid;
    min-height: 160px;
    align-content: space-between;
    gap: 10px;
    padding: 14px;
    border: 3px solid var(--navy);
    border-top-width: 13px;
    border-radius: 3px 3px 11px 11px;
    color: var(--ink);
    background: #edf4f7;
    text-align: left;
  }

  .bin:hover {
    background: #fff5bd;
  }

  .bin-top {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    align-items: center;
  }

  .bin-symbol {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 2px solid var(--navy);
    border-radius: 50%;
    background: white;
    font-size: 1.25rem;
    font-weight: 900;
  }

  .bin-action {
    color: #4e626f;
    font-size: 0.87rem;
    line-height: 1.4;
  }

  .drop-label {
    padding-top: 9px;
    border-top: 1px dashed #7c929f;
    color: var(--blue);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-align: center;
    text-transform: uppercase;
  }

  .result {
    display: grid;
    grid-template-columns: minmax(180px, 0.35fr) 1fr;
    gap: 22px;
    padding: clamp(18px, 4vw, 34px);
    border-top-width: 10px;
    border-top-color: #9f403b;
  }

  .result.right {
    border-top-color: #28734e;
  }

  .filed-card {
    align-self: start;
    padding: 16px;
    border: 1px solid #bd9e9c;
    background: #fff1ef;
    box-shadow: 4px 4px 0 #e2c7c3;
  }

  .filed-card.accepted {
    border-color: #8eae9d;
    background: #eaf5ee;
    box-shadow: 4px 4px 0 #bdd3c7;
  }

  .filed-card p {
    margin: 4px 0;
  }

  .result-copy {
    align-self: center;
  }

  .result-kicker {
    color: #82342f;
  }

  .right .result-kicker {
    color: #1d6743;
  }

  [data-smoke-feedback-detail] {
    max-width: 65ch;
    margin: 8px 0 0;
    font-size: 1.04rem;
  }

  .retry {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .invariant {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 13px;
    border: 1px dashed var(--blue);
    background: #edf7fa;
  }

  .invariant span {
    font-weight: 900;
  }

  .continuation {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding-top: 18px;
    border-top: 1px solid #adbec7;
  }

  .continuation p {
    margin: 0;
    font-weight: 700;
  }

  .complete {
    text-align: center;
  }

  .complete h1,
  .complete .lead,
  .final-rule {
    margin-right: auto;
    margin-left: auto;
  }

  .complete-symbols {
    display: flex;
    justify-content: center;
    gap: 9px;
    margin-bottom: 15px;
  }

  .complete-symbols span {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 2px solid var(--navy);
    background: var(--yellow);
    font-weight: 900;
  }

  .final-rule {
    max-width: 600px;
    padding: 16px;
    border: 2px solid var(--navy);
    border-left-width: 10px;
    text-align: left;
  }

  .final-rule p {
    margin: 5px 0 0;
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

    .topline > div > span,
    .stamp {
      display: none;
    }

    .intro,
    .sorting,
    .result,
    .complete {
      box-shadow: 5px 5px 0 rgba(22, 50, 74, 0.14);
    }

    .bins,
    .result {
      grid-template-columns: 1fr;
    }

    .bin {
      min-height: 142px;
    }

    .retry,
    .invariant,
    .continuation {
      grid-column: 1;
    }

    .continuation {
      align-items: stretch;
      flex-direction: column;
    }

    .start,
    .retry,
    .next {
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
