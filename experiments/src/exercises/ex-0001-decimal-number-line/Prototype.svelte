<script lang="ts">
  type Phase =
    | 'introduction'
    | 'prediction'
    | 'placement'
    | 'confirmation'
    | 'feedback'
    | 'explanation'
    | 'completion';
  type BeaconKey = 'a' | 'b';
  type Comparison = '<' | '>' | '=';
  type PlaceValue = 'tenths' | 'hundredths';

  type ExerciseItem = {
    id: string;
    chapter: string;
    prompt: string;
    a: number;
    aLabel: string;
    b: number;
    bLabel: string;
    min: number;
    max: number;
    labelStep: number;
    reason: PlaceValue;
  };

  type Observation = {
    prediction: Comparison;
    finalComparison: Comparison;
    revised: boolean;
    placementsCorrect: boolean;
    explanationAttempts: number;
  };

  const items: ExerciseItem[] = [
    {
      id: 'repere',
      chapter: 'Prendre ses repères',
      prompt: 'Deux balises sont cachées entre 4,1 et 4,4. Où se trouvent-elles ?',
      a: 420,
      aLabel: '4,2',
      b: 430,
      bLabel: '4,3',
      min: 410,
      max: 440,
      labelStep: 10,
      reason: 'tenths'
    },
    {
      id: 'piege',
      chapter: 'Déjouer le piège',
      prompt: 'Les écritures n’ont pas la même longueur. Laquelle va le plus loin ?',
      a: 350,
      aLabel: '3,5',
      b: 345,
      bLabel: '3,45',
      min: 340,
      max: 360,
      labelStep: 5,
      reason: 'tenths'
    },
    {
      id: 'zoom',
      chapter: 'Zoomer au centième',
      prompt: 'Les dixièmes sont identiques. Place les balises avec précision.',
      a: 642,
      aLabel: '6,42',
      b: 647,
      bLabel: '6,47',
      min: 640,
      max: 650,
      labelStep: 5,
      reason: 'hundredths'
    }
  ];

  const comparisonOptions: { symbol: Comparison; label: string }[] = [
    { symbol: '<', label: 'est plus petit que' },
    { symbol: '=', label: 'est égal à' },
    { symbol: '>', label: 'est plus grand que' }
  ];

  const explanationOptions: { value: PlaceValue | 'length'; label: string }[] = [
    { value: 'tenths', label: 'les dixièmes' },
    { value: 'hundredths', label: 'les centièmes' },
    { value: 'length', label: 'le nombre de chiffres' }
  ];

  let phase: Phase = 'introduction';
  let currentIndex = 0;
  let currentItem = items[0];
  let prediction: Comparison | null = null;
  let finalComparison: Comparison | null = null;
  let selectedBeacon: BeaconKey = 'a';
  let placements = startingPlacements(currentItem);
  let touched: Record<BeaconKey, boolean> = { a: false, b: false };
  let explanationChoice: PlaceValue | 'length' | null = null;
  let explanationSolved = false;
  let explanationAttempts = 0;
  let observations: Observation[] = [];
  let announcement = '';

  function startingPlacements(item: ExerciseItem): Record<BeaconKey, number> {
    const span = item.max - item.min;
    return {
      a: item.min + Math.round(span * 0.28),
      b: item.min + Math.round(span * 0.72)
    };
  }

  function beginExpedition(): void {
    currentIndex = 0;
    observations = [];
    prepareItem(0);
    phase = 'prediction';
  }

  function prepareItem(index: number): void {
    currentIndex = index;
    currentItem = items[index];
    prediction = null;
    finalComparison = null;
    selectedBeacon = 'a';
    placements = startingPlacements(currentItem);
    touched = { a: false, b: false };
    explanationChoice = null;
    explanationSolved = false;
    explanationAttempts = 0;
    announcement = '';
  }

  function choosePrediction(symbol: Comparison): void {
    prediction = symbol;
    announcement = `Première idée enregistrée : ${currentItem.aLabel} ${spokenComparison(symbol)} ${currentItem.bLabel}.`;
  }

  function startPlacement(): void {
    if (!prediction) return;
    finalComparison = prediction;
    phase = 'placement';
    announcement = `Balise A sélectionnée. Place ${currentItem.aLabel} sur la droite.`;
  }

  function selectBeacon(beacon: BeaconKey): void {
    selectedBeacon = beacon;
    announcement = `Balise ${beacon.toUpperCase()} sélectionnée : ${labelFor(beacon)}.`;
  }

  function placeSelected(value: number): void {
    const clamped = Math.max(currentItem.min, Math.min(currentItem.max, value));
    placements = { ...placements, [selectedBeacon]: clamped };
    const wasTouched = touched[selectedBeacon];
    touched = { ...touched, [selectedBeacon]: true };
    announcement = `Balise ${selectedBeacon.toUpperCase()} placée sur ${formatCompact(clamped)}.`;

    if (!wasTouched) {
      const other: BeaconKey = selectedBeacon === 'a' ? 'b' : 'a';
      if (!touched[other]) {
        selectedBeacon = other;
        announcement += ` Balise ${other.toUpperCase()} sélectionnée.`;
      }
    }
  }

  function handleTrackClick(event: MouseEvent): void {
    if (event.detail === 0) return;
    const track = event.currentTarget as HTMLButtonElement;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    placeSelected(Math.round(currentItem.min + ratio * (currentItem.max - currentItem.min)));
  }

  function handleTrackKeydown(event: KeyboardEvent): void {
    let delta = 0;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') delta = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') delta = 1;
    if (event.key === 'PageDown') delta = -10;
    if (event.key === 'PageUp') delta = 10;
    if (event.key === 'Home') {
      event.preventDefault();
      placeSelected(currentItem.min);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      placeSelected(currentItem.max);
      return;
    }
    if (delta !== 0) {
      event.preventDefault();
      placeSelected(placements[selectedBeacon] + delta);
    }
  }

  function adjustSelected(delta: number): void {
    placeSelected(placements[selectedBeacon] + delta);
  }

  function openConfirmation(): void {
    if (!touched.a || !touched.b) return;
    phase = 'confirmation';
    announcement = 'Les deux balises sont placées. Confirme ou modifie ta comparaison.';
  }

  function chooseFinalComparison(symbol: Comparison): void {
    finalComparison = symbol;
  }

  function revealFeedback(): void {
    if (!prediction || !finalComparison) return;
    phase = 'feedback';
    announcement = `${comparisonStatement(currentItem)}. ${placeValueReason(currentItem)}`;
  }

  function openExplanation(): void {
    phase = 'explanation';
    announcement = explanationPrompt(currentItem);
  }

  function chooseExplanation(choice: PlaceValue | 'length'): void {
    if (explanationSolved) return;
    explanationChoice = choice;
    explanationAttempts += 1;
    explanationSolved = choice === currentItem.reason;
    announcement = explanationSolved
      ? 'Oui. Cette valeur de position permet de décider.'
      : explanationCorrection(choice);
  }

  function continueExpedition(): void {
    if (!prediction || !finalComparison || !explanationSolved) return;

    observations = [
      ...observations,
      {
        prediction,
        finalComparison,
        revised: prediction !== finalComparison,
        placementsCorrect: placements.a === currentItem.a && placements.b === currentItem.b,
        explanationAttempts
      }
    ];

    if (currentIndex === items.length - 1) {
      phase = 'completion';
      announcement = 'Expédition terminée. Ta stratégie est prête pour une nouvelle droite.';
      return;
    }

    prepareItem(currentIndex + 1);
    phase = 'prediction';
  }

  function comparisonFor(item: ExerciseItem): Comparison {
    if (item.a === item.b) return '=';
    return item.a < item.b ? '<' : '>';
  }

  function comparisonStatement(item: ExerciseItem): string {
    return `${item.aLabel} ${comparisonFor(item)} ${item.bLabel}`;
  }

  function spokenComparison(symbol: Comparison): string {
    return comparisonOptions.find((option) => option.symbol === symbol)?.label ?? symbol;
  }

  function labelFor(beacon: BeaconKey): string {
    return beacon === 'a' ? currentItem.aLabel : currentItem.bLabel;
  }

  function positionPercent(value: number, item = currentItem): number {
    return ((value - item.min) / (item.max - item.min)) * 100;
  }

  function tickValues(item: ExerciseItem): number[] {
    return Array.from({ length: item.max - item.min + 1 }, (_, index) => item.min + index);
  }

  function isLabelledTick(value: number, item: ExerciseItem): boolean {
    return (
      value === item.min ||
      value === item.max ||
      (value - item.min) % item.labelStep === 0
    );
  }

  function formatCompact(hundredths: number): string {
    const units = Math.floor(hundredths / 100);
    const remainder = Math.abs(hundredths % 100);
    if (remainder === 0) return `${units}`;
    if (remainder % 10 === 0) return `${units},${Math.floor(remainder / 10)}`;
    return `${units},${remainder.toString().padStart(2, '0')}`;
  }

  function formatHundredths(hundredths: number): string {
    const units = Math.floor(hundredths / 100);
    const remainder = Math.abs(hundredths % 100);
    return `${units},${remainder.toString().padStart(2, '0')}`;
  }

  function placeParts(hundredths: number): { units: number; tenths: number; hundredths: number } {
    return {
      units: Math.floor(hundredths / 100),
      tenths: Math.floor(Math.abs(hundredths % 100) / 10),
      hundredths: Math.abs(hundredths % 10)
    };
  }

  function placeValueReason(item: ExerciseItem): string {
    const a = placeParts(item.a);
    const b = placeParts(item.b);
    if (item.reason === 'tenths') {
      return `Les unités sont égales. ${a.tenths} dixièmes se comparent à ${b.tenths} dixièmes.`;
    }
    return `Les unités et les dixièmes sont égaux. ${a.hundredths} centièmes se comparent à ${b.hundredths} centièmes.`;
  }

  function explanationPrompt(item: ExerciseItem): string {
    return item.reason === 'tenths'
      ? 'Les unités sont égales. Pour décider ici, je compare d’abord…'
      : 'Les unités et les dixièmes sont égaux. Pour décider ici, je compare…';
  }

  function explanationCorrection(choice: PlaceValue | 'length'): string {
    if (choice === 'length') {
      return 'Le nombre de chiffres peut tendre un piège. Cherche plutôt la première colonne qui diffère.';
    }
    return `Regarde la première colonne différente dans le tableau : ce sont ${currentItem.reason === 'tenths' ? 'les dixièmes' : 'les centièmes'}.`;
  }

  function feedbackHeading(): string {
    const comparisonCorrect = finalComparison === comparisonFor(currentItem);
    const positionsCorrect = placements.a === currentItem.a && placements.b === currentItem.b;
    if (comparisonCorrect && positionsCorrect) return 'Les trois indices sont alignés.';
    if (comparisonCorrect) return 'Ton ordre est juste. Affinons les positions.';
    return 'La droite révèle un autre ordre.';
  }

  function feedbackIntro(): string {
    if (currentItem.id === 'piege') {
      return 'La virgule ne sépare pas deux nombres entiers. Écrire 3,5 sous la forme 3,50 permet d’aligner les positions.';
    }
    if (currentItem.reason === 'hundredths') {
      return 'Les unités et les dixièmes ne départagent pas les nombres. Le premier écart apparaît aux centièmes.';
    }
    return 'Les parties entières sont identiques. Le premier écart apparaît dans la colonne des dixièmes.';
  }

  function revisedAnyAnswer(): boolean {
    return observations.some((observation) => observation.revised);
  }
</script>

<svelte:head>
  <title>La balise décimale · EX-0001</title>
  <meta
    name="description"
    content="Prototype isolé pour placer et comparer des nombres décimaux sur une droite graduée."
  />
</svelte:head>

<main class="prototype-root">
  <div class="ambient-grid" aria-hidden="true"></div>

  {#if phase === 'introduction'}
    <section class="intro-shell" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="eyebrow"><span>EX—0001</span> Expédition décimale</p>
        <h1 id="intro-title">La balise<br /><em>décimale</em></h1>
        <p class="intro-lead">
          Sur une droite, chaque nombre a une place exacte. Prédis l’ordre, pose les balises,
          puis découvre ce que racontent les dixièmes et les centièmes.
        </p>

        <div class="intro-actions">
          <button class="primary-button" type="button" onclick={beginExpedition}>
            Ouvrir la carte <span aria-hidden="true">→</span>
          </button>
          <span>3 étapes · environ 5 min</span>
        </div>
      </div>

      <div class="intro-map" aria-hidden="true">
        <div class="map-card">
          <span class="map-label">Zone à explorer</span>
          <div class="map-number map-number-a">3,45</div>
          <div class="map-route"><span></span><span></span><span></span></div>
          <div class="map-number map-number-b">3,5</div>
          <div class="map-note">Même unité.<br />Autre position.</div>
        </div>
        <div class="compass">N</div>
      </div>
    </section>
  {:else}
    <section class="exercise-shell" aria-labelledby="exercise-title">
      <header class="mission-header">
        <a class="brand" href="/exercise/?id=EX-0001" aria-label="Retour à la fiche de conception">
          <span class="brand-mark" aria-hidden="true">◒</span>
          <span>Balise<br /><strong>décimale</strong></span>
        </a>

        {#if phase !== 'completion'}
          <div class="progress-wrap">
            <div class="progress-copy">
              <span>Étape {currentIndex + 1} / {items.length}</span>
              <span>{currentItem.chapter}</span>
            </div>
            <div
              class="progress-track"
              role="progressbar"
              aria-label="Progression de l’expédition"
              aria-valuemin="1"
              aria-valuemax={items.length}
              aria-valuenow={currentIndex + 1}
            >
              <span style={`width: ${((currentIndex + 1) / items.length) * 100}%`}></span>
            </div>
          </div>
        {:else}
          <span class="completed-label">Carte complétée</span>
        {/if}
      </header>

      {#if phase === 'prediction'}
        <div class="stage-grid">
          <aside class="stage-index" aria-hidden="true">
            <span>0{currentIndex + 1}</span>
            <div></div>
            <small>Prédire</small>
          </aside>

          <article class="stage-card prediction-card">
            <p class="stage-kicker">Première intuition</p>
            <h1 id="exercise-title">{currentItem.prompt}</h1>
            <p class="stage-instruction">
              Choisis un signe sans chercher trop longtemps. Tu pourras changer d’avis après le placement.
            </p>

            <div class="comparison-builder" aria-label="Choisir la comparaison">
              <div class="number-token token-a"><span>A</span>{currentItem.aLabel}</div>
              <div class="comparison-options">
                {#each comparisonOptions as option}
                  <button
                    type="button"
                    class:selected={prediction === option.symbol}
                    aria-pressed={prediction === option.symbol}
                    aria-label={`${currentItem.aLabel} ${option.label} ${currentItem.bLabel}`}
                    onclick={() => choosePrediction(option.symbol)}
                  >
                    {option.symbol}
                  </button>
                {/each}
              </div>
              <div class="number-token token-b"><span>B</span>{currentItem.bLabel}</div>
            </div>

            <div class="stage-actions">
              <p class="quiet-note">Ta première idée reste visible, sans être notée.</p>
              <button class="primary-button" type="button" disabled={!prediction} onclick={startPlacement}>
                Placer les balises <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      {:else if phase === 'placement'}
        <div class="stage-grid">
          <aside class="stage-index" aria-hidden="true">
            <span>0{currentIndex + 1}</span>
            <div></div>
            <small>Placer</small>
          </aside>

          <article class="stage-card placement-card">
            <p class="stage-kicker">La carte des nombres</p>
            <h1 id="exercise-title">Pose chaque balise à sa place.</h1>
            <p class="stage-instruction">
              Sélectionne A ou B, puis touche la droite. Avec le clavier : flèches pour 0,01, Page&nbsp;↑ ou Page&nbsp;↓ pour 0,10.
            </p>

            <div class="beacon-picker" aria-label="Balise à déplacer">
              <button
                type="button"
                class="beacon-choice beacon-a"
                class:selected={selectedBeacon === 'a'}
                aria-pressed={selectedBeacon === 'a'}
                onclick={() => selectBeacon('a')}
              >
                <span>A</span>
                <strong>{currentItem.aLabel}</strong>
                <small>{touched.a ? `placée vers ${formatCompact(placements.a)}` : 'à placer'}</small>
              </button>
              <button
                type="button"
                class="beacon-choice beacon-b"
                class:selected={selectedBeacon === 'b'}
                aria-pressed={selectedBeacon === 'b'}
                onclick={() => selectBeacon('b')}
              >
                <span>B</span>
                <strong>{currentItem.bLabel}</strong>
                <small>{touched.b ? `placée vers ${formatCompact(placements.b)}` : 'à placer'}</small>
              </button>
            </div>

            <div class="number-line-panel">
              <div class="line-caption">
                <span>{formatCompact(currentItem.min)}</span>
                <span>La droite grandit vers la droite</span>
                <span>{formatCompact(currentItem.max)}</span>
              </div>
              <button
                type="button"
                class="interactive-line"
                aria-label={`Droite graduée. Place la balise ${selectedBeacon.toUpperCase()} ${labelFor(selectedBeacon)}. Valeur actuelle ${formatCompact(placements[selectedBeacon])}.`}
                aria-describedby="line-help"
                onclick={handleTrackClick}
                onkeydown={handleTrackKeydown}
              >
                <span class="axis" aria-hidden="true"></span>
                {#each tickValues(currentItem) as tick}
                  <span
                    class="tick"
                    class:major={isLabelledTick(tick, currentItem)}
                    style={`--position: ${positionPercent(tick)}%`}
                    aria-hidden="true"
                  >
                    {#if isLabelledTick(tick, currentItem)}
                      <span>{formatCompact(tick)}</span>
                    {/if}
                  </span>
                {/each}
                <span
                  class="line-beacon line-beacon-a"
                  class:ghost={!touched.a}
                  style={`--position: ${positionPercent(placements.a)}%`}
                  aria-hidden="true"
                ><b>A</b><small>{touched.a ? formatCompact(placements.a) : '?'}</small></span>
                <span
                  class="line-beacon line-beacon-b"
                  class:ghost={!touched.b}
                  style={`--position: ${positionPercent(placements.b)}%`}
                  aria-hidden="true"
                ><b>B</b><small>{touched.b ? formatCompact(placements.b) : '?'}</small></span>
              </button>
              <p id="line-help" class="sr-only">
                Sélectionne une balise, puis clique ou touche la droite. Les flèches déplacent la balise sélectionnée d’un centième.
              </p>

              <div class="nudge-controls" aria-label="Ajuster la balise sélectionnée">
                <span>Balise {selectedBeacon.toUpperCase()}</span>
                <button type="button" onclick={() => adjustSelected(-10)} aria-label="Reculer d’un dixième">− 0,10</button>
                <button type="button" onclick={() => adjustSelected(-1)} aria-label="Reculer d’un centième">− 0,01</button>
                <output aria-live="polite">{formatCompact(placements[selectedBeacon])}</output>
                <button type="button" onclick={() => adjustSelected(1)} aria-label="Avancer d’un centième">+ 0,01</button>
                <button type="button" onclick={() => adjustSelected(10)} aria-label="Avancer d’un dixième">+ 0,10</button>
              </div>
            </div>

            <div class="stage-actions">
              <p class="quiet-note">
                {#if touched.a && touched.b}
                  Les deux balises sont prêtes.
                {:else}
                  Place encore {touched.a ? 'la balise B' : touched.b ? 'la balise A' : 'les deux balises'}.
                {/if}
              </p>
              <button
                class="primary-button"
                type="button"
                disabled={!touched.a || !touched.b}
                onclick={openConfirmation}
              >
                Comparer les positions <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      {:else if phase === 'confirmation'}
        <div class="stage-grid">
          <aside class="stage-index" aria-hidden="true">
            <span>0{currentIndex + 1}</span>
            <div></div>
            <small>Décider</small>
          </aside>

          <article class="stage-card confirmation-card">
            <p class="stage-kicker">Deuxième regard</p>
            <h1 id="exercise-title">Que racontent tes positions ?</h1>
            <p class="stage-instruction">
              Ta première idée était <strong>{currentItem.aLabel} {prediction} {currentItem.bLabel}</strong>.
              Garde-la ou modifie-la avant de révéler les repères exacts.
            </p>

            <div class="mini-map" aria-hidden="true">
              <div class="mini-axis"></div>
              <span class="mini-pin pin-a" style={`--position: ${positionPercent(placements.a)}%`}><b>A</b>{formatCompact(placements.a)}</span>
              <span class="mini-pin pin-b" style={`--position: ${positionPercent(placements.b)}%`}><b>B</b>{formatCompact(placements.b)}</span>
            </div>

            <div class="comparison-builder compact" aria-label="Confirmer la comparaison">
              <div class="number-token token-a"><span>A</span>{currentItem.aLabel}</div>
              <div class="comparison-options">
                {#each comparisonOptions as option}
                  <button
                    type="button"
                    class:selected={finalComparison === option.symbol}
                    aria-pressed={finalComparison === option.symbol}
                    aria-label={`${currentItem.aLabel} ${option.label} ${currentItem.bLabel}`}
                    onclick={() => chooseFinalComparison(option.symbol)}
                  >
                    {option.symbol}
                  </button>
                {/each}
              </div>
              <div class="number-token token-b"><span>B</span>{currentItem.bLabel}</div>
            </div>

            <div class="stage-actions">
              <p class="quiet-note">
                {#if finalComparison !== prediction}
                  Tu as choisi de réviser ta première idée.
                {:else}
                  Tu gardes ta première idée.
                {/if}
              </p>
              <button class="primary-button" type="button" disabled={!finalComparison} onclick={revealFeedback}>
                Révéler les repères <span aria-hidden="true">✦</span>
              </button>
            </div>
          </article>
        </div>
      {:else if phase === 'feedback'}
        <div class="stage-grid">
          <aside class="stage-index result-index" aria-hidden="true">
            <span>0{currentIndex + 1}</span>
            <div></div>
            <small>Observer</small>
          </aside>

          <article class="stage-card feedback-card">
            <p class="stage-kicker">Les repères exacts</p>
            <h1 id="exercise-title">{feedbackHeading()}</h1>
            <p class="stage-instruction">{feedbackIntro()}</p>

            <div class="feedback-layout">
              <div class="correct-line-wrap">
                <p class="panel-label">Sur la droite</p>
                <div class="correct-line" aria-label={`Position correcte : ${comparisonStatement(currentItem)}`}>
                  <span class="axis" aria-hidden="true"></span>
                  {#each tickValues(currentItem) as tick}
                    <span
                      class="tick"
                      class:major={isLabelledTick(tick, currentItem)}
                      style={`--position: ${positionPercent(tick)}%`}
                      aria-hidden="true"
                    >
                      {#if isLabelledTick(tick, currentItem)}<span>{formatCompact(tick)}</span>{/if}
                    </span>
                  {/each}
                  <span class="line-beacon line-beacon-a" style={`--position: ${positionPercent(currentItem.a)}%`} aria-hidden="true"><b>A</b><small>{currentItem.aLabel}</small></span>
                  <span class="line-beacon line-beacon-b" style={`--position: ${positionPercent(currentItem.b)}%`} aria-hidden="true"><b>B</b><small>{currentItem.bLabel}</small></span>
                </div>
              </div>

              <div class="place-table-wrap">
                <p class="panel-label">Dans le tableau de position</p>
                <table>
                  <thead>
                    <tr><th>Nombre</th><th>Unités</th><th>Dixièmes</th><th>Centièmes</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{formatHundredths(currentItem.a)}</th>
                      <td>{placeParts(currentItem.a).units}</td>
                      <td class:focus-column={currentItem.reason === 'tenths'}>{placeParts(currentItem.a).tenths}</td>
                      <td class:focus-column={currentItem.reason === 'hundredths'}>{placeParts(currentItem.a).hundredths}</td>
                    </tr>
                    <tr>
                      <th>{formatHundredths(currentItem.b)}</th>
                      <td>{placeParts(currentItem.b).units}</td>
                      <td class:focus-column={currentItem.reason === 'tenths'}>{placeParts(currentItem.b).tenths}</td>
                      <td class:focus-column={currentItem.reason === 'hundredths'}>{placeParts(currentItem.b).hundredths}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="result-strip">
              <div>
                <span>Relation exacte</span>
                <strong>{comparisonStatement(currentItem)}</strong>
              </div>
              <p>{placeValueReason(currentItem)}</p>
            </div>

            <div class="stage-actions">
              <p class="quiet-note">Le signe, la droite et le tableau doivent raconter la même histoire.</p>
              <button class="primary-button" type="button" onclick={openExplanation}>
                Formuler la stratégie <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      {:else if phase === 'explanation'}
        <div class="stage-grid">
          <aside class="stage-index" aria-hidden="true">
            <span>0{currentIndex + 1}</span>
            <div></div>
            <small>Expliquer</small>
          </aside>

          <article class="stage-card explanation-card">
            <p class="stage-kicker">Mettre des mots sur le repère</p>
            <h1 id="exercise-title">{explanationPrompt(currentItem)}</h1>

            <div class="sentence-options" aria-label="Compléter la justification">
              {#each explanationOptions as option}
                <button
                  type="button"
                  class:selected={explanationChoice === option.value}
                  class:correct={explanationSolved && option.value === currentItem.reason}
                  aria-pressed={explanationChoice === option.value}
                  disabled={explanationSolved}
                  onclick={() => chooseExplanation(option.value)}
                >
                  <span aria-hidden="true">{option.value === 'length' ? 'Aa' : option.value === 'tenths' ? '0,1' : '0,01'}</span>
                  {option.label}
                </button>
              {/each}
            </div>

            {#if explanationChoice}
              <div class="explanation-feedback" class:success={explanationSolved} role="status">
                <span aria-hidden="true">{explanationSolved ? '✓' : '↺'}</span>
                <div>
                  <strong>{explanationSolved ? 'Oui, c’est le premier repère utile.' : 'Regarde encore le tableau.'}</strong>
                  <p>{explanationSolved ? placeValueReason(currentItem) : explanationCorrection(explanationChoice)}</p>
                </div>
              </div>
            {/if}

            <div class="strategy-card">
              <span>Stratégie de route</span>
              <ol>
                <li>Aligner les unités.</li>
                <li>Comparer les dixièmes.</li>
                <li>Si besoin, comparer les centièmes.</li>
              </ol>
            </div>

            <div class="stage-actions">
              <p class="quiet-note">
                {explanationSolved ? 'Cette stratégie voyagera avec toi.' : 'Choisis la première valeur de position qui permet de décider.'}
              </p>
              <button class="primary-button" type="button" disabled={!explanationSolved} onclick={continueExpedition}>
                {currentIndex === items.length - 1 ? 'Terminer l’expédition' : 'Étape suivante'}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      {:else if phase === 'completion'}
        <article class="completion-card" aria-labelledby="exercise-title">
          <div class="completion-mark" aria-hidden="true"><span>✓</span></div>
          <p class="stage-kicker">Carte complétée</p>
          <h1 id="exercise-title">Tu sais maintenant lire entre les chiffres.</h1>
          <p class="completion-lead">
            {#if revisedAnyAnswer()}
              Tu as utilisé les repères pour revoir au moins une première idée : c’est exactement le rôle d’une bonne représentation.
            {:else}
              Tu as vérifié tes premières idées avec deux représentations différentes : la droite et le tableau de position.
            {/if}
          </p>

          <div class="completion-route" aria-label="Les trois étapes terminées">
            {#each items as item, index}
              <div>
                <span>0{index + 1}</span>
                <i aria-hidden="true"></i>
                <strong>{item.chapter}</strong>
              </div>
            {/each}
          </div>

          <blockquote>
            <span>Le repère à emporter</span>
            « J’aligne les unités, puis je compare les dixièmes et les centièmes. »
          </blockquote>

          <div class="completion-actions">
            <button class="primary-button" type="button" onclick={beginExpedition}>
              Refaire l’expédition <span aria-hidden="true">↻</span>
            </button>
            <p>Rien n’a été enregistré ni envoyé.</p>
          </div>
        </article>
      {/if}
    </section>
  {/if}

  <p class="sr-only" aria-live="polite">{announcement}</p>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(button),
  :global(a) {
    -webkit-tap-highlight-color: transparent;
  }

  .prototype-root {
    --ink: #102c2c;
    --muted: #5d706c;
    --paper: #fffdf7;
    --cream: #f1eee3;
    --line: #ccd3c9;
    --green: #174f46;
    --green-dark: #0f3b36;
    --mint: #cce8d8;
    --yellow: #ffd84b;
    --orange: #f2794b;
    --blue: #5688a6;
    position: relative;
    min-height: calc(100vh - 42px);
    overflow: hidden;
    color: var(--ink);
    background: var(--cream);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .ambient-grid {
    position: fixed;
    inset: 42px 0 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(23, 79, 70, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23, 79, 70, 0.035) 1px, transparent 1px);
    background-size: 36px 36px;
    mask-image: linear-gradient(to bottom, black, transparent 72%);
  }

  .intro-shell {
    position: relative;
    display: grid;
    min-height: calc(100vh - 42px);
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
    align-items: center;
    gap: clamp(36px, 7vw, 110px);
    width: min(1220px, calc(100% - 48px));
    margin: 0 auto;
    padding: 72px 0;
  }

  .eyebrow,
  .stage-kicker,
  .panel-label {
    margin: 0;
    color: var(--green);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .eyebrow span {
    padding: 7px 9px;
    border: 1px solid var(--green);
    border-radius: 999px;
    font-family: ui-monospace, monospace;
    letter-spacing: 0.06em;
  }

  .intro-copy h1 {
    margin: 24px 0 22px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(4.1rem, 8vw, 8.3rem);
    font-weight: 500;
    letter-spacing: -0.07em;
    line-height: 0.77;
  }

  .intro-copy h1 em {
    position: relative;
    color: var(--green);
    font-weight: 500;
  }

  .intro-copy h1 em::after {
    position: absolute;
    right: 0;
    bottom: -15px;
    left: 7%;
    height: 11px;
    background: var(--yellow);
    clip-path: polygon(0 28%, 96% 0, 100% 68%, 4% 100%);
    content: "";
    z-index: -1;
  }

  .intro-lead {
    max-width: 610px;
    margin: 38px 0 0;
    color: var(--muted);
    font-size: clamp(1.05rem, 2vw, 1.28rem);
    line-height: 1.65;
  }

  .intro-actions,
  .stage-actions,
  .completion-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 38px;
  }

  .intro-actions > span,
  .completion-actions p {
    color: var(--muted);
    font-size: 0.8rem;
  }

  .primary-button {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 13px 20px;
    border: 1px solid var(--green);
    border-radius: 8px;
    color: white;
    background: var(--green);
    box-shadow: 0 5px 0 var(--green-dark);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform 130ms ease, box-shadow 130ms ease, background 130ms ease;
  }

  .primary-button:hover:not(:disabled) {
    background: #1d6257;
    transform: translateY(-2px);
    box-shadow: 0 7px 0 var(--green-dark);
  }

  .primary-button:active:not(:disabled) {
    transform: translateY(4px);
    box-shadow: 0 1px 0 var(--green-dark);
  }

  .primary-button:disabled {
    border-color: #a6b2ac;
    color: #71807a;
    background: #d8ddd8;
    box-shadow: 0 3px 0 #b6bdb7;
    cursor: not-allowed;
  }

  .intro-map {
    position: relative;
    min-height: 520px;
  }

  .map-card {
    position: absolute;
    inset: 32px 12px 22px 35px;
    overflow: hidden;
    border: 1px solid #b8c7bb;
    border-radius: 4px;
    background:
      radial-gradient(circle at 82% 16%, transparent 0 47px, rgba(23, 79, 70, 0.16) 48px 49px, transparent 50px),
      radial-gradient(circle at 18% 78%, transparent 0 86px, rgba(23, 79, 70, 0.13) 87px 88px, transparent 89px),
      #ddebd9;
    box-shadow: 22px 25px 0 rgba(23, 79, 70, 0.11);
    transform: rotate(2deg);
  }

  .map-card::before,
  .map-card::after {
    position: absolute;
    border: 1px solid rgba(23, 79, 70, 0.15);
    border-radius: 50%;
    content: "";
  }

  .map-card::before {
    top: 22%;
    right: -22%;
    width: 330px;
    height: 170px;
    transform: rotate(-24deg);
  }

  .map-card::after {
    bottom: -13%;
    left: 14%;
    width: 230px;
    height: 260px;
  }

  .map-label {
    position: absolute;
    top: 24px;
    left: 26px;
    font-family: ui-monospace, monospace;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .map-number {
    position: absolute;
    z-index: 2;
    padding: 15px 19px;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--paper);
    font-family: Georgia, serif;
    font-size: 2rem;
    font-weight: 700;
    box-shadow: 6px 7px 0 rgba(16, 44, 44, 0.18);
  }

  .map-number::after {
    position: absolute;
    bottom: -13px;
    left: 50%;
    width: 3px;
    height: 14px;
    background: var(--ink);
    content: "";
  }

  .map-number-a { top: 29%; left: 17%; }
  .map-number-b { right: 13%; bottom: 22%; }

  .map-route {
    position: absolute;
    top: 48%;
    left: 30%;
    display: flex;
    width: 45%;
    justify-content: space-between;
    border-top: 3px dashed rgba(23, 79, 70, 0.55);
    transform: rotate(20deg);
  }

  .map-route span {
    width: 10px;
    height: 10px;
    margin-top: -6px;
    border: 2px solid var(--green);
    border-radius: 50%;
    background: var(--yellow);
  }

  .map-note {
    position: absolute;
    bottom: 33px;
    left: 29px;
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.5;
    transform: rotate(-3deg);
  }

  .compass {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    width: 86px;
    height: 86px;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: var(--orange);
    box-shadow: 7px 8px 0 rgba(16, 44, 44, 0.18);
    font-family: Georgia, serif;
    font-size: 1.7rem;
    font-weight: 700;
    transform: rotate(8deg);
  }

  .compass::after {
    position: absolute;
    top: 9px;
    border-right: 7px solid transparent;
    border-bottom: 16px solid var(--paper);
    border-left: 7px solid transparent;
    content: "";
  }

  .exercise-shell {
    position: relative;
    width: min(1180px, calc(100% - 42px));
    margin: 0 auto;
    padding: 26px 0 56px;
  }

  .mission-header {
    display: flex;
    min-height: 64px;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: clamp(30px, 5vw, 58px);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--ink);
    font-size: 0.72rem;
    line-height: 1.05;
    text-decoration: none;
    text-transform: uppercase;
  }

  .brand-mark {
    display: grid;
    width: 37px;
    height: 37px;
    place-items: center;
    border-radius: 50%;
    color: var(--yellow);
    background: var(--green);
    font-size: 1.2rem;
  }

  .progress-wrap {
    width: min(440px, 52vw);
  }

  .progress-copy {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.66rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .progress-track {
    height: 5px;
    overflow: hidden;
    border-radius: 99px;
    background: #d3d8cf;
  }

  .progress-track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--orange);
    transition: width 300ms ease;
  }

  .completed-label {
    padding: 8px 12px;
    border: 1px solid var(--green);
    border-radius: 999px;
    color: var(--green);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .stage-grid {
    display: grid;
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 26px;
    align-items: stretch;
  }

  .stage-index {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: var(--green);
  }

  .stage-index > span {
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border: 1px solid var(--green);
    border-radius: 50%;
    font-family: Georgia, serif;
    font-size: 1.25rem;
  }

  .stage-index > div {
    width: 1px;
    flex: 1;
    min-height: 220px;
    background: var(--line);
  }

  .stage-index small {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  .result-index > span {
    border-color: var(--orange);
    color: var(--paper);
    background: var(--orange);
  }

  .stage-card,
  .completion-card {
    border: 1px solid #c6cec5;
    border-radius: 15px;
    background: rgba(255, 253, 247, 0.95);
    box-shadow: 0 18px 60px rgba(16, 44, 44, 0.08);
  }

  .stage-card {
    padding: clamp(28px, 5vw, 62px);
  }

  .stage-card h1,
  .completion-card h1 {
    max-width: 920px;
    margin: 12px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.25rem, 5vw, 4.8rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1.02;
  }

  .stage-instruction {
    max-width: 720px;
    margin: 18px 0 0;
    color: var(--muted);
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .comparison-builder {
    display: grid;
    grid-template-columns: minmax(150px, 1fr) auto minmax(150px, 1fr);
    align-items: center;
    gap: clamp(14px, 3vw, 32px);
    margin: 52px auto 12px;
  }

  .comparison-builder.compact {
    max-width: 760px;
    margin-top: 36px;
  }

  .number-token {
    position: relative;
    display: grid;
    min-height: 140px;
    place-items: center;
    border: 2px solid var(--ink);
    border-radius: 10px;
    font-family: Georgia, serif;
    font-size: clamp(2.8rem, 7vw, 5.8rem);
    font-weight: 600;
    box-shadow: 7px 8px 0 var(--ink);
  }

  .number-token span {
    position: absolute;
    top: 10px;
    left: 12px;
    display: grid;
    width: 27px;
    height: 27px;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: var(--ink);
    font-family: ui-sans-serif, sans-serif;
    font-size: 0.68rem;
  }

  .token-a { background: var(--yellow); }
  .token-b { background: var(--mint); }

  .comparison-options {
    display: flex;
    gap: 8px;
  }

  .comparison-options button {
    display: grid;
    width: 56px;
    height: 56px;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 50%;
    color: var(--ink);
    background: var(--paper);
    font: inherit;
    font-size: 1.65rem;
    cursor: pointer;
    transition: transform 120ms ease, background 120ms ease, color 120ms ease;
  }

  .comparison-options button:hover,
  .comparison-options button.selected {
    border-color: var(--green);
    color: var(--paper);
    background: var(--green);
    transform: translateY(-2px);
  }

  .stage-actions {
    padding-top: 28px;
    border-top: 1px solid var(--line);
  }

  .quiet-note {
    max-width: 470px;
    margin: 0;
    color: var(--muted);
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .beacon-picker {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 32px;
  }

  .beacon-choice {
    display: grid;
    min-height: 80px;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 14px;
    padding: 13px 16px;
    border: 2px solid transparent;
    border-radius: 9px;
    color: var(--ink);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .beacon-choice > span {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--ink);
    font-size: 0.75rem;
    font-weight: 800;
  }

  .beacon-choice strong {
    font-family: Georgia, serif;
    font-size: 1.9rem;
  }

  .beacon-choice small {
    color: var(--muted);
  }

  .beacon-choice.selected {
    border-color: var(--ink);
    box-shadow: 4px 5px 0 var(--ink);
    transform: translateY(-2px);
  }

  .beacon-a { background: var(--yellow); }
  .beacon-b { background: var(--mint); }

  .number-line-panel {
    margin-top: 28px;
    padding: 18px 22px 20px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #f6f4ea;
  }

  .line-caption {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.64rem;
    text-transform: uppercase;
  }

  .line-caption span:last-child { text-align: right; }

  .interactive-line,
  .correct-line {
    position: relative;
    display: block;
    width: 100%;
    height: 176px;
    margin: 8px 0 0;
    padding: 0;
    border: 0;
    color: var(--ink);
    background: transparent;
  }

  .interactive-line {
    cursor: crosshair;
  }

  .interactive-line:focus-visible {
    border-radius: 8px;
    outline: 3px solid var(--orange);
    outline-offset: 4px;
  }

  .axis,
  .mini-axis {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 3px;
    background: var(--ink);
  }

  .axis::after,
  .mini-axis::after {
    position: absolute;
    top: -5px;
    right: -1px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 10px solid var(--ink);
    content: "";
  }

  .tick {
    position: absolute;
    top: calc(50% - 6px);
    left: var(--position);
    width: 1px;
    height: 13px;
    background: #70817c;
    transform: translateX(-50%);
  }

  .tick.major {
    top: calc(50% - 10px);
    height: 21px;
    background: var(--ink);
  }

  .tick > span {
    position: absolute;
    top: 26px;
    left: 50%;
    color: var(--muted);
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    transform: translateX(-50%);
  }

  .line-beacon {
    position: absolute;
    left: var(--position);
    z-index: 3;
    display: flex;
    min-width: 62px;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border: 2px solid var(--ink);
    border-radius: 7px;
    color: var(--ink);
    box-shadow: 3px 4px 0 var(--ink);
    transform: translateX(-50%);
    transition: left 140ms ease;
  }

  .line-beacon::after {
    position: absolute;
    left: 50%;
    width: 2px;
    height: 24px;
    background: var(--ink);
    content: "";
    transform: translateX(-50%);
  }

  .line-beacon b {
    display: grid;
    width: 22px;
    height: 22px;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: var(--ink);
    font-size: 0.61rem;
  }

  .line-beacon small {
    font-family: ui-monospace, monospace;
    font-size: 0.67rem;
    font-weight: 800;
  }

  .line-beacon-a {
    top: 18px;
    background: var(--yellow);
  }

  .line-beacon-a::after { top: 100%; }

  .line-beacon-b {
    top: 116px;
    background: var(--mint);
  }

  .line-beacon-b::after { bottom: 100%; }

  .line-beacon.ghost {
    border-style: dashed;
    opacity: 0.48;
    box-shadow: none;
  }

  .nudge-controls {
    display: grid;
    grid-template-columns: auto repeat(2, auto) minmax(66px, 1fr) repeat(2, auto);
    align-items: center;
    gap: 6px;
    padding-top: 14px;
    border-top: 1px solid var(--line);
  }

  .nudge-controls > span {
    margin-right: 8px;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .nudge-controls button {
    min-height: 44px;
    padding: 8px 10px;
    border: 1px solid #aeb9b1;
    border-radius: 6px;
    background: var(--paper);
    font: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
  }

  .nudge-controls button:hover { border-color: var(--green); }

  .nudge-controls output {
    min-width: 62px;
    color: var(--green);
    font-family: Georgia, serif;
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
  }

  .mini-map {
    position: relative;
    height: 150px;
    margin: 36px 0 10px;
    padding: 0 20px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #f6f4ea;
  }

  .mini-axis {
    right: 24px;
    left: 24px;
  }

  .mini-pin {
    position: absolute;
    left: calc(24px + (100% - 48px) * var(--position) / 100);
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 10px;
    border: 2px solid var(--ink);
    border-radius: 7px;
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 800;
    box-shadow: 3px 4px 0 var(--ink);
    transform: translateX(-50%);
  }

  .mini-pin b {
    display: grid;
    width: 21px;
    height: 21px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--ink);
  }

  .pin-a { top: 20px; background: var(--yellow); }
  .pin-b { bottom: 18px; background: var(--mint); }

  .feedback-layout {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 16px;
    margin-top: 34px;
  }

  .correct-line-wrap,
  .place-table-wrap {
    min-width: 0;
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #f6f4ea;
  }

  .correct-line {
    height: 160px;
  }

  .correct-line .line-beacon-a { top: 11px; }
  .correct-line .line-beacon-b { top: 104px; }

  .place-table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
  }

  th,
  td {
    height: 52px;
    padding: 8px;
    border: 1px solid #cbd2c9;
    text-align: center;
  }

  thead th {
    color: var(--muted);
    font-size: 0.62rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  tbody th {
    font-family: Georgia, serif;
    font-size: 1.1rem;
  }

  td {
    font-family: ui-monospace, monospace;
    font-size: 1.25rem;
    font-weight: 700;
  }

  td.focus-column {
    color: var(--green-dark);
    background: var(--yellow);
    box-shadow: inset 0 -4px 0 var(--orange);
  }

  .result-strip {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 24px;
    margin-top: 16px;
    padding: 18px 20px;
    border-left: 5px solid var(--orange);
    border-radius: 5px;
    background: #fff2d0;
  }

  .result-strip > div {
    display: grid;
    gap: 3px;
  }

  .result-strip span {
    color: var(--muted);
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .result-strip strong {
    font-family: Georgia, serif;
    font-size: 1.75rem;
  }

  .result-strip p {
    margin: 0;
    color: var(--muted);
    line-height: 1.5;
  }

  .sentence-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 38px;
  }

  .sentence-options button {
    display: grid;
    min-height: 132px;
    place-items: center;
    gap: 10px;
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 9px;
    color: var(--ink);
    background: #f6f4ea;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    transition: border 120ms ease, transform 120ms ease, background 120ms ease;
  }

  .sentence-options button:hover:not(:disabled),
  .sentence-options button.selected {
    border-color: var(--green);
    transform: translateY(-3px);
  }

  .sentence-options button.correct {
    border-color: var(--green);
    background: var(--mint);
    box-shadow: 0 5px 0 var(--green);
  }

  .sentence-options button:disabled {
    color: var(--ink);
    cursor: default;
    opacity: 1;
  }

  .sentence-options button > span {
    display: grid;
    min-width: 55px;
    min-height: 42px;
    place-items: center;
    border: 1px solid var(--ink);
    border-radius: 50%;
    background: var(--paper);
    font-family: Georgia, serif;
    font-size: 1rem;
  }

  .explanation-feedback {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 18px;
    padding: 14px 17px;
    border: 1px solid #dbba9d;
    border-radius: 8px;
    background: #fff1e6;
  }

  .explanation-feedback.success {
    border-color: #90b8a4;
    background: #e1f1e7;
  }

  .explanation-feedback > span {
    display: grid;
    width: 34px;
    height: 34px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--orange);
    font-weight: 800;
  }

  .explanation-feedback.success > span { background: var(--green); }

  .explanation-feedback strong,
  .explanation-feedback p {
    margin: 0;
  }

  .explanation-feedback p {
    margin-top: 3px;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .strategy-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 28px;
    margin-top: 26px;
    padding: 20px;
    border: 1px dashed #8ba097;
    border-radius: 8px;
  }

  .strategy-card > span {
    color: var(--green);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .strategy-card ol {
    display: grid;
    gap: 8px;
    margin: 0;
    padding-left: 22px;
    color: var(--muted);
  }

  .completion-card {
    position: relative;
    width: min(920px, 100%);
    margin: 32px auto 0;
    padding: clamp(34px, 7vw, 76px);
    text-align: center;
  }

  .completion-mark {
    display: grid;
    width: 82px;
    height: 82px;
    margin: -110px auto 24px;
    place-items: center;
    border: 8px solid var(--cream);
    border-radius: 50%;
    color: white;
    background: var(--green);
    box-shadow: 0 7px 0 var(--green-dark);
  }

  .completion-mark span { font-size: 2rem; }

  .completion-card .stage-kicker { text-align: center; }

  .completion-card h1 {
    margin-right: auto;
    margin-left: auto;
  }

  .completion-lead {
    max-width: 680px;
    margin: 22px auto 0;
    color: var(--muted);
    line-height: 1.65;
  }

  .completion-route {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 42px 0;
  }

  .completion-route > div {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 9px;
  }

  .completion-route span {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: var(--green);
    font-family: Georgia, serif;
    z-index: 2;
  }

  .completion-route i {
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    border-top: 2px dashed #8ca098;
  }

  .completion-route > div:last-child i { display: none; }

  .completion-route strong {
    font-size: 0.75rem;
  }

  blockquote {
    margin: 0;
    padding: 24px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #f6f4ea;
    font-family: Georgia, serif;
    font-size: clamp(1.2rem, 3vw, 1.7rem);
    line-height: 1.45;
  }

  blockquote span {
    display: block;
    margin-bottom: 9px;
    color: var(--green);
    font-family: ui-sans-serif, sans-serif;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .completion-actions {
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
  }

  .completion-actions p { margin: 0; }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  :global(button:focus-visible),
  :global(a:focus-visible) {
    outline: 3px solid var(--orange);
    outline-offset: 3px;
  }

  @media (max-width: 860px) {
    .intro-shell {
      grid-template-columns: 1fr;
      padding-top: 48px;
    }

    .intro-map {
      min-height: 420px;
    }

    .comparison-builder {
      grid-template-columns: 1fr;
      justify-items: stretch;
    }

    .comparison-options {
      justify-content: center;
      order: 2;
    }

    .token-b { order: 3; }

    .feedback-layout {
      grid-template-columns: 1fr;
    }

    .nudge-controls {
      grid-template-columns: repeat(4, 1fr);
    }

    .nudge-controls > span,
    .nudge-controls output {
      grid-column: span 2;
    }

    .sentence-options {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .prototype-root {
      min-height: calc(100vh - 42px);
    }

    .intro-shell,
    .exercise-shell {
      width: min(100% - 24px, 1180px);
    }

    .intro-shell {
      padding: 38px 0 52px;
    }

    .intro-copy h1 {
      font-size: clamp(3.7rem, 20vw, 6rem);
    }

    .intro-actions,
    .stage-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .intro-actions .primary-button,
    .stage-actions .primary-button {
      width: 100%;
    }

    .intro-map { min-height: 340px; }
    .map-card { inset: 20px 8px 20px 8px; }
    .map-number { font-size: 1.35rem; }
    .map-number-a { top: 27%; left: 10%; }
    .map-number-b { right: 8%; bottom: 18%; }
    .compass { width: 68px; height: 68px; }

    .mission-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 18px;
    }

    .progress-wrap { width: 100%; }

    .stage-grid {
      grid-template-columns: 1fr;
    }

    .stage-index { display: none; }

    .stage-card {
      padding: 25px 18px;
    }

    .stage-card h1 {
      font-size: clamp(2rem, 11vw, 3.2rem);
    }

    .number-token { min-height: 110px; }

    .beacon-picker { grid-template-columns: 1fr; }

    .beacon-choice {
      grid-template-columns: auto 1fr;
    }

    .beacon-choice small {
      grid-column: 2;
    }

    .number-line-panel { padding: 14px 11px; }

    .line-caption span:nth-child(2) { display: none; }

    .nudge-controls {
      grid-template-columns: 1fr 1fr;
    }

    .nudge-controls > span,
    .nudge-controls output {
      grid-column: span 2;
    }

    .result-strip,
    .strategy-card {
      grid-template-columns: 1fr;
    }

    .place-table-wrap { padding: 14px 8px; }

    th,
    td {
      padding: 6px 4px;
    }

    .completion-card {
      margin-top: 48px;
      padding: 34px 20px;
    }

    .completion-mark { margin-top: -80px; }

    .completion-route strong { font-size: 0.62rem; }
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
