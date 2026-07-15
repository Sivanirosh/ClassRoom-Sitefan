<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Side = 'near' | 'wide';
  type AttemptKind = 'incorrect' | 'correct' | undefined;
  type CoarseKind = Exclude<AttemptKind, undefined>;

  type FrameOption = {
    id: string;
    label: string;
    scaleWord: string;
    extent: number;
    snapshot: string;
    features: [string, string, string];
    correct: boolean;
    plannedWrong: boolean;
    correction: string;
  };

  type AnchorOption = {
    id: string;
    label: string;
    nearPresence: string | null;
    widePresence: string | null;
    correct: boolean;
    plannedWrong: boolean;
    correction: string;
  };

  type Variation = {
    id: string;
    folio: string;
    pair: string;
    title: string;
    theme: string;
    mission: string;
    nearbyContext: string;
    fartherLink: string;
    nearPrompt: string;
    widePrompt: string;
    nearOptions: FrameOption[];
    wideOptions: FrameOption[];
    anchors: AnchorOption[];
    scaffoldLead: string;
    nearHint: string;
    wideHint: string;
    anchorHint: string;
    correctFeedback: string;
    invariant: string;
  };

  type Selection = {
    near: string | null;
    wide: string | null;
    anchor: string | null;
  };

  const variations: Variation[] = [
    {
      id: 'apartment-neighborhood',
      folio: 'Paire 01',
      pair: 'appartement / quartier',
      title: 'Retrouver un logement dans le quartier',
      theme: 'Habitat · loisirs',
      mission:
        'Prépare deux vues pour suivre le trajet de Samia : la petite montre son appartement ; la grande situe ce logement et la bibliothèque dans le quartier.',
      nearbyContext:
        'Lieu fictif de Valrive : l’appartement se trouve dans l’immeuble A, près d’une rue et d’une bibliothèque de quartier.',
      fartherLink:
        'Au bord du quartier, une ligne de bus continue vers le centre de la ville fictive.',
      nearPrompt: 'Quelle étendue ouvre la petite fenêtre sur le logement ?',
      widePrompt: 'Quelle étendue doit contenir le logement et la bibliothèque ?',
      nearOptions: [
        {
          id: 'single-room',
          label: 'Une seule pièce',
          scaleWord: 'pièce',
          extent: 1,
          snapshot: 'Le bureau remplit presque tout le cadre.',
          features: ['bureau', 'lit', 'fenêtre'],
          correct: false,
          plannedWrong: true,
          correction:
            'La petite vue « une seule pièce » coupe la cuisine et la porte : elle est plus serrée que l’appartement demandé.'
        },
        {
          id: 'samia-apartment',
          label: 'L’appartement de Samia',
          scaleWord: 'appartement',
          extent: 2,
          snapshot: 'Les pièces et la porte du logement restent lisibles.',
          features: ['cuisine', 'chambre', 'porte du logement'],
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'whole-building',
          label: 'Tout l’immeuble A',
          scaleWord: 'immeuble',
          extent: 3,
          snapshot: 'Le cadre montre plusieurs logements et les espaces communs.',
          features: ['six logements', 'hall commun', 'cour'],
          correct: false,
          plannedWrong: false,
          correction:
            'La vue de tout l’immeuble dépasse le logement : les détails de l’appartement deviennent trop petits pour la petite fenêtre.'
        }
      ],
      wideOptions: [
        {
          id: 'building-surroundings',
          label: 'L’immeuble et sa cour',
          scaleWord: 'immeuble',
          extent: 3,
          snapshot: 'La vue s’arrête à la parcelle de l’immeuble.',
          features: ['immeuble A', 'cour', 'entrée'],
          correct: false,
          plannedWrong: true,
          correction:
            'La grande vue limitée à l’immeuble ne montre ni les rues ni la bibliothèque du quartier annoncée dans la mission.'
        },
        {
          id: 'willow-neighborhood',
          label: 'Le quartier des Saules',
          scaleWord: 'quartier',
          extent: 4,
          snapshot: 'Plusieurs rues entourent le logement et la bibliothèque.',
          features: ['immeuble A', 'bibliothèque', 'rues et parc'],
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'whole-city',
          label: 'Toute la ville',
          scaleWord: 'ville',
          extent: 5,
          snapshot: 'Les quartiers deviennent de petites zones dans la ville.',
          features: ['plusieurs quartiers', 'gare', 'rivière'],
          correct: false,
          plannedWrong: false,
          correction:
            'La ville englobe bien le quartier, mais elle élargit plus que nécessaire et efface les détails du trajet vers la bibliothèque.'
        }
      ],
      anchors: [
        {
          id: 'samia-balcony',
          label: 'Le balcon de Samia',
          nearPresence: 'balcon visible',
          widePresence: null,
          correct: false,
          plannedWrong: true,
          correction:
            'Le balcon est visible dans l’appartement, mais trop petit pour être retrouvé dans la vue du quartier : il ne relie pas les deux fenêtres.'
        },
        {
          id: 'samia-home',
          label: 'Le logement de Samia',
          nearPresence: 'le logement remplit la vue',
          widePresence: 'repère dans l’immeuble A',
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'sports-field',
          label: 'Le terrain de sport',
          nearPresence: null,
          widePresence: 'repère à l’est du quartier',
          correct: false,
          plannedWrong: false,
          correction:
            'Le terrain de sport apparaît dans le quartier, mais pas dans l’appartement : il ne permet pas de retrouver le même lieu dans les deux vues.'
        }
      ],
      scaffoldLead:
        'Repars du lieu qui doit être détaillé, puis demande-toi quel espace plus grand contient ce lieu et la bibliothèque.',
      nearHint: 'La petite fenêtre doit garder plusieurs pièces et la porte du même logement.',
      wideHint: 'La grande fenêtre doit faire apparaître des rues et la bibliothèque sans ouvrir toute la ville.',
      anchorHint: 'Choisis le lieu montré en entier de près et localisé par un repère de loin.',
      correctFeedback:
        'La petite fenêtre montre les pièces de l’appartement. La grande montre le quartier qui contient ce logement et la bibliothèque. Le repère « logement de Samia » permet de passer d’une vue à l’autre.',
      invariant:
        'En élargissant de l’appartement au quartier, des détails intérieurs disparaissent et des relations entre lieux deviennent visibles.'
    },
    {
      id: 'neighborhood-city',
      folio: 'Paire 02',
      pair: 'quartier / ville',
      title: 'Situer un marché dans la ville',
      theme: 'Approvisionnement · échanges',
      mission:
        'Construis une vue du quartier pour organiser l’arrivée au marché, puis une vue de la ville pour situer ce quartier parmi les autres.',
      nearbyContext:
        'Dans la ville fictive de Belrive, le marché des Arcades se trouve dans le quartier des Halles, entre l’école et un arrêt de bus.',
      fartherLink:
        'La gare de Belrive relie la ville à des localités voisines de la région proche.',
      nearPrompt: 'Quelle vue montre le marché avec les rues de son quartier ?',
      widePrompt: 'Quelle vue situe ce quartier parmi d’autres parties de Belrive ?',
      nearOptions: [
        {
          id: 'market-street',
          label: 'La rue du marché',
          scaleWord: 'rue',
          extent: 2,
          snapshot: 'Les entrées des commerces sont détaillées, mais le quartier est coupé.',
          features: ['entrée du marché', 'passage piéton', 'trois boutiques'],
          correct: false,
          plannedWrong: true,
          correction:
            'La rue du marché est trop serrée : elle ne montre pas le quartier avec l’école et l’arrêt demandés.'
        },
        {
          id: 'market-neighborhood',
          label: 'Le quartier des Halles',
          scaleWord: 'quartier',
          extent: 3,
          snapshot: 'Les rues relient le marché, l’école et l’arrêt de bus.',
          features: ['marché des Arcades', 'école', 'arrêt et rues'],
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'belrive-from-near',
          label: 'La ville de Belrive',
          scaleWord: 'ville',
          extent: 4,
          snapshot: 'Le quartier devient une partie parmi plusieurs.',
          features: ['quartier des Halles', 'centre', 'gare'],
          correct: false,
          plannedWrong: false,
          correction:
            'La ville est déjà la vue large : elle ne conserve pas assez de rues du quartier pour préparer l’arrivée au marché.'
        }
      ],
      wideOptions: [
        {
          id: 'same-neighborhood',
          label: 'Encore le quartier des Halles',
          scaleWord: 'quartier',
          extent: 3,
          snapshot: 'Les deux fenêtres couvrent la même étendue.',
          features: ['marché', 'école', 'arrêt'],
          correct: false,
          plannedWrong: true,
          correction:
            'La seconde vue répète le quartier : elle ne l’englobe pas dans un espace plus large et ne montre pas les autres quartiers de la ville.'
        },
        {
          id: 'belrive-city',
          label: 'La ville de Belrive',
          scaleWord: 'ville',
          extent: 4,
          snapshot: 'Le quartier des Halles apparaît parmi les autres parties de la ville.',
          features: ['quartier des Halles', 'autres quartiers', 'gare et rivière'],
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'belrive-region',
          label: 'La région autour de Belrive',
          scaleWord: 'région',
          extent: 5,
          snapshot: 'Belrive devient une localité dans un ensemble régional.',
          features: ['Belrive', 'localités voisines', 'axes régionaux'],
          correct: false,
          plannedWrong: false,
          correction:
            'La région est plus étendue que la ville demandée : les quartiers de Belrive n’y sont plus assez détaillés pour cette mission.'
        }
      ],
      anchors: [
        {
          id: 'market-fountain',
          label: 'La fontaine du marché',
          nearPresence: 'fontaine devant les étals',
          widePresence: null,
          correct: false,
          plannedWrong: true,
          correction:
            'La fontaine aide dans le quartier, mais disparaît à l’échelle de la ville : le lien entre les vues se casse.'
        },
        {
          id: 'arcades-market',
          label: 'Le marché des Arcades',
          nearPresence: 'bâtiment et entrées visibles',
          widePresence: 'repère dans le quartier des Halles',
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'central-station',
          label: 'La gare de Belrive',
          nearPresence: null,
          widePresence: 'repère au centre de la ville',
          correct: false,
          plannedWrong: false,
          correction:
            'La gare se repère dans la ville, mais elle reste hors de la vue du quartier du marché : ce n’est pas un repère commun.'
        }
      ],
      scaffoldLead:
        'Une vue doit servir à circuler autour du marché ; l’autre doit montrer à quelle partie de la ville ce quartier appartient.',
      nearHint: 'Cherche la vue qui garde le marché, l’école, l’arrêt et leurs rues.',
      wideHint: 'Cherche l’espace qui contient plusieurs quartiers, dont celui des Halles.',
      anchorHint: 'Le repère commun doit être lisible comme bâtiment de près et comme point situé de loin.',
      correctFeedback:
        'La vue du quartier garde les rues utiles autour du marché. La vue de la ville contient ce quartier parmi d’autres. Le marché des Arcades reste identifiable comme bâtiment dans la première et comme repère dans la seconde.',
      invariant:
        'Le quartier est une partie de la ville : élargir la vue fait apparaître sa position parmi d’autres quartiers.'
    },
    {
      id: 'local-regional',
      folio: 'Paire 03',
      pair: 'local / régional',
      title: 'Relier un secteur local à la région proche',
      theme: 'Échanges · déplacements',
      mission:
        'Ouvre une vue locale autour de la gare de Valrive, puis une vue régionale qui montre comment plusieurs localités proches sont reliées.',
      nearbyContext:
        'Le territoire est fictif : autour de la gare de Valrive se trouvent une place, un arrêt de bus et un petit marché.',
      fartherLink:
        'Une flèche au bord de la vue régionale indique que les lignes continuent vers d’autres régions, sans les détailler.',
      nearPrompt: 'Quelle étendue montre les lieux accessibles autour de la gare ?',
      widePrompt: 'Quelle étendue montre Valrive reliée à plusieurs localités proches ?',
      nearOptions: [
        {
          id: 'station-building',
          label: 'Le bâtiment de la gare',
          scaleWord: 'bâtiment',
          extent: 1,
          snapshot: 'Les quais et les portes occupent tout le cadre.',
          features: ['hall', 'quai', 'entrée'],
          correct: false,
          plannedWrong: true,
          correction:
            'Le bâtiment seul coupe la place, le bus et le marché : il est plus serré que le secteur local demandé.'
        },
        {
          id: 'station-local-area',
          label: 'Le secteur local de la gare',
          scaleWord: 'local',
          extent: 2,
          snapshot: 'Les lieux proches autour de la gare sont reliés par des chemins courts.',
          features: ['gare de Valrive', 'arrêt de bus', 'place et marché'],
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'region-from-near',
          label: 'Toute la région proche',
          scaleWord: 'régional',
          extent: 4,
          snapshot: 'La gare devient un point parmi plusieurs localités.',
          features: ['Valrive', 'Montel', 'Clairpré'],
          correct: false,
          plannedWrong: false,
          correction:
            'La région est la vue large : elle ne garde pas assez de détails autour de la gare pour servir de vue locale.'
        }
      ],
      wideOptions: [
        {
          id: 'repeat-local-area',
          label: 'Le même secteur local',
          scaleWord: 'local',
          extent: 2,
          snapshot: 'La seconde fenêtre répète les abords de la gare.',
          features: ['gare', 'arrêt', 'place'],
          correct: false,
          plannedWrong: true,
          correction:
            'Répéter le secteur local ne montre pas les localités reliées : la seconde fenêtre n’est pas régionale.'
        },
        {
          id: 'nearby-region',
          label: 'La région proche',
          scaleWord: 'régional',
          extent: 4,
          snapshot: 'Trois localités et leurs lignes forment un réseau régional simplifié.',
          features: ['Valrive', 'Montel et Clairpré', 'lignes régionales'],
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'one-neighbor',
          label: 'Valrive et une seule localité',
          scaleWord: 'interlocal',
          extent: 3,
          snapshot: 'Une liaison apparaît, mais le réseau régional reste coupé.',
          features: ['Valrive', 'Montel', 'une seule ligne'],
          correct: false,
          plannedWrong: false,
          correction:
            'Cette vue montre une liaison, mais pas les plusieurs localités et lignes annoncées pour la région proche.'
        }
      ],
      anchors: [
        {
          id: 'platform-two',
          label: 'Le quai 2',
          nearPresence: 'quai numéroté visible',
          widePresence: null,
          correct: false,
          plannedWrong: true,
          correction:
            'Le quai 2 est utile sur place, mais trop détaillé pour la vue régionale : il ne relie pas les deux échelles.'
        },
        {
          id: 'valrive-station',
          label: 'La gare de Valrive',
          nearPresence: 'gare et accès visibles',
          widePresence: 'nœud nommé à Valrive',
          correct: true,
          plannedWrong: false,
          correction: ''
        },
        {
          id: 'montel-town',
          label: 'La localité de Montel',
          nearPresence: null,
          widePresence: 'localité reliée à Valrive',
          correct: false,
          plannedWrong: false,
          correction:
            'Montel apparaît dans la région, mais pas dans le secteur local de la gare de Valrive : ce repère ne traverse pas les deux vues.'
        }
      ],
      scaffoldLead:
        'La vue locale répond à « que trouve-t-on autour de la gare ? » ; la vue régionale répond à « à quelles localités Valrive est-elle reliée ? ».',
      nearHint: 'Garde la gare avec la place, le bus et le marché proches.',
      wideHint: 'Fais apparaître plusieurs localités et les lignes qui les relient.',
      anchorHint: 'Choisis le lieu central détaillé localement et nommé comme un point dans le réseau régional.',
      correctFeedback:
        'La petite fenêtre montre le secteur local autour de la gare. La grande relie Valrive à Montel et Clairpré dans la région proche. La gare de Valrive passe d’un lieu détaillé à un nœud repéré dans le réseau.',
      invariant:
        'Un même lieu peut être détaillé localement puis devenir un repère dans une organisation régionale plus étendue.'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let current: Variation = variations[0];
  let selected: Selection = { near: null, wide: null, anchor: null };
  let submitted: Selection = { near: null, wide: null, anchor: null };
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

  function frameFor(side: Side, source: Selection = selected): FrameOption | undefined {
    const options = side === 'near' ? current.nearOptions : current.wideOptions;
    return options.find((option) => option.id === source[side]);
  }

  function anchorFor(source: Selection = selected): AnchorOption | undefined {
    return current.anchors.find((anchor) => anchor.id === source.anchor);
  }

  function attemptKind(option: FrameOption | AnchorOption): AttemptKind {
    if (option.correct) return 'correct';
    if (option.plannedWrong) return 'incorrect';
    return undefined;
  }

  function isReady(source: Selection = selected): boolean {
    return Boolean(source.near && source.wide && source.anchor);
  }

  function isCorrect(source: Selection): boolean {
    return Boolean(
      frameFor('near', source)?.correct &&
      frameFor('wide', source)?.correct &&
      anchorFor(source)?.correct
    );
  }

  function hasValidInclusion(source: Selection = selected): boolean {
    const near = frameFor('near', source);
    const wide = frameFor('wide', source);
    return Boolean(near && wide && wide.extent > near.extent);
  }

  function inclusionText(source: Selection = selected): string {
    const near = frameFor('near', source);
    const wide = frameFor('wide', source);
    if (!near && !wide) return 'Les deux fenêtres attendent leur étendue.';
    if (!near) return `La grande fenêtre montre « ${wide?.label} ». Il manque la petite vue à placer dedans.`;
    if (!wide) return `La petite fenêtre montre « ${near.label} ». Il manque une vue plus large autour.`;
    if (wide.extent <= near.extent) {
      return `! « ${wide.label} » n’est pas plus étendu que « ${near.label} » : la grande fenêtre ne peut pas contenir la petite.`;
    }
    return `↳ Emboîtement visible : « ${near.label} » tient dans « ${wide.label} ». Les informations montrées ne sont pas les mêmes.`;
  }

  function anchorText(source: Selection = selected): string {
    const anchor = anchorFor(source);
    if (!anchor) return 'Aucun repère commun n’est encore posé.';
    if (anchor.nearPresence && anchor.widePresence) {
      return `⌖ « ${anchor.label} » apparaît dans les deux vues : ${anchor.nearPresence} / ${anchor.widePresence}.`;
    }
    if (anchor.nearPresence) {
      return `! « ${anchor.label} » apparaît seulement dans la petite vue (${anchor.nearPresence}).`;
    }
    return `! « ${anchor.label} » apparaît seulement dans la grande vue (${anchor.widePresence ?? 'repère extérieur'}).`;
  }

  function chooseFrame(side: Side, id: string): void {
    if (phase !== 'active' && phase !== 'retry') return;
    selected = { ...selected, [side]: id };
    const choice = frameFor(side);
    announcement = `${side === 'near' ? 'Petite' : 'Grande'} fenêtre réglée sur ${choice?.label ?? ''}. ${inclusionText()}`;
  }

  function chooseAnchor(id: string): void {
    if (phase !== 'active' && phase !== 'retry') return;
    selected = { ...selected, anchor: id };
    announcement = anchorText();
  }

  function focusStage(message: string): void {
    announcement = message;
    setTimeout(() => {
      rootElement?.querySelector<HTMLElement>('[data-focus-target]')?.focus();
    }, 0);
  }

  function emptySelection(): Selection {
    return { near: null, wide: null, anchor: null };
  }

  function preset(kind: CoarseKind): Selection {
    const pickFrame = (options: FrameOption[]): FrameOption =>
      options.find((option) => kind === 'correct' ? option.correct : option.plannedWrong) ?? options[0];
    const anchor = current.anchors.find((option) => kind === 'correct' ? option.correct : option.plannedWrong) ?? current.anchors[0];
    return {
      near: pickFrame(current.nearOptions).id,
      wide: pickFrame(current.wideOptions).id,
      anchor: anchor.id
    };
  }

  function presetLabel(kind: CoarseKind): string {
    const response = preset(kind);
    return `${frameFor('near', response)?.label} → ${frameFor('wide', response)?.label} · repère : ${anchorFor(response)?.label}`;
  }

  function coarseKinds(): CoarseKind[] {
    return currentIndex % 2 === 0 ? ['incorrect', 'correct'] : ['correct', 'incorrect'];
  }

  function submitConstruction(response: Selection = selected): void {
    if (!isReady(response) || (phase !== 'active' && phase !== 'retry')) return;
    selected = { ...response };
    submitted = { ...response };

    if (isCorrect(response)) {
      if (!completedVariations.includes(current.id)) {
        completedVariations = [...completedVariations, current.id];
      }
      phase = 'correct';
      focusStage(`Emboîtement cohérent pour ${current.pair}. Lis pourquoi les deux vues se relient.`);
      return;
    }

    phase = 'incorrect';
    focusStage(`Construction à réviser pour ${current.pair}. Ton montage reste affiché.`);
  }

  function submitCoarse(kind: CoarseKind): void {
    submitConstruction(preset(kind));
  }

  function incorrectExplanation(): string {
    const near = frameFor('near', submitted);
    const wide = frameFor('wide', submitted);
    const anchor = anchorFor(submitted);
    const parts: string[] = [];

    if (near && !near.correct) parts.push(near.correction);
    if (wide && !wide.correct) parts.push(wide.correction);
    if (anchor && !anchor.correct) parts.push(anchor.correction);
    return parts.join(' ');
  }

  function begin(): void {
    currentIndex = 0;
    current = variations[0];
    selected = emptySelection();
    submitted = emptySelection();
    completedVariations = [];
    phase = 'active';
    focusStage(`Première paire : ${current.pair}. Règle les deux fenêtres, puis pose un repère commun.`);
  }

  function retry(): void {
    phase = 'retry';
    focusStage('Mode indice ouvert. Le montage envoyé est conservé et chaque réglage peut être remplacé.');
  }

  function continueStudy(): void {
    if (currentIndex === variations.length - 1) {
      if (completedVariations.length === variations.length) {
        phase = 'complete';
        focusStage('Les trois paires de vues sont construites. Lis le repère final sur le changement d’échelle.');
      }
      return;
    }

    currentIndex += 1;
    current = variations[currentIndex];
    selected = emptySelection();
    submitted = emptySelection();
    phase = 'active';
    focusStage(`Nouvelle paire : ${current.pair}. L’espace contenu et l’espace contenant changent.`);
  }
</script>

<svelte:head>
  <title>L’atlas à deux fenêtres · EX-0312</title>
  <meta
    name="description"
    content="Étude interactive de géographie 6H pour construire deux échelles locales emboîtées et les relier par un repère commun."
  />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0312"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState()}
>
  <main
    class="atlas"
    bind:this={rootElement}
    data-smoke-contract="6h-v1"
    data-exercise-id="EX-0312"
  >
    <p class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>

    <header class="atlas-bar">
      <a class="wordmark" href="#atlas-content" aria-label="Aller au contenu de l’atlas">
        <span aria-hidden="true">▣</span>
        <span><strong>ATLAS</strong><small>à deux fenêtres</small></span>
      </a>
      {#if phase !== 'intro' && phase !== 'complete'}
        <div class="progress" aria-label={`Paire ${currentIndex + 1} sur ${variations.length}`}>
          <span>PAIRE 0{currentIndex + 1}</span>
          <ol>
            {#each variations as variation, index}
              <li class:past={index < currentIndex} class:current={index === currentIndex}>
                <span class="sr-only">{variation.pair} : {index < currentIndex ? 'terminée' : index === currentIndex ? 'en cours' : 'à venir'}</span>
              </li>
            {/each}
          </ol>
        </div>
      {:else}
        <span class="bar-note">GÉOGRAPHIE · SANS CHRONOMÈTRE</span>
      {/if}
    </header>

    {#if phase === 'intro'}
      <section class="intro" id="atlas-content" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="intro-copy">
          <p class="overline">Fabrique un passage du proche au plus large</p>
          <h1 id="intro-title">Un même lieu.<br /><em>Deux étendues.</em></h1>
          <p class="intro-lead">
            Tu vas construire deux vues qui s’emboîtent. La <strong>petite fenêtre</strong> garde
            les détails d’un lieu. La <strong>grande fenêtre</strong> montre l’espace qui le
            contient et ses relations avec d’autres lieux.
          </p>

          <div class="definition">
            <span aria-hidden="true">↔</span>
            <p>
              <strong>Ici, l’échelle désigne l’étendue montrée.</strong> Quand la vue s’élargit,
              certains petits détails disparaissent et de nouvelles relations apparaissent.
            </p>
          </div>

          <ol class="intro-steps">
            <li><span>01</span><p><strong>Règle</strong> la petite vue.</p></li>
            <li><span>02</span><p><strong>Ouvre</strong> la vue qui la contient.</p></li>
            <li><span>03</span><p><strong>Pose</strong> un repère visible dans les deux.</p></li>
            <li><span>04</span><p><strong>Soumets</strong> seulement après avoir observé l’emboîtement.</p></li>
          </ol>

          <button class="primary" type="button" data-smoke-action="start" onclick={begin}>
            Déplier la première paire <span aria-hidden="true">→</span>
          </button>
          <p class="control-note">Boutons utilisables au toucher, ou avec Tab puis Entrée ou Espace. Aucun glisser-déposer.</p>
        </div>

        <aside class="intro-object" aria-label="Exemple d’une petite vue contenue dans une grande vue">
          <div class="sample-wide">
            <span>GRANDE VUE · QUARTIER</span>
            <div class="sample-streets" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div class="sample-near"><span>PETITE VUE</span><strong>LOGEMENT</strong></div>
            <b class="sample-pin">⌖ même lieu</b>
          </div>
          <p><strong>Contenir n’est pas agrandir une image.</strong> Chaque fenêtre sélectionne une autre étendue et d’autres informations.</p>
        </aside>
      </section>
    {:else if phase === 'active' || phase === 'retry'}
      <section
        class="study"
        class:retry-mode={phase === 'retry'}
        id="atlas-content"
        data-smoke-state={phase}
        data-smoke-variation={current.id}
        aria-labelledby="study-title"
      >
        <header class="study-heading">
          <div>
            <p class="overline">{current.folio} · {current.theme}</p>
            <h1 id="study-title" tabindex="-1" data-focus-target>{current.title}</h1>
          </div>
          <span class="pair-stamp">{current.pair}</span>
        </header>

        <div class="mission-strip">
          <div><span>MISSION</span><p>{current.mission}</p></div>
          <div><span>ESPACE PROCHE FICTIF</span><p>{current.nearbyContext}</p></div>
          <div><span>LIEN PLUS LOINTAIN</span><p>{current.fartherLink}</p></div>
        </div>

        {#if phase === 'retry'}
          <aside class="scaffold" role="status" aria-labelledby="scaffold-title">
            <div class="scaffold-mark" aria-hidden="true">?</div>
            <div>
              <p class="overline">Reprise guidée · montage conservé</p>
              <h2 id="scaffold-title">Teste les trois relations une par une.</h2>
              <p>{current.scaffoldLead}</p>
              <ol>
                <li><strong>Petite fenêtre :</strong> {current.nearHint}</li>
                <li><strong>Grande fenêtre :</strong> {current.wideHint}</li>
                <li><strong>Agrafe :</strong> {current.anchorHint}</li>
              </ol>
            </div>
          </aside>
        {/if}

        <div class="studio-grid">
          <section class="control-table" aria-labelledby="controls-title">
            <div class="table-heading">
              <div>
                <p class="overline">Table de réglage</p>
                <h2 id="controls-title">Construis avant de décider</h2>
              </div>
              <span>{[selected.near, selected.wide, selected.anchor].filter(Boolean).length}/3 réglages</span>
            </div>

            <fieldset class="control-group">
              <legend><span>01</span><div><strong>Petite fenêtre</strong><small>{current.nearPrompt}</small></div></legend>
              <div class="option-list">
                {#each current.nearOptions as option}
                  <button
                    type="button"
                    class="scale-option"
                    class:selected={selected.near === option.id}
                    aria-pressed={selected.near === option.id}
                    data-smoke-attempt={attemptKind(option)}
                    data-smoke-step={attemptKind(option) ? '1' : undefined}
                    onclick={() => chooseFrame('near', option.id)}
                  >
                    <span class="option-token" aria-hidden="true">{option.extent}</span>
                    <span class="option-copy"><strong>{option.label}</strong><small>{option.snapshot}</small></span>
                    <span class="option-state">{selected.near === option.id ? '✓ Réglé' : 'Régler'}</span>
                  </button>
                {/each}
              </div>
            </fieldset>

            <fieldset class="control-group">
              <legend><span>02</span><div><strong>Grande fenêtre</strong><small>{current.widePrompt}</small></div></legend>
              <div class="option-list">
                {#each current.wideOptions as option}
                  <button
                    type="button"
                    class="scale-option wide-option"
                    class:selected={selected.wide === option.id}
                    aria-pressed={selected.wide === option.id}
                    data-smoke-attempt={attemptKind(option)}
                    data-smoke-step={attemptKind(option) ? '2' : undefined}
                    onclick={() => chooseFrame('wide', option.id)}
                  >
                    <span class="option-token" aria-hidden="true">{option.extent}</span>
                    <span class="option-copy"><strong>{option.label}</strong><small>{option.snapshot}</small></span>
                    <span class="option-state">{selected.wide === option.id ? '✓ Réglé' : 'Régler'}</span>
                  </button>
                {/each}
              </div>
            </fieldset>

            <fieldset class="control-group anchor-group">
              <legend><span>03</span><div><strong>Agrafe les deux vues</strong><small>Quel repère permet de retrouver le même lieu ?</small></div></legend>
              <div class="anchor-options">
                {#each current.anchors as anchor}
                  <button
                    type="button"
                    class:selected={selected.anchor === anchor.id}
                    aria-pressed={selected.anchor === anchor.id}
                    data-smoke-attempt={attemptKind(anchor)}
                    data-smoke-step={attemptKind(anchor) ? '3' : undefined}
                    onclick={() => chooseAnchor(anchor.id)}
                  >
                    <span aria-hidden="true">⌖</span>
                    <strong>{anchor.label}</strong>
                    <small>{selected.anchor === anchor.id ? '✓ Repère posé' : 'Poser ce repère'}</small>
                  </button>
                {/each}
              </div>
            </fieldset>
          </section>

          <aside class="live-atlas" aria-labelledby="live-title">
            <div class="live-heading">
              <div><p class="overline">Conséquence en direct</p><h2 id="live-title">Ce que tes fenêtres montrent</h2></div>
              <span class:linked={hasValidInclusion()}>{hasValidInclusion() ? '↳ emboîtées' : '! à régler'}</span>
            </div>

            <div class="extent-ruler" aria-label="Comparaison textuelle des étendues sélectionnées">
              <span>serré</span>
              <div>
                {#each [1, 2, 3, 4, 5] as level}
                  <i
                    class:near-mark={Boolean(frameFor('near')) && level <= (frameFor('near')?.extent ?? 0)}
                    class:wide-mark={Boolean(frameFor('wide')) && level <= (frameFor('wide')?.extent ?? 0)}
                  ><span class="sr-only">niveau d’étendue {level}</span></i>
                {/each}
              </div>
              <span>large</span>
            </div>

            <div class="window-model" class:collision={Boolean(frameFor('near') && frameFor('wide')) && !hasValidInclusion()}>
              <section class="wide-window" aria-label="Grande fenêtre construite">
                <header><span>GRANDE FENÊTRE</span><strong>{frameFor('wide')?.label ?? 'étendue à choisir'}</strong></header>
                <ul>
                  {#if frameFor('wide')}
                    {#each frameFor('wide')?.features ?? [] as feature}<li>{feature}</li>{/each}
                  {:else}
                    <li>aucune information affichée</li>
                  {/if}
                </ul>
                <section class="near-window" aria-label="Petite fenêtre construite">
                  <header><span>PETITE FENÊTRE</span><strong>{frameFor('near')?.label ?? 'étendue à choisir'}</strong></header>
                  <ul>
                    {#if frameFor('near')}
                      {#each frameFor('near')?.features ?? [] as feature}<li>{feature}</li>{/each}
                    {:else}
                      <li>aucun détail affiché</li>
                    {/if}
                  </ul>
                </section>
              </section>
            </div>

            <div class="inclusion-status" role="status" aria-live="polite">
              <strong>Test d’inclusion</strong>
              <p>{inclusionText()}</p>
            </div>

            <div class="anchor-bridge">
              <div>
                <span>dans la petite vue</span>
                <strong>{anchorFor()?.nearPresence ? `⌖ ${anchorFor()?.label}` : '— repère absent —'}</strong>
                <small>{anchorFor()?.nearPresence ?? 'rien à relier ici'}</small>
              </div>
              <b aria-hidden="true">↔</b>
              <div>
                <span>dans la grande vue</span>
                <strong>{anchorFor()?.widePresence ? `⌖ ${anchorFor()?.label}` : '— repère absent —'}</strong>
                <small>{anchorFor()?.widePresence ?? 'rien à relier ici'}</small>
              </div>
              <p>{anchorText()}</p>
            </div>
          </aside>
        </div>

        <section class="coarse-path" aria-labelledby="coarse-title">
          <div>
            <p class="overline">Lecture compacte</p>
            <h2 id="coarse-title">Ou compare deux montages complets</h2>
            <p>Chaque bouton sélectionne puis soumet un montage déjà assemblé. Les trois réglages restent écrits avant la décision et suivent la même vérification que sur la table.</p>
          </div>
          <div class="coarse-options">
            {#each coarseKinds() as kind, index}
              <button type="button" data-smoke-answer={kind} onclick={() => submitCoarse(kind)}>
                <span>Montage {index === 0 ? 'A' : 'B'} · sélectionner et soumettre</span>
                <strong>{presetLabel(kind)}</strong>
              </button>
            {/each}
          </div>
        </section>

        <div class="submit-row">
          <p>
            <span aria-hidden="true">◆</span>
            {isReady() ? 'Les trois réglages sont visibles. Vérifie l’emboîtement avant de décider.' : 'Règle les deux fenêtres et le repère ; le bouton de décision s’ouvrira ensuite.'}
          </p>
          <button
            class="submit"
            type="button"
            disabled={!isReady()}
            data-smoke-action="submit"
            onclick={() => submitConstruction()}
          >
            Soumettre cette construction <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    {:else if phase === 'incorrect'}
      <section
        class="feedback-page incorrect-page"
        id="atlas-content"
        data-smoke-state="incorrect"
        data-smoke-variation={current.id}
        aria-labelledby="incorrect-title"
      >
        <header class="feedback-heading">
          <span class="feedback-mark" aria-hidden="true">×</span>
          <div>
            <p class="overline">{current.folio} · construction conservée</p>
            <h1 id="incorrect-title" tabindex="-1" data-focus-target>Les deux vues ne racontent pas encore la mission.</h1>
          </div>
        </header>

        <div class="submitted-build" aria-label="Construction soumise">
          <div><span>Petite fenêtre soumise</span><strong>{frameFor('near', submitted)?.label}</strong><small>{frameFor('near', submitted)?.snapshot}</small></div>
          <b aria-hidden="true">dans</b>
          <div><span>Grande fenêtre soumise</span><strong>{frameFor('wide', submitted)?.label}</strong><small>{frameFor('wide', submitted)?.snapshot}</small></div>
          <div class="submitted-anchor"><span>Repère soumis</span><strong>⌖ {anchorFor(submitted)?.label}</strong></div>
        </div>

        <div
          class="feedback-message wrong"
          role="alert"
          data-smoke-feedback="incorrect"
          data-smoke-feedback-detail="specific"
        >
          <span aria-hidden="true">!</span>
          <div><h2>Construction à réviser</h2><p>{incorrectExplanation()}</p></div>
        </div>

        <p class="recovery-note">Aucun réglage n’est effacé. L’indice te fera tester l’étendue et le repère séparément.</p>
        <button class="primary" type="button" data-smoke-action="retry" onclick={retry}>
          Reprendre avec les trois indices <span aria-hidden="true">↺</span>
        </button>
      </section>
    {:else if phase === 'correct'}
      <div class="success-flow" id="atlas-content">
        <section
          class="feedback-page correct-page"
          data-smoke-state="correct"
          data-smoke-variation={current.id}
          aria-labelledby="correct-title"
        >
          <header class="feedback-heading">
            <span class="feedback-mark" aria-hidden="true">✓</span>
            <div>
              <p class="overline">{current.folio} · passage construit</p>
              <h1 id="correct-title" tabindex="-1" data-focus-target>La petite vue trouve sa place dans la grande.</h1>
            </div>
          </header>

          <div class="submitted-build coherent" aria-label="Construction correcte soumise">
            <div><span>Vue détaillée</span><strong>{frameFor('near', submitted)?.label}</strong><small>{frameFor('near', submitted)?.features.join(' · ')}</small></div>
            <b aria-hidden="true">↳ dans</b>
            <div><span>Vue plus étendue</span><strong>{frameFor('wide', submitted)?.label}</strong><small>{frameFor('wide', submitted)?.features.join(' · ')}</small></div>
            <div class="submitted-anchor"><span>Repère commun</span><strong>⌖ {anchorFor(submitted)?.label}</strong></div>
          </div>

          <div
            class="feedback-message right"
            role="status"
            data-smoke-feedback="correct"
            data-smoke-feedback-detail="specific"
          >
            <span aria-hidden="true">✓</span>
            <div><h2>Emboîtement expliqué</h2><p>{current.correctFeedback}</p></div>
          </div>

          <aside class="invariant-card">
            <span>Ce qui change quand la fenêtre s’élargit</span>
            <p>{current.invariant}</p>
          </aside>
        </section>

        <aside
          class="continuation"
          data-smoke-state="continuation"
          data-smoke-variation={current.id}
          aria-label="Continuer après le retour"
        >
          <span>{completedVariations.length} / {variations.length} paires construites</span>
          <h2>{currentIndex === variations.length - 1 ? 'Les trois étendues sont reliées.' : 'La prochaine paire change d’étendue.'}</h2>
          <p>
            {currentIndex === variations.length - 1
              ? 'Lis le bilan qui rassemble appartement, quartier, ville, local et régional.'
              : `Tu passeras de « ${current.pair} » à « ${variations[currentIndex + 1].pair} ».`}
          </p>
          <button class="primary" type="button" data-smoke-action="continue" onclick={continueStudy}>
            {currentIndex === variations.length - 1 ? 'Refermer l’atlas' : 'Déplier la paire suivante'}
            <span aria-hidden="true">→</span>
          </button>
        </aside>
      </div>
    {:else}
      <section class="completion" id="atlas-content" data-smoke-state="complete" aria-labelledby="complete-title">
        <div class="completion-frames" aria-hidden="true"><span>LOCAL</span><i><b>PROCHE</b></i><strong>RÉGIONAL</strong></div>
        <p class="overline">Atlas replié · trois paires parcourues</p>
        <h1 id="complete-title" tabindex="-1" data-focus-target>Changer d’échelle, c’est changer ce que la vue permet de relier.</h1>
        <p class="completion-lead" data-smoke-completion>
          Tu as construit trois petites vues contenues dans des vues plus étendues, puis utilisé un même repère pour passer de l’une à l’autre.
        </p>
        <div class="takeaway-grid">
          <article><span>1</span><h2>Regarder l’étendue</h2><p>Quel espace entre dans le cadre ?</p></article>
          <article><span>2</span><h2>Comparer l’information</h2><p>Quels détails partent ? Quelles relations arrivent ?</p></article>
          <article><span>3</span><h2>Garder un repère</h2><p>Quel lieu reste identifiable dans les deux vues ?</p></article>
        </div>
        <p class="completion-boundary">Ce parcours termine l’atelier ; il ne mesure pas une maîtrise et n’enregistre aucune réponse.</p>
      </section>
    {/if}
  </main>
</div>

<style>
  .legacy-smoke-root {
    display: contents;
  }

  .atlas,
  .atlas * {
    box-sizing: border-box;
  }

  .atlas {
    --ink: #25152f;
    --paper: #fff9e8;
    --paper-deep: #efe4c7;
    --coral: #f25937;
    --acid: #cbe957;
    --teal: #166a70;
    --blue: #3156a3;
    --muted: #655d69;
    width: 100%;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background:
      repeating-linear-gradient(0deg, rgba(37, 21, 47, 0.025) 0 1px, transparent 1px 7px),
      var(--paper-deep);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .atlas-bar {
    display: flex;
    width: min(1220px, 100%);
    min-height: 74px;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin: 0 auto;
    padding: 12px clamp(14px, 3vw, 34px);
    border-bottom: 3px solid var(--ink);
    background: var(--paper);
  }

  .wordmark {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    gap: 10px;
    color: var(--ink);
    text-decoration: none;
  }

  .wordmark > span:first-child {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border: 3px solid var(--ink);
    background: var(--acid);
    font-size: 1.35rem;
  }

  .wordmark strong,
  .wordmark small {
    display: block;
  }

  .wordmark strong {
    font: 950 1.1rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: .16em;
  }

  .wordmark small {
    margin-top: 3px;
    font-weight: 750;
  }

  .bar-note,
  .progress > span {
    font: 850 .72rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: .08em;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .progress ol {
    display: flex;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .progress li {
    width: 31px;
    height: 12px;
    border: 2px solid var(--ink);
    background: transparent;
  }

  .progress li.current {
    background: var(--coral);
  }

  .progress li.past {
    background: var(--teal);
  }

  .intro,
  .study,
  .feedback-page,
  .success-flow,
  .completion {
    width: min(1220px, 100%);
    margin: 0 auto;
    padding: clamp(24px, 5vw, 64px) clamp(14px, 3vw, 34px) 70px;
  }

  .intro {
    display: grid;
    min-height: min(760px, calc(100vh - 74px));
    grid-template-columns: minmax(0, 1.08fr) minmax(300px, .82fr);
    align-items: center;
    gap: clamp(30px, 7vw, 90px);
  }

  .overline {
    margin: 0;
    color: #8d2d1d;
    font-size: .72rem;
    font-weight: 950;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  h1,
  h2,
  p,
  strong,
  small,
  span {
    overflow-wrap: anywhere;
  }

  .intro h1,
  .study-heading h1,
  .feedback-heading h1,
  .completion h1 {
    margin: 13px 0 20px;
    font-family: 'Arial Black', Inter, ui-sans-serif, system-ui, sans-serif;
    font-weight: 900;
    letter-spacing: -.055em;
    line-height: .98;
  }

  .intro h1 {
    max-width: 760px;
    font-size: clamp(3rem, 7vw, 6.6rem);
  }

  .intro h1 em {
    color: var(--teal);
    font-style: normal;
  }

  .intro-lead {
    max-width: 700px;
    color: #4c4252;
    font-size: clamp(1.05rem, 2vw, 1.28rem);
    line-height: 1.58;
  }

  .definition {
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr);
    gap: 12px;
    margin: 24px 0;
    padding: 16px;
    border: 3px solid var(--ink);
    background: var(--acid);
  }

  .definition > span {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--paper);
    font-weight: 950;
  }

  .definition p {
    margin: 0;
    line-height: 1.5;
  }

  .intro-steps {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin: 24px 0;
    padding: 0;
    list-style: none;
  }

  .intro-steps li {
    display: grid;
    min-height: 70px;
    grid-template-columns: 38px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-top: 2px solid var(--ink);
  }

  .intro-steps li > span {
    font: 950 .78rem ui-monospace, monospace;
  }

  .intro-steps p {
    margin: 0;
    line-height: 1.35;
  }

  button,
  .wordmark {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    min-height: 52px;
    border: 3px solid var(--ink);
    border-radius: 0;
    color: var(--ink);
    background: var(--paper);
    font: inherit;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: #fff2c8;
  }

  button:focus-visible,
  .wordmark:focus-visible,
  [tabindex="-1"]:focus {
    outline: 5px solid #067aeb;
    outline-offset: 4px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: .48;
  }

  .primary,
  .submit {
    display: inline-flex;
    min-height: 56px;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 13px 18px;
    color: white;
    background: var(--ink);
    font-weight: 900;
  }

  .primary:hover:not(:disabled),
  .submit:hover:not(:disabled) {
    background: var(--teal);
  }

  .control-note {
    color: var(--muted);
    font-size: .82rem;
    line-height: 1.45;
  }

  .intro-object {
    min-width: 0;
  }

  .sample-wide {
    position: relative;
    min-height: 430px;
    padding: 20px;
    border: 5px solid var(--ink);
    background: var(--coral);
  }

  .sample-wide > span,
  .sample-near > span {
    font: 900 .7rem ui-monospace, monospace;
    letter-spacing: .08em;
  }

  .sample-streets {
    position: absolute;
    inset: 70px 28px 28px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .sample-streets i {
    border: 3px solid var(--ink);
    background: var(--paper);
  }

  .sample-near {
    position: absolute;
    inset: 148px 82px 84px 68px;
    display: grid;
    place-items: center;
    border: 5px solid var(--ink);
    background: var(--acid);
    text-align: center;
  }

  .sample-near strong {
    font: 950 clamp(1.5rem, 4vw, 3rem) 'Arial Black', sans-serif;
  }

  .sample-pin {
    position: absolute;
    right: 15px;
    bottom: 16px;
    padding: 8px;
    border: 2px solid var(--ink);
    background: var(--paper);
  }

  .intro-object > p {
    margin: 18px 0 0;
    line-height: 1.5;
  }

  .study-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
  }

  .study-heading h1 {
    max-width: 850px;
    font-size: clamp(2.4rem, 6vw, 5.4rem);
  }

  .pair-stamp {
    max-width: 240px;
    padding: 12px;
    border: 3px solid var(--ink);
    background: var(--acid);
    font: 900 .82rem/1.35 ui-monospace, monospace;
    text-align: center;
    text-transform: uppercase;
  }

  .mission-strip {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    margin: 20px 0 24px;
    border: 3px solid var(--ink);
    background: var(--paper);
  }

  .mission-strip > div {
    min-width: 0;
    padding: 14px;
    border-right: 2px solid var(--ink);
  }

  .mission-strip > div:last-child {
    border-right: 0;
  }

  .mission-strip span,
  .submitted-build span,
  .anchor-bridge span,
  .invariant-card span {
    color: var(--muted);
    font: 900 .65rem ui-monospace, monospace;
    letter-spacing: .09em;
    text-transform: uppercase;
  }

  .mission-strip p {
    margin: 7px 0 0;
    line-height: 1.48;
  }

  .scaffold {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 16px;
    margin: 20px 0;
    padding: 18px;
    border: 3px dashed var(--ink);
    background: #fff0b8;
  }

  .scaffold-mark {
    display: grid;
    width: 56px;
    height: 56px;
    place-items: center;
    border: 3px solid var(--ink);
    background: var(--coral);
    font-size: 1.6rem;
    font-weight: 950;
  }

  .scaffold h2 {
    margin: 5px 0;
    font-size: 1.35rem;
  }

  .scaffold p {
    line-height: 1.5;
  }

  .scaffold ol {
    display: grid;
    gap: 7px;
    margin: 10px 0 0;
    padding-left: 22px;
  }

  .studio-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(350px, .95fr);
    gap: 18px;
    align-items: start;
  }

  .control-table,
  .live-atlas {
    min-width: 0;
    border: 3px solid var(--ink);
    background: var(--paper);
  }

  .table-heading,
  .live-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 16px;
    border-bottom: 3px solid var(--ink);
  }

  .table-heading h2,
  .live-heading h2 {
    margin: 5px 0 0;
    font-size: 1.35rem;
  }

  .table-heading > span,
  .live-heading > span {
    padding: 8px;
    border: 2px solid var(--ink);
    font: 900 .7rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .live-heading > span.linked {
    background: var(--acid);
  }

  .control-group {
    min-width: 0;
    margin: 0;
    padding: 16px;
    border: 0;
    border-bottom: 2px solid var(--ink);
  }

  .control-group legend {
    display: grid;
    width: 100%;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 0;
  }

  .control-group legend > span {
    font: 950 .75rem ui-monospace, monospace;
  }

  .control-group legend strong,
  .control-group legend small {
    display: block;
  }

  .control-group legend small {
    margin-top: 3px;
    color: var(--muted);
    line-height: 1.4;
  }

  .option-list {
    display: grid;
    gap: 8px;
    margin-top: 12px;
  }

  .scale-option {
    display: grid;
    min-height: 76px;
    grid-template-columns: 46px minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    padding: 9px;
    text-align: left;
  }

  .scale-option.selected,
  .anchor-options button.selected {
    background: #e4f3a8;
    box-shadow: inset 8px 0 0 var(--teal);
  }

  .option-token {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--coral);
    font: 950 .8rem ui-monospace, monospace;
  }

  .wide-option .option-token {
    background: #8fcbd0;
  }

  .option-copy strong,
  .option-copy small,
  .option-state {
    display: block;
  }

  .option-copy small {
    margin-top: 3px;
    color: var(--muted);
    line-height: 1.35;
  }

  .option-state {
    max-width: 72px;
    font-size: .7rem;
    font-weight: 900;
    text-align: right;
    text-transform: uppercase;
  }

  .anchor-group {
    border-bottom: 0;
  }

  .anchor-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-top: 12px;
  }

  .anchor-options button {
    display: grid;
    min-height: 116px;
    align-content: center;
    gap: 6px;
    padding: 10px;
    text-align: left;
  }

  .anchor-options button > span {
    font-size: 1.35rem;
  }

  .anchor-options button small {
    color: var(--muted);
  }

  .live-atlas {
    position: sticky;
    top: 12px;
  }

  .extent-ruler {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 8px;
    align-items: center;
    padding: 14px 16px 0;
    font: 800 .66rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .extent-ruler > div {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
  }

  .extent-ruler i {
    height: 15px;
    border: 2px solid var(--ink);
    background: var(--paper-deep);
  }

  .extent-ruler i.wide-mark {
    background: #8fcbd0;
  }

  .extent-ruler i.near-mark {
    border-top: 7px solid var(--coral);
  }

  .window-model {
    padding: 16px;
  }

  .wide-window {
    min-height: 360px;
    padding: 14px;
    border: 5px solid var(--teal);
    background:
      linear-gradient(90deg, transparent 48%, rgba(37, 21, 47, .12) 48% 52%, transparent 52%),
      repeating-linear-gradient(45deg, #d6ecdf 0 14px, #c7e2d4 14px 28px);
  }

  .wide-window > header,
  .near-window > header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 7px;
    padding-bottom: 8px;
    border-bottom: 2px solid currentColor;
  }

  .wide-window header span,
  .near-window header span {
    font: 900 .62rem ui-monospace, monospace;
    letter-spacing: .08em;
  }

  .wide-window > ul,
  .near-window > ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 12px 0;
    padding: 0;
    list-style: none;
  }

  .wide-window > ul li,
  .near-window > ul li {
    padding: 5px 7px;
    border: 2px solid var(--ink);
    background: var(--paper);
    font-size: .72rem;
    font-weight: 800;
  }

  .near-window {
    width: min(78%, 300px);
    min-height: 175px;
    margin: 42px auto 8px;
    padding: 12px;
    border: 5px solid var(--coral);
    background:
      repeating-linear-gradient(90deg, transparent 0 28px, rgba(37, 21, 47, .09) 28px 30px),
      var(--acid);
  }

  .window-model.collision .wide-window {
    border-style: dashed;
  }

  .window-model.collision .near-window {
    width: 100%;
    margin-top: 18px;
    border-style: double;
  }

  .inclusion-status {
    margin: 0 16px 12px;
    padding: 12px;
    border-left: 7px solid var(--blue);
    background: #ece9f5;
  }

  .inclusion-status p {
    margin: 5px 0 0;
    line-height: 1.45;
  }

  .anchor-bridge {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: 8px;
    align-items: center;
    margin: 0 16px 16px;
    padding: 12px;
    border: 3px solid var(--ink);
    background: #fff1c8;
  }

  .anchor-bridge > div {
    min-width: 0;
  }

  .anchor-bridge strong,
  .anchor-bridge small {
    display: block;
  }

  .anchor-bridge strong {
    margin: 5px 0;
  }

  .anchor-bridge small {
    color: var(--muted);
  }

  .anchor-bridge > b {
    font-size: 1.35rem;
  }

  .anchor-bridge > p {
    grid-column: 1 / -1;
    margin: 7px 0 0;
    padding-top: 8px;
    border-top: 2px dotted var(--ink);
    line-height: 1.4;
  }

  .coarse-path {
    display: grid;
    grid-template-columns: minmax(220px, .65fr) minmax(0, 1.35fr);
    gap: 14px;
    margin-top: 18px;
    padding: 16px;
    border: 3px solid var(--ink);
    background: #dfd8c5;
  }

  .coarse-path h2 {
    margin: 5px 0;
    font-size: 1.2rem;
  }

  .coarse-path p {
    margin: 6px 0 0;
    line-height: 1.4;
  }

  .coarse-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .coarse-options button {
    display: grid;
    min-height: 96px;
    align-content: center;
    gap: 6px;
    padding: 12px;
    text-align: left;
  }

  .coarse-options button span {
    color: var(--muted);
    font: 850 .65rem/1.3 ui-monospace, monospace;
    text-transform: uppercase;
  }

  .coarse-options button strong {
    line-height: 1.35;
  }

  .submit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 14px;
    padding: 16px;
    border: 3px solid var(--ink);
    background: var(--acid);
  }

  .submit-row p {
    max-width: 650px;
    margin: 0;
    line-height: 1.45;
  }

  .feedback-page {
    min-height: calc(100vh - 74px);
  }

  .feedback-heading {
    display: grid;
    grid-template-columns: 84px minmax(0, 1fr);
    gap: 20px;
    align-items: center;
  }

  .feedback-mark {
    display: grid;
    width: 80px;
    height: 80px;
    place-items: center;
    border: 5px solid var(--ink);
    background: var(--coral);
    font: 950 2.4rem 'Arial Black', sans-serif;
  }

  .correct-page .feedback-mark {
    background: var(--acid);
  }

  .feedback-heading h1 {
    max-width: 940px;
    font-size: clamp(2.4rem, 6vw, 5.1rem);
  }

  .submitted-build {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: 10px;
    align-items: stretch;
    margin: 28px 0 18px;
    padding: 14px;
    border: 3px solid var(--ink);
    background: var(--paper);
  }

  .submitted-build > div:not(.submitted-anchor) {
    display: grid;
    min-width: 0;
    align-content: center;
    gap: 5px;
    padding: 14px;
    border: 3px solid var(--ink);
    background: #f7d2c5;
  }

  .submitted-build.coherent > div:not(.submitted-anchor) {
    background: #e4f3a8;
  }

  .submitted-build > b {
    align-self: center;
    font: 900 .7rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .submitted-build strong,
  .submitted-build small {
    display: block;
  }

  .submitted-build small {
    color: var(--muted);
    line-height: 1.4;
  }

  .submitted-anchor {
    grid-column: 1 / -1;
    padding: 10px 14px;
    border: 2px dashed var(--ink);
    text-align: center;
  }

  .feedback-message {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 14px;
    max-width: 990px;
    padding: 16px;
    border: 4px solid var(--ink);
  }

  .feedback-message.wrong {
    background: #ffd9c9;
  }

  .feedback-message.right {
    background: #e4f3a8;
  }

  .feedback-message > span {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 3px solid var(--ink);
    background: var(--paper);
    font-size: 1.4rem;
    font-weight: 950;
  }

  .feedback-message h2,
  .feedback-message p {
    margin: 0;
  }

  .feedback-message h2 {
    font-size: 1.25rem;
  }

  .feedback-message p {
    margin-top: 6px;
    line-height: 1.55;
  }

  .recovery-note {
    max-width: 760px;
    line-height: 1.5;
  }

  .success-flow {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 310px;
    gap: 18px;
    align-items: start;
  }

  .success-flow .feedback-page {
    width: auto;
    min-height: 0;
    margin: 0;
    padding: 0;
  }

  .invariant-card {
    max-width: 990px;
    margin-top: 14px;
    padding: 16px;
    border-left: 9px solid var(--teal);
    background: var(--paper);
  }

  .invariant-card p {
    margin: 6px 0 0;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .continuation {
    padding: 20px;
    border: 4px solid var(--ink);
    background: var(--coral);
  }

  .continuation > span {
    font: 900 .7rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .continuation h2 {
    margin: 18px 0 8px;
    font-size: 1.55rem;
    line-height: 1.1;
  }

  .continuation p {
    min-height: 110px;
    line-height: 1.5;
  }

  .continuation .primary {
    width: 100%;
  }

  .completion {
    min-height: calc(100vh - 74px);
    text-align: center;
  }

  .completion-frames {
    display: grid;
    width: min(560px, 100%);
    min-height: 240px;
    place-items: center;
    margin: 0 auto 30px;
    border: 5px solid var(--ink);
    background: var(--teal);
  }

  .completion-frames > span,
  .completion-frames > strong {
    color: white;
    font: 950 .72rem ui-monospace, monospace;
    letter-spacing: .12em;
  }

  .completion-frames i {
    display: grid;
    width: 62%;
    min-height: 120px;
    place-items: center;
    border: 5px solid var(--ink);
    background: var(--acid);
    font-style: normal;
  }

  .completion h1 {
    max-width: 980px;
    margin-right: auto;
    margin-left: auto;
    font-size: clamp(2.5rem, 6.5vw, 5.8rem);
  }

  .completion-lead {
    max-width: 780px;
    margin: 0 auto;
    font-size: 1.12rem;
    line-height: 1.6;
  }

  .takeaway-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 32px 0 20px;
    text-align: left;
  }

  .takeaway-grid article {
    min-width: 0;
    padding: 16px;
    border: 3px solid var(--ink);
    background: var(--paper);
  }

  .takeaway-grid article > span {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--acid);
    font-weight: 950;
  }

  .takeaway-grid h2 {
    margin: 12px 0 5px;
    font-size: 1.15rem;
  }

  .takeaway-grid p {
    margin: 0;
    color: var(--muted);
    line-height: 1.45;
  }

  .completion-boundary {
    color: var(--muted);
    font-size: .82rem;
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

  @media (max-width: 900px) {
    .intro,
    .studio-grid,
    .success-flow {
      grid-template-columns: 1fr;
    }

    .intro-object {
      width: min(620px, 100%);
    }

    .live-atlas {
      position: static;
    }

    .mission-strip {
      grid-template-columns: 1fr;
    }

    .mission-strip > div {
      border-right: 0;
      border-bottom: 2px solid var(--ink);
    }

    .mission-strip > div:last-child {
      border-bottom: 0;
    }

    .success-flow .feedback-page {
      order: 1;
    }

    .continuation {
      order: 2;
    }

    .continuation p {
      min-height: 0;
    }
  }

  @media (max-width: 650px) {
    .bar-note {
      display: none;
    }

    .study-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    .pair-stamp {
      max-width: none;
    }

    .anchor-options,
    .coarse-path,
    .coarse-options,
    .takeaway-grid {
      grid-template-columns: 1fr;
    }

    .anchor-options button {
      min-height: 72px;
    }

    .submit-row {
      align-items: stretch;
      flex-direction: column;
    }

    .submit-row .submit,
    .feedback-page > .primary {
      width: 100%;
    }
  }

  @media (max-width: 420px) {
    .atlas-bar {
      min-height: 64px;
      padding: 8px 10px;
    }

    .wordmark > span:first-child {
      width: 44px;
      height: 44px;
    }

    .wordmark small {
      display: none;
    }

    .progress {
      gap: 7px;
    }

    .progress > span {
      font-size: .62rem;
    }

    .progress li {
      width: 18px;
    }

    .intro,
    .study,
    .feedback-page,
    .success-flow,
    .completion {
      padding: 28px 10px 48px;
    }

    .intro {
      min-height: 0;
    }

    .intro h1 {
      font-size: 2.75rem;
    }

    .intro-steps {
      grid-template-columns: 1fr;
    }

    .sample-wide {
      min-height: 280px;
      padding: 12px;
    }

    .sample-near {
      inset: 112px 42px 52px 38px;
    }

    .study-heading h1,
    .feedback-heading h1,
    .completion h1 {
      font-size: 2.25rem;
    }

    .scaffold {
      grid-template-columns: 1fr;
      padding: 13px;
    }

    .scaffold-mark {
      width: 48px;
      height: 48px;
    }

    .table-heading,
    .live-heading {
      align-items: flex-start;
      flex-direction: column;
      padding: 12px;
    }

    .control-group {
      padding: 12px;
    }

    .scale-option {
      grid-template-columns: 44px minmax(0, 1fr);
    }

    .option-state {
      grid-column: 2;
      max-width: none;
      text-align: left;
    }

    .window-model {
      padding: 10px;
    }

    .wide-window {
      min-height: 310px;
      padding: 10px;
    }

    .near-window {
      width: 88%;
      margin-top: 30px;
    }

    .anchor-bridge {
      grid-template-columns: 1fr;
      margin: 0 10px 10px;
    }

    .anchor-bridge > b {
      transform: rotate(90deg);
      text-align: center;
    }

    .coarse-path,
    .submit-row {
      padding: 12px;
    }

    .feedback-heading {
      grid-template-columns: 56px minmax(0, 1fr);
      gap: 10px;
    }

    .feedback-mark {
      width: 54px;
      height: 54px;
      border-width: 3px;
      font-size: 1.5rem;
    }

    .submitted-build {
      grid-template-columns: 1fr;
      padding: 10px;
    }

    .submitted-build > b {
      text-align: center;
    }

    .submitted-anchor {
      grid-column: auto;
    }

    .feedback-message {
      grid-template-columns: 42px minmax(0, 1fr);
      gap: 9px;
      padding: 11px;
    }

    .feedback-message > span {
      width: 40px;
      height: 40px;
    }

    .completion-frames {
      min-height: 190px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .atlas,
    .atlas *,
    .atlas *::before,
    .atlas *::after {
      scroll-behavior: auto !important;
      animation: none !important;
      transition: none !important;
    }

    .anchor-bridge > b {
      transform: none;
    }
  }
</style>
