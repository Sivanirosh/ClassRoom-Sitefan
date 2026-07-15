<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';

  type SourceCard = {
    id: string;
    kind: string;
    title: string;
    content: string;
    provides: string;
    mark: string;
    correct: boolean;
  };

  type InquiryCase = {
    id: string;
    context: string;
    place: string;
    question: string;
    hypothesis: string;
    needed: string;
    spatialLink: string;
    sources: [SourceCard, SourceCard];
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
    completedLink: string;
  };

  const inquiries: InquiryCase[] = [
    {
      id: 'livraisons-marche',
      context: 'Approvisionnement · Observation de terrain',
      place: 'Halle du quartier des Tilleuls — lieu fictif',
      question: 'Pourquoi les camionnettes arrivent-elles surtout par la rue Est le mardi matin ?',
      hypothesis: 'La rue Est offre peut-être l’accès le plus direct à la zone de livraison.',
      needed: 'Un indice sur le trajet réel des véhicules et leur point d’arrêt.',
      spatialLink: 'Le marché proche reçoit des produits venant de fermes de la région.',
      sources: [
        {
          id: 'affiche-fete',
          kind: 'Affiche locale',
          title: '« Fête sous la halle samedi »',
          content: 'L’affiche donne l’heure des spectacles et montre l’entrée principale décorée.',
          provides: 'Elle informe sur un loisir du samedi, pas sur le trajet des livraisons du mardi.',
          mark: 'A',
          correct: false
        },
        {
          id: 'releve-arrivees',
          kind: 'Relevé d’observation',
          title: 'Six arrivées entre 7 h et 8 h',
          content: 'Les six camionnettes entrent par la rue Est et s’arrêtent devant la zone marquée « livraison ».',
          provides: 'Il montre le trajet et l’arrêt des véhicules au moment demandé.',
          mark: 'O',
          correct: true
        }
      ],
      incorrectFeedback:
        '✗ L’affiche parle bien de la halle, mais elle décrit une fête du samedi. Elle ne montre ni le trajet ni l’arrêt des camionnettes du mardi matin.',
      scaffold:
        'Nous cherchons un trajet et un point d’arrêt. Compare ce que chaque source permet de voir, pas seulement le lieu qu’elle nomme.',
      correctFeedback:
        '✓ Le relevé suit les camionnettes au moment demandé : leurs entrées par la rue Est et leur arrêt devant la zone de livraison apportent l’indice nécessaire.',
      completedLink: 'Le relevé soutient l’hypothèse pour ce mardi matin ; il ne prouve pas que tous les véhicules passent toujours par là.'
    },
    {
      id: 'ombre-place',
      context: 'Loisirs · Série de photographies décrites',
      place: 'Place des Marronniers — lieu fictif',
      question: 'Pourquoi les bancs du bord ouest sont-ils davantage occupés l’après-midi ?',
      hypothesis: 'L’ombre des arbres rend peut-être ces bancs plus agréables après midi.',
      needed: 'Un indice qui compare l’ombre et l’occupation selon le moment de la journée.',
      spatialLink: 'La place est un espace fréquenté près de l’école et des logements.',
      sources: [
        {
          id: 'photos-heures',
          kind: 'Trois photographies décrites',
          title: '9 h · 13 h · 16 h',
          content: 'À 16 h, l’ombre couvre les bancs ouest et plusieurs personnes y sont assises ; les autres bancs restent au soleil.',
          provides: 'La série permet de comparer au même endroit l’ombre et l’occupation au fil de la journée.',
          mark: 'P',
          correct: true
        },
        {
          id: 'inventaire-jeux',
          kind: 'Fiche d’équipement',
          title: 'Deux bancs, une table et un jeu',
          content: 'La fiche compte les équipements présents, sans indiquer l’ombre, l’heure ni leur occupation.',
          provides: 'Elle décrit ce qui est installé mais ne teste pas la relation avec l’après-midi.',
          mark: 'I',
          correct: false
        }
      ],
      incorrectFeedback:
        '✗ L’inventaire confirme qu’il existe des bancs, mais la question porte sur leur occupation l’après-midi. Sans heure ni ombre, le maillon reste vide.',
      scaffold:
        'Nous cherchons deux informations ensemble : où tombe l’ombre et qui occupe les bancs à plusieurs heures. Quelle source permet cette comparaison ?',
      correctFeedback:
        '✓ La série compare les heures, l’ombre et l’occupation au même endroit. Elle permet donc de tester la relation proposée pour l’après-midi observé.',
      completedLink: 'Les photographies soutiennent un lien possible entre ombre et occupation, sans établir à elles seules la préférence de chaque personne.'
    },
    {
      id: 'provenance-produits',
      context: 'Échanges · Plan simplifié',
      place: 'Épicerie coopérative du quartier — lieu fictif',
      question: 'Par quels liens les légumes arrivent-ils des fermes de la région jusqu’au quartier ?',
      hypothesis: 'Une route régionale puis la rue du Pont relient peut-être les fermes au point de vente.',
      needed: 'Un indice qui relie les lieux de départ, les voies suivies et le point d’arrivée.',
      spatialLink: 'Le quartier proche est relié à des espaces de production plus lointains dans la région.',
      sources: [
        {
          id: 'liste-rayons',
          kind: 'Liste de rayons',
          title: 'Fruits · légumes · pain · boissons',
          content: 'La liste indique les familles de produits rangées dans l’épicerie, sans montrer leur provenance ni leur trajet.',
          provides: 'Elle répond à « que trouve-t-on ici ? », pas à « par où cela arrive-t-il ? ».',
          mark: 'L',
          correct: false
        },
        {
          id: 'plan-trajets',
          kind: 'Plan simplifié annoté',
          title: 'Fermes → route régionale → rue du Pont → épicerie',
          content: 'Des flèches relient deux fermes à la route régionale, puis à la rue du Pont et à l’arrière de l’épicerie.',
          provides: 'Il met en relation départs, voies et arrivée dans l’ordre du trajet.',
          mark: '↦',
          correct: true
        }
      ],
      incorrectFeedback:
        '✗ La liste nomme les produits présents, mais elle ne relie aucun lieu et aucune voie. Elle ne permet pas de vérifier l’hypothèse sur le trajet.',
      scaffold:
        'Nous cherchons une chaîne de lieux : départ, voies, arrivée. Repère la source qui rend ces liens visibles dans le bon ordre.',
      correctFeedback:
        '✓ Le plan relie les fermes, la route régionale, la rue du Pont et l’épicerie. Ces repères testent précisément l’hypothèse de trajet.',
      completedLink: 'Le plan montre une liaison possible entre espaces proches et régionaux ; il ne dit pas que tous les produits suivent ce trajet.'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentInquiry: InquiryCase = inquiries[0];
  let retrying = false;
  let submitted: SourceCard | null = null;
  let responsePath: string[] = [];
  let stateHeading: HTMLElement | null = null;

  $: legacyState = phase === 'intro' ? 'ready' : phase;

  async function focusCurrentState(): Promise<void> {
    await tick();
    stateHeading?.focus();
  }

  function start(): void {
    currentIndex = 0;
    currentInquiry = inquiries[0];
    retrying = false;
    submitted = null;
    responsePath = [];
    phase = 'question';
    void focusCurrentState();
  }

  function connectSource(source: SourceCard): void {
    submitted = source;
    retrying = false;
    responsePath = [...responsePath, `${currentInquiry.id}:${source.id}`];
    phase = source.correct ? 'correct' : 'incorrect';
    void focusCurrentState();
  }

  function retry(): void {
    submitted = null;
    retrying = true;
    phase = 'question';
    void focusCurrentState();
  }

  function continueInquiry(): void {
    if (currentIndex === inquiries.length - 1) {
      phase = 'complete';
      void focusCurrentState();
      return;
    }

    currentIndex += 1;
    currentInquiry = inquiries[currentIndex];
    submitted = null;
    retrying = false;
    phase = 'question';
    void focusCurrentState();
  }
</script>

<main
  class="prototype"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0315"
  data-smoke-root
  data-smoke-exercise="EX-0315"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <div class="workspace">
    <header class="topbar">
      <div class="brand"><span aria-hidden="true">⌁</span><div><strong>Le fil de l’enquête</strong><small>Atelier de géographie</small></div></div>
      <ol aria-label="Progression des trois enquêtes">
        {#each inquiries as inquiry, index}
          <li class:done={phase === 'complete' || index < currentIndex} class:current={index === currentIndex && phase !== 'intro' && phase !== 'complete'}>
            <span aria-hidden="true">{phase === 'complete' || index < currentIndex ? '✓' : index + 1}</span>
            <span class="sr-only">{inquiry.context}</span>
          </li>
        {/each}
      </ol>
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <p class="overline">Question → hypothèse → indice</p>
        <h1 class="state-focus" id="intro-title" bind:this={stateHeading} tabindex="-1">Construis un fil qui tient</h1>
        <p class="lead">
          Trois enquêtes ont un maillon vide. Lis la question et l’hypothèse, puis branche la source qui apporte vraiment l’indice recherché.
        </p>
        <div class="definitions">
          <div><span aria-hidden="true">?</span><p><strong>Une hypothèse</strong> est une réponse possible. Elle doit encore être testée.</p></div>
          <div><span aria-hidden="true">⌕</span><p><strong>Un indice pertinent</strong> apporte une information utile à cette question précise.</p></div>
        </div>
        <p class="controls-note">Au clavier, utilise <kbd>Tab</kbd>, puis <kbd>Entrée</kbd> ou <kbd>Espace</kbd>. Aucun glisser n’est nécessaire.</p>
        <button class="primary" type="button" on:click={start} data-smoke-action="start">
          Dérouler le premier fil <span aria-hidden="true">→</span>
        </button>
      </section>
    {:else if phase === 'question'}
      <section
        class="board"
        data-smoke-state={retrying ? 'retry' : 'active'}
        data-smoke-variation={currentInquiry.id}
        aria-labelledby="inquiry-title"
      >
        <div class="case-head">
          <p class="overline">Enquête {currentIndex + 1} · {currentInquiry.context}</p>
          <h1 class="state-focus" id="inquiry-title" bind:this={stateHeading} tabindex="-1">{currentInquiry.place}</h1>
          <p class="spatial"><span aria-hidden="true">⌖</span> {currentInquiry.spatialLink}</p>
        </div>

        {#if retrying}
          <aside class="scaffold" role="status" aria-live="polite">
            <span aria-hidden="true">⇆</span>
            <div><strong>Compare les informations, pas les décors</strong><p>{currentInquiry.scaffold}</p></div>
          </aside>
        {/if}

        <div class="thread" aria-label="Fil d’enquête incomplet">
          <article>
            <p class="node-label">Question</p>
            <strong>{currentInquiry.question}</strong>
          </article>
          <span class="connector" aria-hidden="true">→</span>
          <article>
            <p class="node-label">Hypothèse possible</p>
            <strong>{currentInquiry.hypothesis}</strong>
          </article>
          <span class="connector" aria-hidden="true">→</span>
          <article class="missing">
            <p class="node-label">Indice recherché</p>
            <strong>{currentInquiry.needed}</strong>
          </article>
        </div>

        <fieldset>
          <legend>Quelle source branches-tu sur le maillon « indice »&nbsp;?</legend>
          <div class="source-grid">
            {#each currentInquiry.sources as source}
              <button
                class="source-card"
                type="button"
                on:click={() => connectSource(source)}
                data-smoke-answer={source.correct ? 'correct' : 'incorrect'}
                data-smoke-attempt={source.correct ? 'correct' : 'incorrect'}
              >
                <span class="source-mark" aria-hidden="true">{source.mark}</span>
                <span class="source-copy">
                  <small>{source.kind}</small>
                  <strong>{source.title}</strong>
                  <span>{source.content}</span>
                </span>
                <span class="connect-label">Brancher et vérifier <span aria-hidden="true">↗</span></span>
              </button>
            {/each}
          </div>
        </fieldset>
      </section>
    {:else if phase === 'incorrect'}
      <section class="feedback wrong" data-smoke-state="incorrect" data-smoke-variation={currentInquiry.id} aria-labelledby="wrong-title">
        <div class="submitted-source">
          <span aria-hidden="true">{submitted?.mark}</span>
          <div><p>Source branchée</p><h2>{submitted?.title}</h2><small>{submitted?.provides}</small></div>
        </div>
        <div class="feedback-copy" role="status" aria-live="polite">
          <p class="result-label state-focus" id="wrong-title" bind:this={stateHeading} tabindex="-1"><span aria-hidden="true">✗</span> Le fil ne rejoint pas encore la question</p>
          <p data-smoke-feedback="incorrect" data-smoke-feedback-detail>{currentInquiry.incorrectFeedback}</p>
        </div>
        <button class="secondary" type="button" on:click={retry} data-smoke-action="retry">
          Comparer les deux informations <span aria-hidden="true">⇆</span>
        </button>
      </section>
    {:else if phase === 'correct'}
      <section class="feedback right" data-smoke-state="correct" data-smoke-variation={currentInquiry.id} aria-labelledby="right-title">
        <div class="submitted-source accepted">
          <span aria-hidden="true">{submitted?.mark}</span>
          <div><p>Indice relié</p><h2>{submitted?.title}</h2><small>{submitted?.provides}</small></div>
        </div>
        <div class="feedback-copy" role="status" aria-live="polite">
          <p class="result-label state-focus" id="right-title" bind:this={stateHeading} tabindex="-1"><span aria-hidden="true">✓</span> Le fil relie la source à l’hypothèse</p>
          <p data-smoke-feedback="correct" data-smoke-feedback-detail>{currentInquiry.correctFeedback}</p>
        </div>
        <div class="completed-thread">
          <span>Question</span><b aria-hidden="true">→</b><span>Hypothèse</span><b aria-hidden="true">→</b><span>Indice pertinent</span>
          <p>{currentInquiry.completedLink}</p>
        </div>
        <div class="continuation" data-smoke-state="continuation" data-smoke-variation={currentInquiry.id}>
          <p>{currentIndex === inquiries.length - 1 ? 'Les trois fils sont complets.' : 'Le prochain fil change de type de source.'}</p>
          <button class="primary" type="button" on:click={continueInquiry} data-smoke-action="continue">
            {currentIndex === inquiries.length - 1 ? 'Terminer l’atelier' : 'Dérouler le fil suivant'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else}
      <section class="complete" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <p class="complete-mark" aria-hidden="true">? ─ ◇ ─ ⌕</p>
        <p class="overline">Trois fils complétés</p>
        <h1 class="state-focus" id="complete-title" bind:this={stateHeading} tabindex="-1">Une source est utile par ce qu’elle permet de savoir</h1>
        <p class="lead">
          Tu as relié une observation, une série de photographies et un plan à trois hypothèses. Garde cette question : « Quelle information me faut-il vraiment pour tester mon idée ? »
        </p>
        <div class="takeaway"><strong>Question → hypothèse → indice</strong><p>Un même lieu dans le titre ne suffit pas : le contenu doit remplir le maillon recherché.</p></div>
      </section>
    {/if}
  </div>
</main>

<style>
  .prototype {
    --ink: #193044;
    --muted: #5a6c78;
    --paper: #fffdf5;
    --blue: #125d86;
    --blue-dark: #0b405e;
    --coral: #d05a47;
    --yellow: #f3c969;
    min-height: calc(100vh - 42px);
    padding: clamp(12px, 3vw, 34px);
    overflow-wrap: anywhere;
    color: var(--ink);
    background:
      linear-gradient(rgba(18, 93, 134, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(18, 93, 134, 0.07) 1px, transparent 1px),
      #eaf2f3;
    background-size: 28px 28px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .workspace {
    width: min(100%, 1040px);
    margin: 0 auto;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand > span {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue-dark);
    font-size: 1.35rem;
  }

  .brand strong,
  .brand small {
    display: block;
  }

  .brand small {
    margin-top: 2px;
    color: var(--muted);
    font-size: 0.72rem;
  }

  .topbar ol {
    display: flex;
    gap: 7px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .topbar li {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 2px solid #7894a1;
    border-radius: 50%;
    color: #49616e;
    background: #f7fbfa;
    font-weight: 900;
  }

  .topbar li.current,
  .topbar li.done {
    border-color: var(--blue-dark);
  }

  .topbar li.current {
    box-shadow: 0 0 0 4px var(--yellow);
  }

  .topbar li.done {
    color: white;
    background: var(--blue-dark);
  }

  .intro,
  .board,
  .feedback,
  .complete {
    border: 1px solid rgba(25, 48, 68, 0.25);
    border-radius: 22px;
    background: var(--paper);
    box-shadow: 0 18px 50px rgba(25, 48, 68, 0.12);
  }

  .intro,
  .complete {
    padding: clamp(24px, 6vw, 60px);
  }

  .overline,
  .node-label,
  .result-label,
  .submitted-source p {
    margin: 0;
    color: var(--blue-dark);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 20ch;
    margin: 10px 0 15px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 7vw, 4.35rem);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1;
  }

  h2 {
    margin: 4px 0;
    font-size: clamp(1.25rem, 4vw, 1.8rem);
  }

  p {
    line-height: 1.55;
  }

  .lead {
    max-width: 68ch;
    margin: 0 0 22px;
    color: #3c5362;
    font-size: clamp(1.03rem, 2.2vw, 1.28rem);
  }

  .definitions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    max-width: 820px;
  }

  .definitions > div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    padding: 15px;
    border: 1px solid #9bb5c0;
    border-left: 6px solid var(--coral);
    border-radius: 10px;
    background: #f3f8f7;
  }

  .definitions span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue);
    font-weight: 900;
  }

  .definitions p {
    margin: 0;
  }

  .controls-note {
    color: var(--muted);
    font-size: 0.88rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #7d98a5;
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

  button:focus-visible,
  .state-focus:focus {
    outline: 4px solid #8c3eb3;
    outline-offset: 4px;
  }

  .primary,
  .secondary {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 13px 18px;
    border-radius: 11px;
    font-weight: 900;
  }

  .primary {
    color: white;
    background: var(--blue-dark);
  }

  .primary:hover {
    background: var(--blue);
  }

  .secondary {
    border: 2px solid var(--blue-dark);
    color: var(--blue-dark);
    background: white;
  }

  .board {
    padding: clamp(16px, 4vw, 34px);
  }

  .case-head {
    padding-bottom: 18px;
    border-bottom: 1px solid #b9c9cf;
  }

  .case-head h1 {
    max-width: 30ch;
    margin: 7px 0 8px;
    font-size: clamp(1.65rem, 5vw, 3rem);
  }

  .spatial {
    margin: 0;
    color: var(--blue);
    font-size: 0.9rem;
    font-weight: 700;
  }

  .scaffold {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    margin-top: 18px;
    padding: 14px;
    border: 2px dashed #9b5d14;
    border-radius: 12px;
    background: #fff5d9;
  }

  .scaffold > span {
    color: #7c4608;
    font-size: 1.8rem;
  }

  .scaffold p {
    margin: 4px 0 0;
  }

  .thread {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
    gap: 9px;
    align-items: stretch;
    margin: 22px 0;
  }

  .thread article {
    min-width: 0;
    padding: 14px;
    border: 1px solid #9db2bb;
    border-top: 7px solid var(--blue);
    border-radius: 10px;
    background: #f5faf8;
  }

  .thread article.missing {
    border-style: dashed;
    border-top-style: solid;
    border-top-color: var(--coral);
    background: #fff4ed;
  }

  .thread strong {
    display: block;
    margin-top: 7px;
    line-height: 1.4;
  }

  .connector {
    align-self: center;
    color: var(--coral);
    font-size: 1.6rem;
    font-weight: 900;
  }

  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    margin-bottom: 12px;
    font-weight: 900;
  }

  .source-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .source-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    min-height: 225px;
    align-content: start;
    padding: 16px;
    border: 2px solid #9eb2ba;
    border-radius: 15px;
    color: var(--ink);
    background: white;
    text-align: left;
  }

  .source-card:hover {
    border-color: var(--blue);
    background: #f2f9f8;
  }

  .source-mark {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 2px solid var(--blue-dark);
    border-radius: 12px;
    color: var(--blue-dark);
    background: var(--yellow);
    font-size: 1.3rem;
    font-weight: 900;
  }

  .source-copy,
  .source-copy small,
  .source-copy strong,
  .source-copy span,
  .connect-label {
    display: block;
    min-width: 0;
  }

  .source-copy small {
    color: var(--blue);
    font-weight: 900;
    text-transform: uppercase;
  }

  .source-copy strong {
    margin: 4px 0 7px;
    font-size: 1.06rem;
  }

  .source-copy span {
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.45;
  }

  .connect-label {
    grid-column: 1 / -1;
    align-self: end;
    padding-top: 10px;
    border-top: 1px dashed #8fa4ad;
    color: var(--blue-dark);
    font-size: 0.77rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .feedback {
    display: grid;
    grid-template-columns: minmax(190px, 0.4fr) minmax(0, 1fr);
    gap: 22px;
    padding: clamp(18px, 4vw, 36px);
    border-top: 8px solid #a8473c;
  }

  .feedback.right {
    border-top-color: #267257;
  }

  .submitted-source {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-self: start;
    padding: 15px;
    border-radius: 14px;
    background: #fae9e5;
  }

  .submitted-source.accepted {
    background: #e4f3eb;
  }

  .submitted-source > span {
    display: grid;
    width: 50px;
    height: 50px;
    place-items: center;
    border: 2px solid currentColor;
    border-radius: 12px;
    font-weight: 900;
  }

  .submitted-source small {
    display: block;
    color: var(--muted);
    line-height: 1.4;
  }

  .result-label {
    color: #8f342c;
  }

  .right .result-label {
    color: #176343;
  }

  [data-smoke-feedback-detail] {
    max-width: 68ch;
    margin: 8px 0 0;
    font-size: 1.03rem;
  }

  .feedback > .secondary,
  .completed-thread,
  .continuation {
    grid-column: 1 / -1;
  }

  .feedback > .secondary {
    justify-self: start;
  }

  .completed-thread {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 14px;
    border: 1px solid #79a996;
    border-radius: 12px;
    background: #eff8f3;
  }

  .completed-thread span {
    padding: 7px 9px;
    border: 1px solid #548f78;
    border-radius: 999px;
    font-weight: 800;
  }

  .completed-thread p {
    flex-basis: 100%;
    margin: 4px 0 0;
    color: #35594a;
  }

  .continuation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding-top: 18px;
    border-top: 1px solid #b9c9cf;
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
  .takeaway {
    margin-right: auto;
    margin-left: auto;
  }

  .complete-mark {
    margin: 0 0 15px;
    color: var(--blue);
    font-size: 1.6rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .takeaway {
    max-width: 650px;
    padding: 16px;
    border-left: 7px solid var(--coral);
    background: #f5f8f4;
    text-align: left;
  }

  .takeaway p {
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

  @media (max-width: 700px) {
    .thread {
      grid-template-columns: 1fr;
    }

    .connector {
      justify-self: center;
      transform: rotate(90deg);
    }

    .source-grid,
    .feedback {
      grid-template-columns: 1fr;
    }

    .feedback > .secondary,
    .completed-thread,
    .continuation {
      grid-column: 1;
    }
  }

  @media (max-width: 480px) {
    .prototype {
      padding: 12px;
    }

    .brand small {
      display: none;
    }

    .intro,
    .board,
    .feedback,
    .complete {
      border-radius: 15px;
    }

    .definitions {
      grid-template-columns: 1fr;
    }

    .source-card {
      min-height: 205px;
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
