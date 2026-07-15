<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type AttemptKind = 'incorrect' | 'correct';
  type DocumentKind = 'sensor-sheet' | 'station-log' | 'route-slips';
  type ErrorFamily =
    | 'CADRE_TROP_LARGE'
    | 'CADRE_TROP_SERRE'
    | 'INFORMATION_HORS_CHAMP'
    | 'PASSEPORT_COHERENT';

  type ExtentOption = {
    id: string;
    label: string;
    description: string;
    rank: 1 | 2 | 3;
  };

  type InformationOption = {
    id: string;
    text: string;
  };

  type DocumentItem = {
    label: string;
    value: string;
    note: string;
  };

  type Variation = {
    id: string;
    number: string;
    documentKind: DocumentKind;
    documentName: string;
    context: string;
    receivedNote: string;
    documentItems: DocumentItem[];
    edgeLink: string;
    extentOptions: ExtentOption[];
    informationOptions: InformationOption[];
    correctExtentId: string;
    correctInformationId: string;
    plannedWrongExtentId: string;
    plannedWrongInformationId: string;
    tooLargeFeedback: string;
    tooTightFeedback: string;
    informationFeedback: string;
    scaffoldByFamily: Record<Exclude<ErrorFamily, 'PASSEPORT_COHERENT'>, string>;
    correctFeedback: string;
    compactCorrectFirst: boolean;
  };

  type ResponseRecord = {
    variationId: string;
    extentId: string;
    informationId: string;
    family: ErrorFamily;
    attemptNumber: number;
  };

  const variations: Variation[] = [
    {
      id: 'fiche-capteurs-jardin',
      number: '01',
      documentKind: 'sensor-sheet',
      documentName: 'Grille de quatre capteurs',
      context: 'Loisirs · jardin partagé fictif',
      receivedNote:
        'La première page a disparu. Les noms, les mesures et les bords visibles sont les seuls indices disponibles.',
      documentItems: [
        { label: 'Serre', value: '24 °C', note: 'à 17 h' },
        { label: 'Mare', value: '18 °C', note: 'à 17 h' },
        { label: 'Verger', value: '20 °C', note: 'à 17 h' },
        { label: 'Kiosque', value: '21 °C', note: 'à 17 h' }
      ],
      edgeLink:
        'Note en marge : capteurs livrés par un atelier régional. Cette provenance est citée, mais elle n’est pas mesurée.',
      extentOptions: [
        {
          id: 'jardin-partage',
          label: 'Un jardin partagé',
          description: 'Plusieurs zones réunies dans un même site.',
          rank: 1
        },
        {
          id: 'parc-communal',
          label: 'Un parc communal',
          description: 'Plusieurs jardins, chemins et espaces de loisirs.',
          rank: 2
        },
        {
          id: 'quartier',
          label: 'Un quartier',
          description: 'Plusieurs rues, bâtiments et sites reliés.',
          rank: 3
        }
      ],
      informationOptions: [
        {
          id: 'serre-plus-chaude',
          text: 'À 17 h, la serre est la zone relevée la plus chaude.'
        },
        {
          id: 'quartier-plus-chaud',
          text: 'Ce quartier est le plus chaud de toute la région.'
        },
        {
          id: 'moyenne-parc',
          text: 'La température moyenne de tout le parc est de 20 °C.'
        }
      ],
      correctExtentId: 'jardin-partage',
      correctInformationId: 'serre-plus-chaude',
      plannedWrongExtentId: 'quartier',
      plannedWrongInformationId: 'quartier-plus-chaud',
      tooLargeFeedback:
        'Le passeport agrandit le cadre jusqu’au quartier, mais le document ne montre ni rues ni autres sites. La mention de l’atelier régional indique seulement la provenance des capteurs.',
      tooTightFeedback:
        'Le cadre choisi ne contient pas toutes les zones nommées sur la grille. Il faut garder ensemble la serre, la mare, le verger et le kiosque.',
      informationFeedback:
        'Les quatre mesures permettent de comparer les zones du jardin à 17 h. Elles ne décrivent ni les autres sites, ni les rues, ni les températures de la région.',
      scaffoldByFamily: {
        CADRE_TROP_LARGE:
          'Pose un cache sur la note de provenance. Entoure seulement les zones qui possèdent une mesure : quel site les contient toutes sans ajouter de rues ?',
        CADRE_TROP_SERRE:
          'Vérifie qu’aucune des quatre zones mesurées ne reste hors de ton cadre.',
        INFORMATION_HORS_CHAMP:
          'Dans chaque phrase, souligne les mots que tu peux retrouver exactement dans la grille : un lieu, une heure et une mesure.'
      },
      correctFeedback:
        'Les quatre capteurs couvrent les zones d’un même jardin partagé. Dans ce cadre, les valeurs permettent bien d’établir que la serre est la zone relevée la plus chaude à 17 h.',
      compactCorrectFirst: false
    },
    {
      id: 'journal-casiers-parc',
      number: '02',
      documentKind: 'station-log',
      documentName: 'Journal de casiers de jeux à 16 h 30',
      context: 'Loisirs · échanges · parc fictif',
      receivedNote:
        'Le journal aligne des casiers proches, sans dessiner leur carte. Il faut retrouver l’espace couvert à partir de leurs relations.',
      documentItems: [
        { label: 'Ponton', value: '3 jeux', note: 'rive ouest' },
        { label: 'Grande pelouse', value: '8 jeux', note: 'centre du parc' },
        { label: 'Kiosque', value: '1 jeu', note: 'entrée nord' },
        { label: 'Terrain rouge', value: '5 jeux', note: 'sud du parc' }
      ],
      edgeLink:
        'Sortie du parc : une navette mène vers la gare régionale. Le journal ne compte pas les jeux disponibles à cette gare.',
      extentOptions: [
        {
          id: 'un-casier',
          label: 'Un seul casier',
          description: 'Un point de prêt et ses abords immédiats.',
          rank: 1
        },
        {
          id: 'parc-des-rives',
          label: 'Un parc de loisirs',
          description: 'Plusieurs zones, chemins et casiers proches.',
          rank: 2
        },
        {
          id: 'ville-entiere',
          label: 'Toute une ville',
          description: 'Plusieurs quartiers et leurs liaisons.',
          rank: 3
        }
      ],
      informationOptions: [
        {
          id: 'pelouse-maximum',
          text: 'À 16 h 30, le casier Grande pelouse a le plus de jeux parmi les quatre casiers relevés.'
        },
        {
          id: 'ponton-ville',
          text: 'Le casier Ponton est le plus utilisé de toute la ville.'
        },
        {
          id: 'gare-huit',
          text: 'La gare régionale possède exactement huit jeux.'
        }
      ],
      correctExtentId: 'parc-des-rives',
      correctInformationId: 'pelouse-maximum',
      plannedWrongExtentId: 'un-casier',
      plannedWrongInformationId: 'ponton-ville',
      tooLargeFeedback:
        'Le journal cite une navette vers la gare, mais il ne relève aucun autre quartier. Une liaison extérieure ne transforme pas quatre casiers du parc en document urbain.',
      tooTightFeedback:
        'Le passeport réduit le journal à un casier alors qu’il rassemble un ponton, une pelouse, un kiosque et un terrain : plusieurs zones du parc sont couvertes ensemble.',
      informationFeedback:
        'Le journal compare seulement quatre casiers à 16 h 30. Il ne donne ni l’usage total de la ville, ni le nombre de jeux de la gare.',
      scaffoldByFamily: {
        CADRE_TROP_LARGE:
          'Sépare les lieux comptés des lieux seulement indiqués par une flèche. Le cadre suit les quatre relevés du parc, pas toute destination citée.',
        CADRE_TROP_SERRE:
          'Compte les zones différentes qui ont chacune une valeur. Quel cadre peut contenir à la fois le ponton, la pelouse, le kiosque et le terrain ?',
        INFORMATION_HORS_CHAMP:
          'Garde la même heure et le même groupe de quatre casiers. Écarte toute phrase contenant « toute la ville » ou une valeur absente.'
      },
      correctFeedback:
        'Les quatre relevés appartiennent à plusieurs zones d’un même parc de loisirs. Parmi ce groupe précis et à la même heure, 8 est la valeur la plus haute : le casier Grande pelouse peut être identifié.',
      compactCorrectFirst: true
    },
    {
      id: 'bordereau-bibliobus-region',
      number: '03',
      documentKind: 'route-slips',
      documentName: 'Bordereau d’une tournée de bibliobus',
      context: 'Échanges · lecture itinérante fictive',
      receivedNote:
        'Quatre reçus ont été agrafés dans l’ordre de passage. Leur enchaînement remplace ici une carte conventionnelle.',
      documentItems: [
        { label: 'Dépôt des Livres', value: '07 h 30', note: 'départ de la tournée' },
        { label: 'Clairval', value: '08 h 10', note: 'commune 1' },
        { label: 'Roche-Basse', value: '08 h 45', note: 'commune 2' },
        { label: 'Mont-Fauve', value: '09 h 25', note: 'commune 3' }
      ],
      edgeLink:
        'Avant le dépôt : certains livres arrivent d’une ville plus lointaine. Le bordereau commence seulement au dépôt de la région proche.',
      extentOptions: [
        {
          id: 'un-arret',
          label: 'Un arrêt du bibliobus',
          description: 'Un point d’arrêt et ses abords immédiats.',
          rank: 1
        },
        {
          id: 'une-commune',
          label: 'Une commune',
          description: 'Un village ou une petite ville et ses lieux.',
          rank: 2
        },
        {
          id: 'region-proche',
          label: 'Une région proche',
          description: 'Plusieurs communes reliées par une tournée.',
          rank: 3
        }
      ],
      informationOptions: [
        {
          id: 'depot-trois-communes',
          text: 'La tournée relie le dépôt à Clairval, Roche-Basse et Mont-Fauve dans cet ordre.'
        },
        {
          id: 'rayon-clairval',
          text: 'Dans la bibliothèque de Clairval, les bandes dessinées sont près de l’entrée.'
        },
        {
          id: 'tous-pays',
          text: 'Les livres viennent de tous les pays voisins.'
        }
      ],
      correctExtentId: 'region-proche',
      correctInformationId: 'depot-trois-communes',
      plannedWrongExtentId: 'une-commune',
      plannedWrongInformationId: 'rayon-clairval',
      tooLargeFeedback:
        'Le document mentionne une arrivée extérieure, mais il ne suit pas tous les espaces lointains. Son itinéraire lisible commence au dépôt et s’arrête à Mont-Fauve.',
      tooTightFeedback:
        'Une commune ne contient pas à elle seule le dépôt, Clairval, Roche-Basse et Mont-Fauve. Le bordereau relie plusieurs communes dans le même trajet proche.',
      informationFeedback:
        'Le bordereau donne l’ordre des arrêts entre communes. Il ne montre pas l’intérieur d’une bibliothèque et ne nomme aucun pays d’origine.',
      scaffoldByFamily: {
        CADRE_TROP_LARGE:
          'Pose deux bornes au trajet : où commence le premier reçu et où finit le dernier ? Ne prolonge pas la chaîne au-delà.',
        CADRE_TROP_SERRE:
          'Suis les agrafes du premier au dernier reçu. Ton cadre doit contenir tous les noms de communes, pas seulement Clairval.',
        INFORMATION_HORS_CHAMP:
          'Cherche une phrase qui reprend les quatre étapes visibles sans inventer ce qui se passe à l’intérieur d’une bibliothèque ou avant le dépôt.'
      },
      correctFeedback:
        'Le dépôt et les trois communes forment une tournée à l’échelle d’une région proche. Les reçus soutiennent exactement l’ordre dépôt, Clairval, Roche-Basse, puis Mont-Fauve.',
      compactCorrectFirst: false
    }
  ];

  let phase: Phase = 'intro';
  let variationIndex = 0;
  let currentVariation = variations[0];
  let selectedExtentId: string | null = null;
  let selectedInformationId: string | null = null;
  let responsePath: ResponseRecord[] = [];
  let applicableFamily: ErrorFamily | null = null;
  let lastSubmitted: ResponseRecord | null = null;
  let formHint = '';
  let announcement = '';

  function legacyState(): 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' {
    if (phase === 'intro') return 'ready';
    if (phase === 'active' || phase === 'retry') return 'question';
    return phase;
  }

  function focusLater(id: string): void {
    setTimeout(() => document.getElementById(id)?.focus(), 0);
  }

  function resetChoices(): void {
    selectedExtentId = null;
    selectedInformationId = null;
    formHint = '';
  }

  function begin(): void {
    variationIndex = 0;
    currentVariation = variations[0];
    responsePath = [];
    applicableFamily = null;
    lastSubmitted = null;
    resetChoices();
    phase = 'active';
    announcement = 'Premier document ouvert. Choisis son étendue puis une information vérifiable.';
    focusLater('active-title');
  }

  function selectExtent(id: string): void {
    selectedExtentId = id;
    formHint = '';
    const extent = currentVariation.extentOptions.find((option) => option.id === id);
    announcement = `Étendue réglée sur : ${extent?.label ?? 'choix inconnu'}.`;
  }

  function selectInformation(id: string): void {
    selectedInformationId = id;
    formHint = '';
    announcement = 'Information placée dans le passeport. Tu peux encore la changer avant l’envoi.';
  }

  function extentFor(id: string | null): ExtentOption | undefined {
    return currentVariation.extentOptions.find((option) => option.id === id);
  }

  function informationFor(id: string | null): InformationOption | undefined {
    return currentVariation.informationOptions.find((option) => option.id === id);
  }

  function classify(extentId: string, informationId: string): ErrorFamily {
    const chosenExtent = extentFor(extentId);
    const expectedExtent = extentFor(currentVariation.correctExtentId);
    if (!chosenExtent || !expectedExtent) return 'INFORMATION_HORS_CHAMP';
    if (chosenExtent.rank > expectedExtent.rank) return 'CADRE_TROP_LARGE';
    if (chosenExtent.rank < expectedExtent.rank) return 'CADRE_TROP_SERRE';
    return informationId === currentVariation.correctInformationId
      ? 'PASSEPORT_COHERENT'
      : 'INFORMATION_HORS_CHAMP';
  }

  function commitPassport(): void {
    if (!selectedExtentId || !selectedInformationId) {
      formHint = !selectedExtentId && !selectedInformationId
        ? 'Choisis d’abord une étendue et une information.'
        : !selectedExtentId
          ? 'Choisis encore l’étendue couverte par le document.'
          : 'Choisis encore une information que le document permet de vérifier.';
      announcement = formHint;
      return;
    }

    const family = classify(selectedExtentId, selectedInformationId);
    const attemptNumber = responsePath.filter(
      (response) => response.variationId === currentVariation.id
    ).length + 1;
    const record: ResponseRecord = {
      variationId: currentVariation.id,
      extentId: selectedExtentId,
      informationId: selectedInformationId,
      family,
      attemptNumber
    };

    responsePath = [...responsePath, record];
    applicableFamily = family;
    lastSubmitted = record;

    if (family === 'PASSEPORT_COHERENT') {
      phase = 'correct';
      announcement = 'Passeport cohérent. Lis comment les bords et les informations concordent.';
      focusLater('correct-title');
    } else {
      phase = 'incorrect';
      announcement = 'Passeport à reprendre. La réponse reste visible avec un repère précis.';
      focusLater('incorrect-title');
    }
  }

  function submitCompactPassport(kind: AttemptKind): void {
    selectedExtentId = kind === 'correct'
      ? currentVariation.correctExtentId
      : currentVariation.plannedWrongExtentId;
    selectedInformationId = kind === 'correct'
      ? currentVariation.correctInformationId
      : currentVariation.plannedWrongInformationId;
    commitPassport();
  }

  function compactKinds(): AttemptKind[] {
    return currentVariation.compactCorrectFirst
      ? ['correct', 'incorrect']
      : ['incorrect', 'correct'];
  }

  function markerForExtent(id: string): AttemptKind | undefined {
    if (id === currentVariation.correctExtentId) return 'correct';
    if (id === currentVariation.plannedWrongExtentId) return 'incorrect';
    return undefined;
  }

  function markerForInformation(id: string): AttemptKind | undefined {
    if (id === currentVariation.correctInformationId) return 'correct';
    if (id === currentVariation.plannedWrongInformationId) return 'incorrect';
    return undefined;
  }

  function feedbackHeading(): string {
    if (applicableFamily === 'CADRE_TROP_LARGE') return 'Le cadre dépasse les lieux observés.';
    if (applicableFamily === 'CADRE_TROP_SERRE') return 'Des lieux restent hors du cadre.';
    return 'La phrase va plus loin que le document.';
  }

  function feedbackDetail(): string {
    if (applicableFamily === 'CADRE_TROP_LARGE') return currentVariation.tooLargeFeedback;
    if (applicableFamily === 'CADRE_TROP_SERRE') return currentVariation.tooTightFeedback;
    return currentVariation.informationFeedback;
  }

  function scaffoldText(): string {
    if (!applicableFamily || applicableFamily === 'PASSEPORT_COHERENT') {
      return 'Repère d’abord tous les lieux réellement couverts, puis vérifie chaque mot de l’information.';
    }
    return currentVariation.scaffoldByFamily[applicableFamily];
  }

  function retry(): void {
    resetChoices();
    phase = 'retry';
    announcement = `Reprise ouverte. ${scaffoldText()}`;
    focusLater('retry-title');
  }

  function continueDocuments(): void {
    if (variationIndex === variations.length - 1) {
      phase = 'complete';
      announcement = 'Les trois documents ont reçu un passeport. Le parcours est terminé.';
      focusLater('complete-title');
      return;
    }

    variationIndex += 1;
    currentVariation = variations[variationIndex];
    applicableFamily = null;
    lastSubmitted = null;
    resetChoices();
    phase = 'active';
    announcement = `Document ${variationIndex + 1} sur ${variations.length} ouvert.`;
    focusLater('active-title');
  }

  function submittedExtent(): ExtentOption | undefined {
    return extentFor(lastSubmitted?.extentId ?? null);
  }

  function submittedInformation(): InformationOption | undefined {
    return informationFor(lastSubmitted?.informationId ?? null);
  }
</script>

<svelte:head>
  <title>Le passeport des documents · EX-0314</title>
  <meta
    name="description"
    content="Étude de géographie sur l’étendue spatiale et la portée informative de documents inhabituels."
  />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0314"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState()}
>
<main
  class="prototype-root"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0314"
>
  <div class="lab-grid" aria-hidden="true"></div>

  {#if phase === 'intro'}
    <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
      <header class="lab-header">
        <div class="lab-mark" aria-hidden="true"><span>↔</span><b>□</b></div>
        <div><strong>Atelier du champ juste</strong><small>Documents sans couverture</small></div>
        <span class="serial">EX—0314</span>
      </header>

      <div class="intro-layout">
        <div class="intro-copy">
          <p class="eyebrow">Trois documents · deux réglages</p>
          <h1 id="intro-title">Donne à chaque document son <em>passeport spatial.</em></h1>
          <p class="lead">
            Une grille, un journal et des reçus ont perdu leur couverture. Examine ce qu’ils
            montrent réellement, puis compose un passeport en deux parties.
          </p>

          <ol class="method">
            <li><span>1</span><div><strong>Régler l’étendue</strong><p>L’espace compris entre les bords du document.</p></div></li>
            <li><span>2</span><div><strong>Viser une information</strong><p>Une phrase que les repères permettent vraiment de vérifier.</p></div></li>
          </ol>

          <p class="definition">
            <strong>Étendue</strong> ne veut pas dire « quantité de détails » : c’est la portion
            d’espace couverte. Un lieu cité en marge peut être relié au document sans être inclus.
          </p>

          <button class="primary" type="button" data-smoke-action="start" onclick={begin}>
            Ouvrir le document 01 <span aria-hidden="true">→</span>
          </button>
          <p class="control-note">Au clavier : Tab pour avancer, puis Entrée ou Espace pour choisir.</p>
        </div>

        <div class="intro-instrument" aria-hidden="true">
          <div class="viewfinder">
            <span class="corner top-left"></span><span class="corner top-right"></span>
            <span class="corner bottom-left"></span><span class="corner bottom-right"></span>
            <div class="nested-frame large"><div class="nested-frame medium"><div class="nested-frame small">DOC</div></div></div>
          </div>
          <div class="instrument-label"><span>CHAMP</span><i></i><span>INFORMATION</span></div>
          <div class="passport-stamp">À<br />CALIBRER</div>
        </div>
      </div>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="workspace-shell"
      data-smoke-state={phase}
      data-smoke-variation={currentVariation.id}
      aria-labelledby={phase === 'retry' ? 'retry-title' : 'active-title'}
    >
      <header class="lab-header workspace-header">
        <div class="lab-mark small" aria-hidden="true"><span>↔</span><b>□</b></div>
        <div><strong>Passeport des documents</strong><small>{currentVariation.context}</small></div>
        <div class="progress" aria-label={`Document ${variationIndex + 1} sur ${variations.length}`}>
          {#each variations as variation, index}
            <span class:past={index < variationIndex} class:current={index === variationIndex}>
              <span class="sr-only">{variation.documentName} : {index < variationIndex ? 'terminé' : index === variationIndex ? 'en cours' : 'à venir'}</span>
            </span>
          {/each}
          <b>{variationIndex + 1} / {variations.length}</b>
        </div>
      </header>

      {#if phase === 'retry'}
        <aside class="retry-panel" aria-labelledby="retry-title">
          <span class="retry-icon" aria-hidden="true">↺</span>
          <div>
            <p class="eyebrow">Nouvel examen</p>
            <h1 id="retry-title" tabindex="-1">Sépare les bords du document de ses simples renvois.</h1>
            <p>{scaffoldText()}</p>
          </div>
        </aside>

        {#if lastSubmitted}
          <div class="previous-passport" aria-label="Passeport précédent conservé">
            <span>Proposition précédente</span>
            <strong>{submittedExtent()?.label}</strong>
            <p>« {submittedInformation()?.text} »</p>
          </div>
        {/if}
      {:else}
        <div class="workspace-title">
          <div>
            <p class="eyebrow">Document {currentVariation.number} · sans titre d’origine</p>
            <h1 id="active-title" tabindex="-1">{currentVariation.documentName}</h1>
          </div>
          <p>{currentVariation.receivedNote}</p>
        </div>
      {/if}

      <div class="workbench">
        <article class="document-stage" aria-labelledby="document-title">
          <header>
            <span>PIÈCE {currentVariation.number}</span>
            <strong id="document-title">Contenu à examiner</strong>
            <b>COUVERTURE ABSENTE</b>
          </header>

          {#if currentVariation.documentKind === 'sensor-sheet'}
            <div class="sensor-document">
              <div class="door-line"><span>portillon ouest</span><i></i><b>jardin relevé</b></div>
              <div class="sensor-grid">
                {#each currentVariation.documentItems as item, index}
                  <div class:outside={index === 3}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.label}</strong>
                    <b>{item.value}</b>
                    <small>{item.note}</small>
                  </div>
                {/each}
              </div>
              <p class="document-caption">Même heure · quatre zones du même jardin</p>
            </div>
          {:else if currentVariation.documentKind === 'station-log'}
            <div class="log-document">
              <div class="log-time"><span>JOURNAL LOCAL</span><strong>16:30</strong></div>
              <div class="log-lines">
                {#each currentVariation.documentItems as item, index}
                  <div>
                    <span class="station-code">B{index + 1}</span>
                    <p><strong>{item.label}</strong><small>{item.note}</small></p>
                    <b>{item.value}</b>
                  </div>
                {/each}
              </div>
              <p class="document-caption">Trajets entre les quatre casiers : de 2 à 7 minutes</p>
            </div>
          {:else}
            <div class="slips-document">
              <div class="chain-label">ORDRE D’AGRAFAGE <span aria-hidden="true">→</span></div>
              <ol>
                {#each currentVariation.documentItems as item, index}
                  <li>
                    <span>{index + 1}</span>
                    <div><small>{item.note}</small><strong>{item.label}</strong></div>
                    <b>{item.value}</b>
                  </li>
                {/each}
              </ol>
              <p class="document-caption">Une seule tournée · quatre étapes conservées</p>
            </div>
          {/if}

          <aside class="edge-note">
            <span aria-hidden="true">↗</span>
            <p><strong>Renvoi au-delà du bord</strong>{currentVariation.edgeLink}</p>
          </aside>
        </article>

        <aside class="calibrator" aria-label="Composer le passeport du document">
          <div class="calibrator-head">
            <span>PASSEPORT {currentVariation.number}</span>
            <strong>Deux réglages avant l’envoi</strong>
          </div>

          <fieldset class="extent-control">
            <legend><span>1</span> Quelle étendue est réellement couverte&nbsp;?</legend>
            <div class="extent-options">
              {#each currentVariation.extentOptions as option}
                <button
                  type="button"
                  class:selected={selectedExtentId === option.id}
                  aria-pressed={selectedExtentId === option.id}
                  data-smoke-attempt={markerForExtent(option.id)}
                  data-smoke-step={markerForExtent(option.id) ? '1' : undefined}
                  onclick={() => selectExtent(option.id)}
                >
                  <span class="frame-symbol rank-{option.rank}" aria-hidden="true"><i></i></span>
                  <span><strong>{option.label}</strong><small>{option.description}</small></span>
                  <b>{selectedExtentId === option.id ? '✓ Cadre réglé' : 'Choisir'}</b>
                </button>
              {/each}
            </div>
          </fieldset>

          <fieldset class="information-control">
            <legend><span>2</span> Quelle information reste dans ce champ&nbsp;?</legend>
            <div class="information-options">
              {#each currentVariation.informationOptions as option, index}
                <button
                  type="button"
                  class:selected={selectedInformationId === option.id}
                  aria-pressed={selectedInformationId === option.id}
                  data-smoke-attempt={markerForInformation(option.id)}
                  data-smoke-step={markerForInformation(option.id) ? '2' : undefined}
                  onclick={() => selectInformation(option.id)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  <strong>{option.text}</strong>
                  <b>{selectedInformationId === option.id ? '✓ Retenue' : 'Examiner'}</b>
                </button>
              {/each}
            </div>
          </fieldset>

          <div class="passport-preview" aria-live="polite">
            <span>Passeport en préparation</span>
            <strong>{extentFor(selectedExtentId)?.label ?? 'Étendue à régler'}</strong>
            <p>{informationFor(selectedInformationId)?.text ?? 'Information à choisir'}</p>
          </div>

          {#if formHint}
            <p class="form-hint" role="status"><span aria-hidden="true">!</span>{formHint}</p>
          {/if}

          <button
            class="submit-passport"
            type="button"
            disabled={!selectedExtentId || !selectedInformationId}
            data-smoke-action="submit"
            onclick={commitPassport}
          >
            <span>Apposer le passeport</span>
            <small>étendue + information · envoi explicite</small>
            <b aria-hidden="true">↗</b>
          </button>
        </aside>
      </div>

      <fieldset class="compact-passports">
        <legend>Lecture groupée : compare deux passeports déjà assemblés</legend>
        <p>Cette voie combine les mêmes deux réglages. Apposer un passeport envoie les deux choix indiqués.</p>
        <div>
          {#each compactKinds() as kind, index}
            <button
              type="button"
              data-smoke-answer={kind}
              onclick={() => submitCompactPassport(kind)}
            >
              <span>Passeport {String.fromCharCode(65 + index)}</span>
              <strong>{extentFor(kind === 'correct' ? currentVariation.correctExtentId : currentVariation.plannedWrongExtentId)?.label}</strong>
              <small>« {informationFor(kind === 'correct' ? currentVariation.correctInformationId : currentVariation.plannedWrongInformationId)?.text} »</small>
              <b>Apposer cette proposition</b>
            </button>
          {/each}
        </div>
      </fieldset>
    </section>
  {:else if phase === 'incorrect'}
    <section
      class="feedback-screen incorrect-screen"
      data-smoke-state="incorrect"
      data-smoke-variation={currentVariation.id}
      aria-labelledby="incorrect-title"
    >
      <header class="feedback-header">
        <div class="lab-mark small" aria-hidden="true"><span>↺</span><b>□</b></div>
        <div><span>Passeport {currentVariation.number}</span><strong>Document à réexaminer</strong></div>
        <b class="outcome error"><span aria-hidden="true">↺</span> À ajuster</b>
      </header>

      <div class="feedback-layout">
        <article class="submitted-passport" aria-label="Passeport soumis">
          <div class="passport-notch" aria-hidden="true"></div>
          <p>PROPOSITION · ESSAI {lastSubmitted?.attemptNumber}</p>
          <span>Étendue envoyée</span>
          <h2>{submittedExtent()?.label}</h2>
          <span>Information envoyée</span>
          <blockquote>« {submittedInformation()?.text} »</blockquote>
          <small>La proposition reste visible pour la comparer au nouvel essai.</small>
        </article>

        <article class="feedback-copy" role="status">
          <p class="eyebrow">Ce que montre cette association</p>
          <h1 id="incorrect-title" tabindex="-1">{feedbackHeading()}</h1>
          <p class="feedback-detail" data-smoke-feedback="incorrect" data-smoke-feedback-detail>
            {feedbackDetail()}
          </p>

          <div class="two-checks">
            <div><span>Contrôle 1</span><strong>Tous les lieux, sans dépasser les bords</strong></div>
            <i aria-hidden="true">＋</i>
            <div><span>Contrôle 2</span><strong>Chaque mot prouvé par le document</strong></div>
          </div>

          <aside class="next-clue">
            <span aria-hidden="true">⌁</span>
            <p><strong>Repère pour reprendre</strong>{scaffoldText()}</p>
          </aside>

          <button class="primary" type="button" data-smoke-action="retry" onclick={retry}>
            Réexaminer le même document <span aria-hidden="true">→</span>
          </button>
        </article>
      </div>
    </section>
  {:else if phase === 'correct'}
    <section
      class="feedback-screen correct-screen"
      data-smoke-state="correct"
      data-smoke-variation={currentVariation.id}
      aria-labelledby="correct-title"
    >
      <header class="feedback-header">
        <div class="lab-mark small" aria-hidden="true"><span>✓</span><b>□</b></div>
        <div><span>Passeport {currentVariation.number}</span><strong>Cadre et information concordent</strong></div>
        <b class="outcome success"><span aria-hidden="true">✓</span> Champ juste</b>
      </header>

      <div class="correct-layout">
        <article class="approved-passport">
          <div class="approval" aria-hidden="true">CHAMP<br />JUSTE</div>
          <p>ÉTENDUE RETENUE</p>
          <h2>{submittedExtent()?.label}</h2>
          <p>INFORMATION VÉRIFIABLE</p>
          <blockquote>« {submittedInformation()?.text} »</blockquote>
        </article>

        <article class="feedback-copy" role="status">
          <p class="eyebrow">Pourquoi ce passeport tient</p>
          <h1 id="correct-title" tabindex="-1">Les bords et la phrase parlent du même espace.</h1>
          <p class="feedback-detail" data-smoke-feedback="correct" data-smoke-feedback-detail>
            {currentVariation.correctFeedback}
          </p>
          <div class="strategy-line">
            <span>Bords + repères</span><i aria-hidden="true">→</i><span>étendue</span><i aria-hidden="true">→</i><span>information possible</span>
          </div>
        </article>
      </div>
    </section>

    <section
      class="continuation"
      data-smoke-state="continuation"
      data-smoke-variation={currentVariation.id}
      aria-label="Suite après le retour correct"
    >
      <div>
        <span>{variationIndex + 1} / {variations.length}</span>
        <p>
          {variationIndex === variations.length - 1
            ? 'Les trois formes de document peuvent maintenant être comparées.'
            : 'Le prochain document change de forme et d’étendue.'}
        </p>
      </div>
      <button class="primary" type="button" data-smoke-action="continue" onclick={continueDocuments}>
        {variationIndex === variations.length - 1 ? 'Voir la synthèse' : 'Document suivant'}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  {:else}
    <section class="completion" data-smoke-state="complete" aria-labelledby="complete-title">
      <header class="lab-header">
        <div class="lab-mark" aria-hidden="true"><span>✓</span><b>□</b></div>
        <div><strong>Atelier du champ juste</strong><small>Série de documents terminée</small></div>
        <span class="serial">3 / 3</span>
      </header>

      <div class="completion-layout">
        <div class="completion-copy">
          <p class="eyebrow">Passeports apposés</p>
          <h1 id="complete-title" tabindex="-1">Trois formes, une stratégie en deux contrôles.</h1>
          <p class="lead" data-smoke-completion>
            Repère d’abord tous les lieux réellement couverts, sans agrandir le cadre à chaque
            renvoi lointain. Choisis ensuite seulement une information dont chaque mot peut être
            vérifié dans le document. Cette synthèse ne donne ni note ni verdict de maîtrise.
          </p>

          <div class="final-method">
            <div><span>01</span><strong>Où sont les bords&nbsp;?</strong><p>Le cadre contient tous les lieux observés, pas les simples provenances ou destinations.</p></div>
            <div><span>02</span><strong>Que peut-on affirmer&nbsp;?</strong><p>La phrase reste à l’intérieur de cette étendue et des informations présentes.</p></div>
          </div>

          <button class="secondary" type="button" onclick={begin}>Reprendre les trois documents</button>
          <p class="memory-note">Les chemins de réponse ont existé seulement pendant cette ouverture. Rien n’a été enregistré ni envoyé.</p>
        </div>

        <aside class="passport-stack" aria-label="Documents terminés">
          {#each variations as variation, index}
            <div style={`--turn: ${index - 1}deg`}>
              <span>0{index + 1}</span>
              <p><small>{variation.context}</small><strong>{variation.documentName}</strong></p>
              <b>✓ PASSEPORT</b>
            </div>
          {/each}
        </aside>
      </div>
    </section>
  {/if}

  <p class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
</main>
</div>

<style>
  .legacy-smoke-root {
    display: contents;
  }

  .prototype-root,
  .prototype-root * {
    box-sizing: border-box;
  }

  .prototype-root {
    --ink: #171525;
    --ink-soft: #58536c;
    --night: #191735;
    --violet: #4b2ea8;
    --violet-deep: #2b1a69;
    --acid: #d9f23f;
    --coral: #f16c5b;
    --sky: #72d6e5;
    --paper: #fffdf4;
    --paper-blue: #e9efff;
    --ground: #d9d8e8;
    --line: #aba8c2;
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: var(--ground);
    font-family: "Avenir Next", Avenir, "Segoe UI", system-ui, sans-serif;
    line-height: 1.45;
  }

  .lab-grid {
    position: fixed;
    inset: 42px 0 0;
    pointer-events: none;
    opacity: 0.33;
    background-image:
      linear-gradient(rgba(43, 26, 105, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(43, 26, 105, 0.12) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  button {
    min-height: 48px;
    color: inherit;
    font: inherit;
    touch-action: manipulation;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  button:focus-visible {
    outline: 4px solid var(--acid);
    outline-offset: 4px;
  }

  [tabindex="-1"]:focus {
    outline: 4px solid var(--ink);
    outline-offset: 4px;
  }

  h1,
  h2,
  p,
  blockquote,
  strong,
  small {
    overflow-wrap: anywhere;
  }

  .intro,
  .workspace-shell,
  .feedback-screen,
  .completion,
  .continuation {
    position: relative;
    z-index: 1;
    width: min(1220px, 100%);
    margin: 0 auto;
  }

  .intro,
  .workspace-shell,
  .feedback-screen,
  .completion {
    padding: 22px clamp(18px, 4vw, 52px) 64px;
  }

  .lab-header,
  .feedback-header {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 13px;
    padding-bottom: 14px;
    border-bottom: 2px solid var(--ink);
  }

  .lab-mark {
    position: relative;
    display: grid;
    width: 55px;
    height: 55px;
    flex: 0 0 auto;
    place-items: center;
    border: 2px solid var(--ink);
    color: var(--paper);
    background: var(--violet);
    box-shadow: 4px 4px 0 var(--ink);
  }

  .lab-mark span {
    position: absolute;
    top: 4px;
    left: 7px;
    color: var(--acid);
    font-size: 0.78rem;
    font-weight: 900;
  }

  .lab-mark b {
    font-size: 1.35rem;
  }

  .lab-mark.small {
    width: 43px;
    height: 43px;
    box-shadow: 3px 3px 0 var(--ink);
  }

  .lab-header > div:nth-child(2),
  .feedback-header > div:nth-child(2) {
    display: grid;
    min-width: 0;
  }

  .lab-header strong,
  .feedback-header strong {
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .lab-header small,
  .feedback-header span {
    color: var(--ink-soft);
    font-size: 0.68rem;
  }

  .serial {
    margin-left: auto;
    padding: 7px 10px;
    border: 1px solid var(--ink);
    background: rgba(255, 253, 244, 0.55);
    font: 850 0.7rem ui-monospace, monospace;
  }

  .intro-layout,
  .completion-layout {
    display: grid;
    min-height: calc(100vh - 145px);
    grid-template-columns: minmax(0, 1.1fr) minmax(330px, 0.75fr);
    align-items: center;
    gap: clamp(38px, 8vw, 110px);
    padding: 52px 0;
  }

  .eyebrow {
    margin: 0;
    color: var(--violet);
    font: 900 0.7rem ui-monospace, SFMono-Regular, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .intro-copy h1,
  .completion-copy h1,
  .feedback-copy h1 {
    max-width: 790px;
    margin: 15px 0 24px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(3.3rem, 7.2vw, 7rem);
    font-weight: 500;
    letter-spacing: -0.06em;
    line-height: 0.87;
  }

  .intro-copy h1 em {
    color: var(--violet);
    font-weight: 500;
  }

  .lead {
    max-width: 690px;
    margin: 0;
    color: var(--ink-soft);
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    line-height: 1.65;
  }

  .method {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 11px;
    margin: 29px 0 18px;
    padding: 0;
    list-style: none;
  }

  .method li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 11px;
    padding: 15px;
    border: 2px solid var(--ink);
    background: var(--paper);
    box-shadow: 5px 5px 0 var(--violet);
  }

  .method li > span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    color: var(--paper);
    background: var(--violet);
    font-weight: 900;
  }

  .method p {
    margin: 4px 0 0;
    color: var(--ink-soft);
    font-size: 0.79rem;
  }

  .definition {
    max-width: 710px;
    margin: 0 0 24px;
    padding: 13px 15px;
    border-left: 6px solid var(--coral);
    background: rgba(255, 253, 244, 0.72);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .primary,
  .secondary {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    padding: 13px 18px;
    border: 2px solid var(--ink);
    font-weight: 850;
  }

  .primary {
    color: var(--paper);
    background: var(--violet);
    box-shadow: 5px 5px 0 var(--acid);
  }

  .primary:hover {
    background: var(--violet-deep);
  }

  .secondary {
    background: var(--paper);
    box-shadow: 5px 5px 0 var(--sky);
  }

  .control-note,
  .memory-note {
    margin: 15px 0 0;
    color: var(--ink-soft);
    font-size: 0.75rem;
  }

  .intro-instrument {
    position: relative;
    min-height: 520px;
    border: 3px solid var(--ink);
    background: var(--night);
    box-shadow: 18px 20px 0 var(--violet);
    transform: rotate(1.2deg);
  }

  .viewfinder {
    position: absolute;
    inset: 42px;
    display: grid;
    place-items: center;
    border: 1px dashed var(--sky);
  }

  .corner {
    position: absolute;
    width: 38px;
    height: 38px;
    border-color: var(--acid);
    border-style: solid;
  }

  .top-left { top: -2px; left: -2px; border-width: 4px 0 0 4px; }
  .top-right { top: -2px; right: -2px; border-width: 4px 4px 0 0; }
  .bottom-left { bottom: -2px; left: -2px; border-width: 0 0 4px 4px; }
  .bottom-right { right: -2px; bottom: -2px; border-width: 0 4px 4px 0; }

  .nested-frame {
    display: grid;
    place-items: center;
    border: 2px solid var(--sky);
  }

  .nested-frame.large { width: 76%; height: 72%; }
  .nested-frame.medium { width: 70%; height: 68%; border-color: var(--coral); }
  .nested-frame.small {
    width: 62%;
    height: 58%;
    border-color: var(--acid);
    color: var(--acid);
    font: 900 1.1rem ui-monospace, monospace;
  }

  .instrument-label {
    position: absolute;
    right: 42px;
    bottom: 22px;
    left: 42px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    color: var(--paper);
    font: 850 0.65rem ui-monospace, monospace;
    letter-spacing: 0.08em;
  }

  .instrument-label i {
    border-top: 2px dotted var(--acid);
  }

  .passport-stamp {
    position: absolute;
    right: -17px;
    top: -17px;
    display: grid;
    width: 92px;
    height: 92px;
    place-items: center;
    border: 4px double var(--ink);
    border-radius: 50%;
    color: var(--ink);
    background: var(--acid);
    font: 900 0.68rem ui-monospace, monospace;
    line-height: 1.1;
    text-align: center;
    transform: rotate(8deg);
  }

  .workspace-shell {
    padding-top: 18px;
  }

  .workspace-header {
    margin-bottom: 25px;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-left: auto;
  }

  .progress > span {
    width: 20px;
    height: 9px;
    border: 1px solid var(--ink);
    background: transparent;
  }

  .progress > span.current {
    background: var(--acid);
    box-shadow: inset 0 0 0 2px var(--violet);
  }

  .progress > span.past {
    background: var(--violet);
  }

  .progress > b {
    margin-left: 4px;
    font: 850 0.68rem ui-monospace, monospace;
  }

  .workspace-title {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(270px, 0.6fr);
    gap: 30px;
    align-items: end;
    margin-bottom: 19px;
  }

  .workspace-title h1,
  .retry-panel h1 {
    margin: 8px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.35rem, 5vw, 4.9rem);
    font-weight: 500;
    letter-spacing: -0.05em;
    line-height: 0.95;
  }

  .workspace-title > p {
    margin: 0;
    padding: 13px 15px;
    border-left: 5px solid var(--coral);
    color: var(--ink-soft);
    background: rgba(255, 253, 244, 0.66);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .retry-panel {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px;
    margin-bottom: 16px;
    padding: 20px;
    border: 2px solid var(--ink);
    border-left: 9px solid var(--coral);
    background: var(--paper);
    box-shadow: 6px 6px 0 var(--coral);
  }

  .retry-icon {
    display: grid;
    width: 50px;
    height: 50px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    font-size: 1.45rem;
    font-weight: 900;
  }

  .retry-panel h1 {
    font-size: clamp(1.8rem, 4vw, 3.1rem);
  }

  .retry-panel p:last-child {
    max-width: 850px;
    margin: 11px 0 0;
    color: var(--ink-soft);
    line-height: 1.55;
  }

  .previous-passport {
    display: grid;
    grid-template-columns: auto auto minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
    padding: 13px 16px;
    border: 1px dashed var(--violet);
    background: var(--paper-blue);
  }

  .previous-passport > span {
    color: var(--violet);
    font: 850 0.66rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .previous-passport p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.8rem;
  }

  .workbench {
    display: grid;
    grid-template-columns: minmax(0, 0.96fr) minmax(380px, 1.04fr);
    gap: 17px;
    align-items: start;
  }

  .document-stage,
  .calibrator,
  .compact-passports,
  .submitted-passport,
  .approved-passport,
  .feedback-copy,
  .continuation,
  .final-method > div {
    border: 2px solid var(--ink);
    background: var(--paper);
  }

  .document-stage {
    min-width: 0;
    padding: clamp(16px, 3vw, 28px);
    box-shadow: 8px 9px 0 var(--violet);
  }

  .document-stage > header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 3px double var(--ink);
    font: 800 0.67rem ui-monospace, monospace;
  }

  .document-stage > header span,
  .document-stage > header b {
    padding: 5px 7px;
    color: var(--paper);
    background: var(--violet);
  }

  .document-stage > header b {
    color: var(--ink);
    background: var(--acid);
  }

  .sensor-document,
  .log-document,
  .slips-document {
    margin-top: 19px;
  }

  .door-line {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 9px;
    align-items: center;
    color: var(--ink-soft);
    font: 800 0.65rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .door-line i {
    border-top: 3px double var(--ink);
  }

  .sensor-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    grid-template-rows: 1fr 0.8fr;
    gap: 5px;
    min-height: 330px;
    margin-top: 12px;
    padding: 8px;
    border: 3px solid var(--ink);
    background: var(--night);
  }

  .sensor-grid > div {
    display: grid;
    min-width: 0;
    grid-template-columns: auto 1fr;
    align-content: center;
    gap: 4px 9px;
    padding: 13px;
    color: var(--ink);
    background: var(--paper-blue);
  }

  .sensor-grid > div.outside {
    background: #d6eff0;
  }

  .sensor-grid span,
  .sensor-grid small {
    color: var(--ink-soft);
    font: 750 0.63rem ui-monospace, monospace;
  }

  .sensor-grid strong,
  .sensor-grid b {
    grid-column: 1 / -1;
  }

  .sensor-grid b {
    color: var(--violet);
    font: 900 clamp(1.7rem, 4vw, 3rem) Georgia, serif;
  }

  .document-caption {
    margin: 10px 0 0;
    color: var(--ink-soft);
    font: 750 0.68rem ui-monospace, monospace;
    text-align: center;
    text-transform: uppercase;
  }

  .log-time {
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 13px;
    color: var(--paper);
    background: var(--night);
  }

  .log-time span {
    font: 800 0.68rem ui-monospace, monospace;
  }

  .log-time strong {
    color: var(--acid);
    font: 500 2.3rem Georgia, serif;
  }

  .log-lines {
    border-right: 2px solid var(--ink);
    border-left: 2px solid var(--ink);
  }

  .log-lines > div {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 71px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--ink);
    background: repeating-linear-gradient(-45deg, #fffdf4 0 10px, #f1f0fa 10px 20px);
  }

  .station-code {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 2px solid var(--violet);
    border-radius: 50%;
    color: var(--violet);
    font: 900 0.68rem ui-monospace, monospace;
  }

  .log-lines p {
    display: grid;
    margin: 0;
  }

  .log-lines small {
    color: var(--ink-soft);
    font-size: 0.68rem;
  }

  .log-lines > div > b {
    color: var(--violet);
    font-size: 0.86rem;
  }

  .chain-label {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
    color: var(--paper);
    background: var(--violet);
    font: 850 0.66rem ui-monospace, monospace;
  }

  .slips-document ol {
    display: grid;
    gap: 8px;
    margin: 9px 0 0;
    padding: 0;
    list-style: none;
  }

  .slips-document li {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 11px;
    align-items: center;
    min-height: 73px;
    padding: 10px 13px;
    border: 1px solid var(--ink);
    background: var(--paper-blue);
    box-shadow: 4px 4px 0 var(--line);
  }

  .slips-document li:not(:last-child)::after {
    position: absolute;
    right: 28px;
    bottom: -11px;
    z-index: 2;
    width: 3px;
    height: 13px;
    background: var(--coral);
    content: "";
  }

  .slips-document li > span {
    display: grid;
    width: 35px;
    height: 35px;
    place-items: center;
    color: var(--paper);
    background: var(--night);
    font-weight: 900;
  }

  .slips-document li > div {
    display: grid;
  }

  .slips-document small {
    color: var(--ink-soft);
    font-size: 0.64rem;
    text-transform: uppercase;
  }

  .slips-document li > b {
    color: var(--violet);
    font: 800 0.75rem ui-monospace, monospace;
  }

  .edge-note {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    margin-top: 18px;
    padding: 13px;
    border: 1px dashed var(--violet);
    background: #eff9d2;
  }

  .edge-note > span {
    color: var(--violet);
    font-size: 1.4rem;
    font-weight: 900;
  }

  .edge-note p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .edge-note strong {
    display: block;
    color: var(--ink);
  }

  .calibrator {
    min-width: 0;
    padding: clamp(16px, 3vw, 25px);
    border-top: 8px solid var(--violet);
  }

  .calibrator-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 13px;
    border-bottom: 1px solid var(--line);
  }

  .calibrator-head span {
    color: var(--violet);
    font: 900 0.68rem ui-monospace, monospace;
  }

  .calibrator-head strong {
    font-size: 0.78rem;
  }

  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .calibrator fieldset {
    margin-top: 19px;
  }

  legend {
    width: 100%;
    padding: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.08rem;
    font-weight: 700;
    line-height: 1.35;
  }

  legend > span {
    display: inline-grid;
    width: 30px;
    height: 30px;
    margin-right: 7px;
    place-items: center;
    color: var(--paper);
    background: var(--violet);
    font-family: ui-sans-serif, sans-serif;
    font-size: 0.74rem;
  }

  .extent-options,
  .information-options {
    display: grid;
    gap: 8px;
    margin-top: 10px;
  }

  .extent-options {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .extent-options button,
  .information-options button {
    min-width: 0;
    border: 2px solid var(--line);
    background: #fffef9;
    text-align: left;
  }

  .extent-options button {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-content: start;
    min-height: 154px;
    padding: 11px;
  }

  .extent-options button:hover,
  .information-options button:hover {
    border-color: var(--violet);
  }

  .extent-options button.selected,
  .information-options button.selected {
    border-color: var(--violet);
    background: var(--paper-blue);
    box-shadow: inset 0 -5px 0 var(--violet);
  }

  .frame-symbol {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--acid);
  }

  .frame-symbol i {
    display: block;
    border: 2px solid var(--violet);
  }

  .frame-symbol.rank-1 i { width: 10px; height: 10px; }
  .frame-symbol.rank-2 i { width: 19px; height: 19px; }
  .frame-symbol.rank-3 i { width: 28px; height: 28px; }

  .extent-options button > span:nth-child(2) {
    display: grid;
    align-content: start;
  }

  .extent-options small {
    margin-top: 4px;
    color: var(--ink-soft);
    font-size: 0.68rem;
    line-height: 1.35;
  }

  .extent-options button > b,
  .information-options button > b {
    grid-column: 1 / -1;
    align-self: end;
    color: var(--violet);
    font: 850 0.62rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .information-options {
    grid-template-columns: 1fr;
  }

  .information-options button {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 67px;
    padding: 10px 12px;
  }

  .information-options button > span {
    display: grid;
    width: 31px;
    height: 31px;
    place-items: center;
    color: var(--paper);
    background: var(--night);
    font: 850 0.68rem ui-monospace, monospace;
  }

  .information-options button > strong {
    font-size: 0.77rem;
    line-height: 1.35;
  }

  .information-options button > b {
    grid-column: auto;
    min-width: 58px;
    text-align: right;
  }

  .passport-preview {
    display: grid;
    gap: 4px;
    margin-top: 17px;
    padding: 12px 14px;
    border: 2px dashed var(--violet);
    background: #eff9d2;
  }

  .passport-preview > span {
    color: var(--violet);
    font: 900 0.62rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .passport-preview p {
    margin: 2px 0 0;
    color: var(--ink-soft);
    font-size: 0.76rem;
    line-height: 1.4;
  }

  .form-hint {
    display: flex;
    gap: 8px;
    margin: 11px 0 0;
    padding: 10px;
    border-left: 5px solid var(--coral);
    background: #ffe5de;
    font-size: 0.78rem;
  }

  .submit-passport {
    display: grid;
    width: 100%;
    min-height: 66px;
    grid-template-columns: 1fr auto;
    gap: 1px 12px;
    align-items: center;
    margin-top: 13px;
    padding: 11px 15px;
    border: 2px solid var(--ink);
    color: var(--paper);
    background: var(--violet);
    box-shadow: 5px 5px 0 var(--acid);
    text-align: left;
  }

  .submit-passport span {
    font-weight: 900;
  }

  .submit-passport small {
    color: #dbd4ff;
    font-size: 0.65rem;
  }

  .submit-passport b {
    grid-row: 1 / 3;
    grid-column: 2;
    color: var(--acid);
    font-size: 1.3rem;
  }

  .compact-passports {
    margin-top: 18px;
    padding: 17px;
    background: var(--night);
    box-shadow: 7px 7px 0 var(--sky);
  }

  .compact-passports legend {
    width: auto;
    padding: 0 7px;
    color: var(--paper);
    background: var(--night);
    font-family: ui-sans-serif, sans-serif;
    font-size: 0.85rem;
  }

  .compact-passports > p {
    margin: 0 0 12px;
    color: #cbc8df;
    font-size: 0.74rem;
  }

  .compact-passports > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .compact-passports button {
    display: grid;
    min-width: 0;
    min-height: 119px;
    grid-template-columns: auto 1fr;
    gap: 4px 10px;
    align-content: start;
    padding: 12px;
    border: 2px solid #777397;
    background: var(--paper);
    text-align: left;
  }

  .compact-passports button:hover {
    border-color: var(--acid);
  }

  .compact-passports button > span {
    grid-row: 1 / 4;
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    color: var(--paper);
    background: var(--violet);
    font: 850 0.64rem ui-monospace, monospace;
  }

  .compact-passports button > small {
    color: var(--ink-soft);
    font-size: 0.7rem;
    line-height: 1.35;
  }

  .compact-passports button > b {
    margin-top: 4px;
    color: var(--violet);
    font-size: 0.68rem;
  }

  .feedback-screen {
    padding-top: 20px;
  }

  .feedback-header {
    margin-bottom: 32px;
  }

  .outcome {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-left: auto;
    padding: 8px 10px;
    border: 2px solid var(--ink);
    font-size: 0.68rem;
    text-transform: uppercase;
  }

  .outcome.error { background: #ffd9d1; }
  .outcome.success { background: var(--acid); }

  .feedback-layout,
  .correct-layout {
    display: grid;
    grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);
    gap: 20px;
    align-items: start;
  }

  .submitted-passport,
  .approved-passport {
    position: relative;
    min-width: 0;
    padding: clamp(20px, 4vw, 34px);
    box-shadow: 8px 9px 0 var(--violet);
  }

  .submitted-passport > p,
  .approved-passport > p {
    margin: 0 0 10px;
    color: var(--violet);
    font: 900 0.66rem ui-monospace, monospace;
    letter-spacing: 0.08em;
  }

  .submitted-passport > span {
    display: block;
    margin-top: 19px;
    color: var(--ink-soft);
    font-size: 0.67rem;
    font-weight: 850;
    text-transform: uppercase;
  }

  .submitted-passport h2,
  .approved-passport h2 {
    margin: 5px 0 0;
    font-family: Georgia, serif;
    font-size: clamp(2rem, 4vw, 3.7rem);
    font-weight: 500;
    letter-spacing: -0.04em;
  }

  blockquote {
    margin: 8px 0 0;
    padding: 13px;
    border-left: 6px solid var(--coral);
    background: #f2efff;
    font-family: Georgia, serif;
    line-height: 1.5;
  }

  .submitted-passport > small {
    display: block;
    margin-top: 18px;
    color: var(--ink-soft);
    line-height: 1.45;
  }

  .passport-notch {
    position: absolute;
    top: -2px;
    right: 44px;
    width: 42px;
    height: 17px;
    border-right: 2px solid var(--ink);
    border-bottom: 2px solid var(--ink);
    border-left: 2px solid var(--ink);
    background: var(--ground);
  }

  .feedback-copy {
    min-width: 0;
    padding: clamp(22px, 4vw, 42px);
    border-top: 8px solid var(--coral);
  }

  .correct-screen .feedback-copy {
    border-top-color: var(--acid);
  }

  .feedback-copy h1 {
    font-size: clamp(2.55rem, 6vw, 5.8rem);
  }

  .feedback-detail {
    max-width: 850px;
    margin: 0;
    color: var(--ink-soft);
    font-size: 1rem;
    line-height: 1.65;
  }

  .two-checks {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 10px;
    align-items: center;
    margin-top: 23px;
  }

  .two-checks > div {
    min-height: 91px;
    padding: 12px;
    border: 1px solid var(--line);
    background: var(--paper-blue);
  }

  .two-checks span {
    display: block;
    color: var(--violet);
    font: 850 0.62rem ui-monospace, monospace;
    text-transform: uppercase;
  }

  .two-checks strong {
    display: block;
    margin-top: 5px;
    font-size: 0.78rem;
    line-height: 1.35;
  }

  .next-clue {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 11px;
    margin: 18px 0;
    padding: 13px;
    border-left: 7px solid var(--coral);
    background: #ffe5de;
  }

  .next-clue > span {
    font-size: 1.6rem;
  }

  .next-clue p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.81rem;
    line-height: 1.5;
  }

  .next-clue strong {
    display: block;
    color: var(--ink);
  }

  .approved-passport {
    overflow: hidden;
    border-top: 8px solid var(--acid);
  }

  .approved-passport blockquote {
    border-left-color: var(--violet);
    background: #eff9d2;
  }

  .approval {
    position: absolute;
    right: -13px;
    top: 12px;
    display: grid;
    width: 83px;
    height: 83px;
    place-items: center;
    border: 4px double var(--violet);
    border-radius: 50%;
    color: var(--violet);
    font: 900 0.62rem ui-monospace, monospace;
    line-height: 1.1;
    text-align: center;
    transform: rotate(8deg);
  }

  .strategy-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 13px;
    border: 1px solid var(--line);
    background: var(--night);
  }

  .strategy-line span {
    padding: 7px 9px;
    color: var(--ink);
    background: var(--acid);
    font-size: 0.69rem;
    font-weight: 900;
  }

  .strategy-line i {
    color: var(--paper);
  }

  .continuation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 17px;
    margin-bottom: 60px;
    padding: 18px 22px;
    border-left: 8px solid var(--sky);
  }

  .continuation > div {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .continuation > div > span {
    display: grid;
    width: 48px;
    height: 48px;
    flex: 0 0 auto;
    place-items: center;
    color: var(--paper);
    background: var(--night);
    font: 850 0.7rem ui-monospace, monospace;
  }

  .continuation p {
    max-width: 590px;
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.82rem;
  }

  .completion-copy h1 {
    font-size: clamp(3rem, 6.5vw, 6.4rem);
  }

  .final-method {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 11px;
    margin: 27px 0;
  }

  .final-method > div {
    min-width: 0;
    padding: 15px;
    box-shadow: 5px 5px 0 var(--violet);
  }

  .final-method span {
    color: var(--violet);
    font: 900 0.65rem ui-monospace, monospace;
  }

  .final-method strong {
    display: block;
    margin-top: 4px;
  }

  .final-method p {
    margin: 7px 0 0;
    color: var(--ink-soft);
    font-size: 0.76rem;
    line-height: 1.45;
  }

  .passport-stack {
    display: grid;
    gap: 14px;
    padding: 35px;
    border: 3px solid var(--ink);
    background: var(--night);
    box-shadow: 15px 17px 0 var(--violet);
  }

  .passport-stack > div {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
    min-height: 104px;
    padding: 14px;
    border: 2px solid var(--ink);
    background: var(--paper);
    transform: rotate(var(--turn));
  }

  .passport-stack > div > span {
    color: var(--violet);
    font: 500 2.1rem Georgia, serif;
  }

  .passport-stack p {
    display: grid;
    margin: 0;
  }

  .passport-stack small {
    color: var(--ink-soft);
    font-size: 0.62rem;
  }

  .passport-stack > div > b {
    padding: 7px;
    border: 2px solid var(--violet);
    color: var(--violet);
    font: 900 0.58rem ui-monospace, monospace;
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
    .intro-layout,
    .completion-layout,
    .workbench,
    .feedback-layout,
    .correct-layout {
      grid-template-columns: 1fr;
    }

    .intro-layout,
    .completion-layout {
      min-height: auto;
    }

    .intro-instrument {
      min-height: 400px;
    }

    .document-stage {
      order: 0;
    }

    .calibrator {
      order: 1;
    }
  }

  @media (max-width: 620px) {
    .intro,
    .workspace-shell,
    .feedback-screen,
    .completion {
      padding: 14px 12px 44px;
    }

    .lab-grid {
      background-size: 18px 18px;
    }

    .lab-header,
    .feedback-header {
      align-items: flex-start;
    }

    .serial,
    .outcome {
      margin-left: auto;
    }

    .intro-layout,
    .completion-layout {
      gap: 35px;
      padding: 38px 0;
    }

    .intro-copy h1,
    .completion-copy h1 {
      font-size: clamp(2.75rem, 15vw, 4.2rem);
    }

    .method,
    .final-method,
    .extent-options,
    .compact-passports > div {
      grid-template-columns: 1fr;
    }

    .intro-instrument {
      min-height: 330px;
      box-shadow: 9px 10px 0 var(--violet);
    }

    .viewfinder {
      inset: 29px;
    }

    .workspace-title {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .workspace-title h1 {
      font-size: 2.6rem;
    }

    .previous-passport {
      grid-template-columns: 1fr;
    }

    .document-stage > header {
      grid-template-columns: 1fr auto;
    }

    .document-stage > header strong {
      grid-row: 2;
      grid-column: 1 / -1;
    }

    .sensor-grid {
      min-height: 300px;
    }

    .extent-options button {
      min-height: 102px;
    }

    .information-options button {
      grid-template-columns: auto 1fr;
    }

    .information-options button > b {
      grid-column: 2;
      text-align: left;
    }

    .compact-passports {
      box-shadow: 5px 5px 0 var(--sky);
    }

    .compact-passports button {
      min-height: 124px;
    }

    .feedback-header {
      display: grid;
      grid-template-columns: auto 1fr;
    }

    .outcome {
      grid-column: 1 / -1;
      justify-self: start;
      margin-left: 0;
    }

    .feedback-copy,
    .submitted-passport,
    .approved-passport {
      padding: 20px 15px;
    }

    .feedback-copy h1 {
      font-size: 2.55rem;
    }

    .two-checks {
      grid-template-columns: 1fr;
    }

    .two-checks > i {
      display: none;
    }

    .continuation {
      align-items: stretch;
      flex-direction: column;
      margin-right: 12px;
      margin-left: 12px;
    }

    .continuation .primary,
    .feedback-copy .primary,
    .intro-copy .primary,
    .secondary {
      width: 100%;
    }

    .passport-stack {
      padding: 18px 12px;
      box-shadow: 8px 9px 0 var(--violet);
    }

    .passport-stack > div {
      grid-template-columns: auto 1fr;
    }

    .passport-stack > div > b {
      grid-column: 2;
      justify-self: start;
    }
  }

  @media (max-width: 360px) {
    .lab-header strong {
      font-size: 0.73rem;
    }

    .lab-header small {
      font-size: 0.59rem;
    }

    .progress > span {
      width: 13px;
    }

    .sensor-grid {
      grid-template-columns: 1fr;
      grid-template-rows: none;
    }

    .sensor-grid > div {
      min-height: 95px;
    }

    .log-lines > div {
      grid-template-columns: auto 1fr;
    }

    .log-lines > div > b {
      grid-column: 2;
    }

    .slips-document li {
      grid-template-columns: auto 1fr;
    }

    .slips-document li > b {
      grid-column: 2;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after {
      animation: none !important;
      scroll-behavior: auto !important;
      transition: none !important;
      transform: none !important;
    }
  }
</style>
