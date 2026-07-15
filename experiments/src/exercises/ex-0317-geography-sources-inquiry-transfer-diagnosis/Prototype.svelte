<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';
  type ErrorFamily =
    | 'SINGLE_SOURCE_LEAP'
    | 'QUESTION_MISMATCH'
    | 'OVERCLAIMED_CONCLUSION'
    | 'EVIDENCE_CHAIN_MATCH';

  type RouteSource = {
    mark: string;
    kind: string;
    content: string;
    role: string;
  };

  type InquiryRoute = {
    id: string;
    name: string;
    hypothesis: string;
    sources: [RouteSource, RouteSource];
    conclusion: string;
    auditNote: string;
    correct: boolean;
  };

  type Dossier = {
    id: string;
    label: string;
    context: string;
    question: string;
    briefing: string;
    spatialLink: string;
    routes: [InquiryRoute, InquiryRoute];
    wrongFamily: Exclude<ErrorFamily, 'EVIDENCE_CHAIN_MATCH'>;
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
    rolesSummary: string;
  };

  const dossiers: Dossier[] = [
    {
      id: 'cour-ombre-usages',
      label: 'Dossier O',
      context: 'Cour et îlots d’ombre',
      question: 'Où l’ombre se déplace-t-elle entre 13 h et 16 h, et quelles zones sont utilisées pour jouer pendant ces moments ?',
      briefing: 'Une équipe fictive veut choisir où observer les activités avant d’imaginer un nouvel espace ombragé.',
      spatialLink: 'Cour fictive d’une école dans un quartier de logements.',
      routes: [
        {
          id: 'ombre-seule',
          name: 'Route « suivre seulement l’ombre »',
          hypothesis: 'Les jeux se déplacent peut-être avec l’ombre.',
          sources: [
            {
              mark: '13/16',
              kind: 'Deux photographies décrites',
              content: 'Elles localisent l’ombre à 13 h puis à 16 h.',
              role: 'Répond à la partie « où est l’ombre ? ».'
            },
            {
              mark: '△○',
              kind: 'Plan des arbres',
              content: 'Il situe les troncs et les zones pavées de la cour.',
              role: 'Aide à repérer les lieux, mais ne montre aucun usage.'
            }
          ],
          conclusion: 'Les enfants déplacent forcément leurs jeux avec l’ombre.',
          auditNote: 'La route passe de la position de l’ombre aux usages sans observer les activités.',
          correct: false
        },
        {
          id: 'ombre-et-presences',
          name: 'Route « croiser ombre et présences »',
          hypothesis: 'Les zones de jeu occupées peuvent changer en même temps que l’ombre.',
          sources: [
            {
              mark: '13/16',
              kind: 'Deux photographies décrites',
              content: 'Elles localisent l’ombre à 13 h puis à 16 h.',
              role: 'Répond à la partie « où est l’ombre ? ».'
            },
            {
              mark: '●●●',
              kind: 'Relevé de présences',
              content: 'À chaque heure, il note dans quelles zones des jeux sont observés.',
              role: 'Répond à la partie « quelles zones sont utilisées ? ».'
            }
          ],
          conclusion: 'Pendant ces deux observations, on peut comparer le déplacement de l’ombre et celui des zones de jeu, sans affirmer une cause certaine.',
          auditNote: 'Chaque partie de la question possède un indice et la conclusion reste prudente.',
          correct: true
        }
      ],
      wrongFamily: 'SINGLE_SOURCE_LEAP',
      incorrectFeedback:
        '✗ Cette route localise l’ombre, mais aucune source n’observe les jeux. La conclusion saute d’un seul type d’indice à une affirmation sur les usages.',
      scaffold:
        'Contrôle 1 : souligne les deux parties de la question — position de l’ombre / zones de jeu utilisées. Repère une source pour chacune.',
      correctFeedback:
        '✓ Cette route croise la position de l’ombre avec un relevé des présences aux mêmes moments. Elle répond aux deux parties sans transformer la coïncidence en cause certaine.',
      rolesSummary: 'Photographies : position de l’ombre · Relevé : usages observés · Conclusion : comparaison limitée à 13 h et 16 h.'
    },
    {
      id: 'passerelle-moments-motifs',
      label: 'Dossier P',
      context: 'Passerelle entre deux quartiers',
      question: 'À quels moments la passerelle est-elle la plus empruntée, et vers quels lieux les personnes se dirigent-elles ?',
      briefing: 'Le dossier inédit concerne une liaison piétonne fictive au-dessus d’une petite rivière.',
      spatialLink: 'La passerelle relie un quartier de logements à la gare et aux terrains de sport.',
      routes: [
        {
          id: 'histoire-materiaux',
          name: 'Route « raconter la construction »',
          hypothesis: 'Le matériau et l’âge expliquent peut-être la fréquentation actuelle.',
          sources: [
            {
              mark: '1988',
              kind: 'Archive d’inauguration',
              content: 'Elle donne l’année d’ouverture et le nom du projet.',
              role: 'Informe sur l’histoire de la passerelle.'
            },
            {
              mark: 'Fe',
              kind: 'Fiche des matériaux',
              content: 'Elle décrit une structure en métal et un tablier en bois.',
              role: 'Informe sur la construction, pas sur les passages.'
            }
          ],
          conclusion: 'La passerelle est surtout empruntée pour rejoindre la gare le matin.',
          auditNote: 'Les sources sont crédibles, mais elles ne mesurent ni moment ni direction actuelle.',
          correct: false
        },
        {
          id: 'comptage-destinations',
          name: 'Route « relier horaires et directions »',
          hypothesis: 'Les pointes de passage peuvent correspondre aux horaires de la gare et des activités sportives.',
          sources: [
            {
              mark: '7·12·17',
              kind: 'Comptage par créneau',
              content: 'Il compare le nombre de passages à 7 h 30, 12 h et 17 h 30 pendant deux jours.',
              role: 'Répond à « à quels moments ? ».'
            },
            {
              mark: 'G↔S',
              kind: 'Observation des directions',
              content: 'Elle note si les personnes poursuivent vers la gare, les logements ou les terrains de sport.',
              role: 'Répond à « vers quels lieux ? ».'
            }
          ],
          conclusion: 'Pour ces deux jours, les comptages et directions permettent de décrire les pointes et les lieux rejoints, sans expliquer toutes les motivations.',
          auditNote: 'Les sources correspondent aux deux variables demandées et la période est conservée.',
          correct: true
        }
      ],
      wrongFamily: 'QUESTION_MISMATCH',
      incorrectFeedback:
        '✗ L’archive et la fiche des matériaux documentent la passerelle, mais pas la question posée. Elles ne montrent ni les moments de passage ni les lieux rejoints.',
      scaffold:
        'Contrôle 2 : cache le nom du lieu et garde seulement les mots « moments » et « vers quels lieux ». Quelles sources observent exactement ces deux variables ?',
      correctFeedback:
        '✓ Le comptage décrit les moments et l’observation décrit les directions. La route correspond à la question et conserve la limite des deux jours étudiés.',
      rolesSummary: 'Comptage : moments de pointe · Observation : directions · Conclusion : description de deux jours, pas motivation universelle.'
    },
    {
      id: 'produits-trois-jours',
      label: 'Dossier R',
      context: 'Produits régionaux et trajet',
      question: 'D’où viennent les caisses livrées pendant trois jours observés, et quel trajet suivent-elles jusqu’au point de vente ?',
      briefing: 'Une petite vente fictive de quartier veut présenter ce que son dossier permet réellement de dire.',
      spatialLink: 'Le point de vente proche est relié à plusieurs fermes fictives de la région.',
      routes: [
        {
          id: 'toujours-local',
          name: 'Route « généraliser les trois jours »',
          hypothesis: 'Tous les produits viennent peut-être toujours des trois mêmes fermes.',
          sources: [
            {
              mark: 'J1–J3',
              kind: 'Carnet de livraison',
              content: 'Pendant trois jours, il associe chaque caisse à une ferme A, B ou C.',
              role: 'Indique les provenances pendant la courte période observée.'
            },
            {
              mark: 'A/B/C→V',
              kind: 'Plan des trajets notés',
              content: 'Il relie ces trois fermes à la route régionale puis au point de vente.',
              role: 'Montre les trajets associés aux livraisons du carnet.'
            }
          ],
          conclusion: 'Toutes les caisses viennent toujours des fermes A, B et C par cette route.',
          auditNote: 'Les sources couvrent trois jours, mais la conclusion utilise « toujours » et « toutes » sans indice supplémentaire.',
          correct: false
        },
        {
          id: 'periode-bornee',
          name: 'Route « garder la limite des observations »',
          hypothesis: 'Pendant les trois jours étudiés, les caisses notées peuvent venir des fermes A, B et C par la route dessinée.',
          sources: [
            {
              mark: 'J1–J3',
              kind: 'Carnet de livraison',
              content: 'Pendant trois jours, il associe chaque caisse observée à une ferme A, B ou C.',
              role: 'Répond à « d’où viennent les caisses observées ? ».'
            },
            {
              mark: 'A/B/C→V',
              kind: 'Plan des trajets notés',
              content: 'Il relie ces fermes à la route régionale puis au point de vente.',
              role: 'Répond à « quel trajet suivent-elles ? ».'
            }
          ],
          conclusion: 'Pour les livraisons observées durant ces trois jours, le carnet et le plan relient les fermes A, B et C au point de vente par la route indiquée.',
          auditNote: 'La conclusion répond aux deux parties et reprend exactement la période des sources.',
          correct: true
        }
      ],
      wrongFamily: 'OVERCLAIMED_CONCLUSION',
      incorrectFeedback:
        '✗ Les deux sources sont utiles, mais la conclusion dépasse leur portée : trois jours observés ne permettent pas d’affirmer « toutes les caisses » et « toujours ».',
      scaffold:
        'Contrôle 3 : encadre la durée des sources, puis cherche ces mêmes limites dans la conclusion. Les mots « toujours » et « toutes » sont-ils appuyés ?',
      correctFeedback:
        '✓ Cette route relie provenance et trajet, puis garde la limite des trois jours. Elle affirme seulement ce que le carnet et le plan permettent ensemble.',
      rolesSummary: 'Carnet : provenances observées · Plan : trajets associés · Conclusion : seulement les livraisons des trois jours.'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentDossier: Dossier = dossiers[0];
  let retrying = false;
  let submitted: InquiryRoute | null = null;
  let responsePath: string[] = [];
  let errorFamily: ErrorFamily | null = null;
  let stateHeading: HTMLElement | null = null;

  $: legacyState = phase === 'intro' ? 'ready' : phase;

  async function focusCurrentState(): Promise<void> {
    await tick();
    stateHeading?.focus();
  }

  function start(): void {
    currentIndex = 0;
    currentDossier = dossiers[0];
    retrying = false;
    submitted = null;
    responsePath = [];
    errorFamily = null;
    phase = 'question';
    void focusCurrentState();
  }

  function auditRoute(route: InquiryRoute): void {
    submitted = route;
    retrying = false;
    responsePath = [...responsePath, `${currentDossier.id}:${route.id}`];
    errorFamily = route.correct ? 'EVIDENCE_CHAIN_MATCH' : currentDossier.wrongFamily;
    phase = route.correct ? 'correct' : 'incorrect';
    void focusCurrentState();
  }

  function retry(): void {
    submitted = null;
    retrying = true;
    phase = 'question';
    void focusCurrentState();
  }

  function nextDossier(): void {
    if (currentIndex === dossiers.length - 1) {
      phase = 'complete';
      void focusCurrentState();
      return;
    }

    currentIndex += 1;
    currentDossier = dossiers[currentIndex];
    submitted = null;
    errorFamily = null;
    retrying = false;
    phase = 'question';
    void focusCurrentState();
  }
</script>

<main
  class="prototype"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0317"
  data-smoke-root
  data-smoke-exercise="EX-0317"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <div class="cell">
    <header class="cell-head">
      <div class="identity"><span aria-hidden="true">⌬</span><div><strong>Cellule des dossiers neufs</strong><small>Audit de routes documentaires</small></div></div>
      <p aria-label="Progression des trois dossiers">
        {#each dossiers as dossier, index}
          <span class:done={phase === 'complete' || index < currentIndex} class:current={index === currentIndex && phase !== 'intro' && phase !== 'complete'}>
            <span aria-hidden="true">{phase === 'complete' || index < currentIndex ? '✓' : dossier.label.slice(-1)}</span>
            <span class="sr-only">{dossier.context}</span>
          </span>
        {/each}
      </p>
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <p class="overline">Question · sources · conclusion</p>
        <h1 class="state-focus" id="intro-title" bind:this={stateHeading} tabindex="-1">Audite la route, pas son apparence</h1>
        <p class="lead">
          Chaque dossier propose deux routes d’enquête. Ouvre celle où chaque source répond à une partie de la question et où la conclusion ne dépasse pas les indices.
        </p>
        <div class="route-definition">
          <span aria-hidden="true">⌬</span>
          <p><strong>Une route documentaire</strong> relie une hypothèse, des sources et une conclusion. Un seul maillon hors question ou trop large fragilise toute la route.</p>
        </div>
        <ol class="audit-checks">
          <li><span>1</span><p><strong>Question</strong><br />Chaque partie a-t-elle un indice&nbsp;?</p></li>
          <li><span>2</span><p><strong>Sources</strong><br />Montrent-elles bien les variables demandées&nbsp;?</p></li>
          <li><span>3</span><p><strong>Limite</strong><br />La conclusion garde-t-elle les dates et lieux&nbsp;?</p></li>
        </ol>
        <p class="controls-note">Toutes les routes sont des boutons. Utilise <kbd>Tab</kbd>, puis <kbd>Entrée</kbd> ou <kbd>Espace</kbd>. Aucun glisser n’est nécessaire.</p>
        <button class="primary" type="button" on:click={start} data-smoke-action="start">Déverrouiller le dossier O <span aria-hidden="true">→</span></button>
      </section>
    {:else if phase === 'question'}
      <section
        class="dossier"
        data-smoke-state={retrying ? 'retry' : 'active'}
        data-smoke-variation={currentDossier.id}
        aria-labelledby="dossier-title"
      >
        <div class="briefing">
          <p class="overline">{currentDossier.label} · {currentDossier.context}</p>
          <h1 class="state-focus" id="dossier-title" bind:this={stateHeading} tabindex="-1">{currentDossier.question}</h1>
          <p>{currentDossier.briefing}</p>
          <small><span aria-hidden="true">⌖</span> {currentDossier.spatialLink}</small>
        </div>

        {#if retrying}
          <aside class="audit-grid" role="status" aria-live="polite">
            <span aria-hidden="true">⌗</span><div><strong>Grille d’audit ouverte</strong><p>{currentDossier.scaffold}</p></div>
          </aside>
        {/if}

        <fieldset>
          <legend>Quelle route gardes-tu pour répondre à la question&nbsp;?</legend>
          <div class="routes">
            {#each currentDossier.routes as route, routeIndex}
              <button
                class="route"
                type="button"
                on:click={() => auditRoute(route)}
                data-smoke-answer={route.correct ? 'correct' : 'incorrect'}
                data-smoke-attempt={route.correct ? 'correct' : 'incorrect'}
              >
                <span class="route-number" aria-hidden="true">{routeIndex + 1}</span>
                <span class="route-title"><small>Route candidate</small><strong>{route.name}</strong></span>
                <span class="hypothesis"><b>Hypothèse</b>{route.hypothesis}</span>
                <span class="source-pair">
                  {#each route.sources as source}
                    <span class="source-chip">
                      <b aria-hidden="true">{source.mark}</b>
                      <span><small>{source.kind}</small><strong>{source.content}</strong><em>{source.role}</em></span>
                    </span>
                  {/each}
                </span>
                <span class="route-conclusion"><b>Conclusion proposée</b>{route.conclusion}</span>
                <span class="open-label">Ouvrir cette route et auditer <span aria-hidden="true">↗</span></span>
              </button>
            {/each}
          </div>
        </fieldset>
      </section>
    {:else if phase === 'incorrect'}
      <section class="report wrong" data-smoke-state="incorrect" data-smoke-variation={currentDossier.id} aria-labelledby="wrong-title">
        <div class="route-seal"><span aria-hidden="true">✗</span><p>Route auditée</p><strong>{submitted?.name}</strong></div>
        <div role="status" aria-live="polite">
          <p class="result-label state-focus" id="wrong-title" bind:this={stateHeading} tabindex="-1"><span aria-hidden="true">✗</span> Un maillon de la route ne tient pas</p>
          <h2>{submitted?.auditNote}</h2>
          <p data-smoke-feedback="incorrect" data-smoke-feedback-detail>{currentDossier.incorrectFeedback}</p>
        </div>
        <button class="secondary" type="button" on:click={retry} data-smoke-action="retry">Ouvrir la grille et réauditer <span aria-hidden="true">⌗</span></button>
      </section>
    {:else if phase === 'correct'}
      <section class="report right" data-smoke-state="correct" data-smoke-variation={currentDossier.id} aria-labelledby="right-title">
        <div class="route-seal accepted"><span aria-hidden="true">✓</span><p>Route retenue</p><strong>{submitted?.name}</strong></div>
        <div role="status" aria-live="polite">
          <p class="result-label state-focus" id="right-title" bind:this={stateHeading} tabindex="-1"><span aria-hidden="true">✓</span> Les maillons répondent à la question</p>
          <h2>{submitted?.auditNote}</h2>
          <p data-smoke-feedback="correct" data-smoke-feedback-detail>{currentDossier.correctFeedback}</p>
        </div>
        <div class="roles"><strong>Rôle de chaque élément</strong><p>{currentDossier.rolesSummary}</p></div>
        <div class="continuation" data-smoke-state="continuation" data-smoke-variation={currentDossier.id}>
          <p>{currentIndex === dossiers.length - 1 ? 'Les trois dossiers ont une route cohérente.' : 'Le prochain dossier change de piège documentaire.'}</p>
          <button class="primary" type="button" on:click={nextDossier} data-smoke-action="continue">
            {currentIndex === dossiers.length - 1 ? 'Fermer la cellule' : `Déverrouiller le ${dossiers[currentIndex + 1].label.toLowerCase()}`} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else}
      <section class="complete" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <div class="seal" aria-hidden="true">✓</div>
        <p class="overline">Trois routes auditées</p>
        <h1 class="state-focus" id="complete-title" bind:this={stateHeading} tabindex="-1">Une conclusion tient quand chaque maillon reste dans les indices</h1>
        <p class="lead">
          Tu as vérifié une source manquante, des documents hors question et une conclusion trop large. Garde trois contrôles : question, rôle des sources, limite de la conclusion.
        </p>
        <div class="summary"><span>Question</span><b>→</b><span>Sources utiles</span><b>→</b><span>Conclusion bornée</span></div>
        <p class="boundary">Cette activité résume une stratégie. Elle ne donne ni score, ni niveau, ni jugement sur ta manière d’apprendre.</p>
      </section>
    {/if}
  </div>
</main>

<style>
  .prototype {
    --ink: #f8f1df;
    --muted: #c5bda9;
    --panel: #202b31;
    --panel-light: #2b383e;
    --line: #65747a;
    --amber: #f4bd58;
    --cyan: #7fd7d1;
    min-height: calc(100vh - 42px);
    padding: clamp(12px, 3vw, 32px);
    overflow-wrap: anywhere;
    color: var(--ink);
    background:
      linear-gradient(rgba(127, 215, 209, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(127, 215, 209, 0.05) 1px, transparent 1px),
      #10191e;
    background-size: 30px 30px;
    font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  }

  .cell {
    width: min(100%, 1060px);
    margin: 0 auto;
  }

  .cell-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .identity > span {
    display: grid;
    width: 43px;
    height: 43px;
    place-items: center;
    border: 1px solid var(--cyan);
    color: var(--cyan);
    font-size: 1.4rem;
  }

  .identity strong,
  .identity small {
    display: block;
  }

  .identity small {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.68rem;
    text-transform: uppercase;
  }

  .cell-head > p {
    display: flex;
    gap: 7px;
    margin: 0;
  }

  .cell-head > p > span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 1px solid var(--line);
    color: var(--muted);
  }

  .cell-head > p > span.current {
    border-color: var(--amber);
    color: var(--amber);
    box-shadow: inset 0 -5px 0 rgba(244, 189, 88, 0.22);
  }

  .cell-head > p > span.done {
    border-color: var(--cyan);
    color: #092b2a;
    background: var(--cyan);
  }

  .intro,
  .dossier,
  .report,
  .complete {
    border: 1px solid var(--line);
    background: rgba(32, 43, 49, 0.98);
    box-shadow: 0 22px 60px rgba(0, 0, 0, 0.34);
  }

  .intro,
  .complete {
    padding: clamp(24px, 6vw, 60px);
  }

  .overline,
  .result-label {
    margin: 0;
    color: var(--cyan);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 22ch;
    margin: 11px 0 16px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(2rem, 7vw, 4.3rem);
    letter-spacing: -0.05em;
    line-height: 0.99;
  }

  h2 {
    margin: 7px 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1.25rem, 3.5vw, 1.9rem);
    line-height: 1.25;
  }

  p {
    line-height: 1.55;
  }

  .lead {
    max-width: 69ch;
    margin: 0 0 23px;
    color: #e0d9c8;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1.02rem, 2.2vw, 1.25rem);
  }

  .route-definition {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 13px;
    max-width: 790px;
    padding: 15px;
    border: 1px solid var(--line);
    border-left: 6px solid var(--amber);
    background: #27353a;
  }

  .route-definition > span {
    color: var(--amber);
    font-size: 2rem;
  }

  .route-definition p {
    margin: 0;
  }

  .audit-checks {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 22px 0;
    padding: 0;
    list-style: none;
  }

  .audit-checks li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 9px;
    padding: 12px;
    border: 1px solid var(--line);
  }

  .audit-checks li > span {
    color: var(--amber);
    font-weight: 900;
  }

  .audit-checks p {
    margin: 0;
    font-size: 0.86rem;
  }

  .controls-note {
    color: var(--muted);
    font-size: 0.85rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #879397;
    border-bottom-width: 3px;
    color: white;
    background: #121d22;
    font: inherit;
  }

  button {
    min-height: 48px;
    font: inherit;
    cursor: pointer;
  }

  button:focus-visible,
  .state-focus:focus {
    outline: 4px solid #fff16d;
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
    border: 1px solid var(--cyan);
    font-weight: 900;
  }

  .primary {
    color: #092625;
    background: var(--cyan);
  }

  .primary:hover {
    background: #b0eeea;
  }

  .secondary {
    color: var(--ink);
    background: transparent;
  }

  .secondary:hover {
    background: rgba(127, 215, 209, 0.12);
  }

  .dossier {
    padding: clamp(16px, 4vw, 34px);
  }

  .briefing {
    padding-bottom: 17px;
    border-bottom: 1px solid var(--line);
  }

  .briefing h1 {
    max-width: 34ch;
    margin: 8px 0 11px;
    font-size: clamp(1.5rem, 4.5vw, 2.75rem);
  }

  .briefing > p:not(.overline) {
    margin: 0 0 8px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }

  .briefing small {
    color: var(--cyan);
  }

  .audit-grid {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    margin: 17px 0;
    padding: 14px;
    border: 2px dashed var(--amber);
    background: rgba(244, 189, 88, 0.08);
  }

  .audit-grid > span {
    color: var(--amber);
    font-size: 2rem;
  }

  .audit-grid p {
    margin: 5px 0 0;
  }

  fieldset {
    min-width: 0;
    margin: 22px 0 0;
    padding: 0;
    border: 0;
  }

  legend {
    margin-bottom: 12px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-weight: 900;
  }

  .routes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .route {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 11px;
    min-height: 480px;
    align-content: start;
    padding: 15px;
    border: 1px solid var(--line);
    color: var(--ink);
    background: var(--panel-light);
    text-align: left;
  }

  .route:hover {
    border-color: var(--cyan);
    background: #324247;
  }

  .route-number {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid var(--amber);
    color: var(--amber);
    font-size: 1.3rem;
    font-weight: 900;
  }

  .route-title small,
  .route-title strong,
  .hypothesis,
  .hypothesis b,
  .source-pair,
  .source-chip,
  .source-chip small,
  .source-chip strong,
  .source-chip em,
  .route-conclusion,
  .route-conclusion b,
  .open-label {
    display: block;
    min-width: 0;
  }

  .route-title small {
    color: var(--muted);
    text-transform: uppercase;
  }

  .route-title strong {
    margin-top: 4px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 1.04rem;
  }

  .hypothesis,
  .source-pair,
  .route-conclusion,
  .open-label {
    grid-column: 1 / -1;
  }

  .hypothesis,
  .route-conclusion {
    padding: 10px;
    border-left: 4px solid var(--amber);
    background: #1e2a2f;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 0.88rem;
    line-height: 1.45;
  }

  .hypothesis b,
  .route-conclusion b {
    margin-bottom: 4px;
    color: var(--amber);
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .source-pair {
    display: grid;
    gap: 8px;
  }

  .source-chip {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 9px;
    padding: 10px;
    border: 1px solid #596c71;
    background: #26353a;
  }

  .source-chip > b {
    display: grid;
    min-width: 50px;
    min-height: 46px;
    place-items: center;
    padding: 4px;
    border: 1px solid var(--cyan);
    color: var(--cyan);
    font-size: 0.8rem;
  }

  .source-chip small {
    color: var(--cyan);
    font-size: 0.68rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .source-chip strong {
    margin-top: 3px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 0.82rem;
    line-height: 1.4;
  }

  .source-chip em {
    margin-top: 5px;
    color: var(--muted);
    font-size: 0.74rem;
    line-height: 1.35;
  }

  .open-label {
    align-self: end;
    padding-top: 10px;
    border-top: 1px solid var(--line);
    color: var(--cyan);
    font-size: 0.73rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .report {
    display: grid;
    grid-template-columns: minmax(180px, 0.35fr) minmax(0, 1fr);
    gap: 23px;
    padding: clamp(18px, 4vw, 36px);
    border-top: 8px solid #e27b70;
  }

  .report.right {
    border-top-color: var(--cyan);
  }

  .route-seal {
    display: grid;
    align-content: center;
    justify-items: center;
    min-height: 175px;
    padding: 15px;
    border: 1px dashed #c87870;
    color: #ffc5bd;
    background: #372d2d;
    text-align: center;
  }

  .route-seal.accepted {
    border-color: var(--cyan);
    color: var(--cyan);
    background: #213c3b;
  }

  .route-seal > span {
    display: grid;
    width: 58px;
    height: 58px;
    place-items: center;
    border: 2px solid currentColor;
    border-radius: 50%;
    font-size: 1.6rem;
  }

  .route-seal p {
    margin: 10px 0 3px;
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .result-label {
    color: #ffaaa0;
  }

  .right .result-label {
    color: var(--cyan);
  }

  [data-smoke-feedback-detail] {
    max-width: 68ch;
    margin: 9px 0 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 1.02rem;
  }

  .report > .secondary,
  .roles,
  .continuation {
    grid-column: 1 / -1;
  }

  .report > .secondary {
    justify-self: start;
  }

  .roles {
    padding: 14px;
    border: 1px solid var(--cyan);
    border-left-width: 7px;
    background: #1d3535;
  }

  .roles p {
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
    color: #d7d0bf;
  }

  .complete {
    text-align: center;
  }

  .complete h1,
  .complete .lead,
  .summary {
    margin-right: auto;
    margin-left: auto;
  }

  .seal {
    display: grid;
    width: 70px;
    height: 70px;
    margin: 0 auto 17px;
    place-items: center;
    border: 3px double var(--cyan);
    border-radius: 50%;
    color: var(--cyan);
    font-size: 2rem;
  }

  .summary {
    display: flex;
    max-width: 720px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px;
    border: 1px solid var(--line);
    background: #17252a;
  }

  .summary span {
    padding: 8px;
    border: 1px solid var(--cyan);
    color: var(--cyan);
    font-weight: 900;
  }

  .boundary {
    color: var(--muted);
    font-size: 0.8rem;
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

  @media (max-width: 760px) {
    .audit-checks,
    .routes,
    .report {
      grid-template-columns: 1fr;
    }

    .route {
      min-height: 0;
    }

    .report > .secondary,
    .roles,
    .continuation {
      grid-column: 1;
    }
  }

  @media (max-width: 480px) {
    .prototype {
      padding: 12px;
    }

    .identity small {
      display: none;
    }

    .route {
      padding: 12px;
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
