# EX-0002 — Le grand rangement de Bip

## Workflow provenance

- **Roadmap / structural approval:** proposed `6h-mathematics-roadmap`; owner approval still pending
- **Sequence:** `SEQ-N1 — Structures décimales`
- **Pilot source:** [`../../../Notes-to-take-to-improve-workflow.txt.txt`](../../../Notes-to-take-to-improve-workflow.txt.txt)
- **Mechanic memory:** [`PRE-0001`](../../../game-mechanics/precedents/PRE-0001-sokoban.md), [`PRE-0002`](../../../game-mechanics/precedents/PRE-0002-wilmots-warehouse.md), [`PRE-0003`](../../../game-mechanics/precedents/PRE-0003-unpacking.md), [`PRE-0007`](../../../game-mechanics/precedents/PRE-0007-brilliant.md), [`MEC-0001`](../../../game-mechanics/mechanics/MEC-0001-constrained-spatial-organization.md), [`MEC-0004`](../../../game-mechanics/mechanics/MEC-0004-action-first-interactive-learning.md)
- **Application outcome:** [`APP-0002`](../../../game-mechanics/applications/APP-0002-seq-n1-exchange-workbench.md)
- **Learning brief / pitch comparison / graybox script:** not created; this historical pilot predates the approved templates
- **Owner mechanic gate:** `mechanic approved for expansion` — recorded 2026-07-15

The historical expansion preceded the explicit gate and is not retroactively rewritten. After replaying the current prototype on 2026-07-15, the owner identified EX-0002 as the reference-quality prototype and explicitly authorized the current approval phrase.

## Decision summary

This is the concept-construction companion in `SEQ-N1`. The pupil directly groups, opens, delivers, undoes, and resets visible base-ten objects while a locked total and rank capacities expose conservation. The mechanic is worth testing because the changed organization and invariant cardinality remain simultaneously inspectable.

## Curriculum alignment

- **Framework:** PER Cycle 2, 6H
- **Objective codes:** MSN 22 and transversal MSN 25
- **Source:** `src-per-0002`, Mathematics pp. 18–21
- **Roadmap nodes:** `NUM-01`, `NUM-03`, `NUM-04`
- **Progressions used:** `P22.02`, `P22.04`, `P22.05`, `P22.12`, `P22.13`
- **Explicit 6H endpoints informed:** `E6-22.01`, `E6-22.02`, `E6-22.03`, `E6-22.05`, `E6-22.06`
- **Evidence boundary:** PER supports grouping, counting steps, and translation among representations. Bip, the workshop, exact cases, and interaction sequence are design interpretations.

## Observable learning objective

Given a bounded collection, the pupil performs valid exchanges between ten objects of one rank and one object of the next, preserves cardinality, and coordinates the resulting organization with written number structure.

## Prerequisites and vocabulary

- Count a small visible collection reliably.
- Read familiar natural numbers.
- Understand that a closed container can represent its contents.
- Essential French verbs: `assembler`, `ouvrir`, `empaqueter`, `déballer`, `palettiser`, `décharger`, `annuler`.

## Misconceptions and productive difficulty

Design hypotheses to observe:

- treating one container as one piece rather than its represented quantity;
- believing an exchange changes the total;
- stopping after one exchange when a rank still contains ten objects;
- omitting an empty rank in a positional representation.

Productive difficulty comes from reversible exchange, a two-stage cascade, a capacity constraint, repeated equal deliveries, and a required empty tens rank. Drag precision, timers, and hidden quantities are deliberately excluded.

## Evidence of learning

Potential evidence includes:

- selecting and executing an available inverse exchange for a stated constraint;
- predicting which rank will overflow next;
- using two successive exchanges to normalize 103;
- constructing three equal +10 deliveries to reach 300;
- explaining why several spatial organizations retain the same total.

Completion alone is not a mastery claim.

## Core mechanic hypothesis

> If the pupil directly reorganizes a visible reserve through reversible `10 ↔ 1` exchanges while the total, rank values, capacities, and consequences remain inspectable, then base-ten grouping can become a conservation relationship rather than a digit trick.

- **Primary verbs:** group, open, deliver, inspect, undo, reset.
- **State model:** four visible ranks worth 1’000, 100, 10, and 1, plus an invariant total.
- **Challenge source:** exact capacity, future rank overflow, useful organization, and repeated equal-step constraints.
- **Recovery:** blocked actions leave state unchanged and explain the missing precondition; every committed action can be undone; scenes can be reset.
- **Mechanical distinction:** unlike EX-0003, the pupil transforms spatial organization while preserving quantity rather than authoring a numeric procedure that changes it.

## Implemented progression

1. **Orientation — La porte est bloquée:** group 10 of 12 pieces into one sachet; opening a nonexistent sachet supplies a recoverable blocked-action path.
2. **Exploration — Deux formes:** open one of three sachets so `3 sachets + 4 pièces` becomes `2 sachets + 14 pièces` while remaining 34.
3. **Constraint/complication — Cascade:** group 10 of 13 pieces, then group the resulting 10 sachets, producing `1 caisse + 3 pièces = 103` with no rank above nine.
4. **Integration — Livraison:** choose three identical +10 deliveries so 270 passes through 280 and 290 to 300.
5. **Representation independence — Étiquette:** group 10 sachets in `1 palette + 2 caisses + 10 sachets + 6 pièces` to obtain the normalized organization of 1’306 with an empty tens rank.

This historical prototype expanded before the explicit gate existed; the sequence is documented, not newly authorized.

## Feedback and recovery

- The reserve updates immediately after each direct action.
- Blocked exchanges state the exact missing quantity/container and do not mutate state.
- Source and destination ranks, exchange event, total, and capacities remain visible.
- Undo restores the previous reserve and delivery history; reset restores the scene start.
- Success explains the invariant or positional relationship, not merely correctness.
- Bip is fallible; pupil identity is never framed as the error.

## Content model and ambiguity guards

Five authored scenes use exact integers. Rank values are fixed at 1, 10, 100, and 1’000. The total is computed from rank counts after every action. Exchange functions remove exactly ten lower-rank objects and add one higher-rank object, or perform the exact inverse. Delivery normalization repeatedly carries groups of ten. No floating point, random generation, or hidden answer-card data remains in the implementation.

## Interaction states

```text
intro → active workbench
active → blocked explanation → active
active → exchange/delivery → active or success
active → undo/reset → active
success → next scene or completion
```

## Accessibility and devices

- Native buttons support keyboard, pointer, and touch; no drag is required.
- Visual object counts are duplicated by written rank counts, values, total, equations, and accessible labels.
- Color and animation are supplemental.
- Focus is visible; live status copy announces action consequences.
- Reduced motion removes or compresses decorative transitions while preserving state changes.
- Narrow layouts stack controls and ranks without making horizontal scrolling part of the task.

## Motion and artwork decisions

These were added after mechanic redesign:

- exchange motion clarifies source/destination and blocked/undo events;
- Bip and workshop images support short narrative orientation;
- generated item images make rank objects easier to recognize.

Exact values, controls, capacities, and assessed state remain DOM/CSS. The sachet was regenerated from the actual piece reference after an early asset showed unrelated contents. Generated assets require exact-count/equivalence review at rendered size.

## Prototype boundaries

Included: five authored scenes, direct reversible exchanges through thousands, undo/reset, capacity and delivery constraints, synchronized rank/number representations, short narrative, and local completion.

Excluded: unrestricted drag layout, procedural content generation, scores, timers, identity, persistence, analytics, classroom result submission, and pupil-validation claims.

## Observation plan

Observe whether pupils inspect the represented quantity rather than object count alone; anticipate cascade; use inverse exchange productively; recognize the zero tens rank; and understand blocked feedback without interpreting it as punishment. The hypothesis is weakened if control labels, object art, or task prose reveal routes without reasoning about state.

## Findings and decisions

- **2026-07-15 — Rejected form:** the first implementation used `read → choose one answer → feedback`; see [`APP-0001`](../../../game-mechanics/applications/APP-0001-seq-n1-answer-loop-convergence.md).
- **2026-07-15 — Mechanic redesign:** direct reversible exchanges, visible rank state, delivery actions, blocked feedback, undo, and reset replaced answer selection.
- **2026-07-15 — Interaction-surface revision:** reserve and controls were connected through shared objects, exchange recipes, availability, source/destination emphasis, and tactile controls after owner feedback that the first redesign remained too textual/disconnected.
- **2026-07-15 — Historical gate:** positive iterative feedback was recorded, but no approval phrase existed during the original expansion.
- **2026-07-15 — Record synchronization:** removed unused answer-choice payloads and migrated final smoke hooks to the real mechanic controls.
- **2026-07-15 — Current owner gate:** after replaying the finished pilot, the owner called EX-0002 the reference-quality prototype and authorized recording `mechanic approved for expansion`. This current decision is not backdated.

## Final validation evidence

Final post-migration technical checks on 2026-07-15:

- `npm --prefix experiments run check` — passed; zero Svelte diagnostics; catalog valid (3 exercises).
- `SMOKE_EXERCISES=EX-0002,EX-0003 npm --prefix experiments run test:smoke` — 6/6 passed, including reduced-motion keyboard and 320 px touch paths through real exchange controls and a blocked-action recovery.
- `npm --prefix experiments run build` — passed.

These results establish technical readiness of the current path only. The owner mechanic gate is now recorded, but automated checks do not validate pupil understanding, French comprehension, or generated-image equivalence.

## Promotion criteria

The owner mechanic gate is now passed. Promotion beyond `prototyping` still requires observed pupil use showing that exchange clarifies conservation across fresh cases, understood French copy, accessible keyboard/touch operation, and clear separation between concept errors and interface friction.
