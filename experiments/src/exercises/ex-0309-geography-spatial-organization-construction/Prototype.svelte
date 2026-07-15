<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';
  type Choice = 'correct' | 'incorrect';
  type LinkName = 'purpose' | 'facility' | 'effect';

  type ChainOption = {
    id: string;
    choice: Choice;
    label: string;
    detail: string;
    symbol: string;
  };

  type MapGroup = {
    nodes: string[];
    edges: string[];
  };

  type MapView = {
    title: string;
    groups: MapGroup[];
    observation: string;
    ariaLabel: string;
  };

  type Scenario = {
    id: string;
    folio: string;
    place: string;
    observation: string;
    mission: string;
    spatialFrame: string;
    purpose: [ChainOption, ChainOption];
    facility: [ChainOption, ChainOption];
    effect: [ChainOption, ChainOption];
    beforeMap: MapView;
    afterMaps: Record<Choice, MapView>;
    feedback: Record<LinkName, string>;
    scaffold: Record<LinkName, string>;
    correctFeedback: string;
    impactNote: string;
    directOrder: [Choice, Choice];
  };

  type ChainSelection = Record<LinkName, Choice | null>;
  type CompleteChain = Record<LinkName, Choice>;

  const scenarios: Scenario[] = [
    {
      id: 'place-pauses-passages',
      folio: 'Zones et usages',
      place: 'La place publique du quartier',
      observation:
        'Deux rues débouchent sur une place très ouverte. Les personnes la traversent, mais aucun endroit ne permet de s’arrêter.',
      mission:
        'Organise la place pour accueillir une pause et des rencontres, sans couper le passage entre les deux rues.',
      spatialFrame: 'Espace fréquenté : place et rues d’un quartier proche.',
      purpose: [
        {
          id: 'pause-meeting',
          choice: 'correct',
          label: 'Permettre une pause et des rencontres en gardant la traversée',
          detail: 'La fonction associe un usage et une relation entre les rues.',
          symbol: '01'
        },
        {
          id: 'car-parking',
          choice: 'incorrect',
          label: 'Réserver tout le centre au stationnement des voitures',
          detail: 'Cette fonction organise un autre usage de la même surface.',
          symbol: '01'
        }
      ],
      facility: [
        {
          id: 'parking-grid',
          choice: 'incorrect',
          label: 'Tracer des cases de stationnement sur toute la place',
          detail: 'Les cases occupent la zone centrale entre les rues.',
          symbol: '02'
        },
        {
          id: 'benches-corridor',
          choice: 'correct',
          label: 'Placer deux groupes de bancs au bord d’un passage central',
          detail: 'Les assises forment deux zones; un axe reste libre.',
          symbol: '02'
        }
      ],
      effect: [
        {
          id: 'seats-and-open-route',
          choice: 'correct',
          label: 'Deux zones d’assise apparaissent et le passage reste continu',
          detail: 'Le croquis montre à la fois l’arrêt possible et la liaison conservée.',
          symbol: '03'
        },
        {
          id: 'cars-fill-centre',
          choice: 'incorrect',
          label: 'Les cases occupent le centre et réduisent l’espace de rencontre',
          detail: 'Le croquis montre un autre effet sur l’usage de la place.',
          symbol: '03'
        }
      ],
      beforeMap: {
        title: 'Avant l’aménagement',
        groups: [
          { nodes: ['Rue nord', 'Place sans assise', 'Rue sud'], edges: ['↕ passage', '↕ passage'] }
        ],
        observation: 'Un passage relie les rues; aucune zone de pause n’est indiquée.',
        ariaLabel: 'Rue nord, place sans assise, puis rue sud : passage présent, zone de pause absente.'
      },
      afterMaps: {
        correct: {
          title: 'Après l’ajout des bancs',
          groups: [
            { nodes: ['Rue nord', 'Passage libre', 'Rue sud'], edges: ['↕ passage', '↕ passage'] },
            { nodes: ['Zone de bancs ouest', 'Passage libre'], edges: ['∥ borde'] },
            { nodes: ['Zone de bancs est', 'Passage libre'], edges: ['∥ borde'] }
          ],
          observation: 'Deux zones pour s’asseoir bordent un passage qui relie encore les rues.',
          ariaLabel: 'Rue nord, bancs, passage libre, bancs, rue sud : les assises bordent une liaison continue.'
        },
        incorrect: {
          title: 'Après le tracé des cases',
          groups: [
            { nodes: ['Rue nord', 'Centre · voitures', 'Rue sud'], edges: ['× centre occupé', '× centre occupé'] }
          ],
          observation: 'Les cases prennent la zone centrale; l’espace pour s’arrêter à pied diminue.',
          ariaLabel: 'Rue nord, deux zones de stationnement, rue sud : les voitures occupent le centre de la place.'
        }
      },
      feedback: {
        purpose:
          '✕ Ta chaîne commence par réserver le centre aux voitures. Cette fonction ne répond pas à la mission, qui demande une pause et des rencontres tout en conservant la traversée.',
        facility:
          '✕ La fonction choisie parle de pause et de rencontre, mais les cases de stationnement utilisent la zone centrale pour les voitures. Le deuxième maillon ne rend donc pas la fonction possible.',
        effect:
          '✕ Les bancs placés sur les côtés ne produisent pas l’effet « voitures au centre ». Relis le croquis transformé : il faut décrire les zones d’assise et la liaison encore ouverte.'
      },
      scaffold: {
        purpose:
          'Relis les deux actions de la mission : s’arrêter et traverser. Quelle fonction doit garder ces deux possibilités ensemble ?',
        facility:
          'Cache le nom des objets. Pour chaque proposition, demande-toi : où peut-on s’asseoir et où peut-on encore passer ?',
        effect:
          'Suis le trajet de la rue nord à la rue sud, puis compte les zones où une personne peut s’asseoir. Choisis l’effet qui décrit les deux observations.'
      },
      correctFeedback:
        '✓ La chaîne est cohérente : les bancs organisent des zones de pause, tandis que le passage central conserve la relation entre les deux rues.',
      impactNote:
        'Effet spatial visible : deux zones d’assise rendent la pause et la rencontre possibles sans supprimer le passage. Une hausse réelle de l’usage social demanderait encore une observation.',
      directOrder: ['incorrect', 'correct']
    },
    {
      id: 'collecte-halle-reseau',
      folio: 'Réseau et approvisionnement',
      place: 'La halle et les points de collecte de la région proche',
      observation:
        'Trois points reçoivent des cagettes. Ils sont proches de la halle, mais les petits chemins ne forment pas encore un trajet commun.',
      mission:
        'Organise une collecte qui relie les trois points à la halle. Le croquis signale aussi des maisons le long du trajet.',
      spatialFrame: 'Lien proche–plus lointain : quartier, halle et productions de la région.',
      purpose: [
        {
          id: 'isolate-collection',
          choice: 'incorrect',
          label: 'Isoler chaque point de collecte des autres lieux',
          detail: 'Cette fonction sépare les parties au lieu de les mettre en réseau.',
          symbol: '01'
        },
        {
          id: 'link-collection',
          choice: 'correct',
          label: 'Relier les trois points de collecte à la même halle',
          detail: 'La fonction attendue est un réseau d’approvisionnement.',
          symbol: '01'
        }
      ],
      facility: [
        {
          id: 'collection-loop',
          choice: 'correct',
          label: 'Créer une boucle balisée avec trois arrêts et une zone de déchargement',
          detail: 'Le même itinéraire passe par chaque point puis atteint la halle.',
          symbol: '02'
        },
        {
          id: 'closed-fences',
          choice: 'incorrect',
          label: 'Fermer chaque point avec une barrière continue',
          detail: 'Les limites sont visibles, mais aucun passage commun n’est créé.',
          symbol: '02'
        }
      ],
      effect: [
        {
          id: 'points-cut-off',
          choice: 'incorrect',
          label: 'Les points sont délimités, mais aucun trajet ne rejoint la halle',
          detail: 'Les barrières séparent; elles n’approvisionnent pas le marché.',
          symbol: '03'
        },
        {
          id: 'shared-route',
          choice: 'correct',
          label: 'Un trajet commun dessert les trois points puis la halle',
          detail: 'Le réseau est continu et son passage près des maisons reste visible.',
          symbol: '03'
        }
      ],
      beforeMap: {
        title: 'Avant l’aménagement',
        groups: [
          { nodes: ['Collecte A'], edges: [] },
          { nodes: ['Collecte B'], edges: [] },
          { nodes: ['Collecte C'], edges: [] },
          { nodes: ['Halle'], edges: [] },
          { nodes: ['Maisons proches'], edges: [] }
        ],
        observation: 'Les cinq parties sont repérées, mais aucun trajet commun ne les organise.',
        ariaLabel: 'Trois points de collecte, des maisons et une halle apparaissent sans liaison commune.'
      },
      afterMaps: {
        correct: {
          title: 'Après la création de la boucle',
          groups: [
            {
              nodes: ['Arrêt A', 'Arrêt B', 'Arrêt C', 'Déchargement · Halle'],
              edges: ['↕ trajet', '↕ trajet', '↕ trajet']
            },
            { nodes: ['Maisons proches de la boucle'], edges: [] }
          ],
          observation: 'La ligne passe par A, B et C avant la halle; elle longe aussi les maisons.',
          ariaLabel: 'Une boucle relie les arrêts A, B et C à la halle et passe près des maisons.'
        },
        incorrect: {
          title: 'Après la pose des barrières',
          groups: [
            { nodes: ['A · fermé'], edges: [] },
            { nodes: ['B · fermé'], edges: [] },
            { nodes: ['C · fermé'], edges: [] },
            { nodes: ['Halle isolée'], edges: [] },
            { nodes: ['Maisons'], edges: [] }
          ],
          observation: 'Chaque point a une limite, mais les passages vers la halle restent interrompus.',
          ariaLabel: 'Les points A, B et C sont fermés séparément et ne sont pas reliés à la halle.'
        }
      },
      feedback: {
        purpose:
          '✕ Ta chaîne cherche à isoler les points. Or la mission demande une relation entre A, B, C et la halle : la fonction de départ doit organiser un réseau de collecte.',
        facility:
          '✕ Les barrières délimitent bien des zones, mais elles ne créent aucun trajet vers la halle. Délimiter et relier sont deux fonctions spatiales différentes.',
        effect:
          '✕ La boucle traverse les trois arrêts et atteint la halle : elle ne laisse pas les points isolés. L’effet choisi contredit les liaisons visibles sur le croquis.'
      },
      scaffold: {
        purpose:
          'Pose ton doigt sur A, puis cherche un chemin vers B, C et la halle. Le verbe utile doit-il séparer ces parties ou permettre de passer entre elles ?',
        facility:
          'Une limite entoure; un réseau relie. Repère dans chaque proposition ce qui continue d’un point jusqu’au suivant.',
        effect:
          'Compte les arrêts touchés par la même ligne et regarde où elle se termine. N’oublie pas l’indice « maisons » placé sur son parcours.'
      },
      correctFeedback:
        '✓ La boucle forme un réseau d’approvisionnement : le même trajet relie les trois points de collecte à la zone de déchargement de la halle.',
      impactNote:
        'Effet à examiner : le réseau permet la collecte, mais son passage près des maisons peut aussi produire une gêne; le croquis invite à la vérifier sans l’inventer.',
      directOrder: ['correct', 'incorrect']
    },
    {
      id: 'ruisseau-sentiers-passage',
      folio: 'Limite naturelle et liaison',
      place: 'Les deux sentiers au bord du ruisseau',
      observation:
        'Un sentier arrive sur chaque rive. Le ruisseau marque une séparation et aucun passage ne relie encore les deux chemins.',
      mission:
        'Organise un franchissement à un endroit précis pour rendre le trajet à pied continu et visible.',
      spatialFrame: 'Espace proche : sentiers fréquentés et limite naturelle du ruisseau.',
      purpose: [
        {
          id: 'link-paths',
          choice: 'correct',
          label: 'Relier les deux sentiers par un franchissement repérable',
          detail: 'La fonction transforme une séparation en point de passage.',
          symbol: '01'
        },
        {
          id: 'decorate-bank',
          choice: 'incorrect',
          label: 'Embellir seulement la rive ouest du ruisseau',
          detail: 'Cette fonction transforme une rive sans relier les chemins.',
          symbol: '01'
        }
      ],
      facility: [
        {
          id: 'footbridge',
          choice: 'correct',
          label: 'Aligner une passerelle avec les sentiers et ajouter des garde-corps',
          detail: 'La réalisation traverse le ruisseau en un point identifié.',
          symbol: '02'
        },
        {
          id: 'flower-bed',
          choice: 'incorrect',
          label: 'Installer un parterre fleuri sur la rive ouest',
          detail: 'Le bord change d’aspect, mais rien ne franchit l’eau.',
          symbol: '02'
        }
      ],
      effect: [
        {
          id: 'bank-decorated-only',
          choice: 'incorrect',
          label: 'Une rive est embellie, mais le ruisseau coupe toujours le trajet',
          detail: 'L’effet correspond au parterre, pas à une liaison.',
          symbol: '03'
        },
        {
          id: 'continuous-path',
          choice: 'correct',
          label: 'Le trajet devient continu et le passage se concentre sur la passerelle',
          detail: 'Le croquis montre la liaison et l’endroit précis du franchissement.',
          symbol: '03'
        }
      ],
      beforeMap: {
        title: 'Avant l’aménagement',
        groups: [
          { nodes: ['Sentier ouest', '≈ Ruisseau ≈', 'Sentier est'], edges: ['× interrompu', '× interrompu'] }
        ],
        observation: 'Les sentiers s’arrêtent de part et d’autre de la limite naturelle.',
        ariaLabel: 'Le sentier ouest et le sentier est sont séparés par les deux rives et le ruisseau.'
      },
      afterMaps: {
        correct: {
          title: 'Après la pose de la passerelle',
          groups: [
            {
              nodes: ['Sentier ouest', '═ Passerelle avec garde-corps ═', 'Sentier est'],
              edges: ['↕ passage', '↕ passage']
            }
          ],
          observation: 'Une seule liaison continue traverse le ruisseau à l’endroit marqué.',
          ariaLabel: 'Une passerelle avec garde-corps relie le sentier ouest au sentier est au-dessus du ruisseau.'
        },
        incorrect: {
          title: 'Après la création du parterre',
          groups: [
            { nodes: ['Sentier ouest + parterre', '≈ Ruisseau ≈', 'Sentier est'], edges: ['× interrompu', '× interrompu'] }
          ],
          observation: 'La rive ouest change d’aspect; les deux sentiers restent séparés.',
          ariaLabel: 'Un parterre occupe la rive ouest, mais le ruisseau sépare toujours les deux sentiers.'
        }
      },
      feedback: {
        purpose:
          '✕ Embellir une rive ne répond pas à la mission de trajet continu. La fonction doit agir sur la relation entre les deux sentiers séparés par le ruisseau.',
        facility:
          '✕ Le parterre modifie une partie du lieu, mais il ne traverse pas la limite naturelle. Le deuxième maillon ne peut donc pas relier les sentiers.',
        effect:
          '✕ Une passerelle alignée avec les chemins crée bien une liaison. L’effet « trajet encore coupé » appartient au parterre, pas à l’aménagement posé.'
      },
      scaffold: {
        purpose:
          'Nomme les trois parties dans l’ordre : sentier, ruisseau, sentier. Quelle relation manque entre la première et la troisième ?',
        facility:
          'Cherche une réalisation qui touche les deux rives. Modifier une seule rive suffit-il pour continuer le trajet ?',
        effect:
          'Pars du sentier ouest et avance maillon par maillon. Peux-tu atteindre le sentier est, et par quel endroit précis ?'
      },
      correctFeedback:
        '✓ La passerelle relie les deux parties du réseau de sentiers : le franchissement devient continu, repérable et concentré en un point.',
      impactNote:
        'Effet à observer : les passages à pied se concentrent sur la passerelle. Le prototype ne permet pas, à lui seul, de conclure sur l’impact environnemental réel.',
      directOrder: ['incorrect', 'correct']
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentScenario: Scenario = scenarios[0];
  let selections: ChainSelection = emptyChain();
  let submitted: CompleteChain | null = null;
  let mistakeLink: LinkName = 'purpose';
  let isChainComplete = false;
  let mapView: MapView = currentScenario.beforeMap;

  $: currentScenario = scenarios[currentIndex];
  $: legacyState = phase === 'intro'
    ? 'ready'
    : phase === 'active' || phase === 'retry'
      ? 'question'
      : phase;
  $: isChainComplete = selections.purpose !== null && selections.facility !== null && selections.effect !== null;
  $: mapView = selections.facility === null
    ? currentScenario.beforeMap
    : currentScenario.afterMaps[selections.facility];

  function emptyChain(): ChainSelection {
    return { purpose: null, facility: null, effect: null };
  }

  function optionsFor(link: LinkName): [ChainOption, ChainOption] {
    return currentScenario[link];
  }

  function optionFor(link: LinkName, choice: Choice): ChainOption {
    const option = optionsFor(link).find((item) => item.choice === choice);
    if (!option) throw new Error(`Option absente pour ${link}:${choice}`);
    return option;
  }

  function focusOnMount(node: HTMLElement): { destroy: () => void } {
    node.focus();
    return { destroy: () => undefined };
  }

  function start(): void {
    currentIndex = 0;
    selections = emptyChain();
    submitted = null;
    mistakeLink = 'purpose';
    phase = 'active';
  }

  function choose(link: LinkName, choice: Choice): void {
    selections = { ...selections, [link]: choice };
  }

  function firstMismatch(chain: CompleteChain): LinkName {
    if (chain.purpose === 'incorrect') return 'purpose';
    if (chain.facility === 'incorrect') return 'facility';
    return 'effect';
  }

  function resolveChain(chain: CompleteChain): void {
    selections = { ...chain };
    submitted = { ...chain };
    const correct = chain.purpose === 'correct' && chain.facility === 'correct' && chain.effect === 'correct';
    if (correct) {
      phase = 'correct';
      return;
    }
    mistakeLink = firstMismatch(chain);
    phase = 'incorrect';
  }

  function submit(): void {
    if (!selections.purpose || !selections.facility || !selections.effect) return;
    resolveChain({
      purpose: selections.purpose,
      facility: selections.facility,
      effect: selections.effect
    });
  }

  function resolveWhole(choice: Choice): void {
    resolveChain({ purpose: choice, facility: choice, effect: choice });
  }

  function retry(): void {
    phase = 'retry';
  }

  function continueLoop(): void {
    if (currentIndex === scenarios.length - 1) {
      phase = 'complete';
      return;
    }
    currentIndex += 1;
    selections = emptyChain();
    submitted = null;
    mistakeLink = 'purpose';
    phase = 'active';
  }

  function linkTitle(link: LinkName): string {
    if (link === 'purpose') return 'Fonction';
    if (link === 'facility') return 'Aménagement';
    return 'Effet observable';
  }

  function linkNumber(link: LinkName): string {
    if (link === 'purpose') return '1';
    if (link === 'facility') return '2';
    return '3';
  }
</script>

<svelte:head>
  <title>L’atelier des trois maillons · EX-0309</title>
  <meta
    name="description"
    content="Construire la relation entre fonction, aménagement et effet observable dans un espace proche."
  />
</svelte:head>

<div
  class="generic-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0309"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0309">
    <div class="atlas-page">
      <header class="topline">
        <a class="brand" href="#work-area" aria-label="Aller au contenu de l’atelier">
          <span aria-hidden="true">3M</span>
          <span><small>Géographie</small><strong>Atelier des maillons</strong></span>
        </a>
        {#if phase !== 'intro' && phase !== 'complete'}
          <p class="progress" aria-label={`Situation ${currentIndex + 1} sur ${scenarios.length}`}>
            <span>Situation</span> <strong>{String(currentIndex + 1).padStart(2, '0')} / 03</strong>
          </p>
        {/if}
      </header>

      <div id="work-area">
        {#if phase === 'intro'}
          <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
            <div class="intro-copy">
              <p class="overline">Une fonction n’agit pas toute seule</p>
              <h1 id="intro-title">Fabrique le lien, pas seulement l’objet.</h1>
              <p class="intro-lead">
                Dans trois lieux proches, pose une <strong>fonction</strong>, choisis un
                <strong>aménagement</strong>, puis vérifie son <strong>effet visible</strong> sur le
                croquis.
              </p>
              <p class="operation">
                Utilise les grandes cartes avec le toucher, la souris ou <kbd>Tab</kbd> puis
                <kbd>Entrée</kbd> / <kbd>Espace</kbd>. Le bouton de vérification valide seulement une
                chaîne de trois cartes.
              </p>
              <button type="button" class="main-action" data-smoke-action="start" onclick={start}>
                Entrer dans le premier lieu <span aria-hidden="true">↗</span>
              </button>
            </div>

            <div class="chain-manifest" aria-label="Exemple de chaîne en trois maillons">
              <p>La règle de l’atelier</p>
              <ol>
                <li><span>1</span><strong>Fonction</strong><small>Ce que le lieu doit permettre</small></li>
                <li><span>2</span><strong>Aménagement</strong><small>Ce qui organise l’espace</small></li>
                <li><span>3</span><strong>Effet</strong><small>Ce que le croquis permet d’observer</small></li>
              </ol>
              <p class="manifest-note">But ≠ objet ≠ effet. Les trois doivent raconter la même organisation.</p>
            </div>
          </section>
        {:else if phase === 'active' || phase === 'retry'}
          <section
            class="workspace"
            class:is-retry={phase === 'retry'}
            tabindex="-1"
            use:focusOnMount
            data-smoke-state={phase}
            data-smoke-variation={currentScenario.id}
            aria-labelledby="scenario-title"
          >
            <div class="scenario-heading">
              <div>
                <p class="overline">{currentScenario.folio}</p>
                <h1 id="scenario-title">{currentScenario.place}</h1>
              </div>
              <span class="folio" aria-hidden="true">{String(currentIndex + 1).padStart(2, '0')}</span>
            </div>

            <div class="brief-strip">
              <div>
                <span>Observation de départ</span>
                <p>{currentScenario.observation}</p>
              </div>
              <div>
                <span>Mission</span>
                <p>{currentScenario.mission}</p>
              </div>
              <p class="spatial-frame"><span aria-hidden="true">⌖</span>{currentScenario.spatialFrame}</p>
            </div>

            {#if phase === 'retry'}
              <aside class="scaffold" role="status" aria-live="polite">
                <span class="scaffold-index" aria-hidden="true">{linkNumber(mistakeLink)}</span>
                <div>
                  <p>Indice pour le maillon « {linkTitle(mistakeLink)} »</p>
                  <strong>{currentScenario.scaffold[mistakeLink]}</strong>
                  <small>Ta chaîne précédente reste posée. Change une ou plusieurs cartes, puis vérifie à nouveau.</small>
                </div>
              </aside>
            {/if}

            <div class="construction-layout">
              <aside class="map-panel" aria-labelledby="map-title">
                <div class="map-label">
                  <span>Croquis transformé</span>
                  <strong id="map-title">{mapView.title}</strong>
                </div>
                <div
                  class="map-canvas"
                  class:has-facility={selections.facility !== null}
                  role="img"
                  aria-label={mapView.ariaLabel}
                >
                  <div class="map-groups" aria-hidden="true">
                    {#each mapView.groups as group, groupIndex}
                      <div class="map-group">
                        {#if mapView.groups.length > 1}<small>Ensemble {groupIndex + 1}</small>{/if}
                        {#each group.nodes as node, index}
                          <div class="map-node">
                            <span>{index + 1}</span>
                            <strong>{node}</strong>
                          </div>
                          {#if group.edges[index]}
                            <div class="map-edge">{group.edges[index]}</div>
                          {/if}
                        {/each}
                      </div>
                    {/each}
                  </div>
                </div>
                <p class="map-observation" aria-live="polite">
                  <span aria-hidden="true">◎</span>{mapView.observation}
                </p>
                <p class="map-help">Le croquis change dès que tu poses le maillon 2.</p>
              </aside>

              <div class="builder">
                <div class="assembled-chain" aria-live="polite" aria-label="Chaîne actuellement assemblée">
                  {#each ['purpose', 'facility', 'effect'] as link, index}
                    <div class:empty={selections[link as LinkName] === null}>
                      <span>{index + 1} · {linkTitle(link as LinkName)}</span>
                      <strong>
                        {selections[link as LinkName]
                          ? optionFor(link as LinkName, selections[link as LinkName] as Choice).label
                          : 'Carte à poser'}
                      </strong>
                    </div>
                    {#if index < 2}<b aria-hidden="true">→</b>{/if}
                  {/each}
                </div>

                <fieldset class="link-step">
                  <legend><span>1</span> Choisis la fonction du lieu</legend>
                  <p>Quelle action doit devenir possible dans cette mission&nbsp;?</p>
                  <div class="option-grid">
                    {#each currentScenario.purpose as option}
                      <button
                        type="button"
                        class:selected={selections.purpose === option.choice}
                        aria-pressed={selections.purpose === option.choice}
                        data-smoke-attempt={option.choice}
                        data-smoke-step="1"
                        onclick={() => choose('purpose', option.choice)}
                      >
                        <span class="option-symbol" aria-hidden="true">{option.symbol}</span>
                        <span class="option-copy"><strong>{option.label}</strong><small>{option.detail}</small></span>
                        <span class="selection-cue">
                          {selections.purpose === option.choice ? '● Carte posée' : '○ Poser cette carte'}
                        </span>
                      </button>
                    {/each}
                  </div>
                </fieldset>

                <fieldset class="link-step">
                  <legend><span>2</span> Ajoute un aménagement</legend>
                  <p>Observe comment chaque réalisation organise les parties du lieu.</p>
                  <div class="option-grid">
                    {#each currentScenario.facility as option}
                      <button
                        type="button"
                        class:selected={selections.facility === option.choice}
                        aria-pressed={selections.facility === option.choice}
                        data-smoke-attempt={option.choice}
                        data-smoke-step="2"
                        onclick={() => choose('facility', option.choice)}
                      >
                        <span class="option-symbol" aria-hidden="true">{option.symbol}</span>
                        <span class="option-copy"><strong>{option.label}</strong><small>{option.detail}</small></span>
                        <span class="selection-cue">
                          {selections.facility === option.choice ? '● Carte posée' : '○ Poser cette carte'}
                        </span>
                      </button>
                    {/each}
                  </div>
                </fieldset>

                <fieldset class="link-step">
                  <legend><span>3</span> Nomme l’effet observable</legend>
                  <p>Lis le croquis transformé, puis choisis seulement ce qu’il permet de constater.</p>
                  <div class="option-grid">
                    {#each currentScenario.effect as option}
                      <button
                        type="button"
                        class:selected={selections.effect === option.choice}
                        aria-pressed={selections.effect === option.choice}
                        data-smoke-attempt={option.choice}
                        data-smoke-step="3"
                        onclick={() => choose('effect', option.choice)}
                      >
                        <span class="option-symbol" aria-hidden="true">{option.symbol}</span>
                        <span class="option-copy"><strong>{option.label}</strong><small>{option.detail}</small></span>
                        <span class="selection-cue">
                          {selections.effect === option.choice ? '● Carte posée' : '○ Poser cette carte'}
                        </span>
                      </button>
                    {/each}
                  </div>
                </fieldset>

                <button
                  type="button"
                  class="main-action submit-chain"
                  disabled={!isChainComplete}
                  data-smoke-action="submit"
                  onclick={submit}
                >
                  {isChainComplete ? 'Vérifier les trois liens' : 'Pose encore les trois cartes'}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <aside class="whole-chain-mode" aria-labelledby="whole-chain-title">
              <div>
                <p class="overline">Autre manière, même relation</p>
                <h2 id="whole-chain-title">Poser les trois cartes en un seul geste</h2>
                <p>
                  Si tu préfères une seule grande touche, lis une chaîne entière. Le bouton la pose et la vérifie avec les mêmes règles.
                </p>
              </div>
              <div class="whole-chain-options">
                {#each currentScenario.directOrder as choice, index}
                  <button type="button" data-smoke-answer={choice} onclick={() => resolveWhole(choice)}>
                    <span class="whole-label">Chaîne {index + 1} · Poser et vérifier</span>
                    <span><b>Fonction</b>{optionFor('purpose', choice).label}</span>
                    <i aria-hidden="true">↓</i>
                    <span><b>Aménagement</b>{optionFor('facility', choice).label}</span>
                    <i aria-hidden="true">↓</i>
                    <span><b>Effet</b>{optionFor('effect', choice).label}</span>
                  </button>
                {/each}
              </div>
            </aside>
          </section>
        {:else if phase === 'incorrect'}
          <section
            class="feedback-page feedback-incorrect"
            tabindex="-1"
            use:focusOnMount
            data-smoke-state="incorrect"
            data-smoke-variation={currentScenario.id}
            aria-labelledby="incorrect-title"
          >
            <div class="feedback-signal"><span aria-hidden="true">✕</span> Chaîne à reconstruire</div>
            <p class="overline">Le premier lien qui se rompt : {linkTitle(mistakeLink)}</p>
            <h1 id="incorrect-title">Les trois maillons ne produisent pas la même organisation.</h1>

            {#if submitted}
              <div class="submitted-chain" aria-label="Chaîne soumise">
                {#each ['purpose', 'facility', 'effect'] as link, index}
                  <div class:broken={link === mistakeLink}>
                    <span>{index + 1} · {linkTitle(link as LinkName)}</span>
                    <strong>{optionFor(link as LinkName, submitted[link as LinkName]).label}</strong>
                    {#if link === mistakeLink}<small>← lien à examiner</small>{/if}
                  </div>
                {/each}
              </div>
            {/if}

            <p
              class="specific-feedback"
              data-smoke-feedback="incorrect"
              data-smoke-feedback-detail="specific"
              role="status"
              aria-live="polite"
            >
              {currentScenario.feedback[mistakeLink]}
            </p>
            <button type="button" class="main-action" data-smoke-action="retry" onclick={retry}>
              Reprendre avec un indice <span aria-hidden="true">↺</span>
            </button>
          </section>
        {:else if phase === 'correct'}
          <div class="success-grid">
            <section
              class="feedback-page feedback-correct"
              tabindex="-1"
              use:focusOnMount
              data-smoke-state="correct"
              data-smoke-variation={currentScenario.id}
              aria-labelledby="correct-title"
            >
              <div class="feedback-signal"><span aria-hidden="true">✓</span> Chaîne cohérente</div>
              <p class="overline">Fonction → aménagement → effet</p>
              <h1 id="correct-title">Le croquis confirme les trois maillons.</h1>

              <div class="submitted-chain confirmed" aria-label="Chaîne correcte construite">
                {#each ['purpose', 'facility', 'effect'] as link, index}
                  <div>
                    <span>{index + 1} · {linkTitle(link as LinkName)}</span>
                    <strong>{optionFor(link as LinkName, 'correct').label}</strong>
                  </div>
                {/each}
              </div>

              <p
                class="specific-feedback"
                data-smoke-feedback="correct"
                data-smoke-feedback-detail="specific"
                role="status"
                aria-live="polite"
              >
                {currentScenario.correctFeedback}
              </p>
              <p class="impact-note"><span aria-hidden="true">◎</span><strong>Regard d’impact</strong>{currentScenario.impactNote}</p>
            </section>

            <aside
              class="continuation"
              data-smoke-state="continuation"
              data-smoke-variation={currentScenario.id}
              aria-label="Continuer l’atelier"
            >
              <span>{currentIndex + 1} / {scenarios.length}</span>
              <h2>{currentIndex === scenarios.length - 1 ? 'Les trois lieux sont construits.' : 'Changeons de relation spatiale.'}</h2>
              <p>Lis l’effet une dernière fois, puis choisis quand continuer.</p>
              <button type="button" class="main-action" data-smoke-action="continue" onclick={continueLoop}>
                {currentIndex === scenarios.length - 1 ? 'Voir la synthèse' : 'Ouvrir le lieu suivant'}
                <span aria-hidden="true">→</span>
              </button>
            </aside>
          </div>
        {:else}
          <section
            class="completion"
            tabindex="-1"
            use:focusOnMount
            data-smoke-state="complete"
            aria-labelledby="complete-title"
          >
            <p class="overline">Atelier parcouru · trois situations</p>
            <h1 id="complete-title">Un aménagement se lit par ses relations et ses effets.</h1>
            <p class="completion-lead">
              Tu as assemblé la même stratégie dans une place, un réseau de collecte et au bord d’un ruisseau. Cela ne signifie pas que tous les effets réels sont déjà connus.
            </p>

            <div class="completion-summary" data-smoke-completion>
              <span aria-hidden="true">1 → 2 → 3</span>
              <strong>La question à garder</strong>
              <p>« Quelle fonction ? Quel aménagement l’organise ? Qu’est-ce qui change vraiment dans l’espace ? »</p>
            </div>

            <ul class="case-recap">
              <li><span>Place</span><strong>organiser des zones tout en gardant un passage</strong></li>
              <li><span>Collecte</span><strong>relier des points dans un réseau d’approvisionnement</strong></li>
              <li><span>Ruisseau</span><strong>franchir une limite naturelle en un point repérable</strong></li>
            </ul>
            <p class="privacy-note">Aucune réponse n’a été enregistrée ni envoyée.</p>
          </section>
        {/if}
      </div>
    </div>
  </main>
</div>

<style>
  .prototype-root,
  .prototype-root * {
    box-sizing: border-box;
  }

  .prototype-root {
    --ink: #24223b;
    --muted: #625e70;
    --paper: #fffaf0;
    --ground: #ebe8df;
    --violet: #5947b8;
    --violet-dark: #352a78;
    --lime: #d9f26f;
    --coral: #e95f55;
    --sky: #b8e5e7;
    --line: #b9b4aa;
    width: 100%;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background-color: var(--ground);
    background-image:
      linear-gradient(rgba(36, 34, 59, 0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(36, 34, 59, 0.055) 1px, transparent 1px);
    background-size: 24px 24px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .atlas-page {
    width: min(1180px, 100%);
    min-height: calc(100vh - 42px);
    margin: 0 auto;
    padding: 0 clamp(14px, 3vw, 38px) 58px;
  }

  .topline {
    display: flex;
    min-height: 76px;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 2px solid var(--ink);
  }

  .brand {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    gap: 12px;
    color: inherit;
    text-decoration: none;
  }

  .brand > span:first-child {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--lime);
    font: 900 0.78rem ui-monospace, monospace;
  }

  .brand small,
  .brand strong {
    display: block;
  }

  .brand small {
    color: var(--muted);
    font-size: 0.64rem;
    font-weight: 850;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .brand strong {
    margin-top: 2px;
    font-size: 0.95rem;
  }

  .progress {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .progress span {
    color: var(--muted);
  }

  .progress strong {
    margin-left: 5px;
    font-family: ui-monospace, monospace;
  }

  h1,
  h2,
  p,
  strong,
  small,
  button {
    overflow-wrap: anywhere;
  }

  .intro {
    display: grid;
    min-height: min(760px, calc(100vh - 118px));
    grid-template-columns: minmax(0, 1.25fr) minmax(290px, 0.75fr);
    gap: clamp(34px, 7vw, 92px);
    align-items: center;
    padding: 54px 0;
  }

  .overline {
    margin: 0;
    color: var(--violet-dark);
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .intro h1,
  .scenario-heading h1,
  .feedback-page h1,
  .completion h1 {
    margin: 13px 0 18px;
    font-size: clamp(2.7rem, 7vw, 6.6rem);
    font-weight: 790;
    letter-spacing: -0.065em;
    line-height: 0.92;
  }

  .intro-lead {
    max-width: 690px;
    margin: 0 0 20px;
    font-size: clamp(1.06rem, 2vw, 1.26rem);
    line-height: 1.62;
  }

  .operation {
    max-width: 650px;
    margin: 0 0 28px;
    padding-left: 15px;
    border-left: 5px solid var(--coral);
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  kbd {
    padding: 2px 5px;
    border: 1px solid #8f8997;
    border-bottom-width: 2px;
    background: var(--paper);
    font: inherit;
  }

  button {
    min-height: 48px;
    border: 2px solid var(--ink);
    border-radius: 0;
    color: var(--ink);
    background: var(--paper);
    font: inherit;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    border-color: var(--violet);
  }

  button:focus-visible,
  a:focus-visible,
  [tabindex="-1"]:focus {
    outline: 4px solid var(--coral);
    outline-offset: 4px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.52;
  }

  .main-action {
    display: inline-flex;
    min-height: 54px;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 13px 18px;
    color: white;
    background: var(--violet-dark);
    box-shadow: 5px 5px 0 var(--ink);
    font-weight: 850;
  }

  .chain-manifest {
    padding: clamp(20px, 4vw, 34px);
    border: 2px solid var(--ink);
    background: var(--lime);
    box-shadow: 14px 14px 0 var(--violet-dark);
  }

  .chain-manifest > p:first-child {
    margin: 0 0 18px;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .chain-manifest ol {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .chain-manifest li {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 3px 12px;
    padding: 16px 0;
    border-top: 2px solid var(--ink);
  }

  .chain-manifest li span {
    grid-row: 1 / 3;
    font: 900 1.8rem ui-monospace, monospace;
  }

  .chain-manifest li strong {
    font-size: 1.12rem;
  }

  .chain-manifest li small {
    line-height: 1.4;
  }

  .manifest-note {
    margin: 16px 0 0;
    padding: 12px;
    color: white;
    background: var(--violet-dark);
    font-weight: 750;
    line-height: 1.45;
  }

  .workspace {
    padding-top: 38px;
  }

  .scenario-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
  }

  .scenario-heading h1 {
    max-width: 870px;
    margin-bottom: 24px;
    font-size: clamp(2.25rem, 5.4vw, 5.4rem);
  }

  .folio {
    color: #aca79f;
    font: 900 clamp(3.2rem, 9vw, 8rem) ui-monospace, monospace;
    line-height: 0.85;
  }

  .brief-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 2px solid var(--ink);
    background: var(--paper);
  }

  .brief-strip > div {
    min-width: 0;
    padding: 18px;
  }

  .brief-strip > div + div {
    border-left: 2px solid var(--ink);
    background: var(--sky);
  }

  .brief-strip span,
  .map-label span {
    display: block;
    margin-bottom: 6px;
    color: var(--violet-dark);
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .brief-strip p {
    margin: 0;
    line-height: 1.55;
  }

  .spatial-frame {
    grid-column: 1 / -1;
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    border-top: 2px solid var(--ink);
    color: var(--muted);
    background: #f3eee3;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .spatial-frame span {
    margin: 0;
    color: var(--coral);
    font-size: 1rem;
  }

  .scaffold {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 16px;
    margin: 18px 0 0;
    padding: 17px;
    border: 3px dashed var(--coral);
    background: #fff2cd;
  }

  .scaffold-index {
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--coral);
    color: white;
    font: 900 1.35rem ui-monospace, monospace;
  }

  .scaffold p,
  .scaffold strong,
  .scaffold small {
    display: block;
  }

  .scaffold p {
    margin: 0 0 5px;
    color: var(--coral);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .scaffold strong {
    line-height: 1.45;
  }

  .scaffold small {
    margin-top: 7px;
    color: var(--muted);
  }

  .construction-layout {
    display: grid;
    grid-template-columns: minmax(250px, 0.7fr) minmax(0, 1.3fr);
    gap: 18px;
    align-items: start;
    margin-top: 18px;
  }

  .map-panel {
    min-width: 0;
    padding: 18px;
    border: 2px solid var(--ink);
    background: #dcecef;
    box-shadow: 7px 7px 0 var(--ink);
  }

  .map-label strong {
    display: block;
    font-size: 1.15rem;
  }

  .map-canvas {
    min-height: 270px;
    margin: 18px 0 12px;
    padding: 14px;
    border: 2px solid var(--ink);
    background-color: var(--paper);
    background-image: radial-gradient(#8c8795 1px, transparent 1px);
    background-size: 12px 12px;
  }

  .map-groups {
    display: grid;
    min-height: 238px;
    grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
    align-content: center;
    gap: 9px;
  }

  .map-group {
    display: grid;
    min-width: 0;
    align-content: center;
    gap: 6px;
    padding: 8px;
    border: 1px dashed var(--line);
    background: rgba(255, 250, 240, .82);
  }

  .map-group > small {
    color: var(--violet-dark);
    font: 900 .62rem ui-monospace, monospace;
    letter-spacing: .07em;
    text-transform: uppercase;
  }

  .map-node {
    display: grid;
    min-width: 0;
    min-height: 54px;
    grid-template-columns: 28px minmax(0, 1fr);
    place-items: center start;
    gap: 9px;
    padding: 9px;
    border: 2px solid var(--ink);
    background: var(--paper);
  }

  .map-edge {
    justify-self: center;
    min-height: 28px;
    padding: 5px 9px;
    border: 1px solid var(--ink);
    color: var(--violet-dark);
    background: var(--lime);
    font: 900 0.68rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .map-node span {
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--violet-dark);
    font: 800 0.65rem ui-monospace, monospace;
  }

  .map-node strong {
    font-size: 0.78rem;
    line-height: 1.25;
  }

  .map-canvas.has-facility .map-node {
    border-width: 3px;
  }

  .map-observation {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 8px;
    margin: 0;
    padding: 12px;
    background: var(--ink);
    color: white;
    font-size: 0.84rem;
    line-height: 1.45;
  }

  .map-observation span {
    color: var(--lime);
    font-size: 1.1rem;
  }

  .map-help {
    margin: 10px 0 0;
    color: var(--muted);
    font-size: 0.72rem;
  }

  .builder {
    min-width: 0;
    padding: clamp(14px, 3vw, 24px);
    border: 2px solid var(--ink);
    background: var(--paper);
  }

  .assembled-chain {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 8px;
    align-items: stretch;
    margin-bottom: 22px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--ink);
  }

  .assembled-chain > div {
    min-width: 0;
    padding: 10px;
    background: #e6e1ff;
  }

  .assembled-chain > div.empty {
    border: 2px dashed var(--line);
    background: #f0ede5;
  }

  .assembled-chain span,
  .assembled-chain strong {
    display: block;
  }

  .assembled-chain span {
    margin-bottom: 5px;
    color: var(--violet-dark);
    font-size: 0.6rem;
    font-weight: 900;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .assembled-chain strong {
    font-size: 0.76rem;
    line-height: 1.35;
  }

  .assembled-chain > b {
    align-self: center;
    color: var(--coral);
  }

  .link-step {
    min-width: 0;
    margin: 0;
    padding: 18px 0;
    border: 0;
    border-top: 1px solid var(--line);
  }

  .link-step:first-of-type {
    border-top: 0;
  }

  .link-step legend {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    font-size: 1.02rem;
    font-weight: 900;
  }

  .link-step legend span {
    display: inline-grid;
    width: 30px;
    height: 30px;
    place-items: center;
    color: white;
    background: var(--violet-dark);
    font: 900 0.72rem ui-monospace, monospace;
  }

  .link-step > p {
    margin: 8px 0 12px;
    color: var(--muted);
    font-size: 0.82rem;
  }

  .option-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .option-grid button {
    display: grid;
    min-height: 142px;
    grid-template-columns: 34px minmax(0, 1fr);
    grid-template-rows: 1fr auto;
    gap: 8px 10px;
    align-items: start;
    padding: 12px;
    text-align: left;
  }

  .option-grid button.selected {
    border-width: 3px;
    background: #e9f5bd;
    box-shadow: inset 7px 0 0 var(--violet-dark);
  }

  .option-symbol {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--sky);
    font: 900 0.65rem ui-monospace, monospace;
  }

  .option-copy strong,
  .option-copy small {
    display: block;
  }

  .option-copy strong {
    font-size: 0.86rem;
    line-height: 1.35;
  }

  .option-copy small {
    margin-top: 5px;
    color: var(--muted);
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .selection-cue {
    grid-column: 1 / -1;
    color: var(--violet-dark);
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .submit-chain {
    width: 100%;
    margin-top: 7px;
  }

  .whole-chain-mode {
    display: grid;
    grid-template-columns: minmax(210px, 0.55fr) minmax(0, 1.45fr);
    gap: 18px;
    margin-top: 22px;
    padding: 18px;
    border: 2px dashed var(--violet-dark);
    background: #d9d4f4;
  }

  .whole-chain-mode h2 {
    margin: 8px 0;
    font-size: 1.35rem;
    line-height: 1.15;
  }

  .whole-chain-mode > div > p:last-child {
    margin: 0;
    color: var(--muted);
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .whole-chain-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .whole-chain-options button {
    display: grid;
    min-height: 230px;
    align-content: start;
    gap: 5px;
    padding: 12px;
    text-align: left;
  }

  .whole-chain-options button > span:not(.whole-label) {
    display: grid;
    gap: 2px;
    font-size: 0.73rem;
    line-height: 1.3;
  }

  .whole-chain-options button b {
    color: var(--violet-dark);
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .whole-chain-options button i {
    color: var(--coral);
    font-style: normal;
    font-weight: 900;
  }

  .whole-label {
    margin-bottom: 4px;
    padding-bottom: 7px;
    border-bottom: 1px solid var(--line);
    color: var(--violet-dark);
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .feedback-page {
    width: min(900px, 100%);
    margin: clamp(40px, 8vw, 92px) auto 0;
    padding: clamp(22px, 5vw, 48px);
    border: 2px solid var(--ink);
    background: var(--paper);
    box-shadow: 10px 10px 0 var(--ink);
  }

  .feedback-incorrect {
    border-top: 12px solid var(--coral);
  }

  .feedback-correct {
    width: 100%;
    margin: 0;
    border-top: 12px solid var(--violet);
  }

  .feedback-signal {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 20px;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .feedback-signal span {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--coral);
    color: white;
    font-size: 1.15rem;
  }

  .feedback-correct .feedback-signal span {
    background: var(--violet);
  }

  .feedback-page h1 {
    max-width: 760px;
    font-size: clamp(2.3rem, 6vw, 5.2rem);
  }

  .submitted-chain {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin: 26px 0;
  }

  .submitted-chain > div {
    min-width: 0;
    padding: 14px;
    border: 2px solid var(--ink);
    background: #ede9df;
  }

  .submitted-chain > div.broken {
    border: 4px dashed var(--coral);
    background: #ffe4d7;
  }

  .submitted-chain span,
  .submitted-chain strong,
  .submitted-chain small {
    display: block;
  }

  .submitted-chain span {
    margin-bottom: 7px;
    color: var(--violet-dark);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .submitted-chain strong {
    font-size: 0.82rem;
    line-height: 1.4;
  }

  .submitted-chain small {
    margin-top: 8px;
    color: #9e2f2b;
    font-weight: 850;
  }

  .submitted-chain.confirmed > div {
    background: #e9f5bd;
  }

  .specific-feedback {
    max-width: 800px;
    margin: 20px 0 26px;
    padding: 17px;
    border-left: 7px solid var(--coral);
    background: #fff0e8;
    font-size: 1rem;
    line-height: 1.62;
  }

  .feedback-correct .specific-feedback {
    border-left-color: var(--violet);
    background: #e8e5fa;
  }

  .impact-note {
    display: grid;
    grid-template-columns: 28px 140px 1fr;
    gap: 8px;
    margin: 0;
    padding: 14px;
    background: var(--sky);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .impact-note > span {
    font-size: 1.1rem;
  }

  .success-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 18px;
    margin-top: 48px;
  }

  .continuation {
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: stretch;
    padding: 22px;
    border: 2px solid var(--ink);
    background: var(--lime);
    box-shadow: 7px 7px 0 var(--violet-dark);
  }

  .continuation > span {
    font: 900 0.7rem ui-monospace, monospace;
  }

  .continuation h2 {
    margin: 34px 0 12px;
    font-size: 1.7rem;
    line-height: 1.08;
  }

  .continuation p {
    margin: 0 0 28px;
    color: #414050;
    line-height: 1.5;
  }

  .continuation .main-action {
    width: 100%;
    margin-top: auto;
  }

  .completion {
    width: min(920px, 100%);
    margin: clamp(40px, 8vw, 86px) auto 0;
    padding: clamp(24px, 6vw, 56px);
    border: 2px solid var(--ink);
    background: var(--paper);
    box-shadow: 12px 12px 0 var(--violet-dark);
  }

  .completion h1 {
    font-size: clamp(2.6rem, 7vw, 6rem);
  }

  .completion-lead {
    max-width: 760px;
    color: var(--muted);
    font-size: 1.06rem;
    line-height: 1.62;
  }

  .completion-summary {
    display: grid;
    grid-template-columns: 110px 180px 1fr;
    gap: 16px;
    align-items: center;
    margin: 28px 0;
    padding: 18px;
    border: 2px solid var(--ink);
    background: var(--lime);
  }

  .completion-summary > span {
    font: 900 1.15rem ui-monospace, monospace;
  }

  .completion-summary p {
    margin: 0;
    line-height: 1.45;
  }

  .case-recap {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    border-top: 2px solid var(--ink);
    list-style: none;
  }

  .case-recap li {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
  }

  .case-recap span {
    color: var(--violet-dark);
    font-weight: 900;
  }

  .privacy-note {
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 0.76rem;
  }

  @media (max-width: 820px) {
    .intro,
    .construction-layout,
    .whole-chain-mode,
    .success-grid {
      grid-template-columns: 1fr;
    }

    .intro {
      min-height: auto;
    }

    .chain-manifest {
      box-shadow: 8px 8px 0 var(--violet-dark);
    }

    .map-panel {
      box-shadow: 5px 5px 0 var(--ink);
    }

    .map-canvas {
      min-height: 190px;
    }

    .map-groups {
      min-height: 158px;
    }

    .continuation h2 {
      margin-top: 16px;
    }
  }

  @media (max-width: 560px) {
    .atlas-page {
      padding: 0 12px 38px;
    }

    .topline {
      min-height: 66px;
    }

    .brand > span:first-child {
      width: 44px;
      height: 44px;
    }

    .brand small {
      display: none;
    }

    .progress > span {
      display: none;
    }

    .intro {
      gap: 36px;
      padding: 34px 0;
    }

    .intro h1 {
      font-size: clamp(2.65rem, 14vw, 4.3rem);
    }

    .chain-manifest {
      padding: 17px;
    }

    .workspace {
      padding-top: 28px;
    }

    .scenario-heading {
      align-items: start;
    }

    .scenario-heading h1 {
      font-size: clamp(2.15rem, 12vw, 3.6rem);
    }

    .folio {
      font-size: 2.5rem;
    }

    .brief-strip,
    .option-grid,
    .whole-chain-options,
    .submitted-chain {
      grid-template-columns: 1fr;
    }

    .brief-strip > div + div {
      border-top: 2px solid var(--ink);
      border-left: 0;
    }

    .scaffold {
      grid-template-columns: 44px 1fr;
      padding: 12px;
    }

    .scaffold-index {
      width: 42px;
      height: 42px;
    }

    .map-panel,
    .builder,
    .whole-chain-mode {
      padding: 12px;
    }

    .map-canvas {
      padding: 9px;
    }

    .map-groups {
      min-height: 0;
      grid-template-columns: 1fr;
    }

    .assembled-chain {
      grid-template-columns: 1fr;
    }

    .assembled-chain > b {
      justify-self: center;
      transform: rotate(90deg);
    }

    .option-grid button {
      min-height: 124px;
    }

    .whole-chain-options button {
      min-height: 0;
    }

    .feedback-page,
    .completion {
      box-shadow: 5px 5px 0 var(--ink);
    }

    .feedback-page h1,
    .completion h1 {
      font-size: clamp(2.15rem, 12vw, 3.8rem);
    }

    .impact-note,
    .completion-summary,
    .case-recap li {
      grid-template-columns: 1fr;
    }

    .impact-note {
      gap: 4px;
    }

    .completion-summary {
      gap: 8px;
      margin: 20px 0;
      padding: 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after {
      scroll-behavior: auto !important;
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
</style>
