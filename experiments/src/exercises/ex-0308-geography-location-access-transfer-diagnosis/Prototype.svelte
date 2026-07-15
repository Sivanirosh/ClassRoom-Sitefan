<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type BarrierKind = 'river' | 'boundary' | 'schedule';
  type RouteStatus = 'OUVERT' | 'FERMÉ' | 'LIMITÉ';
  type NonSuccessCode =
    | 'ACCES_BLOQUE'
    | 'LIMITE_IGNOREE'
    | 'PROXIMITE_SEULE'
    | 'PREUVES_DECALEES';
  type DiagnosticCode = NonSuccessCode | 'APPUI_CONVERGENT';
  type AttemptKind = 'incorrect' | 'correct';

  type Candidate = {
    id: string;
    marker: string;
    name: string;
    site: string;
    situation: string;
    access: string;
    diagnostic: NonSuccessCode | null;
    x: number;
    y: number;
  };

  type EvidenceCard = {
    id: string;
    source: string;
    text: string;
  };

  type RouteEntry = {
    symbol: string;
    name: string;
    status: RouteStatus;
    detail: string;
  };

  type Variation = {
    id: string;
    fileNumber: string;
    place: string;
    theme: string;
    mission: string;
    origin: string;
    serviceTime: string;
    mapAlt: string;
    barrierKind: BarrierKind;
    barrierTitle: string;
    barrierDetail: string;
    routes: RouteEntry[];
    candidates: Candidate[];
    evidence: EvidenceCard[];
    correctSite: string;
    correctEvidence: [string, string];
    smokeWrongSite: string;
    smokeWrongEvidence: [string, string];
    scaffoldByCode: Record<NonSuccessCode, string>;
    correctExplanation: string;
  };

  type ResponseRecord = {
    variationId: string;
    siteId: string;
    evidenceIds: string[];
    code: DiagnosticCode;
    attempt: number;
  };

  const variations: Variation[] = [
    {
      id: 'rive-claire',
      fileNumber: 'RC—17',
      place: 'Rive-Claire',
      theme: 'Approvisionnement · Échanges',
      mission: 'Installer pendant deux jours un relais alimentaire réfrigéré.',
      origin: 'La camionnette part du dépôt régional, à 12 km à l’ouest.',
      serviceTime: 'Livraison à 8 h · accueil de 10 h à 17 h',
      mapAlt: 'Schéma de Rive-Claire : le pont du Saule est fermé. La halte des Vergers reste reliée au dépôt et aux deux secteurs habités.',
      barrierKind: 'river',
      barrierTitle: 'Pont du Saule fermé',
      barrierDetail: 'Aucun véhicule ni piéton ne peut le franchir pendant les deux jours.',
      routes: [
        {
          symbol: 'R7',
          name: 'Route 7 · dépôt ↔ Vergers',
          status: 'OUVERT',
          detail: 'Camionnettes autorisées toute la journée.'
        },
        {
          symbol: '×',
          name: 'Pont du Saule · dépôt ↔ Bac',
          status: 'FERMÉ',
          detail: 'Travaux sur toute la largeur.'
        },
        {
          symbol: '14%',
          name: 'Voie du Belvédère',
          status: 'LIMITÉ',
          detail: 'Pente interdite aux camionnettes.'
        }
      ],
      candidates: [
        {
          id: 'bac',
          marker: 'A',
          name: 'Place du Bac',
          site: 'Dalle plane de 18 × 20 m, sur la rive nord.',
          situation: '46 logements se trouvent à quatre minutes à pied.',
          access: 'Le seul trajet depuis le dépôt traverse le pont fermé.',
          diagnostic: 'ACCES_BLOQUE',
          x: 462,
          y: 89
        },
        {
          id: 'vergers',
          marker: 'B',
          name: 'Halte des Vergers',
          site: 'Terrain plat au croisement de la route 7 et de deux sentiers.',
          situation: 'Entre les secteurs habités des deux rives.',
          access: 'La route du dépôt et les deux sentiers restent ouverts.',
          diagnostic: null,
          x: 275,
          y: 216
        },
        {
          id: 'belvedere',
          marker: 'C',
          name: 'Pré du Belvédère',
          site: 'Pré dégagé au-dessus du secteur sud.',
          situation: 'Proche des habitations du sud seulement.',
          access: 'Au bout d’une voie à 14 %, interdite aux camionnettes.',
          diagnostic: 'PROXIMITE_SEULE',
          x: 515,
          y: 256
        }
      ],
      evidence: [
        {
          id: 'rc-near',
          source: 'Recensement local',
          text: '46 logements sont à quatre minutes de la place du Bac.'
        },
        {
          id: 'rc-slab',
          source: 'Fiche du terrain',
          text: 'La dalle du Bac mesure 18 × 20 m et elle est plane.'
        },
        {
          id: 'rc-route',
          source: 'Registre des routes',
          text: 'La route 7 relie le dépôt à la halte des Vergers et reste ouverte.'
        },
        {
          id: 'rc-paths',
          source: 'Croquis des accès',
          text: 'Deux sentiers habités atteignent la halte sans passer par le pont.'
        },
        {
          id: 'rc-view',
          source: 'Photo du site',
          text: 'Le pré du Belvédère est visible depuis les deux rives.'
        }
      ],
      correctSite: 'vergers',
      correctEvidence: ['rc-route', 'rc-paths'],
      smokeWrongSite: 'bac',
      smokeWrongEvidence: ['rc-near', 'rc-slab'],
      scaffoldByCode: {
        ACCES_BLOQUE: 'Pars du dépôt. Suis la route jusqu’au site et arrête-toi dès qu’un symbole × coupe le trajet.',
        LIMITE_IGNOREE: 'Repère d’abord la limite qui interdit ou sépare, puis vérifie de quel côté se trouve chaque site.',
        PROXIMITE_SEULE: 'La proximité d’un secteur ne suffit pas. Vérifie aussi l’arrivée de la camionnette et l’accès depuis l’autre rive.',
        PREUVES_DECALEES: 'Pour chaque fait, termine la phrase : « Ce fait soutient ce site parce que… » Les deux phrases doivent parler du même lieu.'
      },
      correctExplanation: 'La route 7 permet à la camionnette d’arriver depuis le dépôt. Les deux sentiers permettent aux habitants des deux secteurs d’atteindre la halte sans franchir le pont fermé.'
    },
    {
      id: 'mont-fauve',
      fileNumber: 'MF—08',
      place: 'Mont-Fauve',
      theme: 'Loisirs · Habitat',
      mission: 'Placer un comptoir de prêt de jeux pendant les travaux du gymnase.',
      origin: 'Le matériel arrive par la ligne de bus depuis le centre régional.',
      serviceTime: 'Mercredi · permanence de 13 h à 18 h',
      mapAlt: 'Schéma de Mont-Fauve : le parking du Col est hors du périmètre communal, la cour de l’école est fermée et le kiosque du Mail reste accessible.',
      barrierKind: 'boundary',
      barrierTitle: 'Périmètre du service',
      barrierDetail: 'L’autorisation couvre uniquement le côté communal de la ligne pointillée.',
      routes: [
        {
          symbol: 'B4',
          name: 'Ligne de bus · centre ↔ Mail',
          status: 'OUVERT',
          detail: 'Arrêts à 13 h 10, 15 h 10 et 17 h 10.'
        },
        {
          symbol: '×',
          name: 'Portail de la cour',
          status: 'FERMÉ',
          detail: 'Travaux de 12 h à 19 h.'
        },
        {
          symbol: '···',
          name: 'Limite communale · vers le Col',
          status: 'LIMITÉ',
          detail: 'Le comptoir doit rester du côté du Mail.'
        }
      ],
      candidates: [
        {
          id: 'ecole',
          marker: 'A',
          name: 'Cour de l’École',
          site: 'Cour plane et clôturée au centre du bourg.',
          situation: 'À côté des habitations et de l’ancien gymnase.',
          access: 'Le portail est fermé pendant toute la permanence.',
          diagnostic: 'ACCES_BLOQUE',
          x: 173,
          y: 105
        },
        {
          id: 'mail',
          marker: 'B',
          name: 'Kiosque du Mail',
          site: 'Abri couvert sur une place sans marche.',
          situation: 'Dans le périmètre, entre les quartiers Haut et Bas.',
          access: 'La ligne B4 et deux rampes restent ouvertes de 13 h à 18 h.',
          diagnostic: null,
          x: 323,
          y: 211
        },
        {
          id: 'col',
          marker: 'C',
          name: 'Parking du Col',
          site: 'Plateforme de 38 places au bord de la route régionale.',
          situation: 'Au-delà de la limite communale autorisée.',
          access: 'Accessible par la route, mais hors du périmètre du service.',
          diagnostic: 'LIMITE_IGNOREE',
          x: 516,
          y: 102
        }
      ],
      evidence: [
        {
          id: 'mf-spaces',
          source: 'Plan du parking',
          text: 'Le parking du Col compte 38 places libres ce mercredi.'
        },
        {
          id: 'mf-sign',
          source: 'Photo de route',
          text: 'Le panneau du Col est visible depuis la route régionale.'
        },
        {
          id: 'mf-inside',
          source: 'Arrêté communal',
          text: 'Le kiosque du Mail se trouve du côté autorisé de la limite.'
        },
        {
          id: 'mf-links',
          source: 'Fiche des horaires',
          text: 'La ligne B4 et les rampes du Mail restent ouvertes de 13 h à 18 h.'
        },
        {
          id: 'mf-central',
          source: 'Plan du bourg',
          text: 'La cour de l’École est au centre des habitations.'
        }
      ],
      correctSite: 'mail',
      correctEvidence: ['mf-inside', 'mf-links'],
      smokeWrongSite: 'col',
      smokeWrongEvidence: ['mf-spaces', 'mf-sign'],
      scaffoldByCode: {
        ACCES_BLOQUE: 'Compare l’heure de la mission avec l’heure de fermeture. Un lieu central ne sert pas si son portail reste fermé.',
        LIMITE_IGNOREE: 'Suis la ligne pointillée. Le service doit être installé du côté indiqué par l’autorisation, avant de comparer la taille des sites.',
        PROXIMITE_SEULE: 'Repère les deux quartiers à desservir, puis cherche une liaison ouverte depuis l’origine du matériel.',
        PREUVES_DECALEES: 'Vérifie que chaque fait mentionne le site épinglé et une contrainte de la mission, pas seulement un avantage général.'
      },
      correctExplanation: 'Le kiosque est dans le périmètre où le service est autorisé. La ligne B4 apporte le matériel et les deux rampes relient les quartiers pendant toute la permanence.'
    },
    {
      id: 'anse-aux-saules',
      fileNumber: 'AS—31',
      place: 'Anse-aux-Saules',
      theme: 'Échanges · Habitat',
      mission: 'Installer un point temporaire de retrait de colis.',
      origin: 'La livraison part du centre de tri régional, à 18 km.',
      serviceTime: 'Livraison à 9 h · retraits de 10 h à 18 h',
      mapAlt: 'Schéma de l’Anse-aux-Saules : la rue du Marché est piétonne à 9 h, la rive est fermée et l’ancien Atelier reste relié à la rocade et aux habitations.',
      barrierKind: 'schedule',
      barrierTitle: 'Deux accès temporaires',
      barrierDetail: 'Rue du Marché piétonne jusqu’à 11 h 30 ; périmètre de rive fermé après les pluies.',
      routes: [
        {
          symbol: '9 h',
          name: 'Rocade · centre de tri ↔ Atelier',
          status: 'OUVERT',
          detail: 'Livraisons autorisées dès 7 h.'
        },
        {
          symbol: '11:30',
          name: 'Rue du Marché',
          status: 'LIMITÉ',
          detail: 'Aucun véhicule avant 11 h 30.'
        },
        {
          symbol: '×',
          name: 'Périmètre de rive · Plage',
          status: 'FERMÉ',
          detail: 'Accès fermé pendant la semaine.'
        }
      ],
      candidates: [
        {
          id: 'marche',
          marker: 'A',
          name: 'Halle du Marché',
          site: 'Halle couverte au cœur du quartier ancien.',
          situation: '92 logements sont à moins de cinq minutes.',
          access: 'La camionnette de 9 h ne peut pas emprunter la rue piétonne.',
          diagnostic: 'PROXIMITE_SEULE',
          x: 211,
          y: 103
        },
        {
          id: 'atelier',
          marker: 'B',
          name: 'Ancien Atelier',
          site: 'Sol dur, couvert, juste au-dessus de la rive.',
          situation: 'Entre la rocade et le passage piéton-cycle des habitations.',
          access: 'Hors du périmètre fermé et accessible à la livraison de 9 h.',
          diagnostic: null,
          x: 352,
          y: 199
        },
        {
          id: 'plage',
          marker: 'C',
          name: 'Esplanade de la Plage',
          site: 'Grande surface plane près du lac.',
          situation: 'Au bord du quartier de loisirs.',
          access: 'Entièrement comprise dans le périmètre de rive fermé.',
          diagnostic: 'LIMITE_IGNOREE',
          x: 522,
          y: 254
        }
      ],
      evidence: [
        {
          id: 'as-homes',
          source: 'Comptage des trajets',
          text: '92 logements sont à moins de cinq minutes de la halle.'
        },
        {
          id: 'as-cover',
          source: 'Fiche du bâtiment',
          text: 'La halle du Marché protège entièrement les colis de la pluie.'
        },
        {
          id: 'as-ring',
          source: 'Plan de livraison',
          text: 'La rocade ouverte permet d’atteindre l’Atelier à 9 h sans passer par la rue piétonne.'
        },
        {
          id: 'as-passage',
          source: 'Avis de fermeture',
          text: 'Le passage piéton-cycle relie les habitations à l’Atelier hors du périmètre fermé.'
        },
        {
          id: 'as-space',
          source: 'Plan de la rive',
          text: 'L’esplanade de la Plage offre la plus grande surface.'
        }
      ],
      correctSite: 'atelier',
      correctEvidence: ['as-ring', 'as-passage'],
      smokeWrongSite: 'marche',
      smokeWrongEvidence: ['as-homes', 'as-cover'],
      scaffoldByCode: {
        ACCES_BLOQUE: 'Place ton doigt sur 9 h dans le registre. Ne garde que les routes qu’une camionnette peut emprunter à cette heure.',
        LIMITE_IGNOREE: 'Repère la zone de rive hachurée. Un grand terrain situé dedans reste fermé pendant toute la mission.',
        PROXIMITE_SEULE: 'Les logements sont proches de la halle, mais le service arrive d’abord en camionnette. Vérifie les deux trajets, à la bonne heure.',
        PREUVES_DECALEES: 'Cherche un fait pour l’arrivée de 9 h et un fait pour le trajet des habitants. Les deux doivent aboutir au site choisi.'
      },
      correctExplanation: 'La rocade permet la livraison à 9 h sans traverser la rue piétonne. Le passage piéton-cycle relie les habitations à l’Atelier tout en restant hors du périmètre de rive fermé.'
    }
  ];

  let phase: Phase = 'intro';
  let variationIndex = 0;
  let currentVariation = variations[0];
  let selectedSite: string | null = null;
  let selectedEvidence: string[] = [];
  let formHint = '';
  let announcement = '';
  let currentResponsePath: ResponseRecord[] = [];
  let applicableCode: DiagnosticCode | null = null;
  let lastSubmitted: ResponseRecord | null = null;

  function focusLater(id: string): void {
    setTimeout(() => document.getElementById(id)?.focus(), 0);
  }

  function begin(): void {
    variationIndex = 0;
    currentVariation = variations[0];
    selectedSite = null;
    selectedEvidence = [];
    formHint = '';
    currentResponsePath = [];
    applicableCode = null;
    lastSubmitted = null;
    phase = 'active';
    announcement = `Dossier 1 ouvert : ${currentVariation.place}.`;
    focusLater('active-title');
  }

  function selectSite(id: string): void {
    selectedSite = id;
    formHint = '';
    const candidate = currentVariation.candidates.find((item) => item.id === id);
    announcement = `${candidate?.name ?? 'Site'} épinglé dans la recommandation.`;
  }

  function toggleEvidence(id: string): void {
    formHint = '';
    const card = currentVariation.evidence.find((item) => item.id === id);

    if (selectedEvidence.includes(id)) {
      selectedEvidence = selectedEvidence.filter((evidenceId) => evidenceId !== id);
      announcement = `${card?.source ?? 'Fait'} retiré. ${selectedEvidence.length} fait épinglé sur 2.`;
      return;
    }

    if (selectedEvidence.length === 2) {
      selectedEvidence = [selectedEvidence[1], id];
      announcement = `Deux faits maximum : le premier a été remplacé par « ${card?.text ?? 'nouveau fait'} ».`;
      return;
    }

    selectedEvidence = [...selectedEvidence, id];
    announcement = `${card?.source ?? 'Fait'} épinglé. ${selectedEvidence.length} fait${selectedEvidence.length > 1 ? 's' : ''} sur 2.`;
  }

  function diagnose(siteId: string, evidenceIds: string[]): DiagnosticCode {
    const candidate = currentVariation.candidates.find((item) => item.id === siteId);
    if (!candidate) return 'PREUVES_DECALEES';
    if (candidate.id !== currentVariation.correctSite) {
      return candidate.diagnostic ?? 'PREUVES_DECALEES';
    }

    const expected = [...currentVariation.correctEvidence].sort().join('|');
    const received = [...evidenceIds].sort().join('|');
    return expected === received ? 'APPUI_CONVERGENT' : 'PREUVES_DECALEES';
  }

  function submitAccessibleRecommendation(kind: AttemptKind): void {
    selectedSite = kind === 'correct'
      ? currentVariation.correctSite
      : currentVariation.smokeWrongSite;
    selectedEvidence = kind === 'correct'
      ? [...currentVariation.correctEvidence]
      : [...currentVariation.smokeWrongEvidence];
    submitRecommendation();
  }

  function submitRecommendation(): void {
    if (!selectedSite || selectedEvidence.length !== 2) {
      const missing = !selectedSite && selectedEvidence.length !== 2
        ? 'Épingle un site et deux faits avant l’envoi.'
        : !selectedSite
          ? 'Épingle encore un site avant l’envoi.'
          : `Épingle encore ${2 - selectedEvidence.length} fait${selectedEvidence.length === 1 ? '' : 's'} avant l’envoi.`;
      formHint = missing;
      announcement = missing;
      return;
    }

    const code = diagnose(selectedSite, selectedEvidence);
    const attempt = currentResponsePath.filter(
      (response) => response.variationId === currentVariation.id
    ).length + 1;
    const response: ResponseRecord = {
      variationId: currentVariation.id,
      siteId: selectedSite,
      evidenceIds: [...selectedEvidence],
      code,
      attempt
    };

    applicableCode = code;
    currentResponsePath = [...currentResponsePath, response];
    lastSubmitted = response;

    if (code === 'APPUI_CONVERGENT') {
      phase = 'correct';
      announcement = `Recommandation accordée pour ${currentVariation.place}. Les deux faits soutiennent le site.`;
      focusLater('correct-title');
    } else {
      phase = 'incorrect';
      announcement = `Recommandation à revoir pour ${currentVariation.place}. Une contrainte du dossier n’est pas encore respectée.`;
      focusLater('incorrect-title');
    }
  }

  function openRetry(): void {
    selectedSite = null;
    selectedEvidence = [];
    formHint = '';
    phase = 'retry';
    announcement = 'Atelier de reprise ouvert. La recommandation précédente reste résumée au-dessus des choix.';
    focusLater('retry-title');
  }

  function continueDossiers(): void {
    if (variationIndex === variations.length - 1) {
      phase = 'complete';
      announcement = 'Les trois dossiers sont terminés. Aucune réponse n’a été enregistrée.';
      focusLater('complete-title');
      return;
    }

    variationIndex += 1;
    currentVariation = variations[variationIndex];
    selectedSite = null;
    selectedEvidence = [];
    applicableCode = null;
    lastSubmitted = null;
    formHint = '';
    phase = 'active';
    announcement = `Dossier ${variationIndex + 1} ouvert : ${currentVariation.place}.`;
    focusLater('active-title');
  }

  function candidateFor(id: string | null): Candidate | undefined {
    return currentVariation.candidates.find((candidate) => candidate.id === id);
  }

  function evidenceFor(id: string): EvidenceCard | undefined {
    return currentVariation.evidence.find((evidence) => evidence.id === id);
  }

  function submittedCandidate(): Candidate | undefined {
    return candidateFor(lastSubmitted?.siteId ?? null);
  }

  function submittedEvidence(): EvidenceCard[] {
    return (lastSubmitted?.evidenceIds ?? [])
      .map((id) => evidenceFor(id))
      .filter((evidence): evidence is EvidenceCard => Boolean(evidence));
  }

  function incorrectHeading(code: DiagnosticCode | null): string {
    if (code === 'ACCES_BLOQUE') return 'Le trajet s’interrompt avant le site.';
    if (code === 'LIMITE_IGNOREE') return 'Une limite écarte ce site.';
    if (code === 'PROXIMITE_SEULE') return 'Proche ne veut pas encore dire accessible.';
    return 'Les faits n’appuient pas encore le même site.';
  }

  function incorrectDetail(code: DiagnosticCode | null): string {
    const site = submittedCandidate()?.name ?? 'Le site choisi';
    if (code === 'ACCES_BLOQUE') {
      return `${site} a bien un avantage, mais son trajet nécessaire rencontre une liaison marquée FERMÉE dans ce dossier. Le service ne peut donc pas y arriver pendant la mission.`;
    }
    if (code === 'LIMITE_IGNOREE') {
      return `${site} présente de l’espace ou de la visibilité, mais il se trouve du mauvais côté de la limite obligatoire. Cet avantage ne supprime pas le périmètre indiqué.`;
    }
    if (code === 'PROXIMITE_SEULE') {
      return `${site} est réellement proche d’une partie des habitations. Cependant, les faits envoyés ne montrent pas un trajet utilisable depuis l’origine du service et vers tous les publics concernés.`;
    }
    return `${site} convient à la mission, mais au moins un fait épinglé ne démontre pas son accès ou le respect de la limite. Deux faits vrais peuvent rester insuffisants s’ils ne convergent pas.`;
  }

  function scaffoldText(): string {
    if (!applicableCode || applicableCode === 'APPUI_CONVERGENT') {
      return 'Pars de l’origine du service, suis un trajet ouvert, puis vérifie les publics desservis.';
    }
    return currentVariation.scaffoldByCode[applicableCode];
  }

  function attemptForCandidate(id: string): AttemptKind | undefined {
    if (id === currentVariation.smokeWrongSite) return 'incorrect';
    if (id === currentVariation.correctSite) return 'correct';
    return undefined;
  }

  function stepForCandidate(id: string): string | undefined {
    return attemptForCandidate(id) ? '1' : undefined;
  }

  function attemptForEvidence(id: string): AttemptKind | undefined {
    if (currentVariation.smokeWrongEvidence.includes(id)) return 'incorrect';
    if (currentVariation.correctEvidence.includes(id)) return 'correct';
    return undefined;
  }

  function stepForEvidence(id: string): string | undefined {
    const wrongIndex = currentVariation.smokeWrongEvidence.indexOf(id);
    if (wrongIndex >= 0) return String(wrongIndex + 2);
    const correctIndex = currentVariation.correctEvidence.indexOf(id);
    if (correctIndex >= 0) return String(correctIndex + 2);
    return undefined;
  }

  function wasRevised(): boolean {
    return currentResponsePath.some(
      (response) => response.code !== 'APPUI_CONVERGENT'
    );
  }
</script>

<svelte:head>
  <title>Le bureau des accès · EX-0308</title>
  <meta
    name="description"
    content="Prototype de géographie : recommander un site de service temporaire à partir d’un dossier sur les limites et les accès."
  />
</svelte:head>

<main
  class="prototype-root"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0308"
  data-smoke-root
  data-smoke-exercise="EX-0308"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={phase === 'intro' ? 'ready' : phase === 'active' || phase === 'retry' ? 'question' : phase}
>
  <div class="paper-noise" aria-hidden="true"></div>

  {#if phase === 'intro'}
    <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
      <header class="intro-mast">
        <span class="agency-mark" aria-hidden="true">B/A</span>
        <div>
          <strong>Bureau des accès</strong>
          <span>Cellule des services temporaires</span>
        </div>
        <span class="case-chip">EX—0308</span>
      </header>

      <div class="intro-grid">
        <div class="intro-copy">
          <p class="eyebrow">Trois dossiers · un avis à défendre</p>
          <h1 id="intro-title">Où poser<br /><span>le service&nbsp;?</span></h1>
          <p class="lead">
            Un lieu proche t’est inconnu. Observe son dossier, recommande un site,
            puis épingle <strong>deux faits</strong> qui rendent ce choix accessible.
          </p>

          <div class="recipe" aria-label="Les trois actions de chaque dossier">
            <div><span>01</span><strong>Lire</strong><small>routes et limites</small></div>
            <div><span>02</span><strong>Épingler</strong><small>un site + deux faits</small></div>
            <div><span>03</span><strong>Conseiller</strong><small>puis réviser si besoin</small></div>
          </div>

          <button class="primary" type="button" data-smoke-action="start" onclick={begin}>
            Ouvrir le premier dossier
            <span aria-hidden="true">→</span>
          </button>
          <p class="privacy-note"><span aria-hidden="true">○</span> Rien n’est enregistré ni envoyé.</p>
        </div>

        <aside class="intro-dossier" aria-label="Aperçu du dossier">
          <div class="folder-tab">CONFIDENTIEL PÉDAGOGIQUE</div>
          <div class="dossier-paper">
            <div class="dossier-head">
              <span>FICHE TERRITOIRE</span><b>RC—17</b>
            </div>
            <div class="mini-diagram" aria-hidden="true">
              <i class="route-one"></i>
              <i class="route-two"></i>
              <span class="mini-origin">DÉPÔT</span>
              <span class="mini-site site-a">A</span>
              <span class="mini-site site-b">B</span>
              <span class="mini-site site-c">C</span>
              <span class="mini-cut">×</span>
            </div>
            <p>Un avantage visible ne suffit pas. Il faut une liaison qui tient.</p>
            <div class="stamp" aria-hidden="true">À<br />ÉTUDIER</div>
          </div>
        </aside>
      </div>

      <section class="vocabulary" aria-labelledby="vocabulary-title">
        <div>
          <p class="eyebrow">Mots-outils</p>
          <h2 id="vocabulary-title">Quatre regards sur un lieu</h2>
        </div>
        <dl>
          <div><dt>Site</dt><dd>Ce qu’on trouve à l’endroit : sol, pente, rive, abri.</dd></div>
          <div><dt>Situation</dt><dd>Sa position par rapport aux habitations et aux routes.</dd></div>
          <div><dt>Limite</dt><dd>Ce qui sépare ou restreint : rivière, périmètre, horaire.</dd></div>
          <div><dt>Accès</dt><dd>Le trajet réellement utilisable pour arriver.</dd></div>
        </dl>
      </section>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="activity"
      data-smoke-state={phase}
      data-smoke-variation={currentVariation.id}
      aria-labelledby={phase === 'retry' ? 'retry-title' : 'active-title'}
    >
      <header class="activity-mast">
        <div class="brand-lockup">
          <span class="agency-mark small" aria-hidden="true">B/A</span>
          <div><strong>Bureau des accès</strong><span>Note de conseil</span></div>
        </div>
        <div class="progress-copy">
          <span>Dossier {variationIndex + 1} / {variations.length}</span>
          <strong>{currentVariation.place}</strong>
        </div>
        <div class="progress-dots" aria-label={`Dossier ${variationIndex + 1} sur ${variations.length}`}>
          {#each variations as variation, index}
            <span class:done={index < variationIndex} class:current={index === variationIndex}>
              <span class="sr-only">{variation.place} : {index < variationIndex ? 'terminé' : index === variationIndex ? 'en cours' : 'à venir'}</span>
            </span>
          {/each}
        </div>
      </header>

      {#if phase === 'retry'}
        <div class="retry-banner">
          <div class="retry-symbol" aria-hidden="true">↺</div>
          <div>
            <p class="eyebrow">Atelier de reprise</p>
            <h1 id="retry-title" tabindex="-1">Repars d’une relation sûre.</h1>
            <p>{scaffoldText()}</p>
          </div>
        </div>

        {#if lastSubmitted}
          <div class="previous-response" aria-label="Recommandation précédente">
            <span>Envoi précédent conservé</span>
            <strong>{submittedCandidate()?.name}</strong>
            <p>{submittedEvidence().map((evidence) => evidence.text).join(' · ')}</p>
          </div>
        {/if}
      {:else}
        <div class="activity-title-row">
          <div>
            <p class="eyebrow">Dossier {currentVariation.fileNumber} · {currentVariation.theme}</p>
            <h1 id="active-title" tabindex="-1">{currentVariation.mission}</h1>
          </div>
          <div class="service-time"><span>Fenêtre de service</span><strong>{currentVariation.serviceTime}</strong></div>
        </div>
      {/if}

      <fieldset class="accessible-recommendation-alternative">
        <legend>Alternative sans épinglage fin : compare deux recommandations complètes</legend>
        <p>Chaque proposition associe un site et deux faits du même dossier.</p>
        <div class="alternative-actions">
          <button type="button" class="primary" data-smoke-answer="incorrect" onclick={() => submitAccessibleRecommendation('incorrect')}>
            Examiner l’avis A — une liaison ne tient pas
          </button>
          <button type="button" class="primary" data-smoke-answer="correct" onclick={() => submitAccessibleRecommendation('correct')}>
            Examiner l’avis B — les deux faits convergent
          </button>
        </div>
      </fieldset>

      <div class="workspace">
        <div class="source-column">
          <article class="brief-card">
            <div class="card-label"><span>01</span> Ordre de mission</div>
            <p>{currentVariation.origin}</p>
            <strong>{currentVariation.serviceTime}</strong>
          </article>

          <article class="map-card" aria-labelledby="map-heading">
            <div class="card-heading">
              <div>
                <div class="card-label"><span>02</span> Croquis documentaire</div>
                <h2 id="map-heading">{currentVariation.place}</h2>
              </div>
              <span class="not-scale">Non à l’échelle</span>
            </div>

            <svg class="territory-map" viewBox="0 0 640 320" role="img" aria-label={currentVariation.mapAlt}>
              <rect class="map-ground" x="0" y="0" width="640" height="320" rx="18"></rect>
              <path class="contour c-one" d="M-20 62 C105 12 176 91 290 48 S510 5 680 72"></path>
              <path class="contour c-two" d="M-16 275 C108 223 203 302 319 256 S531 218 665 272"></path>
              <path class="open-route" d="M34 250 C119 247 154 214 238 219 S372 203 448 174 S555 138 620 151"></path>
              <path class="local-route" d="M113 45 C146 105 210 135 273 190 S397 251 583 263"></path>
              <circle class="origin-dot" cx="54" cy="250" r="12"></circle>
              <text class="origin-text" x="31" y="282">ORIGINE</text>

              {#if currentVariation.barrierKind === 'river'}
                <path class="river" d="M350 -18 C314 42 376 91 339 142 S311 243 365 340"></path>
                <line class="closed-link" x1="350" y1="109" x2="401" y2="115"></line>
                <text class="barrier-mark" x="366" y="104">×</text>
                <text class="map-note" x="386" y="137">PONT FERMÉ</text>
              {:else if currentVariation.barrierKind === 'boundary'}
                <path class="boundary" d="M428 -12 C399 67 442 129 420 191 S434 281 414 336"></path>
                <text class="map-note" x="438" y="51">LIMITE</text>
                <text class="side-note" x="466" y="75">HORS PÉRIMÈTRE</text>
              {:else}
                <path class="shore" d="M433 204 C500 176 569 197 667 169 L667 340 L415 340 Z"></path>
                <path class="restricted-zone" d="M445 222 C503 203 563 216 650 195 L650 315 L432 315 Z"></path>
                <text class="map-note" x="468" y="249">RIVE FERMÉE</text>
                <line class="closed-link" x1="144" y1="126" x2="236" y2="114"></line>
                <text class="barrier-mark" x="184" y="112">9 h</text>
              {/if}

              {#each currentVariation.candidates as candidate}
                <g class="candidate-pin" transform={`translate(${candidate.x} ${candidate.y})`}>
                  <circle r="22"></circle>
                  <text text-anchor="middle" dy="6">{candidate.marker}</text>
                </g>
              {/each}
            </svg>
            <p class="map-summary"><span aria-hidden="true">⌁</span>{currentVariation.mapAlt}</p>

            <div class="barrier-strip">
              <span aria-hidden="true">!</span>
              <div><strong>{currentVariation.barrierTitle}</strong><p>{currentVariation.barrierDetail}</p></div>
            </div>
          </article>

          <article class="route-register">
            <div class="card-label"><span>03</span> Registre des liaisons</div>
            <div class="route-list">
              {#each currentVariation.routes as route}
                <div class:closed={route.status === 'FERMÉ'} class:limited={route.status === 'LIMITÉ'}>
                  <span class="route-symbol" aria-hidden="true">{route.symbol}</span>
                  <p><strong>{route.name}</strong><small>{route.detail}</small></p>
                  <b>{route.status === 'OUVERT' ? '✓ OUVERT' : route.status === 'FERMÉ' ? '× FERMÉ' : '△ LIMITÉ'}</b>
                </div>
              {/each}
            </div>
          </article>
        </div>

        <aside class="decision-column" aria-label="Assembler la recommandation">
          <div class="decision-head">
            <p class="eyebrow">Ta note de conseil</p>
            <h2>Épingle un site</h2>
            <p>Compare son site, sa situation et son accès. La sélection seule n’envoie rien.</p>
          </div>

          <div class="candidate-choices" aria-label="Choisir un site">
            {#each currentVariation.candidates as candidate}
              <button
                type="button"
                class:selected={selectedSite === candidate.id}
                aria-pressed={selectedSite === candidate.id}
                aria-label={`${candidate.name}. Site : ${candidate.site} Situation : ${candidate.situation} Accès : ${candidate.access}`}
                data-smoke-attempt={attemptForCandidate(candidate.id)}
                data-smoke-step={stepForCandidate(candidate.id)}
                onclick={() => selectSite(candidate.id)}
              >
                <span class="candidate-marker">{candidate.marker}</span>
                <span class="candidate-copy">
                  <strong>{candidate.name}</strong>
                  <small><b>Site</b> {candidate.site}</small>
                  <small><b>Situation</b> {candidate.situation}</small>
                  <small><b>Accès</b> {candidate.access}</small>
                </span>
                <span class="choice-state">
                  {selectedSite === candidate.id ? '✓ Épinglé' : '+ Choisir'}
                </span>
              </button>
            {/each}
          </div>

          <div class="evidence-head">
            <div>
              <h2>Épingle deux faits</h2>
              <p>Un fait vient du dossier. À toi d’en faire une raison.</p>
            </div>
            <output aria-live="polite">{selectedEvidence.length} / 2</output>
          </div>

          <div class="evidence-choices" aria-label="Choisir exactement deux faits">
            {#each currentVariation.evidence as evidence, index}
              <button
                type="button"
                class:selected={selectedEvidence.includes(evidence.id)}
                aria-pressed={selectedEvidence.includes(evidence.id)}
                data-smoke-attempt={attemptForEvidence(evidence.id)}
                data-smoke-step={stepForEvidence(evidence.id)}
                onclick={() => toggleEvidence(evidence.id)}
              >
                <span class="clip" aria-hidden="true">{selectedEvidence.includes(evidence.id) ? '✓' : index + 1}</span>
                <span><small>{evidence.source}</small><strong>{evidence.text}</strong></span>
                <b>{selectedEvidence.includes(evidence.id) ? 'Épinglé' : 'Épingler'}</b>
              </button>
            {/each}
          </div>

          <div class="recommendation-preview" aria-label="Aperçu de la recommandation">
            <span>Recommandation en préparation</span>
            <strong>{candidateFor(selectedSite)?.name ?? 'Aucun site épinglé'}</strong>
            <p>
              {selectedEvidence.length === 0
                ? 'Aucun fait épinglé.'
                : selectedEvidence.map((id) => evidenceFor(id)?.source).join(' + ')}
            </p>
          </div>

          {#if formHint}
            <p class="form-hint" role="status"><span aria-hidden="true">!</span>{formHint}</p>
          {/if}

          <button class="submit-button" type="button" data-smoke-action="submit" onclick={submitRecommendation}>
            <span>Envoyer la recommandation</span>
            <small>1 site · 2 faits · décision explicite</small>
            <b aria-hidden="true">↗</b>
          </button>
        </aside>
      </div>
    </section>
  {:else if phase === 'incorrect'}
    <section
      class="feedback-screen incorrect-screen"
      data-smoke-state="incorrect"
      data-smoke-variation={currentVariation.id}
      aria-labelledby="incorrect-title"
    >
      <header class="feedback-mast">
        <div class="brand-lockup">
          <span class="agency-mark small" aria-hidden="true">B/A</span>
          <div><strong>Dossier {currentVariation.fileNumber}</strong><span>{currentVariation.place}</span></div>
        </div>
        <span class="outcome-label error-label"><span aria-hidden="true">!</span> À revoir</span>
      </header>

      <div class="feedback-layout">
        <article class="submitted-note">
          <div class="paper-clip" aria-hidden="true"></div>
          <p class="eyebrow">Recommandation envoyée · essai {lastSubmitted?.attempt}</p>
          <h2>{submittedCandidate()?.name}</h2>
          <div class="submitted-facts">
            {#each submittedEvidence() as evidence}
              <div><span aria-hidden="true">•</span><p><small>{evidence.source}</small>{evidence.text}</p></div>
            {/each}
          </div>
          <p class="kept-note">Cet envoi reste visible pour que tu puisses le comparer à ta reprise.</p>
        </article>

        <article class="feedback-copy" role="status">
          <p class="eyebrow">Avis du dossier</p>
          <h1 id="incorrect-title" tabindex="-1">{incorrectHeading(applicableCode)}</h1>
          <p class="feedback-detail" data-smoke-feedback="incorrect" data-smoke-feedback-detail>{incorrectDetail(applicableCode)}</p>

          <div class="relationship-check">
            <span>Relation à vérifier</span>
            <div>
              <b>Origine</b><i aria-hidden="true">→</i><b>trajet ouvert</b><i aria-hidden="true">→</i><b>site + publics</b>
            </div>
          </div>

          <div class="next-clue">
            <span aria-hidden="true">↺</span>
            <p><strong>Un repère, pas la réponse</strong>{scaffoldText()}</p>
          </div>

          <button class="primary" type="button" data-smoke-action="retry" onclick={openRetry}>
            Reprendre avec ce repère <span aria-hidden="true">→</span>
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
      <header class="feedback-mast">
        <div class="brand-lockup">
          <span class="agency-mark small" aria-hidden="true">B/A</span>
          <div><strong>Dossier {currentVariation.fileNumber}</strong><span>{currentVariation.place}</span></div>
        </div>
        <span class="outcome-label success-label"><span aria-hidden="true">✓</span> Accord du dossier</span>
      </header>

      <div class="correct-grid">
        <article class="approved-note">
          <span class="approval-stamp" aria-hidden="true">AVIS<br />COHÉRENT</span>
          <p class="eyebrow">Site recommandé</p>
          <h2>{submittedCandidate()?.name}</h2>
          <div class="approved-facts">
            {#each submittedEvidence() as evidence, index}
              <div><span>{index + 1}</span><p><small>{evidence.source}</small>{evidence.text}</p></div>
            {/each}
          </div>
        </article>

        <article class="correct-copy" role="status">
          <p class="eyebrow">Pourquoi l’avis tient</p>
          <h1 id="correct-title" tabindex="-1">Deux faits, une même liaison.</h1>
          <p class="feedback-detail" data-smoke-feedback="correct" data-smoke-feedback-detail>{currentVariation.correctExplanation}</p>

          <div class="evidence-interpretation">
            <div><span>Faits</span><p>Les informations sont données par le dossier.</p></div>
            <i aria-hidden="true">→</i>
            <div><span>Interprétation</span><p>Elles permettent de recommander ce site pour cette mission.</p></div>
          </div>
        </article>
      </div>

      <aside
        class="continuation-panel"
        data-smoke-state="continuation"
        data-smoke-variation={currentVariation.id}
        aria-label="Continuer après le retour correct"
      >
        <div>
          <span>Dossier {variationIndex + 1} validé pour cette mission</span>
          <strong>{variationIndex === variations.length - 1 ? 'Les trois avis peuvent être classés.' : 'La prochaine limite sera différente.'}</strong>
        </div>
        <button class="primary" type="button" data-smoke-action="continue" onclick={continueDossiers}>
          {variationIndex === variations.length - 1 ? 'Clore les dossiers' : 'Ouvrir le dossier suivant'}
          <span aria-hidden="true">→</span>
        </button>
      </aside>
    </section>
  {:else}
    <section class="completion" data-smoke-state="complete" aria-labelledby="complete-title">
      <header class="intro-mast completion-mast">
        <span class="agency-mark" aria-hidden="true">B/A</span>
        <div><strong>Bureau des accès</strong><span>Fin de la série documentaire</span></div>
        <span class="case-chip">3 / 3</span>
      </header>

      <div class="completion-grid">
        <div class="completion-copy">
          <p class="eyebrow">Dossiers classés</p>
          <h1 id="complete-title" tabindex="-1">Trois avis ont trouvé une liaison qui tient.</h1>
          <p class="lead" data-smoke-completion>
            {#if wasRevised()}
              Tu as pu reprendre au moins une recommandation en utilisant une limite ou un accès du dossier.
            {:else}
              Tu as relié chaque recommandation à deux faits du dossier.
            {/if}
            Cette série est terminée ; elle ne donne ni note ni verdict de maîtrise.
          </p>

          <div class="strategy-summary">
            <span>Repère à emporter</span>
            <ol>
              <li><b>1</b> Partir de l’origine du service.</li>
              <li><b>2</b> Suivre un trajet réellement ouvert.</li>
              <li><b>3</b> Vérifier la limite et les publics desservis.</li>
              <li><b>4</b> Relier deux faits au même site.</li>
            </ol>
          </div>

          <button class="primary" type="button" onclick={begin}>
            Reprendre les trois dossiers <span aria-hidden="true">↺</span>
          </button>
          <p class="privacy-note"><span aria-hidden="true">○</span> Les réponses et les chemins de reprise ont été gardés seulement pendant cette ouverture.</p>
        </div>

        <aside class="archive" aria-label="Les trois dossiers terminés">
          <div class="archive-spine"><span>ARCHIVES</span><b>LOCALISATION</b></div>
          <div class="archive-files">
            {#each variations as variation, index}
              <div>
                <span>0{index + 1}</span>
                <p><small>{variation.fileNumber}</small><strong>{variation.place}</strong><b>✓ AVIS CLASSÉ</b></p>
              </div>
            {/each}
          </div>
          <blockquote>« Un lieu convient quand son site, sa situation et ses accès répondent ensemble à la mission. »</blockquote>
        </aside>
      </div>
    </section>
  {/if}

  <p class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
</main>

<style>
  .prototype-root,
  .prototype-root * {
    box-sizing: border-box;
  }

  .prototype-root {
    --ink: #17223c;
    --ink-soft: #46506a;
    --navy: #15284d;
    --blue: #27698b;
    --cyan: #a8d9dc;
    --paper: #fffdf6;
    --ground: #e9e3d5;
    --cream: #f5f0e4;
    --line: #c9c3b5;
    --orange: #c8452f;
    --orange-pale: #f7d5c7;
    --green: #1e6857;
    --green-pale: #d3e8dc;
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: var(--cream);
    font-family: "Avenir Next", Avenir, "Segoe UI", system-ui, sans-serif;
    line-height: 1.45;
  }

  .paper-noise {
    position: fixed;
    inset: 42px 0 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.28;
    background-image:
      linear-gradient(90deg, transparent 49%, rgba(23, 34, 60, 0.035) 50%, transparent 51%),
      linear-gradient(rgba(23, 34, 60, 0.025) 1px, transparent 1px);
    background-size: 41px 100%, 100% 31px;
  }

  button {
    min-height: 48px;
    border: 0;
    font: inherit;
    touch-action: manipulation;
  }

  button:focus-visible,
  [tabindex="-1"]:focus-visible {
    outline: 4px solid var(--orange);
    outline-offset: 4px;
  }

  button:not(:disabled) { cursor: pointer; }

  h1, h2, p { overflow-wrap: anywhere; }

  .intro,
  .activity,
  .feedback-screen,
  .completion {
    position: relative;
    z-index: 1;
    width: min(1220px, 100%);
    margin: 0 auto;
    padding: 24px clamp(18px, 4vw, 54px) 64px;
  }

  .intro-mast,
  .activity-mast,
  .feedback-mast {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 14px;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 15px;
  }

  .agency-mark {
    display: grid;
    width: 54px;
    height: 54px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: var(--navy);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: -0.08em;
    box-shadow: inset 0 0 0 5px var(--navy), inset 0 0 0 6px var(--paper);
  }

  .agency-mark.small {
    width: 43px;
    height: 43px;
    font-size: 0.66rem;
  }

  .intro-mast > div,
  .brand-lockup > div {
    display: grid;
    min-width: 0;
  }

  .intro-mast strong,
  .brand-lockup strong {
    font-size: 0.86rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .intro-mast div span,
  .brand-lockup div span {
    color: var(--ink-soft);
    font-size: 0.68rem;
  }

  .case-chip {
    margin-left: auto;
    border: 1px solid var(--ink);
    padding: 7px 10px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.7rem;
    font-weight: 800;
  }

  .intro-grid,
  .completion-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.04fr) minmax(360px, 0.76fr);
    gap: clamp(38px, 7vw, 100px);
    align-items: center;
    padding: clamp(52px, 8vw, 105px) 0 72px;
  }

  .eyebrow,
  .card-label {
    margin: 0;
    color: var(--blue);
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .intro-copy h1,
  .completion-copy h1 {
    max-width: 720px;
    margin: 18px 0 25px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(3.7rem, 8vw, 7.7rem);
    font-weight: 500;
    letter-spacing: -0.065em;
    line-height: 0.82;
  }

  .intro-copy h1 span { color: var(--orange); }

  .lead {
    max-width: 650px;
    margin: 0;
    color: var(--ink-soft);
    font-size: clamp(1.03rem, 2vw, 1.25rem);
    line-height: 1.65;
  }

  .recipe {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin: 34px 0;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .recipe div {
    display: grid;
    min-width: 0;
    gap: 2px;
    padding: 15px;
    background: var(--paper);
  }

  .recipe span,
  .recipe small { color: var(--ink-soft); font-size: 0.68rem; }
  .recipe strong { font-size: 0.92rem; }

  .primary {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    padding: 13px 18px;
    border: 2px solid var(--navy);
    color: var(--paper);
    background: var(--navy);
    box-shadow: 5px 5px 0 var(--cyan);
    font-weight: 850;
    text-align: left;
    transition: transform 140ms ease, box-shadow 140ms ease;
  }

  .primary:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--cyan); }
  .primary:active { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--cyan); }

  .privacy-note {
    display: flex;
    max-width: 610px;
    align-items: flex-start;
    gap: 8px;
    margin: 18px 0 0;
    color: var(--ink-soft);
    font-size: 0.74rem;
  }

  .intro-dossier {
    position: relative;
    min-width: 0;
    padding: 28px 0 0 22px;
    transform: rotate(1.5deg);
  }

  .folder-tab {
    position: absolute;
    top: 0;
    left: 52px;
    padding: 11px 20px;
    color: var(--paper);
    background: var(--orange);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .dossier-paper {
    position: relative;
    min-height: 440px;
    overflow: hidden;
    border: 1px solid var(--ink);
    padding: 26px;
    background: var(--paper);
    box-shadow: 16px 17px 0 var(--navy);
  }

  .dossier-head {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px double var(--ink);
    padding-bottom: 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.7rem;
  }

  .mini-diagram {
    position: relative;
    height: 245px;
    margin: 24px 0 20px;
    overflow: hidden;
    background:
      radial-gradient(circle at 20% 20%, transparent 0 42px, rgba(39, 105, 139, 0.13) 43px 44px, transparent 45px),
      radial-gradient(circle at 81% 72%, transparent 0 73px, rgba(39, 105, 139, 0.15) 74px 75px, transparent 76px),
      #e4ece7;
  }

  .route-one,
  .route-two {
    position: absolute;
    height: 4px;
    background: var(--navy);
    transform-origin: left center;
  }

  .route-one { top: 172px; left: 28px; width: 88%; transform: rotate(-17deg); }
  .route-two { top: 48px; left: 130px; width: 64%; transform: rotate(57deg); }
  .mini-origin { position: absolute; bottom: 17px; left: 19px; font-size: 0.6rem; font-weight: 900; }

  .mini-site {
    position: absolute;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 3px solid var(--navy);
    border-radius: 50%;
    background: var(--paper);
    font-weight: 900;
    box-shadow: 3px 3px 0 var(--navy);
  }

  .site-a { top: 40px; right: 46px; }
  .site-b { top: 125px; left: 44%; }
  .site-c { right: 24px; bottom: 19px; }
  .mini-cut { position: absolute; top: 81px; left: 61%; color: var(--orange); font-size: 2rem; font-weight: 900; }
  .dossier-paper > p { width: 72%; margin: 0; font-family: Georgia, serif; font-size: 1.1rem; line-height: 1.5; }

  .stamp {
    position: absolute;
    right: 20px;
    bottom: 18px;
    display: grid;
    width: 90px;
    height: 90px;
    place-items: center;
    border: 4px double var(--orange);
    border-radius: 50%;
    color: var(--orange);
    font-size: 0.68rem;
    font-weight: 950;
    line-height: 1.1;
    text-align: center;
    transform: rotate(-13deg);
  }

  .vocabulary {
    display: grid;
    grid-template-columns: minmax(190px, 0.5fr) minmax(0, 1.5fr);
    gap: 36px;
    border-top: 1px solid var(--ink);
    padding-top: 30px;
  }

  .vocabulary h2 { margin: 7px 0 0; font-family: Georgia, serif; font-size: 1.8rem; font-weight: 500; }
  .vocabulary dl { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 0; }
  .vocabulary dl div { border-top: 4px solid var(--cyan); padding-top: 12px; }
  .vocabulary dt { font-weight: 900; }
  .vocabulary dd { margin: 5px 0 0; color: var(--ink-soft); font-size: 0.78rem; line-height: 1.5; }

  .activity-mast,
  .feedback-mast { justify-content: space-between; }
  .brand-lockup { display: flex; min-width: 0; align-items: center; gap: 10px; }
  .progress-copy { display: grid; min-width: 0; text-align: center; }
  .progress-copy span { color: var(--ink-soft); font-size: 0.65rem; text-transform: uppercase; }
  .progress-copy strong { font-family: Georgia, serif; font-size: 1.1rem; }
  .progress-dots { display: flex; gap: 7px; }
  .progress-dots > span { width: 27px; height: 7px; border: 1px solid var(--ink); background: transparent; }
  .progress-dots > span.done { background: var(--green); }
  .progress-dots > span.current { border-width: 2px; background: var(--orange); }

  .activity-title-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(190px, 0.32fr);
    gap: 30px;
    align-items: end;
    padding: 44px 0 30px;
  }

  .activity-title-row h1,
  .retry-banner h1,
  .feedback-copy h1,
  .correct-copy h1 {
    margin: 8px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.15rem, 4.6vw, 4.5rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1.02;
  }

  .service-time { display: grid; border-left: 4px solid var(--orange); padding: 11px 0 11px 15px; }
  .service-time span { color: var(--ink-soft); font-size: 0.65rem; text-transform: uppercase; }
  .service-time strong { margin-top: 3px; font-size: 0.82rem; }

  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 0.96fr) minmax(350px, 0.84fr);
    gap: 20px;
    align-items: start;
  }

  .source-column,
  .decision-column { min-width: 0; }
  .source-column { display: grid; gap: 13px; }

  .brief-card,
  .map-card,
  .route-register,
  .decision-column {
    border: 1px solid var(--line);
    background: var(--paper);
  }

  .brief-card { display: grid; grid-template-columns: minmax(140px, 0.35fr) minmax(0, 1fr) auto; gap: 17px; align-items: center; padding: 16px; }
  .brief-card p { margin: 0; color: var(--ink-soft); font-size: 0.82rem; }
  .brief-card > strong { font-size: 0.72rem; }
  .card-label { display: flex; align-items: center; gap: 8px; }
  .card-label span { display: grid; width: 27px; height: 27px; place-items: center; border: 1px solid currentColor; border-radius: 50%; font-size: 0.62rem; }

  .map-card { padding: 18px; }
  .card-heading { display: flex; justify-content: space-between; gap: 16px; align-items: end; }
  .card-heading h2 { margin: 5px 0 0; font-family: Georgia, serif; font-size: 1.55rem; font-weight: 500; }
  .not-scale { flex: 0 0 auto; color: var(--ink-soft); font-size: 0.58rem; font-weight: 800; text-transform: uppercase; }
  .territory-map { display: block; width: 100%; height: auto; margin-top: 14px; border-radius: 12px; }
  .map-ground { fill: #e1e9e2; }
  .contour { fill: none; stroke: #91aaa1; stroke-width: 1.5; opacity: 0.65; }
  .open-route { fill: none; stroke: var(--navy); stroke-width: 7; }
  .local-route { fill: none; stroke: #6b736f; stroke-width: 4; stroke-dasharray: 9 8; }
  .origin-dot { fill: var(--orange); stroke: var(--paper); stroke-width: 4; }
  .origin-text, .map-note, .side-note { fill: var(--ink); font-family: ui-monospace, monospace; font-size: 12px; font-weight: 900; }
  .river { fill: none; stroke: #5fa5c5; stroke-width: 28; opacity: 0.9; }
  .closed-link { stroke: var(--orange); stroke-width: 8; stroke-dasharray: 8 6; }
  .barrier-mark { fill: var(--orange); font-family: ui-monospace, monospace; font-size: 24px; font-weight: 900; }
  .boundary { fill: none; stroke: var(--orange); stroke-width: 5; stroke-dasharray: 13 10; }
  .side-note { fill: var(--orange); font-size: 10px; }
  .shore { fill: #82bed0; opacity: 0.67; }
  .restricted-zone { fill: rgba(200, 69, 47, 0.13); stroke: var(--orange); stroke-width: 4; stroke-dasharray: 12 8; opacity: 0.9; }
  .candidate-pin circle { fill: var(--paper); stroke: var(--navy); stroke-width: 4; }
  .candidate-pin text { fill: var(--navy); font-family: ui-sans-serif, sans-serif; font-size: 17px; font-weight: 900; }
  .map-summary { display: flex; gap: 8px; margin: 12px 0 0; color: var(--ink-soft); font-size: 0.76rem; line-height: 1.5; }
  .map-summary span { color: var(--blue); font-size: 1rem; }

  .barrier-strip { display: grid; grid-template-columns: 39px 1fr; gap: 10px; align-items: center; margin-top: 13px; padding: 11px; border: 1px solid var(--orange); background: var(--orange-pale); }
  .barrier-strip > span { display: grid; width: 36px; height: 36px; place-items: center; border-radius: 50%; color: var(--paper); background: var(--orange); font-weight: 900; }
  .barrier-strip strong { font-size: 0.8rem; }
  .barrier-strip p { margin: 2px 0 0; color: var(--ink-soft); font-size: 0.72rem; }

  .route-register { padding: 17px; }
  .route-list { display: grid; gap: 1px; margin-top: 13px; background: var(--line); }
  .route-list > div { display: grid; grid-template-columns: 45px minmax(0, 1fr) auto; gap: 10px; align-items: center; min-width: 0; padding: 11px; background: #eff4ed; }
  .route-list > div.closed { background: #fae2d9; }
  .route-list > div.limited { background: #f4ead0; }
  .route-symbol { display: grid; min-height: 36px; place-items: center; border: 1px solid var(--ink); font-family: ui-monospace, monospace; font-size: 0.68rem; font-weight: 900; }
  .route-list p { display: grid; margin: 0; }
  .route-list p strong { font-size: 0.76rem; }
  .route-list p small { color: var(--ink-soft); font-size: 0.66rem; }
  .route-list > div > b { font-size: 0.62rem; letter-spacing: 0.04em; }

  .decision-column { position: sticky; top: 14px; padding: 20px; box-shadow: 7px 7px 0 var(--navy); }
  .decision-head { border-bottom: 1px solid var(--line); padding-bottom: 16px; }
  .decision-head h2, .evidence-head h2 { margin: 5px 0 0; font-family: Georgia, serif; font-size: 1.65rem; font-weight: 500; }
  .decision-head > p:last-child, .evidence-head p { margin: 5px 0 0; color: var(--ink-soft); font-size: 0.73rem; }
  .candidate-choices { display: grid; gap: 9px; margin-top: 14px; }

  .candidate-choices button {
    position: relative;
    display: grid;
    width: 100%;
    min-width: 0;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 11px;
    border: 1px solid var(--line);
    padding: 12px;
    color: var(--ink);
    background: #f8f5ec;
    text-align: left;
    transition: border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
  }

  .candidate-choices button:hover { border-color: var(--navy); }
  .candidate-choices button.selected { border: 2px solid var(--navy); padding: 11px; background: #e4eff0; box-shadow: 3px 3px 0 var(--navy); transform: translate(-1px, -1px); }
  .candidate-marker { display: grid; width: 38px; height: 38px; place-items: center; border: 2px solid var(--navy); border-radius: 50%; background: var(--paper); font-weight: 900; }
  .candidate-copy { display: grid; min-width: 0; gap: 3px; padding-right: 76px; }
  .candidate-copy > strong { font-family: Georgia, serif; font-size: 1.06rem; }
  .candidate-copy small { color: var(--ink-soft); font-size: 0.65rem; line-height: 1.35; }
  .candidate-copy small b { color: var(--ink); }
  .choice-state { position: absolute; top: 14px; right: 10px; font-size: 0.61rem; font-weight: 900; text-transform: uppercase; }

  .evidence-head { display: flex; justify-content: space-between; gap: 14px; align-items: end; margin-top: 24px; }
  .evidence-head output { display: grid; min-width: 55px; height: 44px; place-items: center; border: 2px solid var(--navy); font-family: ui-monospace, monospace; font-weight: 900; }
  .evidence-choices { display: grid; gap: 7px; margin-top: 12px; }

  .evidence-choices button {
    display: grid;
    width: 100%;
    min-width: 0;
    grid-template-columns: 34px minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    border: 1px dashed #979286;
    padding: 9px;
    color: var(--ink);
    background: var(--paper);
    text-align: left;
  }

  .evidence-choices button.selected { border: 2px solid var(--green); padding: 8px; background: var(--green-pale); }
  .clip { display: grid; width: 32px; height: 32px; place-items: center; border: 1px solid var(--ink); border-radius: 50%; font-size: 0.65rem; font-weight: 900; }
  .evidence-choices button > span:nth-child(2) { display: grid; min-width: 0; }
  .evidence-choices small { color: var(--blue); font-size: 0.57rem; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
  .evidence-choices strong { font-size: 0.69rem; line-height: 1.35; }
  .evidence-choices button > b { font-size: 0.6rem; text-transform: uppercase; }

  .recommendation-preview { display: grid; margin-top: 16px; border-left: 4px solid var(--cyan); padding: 10px 12px; background: #edf2f0; }
  .recommendation-preview span { color: var(--ink-soft); font-size: 0.58rem; font-weight: 900; text-transform: uppercase; }
  .recommendation-preview strong { margin-top: 2px; font-family: Georgia, serif; }
  .recommendation-preview p { margin: 1px 0 0; color: var(--ink-soft); font-size: 0.68rem; }
  .form-hint { display: flex; gap: 8px; margin: 13px 0 0; color: #8e2d1e; font-size: 0.74rem; font-weight: 800; }
  .form-hint span { display: grid; width: 23px; height: 23px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: white; background: var(--orange); }

  .submit-button {
    display: grid;
    width: 100%;
    min-height: 67px;
    grid-template-columns: minmax(0, 1fr) auto;
    margin-top: 15px;
    padding: 12px 15px;
    color: var(--paper);
    background: var(--navy);
    box-shadow: 4px 4px 0 var(--cyan);
    text-align: left;
  }
  .submit-button span { font-weight: 900; }
  .submit-button small { color: #c8d6e7; font-size: 0.64rem; }
  .submit-button b { grid-row: 1 / 3; grid-column: 2; align-self: center; font-size: 1.5rem; }

  .retry-banner { display: grid; grid-template-columns: 68px minmax(0, 1fr); gap: 18px; align-items: center; margin: 38px 0 14px; border: 1px solid var(--orange); padding: 22px; background: var(--orange-pale); }
  .retry-symbol { display: grid; width: 64px; height: 64px; place-items: center; border-radius: 50%; color: var(--paper); background: var(--orange); font-size: 1.8rem; }
  .retry-banner h1 { font-size: clamp(1.9rem, 4vw, 3.3rem); }
  .retry-banner p:last-child { max-width: 760px; margin: 8px 0 0; color: var(--ink-soft); }
  .previous-response { display: grid; grid-template-columns: auto auto minmax(0, 1fr); gap: 14px; align-items: center; margin-bottom: 20px; border: 1px dashed var(--ink); padding: 12px; background: rgba(255,255,255,0.44); }
  .previous-response span { font-size: 0.62rem; font-weight: 900; text-transform: uppercase; }
  .previous-response strong { font-family: Georgia, serif; }
  .previous-response p { margin: 0; color: var(--ink-soft); font-size: 0.7rem; }

  .feedback-screen { padding-bottom: 72px; }
  .feedback-mast { margin-bottom: clamp(38px, 7vw, 76px); }
  .outcome-label { display: flex; align-items: center; gap: 8px; border: 2px solid currentColor; padding: 8px 12px; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
  .outcome-label span { display: grid; width: 25px; height: 25px; place-items: center; border-radius: 50%; color: var(--paper); }
  .error-label { color: var(--orange); }
  .error-label span { background: var(--orange); }
  .success-label { color: var(--green); }
  .success-label span { background: var(--green); }

  .feedback-layout,
  .correct-grid { display: grid; grid-template-columns: minmax(300px, 0.7fr) minmax(0, 1.3fr); gap: clamp(32px, 7vw, 90px); align-items: center; }
  .submitted-note,
  .approved-note { position: relative; min-width: 0; border: 1px solid var(--ink); padding: clamp(24px, 4vw, 42px); background: var(--paper); box-shadow: 12px 13px 0 var(--navy); transform: rotate(-1deg); }
  .paper-clip { position: absolute; top: -16px; right: 30px; width: 21px; height: 52px; border: 4px solid #6d7480; border-bottom: 0; border-radius: 11px 11px 0 0; }
  .submitted-note h2,
  .approved-note h2 { margin: 10px 0 20px; font-family: Georgia, serif; font-size: clamp(2.1rem, 4vw, 3.8rem); font-weight: 500; line-height: 1; }
  .submitted-facts,
  .approved-facts { display: grid; gap: 9px; }
  .submitted-facts > div,
  .approved-facts > div { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 9px; border-top: 1px dashed var(--line); padding-top: 10px; }
  .submitted-facts > div > span,
  .approved-facts > div > span { display: grid; width: 28px; height: 28px; place-items: center; border-radius: 50%; color: var(--paper); background: var(--navy); font-size: 0.68rem; font-weight: 900; }
  .submitted-facts p,
  .approved-facts p { display: grid; margin: 0; font-size: 0.75rem; }
  .submitted-facts small,
  .approved-facts small { color: var(--blue); font-size: 0.58rem; font-weight: 900; text-transform: uppercase; }
  .kept-note { margin: 22px 0 0; border-left: 3px solid var(--orange); padding-left: 10px; color: var(--ink-soft); font-size: 0.7rem; }

  .feedback-copy,
  .correct-copy { min-width: 0; }
  .feedback-detail { max-width: 720px; margin: 22px 0 0; color: var(--ink-soft); font-size: clamp(1rem, 2vw, 1.14rem); line-height: 1.7; }
  .relationship-check { margin-top: 28px; border: 1px solid var(--line); padding: 17px; background: var(--paper); }
  .relationship-check > span { color: var(--ink-soft); font-size: 0.62rem; font-weight: 900; text-transform: uppercase; }
  .relationship-check > div { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 9px; }
  .relationship-check b { border: 1px solid var(--navy); padding: 7px 9px; font-size: 0.72rem; }
  .relationship-check i { color: var(--orange); font-style: normal; }
  .next-clue { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 12px; align-items: center; margin: 14px 0 27px; padding: 14px; background: var(--orange-pale); }
  .next-clue > span { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 50%; color: var(--paper); background: var(--orange); }
  .next-clue p { display: grid; margin: 0; color: var(--ink-soft); font-size: 0.77rem; }
  .next-clue strong { color: var(--ink); }

  .approved-note { overflow: hidden; box-shadow: 12px 13px 0 var(--green); }
  .approval-stamp { position: absolute; top: 22px; right: -15px; display: grid; width: 100px; height: 100px; place-items: center; border: 4px double var(--green); border-radius: 50%; color: var(--green); font-size: 0.62rem; font-weight: 900; line-height: 1.1; text-align: center; transform: rotate(13deg); }
  .approved-facts > div > span { background: var(--green); }
  .evidence-interpretation { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 13px; align-items: center; margin-top: 27px; }
  .evidence-interpretation > div { min-height: 110px; border: 1px solid var(--line); padding: 15px; background: var(--paper); }
  .evidence-interpretation span { color: var(--blue); font-size: 0.65rem; font-weight: 900; text-transform: uppercase; }
  .evidence-interpretation p { margin: 7px 0 0; color: var(--ink-soft); font-size: 0.76rem; }
  .evidence-interpretation > i { color: var(--green); font-size: 1.5rem; font-style: normal; }

  .continuation-panel { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-top: clamp(42px, 7vw, 76px); border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); padding: 20px 0; }
  .continuation-panel > div { display: grid; }
  .continuation-panel span { color: var(--ink-soft); font-size: 0.65rem; text-transform: uppercase; }
  .continuation-panel strong { margin-top: 3px; font-family: Georgia, serif; font-size: 1.1rem; }

  .completion-copy h1 { max-width: 780px; font-size: clamp(3.1rem, 7vw, 6.2rem); line-height: 0.92; }
  .strategy-summary { max-width: 700px; margin: 30px 0; border: 1px solid var(--ink); padding: 20px; background: var(--paper); box-shadow: 6px 6px 0 var(--cyan); }
  .strategy-summary > span { color: var(--blue); font-size: 0.65rem; font-weight: 900; text-transform: uppercase; }
  .strategy-summary ol { display: grid; gap: 9px; margin: 14px 0 0; padding: 0; list-style: none; }
  .strategy-summary li { display: flex; align-items: center; gap: 10px; font-size: 0.82rem; }
  .strategy-summary li b { display: grid; width: 28px; height: 28px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: var(--paper); background: var(--navy); font-size: 0.67rem; }

  .archive { display: grid; grid-template-columns: 74px minmax(0, 1fr); min-width: 0; border: 1px solid var(--ink); background: var(--paper); box-shadow: 14px 15px 0 var(--navy); }
  .archive-spine { display: flex; min-height: 470px; flex-direction: column; justify-content: space-between; align-items: center; padding: 19px 0; color: var(--paper); background: var(--navy); writing-mode: vertical-rl; transform: rotate(180deg); }
  .archive-spine span { font-size: 0.65rem; letter-spacing: 0.18em; }
  .archive-spine b { font-family: Georgia, serif; font-size: 1.1rem; }
  .archive-files { display: grid; align-content: center; gap: 12px; padding: 24px; }
  .archive-files > div { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 11px; border-bottom: 1px dashed var(--line); padding-bottom: 12px; }
  .archive-files > div > span { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 50%; color: var(--paper); background: var(--green); font-weight: 900; }
  .archive-files p { display: grid; margin: 0; }
  .archive-files small { color: var(--ink-soft); font-size: 0.58rem; }
  .archive-files strong { font-family: Georgia, serif; }
  .archive-files b { color: var(--green); font-size: 0.57rem; letter-spacing: 0.06em; }
  .archive blockquote { grid-column: 1 / -1; margin: 0; border-top: 1px solid var(--line); padding: 20px; color: var(--ink-soft); font-family: Georgia, serif; font-size: 1rem; line-height: 1.55; }

  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    clip-path: inset(50%) !important;
  }

  @media (max-width: 900px) {
    .intro-grid,
    .completion-grid { grid-template-columns: 1fr; }
    .intro-dossier,
    .archive { width: min(560px, 100%); margin: 0 auto; }
    .workspace { grid-template-columns: 1fr; }
    .decision-column { position: static; }
    .feedback-layout,
    .correct-grid { grid-template-columns: 1fr; }
    .submitted-note,
    .approved-note { width: min(580px, 96%); margin: 0 auto; }
  }

  @media (max-width: 720px) {
    .intro,
    .activity,
    .feedback-screen,
    .completion { padding-right: 16px; padding-left: 16px; }
    .intro-grid,
    .completion-grid { gap: 45px; padding-top: 48px; }
    .vocabulary { grid-template-columns: 1fr; gap: 20px; }
    .vocabulary dl { grid-template-columns: 1fr 1fr; }
    .activity-title-row { grid-template-columns: 1fr; gap: 15px; padding-top: 32px; }
    .service-time { max-width: 310px; }
    .brief-card { grid-template-columns: 1fr; gap: 8px; }
    .brief-card > strong { justify-self: start; }
    .previous-response { grid-template-columns: 1fr; gap: 5px; }
    .continuation-panel { align-items: stretch; flex-direction: column; }
    .continuation-panel .primary { width: 100%; }
  }

  @media (max-width: 480px) {
    .prototype-root { min-height: calc(100vh - 42px); }
    .intro,
    .activity,
    .feedback-screen,
    .completion { padding: 14px 12px 44px; }
    .intro-mast,
    .activity-mast,
    .feedback-mast { align-items: flex-start; }
    .intro-mast > div span,
    .brand-lockup div span { display: none; }
    .agency-mark { width: 46px; height: 46px; }
    .case-chip { padding: 6px; }
    .intro-copy h1 { font-size: clamp(3.15rem, 18vw, 4.8rem); }
    .recipe { grid-template-columns: 1fr; }
    .primary { width: 100%; gap: 14px; }
    .intro-dossier { padding-left: 4px; }
    .dossier-paper { min-height: 405px; padding: 18px; box-shadow: 8px 9px 0 var(--navy); }
    .folder-tab { left: 18px; }
    .dossier-paper > p { width: 68%; font-size: 0.96rem; }
    .vocabulary dl { grid-template-columns: 1fr; }
    .progress-copy { text-align: right; }
    .progress-dots { display: none; }
    .activity-title-row h1,
    .feedback-copy h1,
    .correct-copy h1 { font-size: 2.25rem; }
    .map-card,
    .route-register,
    .decision-column { padding: 12px; }
    .not-scale { max-width: 70px; text-align: right; }
    .route-list > div { grid-template-columns: 38px minmax(0, 1fr); }
    .route-list > div > b { grid-column: 2; }
    .decision-column { box-shadow: 4px 4px 0 var(--navy); }
    .candidate-copy { padding-right: 0; }
    .choice-state { position: static; grid-column: 2; margin-top: 4px; }
    .evidence-choices button { grid-template-columns: 34px minmax(0, 1fr); }
    .evidence-choices button > b { grid-column: 2; }
    .retry-banner { grid-template-columns: 1fr; padding: 16px; }
    .retry-symbol { width: 50px; height: 50px; }
    .feedback-mast { margin-bottom: 36px; }
    .outcome-label { padding: 6px; font-size: 0.58rem; }
    .submitted-note,
    .approved-note { width: 100%; padding: 22px 18px; box-shadow: 6px 7px 0 var(--navy); }
    .approved-note { box-shadow: 6px 7px 0 var(--green); }
    .approval-stamp { position: static; width: 78px; height: 78px; margin: 0 0 15px auto; }
    .evidence-interpretation { grid-template-columns: 1fr; }
    .evidence-interpretation > i { transform: rotate(90deg); text-align: center; }
    .archive { grid-template-columns: 52px minmax(0, 1fr); box-shadow: 7px 8px 0 var(--navy); }
    .archive-files { padding: 15px 11px; }
    .archive-files > div { grid-template-columns: 38px minmax(0, 1fr); }
    .archive-files > div > span { width: 36px; height: 36px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
    }

    .intro-dossier,
    .submitted-note,
    .approved-note,
    .primary:hover,
    .candidate-choices button.selected { transform: none; }
  }
</style>
