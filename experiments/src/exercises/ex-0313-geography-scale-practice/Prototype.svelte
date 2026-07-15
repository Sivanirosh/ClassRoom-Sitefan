<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type WindowId = 'near' | 'wide';
  type AnswerKind = 'incorrect' | 'correct';
  type PlacementMap = Partial<Record<string, WindowId>>;

  type ScaleWindow = {
    id: WindowId;
    signal: string;
    level: string;
    name: string;
    extent: string;
    keeps: string;
    simplifies: string;
  };

  type RequestTicket = {
    id: string;
    short: string;
    question: string;
    correctWindow: WindowId;
    wrongFeedback: string;
    correctReason: string;
    scaffold: string;
  };

  type ScaleCase = {
    id: string;
    folio: string;
    theme: string;
    title: string;
    context: string;
    nesting: string;
    windows: [ScaleWindow, ScaleWindow];
    tickets: RequestTicket[];
    success: string;
    nextPreview: string;
    correctManifestFirst: boolean;
  };

  const cases: ScaleCase[] = [
    {
      id: 'appartement-quartier',
      folio: 'AIGUILLAGE 01',
      theme: 'Habitat · espace vécu et fréquenté',
      title: 'De l’appartement au quartier',
      context:
        'Deux documents fictifs doivent répondre à quatre demandes. Le premier reste dans le logement ; le second ouvre la vue sur le quartier.',
      nesting: 'L’appartement se trouve dans l’immeuble ; l’immeuble se trouve dans le quartier.',
      windows: [
        {
          id: 'near',
          signal: 'R',
          level: 'Cadrage rapproché',
          name: 'Échelle de l’appartement',
          extent: 'environ 18 m d’un bout à l’autre',
          keeps: 'les pièces, les portes, le couloir et le balcon',
          simplifies: 'les rues et les lieux situés au-delà de l’immeuble'
        },
        {
          id: 'wide',
          signal: 'É',
          level: 'Cadrage élargi',
          name: 'Échelle du quartier',
          extent: 'environ 1,4 km autour de l’immeuble',
          keeps: 'les rues, l’école, la bibliothèque et les arrêts',
          simplifies: 'l’intérieur des logements et leurs portes'
        }
      ],
      tickets: [
        {
          id: 'balcon-room',
          short: 'pièce ↔ balcon',
          question: 'Quelle pièce donne directement sur le balcon ?',
          correctWindow: 'near',
          wrongFeedback:
            'La vue du quartier peut situer l’immeuble, mais elle simplifie ses pièces. Le lien précis entre une pièce et le balcon n’y reste pas lisible.',
          correctReason:
            'La pièce et le balcon appartiennent au même logement ; le plan de l’appartement garde ce détail intérieur.',
          scaffold:
            'Les deux éléments sont dans le même logement. Cherche la fenêtre qui nomme encore les pièces.'
        },
        {
          id: 'home-school',
          short: 'immeuble ↔ école',
          question: 'Par quelles rues aller de l’immeuble à l’école ?',
          correctWindow: 'wide',
          wrongFeedback:
            'Le plan de l’appartement s’arrête au logement. Il ne contient ni les rues du trajet ni l’école.',
          correctReason:
            'Le trajet sort de l’immeuble et traverse des rues ; l’étendue du quartier contient le départ et l’école.',
          scaffold:
            'Suis mentalement le trajet : il quitte le logement. La fenêtre utile doit contenir les rues et l’école.'
        },
        {
          id: 'kitchen-door',
          short: 'cuisine ↔ couloir',
          question: 'Quelle porte relie la cuisine au couloir ?',
          correctWindow: 'near',
          wrongFeedback:
            'À l’échelle du quartier, les portes intérieures disparaissent. L’étendue est suffisante, mais le détail demandé est perdu.',
          correctReason:
            'La demande porte sur une porte entre deux espaces intérieurs ; ce détail reste visible à l’échelle de l’appartement.',
          scaffold:
            'Demande-toi non seulement où se trouvent les lieux, mais si une porte intérieure reste dessinée.'
        },
        {
          id: 'stop-library',
          short: 'arrêt ↔ bibliothèque',
          question: 'Quel arrêt se trouve près de la bibliothèque ?',
          correctWindow: 'wide',
          wrongFeedback:
            'Le logement ne contient ni la bibliothèque du quartier ni les arrêts voisins. Les deux repères tombent hors du cadrage.',
          correctReason:
            'La bibliothèque et les arrêts sont deux repères du quartier ; cette vue les montre ensemble.',
          scaffold:
            'Il faut voir deux repères extérieurs à l’immeuble dans la même fenêtre.'
        }
      ],
      success:
        'Les demandes sur les pièces et les portes restent dans le cadrage de l’appartement. Les trajets entre l’immeuble, l’école, la bibliothèque et les arrêts passent au cadrage du quartier.',
      nextPreview:
        'Le prochain aiguillage gardera un quartier en vue rapprochée, puis ouvrira toute une ville.',
      correctManifestFirst: false
    },
    {
      id: 'quartier-ville',
      folio: 'AIGUILLAGE 02',
      theme: 'Loisirs et déplacements · espace documenté',
      title: 'Du quartier à la ville',
      context:
        'Le quartier fictif des Cerisiers est observé seul, puis replacé dans la ville imaginaire de Roselière. Les détails utiles changent avec la mission.',
      nesting: 'Le quartier des Cerisiers est une partie de la ville de Roselière.',
      windows: [
        {
          id: 'near',
          signal: 'R',
          level: 'Cadrage rapproché',
          name: 'Échelle du quartier',
          extent: 'environ 1,6 km autour de la place',
          keeps: 'les petites rues, les passages piétons, le parc et le terrain de sport',
          simplifies: 'les autres quartiers et les liaisons à travers toute la ville'
        },
        {
          id: 'wide',
          signal: 'É',
          level: 'Cadrage élargi',
          name: 'Échelle de la ville',
          extent: 'environ 9 km d’un bord à l’autre',
          keeps: 'les quartiers, la gare, le centre et les lignes principales',
          simplifies: 'les passages piétons et les petites rues'
        }
      ],
      tickets: [
        {
          id: 'district-station',
          short: 'quartier ↔ gare',
          question: 'Où se situe la gare dans la ville par rapport au quartier des Cerisiers ?',
          correctWindow: 'wide',
          wrongFeedback:
            'La vue du quartier détaille les rues proches, mais la gare se trouve hors de son étendue. La relation entre quartier et gare ne tient pas dans ce cadrage.',
          correctReason:
            'La vue de la ville contient à la fois le quartier des Cerisiers et la gare, même si elle montre moins de petites rues.',
          scaffold:
            'La demande relie une partie de la ville à un grand repère extérieur au quartier.'
        },
        {
          id: 'crossing-park',
          short: 'place ↔ parc',
          question: 'Quel passage piéton permet de traverser entre la place et le parc ?',
          correctWindow: 'near',
          wrongFeedback:
            'La ville contient bien la place et le parc, mais elle simplifie les passages piétons. Le petit aménagement demandé n’y reste pas visible.',
          correctReason:
            'Le quartier suffit pour contenir la place et le parc et conserve le détail des passages piétons.',
          scaffold:
            'Les lieux tiennent dans les deux vues. Départage-les avec le niveau de détail : cherche un passage piéton.'
        },
        {
          id: 'district-centre-line',
          short: 'quartier ↔ centre',
          question: 'Quelle ligne principale relie les Cerisiers au centre-ville ?',
          correctWindow: 'wide',
          wrongFeedback:
            'Le cadrage du quartier ne va pas jusqu’au centre-ville. Il ne peut donc pas montrer la ligne principale sur tout son trajet.',
          correctReason:
            'Le réseau principal et ses deux extrémités sont visibles ensemble dans le cadrage de la ville.',
          scaffold:
            'Vérifie les deux extrémités de la liaison : quartier des Cerisiers et centre-ville.'
        },
        {
          id: 'sport-small-street',
          short: 'rue ↔ terrain',
          question: 'Quelle petite rue borde le terrain de sport ?',
          correctWindow: 'near',
          wrongFeedback:
            'La carte de la ville simplifie les petites rues autour des équipements. Elle couvre le lieu, mais pas le détail du bord demandé.',
          correctReason:
            'La petite rue et le terrain sont des détails du quartier, conservés dans le cadrage rapproché.',
          scaffold:
            'Ici, le mot décisif est « petite rue » : quelle fenêtre garde ce niveau de précision ?'
        }
      ],
      success:
        'La gare, le centre et les lignes principales exigent l’étendue de la ville. Les passages piétons et les petites rues exigent le détail du quartier.',
      nextPreview:
        'Le dernier aiguillage partira d’un marché local et suivra ses liens d’approvisionnement dans une région proche.',
      correctManifestFirst: true
    },
    {
      id: 'local-regional',
      folio: 'AIGUILLAGE 03',
      theme: 'Approvisionnement et échanges · région proche fictive',
      title: 'Du marché local à la région',
      context:
        'Le marché des Rives est fictif. Une fenêtre montre son organisation locale ; l’autre suit ses liens avec plusieurs communes et fermes de la région proche.',
      nesting: 'Le marché local appartient à une ville reliée aux autres espaces de la région proche.',
      windows: [
        {
          id: 'near',
          signal: 'R',
          level: 'Cadrage local rapproché',
          name: 'Échelle du marché',
          extent: 'environ 220 m autour de la halle',
          keeps: 'les allées, les entrées, le point de retrait et le quai de livraison',
          simplifies: 'les routes qui continuent vers les communes voisines'
        },
        {
          id: 'wide',
          signal: 'É',
          level: 'Cadrage régional élargi',
          name: 'Échelle de la région proche',
          extent: 'environ 38 km autour de la ville',
          keeps: 'plusieurs communes, les fermes, les routes principales et le marché',
          simplifies: 'les allées, les portes et les quais du marché'
        }
      ],
      tickets: [
        {
          id: 'pickup-entrance',
          short: 'entrée ↔ retrait',
          question: 'Par quelle entrée les paniers sont-ils retirés dans la halle ?',
          correctWindow: 'near',
          wrongFeedback:
            'La région situe le marché, mais elle ne conserve pas les portes de la halle. L’entrée de retrait est un détail local.',
          correctReason:
            'Le plan local du marché montre les entrées et le point de retrait à l’intérieur de la halle.',
          scaffold:
            'La demande porte sur une porte précise du marché, pas sur le trajet avant d’arriver en ville.'
        },
        {
          id: 'farms-roads',
          short: 'fermes ↔ marché',
          question: 'Quelles routes relient les fermes des communes voisines au marché ?',
          correctWindow: 'wide',
          wrongFeedback:
            'Le plan local s’arrête autour de la halle. Les fermes et les routes entre communes sont hors de son étendue.',
          correctReason:
            'La région proche contient les fermes, les communes et le marché, donc les liaisons d’approvisionnement peuvent y apparaître.',
          scaffold:
            'Pour suivre toute la liaison, la fenêtre doit dépasser la ville et contenir plusieurs communes.'
        },
        {
          id: 'supply-directions',
          short: 'secteurs ↔ trajets',
          question: 'De quels secteurs de la région arrivent les trois trajets d’approvisionnement ?',
          correctWindow: 'wide',
          wrongFeedback:
            'Autour de la halle, on voit l’arrivée des livraisons mais pas leurs secteurs d’origine dans la région.',
          correctReason:
            'Comparer plusieurs secteurs d’origine demande un cadrage régional qui les contient dans une même vue.',
          scaffold:
            'La question ne demande pas où le camion s’arrête, mais d’où viennent plusieurs trajets.'
        },
        {
          id: 'dock-hall',
          short: 'quai ↔ halle',
          question: 'Où se trouve le quai de livraison par rapport à la halle ?',
          correctWindow: 'near',
          wrongFeedback:
            'À l’échelle régionale, le quai et la halle se confondent dans le même symbole de marché. Leur position relative n’est plus lisible.',
          correctReason:
            'Le cadrage local garde séparés le quai et la halle et permet de lire leur position l’un par rapport à l’autre.',
          scaffold:
            'Il faut distinguer deux parties du même site, séparées de quelques dizaines de mètres.'
        }
      ],
      success:
        'Les entrées et le quai restent dans le cadrage local. Les fermes, les communes et l’origine des trajets demandent le cadrage régional, qui rend visibles les liens avec des espaces plus lointains.',
      nextPreview: 'Les trois couples d’échelles ont maintenant été comparés.',
      correctManifestFirst: false
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let current = cases[0];
  let placements: PlacementMap = {};
  let submittedPlacements: PlacementMap = {};
  let errorTicket: RequestTicket | null = null;
  let announcement = '';
  let stateFocusTarget: HTMLElement | null = null;

  function legacyState(): 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' {
    if (phase === 'intro') return 'ready';
    if (phase === 'active' || phase === 'retry') return 'question';
    return phase;
  }

  function scaleWindow(windowId: WindowId): ScaleWindow {
    return current.windows.find((window) => window.id === windowId) ?? current.windows[0];
  }

  function otherWindow(windowId: WindowId): WindowId {
    return windowId === 'near' ? 'wide' : 'near';
  }

  function routedTickets(windowId: WindowId, source: PlacementMap = placements): RequestTicket[] {
    return current.tickets.filter((ticket) => source[ticket.id] === windowId);
  }

  function routedCount(): number {
    return current.tickets.filter((ticket) => placements[ticket.id]).length;
  }

  function routesComplete(source: PlacementMap = placements): boolean {
    return current.tickets.every((ticket) => Boolean(source[ticket.id]));
  }

  function authoredPlacements(kind: AnswerKind): PlacementMap {
    return Object.fromEntries(
      current.tickets.map((ticket) => [
        ticket.id,
        kind === 'correct' ? ticket.correctWindow : otherWindow(ticket.correctWindow)
      ])
    ) as PlacementMap;
  }

  function manifestKinds(): AnswerKind[] {
    return current.correctManifestFirst ? ['correct', 'incorrect'] : ['incorrect', 'correct'];
  }

  function manifestNumbers(kind: AnswerKind, windowId: WindowId): string {
    const candidate = authoredPlacements(kind);
    return current.tickets
      .map((ticket, index) => (candidate[ticket.id] === windowId ? String(index + 1) : ''))
      .filter(Boolean)
      .join(' · ');
  }

  function submittedWindow(ticket: RequestTicket): ScaleWindow {
    return scaleWindow(submittedPlacements[ticket.id] ?? otherWindow(ticket.correctWindow));
  }

  async function focusState(): Promise<void> {
    await tick();
    stateFocusTarget?.focus();
  }

  async function startPractice(): Promise<void> {
    currentIndex = 0;
    current = cases[0];
    placements = {};
    submittedPlacements = {};
    errorTicket = null;
    phase = 'active';
    announcement = 'Premier aiguillage ouvert : appartement et quartier. Route les quatre demandes.';
    await focusState();
  }

  function routeTicket(ticket: RequestTicket, windowId: WindowId): void {
    if (phase !== 'active' && phase !== 'retry') return;
    placements = { ...placements, [ticket.id]: windowId };
    const count = routedCount();
    announcement = `Demande ${current.tickets.indexOf(ticket) + 1} envoyée vers ${scaleWindow(windowId).name}. ${count} demande${count > 1 ? 's' : ''} sur ${current.tickets.length} ${count > 1 ? 'sont maintenant routées' : 'est maintenant routée'}.`;
  }

  async function evaluateRoutes(response: PlacementMap): Promise<void> {
    if (!routesComplete(response) || (phase !== 'active' && phase !== 'retry')) return;

    const snapshot = { ...response };
    placements = snapshot;
    submittedPlacements = snapshot;
    const mismatch = current.tickets.find(
      (ticket) => snapshot[ticket.id] !== ticket.correctWindow
    );

    if (mismatch) {
      errorTicket = mismatch;
      phase = 'incorrect';
      announcement = `L’aiguillage de la demande ${current.tickets.indexOf(mismatch) + 1} est à revoir. Le routage soumis reste affiché.`;
    } else {
      errorTicket = null;
      phase = 'correct';
      announcement = `Les quatre demandes utilisent un cadrage cohérent dans le dossier « ${current.title} ». Lis l’explication avant de continuer.`;
    }
    await focusState();
  }

  async function submitRoutes(): Promise<void> {
    await evaluateRoutes(placements);
  }

  async function submitManifest(kind: AnswerKind): Promise<void> {
    await evaluateRoutes(authoredPlacements(kind));
  }

  async function retryRouting(): Promise<void> {
    phase = 'retry';
    announcement = 'Le routage est conservé. Utilise les deux filtres sur la demande signalée, puis modifie les tickets nécessaires.';
    await focusState();
  }

  async function continuePractice(): Promise<void> {
    if (currentIndex === cases.length - 1) {
      phase = 'complete';
      announcement = 'Les trois aiguillages sont terminés. La stratégie d’échelle est résumée.';
      await focusState();
      return;
    }

    currentIndex += 1;
    current = cases[currentIndex];
    placements = {};
    submittedPlacements = {};
    errorTicket = null;
    phase = 'active';
    announcement = `Aiguillage ${currentIndex + 1} sur ${cases.length} : ${current.title}.`;
    await focusState();
  }

  async function restartPractice(): Promise<void> {
    currentIndex = 0;
    current = cases[0];
    placements = {};
    submittedPlacements = {};
    errorTicket = null;
    phase = 'intro';
    announcement = 'Retour à l’introduction.';
    await focusState();
  }
</script>

<svelte:head>
  <title>L’aiguillage des deux échelles · EX-0313</title>
  <meta
    name="description"
    content="Pratique de géographie : choisir une échelle en coordonnant étendue et détail utile."
  />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0313"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState()}
>
  <main class="scale-dispatch" data-smoke-contract="6h-v1" data-exercise-id="EX-0313">
    <p class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>

    <header class="masthead">
      <a class="brand" href="#dispatch-content" aria-label="Aller au contenu de l’aiguillage">
        <span aria-hidden="true">↗↘</span>
        <span><small>ATELIER GÉO</small><strong>ÉCHELLES / 2</strong></span>
      </a>
      {#if phase !== 'intro' && phase !== 'complete'}
        <div class="case-progress" aria-label={`Aiguillage ${currentIndex + 1} sur ${cases.length}`}>
          {#each cases as item, index}
            <span class:done={index < currentIndex} class:current={index === currentIndex}>
              <b aria-hidden="true">{index < currentIndex ? '✓' : index + 1}</b>
              <span class="sr-only">{item.title} : {index < currentIndex ? 'terminé' : index === currentIndex ? 'en cours' : 'à venir'}</span>
            </span>
          {/each}
        </div>
      {:else}
        <span class="session-label">3 couples · 12 demandes</span>
      {/if}
    </header>

    <div id="dispatch-content">
      {#if phase === 'intro'}
        <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
          <div class="intro-copy">
            <p class="overline">Pratique variée · trois aiguillages</p>
            <h1 id="intro-title" tabindex="-1" bind:this={stateFocusTarget}>Choisis la fenêtre qui montre juste ce qu’il faut.</h1>
            <p class="intro-lead">
              Une échelle indique <strong>quelle étendue d’espace</strong> un document montre et
              <strong>quels détails</strong> y restent lisibles. Aiguille chaque demande vers la
              fenêtre qui peut vraiment y répondre.
            </p>

            <div class="method-card" aria-label="La stratégie en deux filtres">
              <div>
                <span>1</span>
                <p><strong>CONTENIR</strong> La fenêtre couvre-t-elle tous les lieux cités&nbsp;?</p>
              </div>
              <div>
                <span>2</span>
                <p><strong>PRÉCISER</strong> Garde-t-elle le détail exact demandé&nbsp;?</p>
              </div>
            </div>

            <p class="control-copy">
              Choisis un bouton sous chaque ticket, observe les deux piles, puis soumets tout le
              routage. Avec le clavier&nbsp;: <kbd>Tab</kbd>, puis <kbd>Entrée</kbd> ou <kbd>Espace</kbd>.
              Aucun glisser-déposer ni chronomètre.
            </p>

            <button class="signal-button" type="button" data-smoke-action="start" onclick={startPractice}>
              Ouvrir l’aiguillage 01 <span aria-hidden="true">→</span>
            </button>
          </div>

          <aside class="intro-console" aria-label="Exemple visuel des deux cadrages">
            <div class="console-label"><span>APERÇU</span><b>ÉTENDUE / DÉTAIL</b></div>
            <div class="scope-demo" aria-hidden="true">
              <div class="wide-frame"><span>quartier</span><div class="near-frame"><span>appartement</span><i></i></div></div>
            </div>
            <dl>
              <div><dt>Fenêtre rapprochée</dt><dd>moins d’espace · plus de petits détails</dd></div>
              <div><dt>Fenêtre élargie</dt><dd>plus d’espace · détails simplifiés</dd></div>
            </dl>
            <p>
              Attention&nbsp;: la fenêtre la plus étendue n’est pas toujours la plus utile. Il faut
              coordonner les deux filtres.
            </p>
          </aside>
        </section>
      {:else if phase === 'active' || phase === 'retry'}
        <section
          class="activity"
          data-smoke-state={phase}
          data-smoke-variation={current.id}
          aria-labelledby="mission-title"
        >
          <header class="mission-header">
            <div class="folio-block"><span>{current.folio}</span><b>{currentIndex + 1} / {cases.length}</b></div>
            <div>
              <p class="overline">{current.theme}</p>
              <h1 id="mission-title" tabindex="-1" bind:this={stateFocusTarget}>{current.title}</h1>
              <p>{current.context}</p>
            </div>
          </header>

          <div class="invariant-bar">
            <span>STRATÉGIE INVARIANTE</span>
            <p><b>1. Contenir tous les lieux</b><i aria-hidden="true">→</i><b>2. Conserver le détail demandé</b></p>
          </div>

          {#if phase === 'retry' && errorTicket}
            <aside class="retry-panel" role="status" aria-labelledby="retry-title">
              <div class="retry-mark" aria-hidden="true">↺</div>
              <div>
                <p class="overline">Reprise ciblée · routage conservé</p>
                <h2 id="retry-title">Repasse la demande {current.tickets.indexOf(errorTicket) + 1} dans les deux filtres.</h2>
                <blockquote>«&nbsp;{errorTicket.question}&nbsp;»</blockquote>
                <ol>
                  <li><strong>Étendue :</strong> {errorTicket.scaffold}</li>
                  <li><strong>Détail :</strong> compare ce besoin avec «&nbsp;conserve&nbsp;» et «&nbsp;simplifie&nbsp;» sur les deux fenêtres.</li>
                </ol>
                <p class="previous-route">
                  Essai précédent&nbsp;: <strong>{submittedWindow(errorTicket).name}</strong>. Modifie seulement ce qui te paraît nécessaire.
                </p>
              </div>
            </aside>
          {/if}

          <section class="window-comparison" aria-labelledby="windows-title">
            <div class="section-heading">
              <div><p class="overline">Référentiel de mission</p><h2 id="windows-title">Compare les deux fenêtres disponibles.</h2></div>
              <p class="nesting-note"><span aria-hidden="true">⊂</span>{current.nesting}</p>
            </div>
            <div class="window-grid">
              {#each current.windows as window}
                <article class:near-window={window.id === 'near'} class:wide-window={window.id === 'wide'}>
                  <header><span class="window-signal" aria-hidden="true">{window.signal}</span><div><small>{window.level}</small><h3>{window.name}</h3></div></header>
                  <div class="extent-meter" aria-hidden="true"><i></i><i></i><i></i><span>{window.id === 'near' ? 'FOCUS' : 'ÉTENDUE'}</span></div>
                  <dl>
                    <div><dt>Étendue couverte</dt><dd>{window.extent}</dd></div>
                    <div><dt>Conserve</dt><dd>{window.keeps}</dd></div>
                    <div><dt>Simplifie</dt><dd>{window.simplifies}</dd></div>
                  </dl>
                </article>
              {/each}
            </div>
          </section>

          <div class="workbench">
            <section class="ticket-deck" aria-labelledby="tickets-title">
              <div class="deck-heading">
                <div><p class="overline">Tickets d’information</p><h2 id="tickets-title">Aiguille les quatre demandes.</h2></div>
                <span class:ready={routesComplete()}><b>{routedCount()} / {current.tickets.length}</b>{routesComplete() ? 'prêtes' : 'routées'}</span>
              </div>

              <div class="tickets">
                {#each current.tickets as ticket, ticketIndex}
                  <fieldset class:routed={Boolean(placements[ticket.id])}>
                    <legend><span>DEMANDE {ticketIndex + 1}</span>{ticket.question}</legend>
                    <p class="ticket-short"><span aria-hidden="true">⌖</span>{ticket.short}</p>
                    <div class="route-controls">
                      {#each current.windows as window}
                        <button
                          type="button"
                          class:selected={placements[ticket.id] === window.id}
                          aria-pressed={placements[ticket.id] === window.id}
                          aria-label={`Demande ${ticketIndex + 1} : envoyer vers ${window.name}`}
                          data-smoke-attempt={window.id === ticket.correctWindow ? 'correct' : 'incorrect'}
                          data-smoke-step={String(ticketIndex + 1)}
                          onclick={() => routeTicket(ticket, window.id)}
                        >
                          <span class="route-arrow" aria-hidden="true">{window.id === 'near' ? '↙' : '↘'}</span>
                          <span><small>Vers</small><strong>{window.name}</strong></span>
                          {#if placements[ticket.id] === window.id}
                            <b class="selected-copy"><span aria-hidden="true">✓</span> envoyée ici</b>
                          {/if}
                        </button>
                      {/each}
                    </div>
                  </fieldset>
                {/each}
              </div>
            </section>

            <aside class="routing-board" aria-labelledby="routing-title">
              <div class="board-top"><span>TABLEAU DE ROUTAGE</span><b>{current.folio.slice(-2)}</b></div>
              <h2 id="routing-title">Tes piles en direct</h2>
              <p>Vérifie si chaque fenêtre devra porter une information qu’elle conserve réellement.</p>

              <div class="route-piles" aria-live="polite">
                {#each current.windows as window}
                  <section aria-label={`Demandes envoyées vers ${window.name}`}>
                    <header><span>{window.signal}</span><strong>{window.name}</strong><b>{routedTickets(window.id).length}</b></header>
                    {#if routedTickets(window.id).length > 0}
                      <ol>
                        {#each routedTickets(window.id) as ticket}
                          <li><span>{current.tickets.indexOf(ticket) + 1}</span><p>{ticket.short}</p></li>
                        {/each}
                      </ol>
                    {:else}
                      <p class="empty-pile">Aucune demande aiguillée ici.</p>
                    {/if}
                  </section>
                {/each}
              </div>

              <div class="submit-panel">
                <p>
                  {routesComplete()
                    ? 'Les quatre tickets sont routés. Relis les deux piles avant de soumettre.'
                    : `Il reste ${current.tickets.length - routedCount()} ticket${current.tickets.length - routedCount() > 1 ? 's' : ''} à aiguiller.`}
                </p>
                <button
                  class="submit-button"
                  type="button"
                  disabled={!routesComplete()}
                  data-smoke-action={routesComplete() ? 'submit' : undefined}
                  onclick={submitRoutes}
                >
                  Soumettre tout le routage <span aria-hidden="true">↗</span>
                </button>
              </div>
            </aside>
          </div>

          <aside class="manifest-comparison" aria-labelledby="manifest-title">
            <div>
              <p class="overline">Mode tournée complète</p>
              <h2 id="manifest-title">Tu préfères comparer deux routages d’ensemble&nbsp;?</h2>
              <p>
                Chaque fiche ci-dessous route les quatre mêmes demandes. Choisir une fiche la soumet directement au même contrôle que la table.
              </p>
            </div>
            <div class="manifest-grid">
              {#each manifestKinds() as kind, manifestIndex}
                <button type="button" data-smoke-answer={kind} onclick={() => submitManifest(kind)}>
                  <span class="manifest-name">TOURNÉE {manifestIndex === 0 ? 'A' : 'B'}</span>
                  <span><b>{current.windows[0].name}</b><small>Demandes {manifestNumbers(kind, 'near')}</small></span>
                  <span><b>{current.windows[1].name}</b><small>Demandes {manifestNumbers(kind, 'wide')}</small></span>
                  <strong class="manifest-action">Choisir et envoyer <span aria-hidden="true">→</span></strong>
                </button>
              {/each}
            </div>
          </aside>
        </section>
      {:else if phase === 'incorrect' && errorTicket}
        <section
          class="feedback-state incorrect-state"
          data-smoke-state="incorrect"
          data-smoke-variation={current.id}
          aria-labelledby="incorrect-title"
        >
          <header class="feedback-header">
            <div class="feedback-symbol" aria-hidden="true">!</div>
            <div>
              <p class="overline">{current.folio} · routage conservé</p>
              <h1 id="incorrect-title" tabindex="-1" bind:this={stateFocusTarget}>Une fenêtre ne porte pas l’information demandée.</h1>
            </div>
          </header>

          <div
            class="feedback-card"
            role="status"
            aria-live="polite"
            data-smoke-feedback="incorrect"
            data-smoke-feedback-detail="specific"
          >
            <span>DEMANDE {current.tickets.indexOf(errorTicket) + 1} · À REVOIR</span>
            <blockquote>«&nbsp;{errorTicket.question}&nbsp;»</blockquote>
            <p>
              Tu l’as envoyée vers <strong>{submittedWindow(errorTicket).name}</strong>.
              {errorTicket.wrongFeedback}
            </p>
          </div>

          <div class="submitted-board" aria-label="Routage soumis">
            <h2>Routage envoyé</h2>
            <div>
              {#each current.windows as window}
                <section>
                  <span>{window.signal}</span>
                  <h3>{window.name}</h3>
                  <ol>
                    {#each routedTickets(window.id, submittedPlacements) as ticket}
                      <li class:is-error={ticket.id === errorTicket.id}>
                        <b>{current.tickets.indexOf(ticket) + 1}</b>{ticket.short}
                        {#if ticket.id === errorTicket.id}<em>à revoir</em>{/if}
                      </li>
                    {/each}
                  </ol>
                </section>
              {/each}
            </div>
          </div>

          <div class="feedback-footer">
            <p>
              La reprise garde les quatre routes. Elle ajoute deux questions pour la demande signalée sans remplir sa destination.
            </p>
            <button class="signal-button" type="button" data-smoke-action="retry" onclick={retryRouting}>
              Reprendre avec les deux filtres <span aria-hidden="true">↺</span>
            </button>
          </div>
        </section>
      {:else if phase === 'correct'}
        <div class="correct-stack">
          <section
            class="feedback-state correct-state"
            data-smoke-state="correct"
            data-smoke-variation={current.id}
            aria-labelledby="correct-title"
          >
            <header class="feedback-header">
              <div class="feedback-symbol" aria-hidden="true">✓</div>
              <div>
                <p class="overline">{current.folio} · deux piles cohérentes</p>
                <h1 id="correct-title" tabindex="-1" bind:this={stateFocusTarget}>Chaque fenêtre conserve une information utile.</h1>
              </div>
            </header>

            <div
              class="correct-message"
              role="status"
              aria-live="polite"
              data-smoke-feedback="correct"
              data-smoke-feedback-detail="specific"
            >
              <span aria-hidden="true">✓</span>
              <p>{current.success}</p>
            </div>

            <div class="resolved-routing">
              {#each current.windows as window}
                <section>
                  <header><span>{window.signal}</span><div><small>{window.level}</small><h2>{window.name}</h2></div></header>
                  <ol>
                    {#each current.tickets.filter((ticket) => ticket.correctWindow === window.id) as ticket}
                      <li>
                        <span>{current.tickets.indexOf(ticket) + 1}</span>
                        <div><strong>{ticket.question}</strong><p>{ticket.correctReason}</p></div>
                      </li>
                    {/each}
                  </ol>
                </section>
              {/each}
            </div>

            <aside class="takeaway">
              <span>RÈGLE DE LA RÉGIE</span>
              <p>Une vue utile doit <strong>contenir tous les lieux cités</strong> sans perdre <strong>le détail précis demandé</strong>.</p>
            </aside>
          </section>

          <section
            class="continuation"
            data-smoke-state="continuation"
            data-smoke-variation={current.id}
            aria-label="Continuer après le retour"
          >
            <div><span>{currentIndex === cases.length - 1 ? 'Trois aiguillages cohérents' : 'Variation suivante'}</span><p>{current.nextPreview}</p></div>
            <button class="signal-button" type="button" data-smoke-action="continue" onclick={continuePractice}>
              {currentIndex === cases.length - 1 ? 'Afficher la règle finale' : 'Charger le couple suivant'}
              <span aria-hidden="true">→</span>
            </button>
          </section>
        </div>
      {:else}
        <section class="completion" data-smoke-state="complete" aria-labelledby="complete-title">
          <div class="completion-route" aria-hidden="true"><span>APP.</span><i></i><span>QUART.</span><i></i><span>VILLE</span><i></i><span>RÉGION</span></div>
          <p class="overline">Régie fermée · trois couples parcourus</p>
          <h1 id="complete-title" tabindex="-1" bind:this={stateFocusTarget}>La bonne échelle dépend de la question.</h1>

          <div class="completion-summary" data-smoke-completion>
            <p>
              Tu as utilisé la même stratégie de l’appartement à la région proche&nbsp;:
              <strong>couvrir tous les lieux nécessaires, puis vérifier que le détail utile reste visible.</strong>
            </p>
          </div>

          <div class="final-filters">
            <article><span>01</span><h2>Étendue</h2><p>Le document doit contenir tous les lieux et tout le trajet cités.</p></article>
            <article><span>02</span><h2>Détail</h2><p>Le document doit garder l’information précise qui permet de répondre.</p></article>
            <article><span>03</span><h2>Choix</h2><p>Une vue plus étendue n’est pas automatiquement plus utile qu’une vue rapprochée.</p></article>
          </div>

          <p class="completion-note">
            Cette pratique terminée ne prouve pas que tout est acquis. Avec un nouveau document, il faudra encore identifier son étendue et les informations qu’il conserve.
          </p>
          <button class="secondary-button" type="button" onclick={restartPractice}>Reprendre les aiguillages</button>
        </section>
      {/if}
    </div>
  </main>
</div>

<style>
  .legacy-smoke-root,
  .legacy-smoke-root * {
    box-sizing: border-box;
  }

  .legacy-smoke-root {
    width: 100%;
    min-width: 0;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    background: #10262b;
  }

  .scale-dispatch {
    --night: #10262b;
    --night-soft: #1d3a3f;
    --paper: #f7f1df;
    --paper-bright: #fffdf5;
    --ink: #172f34;
    --muted: #5b6b6d;
    --line: #9aa5a1;
    --orange: #d95732;
    --orange-dark: #8d321e;
    --cyan: #2c8ca0;
    --cyan-dark: #12576a;
    --lime: #d5e45a;
    width: 100%;
    min-width: 0;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background:
      linear-gradient(90deg, rgba(213, 228, 90, 0.045) 1px, transparent 1px),
      linear-gradient(rgba(213, 228, 90, 0.045) 1px, transparent 1px),
      var(--night);
    background-size: 34px 34px;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.5;
  }

  .scale-dispatch button,
  .scale-dispatch a {
    font: inherit;
    touch-action: manipulation;
  }

  .scale-dispatch button {
    min-height: 48px;
  }

  .scale-dispatch button:focus-visible,
  .scale-dispatch a:focus-visible,
  .scale-dispatch [tabindex="-1"]:focus {
    outline: 4px solid #ffd43b;
    outline-offset: 4px;
  }

  .scale-dispatch h1,
  .scale-dispatch h2,
  .scale-dispatch h3,
  .scale-dispatch p,
  .scale-dispatch blockquote,
  .scale-dispatch ol,
  .scale-dispatch dl,
  .scale-dispatch dd {
    margin-top: 0;
  }

  .scale-dispatch h1,
  .scale-dispatch h2,
  .scale-dispatch h3,
  .scale-dispatch p,
  .scale-dispatch blockquote,
  .scale-dispatch dd,
  .scale-dispatch button,
  .scale-dispatch span {
    overflow-wrap: anywhere;
  }

  .masthead {
    display: flex;
    width: min(1220px, calc(100% - 28px));
    min-height: 72px;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(247, 241, 223, 0.35);
    color: var(--paper);
  }

  .brand {
    display: flex;
    min-height: 48px;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;
  }

  .brand > span:first-child {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border: 2px solid var(--lime);
    color: var(--lime);
    font-weight: 900;
  }

  .brand > span:last-child {
    display: grid;
  }

  .brand small,
  .session-label,
  .overline,
  .console-label,
  .board-top,
  .manifest-name,
  .takeaway > span {
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .brand strong {
    letter-spacing: 0.06em;
  }

  .session-label {
    color: #c5d1cd;
  }

  .case-progress {
    display: flex;
    gap: 9px;
  }

  .case-progress > span {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border: 1px solid #75878a;
    color: #cbd7d4;
  }

  .case-progress > span.current {
    border: 3px double var(--lime);
    color: var(--night);
    background: var(--lime);
  }

  .case-progress > span.done {
    border-color: var(--cyan);
    color: white;
    background: var(--cyan-dark);
  }

  #dispatch-content {
    width: 100%;
  }

  .intro,
  .activity,
  .feedback-state,
  .completion,
  .continuation {
    width: min(1180px, calc(100% - 28px));
    margin-inline: auto;
  }

  .intro {
    display: grid;
    min-height: calc(100vh - 114px);
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    align-items: center;
    gap: clamp(28px, 6vw, 88px);
    padding: clamp(34px, 7vw, 86px) 0;
    color: var(--paper);
  }

  .overline {
    margin-bottom: 8px;
    color: var(--orange);
  }

  .intro h1,
  .mission-header h1,
  .feedback-header h1,
  .completion h1 {
    margin-bottom: 18px;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 0.98;
    text-wrap: balance;
  }

  .intro h1 {
    max-width: 820px;
    font-size: clamp(3rem, 7vw, 6.6rem);
  }

  .intro-lead {
    max-width: 710px;
    margin-bottom: 26px;
    color: #d4dfdc;
    font-size: clamp(1.05rem, 2vw, 1.3rem);
  }

  .method-card {
    display: grid;
    max-width: 760px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 22px;
    border: 1px solid #65787a;
    background: rgba(247, 241, 223, 0.06);
  }

  .method-card > div {
    display: grid;
    grid-template-columns: 46px 1fr;
    align-items: center;
    gap: 12px;
    padding: 15px;
  }

  .method-card > div + div {
    border-left: 1px solid #65787a;
  }

  .method-card span {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    color: var(--night);
    background: var(--lime);
    font-weight: 950;
  }

  .method-card p {
    margin-bottom: 0;
    color: #e5ecea;
    font-size: 0.86rem;
  }

  .method-card strong {
    display: block;
    color: var(--lime);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
  }

  .control-copy {
    max-width: 720px;
    color: #bdccca;
    font-size: 0.88rem;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #809391;
    color: white;
    background: #213f45;
    font-family: ui-monospace, monospace;
  }

  .signal-button,
  .submit-button,
  .secondary-button {
    display: inline-flex;
    min-width: min(270px, 100%);
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 13px 20px;
    border: 2px solid var(--night);
    border-radius: 0;
    font-weight: 850;
    cursor: pointer;
  }

  .signal-button,
  .submit-button {
    color: white;
    background: var(--orange);
    box-shadow: 5px 5px 0 var(--lime);
  }

  .signal-button:hover,
  .submit-button:hover:not(:disabled) {
    background: var(--orange-dark);
  }

  .signal-button:active,
  .submit-button:active:not(:disabled) {
    box-shadow: 2px 2px 0 var(--lime);
    transform: translate(2px, 2px);
  }

  .intro .signal-button {
    border-color: var(--paper);
  }

  .intro-console {
    min-width: 0;
    border: 2px solid var(--paper);
    color: var(--ink);
    background: var(--paper);
    box-shadow: 13px 13px 0 var(--cyan);
  }

  .console-label,
  .board-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    color: white;
    background: var(--orange-dark);
  }

  .scope-demo {
    display: grid;
    min-height: 270px;
    place-items: center;
    padding: 25px;
    background:
      linear-gradient(rgba(18, 87, 106, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(18, 87, 106, 0.1) 1px, transparent 1px),
      #e8e2d2;
    background-size: 20px 20px;
  }

  .wide-frame {
    position: relative;
    display: grid;
    width: min(310px, 92%);
    aspect-ratio: 1.25;
    place-items: center;
    border: 4px solid var(--cyan-dark);
    background: repeating-linear-gradient(135deg, transparent 0 14px, rgba(44, 140, 160, 0.12) 14px 17px);
  }

  .wide-frame > span,
  .near-frame > span {
    position: absolute;
    top: 7px;
    left: 9px;
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .near-frame {
    position: relative;
    display: grid;
    width: 48%;
    aspect-ratio: 1;
    place-items: center;
    border: 5px double var(--orange);
    background: var(--paper-bright);
  }

  .near-frame i {
    width: 34%;
    height: 34%;
    border: 3px solid var(--night);
    background: var(--lime);
  }

  .intro-console dl {
    margin-bottom: 0;
    padding: 0 18px;
  }

  .intro-console dl > div {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #c6c0ae;
  }

  .intro-console dt {
    font-weight: 850;
  }

  .intro-console dd {
    margin-bottom: 0;
    color: var(--muted);
  }

  .intro-console > p {
    margin: 15px 18px 18px;
    padding-left: 12px;
    border-left: 5px solid var(--orange);
    color: var(--muted);
    font-size: 0.86rem;
  }

  .activity {
    padding: 30px 0 64px;
  }

  .mission-header {
    display: grid;
    grid-template-columns: 145px minmax(0, 1fr);
    gap: 24px;
    padding: clamp(20px, 4vw, 38px);
    border: 1px solid #798989;
    color: var(--paper);
    background: var(--night-soft);
  }

  .folio-block {
    display: flex;
    min-height: 112px;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    border: 2px solid var(--lime);
    color: var(--lime);
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .folio-block b {
    color: white;
    font-size: 1.5rem;
  }

  .mission-header h1 {
    margin-bottom: 10px;
    font-size: clamp(2.4rem, 6vw, 5rem);
  }

  .mission-header > div:last-child > p:last-child {
    max-width: 790px;
    margin-bottom: 0;
    color: #c8d4d1;
  }

  .invariant-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 12px clamp(16px, 4vw, 38px);
    color: var(--night);
    background: var(--lime);
  }

  .invariant-bar > span {
    font-size: 0.67rem;
    font-weight: 950;
    letter-spacing: 0.1em;
  }

  .invariant-bar p {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 0;
    font-size: 0.84rem;
  }

  .invariant-bar i {
    font-style: normal;
  }

  .retry-panel {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 18px;
    margin-top: 20px;
    padding: clamp(17px, 3vw, 27px);
    border: 3px double #ffb241;
    color: var(--ink);
    background: #fff0c7;
  }

  .retry-mark,
  .feedback-symbol {
    display: grid;
    width: 58px;
    height: 58px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--orange-dark);
    font-size: 1.9rem;
    font-weight: 950;
  }

  .retry-panel h2 {
    margin-bottom: 10px;
    font-family: Georgia, serif;
    font-size: clamp(1.45rem, 3vw, 2rem);
  }

  .retry-panel blockquote,
  .feedback-card blockquote {
    margin-bottom: 13px;
    padding: 10px 14px;
    border-left: 5px solid var(--orange);
    background: rgba(255, 255, 255, 0.62);
    font-family: Georgia, serif;
    font-size: 1.05rem;
  }

  .retry-panel ol {
    display: grid;
    gap: 7px;
    margin-bottom: 12px;
    padding-left: 22px;
  }

  .previous-route {
    margin-bottom: 0;
    padding: 10px;
    border: 1px dashed var(--orange-dark);
  }

  .window-comparison,
  .workbench,
  .manifest-comparison {
    margin-top: 20px;
  }

  .window-comparison {
    padding: clamp(18px, 4vw, 34px);
    background: var(--paper);
  }

  .section-heading,
  .deck-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 17px;
  }

  .section-heading h2,
  .deck-heading h2,
  .routing-board h2,
  .manifest-comparison h2,
  .submitted-board h2 {
    margin-bottom: 0;
    font-family: Georgia, serif;
    font-size: clamp(1.55rem, 3vw, 2.3rem);
    font-weight: 500;
    line-height: 1.05;
  }

  .nesting-note {
    display: flex;
    max-width: 480px;
    align-items: center;
    gap: 10px;
    margin-bottom: 0;
    padding: 10px 12px;
    border: 1px dashed var(--cyan-dark);
    color: var(--muted);
    background: #e5eff0;
    font-size: 0.82rem;
  }

  .nesting-note span {
    color: var(--cyan-dark);
    font-size: 1.45rem;
    font-weight: 900;
  }

  .window-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .window-grid article {
    min-width: 0;
    border: 2px solid var(--night);
    background: var(--paper-bright);
  }

  .window-grid article > header {
    display: flex;
    min-height: 74px;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    color: white;
    background: var(--cyan-dark);
  }

  .window-grid .wide-window > header {
    background: var(--night-soft);
  }

  .window-signal {
    display: grid;
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    place-items: center;
    border: 2px solid white;
    font-weight: 950;
  }

  .window-grid header small,
  .resolved-routing header small {
    display: block;
    color: #c8e4e8;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .window-grid h3 {
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  .extent-meter {
    position: relative;
    display: flex;
    height: 58px;
    align-items: center;
    justify-content: center;
    gap: 7px;
    overflow: hidden;
    border-bottom: 1px solid #b7b6aa;
    background: #e5e1d5;
  }

  .extent-meter i {
    display: block;
    border: 2px solid var(--cyan-dark);
  }

  .near-window .extent-meter i:nth-child(1) { width: 20px; height: 20px; background: var(--lime); }
  .near-window .extent-meter i:nth-child(2) { width: 32px; height: 32px; }
  .near-window .extent-meter i:nth-child(3) { width: 45px; height: 45px; opacity: 0.4; }
  .wide-window .extent-meter i:nth-child(1) { width: 18px; height: 18px; opacity: 0.4; }
  .wide-window .extent-meter i:nth-child(2) { width: 31px; height: 31px; }
  .wide-window .extent-meter i:nth-child(3) { width: 48px; height: 48px; border-width: 5px; background: rgba(213, 228, 90, 0.35); }

  .extent-meter span {
    margin-left: 10px;
    color: var(--cyan-dark);
    font-size: 0.65rem;
    font-weight: 950;
    letter-spacing: 0.09em;
  }

  .window-grid dl {
    margin-bottom: 0;
    padding: 0 15px 12px;
  }

  .window-grid dl > div {
    display: grid;
    grid-template-columns: minmax(110px, 0.36fr) minmax(0, 0.64fr);
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid #d2cec0;
  }

  .window-grid dl > div:last-child {
    border-bottom: 0;
  }

  .window-grid dt {
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .window-grid dd {
    margin-bottom: 0;
    color: var(--muted);
    font-size: 0.88rem;
  }

  .workbench {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
    gap: 20px;
    align-items: start;
  }

  .ticket-deck,
  .routing-board {
    min-width: 0;
    padding: clamp(17px, 3vw, 28px);
    background: var(--paper);
  }

  .deck-heading > span {
    flex: 0 0 auto;
    padding: 8px 11px;
    border: 1px solid var(--line);
    color: var(--muted);
    background: #ebe5d7;
    font-size: 0.75rem;
    text-align: center;
  }

  .deck-heading > span b {
    display: block;
    color: var(--ink);
    font-size: 1rem;
  }

  .deck-heading > span.ready {
    border-color: var(--cyan-dark);
    color: var(--cyan-dark);
    background: #d9edf0;
  }

  .tickets {
    display: grid;
    gap: 13px;
  }

  .tickets fieldset {
    min-width: 0;
    margin: 0;
    padding: 14px;
    border: 1px solid #a8aaa2;
    background: var(--paper-bright);
  }

  .tickets fieldset.routed {
    border: 2px solid var(--cyan-dark);
    box-shadow: inset 7px 0 0 var(--cyan);
  }

  .tickets legend {
    max-width: 100%;
    padding: 0 7px;
    font-family: Georgia, serif;
    font-size: 1.06rem;
    line-height: 1.35;
  }

  .tickets legend span {
    display: block;
    margin-bottom: 3px;
    color: var(--orange-dark);
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.09em;
  }

  .ticket-short {
    margin-bottom: 10px;
    color: var(--muted);
    font-size: 0.76rem;
  }

  .ticket-short span {
    margin-right: 6px;
    color: var(--orange);
  }

  .route-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .route-controls button {
    display: grid;
    min-width: 0;
    grid-template-columns: 34px minmax(0, 1fr);
    align-items: center;
    gap: 9px;
    padding: 10px;
    border: 2px solid #7e8988;
    color: var(--ink);
    background: #f0ede4;
    cursor: pointer;
    text-align: left;
  }

  .route-controls button:hover {
    border-color: var(--cyan-dark);
    background: #e3eff0;
  }

  .route-controls button.selected {
    border: 3px double var(--cyan-dark);
    background: #d4eaed;
    box-shadow: inset 0 -5px 0 var(--lime);
  }

  .route-arrow {
    color: var(--orange-dark);
    font-size: 1.45rem;
    font-weight: 950;
  }

  .route-controls button small,
  .route-controls button strong {
    display: block;
  }

  .route-controls button small {
    color: var(--muted);
    font-size: 0.63rem;
    text-transform: uppercase;
  }

  .route-controls button strong {
    font-size: 0.8rem;
    line-height: 1.25;
  }

  .selected-copy {
    grid-column: 1 / -1;
    padding-top: 5px;
    border-top: 1px solid var(--cyan-dark);
    color: var(--cyan-dark);
    font-size: 0.68rem;
    text-align: center;
  }

  .routing-board {
    position: sticky;
    top: 12px;
    border: 3px double var(--night);
    box-shadow: 8px 8px 0 var(--cyan);
  }

  .routing-board > p {
    color: var(--muted);
    font-size: 0.83rem;
  }

  .route-piles {
    display: grid;
    gap: 12px;
  }

  .route-piles > section {
    border: 1px solid var(--line);
    background: var(--paper-bright);
  }

  .route-piles header {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) 25px;
    align-items: center;
    gap: 8px;
    padding: 9px;
    color: white;
    background: var(--cyan-dark);
  }

  .route-piles section:nth-child(2) header {
    background: var(--night-soft);
  }

  .route-piles header > span,
  .route-piles header > b {
    display: grid;
    height: 28px;
    place-items: center;
    border: 1px solid white;
  }

  .route-piles header strong {
    font-size: 0.78rem;
  }

  .route-piles ol {
    display: grid;
    gap: 6px;
    margin-bottom: 0;
    padding: 9px;
    list-style: none;
  }

  .route-piles li {
    display: grid;
    grid-template-columns: 27px minmax(0, 1fr);
    align-items: center;
    gap: 7px;
    padding: 7px;
    border: 1px dashed #a4aaa5;
  }

  .route-piles li > span {
    display: grid;
    width: 25px;
    height: 25px;
    place-items: center;
    color: white;
    background: var(--orange-dark);
    font-size: 0.7rem;
    font-weight: 900;
  }

  .route-piles li p,
  .empty-pile {
    margin-bottom: 0;
    font-size: 0.76rem;
  }

  .empty-pile {
    padding: 12px;
    color: var(--muted);
    font-style: italic;
  }

  .submit-panel {
    margin: 17px -1px -1px;
    padding-top: 14px;
    border-top: 2px solid var(--night);
  }

  .submit-panel p {
    color: var(--muted);
    font-size: 0.78rem;
  }

  .submit-button {
    width: 100%;
    min-width: 0;
    border: 0;
  }

  .submit-button:disabled {
    color: #647071;
    background: #d5d3ca;
    box-shadow: none;
    cursor: not-allowed;
  }

  .manifest-comparison {
    display: grid;
    grid-template-columns: minmax(230px, 0.58fr) minmax(0, 1.42fr);
    gap: 20px;
    padding: clamp(17px, 3vw, 28px);
    border: 1px dashed #8ba0a0;
    color: var(--paper);
    background: #19363c;
  }

  .manifest-comparison > div:first-child > p:last-child {
    margin-bottom: 0;
    color: #c2cfcc;
    font-size: 0.82rem;
  }

  .manifest-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 11px;
  }

  .manifest-grid button {
    display: grid;
    min-width: 0;
    gap: 9px;
    padding: 13px;
    border: 2px solid var(--paper);
    color: var(--ink);
    background: var(--paper);
    cursor: pointer;
    text-align: left;
  }

  .manifest-grid button:hover {
    border-color: var(--lime);
    box-shadow: inset 0 0 0 3px var(--cyan);
  }

  .manifest-name {
    padding-bottom: 6px;
    border-bottom: 1px solid var(--line);
    color: var(--orange-dark);
  }

  .manifest-grid button > span:not(.manifest-name) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    font-size: 0.75rem;
  }

  .manifest-grid button small {
    align-self: start;
    padding: 2px 5px;
    color: white;
    background: var(--cyan-dark);
  }

  .manifest-action {
    padding-top: 6px;
    border-top: 1px solid var(--line);
    font-size: 0.8rem;
  }

  .feedback-state,
  .completion {
    margin-top: 34px;
    margin-bottom: 54px;
    padding: clamp(22px, 5vw, 50px);
    background: var(--paper);
    box-shadow: 11px 11px 0 var(--cyan);
  }

  .feedback-header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: 18px;
    margin-bottom: 24px;
  }

  .feedback-header h1,
  .completion h1 {
    max-width: 850px;
    font-size: clamp(2.3rem, 6vw, 4.8rem);
  }

  .feedback-card {
    max-width: 900px;
    padding: clamp(16px, 3vw, 24px);
    border: 3px double var(--orange-dark);
    background: #ffead5;
  }

  .feedback-card > span {
    display: block;
    margin-bottom: 9px;
    color: var(--orange-dark);
    font-size: 0.68rem;
    font-weight: 950;
    letter-spacing: 0.09em;
  }

  .feedback-card p {
    margin-bottom: 0;
  }

  .submitted-board {
    margin-top: 24px;
  }

  .submitted-board > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .submitted-board section {
    min-width: 0;
    padding: 14px;
    border: 1px solid var(--line);
    background: var(--paper-bright);
  }

  .submitted-board section > span {
    display: grid;
    width: 35px;
    height: 35px;
    place-items: center;
    color: white;
    background: var(--cyan-dark);
    font-weight: 900;
  }

  .submitted-board h3 {
    margin: 8px 0;
  }

  .submitted-board ol {
    display: grid;
    gap: 5px;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
  }

  .submitted-board li {
    display: grid;
    grid-template-columns: 27px minmax(0, 1fr) auto;
    gap: 7px;
    padding: 8px;
    border: 1px solid #d0cec4;
    font-size: 0.8rem;
  }

  .submitted-board li b {
    color: var(--orange-dark);
  }

  .submitted-board li.is-error {
    border: 2px dashed var(--orange-dark);
    background: #ffead5;
  }

  .submitted-board em {
    color: var(--orange-dark);
    font-size: 0.68rem;
    font-weight: 900;
  }

  .feedback-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    margin: 28px calc(clamp(22px, 5vw, 50px) * -1) calc(clamp(22px, 5vw, 50px) * -1);
    padding: 20px clamp(22px, 5vw, 50px);
    border-top: 1px solid var(--line);
    background: #e8e1d2;
  }

  .feedback-footer p {
    max-width: 610px;
    margin-bottom: 0;
    color: var(--muted);
  }

  .correct-stack {
    padding-bottom: 54px;
  }

  .correct-state .feedback-symbol {
    background: var(--cyan-dark);
  }

  .correct-message {
    display: grid;
    max-width: 930px;
    grid-template-columns: 42px minmax(0, 1fr);
    align-items: center;
    gap: 13px;
    padding: 17px;
    border: 2px solid var(--cyan-dark);
    background: #d9edf0;
  }

  .correct-message > span {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--cyan-dark);
    font-weight: 950;
  }

  .correct-message p {
    margin-bottom: 0;
  }

  .resolved-routing {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 24px;
  }

  .resolved-routing > section {
    min-width: 0;
    border: 2px solid var(--night);
    background: var(--paper-bright);
  }

  .resolved-routing > section > header {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 12px;
    color: white;
    background: var(--cyan-dark);
  }

  .resolved-routing > section:nth-child(2) > header {
    background: var(--night-soft);
  }

  .resolved-routing header > span {
    display: grid;
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
    place-items: center;
    border: 1px solid white;
    font-weight: 900;
  }

  .resolved-routing h2 {
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  .resolved-routing ol {
    display: grid;
    gap: 9px;
    margin-bottom: 0;
    padding: 13px;
    list-style: none;
  }

  .resolved-routing li {
    display: grid;
    grid-template-columns: 31px minmax(0, 1fr);
    gap: 9px;
    padding: 10px;
    border: 1px solid #cbc8bc;
  }

  .resolved-routing li > span {
    display: grid;
    width: 29px;
    height: 29px;
    place-items: center;
    color: white;
    background: var(--orange-dark);
    font-weight: 900;
  }

  .resolved-routing li strong {
    display: block;
    margin-bottom: 4px;
    font-family: Georgia, serif;
  }

  .resolved-routing li p {
    margin-bottom: 0;
    color: var(--muted);
    font-size: 0.82rem;
  }

  .takeaway {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 20px;
    padding: 14px;
    border: 2px dashed var(--orange-dark);
    background: #fff0cb;
  }

  .takeaway > span {
    flex: 0 0 auto;
    color: var(--orange-dark);
  }

  .takeaway p {
    margin-bottom: 0;
  }

  .continuation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    padding: 20px clamp(18px, 4vw, 34px);
    color: var(--paper);
    background: var(--night-soft);
    box-shadow: 11px 11px 0 var(--lime);
  }

  .continuation > div > span {
    color: var(--lime);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .continuation p {
    max-width: 650px;
    margin: 5px 0 0;
    color: #c5d2cf;
  }

  .completion {
    text-align: center;
  }

  .completion-route {
    display: flex;
    max-width: 680px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0 auto 26px;
  }

  .completion-route span {
    padding: 7px 8px;
    border: 1px solid var(--night);
    background: var(--paper-bright);
    font-size: 0.65rem;
    font-weight: 900;
  }

  .completion-route i {
    min-width: 18px;
    flex: 1;
    border-top: 4px dotted var(--cyan-dark);
  }

  .completion h1 {
    margin-inline: auto;
  }

  .completion-summary {
    max-width: 820px;
    margin: 0 auto;
    padding: 18px;
    border: 2px solid var(--cyan-dark);
    background: #d9edf0;
    font-size: 1.06rem;
  }

  .completion-summary p {
    margin-bottom: 0;
  }

  .final-filters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 26px 0;
    text-align: left;
  }

  .final-filters article {
    min-width: 0;
    padding: 15px;
    border: 1px solid var(--line);
    background: var(--paper-bright);
  }

  .final-filters article > span {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    color: white;
    background: var(--orange-dark);
    font-weight: 900;
  }

  .final-filters h2 {
    margin: 9px 0 5px;
    font-family: Georgia, serif;
  }

  .final-filters p {
    margin-bottom: 0;
    color: var(--muted);
    font-size: 0.86rem;
  }

  .completion-note {
    max-width: 760px;
    margin: 0 auto 22px;
    color: var(--muted);
  }

  .secondary-button {
    border-color: var(--night);
    color: var(--night);
    background: transparent;
  }

  .secondary-button:hover {
    color: white;
    background: var(--night);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (max-width: 850px) {
    .intro {
      grid-template-columns: minmax(0, 1fr);
    }

    .intro-console {
      width: min(620px, 100%);
    }

    .window-grid,
    .workbench,
    .resolved-routing {
      grid-template-columns: minmax(0, 1fr);
    }

    .routing-board {
      position: static;
    }

    .manifest-comparison {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 620px) {
    .masthead,
    .intro,
    .activity,
    .feedback-state,
    .completion,
    .continuation {
      width: calc(100% - 20px);
    }

    .masthead {
      min-height: 64px;
    }

    .brand > span:first-child {
      width: 42px;
      height: 42px;
    }

    .brand strong {
      font-size: 0.82rem;
    }

    .session-label {
      display: none;
    }

    .intro {
      min-height: auto;
      padding: 34px 0 46px;
    }

    .intro h1 {
      font-size: clamp(2.6rem, 14vw, 4.2rem);
    }

    .method-card,
    .manifest-grid,
    .submitted-board > div,
    .final-filters {
      grid-template-columns: minmax(0, 1fr);
    }

    .method-card > div + div {
      border-top: 1px solid #65787a;
      border-left: 0;
    }

    .mission-header {
      grid-template-columns: minmax(0, 1fr);
      gap: 15px;
      padding: 18px 15px;
    }

    .folio-block {
      min-height: 66px;
    }

    .invariant-bar,
    .section-heading,
    .deck-heading,
    .feedback-footer,
    .continuation,
    .takeaway {
      align-items: stretch;
      flex-direction: column;
    }

    .invariant-bar p {
      gap: 5px;
    }

    .section-heading,
    .deck-heading {
      display: flex;
    }

    .nesting-note {
      max-width: none;
    }

    .feedback-footer .signal-button,
    .continuation .signal-button {
      width: 100%;
      min-width: 0;
    }

    .feedback-header {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 460px) {
    .masthead,
    .intro,
    .activity,
    .feedback-state,
    .completion,
    .continuation {
      width: calc(100% - 18px);
    }

    .case-progress {
      gap: 5px;
    }

    .case-progress > span {
      width: 31px;
      height: 31px;
    }

    .scope-demo {
      min-height: 210px;
      padding: 14px;
    }

    .intro-console dl > div,
    .window-grid dl > div {
      grid-template-columns: minmax(0, 1fr);
      gap: 3px;
    }

    .activity {
      padding-top: 18px;
    }

    .mission-header h1,
    .feedback-header h1,
    .completion h1 {
      font-size: clamp(2.1rem, 12vw, 3.2rem);
    }

    .retry-panel {
      grid-template-columns: minmax(0, 1fr);
      padding: 14px;
    }

    .window-comparison,
    .ticket-deck,
    .routing-board,
    .manifest-comparison {
      padding: 14px 11px;
    }

    .window-grid article > header {
      align-items: flex-start;
    }

    .route-controls {
      grid-template-columns: minmax(0, 1fr);
    }

    .route-controls button {
      min-height: 58px;
    }

    .routing-board {
      box-shadow: 5px 5px 0 var(--cyan);
    }

    .manifest-grid button {
      min-height: 132px;
    }

    .feedback-state,
    .completion {
      margin-top: 18px;
      padding: 18px 14px;
      box-shadow: 5px 5px 0 var(--cyan);
    }

    .submitted-board li {
      grid-template-columns: 24px minmax(0, 1fr);
    }

    .submitted-board em {
      grid-column: 2;
    }

    .feedback-footer {
      margin: 22px -14px -18px;
      padding: 16px 14px;
    }

    .correct-message {
      grid-template-columns: minmax(0, 1fr);
    }

    .completion-route {
      flex-wrap: wrap;
    }

    .completion-route i {
      min-width: 10px;
      flex: 0 0 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scale-dispatch *,
    .scale-dispatch *::before,
    .scale-dispatch *::after {
      scroll-behavior: auto !important;
      transition: none !important;
      animation: none !important;
    }

    .signal-button:active,
    .submit-button:active:not(:disabled) {
      transform: none;
    }
  }
</style>
