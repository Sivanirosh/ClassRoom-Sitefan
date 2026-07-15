<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type LayerId = 'site' | 'situation' | 'limit' | 'access';
  type AttemptKind = 'incorrect' | 'correct';

  type VisualSpec = {
    symbol: string;
    kind: string;
    x?: number;
    y?: number;
    labelX?: number;
    labelY?: number;
    path?: string;
    crosses?: boolean;
  };

  type LayerChoice = {
    id: string;
    label: string;
    detail: string;
    mapShort: string;
    consequence: string;
    correction: string;
    correct: boolean;
    smokeWrong: boolean;
    visual: VisualSpec;
  };

  type ConstructionLayer = {
    id: LayerId;
    number: string;
    label: string;
    action: string;
    question: string;
    target: string;
    selectedWord: string;
    icon: string;
    scaffold: string;
    choices: LayerChoice[];
  };

  type Variation = {
    id: string;
    folio: string;
    place: string;
    placeMark: string;
    theme: string;
    mission: string;
    mapCaption: string;
    layers: ConstructionLayer[];
    success: string;
    invariant: string;
  };

  type Selections = Partial<Record<LayerId, string>>;

  const layerOrder: LayerId[] = ['site', 'situation', 'limit', 'access'];

  const variations: Variation[] = [
    {
      id: 'rives-maison',
      folio: 'Planche 01',
      place: 'Maison des Rives',
      placeMark: 'M',
      theme: 'Habitat · loisirs',
      mission:
        'Traduis la fiche de la maison de quartier en quatre composants visibles sur le même plan.',
      mapCaption:
        'Plan assemblé de la Maison des Rives. Chaque composant choisi apparaît sur une couche distincte.',
      layers: [
        {
          id: 'site',
          number: '01',
          label: 'Site',
          action: 'Poser le terrain',
          question: 'Quelle surface poser sous la maison ?',
          target: 'terrasse sèche · terrain naturel',
          selectedWord: 'Terrain posé',
          icon: '▧',
          scaffold:
            'Regarde sous le bâtiment : la fiche demande une terrasse sèche, pas une zone où l’eau s’accumule.',
          choices: [
            {
              id: 'rives-bas-fond',
              label: 'Bas-fond humide',
              detail: 'sol naturel bas, marqué par l’eau',
              mapShort: 'bas-fond humide',
              consequence:
                'La maison apparaît sur une zone basse où l’eau peut rester après la pluie.',
              correction:
                'Ce terrain contredit le repère « terrasse sèche » de la fiche. Le site concerne bien la surface placée sous la maison.',
              correct: false,
              smokeWrong: true,
              visual: { symbol: '≈', kind: 'wet' }
            },
            {
              id: 'rives-terrasse',
              label: 'Terrasse alluviale sèche',
              detail: 'sol naturel plat, légèrement surélevé',
              mapShort: 'terrasse sèche',
              consequence:
                'La maison repose sur une terrasse naturelle plane, au-dessus de la zone humide.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: { symbol: '▰', kind: 'earth' }
            }
          ]
        },
        {
          id: 'situation',
          number: '02',
          label: 'Situation',
          action: 'Relier un voisin',
          question: 'À quel voisin relier la maison ?',
          target: 'école + logements · côté ouest',
          selectedWord: 'Voisin relié',
          icon: '◎',
          scaffold:
            'Cherche les lieux utilisés par les personnes qui fréquentent la maison : ils sont indiqués à l’ouest.',
          choices: [
            {
              id: 'rives-depot',
              label: 'Dépôt de l’autre rive',
              detail: 'bâtiment isolé, à l’est de la rivière',
              mapShort: 'dépôt isolé',
              consequence:
                'Le trait de situation relie la maison à un dépôt séparé du quartier par la rivière.',
              correction:
                'La fiche situe la maison auprès de l’école et des logements. Le dépôt ne construit pas cette relation de voisinage.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: 'D',
                kind: 'landmark',
                x: 505,
                y: 92,
                labelX: 505,
                labelY: 55
              }
            },
            {
              id: 'rives-quartier',
              label: 'École et logements',
              detail: 'deux repères proches, côté ouest',
              mapShort: 'école + maisons',
              consequence:
                'Un trait relie la maison au groupe formé par l’école et les logements proches.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: 'É',
                kind: 'landmark',
                x: 92,
                y: 126,
                labelX: 103,
                labelY: 86
              }
            }
          ]
        },
        {
          id: 'limit',
          number: '03',
          label: 'Limite',
          action: 'Tracer le bord',
          question: 'Quel bord faire apparaître ?',
          target: 'rivière · bord est',
          selectedWord: 'Bord tracé',
          icon: '┆',
          scaffold:
            'Repère le côté est de la parcelle. La fiche y place un élément naturel continu.',
          choices: [
            {
              id: 'rives-muret',
              label: 'Muret au sud',
              detail: 'petit bord construit sous la parcelle',
              mapShort: 'muret sud',
              consequence:
                'Un muret ferme le bas du plan, tandis que le côté est reste sans bord visible.',
              correction:
                'Le muret change la nature et la position du bord. La fiche demande la rivière à l’est comme limite naturelle.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: '▥',
                kind: 'wall',
                path: 'M92 319 L516 319',
                labelX: 472,
                labelY: 302
              }
            },
            {
              id: 'rives-riviere',
              label: 'Rivière à l’est',
              detail: 'bord naturel qui longe la parcelle',
              mapShort: 'rivière est',
              consequence:
                'La rivière dessine un bord naturel continu sur le côté est de la parcelle.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: '≈',
                kind: 'water',
                path: 'M456 29 C425 91 479 145 448 205 C418 266 470 320 443 367',
                labelX: 500,
                labelY: 47
              }
            }
          ]
        },
        {
          id: 'access',
          number: '04',
          label: 'Accès',
          action: 'Ouvrir la route',
          question: 'Quelle voie ouvrir jusqu’à l’entrée ?',
          target: 'arrêt de bus → entrée · côté ouest',
          selectedWord: 'Route ouverte',
          icon: '→',
          scaffold:
            'Pars de l’arrêt indiqué à l’ouest et suis une voie qui atteint réellement l’entrée sans rencontrer la rivière.',
          choices: [
            {
              id: 'rives-sentier-rive',
              label: 'Sentier de l’autre rive',
              detail: 'chemin à l’est, sans passerelle ouverte',
              mapShort: 'sentier interrompu',
              consequence:
                'Le sentier arrive de l’est mais s’arrête devant la rivière ; il ne rejoint pas l’entrée.',
              correction:
                'Une route d’accès doit atteindre la maison. Ici, la rivière coupe le sentier et aucune traversée n’est prévue dans la fiche.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: '×',
                kind: 'blocked',
                path: 'M560 286 C515 270 493 239 467 218',
                labelX: 526,
                labelY: 314,
                crosses: false
              }
            },
            {
              id: 'rives-allee-bus',
              label: 'Allée depuis l’arrêt',
              detail: 'voie piétonne qui entre par l’ouest',
              mapShort: 'arrêt → entrée',
              consequence:
                'L’allée part de l’arrêt de bus et atteint l’entrée par l’ouest, du même côté que le quartier.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: 'B',
                kind: 'open',
                path: 'M48 279 C121 274 168 236 238 211 L266 194',
                labelX: 93,
                labelY: 257,
                crosses: false
              }
            }
          ]
        }
      ],
      success:
        'Le plan soumis pose la maison sur une terrasse naturelle sèche, la relie à l’école et aux logements, garde la rivière comme limite est et ouvre l’allée depuis l’arrêt de bus.',
      invariant:
        'Ici, l’accès arrive du même côté que les voisins : il atteint le lieu sans franchir la limite naturelle.'
    },
    {
      id: 'gare-halle',
      folio: 'Planche 02',
      place: 'Halle de la Garette',
      placeMark: 'H',
      theme: 'Approvisionnement · échanges',
      mission:
        'Le sol et le bord sont construits. Assemble les couches sans prendre la voie ferrée pour une entrée.',
      mapCaption:
        'Plan assemblé de la Halle de la Garette, entre gare et commerces, avec une limite ferroviaire et un passage sous voie.',
      layers: [
        {
          id: 'site',
          number: '01',
          label: 'Site',
          action: 'Poser le terrain',
          question: 'Quelle surface poser sous la halle ?',
          target: 'dalle minérale · terrain construit',
          selectedWord: 'Terrain posé',
          icon: '▧',
          scaffold:
            'Cette fois, le terrain lui-même a déjà été aménagé : cherche la surface régulière construite.',
          choices: [
            {
              id: 'gare-pre',
              label: 'Pré humide en pente',
              detail: 'sol naturel irrégulier au bord du bourg',
              mapShort: 'pré humide',
              consequence:
                'La halle apparaît sur un pré incliné dont le sol reste humide.',
              correction:
                'Ce choix remplace le site construit demandé par un terrain naturel. La fiche indique une dalle minérale plane.',
              correct: false,
              smokeWrong: true,
              visual: { symbol: '⌁', kind: 'wet' }
            },
            {
              id: 'gare-dalle',
              label: 'Dalle pavée',
              detail: 'surface minérale large et plane',
              mapShort: 'dalle construite',
              consequence:
                'La halle repose sur une dalle construite, large et régulière pour les étals.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: { symbol: '▦', kind: 'built' }
            }
          ]
        },
        {
          id: 'situation',
          number: '02',
          label: 'Situation',
          action: 'Relier un voisin',
          question: 'À quels repères relier la halle ?',
          target: 'gare au nord + commerces au sud',
          selectedWord: 'Voisins reliés',
          icon: '◎',
          scaffold:
            'La fiche place la halle dans un réseau d’échanges : relie-la aux deux repères fréquentés autour d’elle.',
          choices: [
            {
              id: 'gare-ferme',
              label: 'Prairie et ferme isolée',
              detail: 'repères ruraux éloignés du bourg',
              mapShort: 'ferme isolée',
              consequence:
                'Le trait place la halle à l’écart, auprès d’une ferme et d’une prairie.',
              correction:
                'Cette liaison efface la position entre la gare et les commerces indiquée dans la fiche.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: 'F',
                kind: 'landmark',
                x: 516,
                y: 283,
                labelX: 510,
                labelY: 326
              }
            },
            {
              id: 'gare-reseau',
              label: 'Gare et commerces',
              detail: 'deux pôles de part et d’autre de la halle',
              mapShort: 'gare + boutiques',
              consequence:
                'La liaison place la halle entre la gare locale et les commerces du bourg.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: 'G',
                kind: 'landmark',
                x: 103,
                y: 112,
                labelX: 112,
                labelY: 72
              }
            }
          ]
        },
        {
          id: 'limit',
          number: '03',
          label: 'Limite',
          action: 'Tracer le bord',
          question: 'Quel bord faire apparaître ?',
          target: 'voie ferrée clôturée · bord nord',
          selectedWord: 'Bord tracé',
          icon: '┆',
          scaffold:
            'Cherche au nord une ligne construite qui ferme le terrain. Une ligne de transport n’est pas automatiquement un accès.',
          choices: [
            {
              id: 'gare-ruisseau',
              label: 'Ruisseau à l’est',
              detail: 'bord naturel absent de la fiche',
              mapShort: 'ruisseau est',
              consequence:
                'Un cours d’eau ferme le côté est, mais le nord de la halle reste ouvert.',
              correction:
                'La fiche ne place pas de ruisseau ici. Elle demande une limite construite : la voie ferrée clôturée au nord.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: '≈',
                kind: 'water',
                path: 'M503 45 C478 121 526 202 493 349',
                labelX: 524,
                labelY: 69
              }
            },
            {
              id: 'gare-rails',
              label: 'Rails clôturés au nord',
              detail: 'ligne technique qui borde la parcelle',
              mapShort: 'rails + clôture',
              consequence:
                'Deux rails et leur clôture marquent le bord construit au nord du terrain.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: '║',
                kind: 'rail',
                path: 'M66 82 L536 82',
                labelX: 476,
                labelY: 61
              }
            }
          ]
        },
        {
          id: 'access',
          number: '04',
          label: 'Accès',
          action: 'Ouvrir la route',
          question: 'Quel passage ouvrir jusqu’à la halle ?',
          target: 'route sud + passage sous voie · franchissement autorisé',
          selectedWord: 'Route ouverte',
          icon: '→',
          scaffold:
            'Une limite peut être franchie à un endroit aménagé. Cherche la voie qui entre au sud et le passage qui continue sous les rails.',
          choices: [
            {
              id: 'gare-quai-ferme',
              label: 'Voie le long des rails',
              detail: 'trajet parallèle, clôture sans ouverture',
              mapShort: 'voie sans entrée',
              consequence:
                'La voie suit la clôture mais ne la franchit pas et ne rejoint pas la halle.',
              correction:
                'Longer une limite ne crée pas un accès. La fiche demande une route d’entrée et un passage sous la voie.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: '×',
                kind: 'blocked',
                path: 'M80 55 C188 39 320 54 445 57',
                labelX: 150,
                labelY: 39,
                crosses: false
              }
            },
            {
              id: 'gare-sous-voie',
              label: 'Route et passage sous voie',
              detail: 'entrée sud reliée à la gare par un tunnel',
              mapShort: 'route + passage',
              consequence:
                'La route entre par le sud ; le passage aménagé traverse sous la limite ferroviaire vers la gare.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: '↥',
                kind: 'crossing',
                path: 'M515 349 C424 321 348 281 313 224 L301 169 M102 111 C174 101 244 102 282 129 L301 169',
                labelX: 437,
                labelY: 320,
                crosses: true
              }
            }
          ]
        }
      ],
      success:
        'Le plan soumis pose la halle sur une dalle construite, la relie à la gare et aux commerces, trace les rails clôturés au nord et ouvre la route avec son passage sous voie.',
      invariant:
        'Ici, limite et accès sont tous deux construits : la clôture borde, tandis que le passage aménagé permet de franchir les rails.'
    },
    {
      id: 'bois-aire',
      folio: 'Planche 03',
      place: 'Aire de Clairbois',
      placeMark: 'A',
      theme: 'Loisirs · déplacements',
      mission:
        'Construis une aire en clairière et rends visible le passage qui franchit son bord naturel.',
      mapCaption:
        'Plan assemblé de l’Aire de Clairbois, dans une clairière au-dessus du village, bordée par un torrent franchi par une passerelle.',
      layers: [
        {
          id: 'site',
          number: '01',
          label: 'Site',
          action: 'Poser le terrain',
          question: 'Quelle surface poser sous l’aire ?',
          target: 'clairière ferme · pente douce',
          selectedWord: 'Terrain posé',
          icon: '▧',
          scaffold:
            'Le site demandé reste naturel : repère un sol de clairière ferme, avec seulement une pente douce.',
          choices: [
            {
              id: 'bois-beton',
              label: 'Plateforme bétonnée',
              detail: 'surface construite, horizontale et minérale',
              mapShort: 'plateforme béton',
              consequence:
                'L’aire apparaît sur une grande plateforme artificielle sans sol de clairière.',
              correction:
                'La plateforme transforme le site naturel décrit. La fiche demande le sol ferme d’une clairière en pente douce.',
              correct: false,
              smokeWrong: true,
              visual: { symbol: '▦', kind: 'built' }
            },
            {
              id: 'bois-clairiere',
              label: 'Clairière en pente douce',
              detail: 'sol naturel ferme au milieu du bois',
              mapShort: 'clairière ferme',
              consequence:
                'L’aire prend place sur le sol ferme d’une clairière légèrement inclinée.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: { symbol: '⌁', kind: 'grass' }
            }
          ]
        },
        {
          id: 'situation',
          number: '02',
          label: 'Situation',
          action: 'Relier un voisin',
          question: 'À quels repères relier l’aire ?',
          target: 'village en contrebas + bois autour',
          selectedWord: 'Voisins reliés',
          icon: '◎',
          scaffold:
            'La situation associe deux repères du dossier : le village plus bas et le bois autour de la clairière.',
          choices: [
            {
              id: 'bois-parking',
              label: 'Parking du col',
              detail: 'équipement isolé de l’autre côté du coteau',
              mapShort: 'parking du col',
              consequence:
                'Le trait situe l’aire seulement par rapport à un parking isolé au col.',
              correction:
                'Ce repère ne montre ni le village en contrebas ni le bois qui entoure l’aire.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: 'P',
                kind: 'landmark',
                x: 513,
                y: 91,
                labelX: 506,
                labelY: 54
              }
            },
            {
              id: 'bois-village',
              label: 'Village et lisière du bois',
              detail: 'habitations plus basses, arbres autour',
              mapShort: 'village + bois',
              consequence:
                'La liaison place l’aire au-dessus du village et au contact de la lisière du bois.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: 'V',
                kind: 'landmark',
                x: 97,
                y: 118,
                labelX: 109,
                labelY: 79
              }
            }
          ]
        },
        {
          id: 'limit',
          number: '03',
          label: 'Limite',
          action: 'Tracer le bord',
          question: 'Quel bord faire apparaître ?',
          target: 'torrent · bord sud',
          selectedWord: 'Bord tracé',
          icon: '┆',
          scaffold:
            'Suis le bas du plan : le bord demandé est un cours d’eau naturel, pas une clôture au nord.',
          choices: [
            {
              id: 'bois-cloture',
              label: 'Clôture au nord',
              detail: 'bord construit en haut de la clairière',
              mapShort: 'clôture nord',
              consequence:
                'Une clôture ferme le nord de l’aire, tandis que le bord sud reste absent.',
              correction:
                'La position et la nature du bord ne correspondent pas à la fiche, qui indique le torrent au sud.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: '╫',
                kind: 'fence',
                path: 'M72 78 L530 78',
                labelX: 468,
                labelY: 59
              }
            },
            {
              id: 'bois-torrent',
              label: 'Torrent au sud',
              detail: 'bord naturel qui longe le bas de l’aire',
              mapShort: 'torrent sud',
              consequence:
                'Le torrent dessine une limite naturelle au sud de la clairière.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: '≈',
                kind: 'water',
                path: 'M39 298 C137 265 215 318 306 291 S478 279 560 311',
                labelX: 467,
                labelY: 343
              }
            }
          ]
        },
        {
          id: 'access',
          number: '04',
          label: 'Accès',
          action: 'Ouvrir la route',
          question: 'Quelle voie ouvrir jusqu’à l’entrée ?',
          target: 'arrêt du village → passerelle · traverse le torrent',
          selectedWord: 'Route ouverte',
          icon: '→',
          scaffold:
            'Pars de l’arrêt du village. La voie utile doit franchir le torrent à un endroit aménagé puis atteindre l’entrée.',
          choices: [
            {
              id: 'bois-piste-nord',
              label: 'Piste forestière du nord',
              detail: 'chemin qui contourne l’aire sans entrée',
              mapShort: 'piste sans entrée',
              consequence:
                'La piste passe au nord puis s’éloigne ; elle ne relie ni l’arrêt ni l’entrée de l’aire.',
              correction:
                'Ce tracé ne réalise pas la liaison demandée. L’accès doit partir du village et franchir le torrent par une passerelle.',
              correct: false,
              smokeWrong: true,
              visual: {
                symbol: '×',
                kind: 'blocked',
                path: 'M54 49 C147 32 225 44 262 91',
                labelX: 121,
                labelY: 30,
                crosses: false
              }
            },
            {
              id: 'bois-passerelle',
              label: 'Chemin par la passerelle',
              detail: 'liaison depuis l’arrêt, avec franchissement',
              mapShort: 'chemin + pont',
              consequence:
                'Le chemin monte depuis l’arrêt, franchit le torrent sur la passerelle et rejoint l’entrée.',
              correction: '',
              correct: true,
              smokeWrong: false,
              visual: {
                symbol: '↟',
                kind: 'crossing',
                path: 'M535 354 C463 337 403 315 359 286 C333 269 321 239 307 220',
                labelX: 486,
                labelY: 372,
                crosses: true
              }
            }
          ]
        }
      ],
      success:
        'Le plan soumis pose l’aire sur le sol naturel de la clairière, la situe au-dessus du village dans le bois, trace le torrent au sud et ouvre le chemin par la passerelle.',
      invariant:
        'Ici, le torrent reste une limite même si la passerelle permet à l’accès de le franchir en un point précis.'
    }
  ];

  let phase: Phase = 'intro';
  let variationIndex = 0;
  let current = variations[0];
  let selections: Selections = {};
  let submittedSelections: Selections = {};
  let errorLayerId: LayerId | null = null;
  let announcement = '';
  let stateHeading: HTMLElement | null = null;
  let selectedSite: LayerChoice | undefined;
  let selectedSituation: LayerChoice | undefined;
  let selectedLimit: LayerChoice | undefined;
  let selectedAccess: LayerChoice | undefined;
  let selectedCount = 0;
  let readyToSubmit = false;

  $: selectedSite = optionFor(current, selections, 'site');
  $: selectedSituation = optionFor(current, selections, 'situation');
  $: selectedLimit = optionFor(current, selections, 'limit');
  $: selectedAccess = optionFor(current, selections, 'access');
  $: selectedCount = layerOrder.filter((layerId) => Boolean(selections[layerId])).length;
  $: readyToSubmit = selectedCount === layerOrder.length;

  function layerFor(layerId: LayerId): ConstructionLayer {
    return current.layers.find((layer) => layer.id === layerId) ?? current.layers[0];
  }

  function optionFor(
    variation: Variation,
    sourceSelections: Selections,
    layerId: LayerId
  ): LayerChoice | undefined {
    const layer = variation.layers.find((item) => item.id === layerId) ?? variation.layers[0];
    return layer.choices.find((choice) => choice.id === sourceSelections[layerId]);
  }

  function correctOption(layer: ConstructionLayer): LayerChoice {
    return layer.choices.find((choice) => choice.correct) ?? layer.choices[0];
  }

  function attemptKind(choice: LayerChoice): AttemptKind | undefined {
    if (choice.correct) return 'correct';
    if (choice.smokeWrong) return 'incorrect';
    return undefined;
  }

  function begin(): void {
    variationIndex = 0;
    current = variations[0];
    selections = {};
    submittedSelections = {};
    errorLayerId = null;
    phase = 'active';
    announceAndFocus(`Première planche ouverte : ${current.place}. Commence par poser un composant.`);
  }

  function choose(layer: ConstructionLayer, choice: LayerChoice): void {
    if (phase !== 'active' && phase !== 'retry') return;
    selections = { ...selections, [layer.id]: choice.id };
    announcement = `${layer.selectedWord} : ${choice.label}. ${choice.consequence}`;
  }

  function assemblyMessage(count: number, ready: boolean): string {
    if (count === 0) return 'Le plan est vide. Commence par l’un des quatre calques.';
    if (!ready) {
      return `${count} calque${count > 1 ? 's' : ''} sur 4 construit${count > 1 ? 's' : ''}.`;
    }
    return 'Les quatre calques sont visibles. Compare le plan à la fiche, puis soumets-le.';
  }

  function submitAccessiblePlan(kind: AttemptKind): void {
    selections = Object.fromEntries(
      current.layers.map((layer) => {
        const choice = kind === 'correct'
          ? correctOption(layer)
          : (layer.choices.find((candidate) => candidate.smokeWrong) ?? layer.choices[0]);
        return [layer.id, choice.id];
      })
    ) as Selections;
    setTimeout(submitPlan, 0);
  }

  function submitPlan(): void {
    if (!readyToSubmit || (phase !== 'active' && phase !== 'retry')) return;
    submittedSelections = { ...selections };
    const firstMismatch = current.layers.find(
      (layer) => selections[layer.id] !== correctOption(layer).id
    );

    if (firstMismatch) {
      errorLayerId = firstMismatch.id;
      phase = 'incorrect';
      const choice = optionFor(current, submittedSelections, firstMismatch.id);
      announceAndFocus(
        `Plan à revoir sur le calque ${firstMismatch.label}. ${choice?.correction ?? firstMismatch.scaffold}`
      );
      return;
    }

    errorLayerId = null;
    phase = 'correct';
    announceAndFocus(`Plan cohérent pour ${current.place}. ${current.success}`);
  }

  function retry(): void {
    phase = 'retry';
    const layer = errorLayerId ? layerFor(errorLayerId) : current.layers[0];
    announceAndFocus(`${layer.scaffold} Les quatre choix restent modifiables.`);
  }

  function continueJourney(): void {
    if (variationIndex === variations.length - 1) {
      phase = 'complete';
      announceAndFocus(
        'Les trois planches sont terminées. Les quatre commandes de construction sont résumées.'
      );
      return;
    }

    variationIndex += 1;
    current = variations[variationIndex];
    selections = {};
    submittedSelections = {};
    errorLayerId = null;
    phase = 'active';
    announceAndFocus(`Nouvelle planche : ${current.place}. Le terrain, le bord et la route changent.`);
  }

  function announceAndFocus(message: string): void {
    announcement = message;
    setTimeout(() => stateHeading?.focus(), 0);
  }
</script>

<svelte:head>
  <title>Le portrait d’un lieu · EX-0306</title>
  <meta
    name="description"
    content="Étude interactive de géographie : construire quatre couches d’un plan de lieu, du terrain à l’accès."
  />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0306"
  data-smoke-root
  data-smoke-exercise="EX-0306"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={phase === 'intro' ? 'ready' : phase === 'active' || phase === 'retry' ? 'question' : phase}
>
  <p class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>

  {#if phase === 'intro'}
    <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
      <header class="studio-bar">
        <div class="studio-name"><span aria-hidden="true">◫</span><strong>Table des lieux</strong></div>
        <span>Valdoux · atelier cartographique</span>
        <b>EX—0306</b>
      </header>

      <div class="intro-grid">
        <div class="intro-copy">
          <p class="eyebrow">Trois lieux · quatre calques</p>
          <h1 id="intro-title" bind:this={stateHeading}>
            Construis le lieu<br /><em>couche par couche</em>
          </h1>
          <p class="intro-lead">
            Une fiche donne quatre repères. Transforme-les en plan : pose le terrain, relie un
            voisin, trace un bord, puis ouvre une route. <strong>Le plan et ses conséquences
            changent à chaque choix.</strong>
          </p>

          <ol class="action-sequence" aria-label="Les quatre actions de construction">
            <li><span>01</span><div><strong>Poser</strong><small>le terrain du site</small></div></li>
            <li><span>02</span><div><strong>Relier</strong><small>un lieu voisin</small></div></li>
            <li><span>03</span><div><strong>Tracer</strong><small>une limite</small></div></li>
            <li><span>04</span><div><strong>Ouvrir</strong><small>un accès</small></div></li>
          </ol>

          <div class="intro-note">
            <span aria-hidden="true">⌨</span>
            <p>
              Tous les composants se choisissent avec de grands boutons : Tab puis Espace ou
              Entrée, ou un toucher. Aucun dessin précis, glisser-déposer ou chronomètre. Les lieux
              de Valdoux sont fictifs et rien n’est enregistré.
            </p>
          </div>

          <button class="primary-action" type="button" data-smoke-action="start" onclick={begin}>
            Allumer la première planche <span aria-hidden="true">→</span>
          </button>
        </div>

        <div class="layer-preview" aria-hidden="true">
          <div class="preview-grid"></div>
          <div class="preview-sheet preview-site"><span>01</span><strong>TERRAIN</strong><i>▧</i></div>
          <div class="preview-sheet preview-situation"><span>02</span><strong>VOISIN</strong><i>◎</i></div>
          <div class="preview-sheet preview-limit"><span>03</span><strong>BORD</strong><i>┆</i></div>
          <div class="preview-sheet preview-access"><span>04</span><strong>ROUTE</strong><i>→</i></div>
          <div class="preview-place">LIEU</div>
          <p>4 calques<br />1 seul plan</p>
        </div>
      </div>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="activity"
      data-smoke-state={phase}
      data-smoke-variation={current.id}
      aria-labelledby="activity-title"
    >
      <header class="activity-header">
        <div class="compact-brand"><span aria-hidden="true">◫</span><div><small>Table des lieux</small><strong>Valdoux</strong></div></div>
        <div class="progress-copy">
          <span>{current.folio}</span>
          <strong>{variationIndex + 1} / {variations.length}</strong>
        </div>
        <div class="progress-track" aria-label={`Planche ${variationIndex + 1} sur ${variations.length}`}>
          {#each variations as variation, index}
            <span class:past={index < variationIndex} class:current={index === variationIndex}>
              <span class="sr-only">{variation.place} : {index < variationIndex ? 'terminée' : index === variationIndex ? 'en cours' : 'à venir'}</span>
            </span>
          {/each}
        </div>
      </header>

      <div class="assignment">
        <div class="assignment-copy">
          <p class="eyebrow">{current.theme}</p>
          <h1 id="activity-title" tabindex="-1" bind:this={stateHeading}>{current.place}</h1>
          <p>{current.mission}</p>
        </div>
        <table class="brief-table">
          <caption>Fiche à traduire sur le plan</caption>
          <tbody>
            {#each current.layers as layer}
              <tr>
                <th scope="row"><span aria-hidden="true">{layer.icon}</span>{layer.action}</th>
                <td>{layer.target}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if phase === 'retry'}
        <aside class="retry-banner" aria-labelledby="retry-title">
          <span aria-hidden="true">↺</span>
          <div>
            <p class="eyebrow">Reprise ciblée · montage conservé</p>
            <h2 id="retry-title">Révise un composant, pas tout le plan.</h2>
            <p>{errorLayerId ? layerFor(errorLayerId).scaffold : current.layers[0].scaffold}</p>
          </div>
        </aside>
      {/if}

      <fieldset class="accessible-plan-alternative">
        <legend>Alternative sans assemblage fin : compare deux plans complets</legend>
        <p>Ces deux propositions appliquent les mêmes quatre choix que la table de montage.</p>
        <div class="choice-grid">
          <button type="button" class="component-choice" data-smoke-answer="incorrect" onclick={() => submitAccessiblePlan('incorrect')}>
            <span class="choice-copy"><strong>Plan A</strong><small>Un montage qui contredit au moins un repère de la fiche.</small></span>
          </button>
          <button type="button" class="component-choice" data-smoke-answer="correct" onclick={() => submitAccessiblePlan('correct')}>
            <span class="choice-copy"><strong>Plan B</strong><small>Un montage où site, situation, limite et accès suivent la fiche.</small></span>
          </button>
        </div>
      </fieldset>

      <div class="workspace">
        <section class="control-deck" aria-labelledby="controls-title">
          <div class="deck-heading">
            <div>
              <p class="eyebrow">Commandes de la table</p>
              <h2 id="controls-title">Choisis les composants du plan</h2>
            </div>
            <span class:ready={readyToSubmit}>{selectedCount}/4 calques</span>
          </div>

          <div class="layer-controls">
            {#each current.layers as layer, layerIndex}
              <fieldset class="layer-control" class:filled={Boolean(selections[layer.id])}>
                <legend>
                  <span>{layer.number}</span>
                  <div><strong>{layer.action}</strong><small>{layer.question}</small></div>
                </legend>
                <div class="choice-grid">
                  {#each layer.choices as choice}
                    <button
                      type="button"
                      class="component-choice"
                      class:selected={selections[layer.id] === choice.id}
                      aria-pressed={selections[layer.id] === choice.id}
                      aria-label={`${layer.action} : ${choice.label}. ${choice.detail}`}
                      data-smoke-attempt={attemptKind(choice)}
                      data-smoke-step={attemptKind(choice) ? String(layerIndex + 1) : undefined}
                      onclick={() => choose(layer, choice)}
                    >
                      <span class="choice-symbol" aria-hidden="true">{choice.visual.symbol}</span>
                      <span class="choice-copy"><strong>{choice.label}</strong><small>{choice.detail}</small></span>
                      {#if selections[layer.id] === choice.id}
                        <span class="choice-state"><span aria-hidden="true">✓</span>{layer.selectedWord}</span>
                      {/if}
                    </button>
                  {/each}
                </div>
              </fieldset>
            {/each}
          </div>
        </section>

        <aside class="light-table" aria-labelledby="map-title">
          <div class="map-heading">
            <div><p class="eyebrow">Plan assemblé en direct</p><h2 id="map-title">{current.place}</h2></div>
            <span>{selectedCount === 4 ? 'complet' : `${4 - selectedCount} à poser`}</span>
          </div>

          <div class="map-frame">
            <svg viewBox="0 0 600 390" aria-hidden="true">
              <defs>
                <marker id="route-arrow-ex0306" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z"></path>
                </marker>
              </defs>
              <rect class="map-paper" x="12" y="12" width="576" height="366" rx="20"></rect>
              <path class="contour contour-one" d="M35 102 C150 58 221 105 312 75 S473 42 568 91"></path>
              <path class="contour contour-two" d="M31 261 C118 229 211 270 291 245 S466 216 569 253"></path>
              <path class="map-grid-line" d="M65 26 V365 M180 26 V365 M300 26 V365 M420 26 V365 M535 26 V365 M25 95 H574 M25 195 H574 M25 295 H574"></path>
              <text class="north" x="548" y="43">N ↑</text>

              {#if selectedSite}
                <path
                  class="site-patch"
                  data-kind={selectedSite.visual.kind}
                  d="M178 123 C220 99 354 98 404 129 L422 222 C370 260 222 264 168 226 Z"
                ></path>
                <text class="site-name" x="294" y="247" text-anchor="middle">{selectedSite.mapShort}</text>
              {:else}
                <path class="ghost-site" d="M178 123 C220 99 354 98 404 129 L422 222 C370 260 222 264 168 226 Z"></path>
                <text class="ghost-label" x="294" y="245" text-anchor="middle">terrain à poser</text>
              {/if}

              {#if selectedSituation}
                <line
                  class="situation-link"
                  x1="300"
                  y1="184"
                  x2={selectedSituation.visual.x ?? 0}
                  y2={selectedSituation.visual.y ?? 0}
                ></line>
                <circle
                  class="landmark-dot"
                  cx={selectedSituation.visual.x ?? 0}
                  cy={selectedSituation.visual.y ?? 0}
                  r="25"
                ></circle>
                <text
                  class="landmark-symbol"
                  x={selectedSituation.visual.x ?? 0}
                  y={(selectedSituation.visual.y ?? 0) + 6}
                  text-anchor="middle"
                >{selectedSituation.visual.symbol}</text>
                <text
                  class="map-label"
                  x={selectedSituation.visual.labelX ?? selectedSituation.visual.x ?? 0}
                  y={selectedSituation.visual.labelY ?? (selectedSituation.visual.y ?? 0) + 42}
                  text-anchor="middle"
                >{selectedSituation.mapShort}</text>
              {:else}
                <line class="ghost-link" x1="300" y1="184" x2="91" y2="105"></line>
                <text class="ghost-label" x="91" y="81" text-anchor="middle">voisin à relier</text>
              {/if}

              {#if selectedLimit}
                <path
                  class="limit-path"
                  data-kind={selectedLimit.visual.kind}
                  d={selectedLimit.visual.path ?? ''}
                ></path>
                <text
                  class="map-label limit-label"
                  x={selectedLimit.visual.labelX ?? 0}
                  y={selectedLimit.visual.labelY ?? 0}
                  text-anchor="middle"
                >{selectedLimit.mapShort}</text>
              {:else}
                <path class="ghost-border" d="M466 35 L466 354"></path>
                <text class="ghost-label" x="500" y="48" text-anchor="middle">bord à tracer</text>
              {/if}

              {#if selectedAccess}
                <path
                  class="access-path"
                  data-kind={selectedAccess.visual.kind}
                  data-crosses={selectedAccess.visual.crosses ? 'yes' : 'no'}
                  d={selectedAccess.visual.path ?? ''}
                  marker-end="url(#route-arrow-ex0306)"
                ></path>
                <text
                  class="map-label access-label"
                  x={selectedAccess.visual.labelX ?? 0}
                  y={selectedAccess.visual.labelY ?? 0}
                  text-anchor="middle"
                >{selectedAccess.mapShort}</text>
              {:else}
                <path class="ghost-route" d="M45 282 C128 279 187 235 266 198"></path>
                <text class="ghost-label" x="99" y="260" text-anchor="middle">route à ouvrir</text>
              {/if}

              <g class="place-mark">
                <rect x="260" y="145" width="82" height="76" rx="8"></rect>
                <path d="M251 159 L301 124 L351 159"></path>
                <text x="301" y="193" text-anchor="middle">{current.placeMark}</text>
                <circle cx="270" cy="205" r="4"></circle>
                <text class="entry-label" x="253" y="220" text-anchor="end">entrée</text>
              </g>
            </svg>
          </div>
          <p class="map-caption">{current.mapCaption} Schéma non à l’échelle.</p>

          <div class="consequence-panel" aria-labelledby="consequences-title">
            <h3 id="consequences-title">Ce que le montage fait apparaître</h3>
            <ol>
              {#each current.layers as layer}
                <li class:filled={Boolean(selections[layer.id])}>
                  <span aria-hidden="true">{layer.icon}</span>
                  <div>
                    <strong>{layer.label}</strong>
                    <p>{optionFor(current, selections, layer.id)?.consequence ?? `Aucun composant : ${layer.question}`}</p>
                  </div>
                </li>
              {/each}
            </ol>
          </div>

          <div class="submit-zone">
            <div class="assembly-status" class:ready={readyToSubmit} id="assembly-status" role="status">
              <span aria-hidden="true">{readyToSubmit ? '✓' : '◌'}</span>
              <p>{assemblyMessage(selectedCount, readyToSubmit)}</p>
            </div>
            <button
              class="submit-action"
              type="button"
              disabled={!readyToSubmit}
              data-smoke-action={readyToSubmit ? 'submit' : undefined}
              aria-describedby="assembly-status"
              onclick={submitPlan}
            >
              Soumettre ce plan <span aria-hidden="true">↗</span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  {:else if phase === 'incorrect' && errorLayerId}
    <section
      class="feedback-state incorrect-state"
      data-smoke-state="incorrect"
      data-smoke-variation={current.id}
      aria-labelledby="incorrect-title"
    >
      <header class="feedback-header">
        <span class="feedback-mark" aria-hidden="true">!</span>
        <div>
          <p class="eyebrow">{current.folio} · plan conservé</p>
          <h1 id="incorrect-title" tabindex="-1" bind:this={stateHeading}>Un calque coupe la lecture du lieu.</h1>
        </div>
      </header>

      <div class="specific-feedback" role="alert" data-smoke-feedback="incorrect" data-smoke-feedback-detail="specific">
        <span class="layer-chip">{layerFor(errorLayerId).number} · {layerFor(errorLayerId).label}</span>
        <h2>« {optionFor(current, submittedSelections, errorLayerId)?.label} » ne suit pas la fiche.</h2>
        <p>{optionFor(current, submittedSelections, errorLayerId)?.correction}</p>
        <div class="target-contrast">
          <span>Repère à retrouver</span>
          <strong>{layerFor(errorLayerId).target}</strong>
        </div>
      </div>

      <div class="submitted-layers" aria-label="Calques du plan soumis">
        {#each current.layers as layer}
          <article class:is-error={layer.id === errorLayerId}>
            <span>{layer.number}</span>
            <div><small>{layer.action}</small><strong>{optionFor(current, submittedSelections, layer.id)?.label}</strong></div>
            {#if layer.id === errorLayerId}<b>à revoir</b>{:else}<b>conservé</b>{/if}
          </article>
        {/each}
      </div>

      <div class="feedback-footer">
        <p>La reprise garde les quatre composants et ajoute une piste sur ce seul calque.</p>
        <button class="primary-action" type="button" data-smoke-action="retry" onclick={retry}>
          Reprendre sur la table <span aria-hidden="true">↺</span>
        </button>
      </div>
    </section>
  {:else if phase === 'correct'}
    <section
      class="feedback-state correct-state"
      data-smoke-state="correct"
      data-smoke-variation={current.id}
      aria-labelledby="correct-title"
    >
      <header class="feedback-header">
        <span class="feedback-mark" aria-hidden="true">✓</span>
        <div>
          <p class="eyebrow">{current.folio} · quatre calques alignés</p>
          <h1 id="correct-title" tabindex="-1" bind:this={stateHeading}>Le plan correspond à la fiche.</h1>
        </div>
      </header>

      <div class="correct-feedback" role="status" data-smoke-feedback="correct" data-smoke-feedback-detail="specific">
        <p>{current.success}</p>
      </div>

      <div class="resolved-layers">
        {#each current.layers as layer}
          <article>
            <span aria-hidden="true">{layer.icon}</span>
            <div><small>{layer.action}</small><strong>{optionFor(current, submittedSelections, layer.id)?.label}</strong><p>{optionFor(current, submittedSelections, layer.id)?.consequence}</p></div>
          </article>
        {/each}
      </div>

      <aside class="invariant-note">
        <span>Relation visible sur cette planche</span>
        <p>{current.invariant}</p>
      </aside>

      <section
        class="continuation"
        data-smoke-state="continuation"
        data-smoke-variation={current.id}
        aria-label="Continuer après le retour"
      >
        <div>
          <span>{variationIndex === variations.length - 1 ? 'Trois planches assemblées' : 'Prochaine variation'}</span>
          <p>
            {variationIndex === variations.length - 1
              ? 'La table peut maintenant afficher le bilan des quatre commandes.'
              : 'La prochaine fiche changera le type de terrain, de limite ou de franchissement.'}
          </p>
        </div>
        <button class="primary-action" type="button" data-smoke-action="continue" onclick={continueJourney}>
          {variationIndex === variations.length - 1 ? 'Éteindre la table' : 'Charger la planche suivante'}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </section>
  {:else}
    <section
      class="completion-state"
      data-smoke-state="complete"
      aria-labelledby="complete-title"
    >
      <div class="completion-icon" aria-hidden="true"><span>4</span><small>calques</small></div>
      <p class="eyebrow">Table éteinte · 3 plans soumis</p>
      <h1 id="complete-title" tabindex="-1" bind:this={stateHeading}>Quatre actions rendent un lieu lisible.</h1>
      <p class="completion-lead" data-smoke-completion>
        Tu as manipulé les mêmes quatre commandes sur trois fiches : un terrain naturel ou
        construit, un voisin relié, un bord naturel ou construit et une route qui peut rester du
        même côté ou franchir la limite.
      </p>

      <ol class="completion-grid">
        <li><span>01</span><div><strong>Poser le site</strong><p>Choisir la surface située sous le lieu.</p></div></li>
        <li><span>02</span><div><strong>Relier la situation</strong><p>Montrer la relation avec un lieu voisin.</p></div></li>
        <li><span>03</span><div><strong>Tracer la limite</strong><p>Faire apparaître le bord du lieu.</p></div></li>
        <li><span>04</span><div><strong>Ouvrir l’accès</strong><p>Dessiner la voie qui atteint l’entrée.</p></div></li>
      </ol>

      <div class="claim-boundary">
        <span aria-hidden="true">○</span>
        <p>
          Ces montages montrent seulement que les trois fiches ont été traduites avec les
          composants proposés. Ils ne prouvent pas qu’un autre lieu pourrait être décrit ou
          expliqué sans aide.
        </p>
      </div>
      <p class="privacy-note">Aucun choix n’a été enregistré ni envoyé.</p>
    </section>
  {/if}
</main>

<style>
  .prototype-root,
  .prototype-root * {
    box-sizing: border-box;
  }

  .prototype-root {
    --ink: #10222a;
    --ink-soft: #29434b;
    --night: #071b24;
    --night-mid: #12323d;
    --paper: #f7f3e8;
    --paper-deep: #e8e0cf;
    --cyan: #63d7db;
    --cyan-pale: #d6f1ef;
    --coral: #f16f55;
    --coral-pale: #f9d9cd;
    --lime: #d7e86d;
    --line: #9aa9a6;
    width: 100%;
    min-width: 0;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: var(--night);
    font-family: "Avenir Next", "Segoe UI", ui-sans-serif, system-ui, sans-serif;
    line-height: 1.45;
  }

  .prototype-root button {
    min-width: 0;
    font: inherit;
    touch-action: manipulation;
  }

  .prototype-root button:focus-visible,
  .prototype-root [tabindex="-1"]:focus-visible {
    outline: 4px solid #ffb000;
    outline-offset: 4px;
  }

  .prototype-root h1,
  .prototype-root h2,
  .prototype-root h3,
  .prototype-root p,
  .prototype-root ol {
    margin-top: 0;
  }

  .eyebrow {
    margin-bottom: 8px;
    color: #16727a;
    font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .primary-action,
  .submit-action {
    display: inline-flex;
    min-height: 54px;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 13px 20px;
    border: 2px solid var(--ink);
    border-radius: 8px;
    color: var(--ink);
    background: var(--lime);
    box-shadow: 4px 4px 0 var(--ink);
    font-weight: 900;
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
  }

  .primary-action:hover:not(:disabled),
  .submit-action:hover:not(:disabled) {
    background: #e6f381;
    transform: translate(-1px, -1px);
    box-shadow: 6px 6px 0 var(--ink);
  }

  .primary-action:active:not(:disabled),
  .submit-action:active:not(:disabled) {
    transform: translate(3px, 3px);
    box-shadow: 1px 1px 0 var(--ink);
  }

  .intro {
    width: min(1220px, calc(100% - 40px));
    margin: 0 auto;
    padding: 24px 0 54px;
  }

  .studio-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 18px;
    min-height: 58px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(99, 215, 219, 0.42);
    color: var(--cyan-pale);
    font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .studio-name {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .studio-name > span,
  .compact-brand > span {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border: 1px solid var(--cyan);
    color: var(--cyan);
    font-size: 1.2rem;
  }

  .studio-bar > span {
    text-align: center;
  }

  .studio-bar > b {
    justify-self: end;
    color: var(--lime);
  }

  .intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.75fr);
    align-items: center;
    gap: clamp(34px, 6vw, 92px);
    min-height: calc(100vh - 178px);
    padding: clamp(38px, 7vw, 90px) 0;
  }

  .intro-copy {
    min-width: 0;
  }

  .intro-copy .eyebrow {
    color: var(--cyan);
  }

  .intro h1 {
    max-width: 790px;
    margin-bottom: 26px;
    color: var(--paper);
    font-size: clamp(3.1rem, 7.5vw, 7.1rem);
    font-weight: 900;
    letter-spacing: -0.07em;
    line-height: 0.88;
  }

  .intro h1 em {
    color: var(--coral);
    font-style: normal;
  }

  .intro-lead {
    max-width: 720px;
    margin-bottom: 28px;
    color: #c2d2d2;
    font-size: clamp(1rem, 2vw, 1.22rem);
    line-height: 1.62;
  }

  .intro-lead strong {
    color: var(--paper);
  }

  .action-sequence {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-bottom: 22px;
    padding: 0;
    border-top: 1px solid rgba(99, 215, 219, 0.42);
    border-bottom: 1px solid rgba(99, 215, 219, 0.42);
    list-style: none;
  }

  .action-sequence li {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 9px;
    padding: 13px 9px;
    border-right: 1px solid rgba(99, 215, 219, 0.25);
  }

  .action-sequence li:last-child {
    border-right: 0;
  }

  .action-sequence li > span {
    color: var(--cyan);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 900;
  }

  .action-sequence div {
    display: grid;
    min-width: 0;
  }

  .action-sequence strong {
    color: var(--paper);
    font-size: 0.84rem;
  }

  .action-sequence small {
    color: #9fb6b7;
    font-size: 0.66rem;
    line-height: 1.25;
  }

  .intro-note {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    max-width: 720px;
    padding: 14px;
    border: 1px solid rgba(99, 215, 219, 0.3);
    border-radius: 8px;
    color: #b6c9ca;
    background: rgba(99, 215, 219, 0.07);
  }

  .intro-note > span {
    color: var(--cyan);
    font-size: 1.25rem;
  }

  .intro-note p {
    margin-bottom: 0;
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .intro .primary-action {
    margin-top: 26px;
  }

  .layer-preview {
    position: relative;
    min-height: 560px;
    overflow: hidden;
    border: 1px solid rgba(99, 215, 219, 0.48);
    border-radius: 22px;
    background: #0e2a34;
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.33);
  }

  .preview-grid {
    position: absolute;
    inset: 0;
    opacity: 0.32;
    background-image:
      linear-gradient(rgba(99, 215, 219, 0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 215, 219, 0.2) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .preview-sheet {
    position: absolute;
    right: 13%;
    left: 13%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 12px;
    min-height: 108px;
    padding: 15px 18px;
    border: 2px solid currentColor;
    border-radius: 14px;
    backdrop-filter: blur(3px);
  }

  .preview-sheet span {
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 900;
  }

  .preview-sheet strong {
    letter-spacing: 0.12em;
  }

  .preview-sheet i {
    font-size: 2.2rem;
    font-style: normal;
  }

  .preview-site {
    top: 70px;
    color: var(--lime);
    background: rgba(215, 232, 109, 0.13);
  }

  .preview-situation {
    top: 164px;
    right: 9%;
    left: 17%;
    color: var(--cyan);
    background: rgba(99, 215, 219, 0.12);
  }

  .preview-limit {
    top: 258px;
    right: 17%;
    left: 9%;
    color: #ffad8e;
    background: rgba(241, 111, 85, 0.12);
  }

  .preview-access {
    top: 352px;
    color: var(--paper);
    background: rgba(247, 243, 232, 0.09);
  }

  .preview-place {
    position: absolute;
    top: 222px;
    left: 50%;
    z-index: 2;
    display: grid;
    width: 102px;
    height: 102px;
    place-items: center;
    border: 3px solid var(--night);
    border-radius: 50%;
    color: var(--night);
    background: var(--paper);
    box-shadow: 0 0 0 7px var(--coral);
    font-weight: 950;
    transform: translateX(-50%);
  }

  .layer-preview > p {
    position: absolute;
    right: 18px;
    bottom: 10px;
    margin-bottom: 0;
    color: var(--cyan-pale);
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-align: right;
    text-transform: uppercase;
  }

  .activity {
    min-height: calc(100vh - 42px);
    padding-bottom: 46px;
    background: var(--paper-deep);
  }

  .activity-header {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 24px;
    min-height: 74px;
    padding: 12px max(20px, calc((100% - 1260px) / 2));
    color: var(--cyan-pale);
    background: var(--night);
  }

  .compact-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .compact-brand > span {
    width: 38px;
    height: 38px;
  }

  .compact-brand div {
    display: grid;
  }

  .compact-brand small {
    color: var(--cyan);
    font-family: ui-monospace, monospace;
    font-size: 0.58rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .compact-brand strong {
    font-size: 0.84rem;
    text-transform: uppercase;
  }

  .progress-copy {
    display: flex;
    gap: 12px;
    color: #abc1c1;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .progress-copy strong {
    color: var(--lime);
  }

  .progress-track {
    display: flex;
    gap: 7px;
  }

  .progress-track > span {
    display: block;
    width: 34px;
    height: 9px;
    border: 1px solid #668087;
    border-radius: 8px;
  }

  .progress-track > span.past {
    border-color: var(--cyan);
    background: var(--cyan);
  }

  .progress-track > span.current {
    border-color: var(--lime);
    background: repeating-linear-gradient(135deg, var(--lime) 0 5px, transparent 5px 9px);
  }

  .assignment,
  .workspace,
  .retry-banner {
    width: min(1260px, calc(100% - 40px));
    margin-right: auto;
    margin-left: auto;
  }

  .assignment {
    display: grid;
    grid-template-columns: minmax(0, 0.84fr) minmax(460px, 1.16fr);
    align-items: stretch;
    margin-top: 24px;
    overflow: hidden;
    border: 2px solid var(--ink);
    border-radius: 14px;
    background: var(--paper);
    box-shadow: 6px 6px 0 rgba(16, 34, 42, 0.18);
  }

  .assignment-copy {
    padding: clamp(22px, 4vw, 42px);
    border-right: 2px solid var(--ink);
  }

  .assignment-copy h1 {
    margin-bottom: 15px;
    font-size: clamp(2.2rem, 5vw, 4.6rem);
    font-weight: 950;
    letter-spacing: -0.055em;
    line-height: 0.95;
  }

  .assignment-copy > p:last-child {
    max-width: 620px;
    margin-bottom: 0;
    color: var(--ink-soft);
    line-height: 1.55;
  }

  .brief-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .brief-table caption {
    padding: 12px 16px;
    border-bottom: 1px solid var(--line);
    color: var(--ink-soft);
    background: var(--cyan-pale);
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-align: left;
    text-transform: uppercase;
  }

  .brief-table tr + tr {
    border-top: 1px solid var(--line);
  }

  .brief-table th,
  .brief-table td {
    padding: 13px 15px;
    overflow-wrap: anywhere;
    text-align: left;
    vertical-align: middle;
  }

  .brief-table th {
    width: 42%;
    color: var(--ink-soft);
    font-size: 0.78rem;
  }

  .brief-table th span {
    display: inline-grid;
    width: 28px;
    height: 28px;
    place-items: center;
    margin-right: 8px;
    border-radius: 50%;
    color: var(--paper);
    background: var(--ink);
  }

  .brief-table td {
    color: #0b6570;
    font-family: ui-monospace, monospace;
    font-size: 0.76rem;
    font-weight: 900;
  }

  .retry-banner {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-top: 18px;
    padding: 17px 19px;
    border: 2px solid #9b4b31;
    border-radius: 12px;
    background: var(--coral-pale);
  }

  .retry-banner > span {
    display: grid;
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: #9b4b31;
    font-size: 1.35rem;
    font-weight: 900;
  }

  .retry-banner h2,
  .retry-banner p {
    margin-bottom: 0;
  }

  .retry-banner h2 {
    font-size: 1.15rem;
  }

  .retry-banner div > p:last-child {
    margin-top: 5px;
    color: #653525;
  }

  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(390px, 1.05fr);
    align-items: start;
    gap: 20px;
    margin-top: 20px;
  }

  .control-deck,
  .light-table {
    min-width: 0;
    border: 2px solid var(--ink);
    border-radius: 14px;
    background: var(--paper);
  }

  .control-deck {
    padding: clamp(16px, 2.8vw, 28px);
  }

  .deck-heading,
  .map-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 15px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--ink);
  }

  .deck-heading h2,
  .map-heading h2 {
    margin-bottom: 0;
    font-size: clamp(1.35rem, 2.6vw, 1.85rem);
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .deck-heading > span,
  .map-heading > span {
    flex: 0 0 auto;
    padding: 6px 9px;
    border: 1px solid var(--line);
    border-radius: 99px;
    color: var(--ink-soft);
    font-family: ui-monospace, monospace;
    font-size: 0.64rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .deck-heading > span.ready {
    border-color: #4d6d27;
    color: #304b10;
    background: #e6efac;
  }

  .layer-controls {
    display: grid;
    gap: 13px;
    margin-top: 16px;
  }

  .layer-control {
    min-width: 0;
    margin: 0;
    padding: 10px 11px 12px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #fffdf6;
  }

  .layer-control.filled {
    border-color: var(--ink);
    box-shadow: inset 5px 0 0 var(--cyan);
  }

  .layer-control legend {
    display: flex;
    max-width: 100%;
    align-items: center;
    gap: 10px;
    padding: 0 6px;
  }

  .layer-control legend > span {
    color: #16727a;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 900;
  }

  .layer-control legend div {
    display: grid;
    min-width: 0;
  }

  .layer-control legend strong {
    font-size: 0.88rem;
  }

  .layer-control legend small {
    color: var(--ink-soft);
    font-size: 0.7rem;
    font-weight: 500;
  }

  .choice-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 7px;
  }

  .component-choice {
    position: relative;
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr);
    align-items: center;
    gap: 9px;
    min-height: 82px;
    padding: 10px;
    border: 2px solid #a7afaa;
    border-radius: 9px;
    color: var(--ink);
    background: #f0ede3;
    text-align: left;
    cursor: pointer;
    transition: border-color 120ms ease, background 120ms ease, transform 120ms ease;
  }

  .component-choice:hover {
    border-color: #177781;
    background: var(--cyan-pale);
  }

  .component-choice.selected {
    padding-bottom: 25px;
    border-color: var(--ink);
    background: var(--cyan-pale);
    box-shadow: inset 0 0 0 2px var(--cyan);
  }

  .choice-symbol {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    color: var(--paper);
    background: var(--ink);
    font-size: 1.05rem;
    font-weight: 900;
  }

  .choice-copy {
    display: grid;
    min-width: 0;
  }

  .choice-copy strong,
  .choice-copy small {
    overflow-wrap: anywhere;
  }

  .choice-copy strong {
    font-size: 0.78rem;
    line-height: 1.25;
  }

  .choice-copy small {
    margin-top: 3px;
    color: var(--ink-soft);
    font-size: 0.65rem;
    line-height: 1.25;
  }

  .choice-state {
    position: absolute;
    right: 6px;
    bottom: 4px;
    left: 6px;
    overflow: hidden;
    color: #14545a;
    font-family: ui-monospace, monospace;
    font-size: 0.58rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .choice-state span {
    margin-right: 4px;
  }

  .light-table {
    position: sticky;
    top: 12px;
    padding: clamp(16px, 2.8vw, 26px);
    background: #dce9e4;
  }

  .map-frame {
    margin-top: 14px;
    overflow: hidden;
    border: 2px solid var(--ink);
    border-radius: 12px;
    background: #153945;
  }

  .map-frame svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .map-paper {
    fill: #eff1df;
    stroke: #071b24;
    stroke-width: 3;
  }

  .map-grid-line {
    fill: none;
    stroke: #9fb4ac;
    stroke-dasharray: 2 12;
    stroke-width: 1;
  }

  .contour {
    fill: none;
    stroke: #b4c1b6;
    stroke-width: 2;
  }

  .contour-two {
    stroke-dasharray: 7 8;
  }

  .north,
  .map-label,
  .site-name,
  .ghost-label,
  .entry-label {
    fill: var(--ink);
    font-family: ui-monospace, monospace;
    font-size: 12px;
    font-weight: 900;
  }

  .north {
    font-size: 13px;
  }

  .site-patch,
  .ghost-site {
    stroke: var(--ink);
    stroke-width: 3;
  }

  .site-patch[data-kind="earth"] {
    fill: #ded38b;
  }

  .site-patch[data-kind="wet"] {
    fill: #9dc9c4;
    stroke-dasharray: 5 6;
  }

  .site-patch[data-kind="built"] {
    fill: #c8c8bf;
    stroke-dasharray: 14 3 3 3;
  }

  .site-patch[data-kind="grass"] {
    fill: #bcd38e;
    stroke-dasharray: 2 4;
  }

  .ghost-site,
  .ghost-link,
  .ghost-border,
  .ghost-route {
    fill: none;
    stroke: #738982;
    stroke-dasharray: 7 9;
    stroke-width: 2;
  }

  .ghost-label {
    fill: #60756f;
    font-size: 11px;
  }

  .situation-link {
    stroke: #166e76;
    stroke-dasharray: 5 5;
    stroke-width: 5;
  }

  .landmark-dot {
    fill: var(--cyan);
    stroke: var(--ink);
    stroke-width: 3;
  }

  .landmark-symbol {
    fill: var(--ink);
    font-size: 17px;
    font-weight: 950;
  }

  .limit-path {
    fill: none;
    stroke: #b4422e;
    stroke-width: 11;
  }

  .limit-path[data-kind="water"] {
    stroke: #257b91;
    stroke-dasharray: 18 5 3 5;
  }

  .limit-path[data-kind="wall"] {
    stroke: #8c5c3c;
    stroke-dasharray: 20 4;
  }

  .limit-path[data-kind="rail"] {
    stroke: #29363b;
    stroke-dasharray: 3 7;
    stroke-width: 13;
  }

  .limit-path[data-kind="fence"] {
    stroke: #76563e;
    stroke-dasharray: 4 8;
    stroke-width: 9;
  }

  .limit-label {
    paint-order: stroke;
    stroke: #eff1df;
    stroke-width: 5px;
  }

  .access-path {
    fill: none;
    stroke: #bd4f35;
    stroke-linecap: round;
    stroke-width: 8;
  }

  .access-path[data-kind="blocked"] {
    stroke-dasharray: 13 7;
    marker-end: none;
  }

  .access-path[data-kind="crossing"] {
    stroke: #8b3d2b;
    stroke-width: 9;
  }

  .access-path[data-crosses="yes"] {
    paint-order: stroke;
    stroke: #a13f2c;
  }

  .access-label {
    fill: #8a3223;
    paint-order: stroke;
    stroke: #eff1df;
    stroke-width: 5px;
  }

  #route-arrow-ex0306 path {
    fill: #bd4f35;
  }

  .place-mark rect {
    fill: var(--lime);
    stroke: var(--ink);
    stroke-width: 4;
  }

  .place-mark > path {
    fill: var(--coral);
    stroke: var(--ink);
    stroke-linejoin: round;
    stroke-width: 4;
  }

  .place-mark > text:not(.entry-label) {
    fill: var(--ink);
    font-size: 24px;
    font-weight: 950;
  }

  .place-mark circle {
    fill: var(--coral);
    stroke: var(--ink);
    stroke-width: 2;
  }

  .map-caption {
    margin: 8px 2px 0;
    color: var(--ink-soft);
    font-size: 0.67rem;
    line-height: 1.4;
  }

  .consequence-panel {
    margin-top: 14px;
    border: 1px solid var(--ink);
    border-radius: 10px;
    background: var(--paper);
  }

  .consequence-panel h3 {
    margin-bottom: 0;
    padding: 10px 12px;
    border-bottom: 1px solid var(--line);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .consequence-panel ol {
    margin-bottom: 0;
    padding: 0;
    list-style: none;
  }

  .consequence-panel li {
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 8px;
    padding: 9px 11px;
    color: #5c6c68;
  }

  .consequence-panel li + li {
    border-top: 1px dashed var(--line);
  }

  .consequence-panel li.filled {
    color: var(--ink);
  }

  .consequence-panel li > span {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: #667b78;
    font-weight: 900;
  }

  .consequence-panel li.filled > span {
    color: var(--ink);
    background: var(--cyan);
  }

  .consequence-panel strong {
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .consequence-panel p {
    margin: 2px 0 0;
    font-size: 0.69rem;
    line-height: 1.35;
  }

  .submit-zone {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: stretch;
    gap: 10px;
    margin-top: 12px;
  }

  .assembly-status {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-height: 54px;
    padding: 9px 10px;
    border: 1px dashed #63736f;
    border-radius: 8px;
    background: #f2eee4;
  }

  .assembly-status.ready {
    border-style: solid;
    border-color: #587226;
    background: #e5efad;
  }

  .assembly-status > span {
    font-weight: 950;
  }

  .assembly-status p {
    margin-bottom: 0;
    color: var(--ink-soft);
    font-size: 0.68rem;
    line-height: 1.35;
  }

  .submit-action {
    min-width: 190px;
  }

  .submit-action:disabled {
    border-color: #7d8985;
    color: #64716e;
    background: #cbcfc5;
    box-shadow: none;
    cursor: not-allowed;
  }

  .feedback-state,
  .completion-state {
    width: min(1040px, calc(100% - 40px));
    margin: 0 auto;
    padding: clamp(34px, 6vw, 72px) 0;
    color: var(--paper);
  }

  .feedback-header {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(99, 215, 219, 0.4);
  }

  .feedback-mark {
    display: grid;
    width: 70px;
    height: 70px;
    flex: 0 0 70px;
    place-items: center;
    border: 3px solid var(--paper);
    border-radius: 50%;
    color: var(--night);
    background: var(--coral);
    font-size: 2rem;
    font-weight: 950;
  }

  .correct-state .feedback-mark {
    background: var(--lime);
  }

  .feedback-header .eyebrow,
  .completion-state .eyebrow {
    color: var(--cyan);
  }

  .feedback-header h1,
  .completion-state h1 {
    max-width: 840px;
    margin-bottom: 0;
    font-size: clamp(2.4rem, 6vw, 5.6rem);
    font-weight: 950;
    letter-spacing: -0.06em;
    line-height: 0.94;
  }

  .specific-feedback,
  .correct-feedback {
    margin-top: 24px;
    padding: clamp(20px, 4vw, 36px);
    border-radius: 14px;
    color: var(--ink);
    background: var(--paper);
  }

  .specific-feedback {
    border-left: 10px solid var(--coral);
  }

  .correct-feedback {
    border-left: 10px solid var(--lime);
    font-size: clamp(1rem, 2vw, 1.18rem);
    line-height: 1.6;
  }

  .correct-feedback p {
    margin-bottom: 0;
  }

  .layer-chip {
    display: inline-block;
    margin-bottom: 12px;
    padding: 5px 8px;
    border: 1px solid var(--ink);
    border-radius: 99px;
    color: #8d3727;
    font-family: ui-monospace, monospace;
    font-size: 0.64rem;
    font-weight: 900;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .specific-feedback h2 {
    margin-bottom: 12px;
    font-size: clamp(1.4rem, 3vw, 2rem);
  }

  .specific-feedback > p {
    color: var(--ink-soft);
    line-height: 1.6;
  }

  .target-contrast {
    display: grid;
    gap: 2px;
    margin-top: 17px;
    padding: 12px 14px;
    border: 1px solid #c88975;
    border-radius: 8px;
    background: var(--coral-pale);
  }

  .target-contrast span {
    color: #783827;
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .submitted-layers,
  .resolved-layers {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 18px;
  }

  .submitted-layers article,
  .resolved-layers article {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    gap: 11px;
    padding: 15px;
    border: 1px solid rgba(99, 215, 219, 0.42);
    border-radius: 10px;
    color: var(--paper);
    background: var(--night-mid);
  }

  .submitted-layers article.is-error {
    border: 2px solid var(--coral);
  }

  .submitted-layers article > span,
  .resolved-layers article > span {
    color: var(--cyan);
    font-family: ui-monospace, monospace;
    font-weight: 900;
  }

  .submitted-layers article div,
  .resolved-layers article div {
    display: grid;
    min-width: 0;
  }

  .submitted-layers small,
  .resolved-layers small {
    color: #9eb8b9;
    font-size: 0.64rem;
    text-transform: uppercase;
  }

  .submitted-layers strong,
  .resolved-layers strong {
    overflow-wrap: anywhere;
    margin-top: 3px;
    line-height: 1.35;
  }

  .submitted-layers b {
    margin-left: auto;
    color: var(--lime);
    font-family: ui-monospace, monospace;
    font-size: 0.59rem;
    text-transform: uppercase;
  }

  .submitted-layers .is-error b {
    color: #ffad8e;
  }

  .feedback-footer,
  .continuation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 20px;
    padding: 18px;
    border: 1px solid rgba(99, 215, 219, 0.42);
    border-radius: 12px;
    background: var(--night-mid);
  }

  .feedback-footer p {
    max-width: 560px;
    margin-bottom: 0;
    color: #b7cccc;
  }

  .feedback-footer .primary-action,
  .continuation .primary-action {
    flex: 0 0 auto;
  }

  .resolved-layers article > span {
    display: grid;
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    place-items: center;
    border-radius: 50%;
    color: var(--ink);
    background: var(--cyan);
  }

  .resolved-layers p {
    margin: 6px 0 0;
    color: #b8cdcd;
    font-size: 0.73rem;
    line-height: 1.4;
  }

  .invariant-note {
    margin-top: 18px;
    padding: 17px 19px;
    border-left: 7px solid var(--cyan);
    color: var(--ink);
    background: var(--cyan-pale);
  }

  .invariant-note span,
  .continuation span {
    color: #136972;
    font-family: ui-monospace, monospace;
    font-size: 0.64rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .invariant-note p {
    margin: 5px 0 0;
    line-height: 1.5;
  }

  .continuation div {
    min-width: 0;
  }

  .continuation p {
    max-width: 570px;
    margin: 5px 0 0;
    color: #b7cccc;
    font-size: 0.8rem;
  }

  .completion-state {
    text-align: center;
  }

  .completion-icon {
    display: grid;
    width: 112px;
    height: 112px;
    place-content: center;
    margin: 0 auto 26px;
    border: 3px solid var(--cyan);
    border-radius: 24px;
    color: var(--night);
    background: var(--lime);
    box-shadow: 8px 8px 0 var(--coral);
  }

  .completion-icon span {
    font-size: 2.6rem;
    font-weight: 950;
    line-height: 1;
  }

  .completion-icon small {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .completion-state h1 {
    margin-right: auto;
    margin-left: auto;
  }

  .completion-lead {
    max-width: 820px;
    margin: 24px auto 0;
    color: #c3d3d3;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.65;
  }

  .completion-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 9px;
    margin: 30px 0 0;
    padding: 0;
    list-style: none;
    text-align: left;
  }

  .completion-grid li {
    display: flex;
    min-width: 0;
    gap: 9px;
    padding: 15px;
    border: 1px solid rgba(99, 215, 219, 0.4);
    border-radius: 10px;
    background: var(--night-mid);
  }

  .completion-grid li > span {
    color: var(--cyan);
    font-family: ui-monospace, monospace;
    font-size: 0.63rem;
    font-weight: 900;
  }

  .completion-grid strong {
    font-size: 0.84rem;
  }

  .completion-grid p {
    margin: 5px 0 0;
    color: #aec2c3;
    font-size: 0.72rem;
    line-height: 1.4;
  }

  .claim-boundary {
    display: flex;
    max-width: 850px;
    align-items: flex-start;
    gap: 12px;
    margin: 22px auto 0;
    padding: 15px 17px;
    border: 1px solid rgba(215, 232, 109, 0.5);
    border-radius: 10px;
    color: #cfdddc;
    background: rgba(215, 232, 109, 0.08);
    text-align: left;
  }

  .claim-boundary > span {
    color: var(--lime);
    font-size: 1.25rem;
  }

  .claim-boundary p {
    margin-bottom: 0;
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .privacy-note {
    margin: 17px 0 0;
    color: #91aaab;
    font-size: 0.7rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (max-width: 980px) {
    .intro-grid {
      grid-template-columns: minmax(0, 1fr) minmax(300px, 0.68fr);
    }

    .layer-preview {
      min-height: 500px;
    }

    .assignment {
      grid-template-columns: minmax(0, 1fr);
    }

    .assignment-copy {
      border-right: 0;
      border-bottom: 2px solid var(--ink);
    }

    .workspace {
      grid-template-columns: minmax(0, 1fr);
    }

    .light-table {
      position: static;
    }
  }

  @media (max-width: 760px) {
    .intro {
      width: min(640px, calc(100% - 28px));
    }

    .studio-bar {
      grid-template-columns: 1fr auto;
    }

    .studio-bar > span {
      display: none;
    }

    .intro-grid {
      grid-template-columns: minmax(0, 1fr);
      min-height: 0;
      padding: 28px 0 42px;
    }

    .layer-preview {
      min-height: 390px;
      order: -1;
    }

    .preview-site { top: 35px; }
    .preview-situation { top: 105px; }
    .preview-limit { top: 175px; }
    .preview-access { top: 245px; }
    .preview-sheet { min-height: 84px; }
    .preview-place { top: 145px; width: 82px; height: 82px; }

    .activity-header {
      grid-template-columns: 1fr auto;
      padding-right: 14px;
      padding-left: 14px;
    }

    .progress-copy {
      display: none;
    }

    .assignment,
    .workspace,
    .retry-banner {
      width: calc(100% - 28px);
    }

    .submitted-layers,
    .resolved-layers,
    .completion-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .feedback-footer,
    .continuation {
      align-items: stretch;
      flex-direction: column;
    }

    .feedback-footer .primary-action,
    .continuation .primary-action {
      width: 100%;
    }
  }

  @media (max-width: 520px) {
    .intro,
    .feedback-state,
    .completion-state {
      width: calc(100% - 20px);
    }

    .studio-bar {
      padding-right: 4px;
      padding-left: 4px;
    }

    .intro h1 {
      font-size: clamp(2.8rem, 15vw, 4.2rem);
    }

    .action-sequence {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .action-sequence li:nth-child(2) {
      border-right: 0;
    }

    .action-sequence li:nth-child(-n + 2) {
      border-bottom: 1px solid rgba(99, 215, 219, 0.25);
    }

    .layer-preview {
      min-height: 310px;
    }

    .preview-sheet {
      right: 7%;
      left: 7%;
      min-height: 67px;
      padding: 9px 11px;
    }

    .preview-sheet strong {
      font-size: 0.74rem;
    }

    .preview-sheet i {
      font-size: 1.4rem;
    }

    .preview-site { top: 23px; }
    .preview-situation { top: 76px; right: 4%; left: 10%; }
    .preview-limit { top: 129px; right: 10%; left: 4%; }
    .preview-access { top: 182px; }
    .preview-place { top: 100px; width: 66px; height: 66px; font-size: 0.72rem; }

    .primary-action,
    .submit-action {
      width: 100%;
      justify-content: space-between;
    }

    .activity-header {
      gap: 10px;
    }

    .progress-track > span {
      width: 24px;
    }

    .assignment,
    .workspace,
    .retry-banner {
      width: calc(100% - 20px);
    }

    .assignment-copy {
      padding: 20px 14px;
    }

    .assignment-copy h1 {
      font-size: clamp(2rem, 12vw, 3.2rem);
    }

    .brief-table,
    .brief-table caption,
    .brief-table tbody,
    .brief-table tr,
    .brief-table th,
    .brief-table td {
      display: block;
      width: 100%;
    }

    .brief-table tr {
      padding: 9px 12px;
    }

    .brief-table th,
    .brief-table td {
      padding: 4px 0;
    }

    .brief-table th span {
      width: 25px;
      height: 25px;
    }

    .retry-banner {
      padding: 13px;
    }

    .retry-banner > span {
      width: 38px;
      height: 38px;
      flex-basis: 38px;
    }

    .control-deck,
    .light-table {
      padding: 13px;
    }

    .deck-heading,
    .map-heading {
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
    }

    .choice-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .component-choice {
      min-height: 76px;
    }

    .submit-zone {
      grid-template-columns: minmax(0, 1fr);
    }

    .submit-action {
      min-width: 0;
    }

    .feedback-header {
      gap: 12px;
    }

    .feedback-mark {
      width: 52px;
      height: 52px;
      flex-basis: 52px;
      font-size: 1.4rem;
    }

    .feedback-header h1,
    .completion-state h1 {
      font-size: clamp(2.05rem, 11.5vw, 3.4rem);
    }

    .submitted-layers,
    .resolved-layers,
    .completion-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .submitted-layers article {
      flex-wrap: wrap;
    }

    .completion-icon {
      width: 92px;
      height: 92px;
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

    .primary-action:hover:not(:disabled),
    .submit-action:hover:not(:disabled),
    .primary-action:active:not(:disabled),
    .submit-action:active:not(:disabled) {
      transform: none;
    }
  }
</style>
