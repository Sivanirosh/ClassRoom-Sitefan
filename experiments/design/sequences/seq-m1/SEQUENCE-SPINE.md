---
sequence: SEQ-M1
scope: bounded-pair-MES-01-to-MES-02
status: owner-approved-bounded-pair-spine
revision: r0-bounded-measurement-pair
active_checkpoint: MES-01
owner_gate: approved
---

# SEQ-M1 — Bounded workflow-pilot spine: MES-01 → MES-02

## Authority and scope

- **Roadmap:** [`6h-mathematics-roadmap.md`](../../../curriculum/roadmaps/6h-mathematics-roadmap.md)
- **Curriculum source:** PER MSN 24, especially `P24.02`, `P24.03`, and `P24.06`.
- **Pilot-scope decision:** on 2026-07-16, the owner paused `NUM-02` and designated `MES-01 → MES-02` as the active bounded workflow pilot.
- **Bounded-spine decision:** on 2026-07-16, the owner approved this exact `r0-bounded-measurement-pair` spine without named changes; the recorded gate and pre-record digest appear below.
- **What that decision authorizes:** owner review and disposition of the precise `MES-01` learning contract.
- **What it does not authorize:** the full `SEQ-M1` spine; `MES-04` or `MES-06`; any learning contract, semantic-fit candidate, catalog graybox, mechanic, expansion, or global roadmap scope.
- **Workflow:** [`prototype-production-workflow.md`](../../prototype-production-workflow.md), revision `r3-learning-contract-semantic-fit`.
- **Research boundary:** [`num-02-and-paving-task-precedents.md`](../../../curriculum/research/num-02-and-paving-task-precedents.md) distinguishes cardinality estimation from unit-iteration measurement.

## Bounded pair identity

- **Pair:** `MES-01 → MES-02`
- **Approved bounded conceptual arc:** understand that a length is measured by iterating one invariant unit endpoint-to-endpoint, then use that known unit as a magnitude reference to estimate before verifying.
- **Shared conceptual object:** the length of one straight, one-paver-wide path and one invariant paver-length unit.
- **Stable scenario hypothesis:** a path must be planned before construction. A single 50 cm reference paver is available; the pupil first establishes how it can measure a path, then uses it to estimate an order before checking.
- **Scenario status:** bounded context for learning-contract review, not an approved mechanic or catalog implementation.
- **Primary pupil progression:** construct a valid measurement → use the resulting unit-length relation to anticipate a measurement → verify → interpret discrepancy.

## Curriculum-to-checkpoint traceability

| Checkpoint | PER basis | Observable learning change | Imported input | Evidence handed onward |
|---|---|---|---|---|
| `MES-01` — Construire et répéter une unité | `P24.02`, `P24.06` | Treats length measurement as repeating the same unit from a stable origin, endpoint-to-endpoint, without gaps or overlaps; coordinates count and unit. | Entry evidence only: identifies path endpoints and counts a small ordered set. | A valid unit-iteration trace; stated measure as `n` paver-lengths (and, when supplied, `n × 50 cm`); explanation of why the process is reproducible. |
| `MES-02` — Estimer avant de mesurer | `P24.03`, dependent on `MES-01` | Uses the known unit length to anticipate how many repetitions fit, states an approximate measure with a unit, then verifies and explains the discrepancy. | Independent `MES-01` evidence, not mere completion. | Estimate, verified measure, signed/qualitative discrepancy, and a stated calibration lesson for later magnitude judgments. |

## Entry evidence and pause rule

`MES-01` has no prior roadmap-node dependency, but the bounded pilot needs observable entry evidence:

1. the pupil can identify the start and end of the length being measured;
2. the pupil can count a small ordered series of placements without losing one-to-one correspondence;
3. the pupil understands that the same physical paver remains the reference object when moved;
4. equivalent access exposes the same endpoints, placement continuity, and count.

If these signals are absent, pause the route and collect teacher-supported evidence. Do not insert an unapproved hidden prerequisite lesson into the catalog graybox.

## Checkpoint handoff contract

### MES-01 → MES-02

`MES-01` must hand forward more than a score. The retained evidence must show:

- the unit stayed invariant;
- the first placement began at the path origin;
- each next placement began at the previous endpoint;
- gaps and overlaps were detected or absent;
- the placement count was coordinated with the named unit;
- the pupil can explain that repeating the unit, not counting arbitrary marks, produced the measure.

`MES-02` may rely on that evidence to ask the pupil to imagine/project repetitions before physically measuring. It must not silently reteach valid iteration as its central task.

## Semantic boundaries

- **Length, not area:** the initial path is one paver wide. Success concerns the linear distance from start to finish, not how many pavers cover a surface. At least one independent case must expose only the longitudinal start–end interval/unit endpoints, or otherwise make width and covered surface non-informative.
- **Measurement, not collection cardinality:** counting placements reports how many unit lengths span a magnitude; it is not estimating how many objects are already present.
- **Invariant unit, not arbitrary chunks:** size and orientation along the path may not change between placements.
- **Continuity, not visual closeness:** endpoint contact and absence of gaps/overlaps are inspectable evidence.
- **Estimate, not exact pre-count:** `MES-02` requires a committed approximation before the verification trace becomes available.
- **No conversion dependency:** centimetre-to-metre conversion may be offered as supplied equivalence or later enrichment, but it is not required evidence for this bounded pair.
- **No ruler instruction:** correct use of a graduated ruler belongs to `MES-06`, outside this pilot.

## Proposed learning progression

### MES-01 — Construct the measuring operation

1. Identify the one-dimensional magnitude and stable origin/end.
2. Treat one 50 cm paver as the invariant unit.
3. Place the unit at the origin.
4. Iterate it endpoint-to-endpoint while maintaining continuity and counting placements.
5. Inspect and repair any gap, overlap, changed unit, or origin error.
6. State the length as a count of named units and explain why another measurer could reproduce it.

### MES-02 — Estimate with the constructed unit

1. Recall the magnitude represented by one paver-length.
2. Mentally project/chunk plausible paver repetitions across an unmeasured path.
3. Commit an approximate repetition count and corresponding length with unit.
4. Verify through the valid iteration process from `MES-01`.
5. Compare estimate and measure; explain what visual judgment caused shortage/surplus.
6. Transfer the calibrated reference to a new path before measurement.

## Escalation variables

Escalation may vary only after each checkpoint contract is approved:

- path length as an exact whole number of units before any partial-unit case;
- amount of visible endpoint guidance;
- whether the pupil receives or must reconstruct the prior iteration trace;
- visual orientation/position without changing the one-dimensional magnitude;
- estimation distance from familiar reference lengths;
- amount of scaffolding used to compare estimate and result.

Do not escalate by adding area, mixed unit sizes, ruler graduations, conversion procedures, decorative time pressure, or an unrelated counting challenge.

## Equivalent-process access

- Pointer, touch, and keyboard routes must expose the same placement/iteration decisions.
- Unit boundaries, path endpoints, gaps, and overlaps need non-colour cues and text/state equivalents.
- A reduced-motion route must preserve every mathematical consequence.
- Any non-spatial alternative must still require ordered invariant-unit iteration and continuity decisions; typing only a final number is not equivalent.
- Essential French copy must use stable terms for `début`, `bout`, `même unité`, `sans trou`, `sans chevauchement`, `estimation`, and `vérification`.

## Out-of-scope nodes and handoffs

- `MES-04` and `MES-06` remain members of the proposed full roadmap sequence but have no authority in this bounded pilot.
- The pair may later hand evidence to `MES-04`, `MES-06`, `MES-08`, and `MOD-03`, but this document does not approve those routes.
- Area paving belongs to a later area-focused cycle such as `MES-05`; it must not appear as an early “harder level” here.

## Risks that must remain visible

- The paving context can turn into counting already visible tiles rather than measuring a continuous length.
- A snap-to-grid implementation can hide gaps/overlaps so completely that the pupil never reasons about continuity.
- A drag interaction can test motor precision rather than measurement unless equivalent controls preserve the same decisions.
- The 50 cm label can provoke arithmetic or conversion while bypassing unit iteration.
- Ordering/shortage consequences can become reward dressing unless they expose the measurement or estimation error causally.
- A one-paver-wide illustration can still be misread as area coverage; language and evidence must keep the target linear.

## Owner spine gate

Approval applies only to this bounded pair’s order, boundaries, prerequisites, evidence handoff, semantic distinctions, and out-of-scope nodes. It authorizes only the `MES-01` learning-contract gate. It does not approve the full `SEQ-M1` spine, the proposed scenario, a semantic-fit candidate, catalog implementation, mechanic, or expansion.

- **Owner response:** `Approve spine (Recommended)`
- **Normalized disposition:** `approve bounded pair spine`
- **Required changes:** none
- **Revision/digest judged:** `r0-bounded-measurement-pair`; pre-record `sha256:6cb3e93488cadc89df7a3ff28792432ca46c12a87600340fb8cfedb226597df1`
- **Recorded by / role:** repository owner acting as product/curriculum owner
- **Recorded at:** 2026-07-16

**Next gate:** accountable owner disposition on the `MES-01` learning contract `r0-unit-iteration-contract`. No semantic-fit rationale or implementation is authorized before that separate gate passes.
