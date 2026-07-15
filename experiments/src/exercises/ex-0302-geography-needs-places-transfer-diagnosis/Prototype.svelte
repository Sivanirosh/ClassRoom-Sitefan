<script lang="ts">
  type Phase = 'intro' | 'question' | 'incorrect' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';
  type ErrorFamily =
    | 'ATTRACTIVENESS_OVER_NEED'
    | 'LABEL_OVER_EVIDENCE'
    | 'LOCAL_ONLY'
    | 'FUNCTION_MATCH';

  type Patch = {
    id: string;
    title: string;
    change: string;
    consequence: string;
    symbol: string;
    correct: boolean;
  };

  type AuditCase = {
    id: string;
    dossier: string;
    mandate: string;
    need: string;
    currentPlan: string;
    clues: [string, string];
    relation: string;
    patches: [Patch, Patch];
    wrongFamily: Exclude<ErrorFamily, 'FUNCTION_MATCH'>;
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
  };

  const dossiers: AuditCase[] = [
    {
      id: 'refuge-temporaire',
      dossier: 'Dossier A · Changer temporairement la fonction',
      mandate: 'Après une forte tempête fictive, préparer la salle communale pour accueillir des personnes pendant une nuit.',
      need: 'Besoin prioritaire : être à l’abri, se reposer et garder un passage sûr.',
      currentPlan: 'La grande salle est vide. Une entrée et deux sorties sont déjà signalées.',
      clues: [
        'Indice 1 : les personnes doivent pouvoir dormir au sec.',
        'Indice 2 : un couloir libre doit relier les couchages aux sorties.'
      ],
      relation: 'Un même bâtiment peut recevoir une fonction temporaire grâce à son aménagement.',
      patches: [
        {
          id: 'game-zone',
          title: 'Patch « espace de jeux »',
          change: 'Installer des tables de jeu au centre et des guirlandes tout autour.',
          consequence: 'La salle devient attirante pour un loisir, mais aucun couchage ni couloir continu n’apparaît.',
          symbol: '✦',
          correct: false
        },
        {
          id: 'sleep-zones',
          title: 'Patch « zones de repos »',
          change: 'Placer des couchages sur les côtés et garder un couloir central jusqu’aux sorties.',
          consequence: 'La salle permet le repos à l’abri tout en conservant le passage demandé.',
          symbol: '▥',
          correct: true
        }
      ],
      wrongFamily: 'ATTRACTIVENESS_OVER_NEED',
      incorrectFeedback:
        '✗ Le patch de jeux rend la salle attirante pour un loisir, mais il laisse sans réponse les deux indices : dormir au sec et garder un couloir vers les sorties.',
      scaffold:
        'Grille d’audit : 1) besoin = repos à l’abri ; 2) actions = dormir et circuler ; 3) vérifie quel patch rend ces deux actions possibles.',
      correctFeedback:
        '✓ Les couchages répondent au repos à l’abri et le couloir relie les zones aux sorties : les deux indices soutiennent la nouvelle fonction temporaire.'
    },
    {
      id: 'epicerie-mobile',
      dossier: 'Dossier B · Relier un service mobile',
      mandate: 'Un hameau fictif n’a pas de commerce fixe. Choisir un point pour le passage hebdomadaire d’une épicerie mobile.',
      need: 'Besoin observé : recevoir et choisir des aliments sans se rendre chaque fois au bourg.',
      currentPlan: 'Le plan montre une « place du Marché » vide et un arrêt accessible sur la route régionale.',
      clues: [
        'Indice 1 : le véhicule suit la route régionale et ne peut pas entrer dans les ruelles étroites.',
        'Indice 2 : le point doit offrir un espace d’arrêt et un chemin piéton depuis les maisons.'
      ],
      relation: 'La fonction dépend du service réel et de son accès, pas seulement du nom écrit sur le plan.',
      patches: [
        {
          id: 'named-square',
          title: 'Patch « Place du Marché »',
          change: 'Poser une enseigne sur la place au bout d’une ruelle étroite.',
          consequence: 'Le nom évoque un marché, mais le véhicule de produits ne peut pas atteindre cette place.',
          symbol: 'M',
          correct: false
        },
        {
          id: 'route-stop',
          title: 'Patch « arrêt de la tournée »',
          change: 'Marquer une zone d’arrêt sur la route et un chemin piéton vers les maisons.',
          consequence: 'Le véhicule peut livrer et les habitantes et habitants peuvent rejoindre le service.',
          symbol: '↧',
          correct: true
        }
      ],
      wrongFamily: 'LABEL_OVER_EVIDENCE',
      incorrectFeedback:
        '✗ Le nom « Place du Marché » semble convenir, mais les indices montrent que le véhicule ne peut pas y accéder. Sans livraison possible, la fonction d’approvisionnement n’est pas créée.',
      scaffold:
        'Grille d’audit : oublie un instant les noms. Suis le véhicule sur la route, puis suis les personnes à pied. Quel patch relie les deux trajets ?',
      correctFeedback:
        '✓ La zone d’arrêt relie la tournée régionale au chemin des maisons : le véhicule peut livrer et le lieu remplit réellement une fonction d’approvisionnement.'
    },
    {
      id: 'fete-deux-places',
      dossier: 'Dossier C · Relier des zones temporaires',
      mandate: 'Une fête de quartier fictive occupe deux petites places séparées. Réviser le plan pour faciliter les échanges entre les activités.',
      need: 'Besoin observé : passer facilement de l’atelier de réparation au repas partagé.',
      currentPlan: 'L’atelier est sur la place Nord et les tables du repas sur la place Sud.',
      clues: [
        'Indice 1 : une ruelle relie les deux places, mais son entrée est difficile à repérer.',
        'Indice 2 : les deux activités doivent rester à leur place pour avoir assez d’espace.'
      ],
      relation: 'Relier des parties peut permettre à un lieu temporaire d’assurer plusieurs fonctions coordonnées.',
      patches: [
        {
          id: 'north-decoration',
          title: 'Patch « décorer la place Nord »',
          change: 'Ajouter une grande décoration au milieu de la place de l’atelier.',
          consequence: 'La place Nord est plus visible, mais le passage entre les deux activités reste introuvable.',
          symbol: '◆',
          correct: false
        },
        {
          id: 'signed-path',
          title: 'Patch « chemin entre les places »',
          change: 'Poser des repères textuels aux deux entrées de la ruelle et garder le passage libre.',
          consequence: 'Le trajet devient repérable sans déplacer l’atelier ni le repas.',
          symbol: '⇢',
          correct: true
        }
      ],
      wrongFamily: 'LOCAL_ONLY',
      incorrectFeedback:
        '✗ La décoration améliore seulement la place Nord. Elle ne répond pas à l’indice de liaison : le passage vers la place Sud reste difficile à repérer.',
      scaffold:
        'Grille d’audit : le besoin n’est pas d’embellir une zone, mais de passer entre deux zones. Quel patch agit sur la relation Nord–Sud ?',
      correctFeedback:
        '✓ Les repères aux deux entrées et le passage libre rendent la liaison Nord–Sud utilisable : les activités restent séparées mais deviennent accessibles entre elles.'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentDossier: AuditCase = dossiers[0];
  let retrying = false;
  let submitted: Patch | null = null;
  let responsePath: string[] = [];
  let errorFamily: ErrorFamily | null = null;

  $: legacyState = phase === 'intro' ? 'ready' : phase;

  function start(): void {
    currentIndex = 0;
    currentDossier = dossiers[0];
    retrying = false;
    submitted = null;
    responsePath = [];
    errorFamily = null;
    phase = 'question';
  }

  function applyPatch(patch: Patch): void {
    submitted = patch;
    retrying = false;
    responsePath = [...responsePath, `${currentDossier.id}:${patch.id}`];
    errorFamily = patch.correct ? 'FUNCTION_MATCH' : currentDossier.wrongFamily;
    phase = patch.correct ? 'correct' : 'incorrect';
  }

  function retry(): void {
    submitted = null;
    retrying = true;
    phase = 'question';
  }

  function nextDossier(): void {
    if (currentIndex === dossiers.length - 1) {
      phase = 'complete';
      return;
    }

    currentIndex += 1;
    currentDossier = dossiers[currentIndex];
    submitted = null;
    errorFamily = null;
    retrying = false;
    phase = 'question';
  }
</script>

<main
  class="prototype"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0302"
  data-smoke-root
  data-smoke-exercise="EX-0302"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <div class="studio">
    <header class="studio-head">
      <div class="brand"><span aria-hidden="true">⌗</span><div><strong>Atelier des plans utiles</strong><small>Audit géographique</small></div></div>
      <p aria-label={`Dossier ${Math.min(currentIndex + 1, dossiers.length)} sur ${dossiers.length}`}>
        {#each dossiers as dossier, index}
          <span class:checked={phase === 'complete' || index < currentIndex} class:active={index === currentIndex && phase !== 'intro' && phase !== 'complete'}>
            <span aria-hidden="true">{phase === 'complete' || index < currentIndex ? '✓' : String.fromCharCode(65 + index)}</span>
            <span class="sr-only">{dossier.dossier}</span>
          </span>
        {/each}
      </p>
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <p class="overline">Observer · tester · réviser</p>
        <h1 id="intro-title">Un plan doit être utile, pas seulement joli</h1>
        <p class="lead">
          Trois équipes ont proposé un plan. Pour chaque dossier, lis deux indices puis applique la modification qui donne au lieu la fonction nécessaire.
        </p>
        <div class="vocabulary">
          <span aria-hidden="true">+</span>
          <p><strong>Un patch de plan</strong> est une modification proposée : on ajoute, déplace ou relie un élément pour changer ce que le lieu permet de faire.</p>
        </div>
        <ul class="audit-steps">
          <li><span>1</span><p><strong>Besoin</strong><br />De quoi les personnes ont-elles besoin&nbsp;?</p></li>
          <li><span>2</span><p><strong>Indices</strong><br />Quelles actions doivent être possibles&nbsp;?</p></li>
          <li><span>3</span><p><strong>Fonction</strong><br />Quel patch rend ces actions possibles&nbsp;?</p></li>
        </ul>
        <p class="controls-note">Toutes les modifications sont des boutons. Utilise <kbd>Tab</kbd>, puis <kbd>Entrée</kbd> ou <kbd>Espace</kbd> au clavier.</p>
        <button class="primary" type="button" on:click={start} data-smoke-action="start">Recevoir le dossier A <span aria-hidden="true">→</span></button>
      </section>
    {:else if phase === 'question'}
      <section
        class="audit"
        data-smoke-state={retrying ? 'retry' : 'active'}
        data-smoke-variation={currentDossier.id}
        aria-labelledby="dossier-title"
      >
        <div class="dossier-head">
          <p>{currentDossier.dossier}</p>
          <h1 id="dossier-title">{currentDossier.mandate}</h1>
          <div class="need"><span aria-hidden="true">!</span><strong>{currentDossier.need}</strong></div>
        </div>

        {#if retrying}
          <aside class="audit-grid" role="status" aria-live="polite">
            <span class="grid-mark" aria-hidden="true">⌗</span>
            <div><strong>Grille d’audit ouverte</strong><p>{currentDossier.scaffold}</p></div>
          </aside>
        {/if}

        <div class="plan-panel">
          <div class="plan-drawing" aria-hidden="true">
            <span class="node">□</span><span class="route">····</span><span class="node">◇</span>
          </div>
          <div>
            <p class="label">Plan actuel</p>
            <p>{currentDossier.currentPlan}</p>
            <p class="relation"><span aria-hidden="true">⌁</span> {currentDossier.relation}</p>
          </div>
        </div>

        <section class="clues" aria-labelledby="clues-title">
          <p class="label" id="clues-title">Indices à satisfaire ensemble</p>
          <ol>
            {#each currentDossier.clues as clue, index}
              <li><span aria-hidden="true">{index + 1}</span><p>{clue}</p></li>
            {/each}
          </ol>
        </section>

        <fieldset>
          <legend>Quel patch appliques-tu au plan&nbsp;?</legend>
          <div class="patches">
            {#each currentDossier.patches as patch}
              <button
                class="patch"
                type="button"
                on:click={() => applyPatch(patch)}
                data-smoke-answer={patch.correct ? 'correct' : 'incorrect'}
                data-smoke-attempt={patch.correct ? 'correct' : 'incorrect'}
              >
                <span class="patch-symbol" aria-hidden="true">{patch.symbol}</span>
                <span class="patch-copy"><strong>{patch.title}</strong><small>{patch.change}</small></span>
                <span class="patch-effect"><b>Effet prévu</b>{patch.consequence}</span>
                <span class="apply">Appliquer et vérifier</span>
              </button>
            {/each}
          </div>
        </fieldset>
      </section>
    {:else if phase === 'incorrect'}
      <section class="decision wrong" data-smoke-state="incorrect" data-smoke-variation={currentDossier.id} aria-labelledby="wrong-title">
        <div class="decision-map" aria-hidden="true"><span>{submitted?.symbol}</span><b>?</b><span>Besoin</span></div>
        <div role="status" aria-live="polite">
          <p class="decision-label" id="wrong-title"><span aria-hidden="true">✗</span> Un indice reste sans réponse</p>
          <h2>{submitted?.title}</h2>
          <p data-smoke-feedback="incorrect" data-smoke-feedback-detail>{currentDossier.incorrectFeedback}</p>
        </div>
        <button class="secondary" type="button" on:click={retry} data-smoke-action="retry">Ouvrir la grille et réviser <span aria-hidden="true">⌗</span></button>
      </section>
    {:else if phase === 'correct'}
      <section class="decision right" data-smoke-state="correct" data-smoke-variation={currentDossier.id} aria-labelledby="right-title">
        <div class="decision-map matched" aria-hidden="true"><span>{submitted?.symbol}</span><b>→</b><span>Besoin</span></div>
        <div role="status" aria-live="polite">
          <p class="decision-label" id="right-title"><span aria-hidden="true">✓</span> Le patch répond aux deux indices</p>
          <h2>{submitted?.title}</h2>
          <p data-smoke-feedback="correct" data-smoke-feedback-detail>{currentDossier.correctFeedback}</p>
        </div>
        <div class="continuation" data-smoke-state="continuation" data-smoke-variation={currentDossier.id}>
          <p>{currentIndex === dossiers.length - 1 ? 'Les trois plans ont été audités.' : 'Le prochain dossier change de représentation.'}</p>
          <button class="primary" type="button" on:click={nextDossier} data-smoke-action="continue">
            {currentIndex === dossiers.length - 1 ? 'Clore l’audit' : `Recevoir le dossier ${String.fromCharCode(66 + currentIndex)}`} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else}
      <section class="complete" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <div class="seal" aria-hidden="true">✓</div>
        <p class="overline">Audit terminé</p>
        <h1 id="complete-title">Trois plans révisés avec leurs indices</h1>
        <p class="lead">
          Tu as testé une fonction temporaire, un service mobile et une liaison entre deux zones. Pour auditer un lieu, relie toujours le besoin aux actions que le plan rend possibles.
        </p>
        <div class="summary-chain"><span>Besoin</span><b>+</b><span>Indices</span><b>→</b><span>Fonction du lieu</span></div>
        <p class="boundary">Cet atelier résume une stratégie ; il ne donne ni score ni jugement sur ta manière d’apprendre.</p>
      </section>
    {/if}
  </div>
</main>

<style>
  .prototype {
    --ink: #edf8f4;
    --muted: #a9c6bc;
    --panel: #102c2d;
    --panel-light: #173b3a;
    --line: #4f7770;
    --mint: #70e0b0;
    --orange: #ffb45c;
    min-height: calc(100vh - 42px);
    padding: clamp(12px, 3vw, 32px);
    color: var(--ink);
    background:
      linear-gradient(rgba(112, 224, 176, 0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(112, 224, 176, 0.055) 1px, transparent 1px),
      #081d1f;
    background-size: 28px 28px;
    font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  }

  .studio {
    width: min(100%, 1000px);
    margin: 0 auto;
  }

  .studio-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 17px;
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
    border: 1px solid var(--mint);
    color: var(--mint);
    font-size: 1.4rem;
  }

  .brand strong,
  .brand small {
    display: block;
  }

  .brand small {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  .studio-head > p {
    display: flex;
    gap: 7px;
    margin: 0;
  }

  .studio-head > p > span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 1px solid var(--line);
    color: var(--muted);
  }

  .studio-head > p > span.checked,
  .studio-head > p > span.active {
    border-color: var(--mint);
    color: var(--mint);
  }

  .studio-head > p > span.checked {
    background: rgba(112, 224, 176, 0.12);
  }

  .intro,
  .audit,
  .decision,
  .complete {
    overflow-wrap: anywhere;
    border: 1px solid var(--line);
    background: rgba(16, 44, 45, 0.97);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  }

  .intro,
  .complete {
    padding: clamp(24px, 6vw, 60px);
  }

  .overline,
  .label,
  .decision-label {
    margin: 0;
    color: var(--mint);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 20ch;
    margin: 12px 0 16px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(2rem, 7vw, 4.4rem);
    letter-spacing: -0.05em;
    line-height: 0.98;
  }

  h2 {
    margin: 7px 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1.4rem, 4vw, 2.2rem);
  }

  p {
    line-height: 1.55;
  }

  .lead {
    max-width: 68ch;
    margin: 0 0 24px;
    color: #d2e4de;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1.02rem, 2.2vw, 1.25rem);
  }

  .vocabulary {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    max-width: 750px;
    padding: 16px;
    border: 1px solid var(--line);
    border-left: 6px solid var(--orange);
    background: #173637;
  }

  .vocabulary > span {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border: 1px solid var(--orange);
    color: var(--orange);
    font-weight: 900;
  }

  .vocabulary p {
    margin: 0;
  }

  .audit-steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 22px 0;
    padding: 0;
    list-style: none;
  }

  .audit-steps li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    min-width: 0;
    padding: 12px;
    border: 1px solid var(--line);
  }

  .audit-steps li > span {
    color: var(--orange);
    font-weight: 900;
  }

  .audit-steps p {
    margin: 0;
    font-size: 0.87rem;
  }

  .controls-note {
    color: var(--muted);
    font-size: 0.87rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #6b958d;
    border-bottom-width: 3px;
    color: white;
    background: #0a2224;
    font: inherit;
  }

  button {
    min-height: 48px;
    font: inherit;
    cursor: pointer;
  }

  button:focus-visible {
    outline: 4px solid #ffe45c;
    outline-offset: 4px;
  }

  .primary,
  .secondary {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 13px 17px;
    border: 1px solid var(--mint);
    color: #06231c;
    background: var(--mint);
    font-weight: 900;
  }

  .primary:hover {
    background: #a2efcd;
  }

  .secondary {
    color: var(--ink);
    background: transparent;
  }

  .secondary:hover {
    background: rgba(112, 224, 176, 0.12);
  }

  .audit {
    padding: clamp(16px, 4vw, 34px);
  }

  .dossier-head {
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line);
  }

  .dossier-head > p:first-child {
    margin: 0;
    color: var(--orange);
    font-size: 0.73rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .dossier-head h1 {
    max-width: 32ch;
    margin: 8px 0 14px;
    font-size: clamp(1.55rem, 4.5vw, 2.8rem);
  }

  .need {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    max-width: 800px;
    padding: 12px;
    border: 1px solid #aa7441;
    background: rgba(255, 180, 92, 0.08);
  }

  .need > span {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    color: #1e1000;
    background: var(--orange);
    font-weight: 900;
  }

  .audit-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    margin: 18px 0;
    padding: 14px;
    border: 2px dashed var(--orange);
    background: rgba(255, 180, 92, 0.07);
  }

  .grid-mark {
    color: var(--orange);
    font-size: 2rem;
  }

  .audit-grid p {
    margin: 5px 0 0;
  }

  .plan-panel {
    display: grid;
    grid-template-columns: minmax(160px, 0.42fr) 1fr;
    gap: 20px;
    align-items: center;
    margin: 20px 0;
    padding: 17px;
    border: 1px solid var(--line);
    background: #0b2729;
  }

  .plan-drawing {
    display: flex;
    min-height: 128px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px dashed #62978c;
    color: var(--mint);
  }

  .node {
    font-size: 3rem;
  }

  .route {
    color: var(--orange);
    letter-spacing: 0.25em;
  }

  .plan-panel p {
    margin: 5px 0;
  }

  .relation {
    color: var(--mint);
    font-size: 0.86rem;
  }

  .clues {
    margin-bottom: 20px;
  }

  .clues ol {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 9px 0 0;
    padding: 0;
    list-style: none;
  }

  .clues li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--line);
    background: var(--panel-light);
  }

  .clues li > span {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 1px solid var(--mint);
    color: var(--mint);
    font-weight: 900;
  }

  .clues li p {
    margin: 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 0.92rem;
  }

  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    margin-bottom: 11px;
    color: var(--ink);
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
  }

  .patches {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .patch {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    min-height: 220px;
    align-content: start;
    padding: 15px;
    border: 1px solid var(--line);
    color: var(--ink);
    background: #143536;
    text-align: left;
  }

  .patch:hover {
    border-color: var(--mint);
    background: #194443;
  }

  .patch-symbol {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border: 1px solid var(--orange);
    color: var(--orange);
    font-size: 1.45rem;
    font-weight: 900;
  }

  .patch-copy strong,
  .patch-copy small,
  .patch-effect,
  .patch-effect b,
  .apply {
    display: block;
  }

  .patch-copy strong {
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 1rem;
  }

  .patch-copy small {
    margin-top: 6px;
    color: #c8dbd5;
    line-height: 1.45;
  }

  .patch-effect {
    grid-column: 1 / -1;
    padding: 10px;
    border-left: 3px solid var(--line);
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .patch-effect b {
    margin-bottom: 3px;
    color: var(--ink);
    font-size: 0.69rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .apply {
    grid-column: 1 / -1;
    align-self: end;
    padding-top: 9px;
    border-top: 1px solid var(--line);
    color: var(--mint);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .decision {
    display: grid;
    grid-template-columns: minmax(160px, 0.35fr) 1fr;
    gap: 24px;
    padding: clamp(18px, 4vw, 36px);
    border-top: 8px solid #e28174;
  }

  .decision.right {
    border-top-color: var(--mint);
  }

  .decision-map {
    display: flex;
    min-height: 150px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px dashed #c67f76;
    color: #ffc0b8;
    background: #2e292a;
  }

  .decision-map.matched {
    border-color: var(--mint);
    color: var(--mint);
    background: #133936;
  }

  .decision-map span:first-child {
    font-size: 2rem;
  }

  .decision-label {
    color: #ffb8af;
  }

  .right .decision-label {
    color: var(--mint);
  }

  [data-smoke-feedback-detail] {
    max-width: 65ch;
    margin: 9px 0 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 1.02rem;
  }

  .decision > .secondary {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .continuation {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
  }

  .continuation p {
    margin: 0;
    color: #c9ded7;
  }

  .complete {
    text-align: center;
  }

  .complete h1,
  .complete .lead,
  .summary-chain {
    margin-right: auto;
    margin-left: auto;
  }

  .seal {
    display: grid;
    width: 70px;
    height: 70px;
    margin: 0 auto 18px;
    place-items: center;
    border: 3px double var(--mint);
    border-radius: 50%;
    color: var(--mint);
    font-size: 2rem;
  }

  .summary-chain {
    display: flex;
    max-width: 670px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px;
    border: 1px solid var(--line);
    background: #0b2729;
  }

  .summary-chain span {
    padding: 8px;
    border: 1px solid var(--mint);
    color: var(--mint);
    font-weight: 900;
  }

  .boundary {
    color: var(--muted);
    font-size: 0.82rem;
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

  @media (max-width: 650px) {
    .prototype {
      padding: 12px;
    }

    .brand small {
      display: none;
    }

    .audit-steps,
    .plan-panel,
    .clues ol,
    .patches,
    .decision {
      grid-template-columns: 1fr;
    }

    .audit-steps {
      gap: 7px;
    }

    .plan-drawing {
      min-height: 96px;
    }

    .patch {
      min-height: 200px;
    }

    .decision > .secondary,
    .continuation {
      grid-column: 1;
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
