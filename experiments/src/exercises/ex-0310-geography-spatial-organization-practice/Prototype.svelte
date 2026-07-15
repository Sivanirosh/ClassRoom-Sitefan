<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type LayerKind = 'boundary' | 'network' | 'effect';

  type MapCell = {
    id: string;
    coordinate: string;
    symbol: string;
    label: string;
  };

  type PlanOption = {
    id: string;
    label: string;
    detail: string;
    cells: string[];
  };

  type Selection = {
    boundary: string;
    network: string;
    effect: string;
  };

  type PlanStudy = {
    id: string;
    folio: string;
    title: string;
    context: string;
    mission: string;
    functionLabel: string;
    boundaryType: string;
    networkType: string;
    effectType: string;
    cells: MapCell[];
    boundaries: PlanOption[];
    networks: PlanOption[];
    effects: PlanOption[];
    correct: Selection;
    plannedWrong: Selection;
    feedback: Record<LayerKind, string>;
    scaffold: string;
    correctFeedback: string;
  };

  const studies: PlanStudy[] = [
    {
      id: 'cour-calme',
      folio: 'Plan 01 · loisirs et habitat',
      title: 'La cour des Mosaïques',
      context:
        'Une cour fictive est partagée par des jeux de ballon, une allée de passage et un espace de bancs.',
      mission:
        'Organise une zone calme autour des bancs. Depuis la porte, le réseau piéton ne doit pas traverser les jeux de ballon.',
      functionLabel: 'lire, discuter et attendre au calme',
      boundaryType: 'limite construite légère',
      networkType: 'réseau piéton',
      effectType: 'effet social sur les usages',
      cells: [
        { id: 'porte', coordinate: 'A1', symbol: '▣', label: 'porte' },
        { id: 'allee', coordinate: 'A2', symbol: '···', label: 'allée' },
        { id: 'ballon', coordinate: 'A3', symbol: '●', label: 'ballon' },
        { id: 'arbres', coordinate: 'B1', symbol: '♧', label: 'arbres' },
        { id: 'bancs', coordinate: 'B2', symbol: '═', label: 'bancs' },
        { id: 'table', coordinate: 'B3', symbol: '□', label: 'table' },
        { id: 'velos', coordinate: 'C1', symbol: '◇', label: 'vélos' },
        { id: 'pelouse', coordinate: 'C2', symbol: '≈', label: 'pelouse' },
        { id: 'sortie', coordinate: 'C3', symbol: '▤', label: 'sortie' }
      ],
      boundaries: [
        {
          id: 'mixed-use-block',
          label: 'Contour autour de l’allée, du ballon, des bancs et de la table',
          detail: 'Ce contour rassemble le passage, le jeu rapide et le repos dans une même zone.',
          cells: ['allee', 'ballon', 'bancs', 'table']
        },
        {
          id: 'quiet-pocket',
          label: 'Contour autour des arbres, des bancs, de la table et de la pelouse',
          detail: 'Une ligne au sol et des bacs bas rendent cette zone calme reconnaissable.',
          cells: ['arbres', 'bancs', 'table', 'pelouse']
        }
      ],
      networks: [
        {
          id: 'through-ball',
          label: 'Porte → jeux de ballon → bancs',
          detail: 'Le passage vers les bancs coupe l’espace utilisé pour le ballon.',
          cells: ['porte', 'ballon', 'bancs']
        },
        {
          id: 'edge-walk',
          label: 'Porte → allée → arbres → bancs',
          detail: 'Le chemin rejoint les bancs par le bord de la cour.',
          cells: ['porte', 'allee', 'arbres', 'bancs']
        }
      ],
      effects: [
        {
          id: 'magic-shortcut',
          label: 'Tous les trajets de la cour deviennent plus courts.',
          detail: 'Cette affirmation ne peut pas être déduite du contour et du chemin choisis.',
          cells: []
        },
        {
          id: 'fewer-crossings',
          label: 'Le passage vers les bancs évite les jeux de ballon.',
          detail: 'La fonction calme et la circulation rapide se croisent moins sur ce plan.',
          cells: []
        }
      ],
      correct: {
        boundary: 'quiet-pocket',
        network: 'edge-walk',
        effect: 'fewer-crossings'
      },
      plannedWrong: {
        boundary: 'mixed-use-block',
        network: 'through-ball',
        effect: 'magic-shortcut'
      },
      feedback: {
        boundary:
          'La zone envoyée mélange l’allée de passage, le ballon et les bancs. Une zone fonctionnelle regroupe ici les parties qui servent au même usage calme.',
        network:
          'Le réseau envoyé traverse les jeux de ballon avant d’atteindre les bancs. Il faut suivre les cases reliées et vérifier ce que le trajet coupe.',
        effect:
          'Le plan ne montre pas que tous les trajets raccourcissent. Un effet valable doit découler de la zone et du réseau réellement assemblés.'
      },
      scaffold:
        'Relis dans cet ordre : quelles cases servent au calme ? où passe le trajet depuis la porte ? quel effet ce trajet permet-il réellement d’affirmer ?',
      correctFeedback:
        'Les quatre cases de repos forment une zone fonctionnelle délimitée par un aménagement léger. L’allée rejoint les bancs par le bord : le passage évite ainsi les jeux de ballon.'
    },
    {
      id: 'jardins-bief',
      folio: 'Plan 02 · approvisionnement',
      title: 'Les jardins du Bief',
      context:
        'Trois planches cultivées d’un lieu fictif voisinent une prairie humide, un ruisselet et une lisière de saules.',
      mission:
        'Délimite la zone cultivée sans y inclure la prairie humide, puis relie la citerne aux trois planches.',
      functionLabel: 'cultiver et distribuer l’eau aux planches',
      boundaryType: 'limite naturelle et végétale',
      networkType: 'réseau d’eau',
      effectType: 'effet environnemental sur l’usage du sol',
      cells: [
        { id: 'citerne', coordinate: 'A1', symbol: '◉', label: 'citerne' },
        { id: 'rigole', coordinate: 'A2', symbol: '≋', label: 'rigole' },
        { id: 'prairie', coordinate: 'A3', symbol: '♒', label: 'prairie humide' },
        { id: 'planche-a', coordinate: 'B1', symbol: '▥', label: 'planche 1' },
        { id: 'planche-b', coordinate: 'B2', symbol: '▥', label: 'planche 2' },
        { id: 'ruisselet', coordinate: 'B3', symbol: '≈', label: 'ruisselet' },
        { id: 'planche-c', coordinate: 'C1', symbol: '▥', label: 'planche 3' },
        { id: 'cabanon', coordinate: 'C2', symbol: '⌂', label: 'cabanon' },
        { id: 'saules', coordinate: 'C3', symbol: '♧', label: 'saules' }
      ],
      boundaries: [
        {
          id: 'all-green',
          label: 'Contour autour des planches, de la prairie humide et du ruisselet',
          detail: 'Ce contour regroupe toutes les cases végétalisées ou liées à l’eau.',
          cells: ['planche-a', 'planche-b', 'planche-c', 'prairie', 'ruisselet']
        },
        {
          id: 'cultivated-plots',
          label: 'Contour autour des trois planches et du cabanon',
          detail: 'Le ruisselet et les saules marquent le bord de la zone cultivée.',
          cells: ['planche-a', 'planche-b', 'planche-c', 'cabanon']
        }
      ],
      networks: [
        {
          id: 'wet-loop',
          label: 'Citerne → prairie humide → ruisselet',
          detail: 'Cette liaison contourne les planches que la mission demande d’approvisionner.',
          cells: ['citerne', 'prairie', 'ruisselet']
        },
        {
          id: 'plot-channels',
          label: 'Citerne → rigole → planches 1, 2 et 3',
          detail: 'Les petites rigoles relient la réserve aux trois parties cultivées.',
          cells: ['citerne', 'rigole', 'planche-a', 'planche-b', 'planche-c']
        }
      ],
      effects: [
        {
          id: 'fourth-plot',
          label: 'La prairie humide devient une quatrième planche cultivée.',
          detail: 'Cet effet contredit la limite demandée et n’est pas montré par le réseau.',
          cells: []
        },
        {
          id: 'water-with-boundary',
          label: 'L’eau rejoint les trois planches et la prairie reste hors de la culture.',
          detail: 'Le réseau dessert la fonction choisie sans déplacer la limite naturelle.',
          cells: []
        }
      ],
      correct: {
        boundary: 'cultivated-plots',
        network: 'plot-channels',
        effect: 'water-with-boundary'
      },
      plannedWrong: {
        boundary: 'all-green',
        network: 'wet-loop',
        effect: 'fourth-plot'
      },
      feedback: {
        boundary:
          'Le contour envoyé rassemble des cases parce qu’elles paraissent vertes ou humides, mais la prairie et le ruisselet n’ont pas la fonction « cultiver ». La fonction, pas l’apparence, fixe la zone.',
        network:
          'La liaison envoyée va vers la prairie et le ruisselet sans atteindre les trois planches. Un réseau utile doit relier une ressource aux parties qui l’emploient.',
        effect:
          'Transformer la prairie en planche contredit la mission qui la garde hors de la zone cultivée. L’effet doit respecter à la fois la limite et le réseau.'
      },
      scaffold:
        'Ignore d’abord les symboles verts. Nomme les cases où l’on cultive, puis pars de la citerne et vérifie une à une les destinations de la liaison.',
      correctFeedback:
        'La fonction de culture réunit les trois planches et le cabanon ; le ruisselet et les saules servent de bord lisible. Le réseau de rigoles part de la citerne vers les planches, tandis que la prairie reste hors de cette zone.'
    },
    {
      id: 'halle-creneau',
      folio: 'Plan 03 · échanges',
      title: 'La halle du Créneau',
      context:
        'Une petite halle fictive reçoit des produits par une route régionale avant l’ouverture d’un marché piéton.',
      mission:
        'Délimite la zone de livraison utilisée de 6 h à 8 h, puis relie la route régionale à la porte de la halle sans passer entre les étals.',
      functionLabel: 'livrer avant le marché, puis libérer la place',
      boundaryType: 'limite marquée et temporelle',
      networkType: 'réseau de livraison local–régional',
      effectType: 'effet social et économique sur les circulations',
      cells: [
        { id: 'route', coordinate: 'A1', symbol: '⇢', label: 'route régionale' },
        { id: 'voie', coordinate: 'A2', symbol: '┄', label: 'voie latérale' },
        { id: 'place', coordinate: 'A3', symbol: '□', label: 'place' },
        { id: 'porte-halle', coordinate: 'B1', symbol: '▣', label: 'porte halle' },
        { id: 'quai', coordinate: 'B2', symbol: '▤', label: 'quai' },
        { id: 'etals', coordinate: 'B3', symbol: '▦', label: 'étals' },
        { id: 'velos', coordinate: 'C1', symbol: '◇', label: 'vélos' },
        { id: 'passage', coordinate: 'C2', symbol: '⋮', label: 'passage piéton' },
        { id: 'sortie-halle', coordinate: 'C3', symbol: '▣', label: 'sortie' }
      ],
      boundaries: [
        {
          id: 'market-wide',
          label: 'Contour permanent autour du quai, des étals et du passage piéton',
          detail: 'Ce contour mélange livraison et marché pendant toute la journée.',
          cells: ['quai', 'etals', 'passage', 'place']
        },
        {
          id: 'timed-loading',
          label: 'Hachures 6 h–8 h autour de la voie, de la porte et du quai',
          detail: 'Les marques au sol cessent de réserver cet espace après les livraisons.',
          cells: ['voie', 'porte-halle', 'quai']
        }
      ],
      networks: [
        {
          id: 'through-stalls',
          label: 'Route régionale → place → étals → halle',
          detail: 'Les véhicules traversent le cœur de l’espace piéton.',
          cells: ['route', 'place', 'etals', 'porte-halle']
        },
        {
          id: 'side-delivery',
          label: 'Route régionale → voie latérale → porte → quai',
          detail: 'La liaison régionale atteint la halle par son côté.',
          cells: ['route', 'voie', 'porte-halle', 'quai']
        }
      ],
      effects: [
        {
          id: 'same-time-crossing',
          label: 'Les véhicules et les piétons traversent les étals au même moment.',
          detail: 'Cet effet ne respecte ni le créneau horaire ni la séparation recherchée.',
          cells: []
        },
        {
          id: 'staged-use',
          label: 'Les livraisons atteignent le quai par la voie latérale pendant le créneau de 6 h à 8 h.',
          detail: 'La liaison évite les étals et la zone n’est réservée qu’aux heures indiquées.',
          cells: []
        }
      ],
      correct: {
        boundary: 'timed-loading',
        network: 'side-delivery',
        effect: 'staged-use'
      },
      plannedWrong: {
        boundary: 'market-wide',
        network: 'through-stalls',
        effect: 'same-time-crossing'
      },
      feedback: {
        boundary:
          'Le contour envoyé mélange quai, étals et passage de façon permanente. La mission décrit au contraire une zone de livraison limitée par des marques et par un horaire.',
        network:
          'La liaison envoyée traverse la place et les étals. Pour relier la route régionale à la halle sans couper le marché, il faut comparer les cases traversées.',
        effect:
          'Le croisement simultané des véhicules et des piétons ne suit pas le créneau 6 h–8 h. L’effet doit montrer ce que permettent ensemble l’horaire et la voie choisie.'
      },
      scaffold:
        'Suis deux repères séparément : où l’usage « livraison » commence-t-il et finit-il entre 6 h et 8 h ? quelles cases relient la route à la porte sans toucher les étals ?',
      correctFeedback:
        'Les hachures et l’horaire délimitent une zone de livraison temporaire autour de la voie, de la porte et du quai. Pendant ce créneau, la liaison latérale relie la route régionale au quai sans traverser les étals.'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentStudy: PlanStudy = studies[0];
  let boundaryChoice: string | null = null;
  let networkChoice: string | null = null;
  let effectChoice: string | null = null;
  let boundaryLayer: PlanOption | undefined;
  let networkLayer: PlanOption | undefined;
  let effectLayer: PlanOption | undefined;
  let submitted: Selection | null = null;
  let firstMismatch: LayerKind | null = null;
  let selectionComplete = false;
  let announcement = '';
  let stateFocusTarget: HTMLElement;
  let legacyState: 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' = 'ready';

  $: currentStudy = studies[currentIndex];
  $: boundaryLayer = currentStudy.boundaries.find((item) => item.id === boundaryChoice);
  $: networkLayer = currentStudy.networks.find((item) => item.id === networkChoice);
  $: effectLayer = currentStudy.effects.find((item) => item.id === effectChoice);
  $: selectionComplete = Boolean(boundaryChoice && networkChoice && effectChoice);
  $: legacyState =
    phase === 'intro'
      ? 'ready'
      : phase === 'active' || phase === 'retry'
        ? 'question'
        : phase;

  function focusStateSoon(): void {
    setTimeout(() => stateFocusTarget?.focus(), 0);
  }

  function optionsFor(kind: LayerKind): PlanOption[] {
    if (kind === 'boundary') return currentStudy.boundaries;
    if (kind === 'network') return currentStudy.networks;
    return currentStudy.effects;
  }

  function optionFor(kind: LayerKind, id: string | null | undefined): PlanOption | undefined {
    return optionsFor(kind).find((item) => item.id === id);
  }

  function selectedId(kind: LayerKind): string | null {
    if (kind === 'boundary') return boundaryChoice;
    if (kind === 'network') return networkChoice;
    return effectChoice;
  }

  function chooseLayer(kind: LayerKind, id: string): void {
    if (kind === 'boundary') boundaryChoice = id;
    if (kind === 'network') networkChoice = id;
    if (kind === 'effect') effectChoice = id;
    announcement = `${optionFor(kind, id)?.label ?? 'Calque'} ajouté au plan.`;
  }

  function smokeAttempt(kind: LayerKind, id: string): 'incorrect' | 'correct' | undefined {
    if (currentStudy.correct[kind] === id) return 'correct';
    if (currentStudy.plannedWrong[kind] === id) return 'incorrect';
    return undefined;
  }

  function smokeStep(kind: LayerKind, id: string): string | undefined {
    if (!smokeAttempt(kind, id)) return undefined;
    if (kind === 'boundary') return '1';
    if (kind === 'network') return '2';
    return '3';
  }

  function mismatchFor(selection: Selection): LayerKind | null {
    if (selection.boundary !== currentStudy.correct.boundary) return 'boundary';
    if (selection.network !== currentStudy.correct.network) return 'network';
    if (selection.effect !== currentStudy.correct.effect) return 'effect';
    return null;
  }

  function resolveSelection(selection: Selection): void {
    boundaryChoice = selection.boundary;
    networkChoice = selection.network;
    effectChoice = selection.effect;
    submitted = { ...selection };
    firstMismatch = mismatchFor(selection);
    phase = firstMismatch ? 'incorrect' : 'correct';
    announcement = firstMismatch
      ? `Un lien est à revoir sur ${currentStudy.title}. Le plan envoyé reste affiché.`
      : `Les trois calques de ${currentStudy.title} forment une organisation cohérente.`;
    focusStateSoon();
  }

  function submitAssembly(): void {
    if (!selectionComplete || !boundaryChoice || !networkChoice || !effectChoice) return;
    resolveSelection({
      boundary: boundaryChoice,
      network: networkChoice,
      effect: effectChoice
    });
  }

  function resolvePreset(kind: 'incorrect' | 'correct'): void {
    resolveSelection(kind === 'correct' ? currentStudy.correct : currentStudy.plannedWrong);
  }

  function clearWorkingLayers(): void {
    boundaryChoice = null;
    networkChoice = null;
    effectChoice = null;
  }

  function startPractice(): void {
    currentIndex = 0;
    submitted = null;
    firstMismatch = null;
    clearWorkingLayers();
    phase = 'active';
    announcement = `Premier plan ouvert : ${studies[0].title}. Assemble les trois calques.`;
    focusStateSoon();
  }

  function retryAssembly(): void {
    phase = 'retry';
    announcement = `Les trois calques restent posés. Modifie le lien signalé. ${currentStudy.scaffold}`;
    focusStateSoon();
  }

  function continuePractice(): void {
    if (currentIndex < studies.length - 1) {
      currentIndex += 1;
      submitted = null;
      firstMismatch = null;
      clearWorkingLayers();
      phase = 'active';
      announcement = `Nouveau plan : ${studies[currentIndex].title}. La limite, le réseau et l’effet changent.`;
    } else {
      phase = 'complete';
      announcement = 'Les trois plans ont été comparés. La stratégie commune est maintenant résumée.';
    }
    focusStateSoon();
  }

  function restartPractice(): void {
    currentIndex = 0;
    submitted = null;
    firstMismatch = null;
    clearWorkingLayers();
    phase = 'intro';
    announcement = 'Retour à la table des calques.';
    focusStateSoon();
  }

  function cellInBoundary(id: string): boolean {
    return Boolean(boundaryLayer?.cells.includes(id));
  }

  function cellInNetwork(id: string): boolean {
    return Boolean(networkLayer?.cells.includes(id));
  }

  function selectedPlanLabel(): string {
    const cells = currentStudy.cells
      .map((cell) => {
        const memberships = [
          cellInBoundary(cell.id) ? 'dans la zone choisie' : '',
          cellInNetwork(cell.id) ? 'sur le réseau choisi' : ''
        ].filter(Boolean);
        return `${cell.coordinate}, ${cell.label}${memberships.length ? `, ${memberships.join(' et ')}` : ''}`;
      })
      .join('; ');
    const boundary = boundaryLayer?.label ?? 'aucune zone délimitée';
    const network = networkLayer?.label ?? 'aucun réseau posé';
    const effect = effectLayer?.label ?? 'aucun effet choisi';
    return `Plan à neuf cases, lu de A1 à C3 : ${cells}. Délimitation : ${boundary}. Réseau : ${network}. Effet : ${effect}.`;
  }
</script>

<svelte:head>
  <title>La table des calques utiles · EX-0310</title>
  <meta
    name="description"
    content="Pratique de la délimitation de zones, des réseaux et de leurs effets sur trois plans proches fictifs."
  />
</svelte:head>

<div
  class="smoke-shell"
  data-smoke-root
  data-smoke-exercise="EX-0310"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0310">
    <p class="sr-only" aria-live="polite">{announcement}</p>

    <header class="lab-bar">
      <div class="lab-mark" aria-hidden="true"><span>3</span><i>calques</i></div>
      <div>
        <small>Géographie · atelier de plans</small>
        <strong>La table des calques utiles</strong>
      </div>
      {#if phase !== 'intro' && phase !== 'complete'}
        <p><span>plan</span> {currentIndex + 1} / {studies.length}</p>
      {/if}
    </header>

    {#if phase === 'intro'}
      <section class="intro-panel" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="intro-copy">
          <p class="overline">Pratique variée · trois lieux fictifs proches</p>
          <h1 id="intro-title" bind:this={stateFocusTarget} tabindex="-1">
            Lis l’espace comme une chaîne de relations.
          </h1>
          <p class="intro-lead">
            Sur chaque plan, assemble trois calques : une <strong>zone</strong>, un
            <strong>réseau</strong> et un <strong>effet</strong>. La stratégie ne change pas,
            même quand la limite et le réseau changent.
          </p>

          <ol class="method-track" aria-label="Stratégie en quatre repères">
            <li><span>1</span><p><strong>Fonction</strong><small>À quoi servent les parties ?</small></p></li>
            <li><span>2</span><p><strong>Limite</strong><small>Quelles parties forment la zone ?</small></p></li>
            <li><span>3</span><p><strong>Réseau</strong><small>Qu’est-ce qui relie quoi ?</small></p></li>
            <li><span>4</span><p><strong>Effet</strong><small>Que permet vraiment cet assemblage ?</small></p></li>
          </ol>

          <div class="vocabulary-grid">
            <p><strong>Zone</strong><span>Partie d’un espace ayant ici une même fonction.</span></p>
            <p><strong>Réseau</strong><span>Ensemble de lieux et de liaisons entre eux.</span></p>
            <p><strong>Aménagement</strong><span>Élément placé ou organisé pour un but.</span></p>
            <p><strong>Effet</strong><span>Conséquence directement soutenue par le plan.</span></p>
          </div>

          <p class="control-note">
            Utilise les grands boutons : aucun dessin ni glissement précis n’est nécessaire. Tu valides seulement après avoir posé les trois calques.
          </p>
          <button type="button" class="action primary" data-smoke-action="start" onclick={startPractice}>
            Allumer la table et commencer <span aria-hidden="true">→</span>
          </button>
        </div>

        <div class="intro-visual" aria-hidden="true">
          <div class="glass-plan">
            <span class="tile t1">fonction</span><span class="tile t2">limite</span><span class="tile t3">réseau</span>
            <span class="route-line"></span>
            <div class="zone-shape">zone</div>
            <strong>effet</strong>
          </div>
          <p>Superposer pour vérifier</p>
        </div>
      </section>
    {:else if phase === 'active' || phase === 'retry'}
      <section
        class="workbench"
        data-smoke-state={phase}
        data-smoke-variation={currentStudy.id}
        aria-labelledby="study-title"
      >
        <header class="study-header">
          <div>
            <p class="overline">{currentStudy.folio}</p>
            <h1 id="study-title" bind:this={stateFocusTarget} tabindex="-1">{currentStudy.title}</h1>
            <p>{currentStudy.context}</p>
          </div>
          <div class="variation-tags" aria-label="Ce qui varie sur ce plan">
            <span>⌑ {currentStudy.boundaryType}</span>
            <span>↔ {currentStudy.networkType}</span>
            <span>◎ {currentStudy.effectType}</span>
          </div>
        </header>

        <aside class="mission-card">
          <span aria-hidden="true">◎</span>
          <div><small>Mission</small><p>{currentStudy.mission}</p></div>
        </aside>

        {#if phase === 'retry'}
          <aside class="retry-scaffold" aria-labelledby="retry-title" role="status">
            <div class="retry-symbol" aria-hidden="true">↺</div>
            <div>
              <p class="overline">Reprise guidée</p>
              <h2 id="retry-title">Repars de la fonction, pas de l’apparence.</h2>
              <p>{currentStudy.scaffold}</p>
              {#if submitted}
                <details open>
                  <summary>Trace de ton premier assemblage</summary>
                  <ul>
                    <li><strong>Limite :</strong> {optionFor('boundary', submitted.boundary)?.label}</li>
                    <li><strong>Réseau :</strong> {optionFor('network', submitted.network)?.label}</li>
                    <li><strong>Effet :</strong> {optionFor('effect', submitted.effect)?.label}</li>
                  </ul>
                </details>
              {/if}
            </div>
          </aside>
        {/if}

        <div class="studio-layout">
          <article class="plan-console" aria-labelledby="plan-title">
            <div class="console-top">
              <div><small>Plan piloté par boutons</small><h2 id="plan-title">Les calques se superposent ici.</h2></div>
              <span>{selectionComplete ? '3/3 · prêt à vérifier' : `${Number(Boolean(boundaryChoice)) + Number(Boolean(networkChoice)) + Number(Boolean(effectChoice))}/3 · en cours`}</span>
            </div>

            <div class="plan-grid" role="img" aria-label={selectedPlanLabel()}>
              {#each currentStudy.cells as cell}
                <div
                  class="map-cell"
                  class:insideZone={cellInBoundary(cell.id)}
                  class:onNetwork={cellInNetwork(cell.id)}
                >
                  <small>{cell.coordinate}</small>
                  <span class="cell-symbol" aria-hidden="true">{cell.symbol}</span>
                  <strong>{cell.label}</strong>
                  <div class="cell-cues" aria-hidden="true">
                    {#if cellInBoundary(cell.id)}<i>⌑ zone</i>{/if}
                    {#if cellInNetwork(cell.id)}<i>↔ liaison</i>{/if}
                  </div>
                </div>
              {/each}
            </div>

            <div class="layer-readout" aria-live="polite">
              <div><span>⌑ Limite</span><p>{boundaryLayer?.label ?? 'Aucun contour posé.'}</p></div>
              <div><span>↔ Réseau</span><p>{networkLayer?.label ?? 'Aucune liaison posée.'}</p></div>
              <div><span>◎ Effet</span><p>{effectLayer?.label ?? 'Aucun effet associé.'}</p></div>
            </div>
          </article>

          <div class="layer-dock">
            <div class="function-anchor">
              <span>Point de départ</span>
              <strong>Fonction : {currentStudy.functionLabel}</strong>
            </div>

            <fieldset class="layer-group">
              <legend><span>1</span><strong>Délimite la zone</strong><small>Compare les parties réunies.</small></legend>
              <div class="option-stack">
                {#each currentStudy.boundaries as item}
                  <button
                    type="button"
                    class:selected={selectedId('boundary') === item.id}
                    aria-pressed={selectedId('boundary') === item.id}
                    data-smoke-attempt={smokeAttempt('boundary', item.id)}
                    data-smoke-step={smokeStep('boundary', item.id)}
                    onclick={() => chooseLayer('boundary', item.id)}
                  >
                    <span class="option-symbol" aria-hidden="true">⌑</span>
                    <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                    <i>{selectedId('boundary') === item.id ? '✓ posé' : 'poser'}</i>
                  </button>
                {/each}
              </div>
            </fieldset>

            <fieldset class="layer-group">
              <legend><span>2</span><strong>Choisis le réseau</strong><small>Suis chaque case traversée.</small></legend>
              <div class="option-stack">
                {#each currentStudy.networks as item}
                  <button
                    type="button"
                    class:selected={selectedId('network') === item.id}
                    aria-pressed={selectedId('network') === item.id}
                    data-smoke-attempt={smokeAttempt('network', item.id)}
                    data-smoke-step={smokeStep('network', item.id)}
                    onclick={() => chooseLayer('network', item.id)}
                  >
                    <span class="option-symbol" aria-hidden="true">↔</span>
                    <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                    <i>{selectedId('network') === item.id ? '✓ posé' : 'poser'}</i>
                  </button>
                {/each}
              </div>
            </fieldset>

            <fieldset class="layer-group">
              <legend><span>3</span><strong>Associe l’effet</strong><small>Garde seulement ce que le plan montre.</small></legend>
              <div class="option-stack">
                {#each currentStudy.effects as item}
                  <button
                    type="button"
                    class:selected={selectedId('effect') === item.id}
                    aria-pressed={selectedId('effect') === item.id}
                    data-smoke-attempt={smokeAttempt('effect', item.id)}
                    data-smoke-step={smokeStep('effect', item.id)}
                    onclick={() => chooseLayer('effect', item.id)}
                  >
                    <span class="option-symbol" aria-hidden="true">◎</span>
                    <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                    <i>{selectedId('effect') === item.id ? '✓ posé' : 'poser'}</i>
                  </button>
                {/each}
              </div>
            </fieldset>

            <button
              type="button"
              class="action primary submit-action"
              disabled={!selectionComplete}
              data-smoke-action={selectionComplete ? 'submit' : undefined}
              onclick={submitAssembly}
            >
              Vérifier les trois calques <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <aside class="whole-plan-mode" aria-labelledby="whole-plan-title">
          <div>
            <p class="overline">Mode comparaison</p>
            <h2 id="whole-plan-title">Tu peux aussi comparer deux plans déjà composés.</h2>
            <p>Chaque grand bouton valide une limite, un réseau et un effet ensemble. Lis les trois lignes avant de choisir.</p>
          </div>
          <div class="whole-plan-buttons">
            <button type="button" data-smoke-answer="incorrect" onclick={() => resolvePreset('incorrect')}>
              <span>Plan composé A</span>
              <strong>{optionFor('boundary', currentStudy.plannedWrong.boundary)?.label}</strong>
              <small>↔ {optionFor('network', currentStudy.plannedWrong.network)?.label}</small>
              <small>◎ {optionFor('effect', currentStudy.plannedWrong.effect)?.label}</small>
              <i>Comparer et valider A</i>
            </button>
            <button type="button" data-smoke-answer="correct" onclick={() => resolvePreset('correct')}>
              <span>Plan composé B</span>
              <strong>{optionFor('boundary', currentStudy.correct.boundary)?.label}</strong>
              <small>↔ {optionFor('network', currentStudy.correct.network)?.label}</small>
              <small>◎ {optionFor('effect', currentStudy.correct.effect)?.label}</small>
              <i>Comparer et valider B</i>
            </button>
          </div>
        </aside>
      </section>
    {:else if phase === 'incorrect' && submitted && firstMismatch}
      <section
        class="feedback-panel incorrect-panel"
        data-smoke-state="incorrect"
        data-smoke-variation={currentStudy.id}
        aria-labelledby="incorrect-title"
      >
        <header class="feedback-title">
          <span aria-hidden="true">△</span>
          <div>
            <p class="overline">Un lien à revoir · {currentStudy.folio}</p>
            <h1 id="incorrect-title" bind:this={stateFocusTarget} tabindex="-1">
              Le plan garde la trace de ton assemblage.
            </h1>
          </div>
        </header>

        <div class="specific-feedback" data-smoke-feedback="incorrect" data-smoke-feedback-detail="specific" role="status">
          <p>
            <strong>{firstMismatch === 'boundary' ? 'La limite' : firstMismatch === 'network' ? 'Le réseau' : 'L’effet'} envoyé :</strong>
            « {optionFor(firstMismatch, submitted[firstMismatch])?.label} »
          </p>
          <p>{currentStudy.feedback[firstMismatch]}</p>
        </div>

        <div class="submitted-chain" aria-label="Assemblage envoyé">
          <div><span>Fonction</span><strong>{currentStudy.functionLabel}</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Limite</span><strong>{optionFor('boundary', submitted.boundary)?.label}</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Réseau</span><strong>{optionFor('network', submitted.network)?.label}</strong></div>
          <b aria-hidden="true">→</b>
          <div><span>Effet</span><strong>{optionFor('effect', submitted.effect)?.label}</strong></div>
        </div>

        <div class="feedback-footer">
          <p>Au prochain écran, ce premier essai restera résumé. Tu reconstruiras les trois calques avec une question-guide.</p>
          <button type="button" class="action primary" data-smoke-action="retry" onclick={retryAssembly}>
            Reprendre depuis la fonction <span aria-hidden="true">↺</span>
          </button>
        </div>
      </section>
    {:else if phase === 'correct' && submitted}
      <div class="correct-layout">
        <section
          class="feedback-panel correct-panel"
          data-smoke-state="correct"
          data-smoke-variation={currentStudy.id}
          aria-labelledby="correct-title"
        >
          <header class="feedback-title">
            <span aria-hidden="true">✓</span>
            <div>
              <p class="overline">Relations cohérentes · {currentStudy.folio}</p>
              <h1 id="correct-title" bind:this={stateFocusTarget} tabindex="-1">
                Chaque calque soutient le suivant.
              </h1>
            </div>
          </header>

          <p class="specific-feedback correct-copy" data-smoke-feedback="correct" data-smoke-feedback-detail="specific" role="status">
            {currentStudy.correctFeedback}
          </p>

          <div class="coherent-chain" aria-label="Chaîne spatiale cohérente">
            <div><span>1 · fonction</span><strong>{currentStudy.functionLabel}</strong></div>
            <div><span>2 · limite</span><strong>{optionFor('boundary', submitted.boundary)?.label}</strong></div>
            <div><span>3 · réseau</span><strong>{optionFor('network', submitted.network)?.label}</strong></div>
            <div><span>4 · effet</span><strong>{optionFor('effect', submitted.effect)?.label}</strong></div>
          </div>

          <aside class="invariant-note">
            <span aria-hidden="true">◎</span>
            <p><strong>Repère invariant :</strong> une limite réunit des parties par leur fonction ; un réseau les relie ; l’effet doit être visible dans cet assemblage.</p>
          </aside>
        </section>

        <section
          class="continuation-panel"
          data-smoke-state="continuation"
          data-smoke-variation={currentStudy.id}
          aria-label="Suite de la pratique"
        >
          <p>
            {#if currentIndex < studies.length - 1}
              Le prochain plan change de type de limite, de réseau et d’effet. La stratégie reste la même.
            {:else}
              Trois organisations différentes ont maintenant été examinées.
            {/if}
          </p>
          <button type="button" class="action light" data-smoke-action="continue" onclick={continuePractice}>
            {currentIndex < studies.length - 1 ? 'Passer au plan suivant' : 'Voir la stratégie finale'}
            <span aria-hidden="true">→</span>
          </button>
        </section>
      </div>
    {:else if phase === 'complete'}
      <section class="completion-panel" data-smoke-state="complete" aria-labelledby="complete-title">
        <div class="completion-orbit" aria-hidden="true"><span>3</span><i>plans reliés</i></div>
        <p class="overline">Table parcourue</p>
        <h1 id="complete-title" bind:this={stateFocusTarget} tabindex="-1">
          La même stratégie résiste à trois organisations.
        </h1>
        <p class="completion-lead" data-smoke-completion>
          Tu as comparé une limite construite, une limite naturelle et une limite horaire, avec trois réseaux et trois effets différents.
        </p>

        <ol class="final-method">
          <li><span>1</span><p><strong>Nommer la fonction</strong><small>Regrouper les parties par leur usage, pas par leur apparence.</small></p></li>
          <li><span>2</span><p><strong>Vérifier la limite</strong><small>Dire ce qui appartient à la zone et ce qui reste dehors.</small></p></li>
          <li><span>3</span><p><strong>Suivre le réseau</strong><small>Repérer l’origine, la destination et les cases traversées.</small></p></li>
          <li><span>4</span><p><strong>Relier l’effet</strong><small>Ne retenir qu’une conséquence soutenue par le plan.</small></p></li>
        </ol>

        <p class="completion-boundary">
          Ces trois plans ne prouvent pas que tout est acquis. Dans un autre lieu, il faudra encore observer, délimiter et expliquer les relations.
        </p>
        <button type="button" class="action secondary" onclick={restartPractice}>Revoir la méthode</button>
      </section>
    {/if}
  </main>
</div>

<style>
  .smoke-shell,
  .smoke-shell * {
    box-sizing: border-box;
  }

  .smoke-shell {
    width: 100%;
    min-width: 0;
    overflow-x: clip;
  }

  .prototype-root {
    --night: #111b2d;
    --night-soft: #1c2b42;
    --ink: #16233a;
    --muted: #596579;
    --panel: #f7f4e9;
    --white: #fffdf8;
    --line: #c9c9bd;
    --coral: #ef6f57;
    --coral-dark: #9f392d;
    --aqua: #52c8c0;
    --aqua-dark: #126d69;
    --lime: #d7e76f;
    min-width: 0;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    padding: clamp(9px, 2.6vw, 28px);
    color: var(--ink);
    background:
      linear-gradient(135deg, rgba(82, 200, 192, 0.08) 25%, transparent 25%) 0 0 / 28px 28px,
      linear-gradient(315deg, rgba(239, 111, 87, 0.055) 25%, transparent 25%) 0 0 / 28px 28px,
      var(--night);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.5;
  }

  .prototype-root h1,
  .prototype-root h2,
  .prototype-root p,
  .prototype-root ol,
  .prototype-root ul,
  .prototype-root fieldset {
    margin-top: 0;
  }

  .prototype-root h1,
  .prototype-root h2,
  .prototype-root strong,
  .prototype-root small,
  .prototype-root span,
  .prototype-root p,
  .prototype-root button {
    overflow-wrap: anywhere;
  }

  .prototype-root button {
    min-height: 48px;
    border: 0;
    font: inherit;
    touch-action: manipulation;
  }

  .prototype-root button:focus-visible,
  .prototype-root summary:focus-visible,
  .prototype-root [tabindex="-1"]:focus-visible {
    outline: 4px solid #ffd43b;
    outline-offset: 4px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .lab-bar {
    display: flex;
    width: min(1180px, 100%);
    min-width: 0;
    min-height: 70px;
    align-items: center;
    gap: 13px;
    margin: 0 auto 14px;
    padding: 9px 14px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 16px;
    color: #f9f6e9;
    background: rgba(17, 27, 45, 0.88);
  }

  .lab-mark {
    display: grid;
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
    place-content: center;
    border: 2px solid var(--aqua);
    border-radius: 50%;
    text-align: center;
  }

  .lab-mark span,
  .lab-mark i {
    display: block;
    line-height: 1;
  }

  .lab-mark span {
    font-size: 1.15rem;
    font-weight: 900;
  }

  .lab-mark i {
    margin-top: 2px;
    color: var(--aqua);
    font-size: 0.53rem;
    font-style: normal;
    font-weight: 800;
    text-transform: uppercase;
  }

  .lab-bar > div:nth-child(2) {
    display: grid;
    min-width: 0;
  }

  .lab-bar small {
    color: #aab6c9;
    font-size: 0.64rem;
    font-weight: 750;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .lab-bar strong {
    font-size: 1rem;
  }

  .lab-bar > p {
    margin: 0 0 0 auto;
    padding: 5px 9px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 850;
    white-space: nowrap;
  }

  .lab-bar > p span {
    color: var(--aqua);
    font-size: 0.6rem;
    text-transform: uppercase;
  }

  .intro-panel,
  .workbench,
  .feedback-panel,
  .completion-panel,
  .continuation-panel {
    width: min(1180px, 100%);
    min-width: 0;
    margin: 0 auto;
  }

  .intro-panel,
  .workbench,
  .feedback-panel,
  .completion-panel {
    border-radius: clamp(18px, 4vw, 38px);
    background: var(--panel);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
  }

  .intro-panel {
    display: grid;
    min-height: min(760px, calc(100vh - 128px));
    grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
    align-items: center;
    gap: clamp(24px, 5vw, 72px);
    padding: clamp(24px, 6vw, 70px);
    overflow: hidden;
  }

  .overline {
    margin-bottom: 8px;
    color: var(--coral-dark);
    font-size: 0.69rem;
    font-weight: 900;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .intro-copy h1,
  .study-header h1,
  .feedback-title h1,
  .completion-panel h1 {
    margin-bottom: 18px;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 0.98;
    text-wrap: balance;
  }

  .intro-copy h1 {
    max-width: 750px;
    font-size: clamp(2.55rem, 6.8vw, 6rem);
  }

  .intro-lead {
    max-width: 760px;
    margin-bottom: 28px;
    color: #3d495c;
    font-size: clamp(1rem, 2vw, 1.2rem);
  }

  .method-track {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 20px;
    padding: 0;
    list-style: none;
  }

  .method-track li {
    min-width: 0;
    padding: 12px 10px;
    border-top: 5px solid var(--aqua-dark);
    background: var(--white);
  }

  .method-track li:nth-child(even) {
    border-top-color: var(--coral);
  }

  .method-track li > span,
  .final-method li > span {
    display: grid;
    width: 29px;
    height: 29px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--ink);
    font-size: 0.75rem;
    font-weight: 900;
  }

  .method-track p {
    margin: 8px 0 0;
  }

  .method-track strong,
  .method-track small {
    display: block;
  }

  .method-track small {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.7rem;
  }

  .vocabulary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 18px;
  }

  .vocabulary-grid p {
    margin-bottom: 0;
    padding: 10px 12px;
    border: 1px dashed #9ca6a7;
    background: #eeeee6;
    font-size: 0.82rem;
  }

  .vocabulary-grid strong,
  .vocabulary-grid span {
    display: block;
  }

  .vocabulary-grid strong {
    color: var(--aqua-dark);
  }

  .control-note {
    max-width: 720px;
    margin-bottom: 20px;
    padding-left: 12px;
    border-left: 4px solid var(--coral);
    color: var(--muted);
    font-size: 0.86rem;
  }

  .action {
    display: inline-flex;
    min-width: min(270px, 100%);
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 12px 19px;
    border-radius: 12px;
    font-weight: 850 !important;
    cursor: pointer;
  }

  .action.primary {
    color: white;
    background: var(--ink);
    box-shadow: 5px 5px 0 var(--coral);
  }

  .action.light {
    color: var(--ink);
    background: var(--lime);
    box-shadow: 5px 5px 0 var(--aqua-dark);
  }

  .action.secondary {
    border: 2px solid var(--ink);
    color: var(--ink);
    background: transparent;
  }

  .action:hover:not(:disabled) {
    filter: brightness(1.09);
  }

  .action:active:not(:disabled) {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--coral-dark);
  }

  .action:disabled {
    color: #6a7180;
    background: #d7d5ce;
    box-shadow: none;
    cursor: not-allowed;
  }

  .intro-visual {
    min-width: 0;
  }

  .glass-plan {
    position: relative;
    aspect-ratio: 0.86;
    max-height: 510px;
    border: 2px solid var(--aqua);
    border-radius: 30px;
    background:
      linear-gradient(rgba(82, 200, 192, 0.13) 1px, transparent 1px),
      linear-gradient(90deg, rgba(82, 200, 192, 0.13) 1px, transparent 1px),
      var(--night-soft);
    background-size: 25% 25%;
    box-shadow: inset 0 0 45px rgba(82, 200, 192, 0.12), 12px 14px 0 var(--coral);
    transform: rotate(2deg);
  }

  .tile,
  .glass-plan > strong,
  .zone-shape {
    position: absolute;
    display: grid;
    place-items: center;
    color: var(--white);
    font-size: 0.72rem;
    font-weight: 850;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .tile {
    width: 36%;
    height: 17%;
    border: 1px solid var(--aqua);
    background: rgba(82, 200, 192, 0.12);
  }

  .t1 { top: 10%; left: 11%; }
  .t2 { top: 32%; right: 10%; }
  .t3 { bottom: 14%; left: 13%; }

  .zone-shape {
    top: 43%;
    left: 14%;
    width: 45%;
    height: 23%;
    border: 4px dashed var(--lime);
    border-radius: 45% 20% 38% 18%;
    color: var(--lime);
  }

  .route-line {
    position: absolute;
    inset: 16% 20% 18% 47%;
    border-right: 5px solid var(--coral);
    border-bottom: 5px solid var(--coral);
    transform: skew(-16deg);
  }

  .glass-plan > strong {
    right: 10%;
    bottom: 11%;
    width: 28%;
    height: 14%;
    border-radius: 50%;
    color: var(--night);
    background: var(--lime);
  }

  .intro-visual > p {
    margin: 24px 0 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-align: center;
    text-transform: uppercase;
  }

  .workbench {
    overflow: hidden;
  }

  .study-header {
    display: flex;
    min-width: 0;
    align-items: start;
    justify-content: space-between;
    gap: 28px;
    padding: clamp(22px, 4vw, 42px);
    border-bottom: 1px solid var(--line);
  }

  .study-header > div:first-child {
    min-width: 0;
  }

  .study-header h1,
  .feedback-title h1 {
    margin-bottom: 9px;
    font-size: clamp(2.15rem, 5vw, 4.4rem);
  }

  .study-header > div:first-child > p:last-child {
    max-width: 700px;
    margin-bottom: 0;
    color: var(--muted);
  }

  .variation-tags {
    display: grid;
    width: min(310px, 100%);
    flex: 0 0 300px;
    gap: 6px;
  }

  .variation-tags span {
    padding: 8px 10px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--white);
    font-size: 0.72rem;
    font-weight: 800;
  }

  .mission-card {
    display: flex;
    align-items: center;
    gap: 13px;
    margin: 0;
    padding: 14px clamp(18px, 4vw, 42px);
    color: #f8f8ed;
    background: var(--ink);
  }

  .mission-card > span {
    display: grid;
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    place-items: center;
    border: 2px solid var(--aqua);
    border-radius: 50%;
    color: var(--aqua);
    font-size: 1.25rem;
  }

  .mission-card small {
    color: var(--lime);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .mission-card p {
    margin-bottom: 0;
  }

  .retry-scaffold {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
    margin: 20px clamp(16px, 3vw, 34px) 0;
    padding: 17px;
    border: 3px solid #b76b16;
    border-radius: 18px;
    background: #fff0c8;
  }

  .retry-symbol {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: #a1540f;
    font-size: 1.5rem;
    font-weight: 900;
  }

  .retry-scaffold h2 {
    margin-bottom: 7px;
    font-family: Georgia, serif;
    font-size: 1.45rem;
  }

  .retry-scaffold > div > p:not(.overline) {
    margin-bottom: 10px;
  }

  .retry-scaffold details {
    border-top: 1px solid #d4a555;
    padding-top: 9px;
  }

  .retry-scaffold summary {
    min-height: 44px;
    padding: 10px 4px;
    font-weight: 800;
    cursor: pointer;
  }

  .retry-scaffold ul {
    margin-bottom: 0;
    padding-left: 20px;
    color: #554a3c;
    font-size: 0.8rem;
  }

  .studio-layout {
    display: grid;
    grid-template-columns: minmax(340px, 0.88fr) minmax(0, 1.12fr);
    align-items: start;
    gap: clamp(18px, 3vw, 34px);
    padding: clamp(20px, 4vw, 42px);
  }

  .plan-console {
    min-width: 0;
    padding: clamp(14px, 3vw, 24px);
    border: 2px solid var(--ink);
    border-radius: 22px;
    background: var(--night-soft);
    box-shadow: 8px 9px 0 var(--aqua);
  }

  .console-top {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    color: var(--white);
  }

  .console-top small {
    color: var(--aqua);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .console-top h2 {
    margin: 4px 0 0;
    font-family: Georgia, serif;
    font-size: clamp(1.25rem, 2.6vw, 1.8rem);
    font-weight: 500;
  }

  .console-top > span {
    flex: 0 0 auto;
    padding: 6px 9px;
    border: 1px solid #8793a6;
    border-radius: 999px;
    color: var(--lime);
    font-size: 0.66rem;
    font-weight: 850;
  }

  .plan-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 5px;
    padding: 7px;
    border: 1px solid #67758b;
    background: #0d1727;
  }

  .map-cell {
    position: relative;
    display: flex;
    min-width: 0;
    min-height: 100px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 5px 22px;
    border: 1px solid #65738a;
    color: #f6f4e9;
    background:
      linear-gradient(135deg, transparent 48%, rgba(255, 255, 255, 0.04) 49% 51%, transparent 52%),
      #223149;
    text-align: center;
  }

  .map-cell > small:first-child {
    position: absolute;
    top: 4px;
    left: 5px;
    color: #aeb9c8;
    font: 700 0.55rem ui-monospace, monospace;
  }

  .cell-symbol {
    color: var(--aqua);
    font-size: 1.35rem;
    line-height: 1;
  }

  .map-cell > strong {
    margin-top: 5px;
    font-size: 0.7rem;
    line-height: 1.15;
  }

  .map-cell.insideZone {
    border: 3px dashed var(--lime);
    background:
      repeating-linear-gradient(-45deg, rgba(215, 231, 111, 0.12) 0 7px, transparent 7px 14px),
      #26354b;
  }

  .map-cell.onNetwork {
    box-shadow: inset 0 -7px 0 var(--coral);
  }

  .cell-cues {
    position: absolute;
    right: 3px;
    bottom: 3px;
    left: 3px;
    display: flex;
    justify-content: center;
    gap: 3px;
  }

  .cell-cues i {
    padding: 1px 3px;
    border-radius: 3px;
    color: var(--night);
    background: var(--lime);
    font-size: 0.48rem;
    font-style: normal;
    font-weight: 900;
  }

  .cell-cues i + i,
  .onNetwork .cell-cues i:only-child {
    color: white;
    background: var(--coral);
  }

  .layer-readout {
    display: grid;
    gap: 6px;
    margin-top: 12px;
  }

  .layer-readout > div {
    display: grid;
    grid-template-columns: 82px minmax(0, 1fr);
    align-items: start;
    gap: 9px;
    padding: 7px 9px;
    border: 1px solid #526078;
    color: #f4f2e7;
    background: #162239;
  }

  .layer-readout span {
    color: var(--aqua);
    font-size: 0.67rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .layer-readout p {
    margin-bottom: 0;
    font-size: 0.68rem;
  }

  .layer-dock {
    min-width: 0;
  }

  .function-anchor {
    margin-bottom: 14px;
    padding: 12px 14px;
    border-left: 6px solid var(--coral);
    background: #e6e7dc;
  }

  .function-anchor span,
  .function-anchor strong {
    display: block;
  }

  .function-anchor span {
    color: var(--coral-dark);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .layer-group {
    min-width: 0;
    margin-bottom: 13px;
    padding: 11px;
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--white);
  }

  .layer-group legend {
    display: grid;
    max-width: 100%;
    grid-template-columns: 32px minmax(0, 1fr);
    align-items: center;
    column-gap: 8px;
    padding: 0 6px;
  }

  .layer-group legend > span {
    display: grid;
    width: 30px;
    height: 30px;
    grid-row: 1 / span 2;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--aqua-dark);
    font-size: 0.76rem;
    font-weight: 900;
  }

  .layer-group legend strong,
  .layer-group legend small {
    display: block;
  }

  .layer-group legend small {
    color: var(--muted);
    font-size: 0.67rem;
  }

  .option-stack {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
    margin-top: 8px;
  }

  .option-stack button {
    display: grid;
    min-width: 0;
    min-height: 92px;
    grid-template-columns: 32px minmax(0, 1fr);
    grid-template-rows: 1fr auto;
    align-items: start;
    gap: 5px 8px;
    padding: 10px;
    border: 2px solid #aeb1aa;
    border-radius: 11px;
    color: var(--ink);
    background: #f5f3eb;
    text-align: left;
    cursor: pointer;
  }

  .option-stack button:hover {
    border-color: var(--aqua-dark);
  }

  .option-stack button.selected {
    border-color: var(--aqua-dark);
    background:
      repeating-linear-gradient(-45deg, rgba(82, 200, 192, 0.12) 0 6px, transparent 6px 12px),
      #edf8f5;
    box-shadow: inset 5px 0 0 var(--aqua-dark);
  }

  .option-symbol {
    display: grid;
    width: 31px;
    height: 31px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    background: white;
    font-weight: 900;
  }

  .option-stack button > span:nth-child(2) {
    min-width: 0;
  }

  .option-stack button strong,
  .option-stack button small {
    display: block;
  }

  .option-stack button strong {
    font-size: 0.78rem;
    line-height: 1.25;
  }

  .option-stack button small {
    margin-top: 4px;
    color: var(--muted);
    font-size: 0.65rem;
    font-weight: 500;
    line-height: 1.3;
  }

  .option-stack button > i {
    grid-column: 2;
    color: var(--aqua-dark);
    font-size: 0.6rem;
    font-style: normal;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .submit-action {
    width: 100%;
    margin-top: 3px;
  }

  .whole-plan-mode {
    display: grid;
    grid-template-columns: minmax(220px, 0.42fr) minmax(0, 1fr);
    gap: 18px;
    padding: 22px clamp(18px, 4vw, 42px) clamp(24px, 4vw, 42px);
    border-top: 1px solid var(--line);
    background: #e7e4d9;
  }

  .whole-plan-mode h2 {
    margin-bottom: 8px;
    font-family: Georgia, serif;
    font-size: 1.45rem;
    font-weight: 500;
  }

  .whole-plan-mode > div:first-child > p:last-child {
    margin-bottom: 0;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .whole-plan-buttons {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .whole-plan-buttons button {
    display: flex;
    min-width: 0;
    min-height: 154px;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    padding: 13px;
    border: 2px solid var(--ink);
    border-radius: 13px;
    color: var(--ink);
    background: var(--white);
    text-align: left;
    cursor: pointer;
  }

  .whole-plan-buttons button > span {
    color: var(--coral-dark);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .whole-plan-buttons button strong {
    margin: 5px 0;
    font-size: 0.76rem;
    line-height: 1.3;
  }

  .whole-plan-buttons button small {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.64rem;
    line-height: 1.25;
  }

  .whole-plan-buttons button i {
    display: block;
    margin-top: auto;
    padding-top: 9px;
    color: var(--aqua-dark);
    font-size: 0.65rem;
    font-style: normal;
    font-weight: 900;
  }

  .whole-plan-buttons button:hover {
    border-color: var(--coral);
    box-shadow: inset 0 -5px 0 var(--coral);
  }

  .feedback-panel {
    padding: clamp(22px, 5vw, 54px);
  }

  .feedback-title {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: 17px;
    margin-bottom: 22px;
  }

  .feedback-title > span {
    display: grid;
    width: 58px;
    height: 58px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--coral-dark);
    font-size: 1.7rem;
    font-weight: 900;
  }

  .correct-panel .feedback-title > span {
    color: var(--night);
    background: var(--lime);
  }

  .specific-feedback {
    padding: 17px 19px;
    border-left: 6px solid var(--coral-dark);
    background: #ffe1cf;
  }

  .specific-feedback p:last-child,
  .specific-feedback.correct-copy {
    margin-bottom: 0;
  }

  .correct-copy {
    border-left-color: var(--aqua-dark);
    background: #dff1eb;
    font-size: 1rem;
  }

  .submitted-chain {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
    gap: 6px;
    margin-top: 22px;
  }

  .submitted-chain > div {
    min-width: 0;
    padding: 11px;
    border: 1px solid var(--line);
    background: var(--white);
  }

  .submitted-chain > div span,
  .submitted-chain > div strong {
    display: block;
  }

  .submitted-chain > div span {
    color: var(--coral-dark);
    font-size: 0.61rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .submitted-chain > div strong {
    margin-top: 4px;
    font-size: 0.72rem;
    line-height: 1.3;
  }

  .submitted-chain > b {
    display: none;
  }

  .feedback-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    margin: 26px calc(clamp(22px, 5vw, 54px) * -1) calc(clamp(22px, 5vw, 54px) * -1);
    padding: 19px clamp(22px, 5vw, 54px);
    border-radius: 0 0 clamp(18px, 4vw, 38px) clamp(18px, 4vw, 38px);
    color: #f4f3e9;
    background: var(--night);
  }

  .feedback-footer p {
    max-width: 620px;
    margin-bottom: 0;
    color: #c5ccda;
    font-size: 0.84rem;
  }

  .correct-layout {
    display: grid;
    width: min(1050px, 100%);
    gap: 13px;
    margin: 0 auto;
  }

  .correct-layout .feedback-panel,
  .correct-layout .continuation-panel {
    width: 100%;
  }

  .coherent-chain {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-top: 22px;
  }

  .coherent-chain > div {
    min-width: 0;
    padding: 13px;
    border-top: 5px solid var(--aqua-dark);
    background: var(--white);
  }

  .coherent-chain > div:nth-child(even) {
    border-top-color: var(--coral);
  }

  .coherent-chain span,
  .coherent-chain strong {
    display: block;
  }

  .coherent-chain span {
    color: var(--muted);
    font-size: 0.61rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .coherent-chain strong {
    margin-top: 6px;
    font-size: 0.76rem;
    line-height: 1.3;
  }

  .invariant-note {
    display: flex;
    gap: 13px;
    margin-top: 18px;
    padding: 13px;
    border: 2px dashed var(--aqua-dark);
    background: #eef5ef;
  }

  .invariant-note > span {
    color: var(--aqua-dark);
    font-size: 1.4rem;
  }

  .invariant-note p {
    margin-bottom: 0;
  }

  .continuation-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    padding: 18px clamp(20px, 4vw, 40px);
    border: 1px solid #4b5b73;
    border-radius: 18px;
    color: white;
    background: var(--night-soft);
  }

  .continuation-panel p {
    max-width: 650px;
    margin-bottom: 0;
    color: #d1d7e1;
    font-size: 0.85rem;
  }

  .completion-panel {
    position: relative;
    max-width: 960px;
    padding: clamp(28px, 7vw, 70px);
    overflow: hidden;
  }

  .completion-orbit {
    position: absolute;
    top: 28px;
    right: clamp(20px, 6vw, 60px);
    display: grid;
    width: 98px;
    height: 98px;
    place-content: center;
    border: 3px dashed var(--aqua-dark);
    border-radius: 50%;
    color: var(--aqua-dark);
    text-align: center;
    transform: rotate(7deg);
  }

  .completion-orbit span,
  .completion-orbit i {
    display: block;
    line-height: 1;
  }

  .completion-orbit span {
    font-family: Georgia, serif;
    font-size: 2.3rem;
  }

  .completion-orbit i {
    margin-top: 3px;
    font-size: 0.56rem;
    font-style: normal;
    font-weight: 900;
    text-transform: uppercase;
  }

  .completion-panel h1 {
    max-width: calc(100% - 110px);
    font-size: clamp(2.5rem, 7vw, 5.7rem);
  }

  .completion-lead {
    max-width: 720px;
    margin-bottom: 26px;
    color: #3f4b5d;
    font-size: clamp(1rem, 2.4vw, 1.2rem);
  }

  .final-method {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 0 0 24px;
    padding: 0;
    list-style: none;
  }

  .final-method li {
    display: grid;
    min-width: 0;
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 10px;
    padding: 14px;
    border: 1px solid var(--line);
    background: var(--white);
  }

  .final-method p {
    margin-bottom: 0;
  }

  .final-method strong,
  .final-method small {
    display: block;
  }

  .final-method small {
    margin-top: 4px;
    color: var(--muted);
  }

  .completion-boundary {
    max-width: 720px;
    margin-bottom: 22px;
    padding: 12px 14px;
    border-left: 5px solid var(--coral);
    color: var(--muted);
    background: #e8e6dd;
    font-size: 0.85rem;
  }

  @media (max-width: 900px) {
    .intro-panel,
    .studio-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .intro-visual {
      display: none;
    }

    .study-header {
      flex-direction: column;
    }

    .variation-tags {
      width: 100%;
      flex-basis: auto;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .plan-console {
      max-width: 680px;
      margin: 0 auto;
    }

    .whole-plan-mode {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 620px) {
    .prototype-root {
      padding: 8px;
    }

    .lab-bar {
      min-height: 60px;
      margin-bottom: 8px;
      padding: 7px 9px;
      border-radius: 12px;
    }

    .lab-mark {
      width: 44px;
      height: 44px;
      flex-basis: 44px;
    }

    .lab-bar > div:nth-child(2) strong {
      font-size: 0.83rem;
    }

    .lab-bar > div:nth-child(2) small {
      display: none;
    }

    .lab-bar > p {
      padding: 4px 7px;
      font-size: 0.7rem;
    }

    .intro-panel,
    .workbench,
    .feedback-panel,
    .completion-panel {
      border-radius: 18px;
    }

    .intro-panel,
    .feedback-panel,
    .completion-panel {
      padding: 20px 15px;
    }

    .intro-copy h1,
    .study-header h1,
    .feedback-title h1,
    .completion-panel h1 {
      font-size: clamp(2rem, 12vw, 3rem);
    }

    .method-track,
    .vocabulary-grid,
    .variation-tags,
    .option-stack,
    .whole-plan-buttons,
    .submitted-chain,
    .coherent-chain,
    .final-method {
      grid-template-columns: minmax(0, 1fr);
    }

    .method-track li {
      display: grid;
      grid-template-columns: 31px minmax(0, 1fr);
      gap: 9px;
      border-top: 0;
      border-left: 5px solid var(--aqua-dark);
    }

    .method-track li:nth-child(even) {
      border-left-color: var(--coral);
    }

    .method-track p {
      margin-top: 0;
    }

    .action {
      width: 100%;
      min-width: 0;
    }

    .study-header {
      gap: 14px;
      padding: 20px 15px;
    }

    .variation-tags span {
      border-radius: 8px;
    }

    .mission-card {
      align-items: start;
      padding: 13px 15px;
    }

    .retry-scaffold {
      grid-template-columns: minmax(0, 1fr);
      margin: 13px 11px 0;
      padding: 13px;
    }

    .studio-layout {
      gap: 19px;
      padding: 18px 11px;
    }

    .plan-console {
      padding: 11px;
      border-radius: 14px;
      box-shadow: 4px 5px 0 var(--aqua);
    }

    .console-top {
      display: block;
    }

    .console-top > span {
      display: inline-block;
      margin-top: 8px;
    }

    .map-cell {
      min-height: 82px;
      padding: 13px 3px 20px;
    }

    .map-cell > strong {
      font-size: 0.61rem;
    }

    .cell-symbol {
      font-size: 1.05rem;
    }

    .cell-cues {
      flex-wrap: wrap;
    }

    .cell-cues i {
      font-size: 0.42rem;
    }

    .layer-readout > div {
      grid-template-columns: minmax(0, 1fr);
      gap: 2px;
    }

    .layer-group {
      padding: 9px 7px;
    }

    .option-stack button {
      min-height: 88px;
    }

    .whole-plan-mode {
      padding: 18px 11px 22px;
    }

    .whole-plan-buttons button {
      min-height: 146px;
    }

    .feedback-title {
      grid-template-columns: minmax(0, 1fr);
      gap: 9px;
    }

    .feedback-title > span {
      width: 48px;
      height: 48px;
    }

    .feedback-footer,
    .continuation-panel {
      align-items: stretch;
      flex-direction: column;
    }

    .feedback-footer {
      margin: 22px -15px -20px;
      padding: 17px 15px;
      border-radius: 0 0 18px 18px;
    }

    .submitted-chain > b {
      display: block;
      padding-left: 12px;
      color: var(--coral-dark);
    }

    .continuation-panel {
      border-radius: 14px;
      padding: 16px 13px;
    }

    .completion-orbit {
      position: static;
      width: 80px;
      height: 80px;
      margin: 0 0 18px auto;
      transform: none;
    }

    .completion-panel h1 {
      max-width: none;
    }
  }

  @media (max-width: 340px) {
    .prototype-root {
      padding: 6px;
    }

    .lab-bar > p span {
      display: none;
    }

    .plan-grid {
      gap: 3px;
      padding: 4px;
    }

    .map-cell {
      min-height: 78px;
    }

    .map-cell > strong {
      font-size: 0.57rem;
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

    .action:active:not(:disabled),
    .glass-plan,
    .completion-orbit {
      transform: none;
    }
  }
</style>
