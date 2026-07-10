<script lang="ts">
  import { worldById, type WorldId } from '$lib/worlds';

  export let world: WorldId;
  export let compact = false;
  export let decorative = true;

  $: label = `Illustration : ${worldById[world].shortTitle}`;
</script>

<svg
  class="world-art world-art--{world}"
  class:compact
  viewBox="0 0 360 240"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role={decorative ? undefined : 'img'}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={decorative ? undefined : label}
>
  {#if !decorative}<title>{label}</title>{/if}
  <circle class="spark spark-one" cx="48" cy="42" r="5" />
  <circle class="spark spark-two" cx="318" cy="55" r="3" />
  <path class="spark-line" d="M292 24v18M283 33h18" />

  {#if world === 'livrets'}
    <path class="ground" d="M25 194c42-28 77-19 116-8 48 14 89-18 130-11 28 4 45 18 64 36H25v-17Z" />
    <g class="float float-one">
      <rect class="surface" x="67" y="57" width="222" height="134" rx="24" />
      <rect class="shade" x="84" y="77" width="92" height="92" rx="16" />
      {#each Array(4) as _, row}
        {#each Array(4) as _, column}
          <circle class="dot" cx={101 + column * 19} cy={94 + row * 19} r="5" />
        {/each}
      {/each}
      <path class="ink" d="M202 91h58M202 116h58M202 141h38" />
      <circle class="accent" cx="264" cy="153" r="14" />
      <path class="accent-mark" d="m257 153 5 5 10-12" />
    </g>
    <g class="gear float-two">
      <circle class="accent-soft" cx="66" cy="167" r="29" />
      <circle class="surface" cx="66" cy="167" r="12" />
      <path class="ink" d="M66 130v13M66 191v13M29 167h13M90 167h13M40 141l9 9M83 184l9 9M40 193l9-9M83 150l9-9" />
    </g>
  {:else if world === 'geometrie'}
    <path class="ground" d="M18 196c50-43 102-28 145-4 37 20 76-14 112-9 30 4 49 16 67 36H18v-23Z" />
    <g class="float float-one">
      <path class="surface" d="M83 176 111 64l88-29 78 60-31 91-100 21-63-31Z" />
      <path class="shade" d="m121 161 21-78 58-18 51 40-22 62-65 14-43-20Z" />
      <path class="shape-primary" d="m167 87 39 65h-78l39-65Z" />
      <rect class="shape-secondary" x="204" y="92" width="43" height="43" rx="3" transform="rotate(13 204 92)" />
      <circle class="shape-tertiary" cx="155" cy="160" r="22" />
    </g>
    <path class="ink float-two" d="m57 93 16-25 16 25H57ZM282 157h31v31h-31z" />
  {:else if world === 'calculs'}
    <path class="ground" d="M17 200c54-29 103-16 146-8 44 8 87-26 131-14 22 6 38 19 52 37H17v-15Z" />
    <g class="float float-one">
      <circle class="surface" cx="183" cy="121" r="89" />
      <circle class="shade" cx="183" cy="121" r="69" />
      <path class="orbit" d="M77 121c30-29 65-43 106-43s76 14 106 43c-30 29-65 43-106 43S107 150 77 121Z" />
      <circle class="accent" cx="183" cy="121" r="24" />
      <path class="accent-mark" d="M173 108v26M193 108v26M166 115h34M166 128h34" />
      <circle class="shape-tertiary" cx="274" cy="91" r="11" />
      <circle class="dot" cx="104" cy="154" r="8" />
    </g>
    <path class="ink float-two" d="M52 71h47M75 48v47M277 174h42" />
  {:else if world === 'numeria'}
    <path class="ground" d="M17 193c43-44 91-41 130-17 36 23 72-5 105-2 37 3 65 18 91 46H17v-27Z" />
    <g class="float float-one">
      <path class="shade" d="m94 174 31-92 55-30 56 27 35 95H94Z" />
      <path class="surface" d="M126 174v-64h22V78h27v32h24V67h28v43h23v64H126Z" />
      <path class="accent-soft" d="M112 174h151v22H112z" />
      <path class="ink" d="M126 110h124M148 78v32M175 110v64M199 67v107M227 110v64" />
      <path class="accent" d="M178 143c0-13 10-23 22-23s22 10 22 23v31h-44v-31Z" />
      <path class="flag" d="M213 45v35M214 47l31 9-31 10" />
    </g>
    <path class="trail" d="M46 207c36-34 60-31 83-19 18 9 31 8 49-3" />
  {:else}
    <path class="ground" d="M18 198c42-24 80-20 122-6 44 15 86-22 128-13 30 6 52 19 74 39H18v-20Z" />
    <g class="float float-one">
      <rect class="surface" x="73" y="53" width="214" height="139" rx="22" />
      <rect class="shade" x="91" y="72" width="82" height="101" rx="9" />
      <path class="ink" d="M106 94h52M106 111h41M106 137h52M106 154h34" />
      <rect class="accent-soft" x="194" y="86" width="70" height="62" rx="12" />
      <path class="accent" d="M211 87v-9c0-8 7-15 15-15h6c8 0 15 7 15 15v9" />
      <path class="accent-mark" d="M215 108h28M229 97v23" />
      <circle class="shape-tertiary" cx="264" cy="166" r="16" />
      <path class="accent-mark" d="m257 166 5 5 10-12" />
    </g>
    <path class="ink float-two" d="m51 117 12-20 12 20H51ZM300 66h28M314 52v28" />
  {/if}
</svg>

<style>
  .world-art {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
    color: var(--world-ink, #26324a);
  }

  .world-art.compact { max-height: 9rem; }
  .ground { fill: var(--world-ground, #d8e7dd); }
  .surface { fill: var(--world-surface, #fffdf7); stroke: currentColor; stroke-width: 4; }
  .shade { fill: var(--world-shade, #e9e5ff); stroke: currentColor; stroke-width: 3; }
  .ink, .orbit { fill: none; stroke: currentColor; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
  .orbit { stroke-dasharray: 7 9; opacity: 0.55; }
  .accent { fill: var(--world-accent, #6758d9); stroke: currentColor; stroke-width: 3; }
  .accent-soft { fill: var(--world-accent-soft, #cfc8ff); stroke: currentColor; stroke-width: 3; }
  .accent-mark { fill: none; stroke: var(--world-on-accent, white); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
  .dot { fill: var(--world-accent, #6758d9); }
  .shape-primary { fill: var(--world-accent, #27a878); stroke: currentColor; stroke-width: 3; }
  .shape-secondary { fill: var(--world-accent-soft, #ffe08a); stroke: currentColor; stroke-width: 3; }
  .shape-tertiary { fill: var(--world-pop, #ff8a68); stroke: currentColor; stroke-width: 3; }
  .flag { fill: var(--world-pop, #ffb84d); stroke: currentColor; stroke-width: 4; stroke-linejoin: round; }
  .trail { fill: none; stroke: var(--world-accent, #6758d9); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 4 10; }
  .spark { fill: var(--world-pop, #ffb84d); }
  .spark-line { fill: none; stroke: var(--world-accent, #6758d9); stroke-width: 4; stroke-linecap: round; }

  .world-art--livrets { --world-ground: #d9d8ff; --world-shade: #252b4c; --world-surface: #fff7d7; --world-accent: #ffb641; --world-accent-soft: #7d72e8; --world-pop: #54d6c4; --world-ink: #29304f; }
  .world-art--geometrie { --world-ground: #c9efdc; --world-shade: #effff5; --world-surface: #fffdf1; --world-accent: #2aad7d; --world-accent-soft: #ffdc73; --world-pop: #ff826f; --world-ink: #214a42; }
  .world-art--calculs { --world-ground: #cbd8f4; --world-shade: #202b50; --world-surface: #edf4ff; --world-accent: #ff6d6a; --world-accent-soft: #7d8ce4; --world-pop: #ffd45c; --world-ink: #253052; }
  .world-art--numeria { --world-ground: #ded0f5; --world-shade: #9b83d8; --world-surface: #fff4cf; --world-accent: #6f56bd; --world-accent-soft: #e5bb57; --world-pop: #ff796b; --world-ink: #392f5c; }
  .world-art--pcp { --world-ground: #f2debd; --world-shade: #f5ead8; --world-surface: #fffdf8; --world-accent: #d87836; --world-accent-soft: #f5c969; --world-pop: #4eb8a4; --world-ink: #4f3a2c; }

  @media (prefers-reduced-motion: no-preference) {
    .float-one { animation: float 5.5s ease-in-out infinite; transform-origin: center; }
    .float-two { animation: float 4.4s ease-in-out 700ms infinite reverse; transform-origin: center; }
    .spark-one { animation: twinkle 2.7s ease-in-out infinite; }
    .spark-two { animation: twinkle 2.7s ease-in-out 900ms infinite; }
  }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes twinkle { 0%, 100% { opacity: 0.4; transform: scale(0.75); transform-origin: center; } 50% { opacity: 1; transform: scale(1); } }
</style>
