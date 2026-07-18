# EX-0004 — Le saut juste

## Status

Playable four-scene graybox for the Mathematics sequence **Se repérer dans l’espace**.

The owner approved this mechanic for UI/art expansion in the active `SEQ-M1` / `MES-01 → MES-02` bridge. That approval does **not** approve the MES-02 learning contract, pupil efficacy, promotion, or unrelated scope. Responsive and accessibility validation establish technical readiness only.

This file is the current implementation contract. Superseded visual experiments and asset-generation notes are intentionally omitted.

## Learning objective

The pupil uses a visible square unit to:

1. observe one repeated jump;
2. predict how many equal jumps reach a target;
3. transfer the same reasoning from horizontal to vertical movement;
4. distinguish distance travelled from number of actions when one action covers two units.

The exercise is about **prediction before resolution**, not reaction speed.

## Core mechanic

- One grid-cell side equals one `unité-saut`.
- The tutorial advances only when the pupil touches the frog.
- Prediction scenes accept one integer from `1` to `9`.
- Entering a valid integer starts resolution automatically.
- Each action leaves exact route evidence on the grid.
- A short or long answer preserves the mismatch and its measured gap.
- The obstacle scene forces one two-unit jump over the orange frog.

No drag gesture, timer, score, lives, or free-form movement belongs in this prototype.

## Scene sequence

| Scene | Mode | Direction | Distance | Expected action count |
| --- | --- | --- | ---: | ---: |
| Tutoriel | direct frog taps | horizontal | 4 units | 4 |
| Prédiction | integer prediction | horizontal | 5 units | 5 |
| Direction orthogonale | integer prediction | vertical | 6 units | 6 |
| Saut double | integer prediction | horizontal | 6 units | 5 |

In the final scene, four ordinary one-unit actions plus one two-unit action cover six units.

## Visual direction

### Intro

`assets/pond-garden-intro.webp` is owner-approved and pixel-locked.

- Required SHA-256: `49db4ae90b24ff78b6c5e3c0361615af5735477548c67f4979211116cd857e85`
- Do not regenerate, replace, crop destructively, or edit this file.
- Intro copy and composition remain unchanged unless the owner explicitly reopens them.

### Play surface

The board is a calm pond whose mathematical scene remains static while a restrained optical water layer moves underneath it. Its visual hierarchy follows the mechanic:

1. frog;
2. start and finish pads;
3. route and completed jumps;
4. exact square grid and one-unit reference;
5. varied static perimeter flora and stones;
6. water cues.

Current vocabulary:

- celadon water with a shallow-to-deep gradient;
- a true `10 × 10` SVG grid pattern inside a `120 × 100` view box;
- a generated overhead green nénuphar for `Départ`, without an extra halo, center dot, or tap ring;
- a generated overhead flowering nénuphar for `Arrivée`;
- a direction-aware, strict top-view generated green frog;
- a strict top-view orange frog only where the two-unit jump is required;
- twelve true-overhead perimeter placements from the reference-led replacement family: three rocks plus varied-size, varied-orientation lotus and nénuphar repetitions;
- persistent landing ripples without decorative white wave strokes;
- two low-contrast, independently drifting noise fields that create ambient caustic interference below the grid;
- gold ordinary route evidence and persimmon two-unit evidence.

The endpoint nénuphars and frogs are semantic gameplay markers. Perimeter rocks, flowers, and repeated nénuphars are decorative, remain below the exact grid, and stay outside the active route, labels, unit reference, and discrepancy areas. No koi, sprite loops, perspective scenery, board-background artwork, or additional decorative animation is permitted on the active surface. Water motion is limited to the approved caustic system and short landing response described below.

### Generated top-view asset system

`assets/pond-top-view/` preserves the replacement ImageGen source scene, deterministic extraction script, transparent production crops, and full provenance. The former checker-sheet family was discarded rather than iterated. The new family follows the owner-supplied pond reference with flatter color, round overhead silhouettes, coral flowers, and a genuinely vertical camera:

- `frog-green.png` and its locally hue-derived orange obstacle variant;
- generated plain and flowering nénuphars;
- two generated coral/red lotus flowers;
- round, light, and clustered partially submerged rocks.

Every production silhouette was reviewed for a direct 90-degree overhead read. The full generated pond scene, koi, tiny petals, edge foliage, and baked water are extraction context only and are never rendered on the board. Assets have transparent backgrounds, no baked water or grid, no text or branding, and no required state. The source prompt, owner-reference hash, crop boxes, alpha process, derivation, checksums, and responsibility boundary are recorded in `assets/pond-top-view/provenance.json`.

### Success surface

The success map preserves the same pond, grid, endpoint pads, route, obstacle, final frog position, and isolated caustic treatment. Success may change surrounding copy and framing, but it must not replace evidence with a celebratory illustration.

### Water-caustic system

The implementation adapts the two-noise recipe from [Cyanilux’s 2D Water Shader Breakdown](https://www.cyanilux.com/tutorials/2d-water-shader-breakdown/): differently scaled seamless noise fields drift in opposing directions, producing continuously changing interference rather than translating one obvious line tile. The wider source comparison and rejected alternatives are captured in the [water-caustics research brief](../../../design/reviews/ex-0004-water-caustics-research-2026-07-18.md).

Current rendering contract:

- CC0 source textures live in `assets/water/`; provenance is recorded in `assets/water/README.md`;
- value noise repeats at `48 × 48` SVG units with a `-6°` pattern rotation;
- gradient noise repeats at `64 × 64` SVG units with a `9°` pattern rotation;
- the layers use non-synchronized linear cycles of `8s` and `11s`;
- static `feColorMatrix` / `feComponentTransfer` filters turn luminance peaks into warm highlights and low values into restrained teal depth;
- highlight opacities are `.08` and `.2`; the depth layer is `.08`;
- only oversized water rects transform; the SVG root and gameplay evidence never do;
- reduced motion freezes both fields at their authored initial position without removing the texture.

Required paint order:

1. celadon water gradient;
2. static radial light;
3. animated caustic depth and highlights;
4. static generated perimeter rocks, flowers, and nénuphars;
5. exact grid;
6. route and measurement evidence;
7. semantic endpoint nénuphars, frogs, labels, and discrepancy evidence.

## Implementation design

`PondBoard.svelte` is the deep visual module for the playable surface. Its interface is deliberately small:

- `scene`: direction, distance, mode, and obstacle positions;
- `journey`: covered units, actions, prediction, outcome, and trace;
- `variant`: active or success;
- optional `onJump`: the tutorial action.

The implementation hides SVG geometry, generated-asset layout, endpoint rendering, discrepancy measurement, pond styling, caustic composition, responsive treatment, and active/success differences behind that seam. `Prototype.svelte` owns exercise progression, timing, focus, messages, and smoke metadata. This split keeps visual change local and prevents the success map from becoming a second board implementation.

Both dependencies are in-process; no adapter or additional seam is justified.

## Geometry invariants

The SVG coordinate system is authoritative.

- Board `viewBox`: `0 0 120 100`
- Grid pattern: `10 × 10`
- Horizontal origin: `(20, 60)`
- Horizontal vector: `(10, 0)`
- Vertical origin: `(60, 80)`
- Vertical vector: `(0, -10)`
- The unit reference spans exactly one vector.
- Start, finish, frog, obstacle, traces, and discrepancy evidence derive from these coordinates.

CSS atmosphere may frame the board but must never define or distort measurement.

## Interaction and feedback

### Tutorial

- The frog itself is the control.
- The invisible hit target remains at least `44 × 44` CSS pixels on narrow touch screens.
- Each tap advances exactly one unit and leaves a landing marker.

### Prediction

- A valid digit begins the chain without a separate submit button.
- While resolving, the input is unavailable.
- Reduced-motion mode resolves immediately while preserving all final evidence.

### Error

A wrong prediction must show:

- where the frog stopped;
- whether it stopped short or passed the finish;
- the measured discrepancy;
- a replay control for the same scene.

### Success

A correct prediction must show the complete route ending exactly at `Arrivée` before progression is offered.

## Motion rule

Gameplay state advances between fixed positions. The grid, route, endpoints, frogs, labels, perimeter assets, and persistent evidence remain motionless.

Two narrow exceptions are approved:

- ambient caustic depth/highlight fields may drift continuously beneath `.grid-surface` on `8s` and `11s` loops;
- the newest landing may emit one `280ms` response ellipse; persistent landing ripples remain static.

Still prohibited:

- sprite-sheet animation;
- frog jump, bounce, bob, idle, rotation, or squash animation;
- grid, route, marker, label, or scene distortion;
- animated trace reveal;
- koi loops or additional decorative motion.

Reduced-motion mode freezes the caustic fields and suppresses the one-shot landing response while preserving the attractive static water texture and all final evidence.

## Accessibility

- All controls are keyboard reachable and have visible focus treatment.
- The tutorial frog has an explicit action label.
- SVG titles/descriptions announce direction, action count, and covered units.
- Feedback uses live/status semantics and receives focus when required.
- Decorative atmosphere images use empty alt text and `aria-hidden="true"`.
- Color is reinforced by shape, labels, line treatment, and position.

## Responsive contract

- Desktop uses a two-column learning layout: instruction on the left, pond on the right.
- Narrow layouts stack heading, pond, control, and feedback in that order.
- At `320px` width, required controls remain inside the viewport, the frog hit target stays at least `44px`, and no horizontal scrolling is introduced.

## Test contract

`experiments/tests/smoke/ex-0004-visual-polish.spec.ts` protects:

- the locked intro artwork checksum;
- intro and outro presentation;
- exact grid geometry and unit vector;
- generated overhead frog and endpoint nénuphars;
- a static twelve-placement perimeter layer with varied flower and nénuphar scale/orientation between the caustics and exact grid;
- isolated ambient caustic motion below a static grid;
- static frog, decorative assets, route, and persistent landing evidence, with no decorative white wave strokes;
- direct frog control and mobile hit-target size;
- route persistence on success;
- reduced-motion behavior;
- clean completion of all four scenes.

## Scope boundary

Allowed follow-up work:

- spacing, contrast, typography, and endpoint legibility;
- SVG refinement that directly supports the mechanic while respecting the motion rule;
- tuning or replacing individual static generated components while preserving strict top-view presentation, the perimeter-only layout, and asset provenance;
- tuning the existing caustic density, opacity, or timing within its isolated layer;
- accessibility and responsive fixes;
- test/documentation updates that preserve this contract.

Requires explicit owner approval:

- changing the learning objective or scene sequence;
- changing distances, answer counts, or obstacle behavior;
- adding scoring, timing, lives, ranking, or free movement;
- replacing the locked intro;
- introducing animated sprites, scene distortion, or decorative motion beyond the approved water and landing exceptions.
