---
id: APP-0004
record_type: application
title: "SEQ-N2 / NUM-02 — semantic-fit rejection"
summary: "Three estimation directions were rejected before catalog grayboxing because their player actions did not embody a clear, approved learning process."
sequence_id: SEQ-N2
checkpoint_ids:
  - NUM-02
gate_scope: SEQ-N2/NUM-02
exercise_ids: []
mechanics:
  - "[[MEC-0005-commit-reveal-recalibrate]]"
  - "[[MEC-0006-benchmark-chunking-and-bracketing]]"
  - "[[MEC-0007-budgeted-sampling-and-interval-narrowing]]"
precedents:
  - "[[PRE-0008-estimation-180]]"
  - "[[PRE-0009-nrich-a-jar-of-teddies]]"
  - "[[PRE-0011-number-frames]]"
outcome: rejected-before-catalog-graybox
owner_gate: reject-all-and-pause
created: 2026-07-16
updated: 2026-07-16
tags:
  - game-mechanics/record
  - game-mechanics/application
  - game-mechanics/rejected
---

# APP-0004 — SEQ-N2 / NUM-02 — semantic-fit rejection

## Learning target under review

The draft brief interpreted PER `P22.03` as using a known collection reference to estimate an unknown collection before exact counting, initially represented through lower and upper bounds.

## Adaptation hypotheses tested

Three paper directions and one temporary micro-loop for each attempted to express that interpretation through:

- transient global observation followed by commitment and recalibration;
- composition of known-size collection references followed by regrouping;
- budgeted observation followed by interval narrowing.

No direction reached a catalog graybox. The A/B/C comparison was an owner-requested selection aid and was deleted after disposition.

## Implemented loops

The micro-loops reduced the directions to observable controls but exposed that the central pupil actions were still generic interface operations: selecting references, adjusting bounds, opening zones, and revealing a total. The software could run, preserve state, and support recovery, but those facts did not establish a meaningful learning mechanic.

## Owner findings

- **2026-07-16, `SEQ-N2 / NUM-02`:** the owner rejected the implemented directions as poor and not good enough to continue.
- The owner clarified that the mechanics did not serve a clear learning goal and were not semantically aligned with what pupils should learn.
- The owner judged the learning-first design loop promising but rejected the phase that generated three mechanic variations before the learning outcome and expected cognition were approved.
- `Fenêtre calibrée` was not retained for the benchmark-learning goal.
- The owner required the LLM to state one precise core-learning sentence and a successful-pupil statement first; then cite established classroom task/problem precedents and explain the expected cognitive process plus each candidate mechanic’s semantic fit.
- One or more owner-approved mechanic rationales may proceed directly to low-fi catalog grayboxes. A fixed count of three and throwaway pre-graybox prototypes are no longer required.
- `NUM-02` was paused; the bounded measurement pair `MES-01 → MES-02` became the active workflow pilot.

No `mechanic approved for expansion` phrase was granted.

## Revisions and rejected forms

- Rejected A — `Fenêtre calibrée`: the window constrained observation but did not itself embody the intended learning operation; timing risked substituting memory or speed.
- Rejected B — `Gabarits de collection`: the implemented controls made the reference feel like arithmetic or interface decoration rather than an indispensable reasoning action.
- Rejected C — `Bandes d’enquête`: evidence-budget management competed with the collection-estimation target.
- Rejected process form: exactly three paper mechanics followed by throwaway comparison prototypes before explicit learning-goal and cognitive-process approval.

These findings reject the adaptations as presented. They do not prove that every abstract `MEC-*` pattern or cited classroom task is ineffective.

## Reusable lessons

- **What worked:** early owner replay kept the failure cheap; exact scope and authority prevented accidental expansion.
- **What failed:** implementation began before one concise learning outcome and successful-pupil statement were approved; UI-operable loops were mistaken for semantically aligned mechanics.
- **Reuse when:** use this record as a stop signal when a mechanic rationale cannot map each pupil action and system consequence to one step in the expected cognition.
- **Avoid when:** do not generate a fixed quota of original mechanic ideas or code small prototypes merely to make an unclear learning target feel concrete.
- Start from established classroom problem/task families. Add game purpose and consequences without changing the governing mathematics.
- Technical validation establishes operability only; it cannot compensate for semantic mismatch.

## Validation and accessibility notes

The deleted comparison received desktop/mobile technical replay and read-only review. Those checks established only that the loops were operable. No pupil learning, fun, French comprehension, classroom suitability, or equivalent accessibility evidence was produced.

## Related artifacts

- Brief: [`../../design/sequences/seq-n2/num-02/LEARNING-BRIEF.md`](../../design/sequences/seq-n2/num-02/LEARNING-BRIEF.md)
- Rejected pitch record: [`../../design/sequences/seq-n2/num-02/MECHANIC-PITCHES.md`](../../design/sequences/seq-n2/num-02/MECHANIC-PITCHES.md)
- Spine: [`../../design/sequences/seq-n2/SEQUENCE-SPINE.md`](../../design/sequences/seq-n2/SEQUENCE-SPINE.md)
- Task-precedent boundary research: [`../../curriculum/research/num-02-and-paving-task-precedents.md`](../../curriculum/research/num-02-and-paving-task-precedents.md)
- Graybox script: not authorized or created
- Catalog exercise: not created
