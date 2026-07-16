# SEQ-N2 spine and NUM-02 pitches — independent review disposition

**Review date:** 2026-07-16
**Review mode:** three independent, read-only reviews of the learning brief, mechanic pitches, and workflow/authority consistency
**Disposition status:** structural findings addressed; revised sequence spine owner-approved; all A/B/C mechanic directions owner-rejected and `NUM-02` paused on 2026-07-16

## Scope reviewed

- the proposed full `SEQ-N2` learning spine;
- the focused `NUM-02` learning objective, evidence, accessibility boundaries, and downstream handoff;
- exactly three `NUM-02` mechanic pitches and their mechanics-memory lineage;
- roadmap Markdown/JSON authority, the prototype workflow, and sequence templates.

## Material findings

### 1. Original N2 authority was not dependency-closed — blocker

The original bounded scope named `NUM-02`, `NUM-05`, `NUM-06`, `NUM-07`, and external prerequisite `NUM-01`. The roadmap simultaneously required:

- `NUM-04` before `NUM-05`;
- `NUM-03` and `NUM-04` before `NUM-07`.

Membership authority therefore could not be described as a production-ready sequence spine. This did not invalidate the local `NUM-01 → NUM-02` route, but it blocked a full-spine approval claim.

### 2. Curriculum traceability was too deep for NUM-02 and too thin later — major

The combined brief needed direct checkpoint-level traceability for:

- `NUM-05`: `P22.07`, `E6-22.04`;
- `NUM-06`: `P22.08`;
- the then-proposed `NUM-07`: `P22.09`, `P22.10`.

Direct PER support also needed to remain separate from the project’s interpretation of sequence order, interval reuse, mechanics, and likely pupil reasoning.

### 3. Pitch set passed mechanical-divergence review — pass with cautions

The three `NUM-02` directions were mechanically distinct:

- `Fenêtre calibrée`: perceptual commitment and calibration;
- `Gabarits de collection`: benchmark composition and bracketing;
- `Bandes d’enquête`: budgeted evidence acquisition and interval narrowing.

The reviews found appropriate precedent/mechanic links, copying boundaries, and no implied mechanic approval. They required two clarifications:

- a prefilled “authorized next artifact” must not imply pitch selection;
- Pitch C’s sampling-economy risk remains a disclosed design risk, not evidence of suitability.

### 4. Workflow authority was under-specified — major

The roadmap’s global gate incorrectly implied that no bounded pilot could proceed before whole-roadmap approval, while the workflow described separate sequence and checkpoint units without an operational sequence-spine approval record. A single per-sequence pitch/script path also risked overwriting later checkpoint artifacts.

## Owner structural decisions

The owner selected the following resolutions:

1. Import `NUM-01` and `NUM-04` as prerequisite **evidence only**, with a short diagnostic handoff and no mechanic/prototype/expansion authority for those nodes.
2. Move `NUM-07` after `NUM-03`/`NUM-04` in `SEQ-N1`, where place-value transformation forms the more natural closure. This approves placement only, not `SEQ-N1` or `NUM-07` production.
3. Revise N2 to `NUM-02 → NUM-05 → NUM-06`.
4. Approve the revised dependency-closed spine (`approve sequence spine`, `r1-dependency-closed`, 2026-07-16).

## Changes made

- Split stable sequence coherence from checkpoint mechanics:
  - [`../sequences/seq-n2/SEQUENCE-SPINE.md`](../sequences/seq-n2/SEQUENCE-SPINE.md)
  - [`../sequences/seq-n2/num-02/LEARNING-BRIEF.md`](../sequences/seq-n2/num-02/LEARNING-BRIEF.md)
  - [`../sequences/seq-n2/num-02/MECHANIC-PITCHES.md`](../sequences/seq-n2/num-02/MECHANIC-PITCHES.md)
- Added direct curriculum traceability for every retained N2 checkpoint.
- Added an explicit dependency/evidence handoff table and non-production boundaries for imported prerequisites.
- Added an owner sequence-spine disposition record before pitch selection or graybox scripting.
- Reworked templates into stable `SEQUENCE-SPINE.md` plus checkpoint-keyed subdirectories.
- Reconciled the global roadmap gate with the bounded exception.
- Reworded the pitch artifact so `GRAYBOX-SCRIPT.md` is only the next artifact **after** both spine approval and recorded pitch selection.
- Strengthened the `NUM-02` equivalent-access boundary while preserving timed exposure as optional and non-scored.

## Post-review owner selection aid and outcome

The written pitch format and static previews did not support an informed owner choice, so the owner authorized one throwaway interactive micro-loop per pitch for `NUM-02` only. Replay then exposed a deeper failure: the three directions did not begin from a sufficiently clear learning goal, and their player actions were not semantically aligned with the intended pupil cognition.

On 2026-07-16 the owner rejected A, B, and C as presented, rejected `Fenêtre calibrée` as the proposed benchmark-learning mechanic, paused `NUM-02`, and directed the workflow to start with an approved core-learning sentence and successful-pupil statement. Candidate mechanics must then cite established classroom task families and explain the expected cognitive process plus semantic fit before any implementation. The temporary comparison files were deleted.

## Residual gates and risks

- No `NUM-02` direction is selected; no script or catalog graybox is authorized.
- No N2 mechanic is approved for expansion; the structurally approved N2 spine remains paused.
- Do not infer that the rejected adaptations invalidate every abstract `MEC-*` pattern; the recorded failure is semantic application and process timing.
- The active workflow pilot is now the bounded measurement pair `MES-01 → MES-02`; its [`SEQUENCE-SPINE.md`](../sequences/seq-m1/SEQUENCE-SPINE.md) `r0-bounded-measurement-pair` is owner-approved, while the separate [`MES-01` learning contract](../sequences/seq-m1/mes-01/LEARNING-BRIEF.md) remains pending.
- Technical checks cannot establish pupil learning, French comprehension, equivalent accessibility, or classroom suitability.

## Verification

- Roadmap JSON parses and sequence/node ownership is consistent.
- `SEQ-N1` contains `NUM-01`, `NUM-03`, `NUM-04`, `NUM-07`.
- `SEQ-N2` contains `NUM-02`, `NUM-05`, `NUM-06`.
- Exactly three `NUM-02` pitch headings remain.
- Local Markdown and mechanics-memory links resolve.
- Root and `experiments/` Svelte checks pass with zero diagnostics; catalog validation reports three valid exercises.
