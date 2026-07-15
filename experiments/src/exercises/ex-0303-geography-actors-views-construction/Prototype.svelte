<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type CategoryId = 'individual-social' | 'collective-economic' | 'collective-public';
  type AttemptKind = 'incorrect' | 'correct' | undefined;

  type CategoryProfile = {
    id: CategoryId;
    title: string;
    axes: string;
    definition: string;
    symbol: string;
  };

  type ViewOption = {
    id: string;
    title: string;
    detail: string;
    symbol: string;
  };

  type Scenario = {
    id: string;
    chapter: string;
    theme: string;
    place: string;
    placeDescription: string;
    farLink: string;
    actor: string;
    actorMark: string;
    actorStatus: string;
    roleQuote: string;
    roleVerbs: string[];
    question: string;
    correctCategory: CategoryId;
    wrongCategory: CategoryId;
    views: ViewOption[];
    correctView: string;
    wrongView: string;
    categoryCorrection: string;
    viewCorrection: string;
    correctExplanation: string;
    scaffoldLead: string;
  };

  const categories: CategoryProfile[] = [
    {
      id: 'individual-social',
      title: 'Une personne',
      axes: 'individuel · privé · social',
      definition: 'Une personne agit ici par son usage quotidien et sa vie avec les autres.',
      symbol: '1'
    },
    {
      id: 'collective-economic',
      title: 'Une organisation privée',
      axes: 'collectif · privé · économique',
      definition: 'Une équipe privée achète, fournit, produit ou vend.',
      symbol: '↔'
    },
    {
      id: 'collective-public',
      title: 'Une autorité publique',
      axes: 'collectif · public · politique',
      definition: 'Un groupe public décide de règles ou de choix pour la collectivité.',
      symbol: '◇'
    }
  ];

  const scenarios: Scenario[] = [
    {
      id: 'place-commune',
      chapter: 'Décider pour un lieu partagé',
      theme: 'Loisirs · échanges',
      place: 'Place des Tilleuls',
      placeDescription:
        'Près de l’école, cette place accueille le marché, les jeux et le passage vers les commerces.',
      farLink: 'Les nouveaux arbres viendraient d’une pépinière de la région.',
      actor: 'Le conseil communal',
      actorMark: 'CC',
      actorStatus: 'Groupe élu lié à l’autorité de la commune',
      roleQuote:
        '« Nous décidons du budget de la place et des règles qui permettent à tous de l’utiliser. »',
      roleVerbs: ['décidons', 'budget', 'règles pour tous'],
      question: 'Dans quelle catégorie placer cet acteur, et que met-il au premier plan ici ?',
      correctCategory: 'collective-public',
      wrongCategory: 'collective-economic',
      views: [
        {
          id: 'shared-budget',
          title: 'Budget et usages à partager',
          detail: 'Le coût, les règles et la place laissée aux différents usages.',
          symbol: '◇'
        },
        {
          id: 'easy-delivery',
          title: 'Livrer et vendre facilement',
          detail: 'L’accès d’un véhicule de livraison et l’activité d’un commerce.',
          symbol: '↔'
        },
        {
          id: 'daily-pause',
          title: 'Un passage calme au quotidien',
          detail: 'Le confort d’une personne qui traverse ou fait une pause.',
          symbol: '1'
        }
      ],
      correctView: 'shared-budget',
      wrongView: 'easy-delivery',
      categoryCorrection:
        'Le conseil est un groupe lié à l’autorité de la commune. Il prend des décisions collectives : il est collectif, public et politique dans ce dossier.',
      viewCorrection:
        'Les mots « décidons du budget » et « règles pour tous » placent le coût et les usages partagés au premier plan, pas la vente d’un commerce.',
      correctExplanation:
        'Le conseil communal est une autorité collective et publique. Comme son rôle est de décider du budget et des règles communes, son regard met ici au premier plan le partage des usages et des moyens.',
      scaffoldLead:
        'Repère qui peut décider du budget et établir des règles pour toute la place.'
    },
    {
      id: 'rue-epicerie',
      chapter: 'Approvisionner le quartier',
      theme: 'Approvisionnement · échanges',
      place: 'Rue des Halles',
      placeDescription:
        'Cette rue relie des logements, un arrêt de bus et plusieurs petits commerces du quartier.',
      farLink: 'Des fruits arrivent de fermes situées hors de la commune.',
      actor: 'L’équipe de l’épicerie des Arcades',
      actorMark: 'ÉA',
      actorStatus: 'Commerce géré par une équipe privée',
      roleQuote:
        '« Nous achetons des fruits aux fermes de la région, recevons la livraison tôt et les vendons aux habitants. »',
      roleVerbs: ['achetons', 'recevons', 'vendons'],
      question: 'Compose le profil de cette équipe, puis oriente son regard sur la rue.',
      correctCategory: 'collective-economic',
      wrongCategory: 'individual-social',
      views: [
        {
          id: 'delivery-customers',
          title: 'Livraison et accès des clients',
          detail: 'Recevoir les produits puis permettre aux clients d’entrer à pied.',
          symbol: '↔'
        },
        {
          id: 'rules-for-everyone',
          title: 'Décider les règles pour tous',
          detail: 'Fixer le budget public et les règles communes de la rue.',
          symbol: '◇'
        },
        {
          id: 'quiet-bench',
          title: 'Trouver un banc tranquille',
          detail: 'Faire une pause personnelle à l’écart du passage.',
          symbol: '1'
        }
      ],
      correctView: 'delivery-customers',
      wrongView: 'rules-for-everyone',
      categoryCorrection:
        'La fiche parle d’une équipe privée qui achète et vend. L’acteur est ici une organisation collective, privée et économique, pas une personne seule.',
      viewCorrection:
        '« Acheter, recevoir et vendre » soutient le regard sur la livraison et l’accès des clients. Décider les règles pour tous correspondrait à un autre rôle.',
      correctExplanation:
        'L’épicerie est une organisation collective et privée à rôle économique. Ses achats, ses livraisons et ses ventes expliquent pourquoi son regard met au premier plan l’arrivée des produits et l’accès des clients.',
      scaffoldLead:
        'Suis la chaîne d’actions : des fermes vers la livraison, puis de l’épicerie vers les habitants.'
    },
    {
      id: 'trajet-habitant',
      chapter: 'Vivre un trajet quotidien',
      theme: 'Habitat · déplacements',
      place: 'Parvis de la Garette',
      placeDescription:
        'Ce petit parvis relie les immeubles du quartier, une piste cyclable et l’arrêt de bus.',
      farLink: 'La ligne de bus relie le quartier à la gare et aux localités voisines.',
      actor: 'Noé, habitant du quartier',
      actorMark: 'N',
      actorStatus: 'Une personne qui utilise ce passage chaque jour',
      roleQuote:
        '« Je traverse le parvis chaque matin pour rejoindre le bus avec ma petite sœur. Nous devons bien voir les vélos. »',
      roleVerbs: ['je traverse', 'chaque matin', 'voir les vélos'],
      question: 'Qui agit dans cette fiche, et quel regard son usage quotidien construit-il ?',
      correctCategory: 'individual-social',
      wrongCategory: 'collective-public',
      views: [
        {
          id: 'safe-route',
          title: 'Un trajet continu et sûr',
          detail: 'Voir les vélos et rejoindre l’arrêt sans couper le chemin.',
          symbol: '1'
        },
        {
          id: 'promote-sales',
          title: 'Mettre en valeur les ventes',
          detail: 'Attirer des clients et organiser l’arrivée de marchandises.',
          symbol: '↔'
        },
        {
          id: 'vote-budget',
          title: 'Voter le budget du parvis',
          detail: 'Décider des dépenses et des règles pour la commune.',
          symbol: '◇'
        }
      ],
      correctView: 'safe-route',
      wrongView: 'promote-sales',
      categoryCorrection:
        'Noé parle en son nom et décrit un usage quotidien. Dans ce dossier, c’est un acteur individuel, privé et social, pas une autorité publique.',
      viewCorrection:
        '« Chaque matin » et « voir les vélos » soutiennent un trajet continu et sûr. Rien dans la fiche ne donne à Noé un rôle de vente.',
      correctExplanation:
        'Noé est ici un acteur individuel et privé dont le rôle est lié à la vie quotidienne. Son trajet avec sa sœur explique pourquoi il représente le parvis d’abord comme un passage à rendre continu et sûr.',
      scaffoldLead:
        'Observe les pronoms et la fréquence : qui dit « je », et que fait cette personne chaque matin ?'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let current: Scenario = scenarios[0];
  let selectedCategory: CategoryId | null = null;
  let selectedView: string | null = null;
  let submittedCategory: CategoryId | null = null;
  let submittedView: string | null = null;
  let completedVariations: string[] = [];
  let announcement = '';
  let rootElement: HTMLElement;

  function legacyState(): 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' {
    if (phase === 'intro') return 'ready';
    if (phase === 'incorrect') return 'incorrect';
    if (phase === 'correct') return 'correct';
    if (phase === 'complete') return 'complete';
    return 'question';
  }

  function categoryFor(id: CategoryId | null): CategoryProfile | undefined {
    return categories.find((profile) => profile.id === id);
  }

  function viewFor(id: string | null): ViewOption | undefined {
    return current.views.find((view) => view.id === id);
  }

  function categoryAttempt(id: CategoryId): AttemptKind {
    if (id === current.correctCategory) return 'correct';
    if (id === current.wrongCategory) return 'incorrect';
    return undefined;
  }

  function viewAttempt(id: string): AttemptKind {
    if (id === current.correctView) return 'correct';
    if (id === current.wrongView) return 'incorrect';
    return undefined;
  }

  function canSubmit(): boolean {
    return selectedCategory !== null && selectedView !== null;
  }

  async function focusStage(message: string): Promise<void> {
    announcement = message;
    await tick();
    rootElement?.querySelector<HTMLElement>('[data-focus-target]')?.focus();
  }

  function resetChoices(): void {
    selectedCategory = null;
    selectedView = null;
    submittedCategory = null;
    submittedView = null;
  }

  async function startStudy(): Promise<void> {
    currentIndex = 0;
    current = scenarios[0];
    completedVariations = [];
    resetChoices();
    phase = 'active';
    await focusStage(`Dossier 1 sur ${scenarios.length} : ${current.place}.`);
  }

  function chooseCategory(id: CategoryId): void {
    selectedCategory = id;
    const profile = categoryFor(id);
    announcement = `Profil choisi : ${profile?.axes ?? ''}. Choisis maintenant ce que cet acteur met au premier plan.`;
  }

  function chooseView(id: string): void {
    selectedView = id;
    const view = viewFor(id);
    announcement = `Lentille orientée vers : ${view?.title ?? ''}. Le tableau des regards a changé.`;
  }

  function incorrectExplanation(): string {
    const parts: string[] = [];
    if (submittedCategory === current.correctCategory) {
      parts.push(`La catégorie envoyée « ${categoryFor(submittedCategory)?.axes} » correspond bien au statut de l’acteur.`);
    } else {
      parts.push(
        `La catégorie envoyée « ${categoryFor(submittedCategory)?.axes} » ne suit pas le statut décrit. ${current.categoryCorrection}`
      );
    }

    if (submittedView === current.correctView) {
      parts.push(`Le premier plan envoyé « ${viewFor(submittedView)?.title} » est bien soutenu par les actions de la fiche.`);
    } else {
      parts.push(
        `Le premier plan envoyé « ${viewFor(submittedView)?.title} » ne suit pas ces actions. ${current.viewCorrection}`
      );
    }
    return parts.join(' ');
  }

  async function submitRelationship(): Promise<void> {
    if (!selectedCategory || !selectedView) return;
    submittedCategory = selectedCategory;
    submittedView = selectedView;

    if (
      selectedCategory === current.correctCategory &&
      selectedView === current.correctView
    ) {
      if (!completedVariations.includes(current.id)) {
        completedVariations = [...completedVariations, current.id];
      }
      phase = 'correct';
      await focusStage(`Relation cohérente pour ${current.actor}. Lis l’explication avant de continuer.`);
      return;
    }

    phase = 'incorrect';
    await focusStage(`Lien à reconstruire pour ${current.actor}. Le montage envoyé reste visible.`);
  }

  function compactProposalKinds(): Array<Exclude<AttemptKind, undefined>> {
    return currentIndex % 2 === 0 ? ['incorrect', 'correct'] : ['correct', 'incorrect'];
  }

  async function submitCompactProposal(kind: Exclude<AttemptKind, undefined>): Promise<void> {
    selectedCategory = kind === 'correct' ? current.correctCategory : current.wrongCategory;
    selectedView = kind === 'correct' ? current.correctView : current.wrongView;
    await submitRelationship();
  }

  async function retryRelationship(): Promise<void> {
    phase = 'retry';
    await focusStage('Mode indice ouvert. Tes choix précédents sont conservés et les contrôles sont de nouveau disponibles.');
  }

  async function continueStudy(): Promise<void> {
    if (currentIndex === scenarios.length - 1) {
      phase = 'complete';
      await focusStage('Les trois dossiers sont terminés. Lis le repère final.');
      return;
    }

    currentIndex += 1;
    current = scenarios[currentIndex];
    resetChoices();
    phase = 'active';
    await focusStage(`Nouveau dossier : ${current.place}.`);
  }

  async function restartStudy(): Promise<void> {
    await startStudy();
  }
</script>

<svelte:head>
  <title>Le cabinet des regards · EX-0303</title>
  <meta
    name="description"
    content="Prototype de géographie 6H sur les catégories d’acteurs, leurs rôles et leurs points de vue situés."
  />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0303"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState()}
>
<main
  bind:this={rootElement}
  class="observatory"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0303"
>
  <div class="paper-noise" aria-hidden="true"></div>

  <header class="cabinet-bar">
    <div class="cabinet-brand" aria-label="Le cabinet des regards">
      <span class="brand-lens" aria-hidden="true"><i></i></span>
      <span><strong>Cabinet</strong><small>des regards</small></span>
    </div>
    <p>Géographie · 6H</p>
    {#if phase !== 'intro' && phase !== 'complete'}
      <div class="case-count" aria-label={`Dossier ${currentIndex + 1} sur ${scenarios.length}`}>
        <span>0{currentIndex + 1}</span><small>/ 0{scenarios.length}</small>
      </div>
    {:else if phase === 'complete'}
      <div class="case-count finished"><span aria-hidden="true">✓</span><small>3 dossiers</small></div>
    {:else}
      <span class="case-code">EX—0303</span>
    {/if}
  </header>

  {#if phase === 'intro'}
    <section class="intro state-shell" data-smoke-state="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="overline">Enquête sur un même espace, plusieurs regards</p>
        <h1 id="intro-title">Qui regarde<br /><em>quoi</em> — et pourquoi&nbsp;?</h1>
        <p class="intro-lead">
          Tu vas classer un acteur, puis orienter sa lentille. Son <strong>rôle</strong> donne des
          indices sur ce qu’il met au premier plan dans ce lieu précis.
        </p>

        <div class="intro-steps" aria-label="Les deux gestes de l’enquête">
          <div><span>1</span><p><strong>Place l’acteur.</strong> Choisis sa catégorie à partir de la fiche.</p></div>
          <div><span>2</span><p><strong>Oriente la lentille.</strong> Choisis le regard soutenu par son rôle.</p></div>
        </div>

        <div class="intro-warning">
          <span aria-hidden="true">≠</span>
          <p><strong>Attention :</strong> une catégorie ne décide pas d’une opinion. Utilise toujours les actes et les paroles du dossier.</p>
        </div>

        <button class="primary-action" type="button" data-smoke-action="start" onclick={startStudy}>
          Entrer dans le cabinet <span aria-hidden="true">→</span>
        </button>
        <p class="duration">3 dossiers · sans chronomètre · environ 8 minutes</p>
      </div>

      <aside class="intro-glossary" aria-label="Mots utiles">
        <div class="lens-poster" aria-hidden="true">
          <span class="orbit orbit-one"></span>
          <span class="orbit orbit-two"></span>
          <div class="poster-eye"><i></i></div>
          <p>UN LIEU</p><strong>PLUSIEURS<br />PREMIERS PLANS</strong>
        </div>
        <dl>
          <div><dt>Acteur</dt><dd>Personne ou groupe qui agit, décide ou utilise un lieu.</dd></div>
          <div><dt>Catégorie</dt><dd>Individuel ou collectif, public ou privé, social, économique ou politique.</dd></div>
          <div><dt>Point de vue</dt><dd>Ce que cet acteur met au premier plan dans cette situation.</dd></div>
        </dl>
      </aside>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="study state-shell"
      class:retry-mode={phase === 'retry'}
      data-smoke-state={phase === 'retry' ? 'retry' : 'active'}
      data-smoke-variation={current.id}
      aria-labelledby="study-title"
    >
      <header class="study-heading">
        <div>
          <p class="overline">Dossier {currentIndex + 1} · {current.theme}</p>
          <h1 id="study-title" tabindex="-1" data-focus-target>{current.chapter}</h1>
        </div>
        <div class="progress-dots" aria-label={`${currentIndex} dossier${currentIndex > 1 ? 's' : ''} déjà terminé${currentIndex > 1 ? 's' : ''}`}>
          {#each scenarios as scenario, index}
            <span class:done={index < currentIndex} class:current={index === currentIndex}>
              <span class="sr-only">Dossier {index + 1} {index < currentIndex ? 'terminé' : index === currentIndex ? 'en cours' : 'à venir'}</span>
            </span>
          {/each}
        </div>
      </header>

      {#if phase === 'retry'}
        <div class="scaffold" role="status">
          <div class="scaffold-title"><span aria-hidden="true">△</span><div><small>Mode indice</small><strong>Repars des actions, pas de ton opinion.</strong></div></div>
          <p>{current.scaffoldLead}</p>
          <ol>
            <li>La fiche nomme-t-elle <strong>une personne</strong> ou <strong>une organisation</strong>&nbsp;?</li>
            <li>Qui agit : une autorité, un groupe privé ou une personne en son nom&nbsp;?</li>
            <li>Quel besoin est révélé par les mots <strong>{current.roleVerbs.join(' · ')}</strong>&nbsp;?</li>
          </ol>
          <p class="previous-montage">
            <span>Dernier montage</span>
            {categoryFor(submittedCategory)?.axes} <b aria-hidden="true">→</b> {viewFor(submittedView)?.title}
          </p>
        </div>
      {/if}

      <div class="workbench">
        <article class="dossier-card" aria-labelledby="dossier-place">
          <div class="dossier-tabs"><span>Dossier local</span><span>{current.theme}</span></div>
          <div class="place-sketch" aria-hidden="true">
            <span class="sketch-road"></span>
            <span class="sketch-block block-a"></span>
            <span class="sketch-block block-b"></span>
            <span class="sketch-tree tree-a">✦</span>
            <span class="sketch-tree tree-b">✦</span>
            <strong>{current.place}</strong>
          </div>
          <div class="place-copy">
            <p class="card-label">Lieu proche</p>
            <h2 id="dossier-place">{current.place}</h2>
            <p>{current.placeDescription}</p>
          </div>
          <div class="far-link"><span aria-hidden="true">↗</span><p><small>Lien plus lointain</small>{current.farLink}</p></div>
          <div class="actor-file">
            <div class="actor-mark" aria-hidden="true">{current.actorMark}</div>
            <div><p class="card-label">Acteur du dossier</p><h3>{current.actor}</h3><p>{current.actorStatus}</p></div>
          </div>
          <blockquote>{current.roleQuote}</blockquote>
          <div class="verb-strip" aria-label="Mots d’action à observer">
            {#each current.roleVerbs as verb}<span>{verb}</span>{/each}
          </div>
        </article>

        <div class="assembly-panel">
          <div class="assembly-intro">
            <p class="card-label">Table de montage</p>
            <h2>{current.question}</h2>
            <p>Sélectionne une carte dans chaque zone. Observe la conséquence, puis envoie ton lien.</p>
          </div>

          <section class="choice-zone" aria-labelledby="category-title">
            <div class="zone-heading"><span>01</span><div><h3 id="category-title">Place le profil de l’acteur</h3><p>Qui est-il dans ce dossier&nbsp;?</p></div></div>
            <div class="category-grid" role="group" aria-labelledby="category-title">
              {#each categories as profile}
                <button
                  class="choice-card category-choice"
                  class:selected={selectedCategory === profile.id}
                  type="button"
                  aria-pressed={selectedCategory === profile.id}
                  aria-label={`${profile.title}, ${profile.axes}. ${profile.definition}`}
                  data-smoke-attempt={categoryAttempt(profile.id)}
                  data-smoke-step={categoryAttempt(profile.id) ? '1' : undefined}
                  onclick={() => chooseCategory(profile.id)}
                >
                  <span class="choice-symbol" aria-hidden="true">{profile.symbol}</span>
                  <span class="choice-copy"><strong>{profile.title}</strong><small>{profile.axes}</small><span>{profile.definition}</span></span>
                  <span class="choice-state">{selectedCategory === profile.id ? '✓ Choisi' : 'Choisir'}</span>
                </button>
              {/each}
            </div>
          </section>

          <section class="choice-zone" aria-labelledby="view-title">
            <div class="zone-heading"><span>02</span><div><h3 id="view-title">Oriente la lentille</h3><p>Que met ce rôle au premier plan ici&nbsp;?</p></div></div>
            <div class="view-grid" role="group" aria-labelledby="view-title">
              {#each current.views as view}
                <button
                  class="choice-card view-choice"
                  class:selected={selectedView === view.id}
                  type="button"
                  aria-pressed={selectedView === view.id}
                  aria-label={`${view.title}. ${view.detail}`}
                  data-smoke-attempt={viewAttempt(view.id)}
                  data-smoke-step={viewAttempt(view.id) ? '2' : undefined}
                  onclick={() => chooseView(view.id)}
                >
                  <span class="view-icon" aria-hidden="true"><i>{view.symbol}</i></span>
                  <span class="choice-copy"><strong>{view.title}</strong><span>{view.detail}</span></span>
                  <span class="choice-state">{selectedView === view.id ? '✓ Choisi' : 'Choisir'}</span>
                </button>
              {/each}
            </div>
          </section>

          <figure class="consequence-board" aria-labelledby="consequence-title">
            <figcaption id="consequence-title">
              <span>Conséquence de ta lentille</span>
              <strong>{selectedView ? 'Le premier plan a changé.' : 'Choisis un regard pour réorganiser le lieu.'}</strong>
            </figcaption>
            <div class="actor-badge" class:empty={!selectedCategory}>
              <span>{selectedCategory ? categoryFor(selectedCategory)?.symbol : '?'}</span>
              <p><small>Profil placé</small><strong>{selectedCategory ? categoryFor(selectedCategory)?.axes : 'Aucun profil choisi'}</strong></p>
            </div>
            <div class="view-stack">
              {#each current.views as view}
                <div class:foreground={selectedView === view.id}>
                  <span aria-hidden="true">{view.symbol}</span>
                  <p><strong>{view.title}</strong><small>{selectedView === view.id ? 'AU PREMIER PLAN' : 'en arrière-plan'}</small></p>
                </div>
              {/each}
            </div>
            <p class="consequence-note" aria-live="polite">
              {#if selectedCategory && selectedView}
                Ton montage relie <strong>{categoryFor(selectedCategory)?.axes}</strong> au regard
                <strong>« {viewFor(selectedView)?.title} »</strong>. Vérifie ce lien avec la fiche avant de l’envoyer.
              {:else if selectedCategory}
                Le profil est placé. Oriente maintenant la lentille vers un point de vue.
              {:else if selectedView}
                La lentille est orientée. Place maintenant le profil de l’acteur.
              {:else}
                Les deux pièces du lien sont encore ouvertes.
              {/if}
            </p>
          </figure>

          <div class="compact-proposals" aria-labelledby="compact-proposals-title">
            <p id="compact-proposals-title">
              <strong>Alternative compacte</strong>
              Si tu préfères, compare une relation complète puis dépose-la en une action.
            </p>
            <div>
              {#each compactProposalKinds() as kind, proposalIndex}
                <button
                  type="button"
                  data-smoke-answer={kind}
                  onclick={() => submitCompactProposal(kind)}
                >
                  <span>Proposition {proposalIndex === 0 ? 'A' : 'B'}</span>
                  {categoryFor(kind === 'correct' ? current.correctCategory : current.wrongCategory)?.axes}
                  → {viewFor(kind === 'correct' ? current.correctView : current.wrongView)?.title}
                </button>
              {/each}
            </div>
          </div>

          <div class="submit-row">
            <p><span aria-hidden="true">◆</span> Dans le montage en deux étapes, ce bouton envoie la relation choisie.</p>
            <button
              class="primary-action"
              type="button"
              data-smoke-action="submit"
              disabled={!canSubmit()}
              onclick={submitRelationship}
            >
              Relier ce regard <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  {:else if phase === 'incorrect'}
    <section
      class="feedback-page state-shell"
      data-smoke-state="incorrect"
      data-smoke-variation={current.id}
      aria-labelledby="incorrect-title"
    >
      <div class="feedback-index" aria-hidden="true"><span>△</span><small>à relier</small></div>
      <div class="feedback-content">
        <p class="overline">Dossier {currentIndex + 1} · montage envoyé</p>
        <h1 id="incorrect-title" tabindex="-1" data-focus-target>Le lien est à reconstruire.</h1>

        <div class="submitted-strip" aria-label="Réponse envoyée">
          <div><small>Catégorie envoyée</small><strong>{categoryFor(submittedCategory)?.axes}</strong></div>
          <span aria-hidden="true">→</span>
          <div><small>Premier plan envoyé</small><strong>{viewFor(submittedView)?.title}</strong></div>
        </div>

        <div
          class="feedback-message incorrect-message"
          role="alert"
          data-smoke-feedback="incorrect"
          data-smoke-feedback-detail
        >
          <span class="feedback-symbol" aria-hidden="true">△</span>
          <div><h2>Lien à reconstruire</h2><p>{incorrectExplanation()}</p></div>
        </div>

        <div class="evidence-reminder">
          <p class="card-label">Retour au dossier</p>
          <blockquote>{current.roleQuote}</blockquote>
          <p>Demande-toi : <strong>qui agit</strong>, puis <strong>quel besoin vient de ce rôle</strong>.</p>
        </div>

        <button class="primary-action retry-action" type="button" data-smoke-action="retry" onclick={retryRelationship}>
          Reprendre le montage <span aria-hidden="true">↺</span>
        </button>
      </div>
    </section>
  {:else if phase === 'correct'}
    <div class="result-flow state-shell">
      <section
        class="feedback-page correct-page"
        data-smoke-state="correct"
        data-smoke-variation={current.id}
        aria-labelledby="correct-title"
      >
        <div class="feedback-index success" aria-hidden="true"><span>✓</span><small>relié</small></div>
        <div class="feedback-content">
          <p class="overline">Dossier {currentIndex + 1} · relation observée</p>
          <h1 id="correct-title" tabindex="-1" data-focus-target>Ce montage suit le rôle.</h1>

          <div class="submitted-strip coherent" aria-label="Relation construite">
            <div><small>Catégorie</small><strong>{categoryFor(submittedCategory)?.axes}</strong></div>
            <span aria-hidden="true">→</span>
            <div><small>Point de vue situé</small><strong>{viewFor(submittedView)?.title}</strong></div>
          </div>

          <div
            class="feedback-message correct-message"
            role="status"
            data-smoke-feedback="correct"
            data-smoke-feedback-detail
          >
            <span class="feedback-symbol" aria-hidden="true">✓</span>
            <div><h2>Relation cohérente</h2><p>{current.correctExplanation}</p></div>
          </div>

          <div class="guard-card">
            <span aria-hidden="true">≠</span>
            <p><strong>La catégorie ne fabrique pas l’opinion.</strong> C’est le rôle décrit dans ce dossier qui soutient ce premier plan. Un autre acteur pourrait représenter ce lieu autrement.</p>
          </div>
        </div>
      </section>

      <section
        class="continuation-card"
        data-smoke-state="continuation"
        data-smoke-variation={current.id}
        aria-label="Continuer après l’explication"
      >
        <div>
          <small>{currentIndex === scenarios.length - 1 ? 'Les trois relations sont construites' : 'Changer de rôle, changer de regard'}</small>
          <p>{currentIndex === scenarios.length - 1 ? 'Passe au repère final quand tu as lu pourquoi ce lien tient.' : 'Le prochain dossier change la catégorie de l’acteur et son rapport au lieu.'}</p>
        </div>
        <button class="primary-action" type="button" data-smoke-action="continue" onclick={continueStudy}>
          {currentIndex === scenarios.length - 1 ? 'Voir le repère final' : 'Ouvrir le dossier suivant'}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </div>
  {:else if phase === 'complete'}
    <section class="completion state-shell" data-smoke-state="complete" aria-labelledby="completion-title">
      <div class="completion-mark" aria-hidden="true"><span>✓</span><i></i><i></i></div>
      <p class="overline">Cabinet refermé · trois dossiers parcourus</p>
      <h1 id="completion-title" tabindex="-1" data-focus-target>Un lieu n’a pas un seul premier plan.</h1>
      <p class="completion-lead">
        Dans chaque dossier, tu as relié une <strong>catégorie</strong>, un <strong>rôle décrit</strong> et un
        <strong>point de vue situé</strong>. Ce parcours terminé ne mesure pas une maîtrise : il donne un repère à réutiliser.
      </p>

      <div class="completion-summary" data-smoke-completion>
        <p class="card-label">Repère à emporter</p>
        <ol>
          <li><span>1</span><p><strong>Identifier l’acteur</strong><small>Une personne ou un groupe ? Public ou privé ? Quel rôle ?</small></p></li>
          <li><span>2</span><p><strong>Lire ses actions</strong><small>Quels mots montrent ce qu’il fait dans ce lieu ?</small></p></li>
          <li><span>3</span><p><strong>Relier le regard</strong><small>Quel premier plan est soutenu par ces actions, dans ce dossier ?</small></p></li>
        </ol>
      </div>

      <blockquote class="final-quote">« Une catégorie situe l’acteur. Son rôle aide à expliquer son regard — sans décider de son opinion à sa place. »</blockquote>
      <button class="secondary-action" type="button" onclick={restartStudy}>Reprendre les trois dossiers <span aria-hidden="true">↺</span></button>
      <p class="privacy-note">Aucun résultat n’est enregistré ni envoyé.</p>
    </section>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
</main>
</div>

<style>
  .legacy-smoke-root {
    display: contents;
  }

  .observatory,
  .observatory * {
    box-sizing: border-box;
  }

  .observatory {
    --ink: #18202f;
    --muted: #667080;
    --paper: #fffaf0;
    --paper-deep: #f3ead9;
    --blue: #243f91;
    --blue-dark: #172a6b;
    --blue-soft: #dce5ff;
    --coral: #e55d46;
    --coral-soft: #ffe1d7;
    --yellow: #f2c84b;
    --green: #176a5b;
    --green-soft: #d8eee6;
    --line: #cbc3b4;
    position: relative;
    width: 100%;
    min-height: calc(100vh - 42px);
    overflow-x: hidden;
    color: var(--ink);
    background:
      linear-gradient(90deg, rgba(36, 63, 145, 0.035) 1px, transparent 1px),
      linear-gradient(rgba(36, 63, 145, 0.035) 1px, transparent 1px),
      var(--paper-deep);
    background-size: 28px 28px;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    overflow-wrap: anywhere;
  }

  .paper-noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 8% 12%, rgba(229, 93, 70, 0.1), transparent 23%), radial-gradient(circle at 93% 83%, rgba(36, 63, 145, 0.1), transparent 27%);
  }

  button {
    font: inherit;
  }

  button:focus-visible,
  [tabindex="-1"]:focus-visible {
    outline: 4px solid var(--yellow);
    outline-offset: 4px;
  }

  [tabindex="-1"]:focus {
    border-radius: 4px;
  }

  .cabinet-bar {
    position: relative;
    z-index: 2;
    display: grid;
    min-height: 68px;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 16px;
    padding: 10px clamp(16px, 4vw, 54px);
    border-bottom: 1px solid rgba(24, 32, 47, 0.2);
    background: rgba(255, 250, 240, 0.92);
  }

  .cabinet-bar > p {
    margin: 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-align: center;
    text-transform: uppercase;
  }

  .cabinet-brand {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 10px;
  }

  .cabinet-brand > span:last-child {
    display: grid;
    line-height: 1;
  }

  .cabinet-brand strong {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.05rem;
  }

  .cabinet-brand small {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .brand-lens {
    position: relative;
    display: grid;
    width: 39px;
    height: 39px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--yellow);
  }

  .brand-lens::after {
    position: absolute;
    right: -9px;
    bottom: -5px;
    width: 15px;
    height: 5px;
    border: 2px solid var(--ink);
    border-radius: 99px;
    background: var(--coral);
    content: "";
    transform: rotate(45deg);
  }

  .brand-lens i {
    width: 15px;
    height: 7px;
    border: 2px solid var(--ink);
    border-radius: 50%;
  }

  .case-code,
  .case-count {
    justify-self: end;
  }

  .case-code {
    color: var(--blue);
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.06em;
  }

  .case-count {
    display: flex;
    align-items: baseline;
    gap: 5px;
    font-family: ui-monospace, monospace;
  }

  .case-count span {
    color: var(--blue);
    font-size: 1.15rem;
    font-weight: 900;
  }

  .case-count small {
    color: var(--muted);
    font-size: 0.62rem;
  }

  .case-count.finished {
    align-items: center;
  }

  .case-count.finished span {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--green);
  }

  .state-shell {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: clamp(36px, 6vw, 78px) 0 72px;
  }

  .overline,
  .card-label {
    margin: 0;
    color: var(--blue);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .intro {
    display: grid;
    min-height: calc(100vh - 110px);
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.72fr);
    align-items: center;
    gap: clamp(40px, 7vw, 96px);
  }

  .intro h1,
  .study-heading h1,
  .feedback-content > h1,
  .completion > h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 0.98;
  }

  .intro h1 {
    margin: 17px 0 24px;
    font-size: clamp(3.5rem, 7.4vw, 7.1rem);
  }

  .intro h1 em {
    position: relative;
    color: var(--blue);
    font-weight: 500;
  }

  .intro h1 em::after {
    position: absolute;
    right: -5px;
    bottom: 4px;
    left: -3px;
    height: 12px;
    background: var(--yellow);
    content: "";
    opacity: 0.75;
    transform: rotate(-2deg);
    z-index: -1;
  }

  .intro-lead {
    max-width: 670px;
    margin: 0;
    color: #4c5665;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.7;
  }

  .intro-steps {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 30px;
  }

  .intro-steps > div {
    display: grid;
    min-width: 0;
    grid-template-columns: 34px 1fr;
    gap: 11px;
    padding: 15px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: rgba(255, 250, 240, 0.78);
  }

  .intro-steps span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue);
    font-family: ui-monospace, monospace;
    font-weight: 900;
  }

  .intro-steps p,
  .intro-warning p {
    margin: 0;
    font-size: 0.83rem;
    line-height: 1.5;
  }

  .intro-warning,
  .guard-card {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 12px;
    align-items: start;
    margin-top: 12px;
    padding: 14px;
    border-left: 4px solid var(--coral);
    background: var(--coral-soft);
  }

  .intro-warning > span,
  .guard-card > span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-weight: 900;
  }

  .primary-action,
  .secondary-action {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 12px 19px;
    border-radius: 9px;
    font-weight: 850;
    cursor: pointer;
  }

  .primary-action {
    border: 2px solid var(--blue-dark);
    color: white;
    background: var(--blue);
    box-shadow: 5px 5px 0 var(--blue-dark);
    transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
  }

  .primary-action:hover:not(:disabled) {
    background: #3152b4;
    transform: translate(-1px, -2px);
    box-shadow: 7px 7px 0 var(--blue-dark);
  }

  .primary-action:active:not(:disabled) {
    transform: translate(4px, 4px);
    box-shadow: 1px 1px 0 var(--blue-dark);
  }

  .primary-action:disabled {
    border-color: #777e88;
    color: #575e68;
    background: #c5c5c0;
    box-shadow: 3px 3px 0 #858782;
    cursor: not-allowed;
  }

  .intro-copy > .primary-action {
    margin-top: 26px;
  }

  .duration,
  .privacy-note {
    margin: 13px 0 0;
    color: var(--muted);
    font-size: 0.72rem;
  }

  .intro-glossary {
    overflow: hidden;
    border: 1px solid var(--ink);
    border-radius: 18px;
    background: var(--paper);
    box-shadow: 14px 15px 0 rgba(24, 32, 47, 0.12);
    transform: rotate(1deg);
  }

  .lens-poster {
    position: relative;
    display: flex;
    min-height: 290px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid var(--ink);
    color: white;
    background: var(--blue);
    text-align: center;
  }

  .lens-poster p {
    z-index: 2;
    margin: 18px 0 5px;
    color: var(--yellow);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.2em;
  }

  .lens-poster strong {
    z-index: 2;
    font-family: Georgia, serif;
    font-size: 1.65rem;
    line-height: 1.08;
  }

  .poster-eye {
    position: relative;
    z-index: 2;
    display: grid;
    width: 118px;
    height: 78px;
    place-items: center;
    border: 3px solid white;
    border-radius: 70% 30% 70% 30%;
    background: var(--yellow);
    transform: rotate(45deg);
  }

  .poster-eye i {
    display: block;
    width: 42px;
    height: 42px;
    border: 8px solid white;
    border-radius: 50%;
    background: var(--ink);
  }

  .orbit {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
  }

  .orbit-one { width: 330px; height: 160px; transform: rotate(26deg); }
  .orbit-two { width: 180px; height: 340px; transform: rotate(-35deg); }

  .intro-glossary dl {
    margin: 0;
    padding: 7px 20px 16px;
  }

  .intro-glossary dl > div {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 12px;
    padding: 13px 0;
    border-bottom: 1px solid var(--line);
  }

  .intro-glossary dl > div:last-child { border-bottom: 0; }
  .intro-glossary dt { color: var(--blue); font-size: 0.74rem; font-weight: 900; }
  .intro-glossary dd { margin: 0; color: var(--muted); font-size: 0.75rem; line-height: 1.45; }

  .study-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 28px;
    margin-bottom: 28px;
  }

  .study-heading h1 {
    margin: 9px 0 0;
    font-size: clamp(2.5rem, 5vw, 4.8rem);
  }

  .progress-dots {
    display: flex;
    flex: none;
    gap: 7px;
    padding-bottom: 8px;
  }

  .progress-dots > span {
    display: block;
    width: 36px;
    height: 9px;
    border: 1px solid #7f8390;
    border-radius: 99px;
    background: transparent;
  }

  .progress-dots > span.done {
    border-color: var(--green);
    background: repeating-linear-gradient(45deg, var(--green), var(--green) 4px, white 4px, white 6px);
  }

  .progress-dots > span.current {
    border-color: var(--blue);
    background: var(--blue);
    box-shadow: inset 0 0 0 2px white;
  }

  .scaffold {
    margin-bottom: 20px;
    padding: 19px;
    border: 2px dashed var(--coral);
    border-radius: 14px;
    background: #fff4de;
  }

  .scaffold-title {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .scaffold-title > span {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--coral);
    font-weight: 900;
  }

  .scaffold-title div { display: grid; }
  .scaffold-title small { color: var(--coral); font-size: 0.65rem; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
  .scaffold-title strong { margin-top: 2px; }
  .scaffold > p { margin: 13px 0 0; color: #4f5661; line-height: 1.55; }
  .scaffold ol { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 15px 0 0; padding: 0; list-style: none; counter-reset: scaffold; }
  .scaffold li { min-width: 0; padding: 12px; border: 1px solid #e4bda5; border-radius: 9px; background: var(--paper); font-size: 0.77rem; line-height: 1.45; counter-increment: scaffold; }
  .scaffold li::before { display: block; margin-bottom: 6px; color: var(--coral); font-family: ui-monospace, monospace; font-weight: 900; content: "0" counter(scaffold); }
  .scaffold .previous-montage { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; padding-top: 13px; border-top: 1px solid #e4bda5; font-size: 0.75rem; }
  .previous-montage span { color: var(--coral); font-weight: 900; text-transform: uppercase; }

  .workbench {
    display: grid;
    grid-template-columns: minmax(250px, 0.67fr) minmax(0, 1.33fr);
    align-items: start;
    gap: 18px;
  }

  .dossier-card,
  .assembly-panel {
    min-width: 0;
    border: 1px solid var(--ink);
    background: var(--paper);
  }

  .dossier-card {
    overflow: hidden;
    border-radius: 4px 18px 18px 4px;
    box-shadow: 8px 9px 0 rgba(24, 32, 47, 0.11);
  }

  .dossier-tabs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 11px 14px;
    color: white;
    background: var(--blue);
    font-size: 0.61rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .place-sketch {
    position: relative;
    height: 170px;
    overflow: hidden;
    border-bottom: 1px solid var(--line);
    background:
      linear-gradient(28deg, transparent 43%, rgba(36, 63, 145, 0.15) 44% 46%, transparent 47%),
      #dce9df;
  }

  .place-sketch strong {
    position: absolute;
    right: 13px;
    bottom: 12px;
    max-width: calc(100% - 26px);
    padding: 6px 8px;
    border: 1px solid var(--ink);
    background: var(--paper);
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    text-align: right;
  }

  .sketch-road {
    position: absolute;
    top: 70px;
    left: -10%;
    width: 120%;
    height: 34px;
    border-block: 2px solid var(--ink);
    background: repeating-linear-gradient(90deg, transparent 0 28px, rgba(24, 32, 47, 0.45) 28px 38px);
    transform: rotate(-8deg);
  }

  .sketch-block {
    position: absolute;
    border: 2px solid var(--ink);
    background: var(--coral-soft);
  }

  .block-a { top: 17px; left: 18px; width: 74px; height: 47px; transform: rotate(-3deg); }
  .block-b { right: 20px; bottom: 17px; width: 90px; height: 51px; transform: rotate(4deg); }
  .sketch-tree { position: absolute; color: var(--green); font-size: 2rem; }
  .tree-a { right: 28%; top: 19px; }
  .tree-b { left: 31%; bottom: 7px; }

  .place-copy,
  .actor-file,
  .dossier-card blockquote,
  .verb-strip {
    margin-inline: 18px;
  }

  .place-copy { padding: 20px 0 16px; }
  .place-copy h2 { margin: 5px 0 9px; font-family: Georgia, serif; font-size: 1.7rem; font-weight: 500; }
  .place-copy > p:last-child { margin: 0; color: var(--muted); font-size: 0.8rem; line-height: 1.55; }

  .far-link {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 9px;
    align-items: start;
    padding: 13px 18px;
    border-block: 1px solid #c9ae96;
    background: #ffedd9;
  }

  .far-link > span {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--coral);
  }

  .far-link p { margin: 0; font-size: 0.75rem; line-height: 1.45; }
  .far-link small { display: block; margin-bottom: 2px; color: #9d442f; font-weight: 900; text-transform: uppercase; }

  .actor-file {
    display: grid;
    grid-template-columns: 52px 1fr;
    gap: 11px;
    align-items: center;
    padding: 19px 0 12px;
  }

  .actor-mark {
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--yellow);
    font-family: Georgia, serif;
    font-weight: 900;
  }

  .actor-file h3 { margin: 3px 0 3px; font-family: Georgia, serif; font-size: 1.1rem; }
  .actor-file div > p:last-child { margin: 0; color: var(--muted); font-size: 0.7rem; line-height: 1.4; }

  .dossier-card blockquote {
    margin-top: 0;
    margin-bottom: 13px;
    padding: 14px;
    border-left: 4px solid var(--blue);
    background: var(--blue-soft);
    font-family: Georgia, serif;
    font-size: 0.94rem;
    line-height: 1.55;
  }

  .verb-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 0 0 20px;
  }

  .verb-strip span {
    padding: 5px 7px;
    border: 1px dashed var(--blue);
    border-radius: 5px;
    color: var(--blue-dark);
    font-size: 0.65rem;
    font-weight: 850;
  }

  .assembly-panel {
    padding: clamp(18px, 3vw, 31px);
    border-radius: 18px 4px 4px 18px;
  }

  .assembly-intro {
    padding-bottom: 21px;
    border-bottom: 1px solid var(--line);
  }

  .assembly-intro h2 {
    max-width: 740px;
    margin: 7px 0 8px;
    font-family: Georgia, serif;
    font-size: clamp(1.45rem, 2.6vw, 2.25rem);
    font-weight: 500;
    line-height: 1.14;
  }

  .assembly-intro > p:last-child {
    margin: 0;
    color: var(--muted);
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .choice-zone {
    padding: 23px 0;
    border-bottom: 1px solid var(--line);
  }

  .zone-heading {
    display: flex;
    align-items: start;
    gap: 11px;
    margin-bottom: 13px;
  }

  .zone-heading > span {
    flex: none;
    color: var(--coral);
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 900;
  }

  .zone-heading h3 { margin: 0; font-size: 0.92rem; }
  .zone-heading p { margin: 2px 0 0; color: var(--muted); font-size: 0.72rem; }

  .category-grid,
  .view-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .choice-card {
    position: relative;
    display: flex;
    min-width: 0;
    min-height: 154px;
    flex-direction: column;
    align-items: stretch;
    gap: 9px;
    padding: 12px;
    border: 2px solid #aaa797;
    border-radius: 11px;
    color: var(--ink);
    background: #faf6ea;
    text-align: left;
    cursor: pointer;
    transition: border-color 130ms ease, transform 130ms ease, box-shadow 130ms ease, background 130ms ease;
  }

  .choice-card:hover {
    border-color: var(--blue);
    transform: translateY(-2px);
  }

  .choice-card.selected {
    border-color: var(--blue-dark);
    background: #edf1ff;
    box-shadow: 4px 4px 0 var(--blue-dark);
    transform: translate(-2px, -2px);
  }

  .choice-symbol {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    background: var(--yellow);
    font-family: ui-monospace, monospace;
    font-weight: 900;
  }

  .choice-copy {
    display: grid;
    min-width: 0;
    gap: 3px;
  }

  .choice-copy strong { font-size: 0.8rem; line-height: 1.25; }
  .choice-copy small { color: var(--blue); font-size: 0.62rem; font-weight: 900; line-height: 1.35; text-transform: uppercase; }
  .choice-copy > span { color: var(--muted); font-size: 0.68rem; line-height: 1.4; }

  .choice-state {
    margin-top: auto;
    color: #69717e;
    font-size: 0.61rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .selected .choice-state {
    color: var(--blue-dark);
  }

  .view-icon {
    position: relative;
    display: grid;
    width: 47px;
    height: 32px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 70% 30% 70% 30%;
    background: var(--coral-soft);
    transform: rotate(45deg);
  }

  .view-icon i {
    display: grid;
    width: 23px;
    height: 23px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    background: var(--paper);
    font-size: 0.7rem;
    font-style: normal;
    transform: rotate(-45deg);
  }

  .consequence-board {
    display: grid;
    grid-template-columns: minmax(130px, 0.48fr) minmax(0, 1fr);
    gap: 10px;
    margin: 23px 0 0;
    padding: 15px;
    border: 2px solid var(--ink);
    border-radius: 12px;
    background: #e7e0d1;
    box-shadow: inset 0 0 0 4px #f7f1e6;
  }

  .consequence-board figcaption {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5px 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #a7a194;
  }

  .consequence-board figcaption span { color: var(--blue); font-size: 0.63rem; font-weight: 900; letter-spacing: 0.09em; text-transform: uppercase; }
  .consequence-board figcaption strong { font-size: 0.71rem; }

  .actor-badge {
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 13px;
    border: 1px solid var(--ink);
    border-radius: 8px;
    background: var(--yellow);
    text-align: center;
  }

  .actor-badge.empty { background: #d5d2c8; }
  .actor-badge > span { display: grid; width: 38px; height: 38px; place-items: center; border: 2px solid var(--ink); border-radius: 50%; background: var(--paper); font-weight: 900; }
  .actor-badge p { margin: 9px 0 0; }
  .actor-badge small { display: block; color: #5f5a4f; font-size: 0.58rem; font-weight: 900; text-transform: uppercase; }
  .actor-badge strong { display: block; margin-top: 3px; font-size: 0.67rem; line-height: 1.35; }

  .view-stack {
    display: grid;
    min-width: 0;
    gap: 5px;
  }

  .view-stack > div {
    display: grid;
    min-width: 0;
    grid-template-columns: 31px 1fr;
    gap: 8px;
    align-items: center;
    padding: 8px;
    border: 1px solid #9f9b90;
    border-left: 5px solid #9f9b90;
    background: rgba(255, 250, 240, 0.58);
    opacity: 0.72;
    transition: transform 160ms ease, opacity 160ms ease, background 160ms ease;
  }

  .view-stack > div.foreground {
    border-color: var(--blue-dark);
    border-left-color: var(--coral);
    background: var(--paper);
    box-shadow: 3px 3px 0 var(--blue-dark);
    opacity: 1;
    transform: translateX(-3px);
  }

  .view-stack > div > span { display: grid; width: 29px; height: 29px; place-items: center; border-radius: 50%; color: white; background: var(--blue); font-size: 0.7rem; }
  .view-stack p { min-width: 0; margin: 0; }
  .view-stack strong { display: block; font-size: 0.67rem; line-height: 1.3; }
  .view-stack small { display: block; margin-top: 2px; color: var(--muted); font-size: 0.54rem; font-weight: 900; letter-spacing: 0.07em; text-transform: uppercase; }
  .view-stack .foreground small { color: var(--coral); }

  .consequence-note {
    grid-column: 1 / -1;
    margin: 0;
    padding-top: 9px;
    border-top: 1px solid #a7a194;
    color: #515763;
    font-size: 0.72rem;
    line-height: 1.5;
  }

  .submit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-top: 21px;
  }

  .submit-row p {
    max-width: 360px;
    margin: 0;
    color: var(--muted);
    font-size: 0.7rem;
    line-height: 1.45;
  }

  .submit-row p span { color: var(--coral); }
  .submit-row .primary-action { flex: none; }

  .feedback-page {
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr);
    gap: clamp(18px, 4vw, 50px);
    align-items: stretch;
  }

  .feedback-index {
    display: flex;
    min-height: 540px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: var(--coral);
  }

  .feedback-index > span {
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border: 2px dashed currentColor;
    border-radius: 50%;
    font-size: 1.6rem;
    font-weight: 900;
  }

  .feedback-index::after {
    width: 1px;
    flex: 1;
    background: var(--line);
    content: "";
  }

  .feedback-index small {
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
  }

  .feedback-index.success { color: var(--green); }
  .feedback-index.success > span { border-style: solid; color: white; background: var(--green); }

  .feedback-content {
    min-width: 0;
    padding: clamp(24px, 5vw, 54px);
    border: 1px solid var(--ink);
    border-radius: 18px 4px 18px 4px;
    background: var(--paper);
    box-shadow: 10px 11px 0 rgba(24, 32, 47, 0.1);
  }

  .feedback-content > h1 {
    margin: 9px 0 25px;
    font-size: clamp(2.5rem, 5.5vw, 5rem);
  }

  .submitted-strip {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 12px;
    align-items: center;
    padding: 14px;
    border: 1px dashed var(--coral);
    background: #fff3e6;
  }

  .submitted-strip.coherent {
    border: 1px solid var(--green);
    background: var(--green-soft);
  }

  .submitted-strip div { min-width: 0; }
  .submitted-strip small { display: block; color: var(--muted); font-size: 0.59rem; font-weight: 900; letter-spacing: 0.07em; text-transform: uppercase; }
  .submitted-strip strong { display: block; margin-top: 4px; font-size: 0.78rem; line-height: 1.35; }
  .submitted-strip > span { color: var(--blue); font-size: 1.25rem; font-weight: 900; }

  .feedback-message {
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 13px;
    margin-top: 14px;
    padding: 18px;
    border-left: 6px solid;
  }

  .incorrect-message { border-color: var(--coral); background: var(--coral-soft); }
  .correct-message { border-color: var(--green); background: var(--green-soft); }

  .feedback-symbol {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border: 2px solid currentColor;
    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: 900;
  }

  .incorrect-message .feedback-symbol { color: #a43b2a; border-style: dashed; }
  .correct-message .feedback-symbol { color: var(--green); }
  .feedback-message h2 { margin: 1px 0 6px; font-size: 1rem; }
  .feedback-message p { margin: 0; color: #414955; font-size: 0.85rem; line-height: 1.65; }

  .evidence-reminder {
    margin-top: 14px;
    padding: 17px;
    border: 1px solid var(--line);
    background: #f7f0e3;
  }

  .evidence-reminder blockquote { margin: 8px 0; font-family: Georgia, serif; font-size: 1rem; line-height: 1.55; }
  .evidence-reminder > p:last-child { margin: 0; color: var(--muted); font-size: 0.75rem; }
  .retry-action { margin-top: 22px; }

  .result-flow {
    padding-bottom: 80px;
  }

  .result-flow .feedback-page {
    padding: 0;
  }

  .guard-card {
    margin-top: 14px;
  }

  .guard-card p {
    margin: 0;
    color: #4e4a45;
    font-size: 0.78rem;
    line-height: 1.55;
  }

  .continuation-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin: 18px 0 0 140px;
    padding: 18px 20px;
    border: 2px solid var(--blue);
    border-radius: 4px 13px 13px 4px;
    background: var(--blue-soft);
  }

  .continuation-card div { min-width: 0; }
  .continuation-card small { color: var(--blue); font-size: 0.63rem; font-weight: 900; letter-spacing: 0.09em; text-transform: uppercase; }
  .continuation-card p { margin: 5px 0 0; color: #46506a; font-size: 0.78rem; line-height: 1.45; }
  .continuation-card .primary-action { flex: none; }

  .completion {
    max-width: 900px;
    text-align: center;
  }

  .completion-mark {
    position: relative;
    display: grid;
    width: 106px;
    height: 76px;
    margin: 0 auto 24px;
    place-items: center;
    border: 3px solid var(--ink);
    border-radius: 70% 30% 70% 30%;
    background: var(--yellow);
    transform: rotate(45deg);
  }

  .completion-mark span {
    display: grid;
    width: 45px;
    height: 45px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--green);
    font-size: 1.4rem;
    font-weight: 900;
    transform: rotate(-45deg);
  }

  .completion-mark i {
    position: absolute;
    border: 1px solid var(--blue);
    border-radius: 50%;
  }

  .completion-mark i:first-of-type { width: 150px; height: 90px; }
  .completion-mark i:last-of-type { width: 76px; height: 145px; }

  .completion > h1 {
    margin: 11px auto 20px;
    font-size: clamp(2.8rem, 6vw, 5.7rem);
  }

  .completion-lead {
    max-width: 720px;
    margin: 0 auto;
    color: #505968;
    font-size: 1rem;
    line-height: 1.7;
  }

  .completion-summary {
    margin-top: 28px;
    padding: 24px;
    border: 2px solid var(--ink);
    border-radius: 13px;
    background: var(--paper);
    box-shadow: 8px 8px 0 rgba(24, 32, 47, 0.12);
    text-align: left;
  }

  .completion-summary ol {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
  }

  .completion-summary li {
    display: grid;
    min-width: 0;
    grid-template-columns: 35px 1fr;
    gap: 9px;
    padding: 12px;
    border: 1px solid var(--line);
    background: #f7f0e3;
  }

  .completion-summary li > span {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue);
    font-weight: 900;
  }

  .completion-summary p { margin: 0; }
  .completion-summary strong { display: block; font-size: 0.78rem; }
  .completion-summary small { display: block; margin-top: 4px; color: var(--muted); font-size: 0.68rem; line-height: 1.4; }

  .final-quote {
    margin: 24px 0 0;
    padding: 19px;
    border-left: 5px solid var(--coral);
    background: var(--coral-soft);
    font-family: Georgia, serif;
    font-size: 1.08rem;
    line-height: 1.55;
    text-align: left;
  }

  .secondary-action {
    margin-top: 22px;
    border: 2px solid var(--ink);
    color: var(--ink);
    background: var(--paper);
  }

  .secondary-action:hover {
    background: var(--yellow);
  }

  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    white-space: nowrap !important;
  }

  @media (max-width: 900px) {
    .intro { grid-template-columns: 1fr; }
    .intro-glossary { width: min(570px, 100%); transform: none; }
    .lens-poster { min-height: 230px; }
    .workbench { grid-template-columns: 1fr; }
    .dossier-card { border-radius: 13px; }
    .assembly-panel { border-radius: 13px; }
    .place-sketch { height: 150px; }
    .scaffold ol { grid-template-columns: 1fr; }
  }

  .compact-proposals {
    margin: 18px 0;
    padding: 14px;
    border: 1px dashed var(--blue-dark);
    border-radius: 10px;
    background: #f3f5ff;
  }

  .compact-proposals > p {
    margin: 0 0 10px;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .compact-proposals > p strong {
    display: block;
    color: var(--ink);
  }

  .compact-proposals > div {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .compact-proposals button {
    min-height: 60px;
    padding: 10px 12px;
    border: 1px solid var(--blue-dark);
    border-radius: 8px;
    color: var(--ink);
    background: white;
    font: inherit;
    font-size: 0.8rem;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }

  .compact-proposals button span {
    display: block;
    margin-bottom: 3px;
    color: var(--blue-dark);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    .cabinet-bar { grid-template-columns: 1fr auto; }
    .compact-proposals > div { grid-template-columns: 1fr; }
    .cabinet-bar > p { display: none; }
    .intro-steps { grid-template-columns: 1fr; }
    .category-grid,
    .view-grid { grid-template-columns: 1fr; }
    .choice-card { min-height: 116px; }
    .consequence-board { grid-template-columns: 1fr; }
    .consequence-board figcaption,
    .consequence-note { grid-column: 1; }
    .actor-badge { min-height: 116px; }
    .submit-row { align-items: stretch; flex-direction: column; }
    .submit-row .primary-action { width: 100%; }
    .feedback-page { grid-template-columns: 1fr; }
    .feedback-index { display: none; }
    .continuation-card { margin-left: 0; }
    .completion-summary ol { grid-template-columns: 1fr; }
  }

  @media (max-width: 470px) {
    .cabinet-bar { min-height: 62px; padding: 9px 12px; }
    .cabinet-brand small { display: none; }
    .brand-lens { width: 34px; height: 34px; }
    .case-count small { display: none; }
    .state-shell { width: 100%; padding: 30px 12px 54px; }
    .intro { min-height: 0; padding-top: 36px; }
    .intro h1 { font-size: clamp(2.65rem, 15vw, 3.5rem); }
    .intro-lead { font-size: 0.96rem; }
    .intro-warning,
    .guard-card { grid-template-columns: 32px 1fr; padding: 12px; }
    .intro-warning > span,
    .guard-card > span { width: 30px; height: 30px; }
    .intro-copy > .primary-action { width: 100%; }
    .intro-glossary dl { padding-inline: 14px; }
    .intro-glossary dl > div { grid-template-columns: 1fr; gap: 4px; }
    .study-heading { align-items: start; flex-direction: column; gap: 14px; }
    .study-heading h1 { font-size: 2.65rem; }
    .progress-dots { padding: 0; }
    .dossier-tabs { align-items: start; flex-direction: column; }
    .assembly-panel { padding: 14px; }
    .choice-card { padding: 12px; }
    .consequence-board { margin-inline: 0; padding: 11px; }
    .view-stack > div.foreground { transform: none; }
    .feedback-content { padding: 20px 14px; }
    .feedback-content > h1 { font-size: 2.65rem; }
    .submitted-strip { grid-template-columns: 1fr; }
    .submitted-strip > span { transform: rotate(90deg); }
    .feedback-message { grid-template-columns: 38px 1fr; padding: 14px 11px; }
    .feedback-symbol { width: 36px; height: 36px; }
    .retry-action { width: 100%; }
    .continuation-card { align-items: stretch; flex-direction: column; padding: 15px; }
    .continuation-card .primary-action { width: 100%; }
    .completion > h1 { font-size: 2.7rem; }
    .completion-summary { padding: 15px; }
    .completion-mark { margin-top: 16px; transform: rotate(45deg) scale(0.86); }
    .secondary-action { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .observatory *,
    .observatory *::before,
    .observatory *::after {
      scroll-behavior: auto !important;
      transition: none !important;
    }

    .intro-glossary,
    .choice-card,
    .choice-card:hover,
    .choice-card.selected,
    .view-stack > div.foreground {
      transform: none;
    }
  }
</style>
