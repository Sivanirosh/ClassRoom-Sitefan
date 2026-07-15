---
id: MEC-0001
record_type: mechanic
title: "Constrained spatial organization"
summary: "Players directly reorganize visible objects, then discover whether the arrangement preserves invariants and satisfies meaningful spatial or retrieval constraints."
state_model: spatial
primary_verbs:
  - move
  - group
  - open
  - place
  - retrieve
challenge_sources:
  - spatial-constraints
  - future-reachability
  - conservation
  - usable-organization
recovery_patterns:
  - undo
  - reverse-action
  - reset
learning_affordances:
  - grouping-and-conservation
  - classification
  - representation-coordination
  - planning
precedents:
  - "[[PRE-0001-sokoban]]"
  - "[[PRE-0002-wilmots-warehouse]]"
  - "[[PRE-0003-unpacking]]"
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/mechanic
---

# MEC-0001 — Constrained spatial organization

## Pattern

The learner changes a visible arrangement directly. Success depends on preserving a relationship or making the organization useful under a later constraint, not on recognizing the teacher's answer card.

The source precedents contribute different forms:

- Sokoban: local moves affect future reachability.
- Wilmot's Warehouse: the player authors an organization that later faces retrieval demands.
- Unpacking: contextual fit permits several arrangements within meaningful constraints.

## Core loop

```text
inspect visible state → move/group/open/place
→ observe conserved and changed properties
→ test a spatial, capacity, contextual, or retrieval constraint
→ undo, reverse, or reorganize
```

## Meaningful decisions

- Which objects or ranks should be grouped?
- Which locally legal move preserves future options?
- Which organization makes the relationship easiest to inspect or use?
- When should a grouping be reversed?

## Challenge structure

- **State representation:** visible objects, containers, regions, capacity, and explicit quantities.
- **Challenge:** limited space, capacity, reachability, valid equivalence, or later retrieval.
- **Failure information:** the resulting state shows what was blocked, lost, duplicated, or made unusable.
- **Recovery:** explicit undo, inverse exchange, or reset should be cheap in learning adaptations.
- **Depth:** compound constraints and representation changes—not arbitrary drag precision.

## Potential learning affordances

- Make conservation visible while organization changes.
- Coordinate concrete groups with positional or symbolic representations.
- Let pupils devise and explain grouping/classification strategies.
- Expose why an arrangement is useful rather than merely whether it matches a picture.

These are adaptation hypotheses, not learning-effectiveness claims.

## Poor fits and risks

- Dragging without a keyboard/touch alternative turns motor precision into false concept evidence.
- Decorative containers can obscure exact quantity.
- Irreversible failure can punish exploration.
- If the only meaningful action is choosing one of three prepared arrangements, the mechanic has collapsed back into answer selection.
- Spatial work is a poor fit when the target relationship is primarily temporal or procedural.

## Adaptation questions

- What invariant must remain inspectable after every action?
- What constraint makes organization strategically meaningful?
- Which inverse action teaches rather than merely resets?
- How will exact quantities remain accessible without relying on artwork?

## Related memory

- Precedents: [[PRE-0001-sokoban]], [[PRE-0002-wilmots-warehouse]], [[PRE-0003-unpacking]]
- Application: [[APP-0002-seq-n1-exchange-workbench]]
