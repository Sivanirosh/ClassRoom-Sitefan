# EX-0005 — Fais rouler

## Authority and expansion gate

- **Roadmap scope:** bounded `MES-01 → MES-02` pilot only.
- **Sequence / checkpoint:** `SEQ-M1 / MES-01`, with a separately bounded prediction bridge.
- **Learning source:** [`MES-01/LEARNING-BRIEF.md`](../../../design/sequences/seq-m1/mes-01/LEARNING-BRIEF.md).
- **Mechanic rationale:** [`MES-01/MECHANIC-FIT.md`](../../../design/sequences/seq-m1/mes-01/MECHANIC-FIT.md), revised through owner replay.
- **Research note:** [`mes-01-calm-game-mechanic-precedents.md`](../../../curriculum/research/mes-01-calm-game-mechanic-precedents.md).
- **Owner implementation correction:** keep direct rolling in Round 1; later rounds retain one automatic calibration roll and ask for additional rolls from that endpoint.
- **Expansion approval:** after replay, the owner confirmed on 2026-07-18 that EX-0005 is good and authorized final animation and image-generation polish. Natural-language approval is sufficient for this active exercise scope.

This authority covers full design, interaction-surface work, purposeful motion, decorative art direction, generated atmospheric imagery, and technical validation for EX-0005 only. It does not approve a MES-02 learning contract, propagate to another exercise, establish pupil learning, or authorize copied branding, characters, layouts, or compositions.

## Learning and experience contract

- **Core MES-01 relationship:** measuring a straight length with a shorter invariant unit means repeating that unit endpoint-to-endpoint from origin to destination.
- **Approved bridge hypothesis:** after experiencing one full roll, the pupil mentally projects how many additional identical rolls are required, commits an integer before verification, and revises from a visible shortage or overshoot.
- **Experience target:** observe → anticipate → commit → inspect a physical consequence → adjust calmly.
- **Forbidden inference:** a correct prediction, technical completion, or final success does not establish MES-02 mastery.
- **Forbidden pupil work:** prose report, declaration, ledger, diagnostic label, speed, aiming, dragging, timing, or answer-choice selection.

## Core mechanic

### Orientation

```text
activate the log
→ one complete roll
→ one same-length displacement and consequence mark
```

### Prediction rounds

```text
watch one complete roll of distance U
→ leave the log at that first endpoint
→ enter P additional rolls
→ execute exactly P identical rolls automatically
→ inspect short / exact / over
→ retry from the retained calibration endpoint
```

There is no reset to origin after calibration and no separate launch button. The first demonstrated roll is the first real interval of the crossing.

## Mathematical model

For one prediction variant:

- `U` — one complete roll vector;
- `R` — required rolls remaining after calibration;
- `D = (R + 1) × U` — complete origin-to-target vector;
- `P` — pupil prediction for additional rolls;
- `landing = origin + (1 + P) × U`.

```text
P < R → shortage
P = R → exact arrival
P > R → overshoot
```

`U` may change between variants but never during one attempt. The log's appearance does not encode `U`; the completed calibration action establishes it.

## Procedural content boundary

`content.ts` owns bounded, authored variant pools and validates them at module load. A variant is selected once when its scene loads and remains stable through every retry. A fresh complete replay rotates the selection deterministically.

Every variant must satisfy:

1. `R = totalRolls - 1` and `1 ≤ R ≤ 7`;
2. `U` is non-zero and invariant;
3. origin, target, and maximum accepted landing remain inside the inspectable SVG safe area;
4. the path is one straight vector with no turn, branch, partial roll, or changing unit.

This is controlled procedural selection, not unlimited random geometry.

## Full six-function progression

| Scene | Function | Changed demand | Representation |
|---|---|---|---|
| 1 | Orientation | Directly experience one action as one invariant roll | Broad horizontal terrace |
| 2 | Exploration | Replace direct control with retained calibration plus integer prediction | Supported broad passage |
| 3 | Constraint | Remove the broad surface cue | Thin horizontal line |
| 4 | Complication | Rotate the straight magnitude while preserving input | Rising diagonal line |
| 5 | Integration | Combine fresh calibration, reversed direction, and faded strategy copy | Mirrored line |
| 6 | Independence | Fresh steep line with minimal support and first-attempt distinction | Unsupported line |

Changing only a value or biome is insufficient; each scene above changes the tool, representation, support, or reasoning demand.

### Scene 1 — Orientation: « Découvre la distance d’un tour »

- Prompt: **« Active le rouleau. Regarde où il arrive après chaque tour complet. »**
- Direct control: **« Faire un tour complet »**.
- Four activations form four equal intervals and reach the target.
- Success: **« Quatre tours identiques relient exactement le Départ à l’Arrivée. »**
- Evidence boundary: onboarding only.

### Scene 2 — Exploration: « Combien de tours encore ? »

- Prompt: **« Regarde le premier tour. Il reste à sa place. Depuis ce nouveau repère, prévois les tours identiques qui restent. »**
- Full calibration label and composition feedback remain visible.
- Short, exact, and over predictions can be inspected and retried without penalty.
- Deterministic smoke error: an underprediction.
- Evidence boundary: supported exploration; guessing remains possible.

### Scene 3 — Constraint: « La passerelle sans traces »

- Prompt: **« Seule la ligne entre les deux balises compte. Le premier tour est ton repère pour toute la longueur. »**
- The broad trail disappears; only the line, endpoints, calibration interval, log, and post-execution traces remain.
- Purpose: reject area-covering and prospective-subdivision strategies.

### Scene 4 — Complication: « La rampe des embruns »

- Prompt: **« Le passage monte en diagonale. Observe la distance du premier tour le long de la rampe, puis prévois la suite. »**
- The whole straight magnitude rotates; no turn, route choice, drag, aim, or motor-precision demand is added.
- Purpose: transfer beyond a horizontal screen-width heuristic.

### Scene 5 — Integration: « Le relais inversé »

- Prompt: **« Le rouleau part de l’autre rive. Observe son premier tour, puis engage ta prévision. »**
- Direction reverses, the unit is recalibrated, and the strategy reminder fades.
- Pupil-facing field label becomes **« Tours encore nécessaires »**.

### Scene 6 — Independence: « La ligne suspendue »

- Prompt: **« Observe un tour. Prévois les tours qui restent jusqu’à l’Arrivée. »**
- A fresh steep straight line appears with minimal support.
- First prediction and attempt count stay in component memory only.
- First-try exact feedback: **« Ta première prévision termine exactement le passage. »**
- Repaired feedback: **« Tu as ajusté ta prévision jusqu’à l’Arrivée exacte. »**
- Both are dignified completion; neither claims mastery.

## Interaction states

1. `intro` — mission purpose and start.
2. `active/tutorial` — direct complete-roll actions.
3. `active/calibrating` — automatic first roll; prediction disabled.
4. `active/ready` — calibration interval and endpoint retained; prediction enabled.
5. `active/running` — integer committed; exactly that many added rolls execute.
6. `active/error` — short or over landing and discrepancy remain visible.
7. `active/retry` — trial rolls removed; `coveredRolls = 1`; calibration remains.
8. `success` — exact stage and complete trace remain visible with continuation.
9. `complete` — exercise closes without a score or mastery claim.

## Feedback and recovery

- The field always asks for rolls **still required**, never total rolls.
- Invalid values outside `1…7` do not execute and produce written, announced feedback.
- Shortage displays a hatched segment and **« distance restante »**.
- Overshoot displays the exceeded segment and **« distance dépassée »**.
- Retry removes only the predicted trial intervals and restores the log to the end of the first roll.
- Success names `1 tour observé + P tours prévus = total tours` only after verification.

Sequential guessing counts as supported completion. A fresh first prediction is stronger observational evidence but is not persisted or submitted.

## Storyboard and interaction surface

Each active scene uses five layers:

1. **Decorative landscape:** atmospheric terraces, cliffs, mist, foliage, and sky; no exact quantities.
2. **Mathematical stage:** authored SVG path, endpoints, calibration interval, traces, discrepancy, contact point, and log.
3. **Control dock:** native direct-roll button or native text input with numeric keyboard hint.
4. **Feedback strip:** stable written state below the controls; failure never replaces the landing.
5. **Continuation:** success keeps the exact stage visible until the pupil continues.

Controls are visually connected to the stage. Native focus order follows scene copy → stage description → control → feedback/retry. Targets remain at least 44 px. No required hover, sound, colour-only cue, drag, swipe distance, hold duration, or timing exists.

## Motion contract

| Motion | Purpose | Ordinary motion | Reduced motion |
|---|---|---:|---|
| Calibration roll | Establish the displacement and endpoint of `U` | 420 ms coupled roll/trace; 440 ms state gate | Immediate complete interval, contact, and announcement |
| Added rolls | Make `P` executable repetitions visible | 290 ms coupled roll/trace inside each 310 ms step | Synchronous complete trace, contacts, and final text |
| Short / over discrepancy | Direct attention to shortage/overshoot after execution | 260 ms one-shot hatch reveal and subtle label emphasis | Static hatch, geometry, label, and written outcome |
| Exact landing | Confirm coincidence without obscuring retained evidence | 320 ms one-shot endpoint halo | Static halo and exact geometry |
| Scene change | Signal a new challenge | Focus change; no camera motion | Same |

Each state increment changes the log by exactly `U` and its rotation by exactly one signed `360°` turn. The log translation, rotation, moving contact, and newly drawn interval share one state transition; added rolls are serialized, and the tutorial control is unavailable only while its already-requested complete roll settles. The final tutorial roll settles before the success stage is mounted. Retry is not animated as reverse rolling: trial intervals disappear and the retained calibration endpoint is restored immediately.

Timers carry a scene/run epoch so stale callbacks cannot mutate a later scene. Reduced motion bypasses every wait while retaining the same completed interval nodes and landing state. Reject parallax, looping particles, camera shake, bouncing controls, or motion that obscures endpoint relations.

## Art direction

The supplied reference authorizes general qualities only:

- stylized painterly 2D adventure scenery;
- coral-red terraces and cliffs;
- pale mist and waterfalls;
- lush teal/deep-green foliage;
- bright atmospheric blue depth;
- warm yellow/orange accents;
- foreground framing and a calm expedition feeling.

Do not copy its title treatment, logo, named world, central tower, exact canyon composition, landmarks, characters, or protected assets. The clipboard image is not committed.

The authored CSS/SVG layer owns every exact quantity and interaction surface. Decorative imagery must never carry the path, unit, endpoints, target count, answer, trace, discrepancy, labels, or controls. Removing all decoration leaves the complete mechanic understandable.

The committed generated source is not presented directly because its full composition retained a central tower, figures, and too much of the supplied reference composition. `assets/terrace-atmosphere-safe.webp` is the only runtime raster. It is a fixed crop from the source’s generic far-left atmosphere and excludes the central landmark, buildings, animals, foreground focal composition, and all branded/title areas. The crop contains no readable text, number, arrow, flag, ruler, tick, repeated stepping object, subdivision, answer, path, or exact state.

The safe crop is imported locally, marked `aria-hidden`, and rendered behind a translucent SVG sky wash and every authored mathematical layer. The same 1060 × 648 derivative is used at desktop and 320 px, so responsive layout cannot expose excluded source regions. Prompt, reference provenance, crop coordinates, manual export settings, no-branding review, and responsive review are recorded in [`assets/terrace-atmosphere.provenance.json`](assets/terrace-atmosphere.provenance.json) and [`assets/README.md`](assets/README.md).

## Accessibility and responsive behavior

- Native buttons and text input support keyboard, pointer, and touch.
- Prediction uses `type="text"`, `inputmode="numeric"`, and visible `1…7` bounds.
- Focus moves to scene titles, specific feedback, retry input, success feedback, and completion.
- Live text announces calibration and execution without requiring animation.
- Colour is paired with retained geometry, patterns, labels, and written feedback.
- The SVG world is uncropped and contains the maximum accepted landing plus a safety margin.
- At 320 px decorative foliage hides before it can cover mathematical state; controls stack and no horizontal page panning is required.
- Reduced motion preserves all intervals, contact points, discrepancy labels, focus transitions, completion controls, and final state.

### Final presentation review

Desktop and 320 px inspection confirm that the fixed generated crop stays atmospheric, the authored straight-vector layer remains visually dominant, all labels and controls stay inside the page, and no excluded source landmark or branding is exposed. The 320 px route uses the same native controls and reaches all six scene outcomes and completion without horizontal page overflow. This is technical implementation evidence only; it does not claim pupil comprehension, accessibility equivalence, learning efficacy, or MES-02 approval.

## Smoke and regression contract

Generic states remain `ready → active → success → complete`.

- Scene 1 success uses four real `roll` activations.
- Scene 2 exercises a real underprediction, written feedback, and `retry`.
- Every prediction success fills the ordinary pupil input using the current scene-derived remaining count.
- Success retains the exact stage and only then exposes `continue`.
- Keyboard reduced-motion and 320 px touch paths traverse all six scenes.
- Focused regression checks verify calibration retention, short/over geometry, retry baseline `coveredRolls = 1`, one interval and one signed turn per state increment, line-only representation, first-prediction distinction, fixed variant identity through retry, reduced-motion completion, keyboard focus, 320 px touch traversal, and no horizontal overflow.

## Scope exclusions

- No approved MES-02 learning contract.
- No curve, turn within a path, branching route, obstacle, partial roll, changing `U` within an attempt, conversion, ruler, score, timer, lives, random hazard, answer choice, slider, prospective landing mark, persistence, identity, network request, analytics, or teacher UI.
- No generated image may encode exact mathematical information.
- No technical result may claim fun, French comprehension, accessibility equivalence, learning, or mastery.

## Kill criteria

Reject or revise if:

1. pupils interpret the integer as total rolls instead of additional rolls;
2. retry erases calibration or returns to origin;
3. the demonstration feels decorative rather than establishing `U`;
4. consecutive guessing dominates attention to the unit;
5. unit distance appears to change within one attempt;
6. art, crop, or motion hides shortage, overshoot, endpoints, or the first interval;
7. diagonal or mirrored scenes introduce aiming or route planning;
8. scene identity or scenery becomes a memorized answer cue;
9. prediction is described as approved MES-02 mastery.

## Current disposition

Mechanic expansion is approved for the exact scope recorded above. The implementation remains `prototyping`. Final technical validation can establish replay and testing readiness only. It does not establish pupil learning, accessibility equivalence, MES-02 approval, or any later lifecycle change.
