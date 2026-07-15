<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';
  type Relation = 'concordantes' | 'complementaires' | 'contradictoires';

  type SourceNote = {
    label: string;
    kind: string;
    moment: string;
    content: string;
    keyInfo: string;
    mark: string;
  };

  type Verdict = {
    id: Relation;
    label: string;
    short: string;
    definition: string;
    symbol: string;
  };

  type ComparisonCase = {
    id: string;
    context: string;
    question: string;
    hypothesis: string;
    spatialLink: string;
    sources: [SourceNote, SourceNote];
    correctRelation: Relation;
    smokeWrong: Relation;
    wrongFeedback: Record<Relation, string>;
    scaffold: string;
    correctFeedback: string;
    boundedConclusion: string;
  };

  const verdicts: Verdict[] = [
    {
      id: 'concordantes',
      label: 'Elles concordent',
      short: 'Même réponse',
      definition: 'Les deux sources soutiennent le même point.',
      symbol: '＝'
    },
    {
      id: 'complementaires',
      label: 'Elles se complètent',
      short: 'Deux parties utiles',
      definition: 'Chaque source apporte une partie différente de la réponse.',
      symbol: '＋'
    },
    {
      id: 'contradictoires',
      label: 'Elles se contredisent',
      short: 'Réponses opposées',
      definition: 'Elles donnent des informations incompatibles sur le même point.',
      symbol: '≠'
    }
  ];

  const comparisons: ComparisonCase[] = [
    {
      id: 'chemin-sortie-ecole',
      context: 'Déplacements · Concordance',
      question: 'Le chemin du Parc est-il davantage utilisé à la sortie de l’école pendant les moments observés ?',
      hypothesis: 'Le passage augmente peut-être entre 15 h 30 et 16 h 15.',
      spatialLink: 'Chemin fictif reliant l’école et un quartier de logements.',
      sources: [
        {
          label: 'Source A',
          kind: 'Comptage sur place',
          moment: 'Mardi · 14 h 30 puis 15 h 45',
          content: '12 passages sont notés à 14 h 30 et 41 passages à 15 h 45.',
          keyInfo: 'Le comptage indique une hausse pendant les deux créneaux observés.',
          mark: '12→41'
        },
        {
          label: 'Source B',
          kind: 'Deux photographies décrites',
          moment: 'Même mardi · mêmes créneaux',
          content: 'La seconde image montre nettement plus de personnes sur le chemin que la première.',
          keyInfo: 'Les images décrites indiquent aussi davantage de passages au second moment.',
          mark: '▱▰'
        }
      ],
      correctRelation: 'concordantes',
      smokeWrong: 'complementaires',
      wrongFeedback: {
        concordantes: '',
        complementaires:
          '✗ Les sources ne couvrent pas deux parties différentes : le comptage et les photographies répondent au même point et indiquent tous deux davantage de passages au second moment.',
        contradictoires:
          '✗ Aucune information ne s’oppose ici : les nombres augmentent et la seconde photographie décrite montre aussi plus de personnes.'
      },
      scaffold:
        'Calque : compare le même point — le nombre de passages au premier puis au second moment. Les deux sources vont-elles dans le même sens ?',
      correctFeedback:
        '✓ Les deux sources concordent : le comptage augmente et la seconde photographie décrite montre également plus de passages au même moment.',
      boundedConclusion:
        'Pendant les deux créneaux de ce mardi, les deux sources indiquent davantage de passages à 15 h 45. Elles ne permettent pas de dire « tous les jours ».'
    },
    {
      id: 'acces-marche',
      context: 'Approvisionnement · Complémentarité',
      question: 'Comment les produits arrivent-ils à la halle puis deviennent-ils disponibles sur les étals ?',
      hypothesis: 'Une voie d’accès et une organisation intérieure forment peut-être une chaîne de livraison.',
      spatialLink: 'La halle fictive du quartier est reliée à une route venant de la région.',
      sources: [
        {
          label: 'Source A',
          kind: 'Plan simplifié',
          moment: 'Plan du quartier',
          content: 'Une flèche suit la route régionale jusqu’à une zone d’arrêt derrière la halle.',
          keyInfo: 'Le plan montre l’accès et le point d’arrivée des véhicules.',
          mark: '↦□'
        },
        {
          label: 'Source B',
          kind: 'Note d’observation',
          moment: 'Jeudi · 7 h 20',
          content: 'Des caisses quittent les camionnettes, passent par la porte arrière puis sont posées sur les étals.',
          keyInfo: 'La note décrit le passage des produits de l’arrêt aux étals.',
          mark: '□→▦'
        }
      ],
      correctRelation: 'complementaires',
      smokeWrong: 'concordantes',
      wrongFeedback: {
        concordantes:
          '✗ Les sources ne répètent pas la même information : le plan montre l’accès jusqu’à la halle, tandis que la note suit ensuite les caisses jusqu’aux étals.',
        complementaires: '',
        contradictoires:
          '✗ Les informations ne sont pas opposées : le plan décrit l’arrivée au bâtiment et la note poursuit la chaîne à l’intérieur.'
      },
      scaffold:
        'Calque : coupe la question en deux — « arriver à la halle » puis « devenir disponible ». Quelle source répond à chaque partie ?',
      correctFeedback:
        '✓ Les sources se complètent : le plan explique l’accès des véhicules et la note décrit ensuite le trajet des caisses jusqu’aux étals.',
      boundedConclusion:
        'Ensemble, ces documents décrivent une chaîne possible ce jeudi : route, zone d’arrêt, porte arrière, puis étals.'
    },
    {
      id: 'fontaine-place',
      context: 'Loisirs · Contradiction',
      question: 'La fontaine de la place fonctionne-t-elle le mercredi 10 juin à 14 h ?',
      hypothesis: 'Le panneau laisse penser qu’elle fonctionne cet après-midi-là.',
      spatialLink: 'Place fictive fréquentée pour se rencontrer et se rafraîchir.',
      sources: [
        {
          label: 'Source A',
          kind: 'Panneau sur la place',
          moment: 'Texte affiché sans date de mise à jour',
          content: '« Fontaine en marche chaque jour de 10 h à 18 h. »',
          keyInfo: 'Le panneau annonce un fonctionnement à 14 h.',
          mark: '10–18'
        },
        {
          label: 'Source B',
          kind: 'Observation datée',
          moment: 'Mercredi 10 juin · 14 h',
          content: 'Aucun jet d’eau n’est visible ; une barrière porte la mention « arrêt temporaire ».',
          keyInfo: 'L’observation indique un arrêt au moment précis de la question.',
          mark: '0 eau'
        }
      ],
      correctRelation: 'contradictoires',
      smokeWrong: 'concordantes',
      wrongFeedback: {
        concordantes:
          '✗ Le panneau annonce un fonctionnement, mais l’observation datée décrit un arrêt au même moment. Les réponses au point précis sont opposées.',
        complementaires:
          '✗ Les sources ne donnent pas deux parties compatibles : l’une annonce « en marche » et l’autre observe « arrêt temporaire » pour le mercredi à 14 h.',
        contradictoires: ''
      },
      scaffold:
        'Calque : fixe le même moment — mercredi 10 juin à 14 h. Note la réponse de chaque source : « en marche » ou « arrêtée » ?',
      correctFeedback:
        '✓ Les sources se contredisent sur le même moment : le panneau annonce un fonctionnement tandis que l’observation datée montre un arrêt temporaire.',
      boundedConclusion:
        'Il faut signaler le désaccord et chercher une mise à jour ; ces deux sources ne permettent pas d’affirmer silencieusement que la fontaine fonctionne.'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentComparison: ComparisonCase = comparisons[0];
  let retrying = false;
  let submitted: Verdict | null = null;
  let responsePath: string[] = [];
  let stateHeading: HTMLElement | null = null;

  $: legacyState = phase === 'intro' ? 'ready' : phase;

  async function focusCurrentState(): Promise<void> {
    await tick();
    stateHeading?.focus();
  }

  function start(): void {
    currentIndex = 0;
    currentComparison = comparisons[0];
    retrying = false;
    submitted = null;
    responsePath = [];
    phase = 'question';
    void focusCurrentState();
  }

  function setVerdict(verdict: Verdict): void {
    submitted = verdict;
    retrying = false;
    responsePath = [...responsePath, `${currentComparison.id}:${verdict.id}`];
    phase = verdict.id === currentComparison.correctRelation ? 'correct' : 'incorrect';
    void focusCurrentState();
  }

  function retry(): void {
    submitted = null;
    retrying = true;
    phase = 'question';
    void focusCurrentState();
  }

  function nextComparison(): void {
    if (currentIndex === comparisons.length - 1) {
      phase = 'complete';
      void focusCurrentState();
      return;
    }

    currentIndex += 1;
    currentComparison = comparisons[currentIndex];
    submitted = null;
    retrying = false;
    phase = 'question';
    void focusCurrentState();
  }
</script>

<main
  class="prototype"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0316"
  data-smoke-root
  data-smoke-exercise="EX-0316"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <div class="lab">
    <header class="lab-head">
      <div><p>Géographie · Laboratoire documentaire</p><strong>Table de confrontation</strong></div>
      <ol aria-label="Progression des trois confrontations">
        {#each comparisons as comparison, index}
          <li class:done={phase === 'complete' || index < currentIndex} class:current={index === currentIndex && phase !== 'intro' && phase !== 'complete'}>
            <span aria-hidden="true">{phase === 'complete' || index < currentIndex ? '✓' : index + 1}</span>
            <span class="sr-only">{comparison.context}</span>
          </li>
        {/each}
      </ol>
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <p class="overline">Lire · comparer · limiter</p>
        <h1 class="state-focus" id="intro-title" bind:this={stateHeading} tabindex="-1">Que disent deux sources ensemble&nbsp;?</h1>
        <p class="lead">
          Pose deux sources sur la table, puis règle le verdict : elles peuvent dire la même chose, apporter deux parties utiles ou donner des réponses opposées.
        </p>
        <div class="legend-grid">
          {#each verdicts as verdict}
            <div><span aria-hidden="true">{verdict.symbol}</span><p><strong>{verdict.label}</strong><br />{verdict.definition}</p></div>
          {/each}
        </div>
        <p class="controls-note">Au clavier : <kbd>Tab</kbd> pour rejoindre un verdict, puis <kbd>Entrée</kbd> ou <kbd>Espace</kbd> pour le régler et le confronter.</p>
        <button class="primary" type="button" on:click={start} data-smoke-action="start">Allumer la table <span aria-hidden="true">→</span></button>
      </section>
    {:else if phase === 'question'}
      <section
        class="comparison"
        data-smoke-state={retrying ? 'retry' : 'active'}
        data-smoke-variation={currentComparison.id}
        aria-labelledby="question-title"
      >
        <div class="question-block">
          <p class="overline">Confrontation {currentIndex + 1} · {currentComparison.context}</p>
          <h1 class="state-focus" id="question-title" bind:this={stateHeading} tabindex="-1">{currentComparison.question}</h1>
          <p><strong>Hypothèse provisoire :</strong> {currentComparison.hypothesis}</p>
          <small><span aria-hidden="true">⌖</span> {currentComparison.spatialLink}</small>
        </div>

        {#if retrying}
          <aside class="overlay" role="status" aria-live="polite">
            <span aria-hidden="true">⌗</span><div><strong>Calque de comparaison</strong><p>{currentComparison.scaffold}</p></div>
          </aside>
        {/if}

        <div class="source-table" aria-label="Deux sources à confronter">
          {#each currentComparison.sources as source}
            <article class="source-note">
              <header><span>{source.label}</span><b aria-hidden="true">{source.mark}</b></header>
              <p class="kind">{source.kind}</p>
              <h2>{source.moment}</h2>
              <blockquote>{source.content}</blockquote>
              <p class="key"><strong>Information apportée :</strong> {source.keyInfo}</p>
            </article>
          {/each}
          <div class="balance" aria-hidden="true"><span>Source A</span><b>⇄</b><span>Source B</span></div>
        </div>

        <fieldset>
          <legend>Quel verdict décrit la relation entre les deux contenus&nbsp;?</legend>
          <div class="verdict-grid">
            {#each verdicts as verdict}
              <button
                class="verdict"
                type="button"
                on:click={() => setVerdict(verdict)}
                data-smoke-answer={verdict.id === currentComparison.correctRelation ? 'correct' : verdict.id === currentComparison.smokeWrong ? 'incorrect' : undefined}
                data-smoke-attempt={verdict.id === currentComparison.correctRelation ? 'correct' : verdict.id === currentComparison.smokeWrong ? 'incorrect' : undefined}
              >
                <span class="verdict-symbol" aria-hidden="true">{verdict.symbol}</span>
                <span><strong>{verdict.label}</strong><small>{verdict.short}</small></span>
                <span class="commit">Régler et confronter</span>
              </button>
            {/each}
          </div>
        </fieldset>
      </section>
    {:else if phase === 'incorrect'}
      <section class="feedback wrong" data-smoke-state="incorrect" data-smoke-variation={currentComparison.id} aria-labelledby="wrong-title">
        <div class="dial"><span aria-hidden="true">{submitted?.symbol}</span><p>Verdict réglé</p><strong>{submitted?.label}</strong></div>
        <div role="status" aria-live="polite">
          <p class="result-label state-focus" id="wrong-title" bind:this={stateHeading} tabindex="-1"><span aria-hidden="true">✗</span> Ce verdict ne décrit pas les deux contenus</p>
          <p data-smoke-feedback="incorrect" data-smoke-feedback-detail>
            {submitted ? currentComparison.wrongFeedback[submitted.id] : ''}
          </p>
        </div>
        <button class="secondary" type="button" on:click={retry} data-smoke-action="retry">Poser le calque de comparaison <span aria-hidden="true">⌗</span></button>
      </section>
    {:else if phase === 'correct'}
      <section class="feedback right" data-smoke-state="correct" data-smoke-variation={currentComparison.id} aria-labelledby="right-title">
        <div class="dial accepted"><span aria-hidden="true">{submitted?.symbol}</span><p>Verdict retenu</p><strong>{submitted?.label}</strong></div>
        <div role="status" aria-live="polite">
          <p class="result-label state-focus" id="right-title" bind:this={stateHeading} tabindex="-1"><span aria-hidden="true">✓</span> La relation est appuyée par les deux sources</p>
          <p data-smoke-feedback="correct" data-smoke-feedback-detail>{currentComparison.correctFeedback}</p>
        </div>
        <div class="conclusion"><strong>Conclusion limitée aux indices</strong><p>{currentComparison.boundedConclusion}</p></div>
        <div class="continuation" data-smoke-state="continuation" data-smoke-variation={currentComparison.id}>
          <p>{currentIndex === comparisons.length - 1 ? 'Les trois relations ont été confrontées.' : 'La prochaine paire change de relation.'}</p>
          <button class="primary" type="button" on:click={nextComparison} data-smoke-action="continue">
            {currentIndex === comparisons.length - 1 ? 'Éteindre la table' : 'Charger la paire suivante'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else}
      <section class="complete" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <div class="complete-signs" aria-hidden="true"><span>＝</span><span>＋</span><span>≠</span></div>
        <p class="overline">Confrontations terminées</p>
        <h1 class="state-focus" id="complete-title" bind:this={stateHeading} tabindex="-1">Deux sources peuvent s’accorder, se compléter ou rester en désaccord</h1>
        <p class="lead">
          Tu as comparé le même point, les parties d’une question et un désaccord daté. Une conclusion solide dit aussi jusqu’où vont les indices.
        </p>
        <div class="takeaway"><strong>La stratégie à garder</strong><p>Lire chaque source → comparer le même point → écrire seulement ce que les indices permettent.</p></div>
      </section>
    {/if}
  </div>
</main>

<style>
  .prototype {
    --ink: #24243a;
    --muted: #62627b;
    --violet: #503b86;
    --violet-dark: #35245f;
    --lime: #d7e86a;
    --paper: #fffef9;
    --line: #a7a2b5;
    min-height: calc(100vh - 42px);
    padding: clamp(12px, 3vw, 32px);
    overflow-wrap: anywhere;
    color: var(--ink);
    background:
      radial-gradient(circle at 85% 8%, rgba(215, 232, 106, 0.32), transparent 20rem),
      #eeeaf4;
    font-family: 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif;
  }

  .lab {
    width: min(100%, 1020px);
    margin: 0 auto;
  }

  .lab-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 15px;
  }

  .lab-head p {
    margin: 0 0 3px;
    color: var(--violet);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .lab-head > div > strong {
    font-size: 1.08rem;
  }

  .lab-head ol {
    display: flex;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .lab-head li {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 2px solid #7b748e;
    border-radius: 5px;
    background: #f8f6fa;
    font-weight: 900;
  }

  .lab-head li.current {
    border-color: var(--violet-dark);
    box-shadow: inset 0 -7px 0 var(--lime);
  }

  .lab-head li.done {
    border-color: var(--violet-dark);
    color: white;
    background: var(--violet-dark);
  }

  .intro,
  .comparison,
  .feedback,
  .complete {
    border: 2px solid var(--violet-dark);
    border-radius: 8px;
    background: var(--paper);
    box-shadow: 10px 10px 0 rgba(53, 36, 95, 0.13);
  }

  .intro,
  .complete {
    padding: clamp(24px, 6vw, 58px);
  }

  .overline,
  .result-label,
  .kind {
    margin: 0;
    color: var(--violet);
    font-size: 0.73rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 23ch;
    margin: 10px 0 15px;
    font-size: clamp(2rem, 7vw, 4.15rem);
    letter-spacing: -0.05em;
    line-height: 0.99;
  }

  h2 {
    margin: 4px 0 10px;
    font-size: clamp(1.1rem, 3vw, 1.45rem);
    line-height: 1.2;
  }

  p {
    line-height: 1.52;
  }

  .lead {
    max-width: 68ch;
    margin: 0 0 22px;
    color: #4c4c65;
    font-size: clamp(1.02rem, 2.2vw, 1.27rem);
  }

  .legend-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .legend-grid > div {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    padding: 13px;
    border: 1px solid var(--line);
    background: #f6f3f8;
  }

  .legend-grid span {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--violet);
    font-size: 1.25rem;
    font-weight: 900;
  }

  .legend-grid p {
    margin: 0;
    font-size: 0.9rem;
  }

  .controls-note {
    color: var(--muted);
    font-size: 0.88rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #7c748d;
    border-bottom-width: 3px;
    border-radius: 3px;
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
    outline: 4px solid #0d78a3;
    outline-offset: 4px;
  }

  .primary,
  .secondary {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 13px 18px;
    border-radius: 5px;
    font-weight: 900;
  }

  .primary {
    color: white;
    background: var(--violet-dark);
  }

  .primary:hover {
    background: var(--violet);
  }

  .secondary {
    border: 2px solid var(--violet-dark);
    color: var(--violet-dark);
    background: white;
  }

  .comparison {
    padding: clamp(16px, 4vw, 32px);
  }

  .question-block {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--line);
  }

  .question-block h1 {
    max-width: 32ch;
    margin: 7px 0 10px;
    font-size: clamp(1.5rem, 4.5vw, 2.65rem);
  }

  .question-block > p:not(.overline) {
    margin: 0 0 8px;
  }

  .question-block small {
    color: var(--violet);
    font-weight: 700;
  }

  .overlay {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    margin-top: 17px;
    padding: 14px;
    border: 2px dashed #716c17;
    background: #f8f8d7;
  }

  .overlay > span {
    color: #63600d;
    font-size: 2rem;
  }

  .overlay p {
    margin: 4px 0 0;
  }

  .source-table {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin: 22px 0 28px;
    padding-bottom: 42px;
  }

  .source-note {
    min-width: 0;
    padding: 16px;
    border: 1px solid #8f899d;
    background: #fffef8;
    box-shadow: 4px 5px 0 #d9d3de;
  }

  .source-note header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  .source-note header > span {
    color: var(--violet);
    font-weight: 900;
    text-transform: uppercase;
  }

  .source-note header b {
    display: grid;
    min-width: 48px;
    min-height: 40px;
    place-items: center;
    padding: 4px;
    border: 2px solid var(--violet-dark);
    background: var(--lime);
  }

  blockquote {
    margin: 0;
    padding: 13px;
    border-left: 6px solid var(--violet);
    background: #f3f0f6;
    line-height: 1.5;
  }

  .key {
    margin: 12px 0 0;
    color: #4e4e66;
    font-size: 0.88rem;
  }

  .balance {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 12px;
    border: 2px solid var(--violet-dark);
    background: var(--lime);
    transform: translateX(-50%);
    white-space: nowrap;
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

  .verdict-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 11px;
  }

  .verdict {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    min-height: 142px;
    align-content: start;
    padding: 13px;
    border: 2px solid #888198;
    color: var(--ink);
    background: white;
    text-align: left;
  }

  .verdict:hover {
    border-color: var(--violet-dark);
    background: #f2f6d5;
  }

  .verdict-symbol {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--violet);
    font-size: 1.25rem;
    font-weight: 900;
  }

  .verdict strong,
  .verdict small,
  .commit {
    display: block;
  }

  .verdict small {
    margin-top: 4px;
    color: var(--muted);
  }

  .commit {
    grid-column: 1 / -1;
    align-self: end;
    padding-top: 9px;
    border-top: 1px dashed #938da0;
    color: var(--violet-dark);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .feedback {
    display: grid;
    grid-template-columns: minmax(175px, 0.34fr) minmax(0, 1fr);
    gap: 22px;
    padding: clamp(18px, 4vw, 34px);
    border-top: 9px solid #aa443f;
  }

  .feedback.right {
    border-top-color: #34744f;
  }

  .dial {
    display: grid;
    align-content: center;
    justify-items: center;
    min-height: 165px;
    padding: 14px;
    border: 2px solid #9a5551;
    background: #fff0ec;
    text-align: center;
  }

  .dial.accepted {
    border-color: #5d8e71;
    background: #eaf5ed;
  }

  .dial > span {
    display: grid;
    width: 62px;
    height: 62px;
    place-items: center;
    border: 3px solid currentColor;
    border-radius: 50%;
    font-size: 1.8rem;
    font-weight: 900;
  }

  .dial p {
    margin: 10px 0 2px;
    font-size: 0.74rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .result-label {
    color: #92342f;
  }

  .right .result-label {
    color: #26623e;
  }

  [data-smoke-feedback-detail] {
    max-width: 68ch;
    margin: 9px 0 0;
    font-size: 1.04rem;
  }

  .feedback > .secondary,
  .conclusion,
  .continuation {
    grid-column: 1 / -1;
  }

  .feedback > .secondary {
    justify-self: start;
  }

  .conclusion {
    padding: 15px;
    border: 2px solid #6d8a52;
    border-left-width: 8px;
    background: #f3f7df;
  }

  .conclusion p {
    margin: 5px 0 0;
  }

  .continuation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding-top: 17px;
    border-top: 1px solid var(--line);
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

  .complete-signs {
    display: flex;
    justify-content: center;
    gap: 9px;
    margin-bottom: 16px;
  }

  .complete-signs span {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 2px solid var(--violet-dark);
    background: var(--lime);
    font-size: 1.3rem;
    font-weight: 900;
  }

  .takeaway {
    max-width: 670px;
    padding: 16px;
    border: 2px solid var(--violet-dark);
    border-left-width: 9px;
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

  @media (max-width: 720px) {
    .legend-grid,
    .source-table,
    .verdict-grid,
    .feedback {
      grid-template-columns: 1fr;
    }

    .source-table {
      padding-bottom: 0;
    }

    .balance {
      position: static;
      justify-self: center;
      transform: none;
    }

    .feedback > .secondary,
    .conclusion,
    .continuation {
      grid-column: 1;
    }
  }

  @media (max-width: 480px) {
    .prototype {
      padding: 12px;
    }

    .lab-head p {
      display: none;
    }

    .intro,
    .comparison,
    .feedback,
    .complete {
      box-shadow: 5px 5px 0 rgba(53, 36, 95, 0.12);
    }

    .verdict {
      min-height: 125px;
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
