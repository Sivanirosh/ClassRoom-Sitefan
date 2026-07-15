# EX-0002 — Le grand rangement de Bip

## Decision summary

This is the concept-construction study for `SEQ-N1 — Structures décimales`. A light problem-solving comedy places the pupil beside Bip, an overconfident apprentice inventor whose workshop must be organized before his machine can be demonstrated. The prototype tests whether choosing and observing reversible exchanges makes conservation of quantity and base-ten organization visible without relying on a written rule.

## Curriculum alignment

- **Framework:** PER Cycle 2, 6H
- **Objective codes:** MSN 22 and transversal MSN 25
- **Source:** `src-per-0002`, Mathematics pp. 18–21
- **Sequence:** `SEQ-N1`
- **Roadmap nodes:** `NUM-01`, `NUM-03`, `NUM-04`
- **Progressions used:** `P22.02`, `P22.04`, `P22.05`, `P22.12`, `P22.13`
- **Explicit 6H endpoints informed:** `E6-22.01`, `E6-22.02`, `E6-22.03`, `E6-22.05`, `E6-22.06`
- **Evidence boundary:** the PER supports grouping, counting steps and translation among representations. Bip, the workshop, the exact cases and the interaction sequence are design interpretations, not prescribed curriculum.

## Learning objective

Given a bounded collection or representation, the pupil chooses valid exchanges between ten units of one rank and one unit of the next rank, preserves the cardinal, and relates the resulting organization to its written number.

## Prerequisites

- Reliable counting of a small visible collection
- Familiarity with natural-number words and digits
- Understanding that a closed container may stand for its contents

## Misconceptions and productive difficulty

The prototype targets three possible response patterns: treating a package as one piece rather than ten contained pieces; believing an exchange changes the total; and omitting a zero when a positional rank is empty. These are design hypotheses to observe, not labels for pupils. Productive difficulty comes from a cascading exchange and an empty tens rank. Accidental difficulty from dragging or pixel precision is excluded: every choice is a large native button.

## Core interaction hypothesis

> If the pupil repeatedly chooses an exchange, sees the original pieces remain inspectable inside their new container, and compares equivalent organizations, then grouping by ten becomes a reversible conservation relationship rather than a digit trick.

## Story and progression

Bip is preparing an invention for a school festival. Each solved scene activates one workshop module.

1. **La porte bloquée — orientation:** choose exactly ten pieces for the first pouch. A harmless wrong choice teaches the rule and interface.
2. **Deux rangements — exploration:** identify another organization of 34 that preserves its quantity.
3. **L’étagère à neuf places — complication:** interpret the cascade from nine pouches plus thirteen pieces to one crate and three pieces.
4. **La livraison régulière — strategy:** choose a step of ten to move from 270 to 300 and observe the boundary exchange.
5. **L’étiquette finale — integration:** coordinate 1’306 with one pallet, three crates, zero pouches and six pieces.

The final state activates Bip’s machine and points naturally toward companion study EX-0003.

## Feedback and scaffolding

- The submitted action remains visible beside the result.
- Incorrect feedback names the exact quantity or rank involved.
- Retry returns to the same scene without resetting the chapter.
- Bip reacts with brief non-judgmental humor; he may be mistaken, the pupil is never characterized.
- Support progresses from restating the container capacity, to identifying the relevant rank, to displaying the equivalent decomposition.
- A revealed explanation never counts as independent validation; future pupil testing should add a fresh equivalent case before any mastery claim.

## Content model and ambiguity guards

The five authored scenes use exact integer quantities. Container values are fixed at 1, 10, 100 and 1’000. No binary floating point, generated content or ambiguous rounding occurs. Every answer option has been checked against the stated cardinal. Visual containers always include a written value and icon, so color and appearance are not the sole cues.

## Interaction states

`introduction → active scene → incorrect feedback → retry` or `correct explanation → continuation → next scene → completion`.

## Accessibility and devices

- Native buttons support keyboard, pointer and touch.
- Controls are at least 44 px and have visible focus.
- Meaning uses text, counts, symbols and position in addition to color.
- No drag, hover, sound, timing or animation is required.
- Reduced-motion removes transitions and the decorative activation movement.
- The layout stacks without horizontal page overflow at 320 CSS px.

## Prototype boundaries

Included: five authored scenes, one coherent narrative, base-ten exchanges through thousands, counting by ten, digit/decomposition coordination, retry and completion.

Excluded: unrestricted object manipulation, automatic content generation, scores, timers, identity, persistence, analytics, classroom result submission and claims of pupil validation.

## Observation plan

Observe whether pupils understand the pouch as ten contained pieces, whether they anticipate the cascade before reading feedback, whether zero in 1’306 remains meaningful, and whether Bip’s dialogue supports rather than delays play. The hypothesis is weakened if pupils answer from option wording without consulting the representation, or if containers obscure rather than clarify cardinality.

## Findings and decisions

- **2026-07-15 — Owner-led direction:** retain both workshop construction and console transformation as distinct `SEQ-N1` prototypes rather than choosing one reskin.
- **2026-07-15 — Narrative direction:** use light problem-solving comedy, short reactive dialogue and visible workshop progress; avoid heavy lore, punishment and decorative stakes.
- **2026-07-15 — Initial low-fi:** implement authored choice-and-consequence scenes first. Richer free manipulation remains a pupil-testing question, not assumed value.

## Promotion criteria

Promotion requires observed pupil use showing that the exchange representation clarifies conservation, that incorrect choices lead to productive revision, that exact French copy is understood, and that the complete keyboard/touch paths work without motor or color dependence. `prototyping` must remain until that evidence exists.
