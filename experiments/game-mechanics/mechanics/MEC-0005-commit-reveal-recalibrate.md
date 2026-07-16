---
id: MEC-0005
record_type: mechanic
title: "Commit, reveal evidence, recalibrate"
summary: "The player records an uncertain prediction and bounds before explanatory evidence appears, then compares, revises, and transfers rather than receiving only a verdict."
state_model: uncertainty-interval
primary_verbs:
  - estimate
  - bracket
  - commit
  - inspect-evidence
  - revise
  - explain
challenge_sources:
  - incomplete-information
  - uncertainty-calibration
  - precision-coverage-tradeoff
recovery_patterns:
  - staged-evidence-reveal
  - preserved-before-after-state
  - one-reasoned-revision
learning_affordances:
  - bounded-estimation
  - metacognitive-calibration
  - evidence-based-revision
  - uncertainty-language
precedents:
  - "[[PRE-0008-estimation-180]]"
  - "[[PRE-0009-nrich-a-jar-of-teddies]]"
  - "[[PRE-0010-panamath]]"
  - "[[PRE-0014-desmos-fit-fights]]"
created: 2026-07-16
updated: 2026-07-16
tags:
  - game-mechanics/record
  - game-mechanics/mechanic
---

# MEC-0005 — Commit, reveal evidence, recalibrate

## Pattern

Require a visible commitment under uncertainty before revealing structured evidence. Preserve the original estimate and bounds, show how evidence supports or strains them, permit a reasoned revision, and then test transfer on a related case.

## Core loop

```text
inspect bounded ambiguous evidence
→ choose an anchor and commit estimate/bounds
→ reveal explanatory structure, not only truth
→ compare attempt with evidence
→ revise or justify
→ transfer with changed evidence
```

## Meaningful decisions

The player chooses which evidence or reference matters, how wide an interval should be, and which bound to move after new information. The trade-off is not “guess closer”; it is coverage versus informativeness under incomplete evidence.

## Challenge structure

- **Source of challenge:** uncertain evidence and a precision–coverage trade-off.
- **State representation:** original estimate, lower/upper bounds, revealed evidence, revised state, and eventual ground truth.
- **Failure/information:** evidence identifies overflow, slack, missing groups, or a bound conflict.
- **Recovery:** preserve the first attempt and allow one or more evidence-grounded revisions before transfer.
- **Sources of depth:** reference quality, evidence staging, clustering, support fading, and changed representation.

## Potential learning affordances

- Distinguish an estimate from an exact answer.
- Give lower/upper-bound language a functional role.
- Make revision from evidence visible and dignified.
- Separate “contained the truth” from “was usefully precise.”

These are design hypotheses, not evidence of learning effectiveness.

## Poor fits and risks

- If feedback continuously signals hotter/colder while bounds move, play collapses into slider search.
- If the widest interval always wins, there is no meaningful calibration decision.
- If a timer or brief display is mandatory, visual memory or speed may replace estimation.
- If the reveal only displays the exact number, it cannot explain why the attempt drifted.
- Repeated scoring of error can turn calibration into anxiety or public comparison.

## Adaptation questions

- What must the pupil commit before evidence appears?
- Which evidence explains each bound rather than merely revealing truth?
- How is a defensible interval distinguished from an arbitrary wide one?
- What remains available for pupils who cannot use brief visual exposure?
- What changed case tests transfer after revision?

## Related memory

- Precedents: [[PRE-0008-estimation-180]], [[PRE-0009-nrich-a-jar-of-teddies]], [[PRE-0010-panamath]], [[PRE-0014-desmos-fit-fights]]
- Applications: [[APP-0004-num02-semantic-fit-rejection]]
