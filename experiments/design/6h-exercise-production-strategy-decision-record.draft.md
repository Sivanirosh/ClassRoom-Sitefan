---
title: 6H exercise production strategy
status: draft
revision: r0-interview-open
approved_on: null
readiness: not_ready
owners:
  - repository owner acting as product, classroom, and curriculum owner
---

# 6H Exercise Production Strategy

## Approval record

| Approver identifier | Accountable role | Approval scope | Revision/digest | Approved at | Disposition |
|---|---|---|---|---|---|

No replacement strategy is approved. This draft is resumable interview memory only.

## Revision history

| Revision | Date | Status | Material change | Author/editor |
|---|---|---|---|---|
| r0-interview-open | 2026-07-15 | Draft | Opened replacement-strategy grill after withdrawal of the bulk KD methodology | User and coding assistant |

## Executive intent

Define a production strategy that can create coherent, pedagogically strong, pupil-facing PER 5H–6H exercises without confusing technical completeness with content quality. The strategy must establish how concepts are selected, designed, critiqued, prototyped, tested, and only then scaled.

## Established context

- The target remains French-language interactive learning for pupils working toward 6H success across the selected PER domains.
- Authoritative PER research, source notes, and the curriculum coverage matrix remain available as evidence; they are not proof that an exercise is good.
- The previous method allocated three exercises to each of 37 curriculum clusters and attempted broad parallel production through Khazad-Doom.
- Twenty-four generated Geography prototypes passed catalog, Svelte/TypeScript, browser-path, responsive, and build checks, yet accountable owner review found that they lacked quality and coherence.
- Those 24 prototypes and the active bulk-production slice graph were deleted. The prior approved production record is withdrawn and historical only.

## Decision ledger

| ID | Decision | Rationale | Rejected alternatives | Owner | Revisit trigger |
|---|---|---|---|---|---|
| D-1 | Withdraw the bulk three-per-cluster KD production methodology | Generated output demonstrated that scale and technical gates did not produce acceptable content quality | Continue or resume the batch | Product/classroom owner | Only after a replacement strategy has evidence from approved exemplars |
| D-2 | Delete all generated Geography prototypes | Prevent weak prototypes from becoming accidental reference material or product content | Keep as active drafts | Product/classroom owner | Not applicable; Git history remains forensic evidence |
| D-3 | Preserve curriculum research, mappings, and technical smoke infrastructure | They remain useful evidence and verification tools, but carry no pedagogical approval | Delete all preparatory evidence | Product/classroom owner | If the grill finds source interpretation or harness assumptions unsound |

## Fact ledger

| ID | Fact | Evidence/source | Consequence |
|---|---|---|---|
| F-1 | Technical completeness did not predict owner-perceived quality or coherence | Owner review of generated Geography prototypes; prior successful catalog/check/smoke/build evidence | Replacement gates must evaluate concept, pedagogy, writing, interaction, and collection coherence before scale |
| F-2 | Parallel workers independently optimized local slice acceptance | Withdrawn slice graph and generated commit history | Local acceptance contracts alone cannot own collection-level creative direction |
| F-3 | The PER evidence base and curriculum map exist independently of the rejected prototypes | `experiments/curriculum/research/`; `experiments/curriculum/mappings/6h-coverage-matrix.json` | Curriculum coverage can be reused without reusing the production method |

## Hypothesis disposition

| ID | Hypothesis | Evidence sought | Disposition | Resulting item |
|---|---|---|---|---|
| H-1 | Three generic lenses per curriculum cluster reliably create depth and diversity | Owner review and prototype comparison | Rejected as a production rule | D-1 |
| H-2 | A detailed written contract plus independent automated review is enough to maintain pedagogical and creative quality at batch scale | Generated Geography collection | Rejected | F-1, F-2 |
| H-3 | A small number of deliberately authored and approved exemplars can establish a reusable quality grammar without becoming a generic template | Comparative review, teacher/pupil evidence, and successful adaptation to distinct concepts | Open | Q-1 and later pilot decisions |

## Open questions

| ID | Question | Blocking? | Owner | Resolution evidence |
|---|---|---|---|---|
| Q-1 | What human quality authority and approval gate must an exercise pass before any variants or parallel production begin? | Yes | Product/classroom owner | Explicit decision in the grill |
| Q-2 | What specifically made the rejected prototypes feel low-quality or incoherent? | Yes | Product/classroom owner with artifact-level examples if useful | Agreed failure taxonomy |
| Q-3 | What is the right production unit: one exercise, one concept family, one short sequence, or another unit? | Yes | Product/curriculum owner | Approved workflow and exemplar |
| Q-4 | Which evidence permits scale beyond the first exemplar? | Yes | Product/classroom owner | Named review and trial gates |

## Readiness declaration

**State:** `not_ready`

The prior strategy is withdrawn. Quality authority, failure taxonomy, production unit, exemplar policy, and scale-up evidence remain blocking decisions. No architecture, slices, or implementation should be generated from this draft.
