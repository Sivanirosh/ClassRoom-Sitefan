---
id: MEC-0002
record_type: mechanic
title: "Program, execute, inspect, revise"
summary: "Players author a bounded sequence of operations, execute it against visible state, inspect the trace, and edit the program."
state_model: procedural
primary_verbs:
  - select-command
  - order
  - execute
  - inspect-trace
  - revise
challenge_sources:
  - constrained-instruction-set
  - ordered-state-transformation
  - debugging
  - optional-optimization
recovery_patterns:
  - edit-program
  - reorder
  - step-through
  - clear-and-retry
learning_affordances:
  - procedural-reasoning
  - place-value-transformation
  - cause-and-effect
  - debugging
precedents:
  - "[[PRE-0004-human-resource-machine]]"
  - "[[PRE-0005-opus-magnum]]"
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/mechanic
---

# MEC-0002 — Program, execute, inspect, revise

## Pattern

The learner constructs a process rather than selecting its final result. Execution externalizes every state change, making mistakes inspectable and repairable.

## Core loop

```text
inspect start and target → assemble bounded operations
→ execute or step through → inspect trace/checkpoints
→ reorder, replace, or remove operations → execute again
```

## Meaningful decisions

- Which operation is needed?
- In what order should operations occur?
- Which intermediate state must be reached?
- Is the process merely correct, or also clear/efficient under an optional goal?

## Challenge structure

- **State representation:** command slots plus synchronized intermediate states.
- **Challenge:** limited commands, ordered transformations, checkpoints, or several valid routes.
- **Failure information:** show the executed trace and first violated target/checkpoint.
- **Recovery:** keep the program editable; permit reorder, delete, step-through, and clear.
- **Depth:** operation interaction and intermediate constraints, not syntax trivia.

## Potential learning affordances

- Make causal order and intermediate mathematical states visible.
- Turn plausible errors into debuggable artifacts outside the pupil.
- Separate a valid method from optional efficiency.
- Coordinate symbolic commands with concrete or positional representations.

## Poor fits and risks

- Commands can overload reading and working memory.
- If operations commute and no checkpoint distinguishes their order, sequencing creates false strategic depth.
- A single command chosen from prepared answers is not programming.
- Hidden execution rules make failure opaque.
- Optimization scores can displace the learning objective.

## Adaptation questions

- Which intermediate states make ordering matter honestly?
- What trace will identify the first useful point of divergence?
- How small can the instruction vocabulary remain?
- Which representations update synchronously during execution?

## Related memory

- Precedents: [[PRE-0004-human-resource-machine]], [[PRE-0005-opus-magnum]]
- Application: [[APP-0003-seq-n1-transformation-console]]
