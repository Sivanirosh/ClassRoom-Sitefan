---
id: PRE-0004
record_type: precedent
title: "Human Resource Machine"
summary: "A small visual instruction set lets players program, run, inspect, and refine transformations of visible state."
precedent_kind: digital-programming-puzzle
publisher_or_creator: "Tomorrow Corporation"
primary_verbs:
  - arrange-commands
  - execute
  - inspect
  - optimize
challenge_sources:
  - constrained-instruction-set
  - state-transformation
  - program-correctness
  - optional-efficiency
mechanics:
  - "[[MEC-0002-program-execute-inspect-revise]]"
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/precedent
---

# PRE-0004 — Human Resource Machine

## Why this record exists

This precedent grounds command sequencing as an inspectable reasoning activity rather than a multiple-choice representation of a finished answer.

## Source-backed loop

- **Player verbs:** drag and arrange commands to automate an office worker moving and transforming data between input, memory, and output.
- **State model:** inbox/outbox, floor locations as memory, and a worker carrying one box.
- **Progression:** the instruction language begins very small and expands gradually.
- **Completion:** a program that satisfies the assigned task completes the level.
- **Refinement:** optional goals compare program size and execution speed after functional correctness.
- **Recovery:** the cited page does not specify stepping, exact errors, undo, or reset controls.

## Transferable observations

Externalized commands and state allow a pupil to predict, execute, inspect a trace, and revise. Correctness can be separated from optional efficiency, preserving multiple valid strategies.

## Unknowns and cautions

- Exact debugging UI and error behavior are not established here.
- Command syntax can create unnecessary reading or working-memory load.
- An educational adaptation should expose the target relationship in each executed step, not merely imitate programming aesthetics.

## Sources

| Source | Owner/authority | Supports | Accessed |
|---|---|---|---|
| [Human Resource Machine](https://tomorrowcorporation.com/humanresourcemachine) | Developer product/design page | Computational model, command progression, success and optimization goals | 2026-07-15 |

## Copying boundary

Do not copy levels, commands as expressed, tasks, solutions, characters, office setting, writing, art, sounds, UI, or code. Use independently designed commands and representations tied to the learning concept.

## Related memory

- Mechanic: [[MEC-0002-program-execute-inspect-revise]]
- Application: [[APP-0003-seq-n1-transformation-console]]
