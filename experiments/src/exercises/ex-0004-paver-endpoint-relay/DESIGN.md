# EX-0004 — Le relais du pavé-étalon

## Workflow provenance

- **Roadmap / bounded-scope authority:** [`6h-mathematics-roadmap.md`](../../../curriculum/roadmaps/6h-mathematics-roadmap.md), bounded `MES-01 → MES-02` pilot only
- **Sequence spine and owner disposition:** [`SEQ-M1/SEQUENCE-SPINE.md`](../../../design/sequences/seq-m1/SEQUENCE-SPINE.md), `approve bounded pair spine`, `r0-bounded-measurement-pair`
- **Sequence / checkpoint ID:** `SEQ-M1 / MES-01`
- **Learning brief and owner learning-contract disposition:** [`MES-01/LEARNING-BRIEF.md`](../../../design/sequences/seq-m1/mes-01/LEARNING-BRIEF.md), `approve learning contract`, `r0-unit-iteration-contract`
- **Semantic-fit rationale and owner candidate disposition:** [`MES-01/MECHANIC-FIT.md`](../../../design/sequences/seq-m1/mes-01/MECHANIC-FIT.md), `MES01-FIT-A-endpoint-relay`, `approve with named graybox constraints`, pre-record `sha256:81409988ab623d12ed27837ea63dcd20604a5d7dfaeb4a298ebd7e41ca1bd057`
- **Named graybox constraints:** independent count action; no automatic snapping or counting; line-only transfer; equivalent relation controls
- **Established classroom task sources:** [`mes-01-unit-iteration-mechanic-precedents.md`](../../../curriculum/research/mes-01-unit-iteration-mechanic-precedents.md), especially `[LT]²` endpoint-placeholder tasks and Math Learning Center’s one-unit endpoint marking
- **Optional graybox working script:** none; this document is the three-scene source of truth
- **Precedent records (`PRE-*`):** [`PRE-0001`](../../../game-mechanics/precedents/PRE-0001-sokoban.md), [`PRE-0003`](../../../game-mechanics/precedents/PRE-0003-unpacking.md), [`PRE-0007`](../../../game-mechanics/precedents/PRE-0007-brilliant.md)
- **Mechanic records (`MEC-*`):** [`MEC-0001`](../../../game-mechanics/mechanics/MEC-0001-constrained-spatial-organization.md), [`MEC-0004`](../../../game-mechanics/mechanics/MEC-0004-action-first-interactive-learning.md)
- **Application record (`APP-*`):** create after owner replay
- **Owner expansion gate:** pending; no `mechanic approved for expansion`

Follow [`prototype-production-workflow.md`](../../../design/prototype-production-workflow.md). Current authority covers this catalog graybox only.

## Decision summary

The approved learning contract requires the pupil to construct length measurement as one invariant unit repeated from origin to endpoint, with no gaps or overlaps, and to coordinate the repetition count with the named unit. The approved candidate starts from the established endpoint-marking task family and adds a reproducibility consequence: another crew replays the pupil’s retained interval ledger.

The pupil’s primary verbs are **align, move, place, count, inspect, undo, repair, declare**. The source of challenge is maintaining two independent but corresponding records: the geometric interval trace and one deliberate count event per interval. A number field cannot replace these actions because it would erase origin, continuity, unit invariance, one-to-one coordination, and repair evidence.

## Approved learning contract

- **Core learning:** measuring a length with a shorter unit means repeating the same invariant unit from the length’s origin to its endpoint, placing each repetition exactly at the previous endpoint without gaps or overlaps; the repetition count expresses the length in that unit.
- **Successful-pupil statement:** **« J’ai gardé le même pavé de 50 cm. Je l’ai répété depuis le début du chemin, chaque fois juste au bout du précédent, sans trou ni chevauchement. Le pavé tient 6 fois : le chemin mesure 6 longueurs de pavé. »**
- **Expected cognitive process:** identify the length → preserve one unit → anchor the origin → iterate endpoint-to-endpoint → count each completed interval once → inspect and repair → coordinate number and unit → explain reproducibility → transfer.
- **Required representation/evidence:** origin and endpoint; invariant unit; ordered interval ledger; continuity state; pupil-created count events; repair history; unit-bearing statement; line-only independent case.
- **Downstream handoff:** unit identity, valid ledger, count, support/reveal history, error families, repairs, final statement, and independent-case status. `MES-02` mental projection remains separately gated.

## Semantic-fit mapping carried into the graybox

| Learning operation | Pupil/game action | System consequence or inspectable evidence | Scene(s) testing it |
|---|---|---|---|
| Identify longitudinal magnitude | Read and confirm the named origin and arrival on the centreline | Width and covered surface never enter validity | 1–3 |
| Preserve one unit | Reuse the same movable 50 cm reference | Every interval retains the same unit identity and length | 1–3 |
| Anchor the origin | Position and commit the first start at the origin | Displaced first starts stay visible and fail audit | 1–3 |
| Iterate continuously | Move the preview; commit each start at the previous endpoint | Ordered starts/ends expose equality, gap, or overlap | 1–3 |
| Coordinate count and interval | Select any retained interval, then add or remove its count event separately | Earlier count events can be skipped/doubled independently and repaired without rebuilding geometry | 1–3 |
| Inspect and repair | Audit, undo placement or bead, reposition, then rerun audit | First broken relation and before/after state remain inspectable | 1–2 plus available in 3 |
| Coordinate number and unit | Cite the validated total and named unit, then write the measure in a report | Retained pupil text states `n longueurs de pavé`, never only a bare total | 1–3 |
| Explain reproducibility | Trigger replay, cite the endpoint relation, and write why another crew should agree | Replay reaches the same endpoint and the pupil-authored explanation is retained | 1–3 |
| Transfer | Measure a relocated line with no useful area cue | Independent six-interval trace and count | 3 |

If generic answer controls could replace placement and independent counting while preserving the evidence, reject this candidate.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years:** Cycle 2 / 6H pilot
- **Objective codes:** MSN 24
- **Source IDs:** `src-per-0002`; roadmap statements `P24.02`, `P24.06`
- **Direct curriculum interpretation:** the bounded roadmap maps `MES-01` to choosing/using a unit and comparing/measuring lengths through a repeated invariant unit.
- **Design interpretation:** the movable paver, dual ledger, replay crew, three cases, exact values, and all interface copy are local hypotheses. The PER and classroom precedents do not establish digital effectiveness, accessibility equivalence, age fit, French comprehension, or fun.

## Observable learning objective

Given one invariant paver-length and a straight whole-unit path, the pupil constructs a reproducible endpoint-to-endpoint trace, records exactly one count event per interval, repairs any spatial or count mismatch, and states the length as a count of named paver-lengths.

## Prerequisites and vocabulary

- **Stable prerequisites:** identify start/end; count a small ordered series; keep one object as the reference when moved.
- **Familiar representations:** straight path or line, start flag, arrival flag, one paver, marks.
- **Essential French copy/vocabulary:** `départ`, `arrivée`, `début du pavé`, `bout du pavé`, `repère`, `sans trou ni chevauchement`, `compter ce pavé`, `longueur de pavé`.

Missing prerequisite evidence pauses the route. The graybox must not hide a new prerequisite lesson.

## Misconceptions and productive difficulty

Evidence-backed error families include displaced origin, gaps, overlaps, changed unit length, and treating a count as sufficient without a valid measuring procedure. Skipped/doubled count events are a weaker source-backed family and are tested here as an explicit one-to-one coordination hypothesis.

Productive difficulty is deciding and maintaining the endpoint relation while coordinating a separate count. Interface difficulty must not come from drag precision, speed, tiny controls, colour discrimination, or remembering an arbitrary command language. The half-paver adjustment positions exist only to make invalid relations visible; no partial-unit measure is requested or accepted.

## Evidence of learning

The local trace records:

- every committed start and end;
- whether the first interval starts at the origin;
- the relation between each previous end and next start;
- one independently triggered count event and its linked interval;
- selection and targeted repair of an earlier interval’s count without geometry changes;
- every placement/count undo;
- audit attempts and first error family;
- the pupil-authored unit-bearing/reproducibility report plus its structured trace citations;
- completion of the changed line-only case.

Correctness, completion time, total clicks, and a bare final number are not learning evidence.

## Core mechanic hypothesis

> If the pupil repeatedly **moves, places, counts, inspects, and repairs** one paver within **origin, invariant-unit, endpoint-continuity, and one-count-per-interval constraints**, while **the interval and count ledgers remain independently visible**, then **length measurement as reproducible unit iteration** becomes visible and usable.

- **Primary verbs:** move, place, count, inspect, undo, repair, declare.
- **State model:** path interval in half-unit interaction coordinates; invariant unit length of two half-steps; ordered committed intervals; selectable count-ledger interval; count events linked to the selected interval; audit/repair state; structured report citations and pupil-authored explanation text.
- **Source of challenge:** preserve the mathematical relation as the path length grows and support fades.
- **Meaningful decisions:** where the paver starts; when to commit; when a completed interval deserves one count; whether the two ledgers agree; what to undo.
- **Feedback/recovery loop:** commit without correction → audit the retained state → receive relation-specific evidence → undo geometry or count independently → reposition/recount → audit again.
- **Why mechanically distinct:** unlike the trace debugger, the pupil authors the measuring operation from the first interval; no faulty plan is supplied.

## Three-scene catalog graybox

### Scene 1 — Orientation: « Premier relevé : trois pavés »

- **Purpose:** teach moving the same unit, committing an endpoint, and counting separately.
- **Essential prompt:** **« Pars du drapeau Départ. Pose le même pavé jusqu’à l’Arrivée. Après chaque pose, compte ce pavé une seule fois. »**
- **Actions:** move the preview by relation-level half-step controls; place; advance one count bead; repeat; audit.
- **Recoverable error probe:** begin half a paver after the origin, commit, then audit. Exact feedback: **« La première pose ne part pas du drapeau Départ. Annule cette pose et ramène le début du pavé sur l’origine. »**
- **Success evidence:** three continuous intervals, three singly linked beads, final endpoint at arrival.
- **Required report evidence:** cites 3 continuous intervals, one count each, 3 named paver-lengths, replay to the same arrival, and retains the pupil’s explanation in the final success feedback.

### Scene 2 — Complication: « Deux registres à accorder »

- **Purpose:** remove the guided first mark and make spatial/count mismatch repair available on a four-unit path.
- **Essential prompt:** **« Construis la trace sans modèle. Avant de transmettre le relevé, vérifie séparément les repères et les comptages. »**
- **Actions:** same relational movement; independent place/count; select any earlier ledger row; add or remove its count event without moving geometry; inspect both rows; undo either row; audit.
- **Challenge:** no auto-snap, auto-count, or answer list; a valid geometry with a skipped/doubled bead still fails for a named reason.
- **Required report evidence:** cites 4 continuous intervals, one count each, 4 named paver-lengths, replay to the same arrival, and retains the pupil’s explanation in the final success feedback.

### Scene 3 — Independent challenge: « La ligne déplacée »

- **Purpose:** collect independent transfer evidence without surface or paving cues.
- **Essential prompt:** **« Cette fois, seule la longueur compte. Mesure la ligne du Départ à l’Arrivée avec le même pavé de 50 cm, puis transmets un relevé que l’autre équipe peut reproduire. »**
- **Representation:** relocated thin line; one bracket-like reference unit; no path width, tile field, ghost placements, or step hint.
- **Closure:** six continuous intervals, six linked count events, structured citations to measure/continuity/replay, a pupil-authored unit-bearing explanation, and deterministic replay summary.
- **Required final evidence:** structured citations to 6 named paver-lengths, endpoint continuity, and replay to the same arrival, plus a pupil-authored explanation. The approved successful-pupil statement above remains the qualitative owner-review target; the graybox does not generate or claim that wording on the pupil’s behalf.

### Included before mechanic approval

- Exactly these three scenes
- Essential French copy above
- Invalid commit, specific audit feedback, and independent geometry/count undo
- Relation-level pointer, touch, and keyboard controls
- Minimal CSS diagrams; no generated assets
- Deterministic smoke plans that exercise a real invalid placement, recovery, valid construction, and completion

### Excluded before mechanic approval

- Additional scenes or error-family battery
- `MES-02` estimation
- Rulers, conversion, partial-unit outcomes, area covering, curved paths, and motor-precision challenges
- Complete storyboarding, decorative motion, generated artwork, reward economy, persistence, telemetry, teacher integration, and production polish

## Owner playtest and mechanic gate

| Date | Owner observation or requested change | Disposition |
|---|---|---|
| 2026-07-16 | Semantic-fit rationale approved with named graybox constraints; catalog replay still pending | Build this low-fi catalog graybox only |

**Current gate:** pending owner replay. Expansion requires the exact phrase `mechanic approved for expansion` scoped to `EX-0004` + `SEQ-M1` + `MES-01`.

## Full exercise progression

Blocked until the current gate passes. No progression beyond the three graybox scenes is authorized.

## Full storyboard

Blocked until the current gate passes. The exact graybox interactions and copy are defined above.

## Feedback and scaffolding

Feedback names the represented relation rather than saying only correct/incorrect. Scene 1 identifies the origin error in the explicit error probe. Later audit messages distinguish origin, gap, overlap, missing/excess interval, skipped/doubled count, and endpoint mismatch. Undo is split between geometry and count so recovery cannot silently fix both.

Support fades by removing the guided first mark in Scene 2 and removing path-surface cues and step hints in Scene 3. No final-answer reveal is needed in this bounded replay; if hints are later added, a reveal must require a fresh independent case.

## Content model

Each scene defines `targetUnits`, prompt/copy, display mode, and support level. Correct intervals use integer paver positions from `0` through `targetUnits`. Interaction coordinates use half-paver steps only to represent a visible gap, overlap, or displaced origin; the unit itself always has length one paver and successful paths always contain whole units.

A placement stores a stable `{id, startHalf, endHalf}`. A count event stores that stable placement ID when the pupil presses **Compter la pose sélectionnée**. Any visible interval can be reselected, so an earlier skipped or doubled event is repairable without reconstructing later placements. Undoing a placement leaves its count event visibly orphaned until the pupil removes it; a replacement placement receives a new ID and cannot silently inherit the old event. Validity requires:

1. exactly `targetUnits` intervals;
2. first `startHalf = 0`;
3. every interval length equals two half-steps;
4. every next start equals the previous end;
5. final end equals `targetUnits × 2`;
6. exactly one count event linked to every interval;
7. no event linked to an absent interval.

## Interaction states

1. `intro` — candidate purpose and controls.
2. `active` — movable preview, committed trace, independent count ledger.
3. `audit-error` — active state preserved with specific first-fault feedback.
4. `repair` — undo/reposition/recount without reset.
5. `report` — validated ledgers are frozen while the pupil cites measure/continuity, executes an ordered replay of the retained starts/ends, inspects its terminal endpoint, and writes an explanation; reopening invalidates the report and requires another audit.
6. `success` — valid trace, count, retained pupil-authored statement, continue.
7. `complete` — bounded three-scene replay complete; no expansion claim.

## Accessibility and devices

- Pointer, touch, and keyboard activate the same native buttons and relation-level state changes.
- No required drag, exact pixel targeting, hover-only information, timer, or autoplay.
- The preview and intervals have textual start/end descriptions in an ordered list.
- Every retained interval is a native selectable ledger control, so an earlier skipped/doubled count can be repaired without reconstructing later geometry.
- The report uses a labelled textarea; deterministic smoke fills the same ordinary text control used by a pupil, with no smoke-only completion branch.
- Gap, overlap, origin, count, and success states use text and geometry, never colour alone.
- Controls target at least 44 px and retain visible focus.
- At 320 px the path remains within the viewport and controls stack vertically.
- Count and placement are separate labelled controls; neither triggers the other.
- Motion is unnecessary. Reduced-motion users lose no evidence.

## Motion and artwork decisions

No motion or generated artwork is included. Static CSS geometry is sufficient to test the approved relation and avoids implying that visual polish establishes fit.

## Final validation evidence

Before owner replay, record only lightweight technical operability: catalog validation, typecheck, deterministic keyboard/touch contract, invalid-placement recovery, earlier skipped/doubled-count repair, stable orphan-count recovery, ordered ledger replay, and absence of console/network errors. These checks do not establish learning, French comprehension, accessibility equivalence, fun, or expansion readiness.

## Findings and decisions

- **2026-07-16 — Candidate authority:** owner chose `Approve + constraints (Recommended)`, normalized to `approve with named graybox constraints`.
- **2026-07-16 — Graybox implementation decision:** use explicit half-step relation controls instead of drag. Invalid geometry remains committable and inspectable; placement never increments count.
- **2026-07-16 — Boundary:** the line-only third scene is mandatory evidence against area-covering substitution.
- **2026-07-16 — Independent-review repair:** made every retained interval selectable in the count ledger, so an earlier skipped or doubled count can be added/removed without changing geometry and is exercised in every deterministic smoke path; gave placements stable IDs so an undone pose cannot transmit its count to a replacement; exposed orphan events and made them separately removable; made error feedback focusable; added an explicit trace-citation and pupil-authored report gate before success.
- **2026-07-16 — Replay repair:** **Faire rejouer** now executes the retained ordered start/end ledger into inspectable replay rows and verifies the last endpoint rather than only asserting reproducibility. System success copy stays technical and retains the pupil’s own wording separately.
- **2026-07-16 — Explanation boundary:** keyword checks only prevent an empty or unitless technical path. They do not establish the quality, truth, French comprehension, or learning value of the pupil’s explanation; owner/pupil review remains required.
- **Evidence still missing:** owner catalog replay, pupil reasoning, French comprehension, accessibility equivalence, fun, and any expansion disposition.

## Promotion criteria

No promotion is authorized. The immediate next decision is owner replay of this catalog graybox. Any later expansion must first record `mechanic approved for expansion` for `EX-0004` + `SEQ-M1` + `MES-01`; production promotion would still require later learning, accessibility, technical, and classroom evidence.
