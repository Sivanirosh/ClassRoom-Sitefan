<script lang="ts">
  import { tick } from 'svelte';

  type Phase = 'intro' | 'active' | 'incorrect' | 'retry' | 'correct' | 'complete';
  type Direction = 'up' | 'right' | 'down' | 'left';
  type Position = Direction | 'center';

  type PlanCase = {
    id: string;
    theme: string;
    title: string;
    instruction: string;
    start: string;
    northText: string;
    northGlyph: string;
    cells: Record<Direction, string>;
    symbols: Record<Direction, string>;
    correctMove: Direction;
    wrongMove: Direction;
    target: string;
    incorrectFeedback: string;
    scaffold: string;
    correctFeedback: string;
    rule: string;
  };

  const plans: PlanCase[] = [
    {
      id: 'square-north-up',
      theme: 'Échanges · Plan 01',
      title: 'Autour de l’arrêt',
      instruction: 'Depuis l’arrêt, localise la fontaine située à l’est.',
      start: 'arrêt',
      northText: 'Le nord pointe vers le haut de la page.',
      northGlyph: '↑ N',
      cells: { up: 'jardin', right: 'fontaine', down: 'pont', left: 'école' },
      symbols: { up: '♧', right: '◉', down: '═', left: '▣' },
      correctMove: 'right',
      wrongMove: 'left',
      target: 'fontaine',
      incorrectFeedback: '↺ Le jeton est arrivé à l’école, à l’ouest de l’arrêt. Ici le nord est en haut : l’est se trouve donc à droite, du côté de la fontaine.',
      scaffold: 'Pointe la flèche N vers le haut. Depuis le nord, fais un quart de tour vers l’est : de quel côté de la page arrives-tu ?',
      correctFeedback: '✓ Le nord est en haut, donc l’est est à droite. Le symbole ◉ de la légende confirme que le jeton est sur la fontaine.',
      rule: 'N en haut → est à droite'
    },
    {
      id: 'park-north-right',
      theme: 'Loisirs · Plan 02',
      title: 'Le parc tourné',
      instruction: 'Depuis la place, localise le terrain de sport situé à l’ouest.',
      start: 'place',
      northText: 'Le nord pointe vers la droite de la page.',
      northGlyph: 'N →',
      cells: { up: 'terrain de sport', right: 'gare', down: 'jardins', left: 'kiosque' },
      symbols: { up: '△', right: '▤', down: '♧', left: '◇' },
      correctMove: 'up',
      wrongMove: 'right',
      target: 'terrain de sport',
      incorrectFeedback: '↺ Le jeton est arrivé à la gare, dans la direction du nord. Quand N pointe à droite, l’ouest se trouve vers le haut de la page, là où la légende place le terrain △.',
      scaffold: 'Suis la flèche N vers la droite. L’ouest est un quart de tour à gauche du nord : sur cette page tournée, cela mène où ?',
      correctFeedback: '✓ Avec le nord à droite, l’ouest se lit vers le haut. Le symbole △ confirme la position du terrain de sport.',
      rule: 'N à droite → ouest en haut'
    },
    {
      id: 'market-north-down',
      theme: 'Approvisionnement · Plan 03',
      title: 'Le plan renversé',
      instruction: 'Depuis la bibliothèque, localise le marché situé à l’est.',
      start: 'bibliothèque',
      northText: 'Le nord pointe vers le bas de la page.',
      northGlyph: 'N ↓',
      cells: { up: 'école', right: 'parking', down: 'rivière', left: 'marché' },
      symbols: { up: '▣', right: 'P', down: '≈', left: '◆' },
      correctMove: 'left',
      wrongMove: 'right',
      target: 'marché',
      incorrectFeedback: '↺ Le jeton est arrivé au parking. Avec le nord vers le bas, l’est se trouve à gauche de la page ; c’est là que le symbole ◆ indique le marché.',
      scaffold: 'Oriente mentalement N vers le bas. Tourne ensuite d’un quart de tour vers l’est : ce côté n’est plus la droite habituelle de la page.',
      correctFeedback: '✓ Quand le nord pointe en bas, l’est se trouve à gauche. Le symbole ◆ de la légende confirme le marché.',
      rule: 'N en bas → est à gauche'
    }
  ];

  const directionLabels: Record<Direction, string> = {
    up: 'Haut',
    right: 'Droite',
    down: 'Bas',
    left: 'Gauche'
  };

  const directionArrows: Record<Direction, string> = {
    up: '↑',
    right: '→',
    down: '↓',
    left: '←'
  };

  let phase: Phase = 'intro';
  let currentIndex = 0;
  let currentPlan = plans[0];
  let selectedMove: Direction | null = null;
  let position: Position = 'center';
  let submittedPlace = '';
  let announcement = '';
  let stateFocusTarget: HTMLElement | null = null;
  let legacyState: 'ready' | 'question' | 'incorrect' | 'correct' | 'complete' = 'ready';

  $: currentPlan = plans[currentIndex];
  $: legacyState = phase === 'intro'
    ? 'ready'
    : phase === 'active' || phase === 'retry'
      ? 'question'
      : phase;

  async function focusState(): Promise<void> {
    await tick();
    stateFocusTarget?.focus();
  }

  function start(): void {
    currentIndex = 0;
    resetMarker();
    phase = 'active';
    announcement = 'Premier mini-plan ouvert. Lis le nord, puis déplace le jeton.';
    void focusState();
  }

  function resetMarker(): void {
    selectedMove = null;
    position = 'center';
    submittedPlace = '';
  }

  function move(direction: Direction): void {
    selectedMove = direction;
    position = direction;
    announcement = `Jeton déplacé vers ${directionLabels[direction].toLowerCase()}, sur ${currentPlan.cells[direction]}.`;
  }

  function submitMove(): void {
    if (!selectedMove) return;
    submittedPlace = currentPlan.cells[selectedMove];
    phase = selectedMove === currentPlan.correctMove ? 'correct' : 'incorrect';
    announcement = phase === 'correct' ? currentPlan.correctFeedback : currentPlan.incorrectFeedback;
    void focusState();
  }

  function directSubmit(direction: Direction): void {
    move(direction);
    submitMove();
  }

  function retry(): void {
    resetMarker();
    phase = 'retry';
    announcement = `Indice d’orientation : ${currentPlan.scaffold}`;
    void focusState();
  }

  function continuePlans(): void {
    if (currentIndex === plans.length - 1) {
      phase = 'complete';
      announcement = 'Parcours terminé. Trois plans tournés ont été localisés.';
      void focusState();
      return;
    }
    currentIndex += 1;
    resetMarker();
    phase = 'active';
    announcement = `${plans[currentIndex].theme} ouvert. La flèche du nord a changé.`;
    void focusState();
  }

  function smokeAttempt(direction: Direction): 'incorrect' | 'correct' | undefined {
    if (direction === currentPlan.wrongMove) return 'incorrect';
    if (direction === currentPlan.correctMove) return 'correct';
    return undefined;
  }
</script>

<svelte:head>
  <title>La boussole des mini-plans · EX-0319</title>
  <meta name="description" content="Pratiquer la localisation sur trois plans diversement orientés." />
</svelte:head>

<div
  class="legacy-smoke-root"
  data-smoke-root
  data-smoke-exercise="EX-0319"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state={legacyState}
>
  <main class="prototype-root" data-smoke-contract="6h-v1" data-exercise-id="EX-0319">
    <div class="page-shell">
      <header class="atlas-header">
        <div class="badge" aria-hidden="true">⌖</div>
        <div><small>Carnet d’orientation</small><strong>La boussole des mini-plans</strong></div>
        {#if phase !== 'intro' && phase !== 'complete'}
          <span>{currentIndex + 1} / {plans.length}</span>
        {/if}
      </header>

      {#if phase === 'intro'}
        <section class="intro" data-smoke-state="intro" aria-labelledby="intro-title">
          <div class="map-cover" aria-hidden="true">
            <span>N</span>
            <i></i>
            <b>3 PLANS<br />3 ROTATIONS</b>
          </div>
          <div class="intro-copy">
            <p class="eyebrow">EX—0319 · Pratique variée</p>
            <h1 id="intro-title">Le nord ne se trouve pas toujours en haut du plan.</h1>
            <p>
              Sur chaque mini-plan, pars du repère nommé. Lis la <strong>flèche du nord</strong>,
              transforme la direction en déplacement, puis confirme le lieu avec la <strong>légende</strong>.
            </p>
            <div class="method">
              <span>N</span><p><strong>Oriente</strong> la page.</p>
              <span>●</span><p><strong>Déplace</strong> le jeton d’une case.</p>
              <span>⌑</span><p><strong>Vérifie</strong> le symbole et le nom.</p>
            </div>
            <p class="controls">Boutons, clavier ou toucher : aucun glisser-déposer n’est nécessaire.</p>
            <button type="button" class="primary" data-smoke-action="start" onclick={start}>
              Ouvrir le premier mini-plan
            </button>
          </div>
        </section>
      {:else if phase === 'active' || phase === 'retry'}
        <section
          class="practice"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state={phase}
          data-smoke-variation={currentPlan.id}
          aria-labelledby="plan-title"
        >
          <div class="case-strip">
            <span>{currentPlan.theme}</span><strong>{currentPlan.title}</strong>
          </div>

          {#if phase === 'retry'}
            <aside class="scaffold" role="status">
              <strong><span aria-hidden="true">↺</span> Reprends depuis {currentPlan.start}</strong>
              <p>{currentPlan.scaffold}</p>
            </aside>
          {/if}

          <div class="practice-grid">
            <article class="mission-card">
              <p class="eyebrow">Mission de localisation</p>
              <h1 id="plan-title">{currentPlan.instruction}</h1>
              <div class="north-card">
                <b aria-hidden="true">{currentPlan.northGlyph}</b>
                <span>{currentPlan.northText}</span>
              </div>
              <p><strong>Départ :</strong> le jeton ● est posé sur {currentPlan.start}.</p>
              <p><strong>Cible :</strong> retrouve {currentPlan.target} avec la direction et la légende.</p>
            </article>

            <article class="map-card" aria-label={`Mini-plan : ${currentPlan.title}`}>
              <div class="map-grid">
                <div class="cell top" class:has-marker={position === 'up'}>
                  <span>{currentPlan.symbols.up}</span><small>{currentPlan.cells.up}</small>{#if position === 'up'}<b>● Jeton</b>{/if}
                </div>
                <div class="cell left" class:has-marker={position === 'left'}>
                  <span>{currentPlan.symbols.left}</span><small>{currentPlan.cells.left}</small>{#if position === 'left'}<b>● Jeton</b>{/if}
                </div>
                <div class="cell center" class:has-marker={position === 'center'}>
                  <span>⌖</span><small>{currentPlan.start}</small>{#if position === 'center'}<b>● Départ</b>{/if}
                </div>
                <div class="cell right" class:has-marker={position === 'right'}>
                  <span>{currentPlan.symbols.right}</span><small>{currentPlan.cells.right}</small>{#if position === 'right'}<b>● Jeton</b>{/if}
                </div>
                <div class="cell bottom" class:has-marker={position === 'down'}>
                  <span>{currentPlan.symbols.down}</span><small>{currentPlan.cells.down}</small>{#if position === 'down'}<b>● Jeton</b>{/if}
                </div>
              </div>
              <div class="legend" aria-label="Légende du mini-plan">
                <strong>Légende</strong>
                {#each (['up', 'right', 'down', 'left'] as Direction[]) as direction}
                  <span>{currentPlan.symbols[direction]} = {currentPlan.cells[direction]}</span>
                {/each}
              </div>
            </article>

            <article class="controls-card">
              <p class="eyebrow">Déplacer le jeton</p>
              <div class="direction-pad" aria-label="Choisir une direction sur la page">
                {#each (['up', 'right', 'down', 'left'] as Direction[]) as direction}
                  <button
                    type="button"
                    class:selected={selectedMove === direction}
                    aria-pressed={selectedMove === direction}
                    data-smoke-attempt={smokeAttempt(direction)}
                    onclick={() => move(direction)}
                  >
                    <span aria-hidden="true">{directionArrows[direction]}</span>{directionLabels[direction]}
                  </button>
                {/each}
              </div>
              <p class="position" aria-live="polite">
                {#if selectedMove}
                  Jeton sur <strong>{currentPlan.cells[selectedMove]}</strong>, côté {directionLabels[selectedMove].toLowerCase()} de la page.
                {:else}
                  Le jeton attend sur <strong>{currentPlan.start}</strong>.
                {/if}
              </p>
              <button type="button" class="primary full" disabled={!selectedMove} data-smoke-action="submit" onclick={submitMove}>
                Valider cette localisation
              </button>
            </article>
          </div>

          <aside class="direct-cells" aria-label="Alternative avec deux cases nommées">
            <div><strong>Ou place directement le jeton</strong><small>Deux cases larges, même règle d’orientation.</small></div>
            {#if currentIndex % 2 === 0}
              <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit(currentPlan.wrongMove)}>
                {directionArrows[currentPlan.wrongMove]} {currentPlan.cells[currentPlan.wrongMove]}
              </button>
              <button type="button" data-smoke-answer="correct" onclick={() => directSubmit(currentPlan.correctMove)}>
                {directionArrows[currentPlan.correctMove]} {currentPlan.cells[currentPlan.correctMove]}
              </button>
            {:else}
              <button type="button" data-smoke-answer="correct" onclick={() => directSubmit(currentPlan.correctMove)}>
                {directionArrows[currentPlan.correctMove]} {currentPlan.cells[currentPlan.correctMove]}
              </button>
              <button type="button" data-smoke-answer="incorrect" onclick={() => directSubmit(currentPlan.wrongMove)}>
                {directionArrows[currentPlan.wrongMove]} {currentPlan.cells[currentPlan.wrongMove]}
              </button>
            {/if}
          </aside>
        </section>
      {:else if phase === 'incorrect'}
        <section
          class="feedback wrong"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="incorrect"
          data-smoke-variation={currentPlan.id}
          data-smoke-feedback="incorrect"
          data-smoke-feedback-detail="specific"
          role="status"
          aria-labelledby="feedback-title"
        >
          <div class="result-mark" aria-hidden="true">↺</div>
          <p class="eyebrow">Localisation à reprendre</p>
          <h1 id="feedback-title">Le jeton est arrivé sur {submittedPlace}, pas sur {currentPlan.target}.</h1>
          <p>{currentPlan.incorrectFeedback}</p>
          <div class="submitted"><span>Déplacement soumis</span><strong>{directionArrows[selectedMove ?? currentPlan.wrongMove]} {selectedMove ? directionLabels[selectedMove] : ''} → {submittedPlace}</strong></div>
          <button type="button" class="primary" data-smoke-action="retry" onclick={retry}>
            Revenir au départ avec un indice
          </button>
        </section>
      {:else if phase === 'correct'}
        <div class="success-grid">
          <section
            class="feedback right"
            tabindex="-1"
            bind:this={stateFocusTarget}
            data-smoke-state="correct"
            data-smoke-variation={currentPlan.id}
            data-smoke-feedback="correct"
            data-smoke-feedback-detail="specific"
            role="status"
            aria-labelledby="feedback-title"
          >
            <div class="result-mark" aria-hidden="true">✓</div>
            <p class="eyebrow">Localisation concordante</p>
            <h1 id="feedback-title">Le jeton atteint {currentPlan.target} depuis {currentPlan.start}.</h1>
            <p>{currentPlan.correctFeedback}</p>
            <div class="rule"><span>Repère à garder</span><strong>{currentPlan.rule}</strong></div>
          </section>
          <aside class="continuation" data-smoke-state="continuation" data-smoke-variation={currentPlan.id}>
            <span>{currentPlan.northGlyph}</span>
            <strong>Plan lu</strong>
            <p>La flèche, le déplacement et la légende concordent. Le prochain plan sera tourné autrement.</p>
            <button type="button" class="primary" data-smoke-action="continue" onclick={continuePlans}>
              {currentIndex === plans.length - 1 ? 'Fermer le carnet' : 'Tourner la page'}
            </button>
          </aside>
        </div>
      {:else}
        <section
          class="completion"
          tabindex="-1"
          bind:this={stateFocusTarget}
          data-smoke-state="complete"
          data-smoke-completion
          aria-labelledby="complete-title"
        >
          <div class="finish-mark" aria-hidden="true">N<br />✓</div>
          <p class="eyebrow">Carnet terminé</p>
          <h1 id="complete-title">Trois plans tournés, une même stratégie de localisation.</h1>
          <p>
            <strong>Pars du repère nommé, lis la flèche du nord, transforme la direction sur la page,
            puis confirme le symbole dans la légende.</strong>
          </p>
          <div class="recap">
            {#each plans as item}
              <div><span aria-hidden="true">✓</span><strong>{item.title}</strong><small>{item.rule}</small></div>
            {/each}
          </div>
          <small>Aucune réponse n’a été enregistrée ni envoyée.</small>
        </section>
      {/if}

      <p class="sr-only" aria-live="polite">{announcement}</p>
    </div>
  </main>
</div>

<style>
  .legacy-smoke-root { display: contents; }

  .prototype-root,
  .prototype-root * { box-sizing: border-box; }

  .prototype-root {
    --ink: #25304b;
    --blue: #355e96;
    --red: #bd4b45;
    --cream: #fff9e9;
    --sand: #d9c8a5;
    --green: #5d7d68;
    --muted: #626978;
    min-height: calc(100vh - 42px);
    overflow-x: clip;
    color: var(--ink);
    background: repeating-linear-gradient(0deg, #d9c8a5 0 23px, #d3c09c 24px);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  .page-shell { width: min(1160px, 100%); min-height: calc(100vh - 42px); margin: auto; padding: 15px clamp(12px, 3vw, 34px) 50px; }
  h1, p, button { overflow-wrap: anywhere; }

  .atlas-header { display: flex; min-height: 64px; align-items: center; gap: 12px; padding: 7px 11px; border: 1px solid rgba(37,48,75,.5); background: rgba(255,249,233,.88); }
  .badge { display: grid; width: 46px; height: 46px; place-items: center; border-radius: 50%; color: white; background: var(--red); font-size: 1.35rem; }
  .atlas-header div:nth-child(2) { display: grid; }
  .atlas-header small { color: var(--muted); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; }
  .atlas-header strong { font-family: Georgia, serif; }
  .atlas-header > span { margin-left: auto; font: 800 .7rem ui-monospace, monospace; }

  .eyebrow { margin: 0; color: var(--red); font-size: .7rem; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
  .intro { display: grid; min-height: min(720px, calc(100vh - 122px)); grid-template-columns: minmax(250px, .72fr) minmax(0, 1.28fr); align-items: center; gap: clamp(30px, 7vw, 84px); padding: 52px 0; }
  .map-cover { position: relative; display: grid; min-height: 455px; place-items: center; border: 3px solid var(--ink); border-left: 20px solid var(--red); background: var(--blue); box-shadow: 14px 15px 0 rgba(37,48,75,.25); transform: rotate(-1.5deg); }
  .map-cover span { position: absolute; top: 35px; color: white; font: 900 2rem Georgia, serif; }
  .map-cover i { width: 180px; height: 180px; border: 3px solid white; border-radius: 50%; background: linear-gradient(45deg, transparent 48%, white 49% 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, white 49% 51%, transparent 52%); }
  .map-cover b { color: white; font: 800 1.2rem/1.5 ui-monospace, monospace; text-align: center; }
  .intro h1, .mission-card h1, .feedback h1, .completion h1 { margin: 12px 0 18px; font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.035em; line-height: 1.03; }
  .intro h1 { font-size: clamp(2.8rem, 6vw, 5.7rem); }
  .intro-copy > p:not(.eyebrow) { color: var(--muted); line-height: 1.65; }
  .method { display: grid; grid-template-columns: 38px 1fr; gap: 8px 11px; margin: 24px 0; }
  .method span { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 50%; color: white; background: var(--blue); font-weight: 900; }
  .method p { margin: 6px 0; }
  .controls { font-size: .8rem; }

  button { min-height: 48px; border: 2px solid var(--ink); border-radius: 4px; color: var(--ink); background: var(--cream); font: inherit; font-weight: 760; cursor: pointer; }
  button:focus-visible, [tabindex="-1"]:focus { outline: 4px solid var(--red); outline-offset: 3px; }
  button:disabled { opacity: .45; cursor: not-allowed; }
  .primary { padding: 12px 19px; color: white; background: var(--ink); box-shadow: 4px 4px 0 var(--red); }
  .primary.full { width: 100%; margin-top: 14px; }

  .practice { padding-top: 27px; }
  .case-strip { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 15px; color: white; background: var(--ink); }
  .case-strip span { font: 800 .68rem ui-monospace, monospace; text-transform: uppercase; }
  .case-strip strong { margin-left: auto; }
  .scaffold { margin: 15px 0; padding: 14px 17px; border-left: 7px solid var(--red); background: #fff0bd; }
  .scaffold p { margin: 6px 0 0; line-height: 1.5; }

  .practice-grid { display: grid; grid-template-columns: .78fr 1.08fr .65fr; gap: 14px; margin-top: 15px; align-items: start; }
  .mission-card, .map-card, .controls-card { min-width: 0; padding: clamp(15px, 3vw, 25px); border: 2px solid var(--ink); background: var(--cream); box-shadow: 6px 7px 0 rgba(37,48,75,.22); }
  .mission-card h1 { font-size: clamp(1.8rem, 4vw, 3rem); }
  .mission-card > p:not(.eyebrow) { line-height: 1.55; }
  .north-card { display: grid; gap: 6px; margin: 20px 0; padding: 14px; border: 2px dashed var(--blue); background: #e7eef7; }
  .north-card b { font: 900 2rem Georgia, serif; }

  .map-grid { display: grid; grid-template: repeat(3, minmax(78px, 1fr)) / repeat(3, minmax(0, 1fr)); gap: 5px; }
  .cell { display: grid; min-width: 0; place-items: center; padding: 6px; border: 1px solid #8790a2; background: white; text-align: center; }
  .cell.top { grid-area: 1 / 2; }
  .cell.left { grid-area: 2 / 1; }
  .cell.center { grid-area: 2 / 2; background: #f5df9c; }
  .cell.right { grid-area: 2 / 3; }
  .cell.bottom { grid-area: 3 / 2; }
  .cell span { font-size: 1.35rem; }
  .cell small { max-width: 100%; color: var(--muted); }
  .cell b { margin-top: 3px; font-size: .68rem; }
  .cell.has-marker { border: 4px solid var(--red); background: #fff0dc; }
  .legend { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 12px; padding: 10px; border: 1px dashed var(--ink); }
  .legend strong { grid-column: 1 / -1; font-size: .68rem; text-transform: uppercase; }
  .legend span { font-size: .72rem; }

  .direction-pad { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 15px; }
  .direction-pad button { display: grid; min-height: 60px; place-items: center; padding: 8px; }
  .direction-pad button span { font-size: 1.3rem; line-height: 1; }
  .direction-pad button.selected { background: #dce8f6; box-shadow: inset 0 -5px 0 var(--blue); }
  .position { min-height: 76px; padding: 10px; background: #eee5d2; line-height: 1.45; }

  .direct-cells { display: grid; grid-template-columns: minmax(145px, .55fr) 1fr 1fr; gap: 9px; margin-top: 15px; padding: 13px; border: 1px dashed var(--ink); background: rgba(255,249,233,.78); }
  .direct-cells > div { align-self: center; }
  .direct-cells strong, .direct-cells small { display: block; }
  .direct-cells small { margin-top: 4px; color: var(--muted); }
  .direct-cells button { padding: 11px; text-align: left; }

  .feedback { width: min(850px, 100%); margin: 48px auto 0; padding: clamp(24px, 6vw, 54px); border: 2px solid var(--ink); background: var(--cream); box-shadow: 10px 11px 0 rgba(37,48,75,.25); }
  .feedback.wrong { border-top: 10px solid var(--red); }
  .feedback.right { width: 100%; margin: 0; border-top: 10px solid var(--green); }
  .result-mark { display: grid; width: 58px; height: 58px; place-items: center; border-radius: 50%; color: white; background: var(--red); font-size: 1.7rem; font-weight: 900; }
  .right .result-mark { background: var(--green); }
  .feedback h1 { font-size: clamp(2rem, 5vw, 3.8rem); }
  .feedback > p:not(.eyebrow) { color: var(--muted); line-height: 1.65; }
  .submitted, .rule { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 9px; margin: 17px 0; padding: 13px; background: #e7e1d2; }
  .submitted span, .rule span { font-size: .67rem; font-weight: 900; text-transform: uppercase; }
  .rule { background: #dbe8dc; }

  .success-grid { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 16px; margin-top: 42px; }
  .continuation { display: flex; flex-direction: column; padding: 24px; color: white; background: var(--blue); box-shadow: 6px 7px 0 var(--ink); }
  .continuation > span { font: 900 2.7rem Georgia, serif; }
  .continuation > strong { margin-top: 10px; }
  .continuation p { flex: 1; line-height: 1.5; }
  .continuation button { width: 100%; }

  .completion { width: min(830px, 100%); margin: 48px auto 0; padding: clamp(27px, 7vw, 60px); border: 2px solid var(--ink); background: var(--cream); text-align: center; box-shadow: 12px 13px 0 var(--red); }
  .finish-mark { display: grid; width: 78px; height: 78px; place-items: center; margin: auto; border-radius: 50%; color: white; background: var(--green); font-weight: 900; line-height: 1; }
  .completion h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); }
  .completion > p { line-height: 1.65; }
  .recap { display: grid; gap: 8px; margin: 24px 0; text-align: left; }
  .recap div { display: grid; grid-template-columns: 23px minmax(130px, .45fr) 1fr; gap: 9px; padding: 11px; border-bottom: 1px solid #c5b996; }
  .recap small, .completion > small { color: var(--muted); }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }

  @media (max-width: 900px) {
    .practice-grid { grid-template-columns: 1fr 1fr; }
    .controls-card { grid-column: 1 / -1; }
  }

  @media (max-width: 720px) {
    .intro, .practice-grid, .success-grid { grid-template-columns: 1fr; }
    .map-cover { min-height: 230px; box-shadow: 7px 8px 0 rgba(37,48,75,.25); }
    .controls-card { grid-column: auto; }
    .direct-cells { grid-template-columns: 1fr; }
  }

  @media (max-width: 470px) {
    .page-shell { padding: 9px 11px 34px; }
    .atlas-header small { display: none; }
    .atlas-header strong { font-size: .84rem; }
    .intro { padding: 30px 0; }
    .map-cover { display: none; }
    .intro h1 { font-size: 2.48rem; }
    .case-strip { display: grid; }
    .case-strip strong { margin-left: 0; }
    .mission-card, .map-card, .controls-card { padding: 14px 11px; box-shadow: 4px 4px 0 rgba(37,48,75,.2); }
    .map-grid { grid-template: repeat(3, 72px) / repeat(3, minmax(0, 1fr)); }
    .cell { padding: 3px; }
    .cell span { font-size: 1rem; }
    .cell small { font-size: .63rem; }
    .cell b { font-size: .58rem; }
    .legend { grid-template-columns: 1fr; }
    .feedback, .completion { padding: 19px 14px; box-shadow: 5px 5px 0 rgba(37,48,75,.23); }
    .feedback h1, .completion h1 { margin: 8px 0; font-size: 1.92rem; }
    .feedback > p:not(.eyebrow), .completion > p { margin: 8px 0; line-height: 1.5; }
    .recap { margin: 14px 0; }
    .recap div { grid-template-columns: 22px 1fr; padding: 8px; }
    .recap small { grid-column: 2; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prototype-root *, .prototype-root *::before, .prototype-root *::after {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      scroll-behavior: auto !important;
    }
  }
</style>
