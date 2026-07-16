---
id: MEC-0006
record_type: mechanic
title: "Benchmark chunking and bracketing"
summary: "The player selects and composes known-size spatial units against an unknown collection, then brackets it from full chunks and a visible remainder before exact regrouping."
state_model: spatial-benchmark
primary_verbs:
  - select-reference
  - place
  - compose
  - repeat
  - bracket
  - regroup
challenge_sources:
  - reference-selection
  - unit-iteration
  - full-groups-and-remainder
recovery_patterns:
  - visible-shortfall-or-overflow
  - replace-reference
  - exact-regrouping-audit
learning_affordances:
  - benchmark-quantity-reasoning
  - multiplicative-estimation
  - interval-construction
  - organized-counting-handoff
precedents:
  - "[[PRE-0009-nrich-a-jar-of-teddies]]"
  - "[[PRE-0011-number-frames]]"
  - "[[PRE-0012-dragonbox-numbers]]"
created: 2026-07-16
updated: 2026-07-16
tags:
  - game-mechanics/record
  - game-mechanics/mechanic
---

# MEC-0006 — Benchmark chunking and bracketing

## Pattern

Give the player known-size reference collections or frames that can be positioned, composed, or mentally iterated against an unknown whole. The player uses completed reference groups plus a shortfall/remainder to set bounds, then verifies by reorganizing the actual collection.

## Core loop

```text
inspect unknown collection
→ choose a known-size reference
→ position/compose/iterate the reference
→ infer full chunks plus shortfall or remainder
→ commit lower and upper bounds
→ regroup the real collection to audit the estimate
```

## Meaningful decisions

The player chooses which benchmark size is useful, how many copies plausibly fit, whether the next copy would overflow, and how the visible remainder should affect each bound. A poor reference is recoverable but costs clarity or an action.

## Challenge structure

- **Source of challenge:** matching an irregular whole to repeatable known units without exact enumeration.
- **State representation:** unknown collection, known benchmark unit(s), composed chunks, remainder/shortfall, and two bounds.
- **Failure/information:** visible overflow, uncovered area, inconsistent density, or a grouped reveal outside one bound.
- **Recovery:** replace the reference, adjust the number of chunks, or verify through exact regrouping.
- **Sources of depth:** reference choice, non-multiple remainders, clustering, controlled density changes, and support fading.

## Potential learning affordances

- Connect organized counting groups to approximate quantity reasoning.
- Make “more than N groups but less than N+1 groups” visible.
- Support multiplicative/additive estimation without requiring a single exact guess.
- Hand full-group/remainder evidence into later place-value comparison.

These are design hypotheses, not validation claims.

## Poor fits and risks

- Matching footprint or area to quantity is invalid when object size or density differs.
- Auto-snapping every object into a cell turns the activity into disguised exact counting.
- Showing too many benchmark choices can make tool selection harder than the mathematics.
- A permanent complete frame may reveal the exact count before the pupil estimates.
- Drag-only placement introduces motor precision as accidental difficulty.

## Adaptation questions

- Which benchmark sizes follow from prior organized counting?
- How is density controlled or explicitly compared?
- What makes one reference more informative than another?
- Which evidence supports each bound separately?
- When does exact regrouping become available, and how does it preserve the initial reasoning trace?

## Related memory

- Precedents: [[PRE-0009-nrich-a-jar-of-teddies]], [[PRE-0011-number-frames]], [[PRE-0012-dragonbox-numbers]]
- Applications: [[APP-0004-num02-semantic-fit-rejection]]
