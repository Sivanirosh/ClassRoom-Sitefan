---
sequence: SEQ-M1
sequence_scope: bounded-pair-MES-01-to-MES-02
checkpoint: MES-01
status: owner-approved-learning-contract
revision: r1-behavioral-evidence
owner_learning_contract_gate: approved-with-behavioral-evidence-refinement
mechanic_authority: none
---

# SEQ-M1 / MES-01 — Learning contract: construct and repeat one unit

## Gate status and authority

- **Approved bounded spine:** [`../SEQUENCE-SPINE.md`](../SEQUENCE-SPINE.md), owner-approved `r0-bounded-measurement-pair` on 2026-07-16; pre-record `sha256:6cb3e93488cadc89df7a3ff28792432ca46c12a87600340fb8cfedb226597df1`.
- **Roadmap checkpoint:** `MES-01 — Construire et répéter une unité`.
- **Curriculum basis:** PER MSN 24 `P24.02` and `P24.06`.
- **Active pilot decision:** the owner designated `MES-01 → MES-02` as the bounded workflow pilot on 2026-07-16.
- **Current authority:** the mathematical relation remains owner-approved. On 2026-07-17 the owner selected `Behavioral only (Recommended)`, normalized to `behavioral-only`: the game derives the unit-bearing result from successful play, and a fresh successful case is the reproducibility evidence. No pupil writing, spoken report, declaration, ledger, citation, or explanation UI is required.
- **Current graybox authority:** EX-0005 may replace its old trace-debugger adaptation with `MES01-FIT-B2-log-roll-crossing`. On 2026-07-17 the owner also authorized the disposable `MES01-FIT-A3-frog-jump-prediction` replacement for EX-0004 with the exact response `implement the graybox now`.
- **Scoped bridge boundary:** EX-0004’s direct-tap tutorial may embody MES-01, but its integer-prediction rounds are a `MES-01 → MES-02` bridge hypothesis. They do not revise MES-01’s behavioral-only evidence contract or constitute approval of the MES-02 learning contract.
- **EX-0004 expansion authority:** on 2026-07-17 the owner said “I approve and go on with it” after replay and supplied pond-board art references. This authorizes UI/art expansion of EX-0004 in the active `SEQ-M1` / `MES-01 → MES-02` bridge context. No prescribed approval phrase is required; bounded implementation should use a Khazad-Doom Issue Slice when a hard fence is useful.
- **Still not authorized:** the `MES-02` learning contract, full `SEQ-M1`, EX-0005 expansion, efficacy claims, promotion, or unrelated implementation.

## Approved learning contract

### Core learning — approved

> **Measuring a length with a shorter unit means repeating the same invariant unit from the length’s origin to its endpoint, placing each repetition exactly at the previous endpoint without gaps or overlaps; the repetition count expresses the length in that unit.**

### Successful-pupil statement — approved

> **« J’ai gardé le même pavé de 50 cm. Je l’ai répété depuis le début du chemin, chaque fois juste au bout du précédent, sans trou ni chevauchement. Le pavé tient 6 fois : le chemin mesure 6 longueurs de pavé. »**

The values and paver context may change later; the statement’s mathematical relations may not. Under the owner-selected `behavioral-only` mode, this sentence is a designer/teacher interpretation target. It must not be presented as generated pupil speech or required as pupil-facing written/spoken output.

### Expected cognitive process — approved

1. **Identify the magnitude.** Attend to the path’s length from a named start to a named finish, not its area or the number of depicted objects.
2. **Establish the invariant unit.** Treat one paver-length as the same unit every time it is moved.
3. **Anchor the origin.** Align the unit’s beginning with the path’s beginning.
4. **Iterate with continuity.** Place each new unit beginning at the previous unit’s endpoint while counting one placement once.
5. **Inspect and repair.** Detect any gap, overlap, changed unit, skipped/doubled count, or displaced origin; repair the trace rather than guessing a new answer.
6. **Coordinate number and unit.** Produce a play state from which the system can derive and display `n paver-lengths` (and `n × 50 cm` when that notation is supplied) as the measure.
7. **Demonstrate reproducibility behaviorally.** Complete a fresh equivalent case using the same unit/continuity relation; no pupil report or explanation UI is required.
8. **Transfer.** Repeat the process on a new straight path whose position or appearance changes but whose length is still a whole number of units.

## Why this is one checkpoint

The learning change is not “knows that one paver is 50 cm” and not “can count pavers.” It is the construction of the measuring operation that coordinates:

- one continuous one-dimensional magnitude;
- one invariant unit;
- spatial iteration from endpoint to endpoint;
- one-to-one counting of repetitions;
- a number stated with its unit.

Removing any one of these can produce a plausible number without valid measurement.

## Curriculum trace and interpretation

| Source | Source-supported requirement | Role in this contract |
|---|---|---|
| PER MSN 24 `P24.02` | Choose/use conventional or non-conventional units and organize measurement | Establish one named unit and a reproducible procedure. |
| PER MSN 24 `P24.06` | Compare/measure magnitudes and organize the measurement operation | Require origin alignment, invariant iteration, continuity, and stated result. |
| Math Learning Center, Grade 2 Measurement: Length | A single equal unit can be moved repeatedly, with each new start at the prior endpoint; gaps and unequal units invalidate the result | Established classroom-task evidence for the cognitive operation, not permission to copy its teacher-foot scenario. |
| Illustrative Mathematics Grade 1, Unit 6, Lesson 7 | Equal-size units and no gaps/overlaps are mathematically relevant; colour is not | Established classroom-task evidence for distinguishing governing from irrelevant attributes. |

Research summary and source links: [`num-02-and-paving-task-precedents.md`](../../../../curriculum/research/num-02-and-paving-task-precedents.md).

## Entry evidence

Before independent closure, the pupil needs to:

- locate the start and finish of a simple path;
- count a small ordered sequence of placements with one-to-one correspondence;
- understand that moving the paver does not change its length;
- perceive or access boundaries and contact between adjacent placements.

These are diagnostic signals, not approved extra lessons. If absent, pause and return evidence to the teacher rather than hiding remediation inside this checkpoint.

## Observable evidence contract

Independent success requires all of the following in a fresh case:

1. starts at the specified origin;
2. uses one invariant unit throughout;
3. constructs or validates an endpoint-to-endpoint trace through play;
4. leaves no gap or overlap;
5. produces one completed action/interval per repeated unit;
6. reaches a state from which the system derives and displays the result with its unit;
7. completes a visually changed equivalent case as behavioral evidence of reproducibility.

A final number alone is insufficient, and the pupil must never be asked to type, select, declare, cite, or explain it as a completion gate. At least one independent case must expose only the longitudinal start–end interval and unit endpoints, or otherwise make width and covered surface non-informative, so an area-covering strategy cannot satisfy the evidence contract. Completion after an answer-revealing hint remains supported completion and requires a fresh structurally equivalent case before independent closure.

## Error families and diagnostic hypotheses

| Error family | Observable move | Working hypothesis | Informative response |
|---|---|---|---|
| Wrong magnitude | Counts drawn pavers/marks or attends to covered surface | Pupil treats the picture as a collection or area | Re-identify the start–finish length; remove irrelevant objects while preserving the path. |
| Origin error | First unit begins before/after the path start | Pupil has not coordinated measurement with a stable origin | Expose both origins and ask what unmeasured or double-measured part remains. |
| Gap | A segment remains between repetitions | Pupil sees repeated samples but not continuous coverage of length | Make the unmeasured segment inspectable; require moving the next start to the prior endpoint. |
| Overlap | Part of the path is measured twice | Pupil counts placements without conserving covered length | Highlight the double-measured interval and require repair before recounting. |
| Unit mutation | Unit is resized/rotated into a different along-path length | Pupil treats each placement as an arbitrary chunk | Compare unit traces and restore one invariant reference. |
| Count/trace mismatch | Spatial trace is valid but count skips or duplicates a placement | One-to-one coordination is fragile | Let the pupil traverse ordered endpoints and reconcile count with trace. |
| Unitless result | The play state or system result exposes only `6` or only `300` | The mechanic has not linked numerical measure to the chosen unit | Derive and display the count together with the unit from completed play; do not require pupil answer entry. |
| Arithmetic detour | Computes from the displayed `50 cm` while the spatial trace is invalid | Symbolic multiplication is masking invalid measurement | Keep arithmetic unavailable until the iteration trace passes continuity checks. |

## Content and representation boundaries

### Included in the first low-fi test, if later authorized

- straight, one-paver-wide paths;
- one visible 50 cm reference paver;
- whole-number path lengths, initially 2–8 paver-lengths;
- explicit start/end and unit endpoints;
- valid, gap, overlap, wrong-origin, and changed-unit states;
- orientation/position changes that preserve the one-dimensional task;
- exact French wording needed to understand the action and world-state consequence;
- behavioral evidence derived from play, with no pupil report or answer entry.

### Excluded from this checkpoint

- surface coverage or area;
- width calculations;
- partial pavers/fractional units;
- choosing among centimetres, metres, or other unit systems;
- centimetre–metre conversion as required evidence;
- reading a graduated ruler;
- estimating before measuring as the central task (`MES-02`);
- ordering materials, shortage/surplus, scoring, or narrative as substitutes for valid iteration;
- timed motor-precision demands.

## Semantic invariants for later mechanic rationales

Any candidate must preserve these causal mappings:

| Learning operation | Required pupil action class | Required inspectable evidence |
|---|---|---|
| Establish invariant unit | Select/accept one fixed paver-length and keep it unchanged | Every trace segment has the same along-path length. |
| Anchor measurement | Align first unit with named origin | No leading interval is omitted or added. |
| Iterate continuously | Place/validate each start at the prior endpoint | Adjacency can be inspected; gaps and overlaps have exact locations. |
| Coordinate count and trace | Produce one completed game action/state interval per repeated unit | Derived count equals the number of valid unit intervals, not arbitrary clicks or loose objects. |
| Produce measure | Complete the measurable world state | The system derives and displays `n` named units from the play state; no pupil report is required. |
| Repair reasoning | Modify the faulty world relation, not merely retry a number | Before/after state shows which measurement condition was restored. |

Reject a future candidate if a generic number field, interval slider, multiple-choice card, or cosmetic drag can replace these actions without changing the pupil’s reasoning.

## Equivalent-process access

- Dragging cannot be the only route. Keyboard and touch must allow the same origin, adjacency, and repair decisions.
- Unit endpoints, gaps, and overlaps require shape/label/state cues beyond colour.
- Text alternatives may describe state and consequence, but must not become a pupil-operated trace, report, explanation, or typed final count.
- Focus order must follow the measurement direction.
- Reduced motion may remove animation but not the state transition or consequence.
- French copy must keep `début`, `bout`, `même pavé`, `sans trou`, and `sans chevauchement` stable.

## Downstream handoff to MES-02

The retained handoff must include:

- unit identity and length (`one paver-length`, supplied as `50 cm` in the proposed context);
- independently valid iteration trace;
- measured repetition count;
- named error/recovery history if support was needed.

`MES-02` will ask the pupil to use this unit as a mental magnitude reference, commit an approximate repetition count/length before measuring, verify with the same procedure, and interpret discrepancy. Its entry should probe—and, if needed, scaffold—the new act of mentally projecting repetitions before laying the unit down; that ability must not be inferred from `MES-01`. It must not treat `MES-01` completion as sufficient when the trace shows gaps, overlaps, or answer reveal.

## Learning risks and falsification

- **Motor proxy:** failure correlates with drag precision rather than continuity reasoning.
- **Snap concealment:** automatic snapping prevents the pupil from perceiving why gaps/overlaps matter.
- **Arithmetic bypass:** `50 × n` can be calculated from visual count without constructing a measure.
- **Collection drift:** the screen shows many pavers already laid, turning the task into cardinality counting.
- **Area drift:** path width or surface coverage becomes salient.
- **Language overload:** terms for endpoint and overlap obstruct otherwise valid reasoning.
- **Falsification condition:** if pupils can succeed by entering/counting a number while ignoring origin, invariant unit, and continuity, the candidate does not instantiate this contract.

## Owner learning-contract gate

The owner originally judged the three contract elements together: the core-learning sentence, successful-pupil statement, and expected cognitive process. The 2026-07-17 refinement changes only the evidence modality: it removes required pupil output and uses system-derived results plus fresh-case behavior. The mathematical relation and statement remain interpretation targets.

Approval authorizes established-task/mechanics-memory research and separately selected low-fi grayboxes only. It does not approve the paver scenario as a mechanic, expansion, polish, or learning claims.

### Original approval

- **Owner response:** `Approve contract (Recommended)`
- **Normalized disposition:** `approve learning contract`
- **Revision/digest judged:** `r0-unit-iteration-contract`; pre-record `sha256:61b3d070afcc9a41fdb7422434b41f7cb640207aa0c16a3a5d414392531fad14`
- **Recorded by / role:** repository owner acting as product/curriculum owner
- **Recorded at:** 2026-07-16

### Behavioral-evidence refinement

- **Owner response:** `Behavioral only (Recommended)`
- **Normalized disposition:** `approve behavioral-only evidence refinement`
- **Revision:** `r1-behavioral-evidence`
- **Required change:** derive the unit-bearing result from play and use a fresh successful round as reproducibility evidence; prohibit pupil writing/report/declaration interfaces.
- **Recorded by / role:** repository owner acting as product/curriculum owner
- **Recorded at:** 2026-07-17

## Current semantic-fit artifact

[`MECHANIC-FIT.md`](./MECHANIC-FIT.md) preserves the two 2026-07-16 rationales and records the 2026-07-17 reset. EX-0005 has graybox-only authority for `MES01-FIT-B2-log-roll-crossing`; EX-0004 now has separately granted disposable-graybox authority for `MES01-FIT-A3-frog-jump-prediction`.

Current authority permits only those two bounded replacement grayboxes. EX-0004’s prediction rounds remain a bridge hypothesis rather than an approved MES-02 contract. Nothing here permits expansion, polish, `MES-02` curriculum authority, or unrelated work.
