<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';

  type Choice = {
    id: string;
    name: string;
    explanation: string;
  };

  type Dossier = {
    id: string;
    folio: string;
    chapter: string;
    theme: string;
    place: string;
    context: string;
    actor: string;
    actorKind: string;
    fact: string;
    viewSpeaker: string;
    viewText: string;
    spatialLink?: string;
    categories: Choice[];
    roles: Choice[];
    correctCategory: string;
    wrongCategory: string;
    correctRole: string;
    wrongRole: string;
    categoryCorrection: string;
    roleCorrection: string;
    scaffoldLead: string;
    scaffoldSteps: string[];
    correctExplanation: string;
    takeaway: string;
  };

  const dossiers: Dossier[] = [
    {
      id: 'place-fontaine',
      folio: '01',
      chapter: 'Repérer qui agit',
      theme: 'Lieu fréquenté · loisirs',
      place: 'La place des Marronniers',
      context:
        'Cette place imaginaire se trouve près d’une école. Des groupes y passent avant ou après leurs activités.',
      actor: 'Le service communal',
      actorKind: 'Acteur à étudier',
      fact:
        'Son équipe installe une fontaine, contrôle l’eau chaque semaine et répare le bouton quand il se bloque.',
      viewSpeaker: 'Regard du groupe d’accueil',
      viewText: '« Pour nous, la place est une pause pratique après le sport. »',
      categories: [
        {
          id: 'public-collective',
          name: 'Collectif public',
          explanation: 'Un service organisé par la commune.'
        },
        {
          id: 'individual-private',
          name: 'Acteur individuel',
          explanation: 'Une personne agit pour elle-même.'
        },
        {
          id: 'private-collective',
          name: 'Collectif privé',
          explanation: 'Un groupe indépendant de la commune.'
        }
      ],
      roles: [
        {
          id: 'maintain-water',
          name: 'Équiper et entretenir la place',
          explanation: 'Faire fonctionner la fontaine et vérifier l’eau.'
        },
        {
          id: 'rest-after-sport',
          name: 'Se reposer après le sport',
          explanation: 'Utiliser la place comme lieu de pause.'
        },
        {
          id: 'sell-vegetables',
          name: 'Cultiver des légumes',
          explanation: 'Préparer des produits pour un marché.'
        }
      ],
      correctCategory: 'public-collective',
      wrongCategory: 'individual-private',
      correctRole: 'maintain-water',
      wrongRole: 'rest-after-sport',
      categoryCorrection:
        'Le dossier parle d’une équipe et d’un service organisé par la commune : l’acteur n’est donc pas une personne seule.',
      roleCorrection:
        'La pause après le sport décrit l’usage du groupe d’accueil. Pour le service communal, il faut suivre les verbes « installe, contrôle et répare ».',
      scaffoldLead: 'Sépare le groupe qui utilise la place de celui qui agit sur son équipement.',
      scaffoldSteps: [
        'Pour la catégorie, relis les mots « équipe », « service » et « commune ».',
        'Pour le rôle, cherche qui accomplit les actions « installe, contrôle et répare ».',
        'Le regard du groupe d’accueil explique son usage de la place, pas l’action du service.'
      ],
      correctExplanation:
        '« Collectif public » convient parce que le service est organisé par la commune et agit en équipe. Son rôle est d’équiper et d’entretenir la place : installer, contrôler et réparer sont les actions données par le dossier.',
      takeaway: 'Le nom de l’acteur ne suffit pas : ses actions précisent son rôle.'
    },
    {
      id: 'marche-cooperative',
      folio: '02',
      chapter: 'Suivre une chaîne d’actions',
      theme: 'Région proche · approvisionnement et échanges',
      place: 'Du champ au marché',
      context:
        'Dans ce dossier imaginaire, sept exploitations familiales de la région ont créé la coopérative « Le Cabas proche ».',
      actor: 'La coopérative Le Cabas proche',
      actorKind: 'Acteur à étudier',
      fact:
        'Chaque vendredi, elle rassemble les légumes de ses membres dans un local, puis organise leur vente au marché de la ville.',
      viewSpeaker: 'Regard d’une cliente',
      viewText: '« Pour moi, le marché est un lieu où choisir des aliments pour mes repas. »',
      spatialLink: 'Lien spatial : plusieurs fermes de la région → un marché en ville.',
      categories: [
        {
          id: 'private-economic-collective',
          name: 'Collectif privé à activité économique',
          explanation: 'Ses membres s’organisent pour échanger et vendre.'
        },
        {
          id: 'public-collective',
          name: 'Collectif public',
          explanation: 'Un service dépend de la commune.'
        },
        {
          id: 'individual-private',
          name: 'Acteur individuel',
          explanation: 'Une seule personne agit pour elle-même.'
        }
      ],
      roles: [
        {
          id: 'gather-and-sell',
          name: 'Regrouper puis organiser la vente',
          explanation: 'Relier les légumes des fermes au marché de la ville.'
        },
        {
          id: 'set-market-rules',
          name: 'Fixer les horaires de tous les marchés',
          explanation: 'Décider des règles pour toute la commune.'
        },
        {
          id: 'buy-meal',
          name: 'Acheter un panier pour un repas',
          explanation: 'Choisir des produits comme cliente ou client.'
        }
      ],
      correctCategory: 'private-economic-collective',
      wrongCategory: 'public-collective',
      correctRole: 'gather-and-sell',
      wrongRole: 'set-market-rules',
      categoryCorrection:
        'La coopérative est créée par les exploitations qui en sont membres ; aucun indice ne dit qu’elle dépend de la commune.',
      roleCorrection:
        'Le dossier ne lui donne pas le pouvoir de fixer les règles du marché. Il décrit deux actions : rassembler les légumes, puis organiser leur vente.',
      scaffoldLead: 'Suis à la fois l’organisation du groupe et le trajet des légumes.',
      scaffoldSteps: [
        'Demande-toi qui a créé la coopérative : la commune ou les exploitations membres ?',
        'Repère les deux verbes qui ont la coopérative pour sujet.',
        'La cliente utilise le marché ; elle n’explique pas le rôle de la coopérative.'
      ],
      correctExplanation:
        'La coopérative est un collectif privé à activité économique parce que ses exploitations membres s’organisent pour échanger et vendre. Son rôle relie deux actions attestées : regrouper les légumes des fermes, puis organiser leur vente en ville.',
      takeaway: 'Un rôle peut former une chaîne : rassembler ici, organiser l’échange là-bas.'
    },
    {
      id: 'sentier-regard',
      folio: '03',
      chapter: 'Distinguer regard et rôle',
      theme: 'Lieu documenté · loisirs',
      place: 'Le sentier du Bois-Clair',
      context:
        'Une fiche présente ce sentier imaginaire de la région proche et le club de randonnée « Pas à Pas », formé par des habitantes et habitants.',
      actor: 'Le club de randonnée Pas à Pas',
      actorKind: 'Acteur à étudier',
      fact:
        'Chaque printemps, ses membres vérifient les balises et publient une fiche du parcours pour les personnes qui suivent le sentier.',
      viewSpeaker: 'Représentation du club',
      viewText: '« Pour notre club, ce bois est un lieu de promenade à rendre facile à suivre. »',
      categories: [
        {
          id: 'private-social-collective',
          name: 'Collectif privé à rôle social',
          explanation: 'Les membres d’une association agissent ensemble.'
        },
        {
          id: 'individual-private',
          name: 'Acteur individuel',
          explanation: 'Une seule personne agit pour elle-même.'
        },
        {
          id: 'public-economic-collective',
          name: 'Collectif public à activité économique',
          explanation: 'Un service communal vend un produit.'
        }
      ],
      roles: [
        {
          id: 'mark-and-inform',
          name: 'Vérifier les balises et informer',
          explanation: 'Aider les personnes à suivre le parcours.'
        },
        {
          id: 'enjoy-woods',
          name: 'Se promener pour admirer le bois',
          explanation: 'Exprimer un usage ou un regard sur le lieu.'
        },
        {
          id: 'permit-logging',
          name: 'Autoriser l’abattage des arbres',
          explanation: 'Décider quelles coupes de bois sont permises.'
        }
      ],
      correctCategory: 'private-social-collective',
      wrongCategory: 'individual-private',
      correctRole: 'mark-and-inform',
      wrongRole: 'enjoy-woods',
      categoryCorrection:
        'Le texte parle d’un club, de membres et d’une association d’habitantes et habitants : plusieurs personnes agissent ensemble.',
      roleCorrection:
        'La promenade appartient au regard porté sur le bois. Les actions vérifiables du club sont « vérifient les balises » et « publient une fiche ».',
      scaffoldLead: 'Pose les deux phrases dans deux tiroirs : « manière de voir » et « action vérifiable ».',
      scaffoldSteps: [
        'Les mots « club » et « membres » donnent un indice sur la catégorie.',
        'La citation commence par « Pour notre club » : elle exprime une représentation du lieu.',
        'Pour le rôle, reviens à la phrase qui raconte ce que les membres font chaque printemps.'
      ],
      correctExplanation:
        'Le club est un collectif privé à rôle social : ses membres agissent ensemble dans une association. Sa représentation présente le bois comme lieu de promenade ; son rôle, appuyé par des actions, est de vérifier les balises et d’informer avec une fiche de parcours.',
      takeaway: 'Un regard dit ce que le lieu représente ; un rôle dit ce que l’acteur y fait.'
    }
  ];

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let dossier = dossiers[0];
  let selectedCategory: string | null = null;
  let selectedRole: string | null = null;
  let submittedCategory: string | null = null;
  let submittedRole: string | null = null;
  let announcement = '';
  let focusTarget: HTMLElement | undefined;

  function choiceById(choices: Choice[], id: string | null): Choice | undefined {
    return choices.find((choice) => choice.id === id);
  }

  function categoryName(id: string | null): string {
    return choiceById(dossier.categories, id)?.name ?? 'Aucune catégorie';
  }

  function roleName(id: string | null): string {
    return choiceById(dossier.roles, id)?.name ?? 'Aucun rôle';
  }

  function responseReady(): boolean {
    return selectedCategory !== null && selectedRole !== null;
  }

  function responseCorrect(): boolean {
    return (
      submittedCategory === dossier.correctCategory && submittedRole === dossier.correctRole
    );
  }

  function rootLegacyState(): 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' {
    if (phase === 'intro') return 'ready';
    if (phase === 'incorrect') return 'incorrect';
    if (phase === 'correct') return 'correct';
    if (phase === 'complete') return 'complete';
    return 'question';
  }

  function rootVariation(): string | undefined {
    return phase === 'incorrect' || phase === 'correct' ? dossier.id : undefined;
  }

  function categoryFeedback(): string {
    if (submittedCategory === dossier.correctCategory) {
      return `La catégorie « ${categoryName(submittedCategory)} » est bien appuyée par l’organisation décrite.`;
    }
    return `Tu as choisi « ${categoryName(submittedCategory)} ». ${dossier.categoryCorrection}`;
  }

  function roleFeedback(): string {
    if (submittedRole === dossier.correctRole) {
      return `Le rôle « ${roleName(submittedRole)} » reprend bien les actions attribuées à l’acteur.`;
    }
    return `Tu as choisi « ${roleName(submittedRole)} ». ${dossier.roleCorrection}`;
  }

  async function focusState(): Promise<void> {
    await tick();
    focusTarget?.focus();
  }

  async function startPractice(): Promise<void> {
    currentIndex = 0;
    dossier = dossiers[0];
    selectedCategory = null;
    selectedRole = null;
    submittedCategory = null;
    submittedRole = null;
    phase = 'active';
    announcement = `Dossier 1 sur ${dossiers.length} : ${dossier.place}.`;
    await focusState();
  }

  function chooseCategory(id: string): void {
    selectedCategory = id;
    announcement = `Catégorie choisie : ${categoryName(id)}. Choisis aussi le rôle avant de déposer la fiche.`;
  }

  function chooseRole(id: string): void {
    selectedRole = id;
    announcement = `Rôle choisi : ${roleName(id)}. ${selectedCategory ? 'La fiche peut maintenant être déposée.' : 'Choisis aussi une catégorie.'}`;
  }

  async function submitCard(): Promise<void> {
    if (!responseReady()) return;

    submittedCategory = selectedCategory;
    submittedRole = selectedRole;
    if (responseCorrect()) {
      phase = 'correct';
      announcement = `Fiche accordée aux indices pour ${dossier.actor}. Lis l’explication avant de continuer.`;
    } else {
      phase = 'incorrect';
      announcement = `La fiche de ${dossier.actor} contient une partie à revoir. Lis les deux explications.`;
    }
    await focusState();
  }

  function compactCardKinds(): Array<'incorrect' | 'correct'> {
    return currentIndex % 2 === 0 ? ['incorrect', 'correct'] : ['correct', 'incorrect'];
  }

  async function submitCompactCard(kind: 'incorrect' | 'correct'): Promise<void> {
    selectedCategory = kind === 'correct' ? dossier.correctCategory : dossier.wrongCategory;
    selectedRole = kind === 'correct' ? dossier.correctRole : dossier.wrongRole;
    await submitCard();
  }

  async function openScaffold(): Promise<void> {
    selectedCategory = null;
    selectedRole = null;
    phase = 'retry';
    announcement = `Repère ouvert pour ${dossier.place}. Recompose ensuite les deux parties de la fiche.`;
    await focusState();
  }

  async function continuePractice(): Promise<void> {
    if (currentIndex === dossiers.length - 1) {
      phase = 'complete';
      announcement = 'Les trois dossiers sont terminés. La stratégie de lecture est résumée.';
      await focusState();
      return;
    }

    currentIndex += 1;
    dossier = dossiers[currentIndex];
    selectedCategory = null;
    selectedRole = null;
    submittedCategory = null;
    submittedRole = null;
    phase = 'active';
    announcement = `Dossier ${currentIndex + 1} sur ${dossiers.length} : ${dossier.place}.`;
    await focusState();
  }
</script>

<svelte:head>
  <title>Le bureau des rôles · EX-0304</title>
  <meta
    name="description"
    content="Prototype de géographie 6H pour catégoriser des acteurs et expliciter leurs rôles à partir d’indices."
  />
</svelte:head>

<!-- The root state values also retain the checked-in legacy vocabulary. In incorrect,
     correct and complete they are the visible 6H-SMOKE-1 state regions themselves. -->
<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0304"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={rootLegacyState()}
  data-smoke-variation={rootVariation()}
>
<main
  class="role-office"
  data-smoke-contract="6h-v1"
  data-exercise-id="EX-0304"
>
  {#if phase === 'intro'}
    <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="overline">Géographie · bureau d’enquête 6H</p>
        <h1 id="intro-title">Le bureau<br /><em>des rôles</em></h1>
        <p class="intro-lead">
          Un acteur est une personne ou un groupe qui agit dans un lieu. Examine trois
          dossiers, puis compose pour chaque acteur une fiche qui explique <strong>qui il est</strong>
          et <strong>ce qu’il fait</strong>.
        </p>

        <div class="method-strip" aria-label="La méthode en quatre questions">
          <span>Qui agit&nbsp;?</span>
          <span>Quel groupe&nbsp;?</span>
          <span>Quelle action&nbsp;?</span>
          <span>Quel indice&nbsp;?</span>
        </div>

        <button class="primary" type="button" data-smoke-action="start" onclick={startPractice}>
          Ouvrir le premier dossier <span aria-hidden="true">→</span>
        </button>
        <p class="control-note">Clavier ou toucher · aucun temps limite · environ 8 minutes</p>
      </div>

      <aside class="desk-preview" aria-label="Vocabulaire utile">
        <div class="preview-tab">LEXIQUE / 03</div>
        <article class="definition-card definition-one">
          <span aria-hidden="true">A</span>
          <div>
            <h2>Acteur</h2>
            <p>Personne ou groupe qui utilise, organise ou transforme un lieu.</p>
          </div>
        </article>
        <article class="definition-card definition-two">
          <span aria-hidden="true">R</span>
          <div>
            <h2>Rôle</h2>
            <p>Ce que l’acteur fait ici. Le dossier doit fournir un indice.</p>
          </div>
        </article>
        <article class="definition-card definition-three">
          <span aria-hidden="true">◌</span>
          <div>
            <h2>Regard</h2>
            <p>La manière dont un groupe décrit le lieu. Un regard n’est pas toujours une action.</p>
          </div>
        </article>
        <p class="paper-note">Les lieux et les organisations de ces dossiers sont imaginaires.</p>
      </aside>
    </section>
  {:else if phase === 'active' || phase === 'retry'}
    <section
      class="workspace"
      data-smoke-state={phase}
      data-smoke-variation={dossier.id}
      aria-labelledby="case-title"
    >
      <header class="office-header">
        <div class="office-mark" aria-hidden="true">BR</div>
        <div class="progress-copy">
          <span>Dossier {currentIndex + 1} sur {dossiers.length}</span>
          <strong>{dossier.chapter}</strong>
        </div>
        <div
          class="progress-track"
          role="progressbar"
          aria-label="Progression dans les dossiers"
          aria-valuemin="1"
          aria-valuemax={dossiers.length}
          aria-valuenow={currentIndex + 1}
        >
          {#each dossiers as item, itemIndex}
            <span class:reached={itemIndex <= currentIndex}>
              <i class="sr-only">Dossier {itemIndex + 1}{itemIndex <= currentIndex ? ' atteint' : ' à venir'}</i>
            </span>
          {/each}
        </div>
      </header>

      {#if phase === 'retry'}
        <div class="retry-banner">
          <div class="retry-symbol" aria-hidden="true">↺</div>
          <div>
            <p class="overline">Repère de reprise</p>
            <h2 bind:this={focusTarget} tabindex="-1">{dossier.scaffoldLead}</h2>
            <ol>
              {#each dossier.scaffoldSteps as step}
                <li>{step}</li>
              {/each}
            </ol>
          </div>
        </div>

        <div class="previous-card" aria-label="Fiche déposée lors de l’essai précédent">
          <span>Essai précédent</span>
          <p><strong>Catégorie :</strong> {categoryName(submittedCategory)}</p>
          <p><strong>Rôle :</strong> {roleName(submittedRole)}</p>
        </div>
      {/if}

      <div class="case-heading">
        <div class="folio" aria-hidden="true">{dossier.folio}</div>
        <div>
          <p class="overline">{dossier.theme}</p>
          {#if phase === 'active'}
            <h1 id="case-title" bind:this={focusTarget} tabindex="-1">{dossier.place}</h1>
          {:else}
            <h3 id="case-title">Recompose la fiche de {dossier.actor}.</h3>
          {/if}
          <p>{dossier.context}</p>
        </div>
      </div>

      <div class="dossier-layout">
        <article class="evidence-board" aria-labelledby="evidence-title">
          <div class="board-heading">
            <span>INDICES</span>
            <span>{dossier.folio} / {dossiers.length.toString().padStart(2, '0')}</span>
          </div>

          <div class="actor-label">
            <small>{dossier.actorKind}</small>
            <h2 id="evidence-title">{dossier.actor}</h2>
          </div>

          <div class="evidence-note fact-note">
            <span aria-hidden="true">1</span>
            <div>
              <strong>Fait décrit</strong>
              <p>{dossier.fact}</p>
            </div>
          </div>

          <div class="evidence-note view-note">
            <span aria-hidden="true">2</span>
            <div>
              <strong>{dossier.viewSpeaker}</strong>
              <p>{dossier.viewText}</p>
            </div>
          </div>

          {#if dossier.spatialLink}
            <p class="spatial-link"><span aria-hidden="true">↗</span>{dossier.spatialLink}</p>
          {/if}

          <div class="mini-lexicon">
            <p><strong>Public</strong> = organisé par la commune dans ce dossier.</p>
            <p><strong>Privé</strong> = organisé par des membres, hors de la commune.</p>
            <p><strong>Collectif</strong> = plusieurs personnes agissent dans une organisation.</p>
          </div>
        </article>

        <article class="response-sheet" aria-labelledby="response-title">
          <div class="sheet-heading">
            <div>
              <p class="overline">Fiche à composer</p>
              <h2 id="response-title">Quel est son rôle dans ce lieu&nbsp;?</h2>
            </div>
            <span class="sheet-stamp" aria-hidden="true">À CLASSER</span>
          </div>

          <fieldset>
            <legend><span>1</span> Choisis le type d’acteur</legend>
            <div class="choice-list">
              {#each dossier.categories as choice}
                <button
                  type="button"
                  class="choice-card"
                  class:selected={selectedCategory === choice.id}
                  aria-pressed={selectedCategory === choice.id}
                  data-smoke-attempt={choice.id === dossier.wrongCategory
                    ? 'incorrect'
                    : choice.id === dossier.correctCategory
                      ? 'correct'
                      : undefined}
                  data-smoke-step={choice.id === dossier.wrongCategory ||
                  choice.id === dossier.correctCategory
                    ? '1'
                    : undefined}
                  onclick={() => chooseCategory(choice.id)}
                >
                  <span class="choice-check" aria-hidden="true">{selectedCategory === choice.id ? '✓' : '○'}</span>
                  <span>
                    <strong>{choice.name}</strong>
                    <small>{choice.explanation}</small>
                  </span>
                </button>
              {/each}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>2</span> Choisis l’action qui explicite son rôle</legend>
            <div class="choice-list">
              {#each dossier.roles as choice}
                <button
                  type="button"
                  class="choice-card role-choice"
                  class:selected={selectedRole === choice.id}
                  aria-pressed={selectedRole === choice.id}
                  data-smoke-attempt={choice.id === dossier.wrongRole
                    ? 'incorrect'
                    : choice.id === dossier.correctRole
                      ? 'correct'
                      : undefined}
                  data-smoke-step={choice.id === dossier.wrongRole || choice.id === dossier.correctRole
                    ? '2'
                    : undefined}
                  onclick={() => chooseRole(choice.id)}
                >
                  <span class="choice-check" aria-hidden="true">{selectedRole === choice.id ? '✓' : '○'}</span>
                  <span>
                    <strong>{choice.name}</strong>
                    <small>{choice.explanation}</small>
                  </span>
                </button>
              {/each}
            </div>
          </fieldset>

          <div class="compact-cards" aria-labelledby="compact-cards-title">
            <p id="compact-cards-title">
              <strong>Alternative compacte</strong>
              Compare une fiche complète et dépose-la directement si cette présentation t’aide.
            </p>
            <div>
              {#each compactCardKinds() as kind, cardIndex}
                <button
                  type="button"
                  data-smoke-answer={kind}
                  onclick={() => submitCompactCard(kind)}
                >
                  <span>Fiche {cardIndex === 0 ? 'A' : 'B'}</span>
                  {categoryName(kind === 'correct' ? dossier.correctCategory : dossier.wrongCategory)}
                  · {roleName(kind === 'correct' ? dossier.correctRole : dossier.wrongRole)}
                </button>
              {/each}
            </div>
          </div>

          <div class="submit-row">
            <p aria-live="polite">
              {#if responseReady()}
                Deux parties choisies. Dépose la fiche quand tu es prêt·e.
              {:else if selectedCategory || selectedRole}
                Il reste une partie à choisir.
              {:else}
                Choisis une catégorie et un rôle. Rien n’est corrigé avant le dépôt.
              {/if}
            </p>
            <button
              class="primary submit-button"
              type="button"
              data-smoke-action="submit"
              disabled={!responseReady()}
              onclick={submitCard}
            >
              Déposer ma fiche <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  {:else if phase === 'incorrect'}
    <section
      class="feedback-shell"
      data-smoke-state="incorrect"
      data-smoke-variation={dossier.id}
      aria-labelledby="incorrect-title"
    >
      <header class="feedback-heading">
        <span class="result-mark reconsider" aria-hidden="true">↺</span>
        <div>
          <p class="overline">Dossier {currentIndex + 1} · fiche déposée</p>
          <h1 id="incorrect-title" bind:this={focusTarget} tabindex="-1">Une relation est à revoir.</h1>
          <p>Ta fiche reste visible. Compare chaque partie avec les indices de {dossier.place}.</p>
        </div>
      </header>

      <div class="submitted-sheet" aria-label="Réponse déposée">
        <div>
          <span>Catégorie déposée</span>
          <strong>{categoryName(submittedCategory)}</strong>
        </div>
        <div>
          <span>Rôle déposé</span>
          <strong>{roleName(submittedRole)}</strong>
        </div>
      </div>

      <div
        class="explanation-box incorrect-box"
        role="status"
        aria-live="polite"
        data-smoke-feedback="incorrect"
        data-smoke-feedback-detail
      >
        <p><span aria-hidden="true">△</span><strong>Catégorie</strong> — {categoryFeedback()}</p>
        <p><span aria-hidden="true">△</span><strong>Rôle</strong> — {roleFeedback()}</p>
      </div>

      <blockquote>
        <span>Question utile</span>
        « Quel verbe du dossier raconte vraiment l’action de {dossier.actor}&nbsp;? »
      </blockquote>

      <div class="feedback-action">
        <p>Le repère aide à relire les indices ; il ne remplit pas la fiche à ta place.</p>
        <button class="primary" type="button" data-smoke-action="retry" onclick={openScaffold}>
          Ouvrir un repère <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  {:else if phase === 'correct'}
    <section
      class="feedback-shell correct-shell"
      data-smoke-state="correct"
      data-smoke-variation={dossier.id}
      aria-labelledby="correct-title"
    >
      <header class="feedback-heading">
        <span class="result-mark agreed" aria-hidden="true">✓</span>
        <div>
          <p class="overline">Dossier {currentIndex + 1} · fiche déposée</p>
          <h1 id="correct-title" bind:this={focusTarget} tabindex="-1">La fiche s’accorde aux indices.</h1>
          <p>Les deux parties décrivent le même acteur dans la même situation.</p>
        </div>
      </header>

      <div class="submitted-sheet correct-submission" aria-label="Réponse correcte déposée">
        <div>
          <span>Catégorie appuyée</span>
          <strong>{categoryName(submittedCategory)}</strong>
        </div>
        <div>
          <span>Rôle appuyé</span>
          <strong>{roleName(submittedRole)}</strong>
        </div>
      </div>

      <div
        class="explanation-box correct-box"
        role="status"
        aria-live="polite"
        data-smoke-feedback="correct"
        data-smoke-feedback-detail
      >
        <p><span aria-hidden="true">✓</span>{dossier.correctExplanation}</p>
      </div>

      <div class="takeaway-card">
        <span>À garder sur le bureau</span>
        <p>{dossier.takeaway}</p>
      </div>

      <section
        class="continuation-band"
        data-smoke-state="continuation"
        data-smoke-variation={dossier.id}
        aria-label="Continuer la pratique"
      >
        <div>
          <span>{currentIndex === dossiers.length - 1 ? 'Trois fiches déposées' : 'Variation suivante'}</span>
          <p>
            {currentIndex === dossiers.length - 1
              ? 'Relis maintenant la stratégie commune aux trois dossiers.'
              : `Le prochain dossier change la structure des indices, pas la méthode.`}
          </p>
        </div>
        <button class="primary" type="button" data-smoke-action="continue" onclick={continuePractice}>
          {currentIndex === dossiers.length - 1 ? 'Fermer les dossiers' : 'Dossier suivant'}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </section>
  {:else}
    <section class="completion" data-smoke-state="complete" aria-labelledby="completion-title">
      <div class="closed-file" aria-hidden="true">
        <span>03</span>
        <i></i>
        <b>CLASSÉ</b>
      </div>

      <div class="completion-copy" data-smoke-completion>
        <p class="overline">Bureau fermé · trois dossiers parcourus</p>
        <h1 id="completion-title" bind:this={focusTarget} tabindex="-1">Une stratégie pour expliquer un rôle.</h1>
        <p class="completion-lead">
          Cette pratique est terminée, sans score. Elle ne prouve pas encore une maîtrise : elle a permis
          d’essayer la même méthode sur trois organisations et trois formes d’indices.
        </p>

        <ol class="strategy-list">
          <li><span>1</span><p><strong>Nommer l’acteur</strong> ciblé par le dossier.</p></li>
          <li><span>2</span><p><strong>Repérer son organisation</strong> : personne, groupe, public ou privé.</p></li>
          <li><span>3</span><p><strong>Suivre ses verbes</strong> pour décrire ce qu’il fait.</p></li>
          <li><span>4</span><p><strong>Distinguer l’action du regard</strong> porté sur le lieu.</p></li>
        </ol>

        <blockquote>
          « Un rôle s’explique avec une action et un indice, pas seulement avec le nom de l’acteur. »
        </blockquote>
      </div>

      <div class="privacy-note">
        <span aria-hidden="true">○</span>
        <p>Aucune réponse, identité ou note n’a été enregistrée ni envoyée.</p>
      </div>

      <button class="secondary" type="button" onclick={startPractice}>Reprendre les trois dossiers</button>
    </section>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
</main>
</div>

<style>
  .legacy-smoke-root {
    display: contents;
  }

  .role-office,
  .role-office * {
    box-sizing: border-box;
  }

  .role-office {
    --ink: #17213b;
    --ink-soft: #39435d;
    --paper: #fbf7ec;
    --paper-deep: #f1ead9;
    --line: #c8c0ad;
    --coral: #c95742;
    --coral-dark: #934032;
    --teal: #28776f;
    --teal-dark: #195b55;
    --sun: #e6b84a;
    --mist: #dce9e4;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background:
      radial-gradient(circle at 8% 8%, rgba(230, 184, 74, 0.14), transparent 22rem),
      radial-gradient(circle at 95% 96%, rgba(40, 119, 111, 0.12), transparent 28rem),
      var(--paper-deep);
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .role-office button {
    font: inherit;
  }

  .role-office button,
  .role-office [tabindex="-1"] {
    outline: none;
  }

  .role-office button:focus-visible,
  .role-office [tabindex="-1"]:focus-visible {
    outline: 4px solid var(--sun);
    outline-offset: 4px;
  }

  .role-office h1,
  .role-office h2,
  .role-office h3,
  .role-office p,
  .role-office blockquote {
    overflow-wrap: anywhere;
  }

  .overline {
    margin: 0;
    color: var(--coral-dark);
    font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .primary,
  .secondary {
    display: inline-flex;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 12px 18px;
    border-radius: 4px;
    font-weight: 800;
    cursor: pointer;
  }

  .primary {
    border: 2px solid var(--ink);
    color: white;
    background: var(--ink);
    box-shadow: 5px 5px 0 var(--coral);
    transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
  }

  .primary:hover:not(:disabled) {
    background: var(--teal-dark);
    transform: translate(-1px, -1px);
    box-shadow: 7px 7px 0 var(--coral);
  }

  .primary:active:not(:disabled) {
    transform: translate(3px, 3px);
    box-shadow: 2px 2px 0 var(--coral);
  }

  .primary:disabled {
    border-color: #85899a;
    color: #565d70;
    background: #d8d6d0;
    box-shadow: 3px 3px 0 #aaa69e;
    cursor: not-allowed;
  }

  .secondary {
    border: 2px solid var(--ink);
    color: var(--ink);
    background: transparent;
  }

  .intro {
    display: grid;
    width: min(1160px, calc(100% - 40px));
    min-height: calc(100vh - 42px);
    grid-template-columns: minmax(0, 1.08fr) minmax(330px, 0.92fr);
    align-items: center;
    gap: clamp(36px, 7vw, 96px);
    margin: 0 auto;
    padding: 64px 0;
  }

  .intro-copy h1 {
    margin: 18px 0 24px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(4rem, 8.8vw, 8rem);
    font-weight: 500;
    letter-spacing: -0.075em;
    line-height: 0.82;
  }

  .intro-copy h1 em {
    color: var(--teal-dark);
    font-weight: 500;
  }

  .intro-lead {
    max-width: 660px;
    margin: 0;
    color: var(--ink-soft);
    font-size: clamp(1rem, 1.8vw, 1.18rem);
    line-height: 1.65;
  }

  .method-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin: 30px 0;
  }

  .method-strip span {
    padding: 7px 10px;
    border: 1px solid var(--ink);
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.42);
    font-size: 0.76rem;
    font-weight: 800;
  }

  .control-note {
    margin: 17px 0 0;
    color: var(--ink-soft);
    font-size: 0.76rem;
  }

  .desk-preview {
    position: relative;
    padding: 56px 30px 34px;
    border: 1px solid #aaa18d;
    background:
      linear-gradient(rgba(23, 33, 59, 0.035) 1px, transparent 1px),
      var(--paper);
    background-size: 100% 29px;
    box-shadow: 17px 19px 0 rgba(23, 33, 59, 0.11);
    transform: rotate(1deg);
  }

  .preview-tab {
    position: absolute;
    top: -1px;
    left: 24px;
    padding: 9px 14px;
    color: white;
    background: var(--coral);
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .definition-card {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 15px;
    align-items: start;
    padding: 18px 0;
    border-bottom: 1px dashed var(--line);
  }

  .definition-card > span {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--sun);
    font-family: Georgia, serif;
    font-weight: 800;
  }

  .definition-two > span { background: var(--mist); }
  .definition-three > span { background: #f2c8bd; }

  .definition-card h2 {
    margin: 0 0 4px;
    font-family: Georgia, serif;
    font-size: 1.25rem;
  }

  .definition-card p,
  .paper-note {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .paper-note {
    margin-top: 22px;
    font-style: italic;
  }

  .workspace,
  .feedback-shell,
  .completion {
    width: min(1160px, calc(100% - 40px));
    margin: 0 auto;
    padding: 28px 0 64px;
  }

  .office-header {
    display: grid;
    grid-template-columns: auto minmax(160px, 1fr) minmax(180px, 0.75fr);
    align-items: center;
    gap: 18px;
    padding-bottom: 22px;
    border-bottom: 2px solid var(--ink);
  }

  .office-mark {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    color: white;
    background: var(--ink);
    font-family: Georgia, serif;
    font-weight: 800;
    transform: rotate(-3deg);
  }

  .progress-copy {
    display: grid;
    gap: 2px;
  }

  .progress-copy span {
    color: var(--ink-soft);
    font-family: ui-monospace, monospace;
    font-size: 0.66rem;
    text-transform: uppercase;
  }

  .progress-copy strong {
    font-family: Georgia, serif;
    font-size: 1.08rem;
  }

  .progress-track {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .progress-track > span {
    height: 8px;
    border: 1px solid #95909a;
    background: transparent;
  }

  .progress-track > span.reached {
    border-color: var(--teal-dark);
    background: var(--teal);
  }

  .retry-banner {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    margin-top: 28px;
    padding: 24px;
    border: 2px solid var(--coral-dark);
    background: #fff0e7;
    box-shadow: 7px 7px 0 rgba(147, 64, 50, 0.18);
  }

  .retry-symbol {
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--coral-dark);
    font-size: 1.6rem;
    font-weight: 900;
  }

  .retry-banner h2 {
    margin: 7px 0 11px;
    font-family: Georgia, serif;
    font-size: clamp(1.45rem, 3vw, 2.3rem);
  }

  .retry-banner ol {
    margin: 0;
    padding-left: 1.3rem;
    color: var(--ink-soft);
    line-height: 1.55;
  }

  .retry-banner li + li {
    margin-top: 5px;
  }

  .previous-card {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 22px;
    margin-top: 15px;
    padding: 12px 15px;
    border-left: 5px solid var(--coral);
    background: rgba(255, 255, 255, 0.52);
    font-size: 0.78rem;
  }

  .previous-card > span {
    width: 100%;
    color: var(--coral-dark);
    font-family: ui-monospace, monospace;
    font-weight: 800;
    text-transform: uppercase;
  }

  .previous-card p {
    margin: 0;
  }

  .case-heading {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 22px;
    align-items: start;
    padding: 40px 0 26px;
  }

  .folio {
    display: grid;
    width: 72px;
    height: 72px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 50%;
    color: var(--coral-dark);
    background: var(--paper);
    font-family: Georgia, serif;
    font-size: 1.65rem;
    font-weight: 800;
    box-shadow: 4px 4px 0 var(--sun);
  }

  .case-heading h1,
  .case-heading h3 {
    margin: 5px 0 8px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1;
  }

  .case-heading h3 {
    font-size: clamp(1.7rem, 4vw, 3rem);
  }

  .case-heading > div > p:last-child {
    max-width: 780px;
    margin: 0;
    color: var(--ink-soft);
    line-height: 1.55;
  }

  .dossier-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    gap: 20px;
    align-items: start;
  }

  .evidence-board,
  .response-sheet {
    min-width: 0;
    border: 2px solid var(--ink);
  }

  .evidence-board {
    position: sticky;
    top: 14px;
    padding: 22px;
    color: white;
    background: var(--ink);
    box-shadow: 8px 8px 0 var(--coral);
  }

  .board-heading {
    display: flex;
    justify-content: space-between;
    padding-bottom: 13px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    color: #cfd5e3;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.09em;
  }

  .actor-label {
    padding: 25px 0 18px;
  }

  .actor-label small {
    display: inline-block;
    margin-bottom: 6px;
    padding: 5px 7px;
    color: var(--ink);
    background: var(--sun);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .actor-label h2 {
    margin: 0;
    font-family: Georgia, serif;
    font-size: clamp(1.7rem, 3.5vw, 2.65rem);
    font-weight: 500;
    line-height: 1.06;
  }

  .evidence-note {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    margin-top: 12px;
    padding: 16px;
    color: var(--ink);
    background: var(--paper);
  }

  .evidence-note > span {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-family: Georgia, serif;
    font-weight: 800;
  }

  .evidence-note strong {
    color: var(--coral-dark);
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .evidence-note p {
    margin: 6px 0 0;
    font-size: 0.91rem;
    line-height: 1.55;
  }

  .view-note {
    background: var(--mist);
    transform: rotate(-0.5deg);
  }

  .spatial-link {
    display: flex;
    gap: 8px;
    margin: 16px 0 0;
    padding: 10px;
    border: 1px dashed rgba(255, 255, 255, 0.45);
    color: #eff4f5;
    font-size: 0.76rem;
    line-height: 1.45;
  }

  .mini-lexicon {
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.26);
  }

  .mini-lexicon p {
    margin: 5px 0;
    color: #d7dbea;
    font-size: 0.7rem;
    line-height: 1.45;
  }

  .mini-lexicon strong {
    color: white;
  }

  .response-sheet {
    padding: clamp(20px, 3.4vw, 36px);
    background:
      linear-gradient(90deg, transparent 35px, rgba(201, 87, 66, 0.15) 36px, transparent 37px),
      var(--paper);
    box-shadow: 8px 8px 0 rgba(23, 33, 59, 0.13);
  }

  .sheet-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 21px;
    border-bottom: 2px solid var(--ink);
  }

  .sheet-heading h2 {
    margin: 7px 0 0;
    font-family: Georgia, serif;
    font-size: clamp(1.55rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.05;
  }

  .sheet-stamp {
    flex: 0 0 auto;
    padding: 8px;
    border: 2px solid var(--coral-dark);
    color: var(--coral-dark);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    transform: rotate(4deg);
  }

  .response-sheet fieldset {
    min-width: 0;
    margin: 27px 0 0;
    padding: 0;
    border: 0;
  }

  .response-sheet legend {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    font-family: Georgia, serif;
    font-size: 1.05rem;
    font-weight: 800;
  }

  .response-sheet legend span {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--coral-dark);
    font-family: ui-sans-serif, sans-serif;
    font-size: 0.76rem;
  }

  .choice-list {
    display: grid;
    gap: 8px;
    margin-top: 12px;
  }

  .choice-card {
    display: grid;
    width: 100%;
    min-height: 66px;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 11px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid #aca692;
    border-radius: 3px;
    color: var(--ink);
    background: rgba(255, 255, 255, 0.58);
    text-align: left;
    cursor: pointer;
    transition: border-color 130ms ease, background 130ms ease, transform 130ms ease;
  }

  .choice-card:hover {
    border-color: var(--teal-dark);
    background: white;
  }

  .choice-card.selected {
    border: 2px solid var(--teal-dark);
    background: var(--mist);
    box-shadow: inset 5px 0 0 var(--teal);
    transform: translateX(2px);
  }

  .choice-check {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    color: var(--ink);
    background: var(--paper);
    font-weight: 900;
  }

  .choice-card.selected .choice-check {
    color: white;
    background: var(--teal-dark);
  }

  .choice-card strong,
  .choice-card small {
    display: block;
  }

  .choice-card strong {
    font-size: 0.9rem;
    line-height: 1.25;
  }

  .choice-card small {
    margin-top: 3px;
    color: var(--ink-soft);
    font-size: 0.74rem;
    line-height: 1.35;
  }

  .role-choice {
    min-height: 70px;
  }

  .submit-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
    margin-top: 30px;
    padding-top: 22px;
    border-top: 1px dashed var(--line);
  }

  .submit-row p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.77rem;
    line-height: 1.45;
  }

  .feedback-shell {
    max-width: 930px;
    padding-top: clamp(42px, 8vw, 88px);
  }

  .feedback-heading {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 22px;
    align-items: start;
  }

  .result-mark {
    display: grid;
    width: 72px;
    height: 72px;
    place-items: center;
    border: 3px solid var(--ink);
    border-radius: 50%;
    color: white;
    font-size: 2rem;
    font-weight: 900;
    box-shadow: 5px 5px 0 var(--ink);
  }

  .result-mark.reconsider { background: var(--coral); }
  .result-mark.agreed { background: var(--teal); }

  .feedback-heading h1 {
    margin: 7px 0 10px;
    font-family: Georgia, serif;
    font-size: clamp(2.3rem, 6vw, 5.3rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 0.98;
  }

  .feedback-heading > div > p:last-child {
    margin: 0;
    color: var(--ink-soft);
    line-height: 1.55;
  }

  .submitted-sheet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    margin-top: 32px;
    border: 2px solid var(--ink);
    background: var(--ink);
    box-shadow: 7px 7px 0 rgba(23, 33, 59, 0.12);
  }

  .submitted-sheet > div {
    min-width: 0;
    padding: 18px;
    background: var(--paper);
  }

  .submitted-sheet span,
  .takeaway-card > span,
  .continuation-band span {
    display: block;
    color: var(--coral-dark);
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .submitted-sheet strong {
    display: block;
    margin-top: 6px;
    font-family: Georgia, serif;
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .correct-submission > div {
    background: #edf5ef;
  }

  .explanation-box {
    margin-top: 18px;
    padding: 19px 21px;
    border-left: 7px solid var(--coral-dark);
    background: #fff0e7;
  }

  .explanation-box p {
    margin: 0;
    line-height: 1.6;
  }

  .explanation-box p + p {
    margin-top: 13px;
    padding-top: 13px;
    border-top: 1px dashed #d6a99e;
  }

  .explanation-box p > span {
    margin-right: 8px;
    font-weight: 900;
  }

  .correct-box {
    border-color: var(--teal-dark);
    background: #e4f0eb;
  }

  .feedback-shell > blockquote,
  .completion-copy blockquote {
    margin: 23px 0 0;
    padding: 18px 20px;
    border: 1px solid var(--ink);
    font-family: Georgia, serif;
    font-size: 1.15rem;
    line-height: 1.5;
  }

  .feedback-shell > blockquote span {
    display: block;
    margin-bottom: 5px;
    color: var(--coral-dark);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .feedback-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    margin-top: 26px;
  }

  .feedback-action p {
    max-width: 470px;
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .takeaway-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 22px;
    align-items: center;
    margin-top: 18px;
    padding: 16px 18px;
    border: 1px dashed var(--teal-dark);
    background: rgba(255, 255, 255, 0.54);
  }

  .takeaway-card p {
    margin: 0;
    font-family: Georgia, serif;
    font-size: 1.08rem;
    line-height: 1.4;
  }

  .continuation-band {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 28px;
    padding-top: 25px;
    border-top: 2px solid var(--ink);
  }

  .continuation-band p {
    margin: 6px 0 0;
    color: var(--ink-soft);
    font-size: 0.86rem;
    line-height: 1.45;
  }

  .completion {
    display: grid;
    min-height: calc(100vh - 42px);
    grid-template-columns: minmax(180px, 0.36fr) minmax(0, 0.64fr);
    align-content: center;
    gap: clamp(28px, 7vw, 90px);
    max-width: 1050px;
    padding-top: 64px;
  }

  .closed-file {
    position: relative;
    display: grid;
    min-height: 390px;
    place-content: center;
    border: 3px solid var(--ink);
    color: var(--ink);
    background: var(--sun);
    box-shadow: 15px 15px 0 var(--coral);
    transform: rotate(-2deg);
  }

  .closed-file::before {
    position: absolute;
    top: -3px;
    left: 24px;
    width: 44%;
    height: 30px;
    border: 3px solid var(--ink);
    border-bottom: 0;
    background: var(--sun);
    content: "";
    transform: translateY(-100%);
  }

  .closed-file span {
    font-family: Georgia, serif;
    font-size: 6rem;
    font-weight: 500;
    line-height: 1;
  }

  .closed-file i {
    height: 2px;
    margin: 20px 0;
    background: var(--ink);
  }

  .closed-file b {
    padding: 8px 10px;
    border: 2px solid var(--coral-dark);
    color: var(--coral-dark);
    font-family: ui-monospace, monospace;
    letter-spacing: 0.09em;
    text-align: center;
    transform: rotate(-5deg);
  }

  .completion-copy h1 {
    margin: 10px 0 18px;
    font-family: Georgia, serif;
    font-size: clamp(2.6rem, 6vw, 5.2rem);
    font-weight: 500;
    letter-spacing: -0.06em;
    line-height: 0.96;
  }

  .completion-lead {
    margin: 0;
    color: var(--ink-soft);
    line-height: 1.6;
  }

  .strategy-list {
    display: grid;
    gap: 8px;
    margin: 25px 0 0;
    padding: 0;
    list-style: none;
  }

  .strategy-list li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed var(--line);
  }

  .strategy-list span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--teal-dark);
    font-weight: 900;
  }

  .strategy-list p {
    margin: 0;
    line-height: 1.4;
  }

  .completion-copy blockquote {
    border-left: 7px solid var(--teal-dark);
    background: rgba(255, 255, 255, 0.45);
  }

  .privacy-note {
    grid-column: 2;
    display: flex;
    gap: 9px;
    align-items: center;
    color: var(--ink-soft);
    font-size: 0.76rem;
  }

  .privacy-note p {
    margin: 0;
  }

  .completion > .secondary {
    grid-column: 2;
    width: fit-content;
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

  @media (max-width: 840px) {
    .intro {
      grid-template-columns: 1fr;
      padding: 48px 0 64px;
    }

    .intro-copy h1 {
      font-size: clamp(3.8rem, 15vw, 6.8rem);
    }

    .desk-preview {
      width: min(590px, 100%);
      transform: none;
    }

    .dossier-layout {
      grid-template-columns: 1fr;
    }

    .evidence-board {
      position: static;
    }

    .completion {
      grid-template-columns: 1fr;
      align-content: start;
    }

    .closed-file {
      width: min(300px, 78%);
      min-height: 210px;
      margin: 20px auto 0;
    }

    .closed-file span {
      font-size: 4rem;
    }

    .privacy-note,
    .completion > .secondary {
      grid-column: 1;
    }
  }

  @media (max-width: 560px) {
    .intro,
    .workspace,
    .feedback-shell,
    .completion {
      width: min(100% - 24px, 1160px);
    }

    .intro {
      gap: 38px;
      padding-top: 36px;
    }

    .intro-copy h1 {
      margin-top: 14px;
      font-size: clamp(3.2rem, 19vw, 5rem);
    }

    .desk-preview {
      padding: 48px 18px 24px;
      box-shadow: 8px 9px 0 rgba(23, 33, 59, 0.11);
    }

    .definition-card {
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 10px;
    }

    .office-header {
      grid-template-columns: auto 1fr;
      gap: 11px;
    }

    .progress-track {
      grid-column: 1 / -1;
    }

    .retry-banner {
      grid-template-columns: 1fr;
      padding: 17px;
    }

    .retry-symbol {
      width: 44px;
      height: 44px;
    }

    .case-heading {
      grid-template-columns: 1fr;
      gap: 15px;
      padding-top: 30px;
    }

    .folio {
      width: 58px;
      height: 58px;
      font-size: 1.35rem;
    }

    .case-heading h1 {
      font-size: clamp(2.15rem, 13vw, 3.25rem);
    }

    .evidence-board {
      padding: 16px;
      box-shadow: 5px 5px 0 var(--coral);
    }

    .evidence-note {
      grid-template-columns: 1fr;
      padding: 13px;
    }

    .response-sheet {
      padding: 17px 14px;
      background: var(--paper);
      box-shadow: 5px 5px 0 rgba(23, 33, 59, 0.13);
    }

    .sheet-heading {
      display: grid;
    }

    .sheet-stamp {
      width: fit-content;
      transform: none;
    }

    .choice-card {
      min-height: 72px;
      padding: 9px;
    }

    .submit-row {
      grid-template-columns: 1fr;
    }

    .submit-button,
    .feedback-action .primary,
    .continuation-band .primary {
      width: 100%;
    }

    .feedback-heading {
      grid-template-columns: 1fr;
    }

    .result-mark {
      width: 58px;
      height: 58px;
      font-size: 1.55rem;
    }

    .feedback-heading h1 {
      font-size: clamp(2.35rem, 14vw, 3.65rem);
    }

    .submitted-sheet {
      grid-template-columns: 1fr;
    }

    .explanation-box {
      padding: 15px;
    }

    .feedback-action,
    .continuation-band,
    .takeaway-card {
      display: grid;
    }

    .completion {
      padding-top: 52px;
    }

    .closed-file {
      width: min(220px, 76%);
      min-height: 175px;
    }

    .completion-copy h1 {
      font-size: clamp(2.55rem, 14vw, 3.7rem);
    }

    .completion > .secondary {
      width: 100%;
    }
  }

  @media (max-width: 340px) {
    .intro,
    .workspace,
    .feedback-shell,
    .completion {
      width: calc(100% - 20px);
    }

    .primary,
    .secondary {
      padding-right: 12px;
      padding-left: 12px;
    }

    .method-strip span {
      font-size: 0.7rem;
    }

    .choice-card {
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 7px;
    }

    .choice-check {
      width: 30px;
      height: 30px;
    }
  }

  .compact-cards {
    margin: 18px 0 0;
    padding: 14px;
    border: 1px dashed var(--teal-dark);
    border-radius: 9px;
    background: var(--mist);
  }

  .compact-cards > p {
    margin: 0 0 10px;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .compact-cards > p strong {
    display: block;
    color: var(--ink);
  }

  .compact-cards > div {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .compact-cards button {
    min-height: 60px;
    padding: 10px 12px;
    border: 1px solid var(--teal-dark);
    border-radius: 7px;
    color: var(--ink);
    background: white;
    font: inherit;
    font-size: 0.8rem;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }

  .compact-cards button span {
    display: block;
    margin-bottom: 3px;
    color: var(--teal-dark);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    .compact-cards > div { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .role-office *,
    .role-office *::before,
    .role-office *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
    }

    .choice-card.selected,
    .primary:hover:not(:disabled),
    .primary:active:not(:disabled) {
      transform: none;
    }
  }
</style>
