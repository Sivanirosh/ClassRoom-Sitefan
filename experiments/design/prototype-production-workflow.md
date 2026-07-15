---
title: Roadmap prototype production workflow
status: approved
revision: r1-approved
approved_on: 2026-07-15
readiness: ready_for_design_package
owners:
  - repository owner acting as product, classroom, curriculum, and technical owner
---

# Roadmap Prototype Production Workflow

## Approval record

| Approver identifier | Accountable role | Approval scope | Revision/digest | Approved at | Disposition |
|---|---|---|---|---|---|
| User (chat approver) | Repository owner acting in product, classroom, curriculum, and technical roles | Prototype workflow, mechanic-memory model, owner gates, concurrency, polish, and validation timing | `r1-approved` | 2026-07-15T22:31:37+02:00 | Approved |

This approval does **not** approve the proposed Mathematics roadmap, its checkpoints, dependencies, or pacing. Those remain a separate curriculum decision.

## Revision history

| Revision | Date | Status | Material change | Author/editor |
|---|---|---|---|---|
| `r1-approved` | 2026-07-15 | Approved | Formalized the revised workflow from the first `SEQ-N1` owner-playtest retrospective | User and coding assistant |

## Executive intent

Produce concept-native, genuinely playable learning prototypes without completing stories, polish, and assets before the central mechanic has earned owner approval. Each sequence begins with grounded mechanic research, compares three paper directions, tests one disposable graybox, and expands only after the owner explicitly authorizes it. Research and prototype findings feed a repository-local mechanics memory so later work reuses knowledge instead of recollecting it.

## Workflow at a glance

```text
Approved roadmap structure
        ↓
Select one conceptual learning sequence
        ↓
Learning brief
        ↓
Search mechanics memory → research gaps → update PRE/MEC records
        ↓
Three mechanically distinct, precedent-cited paper pitches
        ↓
Owner selects one direction
        ↓
Three-scene script with exact actions and essential French copy
        ↓
Build one playable graybox
        ↓
Owner playtest
   ├─ revise/reject → return to this pitch or another pitch
   └─ “mechanic approved for expansion”
        ↓
Full storyboard and sequence expansion
        ↓
Coherent interaction-surface pass
        ↓
Optional purpose-driven motion and artwork
        ↓
Full final validation after all polish
        ↓
Write findings back to the mechanics memory
```

## Authority and concurrency

| Work | May run concurrently? | Authority boundary |
|---|---|---|
| Vault search and precedent research | Yes | Researchers preserve sources and separate source facts from design interpretation. |
| Unapproved sequence: pitches → graybox → owner refinement | No; one active sequence at a time | The owner makes the selection and mechanic-expansion decision. |
| Production of already approved mechanics | Yes, when mutation areas are independent | Every sequence must carry its own recorded owner approval. |
| Final validation | Per finished prototype | A technical pass cannot grant mechanic or pedagogical approval. |

No autonomous batch may expand unapproved mechanics.

## Phase 0 — Structural input gate

### Required input

- An owner-approved discipline roadmap structure.
- One selected learning sequence bounded by a conceptual dependency arc.
- Named roadmap checkpoints and the evidence each checkpoint should make observable.

### Gate

Do not treat a provisional roadmap idea as production authority. Approval of this workflow does not approve any particular roadmap.

## Phase 1 — Learning brief

Define only what mechanic research needs:

- observable learning checkpoints;
- prerequisites and required vocabulary;
- likely reasoning errors, clearly labeled as evidence-backed misconceptions or design hypotheses;
- representations that must remain mathematically inspectable;
- evidence beyond correctness;
- accessibility, dignity, privacy, and safety constraints;
- possible concept-native contexts;
- explicit non-goals.

Do not write the complete story, all scenes, or visual direction yet.

**Artifact:** a sequence learning brief created from `experiments/templates/sequence/LEARNING-BRIEF.template.md`.

## Phase 2 — Mechanics-memory pass

1. Search `experiments/game-mechanics/` before searching the web.
2. Retrieve by player verb, state model, challenge source, recovery loop, learning affordance, or prior application—not only by game title.
3. Research only missing or stale knowledge.
4. Add or update:
   - `PRE-*` records for factual game/platform precedents;
   - `MEC-*` records for reusable mechanic patterns.
5. Preserve source URLs and distinguish observed/source-backed facts from project interpretation.

The memory is not a certification system. It does not establish that an adaptation is fun or educationally effective.

## Phase 3 — Three paper mechanic pitches

Create exactly three pitches before choosing a direction. Each pitch must include:

- pitch identifier and target sequence/checkpoints;
- at least one named real game or interactive-learning-platform precedent, preferably linked through `PRE-*` and `MEC-*` records;
- the mechanic extracted at a pattern level;
- the pupil's primary verbs;
- the core moment-to-moment loop;
- the visible state representation;
- the source of challenge and meaningful decisions;
- mistake consequences, information, and recovery;
- why the mechanic is concept-native to this learning relationship;
- likely accessibility or implementation risks;
- what is deliberately not copied;
- a concise three-scene graybox possibility, not a complete storyboard.

### Mechanical-divergence gate

Compare the pitches side by side:

| Dimension | Pitch A | Pitch B | Pitch C |
|---|---|---|---|
| Primary verbs | | | |
| State representation | | | |
| Source of challenge | | | |
| Error information and recovery | | | |
| Moment-to-moment interaction | | | |

The set fails when differences are only content, numbers, story, visual style, or control labels.

### Owner disposition

The owner may:

- select one pitch;
- deliberately combine named parts and record the synthesis;
- request revision;
- reject all three.

Only one direction proceeds to the default graybox.

**Artifact:** `MECHANIC-PITCHES.md` created from the sequence template.

## Phase 4 — Three-scene graybox script

Script only the minimum needed to test the selected mechanic:

1. **Orientation** — teaches the action and representation.
2. **Complication** — exposes the mechanic's real source of challenge.
3. **Independent challenge** — tests whether the pupil can use the relationship without step-by-step direction.

For these three scenes, write:

- exact pupil actions;
- essential French instructions;
- expected visible state changes;
- one meaningful incorrect path;
- specific feedback and recovery;
- completion condition.

Do not write the complete narrative arc. Do not plan generated artwork or decorative motion.

**Artifact:** `GRAYBOX-SCRIPT.md` created from the sequence template.

## Phase 5 — Playable graybox and owner mechanic gate

Build one disposable playable graybox with:

- the three scripted scenes;
- minimal styling;
- no generated artwork;
- no decorative motion;
- no full narrative arc;
- only lightweight checks needed to ensure that the owner can play the intended and recovery paths reliably.

Advisory playtest prompts:

- Is the pupil manipulating the learning relationship or merely selecting an answer?
- Is the intended action understandable without live explanation?
- Does the complication reveal depth rather than only a larger number?
- Does a mistake produce useful information and permit revision?
- Is the activity intellectually playful, challenging, and worth continuing?

These prompts inform judgment; they are not a binding scorecard.

### Gate dispositions

- **Revise the same mechanic:** adjust and replay the graybox.
- **Return to pitches:** choose or synthesize another direction, then build a new graybox.
- **Park/archive:** stop the sequence without manufacturing approval.
- **Approve:** the owner records the exact phrase **`mechanic approved for expansion`**.

Positive comments, continued implementation, technical success, or silence do not imply approval.

## Phase 6 — Full storyboard and sequence expansion

Only after the explicit mechanic approval:

- write the complete scene progression and exact pupil-facing copy;
- expand through the flexible learning grammar:

```text
orientation → exploration → constraint
→ complication → integration → independence
```

All six functions must be represented, but they may merge, repeat, or span several scenes when the design explains why. Each scene must change at least one of:

- the constraint;
- the available tools;
- the representation;
- the reasoning demand.

Changing only a value, name, or surface context is insufficient.

If the final hint reveals an answer and explanation, require a fresh structurally equivalent case before recording independent closure.

## Phase 7 — Interaction-surface pass

Before decorative polish, verify that:

- actions are visually connected to the objects and state they affect;
- controls, quantities, and availability are understandable without relying entirely on prose;
- unavailable actions are distinguishable and explainable;
- undo and reset are obvious when the mechanic needs them;
- motor imprecision cannot be mistaken for conceptual error;
- the experience feels like one coherent system rather than disconnected cards;
- precise mathematical state remains DOM/CSS or otherwise inspectable rather than baked into decorative imagery.

## Phase 8 — Optional motion and asset passes

Motion and generated artwork are late and optional. Each addition must name an explanatory, usability, or narrative purpose.

### Appropriate motion

- press feedback;
- source/destination explanation;
- meaningful state transitions;
- scene transitions;
- rare completion moments.

Reject movement that makes quantities or intermediate states harder to inspect. Preserve reduced-motion behavior.

### Appropriate generated assets

- character poses;
- inventory illustrations whose quantities are verified;
- intro/outro narrative scenes;
- decorative world art.

Keep exact quantities, numbers, mathematical diagrams, controls, state indicators, and precision-dependent animation out of generated images. Preserve source prompts/metadata, verify object counts, test actual rendered size, and regenerate ambiguous assets.

## Phase 9 — Final technical validation

The full browser, responsive, and accessibility suite becomes mandatory only after all selected polish is complete.

Final evidence should include:

1. Svelte and TypeScript checks;
2. catalog and metadata validation;
3. production build;
4. a complete desktop keyboard path;
5. a complete 320 px touch path;
6. reduced-motion behavior;
7. specific incorrect feedback, recovery, correct feedback, continuation, and completion;
8. no unintended network, persistence, identity, or analytics behavior;
9. a manual owner happy path.

The smoke surface must observe real pupil controls and lifecycle states without forcing every mechanic into a generic answer-card loop. A final technical pass means testing readiness, not pupil validation or mastery.

## Phase 10 — Memory write-back and closeout

After pitch selection, graybox review, and final production, update the mechanics memory:

- link the sequence and prototype to the used `PRE-*` and `MEC-*` records;
- create or update an `APP-*` application record;
- preserve rejected mechanics and why they failed;
- record owner observations and the actual gate disposition;
- identify accessibility or implementation lessons;
- note conditions under which the mechanic should or should not be reused;
- synchronize the prototype's `DESIGN.md` with the implemented mechanic.

The next sequence starts by searching this accumulated memory.

## Critical invariants

- Adventure or narrative supports the mechanic; it never substitutes for intellectual play.
- A concept-native mechanic would lose meaning if its educational labels were replaced with an unrelated topic.
- Different visuals do not establish mechanical diversity.
- Source inspiration never authorizes copied content, wording, branding, artwork, or recognizable screens.
- Generated imagery never carries unverified exact mathematical information.
- Technical checks cannot approve mechanics or claim pupil learning.
- The owner gate cannot be inferred.

## Explicit non-goals

- Multiple grayboxes by default.
- Full storyboarding before mechanic testing.
- Autonomous bulk prototype generation.
- An exhaustive catalog of games or platforms.
- A vault maturity/certification bureaucracy.
- Mandatory motion or generated artwork.
- Pupil-validation or mastery claims from owner or automated testing alone.

## Success and review evidence

The workflow is functioning when:

- no sequence expands before its recorded owner phrase;
- three pitches expose genuinely different reasoning loops;
- rejected graybox work remains small and recoverable;
- later pitches reuse mechanics-memory records instead of repeating research;
- application records preserve successes and failures;
- completed prototypes pass final technical validation;
- owner review no longer discovers central-mechanic convergence only after full production.

## Open empirical hypotheses

- Three pitches will usually provide enough divergence without waste.
- The flexible six-function grammar will transfer across disciplines.
- The mechanics memory will materially reduce repeated research.
- Overlapping production of already approved mechanics will preserve coherence.

These are learning questions, not reasons to bypass the workflow. Revisit the relevant decision when repeated evidence contradicts it.

## Readiness declaration

**State:** `ready_for_design_package`

No unresolved workflow decision blocks use of this process. Approval of a discipline roadmap remains a separate prerequisite for starting its sequences.
