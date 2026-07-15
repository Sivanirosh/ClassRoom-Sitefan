# EX-0003 — La console qui n’en fait qu’à sa tête

## Workflow provenance

- **Roadmap / structural approval:** proposed `6h-mathematics-roadmap`; owner approval still pending
- **Sequence:** `SEQ-N1 — Structures décimales`
- **Pilot source:** [`../../../Notes-to-take-to-improve-workflow.txt.txt`](../../../Notes-to-take-to-improve-workflow.txt.txt)
- **Mechanic memory:** [`PRE-0004`](../../../game-mechanics/precedents/PRE-0004-human-resource-machine.md), [`PRE-0005`](../../../game-mechanics/precedents/PRE-0005-opus-magnum.md), [`PRE-0006`](../../../game-mechanics/precedents/PRE-0006-into-the-breach.md), [`PRE-0007`](../../../game-mechanics/precedents/PRE-0007-brilliant.md), [`MEC-0002`](../../../game-mechanics/mechanics/MEC-0002-program-execute-inspect-revise.md), [`MEC-0003`](../../../game-mechanics/mechanics/MEC-0003-telegraphed-consequences-and-checkpoints.md), [`MEC-0004`](../../../game-mechanics/mechanics/MEC-0004-action-first-interactive-learning.md)
- **Application outcome:** [`APP-0003`](../../../game-mechanics/applications/APP-0003-seq-n1-transformation-console.md)
- **Learning brief / pitch comparison / graybox script:** not created; this historical pilot predates the approved templates
- **Owner mechanic gate:** `revise-same-mechanic`

On 2026-07-15 the owner replayed the current prototype, said the interface direction was correct but too information-dense, and requested a coherent simplification that preserves the procedural loop. The exact phrase `mechanic approved for expansion` has not been granted for EX-0003.

## Decision summary

This is the procedural strategy companion to EX-0002. The pupil authors bounded command sequences, executes or steps through them, inspects deterministic intermediate values, and edits the program. Meaningful checkpoints make order matter in selected scenes instead of disguising commutative arithmetic as a sequencing challenge.

## Curriculum alignment

- **Framework:** PER Cycle 2, 6H
- **Objective codes:** MSN 22 and transversal MSN 25
- **Source:** `src-per-0002`, Mathematics pp. 18–21
- **Roadmap nodes:** principally `NUM-03` and `NUM-04`, with visible exchange support from `NUM-01`
- **Progressions used:** `P22.05`, `P22.09`, `P22.10`, `P22.12`, `P22.13`
- **Explicit 6H endpoints informed:** `E6-22.03`, `E6-22.05`, `E6-22.06`
- **Evidence boundary:** PER supports counting/decounting by place-value steps and translating representations. Commands, checkpoints, faulty console behavior, and narrative are original design interpretations.

## Observable learning objective

Given a natural number, target, and bounded commands of ±1, ±10, ±100, or ±1’000, the pupil constructs and revises a valid transformation, predicts rank changes and crossings, and explains an exchange/degrouping through the execution trace.

## Prerequisites and vocabulary

- Base-ten groupings from EX-0002 or an equivalent experience.
- Read natural numbers through thousands.
- Interpret + and − as state transformations.
- Essential French vocabulary: `commande`, `programme`, `exécuter`, `pas à pas`, `trace`, `borne`, `déplacer`, `supprimer`, `effacer`.

## Misconceptions and productive difficulty

Design hypotheses to observe:

- changing the visually similar wrong rank;
- appending a zero instead of adding a place value;
- treating subtraction from an empty rank as impossible;
- accepting ten objects in one positional column without exchanging;
- assuming that a correct final value also satisfies an ordered route.

Productive difficulty comes from boundary crossings, debugging an authored faulty program, degrouping, limited slots, and conceptually meaningful intermediate checkpoints. Syntax trivia, typing, and speed are excluded.

## Evidence of learning

Potential evidence includes:

- constructing a command sequence rather than identifying a finished answer;
- predicting which digits/ranks remain stable;
- using an execution trace to find the first route divergence;
- repairing a preloaded `+10` program into the required `+100` transformation;
- explaining why 1’004 can be treated as ten hundreds and four units for `−100`;
- satisfying ordered intermediate values before the final target.

Completion, time, and command count are not mastery measures.

## Core mechanic hypothesis

> If the pupil authors a bounded program, executes or steps through synchronized positional state, and revises from a deterministic trace and meaningful checkpoints, then place-value changes can become controllable procedures rather than memorized digit edits.

- **Primary verbs:** add command, order, remove, clear, execute, step, inspect, revise.
- **State model:** start value, target, command slots, current positional digits, required checkpoints, and execution trace.
- **Challenge source:** bounded instruction vocabulary/slots, boundary crossings, faulty programs, and ordered intermediate states.
- **Recovery:** programs remain editable; mismatch feedback names final or first checkpoint divergence; execution can be repeated without penalty.
- **Mechanical distinction:** unlike EX-0002, quantity intentionally changes and the main artifact is an authored procedure rather than a spatial organization.

## Implemented progression

1. **Orientation — Premier démarrage:** add `+1`, execute, and transform 243 into 244; executing an empty program provides a recoverable error path.
2. **Exploration/ordered constraint — Banc d’essai:** program `+10`, then `+1’000`, moving 293 through mandatory checkpoint 303 to 1’303. Reversing the commands reaches the same final value but fails the checkpoint.
3. **Complication — Passage dangereux:** use `+1` to transform 999 into 1’000 and inspect the cascading rank exchange.
4. **Debugging — wrong rank:** inspect Bip’s preloaded `+10` command, remove it, replace it with `+100`, and transform 956 into 1’056 while explaining the hundreds-to-thousands exchange.
5. **Inverse transformation — Colonne vide:** use `−100` to transform 1’004 into 904 through degrouping one thousand.
6. **Independence/integration — Programme de la fête:** order `−1’000, −100, −10, −1` so 2’416 passes through 1’416, 1’316, and 1’306 before reaching 1’305.

This historical prototype expanded before the explicit gate existed; the sequence is documented, not newly authorized.

## Feedback and recovery

- Empty/over-capacity programs and target/checkpoint mismatches produce state-specific written guidance.
- One causal route keeps the start, each command slot, required checkpoint, intermediate result, and target aligned.
- A compact place-value scanner updates from the same route instead of competing with a separate programmer panel.
- A route may reach the final value yet fail an earlier checkpoint; feedback names the missing checkpoint and asks for reordering.
- Add/remove/reorder/clear actions preserve an editable program; execution is safe and repeatable.
- Success traces explain changed and stable ranks.
- Bip and the machine carry the error framing, never the pupil.

## Content model and ambiguity guards

Six authored integer transformations use exact numeric addition. Available commands and slot counts are bounded per scene. The program evaluator computes every intermediate value, compares ordered checkpoints by trace index, then verifies the final target. Swiss thousands separators are display-only. No random cases, floating point, hidden answer choices, or written-algorithm claims remain.

The checkpoints are deliberate: addition commands commute at the final-sum level, so scene 2 and scene 6 need required intermediate values for order to carry conceptual meaning.

## Interaction states

```text
intro → active program
active → edit/execute/step → active trace or recoverable error
active → target + ordered checkpoints satisfied → success
success → next test or completion
```

## Accessibility and devices

- Native discrete controls support keyboard, pointer, and touch.
- Command labels combine words/symbols and accessible button names; meaning does not rely on color.
- Start, target, positional digits, checkpoints, program, and trace are written in the DOM and grouped by the route they describe.
- Focus is visible; status messages announce program results.
- Reduced motion preserves all states and explanations.
- Narrow layouts stack the console and controls; traces may scroll within their labeled region rather than overflowing the page.

## Motion and artwork decisions

Motion is restrained to press/state feedback and is disabled/compressed under reduced motion. The frequently used command controls respond immediately rather than playing decorative movement. Generated imagery is limited to Bip and the intro/outro narrative scenes. Commands, numbers, digits, checkpoints, trace, and assessed state remain DOM/CSS.

## Prototype boundaries

Included: six authored transformations, bounded command construction, add/remove/reorder/clear, full execution and step-through, deterministic trace, ordered checkpoints, preloaded faulty program, short narrative, and local completion.

Excluded: free-form calculator behavior, arbitrary generation, optimization scoring, procedural arithmetic instruction, identity, persistence, telemetry, classroom submission, and pupil-validation claims.

## Observation plan

Observe whether pupils inspect positional state instead of using final-digit pattern matching; predict 999→1’000; understand checkpoint failure despite a correct final value; repair rather than merely replace the faulty program blindly; explain degrouping; and use the final trace as evidence. The hypothesis is weakened if pupils follow smoke-route-like memorized command orders without interpreting intermediate states.

## Findings and decisions

- **2026-07-15 — Rejected form:** the first implementation used `read → choose one answer → feedback`; see [`APP-0001`](../../../game-mechanics/applications/APP-0001-seq-n1-answer-loop-convergence.md).
- **2026-07-15 — Mechanic redesign:** command slots, execution, step-through, edit controls, checkpoints, and traces replaced answer selection.
- **2026-07-15 — Conceptual correction:** ordered checkpoints were added where commutative commands would otherwise make sequencing decorative.
- **2026-07-15 — Historical gate:** positive iterative feedback was recorded, but no approval phrase existed during the original expansion.
- **2026-07-15 — Record synchronization:** removed unused answer-choice payloads and migrated final smoke hooks to the real mechanic controls.
- **2026-07-15 — Current owner replay:** preserve the command-programming mechanic, but revise the presentation because information density and split surfaces kept it below EX-0002's reference quality. Disposition: `revise-same-mechanic`.
- **2026-07-15 — Coherent simplification:** integrated display and programmer into one route machine, aligned commands with checkpoints/results, removed duplicate command codes and status jargon, compacted the rank scanner, and made the detailed success explanation optional.

## Final validation evidence

Final post-simplification technical checks on 2026-07-15:

- `npm --prefix experiments run check` — passed; zero Svelte diagnostics; catalog valid (3 exercises).
- `npm --prefix experiments run test:smoke` — 6/6 passed, including reduced-motion keyboard and 320 px touch paths through the integrated route machine, step-through execution, wrong-order reordering, preloaded-command removal, all authored checkpoints, and an empty-program recovery.
- `npm --prefix experiments run build` — passed.

These results establish technical readiness of the revised path only. Automated checks do not validate pupil reasoning, French comprehension, assistive-technology behavior beyond the covered hooks, or the still-pending owner mechanic gate.

## Promotion criteria

Promotion requires explicit owner disposition, pupil observations across fresh boundary/route cases, understood French feedback, accessible keyboard/touch use, and clear separation between conceptual errors and interface friction. The exercise remains `prototyping` until that evidence exists.
