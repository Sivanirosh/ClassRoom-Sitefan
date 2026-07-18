# EX-0006 — La corde des sommes

## Workflow provenance

- **Owner implementation authority:** direct request on 2026-07-18 to implement <https://toytheater.com/addition-pull/> as a new prototype graybox.
- **Roadmap / bounded-scope authority:** standalone precedent-adaptation graybox; not attached to an approved production sequence.
- **Sequence / checkpoint ID:** provisional `precedent-adaptations / addition-fluency`.
- **Learning brief:** represented locally below; no separate approved sequence brief exists.
- **Semantic-fit disposition:** the owner explicitly requested this named precedent as a graybox. This authorizes only the bounded implementation, not expansion or promotion.
- **Established task source:** Toy Theater, “Addition Pull,” accessed 2026-07-18.
- **Curriculum source:** `src-per-0002`, PER Cycle 2, MSN 23. The exact “addition within 20” content band comes from the precedent, not from a claimed 6H endpoint.
- **Owner expansion gate:** pending.

## Decision summary

The reference game presents additions with four answer choices while a tug-of-war opponent continuously pulls toward a central pool. A correct answer produces a strong counter-pull; an incorrect answer is discarded and a new problem appears. Five levels increase opponent strength.

This graybox keeps only the abstract loop—four-choice fact retrieval, continuous opposing traction, discrete correct-answer counter-pulls, and rising pressure—and replaces all wording, characters, artwork, values, level structure, branding, audio, and page layout. Following owner replay, the interaction is intentionally uninterrupted: wrong answers create no opponent jump, modal correction, pause, or relaunch step. Instead, the opponent delivers an equal one-cran counter-pull over continuous motion while the next equality appears immediately.

## Learning contract used for the graybox

- **Core learning:** retrieve or reconstruct sums of two addends from 1 to 9 accurately within 20.
- **Successful-pupil statement:** « Je peux retrouver la somme, vérifier mon choix et rester exact même quand la pression augmente. »
- **Expected cognitive process:** read both addends → retrieve or reconstruct the sum → compare it with four choices → commit one answer → inspect whether a counter-pull occurred → continue immediately with the next equality.
- **Boundary:** this prototype tests a fluency game loop. It does not teach an addition strategy and cannot establish mastery from speed or wins.

## Semantic-fit mapping carried into the graybox

| Learning operation | Pupil/game action | System consequence or inspectable evidence | Scene |
|---|---|---|---|
| Retrieve or reconstruct a sum | Select one of four numeric choices | The complete equation is written in feedback; a correct choice pulls one rope notch | Orientation |
| Maintain exactness under visible pressure | Answer while the opponent continuously moves the rope | Rope position changes smoothly at a constant scene-specific pace; each exact answer produces a discrete counter-pull | Complication |
| Distinguish a miss from an opponent action | Choose an incorrect result | No discrete rope jump occurs; one blue cran is delivered continuously at 0.8 cran/s and the next equality replaces the failed one without stopping play | All scenes |
| Transfer with support removed | Complete a three-notch independent match | No strategy prompt remains; only equation, choices, continuous rope state, and subtle visual response remain | Independent challenge |

## Curriculum alignment

- **Framework:** PER, Cycle 2.
- **Objective:** MSN 23, solving additive and multiplicative problems.
- **Source:** `src-per-0002`; official 5H–6H/cycle evidence remains bounded as documented in the source record.
- **Interpretation:** repeated addition facts may support mental-calculation availability, but this reference’s sums within 20 and timed multiple choice are adaptation constraints, not direct PER prescriptions.

## Core mechanic hypothesis

> If each exact sum creates a one-cran red counter-pull while a miss creates an equal one-cran blue pull delivered continuously, then correctness has symmetric spatial consequences without interrupting the game’s physical rhythm.

- **Primary verbs:** read, calculate, choose, inspect, continue.
- **State:** a single tug-round value (`position`, queued opponent pull, terminal outcome), plus the current equality and brief visual reaction.
- **Challenge:** answer accurately enough that discrete one-cran counter-pulls overcome the opponent’s constant pull.
- **Meaningful decision:** which result is correct before continuous opponent movement erodes the player’s position.
- **Kill criterion:** reject the adaptation if pupils mainly guess faster, watch the rope instead of reading equalities, or cannot tell why some choices produced no counter-pull.

## Three-scene catalog graybox

1. **Orientation — Comprendre le contre-tirage.** The opponent pulls continuously at a slow constant pace. Two net red crans win; feedback explicitly names the continuous pull and the stronger answer-driven counter-pull.
2. **Complication — La pression avance.** Continuous opponent pace increases, and two net red crans win without a pause route.
3. **Independent challenge — Dernière manche.** Continuous pace increases again, three net red crans are required, and strategy copy is removed.

Crossing the red threshold ends the manche in success. Crossing the blue threshold ends it in loss, stops opponent movement, and offers an explicit same-manche retry; the rope never silently resets during active play.

### Mechanic module design

The tug rules live in the pure `tug-engine.ts` module behind three operations: create a round, answer, and advance time. That interface owns pull magnitude, queued mistake delivery, full elapsed-time consumption, exact goal capping, and terminal outcomes. `Prototype.svelte` is only the browser adapter: it supplies animation-frame elapsed time, renders returned state, and changes screens for `won` or `lost`. Tests exercise the same engine interface used by the UI, while one browser regression test verifies the loss screen and stopped active state.

The graybox includes deterministic authored questions, seamless answer replacement, keyboard/touch controls, reduced-motion styling, original generated storybook artwork, and no persistence or runtime network activity. It excludes audio, modal corrections, pause/relaunch controls, scoring, five-level progression, random content, analytics, and classroom submission.

### Visual system

Five optimized local WebP assets form one coherent hand-inked fairground world: a full-bleed intro, a gameplay arena, transparent red/blue pose sprites, a victory tableau, and a loss/retry tableau. The intro image served as the art bible for the remaining production prompts so team identity, paper grain, clouds, rope, terrain, and pennants remain consistent. The owner-supplied palette is centralized behind five component tokens: cyan `#50E2F2` for the blue opponent and live state, olive `#BBBF36` for centre/accent moments, cream `#F2E8C9` for warm insets, green `#3F876A` for controls and structural emphasis, and coral `#F25749` for the pupil team and answer-driven action. Readable dark mixes and translucent tints are derived from those tokens rather than introducing competing accent hues. The active session keeps its near-white canvas, true-white cards, restrained shadows, and light hierarchy so the artwork and arithmetic remain primary. The central rope is composited behind both sprite grips, while measured seam origins keep the hands anchored during paired pull/slip reactions. A terminal 180 ms landing beat (100 ms under reduced motion) lets the rope visibly reach its balise before the outcome card replaces the arena. A labeled red–centre–blue readout duplicates the rope’s position visually without making color the only state channel. Success, retry, and completion use the same light card system rather than floating content directly on the page. Decorative scene images use empty alternative text; game state remains available through headings, team labels, balises, live-region feedback, and functional rope position. The generated imagery never encodes the only copy of an equation, answer, outcome, or control.

## Copying boundary

Do not copy Toy Theater’s characters, SVG paths, art, sounds, exact instructional copy, branding, layout, level values, timing constants, or source code. The implementation uses original French copy and newly generated characters, story scenes, arena art, and sprites based only on the supplied reference’s high-level hand-inked storybook direction. Character identities, costumes, emblems, compositions, terrain, and production assets are original. The transferable precedent is only: opposing continuous pressure + correct-answer counter-pull + four-choice addition retrieval + stronger later pressure.

## Accessibility and timing

- Every choice is a native button with the complete equation in its accessible name.
- Color is reinforced by team names, left/right position, arrows, text, and rope movement.
- No pause or relaunch control interrupts the core loop; the opponent continues pulling through both correct and incorrect choices.
- A wrong answer has no discrete rope jump. It adds exactly one blue cran to a continuous penalty queue delivered at 0.8 cran/s; repeated misses stack. The arena receives a brief visual response, the next equality appears immediately, and an accessible live-region message names the correct sum.
- Decorative response transitions are removed under `prefers-reduced-motion`; the essential position change remains represented by the rope and its labeled red/blue goal markers.
- The 320 px layout keeps a two-column answer grid and minimum 56 px controls.

## Owner playtest and mechanic gate

| Date | Observation | Disposition |
|---|---|---|
| 2026-07-18 | Graybox implemented from the named reference; no owner replay recorded yet. | Pending replay and expansion decision. |
| 2026-07-18 | Owner inspection found the active game-session surfaces too heavy and requested a lighter-color UI/UX rebuild. | Replace the warm gray canvas and dense panel chrome with near-white layered surfaces, a clearer arithmetic inset, a labeled tug readout, and responsive light result cards; preserve the uninterrupted engine behavior and promotion gate. |
| 2026-07-18 | Owner supplied the five-color palette `#50E2F2`, `#BBBF36`, `#F2E8C9`, `#3F876A`, and `#F25749`. | Centralize it as the prototype’s palette seam and derive only accessible dark or translucent variants for text, borders, and states. |
| 2026-07-18 | Motion sweep found asymmetric rope layering, drifting grip pivots, one-sided reactions, abrupt terminal unmounting, and an instant feedback-note swap. | Place the rope behind both baked sprite grips, anchor both pose reactions at measured seams, give each team paired pull/slip feedback, hold terminal positions briefly, and crossfade the fixed feedback slot without changing tug rules. |
| 2026-07-18 | Owner validated the finished prototype after the baked blue-opponent sprite mirror and subtle white intro-gradient refinement. | Mark EX-0006 owner-approved; no further prototype iteration is requested. |

**Current gate:** pending. This record must remain `prototyping` until replay evidence changes it.

## Validation evidence

Validated on 2026-07-18:

- `npm run check` — passed with 0 Svelte/TypeScript warnings and a valid seven-exercise catalog.
- Production Vite build — passed after the generated-art integration and full elapsed-time engine correction.
- Targeted generic smoke contracts passed after the symmetric-penalty adjustment for keyboard and 320 px touch completion.
- `tests/smoke/ex-0006-continuous-pull.spec.ts` passes six checks: symmetric answer pulls, full elapsed-time consumption, exact frozen red and blue thresholds, browser-level loss termination after stacked misses, and continuous equal-opposite miss delivery without Pause/Relancer controls.
- Manual Playwright inspection of the generated-art intro, active screen, and terminal screen at 1280 px and 320 px found no console errors or horizontal overflow.
- After the light-surface rebuild, `npm run check` passed with 0 errors and 0 warnings, the six focused continuous-pull regressions passed, and all six generic smoke-suite tests run with `SMOKE_EXERCISES=EX-0006` passed.
- Post-rebuild Playwright inspection covered active and terminal surfaces at 1440, 820, 390, and 320 px. It found no console errors or horizontal overflow; the 320 px answer layout remains two columns with 60 px controls.
- After applying the owner palette, `npm run check` remained at 0 errors and 0 warnings and all six focused tug regressions passed. Playwright inspection at 1440 and 390 px confirmed the five exact palette tokens, no console errors, no horizontal overflow, and 72/60 px answer controls respectively.
- After the rope/sprite motion integration, `npm run check`, all six focused tug regressions, and all six generic EX-0006 smoke-suite tests passed. Frame inspection confirmed rope-under-grip compositing, paired pull/slip poses, fixed grip origins, and terminal result transitions at approximately 181 ms normally and 101 ms with reduced motion.

Residual learning risk: automated checks establish interaction reliability only. They do not show that continuous tug pressure improves fact retrieval or preserves pupil dignity and accuracy.

## Promotion criteria

Promotion would require an approved sequence role, a learning-contract review, owner replay confirming that the tug consequence supports rather than replaces calculation, observation of how pupils interpret silent misses, and evidence that continuous pressure does not confound speed with mathematical understanding.
