<script lang="ts">
  import { onMount } from 'svelte';
  import { getStudentName, submitActivityResult } from '$lib/client/activity';
  import FeedbackPanel from '$lib/components/FeedbackPanel.svelte';
  import MissionProgress from '$lib/components/MissionProgress.svelte';
  import MissionResult from '$lib/components/MissionResult.svelte';
  import WorldArt from '$lib/components/WorldArt.svelte';
  import WorldShell from '$lib/components/WorldShell.svelte';

  type Level = '6H' | '7H' | '8H';
  type Mode = 'A' | 'B' | 'C' | 'Mixte';
  type PlayMode = 'A' | 'B' | 'C';
  type Shape = {
    name: string;
    kind: 'plane' | 'solid';
    isTriangle: boolean;
    levels: Level[];
    vocab: string;
    hints: string[];
  };

  const TOTAL_QUESTIONS = 6;
  const modeDetails: Array<{ id: Mode; icon: string; name: string; description: string }> = [
    { id: 'A', icon: '◌', name: 'Enquête d’indices', description: 'Retrouve une forme grâce à ses propriétés.' },
    { id: 'B', icon: '◇', name: 'Trouve l’intrus', description: 'Compare quatre formes et repère celle qui change la règle.' },
    { id: 'C', icon: '▣', name: '2D ou 3D ?', description: 'Classe une figure plane ou un solide.' },
    { id: 'Mixte', icon: '✦', name: 'Parcours surprise', description: 'Mélange les trois façons d’observer.' }
  ];

  const shapes: Shape[] = [
    { name: 'Triangle scalène', kind: 'plane', isTriangle: true, levels: ['6H','7H','8H'], vocab: 'Il a 3 côtés de longueurs toutes différentes.', hints: ['Je suis un triangle quelconque.', 'Mes trois côtés ont des longueurs différentes.', 'Je ne possède aucun angle droit.'] },
    { name: 'Triangle rectangle', kind: 'plane', isTriangle: true, levels: ['6H','7H','8H'], vocab: 'Il possède 1 angle droit à 90°.', hints: ['Je suis un triangle avec un angle à 90°.', 'Tu peux vérifier mon coin avec une équerre.', 'Je combine trois côtés et un angle droit.'] },
    { name: 'Triangle isocèle', kind: 'plane', isTriangle: true, levels: ['7H','8H'], vocab: 'Il possède 2 côtés de même longueur.', hints: ['Je suis un triangle avec deux côtés égaux.', 'Mes deux angles sur la base sont identiques.', 'Je possède un axe de symétrie.'] },
    { name: 'Triangle équilatéral', kind: 'plane', isTriangle: true, levels: ['7H','8H'], vocab: 'Il a 3 côtés égaux et 3 angles égaux.', hints: ['Je suis un triangle parfaitement régulier.', 'Mes trois côtés mesurent la même longueur.', 'Mes trois angles valent chacun 60°.'] },
    { name: 'Carré', kind: 'plane', isTriangle: false, levels: ['6H','7H','8H'], vocab: 'Il a 4 côtés égaux et 4 angles droits.', hints: ['Je suis un quadrilatère régulier.', 'Mes 4 côtés sont égaux.', 'J’ai 4 angles droits.'] },
    { name: 'Rectangle', kind: 'plane', isTriangle: false, levels: ['6H','7H','8H'], vocab: 'Il a 4 angles droits et ses côtés opposés sont égaux.', hints: ['Je suis un quadrilatère allongé.', 'Mes côtés opposés sont de même longueur.', 'J’ai 4 angles droits.'] },
    { name: 'Cercle', kind: 'plane', isTriangle: false, levels: ['6H','7H','8H'], vocab: 'C’est une courbe fermée, sans côté ni angle.', hints: ['Je suis une figure plane ronde.', 'Tous mes points sont à la même distance du centre.', 'On me trace au compas.'] },
    { name: 'Losange', kind: 'plane', isTriangle: false, levels: ['7H','8H'], vocab: 'Il a 4 côtés égaux, sans forcément avoir d’angles droits.', hints: ['Je ressemble à un carré penché.', 'Mes 4 côtés sont égaux.', 'Mes diagonales se croisent perpendiculairement.'] },
    { name: 'Parallélogramme', kind: 'plane', isTriangle: false, levels: ['7H','8H'], vocab: 'Ses côtés opposés sont parallèles deux à deux.', hints: ['Mes côtés opposés ne se croisent jamais.', 'Je n’ai pas forcément d’angle droit.', 'Je suis un quadrilatère incliné.'] },
    { name: 'Trapèze', kind: 'plane', isTriangle: false, levels: ['7H','8H'], vocab: 'Il possède au moins une paire de côtés opposés parallèles.', hints: ['Je suis un quadrilatère.', 'Deux de mes côtés sont parallèles.', 'Mes bases n’ont pas la même longueur.'] },
    { name: 'Cube', kind: 'solid', isTriangle: false, levels: ['6H','7H','8H'], vocab: 'C’est un solide à 6 faces carrées.', hints: ['Je suis le solide du dé à jouer.', 'J’ai 6 faces, 12 arêtes et 8 sommets.', 'Toutes mes faces sont des carrés.'] },
    { name: 'Pavé droit', kind: 'solid', isTriangle: false, levels: ['6H','7H','8H'], vocab: 'C’est un solide à 6 faces rectangulaires.', hints: ['Je ressemble à une boîte à chaussures.', 'Mes faces sont des rectangles.', 'J’ai 12 arêtes.'] },
    { name: 'Pyramide à base carrée', kind: 'solid', isTriangle: false, levels: ['7H','8H'], vocab: 'Elle a 1 base carrée et 4 faces triangulaires.', hints: ['Je m’élève vers un sommet.', 'Ma base posée au sol est un carré.', 'Mes côtés sont des triangles.'] },
    { name: 'Tétraèdre', kind: 'solid', isTriangle: false, levels: ['8H'], vocab: 'C’est un solide composé de 4 faces triangulaires.', hints: ['Je suis une pyramide très simple.', 'Toutes mes faces sont triangulaires.', 'Je possède 4 sommets.'] }
  ];

  let studentName = 'Explorateur';
  let phase: 'config' | 'play' | 'done' = 'config';
  let level: Level = '6H';
  let mode: Mode = 'Mixte';
  let questionNumber = 1;
  let score = 0;
  let xp = 0;
  let currentMode: PlayMode = 'A';
  let current: Shape = shapes[0];
  let options: Shape[] = [];
  let hintsShown = 1;
  let points = 30;
  let answered = false;
  let wasCorrect = false;
  let selectedAnswer = '';
  let feedbackTitle = '';
  let feedbackExplanation = '';
  let sentMessage = '';
  let finishing = false;
  let errorFamilies: string[] = [];

  $: currentModeName = modeDetails.find((item) => item.id === currentMode)?.name ?? 'Observation';

  onMount(() => {
    studentName = getStudentName();
  });

  function availableShapes(): Shape[] {
    return shapes.filter((shape) => shape.levels.includes(level));
  }

  function shuffle<T>(items: T[]): T[] {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function choose<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  function startMission() {
    phase = 'play';
    questionNumber = 1;
    score = 0;
    xp = 0;
    sentMessage = '';
    finishing = false;
    errorFamilies = [];
    loadQuestion();
  }

  function loadQuestion() {
    answered = false;
    wasCorrect = false;
    selectedAnswer = '';
    feedbackTitle = '';
    feedbackExplanation = '';
    currentMode = mode === 'Mixte' ? choose<PlayMode>(['A', 'B', 'C']) : mode;

    if (currentMode === 'A') generateModeA();
    else if (currentMode === 'B') generateModeB();
    else generateModeC();
  }

  function generateModeA() {
    points = 30;
    hintsShown = 1;
    current = choose(availableShapes());
    const pool = availableShapes().filter((shape) => shape.name !== current.name && shape.isTriangle === current.isTriangle);
    const fallback = availableShapes().filter((shape) => shape.name !== current.name);
    options = shuffle([current, ...shuffle(pool.length >= 3 ? pool : fallback).slice(0, 3)]);
  }

  function generateModeB() {
    points = 10;
    hintsShown = 1;
    const pool = availableShapes();
    const groupKind: 'plane' | 'solid' = Math.random() > 0.5 ? 'plane' : 'solid';
    let group = pool.filter((shape) => shape.kind === groupKind);
    let other = pool.filter((shape) => shape.kind !== groupKind);
    if (group.length < 3 || other.length < 1) {
      group = pool.filter((shape) => shape.kind !== groupKind);
      other = pool.filter((shape) => shape.kind === groupKind);
    }
    const base = shuffle(group).slice(0, 3);
    current = choose(other.length > 0 ? other : pool.filter((shape) => !base.includes(shape)));
    options = shuffle([current, ...base]);
  }

  function generateModeC() {
    points = 10;
    hintsShown = 1;
    current = choose(availableShapes());
    options = [];
  }

  function showHint() {
    if (currentMode !== 'A' || answered || hintsShown >= current.hints.length) return;
    hintsShown += 1;
    points = Math.max(10, points - 10);
  }

  function answer(selected: string) {
    if (answered) return;
    answered = true;
    selectedAnswer = selected;
    wasCorrect = currentMode === 'C' ? selected === current.kind : selected === current.name;

    if (wasCorrect) {
      score += 1;
      xp += points;
      feedbackTitle = `Bonne observation ! +${points} points de curiosité.`;
    } else {
      errorFamilies = [...errorFamilies, current.name];
      feedbackTitle = 'Un détail nous échappait — regardons-le de plus près.';
    }

    if (currentMode === 'B') {
      const groupLabel = current.kind === 'solid' ? 'figures planes' : 'solides';
      feedbackExplanation = `${current.name} est l’intrus : ${current.vocab} Les trois autres sont des ${groupLabel}.`;
    } else {
      feedbackExplanation = `${current.name} : ${current.vocab}`;
    }
  }

  function continueMission() {
    if (!answered || finishing) return;
    if (questionNumber >= TOTAL_QUESTIONS) {
      finishing = true;
      finishMission();
      return;
    }
    questionNumber += 1;
    loadQuestion();
  }

  function optionCorrectValue(): string {
    return currentMode === 'C' ? current.kind : current.name;
  }

  async function finishMission() {
    phase = 'done';
    sentMessage = 'Ton résultat est gardé dans ton carnet…';
    const report = await submitActivityResult({
      studentName,
      world: 'geometrie',
      mission: `${level} · ${modeDetails.find((item) => item.id === mode)?.name ?? mode}`,
      score,
      total: TOTAL_QUESTIONS,
      scoreBasis: 'last',
      errorCount: TOTAL_QUESTIONS - score,
      errorFamilies: Array.from(new Set(errorFamilies)),
      metadata: { xp }
    });
    sentMessage = report.message;
  }

  function svgForShape(name: string): string {
    const start = '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round">';
    const end = '</svg>';
    switch (name) {
      case 'Triangle scalène': return `${start}<polygon points="25,25 85,45 35,80"/>${end}`;
      case 'Triangle rectangle': return `${start}<polygon points="25,20 25,80 85,80"/><polyline points="25,70 35,70 35,80"/>${end}`;
      case 'Triangle isocèle': return `${start}<polygon points="50,20 20,80 80,80"/>${end}`;
      case 'Triangle équilatéral': return `${start}<polygon points="50,23 15,83 85,83"/>${end}`;
      case 'Carré': return `${start}<rect x="20" y="20" width="60" height="60"/>${end}`;
      case 'Rectangle': return `${start}<rect x="10" y="30" width="80" height="40"/>${end}`;
      case 'Cercle': return `${start}<circle cx="50" cy="50" r="32"/>${end}`;
      case 'Losange': return `${start}<polygon points="50,15 80,50 50,85 20,50"/>${end}`;
      case 'Parallélogramme': return `${start}<polygon points="30,30 85,30 70,70 15,70"/>${end}`;
      case 'Trapèze': return `${start}<polygon points="30,30 70,30 90,70 10,70"/>${end}`;
      case 'Cube': return `${start}<rect x="25" y="40" width="45" height="45"/><path d="M25,40 L45,20 L90,20 L90,65 L70,85 M70,40 L90,20 M45,20 L45,45" stroke-dasharray="2,2"/>${end}`;
      case 'Pavé droit': return `${start}<rect x="15" y="45" width="55" height="35"/><path d="M15,45 L35,25 L90,25 L90,60 L70,80 M70,45 L90,25" stroke-dasharray="2,2"/>${end}`;
      case 'Pyramide à base carrée': return `${start}<polygon points="50,15 15,75 70,85 85,65 50,15"/><path d="M15,75 L45,55 L85,65" stroke-dasharray="2,2"/>${end}`;
      case 'Tétraèdre': return `${start}<polygon points="50,15 15,80 85,80 50,15"/><path d="M15,80 L45,60 L85,80" stroke-dasharray="2,2"/>${end}`;
      default: return `${start}<text x="50" y="55" font-size="24" text-anchor="middle" fill="currentColor" stroke="none">?</text>${end}`;
    }
  }
</script>

<svelte:head>
  <title>Le Jardin des Formes — Camp des Curieux</title>
  <meta name="description" content="Observer, comparer et classer les figures planes et les solides." />
</svelte:head>

<WorldShell world="geometrie" {studentName} section={phase === 'play' ? `Observation ${questionNumber}/${TOTAL_QUESTIONS}` : ''}>
  {#if phase === 'config'}
    <section class="world-hero">
      <div class="world-hero-copy">
        <p class="eyebrow">Observer, comparer, classer</p>
        <h1>Entre dans le Jardin des Formes</h1>
        <p>Ici, les propriétés sont des indices. Regarde les côtés, les angles, les faces et découvre pourquoi chaque forme porte son nom.</p>
        <div class="session-promise">
          <span class="promise-item"><strong>6</strong> observations</span>
          <span class="promise-item">Indices <strong>facultatifs</strong></span>
          <span class="promise-item">Environ <strong>7 min</strong></span>
        </div>
      </div>
      <div class="world-hero-art"><WorldArt world="geometrie" /></div>
    </section>

    <section class="panel-card setup-panel stack-lg">
      <fieldset class="selection-group">
        <legend>1. Choisis ton degré</legend>
        <div class="choice-grid" role="radiogroup" aria-label="Degré scolaire">
          {#each [{id:'6H', label:'Découverte', detail:'Formes essentielles'}, {id:'7H', label:'Exploration', detail:'Plus de quadrilatères'}, {id:'8H', label:'Grand inventaire', detail:'Toutes les formes'}] as item}
            <button
              class="choice-card"
              class:is-selected={level === item.id}
              type="button"
              role="radio"
              aria-checked={level === item.id}
              on:click={() => (level = item.id as Level)}
            ><span class="choice-icon">{item.id}</span><span>{item.label}<small>{item.detail}</small></span></button>
          {/each}
        </div>
      </fieldset>

      <fieldset class="selection-group">
        <legend>2. Choisis une façon d’observer</legend>
        <div class="choice-grid mode-grid" role="radiogroup" aria-label="Type de parcours">
          {#each modeDetails as item}
            <button
              class="choice-card mode-choice"
              class:is-selected={mode === item.id}
              type="button"
              role="radio"
              aria-checked={mode === item.id}
              on:click={() => (mode = item.id)}
            ><span class="choice-icon" aria-hidden="true">{item.icon}</span><span>{item.name}<small>{item.description}</small></span></button>
          {/each}
        </div>
      </fieldset>

      <div class="start-row"><button class="btn btn-primary btn-large" type="button" on:click={startMission}>Commencer l’enquête <span aria-hidden="true">→</span></button></div>
    </section>
  {:else if phase === 'play'}
    <section class="mission-shell">
      <MissionProgress current={questionNumber} total={TOTAL_QUESTIONS} label="Observation" {score} scoreLabel="Trouvées" />
      <div class="challenge-card">
        <div class="mission-top"><p class="challenge-prompt">{currentModeName}</p><span class="badge xp-chip">✦ {xp} points</span></div>

        {#if currentMode === 'A'}
          <div class="question-display stack">
            <p class="eyebrow">Portrait mystère</p>
            <div class="hint-stack">
              {#each current.hints.slice(0, hintsShown) as hint}<p class="hint-line">« {hint} »</p>{/each}
            </div>
          </div>
          <div class="help-row">
            <button class="btn btn-quiet help-toggle" disabled={hintsShown >= current.hints.length || answered} type="button" on:click={showHint}>✦ Un indice de plus · {points > 10 ? `${points - 10} pts` : '10 pts'}</button>
          </div>
          <div class="choice-grid">
            {#each options as option}
              <button
                class="choice-card"
                class:is-correct={answered && option.name === optionCorrectValue()}
                class:is-wrong={answered && selectedAnswer === option.name && !wasCorrect}
                type="button"
                aria-disabled={answered}
                on:click={() => answer(option.name)}
              >{option.name}</button>
            {/each}
          </div>
        {:else if currentMode === 'B'}
          <div class="center"><p class="challenge-prompt">Trois formes partagent une règle. Laquelle est différente ?</p></div>
          <div class="choice-grid">
            {#each options as option}
              <button
                class="choice-card shape-choice"
                class:is-correct={answered && option.name === optionCorrectValue()}
                class:is-wrong={answered && selectedAnswer === option.name && !wasCorrect}
                type="button"
                aria-disabled={answered}
                on:click={() => answer(option.name)}
              >
                <span class="shape-box" aria-hidden="true">{@html svgForShape(option.name)}</span>
                <span>{option.name}</span>
              </button>
            {/each}
          </div>
        {:else}
          <div class="question-display stack">
            <p class="eyebrow">À classer</p>
            <h2>{current.name}</h2>
            <span class="shape-box" aria-hidden="true">{@html svgForShape(current.name)}</span>
          </div>
          <div class="choice-grid">
            <button class="choice-card" class:is-correct={answered && current.kind === 'plane'} class:is-wrong={answered && selectedAnswer === 'plane' && !wasCorrect} type="button" aria-disabled={answered} on:click={() => answer('plane')}><span class="choice-icon">□</span><span>Figure plane<small>Elle s’étale en 2 dimensions.</small></span></button>
            <button class="choice-card" class:is-correct={answered && current.kind === 'solid'} class:is-wrong={answered && selectedAnswer === 'solid' && !wasCorrect} type="button" aria-disabled={answered} on:click={() => answer('solid')}><span class="choice-icon">⬡</span><span>Solide<small>Il occupe un volume en 3 dimensions.</small></span></button>
          </div>
        {/if}

        {#if answered}
          <FeedbackPanel
            kind={wasCorrect ? 'correct' : 'incorrect'}
            title={feedbackTitle}
            explanation={feedbackExplanation}
            continueLabel={questionNumber === TOTAL_QUESTIONS ? 'Voir mon bilan' : 'Observation suivante'}
            on:continue={continueMission}
          />
        {/if}
      </div>
    </section>
  {:else}
    <MissionResult
      {score}
      total={TOTAL_QUESTIONS}
      title="Herbier des formes complété !"
      message={score >= 5 ? 'Tu observes les propriétés comme un vrai géomètre : avec précision et curiosité.' : 'Tu as enrichi ton vocabulaire géométrique. Refaire l’enquête aidera ton œil à repérer les détails plus vite.'}
      transmissionMessage={sentMessage}
    >
      <p slot="detail" class="small muted">{level} · {modeDetails.find((item) => item.id === mode)?.name} · {xp} points de curiosité</p>
      <button class="btn btn-primary" type="button" on:click={startMission}>Refaire ce parcours</button>
      <button class="btn btn-quiet" type="button" on:click={() => (phase = 'config')}>Changer de parcours</button>
      <a class="btn btn-quiet" href="/">Retour à la carte</a>
    </MissionResult>
  {/if}
</WorldShell>
