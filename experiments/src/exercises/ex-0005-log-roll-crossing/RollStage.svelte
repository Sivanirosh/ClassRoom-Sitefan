<script lang="ts">
  import terraceAtmosphere from './assets/terrace-atmosphere-safe.webp';
  import {
    WORLD,
    pointAt,
    vectorAngle,
    type Point,
    type Scene,
    type Variant
  } from './content';

  export let scene: Scene;
  export let variant: Variant;
  export let coveredRolls: number;
  export let outcome: 'idle' | 'short' | 'exact' | 'over';
  export let calibrating = false;
  export let running = false;

  $: origin = variant.origin;
  $: finish = pointAt(variant, variant.totalRolls);
  $: roller = pointAt(variant, coveredRolls);
  $: completedRolls = Array.from({ length: coveredRolls }, (_, index) => index);
  $: pathAngle = vectorAngle(variant.unit);
  $: rollDirection = variant.unit.x < 0 || (variant.unit.x === 0 && variant.unit.y < 0) ? -1 : 1;
  $: discrepancyStart = outcome === 'over' ? finish : roller;
  $: discrepancyEnd = outcome === 'over' ? roller : finish;
  $: description = outcome === 'short'
    ? `Le rouleau reste avant l’Arrivée après ${coveredRolls} tours.`
    : outcome === 'over'
      ? `Le rouleau dépasse l’Arrivée après ${coveredRolls} tours.`
      : outcome === 'exact'
        ? `Le rouleau repose exactement sur l’Arrivée après ${coveredRolls} tours.`
        : coveredRolls === 1
          ? 'Le premier tour complet reste visible entre le Départ et le nouveau repère du rouleau.'
          : `Le rouleau a effectué ${coveredRolls} tours complets.`;

  function labelStyle(point: Point, offsetY = 0): string {
    return `left:${(point.x / WORLD.width) * 100}%;top:${((point.y + offsetY) / WORLD.height) * 100}%`;
  }

  function midpoint(a: Point, b: Point): Point {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
</script>

<div
  class:calibrating
  class:running
  class:short={outcome === 'short'}
  class:over={outcome === 'over'}
  class:exact={outcome === 'exact'}
  class={`stage ${scene.setting} ${scene.representation}`}
  data-roll-stage
  data-covered-rolls={coveredRolls}
  data-trace-intervals={completedRolls.length}
  data-roller-x={roller.x}
  data-roller-y={roller.y}
  data-rotation-turns={coveredRolls * rollDirection}
  data-roll-phase={calibrating ? 'calibration' : running ? 'added-roll' : 'settled'}
  data-calibration-rolls={scene.mode === 'prediction' ? 1 : 0}
  data-outcome={outcome}
  data-representation={scene.representation}
  data-variant-id={variant.id}
>
  <svg viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} role="img" aria-labelledby={`stage-title-${scene.id} stage-desc-${scene.id}`}>
    <title id={`stage-title-${scene.id}`}>Passage du rouleau</title>
    <desc id={`stage-desc-${scene.id}`}>{description}</desc>

    <defs>
      <linearGradient id={`sky-${scene.id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9ed6ea"></stop><stop offset="1" stop-color="#e9f2d9"></stop>
      </linearGradient>
      <linearGradient id={`cliff-${scene.id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#d87158"></stop><stop offset="1" stop-color="#8f3e42"></stop>
      </linearGradient>
      <pattern id={`hatch-${scene.id}`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform={`rotate(${pathAngle})`}>
        <path d="M0 4 L4 0" stroke="#8f3e2d" stroke-width="1.1"></path>
      </pattern>
    </defs>

    <image
      class="terrace-atmosphere"
      href={terraceAtmosphere}
      width={WORLD.width}
      height={WORLD.height}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-decorative-atmosphere="stage"
    ></image>
    <rect class="sky" width={WORLD.width} height={WORLD.height} fill={`url(#sky-${scene.id})`}></rect>
    <g class="landscape" aria-hidden="true">
      <path class="distance" d="M0 54 C25 40 44 48 65 39 C90 29 116 43 138 34 C155 27 169 34 180 30 V74 H0 Z"></path>
      <path class="mist" d="M0 64 C28 57 43 67 69 59 C94 52 113 65 141 56 C158 51 170 56 180 53 V82 H0 Z"></path>
      <path class="cliff left" d="M0 31 C14 34 16 47 24 54 L31 110 H0 Z" fill={`url(#cliff-${scene.id})`}></path>
      <path class="cliff right" d="M180 22 C165 31 168 48 156 56 L149 110 H180 Z" fill={`url(#cliff-${scene.id})`}></path>
      <path class="foliage left" d="M0 18 C15 12 23 20 16 28 C28 29 25 42 12 40 C10 49 2 46 0 43 Z"></path>
      <path class="foliage right" d="M180 11 C164 8 156 18 165 25 C151 29 158 41 172 36 C170 48 179 44 180 40 Z"></path>
    </g>

    <line
      class:wide-path={scene.representation === 'broad'}
      class="path-underlay"
      x1={origin.x}
      y1={origin.y}
      x2={finish.x}
      y2={finish.y}
    ></line>
    <line class="target-path" x1={origin.x} y1={origin.y} x2={finish.x} y2={finish.y}></line>

    <g class="world-marker origin-marker" transform={`translate(${origin.x} ${origin.y})`} aria-hidden="true">
      <line y1="-19" y2="7"></line><path d="M0 -19 L9 -15 L0 -11 Z"></path><circle r="2.2"></circle>
    </g>
    <g class="world-marker finish-marker" transform={`translate(${finish.x} ${finish.y})`} aria-hidden="true">
      <line y1="-22" y2="7"></line><path d="M0 -22 L-9 -18 L0 -14 Z"></path><circle r="2.8"></circle>
    </g>

    {#each completedRolls as rollIndex}
      {@const from = pointAt(variant, rollIndex)}
      {@const to = pointAt(variant, rollIndex + 1)}
      <g
        class:calibration-mark={scene.mode === 'prediction' && rollIndex === 0}
        class="roll-mark"
        data-roll-interval={rollIndex + 1}
      >
        <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} pathLength="1"></line>
        <circle class="start-contact" cx={from.x} cy={from.y} r="1.35"></circle>
        <circle class="end-contact" cx={to.x} cy={to.y} r="1.35"></circle>
      </g>
    {/each}

    {#if outcome === 'short' || outcome === 'over'}
      <line
        class="discrepancy"
        x1={discrepancyStart.x}
        y1={discrepancyStart.y}
        x2={discrepancyEnd.x}
        y2={discrepancyEnd.y}
        pathLength="1"
        stroke={`url(#hatch-${scene.id})`}
      ></line>
    {/if}

    {#if outcome === 'exact'}
      <circle class="exact-halo" cx={finish.x} cy={finish.y} r="5.4" aria-hidden="true"></circle>
    {/if}
    <g
      class="roller"
      transform={`translate(${roller.x} ${roller.y - 7}) rotate(${coveredRolls * 360 * rollDirection + pathAngle})`}
      aria-hidden="true"
    >
      <circle class="bark" r="8.2"></circle>
      <circle class="wood" r="5.4"></circle>
      <circle class="ring" r="3.5"></circle>
      <circle class="hub" r="1.2"></circle>
      <line class="rotation-mark" x1="0" y1="-5" x2="0" y2="5"></line>
    </g>
    <g class="roller-contact" transform={`translate(${roller.x} ${roller.y})`} aria-hidden="true">
      <circle class="contact" r="1.8"></circle>
    </g>
  </svg>

  <span class="world-label origin-label" style={labelStyle(origin, 9)}>Départ</span>
  <span class="world-label finish-label" style={labelStyle(finish, 9)}>Arrivée</span>
  {#if scene.mode === 'prediction' && coveredRolls >= 1 && !calibrating}
    <span class="unit-label" style={labelStyle(midpoint(origin, pointAt(variant, 1)), -15)}>1 tour observé</span>
  {/if}
  {#if outcome === 'short' || outcome === 'over'}
    <span class="discrepancy-label" style={labelStyle(midpoint(discrepancyStart, discrepancyEnd), -13)}>
      {outcome === 'short' ? 'distance restante' : 'distance dépassée'}
    </span>
  {/if}
</div>

<style>
  .stage { position: relative; width: min(900px, 100%); margin-inline: auto; overflow: hidden; border: 2px solid #5b6e65; border-radius: 26px; background: #b7dce4; box-shadow: 0 10px 0 rgba(37,63,58,.18), 0 24px 60px rgba(26,48,48,.18); isolation: isolate; }
  svg { display: block; width: 100%; aspect-ratio: 18 / 11; }
  .terrace-atmosphere { opacity: .5; filter: saturate(.82) contrast(.88); pointer-events: none; }
  .sky { opacity: .52; }
  .distance { fill: #76a990; opacity: .68; }
  .mist { fill: #dcebdc; opacity: .8; }
  .cliff { opacity: .86; }
  .foliage { fill: #174e43; opacity: .92; }
  .mist .distance { fill: #77a4a4; }
  .canopy .distance { fill: #5c9073; }
  .summit .distance { fill: #739ca9; }
  .canopy .foliage { fill: #0e4638; }
  .summit .mist { opacity: .92; }
  .path-underlay { stroke: rgba(255,247,221,.98); stroke-width: 4; stroke-linecap: round; }
  .path-underlay.wide-path { stroke: #bd8a58; stroke-width: 14; }
  .target-path { stroke: #173e43; stroke-width: 1.35; stroke-linecap: round; }
  .world-marker line { stroke: #183d43; stroke-width: 1.4; }
  .world-marker path { fill: #f2b84b; stroke: #75462e; stroke-width: .6; }
  .world-marker circle { fill: #fff9ec; stroke: #183d43; stroke-width: 1.2; }
  .finish-marker path { fill: #d96345; }
  .roll-mark line { stroke: #e6a43d; stroke-width: 5.4; stroke-linecap: round; opacity: .8; stroke-dasharray: 1; stroke-dashoffset: 0; animation: interval-draw 290ms linear both; }
  .line .roll-mark line { stroke-width: 3.4; }
  .roll-mark circle { fill: #fff5c9; stroke: #70482f; stroke-width: .7; }
  .roll-mark .end-contact { animation: contact-settle 290ms linear both; }
  .roll-mark.calibration-mark line { stroke: #f8d465; stroke-width: 6.7; opacity: 1; }
  .line .roll-mark.calibration-mark line { stroke-width: 4.6; }
  .stage.calibrating .roll-mark.calibration-mark line, .stage.calibrating .roll-mark.calibration-mark .end-contact { animation-duration: 420ms; }
  .stage.exact .roll-mark line, .stage.exact .roll-mark .end-contact { animation: none; }
  .discrepancy { stroke-width: 7; stroke-linecap: round; opacity: .86; stroke-dasharray: 1; stroke-dashoffset: 0; animation: discrepancy-reveal 260ms cubic-bezier(.23, 1, .32, 1) both; }
  .roller, .roller-contact { transition-property: transform; transition-duration: 0ms; transition-timing-function: cubic-bezier(.77, 0, .175, 1); }
  .stage.running .roller, .stage.running .roller-contact { transition-duration: 290ms; will-change: transform; }
  .stage.calibrating .roller, .stage.calibrating .roller-contact { transition-duration: 420ms; will-change: transform; }
  .roller .bark { fill: #6a4026; stroke: #44281c; stroke-width: 1.5; }
  .roller .wood { fill: #cf8e4f; stroke: #814d2b; stroke-width: 1; }
  .roller .ring { fill: none; stroke: #a5673a; stroke-width: .8; }
  .roller .hub { fill: #56331f; }
  .rotation-mark { stroke: #5b3522; stroke-width: 1; stroke-linecap: round; }
  .contact { fill: #fff; stroke: #173e43; stroke-width: 1; }
  .stage.short .contact, .stage.over .contact { fill: #f1b39f; stroke: #8a392c; }
  .exact-halo { fill: rgba(248,212,101,.32); stroke: #1a735e; stroke-width: 1.2; animation: exact-settle 320ms cubic-bezier(.23, 1, .32, 1) both; }
  .world-label, .unit-label, .discrepancy-label { position: absolute; z-index: 3; transform: translate(-50%, -50%); padding: 3px 7px; border-radius: 999px; color: #173e43; background: rgba(255,249,236,.94); box-shadow: 0 1px 0 rgba(23,62,67,.2); font-size: clamp(.72rem, 1.6vw, .88rem); font-weight: 900; line-height: 1.2; white-space: nowrap; pointer-events: none; }
  .unit-label { color: #75431f; background: rgba(255,239,181,.97); }
  .discrepancy-label { color: #782f22; background: rgba(255,234,224,.97); }
  .stage.short .discrepancy-label, .stage.over .discrepancy-label { animation: discrepancy-pulse 360ms cubic-bezier(.23, 1, .32, 1); }
  @keyframes interval-draw { from { stroke-dashoffset: 1; } }
  @keyframes contact-settle { 0%, 82% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes discrepancy-reveal { from { stroke-dashoffset: 1; } }
  @keyframes discrepancy-pulse { 50% { transform: translate(-50%, -50%) scale(1.04); } }
  @keyframes exact-settle { from { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .roller, .roller-contact { transition: none; }
    .roll-mark line, .roll-mark .end-contact, .discrepancy, .exact-halo, .stage.short .discrepancy-label, .stage.over .discrepancy-label { animation: none; }
  }
  @media (max-width: 520px) {
    .stage { border-radius: 18px; }
    .terrace-atmosphere { opacity: .38; }
    .foliage { display: none; }
    .world-label, .unit-label, .discrepancy-label { padding: 2px 5px; font-size: .68rem; }
  }
</style>
