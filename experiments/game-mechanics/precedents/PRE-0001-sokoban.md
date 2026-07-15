---
id: PRE-0001
record_type: precedent
title: "Sokoban"
summary: "A very small push-only verb set creates deep planning because local moves change future reachability."
precedent_kind: digital-puzzle-game
publisher_or_creator: "Thinking Rabbit / Falcon"
primary_verbs:
  - move
  - push
  - plan
challenge_sources:
  - spatial-constraints
  - irreversible-local-actions
  - future-reachability
mechanics:
  - "[[MEC-0001-constrained-spatial-organization]]"
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/precedent
---

# PRE-0001 — Sokoban

## Why this record exists

Sokoban grounds the idea that a small, legible action vocabulary can create meaningful challenge through spatial consequences rather than answer selection.

## Source-backed loop

- **Player verbs:** move through a warehouse and push loads toward designated storage positions.
- **Constraints:** only one load can be pushed at once; multiple loads cannot be pushed together; loads cannot be pulled.
- **Completion:** loads must reach their designated positions.
- **Recovery:** the first-party rules page reviewed here does not document undo, restart, deadlock detection, or scoring.

## Transferable observations

A move can be locally legal while damaging future reachability. An educational adaptation can use this pattern when prediction, order, conservation, or spatial organization should be visible in the state itself.

This is a design interpretation, not evidence that Sokoban teaches a particular curriculum concept.

## Unknowns and cautions

- Do not claim a specific recovery loop from the cited source.
- Irreversibility can punish exploration; a classroom adaptation will usually need explicit undo/reset or reversible variants.
- Pixel movement and collision are not necessary parts of the transferable pattern.

## Sources

| Source | Owner/authority | Supports | Accessed |
|---|---|---|---|
| [Sokoban Official Site — Rules](https://sokoban.jp/rule.html) | Rights-holder rules page | Push-only constraints and completion objective | 2026-07-15 |

## Copying boundary

Do not copy level layouts, solutions, characters, marks, art, terminology, code, or visual presentation. Reuse only abstract planning and spatial-constraint principles in independently authored learning content.

## Related memory

- Mechanic: [[MEC-0001-constrained-spatial-organization]]
- Application: [[APP-0002-seq-n1-exchange-workbench]]
