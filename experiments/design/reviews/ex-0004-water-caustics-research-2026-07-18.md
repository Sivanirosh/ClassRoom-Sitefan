# Research: Animated water caustics for `PondBoard.svelte`

## Summary

For this 120×100 educational SVG, use **two image-backed SVG noise patterns animated only with slow CSS transforms**, plus static luminance-to-highlight/depth filters, while keeping the exact grid as a later untouched sibling. This preserves mathematical legibility, creates changing interference rather than translating one obvious line tile, retains an attractive reduced-motion fallback, and avoids animated procedural filters or a separate shader renderer.

## Direct inspiration: Cyanilux 2D water shader

The owner-selected [Cyanilux 2D Water Shader Breakdown](https://www.cyanilux.com/tutorials/2d-water-shader-breakdown/) gives the most useful visual recipe for the next iteration:

- sample two seamless CC0 noise textures at different scales;
- scroll them continuously in different directions at low speed;
- combine the samples so their changing interference prevents an obvious repeated tile;
- use a hard threshold (`Step`) to reveal only rare bright overlaps as specular highlights;
- use a second soft threshold (`Smoothstep`, multiplied by about `0.15`) for subtle moving shade.

For this browser SVG, the faithful lightweight translation is two independently moving noise-backed pattern rects plus a static threshold/composite treatment, all below `.grid-surface`. The Unity reflection camera, shoreline tilemap, pixelation, and scene-refraction sections are not relevant to this board. The core insight is the **two-noise interference and sparse-highlight extraction**, not distortion of the learning surface.

## Pre-implementation inspection

Inspected: [`experiments/src/exercises/ex-0004-frog-jump-prediction/PondBoard.svelte`](../../src/exercises/ex-0004-frog-jump-prediction/PondBoard.svelte).

Before the implementation pass:

- the water stack was already ordered correctly: base gradient → radial light → decorative wave paths → caustic overlay → **grid** → route/evidence/markers/frogs;
- the caustic tile was a single `32 × 24` pattern containing two regular sine-like paths, drifting as one rect over `8s` at opacity `.18` with `soft-light`;
- `surfaceId = scene.id + variant` already namespaced SVG definition IDs;
- reduced motion already froze the original caustic rect.

This was a sound safety architecture but a weak optical model: the repeated line shape translated without evolving.

## Findings

1. **SVG filter primitives are capable, but the safe target is a decorative layer—not the pond scene.** `feTurbulence` generates Perlin turbulence/fractal noise and accepts `baseFrequency`, `numOctaves`, `seed`, and tile stitching. `feDisplacementMap` then moves pixels from its `in` image according to channels in `in2`; therefore applying it to a parent containing the unit grid would visibly bend unit squares and undermine the task. Both primitives accept `<animate>` children and are broadly available in modern engines. [MDN: `feTurbulence`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence) · [MDN: `feDisplacementMap`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap) · [Filter Effects specification](https://www.w3.org/TR/filter-effects/#feDisplacementMapElement)

2. **`feSpecularLighting` can synthesize bright highlights, but it is a more expensive and less necessary chain here.** The primitive treats the input **alpha channel as a bump map** and computes Phong-style specular light. A useful caustic chain therefore needs noise, luminance-to-alpha conversion, specular lighting, and usually component/composite shaping; passing ordinary opaque turbulence directly does not provide the intended varying alpha height map. This can look more physical, but adds full-pixel lighting work and tuning complexity for a subtle background. [MDN: `feSpecularLighting`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting) · [W3C filter graph and lighting example](https://www.w3.org/TR/filter-effects/#intro)

3. **Animation support is not the same as a performance recommendation.** SVG `<animate>` is broadly available and filter primitives permit it, so animating `baseFrequency` or displacement `scale` is technically valid. A strong source/demo uses `feTurbulence` + `feDisplacementMap` and animates `baseFrequency` over 60 seconds, demonstrating the compact implementation. However, a detailed cross-engine displacement study warns that compound animated SVG filters can drop frames—especially in WebKit and Firefox—and recommends minimal filter regions, few primitives/iterations, caution with blur/blending, and device testing. [MDN: `<animate>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animate) · [Live/source water example](https://github.com/anuzpandey/realisticwatereffect/blob/master/index.html) · [Cross-engine demos and performance guidance](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)

4. **Layered image-backed SVG patterns are the best fit for this exact board.** Two seamless CC0 noise textures—different tile sizes, rotations, opacity, and slow opposing transforms—create changing overlap that suggests refracted light without recalculating procedural noise. Static luminance shaping can extract warm peaks and restrained depth while transform animation supplies movement. This requires no new runtime or render loop. [Cyanilux 2D Water Shader Breakdown](https://www.cyanilux.com/tutorials/2d-water-shader-breakdown/) · [web.dev: high-performance CSS animation](https://web.dev/articles/animations-guide)

5. **The concrete layering rule is non-negotiable: caustics below, grid above.** Keep both animated caustic rects before `.grid-surface`, with `pointer-events: none`, modest combined opacity, and enough overscan to prevent exposed edges during drift. Never put the grid, route, labels, landing traces, or frogs in a filtered/transformed caustic group. The W3C model confirms filters operate on a rasterized image buffer and do not alter geometry/hit-testing, but visual displacement would still corrupt the grid’s perceived geometry. [W3C Filter Effects introduction and filter behavior](https://www.w3.org/TR/filter-effects/#intro)

6. **Canvas/WebGL/shaders are disproportionate here.** A shader can produce the most physical evolving caustic field; the official three.js realtime caustics example demonstrates the ceiling, but it brings a second rendering surface/context, shader lifecycle, resolution/DPR work, fallback/compositing concerns, and a continuous frame loop beside an otherwise self-contained SVG. MDN recommends resolution/VRAM budgeting, smaller back buffers when appropriate, and careful fragment-shader work; Canvas similarly needs DPR handling, `requestAnimationFrame`, and layered/static separation. These costs are justified for a full-screen water world, not a decorative layer under one stable math grid. [three.js official realtime caustics source](https://github.com/mrdoob/three.js/blob/dev/examples/webgpu_caustics.html) · [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) · [MDN Canvas optimization](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

7. **Reduced motion should remain a static, attractive texture.** W3C’s technique explicitly supports disabling motion through `prefers-reduced-motion`; the existing file already does this correctly. For two layers, stop both transforms rather than hiding the texture, and choose their static phases so the pond still has depth. Prefer defining motion only inside `@media (prefers-reduced-motion: no-preference)` if this area is revised. [W3C C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) · [MDN animation accessibility note](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animate#accessibility_concerns)

## Technique comparison

| Approach | Visual quality | Runtime/performance | Grid safety | Recommendation |
|---|---|---|---|---|
| Animated `feTurbulence` → `feDisplacementMap` on the whole scene | Convincing refraction | Highest SVG-filter risk; every-frame procedural raster work | **Unsafe**: bends grid/evidence | Reject |
| `feTurbulence` → luminance-to-alpha → `feSpecularLighting` highlight layer | Potentially most caustic-like SVG result | Multi-primitive per-pixel chain; cross-engine profiling required | Safe only as isolated overlay | Experimental enhancement, not default |
| Static low-octave turbulence/displacement on caustic paths; animate outer layer transforms | Organic edges with bounded filter work | Moderate; may be cached, but not guaranteed | Safe if isolated below grid | Optional profiled enhancement |
| Two seamless noise-backed SVG pattern layers with opposing CSS transforms and static luminance shaping | Strong stylized caustic illusion | Low integration complexity; transform-oriented motion | **Safe** | **Recommended and implemented** |
| Canvas/WebGL fragment shader | Best physical animation | New context/loop/DPR/fallback and integration burden | Safe only as background canvas | Reject for this board |

## Implemented outcome

1. The regular sine tile was replaced by Cyanilux’s seamless CC0 value-noise and gradient-noise textures, stored with provenance in `assets/water/README.md`.
2. Value noise repeats at `48 × 48` SVG units and `-6°`; gradient noise repeats at `64 × 64` and `9°`.
3. Three oversized water rects remain before `.grid-surface`: one restrained teal depth layer and two warm highlight layers.
4. Static `feColorMatrix` / `feComponentTransfer` filters convert luminance to transparent optical color. Filter parameters do not animate.
5. The two noise fields move through opposing small transform paths on non-synchronized `8s` and `11s` linear loops.
6. Reduced motion freezes both fields at their authored static position and suppresses only the transient `280ms` landing response.
7. The SVG root, grid, route, pads, frogs, labels, authored wave lines, and persistent landing evidence remain unfiltered and untransformed.

### Suggested performance/visual acceptance checks

- Unit-square edges remain perfectly straight in screenshots and throughout animation.
- Route, traces, labels, and frog controls do not change position/shape because of water effects.
- No clipping appears at any animation keyframe; filter/pattern regions remain bounded to pond overscan.
- Test current Chrome/Edge, Firefox, and Safari/iOS at desktop and narrow breakpoints, including multiple boards visible together.
- Record animation performance on a representative low-end classroom device; remove any optional filter if it causes sustained paint spikes or missed frames.
- With reduced motion enabled, all ambient water movement stops while contrast and task evidence remain unchanged.

## Sources

- Kept: [Filter Effects Module Level 1](https://www.w3.org/TR/filter-effects/) — primary rendering/filter model and primitive definitions.
- Kept: [MDN `feTurbulence`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence), [`feDisplacementMap`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap), and [`feSpecularLighting`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting) — authoritative practical API, permitted animation content, and compatibility summaries.
- Kept: [Dirk Weber’s displacement-filter deep dive and live demos](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/) — strong cross-engine examples plus explicit performance cautions.
- Kept: [Cyanilux 2D Water Shader Breakdown](https://www.cyanilux.com/tutorials/2d-water-shader-breakdown/) — directly applicable two-noise scrolling, thresholded highlight, and soft-shading recipe; its two seamless noise textures are explicitly CC0.
- Kept: [Ada Rose Cannon’s texture construction](https://ada.is/blog/2020/02/11/generating-a-water-effect-part-1-svg-and-canvas/), [animation breakdown](https://ada.is/blog/2020/03/02/generating-a-water-effect-part-2/), and [live Toon Ocean](https://a-toon-ocean.adarose.dev/) — strong stylized precedent for seamless Voronoi-like caustics and differently sampled moving layers.
- Kept: [Paper Shaders Water demo](https://shaders.paper.design/water) and [Apache-2.0 source](https://github.com/paper-design/shaders/blob/main/packages/shaders/src/shaders/water.ts) — polished browser-native WebGL2 ceiling and inspectable procedural caustic implementation, but disproportionate as the default for this board.
- Kept: [anuzpandey/realisticwatereffect](https://github.com/anuzpandey/realisticwatereffect) — concise inspectable water source demonstrating animated turbulence/displacement.
- Kept: [W3C C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) — primary accessibility technique for reduced motion.
- Kept: [three.js realtime caustics source](https://github.com/mrdoob/three.js/blob/dev/examples/webgpu_caustics.html) and [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) — authoritative evidence for shader capability and tradeoffs.
- Dropped: SEO tutorial pages and Medium reposts — weaker authority or redundant with specs/inspectable sources.
- Dropped: old Stack Overflow browser-bug reports — anecdotal and version-sensitive; retained only the general need for current cross-engine testing.
- Dropped: image/video-only “realistic water” tutorials — poor inspectability and unnecessary dependencies.

## Post-implementation validation

- `cd experiments && npm run check` passed with 0 errors, 0 warnings, and a valid seven-exercise catalog.
- `cd experiments && npm run build` completed successfully and emitted both noise textures as hashed production assets.
- Desktop active, mobile active, and desktop success surfaces were visually reviewed.
- At `320px`, no horizontal overflow was introduced and the frog control remained approximately `44.4 × 44.4px`.
- Ambient captures `2.5s` apart confirmed changing noise interference while route/evidence geometry stayed fixed.
- Reduced-motion captures `2.2s` apart were pixel-identical.
- Computed styles confirmed both noise animations become `none`, the grid has no animation/filter/transform, and the caustic group is painted before the grid.

## Residual risks

- Even isolated static SVG filters may rasterize or cache differently across engines; verify Safari/iOS and profile one representative low-end classroom device.
- `screen` / `multiply` compositing can vary subtly with color handling; verify contrast in Safari and forced/high-contrast modes.
- Two layers can become visually busy at small sizes if opacity is raised; tune narrow layouts first.
- The two source textures add about 432 KiB of source bytes before build processing.
