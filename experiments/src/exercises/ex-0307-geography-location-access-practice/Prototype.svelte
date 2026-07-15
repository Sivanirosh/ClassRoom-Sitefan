<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type CategoryId = 'site' | 'situation' | 'limites' | 'acces';

  type Category = {
    id: CategoryId;
    label: string;
    question: string;
    definition: string;
  };

  type EvidenceCard = {
    id: string;
    text: string;
    correctCategory: CategoryId;
    plannedWrongCategory: CategoryId;
    reason: string;
  };

  type Dossier = {
    id: string;
    number: string;
    title: string;
    theme: string;
    placeType: string;
    mapWords: [string, string, string];
    mapLabel: string;
    vocabulary?: string;
    cards: EvidenceCard[];
    correctFeedback: string;
    whyHere: string;
  };

  const categories: Category[] = [
    {
      id: 'site',
      label: 'Site',
      question: 'Comment est le terrain ici ?',
      definition: 'le terrain du lieu lui-même : sol, pente, eau ou exposition'
    },
    {
      id: 'situation',
      label: 'Situation',
      question: 'Où est le lieu par rapport aux autres ?',
      definition: 'la position du lieu par rapport aux voisins et aux réseaux'
    },
    {
      id: 'limites',
      label: 'Limites',
      question: 'Où le lieu s’arrête-t-il ?',
      definition: 'les bords naturels ou construits qui délimitent le lieu'
    },
    {
      id: 'acces',
      label: 'Accès',
      question: 'Par où et comment y arrive-t-on ?',
      definition: 'les entrées et les chemins utilisés pour rejoindre le lieu'
    }
  ];

  const dossiers: Dossier[] = [
    {
      id: 'jardin-terrasse',
      number: '01',
      title: 'Le jardin de la Terrasse',
      theme: 'garden',
      placeType: 'Un jardin partagé dans un quartier d’habitation',
      mapWords: ['immeubles', 'jardin', 'place'],
      mapLabel:
        'Schéma du jardin entre les immeubles et la place, bordé d’une haie et rejoint par un chemin.',
      cards: [
        {
          id: 'jardin-situation',
          text: 'Le jardin est entre les immeubles des Tilleuls et la petite place du quartier.',
          correctCategory: 'situation',
          plannedWrongCategory: 'limites',
          reason:
            'La phrase relie le jardin à deux lieux voisins ; elle ne dit pas où son terrain s’arrête.'
        },
        {
          id: 'jardin-acces',
          text: 'On y entre par un portail relié au chemin piéton.',
          correctCategory: 'acces',
          plannedWrongCategory: 'site',
          reason:
            'Les mots « entre » et « chemin » expliquent le trajet pour arriver, pas la forme du terrain.'
        },
        {
          id: 'jardin-site',
          text: 'Le terrain forme une terrasse plate, avec une terre bien exposée au soleil.',
          correctCategory: 'site',
          plannedWrongCategory: 'situation',
          reason:
            'Cette carte décrit le sol et l’exposition du lieu lui-même, sans le comparer à un voisin.'
        },
        {
          id: 'jardin-limites',
          text: 'Une haie borde le nord ; un muret marque le bord sud.',
          correctCategory: 'limites',
          plannedWrongCategory: 'acces',
          reason:
            'La haie et le muret marquent des bords ; la phrase ne présente aucune entrée.'
        }
      ],
      correctFeedback:
        'Le terrain plat et ensoleillé décrit le site. Les immeubles et la place situent le jardin. La haie et le muret en fixent les limites ; le portail et le chemin indiquent l’accès.',
      whyHere:
        'Le site favorise les cultures et la situation rapproche le jardin des habitantes et habitants du quartier.'
    },
    {
      id: 'rive-passerelle',
      number: '02',
      title: 'L’aire de la Passerelle',
      theme: 'river',
      placeType: 'Une petite aire de loisirs au bord d’un ruisseau',
      mapWords: ['village', 'passerelle', 'ruisseau'],
      mapLabel:
        'Schéma de l’aire en aval du village, entre le ruisseau et une rangée d’arbres, accessible par une passerelle.',
      vocabulary: 'En aval : dans le sens où l’eau du ruisseau s’écoule.',
      cards: [
        {
          id: 'rive-limites',
          text: 'Le ruisseau marque le bord est ; une rangée d’arbres ferme le bord ouest.',
          correctCategory: 'limites',
          plannedWrongCategory: 'acces',
          reason:
            'Le ruisseau et les arbres sont décrits comme des bords ; rien ne dit qu’on les emprunte.'
        },
        {
          id: 'rive-site',
          text: 'Le sol est une berge herbeuse en pente douce, légèrement surélevée.',
          correctCategory: 'site',
          plannedWrongCategory: 'situation',
          reason:
            'La carte décrit la matière et la pente du terrain, non sa position par rapport au village.'
        },
        {
          id: 'rive-acces',
          text: 'Un sentier arrive par la passerelle ; les vélos restent à l’entrée.',
          correctCategory: 'acces',
          plannedWrongCategory: 'site',
          reason:
            'Le sentier, la passerelle et l’entrée indiquent comment rejoindre le lieu.'
        },
        {
          id: 'rive-situation',
          text: 'L’aire se trouve en aval du village, face au terrain de sport.',
          correctCategory: 'situation',
          plannedWrongCategory: 'limites',
          reason:
            'Les repères « village » et « terrain de sport » donnent une position relative, pas des bords.'
        }
      ],
      correctFeedback:
        'La berge herbeuse et sa pente forment le site. Le village et le terrain de sport donnent la situation. Le ruisseau et les arbres marquent les limites ; le sentier et la passerelle donnent l’accès.',
      whyHere:
        'Le site offre un sol adapté à une halte et la situation relie l’aire au village et au terrain de sport.'
    },
    {
      id: 'halle-carrefour',
      number: '03',
      title: 'La halle du Carrefour',
      theme: 'market',
      placeType: 'Une halle locale pour déposer et retirer des paniers de produits',
      mapWords: ['gare', 'halle', 'fermes'],
      mapLabel:
        'Schéma de la halle entre la gare et la route des fermes, bordée par les rails et desservie par deux entrées.',
      cards: [
        {
          id: 'halle-acces',
          text: 'Les piétons entrent par la cour ; les livraisons arrivent par une voie latérale.',
          correctCategory: 'acces',
          plannedWrongCategory: 'site',
          reason:
            'La phrase distingue deux trajets et deux entrées ; elle ne décrit pas le terrain sous la halle.'
        },
        {
          id: 'halle-limites',
          text: 'Une clôture longe les rails ; les murs des ateliers ferment les deux autres côtés.',
          correctCategory: 'limites',
          plannedWrongCategory: 'acces',
          reason:
            'Clôture et murs ferment les côtés du lieu ; aucune ouverture n’est indiquée ici.'
        },
        {
          id: 'halle-situation',
          text: 'La halle est entre la gare locale et la route qui mène aux fermes de la région.',
          correctCategory: 'situation',
          plannedWrongCategory: 'limites',
          reason:
            'La gare et la route placent la halle dans un réseau proche et régional ; elles ne tracent pas ses bords.'
        },
        {
          id: 'halle-site',
          text: 'Le bâtiment repose sur une terrasse de graviers large, plane et plus haute que la prairie humide.',
          correctCategory: 'site',
          plannedWrongCategory: 'situation',
          reason:
            'La carte décrit le sol, le relief et l’humidité du terrain lui-même.'
        }
      ],
      correctFeedback:
        'La terrasse plane et surélevée décrit le site. La gare et la route des fermes donnent la situation. La clôture et les murs forment les limites ; la cour et la voie latérale distinguent deux accès.',
      whyHere:
        'Le site offre une surface plane et la situation relie la halle aux déplacements locaux ainsi qu’aux fermes de la région.'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentDossier: Dossier = dossiers[0];
  let placements: Partial<Record<string, CategoryId>> = {};
  let submittedPlacements: Partial<Record<string, CategoryId>> = {};
  let arrangedCards: Partial<Record<CategoryId, EvidenceCard>> = {};
  let firstErrorCard: EvidenceCard | null = null;
  let placedCount = 0;
  let allPlaced = false;
  let announcement = '';
  let stateHeading: HTMLElement;

  $: currentDossier = dossiers[currentIndex];
  $: arrangedCards = categories.reduce<Partial<Record<CategoryId, EvidenceCard>>>((result, item) => {
    const card = currentDossier.cards.find((candidate) => placements[candidate.id] === item.id);
    if (card) result[item.id] = card;
    return result;
  }, {});
  $: placedCount = currentDossier.cards.filter((card) => placements[card.id]).length;
  $: allPlaced = placedCount === currentDossier.cards.length;

  function category(categoryId: CategoryId): Category {
    return categories.find((item) => item.id === categoryId) ?? categories[0];
  }

  function selectedCategory(card: EvidenceCard): CategoryId | undefined {
    return placements[card.id];
  }

  function submittedCardInCategory(categoryId: CategoryId): EvidenceCard | undefined {
    return currentDossier.cards.find(
      (card) => submittedPlacements[card.id] === categoryId
    );
  }

  function smokeAttempt(
    card: EvidenceCard,
    categoryId: CategoryId
  ): 'incorrect' | 'correct' | undefined {
    if (categoryId === card.correctCategory) return 'correct';
    if (categoryId === card.plannedWrongCategory) return 'incorrect';
    return undefined;
  }

  function smokeStep(card: EvidenceCard, categoryId: CategoryId): string | undefined {
    return smokeAttempt(card, categoryId)
      ? String(currentDossier.cards.indexOf(card) + 1)
      : undefined;
  }

  function focusHeadingSoon(): void {
    setTimeout(() => stateHeading?.focus(), 0);
  }

  function resetDossier(): void {
    placements = {};
    submittedPlacements = {};
    firstErrorCard = null;
  }

  function startPractice(): void {
    currentIndex = 0;
    resetDossier();
    phase = 'active';
    announcement = `Dossier 1 sur ${dossiers.length} : ${dossiers[0].title}.`;
    focusHeadingSoon();
  }

  function chooseCategory(card: EvidenceCard, categoryId: CategoryId): void {
    if (phase !== 'active' && phase !== 'retry') return;

    const nextPlacements = { ...placements };
    const previousCategory = nextPlacements[card.id];
    const displacedId = Object.entries(nextPlacements).find(
      ([cardId, placedCategory]) => cardId !== card.id && placedCategory === categoryId
    )?.[0];

    if (displacedId) {
      if (previousCategory && previousCategory !== categoryId) {
        nextPlacements[displacedId] = previousCategory;
      } else {
        delete nextPlacements[displacedId];
      }
    }
    nextPlacements[card.id] = categoryId;
    placements = nextPlacements;

    const displacedCard = displacedId
      ? currentDossier.cards.find((item) => item.id === displacedId)
      : undefined;
    announcement = `Carte ${currentDossier.cards.indexOf(card) + 1} classée dans ${category(categoryId).label}.`;
    if (displacedCard && previousCategory && previousCategory !== categoryId) {
      announcement += ` La carte ${currentDossier.cards.indexOf(displacedCard) + 1} prend sa place dans ${category(previousCategory).label}.`;
    } else if (displacedCard) {
      announcement += ` La carte ${currentDossier.cards.indexOf(displacedCard) + 1} revient dans les cartes à classer.`;
    }
  }

  function submitArrangement(): void {
    if (!allPlaced || (phase !== 'active' && phase !== 'retry')) return;

    submittedPlacements = { ...placements };
    const mismatch = currentDossier.cards.find(
      (card) => placements[card.id] !== card.correctCategory
    );

    if (mismatch) {
      firstErrorCard = mismatch;
      phase = 'incorrect';
      announcement = `Un lien est à revoir dans le dossier ${currentDossier.number}. Le classement reste visible.`;
    } else {
      firstErrorCard = null;
      phase = 'correct';
      announcement = `Dossier ${currentDossier.number} correctement organisé. Lis pourquoi chaque indice convient.`;
    }
    focusHeadingSoon();
  }

  function retryArrangement(): void {
    phase = 'retry';
    announcement = 'Le classement est conservé. Un indice compare deux rubriques pour une seule carte.';
    focusHeadingSoon();
  }

  function continuePractice(): void {
    if (currentIndex < dossiers.length - 1) {
      currentIndex += 1;
      resetDossier();
      phase = 'active';
      announcement = `Nouveau dossier, ${currentIndex + 1} sur ${dossiers.length} : ${dossiers[currentIndex].title}.`;
    } else {
      phase = 'complete';
      announcement = 'Les trois dossiers sont terminés. La stratégie des quatre repères est résumée.';
    }
    focusHeadingSoon();
  }

  function restartPractice(): void {
    currentIndex = 0;
    resetDossier();
    phase = 'intro';
    announcement = 'Retour au début du carnet.';
    focusHeadingSoon();
  }
</script>

<svelte:head>
  <title>Le carnet des quatre repères — EX-0307</title>
</svelte:head>

<main
  class="prototype-root"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0307"
  data-smoke-root
  data-smoke-exercise="EX-0307"
  data-smoke-program="per-6h-msn-shs"
>
  <p class="visually-hidden" aria-live="polite">{announcement}</p>

  {#if phase === 'intro'}
    <section class="intro-sheet" data-smoke-state="intro" aria-labelledby="intro-title">
      <div class="folio-mark" aria-hidden="true">
        <span>GÉO</span>
        <strong>4</strong>
      </div>
      <p class="eyebrow">Le carnet des quatre repères · trois lieux proches fictifs</p>
      <h1 id="intro-title" bind:this={stateHeading} tabindex="-1">
        Décrire un lieu sans mélanger les repères
      </h1>
      <p class="intro-lead">
        Classe quatre cartes pour bâtir une description. Garde toujours le même fil :
        <strong>site → situation → limites → accès</strong>.
      </p>

      <ol class="strategy-strip" aria-label="Les quatre repères, dans l’ordre">
        {#each categories as item, index}
          <li>
            <span class="step-number">{index + 1}</span>
            <div>
              <strong>{item.label}</strong>
              <span>{item.question}</span>
              <small>{item.definition}</small>
            </div>
          </li>
        {/each}
      </ol>

      <div class="intro-instructions">
        <div>
          <span class="instruction-number">A</span>
          <p><strong>Lis</strong> les quatre cartes du dossier.</p>
        </div>
        <div>
          <span class="instruction-number">B</span>
          <p><strong>Classe</strong> chaque carte avec les boutons. Une rubrique reçoit une seule carte.</p>
        </div>
        <div>
          <span class="instruction-number">C</span>
          <p><strong>Valide</strong> l’arrangement, puis corrige-le si un lien est à revoir.</p>
        </div>
      </div>

      <button class="primary-action" type="button" on:click={startPractice} data-smoke-action="start">
        Ouvrir le premier dossier
        <span aria-hidden="true">→</span>
      </button>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="workbook"
      data-smoke-state={phase === 'retry' ? 'retry' : 'active'}
      data-smoke-variation={currentDossier.id}
      aria-labelledby="dossier-title"
    >
      <header class="workbook-header">
        <div>
          <p class="eyebrow">Dossier {currentDossier.number} · {currentIndex + 1} sur {dossiers.length}</p>
          <h1 id="dossier-title" bind:this={stateHeading} tabindex="-1">{currentDossier.title}</h1>
          <p class="place-type">{currentDossier.placeType}</p>
        </div>
        <div class={`place-sketch ${currentDossier.theme}`} role="img" aria-label={currentDossier.mapLabel}>
          <span class="sketch-line" aria-hidden="true"></span>
          {#each currentDossier.mapWords as word, index}
            <span class={`map-word word-${index + 1}`} aria-hidden="true">{word}</span>
          {/each}
          <span class="place-dot" aria-hidden="true">●</span>
        </div>
      </header>

      {#if currentDossier.vocabulary}
        <p class="vocabulary"><strong>Mot du dossier :</strong> {currentDossier.vocabulary}</p>
      {/if}

      <div class="strategy-reminder" aria-label="Fil de description à conserver">
        <span>Fil à garder</span>
        <strong>site</strong><b aria-hidden="true">→</b><strong>situation</strong><b aria-hidden="true">→</b><strong>limites</strong><b aria-hidden="true">→</b><strong>accès</strong>
      </div>

      {#if phase === 'retry' && firstErrorCard}
        <aside class="scaffold" aria-labelledby="scaffold-title">
          <span class="scaffold-symbol" aria-hidden="true">◇</span>
          <div>
            <p class="mini-label">Indice sur une seule carte</p>
            <h2 id="scaffold-title">Compare les questions, pas seulement les mots.</h2>
            <blockquote>« {firstErrorCard.text} »</blockquote>
            <div class="contrast-grid">
              <p>
                <span>Ta rubrique</span>
                <strong>{category(submittedPlacements[firstErrorCard.id] ?? firstErrorCard.plannedWrongCategory).label}</strong>
                {category(submittedPlacements[firstErrorCard.id] ?? firstErrorCard.plannedWrongCategory).question}
              </p>
              <p>
                <span>Question utile</span>
                <strong>{category(firstErrorCard.correctCategory).question}</strong>
                {firstErrorCard.reason}
              </p>
            </div>
          </div>
        </aside>
      {/if}

      <div class="work-grid">
        <div class="cards-column">
          <div class="column-heading">
            <div>
              <p class="mini-label">Cartes-indices</p>
              <h2>Dans quelle rubrique va chaque carte ?</h2>
            </div>
            <p id="arrangement-progress" class:ready={allPlaced}>
              <strong>{placedCount}/{currentDossier.cards.length}</strong>
              {allPlaced ? 'arrangement prêt' : 'cartes classées'}
            </p>
          </div>

          <div class="evidence-list">
            {#each currentDossier.cards as card, cardIndex}
              <fieldset class="evidence-card" class:placed={selectedCategory(card)}>
                <legend>
                  <span>Carte {cardIndex + 1}</span>
                  {card.text}
                </legend>
                <div class="category-controls">
                  {#each categories as item}
                    <button
                      type="button"
                      class="category-button"
                      class:selected={selectedCategory(card) === item.id}
                      aria-pressed={selectedCategory(card) === item.id}
                      aria-label={`Carte ${cardIndex + 1} : classer dans ${item.label}`}
                      on:click={() => chooseCategory(card, item.id)}
                      data-smoke-attempt={smokeAttempt(card, item.id)}
                      data-smoke-step={smokeStep(card, item.id)}
                    >
                      <span>{item.label}</span>
                      {#if selectedCategory(card) === item.id}
                        <small><span aria-hidden="true">✓</span> choisie</small>
                      {/if}
                    </button>
                  {/each}
                </div>
              </fieldset>
            {/each}
          </div>
        </div>

        <aside class="description-column" aria-labelledby="description-title">
          <p class="mini-label">Description en construction</p>
          <h2 id="description-title">Le carnet remet les indices dans l’ordre.</h2>
          <ol class="description-builder">
            {#each categories as item, index}
              <li class:filled={arrangedCards[item.id]}>
                <div class="slot-label">
                  <span>{index + 1}</span>
                  <strong>{item.label}</strong>
                </div>
                {#if arrangedCards[item.id]}
                  <p>{arrangedCards[item.id]?.text}</p>
                {:else}
                  <p class="empty-slot">Aucune carte classée ici.</p>
                {/if}
              </li>
            {/each}
          </ol>
        </aside>
      </div>

      <footer class="decision-bar">
        <p>
          {#if allPlaced}
            <strong>Ton arrangement est complet.</strong> Relis les quatre repères avant de valider.
          {:else}
            Chaque rubrique reçoit une carte. Si tu échanges deux rubriques déjà remplies, les cartes permutent leurs places.
          {/if}
        </p>
        <button
          class="primary-action"
          type="button"
          disabled={!allPlaced}
          on:click={submitArrangement}
          data-smoke-action={allPlaced ? 'submit' : undefined}
          aria-describedby="arrangement-progress"
        >
          Valider l’arrangement
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </section>
  {:else if phase === 'incorrect' && firstErrorCard}
    <section
      class="feedback-sheet incorrect-sheet"
      data-smoke-state="incorrect"
      data-smoke-variation={currentDossier.id}
      aria-labelledby="incorrect-title"
      aria-live="polite"
    >
      <div class="feedback-heading">
        <span class="feedback-symbol" aria-hidden="true">△</span>
        <div>
          <p class="eyebrow">Un lien à revoir · dossier {currentDossier.number}</p>
          <h1 id="incorrect-title" bind:this={stateHeading} tabindex="-1">Le classement reste modifiable.</h1>
        </div>
      </div>

      <div class="specific-feedback" data-smoke-feedback="incorrect" data-smoke-feedback-detail>
        <p>
          Tu as placé la carte {currentDossier.cards.indexOf(firstErrorCard) + 1} dans
          <strong>« {category(submittedPlacements[firstErrorCard.id] ?? firstErrorCard.plannedWrongCategory).label} »</strong>.
        </p>
        <blockquote>« {firstErrorCard.text} »</blockquote>
        <p>{firstErrorCard.reason}</p>
        <p class="next-question">
          Pour la corriger, cherche la rubrique qui répond le mieux à :
          <strong>« {category(firstErrorCard.correctCategory).question} »</strong>
        </p>
      </div>

      <div class="submitted-arrangement">
        <p class="mini-label">Ton arrangement envoyé</p>
        <ol>
          {#each categories as item, index}
            {@const submittedCard = submittedCardInCategory(item.id)}
            <li>
              <span>{index + 1}. {item.label}</span>
              <p>{submittedCard?.text}</p>
            </li>
          {/each}
        </ol>
      </div>

      <div class="feedback-action">
        <p>Au prochain écran, tes quatre choix seront conservés et un indice comparera deux rubriques.</p>
        <button class="primary-action" type="button" on:click={retryArrangement} data-smoke-action="retry">
          Reprendre le classement
          <span aria-hidden="true">↺</span>
        </button>
      </div>
    </section>
  {:else if phase === 'correct'}
    <div class="feedback-stack">
      <section
        class="feedback-sheet correct-sheet"
        data-smoke-state="correct"
        data-smoke-variation={currentDossier.id}
        aria-labelledby="correct-title"
        aria-live="polite"
      >
        <div class="feedback-heading">
          <span class="feedback-symbol" aria-hidden="true">✓</span>
          <div>
            <p class="eyebrow">Description cohérente · dossier {currentDossier.number}</p>
            <h1 id="correct-title" bind:this={stateHeading} tabindex="-1">Les quatre repères jouent chacun leur rôle.</h1>
          </div>
        </div>

        <p class="correct-explanation" data-smoke-feedback="correct" data-smoke-feedback-detail>{currentDossier.correctFeedback}</p>

        <div class="final-description">
          <p class="mini-label">Description ordonnée</p>
          <ol>
            {#each categories as item, index}
              {@const correctCard = submittedCardInCategory(item.id)}
              <li>
                <span><b>{index + 1}</b> {item.label}</span>
                <p>{correctCard?.text}</p>
              </li>
            {/each}
          </ol>
        </div>

        <aside class="why-note">
          <span aria-hidden="true">↳</span>
          <p><strong>Pourquoi ce lieu peut être ici ?</strong> {currentDossier.whyHere}</p>
        </aside>
      </section>

      <section
        class="continuation-bar"
        data-smoke-state="continuation"
        data-smoke-variation={currentDossier.id}
        aria-label="Suite de l’activité"
      >
        <p>
          {#if currentIndex < dossiers.length - 1}
            Le prochain lieu changera de terrain, de limites et de manière d’y accéder.
          {:else}
            Les trois dossiers sont maintenant organisés.
          {/if}
        </p>
        <button class="primary-action" type="button" on:click={continuePractice} data-smoke-action="continue">
          {currentIndex < dossiers.length - 1 ? 'Ouvrir le dossier suivant' : 'Terminer le carnet'}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </div>
  {:else if phase === 'complete'}
    <section
      class="completion-sheet"
      data-smoke-state="complete"
      aria-labelledby="complete-title"
    >
      <div class="completion-seal" aria-hidden="true"><span>3</span><small>dossiers</small></div>
      <p class="eyebrow">Carnet parcouru</p>
      <h1 id="complete-title" bind:this={stateHeading} tabindex="-1">Une stratégie pour décrire un lieu</h1>
      <p class="completion-lead" data-smoke-completion>
        Tu as utilisé le même fil sur trois lieux différents. Il aide à séparer ce qui appartient au terrain, ce qui l’entoure, ce qui le borde et la manière d’y arriver.
      </p>

      <ol class="completion-strategy">
        <li><span>1</span><p><strong>Site</strong> — le terrain du lieu lui-même.</p></li>
        <li><span>2</span><p><strong>Situation</strong> — sa position par rapport à d’autres lieux.</p></li>
        <li><span>3</span><p><strong>Limites</strong> — les bords qui le délimitent.</p></li>
        <li><span>4</span><p><strong>Accès</strong> — les entrées et chemins pour le rejoindre.</p></li>
      </ol>

      <p class="completion-note">
        Ce carnet ne dit pas que tout est acquis : dans un autre lieu, il faudra encore observer les indices et expliquer pourquoi ils comptent.
      </p>
      <button class="secondary-action" type="button" on:click={restartPractice}>Revoir les dossiers</button>
    </section>
  {/if}
</main>

<style>
  .prototype-root {
    --ink: #18342f;
    --muted: #5d6b63;
    --paper: #fffdf7;
    --paper-deep: #f3ecdc;
    --line: #d6cdbb;
    --accent: #b64f34;
    --accent-dark: #8d3624;
    --teal: #176d65;
    --teal-soft: #dcebe5;
    --amber-soft: #f6e5bb;
    width: 100%;
    min-width: 0;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    padding: clamp(12px, 3vw, 34px);
    color: var(--ink);
    background:
      linear-gradient(90deg, rgba(24, 52, 47, 0.035) 1px, transparent 1px),
      linear-gradient(rgba(24, 52, 47, 0.035) 1px, transparent 1px),
      #e9e4d8;
    background-size: 24px 24px;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.5;
  }

  .prototype-root h1,
  .prototype-root h2,
  .prototype-root p,
  .prototype-root ol,
  .prototype-root blockquote {
    margin-top: 0;
  }

  .prototype-root h1,
  .prototype-root h2 {
    text-wrap: balance;
  }

  .prototype-root button {
    min-height: 48px;
    border: 0;
    font: inherit;
    touch-action: manipulation;
  }

  .prototype-root button:focus-visible,
  .prototype-root [tabindex="-1"]:focus-visible {
    outline: 4px solid #146fd1;
    outline-offset: 3px;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .intro-sheet,
  .workbook,
  .feedback-sheet,
  .completion-sheet,
  .continuation-bar {
    width: min(1120px, 100%);
    margin: 0 auto;
    border: 1px solid var(--line);
    border-radius: 4px 24px 4px 24px;
    background: var(--paper);
    box-shadow: 0 18px 50px rgba(45, 38, 24, 0.12);
  }

  .intro-sheet,
  .completion-sheet {
    position: relative;
    max-width: 920px;
    padding: clamp(22px, 6vw, 64px);
    overflow: hidden;
  }

  .folio-mark {
    position: absolute;
    top: 0;
    right: clamp(16px, 5vw, 48px);
    display: grid;
    width: 76px;
    min-height: 100px;
    place-items: center;
    align-content: center;
    border-radius: 0 0 38px 38px;
    color: #fffaf0;
    background: var(--accent);
    letter-spacing: 0.12em;
  }

  .folio-mark span {
    font-size: 0.68rem;
    font-weight: 800;
  }

  .folio-mark strong {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 2.6rem;
    line-height: 1;
  }

  .eyebrow,
  .mini-label {
    margin-bottom: 9px;
    color: var(--accent-dark);
    font-size: 0.74rem;
    font-weight: 850;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .intro-sheet > .eyebrow {
    max-width: calc(100% - 88px);
  }

  .intro-sheet h1,
  .completion-sheet h1 {
    max-width: 760px;
    margin-bottom: 20px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.25rem, 7vw, 5rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 0.98;
  }

  .intro-lead,
  .completion-lead {
    max-width: 720px;
    margin-bottom: 30px;
    color: #344b45;
    font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  }

  .strategy-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-bottom: 28px;
    padding: 0;
    border-block: 1px solid var(--line);
    list-style: none;
  }

  .strategy-strip li {
    display: flex;
    min-width: 0;
    gap: 10px;
    padding: 15px 12px;
    border-right: 1px solid var(--line);
  }

  .strategy-strip li:last-child {
    border-right: 0;
  }

  .step-number,
  .instruction-number {
    display: grid;
    width: 28px;
    height: 28px;
    flex: 0 0 28px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--teal);
    font-size: 0.76rem;
    font-weight: 850;
  }

  .strategy-strip strong,
  .strategy-strip span:not(.step-number),
  .strategy-strip small {
    display: block;
  }

  .strategy-strip strong {
    margin-bottom: 2px;
  }

  .strategy-strip span:not(.step-number) {
    color: var(--ink);
    font-size: 0.78rem;
    line-height: 1.35;
  }

  .strategy-strip small {
    margin-top: 4px;
    color: var(--muted);
    font-size: 0.68rem;
    line-height: 1.35;
  }

  .intro-instructions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }

  .intro-instructions > div {
    display: flex;
    min-width: 0;
    gap: 10px;
    padding: 14px;
    border: 1px dashed var(--line);
    background: #faf6ed;
  }

  .intro-instructions p {
    margin-bottom: 0;
    font-size: 0.91rem;
  }

  .instruction-number {
    border-radius: 3px 12px 3px 12px;
    color: var(--ink);
    background: var(--amber-soft);
  }

  .primary-action,
  .secondary-action {
    display: inline-flex;
    min-width: min(260px, 100%);
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 12px 20px;
    border-radius: 3px 16px 3px 16px;
    font-weight: 800;
    cursor: pointer;
  }

  .primary-action {
    color: white;
    background: var(--accent);
    box-shadow: 4px 4px 0 #682719;
  }

  .primary-action:hover:not(:disabled) {
    background: var(--accent-dark);
  }

  .primary-action:active:not(:disabled) {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #682719;
  }

  .primary-action:disabled {
    color: #6e746f;
    background: #ddd9cf;
    box-shadow: none;
    cursor: not-allowed;
  }

  .secondary-action {
    border: 2px solid var(--ink) !important;
    color: var(--ink);
    background: transparent;
  }

  .workbook {
    overflow: hidden;
  }

  .workbook-header {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
    align-items: stretch;
    border-bottom: 1px solid var(--line);
  }

  .workbook-header > div:first-child {
    padding: clamp(20px, 4vw, 40px);
  }

  .workbook-header h1,
  .feedback-sheet h1 {
    margin-bottom: 8px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 5vw, 3.6rem);
    font-weight: 500;
    letter-spacing: -0.035em;
    line-height: 1;
  }

  .place-type {
    margin-bottom: 0;
    color: var(--muted);
    font-size: 1.02rem;
  }

  .place-sketch {
    position: relative;
    min-height: 176px;
    overflow: hidden;
    border-left: 1px solid var(--line);
    background-color: #e5ebdc;
    background-image: repeating-radial-gradient(circle at 50% 120%, transparent 0 17px, rgba(24, 52, 47, 0.16) 18px 19px);
  }

  .place-sketch.river {
    background-color: #dce9e5;
    background-image: repeating-radial-gradient(ellipse at 20% 80%, transparent 0 20px, rgba(23, 109, 101, 0.2) 21px 22px);
  }

  .place-sketch.market {
    background-color: #eee0cd;
    background-image: linear-gradient(35deg, transparent 45%, rgba(182, 79, 52, 0.17) 46% 48%, transparent 49%);
    background-size: 42px 42px;
  }

  .sketch-line {
    position: absolute;
    inset: 18% 14%;
    border: 3px dashed rgba(24, 52, 47, 0.52);
    border-radius: 48% 38% 52% 36%;
    transform: rotate(-4deg);
  }

  .map-word {
    position: absolute;
    z-index: 1;
    padding: 4px 7px;
    border: 1px solid rgba(24, 52, 47, 0.25);
    border-radius: 2px 8px 2px 8px;
    color: var(--ink);
    background: rgba(255, 253, 247, 0.88);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .word-1 { top: 15%; left: 8%; }
  .word-2 { top: 46%; left: 41%; }
  .word-3 { right: 8%; bottom: 15%; }

  .place-dot {
    position: absolute;
    top: 30%;
    left: 54%;
    color: var(--accent);
    font-size: 2.1rem;
    text-shadow: 0 0 0 5px rgba(255, 253, 247, 0.76);
  }

  .vocabulary,
  .strategy-reminder {
    margin: 0;
    border-bottom: 1px solid var(--line);
  }

  .vocabulary {
    padding: 10px clamp(18px, 4vw, 40px);
    color: #344b45;
    background: var(--amber-soft);
    font-size: 0.9rem;
  }

  .strategy-reminder {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 12px clamp(18px, 4vw, 40px);
    background: var(--teal-soft);
    font-size: 0.88rem;
  }

  .strategy-reminder > span {
    margin-right: 8px;
    color: var(--teal);
    font-size: 0.7rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .strategy-reminder b {
    color: var(--accent);
  }

  .scaffold {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 16px;
    margin: clamp(18px, 3vw, 32px) clamp(18px, 4vw, 40px) 0;
    padding: 18px;
    border: 2px solid #bb751f;
    border-radius: 3px 18px 3px 18px;
    background: #fff7df;
  }

  .scaffold-symbol {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    background: #a96718;
    font-size: 1.7rem;
  }

  .scaffold h2 {
    margin-bottom: 8px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.45rem;
  }

  .scaffold blockquote,
  .specific-feedback blockquote {
    margin-bottom: 14px;
    padding-left: 14px;
    border-left: 3px solid var(--accent);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.05rem;
  }

  .contrast-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .contrast-grid p {
    margin-bottom: 0;
    padding: 12px;
    border: 1px solid #ddc48d;
    background: rgba(255, 253, 247, 0.74);
    font-size: 0.88rem;
  }

  .contrast-grid span,
  .contrast-grid strong {
    display: block;
  }

  .contrast-grid span {
    margin-bottom: 3px;
    color: #76531e;
    font-size: 0.67rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .contrast-grid strong {
    margin-bottom: 4px;
  }

  .work-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
    gap: 28px;
    padding: clamp(20px, 4vw, 40px);
  }

  .column-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .column-heading h2,
  .description-column h2 {
    margin-bottom: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.35rem, 2.6vw, 1.8rem);
    font-weight: 500;
    line-height: 1.15;
  }

  #arrangement-progress {
    flex: 0 0 auto;
    margin-bottom: 0;
    padding: 7px 10px;
    border: 1px solid var(--line);
    border-radius: 2px 10px 2px 10px;
    color: var(--muted);
    background: #f4f0e7;
    font-size: 0.76rem;
    text-align: right;
  }

  #arrangement-progress strong {
    display: block;
    color: var(--ink);
    font-size: 1rem;
  }

  #arrangement-progress.ready::after {
    content: " ✓";
    color: var(--teal);
    font-weight: 900;
  }

  .evidence-list {
    display: grid;
    gap: 14px;
  }

  .evidence-card {
    min-width: 0;
    margin: 0;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 2px 16px 2px 16px;
    background: #fbf8f0;
  }

  .evidence-card.placed {
    border-style: solid;
    border-color: var(--teal);
    box-shadow: inset 5px 0 0 var(--teal);
  }

  .evidence-card legend {
    max-width: 100%;
    padding: 0 6px;
    color: var(--ink);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.02rem;
    line-height: 1.4;
  }

  .evidence-card legend > span {
    display: block;
    margin-bottom: 3px;
    color: var(--accent-dark);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 0.66rem;
    font-weight: 850;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .category-controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
    margin-top: 10px;
  }

  .category-button {
    display: grid;
    min-width: 0;
    place-content: center;
    padding: 7px 5px;
    border: 1px solid #b9b6ac !important;
    border-radius: 2px 10px 2px 10px;
    color: #344b45;
    background: #fffdf8;
    font-size: 0.78rem !important;
    font-weight: 750;
    cursor: pointer;
  }

  .category-button:hover {
    border-color: var(--teal) !important;
    background: #eef6f2;
  }

  .category-button.selected {
    border: 2px solid var(--teal) !important;
    color: #0d514b;
    background: var(--teal-soft);
  }

  .category-button small {
    display: block;
    color: #0d514b;
    font-size: 0.64rem;
    line-height: 1.1;
  }

  .description-column {
    min-width: 0;
    padding: 18px;
    border: 1px solid var(--line);
    background: #f1eadc;
    box-shadow: 8px 8px 0 #ded3c0;
  }

  .description-builder,
  .final-description ol,
  .submitted-arrangement ol,
  .completion-strategy {
    margin-bottom: 0;
    padding: 0;
    list-style: none;
  }

  .description-builder {
    display: grid;
    gap: 10px;
    margin-top: 18px;
  }

  .description-builder li {
    min-width: 0;
    padding: 12px;
    border: 1px dashed #aaa393;
    background: rgba(255, 253, 247, 0.72);
  }

  .description-builder li.filled {
    border-style: solid;
    border-color: var(--teal);
    background: #fffdf7;
  }

  .slot-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 7px;
  }

  .slot-label span,
  .final-description li > span b,
  .completion-strategy > li > span {
    display: grid;
    width: 25px;
    height: 25px;
    flex: 0 0 25px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--teal);
    font-size: 0.7rem;
  }

  .description-builder p {
    margin-bottom: 0;
    font-size: 0.85rem;
  }

  .description-builder .empty-slot {
    color: #74786f;
    font-style: italic;
  }

  .decision-bar,
  .feedback-action,
  .continuation-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    padding: 18px clamp(18px, 4vw, 40px);
  }

  .decision-bar {
    border-top: 1px solid var(--line);
    background: #f6f1e6;
  }

  .decision-bar p,
  .feedback-action p,
  .continuation-bar p {
    max-width: 620px;
    margin-bottom: 0;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .decision-bar .primary-action,
  .feedback-action .primary-action,
  .continuation-bar .primary-action {
    min-width: 230px;
  }

  .feedback-stack {
    display: grid;
    width: min(960px, 100%);
    gap: 14px;
    margin: 0 auto;
  }

  .feedback-sheet {
    width: 100%;
    padding: clamp(22px, 5vw, 48px);
  }

  .feedback-heading {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: 18px;
    margin-bottom: 24px;
  }

  .feedback-symbol {
    display: grid;
    width: 58px;
    height: 58px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--accent);
    font-size: 1.8rem;
    font-weight: 900;
  }

  .correct-sheet .feedback-symbol {
    background: var(--teal);
  }

  .specific-feedback,
  .correct-explanation {
    padding: 18px;
    border-left: 5px solid var(--accent);
    background: #fff1df;
  }

  .specific-feedback > :last-child,
  .correct-explanation {
    margin-bottom: 0;
  }

  .next-question {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid #e0c9a8;
  }

  .correct-explanation {
    border-left-color: var(--teal);
    background: var(--teal-soft);
    font-size: 1.02rem;
  }

  .submitted-arrangement,
  .final-description {
    margin-top: 22px;
  }

  .submitted-arrangement ol,
  .final-description ol {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .submitted-arrangement li,
  .final-description li {
    min-width: 0;
    padding: 12px;
    border: 1px solid var(--line);
    background: #faf7ef;
  }

  .submitted-arrangement li > span,
  .final-description li > span {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    color: var(--accent-dark);
    font-size: 0.74rem;
    font-weight: 850;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .submitted-arrangement li p,
  .final-description li p {
    margin-bottom: 0;
    font-size: 0.86rem;
  }

  .feedback-action {
    margin: 24px calc(clamp(22px, 5vw, 48px) * -1) calc(clamp(22px, 5vw, 48px) * -1);
    border-top: 1px solid var(--line);
    background: #f6f1e6;
  }

  .why-note {
    display: flex;
    gap: 12px;
    margin-top: 18px;
    padding: 14px;
    border: 1px dashed var(--teal);
    color: #294840;
  }

  .why-note > span {
    color: var(--teal);
    font-size: 1.5rem;
    font-weight: 900;
  }

  .why-note p {
    margin-bottom: 0;
  }

  .continuation-bar {
    width: 100%;
    border-radius: 3px 18px 3px 18px;
    background: var(--ink);
  }

  .continuation-bar p {
    color: #dbe4df;
  }

  .completion-sheet {
    text-align: left;
  }

  .completion-seal {
    position: absolute;
    top: 20px;
    right: clamp(18px, 5vw, 46px);
    display: grid;
    width: 90px;
    height: 90px;
    place-items: center;
    align-content: center;
    border: 2px solid var(--teal);
    border-radius: 50%;
    color: var(--teal);
    transform: rotate(7deg);
  }

  .completion-seal span,
  .completion-seal small {
    display: block;
    line-height: 1;
  }

  .completion-seal span {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 2rem;
  }

  .completion-seal small {
    font-size: 0.65rem;
    font-weight: 850;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .completion-sheet > .eyebrow,
  .completion-sheet > h1,
  .completion-sheet > .completion-lead {
    max-width: calc(100% - 90px);
  }

  .completion-strategy {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 26px 0;
  }

  .completion-strategy li {
    display: flex;
    min-width: 0;
    gap: 10px;
    padding: 14px;
    border: 1px solid var(--line);
    background: #faf7ee;
  }

  .completion-strategy p {
    margin-bottom: 0;
  }

  .completion-note {
    max-width: 720px;
    margin-bottom: 24px;
    padding: 13px 15px;
    border-left: 4px solid var(--accent);
    color: var(--muted);
    background: #f6f1e6;
    font-size: 0.9rem;
  }

  @media (max-width: 820px) {
    .strategy-strip,
    .intro-instructions,
    .submitted-arrangement ol,
    .final-description ol {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .strategy-strip li:nth-child(2) {
      border-right: 0;
    }

    .strategy-strip li:nth-child(-n + 2) {
      border-bottom: 1px solid var(--line);
    }

    .workbook-header,
    .work-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .place-sketch {
      min-height: 150px;
      border-top: 1px solid var(--line);
      border-left: 0;
    }

    .description-column {
      box-shadow: 5px 5px 0 #ded3c0;
    }
  }

  @media (max-width: 560px) {
    .prototype-root {
      padding: 12px;
      background-size: 18px 18px;
    }

    .intro-sheet,
    .workbook,
    .feedback-sheet,
    .completion-sheet,
    .continuation-bar {
      border-radius: 2px 14px 2px 14px;
      box-shadow: 0 10px 26px rgba(45, 38, 24, 0.1);
    }

    .intro-sheet,
    .completion-sheet,
    .feedback-sheet {
      padding: 18px 16px;
    }

    .folio-mark {
      right: 14px;
      width: 58px;
      min-height: 78px;
    }

    .folio-mark strong {
      font-size: 2rem;
    }

    .intro-sheet > .eyebrow {
      max-width: calc(100% - 66px);
    }

    .intro-sheet h1,
    .completion-sheet h1 {
      font-size: clamp(2rem, 13vw, 3rem);
    }

    .strategy-strip,
    .intro-instructions,
    .completion-strategy,
    .contrast-grid,
    .submitted-arrangement ol,
    .final-description ol {
      grid-template-columns: minmax(0, 1fr);
    }

    .strategy-strip li,
    .strategy-strip li:nth-child(2) {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }

    .strategy-strip li:last-child {
      border-bottom: 0;
    }

    .workbook-header > div:first-child,
    .work-grid {
      padding: 18px 14px;
    }

    .place-sketch {
      min-height: 132px;
    }

    .map-word {
      font-size: 0.59rem;
    }

    .strategy-reminder {
      padding: 11px 14px;
    }

    .strategy-reminder > span {
      width: 100%;
    }

    .scaffold {
      grid-template-columns: minmax(0, 1fr);
      margin: 14px 14px 0;
      padding: 14px;
    }

    .scaffold-symbol {
      width: 44px;
      height: 44px;
    }

    .column-heading {
      align-items: start;
      flex-direction: column;
    }

    #arrangement-progress {
      text-align: left;
    }

    #arrangement-progress strong {
      display: inline;
      margin-right: 4px;
    }

    .evidence-card {
      padding: 12px 9px;
    }

    .category-controls {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .category-button {
      min-height: 48px;
    }

    .decision-bar,
    .feedback-action,
    .continuation-bar {
      align-items: stretch;
      flex-direction: column;
      padding: 16px 14px;
    }

    .decision-bar .primary-action,
    .feedback-action .primary-action,
    .continuation-bar .primary-action,
    .primary-action,
    .secondary-action {
      width: 100%;
      min-width: 0;
    }

    .feedback-heading {
      grid-template-columns: minmax(0, 1fr);
      gap: 10px;
    }

    .feedback-symbol {
      width: 48px;
      height: 48px;
    }

    .feedback-sheet h1 {
      font-size: 2rem;
    }

    .feedback-action {
      margin: 22px -16px -18px;
    }

    .completion-seal {
      position: static;
      width: 76px;
      height: 76px;
      margin: 0 0 18px auto;
    }

    .completion-sheet > .eyebrow,
    .completion-sheet > h1,
    .completion-sheet > .completion-lead {
      max-width: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after {
      scroll-behavior: auto !important;
      transition: none !important;
      animation: none !important;
    }

    .primary-action:active:not(:disabled) {
      transform: none;
    }
  }
</style>
