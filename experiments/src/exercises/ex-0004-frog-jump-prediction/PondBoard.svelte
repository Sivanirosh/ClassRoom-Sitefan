<script context="module" lang="ts">
  export type PondMode = 'tutorial' | 'prediction';
  export type PondOrientation = 'horizontal' | 'vertical';
  export type PondOutcome = 'idle' | 'short' | 'exact' | 'over';
  export type PondBoardVariant = 'active' | 'success';

  export type PondScene = {
    id: string;
    mode: PondMode;
    orientation: PondOrientation;
    targetUnits: number;
    obstacleUnits: number[];
  };

  export type PondTrace = {
    from: number;
    to: number;
    distance: 1 | 2;
  };

  export type PondJourney = {
    coveredUnits: number;
    executedActions: number;
    prediction: number | null;
    running: boolean;
    outcome: PondOutcome;
    trace: PondTrace[];
  };
</script>

<script lang="ts">
  import frogGreen from './assets/pond-top-view/frog-green.png';
  import frogOrange from './assets/pond-top-view/frog-orange.png';
  import lilyPad from './assets/pond-top-view/lily-pad.png';
  import lilyPadFlowering from './assets/pond-top-view/lily-pad-flowering.png';
  import lotusCoral from './assets/pond-top-view/lotus-coral.png';
  import lotusRed from './assets/pond-top-view/lotus-red.png';
  import rockCluster from './assets/pond-top-view/rock-cluster.png';
  import rockLight from './assets/pond-top-view/rock-light.png';
  import rockRound from './assets/pond-top-view/rock-round.png';
  import gradientNoise from './assets/water/gradient-noise.png';
  import valueNoise from './assets/water/value-noise.png';

  type Point = { x: number; y: number };

  export let scene: PondScene;
  export let journey: PondJourney;
  export let variant: PondBoardVariant = 'active';
  export let onJump: (() => void) | undefined = undefined;

  $: isSuccess = variant === 'success';
  $: originPoint = originFor(scene);
  $: finishPoint = pointAt(scene.targetUnits);
  $: frogPoint = pointAt(journey.coveredUnits);
  $: unitReferenceStart = unitReferenceStartFor(scene);
  $: unitReferenceEnd = {
    x: unitReferenceStart.x + vectorFor(scene).x,
    y: unitReferenceStart.y + vectorFor(scene).y
  };
  $: unitReferenceTick = scene.orientation === 'horizontal' ? { x: 0, y: 1.8 } : { x: 1.8, y: 0 };
  $: unitReferenceTicks = [unitReferenceStart, unitReferenceEnd]
    .map((end) => `M ${end.x - unitReferenceTick.x} ${end.y - unitReferenceTick.y} L ${end.x + unitReferenceTick.x} ${end.y + unitReferenceTick.y}`)
    .join(' ');
  $: unitReferenceLabel = scene.orientation === 'horizontal'
    ? { x: unitReferenceStart.x + 5, y: unitReferenceStart.y - 4 }
    : { x: unitReferenceStart.x - 8, y: unitReferenceStart.y - 4 };
  $: discrepancyUnits = Math.abs(scene.targetUnits - journey.coveredUnits);
  $: discrepancyStart = journey.outcome === 'over' ? finishPoint : frogPoint;
  $: discrepancyEnd = journey.outcome === 'over' ? frogPoint : finishPoint;
  $: discrepancyLabel = scene.orientation === 'horizontal'
    ? { x: (discrepancyStart.x + discrepancyEnd.x) / 2, y: originPoint.y - 9 }
    : { x: originPoint.x + 13, y: (discrepancyStart.y + discrepancyEnd.y) / 2 + 1 };
  $: showOverflowEvidence = journey.outcome === 'over' && (
    frogPoint.x <= 7 || frogPoint.x >= 113 || frogPoint.y <= 7 || frogPoint.y >= 93
  );
  $: surfaceId = `${scene.id}-${variant}`;

  function vectorFor(current: PondScene): Point {
    return current.orientation === 'horizontal' ? { x: 10, y: 0 } : { x: 0, y: -10 };
  }

  function originFor(current: PondScene): Point {
    return current.orientation === 'horizontal' ? { x: 20, y: 60 } : { x: 60, y: 80 };
  }

  function unitReferenceStartFor(current: PondScene): Point {
    return current.orientation === 'horizontal' ? { x: 30, y: 50 } : { x: 50, y: 80 };
  }

  function pointAt(units: number): Point {
    const vector = vectorFor(scene);
    return {
      x: originPoint.x + vector.x * units,
      y: originPoint.y + vector.y * units
    };
  }

  function traceWidth(item: PondTrace): number {
    return item.distance === 2 ? 3.2 : 2.4;
  }
</script>

<div
  class:pond-stage={!isSuccess}
  class:success-map={isSuccess}
  class:overflow-evidence={showOverflowEvidence}
  data-pond-stage={!isSuccess ? true : undefined}
  aria-label={isSuccess ? `Trace finale : ${journey.executedActions} actions pour ${scene.targetUnits} unités` : undefined}
>
  <section
    class:overflow-evidence={showOverflowEvidence}
    class="playfield"
    aria-label={`Grille unitaire, trajet ${scene.orientation === 'vertical' ? 'vertical' : 'horizontal'} : ${journey.coveredUnits} unités parcourues`}
  >
    <svg viewBox="0 0 120 100" role="img" aria-labelledby={`path-title-${surfaceId} path-desc-${surfaceId}`}>
      <title id={`path-title-${surfaceId}`}>Trajet de la grenouille dans le jardin-étang</title>
      <desc id={`path-desc-${surfaceId}`}>Grille carrée. Le Départ et l’Arrivée sont séparés par {scene.targetUnits} unités-saut sur un trajet {scene.orientation === 'vertical' ? 'vertical' : 'horizontal'}. {scene.obstacleUnits.length > 0 ? `Une grenouille orange se trouve à ${scene.obstacleUnits.join(', ')} unités du Départ et impose un saut de deux unités comptant pour une action. ` : ''}La grenouille verte a exécuté {journey.executedActions} action{journey.executedActions === 1 ? '' : 's'} et parcouru {journey.coveredUnits} unité{journey.coveredUnits === 1 ? '' : 's'}. Le Départ, l’Arrivée et les traces restent visibles.</desc>

      <defs>
        <linearGradient id={`pond-water-${surfaceId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c9e3d1"></stop>
          <stop offset=".46" stop-color="#8fc7b7"></stop>
          <stop offset="1" stop-color="#68a398"></stop>
        </linearGradient>
        <radialGradient id={`pond-light-${surfaceId}`} cx="42%" cy="34%" r="76%">
          <stop offset="0" stop-color="#f1f5d9" stop-opacity=".66"></stop>
          <stop offset=".55" stop-color="#e0ecda" stop-opacity=".14"></stop>
          <stop offset="1" stop-color="#275f58" stop-opacity=".2"></stop>
        </radialGradient>
        <filter id={`caustic-highlight-${surfaceId}`} x="-12" y="-12" width="144" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 .98  0 0 0 0 .99  0 0 0 0 .84  .2126 .7152 .0722 0 0"
          ></feColorMatrix>
          <feComponentTransfer>
            <feFuncA type="gamma" amplitude=".94" exponent="3.4" offset="0"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id={`caustic-depth-${surfaceId}`} x="-12" y="-12" width="144" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 .12  0 0 0 0 .34  0 0 0 0 .31  -.2126 -.7152 -.0722 0 1"
          ></feColorMatrix>
          <feComponentTransfer>
            <feFuncA type="gamma" amplitude=".42" exponent="1.6" offset="0"></feFuncA>
          </feComponentTransfer>
        </filter>
        <pattern id={`water-noise-a-${surfaceId}`} width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
          <image href={valueNoise} width="48" height="48" preserveAspectRatio="none"></image>
        </pattern>
        <pattern id={`water-noise-b-${surfaceId}`} width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(9)">
          <image href={gradientNoise} width="64" height="64" preserveAspectRatio="none"></image>
        </pattern>
        <pattern id={`unit-grid-${surfaceId}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2f6f65" stroke-opacity=".24" stroke-width=".72"></path>
        </pattern>
      </defs>

      <rect class="pond-water" width="120" height="100" fill={`url(#pond-water-${surfaceId})`}></rect>
      <rect class="pond-light" width="120" height="100" fill={`url(#pond-light-${surfaceId})`}></rect>
      <g class="water-caustics" data-water-caustics aria-hidden="true">
        <rect
          class="water-depth water-noise-b"
          x="-12"
          y="-12"
          width="144"
          height="124"
          fill={`url(#water-noise-b-${surfaceId})`}
          filter={`url(#caustic-depth-${surfaceId})`}
        ></rect>
        <rect
          class="caustic-highlight caustic-a water-noise-a"
          x="-12"
          y="-12"
          width="144"
          height="124"
          fill={`url(#water-noise-a-${surfaceId})`}
          filter={`url(#caustic-highlight-${surfaceId})`}
        ></rect>
        <rect
          class="caustic-highlight caustic-b water-noise-b"
          x="-12"
          y="-12"
          width="144"
          height="124"
          fill={`url(#water-noise-b-${surfaceId})`}
          filter={`url(#caustic-highlight-${surfaceId})`}
        ></rect>
      </g>
      <g class="pond-decor" data-pond-decor aria-hidden="true">
        <image class="pond-rock" data-generated-asset="rock-round" href={rockRound} x="2" y="3" width="14" height="14" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-pad" data-generated-asset="lily-pad" href={lilyPad} x="18" y="6" width="9" height="8" transform="rotate(-26 22.5 10)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-rock" data-generated-asset="rock-cluster" href={rockCluster} x="2" y="24" width="11" height="9" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-flower" data-generated-asset="lotus-coral" href={lotusCoral} x="4" y="44" width="7" height="6.5" transform="rotate(18 7.5 47.25)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-pad" data-generated-asset="lily-pad" href={lilyPad} x="2" y="72" width="8" height="7" transform="rotate(46 6 75.5)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-flower" data-generated-asset="lotus-coral" href={lotusCoral} x="4" y="85" width="9" height="9" transform="rotate(-12 8.5 89.5)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-pad" data-generated-asset="lily-pad-flowering" href={lilyPadFlowering} x="15" y="86" width="11" height="10.5" transform="rotate(-18 20.5 91.25)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-pad" data-generated-asset="lily-pad" href={lilyPad} x="92" y="5" width="11" height="10" transform="rotate(24 97.5 10)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-flower" data-generated-asset="lotus-red" href={lotusRed} x="106" y="4" width="10" height="10" transform="rotate(14 111 9)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-pad" data-generated-asset="lily-pad" href={lilyPad} x="108" y="22" width="8" height="7" transform="rotate(68 112 25.5)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-flower" data-generated-asset="lotus-red" href={lotusRed} x="109" y="71" width="7" height="6.5" transform="rotate(-24 112.5 74.25)" preserveAspectRatio="xMidYMid meet"></image>
        <image class="pond-rock" data-generated-asset="rock-light" href={rockLight} x="105" y="87" width="12" height="10" preserveAspectRatio="xMidYMid meet"></image>
      </g>
      <rect class="grid-surface" width="120" height="100" fill={`url(#unit-grid-${surfaceId})`}></rect>

      <line class="route-bed" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>
      <line class="target-line" x1={originPoint.x} y1={originPoint.y} x2={finishPoint.x} y2={finishPoint.y}></line>

      <g class="unit-reference" role="img" aria-label="Un côté de carré vaut une unité-saut">
        <line x1={unitReferenceStart.x} y1={unitReferenceStart.y} x2={unitReferenceEnd.x} y2={unitReferenceEnd.y}></line>
        <path class="unit-tick" d={unitReferenceTicks}></path>
        <text x={unitReferenceLabel.x} y={unitReferenceLabel.y}>1 saut</text>
      </g>

      {#each journey.trace as item, traceIndex}
        {@const from = pointAt(item.from)}
        {@const to = pointAt(item.to)}
        {#if traceIndex === journey.trace.length - 1}
          <g class="landing-wave" aria-hidden="true">
            <ellipse class="landing-response" cx={to.x} cy={to.y} rx="5.2" ry="2.35"></ellipse>
            <ellipse class="landing-ripple" cx={to.x} cy={to.y} rx="7.2" ry="3.5"></ellipse>
            <ellipse class="landing-ripple inner" cx={to.x} cy={to.y} rx="5.2" ry="2.35"></ellipse>
          </g>
        {/if}
        <line class:double={item.distance === 2} class:vertical={scene.orientation === 'vertical'} class="completed-line" x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke-width={traceWidth(item)}></line>
      {/each}
      {#each journey.trace as item}
        {@const to = pointAt(item.to)}
        <circle class="landing" cx={to.x} cy={to.y} r={isSuccess ? 1.8 : 1.35}></circle>
      {/each}

      {#if !isSuccess && (journey.outcome === 'short' || journey.outcome === 'over')}
        <g class="discrepancy" aria-hidden="true">
          <line x1={discrepancyStart.x} y1={discrepancyStart.y} x2={discrepancyEnd.x} y2={discrepancyEnd.y}></line>
          <rect x={discrepancyLabel.x - 9} y={discrepancyLabel.y - 3.8} width="18" height="5.5" rx="2"></rect>
          <text x={discrepancyLabel.x} y={discrepancyLabel.y}>écart {discrepancyUnits}</text>
        </g>
      {/if}

      <g class="marker origin-marker" class:success-origin={isSuccess} data-pond-cue="origin-pad">
        <image
          class="lily-pad"
          data-generated-asset="lily-pad"
          href={lilyPad}
          x={originPoint.x - 7}
          y={originPoint.y - 7}
          width="14"
          height="14"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        ></image>
        <text x={originPoint.x} y={originPoint.y + 10}>Départ</text>
      </g>

      <g class="marker finish-marker" class:success-finish={isSuccess} data-pond-cue="finish-pad">
        <circle class={isSuccess ? 'success-finish-halo' : 'marker-halo'} cx={finishPoint.x} cy={finishPoint.y} r="6.2"></circle>
        <g class="finish-bloom" aria-hidden="true">
          <image
            class="lily-pad"
            data-generated-asset="lily-pad-flowering"
            href={lilyPadFlowering}
            x={finishPoint.x - 8}
            y={finishPoint.y - 8}
            width="16"
            height="16"
            preserveAspectRatio="xMidYMid meet"
          ></image>
        </g>
        <text x={finishPoint.x + (scene.orientation === 'vertical' ? 12 : 0)} y={finishPoint.y + (scene.orientation === 'vertical' ? 1 : 10)}>Arrivée</text>
      </g>

      {#each scene.obstacleUnits as units}
        {@const obstacle = pointAt(units)}
        <g class="obstacle" transform={`translate(${obstacle.x} ${obstacle.y})`} aria-label={isSuccess ? 'Grenouille orange conservée après le saut double' : 'Grenouille orange à franchir par un saut de deux unités'}>
          <image
            class="obstacle-frog-sprite"
            data-generated-asset="frog-orange"
            href={frogOrange}
            x="-7.4"
            y="-7.2"
            width="14.8"
            height="14.4"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          ></image>
          {#if !isSuccess}<text y="11">bond ×2</text>{/if}
        </g>
      {/each}

      <g class:arrived={isSuccess} class="frog" transform={`translate(${frogPoint.x} ${frogPoint.y})`} aria-label={isSuccess ? 'Grenouille exactement à l’Arrivée' : `Grenouille après ${journey.executedActions} action${journey.executedActions === 1 ? '' : 's'}`}>
        <g class="frog-figure">
          <g class:horizontal={scene.orientation === 'horizontal'} class="frog-facing">
            <image
              class="frog-sprite"
              data-generated-asset="frog-green"
              href={frogGreen}
              x="-7.5"
              y="-7.3"
              width="15"
              height="14.6"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            ></image>
          </g>
        </g>
        {#if !isSuccess && scene.mode === 'tutorial'}
          <foreignObject x="-9" y="-9" width="18" height="18">
            <button class="world-frog-control" type="button" data-smoke-control="jump" onclick={() => onJump?.()} aria-label="Toucher la grenouille pour lui faire faire un saut d’une unité"></button>
          </foreignObject>
        {/if}
      </g>
    </svg>
  </section>

  {#if !isSuccess && journey.running && journey.prediction !== null}
    <p class="run-count" aria-hidden="true">{journey.executedActions} / {journey.prediction} {scene.obstacleUnits.length > 0 ? 'actions' : 'sauts'}</p>
  {/if}
</div>

<style>
  .pond-stage {
    position: relative;
    isolation: isolate;
    grid-area: pond;
    width: 100%;
    overflow: hidden;
    align-self: center;
    padding: 7px;
    border: 1px solid rgba(44, 90, 75, .16);
    border-radius: 24px;
    background: rgba(246, 247, 228, .66);
    box-shadow: 0 20px 48px rgba(25, 66, 52, .14);
  }
  .pond-stage.overflow-evidence, .playfield.overflow-evidence, .playfield.overflow-evidence svg { overflow: visible; }
  .success-map {
    position: relative;
    z-index: 1;
    isolation: isolate;
    width: 100%;
    overflow: hidden;
    border: 7px solid rgba(246, 247, 228, .78);
    border-radius: 24px;
    background: #8fc6b8;
    box-shadow: 0 20px 48px rgba(26, 67, 54, .16);
  }
  .playfield {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(32, 82, 70, .32);
    border-radius: 18px;
    background: #8fc6b8;
    box-shadow: inset 0 1px rgba(255, 255, 255, .55);
  }
  .success-map .playfield { border: 0; border-radius: 17px; box-shadow: none; }
  svg { display: block; width: 100%; aspect-ratio: 6 / 5; }

  .pond-water { opacity: 1; }
  .pond-light { opacity: .58; }
  .water-caustics { isolation: isolate; pointer-events: none; }
  .water-noise-a, .water-noise-b {
    transform-box: fill-box;
    transform-origin: center;
    will-change: transform;
  }
  .water-noise-a { animation: water-noise-a 8s linear infinite; }
  .water-noise-b { animation: water-noise-b 11s linear infinite; }
  .water-depth { opacity: .08; mix-blend-mode: multiply; }
  .caustic-highlight { mix-blend-mode: screen; }
  .caustic-a { opacity: .08; }
  .caustic-b { opacity: .2; }
  .pond-decor { pointer-events: none; }
  .pond-decor image { animation: none; }
  .pond-decor .pond-rock { opacity: .64; }
  .pond-decor .pond-pad { opacity: .76; }
  .pond-decor .pond-flower { opacity: .84; }
  .grid-surface { opacity: .8; mix-blend-mode: multiply; pointer-events: none; }
  .route-bed { stroke: rgba(251, 247, 220, .58); stroke-width: 5; stroke-linecap: round; }
  .target-line { stroke: rgba(31, 76, 65, .76); stroke-width: 1; stroke-dasharray: 1.5 1.7; stroke-linecap: round; }

  .unit-reference line { stroke: #b4553d; stroke-width: 1.15; }
  .unit-reference .unit-tick { fill: none; stroke: #b4553d; stroke-width: 1.15; stroke-linecap: round; }
  .unit-reference text {
    fill: #74382d;
    font-size: 3.15px;
    font-weight: 950;
    paint-order: stroke;
    stroke: rgba(243, 245, 217, .92);
    stroke-width: 1.35px;
    text-anchor: middle;
  }

  .lily-pad { pointer-events: none; }
  .marker .marker-halo { fill: rgba(255, 252, 225, .18); stroke: rgba(255, 252, 225, .88); stroke-width: .9; }
  .marker text {
    fill: #17382f;
    font-size: 3.7px;
    font-weight: 950;
    paint-order: stroke;
    stroke: rgba(248, 244, 222, .95);
    stroke-width: 1.8px;
    stroke-linejoin: round;
    text-anchor: middle;
  }
  .finish-bloom { pointer-events: none; }
  .success-finish-halo { fill: rgba(255, 246, 194, .18); stroke: rgba(255, 246, 194, .88); stroke-width: .9; }

  .completed-line {
    stroke: #f1bc42;
    stroke-linecap: round;
    filter: drop-shadow(0 1.2px .65px rgba(65, 46, 22, .54));
  }
  .completed-line.double { stroke: #c95f3f; stroke-dasharray: 3 1.3; }
  .landing { fill: #fff5c5; stroke: #70462d; stroke-width: .65; }
  .landing-response {
    fill: none;
    stroke: rgba(255, 252, 225, .9);
    stroke-width: .8;
    transform-box: fill-box;
    transform-origin: center;
    animation: landing-response 280ms cubic-bezier(.23, 1, .32, 1) both;
  }
  .landing-ripple { fill: none; stroke: rgba(251, 249, 220, .82); stroke-width: 1; }
  .landing-ripple.inner { stroke: rgba(43, 104, 91, .42); stroke-width: .52; }
  .discrepancy line { stroke: #9f4938; stroke-width: 1.4; stroke-dasharray: 1.8 1.2; stroke-linecap: round; }
  .discrepancy rect { fill: rgba(255, 242, 222, .96); stroke: #9f4938; stroke-width: .45; }
  .discrepancy text { fill: #733528; font-size: 3px; font-weight: 950; text-anchor: middle; }

  .frog { transition: none; }
  .frog-figure, .frog-facing { transform-box: fill-box; transform-origin: center; }
  .frog-facing.horizontal { transform: rotate(90deg); }
  .frog-sprite, .obstacle-frog-sprite { pointer-events: none; }
  .obstacle text {
    fill: #663423;
    font-size: 3.2px;
    font-weight: 950;
    paint-order: stroke;
    stroke: rgba(249, 241, 214, .94);
    stroke-width: 1.7px;
    text-anchor: middle;
  }

  .world-frog-control { width: 100%; height: 100%; border: 2px solid transparent; border-radius: 50%; background: transparent; cursor: pointer; }
  .world-frog-control:focus-visible { border-color: #b84d3a; outline: 2px solid #fff7dc; outline-offset: -3px; background: rgba(255, 248, 221, .18); }
  .run-count {
    position: absolute;
    z-index: 2;
    top: 16px;
    right: 16px;
    margin: 0;
    padding: 7px 14px;
    border-radius: 999px;
    background: rgba(23, 56, 47, .84);
    color: #fdf9e9;
    font-size: .92rem;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
    pointer-events: none;
  }

  @keyframes water-noise-a {
    0%, 100% { transform: translate3d(-1.2%, -.8%, 0); }
    25% { transform: translate3d(.6%, -1.1%, 0); }
    50% { transform: translate3d(1.2%, .7%, 0); }
    75% { transform: translate3d(-.5%, 1%, 0); }
  }

  @keyframes water-noise-b {
    0%, 100% { transform: translate3d(1.1%, .9%, 0); }
    25% { transform: translate3d(-.5%, 1.2%, 0); }
    50% { transform: translate3d(-1.1%, -.6%, 0); }
    75% { transform: translate3d(.6%, -1%, 0); }
  }

  @keyframes landing-response {
    from { opacity: .8; transform: scale(.95); }
    to { opacity: 0; transform: scale(1.35); }
  }

  @media (hover: hover) and (pointer: fine) {
    .world-frog-control:hover { border-style: solid; border-color: rgba(255, 249, 225, .92); background: rgba(255, 255, 255, .14); }
  }

  @media (prefers-reduced-motion: reduce) {
    .water-noise-a, .water-noise-b { animation: none; transform: none; }
    .landing-response { display: none; animation: none; }
  }

  @media (max-width: 820px) {
    .pond-stage { padding: 4px; border-radius: 18px; box-shadow: 0 12px 28px rgba(25, 66, 52, .13); }
    .playfield { border-radius: 14px; }
    .grid-surface { opacity: 1; }
    .run-count { top: 10px; right: 10px; padding: 5px 11px; font-size: .8rem; }
    .unit-reference text { font-size: 3.65px; stroke-width: 1.65px; }
    .marker text { font-size: 4px; stroke-width: 2px; }
    .obstacle text { font-size: 3.4px; }
    .success-map { width: min(600px, 100%); }
  }
</style>
