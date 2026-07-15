---
id: APP-0003
record_type: application
title: "SEQ-N1 — transformation command console"
summary: "The transformation prototype became a command sequencer with execution traces, meaningful checkpoints, and editable debugging."
sequence_id: SEQ-N1
exercise_ids:
  - EX-0003
mechanics:
  - "[[MEC-0002-program-execute-inspect-revise]]"
  - "[[MEC-0003-telegraphed-consequences-and-checkpoints]]"
  - "[[MEC-0004-action-first-interactive-learning]]"
precedents:
  - "[[PRE-0004-human-resource-machine]]"
  - "[[PRE-0005-opus-magnum]]"
  - "[[PRE-0006-into-the-breach]]"
  - "[[PRE-0007-brilliant]]"
outcome: coherent-simplification-ready-for-owner-replay
owner_gate: revise-same-mechanic
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/application
---

# APP-0003 — SEQ-N1 — transformation command console

## Learning target

Predict and explain transformations by ±1, ±10, ±100, and ±1’000, including place-value crossings, degrouping, and ordered intermediate states.

## Adaptation hypothesis

Letting pupils build and execute commands would externalize place-value transformations. Editable traces would turn plausible mistakes into debuggable processes rather than wrong answer labels.

## Implemented loop

```text
inspect current number, target, and checkpoints
→ add/order commands in slots → execute or step through
→ inspect intermediate trace → remove/reorder/replace commands
→ satisfy checkpoints and final target
```

## Retrospective findings

- The owner identified the original answer-card console as mechanically indistinguishable from the workshop.
- The redesign produced a procedural loop built from programming, execution, inspection, and repair.
- Ordered checkpoints were necessary because arithmetic commands often commute; without a required intermediate state, command order would offer false strategic depth.
- The execution trace needed to remain visible and editable so feedback explained the route rather than only the final number.
- **2026-07-15 owner replay:** the owner said the interface direction was correct, but too much information competed at once. EX-0003 needed a more coherent game surface and the same level of finish as EX-0002 while preserving its procedural mechanic.
- **Current disposition:** revise the same mechanic. Preserve `program → execute → inspect → repair`, but simplify its hierarchy and progressively reveal secondary explanation.

No `mechanic approved for expansion` phrase has been granted for EX-0003.

## Revisions and rejected forms

- Rejected central answer-card loop: see [[APP-0001-seq-n1-answer-loop-convergence]].
- Replaced answer selection with command slots, execution, step-through, reordering, removal, checkpoints, and trace inspection.
- Added a preloaded faulty program for repair.
- Used deterministic intermediate states to make exchange and degrouping inspectable.
- Kept generated imagery narrative/decorative; commands, numbers, checkpoints, and traces remain DOM/CSS.
- Replaced the split display/programmer panels with one route machine: start, command slots, ordered checkpoints, intermediate results, and target now form one causal line.
- Removed duplicate machine jargon and command codes, compacted the place-value scanner, hid edit affordances when irrelevant, and moved the full success explanation behind an optional disclosure.

## Reusable lessons

- **What worked:** bounded command vocabulary, visible intermediate states, editable programs, deterministic traces, concept-driven checkpoints.
- **What failed:** sequencing without a meaningful intermediate constraint; it only pretends order matters.
- **Reuse when:** procedure, order, transformation, debugging, or route comparison is central.
- **Avoid when:** one direct action expresses the concept more honestly or command syntax dominates the reasoning.

## Validation and accessibility notes

Discrete buttons support keyboard and touch. After the coherent-simplification pass on 2026-07-15, the console passed reduced-motion keyboard and 320 px touch traversal through its real route/command controls, including step-through execution, an empty-program recovery, wrong-order repair, removal of a preloaded error, and all authored checkpoints. French comprehension and assistive-technology use remain manual/pupil-testing questions.

## Related artifacts

- Retrospective: [`../../Notes-to-take-to-improve-workflow.txt.txt`](../../Notes-to-take-to-improve-workflow.txt.txt)
- Exercise design: [`../../src/exercises/ex-0003-bip-transformation-console/DESIGN.md`](../../src/exercises/ex-0003-bip-transformation-console/DESIGN.md)
- Prototype: [`../../src/exercises/ex-0003-bip-transformation-console/Prototype.svelte`](../../src/exercises/ex-0003-bip-transformation-console/Prototype.svelte)
