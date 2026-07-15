# EX-0000 — Exercise title

## Workflow provenance

- **Roadmap / structural approval:**
- **Sequence ID:**
- **Learning brief:**
- **Mechanic-pitch decision:**
- **Graybox script:**
- **Precedent records (`PRE-*`):**
- **Mechanic records (`MEC-*`):**
- **Application record (`APP-*`):** create/update after owner playtest
- **Owner mechanic gate:** pending

Follow [`../../design/prototype-production-workflow.md`](../../design/prototype-production-workflow.md). Full expansion requires the exact owner phrase `mechanic approved for expansion`.

## Decision summary

State the learning problem, selected mechanic, primary pupil verbs, source of challenge, and why this interaction is worth grayboxing.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years:** Cycle 2 / 6H–8H as applicable
- **Objective codes:**
- **Source IDs:**
- **Interpretation:** Separate direct curriculum statements from design interpretation.

## Observable learning objective

Describe what the pupil should become able to notice, represent, predict, manipulate, revise, or explain.

## Prerequisites and vocabulary

- Stable prerequisites:
- Familiar representations:
- Essential French copy/vocabulary:

## Misconceptions and productive difficulty

Document likely wrong models, shortcuts, and sources of confusion. Distinguish evidence-backed misconceptions from design hypotheses, and concept difficulty from interface friction.

## Evidence of learning

Describe which actions, revisions, traces, or explanations provide evidence beyond correctness, completion, speed, XP, or time spent.

## Core mechanic hypothesis

> If the pupil repeatedly **[uses primary verbs]** within **[meaningful constraints]**, while **[state/consequences]** remain inspectable and mistakes support **[recovery]**, then **[target relationship]** becomes visible and usable.

- **Primary verbs:**
- **State model:**
- **Source of challenge:**
- **Meaningful decisions:**
- **Feedback/recovery loop:**
- **Why this is mechanically distinct from nearby exercises:**

## Three-scene graybox

Link the exact action/copy script. Keep this implementation bounded to:

1. **Orientation** — teach the action and representation.
2. **Complication** — expose the mechanic's true source of challenge.
3. **Independent challenge** — remove step-by-step support and collect evidence.

### Included before mechanic approval

- The three scripted scenes
- Essential French copy
- One meaningful mistake/recovery route
- Minimal styling needed for comprehension
- Lightweight playability evidence

### Excluded before mechanic approval

- Complete storyboarding and remaining scenes
- Broad responsive/accessibility smoke suite
- Generated artwork and decorative motion
- Production-scale content, telemetry, persistence, and progression systems

## Owner playtest and mechanic gate

| Date | Owner observation or requested change | Disposition |
|---|---|---|
| | | |

Allowed dispositions:

- revise the same graybox;
- return to paper pitches;
- park/archive;
- record `mechanic approved for expansion`.

**Current gate:** pending

## Full sequence progression

Complete this section only after mechanic approval. Use the flexible conceptual grammar where applicable:

```text
orientation → exploration → constraint → complication
→ integration → independence
```

Document omissions/reordering instead of forcing every stage.

## Full storyboard

After approval, specify exact French copy, pupil actions, system states, feedback, recovery, transitions, and completion conditions for every scene.

## Feedback and scaffolding

Specify immediate state-specific feedback, optional hints, recovery, and how support fades. Do not reduce feedback to only “correct” or “incorrect.”

## Content model

Document authored/generated values, scenario rules, valid-state rules, edge cases, invariants, and how impossible or ambiguous situations are prevented.

## Interaction states

List states and transitions using the mechanic's actual lifecycle—for example construction, preview, execution, trace inspection, revision, checkpoint, and completion. Do not force every exercise into a generic answer-card lifecycle.

## Accessibility and devices

Cover keyboard and touch alternatives, target size, non-color cues, text alternatives for exact quantities, readable motion, reduced-motion behavior, language clarity, and narrow-screen state legibility.

## Motion and artwork decisions

Both are late and optional. For each selected addition, record its explanatory, usability, or narrative purpose. Keep values, controls, and assessed state in accessible DOM/CSS rather than generated imagery.

## Final validation evidence

Run after all selected polish:

- catalog/schema validation;
- typecheck/build;
- full browser path including a meaningful error and recovery;
- narrow/mobile and desktop layouts;
- keyboard, focus, labels, semantics, and touch targets;
- reduced-motion behavior;
- automated accessibility plus targeted manual checks.

Record commands, dates, failures, fixes, and residual pupil-testing questions.

## Findings and decisions

Append dated observations and synchronize this file with what was actually built. Preserve rejected decisions and reasons. Write reusable outcome memory to the linked `APP-*` record.

## Promotion criteria

State what owner judgment, learning evidence, technical evidence, and unresolved risks are required before extraction into the classroom application.
