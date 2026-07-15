---
id: MEC-0003
record_type: mechanic
title: "Telegraphed consequences and ordered checkpoints"
summary: "The system previews deterministic consequences, then asks the player to intervene under constraints while preserving required intermediate states."
state_model: deterministic-preview
primary_verbs:
  - inspect-preview
  - predict
  - intervene
  - sequence
  - verify
challenge_sources:
  - visible-future-consequences
  - limited-interventions
  - competing-constraints
  - ordered-checkpoints
recovery_patterns:
  - revise-before-commit
  - replay-trace
  - reset-turn
learning_affordances:
  - prediction
  - ordered-reasoning
  - consequence-analysis
  - strategic-validation
precedents:
  - "[[PRE-0006-into-the-breach]]"
created: 2026-07-15
updated: 2026-07-15
tags:
  - game-mechanics/record
  - game-mechanics/mechanic
---

# MEC-0003 — Telegraphed consequences and ordered checkpoints

## Pattern

Before commitment, the system reveals what each process will do. The challenge is not guessing hidden behavior; it is finding a bounded intervention or sequence that changes the visible future while satisfying intermediate constraints.

## Core loop

```text
inspect announced consequences → predict resulting states
→ choose limited interventions/order → preview or execute
→ verify checkpoints and final state → revise
```

## Meaningful decisions

- Which visible consequence is most important to alter?
- Which intervention resolves more than one constraint?
- What order reaches required intermediate states?
- When are two routes equivalent, and when does a checkpoint distinguish them?

## Challenge structure

- **State representation:** current state, announced next states, ordered checkpoints, and final target.
- **Challenge:** limited interventions and competing constraints.
- **Failure information:** identify the checkpoint or consequence that remained unsatisfied.
- **Recovery:** revise before commitment where possible; replay deterministic traces after execution.
- **Depth:** interacting consequences, not concealed randomness.

## Potential learning affordances

- Invite prediction before calculation or manipulation.
- Make order matter honestly when operations otherwise commute.
- Support validation through intermediate evidence rather than final correctness alone.
- Let pupils compare routes by consequences.

## Poor fits and risks

- Dense previews can overwhelm younger pupils.
- Decorative threat framing can introduce unnecessary urgency.
- If the preview gives away the complete reasoning, the pupil only follows instructions.
- Checkpoints added without conceptual meaning manufacture difficulty.

## Adaptation questions

- Which consequence should be visible before commitment?
- Which checkpoint corresponds to an actual learning relationship?
- How many simultaneous constraints remain readable?
- What can be revised without punishment?

## Related memory

- Precedent: [[PRE-0006-into-the-breach]]
- Application: [[APP-0003-seq-n1-transformation-console]]
