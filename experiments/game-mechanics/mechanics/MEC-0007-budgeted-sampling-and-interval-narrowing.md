---
id: MEC-0007
record_type: mechanic
title: "Budgeted sampling and interval narrowing"
summary: "The player spends a small observation budget on chosen windows or probes, preserves partial evidence, and decides when to narrow and commit an interval."
state_model: partial-information-map
primary_verbs:
  - choose-window
  - sample
  - record-evidence
  - narrow
  - commit
  - revise
challenge_sources:
  - information-budget
  - probe-quality
  - sample-representativeness
recovery_patterns:
  - persistent-evidence-log
  - informative-failed-commitment
  - one-extra-probe
learning_affordances:
  - evidence-selection
  - interval-refinement
  - uncertainty-reasoning
  - strategy-comparison
precedents:
  - "[[PRE-0013-the-search-for-planet-x]]"
  - "[[PRE-0014-desmos-fit-fights]]"
created: 2026-07-16
updated: 2026-07-16
tags:
  - game-mechanics/record
  - game-mechanics/mechanic
---

# MEC-0007 — Budgeted sampling and interval narrowing

## Pattern

Keep most of a system hidden. Give the player a small budget of observation windows or concrete probes, preserve every result, and let the player narrow a visible interval after each sample before deciding when evidence is sufficient to commit.

## Core loop

```text
choose where/how precisely to inspect
→ spend an observation resource
→ receive partial, persistent evidence
→ update lower/upper bounds
→ sample again or commit
→ inspect which evidence supports or conflicts with the interval
```

## Meaningful decisions

The player chooses which region to sample, whether a broad or precise observation is worth its cost, how representative the evidence appears, and whether another observation is more valuable than committing now.

## Challenge structure

- **Source of challenge:** information efficiency under uncertainty, not answer recall.
- **State representation:** concealed whole, available windows/probes, observation budget, evidence log, and current interval.
- **Failure/information:** a sample or grouped reveal shows which bound conflicts with observed density or structure.
- **Recovery:** preserve evidence, grant a bounded extra probe or revision, and return to interval narrowing.
- **Sources of depth:** distribution regularity, window size/cost, evidence persistence, support fading, and representativeness cues.

## Potential learning affordances

- Make evidence selection an explicit part of estimation.
- Externalize how several samples change an interval.
- Compare a first global guess with a model updated from chosen evidence.
- Support discussion of uncertainty without requiring formal probability.

These are hypotheses. The pattern does not establish statistical validity or 6H suitability.

## Poor fits and risks

- Exact counts from every window may turn the loop into mechanical addition.
- Highly uneven or hidden distributions can punish reasonable inference.
- Too many windows, marks, or resource rules can overwhelm the target mathematics.
- Timed peeks can measure visual memory or motor speed.
- “Possible” must not be presented as statistically likely without evidence.
- A black-box quality meter recreates answer checking instead of interpretation.

## Adaptation questions

- What partial evidence is informative without exposing an exact subtotal?
- How does the interface communicate whether a sample is representative?
- Why are narrow and broad probes differently useful?
- What persists after each observation?
- How can an incorrect commitment produce evidence rather than punishment?
- What non-timed mode preserves the core decision?

## Related memory

- Precedents: [[PRE-0013-the-search-for-planet-x]], [[PRE-0014-desmos-fit-fights]]
- Applications: [[APP-0004-num02-semantic-fit-rejection]]
