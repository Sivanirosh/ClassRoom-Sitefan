---
id: APP-0002
record_type: application
title: "SEQ-N1 — reversible exchange workbench"
summary: "The grouping prototype became a coherent workbench where pupils directly group, open, deliver, undo, and reorganize base-ten quantities."
sequence_id: SEQ-N1
exercise_ids:
  - EX-0002
mechanics:
  - "[[MEC-0001-constrained-spatial-organization]]"
  - "[[MEC-0004-action-first-interactive-learning]]"
precedents:
  - "[[PRE-0001-sokoban]]"
  - "[[PRE-0002-wilmots-warehouse]]"
  - "[[PRE-0003-unpacking]]"
  - "[[PRE-0007-brilliant]]"
outcome: refined-completed-retrospective
owner_gate: retrospective-not-recorded
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/application
---

# APP-0002 — SEQ-N1 — reversible exchange workbench

## Learning target

Group and ungroup units, tens, hundreds, and thousands while preserving cardinality and coordinating the material organization with written number structure.

## Adaptation hypothesis

Direct reversible exchanges would make conservation visible through action. Spatial and capacity constraints would make organization useful rather than decorative.

## Implemented loop

```text
inspect reserve and constraint → group/open/deliver
→ inspect conserved quantity and changed organization
→ undo or continue reorganizing → satisfy scene constraint
```

The final implementation provides explicit base-ten actions, availability state, undo/reset, visible quantities, and direct feedback on the reserve.

## Owner observations and implementation response

1. The retrospective records that the redesigned workbench felt better than the answer-card version.
2. The owner found the first reserve/actions presentation too textual and visually disconnected.
3. The owner asked for more intuitive actions, one coherent surface, and objects understandable without relying on prose.
4. In response, a later interaction-surface pass connected objects and controls through visual pieces/containers, exchange recipes, availability, source/destination emphasis, blocked-action feedback, and tactile controls.

The new explicit approval phrase was not used during this historical iteration. `owner_gate` therefore remains `retrospective-not-recorded`.

## Revisions and rejected forms

- Rejected central answer-card loop: see [[APP-0001-seq-n1-answer-loop-convergence]].
- Replaced disconnected text controls with object-linked exchange controls.
- Kept motion restrained so pupils could continue counting and inspecting state.
- Used generated raster assets for Bip, inventory objects, and narrative scenes while retaining exact quantities and controls in DOM/CSS.
- Regenerated the sachet from the actual piece reference after the first image contained visually unrelated objects.

## Reusable lessons

- **What worked:** inverse actions, visible invariant quantity, capacity constraints, direct manipulation, coherent reserve/action surface.
- **What failed:** text-heavy controls detached from the represented objects.
- **Reuse when:** conservation, equivalence, regrouping, capacity, or representation changes should remain visible.
- **Avoid when:** spatial arrangement does not express the target relationship.
- **Asset lesson:** generated objects require exact-count and mathematical-equivalence review at rendered size.

## Validation and accessibility notes

Undo/reset and discrete native controls avoid drag precision. On 2026-07-15 the smoke harness was migrated to mechanic-neutral control plans; the workbench passed reduced-motion keyboard and 320 px touch traversal through its real exchange/delivery controls, including a blocked-action recovery. This is technical evidence, not pupil validation.

## Related artifacts

- Retrospective: [`../../Notes-to-take-to-improve-workflow.txt.txt`](../../Notes-to-take-to-improve-workflow.txt.txt)
- Exercise design: [`../../src/exercises/ex-0002-bip-exchange-workshop/DESIGN.md`](../../src/exercises/ex-0002-bip-exchange-workshop/DESIGN.md)
- Prototype: [`../../src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte`](../../src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte)
