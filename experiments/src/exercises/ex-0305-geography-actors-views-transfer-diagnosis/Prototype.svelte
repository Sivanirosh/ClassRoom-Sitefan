<script lang="ts">
  import { tick } from 'svelte';

  type Phase =
    | 'introduction'
    | 'active'
    | 'incorrect'
    | 'retry'
    | 'correct'
    | 'complete';
  type ErrorFamily =
    | 'OK-DIVERGENCE'
    | 'DETAIL-SANS-ROLE'
    | 'UN-INTERET-ABSENT'
    | 'QUESTION-SANS-CONTRASTE';
  type AttemptMarker =
    | 'correct-1'
    | 'correct-2'
    | 'correct-3'
    | 'incorrect-1'
    | 'incorrect-2'
    | 'incorrect-3';

  type Actor = {
    id: string;
    name: string;
    shortName: string;
    kind: string;
    role: string;
    quote: string;
    marker: AttemptMarker;
  };

  type MediationQuestion = {
    id: string;
    text: string;
    note: string;
    marker?: AttemptMarker;
  };

  type CaseFile = {
    id: string;
    number: string;
    title: string;
    setting: string;
    mission: string;
    distantLink: string;
    interestA: string;
    interestB: string;
    clueA: string;
    clueB: string;
    actors: Actor[];
    questions: MediationQuestion[];
    correctActorIds: [string, string];
    correctQuestionId: string;
    plannedWrongActorIds: [string, string];
    plannedWrongQuestionId: string;
    correctExplanation: string;
  };

  type Attempt = {
    variationId: string;
    actorIds: string[];
    actorNames: string[];
    questionId: string;
    questionText: string;
    outcome: 'correct' | 'incorrect';
    errorFamily: ErrorFamily;
  };

  const cases: CaseFile[] = [
    {
      id: 'halle-horaires',
      number: '01',
      title: 'La halle du Verger',
      setting:
        'Dans une petite ville imaginaire, une ancienne halle sert encore au chargement le matin. Elle reste libre en fin de journée.',
      mission:
        'Préparer une rencontre sur le partage de la halle entre le chargement matinal et des activités de quartier après l’école.',
      distantLink:
        'Les caisses partent aussi vers des magasins situés hors de la région : le lieu proche est relié à d’autres espaces.',
      interestA: 'charger les caisses tôt le matin',
      interestB: 'réunir le quartier en fin de journée',
      clueA: 'charger',
      clueB: 'se réunir',
      correctActorIds: ['maraichers', 'maison-quartier'],
      plannedWrongActorIds: ['service-batiments', 'photographe'],
      correctQuestionId: 'partager-horaires',
      plannedWrongQuestionId: 'couleur-porte',
      actors: [
        {
          id: 'maraichers',
          name: 'Coopérative des maraîchères et maraîchers',
          shortName: 'Coopérative maraîchère',
          kind: 'collectif privé · activité économique',
          role: 'cultive, rassemble et expédie des produits',
          quote:
            '« À 6 h, la halle est notre lieu de travail : nous chargeons les caisses sans bloquer la rue. »',
          marker: 'correct-1'
        },
        {
          id: 'maison-quartier',
          name: 'Association de la maison de quartier',
          shortName: 'Maison de quartier',
          kind: 'collectif privé · rôle social',
          role: 'organise des activités pour les habitantes et habitants',
          quote:
            '« Après l’école, nous voyons une grande salle abritée où le quartier pourrait se réunir. »',
          marker: 'correct-2'
        },
        {
          id: 'service-batiments',
          name: 'Service communal des bâtiments',
          shortName: 'Service des bâtiments',
          kind: 'collectif public · responsabilité politique',
          role: 'entretient la halle et vérifie sa sécurité',
          quote:
            '« La toiture doit être contrôlée avant tout nouvel usage. Je prépare la liste des travaux. »',
          marker: 'incorrect-1'
        },
        {
          id: 'photographe',
          name: 'Une photographe de passage',
          shortName: 'Photographe',
          kind: 'personne · visite ponctuelle',
          role: 'observe la façade sans organiser son usage',
          quote:
            '« Les portes rouges ressortent bien sur ma photo. Je ne viens pas aux heures de chargement. »',
          marker: 'incorrect-2'
        }
      ],
      questions: [
        {
          id: 'partager-horaires',
          text: 'Comment partager les horaires pour charger les caisses et accueillir les activités du quartier ?',
          note: 'Cette question conserve les deux usages.',
          marker: 'correct-3'
        },
        {
          id: 'couleur-porte',
          text: 'Quelle couleur choisir pour repeindre la grande porte ?',
          note: 'Cette question porte sur un détail, pas sur les deux rôles.',
          marker: 'incorrect-3'
        },
        {
          id: 'interdire-chargement',
          text: 'Faut-il interdire tout chargement dès maintenant ?',
          note: 'Cette question efface un des intérêts avant la discussion.'
        }
      ],
      correctExplanation:
        'La coopérative voit la halle comme un lieu de travail et de chargement. La maison de quartier la voit comme un lieu de rencontre. La question sur les horaires relie ces deux représentations sans en effacer une.'
    },
    {
      id: 'rives-usages',
      number: '02',
      title: 'Le chemin des Rives',
      setting:
        'Dans une commune imaginaire, un chemin longe une zone calme puis rejoint le centre. Plusieurs groupes l’utilisent au lever du jour.',
      mission:
        'Préparer une rencontre sur le passage rapide à vélo et le maintien d’un tronçon calme tôt le matin.',
      distantLink:
        'Le chemin relie des logements proches à une gare, puis à des lieux de travail situés plus loin.',
      interestA: 'passer directement à vélo vers la gare',
      interestB: 'garder un tronçon calme au lever du jour',
      clueA: 'passer à vélo',
      clueB: 'garder le calme',
      correctActorIds: ['cyclistes', 'observateurs-oiseaux'],
      plannedWrongActorIds: ['service-chemins', 'loueur-velos'],
      correctQuestionId: 'troncon-horaires',
      plannedWrongQuestionId: 'prix-velo',
      actors: [
        {
          id: 'cyclistes',
          name: 'Collectif des cyclistes du matin',
          shortName: 'Cyclistes du matin',
          kind: 'collectif privé · usagères et usagers',
          role: 'se déplace chaque jour vers la gare',
          quote:
            '« Pour nous, ce chemin est la liaison la plus directe. Un détour ferait manquer le train. »',
          marker: 'correct-1'
        },
        {
          id: 'observateurs-oiseaux',
          name: 'Groupe local d’observation des oiseaux',
          shortName: 'Groupe des oiseaux',
          kind: 'collectif privé · activité sociale',
          role: 'observe et demande du calme sur une partie des rives',
          quote:
            '« À l’aube, nous voyons ce tronçon comme un lieu calme. Les passages rapides interrompent l’observation. »',
          marker: 'correct-2'
        },
        {
          id: 'service-chemins',
          name: 'Service communal des chemins',
          shortName: 'Service des chemins',
          kind: 'collectif public · responsabilité politique',
          role: 'entretient le revêtement et les panneaux',
          quote:
            '« Deux panneaux sont abîmés. Notre équipe peut les remplacer jeudi. »',
          marker: 'incorrect-1'
        },
        {
          id: 'loueur-velos',
          name: 'Un loueur de vélos',
          shortName: 'Loueur de vélos',
          kind: 'personne privée · activité économique',
          role: 'loue des vélos près de la gare',
          quote:
            '« Les visiteurs me demandent surtout le prix d’une demi-journée et un plan du centre. »',
          marker: 'incorrect-2'
        }
      ],
      questions: [
        {
          id: 'troncon-horaires',
          text: 'Quel tronçon et quels horaires permettent le passage à vélo tout en gardant un espace calme ?',
          note: 'Cette question met les deux usages sur la même carte.',
          marker: 'correct-3'
        },
        {
          id: 'prix-velo',
          text: 'Combien devrait coûter la location d’un vélo ?',
          note: 'Cette question ne traite pas la tension du dossier.',
          marker: 'incorrect-3'
        },
        {
          id: 'fermer-chemin',
          text: 'Qui veut fermer tout le chemin pour toujours ?',
          note: 'Aucune parole ne demande cette décision extrême.'
        }
      ],
      correctExplanation:
        'Les cyclistes représentent le chemin comme une liaison quotidienne vers la gare. Le groupe d’observation le représente comme un espace calme au lever du jour. La question sur le tronçon et les horaires maintient ces deux usages dans la décision.'
    },
    {
      id: 'parvis-circulations',
      number: '03',
      title: 'Le parvis de la petite gare',
      setting:
        'Dans un bourg imaginaire, le parvis de la gare sert aussi de passage aux enfants. Une place de livraison courte doit être dessinée.',
      mission:
        'Préparer une rencontre sur l’arrivée des colis et la traversée sûre des enfants aux heures d’école.',
      distantLink:
        'Les colis arrivent de villes plus lointaines : le parvis est le dernier maillon d’un trajet entre plusieurs espaces.',
      interestA: 'déposer les colis près de la gare',
      interestB: 'garder la traversée des enfants dégagée',
      clueA: 'déposer les colis',
      clueB: 'traverser sans véhicule',
      correctActorIds: ['coursiers', 'parents'],
      plannedWrongActorIds: ['service-horloge', 'voyageuse'],
      correctQuestionId: 'emplacement-livraison',
      plannedWrongQuestionId: 'heure-horloge',
      actors: [
        {
          id: 'coursiers',
          name: 'Coopérative des coursières et coursiers',
          shortName: 'Coopérative de livraison',
          kind: 'collectif privé · activité économique',
          role: 'termine le trajet des colis arrivés par le train',
          quote:
            '« Pour nous, le bord du parvis est un point de livraison : il faut déposer les colis près de la sortie. »',
          marker: 'correct-1'
        },
        {
          id: 'parents',
          name: 'Association des parents',
          shortName: 'Association des parents',
          kind: 'collectif privé · rôle social',
          role: 'accompagne des enfants sur le chemin de l’école',
          quote:
            '« À 8 h, nous voyons le centre du parvis comme une traversée. Elle doit rester sans véhicule. »',
          marker: 'correct-2'
        },
        {
          id: 'service-horloge',
          name: 'Service communal du bâtiment de gare',
          shortName: 'Service du bâtiment',
          kind: 'collectif public · responsabilité politique',
          role: 'entretient l’horloge et l’abri',
          quote:
            '« L’horloge retarde de cinq minutes. Une réparation est déjà prévue. »',
          marker: 'incorrect-1'
        },
        {
          id: 'voyageuse',
          name: 'Une voyageuse occasionnelle',
          shortName: 'Voyageuse',
          kind: 'personne · usage ponctuel',
          role: 'attend un train quelques fois par année',
          quote:
            '« J’aime lire le nom de la gare depuis le quai. Je ne connais pas l’heure de sortie de l’école. »',
          marker: 'incorrect-2'
        }
      ],
      questions: [
        {
          id: 'emplacement-livraison',
          text: 'Où placer l’arrêt court pour livrer les colis sans couper la traversée des enfants ?',
          note: 'Cette question conserve la livraison et la traversée.',
          marker: 'correct-3'
        },
        {
          id: 'heure-horloge',
          text: 'Quelle heure faut-il afficher sur l’horloge de la gare ?',
          note: 'Cette question concerne un autre travail communal.',
          marker: 'incorrect-3'
        },
        {
          id: 'supprimer-colis',
          text: 'Faut-il renvoyer tous les colis dans les villes lointaines ?',
          note: 'Cette question supprime un usage au lieu de le mettre en relation.'
        }
      ],
      correctExplanation:
        'La coopérative représente le parvis comme le dernier point d’un trajet de livraison. Les parents le représentent comme une traversée à protéger. La question sur l’emplacement garde visibles le rôle économique et l’usage social du même lieu.'
    }
  ];

  let phase: Phase = 'introduction';
  let caseIndex = 0;
  let currentCase = cases[0];
  let selectedActorIds: string[] = [];
  let selectedQuestionId: string | null = null;
  let responsePath: Attempt[] = [];
  let currentErrorFamily: ErrorFamily | null = null;
  let lastAttempt: Attempt | null = null;
  let announcement = '';
  let stateHeading: HTMLElement | null = null;

  function markerKind(marker?: AttemptMarker): 'correct' | 'incorrect' | undefined {
    if (!marker) return undefined;
    return marker.startsWith('correct') ? 'correct' : 'incorrect';
  }

  function markerStep(marker?: AttemptMarker): string | undefined {
    return marker?.split('-')[1];
  }

  function legacyState(): 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' {
    if (phase === 'introduction') return 'ready';
    if (phase === 'active' || phase === 'retry') return 'question';
    if (phase === 'incorrect') return 'incorrect';
    if (phase === 'correct') return 'correct';
    return 'complete';
  }

  async function focusState(): Promise<void> {
    await tick();
    stateHeading?.focus();
  }

  function resetBuilder(): void {
    selectedActorIds = [];
    selectedQuestionId = null;
  }

  async function begin(): Promise<void> {
    caseIndex = 0;
    currentCase = cases[0];
    responsePath = [];
    currentErrorFamily = null;
    lastAttempt = null;
    resetBuilder();
    phase = 'active';
    announcement = `Dossier 1 sur ${cases.length} : ${currentCase.title}.`;
    await focusState();
  }

  function actorIsSelected(id: string): boolean {
    return selectedActorIds.includes(id);
  }

  function selectedSeat(id: string): number {
    return selectedActorIds.indexOf(id) + 1;
  }

  function toggleActor(id: string): void {
    if (actorIsSelected(id)) {
      selectedActorIds = selectedActorIds.filter((actorId) => actorId !== id);
      announcement = 'Acteur retiré de la table.';
      return;
    }

    if (selectedActorIds.length >= 2) {
      announcement = 'Les deux sièges sont occupés. Retire un acteur avant d’en choisir un autre.';
      return;
    }

    selectedActorIds = [...selectedActorIds, id];
    const actor = currentCase.actors.find((candidate) => candidate.id === id);
    announcement = `${actor?.shortName ?? 'Acteur'} occupe le siège ${selectedActorIds.length}.`;
  }

  function chooseQuestion(id: string): void {
    selectedQuestionId = id;
    announcement = 'Question de concertation retenue. Tu peux encore la changer avant de vérifier.';
  }

  function selectedActors(): Actor[] {
    return selectedActorIds
      .map((id) => currentCase.actors.find((actor) => actor.id === id))
      .filter((actor): actor is Actor => Boolean(actor));
  }

  function selectedQuestion(): MediationQuestion | undefined {
    return currentCase.questions.find((question) => question.id === selectedQuestionId);
  }

  function responseIsComplete(): boolean {
    return selectedActorIds.length === 2 && selectedQuestionId !== null;
  }

  function samePair(left: string[], right: string[]): boolean {
    return left.length === right.length && left.every((id) => right.includes(id));
  }

  function classifyAttempt(): ErrorFamily {
    const pairCorrect = samePair(selectedActorIds, currentCase.correctActorIds);
    if (pairCorrect && selectedQuestionId === currentCase.correctQuestionId) {
      return 'OK-DIVERGENCE';
    }
    if (pairCorrect) return 'QUESTION-SANS-CONTRASTE';

    const relevantCount = selectedActorIds.filter((id) =>
      currentCase.correctActorIds.includes(id)
    ).length;
    return relevantCount === 0 ? 'DETAIL-SANS-ROLE' : 'UN-INTERET-ABSENT';
  }

  async function submitResponse(): Promise<void> {
    if (!responseIsComplete()) return;

    const errorFamily = classifyAttempt();
    const question = selectedQuestion();
    const attempt: Attempt = {
      variationId: currentCase.id,
      actorIds: [...selectedActorIds],
      actorNames: selectedActors().map((actor) => actor.shortName),
      questionId: question?.id ?? '',
      questionText: question?.text ?? '',
      outcome: errorFamily === 'OK-DIVERGENCE' ? 'correct' : 'incorrect',
      errorFamily
    };

    responsePath = [...responsePath, attempt];
    currentErrorFamily = errorFamily;
    lastAttempt = attempt;
    phase = attempt.outcome;
    announcement =
      attempt.outcome === 'correct'
        ? 'Proposition cohérente. Lis pourquoi les deux points de vue sont reliés.'
        : 'La proposition ne relie pas encore les deux intérêts. Lis le retour avant de reprendre.';
    await focusState();
  }

  function compactTableKinds(): Array<'incorrect' | 'correct'> {
    return caseIndex % 2 === 0 ? ['incorrect', 'correct'] : ['correct', 'incorrect'];
  }

  async function submitCompactTable(kind: 'incorrect' | 'correct'): Promise<void> {
    selectedActorIds = [
      ...(kind === 'correct' ? currentCase.correctActorIds : currentCase.plannedWrongActorIds)
    ];
    selectedQuestionId =
      kind === 'correct' ? currentCase.correctQuestionId : currentCase.plannedWrongQuestionId;
    await submitResponse();
  }

  function missingInterestFeedback(): string {
    const hasFirst = selectedActorIds.includes(currentCase.correctActorIds[0]);
    const hasSecond = selectedActorIds.includes(currentCase.correctActorIds[1]);
    if (hasFirst && !hasSecond) {
      return `Ta table reprend « ${currentCase.interestA} », mais aucune voix choisie ne porte directement « ${currentCase.interestB} ». Cherche une parole où le rôle explique ce second usage.`;
    }
    if (hasSecond && !hasFirst) {
      return `Ta table reprend « ${currentCase.interestB} », mais aucune voix choisie ne porte directement « ${currentCase.interestA} ». Cherche une parole où le rôle explique ce premier usage.`;
    }
    return 'Un des deux usages annoncés dans la mission reste sans acteur. Relie chaque siège à une action précise dans une parole.';
  }

  function incorrectFeedback(): string {
    if (currentErrorFamily === 'DETAIL-SANS-ROLE') {
      return `Tu as invité ${lastAttempt?.actorNames.join(' et ')}. Ces notes donnent un détail sur le lieu, mais elles ne portent pas les deux usages « ${currentCase.interestA} » et « ${currentCase.interestB} ». Un rôle utile explique ce que l’acteur fait, utilise ou organise ici.`;
    }
    if (currentErrorFamily === 'UN-INTERET-ABSENT') return missingInterestFeedback();
    if (currentErrorFamily === 'QUESTION-SANS-CONTRASTE') {
      return `Les deux acteurs portent bien les usages du dossier. Cependant, la question « ${lastAttempt?.questionText} » ne les maintient pas ensemble. Cherche une question qui nomme les deux contraintes sans décider d’avance qui gagne.`;
    }
    return 'Relis les rôles et les actions : les deux usages de la mission doivent rester visibles.';
  }

  async function retry(): Promise<void> {
    resetBuilder();
    currentErrorFamily = null;
    phase = 'retry';
    announcement = `Nouvel essai. Repère les verbes « ${currentCase.clueA} » et « ${currentCase.clueB} » dans les paroles.`;
    await focusState();
  }

  async function continueJourney(): Promise<void> {
    if (caseIndex === cases.length - 1) {
      phase = 'complete';
      announcement = 'Les trois dossiers sont terminés.';
      await focusState();
      return;
    }

    caseIndex += 1;
    currentCase = cases[caseIndex];
    currentErrorFamily = null;
    lastAttempt = null;
    resetBuilder();
    phase = 'active';
    announcement = `Dossier ${caseIndex + 1} sur ${cases.length} : ${currentCase.title}.`;
    await focusState();
  }

  function completedCaseIds(): string[] {
    return responsePath
      .filter((attempt) => attempt.outcome === 'correct')
      .map((attempt) => attempt.variationId)
      .filter((id, index, all) => all.indexOf(id) === index);
  }
</script>

<svelte:head>
  <title>La table des points de vue · EX-0305</title>
  <meta
    name="description"
    content="Étude interactive de géographie sur les acteurs, leurs rôles et leurs représentations divergentes d’un même lieu."
  />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0305"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState()}
>
<main
  class="prototype-root"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0305"
>
  <div class="paper-noise" aria-hidden="true"></div>

  {#if phase === 'introduction'}
    <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="folio">Dossier de géographie · EX—0305</p>
        <h1 id="intro-title" bind:this={stateHeading} tabindex="-1">
          La table des<br /><em>points de vue</em>
        </h1>
        <p class="intro-lead">
          Un même lieu ne raconte pas la même chose à tout le monde. Compose une table avec
          deux acteurs, puis choisis une question qui garde leurs deux intérêts visibles.
        </p>

        <dl class="vocabulary">
          <div>
            <dt>Acteur</dt>
            <dd>Une personne ou un groupe qui utilise, organise ou transforme un lieu.</dd>
          </div>
          <div>
            <dt>Représentation</dt>
            <dd>La manière de voir ce lieu selon son rôle, son usage et ses besoins.</dd>
          </div>
        </dl>

        <button class="primary" type="button" data-smoke-action="start" onclick={begin}>
          Ouvrir le premier dossier <span aria-hidden="true">→</span>
        </button>
        <p class="control-note">Au clavier : Tab pour avancer, Espace ou Entrée pour choisir.</p>
      </div>

      <div class="intro-table" aria-hidden="true">
        <div class="stamp">3 dossiers<br />imaginaires</div>
        <div class="place-disc">
          <span>Même lieu</span>
          <i></i>
          <strong>Deux usages</strong>
        </div>
        <div class="voice voice-a">« lieu de passage »</div>
        <div class="voice voice-b">« espace à protéger »</div>
        <div class="table-line"></div>
      </div>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="case-shell"
      data-smoke-state={phase === 'retry' ? 'retry' : 'active'}
      data-smoke-variation={currentCase.id}
      aria-labelledby="case-title"
    >
      <header class="case-topbar">
        <div class="wordmark"><span>TABLE</span><strong>des points de vue</strong></div>
        <div class="progress-copy">
          <span>Dossier {caseIndex + 1} / {cases.length}</span>
          <div class="progress-track" aria-hidden="true">
            <i style={`width: ${((caseIndex + 1) / cases.length) * 100}%`}></i>
          </div>
        </div>
      </header>

      {#if phase === 'retry'}
        <aside class="scaffold" aria-labelledby="retry-title">
          <span class="scaffold-mark" aria-hidden="true">↺</span>
          <div>
            <p class="section-label">Nouvel essai</p>
            <h1 id="retry-title" bind:this={stateHeading} tabindex="-1">
              Repars des verbes d’action.
            </h1>
            <p>
              Trouve une parole liée à <strong>« {currentCase.clueA} »</strong> et une autre
              liée à <strong>« {currentCase.clueB} »</strong>. Vérifie ensuite que ta question
              garde les deux actions visibles.
            </p>
          </div>
        </aside>

        {#if lastAttempt}
          <details class="previous-attempt">
            <summary>Relire ma proposition précédente</summary>
            <p>
              Acteurs : <strong>{lastAttempt.actorNames.join(' + ')}</strong><br />
              Question : « {lastAttempt.questionText} »
            </p>
          </details>
        {/if}
      {/if}

      <article class="case-file">
        <div class="file-heading">
          <div class="file-number" aria-hidden="true">{currentCase.number}</div>
          <div>
            <p class="section-label">Situation inventée · région proche</p>
            {#if phase === 'active'}
              <h1 id="case-title" bind:this={stateHeading} tabindex="-1">{currentCase.title}</h1>
            {:else}
              <h2 id="case-title">{currentCase.title}</h2>
            {/if}
            <p>{currentCase.setting}</p>
          </div>
        </div>

        <div class="mission-strip">
          <span>Mission</span>
          <strong>{currentCase.mission}</strong>
        </div>
        <p class="distance-note"><span aria-hidden="true">◎</span>{currentCase.distantLink}</p>
      </article>

      <div class="work-grid">
        <fieldset class="actor-deck">
          <legend>
            <span>1</span>
            Choisis deux acteurs dont les rôles portent directement les deux usages.
          </legend>
          <p class="field-help">Deux sièges seulement. Touche une carte choisie pour la retirer.</p>

          <div class="actor-grid">
            {#each currentCase.actors as actor}
              <button
                type="button"
                class="actor-card"
                class:selected={actorIsSelected(actor.id)}
                aria-pressed={actorIsSelected(actor.id)}
                aria-label={`${actorIsSelected(actor.id) ? 'Retirer' : 'Choisir'} ${actor.name}. ${actor.kind}. Rôle : ${actor.role}. ${actor.quote}`}
                disabled={selectedActorIds.length === 2 && !actorIsSelected(actor.id)}
                data-smoke-attempt={markerKind(actor.marker)}
                data-smoke-step={markerStep(actor.marker)}
                onclick={() => toggleActor(actor.id)}
              >
                <span class="actor-topline">
                  <span class="actor-kind">{actor.kind}</span>
                  <span class="selection-flag">
                    {actorIsSelected(actor.id) ? `Siège ${selectedSeat(actor.id)} ✓` : 'Choisir +'}
                  </span>
                </span>
                <strong>{actor.name}</strong>
                <span class="role-line"><b>Rôle</b> {actor.role}</span>
                <q>{actor.quote.replaceAll('« ', '').replaceAll(' »', '')}</q>
              </button>
            {/each}
          </div>
        </fieldset>

        <aside class="round-table" aria-label="Composition actuelle de la table">
          <p class="section-label">Table en préparation</p>
          <div class="seat seat-one">
            <span>Siège 1</span>
            <strong>{selectedActors()[0]?.shortName ?? 'libre'}</strong>
          </div>
          <div class="table-center" aria-hidden="true"><span>même<br />lieu</span></div>
          <div class="seat seat-two">
            <span>Siège 2</span>
            <strong>{selectedActors()[1]?.shortName ?? 'libre'}</strong>
          </div>
          <div class="tension-line" aria-hidden="true"><i></i><i></i><i></i></div>
          <p>
            {selectedActorIds.length === 2
              ? 'Deux voix sont à la table. Relie-les maintenant par une question.'
              : `${2 - selectedActorIds.length} siège${selectedActorIds.length === 1 ? '' : 's'} encore libre${selectedActorIds.length === 1 ? '' : 's'}.`}
          </p>
        </aside>
      </div>

      <fieldset class="question-deck">
        <legend><span>2</span> Choisis une question qui n’efface aucun des deux intérêts.</legend>
        <div class="question-grid">
          {#each currentCase.questions as question}
            <button
              type="button"
              class="question-card"
              class:selected={selectedQuestionId === question.id}
              aria-pressed={selectedQuestionId === question.id}
              data-smoke-attempt={markerKind(question.marker)}
              data-smoke-step={markerStep(question.marker)}
              onclick={() => chooseQuestion(question.id)}
            >
              <span>{selectedQuestionId === question.id ? 'Question retenue ✓' : 'Proposition'}</span>
              <strong>{question.text}</strong>
            </button>
          {/each}
        </div>
      </fieldset>

      <div class="compact-tables" aria-labelledby="compact-tables-title">
        <p id="compact-tables-title">
          <strong>Alternative compacte</strong>
          Compare une table complète si cette présentation facilite la lecture des trois liens.
        </p>
        <div>
          {#each compactTableKinds() as kind, tableIndex}
            <button
              type="button"
              data-smoke-answer={kind}
              onclick={() => submitCompactTable(kind)}
            >
              <span>Table {tableIndex === 0 ? 'A' : 'B'}</span>
              {currentCase.actors.find((actor) => actor.id === (kind === 'correct' ? currentCase.correctActorIds[0] : currentCase.plannedWrongActorIds[0]))?.shortName}
              + {currentCase.actors.find((actor) => actor.id === (kind === 'correct' ? currentCase.correctActorIds[1] : currentCase.plannedWrongActorIds[1]))?.shortName}
              · {currentCase.questions.find((question) => question.id === (kind === 'correct' ? currentCase.correctQuestionId : currentCase.plannedWrongQuestionId))?.text}
            </button>
          {/each}
        </div>
      </div>

      <div class="submit-bar">
        <div aria-live="polite">
          <strong>{selectedActorIds.length}/2 acteurs</strong>
          <span> · {selectedQuestionId ? 'question choisie' : 'question à choisir'}</span>
        </div>
        <button
          class="primary"
          type="button"
          disabled={!responseIsComplete()}
          data-smoke-action="submit"
          onclick={submitResponse}
        >
          Vérifier la table <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  {:else if phase === 'incorrect'}
    <section
      class="outcome-shell incorrect-shell"
      data-smoke-state="incorrect"
      data-smoke-variation={currentCase.id}
      aria-labelledby="incorrect-title"
    >
      <header class="outcome-header">
        <span class="outcome-symbol" aria-hidden="true">↺</span>
        <div>
          <p class="section-label">Proposition à reprendre</p>
          <h1 id="incorrect-title" bind:this={stateHeading} tabindex="-1">
            Les deux usages ne sont pas encore reliés.
          </h1>
        </div>
      </header>

      {#if lastAttempt}
        <div class="submitted-table" aria-label="Proposition soumise">
          <div><span>Acteurs choisis</span><strong>{lastAttempt.actorNames.join(' + ')}</strong></div>
          <div><span>Question choisie</span><strong>« {lastAttempt.questionText} »</strong></div>
        </div>
      {/if}

      <div
        class="feedback-panel"
        role="status"
        aria-live="polite"
        data-smoke-feedback="incorrect"
        data-smoke-feedback-detail
      >
        <strong>Ce que ta proposition montre</strong>
        <p>{incorrectFeedback()}</p>
      </div>

      <div class="next-action">
        <p>Ta réponse reste visible ci-dessus. Au nouvel essai, les deux sièges seront libres.</p>
        <button class="primary" type="button" data-smoke-action="retry" onclick={retry}>
          Recomposer la table <span aria-hidden="true">↺</span>
        </button>
      </div>
    </section>
  {:else if phase === 'correct'}
    <section
      class="outcome-shell correct-shell"
      data-smoke-state="correct"
      data-smoke-variation={currentCase.id}
      aria-labelledby="correct-title"
    >
      <header class="outcome-header">
        <span class="outcome-symbol" aria-hidden="true">✓</span>
        <div>
          <p class="section-label">Relation établie</p>
          <h1 id="correct-title" bind:this={stateHeading} tabindex="-1">
            Deux rôles, deux représentations du même lieu.
          </h1>
        </div>
      </header>

      {#if lastAttempt}
        <div class="submitted-table" aria-label="Proposition soumise et retenue">
          <div><span>Acteurs choisis</span><strong>{lastAttempt.actorNames.join(' + ')}</strong></div>
          <div><span>Question choisie</span><strong>« {lastAttempt.questionText} »</strong></div>
        </div>
      {/if}

      <div
        class="feedback-panel"
        role="status"
        aria-live="polite"
        data-smoke-feedback="correct"
        data-smoke-feedback-detail
      >
        <strong>Pourquoi cette table tient ensemble</strong>
        <p>{currentCase.correctExplanation}</p>
      </div>
    </section>

    <section
      class="continuation-card"
      data-smoke-state="continuation"
      data-smoke-variation={currentCase.id}
      aria-label="Suite du parcours"
    >
      <div>
        <span>{caseIndex + 1} / {cases.length}</span>
        <p>
          {caseIndex === cases.length - 1
            ? 'Les trois situations sont prêtes à être comparées.'
            : 'Le prochain lieu change, mais la stratégie reste : rôle → usage → représentation.'}
        </p>
      </div>
      <button class="primary" type="button" data-smoke-action="continue" onclick={continueJourney}>
        {caseIndex === cases.length - 1 ? 'Voir le bilan' : 'Dossier suivant'}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  {:else}
    <section
      class="completion"
      data-smoke-state="complete"
      aria-labelledby="complete-title"
    >
      <p class="folio">Table de concertation · dossier clos</p>
      <div class="completion-mark" aria-hidden="true">3</div>
      <h1 id="complete-title" bind:this={stateHeading} tabindex="-1">
        Trois lieux, une stratégie à emporter.
      </h1>
      <p class="completion-lead" data-smoke-completion>
        Pour comprendre un désaccord sur un lieu, repère qui agit, quel est son rôle et quel
        usage explique sa manière de voir ce lieu. Une bonne question garde les intérêts
        divergents visibles avant de chercher une solution.
      </p>

      <ol class="completed-files" aria-label="Dossiers terminés">
        {#each cases as item}
          <li class:done={completedCaseIds().includes(item.id)}>
            <span aria-hidden="true">✓</span>
            <div><small>Dossier {item.number}</small><strong>{item.title}</strong></div>
          </li>
        {/each}
      </ol>

      <blockquote>
        <span>Repère géographique</span>
        « Le lieu est le même ; les rôles et les usages changent le point de vue. »
      </blockquote>

      <button class="secondary" type="button" onclick={begin}>Reprendre les trois dossiers</button>
    </section>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
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
    --ink: #172526;
    --muted: #596866;
    --paper: #fbf7ed;
    --paper-deep: #eee6d5;
    --line: #c8c0ad;
    --rust: #a9432c;
    --rust-dark: #73301f;
    --blue: #215d68;
    --blue-light: #d4e8e5;
    --yellow: #e8bd4f;
    position: relative;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: var(--paper-deep);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .paper-noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(23, 37, 38, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23, 37, 38, 0.025) 1px, transparent 1px);
    background-size: 31px 31px;
  }

  button {
    color: inherit;
    font: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible,
  summary:focus-visible,
  [tabindex="-1"]:focus-visible {
    outline: 4px solid var(--yellow);
    outline-offset: 4px;
  }

  h1[tabindex="-1"] {
    border-radius: 4px;
  }

  .intro {
    position: relative;
    display: grid;
    width: min(1180px, calc(100% - 40px));
    min-height: calc(100vh - 42px);
    grid-template-columns: minmax(0, 1.04fr) minmax(340px, 0.86fr);
    align-items: center;
    gap: clamp(42px, 8vw, 120px);
    margin: 0 auto;
    padding: 64px 0;
  }

  .folio,
  .section-label {
    margin: 0;
    color: var(--rust);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .intro h1,
  .outcome-shell h1,
  .completion h1 {
    margin: 18px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(3.2rem, 7.6vw, 7.2rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 0.88;
  }

  .intro h1 em {
    color: var(--blue);
    font-weight: 500;
  }

  .intro-lead,
  .completion-lead {
    max-width: 670px;
    margin: 28px 0 0;
    color: var(--muted);
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    line-height: 1.65;
  }

  .vocabulary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 30px 0;
  }

  .vocabulary div {
    padding: 14px 16px;
    border-top: 3px solid var(--blue);
    background: rgba(251, 247, 237, 0.72);
  }

  .vocabulary dt {
    font-weight: 850;
  }

  .vocabulary dd {
    margin: 5px 0 0;
    color: var(--muted);
    font-size: 0.83rem;
    line-height: 1.45;
  }

  .primary,
  .secondary {
    min-height: 50px;
    padding: 12px 18px;
    border-radius: 3px;
    font-weight: 850;
    cursor: pointer;
  }

  .primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 26px;
    border: 2px solid var(--rust-dark);
    color: white;
    background: var(--rust);
    box-shadow: 4px 4px 0 var(--rust-dark);
  }

  .primary:hover:not(:disabled) {
    background: #bf4d32;
  }

  .primary:active:not(:disabled) {
    box-shadow: 1px 1px 0 var(--rust-dark);
    transform: translate(3px, 3px);
  }

  .primary:disabled {
    border-color: #9d9b92;
    color: #656861;
    background: #d2d0c7;
    box-shadow: 3px 3px 0 #9d9b92;
    cursor: not-allowed;
  }

  .secondary {
    border: 2px solid var(--ink);
    background: transparent;
  }

  .control-note {
    margin: 14px 0 0;
    color: var(--muted);
    font-size: 0.76rem;
  }

  .intro-table {
    position: relative;
    min-height: 500px;
  }

  .place-disc {
    position: absolute;
    top: 18%;
    left: 12%;
    display: grid;
    width: 290px;
    height: 290px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--blue-light);
    box-shadow: 16px 18px 0 rgba(33, 93, 104, 0.16);
    text-align: center;
  }

  .place-disc span,
  .place-disc strong {
    position: absolute;
    font-family: Georgia, serif;
    font-size: 1.35rem;
  }

  .place-disc span { top: 68px; }
  .place-disc strong { bottom: 65px; }

  .place-disc i {
    width: 82%;
    border-top: 3px dashed var(--rust);
    transform: rotate(-17deg);
  }

  .voice {
    position: absolute;
    z-index: 2;
    max-width: 190px;
    padding: 13px 15px;
    border: 2px solid var(--ink);
    background: var(--paper);
    box-shadow: 5px 6px 0 var(--ink);
    font-family: Georgia, serif;
    font-weight: 700;
  }

  .voice-a { top: 12%; right: 0; transform: rotate(3deg); }
  .voice-b { bottom: 14%; left: 0; transform: rotate(-3deg); }

  .stamp {
    position: absolute;
    right: 4%;
    bottom: 7%;
    padding: 12px;
    border: 3px double var(--rust);
    border-radius: 50%;
    color: var(--rust);
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    font-weight: 900;
    line-height: 1.25;
    text-align: center;
    text-transform: uppercase;
    transform: rotate(-9deg);
  }

  .case-shell,
  .outcome-shell,
  .continuation-card,
  .completion {
    position: relative;
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
  }

  .case-shell {
    padding: 24px 0 60px;
  }

  .case-topbar {
    display: flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    margin-bottom: 28px;
  }

  .wordmark {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .wordmark span {
    padding: 7px;
    color: white;
    background: var(--blue);
    font-weight: 900;
    letter-spacing: 0.12em;
  }

  .progress-copy {
    display: grid;
    width: min(330px, 48vw);
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 12px;
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.69rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .progress-track {
    height: 6px;
    overflow: hidden;
    background: #d3cbb9;
  }

  .progress-track i {
    display: block;
    height: 100%;
    background: var(--rust);
  }

  .case-file,
  .scaffold,
  .previous-attempt,
  .actor-deck,
  .question-deck,
  .round-table,
  .submit-bar,
  .outcome-shell,
  .continuation-card,
  .completion {
    border: 1px solid var(--line);
    background: var(--paper);
    box-shadow: 0 14px 38px rgba(23, 37, 38, 0.08);
  }

  .case-file {
    padding: clamp(20px, 4vw, 40px);
    border-top: 7px solid var(--blue);
  }

  .file-heading {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
  }

  .file-number {
    color: var(--rust);
    font-family: Georgia, serif;
    font-size: clamp(3.4rem, 6vw, 5.8rem);
    line-height: 0.9;
  }

  .file-heading h1,
  .file-heading h2,
  .scaffold h1 {
    margin: 7px 0 0;
    font-family: Georgia, serif;
    font-size: clamp(2rem, 4.4vw, 4rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .file-heading h2 {
    font-size: clamp(1.8rem, 3.6vw, 3rem);
  }

  .file-heading p:last-child,
  .scaffold p:last-child {
    max-width: 760px;
    margin: 13px 0 0;
    color: var(--muted);
    line-height: 1.55;
  }

  .mission-strip {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px;
    margin-top: 25px;
    padding: 17px 18px;
    border-left: 5px solid var(--rust);
    background: #f4e6d8;
    line-height: 1.5;
  }

  .mission-strip span {
    color: var(--rust-dark);
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .distance-note {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    margin: 15px 0 0;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .distance-note span {
    color: var(--blue);
    font-size: 1.2rem;
    line-height: 1;
  }

  .scaffold {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px;
    margin-bottom: 18px;
    padding: 20px;
    border-left: 7px solid var(--yellow);
  }

  .scaffold-mark {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    font-size: 1.45rem;
  }

  .scaffold h1 {
    font-size: clamp(1.55rem, 3vw, 2.3rem);
  }

  .previous-attempt {
    margin: 0 0 18px;
    padding: 0 16px;
  }

  .previous-attempt summary {
    min-height: 48px;
    padding: 14px 0;
    font-weight: 800;
    cursor: pointer;
  }

  .previous-attempt p {
    margin: 0 0 16px;
    color: var(--muted);
    line-height: 1.55;
  }

  .work-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 290px;
    align-items: start;
    gap: 18px;
    margin-top: 18px;
  }

  fieldset {
    min-width: 0;
    margin: 0;
  }

  .actor-deck,
  .question-deck {
    padding: clamp(18px, 3vw, 28px);
  }

  legend {
    max-width: 850px;
    padding: 0 8px;
    font-family: Georgia, serif;
    font-size: clamp(1.15rem, 2vw, 1.42rem);
    font-weight: 700;
    line-height: 1.35;
  }

  legend > span {
    display: inline-grid;
    width: 31px;
    height: 31px;
    margin-right: 7px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue);
    font-family: ui-sans-serif, sans-serif;
    font-size: 0.8rem;
  }

  .field-help {
    margin: 7px 0 17px;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .actor-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .actor-card,
  .question-card {
    position: relative;
    min-width: 0;
    min-height: 48px;
    border: 2px solid #aaa38f;
    border-radius: 2px;
    background: #fffdf7;
    cursor: pointer;
    text-align: left;
  }

  .actor-card {
    display: flex;
    min-height: 220px;
    flex-direction: column;
    gap: 11px;
    padding: 14px;
  }

  .actor-card:hover:not(:disabled),
  .question-card:hover {
    border-color: var(--blue);
  }

  .actor-card.selected,
  .question-card.selected {
    border-color: var(--blue);
    background: var(--blue-light);
    box-shadow: inset 0 0 0 2px var(--paper), 4px 4px 0 var(--blue);
  }

  .actor-card:disabled {
    color: #777b76;
    background: #e8e5dd;
    cursor: not-allowed;
    opacity: 0.72;
  }

  .actor-topline {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .actor-kind,
  .selection-flag,
  .question-card > span {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 850;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .actor-kind {
    color: var(--muted);
    line-height: 1.4;
  }

  .selection-flag {
    flex: 0 0 auto;
    color: var(--blue);
  }

  .actor-card > strong {
    font-family: Georgia, serif;
    font-size: 1.2rem;
    line-height: 1.15;
  }

  .role-line {
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .role-line b {
    color: var(--rust-dark);
    text-transform: uppercase;
  }

  .actor-card q {
    margin-top: auto;
    font-family: Georgia, serif;
    font-size: 0.91rem;
    line-height: 1.45;
  }

  .round-table {
    position: sticky;
    top: 12px;
    display: grid;
    min-height: 415px;
    grid-template-rows: auto auto 1fr auto auto;
    padding: 22px;
    overflow: hidden;
    border-top: 7px solid var(--rust);
  }

  .seat {
    position: relative;
    z-index: 2;
    display: grid;
    min-height: 67px;
    align-content: center;
    margin-top: 15px;
    padding: 9px 12px;
    border: 2px solid var(--ink);
    background: var(--paper);
    text-align: center;
  }

  .seat span {
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    text-transform: uppercase;
  }

  .seat strong {
    margin-top: 4px;
    font-size: 0.82rem;
  }

  .table-center {
    display: grid;
    width: 135px;
    height: 135px;
    place-self: center;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: #f0cf79;
    box-shadow: 7px 8px 0 rgba(23, 37, 38, 0.18);
    text-align: center;
  }

  .table-center span {
    font-family: Georgia, serif;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .tension-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 11px 0;
  }

  .tension-line::before,
  .tension-line::after {
    width: 42px;
    border-top: 2px dashed var(--rust);
    content: "";
  }

  .tension-line i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--rust);
  }

  .round-table > p:last-child {
    margin: 0;
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.45;
    text-align: center;
  }

  .question-deck {
    margin-top: 18px;
  }

  .question-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 16px;
  }

  .question-card {
    display: grid;
    min-height: 126px;
    align-content: start;
    gap: 9px;
    padding: 15px;
  }

  .question-card > span {
    color: var(--rust-dark);
  }

  .question-card > strong {
    font-size: 0.89rem;
    line-height: 1.45;
  }

  .submit-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 18px;
    padding: 18px 22px;
  }

  .submit-bar > div {
    color: var(--muted);
    font-size: 0.82rem;
  }

  .submit-bar > div strong {
    color: var(--ink);
  }

  .outcome-shell {
    margin-top: clamp(30px, 6vw, 76px);
    padding: clamp(22px, 5vw, 54px);
  }

  .incorrect-shell { border-top: 8px solid var(--rust); }
  .correct-shell { border-top: 8px solid var(--blue); }

  .outcome-header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 20px;
  }

  .outcome-symbol {
    display: grid;
    width: 58px;
    height: 58px;
    place-items: center;
    border: 2px solid currentColor;
    border-radius: 50%;
    color: var(--rust);
    font-size: 1.6rem;
    font-weight: 900;
  }

  .correct-shell .outcome-symbol { color: var(--blue); }

  .outcome-shell h1 {
    max-width: 900px;
    margin-top: 8px;
    font-size: clamp(2.25rem, 5.5vw, 5rem);
    line-height: 0.98;
  }

  .submitted-table {
    display: grid;
    grid-template-columns: 0.75fr 1.25fr;
    gap: 1px;
    margin-top: 32px;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .submitted-table > div {
    display: grid;
    align-content: start;
    gap: 7px;
    min-width: 0;
    padding: 17px;
    background: #fffdf8;
  }

  .submitted-table span {
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .submitted-table strong {
    overflow-wrap: anywhere;
    line-height: 1.45;
  }

  .feedback-panel {
    margin-top: 16px;
    padding: 20px;
    border-left: 6px solid var(--rust);
    background: #f4e6d8;
  }

  .correct-shell .feedback-panel {
    border-left-color: var(--blue);
    background: var(--blue-light);
  }

  .feedback-panel > strong {
    font-family: Georgia, serif;
    font-size: 1.24rem;
  }

  .feedback-panel p {
    max-width: 900px;
    margin: 8px 0 0;
    line-height: 1.65;
  }

  .next-action,
  .continuation-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
  }

  .next-action {
    margin-top: 24px;
  }

  .next-action p {
    max-width: 560px;
    margin: 0;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .continuation-card {
    margin-top: 16px;
    margin-bottom: 60px;
    padding: 19px 24px;
    border-left: 6px solid var(--yellow);
  }

  .continuation-card > div {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .continuation-card > div > span {
    display: grid;
    width: 48px;
    height: 48px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue);
    font-weight: 900;
  }

  .continuation-card p {
    max-width: 620px;
    margin: 0;
    color: var(--muted);
    line-height: 1.45;
  }

  .completion {
    margin-top: clamp(28px, 7vw, 82px);
    margin-bottom: 60px;
    padding: clamp(25px, 6vw, 68px);
    border-top: 9px solid var(--blue);
    text-align: center;
  }

  .completion-mark {
    display: grid;
    width: 80px;
    height: 80px;
    margin: 22px auto 0;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--yellow);
    box-shadow: 6px 7px 0 var(--ink);
    font-family: Georgia, serif;
    font-size: 2.3rem;
    font-weight: 700;
  }

  .completion h1 {
    max-width: 900px;
    margin-right: auto;
    margin-left: auto;
    font-size: clamp(2.7rem, 7vw, 6.4rem);
    line-height: 0.94;
  }

  .completion-lead {
    margin-right: auto;
    margin-left: auto;
  }

  .completed-files {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 34px 0 0;
    padding: 0;
    list-style: none;
    text-align: left;
  }

  .completed-files li {
    display: flex;
    min-width: 0;
    min-height: 76px;
    align-items: center;
    gap: 12px;
    padding: 13px;
    border: 1px solid var(--line);
    background: #fffdf8;
  }

  .completed-files li > span {
    display: grid;
    width: 31px;
    height: 31px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--blue);
    font-weight: 900;
  }

  .completed-files small,
  .completed-files strong {
    display: block;
  }

  .completed-files small {
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    text-transform: uppercase;
  }

  .completed-files strong {
    margin-top: 3px;
    overflow-wrap: anywhere;
    font-size: 0.85rem;
  }

  blockquote {
    max-width: 750px;
    margin: 30px auto;
    padding: 22px;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    font-family: Georgia, serif;
    font-size: clamp(1.2rem, 2.4vw, 1.65rem);
    line-height: 1.45;
  }

  blockquote span {
    display: block;
    margin-bottom: 8px;
    color: var(--rust);
    font-family: ui-monospace, monospace;
    font-size: 0.64rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (max-width: 880px) {
    .intro {
      grid-template-columns: 1fr;
      padding-top: 44px;
    }

    .intro-table {
      min-height: 390px;
      order: -1;
    }

    .place-disc {
      top: 9%;
      left: calc(50% - 130px);
      width: 260px;
      height: 260px;
    }

    .work-grid {
      grid-template-columns: 1fr;
    }

    .round-table {
      position: static;
      min-height: 350px;
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 8px;
    }

    .round-table .section-label,
    .round-table > p:last-child {
      grid-column: 1 / -1;
    }

    .seat {
      align-self: center;
    }

    .table-center {
      width: 110px;
      height: 110px;
    }

    .tension-line {
      display: none;
    }

    .question-grid {
      grid-template-columns: 1fr;
    }

    .question-card {
      min-height: 92px;
    }
  }

  @media (max-width: 620px) {
    .intro,
    .case-shell,
    .outcome-shell,
    .continuation-card,
    .completion {
      width: min(100% - 24px, 1180px);
    }

    .intro {
      gap: 24px;
      padding: 28px 0 42px;
    }

    .intro h1 {
      font-size: clamp(2.75rem, 15vw, 4.1rem);
      line-height: 0.94;
    }

    .intro-table {
      min-height: 280px;
    }

    .place-disc {
      top: 14px;
      left: calc(50% - 92px);
      width: 184px;
      height: 184px;
      box-shadow: 10px 11px 0 rgba(33, 93, 104, 0.16);
    }

    .place-disc span { top: 38px; font-size: 1rem; }
    .place-disc strong { bottom: 37px; font-size: 1rem; }
    .voice { max-width: 134px; padding: 9px; font-size: 0.72rem; }
    .voice-a { top: 0; }
    .voice-b { bottom: 7px; }
    .stamp { display: none; }

    .vocabulary {
      grid-template-columns: 1fr;
    }

    .primary,
    .secondary {
      width: 100%;
    }

    .case-topbar {
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
    }

    .progress-copy {
      width: 100%;
    }

    .file-heading {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .file-number {
      font-size: 3rem;
    }

    .file-heading h1,
    .file-heading h2 {
      font-size: clamp(1.9rem, 10vw, 2.7rem);
    }

    .mission-strip {
      grid-template-columns: 1fr;
      gap: 5px;
    }

    .scaffold {
      grid-template-columns: 1fr;
    }

    .actor-grid {
      grid-template-columns: 1fr;
    }

    .actor-card {
      min-height: 205px;
    }

    .round-table {
      min-height: 440px;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
    }

    .round-table .section-label,
    .round-table > p:last-child {
      grid-column: auto;
    }

    .table-center {
      width: 105px;
      height: 105px;
    }

    .submit-bar,
    .next-action,
    .continuation-card {
      align-items: stretch;
      flex-direction: column;
    }

    .submit-bar .primary,
    .next-action .primary,
    .continuation-card .primary {
      width: 100%;
    }

    .outcome-header {
      grid-template-columns: 1fr;
    }

    .outcome-shell h1 {
      font-size: clamp(2rem, 11vw, 3rem);
    }

    .submitted-table {
      grid-template-columns: 1fr;
    }

    .continuation-card > div {
      align-items: flex-start;
    }

    .completed-files {
      grid-template-columns: 1fr;
    }
  }

  .compact-tables {
    width: min(1180px, calc(100% - 40px));
    margin: 20px auto;
    padding: 14px;
    border: 1px dashed var(--blue);
    border-radius: 10px;
    background: var(--blue-light);
  }

  .compact-tables > p {
    margin: 0 0 10px;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .compact-tables > p strong {
    display: block;
    color: var(--ink);
  }

  .compact-tables > div {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .compact-tables button {
    min-height: 72px;
    padding: 10px 12px;
    border: 1px solid var(--blue);
    border-radius: 8px;
    color: var(--ink);
    background: var(--paper);
    font: inherit;
    font-size: 0.78rem;
    line-height: 1.4;
    text-align: left;
    cursor: pointer;
  }

  .compact-tables button span {
    display: block;
    margin-bottom: 3px;
    color: var(--blue);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    .compact-tables { width: calc(100% - 24px); }
    .compact-tables > div { grid-template-columns: 1fr; }
  }

  @media (max-width: 350px) {
    .intro,
    .case-shell,
    .outcome-shell,
    .continuation-card,
    .completion {
      width: calc(100% - 16px);
    }

    .actor-deck,
    .question-deck,
    .case-file,
    .outcome-shell,
    .completion {
      padding-right: 14px;
      padding-left: 14px;
    }

    .actor-topline {
      flex-direction: column;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
</style>
