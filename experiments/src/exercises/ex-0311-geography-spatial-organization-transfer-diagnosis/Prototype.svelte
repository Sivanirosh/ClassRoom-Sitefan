<script lang="ts">
  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type LegacyState = 'ready' | 'question' | 'incorrect' | 'correct' | 'complete';
  type View = 'before' | 'after' | 'delta';
  type AttemptKind = 'incorrect' | 'correct';
  type ErrorCode = 'CIBLE_DECALEE' | 'INDICE_SANS_ECART' | 'IMPACT_NON_RELIE' | 'LIEN_ETABLI';

  type Target = {
    id: string;
    kind: 'partie' | 'zone' | 'réseau';
    name: string;
    detail: string;
  };

  type Evidence = {
    id: string;
    source: string;
    text: string;
  };

  type Impact = {
    id: string;
    domain: 'ENVIRONNEMENT' | 'SOCIAL' | 'ÉCONOMIE';
    symbol: string;
    text: string;
  };

  type Variation = {
    id: string;
    fileCode: string;
    place: string;
    contexts: string;
    project: string;
    purpose: string;
    regionalLink: string;
    before: string[];
    after: string[];
    delta: string[];
    mapBefore: string[][];
    mapAfter: string[][];
    targets: Target[];
    evidence: Evidence[];
    impacts: Impact[];
    correct: { target: string; evidence: string; impact: string };
    plannedWrong: { target: string; evidence: string; impact: string };
    success: string;
    centralDelta: string;
  };

  type ResponseRecord = {
    variationId: string;
    targetId: string;
    evidenceId: string;
    impactId: string;
    code: ErrorCode;
    attempt: number;
    channel: 'detailed' | 'complete-statement';
  };

  const variations: Variation[] = [
    {
      id: 'clairmarais-filtres',
      fileCode: 'CM—24',
      place: 'Clairmarais',
      contexts: 'Habitat · Approvisionnement · Échanges',
      project: 'Ajouter une bande-jardin et un petit bassin entre la place des Ateliers et la zone humide des Joncs.',
      purpose: 'Ralentir l’eau boueuse avant son arrivée au bord des roseaux.',
      regionalLink: 'La route R2 relie toujours les trois serres à un centre régional de distribution situé à 16 km.',
      before: [
        'L’eau de la place suit un conduit direct vers les Joncs.',
        'La pluie-test du dossier produit 6 débordements boueux au bord des roseaux.',
        'Trois serres et leur voie R2 approvisionnent le centre régional.'
      ],
      after: [
        'L’eau traverse la bande-jardin puis le bassin avant les Joncs.',
        'La même pluie-test produit 2 débordements boueux au bord des roseaux.',
        'Les trois serres et leur voie R2 sont inchangées.'
      ],
      delta: [
        'Trajet de l’eau : direct → bande-jardin et bassin.',
        'Simulation identique : 6 → 2 débordements boueux.',
        'Serres et liaison régionale : aucune modification.'
      ],
      mapBefore: [
        ['Place des Ateliers', 'conduit direct', 'Zone humide des Joncs'],
        ['Serres', 'R2']
      ],
      mapAfter: [
        ['Place des Ateliers', 'bande-jardin + bassin', 'Zone humide des Joncs'],
        ['Serres', 'R2 stable']
      ],
      targets: [
        {
          id: 'serres-nord',
          kind: 'partie',
          name: 'Les trois serres du nord',
          detail: 'Elles restent reliées à R2 de la même manière dans les deux états.'
        },
        {
          id: 'zone-joncs',
          kind: 'zone',
          name: 'La zone humide des Joncs',
          detail: 'Le trajet et le nombre simulé de débordements changent à son bord.'
        },
        {
          id: 'reseau-r2',
          kind: 'réseau',
          name: 'Le réseau routier R2',
          detail: 'La liaison vers le centre régional est indiquée comme stable.'
        }
      ],
      evidence: [
        {
          id: 'cm-greenhouses-stable',
          source: 'Fiche des serres',
          text: 'Avant et après : 3 serres utilisent la même voie R2.'
        },
        {
          id: 'cm-water-delta',
          source: 'Simulation de la pluie-test',
          text: 'Le trajet direct passe par le bassin et les débordements boueux passent de 6 à 2.'
        },
        {
          id: 'cm-road-stable',
          source: 'Plan régional',
          text: 'R2 relie toujours Clairmarais au centre de distribution situé à 16 km.'
        }
      ],
      impacts: [
        {
          id: 'cm-economy-claim',
          domain: 'ÉCONOMIE',
          symbol: '▦',
          text: 'Les serres produiront davantage grâce à la route R2.'
        },
        {
          id: 'cm-environment',
          domain: 'ENVIRONNEMENT',
          symbol: '♧',
          text: 'La simulation prévoit moins de débordements boueux au bord des roseaux.'
        },
        {
          id: 'cm-social-claim',
          domain: 'SOCIAL',
          symbol: '●●',
          text: 'La population de Clairmarais augmentera après les travaux.'
        }
      ],
      correct: { target: 'zone-joncs', evidence: 'cm-water-delta', impact: 'cm-environment' },
      plannedWrong: { target: 'serres-nord', evidence: 'cm-greenhouses-stable', impact: 'cm-economy-claim' },
      success: 'La zone des Joncs est la cible cohérente : le même test compare son trajet d’eau et ses débordements avant et après. Cet écart soutient l’impact environnemental formulé par le dossier, sans garantir un effet dans un lieu réel.',
      centralDelta: 'Cherche l’élément dont une relation et une valeur changent ensemble : ici, le trajet vers les Joncs et le résultat de la même pluie-test.'
    },
    {
      id: 'rochers-passerelle',
      fileCode: 'RL—08',
      place: 'Roc-des-Lièvres',
      contexts: 'Habitat · Loisirs',
      project: 'Ajouter une passerelle piétonne au-dessus du canal entre le quartier des Rochers et la médiathèque–terrain de sport.',
      purpose: 'Relier deux parties du bourg sans imposer le détour par le pont routier.',
      regionalLink: 'La ligne de car C6 vers la ville régionale garde le même arrêt au sud du plan.',
      before: [
        'Le trajet à pied mesure 940 m par le pont routier.',
        'Ce trajet traverse deux fois la chaussée.',
        'Les 12 parcelles maraîchères et leur canal d’arrosage sont en place.'
      ],
      after: [
        'Le trajet à pied mesure 310 m par la passerelle.',
        'Ce trajet ne traverse aucune chaussée.',
        'Les 12 parcelles et leur canal d’arrosage sont inchangés.'
      ],
      delta: [
        'Même départ et même arrivée : 940 m → 310 m.',
        'Traversées de chaussée : 2 → 0.',
        'Parcelles, canal et arrêt C6 : aucune modification.'
      ],
      mapBefore: [
        ['Quartier des Rochers', 'pont routier · 940 m', 'Médiathèque + sport'],
        ['Jardins', 'canal']
      ],
      mapAfter: [
        ['Quartier des Rochers', 'passerelle · 310 m', 'Médiathèque + sport'],
        ['Jardins', 'canal stable']
      ],
      targets: [
        {
          id: 'maraichage-est',
          kind: 'zone',
          name: 'La zone des jardins à l’est',
          detail: 'Les 12 parcelles et le canal sont identiques avant et après.'
        },
        {
          id: 'reseau-pieton',
          kind: 'réseau',
          name: 'Le réseau des chemins piétons',
          detail: 'Une nouvelle liaison change le trajet entre le quartier et les équipements.'
        },
        {
          id: 'arret-c6',
          kind: 'partie',
          name: 'L’arrêt régional C6',
          detail: 'Il reste au sud et n’est pas déplacé par le projet.'
        }
      ],
      evidence: [
        {
          id: 'rl-gardens-stable',
          source: 'Registre des jardins',
          text: 'Avant et après : 12 parcelles utilisent le même canal d’arrosage.'
        },
        {
          id: 'rl-bus-stable',
          source: 'Plan des transports',
          text: 'L’arrêt C6 reste au même endroit au sud du plan.'
        },
        {
          id: 'rl-route-delta',
          source: 'Comparatif des itinéraires',
          text: 'Entre les mêmes points : 940 m et 2 traversées deviennent 310 m et 0 traversée.'
        }
      ],
      impacts: [
        {
          id: 'rl-environment-claim',
          domain: 'ENVIRONNEMENT',
          symbol: '♧',
          text: 'Le canal d’arrosage utilisera moins d’eau.'
        },
        {
          id: 'rl-economic-claim',
          domain: 'ÉCONOMIE',
          symbol: '▦',
          text: 'Les commerces du quartier vendront davantage.'
        },
        {
          id: 'rl-social',
          domain: 'SOCIAL',
          symbol: '●●',
          text: 'Le dossier montre un trajet plus direct vers la médiathèque et le terrain de sport.'
        }
      ],
      correct: { target: 'reseau-pieton', evidence: 'rl-route-delta', impact: 'rl-social' },
      plannedWrong: { target: 'maraichage-est', evidence: 'rl-gardens-stable', impact: 'rl-environment-claim' },
      success: 'Le réseau piéton est bien l’organisation modifiée : le comparatif porte sur le même départ et la même arrivée. La distance et les traversées soutiennent un impact social sur l’accès aux équipements, sans mesurer leur fréquentation future.',
      centralDelta: 'Suis la liaison entre les mêmes deux points. Le réseau change ; les jardins, le canal et l’arrêt régional restent stables.'
    },
    {
      id: 'mures-quai',
      fileCode: 'PM—31',
      place: 'Port-aux-Mûres',
      contexts: 'Approvisionnement · Échanges',
      project: 'Créer une cour de déchargement partagée à l’arrière des halles, reliée à la route régionale R8.',
      purpose: 'Augmenter les créneaux d’approvisionnement disponibles à l’arrière des halles.',
      regionalLink: 'Les livraisons partent d’un dépôt régional et arrivent toujours par R8.',
      before: [
        'L’arrière des halles ne comporte ni quai ni sortie dédiée.',
        'La fiche logistique offre 4 créneaux de livraison.',
        'Le coteau compte 28 logements et la route R8 dessert déjà les halles.'
      ],
      after: [
        'L’arrière des halles possède un quai partagé et une sortie vers R8.',
        'La même fiche logistique offre 8 créneaux de livraison.',
        'Le coteau compte toujours 28 logements et le tracé de R8 est inchangé.'
      ],
      delta: [
        'Arrière des halles : aucun quai → quai et sortie partagés.',
        'Créneaux de livraison : 4 → 8.',
        'Logements du coteau : 28 → 28.'
      ],
      mapBefore: [
        ['R8', 'Halles', 'Arrière sans quai'],
        ['Coteau · 28 logements']
      ],
      mapAfter: [
        ['R8 · tracé stable', 'Halles', 'Arrière · quai + sortie'],
        ['Coteau · 28 logements']
      ],
      targets: [
        {
          id: 'logements-coteau',
          kind: 'zone',
          name: 'La zone de logements du coteau',
          detail: 'Le dossier conserve les mêmes 28 logements.'
        },
        {
          id: 'route-r8',
          kind: 'réseau',
          name: 'Le réseau routier R8',
          detail: 'R8 dessert déjà les halles et son tracé reste identique dans les deux états.'
        },
        {
          id: 'arriere-halles',
          kind: 'partie',
          name: 'La partie arrière des halles',
          detail: 'Le quai, la sortie et les créneaux apparaissent dans cette partie.'
        }
      ],
      evidence: [
        {
          id: 'pm-homes-stable',
          source: 'Fiche habitat',
          text: 'Avant et après : le coteau compte 28 logements.'
        },
        {
          id: 'pm-road-stable',
          source: 'Plan régional',
          text: 'R8 relie le dépôt régional aux halles par le même tracé dans les deux états.'
        },
        {
          id: 'pm-slots-delta',
          source: 'Fiche logistique',
          text: 'Un quai partagé apparaît et les créneaux de livraison passent de 4 à 8.'
        }
      ],
      impacts: [
        {
          id: 'pm-social-claim',
          domain: 'SOCIAL',
          symbol: '●●',
          text: 'De nouveaux logements seront construits sur le coteau.'
        },
        {
          id: 'pm-economic',
          domain: 'ÉCONOMIE',
          symbol: '▦',
          text: 'La fiche rend davantage de créneaux d’approvisionnement disponibles pour les étals.'
        },
        {
          id: 'pm-environment-claim',
          domain: 'ENVIRONNEMENT',
          symbol: '♧',
          text: 'La qualité de l’air de toute la région sera améliorée.'
        }
      ],
      correct: { target: 'arriere-halles', evidence: 'pm-slots-delta', impact: 'pm-economic' },
      plannedWrong: { target: 'logements-coteau', evidence: 'pm-homes-stable', impact: 'pm-social-claim' },
      success: 'La partie arrière des halles reçoit le quai et la sortie. La même fiche indique 4 puis 8 créneaux : cet écart soutient l’impact économique limité à la disponibilité d’approvisionnement, sans prédire les revenus ou les prix.',
      centralDelta: 'Repère la partie où l’objet et la valeur changent ensemble : le quai apparaît derrière les halles et les créneaux passent de 4 à 8.'
    }
  ];

  let phase: Phase = 'intro';
  let legacyState: LegacyState = 'ready';
  let currentIndex = 0;
  let currentVariation: Variation = variations[0];
  let view: View = 'before';
  let selectedTarget: string | null = null;
  let selectedEvidence: string | null = null;
  let selectedImpact: string | null = null;
  let selectionComplete = false;
  let responsePath: ResponseRecord[] = [];
  let currentCode: ErrorCode | null = null;
  let lastSubmitted: ResponseRecord | null = null;
  let announcement = '';
  let stateHeading: HTMLElement;

  $: currentVariation = variations[currentIndex];
  $: legacyState = phase === 'intro'
    ? 'ready'
    : phase === 'active' || phase === 'retry'
      ? 'question'
      : phase;
  $: selectionComplete = Boolean(selectedTarget && selectedEvidence && selectedImpact);

  function focusStateSoon(): void {
    setTimeout(() => stateHeading?.focus(), 0);
  }

  function targetFor(id: string | null | undefined): Target | undefined {
    return currentVariation.targets.find((item) => item.id === id);
  }

  function evidenceFor(id: string | null | undefined): Evidence | undefined {
    return currentVariation.evidence.find((item) => item.id === id);
  }

  function impactFor(id: string | null | undefined): Impact | undefined {
    return currentVariation.impacts.find((item) => item.id === id);
  }

  function clearSelections(): void {
    selectedTarget = null;
    selectedEvidence = null;
    selectedImpact = null;
  }

  function start(): void {
    currentIndex = 0;
    view = 'before';
    clearSelections();
    responsePath = [];
    currentCode = null;
    lastSubmitted = null;
    phase = 'active';
    announcement = `Dossier ${variations[0].fileCode} ouvert : ${variations[0].place}.`;
    focusStateSoon();
  }

  function chooseTarget(id: string): void {
    selectedTarget = id;
    announcement = `${targetFor(id)?.name ?? 'Cible'} choisie comme organisation principalement touchée.`;
  }

  function chooseEvidence(id: string): void {
    selectedEvidence = id;
    announcement = `Indice choisi : ${evidenceFor(id)?.text ?? ''}`;
  }

  function chooseImpact(id: string): void {
    selectedImpact = id;
    announcement = `Conséquence choisie dans le domaine ${impactFor(id)?.domain ?? ''}.`;
  }

  function diagnose(targetId: string, evidenceId: string, impactId: string): ErrorCode {
    if (targetId !== currentVariation.correct.target) return 'CIBLE_DECALEE';
    if (evidenceId !== currentVariation.correct.evidence) return 'INDICE_SANS_ECART';
    if (impactId !== currentVariation.correct.impact) return 'IMPACT_NON_RELIE';
    return 'LIEN_ETABLI';
  }

  function commitDiagnosis(
    targetId: string,
    evidenceId: string,
    impactId: string,
    channel: ResponseRecord['channel']
  ): void {
    const code = diagnose(targetId, evidenceId, impactId);
    const attempt = responsePath.filter((record) => record.variationId === currentVariation.id).length + 1;
    const record: ResponseRecord = {
      variationId: currentVariation.id,
      targetId,
      evidenceId,
      impactId,
      code,
      attempt,
      channel
    };

    selectedTarget = targetId;
    selectedEvidence = evidenceId;
    selectedImpact = impactId;
    currentCode = code;
    responsePath = [...responsePath, record];
    lastSubmitted = record;
    phase = code === 'LIEN_ETABLI' ? 'correct' : 'incorrect';
    announcement = code === 'LIEN_ETABLI'
      ? `Constat cohérent pour ${currentVariation.place}.`
      : `Le constat reste à revoir pour ${currentVariation.place}.`;
    focusStateSoon();
  }

  function submitDetailed(): void {
    if (!selectedTarget || !selectedEvidence || !selectedImpact) return;
    commitDiagnosis(selectedTarget, selectedEvidence, selectedImpact, 'detailed');
  }

  function submitComplete(kind: AttemptKind): void {
    const answer = kind === 'correct' ? currentVariation.correct : currentVariation.plannedWrong;
    commitDiagnosis(answer.target, answer.evidence, answer.impact, 'complete-statement');
  }

  function retry(): void {
    clearSelections();
    view = 'delta';
    phase = 'retry';
    announcement = `Reprise du dossier ${currentVariation.fileCode}. Le dernier constat reste résumé.`;
    focusStateSoon();
  }

  function continueLoop(): void {
    if (currentIndex === variations.length - 1) {
      phase = 'complete';
      announcement = 'Les trois expertises sont terminées. Aucune réponse n’a été enregistrée ni envoyée.';
      focusStateSoon();
      return;
    }

    currentIndex += 1;
    view = 'before';
    clearSelections();
    currentCode = null;
    lastSubmitted = null;
    phase = 'active';
    announcement = `Nouveau dossier : ${variations[currentIndex].place}.`;
    focusStateSoon();
  }

  function restart(): void {
    currentIndex = 0;
    view = 'before';
    clearSelections();
    responsePath = [];
    currentCode = null;
    lastSubmitted = null;
    phase = 'intro';
    announcement = 'Retour à l’accueil du révélateur territorial.';
    focusStateSoon();
  }

  function attemptForTarget(id: string): AttemptKind | undefined {
    if (id === currentVariation.plannedWrong.target) return 'incorrect';
    if (id === currentVariation.correct.target) return 'correct';
    return undefined;
  }

  function attemptForEvidence(id: string): AttemptKind | undefined {
    if (id === currentVariation.plannedWrong.evidence) return 'incorrect';
    if (id === currentVariation.correct.evidence) return 'correct';
    return undefined;
  }

  function attemptForImpact(id: string): AttemptKind | undefined {
    if (id === currentVariation.plannedWrong.impact) return 'incorrect';
    if (id === currentVariation.correct.impact) return 'correct';
    return undefined;
  }

  function incorrectHeading(): string {
    if (currentCode === 'CIBLE_DECALEE') return 'Le constat vise une organisation restée stable.';
    if (currentCode === 'INDICE_SANS_ECART') return 'L’indice ne compare pas encore le changement.';
    return 'La conséquence dépasse ce que montre l’indice.';
  }

  function incorrectDetail(): string {
    if (!lastSubmitted) return 'Le constat ne peut pas encore être expliqué.';
    if (currentCode === 'CIBLE_DECALEE') {
      return `Tu as ciblé « ${targetFor(lastSubmitted.targetId)?.name} ». Or le dossier décrit cette organisation comme stable ou secondaire. Cherche l’unité dont une relation ou une valeur change entre Avant et Après.`;
    }
    if (currentCode === 'INDICE_SANS_ECART') {
      return `L’indice « ${evidenceFor(lastSubmitted.evidenceId)?.text} » est un fait du dossier, mais il ne compare pas le changement de la cible choisie. Un impact a besoin d’un écart portant sur le même élément.`;
    }
    return `La proposition « ${impactFor(lastSubmitted.impactId)?.text} » n’est pas soutenue par l’écart choisi. Relie la conséquence directe au milieu, aux personnes ou à l’activité réellement décrite.`;
  }

  function scaffoldText(): string {
    if (currentCode === 'CIBLE_DECALEE') {
      return `Repère la ligne qui change dans les deux colonnes. ${currentVariation.centralDelta}`;
    }
    if (currentCode === 'INDICE_SANS_ECART') {
      return 'Cherche une carte qui contient deux états du même élément : deux valeurs, deux trajets ou l’absence puis la présence du même aménagement.';
    }
    return 'Termine cette phrase sans ajouter de fait : « Cet écart change directement… ». Choisis le domaine nommé par la fin de ta phrase.';
  }

  function viewTitle(): string {
    if (view === 'before') return 'État avant le projet';
    if (view === 'after') return 'État après le projet';
    return 'Écarts à expliquer';
  }

  function viewItems(): string[] {
    if (view === 'before') return currentVariation.before;
    if (view === 'after') return currentVariation.after;
    return currentVariation.delta;
  }

  function mapGroups(): string[][] {
    return view === 'before' ? currentVariation.mapBefore : currentVariation.mapAfter;
  }

  function mapLabel(): string {
    return mapGroups()
      .map((group) => group.join(' relié à '))
      .join('. Ensemble séparé : ');
  }

  function completeStatement(answer: Variation['correct']): string {
    return `${targetFor(answer.target)?.name} · ${evidenceFor(answer.evidence)?.text} · ${impactFor(answer.impact)?.domain} : ${impactFor(answer.impact)?.text}`;
  }
</script>

<svelte:head>
  <title>Le révélateur territorial · EX-0311</title>
  <meta
    name="description"
    content="Comparer un territoire fictif avant et après un aménagement, puis relier une cible, un écart et un impact."
  />
</svelte:head>

<div
  class="generic-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0311"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0311">
    <p class="sr-only" aria-live="polite">{announcement}</p>

    <header class="masthead">
      <div class="mark" aria-hidden="true">R<span>Δ</span></div>
      <div>
        <small>Géographie · cellule d’expertise</small>
        <strong>Le révélateur territorial</strong>
      </div>
      {#if phase !== 'intro' && phase !== 'complete'}
        <p><span>dossier</span> {currentIndex + 1} / {variations.length}</p>
      {/if}
    </header>

    {#if phase === 'intro'}
      <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
        <div class="intro-copy">
          <p class="eyebrow">Trois territoires fictifs · aucune note</p>
          <h1 id="intro-title" bind:this={stateHeading} tabindex="-1">
            Avant / après : quel lien tient vraiment&nbsp;?
          </h1>
          <p class="lead">
            Un aménagement change une organisation. Compare les deux états, puis relie
            <strong>une cible spatiale</strong>, <strong>un indice d’écart</strong> et
            <strong>un impact</strong> que le dossier permet d’appuyer.
          </p>

          <div class="method" aria-label="Méthode cible, écart, impact">
            <div><span>1</span><strong>Cible</strong><small>partie, zone ou réseau touché</small></div>
            <div><span>2</span><strong>Écart</strong><small>même élément, avant et après</small></div>
            <div><span>3</span><strong>Impact</strong><small>conséquence soutenue par l’écart</small></div>
          </div>

          <dl class="vocabulary">
            <div><dt>Partie</dt><dd>un morceau précis d’un lieu</dd></div>
            <div><dt>Zone</dt><dd>une surface délimitée par un usage ou une caractéristique</dd></div>
            <div><dt>Réseau</dt><dd>des lieux reliés par des chemins ou des flux</dd></div>
            <div><dt>Impact</dt><dd>une conséquence sur un milieu, des personnes ou une activité</dd></div>
          </dl>

          <button type="button" class="primary" data-smoke-action="start" onclick={start}>
            Ouvrir le premier dossier <span aria-hidden="true">→</span>
          </button>
          <p class="privacy"><span aria-hidden="true">○</span> Rien n’est enregistré ni envoyé.</p>
        </div>

        <aside class="intro-visual" aria-label="Aperçu d’une comparaison avant après">
          <span class="folder-tab">DOSSIER TERRITOIRE</span>
          <div><b>AVANT</b><p>parties · liaisons · valeur</p></div>
          <i aria-hidden="true">→</i>
          <div><b>APRÈS</b><p>même lieu · une relation change</p></div>
          <strong>Δ chercher l’écart utile</strong>
        </aside>
      </section>
    {:else if phase === 'active' || phase === 'retry'}
      <section
        class="workspace"
        data-smoke-state={phase}
        data-smoke-variation={currentVariation.id}
        aria-labelledby="workspace-title"
      >
        <header class="case-header">
          <div>
            <p class="eyebrow">{currentVariation.fileCode} · {currentVariation.contexts}</p>
            <h1 id="workspace-title" bind:this={stateHeading} tabindex="-1">{currentVariation.place}</h1>
          </div>
          <span class="case-number" aria-hidden="true">0{currentIndex + 1}</span>
        </header>

        <div class="project-brief">
          <div><small>Projet</small><p>{currentVariation.project}</p></div>
          <div><small>But annoncé</small><p>{currentVariation.purpose}</p></div>
          <p class="regional-link"><span aria-hidden="true">⌖</span>{currentVariation.regionalLink}</p>
        </div>

        {#if phase === 'retry'}
          <aside class="scaffold" role="status" aria-labelledby="retry-title">
            <span aria-hidden="true">↺</span>
            <div>
              <p class="eyebrow">Reprise guidée</p>
              <h2 id="retry-title">Garde la même cible du début à la fin du constat.</h2>
              <p>{scaffoldText()}</p>
              {#if lastSubmitted}
                <details open>
                  <summary>Ton constat précédent</summary>
                  <p><strong>Cible :</strong> {targetFor(lastSubmitted.targetId)?.name}</p>
                  <p><strong>Indice :</strong> {evidenceFor(lastSubmitted.evidenceId)?.text}</p>
                  <p><strong>Impact :</strong> {impactFor(lastSubmitted.impactId)?.text}</p>
                </details>
              {/if}
            </div>
          </aside>
        {/if}

        <div class="comparison-tools">
          <div class="view-tabs" aria-label="Choisir une vue du même territoire">
            <button type="button" class:selected={view === 'before'} aria-pressed={view === 'before'} onclick={() => (view = 'before')}>
              <span>AVANT</span><small>état initial</small>
            </button>
            <button type="button" class:selected={view === 'after'} aria-pressed={view === 'after'} onclick={() => (view = 'after')}>
              <span>APRÈS</span><small>état aménagé</small>
            </button>
            <button type="button" class:selected={view === 'delta'} aria-pressed={view === 'delta'} onclick={() => (view = 'delta')}>
              <span>Δ ÉCARTS</span><small>ce qui change ou reste stable</small>
            </button>
          </div>

          <div class="dossier-grid">
            <article class="map-card" aria-labelledby="map-title">
              <div class="card-heading"><span>Plan relationnel</span><strong id="map-title">{viewTitle()}</strong></div>
              <div class="map-strip" role="img" aria-label={`${viewTitle()} de ${currentVariation.place} : ${mapLabel()}`}>
                {#each mapGroups() as group, groupIndex}
                  <div class="map-group" aria-hidden="true">
                    <small>Ensemble {groupIndex + 1}</small>
                    {#each group as node, index}
                      <div class="map-node"><span>{index + 1}</span><strong>{node}</strong></div>
                      {#if index < group.length - 1}<i>↓ liaison</i>{/if}
                    {/each}
                  </div>
                {/each}
              </div>
              <p class="map-note">Le dessin n’est pas à l’échelle. Les faits à comparer sont écrits dans le dossier.</p>
            </article>

            <article class="facts-card" aria-live="polite">
              <div class="card-heading"><span>Lecture active</span><strong>{viewTitle()}</strong></div>
              <ol>
                {#each viewItems() as item}
                  <li><span aria-hidden="true">{view === 'delta' ? 'Δ' : '•'}</span>{item}</li>
                {/each}
              </ol>
              {#if view === 'delta'}<p class="delta-hint">Un fait stable peut être vrai sans expliquer l’impact du projet.</p>{/if}
            </article>
          </div>
        </div>

        <aside class="complete-statements" aria-labelledby="complete-statements-title">
          <div>
            <p class="eyebrow">Lecture groupée</p>
            <h2 id="complete-statements-title">Comparer deux constats déjà assemblés</h2>
            <p>Chaque bouton soumet une cible, un indice et un impact avec les mêmes règles que la fiche détaillée.</p>
          </div>
          <div class="statement-buttons">
            <button type="button" data-smoke-answer="incorrect" onclick={() => submitComplete('incorrect')}>
              <span>Constat A · examiner et envoyer</span>
              <p>{completeStatement(currentVariation.plannedWrong)}</p>
            </button>
            <button type="button" data-smoke-answer="correct" onclick={() => submitComplete('correct')}>
              <span>Constat B · examiner et envoyer</span>
              <p>{completeStatement(currentVariation.correct)}</p>
            </button>
          </div>
        </aside>

        <div class="diagnosis-builder">
          <div class="builder-heading">
            <div><p class="eyebrow">Fiche de constat</p><h2>Pose trois poinçons qui parlent du même changement.</h2></div>
            <span>{selectionComplete ? '3/3 · prêt à envoyer' : `${Number(Boolean(selectedTarget)) + Number(Boolean(selectedEvidence)) + Number(Boolean(selectedImpact))}/3 · en construction`}</span>
          </div>

          <fieldset>
            <legend><span>1</span><strong>Quelle organisation est principalement touchée&nbsp;?</strong></legend>
            <div class="choice-grid">
              {#each currentVariation.targets as target}
                <button
                  type="button"
                  class:selected={selectedTarget === target.id}
                  aria-pressed={selectedTarget === target.id}
                  data-smoke-attempt={attemptForTarget(target.id)}
                  data-smoke-step={attemptForTarget(target.id) ? '1' : undefined}
                  onclick={() => chooseTarget(target.id)}
                >
                  <span class="choice-type">{target.kind}</span>
                  <strong>{target.name}</strong>
                  <small>{target.detail}</small>
                  <i>{selectedTarget === target.id ? '✓ choisie' : 'choisir'}</i>
                </button>
              {/each}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>2</span><strong>Quel indice compare utilement avant et après&nbsp;?</strong></legend>
            <div class="choice-grid">
              {#each currentVariation.evidence as evidence}
                <button
                  type="button"
                  class:selected={selectedEvidence === evidence.id}
                  aria-pressed={selectedEvidence === evidence.id}
                  data-smoke-attempt={attemptForEvidence(evidence.id)}
                  data-smoke-step={attemptForEvidence(evidence.id) ? '2' : undefined}
                  onclick={() => chooseEvidence(evidence.id)}
                >
                  <span class="choice-type">{evidence.source}</span>
                  <strong>{evidence.text}</strong>
                  <i>{selectedEvidence === evidence.id ? '✓ choisi' : 'choisir'}</i>
                </button>
              {/each}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>3</span><strong>Quel impact cet indice permet-il d’appuyer&nbsp;?</strong></legend>
            <div class="choice-grid">
              {#each currentVariation.impacts as impact}
                <button
                  type="button"
                  class:selected={selectedImpact === impact.id}
                  aria-pressed={selectedImpact === impact.id}
                  data-smoke-attempt={attemptForImpact(impact.id)}
                  data-smoke-step={attemptForImpact(impact.id) ? '3' : undefined}
                  onclick={() => chooseImpact(impact.id)}
                >
                  <span class="choice-type"><b aria-hidden="true">{impact.symbol}</b> {impact.domain}</span>
                  <strong>{impact.text}</strong>
                  <i>{selectedImpact === impact.id ? '✓ choisi' : 'choisir'}</i>
                </button>
              {/each}
            </div>
          </fieldset>

          <div class="assembled" aria-live="polite">
            <div><span>1 · cible</span><p>{targetFor(selectedTarget)?.name ?? 'Aucune cible choisie'}</p></div>
            <b aria-hidden="true">→</b>
            <div><span>2 · écart</span><p>{evidenceFor(selectedEvidence)?.text ?? 'Aucun indice choisi'}</p></div>
            <b aria-hidden="true">→</b>
            <div><span>3 · impact</span><p>{impactFor(selectedImpact)?.text ?? 'Aucun impact choisi'}</p></div>
          </div>

          <button
            type="button"
            class="primary submit"
            disabled={!selectionComplete}
            data-smoke-action={selectionComplete ? 'submit' : undefined}
            onclick={submitDetailed}
          >
            {selectionComplete ? 'Envoyer le constat' : 'Pose encore les trois poinçons'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    {:else if phase === 'incorrect' && lastSubmitted}
      <section
        class="feedback incorrect"
        data-smoke-state="incorrect"
        data-smoke-variation={currentVariation.id}
        aria-labelledby="incorrect-title"
      >
        <header>
          <span class="feedback-symbol" aria-hidden="true">✕</span>
          <div><p class="eyebrow">Constat à revoir · {currentVariation.fileCode}</p><h1 id="incorrect-title" bind:this={stateHeading} tabindex="-1">{incorrectHeading()}</h1></div>
        </header>

        <div class="submitted-statement">
          <div><span>{targetFor(lastSubmitted.targetId)?.kind}</span><strong>{targetFor(lastSubmitted.targetId)?.name}</strong></div>
          <div><span>indice</span><strong>{evidenceFor(lastSubmitted.evidenceId)?.text}</strong></div>
          <div><span>{impactFor(lastSubmitted.impactId)?.domain}</span><strong>{impactFor(lastSubmitted.impactId)?.text}</strong></div>
        </div>

        <p class="feedback-detail" data-smoke-feedback="incorrect" data-smoke-feedback-detail="specific" role="status">
          {incorrectDetail()}
        </p>

        <div class="feedback-action">
          <p>Le constat reste visible. La reprise ouvrira la vue Δ Écarts et te donnera une question de méthode, sans choisir à ta place.</p>
          <button type="button" class="primary" data-smoke-action="retry" onclick={retry}>
            Reprendre l’expertise <span aria-hidden="true">↺</span>
          </button>
        </div>
      </section>
    {:else if phase === 'correct' && lastSubmitted}
      <div class="success-layout">
        <section
          class="feedback correct"
          data-smoke-state="correct"
          data-smoke-variation={currentVariation.id}
          aria-labelledby="correct-title"
        >
          <header>
            <span class="feedback-symbol" aria-hidden="true">✓</span>
            <div><p class="eyebrow">Lien établi · {currentVariation.fileCode}</p><h1 id="correct-title" bind:this={stateHeading} tabindex="-1">La cible, l’écart et l’impact se répondent.</h1></div>
          </header>
          <p class="feedback-detail" data-smoke-feedback="correct" data-smoke-feedback-detail="specific" role="status">
            {currentVariation.success}
          </p>
          <div class="confirmed-chain" aria-label="Constat confirmé">
            <span>{targetFor(lastSubmitted.targetId)?.kind} · {targetFor(lastSubmitted.targetId)?.name}</span>
            <b aria-hidden="true">→</b>
            <span>{evidenceFor(lastSubmitted.evidenceId)?.text}</span>
            <b aria-hidden="true">→</b>
            <span>{impactFor(lastSubmitted.impactId)?.domain}</span>
          </div>
        </section>

        <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentVariation.id}>
          <span>{currentIndex + 1} expertise sur {variations.length}</span>
          <p>{currentIndex === variations.length - 1 ? 'Les trois dossiers ont été examinés.' : 'Le prochain dossier changera de cible et de domaine d’impact.'}</p>
          <button type="button" class="primary" data-smoke-action="continue" onclick={continueLoop}>
            {currentIndex === variations.length - 1 ? 'Terminer les expertises' : 'Ouvrir le dossier suivant'}
            <span aria-hidden="true">→</span>
          </button>
        </aside>
      </div>
    {:else}
      <section class="completion" data-smoke-state="complete" data-smoke-completion aria-labelledby="complete-title">
        <p class="eyebrow">Trois dossiers terminés</p>
        <span class="completion-mark" aria-hidden="true">✓</span>
        <h1 id="complete-title" bind:this={stateHeading} tabindex="-1">Un impact se lit dans une relation documentée.</h1>
        <p>La stratégie à garder : nommer la <strong>partie, zone ou réseau</strong> qui change, comparer le même élément <strong>avant et après</strong>, puis limiter l’impact à ce que l’indice permet d’appuyer.</p>
        <ul>
          <li>Zone → simulation d’écoulement → environnement</li>
          <li>Réseau → itinéraire → social</li>
          <li>Partie → fiche de livraison → économie</li>
        </ul>
        <p class="privacy"><span aria-hidden="true">○</span> Cette activité n’a enregistré ni envoyé de réponse et ne conclut pas à une maîtrise.</p>
        <button type="button" class="secondary" onclick={restart}>Relire l’introduction</button>
      </section>
    {/if}
  </main>
</div>

<style>
  .prototype-root,
  .prototype-root * {
    box-sizing: border-box;
  }

  .prototype-root {
    --ink: #172926;
    --muted: #5a6864;
    --paper: #fbfaf2;
    --wash: #e7ebe2;
    --line: #bcc8bf;
    --green: #1e6656;
    --green-dark: #11463c;
    --orange: #d45d36;
    --yellow: #f1c84c;
    width: 100%;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background:
      linear-gradient(rgba(23, 41, 38, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23, 41, 38, 0.035) 1px, transparent 1px),
      var(--wash);
    background-size: 24px 24px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .prototype-root > section,
  .prototype-root > div,
  .masthead {
    width: min(1180px, calc(100% - 28px));
    margin-inline: auto;
  }

  .masthead {
    display: flex;
    min-height: 72px;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #aebbb1;
  }

  .masthead .mark {
    display: grid;
    width: 48px;
    height: 48px;
    flex: 0 0 48px;
    place-items: center;
    border: 2px solid var(--ink);
    background: var(--yellow);
    box-shadow: 3px 3px 0 var(--ink);
    font-family: ui-monospace, monospace;
    font-weight: 900;
  }

  .masthead .mark span { color: var(--orange); }
  .masthead small,
  .masthead strong { display: block; }
  .masthead small { color: var(--muted); font-size: .7rem; letter-spacing: .07em; text-transform: uppercase; }
  .masthead strong { font-family: Georgia, serif; font-size: 1.05rem; }
  .masthead p { margin-left: auto; font-family: ui-monospace, monospace; font-weight: 900; }
  .masthead p span { color: var(--muted); font-size: .68rem; text-transform: uppercase; }

  h1,
  h2,
  p,
  strong,
  small,
  dd { overflow-wrap: anywhere; }

  h1,
  h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.035em; }
  h1 { margin: 10px 0 16px; font-size: clamp(2.1rem, 6vw, 5.4rem); line-height: .98; }
  h2 { margin: 5px 0 10px; font-size: clamp(1.35rem, 3vw, 2.25rem); line-height: 1.08; }
  p { line-height: 1.55; }

  .eyebrow {
    margin: 0;
    color: var(--orange);
    font-size: .7rem;
    font-weight: 900;
    letter-spacing: .13em;
    text-transform: uppercase;
  }

  button {
    min-height: 48px;
    border: 0;
    font: inherit;
    cursor: pointer;
  }

  button:focus-visible,
  [tabindex='-1']:focus-visible {
    outline: 4px solid #1269bb;
    outline-offset: 4px;
  }

  button:disabled { cursor: not-allowed; opacity: .58; }

  .primary,
  .secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 52px;
    padding: 13px 18px;
    border-radius: 8px;
    font-weight: 900;
  }

  .primary { color: white; background: var(--green); }
  .primary:hover:not(:disabled) { background: var(--green-dark); }
  .secondary { border: 2px solid var(--green); color: var(--green-dark); background: white; }

  .intro {
    display: grid;
    min-height: min(760px, calc(100vh - 114px));
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, .75fr);
    align-items: center;
    gap: clamp(32px, 7vw, 90px);
    padding: 50px 0;
  }

  .intro-copy { min-width: 0; }
  .intro .lead { max-width: 720px; color: #384b46; font-size: clamp(1.05rem, 2vw, 1.25rem); }

  .method {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 26px 0;
  }

  .method div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4px 10px;
    padding: 14px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, .72);
  }

  .method span {
    grid-row: span 2;
    color: var(--orange);
    font-family: ui-monospace, monospace;
    font-size: 1.25rem;
    font-weight: 900;
  }
  .method small { color: var(--muted); }

  .vocabulary { display: grid; gap: 6px; margin: 22px 0; }
  .vocabulary div { display: grid; grid-template-columns: 90px 1fr; gap: 12px; padding-top: 8px; border-top: 1px solid var(--line); }
  .vocabulary dt { font-weight: 900; }
  .vocabulary dd { margin: 0; color: var(--muted); }
  .privacy { color: var(--muted); font-size: .86rem; }

  .intro-visual {
    position: relative;
    display: grid;
    gap: 14px;
    min-width: 0;
    padding: 46px 24px 24px;
    border: 2px solid var(--ink);
    background: #f8f0d7;
    box-shadow: 10px 12px 0 rgba(23, 41, 38, .18);
  }
  .folder-tab { position: absolute; top: 0; left: 0; padding: 9px 14px; color: white; background: var(--orange); font-size: .7rem; font-weight: 900; letter-spacing: .08em; }
  .intro-visual > div { padding: 18px; border: 1px solid #9fa99f; background: white; }
  .intro-visual > div b { font-family: ui-monospace, monospace; }
  .intro-visual > div p { margin: 7px 0 0; color: var(--muted); }
  .intro-visual > i { text-align: center; font-size: 1.5rem; }
  .intro-visual > strong { padding-top: 12px; border-top: 2px solid var(--ink); }

  .workspace { padding: 30px 0 64px; }
  .case-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; }
  .case-header h1 { max-width: 820px; font-size: clamp(2.5rem, 6vw, 5rem); }
  .case-number { color: rgba(23, 41, 38, .15); font-family: Georgia, serif; font-size: clamp(4rem, 12vw, 9rem); line-height: .75; }

  .project-brief {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    margin: 14px 0 24px;
    border: 1px solid var(--ink);
    background: var(--ink);
  }
  .project-brief > div { padding: 16px; background: var(--paper); }
  .project-brief small { color: var(--orange); font-weight: 900; text-transform: uppercase; }
  .project-brief p { margin: 5px 0 0; }
  .project-brief .regional-link { grid-column: 1 / -1; margin: 0; padding: 12px 16px; color: white; background: var(--green-dark); }
  .regional-link span { margin-right: 8px; }

  .scaffold {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px;
    margin-bottom: 24px;
    padding: 20px;
    border: 2px solid #8b6010;
    background: #fff3c9;
  }
  .scaffold > span { font-size: 2rem; font-weight: 900; }
  .scaffold h2 { font-size: 1.6rem; }
  .scaffold details { margin-top: 12px; padding: 12px; border: 1px solid #b59650; background: rgba(255,255,255,.66); }
  .scaffold summary { min-height: 44px; font-weight: 900; cursor: pointer; }
  .scaffold details p { margin: 5px 0; }

  .comparison-tools { border: 1px solid var(--ink); background: var(--paper); }
  .view-tabs { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--ink); }
  .view-tabs button { display: grid; gap: 4px; padding: 12px; border-right: 1px solid var(--line); color: var(--ink); background: #e5e8df; text-align: left; }
  .view-tabs button:last-child { border-right: 0; }
  .view-tabs button.selected { box-shadow: inset 0 -5px 0 var(--orange); background: white; }
  .view-tabs span { font-family: ui-monospace, monospace; font-weight: 900; }
  .view-tabs small { color: var(--muted); }

  .dossier-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr); gap: 1px; background: var(--line); }
  .map-card,
  .facts-card { min-width: 0; padding: 20px; background: var(--paper); }
  .card-heading { display: flex; justify-content: space-between; gap: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
  .card-heading span { color: var(--muted); font-size: .72rem; text-transform: uppercase; }

  .map-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; padding: 24px 0; }
  .map-group { display: grid; min-width: 0; align-content: start; gap: 6px; padding: 12px; border: 2px solid var(--ink); background: #eef0e8; }
  .map-group > small { color: var(--orange); font-size: .66rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .map-node { display: grid; min-width: 0; min-height: 54px; grid-template-columns: 26px minmax(0, 1fr); place-items: center start; gap: 8px; padding: 9px; border: 1px solid var(--ink); background: white; text-align: left; }
  .map-node span { display: grid; width: 24px; height: 24px; place-items: center; border-radius: 50%; color: white; background: var(--green-dark); font-family: ui-monospace, monospace; font-size: .68rem; font-weight: 900; }
  .map-node strong { font-size: .78rem; line-height: 1.3; }
  .map-group i { justify-self: center; padding: 3px 7px; color: var(--green-dark); background: var(--yellow); font-size: .68rem; font-style: normal; font-weight: 900; text-transform: uppercase; }
  .map-note { margin: 0; color: var(--muted); font-size: .82rem; }

  .facts-card ol { display: grid; gap: 9px; margin: 18px 0; padding: 0; list-style: none; }
  .facts-card li { display: grid; grid-template-columns: auto 1fr; gap: 10px; padding: 12px; border-left: 4px solid var(--green); background: white; line-height: 1.45; }
  .facts-card li span { color: var(--orange); font-weight: 900; }
  .delta-hint { padding: 12px; border: 1px dashed var(--orange); background: #fff5e8; font-weight: 800; }

  .complete-statements {
    display: grid;
    grid-template-columns: minmax(220px, .55fr) minmax(0, 1.45fr);
    gap: 22px;
    margin: 24px 0;
    padding: 20px;
    border: 1px solid var(--ink);
    background: #dfe6de;
  }
  .complete-statements p { color: #44534f; }
  .statement-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .statement-buttons button { min-width: 0; padding: 16px; border: 2px solid var(--ink); color: var(--ink); background: white; text-align: left; box-shadow: 4px 4px 0 rgba(23,41,38,.16); }
  .statement-buttons button:hover { border-color: var(--green); }
  .statement-buttons span { display: block; color: var(--orange); font-size: .72rem; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; }
  .statement-buttons p { margin: 8px 0 0; color: var(--ink); font-weight: 750; line-height: 1.4; }

  .diagnosis-builder { padding: clamp(18px, 4vw, 34px); border: 1px solid var(--ink); background: var(--paper); }
  .builder-heading { display: flex; align-items: end; justify-content: space-between; gap: 18px; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
  .builder-heading > span { padding: 8px 10px; border: 1px solid var(--ink); background: white; font-family: ui-monospace, monospace; font-size: .72rem; font-weight: 900; }

  fieldset { min-width: 0; margin: 24px 0 0; padding: 0; border: 0; }
  legend { display: flex; align-items: center; gap: 12px; width: 100%; font-size: 1.05rem; }
  legend > span { display: grid; width: 36px; height: 36px; flex: 0 0 36px; place-items: center; border: 2px solid var(--ink); background: var(--yellow); font-family: ui-monospace, monospace; font-weight: 900; }
  .choice-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
  .choice-grid button { display: grid; min-width: 0; min-height: 150px; align-content: start; gap: 8px; padding: 14px; border: 2px solid #a7b2aa; color: var(--ink); background: white; text-align: left; }
  .choice-grid button.selected { border-color: var(--green-dark); box-shadow: inset 0 0 0 3px var(--green-dark); background: #edf7f1; }
  .choice-grid .choice-type { color: var(--orange); font-size: .67rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .choice-grid small { color: var(--muted); line-height: 1.4; }
  .choice-grid i { align-self: end; margin-top: auto; color: var(--green-dark); font-style: normal; font-weight: 900; }

  .assembled { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: stretch; gap: 8px; margin: 28px 0 16px; }
  .assembled div { min-width: 0; padding: 12px; border: 1px solid var(--line); background: white; }
  .assembled div span { color: var(--orange); font-size: .67rem; font-weight: 900; text-transform: uppercase; }
  .assembled div p { margin: 6px 0 0; font-size: .88rem; }
  .assembled > b { align-self: center; }
  .submit { width: 100%; }

  .feedback,
  .completion { margin-top: 34px; margin-bottom: 60px; padding: clamp(22px, 5vw, 48px); border: 1px solid var(--ink); background: var(--paper); }
  .feedback header { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: start; }
  .feedback header h1 { max-width: 900px; font-size: clamp(2rem, 5vw, 4.4rem); }
  .feedback-symbol { display: grid; width: 64px; height: 64px; place-items: center; border: 3px solid currentColor; font-size: 2rem; font-weight: 900; }
  .incorrect .feedback-symbol { color: #a63d26; }
  .correct .feedback-symbol { color: var(--green); }
  .submitted-statement { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin: 24px 0; background: var(--ink); }
  .submitted-statement div { display: grid; gap: 6px; min-width: 0; padding: 14px; background: white; }
  .submitted-statement span { color: var(--orange); font-size: .68rem; font-weight: 900; text-transform: uppercase; }
  .feedback-detail { max-width: 900px; padding: 18px; border-left: 6px solid var(--orange); background: #fff0e6; font-size: 1.04rem; }
  .correct .feedback-detail { border-color: var(--green); background: #e8f4ec; }
  .feedback-action { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--line); }
  .feedback-action p { max-width: 720px; }

  .success-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; align-items: start; gap: 18px; margin-top: 34px; margin-bottom: 60px; }
  .success-layout .feedback { width: 100%; margin: 0; }
  .confirmed-chain { display: grid; grid-template-columns: 1fr auto 1fr auto .5fr; gap: 8px; align-items: center; margin-top: 22px; }
  .confirmed-chain span { min-width: 0; padding: 12px; border: 1px solid var(--line); background: white; font-size: .86rem; }
  .continuation { padding: 20px; border: 1px solid var(--ink); background: var(--yellow); }
  .continuation > span { font-family: ui-monospace, monospace; font-size: .72rem; font-weight: 900; text-transform: uppercase; }
  .continuation .primary { width: 100%; margin-top: 8px; }

  .completion { max-width: 840px; text-align: center; }
  .completion-mark { display: grid; width: 72px; height: 72px; margin: 0 auto 14px; place-items: center; border: 3px solid var(--green); color: var(--green); font-size: 2rem; font-weight: 900; }
  .completion h1 { max-width: 700px; margin-inline: auto; font-size: clamp(2rem, 5vw, 4rem); }
  .completion > p:not(.eyebrow, .privacy) { max-width: 700px; margin-inline: auto; }
  .completion ul { display: grid; gap: 6px; max-width: 620px; margin: 20px auto; padding: 0; list-style: none; }
  .completion li { padding: 9px; border: 1px solid var(--line); background: white; }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 860px) {
    .intro,
    .dossier-grid,
    .complete-statements,
    .success-layout { grid-template-columns: 1fr; }
    .intro { padding: 36px 0; }
    .intro-visual { max-width: 600px; }
    .choice-grid { grid-template-columns: 1fr; }
    .statement-buttons { grid-template-columns: 1fr 1fr; }
    .success-layout .continuation { width: 100%; }
  }

  @media (max-width: 560px) {
    .prototype-root > section,
    .prototype-root > div,
    .masthead { width: min(100% - 20px, 1180px); }
    .masthead { min-height: 64px; }
    .masthead p { font-size: .72rem; }
    .method,
    .statement-buttons,
    .project-brief,
    .submitted-statement { grid-template-columns: 1fr; }
    .project-brief .regional-link { grid-column: auto; }
    .view-tabs { grid-template-columns: 1fr; }
    .view-tabs button { border-right: 0; border-bottom: 1px solid var(--line); }
    .view-tabs button:last-child { border-bottom: 0; }
    .map-strip { grid-template-columns: 1fr; }
    .case-number { display: none; }
    .builder-heading,
    .feedback-action { align-items: stretch; flex-direction: column; }
    .assembled,
    .confirmed-chain { grid-template-columns: 1fr; }
    .assembled > b,
    .confirmed-chain > b { transform: rotate(90deg); text-align: center; }
    .feedback header { grid-template-columns: 1fr; }
    .feedback-symbol { width: 52px; height: 52px; }
  }

  @media (max-width: 340px) {
    .prototype-root > section,
    .prototype-root > div,
    .masthead { width: calc(100% - 16px); }
    .masthead .mark { width: 44px; height: 44px; flex-basis: 44px; }
    .masthead strong { font-size: .9rem; }
    .masthead small { font-size: .6rem; }
    .workspace { padding-top: 22px; }
    .diagnosis-builder,
    .feedback,
    .completion { padding: 18px 14px; }
    .map-card,
    .facts-card,
    .complete-statements { padding: 14px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *,
    .prototype-root *::before,
    .prototype-root *::after {
      scroll-behavior: auto !important;
      animation: none !important;
      transition: none !important;
    }
  }
</style>
