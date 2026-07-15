# EX-0003 — La console qui n’en fait qu’à sa tête

## Decision summary

This is the strategy-and-transfer companion to EX-0002 within `SEQ-N1 — Structures décimales`. The same light story continues after Bip’s machine is physically assembled: its console interprets place-value commands too literally and must be tested, predicted and debugged. The prototype is intentionally not a visual reskin of the workshop; its central action is reasoning about change rather than organizing a fixed quantity.

## Curriculum alignment

- **Framework:** PER Cycle 2, 6H
- **Objective codes:** MSN 22 and transversal MSN 25
- **Source:** `src-per-0002`, Mathematics pp. 18–21
- **Sequence:** `SEQ-N1`
- **Roadmap nodes:** principally `NUM-03` and `NUM-04`, with visible exchange support from `NUM-01`
- **Progressions used:** `P22.05`, `P22.09`, `P22.10`, `P22.12`, `P22.13`
- **Explicit 6H endpoints informed:** `E6-22.03`, `E6-22.05`, `E6-22.06`
- **Evidence boundary:** the PER supports counting/decounting by place-value steps and translating representations. The faulty console, commands, narrative and debugging cases are original design interpretations.

## Learning objective

Given a natural number and a command of ±1, ±10, ±100 or ±1’000, the pupil predicts the result, identifies which positional ranks change, and repairs an invalid transformation involving an exchange or degrouping.

## Prerequisites

- Base-ten groupings developed in the workshop or an equivalent prior experience
- Reading natural numbers through thousands
- Basic interpretation of addition and subtraction commands

## Misconceptions and productive difficulty

Possible response patterns include concatenating the intermediate value `10` into the written number, changing the wrong place, appending a zero, or treating subtraction from an empty rank as impossible. The console externalizes these as machine bugs so feedback concerns the reasoning, not the pupil. Productive difficulty comes from predicting boundary crossings and reversing an exchange.

## Core interaction hypothesis

> If the pupil predicts a command, observes synchronized blocks and digits, and debugs plausible machine errors, then place-value changes become controllable transformations rather than memorized symbol edits.

## Story and progression

The workshop from EX-0002 is ready, but Bip’s console must be certified for the festival demonstration.

1. **Premier démarrage — orientation:** reach 244 from 243 with `+1` while discovering that commands execute literally and undo is safe.
2. **Banc d’essai — exploration:** use `+1’000` to change scale while leaving the three lower ranks stable.
3. **Passage dangereux — complication:** predict `293 + 10` and inspect the exchange producing 303.
4. **Premier dysfonctionnement — debugging:** repair the invalid `10 | 5 | 6` display for `956 + 100` by exchanging ten hundreds.
5. **Réserve vide — reversal:** explain how `1’004 − 100` becomes 904 by opening one thousand into ten hundreds.
6. **Programme final — integration:** combine `−1`, `−10`, `−100` and `−1’000` to transform 2’416 into 1’305 and certify the machine.

## Feedback and scaffolding

- Commands always have a visible current number, target and transformation trace.
- A wrong command produces an interpretable consequence rather than punishment.
- Prediction and machine result remain side by side.
- Retry preserves the scene and offers one increasingly specific clue.
- Correct feedback identifies changed and unchanged ranks.
- Bip’s concise humor frames the machine as fallible and the pupil as its collaborator.

## Content model and ambiguity guards

Six authored integer transformations are stored as exact values and collectively exercise both directions of the `1`, `10`, `100` and `1’000` steps. Every program is evaluated in advance and each distractor is non-equivalent to the target. Swiss thousands separators are display-only. The prototype does not generate arbitrary arithmetic cases or teach a written addition/subtraction algorithm.

## Interaction states

`introduction → command/prediction → incorrect consequence → retry` or `correct trace → continuation → next scene → certification`.

## Accessibility and devices

- All commands are native buttons with text and symbolic values.
- Keyboard, touch and pointer use the same decision path.
- Focus is visible; targets are at least 44 px.
- State and correctness never depend on color alone.
- No timer, sound, drag or precise placement is required.
- Reduced-motion preserves every trace and explanation.
- The 320 px layout stacks the console panels and command cards.

## Prototype boundaries

Included: six authored transformations, prediction, debugging, degrouping, one short program, reactive story feedback and completion.

Excluded: free-form calculator behavior, arbitrary number generation, procedural arithmetic teaching, score, persistence, telemetry, identity and claims of validation.

## Observation plan

Observe whether pupils use the place-value display or only digit patterns; whether the 293→303 and 1’004→904 traces change explanations; whether debugging another system reduces defensiveness; and whether the final four-step negative program demonstrates transfer rather than memory. The hypothesis is weakened if options can be solved by superficial wording or the console animation substitutes for explanation.

## Findings and decisions

- **2026-07-15 — Companion role:** retain the console as a distinct strategy/debugging study after the workshop construction experience.
- **2026-07-15 — Narrative direction:** Bip remains a short reactive companion; the machine’s plausible errors carry the conflict.
- **2026-07-15 — Initial low-fi:** use bounded authored commands and traces before considering an unrestricted sandbox.

## Promotion criteria

Promotion requires pupil observations showing successful prediction and explanation across fresh boundary cases, comprehensible French feedback, usable keyboard/touch operation, and clear separation between conceptual mistakes and interface friction. The record remains `prototyping` until then.
