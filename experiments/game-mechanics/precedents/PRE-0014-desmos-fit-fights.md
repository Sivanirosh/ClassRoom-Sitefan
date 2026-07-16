---
id: PRE-0014
record_type: precedent
title: "Desmos — Fit Fights"
summary: "A learner’s model receives visible interpretive feedback that shows how it misses distributed evidence without revealing the optimum, preserving iteration."
precedent_kind: interactive-learning-platform
publisher_or_creator: "Desmos"
primary_verbs:
  - position-model
  - commit
  - inspect-residuals
  - adjust
  - resubmit
challenge_sources:
  - model-fit
  - distributed-evidence
  - non-binary-feedback
mechanics:
  - "[[MEC-0005-commit-reveal-recalibrate]]"
  - "[[MEC-0007-budgeted-sampling-and-interval-narrowing]]"
created: 2026-07-16
updated: 2026-07-16
tags:
  - game-mechanics/record
  - game-mechanics/precedent
---

# PRE-0014 — Desmos: Fit Fights

## Why this record exists

Fit Fights is a design precedent for feedback that interprets a learner-created model and supports revision without displaying the answer.

## Source-backed loop

- **Action:** learners draw a line to fit a data set and can compare class responses.
- **Feedback:** Desmos interprets the line with a fit meter and visible residuals.
- **Design history:** the designers rejected a bare numerical score because its meaning was unclear and rejected showing the actual best-fit line because that would remove the opportunity to iterate.
- **Recovery:** residuals indicate how a line misses the data so the learner can adjust and resubmit.
- **Broader principle:** Desmos’s official design guide prefers interpretive feedback—showing how the system understands an answer—over only right/wrong evaluation.

## Transferable observations

Feedback can show where evidence strains an estimate or interval without immediately revealing exact ground truth. The consequence must remain causally visible; an opaque quality meter is not enough.

## Unknowns and cautions

- Line fitting is not collection estimation; only the feedback structure transfers.
- A meter can become score chasing or a hidden validator if disconnected from visible evidence.
- Class overlays and competition are not required and may conflict with private, dignified estimation.

## Sources

| Source | Owner/authority | Supports | Accessed |
|---|---|---|---|
| [Fit Fights design article](https://blog.desmos.com/articles/desmosify-fit-fights-fitting-lines/) | Desmos design team | Meter/residual feedback and rejected alternatives | 2026-07-16 |
| [Guide to Building Great Digital Math Activities](https://blog.desmos.com/articles/desmos-guide-to-building-great-digital-math-2021/) | Desmos design team | Interpretive rather than merely evaluative feedback | 2026-07-16 |

## Copying boundary

Reuse only the principle of visible interpretive feedback that preserves revision. Do not copy lesson data, prompts, Fit-o-Meter design or phrasing, residual graphics, class-overlay presentation, screen composition, branding, or code.

## Related memory

- Mechanics: [[MEC-0005-commit-reveal-recalibrate]], [[MEC-0007-budgeted-sampling-and-interval-narrowing]]
- Applications:
