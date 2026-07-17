---
sequence: SEQ-M1
sequence_scope: bounded-pair-MES-01-to-MES-02
checkpoint: MES-01
status: game-first-reset-two-replacement-grayboxes-approved
revision: r2-frog-prediction-bridge
owner_candidate_gate: ex0004-and-ex0005-disposable-replacements-approved
owner_gate_recorded_on: 2026-07-17
historical_pre_record_digest: sha256:81409988ab623d12ed27837ea63dcd20604a5d7dfaeb4a298ebd7e41ca1bd057
catalog_graybox_authority: ex0004-frog-prediction-and-ex0005-log-roll-only
mechanic_authority: none
---

# SEQ-M1 / MES-01 — Semantic-fit mechanic rationales

## Active scope

- **Learning brief:** [`LEARNING-BRIEF.md`](./LEARNING-BRIEF.md)
- **Approved learning-contract disposition / revision:** original `approve learning contract`, `r0-unit-iteration-contract`, pre-record `sha256:61b3d070afcc9a41fdb7422434b41f7cb640207aa0c16a3a5d414392531fad14`; evidence refinement `approve behavioral-only evidence refinement`, `r1-behavioral-evidence`
- **Sequence spine:** [`../SEQUENCE-SPINE.md`](../SEQUENCE-SPINE.md)
- **Sequence-spine disposition / revision:** `approve bounded pair spine`; `r0-bounded-measurement-pair`; pre-record `sha256:6cb3e93488cadc89df7a3ff28792432ca46c12a87600340fb8cfedb226597df1`
- **Active replacement grayboxes:** EX-0005 `MES01-FIT-B2-log-roll-crossing` and EX-0004 `MES01-FIT-A3-frog-jump-prediction`. EX-0004’s direct-tap tutorial is MES-01-facing; its integer-prediction rounds are explicitly a bounded `MES-01 → MES-02` bridge hypothesis rather than an approved MES-02 contract.
- **Core learning:** measuring a length with a shorter unit means repeating the same invariant unit from the length’s origin to its endpoint, placing each repetition exactly at the previous endpoint without gaps or overlaps; the repetition count expresses the length in that unit.
- **Successful-pupil statement:** **« J’ai gardé le même pavé de 50 cm. Je l’ai répété depuis le début du chemin, chaque fois juste au bout du précédent, sans trou ni chevauchement. Le pavé tient 6 fois : le chemin mesure 6 longueurs de pavé. »**
- **Expected cognitive process:** identify the longitudinal magnitude → establish one invariant unit → anchor the origin → iterate endpoint-to-endpoint → inspect and repair → let the system derive number plus unit from play → demonstrate reproducibility behaviorally in a fresh straight whole-unit path.
- **Required MES-01 representation/evidence:** path origin and endpoint; one invariant along-path unit; inspectable continuity state; one completed game action/state interval per unit; repair history; system-derived measure with unit; independent transfer case in which area cues are absent or non-informative. No pupil report, declaration, citation, explanation, or answer entry is permitted as MES-01 evidence.
- **Scoped EX-0004 bridge exception:** after a direct-action tutorial, the pupil enters one integer prediction before an automatic jump chain resolves. This is a game hypothesis for the handoff to MES-02, not a revision of MES-01’s behavioral-only contract or approval of MES-02 curriculum authority.
- **Downstream handoff:** retain unit identity, valid trace, repetition count, support/reveal history, and repair evidence for `MES-02`; do not infer mental projection from tutorial completion alone.
- **Gate boundary:** the 2026-07-17 owner selections authorize only the two replacement low-fi grayboxes. They do not authorize full expansion, polish, a MES-02 learning contract, or unrelated scope.

## 2026-07-17 game-first reset

Owner replay found both implemented adaptations bad/broken in game feel. The reset adds these non-negotiable experience invariants:

- adapt a concrete, named video-game or board-game core loop rather than cite a broad mechanic abstraction;
- one primary verb and a goal readable in approximately two seconds;
- mathematical cognition expressed through play state and world consequences;
- no pupil writing, spoken report, answer field, declaration, ledger, audit, citation, or explanation UI;
- short calm attempts, fair visible failure, cheap retry, and no timer/motor-precision proxy;
- technical success cannot establish game feel, learning, French comprehension, or accessibility equivalence.

The old Endpoint relay and Trace debugger sections below remain historical rationale records. They no longer define current replacement implementation authority and grant no expansion authority.

### Replacement candidate B2 — Push/roll crossing

- **Candidate ID / target:** `MES01-FIT-B2-log-roll-crossing` → stable catalog identity `EX-0005`.
- **Named source loop:** *A Monster’s Expedition* — push/roll logs to create traversable paths between islands. First-party provenance and adaptation boundaries: [`mes-01-calm-game-mechanic-precedents.md`](../../../../curriculum/research/mes-01-calm-game-mechanic-precedents.md).
- **Source-backed boundary:** Draknek documents pushing trees/logs to make paths and reach islands. It does not document or validate one-input/one-unit measurement learning.
- **Local adaptation:** one visible reusable roller begins at a named origin on an unsegmented straight whole-unit span. One activation produces one complete invariant displacement and one consequence mark. Exact endpoint contact opens a calm crossing; the game derives `n tours de rouleau` from completed marks.
- **Primary verb / loop:** push/roll → see one same-length world mark → repeat or undo → exact endpoint resolves.
- **Fair non-success:** a backward first roll visibly begins before the origin; one-step undo removes the displacement and mark together.
- **Behavioral transfer:** complete a fresh visually changed straight line with the same action/unit relationship.
- **Forbidden substitution:** no prospective cells/slots, target numeral, ruler marks, timing/aim/swipe-distance input, report, explanation, or separate counting control.
- **Kill criteria:** reject if pupils spam until completion without connecting rolls to the unit-bearing count; if rolling reads only as transport; if consequence marks/post-hoc label teach the answer; or if animation/motor precision predicts success.

### Replacement candidate A3 — Frog jump prediction bridge

- **Candidate ID / target:** `MES01-FIT-A3-frog-jump-prediction` → stable catalog identity `EX-0004`.
- **Named source relationship:** *Chinese Checkers* adjacent movement and jump-over-an-adjacent-piece into the position beyond; publisher provenance and adaptation boundaries: [`mes-01-calm-game-mechanic-precedents.md`](../../../../curriculum/research/mes-01-calm-game-mechanic-precedents.md).
- **Tutorial:** tapping the frog immediately produces one invariant one-unit jump and consequence segment. This teaches the world rule but is not independent evidence.
- **Challenge loop:** inspect the true square unit grid and straight origin-to-endpoint span → enter one integer → automatically execute exactly that many actions → inspect a spatial shortage, exact landing, or overshoot → retry.
- **Unit-grid escalation:** a true square grid uses one cell side as one unit-saut. Horizontal prediction precedes vertical orthogonal transfer; diagonal movement is deferred because a square diagonal has length `√2` relative to its side.
- **Later obstacle escalation:** a visible stationary frog forces one two-unit jump in one action. A six-unit path then requires five physical actions. This tests additive composition and must not be treated as MES-01 evidence.
- **Forbidden substitution:** the explicit unit grid may expose square boundaries, but no target number, action queue, separate launch control, timer, drag, pupil prose, or administrative error dialog may replace the prediction-and-resolution loop.
- **Kill criteria:** reject if play becomes sequential higher/lower guessing, if animation hides the spatial discrepancy, if pupils confuse action count with unit-length measure, or if orientation/motor skill predicts success.
- **Owner implementation response:** exact wording `implement the graybox now`; normalized `approve disposable bridge graybox`; recorded 2026-07-17.
- **Owner replay/expansion response:** after replaying the orthogonal-grid revision, the owner said “Perfect, I think the game mechanic can be validated now, let's go to the next phase” and then “I approve and go on with it.” Recorded 2026-07-17 as clear natural-language approval for EX-0004 UI/art expansion in this active bridge scope. The owner explicitly rejected prescribed approval wording; use a bounded Khazad-Doom Issue Slice when execution needs a hard fence.

## Historical established-task and mechanics-memory search

- **Classroom task/problem queries:** single-unit length iteration; leapfrogging one unit; endpoint placeholders and marks; intentional gap/overlap examples; changed-size versus changed-colour units; erroneous measurement diagnosis; constructing interval traces; displaced-origin errors.
- **Established task families retained:**
  1. **construct an endpoint ledger** by moving one invariant unit, marking its end, and starting the next placement at that mark;
  2. **inspect, explain, and repair a malformed measurement trace** before accepting its count.
- **Primary/first-party task sources:** PER MSN 24; University of Denver `[LT]²` activities; Math Learning Center Grade 1 and Grade 2 measurement supplements; Illustrative Mathematics Grade 1 Unit 6 Lesson 7.
- **Research note:** [`mes-01-unit-iteration-mechanic-precedents.md`](../../../../curriculum/research/mes-01-unit-iteration-mechanic-precedents.md)
- **Repository records reused:** [`MEC-0001`](../../../../game-mechanics/mechanics/MEC-0001-constrained-spatial-organization.md), [`MEC-0002`](../../../../game-mechanics/mechanics/MEC-0002-program-execute-inspect-revise.md), [`MEC-0003`](../../../../game-mechanics/mechanics/MEC-0003-telegraphed-consequences-and-checkpoints.md), [`MEC-0004`](../../../../game-mechanics/mechanics/MEC-0004-action-first-interactive-learning.md), [`APP-0002`](../../../../game-mechanics/applications/APP-0002-seq-n1-exchange-workbench.md), [`APP-0003`](../../../../game-mechanics/applications/APP-0003-seq-n1-transformation-console.md), and the controlling semantic-failure precedent [`APP-0004`](../../../../game-mechanics/applications/APP-0004-num02-semantic-fit-rejection.md).
- **Relevant game/platform lineage:** visible constrained placement and cheap undo from `MEC-0001`; construction/execution/editable trace from `MEC-0002`; deterministic consequence inspection from `MEC-0003`; brief orientation and state-specific revision from `MEC-0004`. These patterns are subordinate to the classroom task family.
- **Missing knowledge researched:** explicit one-unit endpoint marking, deliberate measurement-error tasks, retained traces, build/test/replay patterns, and recovery boundaries.
- **Records added or updated:** the research note above. No new `PRE-*`, `MEC-*`, or `APP-*` record is justified before a local graybox outcome exists.
- **Evidence gaps:** no retained source combines every error family in one task; skipped/doubled count repair is less directly documented than gap/overlap and changed unit; source pages do not establish digital learning effectiveness, French comprehension, age suitability, accessibility equivalence, or fun.
- **Originality boundary:** the 50 cm paver, straight-path planning context, endpoint-ledger interface, replay surface, system evidence model, and all pupil-facing copy below are local hypotheses. They are not established tasks and carry no approval.

Exactly two rationales survived independently. A third command-card or rule-block candidate was not retained: it added syntax or abstract rule manipulation without a stronger causal account of the approved measurement operation.

## Candidate A — Endpoint relay

### Provenance

- **Candidate ID / target:** `MES01-FIT-A-endpoint-relay`
- **Established classroom task/problem precedents:** `[LT]²` *Building Down to Iteration* and *The Helpful Elf*; Math Learning Center Grade 2 single-unit “giant foot” with a partner marking each endpoint; Math Learning Center Grade 1 intentional-gap discussion; Illustrative Mathematics equal-unit/no-gap/no-overlap reasoning.
- **Source-backed pupil task/action:** move one unit repeatedly, retain or mark where it ended, begin the next use there, reject gaps/overlaps or a changed unit, and coordinate the valid interval count with the measured length.
- **Game/platform precedents:** [`PRE-0001 — Sokoban`](../../../../game-mechanics/precedents/PRE-0001-sokoban.md) supports only constrained visible placement and local consequences—not undo; [`PRE-0003 — Unpacking`](../../../../game-mechanics/precedents/PRE-0003-unpacking.md) supports visible rearrangement/revision within contextual constraints; [`PRE-0007 — Brilliant`](../../../../game-mechanics/precedents/PRE-0007-brilliant.md) supports action-first, state-aware feedback. Cheap undo is a local adaptation carried by `MEC-0001`/`APP-0002`, not a source fact attributed to Sokoban.
- **Mechanics memory:** `MEC-0001`, `MEC-0004`, `APP-0002`, and `APP-0004`.
- **Local adaptation:** the pupil uses one visible 50 cm reference paver as a movable length unit along a straight centreline. Each committed placement leaves an ordered start/end interval and an unnumbered endpoint stake. On a separate count rail, the pupil deliberately advances one bead for each interval judged complete; placement commits and count advances remain independent, so a skipped or doubled count stays possible and inspectable. The same paver returns to hand; the pupil places it again, reconciles trace and count, undoes or repairs if needed, and declares the measured length. A second crew then replays the pupil’s endpoint ledger to test reproducibility.
- **What is deliberately not copied:** source characters, castle crack, teacher feet, sticks/cubes, worksheets, dialogue, values, layouts, Sokoban grid/boxes, Unpacking rooms/objects, Brilliant screens, rewards, copy, art, or progression.

### Expected pupil cognition

1. Attend to the named start–finish length along the path centreline, not width, surface coverage, or a pre-existing collection.
2. Keep one 50 cm paver-length invariant and align its start with the path origin.
3. Move that same unit so every new start coincides with the previous endpoint, then separately advance one count bead for that completed interval.
4. Inspect the retained ledger for origin, gap, overlap, changed length, or count/trace mismatch; undo and repair the relation rather than guess a different number.
5. State `n longueurs de pavé`, explain why another crew following the same endpoints obtains the same measure, then repeat independently on a visually changed straight path.

### Scenario and purpose

- **Pre-scenario:** a crew must order the exact number of 50 cm pavers for one straight run. Only one reference paver is available during surveying; no collection is present to count.
- **Why the pupil needs the mathematics:** the order is justified only by a reproducible measurement from the path’s origin to endpoint. A bare number does not show whether the run was actually measured.
- **What consequence makes the decision matter:** the replay crew follows the saved endpoint ledger exactly. A bad origin, gap, overlap, changed unit, or count mismatch remains visible in the replay and does not produce a valid order.
- **Why removing the educational labels would destroy rather than preserve the mechanic’s meaning:** the entire state and success condition are the unit’s along-path length, interval endpoints, continuity, and coordinated count. Replacing them with arbitrary tokens or a score removes the object being constructed; it does not leave an equivalent answer-selection game.

### Proposed mechanic

- **Primary pupil verbs:** locate, align, place, mark, move, inspect, undo, repair, declare, explain.
- **Core moment-to-moment loop:** inspect the current endpoint → position the same paver’s start → preview its interval without auto-correction → commit and leave an unnumbered endpoint → independently advance the count rail → inspect continuity and trace/count agreement → undo/repair either relation or continue → declare and replay.
- **Visible mathematical state:** path origin and endpoint; one reference paver with stable along-axis length; current start/end preview; ordered committed intervals; unnumbered endpoint stakes; a separate pupil-controlled count rail; explicit gap/overlap/origin and trace/count status; undo history; stated measure.
- **Source of challenge:** constructing and maintaining the invariant relation as guidance fades, then deciding whether the complete trace is valid. There is no timer, resource score, random event, area requirement, conversion, or motor-precision bonus.
- **Meaningful decisions:** where the first interval begins; whether the next start truly matches the last end; whether the unit remained invariant; when one completed interval warrants exactly one count advance; whether trace and count agree; whether to commit, inspect, undo, or declare; how the two ledgers justify the stated measure.
- **Mistake information and recovery:** preserve the invalid interval and independent count state, identify the first broken spatial or one-to-one relation, allow one-step undo plus endpoint/count-rail editing, and retain before/after evidence. Do not silently snap an invalid action into correctness or increment the count automatically.
- **Three-scene catalog-graybox possibility:** **orientation** — a short path with explicit start/end, one guided endpoint mark, and an explicit separate count advance; **complication** — a longer path with no placement ghost, independent trace/count ledgers, and recoverable spatial or count mismatches; **independence** — a line-only path in a changed position/appearance, no area cues, no hints, full trace/count reconciliation plus reproducibility replay and pupil statement.
- **Downstream handoff:** unit identity/length, complete interval ledger, count, support level, error families, repairs, final statement, and independent-case status. `MES-02` must separately probe mental projection.

### Semantic mapping

| Learning operation | Pupil/game action | System consequence or inspectable evidence |
|---|---|---|
| Identify the longitudinal magnitude | Select/confirm the named origin and endpoint on the centreline before placing | Stored path axis and endpoint pair; width/surface never enters validity |
| Establish the invariant unit | Reuse the one reference paver; inspect its pinned 50 cm identity | Every interval records the same unit ID and along-axis length |
| Anchor the origin | Align and commit the paver’s start at the path origin | First interval start equals the stored origin; displaced starts remain visible |
| Iterate with continuity | Move the paver and place its start at the prior endpoint | For each adjacent pair, `start[i] = end[i-1]`; gaps/overlaps are measurable ledger states |
| Coordinate iteration and count | After a placement commit, independently advance one bead on the count rail; inspect and edit either ledger | Ordered interval ledger and pupil-controlled bead count can diverge and be reconciled; skips/doubles do not disappear into a final number |
| Inspect and repair | Scrub the ledger, undo or edit the first invalid interval, then continue | Error family, first fault, before/after geometry, and repair action are retained |
| Coordinate number and unit | Declare the measure from the completed trace and finish the French statement | Statement contains count plus `longueurs de pavé`; it must match the valid ledger |
| Explain reproducibility | Send the saved endpoints to the replay crew and explain why it should agree | Identical interval replay and explanation evidence; a bare answer cannot trigger closure |
| Transfer | Build a fresh trace on a relocated line-only whole-unit path | Independent valid trace with no useful area-covering cue |

### Risks and falsification

- **Competing skill or proxy risk:** repeated placement can become rote after the first relation, a paving picture can drift toward area covering, or the count rail can become a detached collection-counting task. Every bead must remain visibly linked to one completed interval, Scene 2 must require inspection/commit decisions, and Scene 3 must be line-only. Speed, decoration, raw bead totals, and drag accuracy cannot score.
- **Accessibility/equivalent-process risk:** pointer drag may measure motor control. Keyboard/touch alternatives must operate on the same endpoint relations with visible previews and explicit commit/undo; they may use semantic anchors or coarse/fine movement, but must not auto-select the correct endpoint. State cannot rely on colour, animation, or sound alone.
- **Implementation risk:** aggressive snapping would erase evidence; permissive pixel tolerances would make validity arbitrary. The graybox must define relation-level coordinates and expose the same state across pointer, keyboard, and touch.
- **Curriculum-boundary risk:** rendered paver width or ordering language could make the task look like area tiling or cardinality. Validity must use only the longitudinal interval, and the independent case must remove surface cues.
- **Kill criterion:** reject if an answer field or “choose 6” card can replace placement while preserving the evidence; if the system automatically enforces origin/continuity or increments the count; if the pupil cannot create and repair a skipped/doubled count independently of geometry; if successful replay can occur with a gap, overlap, changed unit, or mismatched count; or if motor precision predicts success better than endpoint reasoning.

## Candidate B — Trace debugger

### Provenance

- **Candidate ID / target:** `MES01-FIT-B-trace-debugger`
- **Established classroom task/problem precedents:** `[LT]²` *Mr. Mix-Up’s Measuring Mess*; Math Learning Center’s deliberately malformed gap example; Illustrative Mathematics peer-measurement judgments separating irrelevant colour from equal along-path unit length and no gaps/overlaps; `[LT]²` endpoint/ruler-construction tasks.
- **Source-backed pupil task/action:** inspect another measurer’s process, identify the governing relation that failed, teach or perform the repair, and explain why the corrected procedure is valid.
- **Game/platform precedents:** [`PRE-0004 — Human Resource Machine`](../../../../game-mechanics/precedents/PRE-0004-human-resource-machine.md), [`PRE-0005 — Opus Magnum`](../../../../game-mechanics/precedents/PRE-0005-opus-magnum.md), [`PRE-0006 — Into the Breach`](../../../../game-mechanics/precedents/PRE-0006-into-the-breach.md), and `PRE-0007`, only for bounded construction, visible execution/preview, trace inspection, revision, and action-first support.
- **Mechanics memory:** `MEC-0002`, `MEC-0003`, `MEC-0004`, `APP-0003`, and `APP-0004`.
- **Local adaptation:** an apprentice crew submits an ordered paver-placement trace. The pupil replays it one interval at a time, stops at the first invalid relation, edits the actual start/end, unit, or count event, and reruns the trace. The independent scene removes the supplied plan and requires the pupil to author a complete valid trace before replay.
- **What is deliberately not copied:** source characters, teacher performance/dialogue, cube/shoe scenes, worksheets, office/alchemy/mech settings, command languages, machine parts, optimization metrics, threat framing, screens, layouts, art, animation, sounds, or copy.

### Expected pupil cognition

1. Identify the intended start–finish length and the rule that one invariant paver must be iterated endpoint-to-endpoint.
2. Step through ordered placements and coordinate each interval, unit identity, and count event with the preceding state.
3. Locate the **first** broken relation rather than merely notice that the final number is wrong.
4. Edit the mathematical state, rerun, and use the changed trace to explain why the repair works.
5. Author and execute a complete trace independently on a new line-only path, state the measure with its unit, and explain reproducibility.

### Scenario and purpose

- **Pre-scenario:** before a crew orders or lays pavers, its survey trace must be signed off. The submitted plan can contain one inspectable error; rejecting it with only “wrong” is insufficient because the crew needs a corrected procedure.
- **Why the pupil needs the mathematics:** the only way to locate and repair the first faulty step is to coordinate origin, invariant unit, endpoint continuity, and count through time. Final-number comparison cannot identify the cause.
- **What consequence makes the decision matter:** deterministic replay shows where the crew’s next paver actually begins and ends. Editing the root relation changes every downstream state; a reason label without state repair leaves the plan invalid.
- **Why removing the educational labels would destroy rather than preserve the mechanic’s meaning:** the trace has no arbitrary command syntax. Its only executable operations are paver intervals, endpoint succession, unit identity, and count events; remove those and there is nothing left to debug.

### Proposed mechanic

- **Primary pupil verbs:** replay, step, inspect, stop, locate, edit, rerun, author, justify.
- **Core moment-to-moment loop:** inspect path and stated measure → step through the submitted interval trace → stop at the first divergence → edit the underlying placement/unit/count relation → replay deterministically → explain → author a fresh trace.
- **Visible mathematical state:** synchronized path, current paver interval, previous endpoint, unit identity/length, count event, ordered ledger, first-fault marker, downstream states, edit history, and final stated measure.
- **Source of challenge:** causal diagnosis across one error family at a time, followed by independent construction. Order matters because each interval’s start depends on the previous endpoint; no artificial checkpoint or optimization score is added.
- **Meaningful decisions:** whether the current transition is still valid; where the first fault occurs; which relation—not merely which label—must change; whether rerun now supports the stated measure; how to author an error-free plan without a supplied model.
- **Mistake information and recovery:** keep the faulty replay visible, permit scrub/step controls and local edits, show the first relation affected by the edit, and preserve the explanation/repair history. Hints may successively name the magnitude, then the relation, then demonstrate the repair; a reveal requires a fresh independent case.
- **Three-scene catalog-graybox possibility:** **orientation** — replay one short trace with an obvious gap, stop it, and repair the interval; **complication** — diagnose one less-visible origin, changed-unit, overlap, or count-event fault without a prepared answer list; **independence** — start from a blank trace, author all placements for a changed line-only path, run it, repair if needed, and state/explain the measure.
- **Downstream handoff:** first-fault location, error family, repair action, replay count, authored independent ledger, unit/count statement, support/reveal status, and reproducibility explanation. No `MES-02` estimate is collected.

### Semantic mapping

| Learning operation | Pupil/game action | System consequence or inspectable evidence |
|---|---|---|
| Identify magnitude and rule | Confirm path endpoints and restate the invariant-unit/continuity rule before replay | Stored target interval and rule acknowledgement; area and loose-object counts are absent |
| Establish unit invariance | Compare current interval’s unit identity/length with the reference during replay | Changed-size units become an explicit first divergence; colour-only changes do not |
| Anchor the origin | Inspect the first executed interval and edit its start when displaced | First interval start is recorded against the path origin; all downstream effects update after repair |
| Iterate with continuity | Step from one interval to the next and inspect prior end/current start | Replay exposes exact equality, gap, or overlap at each transition |
| Coordinate count and interval | Inspect the count event synchronized with every committed interval | Skipped/doubled events are distinguishable from spatial continuity faults |
| Locate cause, not only outcome | Stop replay at the first invalid transition and select the state element to edit | First-fault index, pre-edit state, and chosen repair are retained; final-number guessing cannot pass |
| Repair and explain | Change the actual start/end, unit, or count event; rerun; explain changed consequence | Deterministic before/after traces and explanation evidence show whether the governing relation was restored |
| Construct independently | Author every interval in a blank plan and execute it on a new path | Full valid ledger without supplied faulty work; diagnosis alone cannot close the checkpoint |
| State and transfer | Report `n longueurs de pavé`, justify reproducibility, and complete the line-only case | Unit-bearing statement matches the independent ledger and survives representation change |

### Risks and falsification

- **Competing skill or proxy risk:** diagnosing another pupil’s trace can assess error recognition while hiding inability to measure. Independent blank-trace authoring is mandatory. Do not score speed, memory of error labels, or command vocabulary.
- **Accessibility/equivalent-process risk:** simultaneous path, ledger, and replay state can overload attention. Reveal one transition at a time, keep controls discrete and native, announce state changes textually, preserve focus, avoid time pressure, and provide non-motion step mode.
- **Implementation risk:** `APP-0003` showed that route machinery and jargon can overwhelm the concept. There must be no general-purpose command language, no decorative checkpoints, and no optimization layer. Editing must change the represented interval directly.
- **Curriculum-boundary risk:** displaced-origin cases can drift into ruler reading, and varied faults can become a broad assessment battery. Keep every case on an ungraduated straight path with whole paver-lengths and exactly one focal relation before the independent case.
- **Kill criterion:** reject if the pupil can pass by choosing an error-family label or corrected number without editing/re-executing the trace; if the supplied plan remains in the independent scene; if replay hides intermediate endpoints; if syntax/debugging load dominates measurement; or if any fault requires ruler, conversion, area, fraction, or motor skill outside the approved contract.

## Candidate comparison

Both candidates have an independent semantic case; neither exists to satisfy a quota.

| Dimension | A — Endpoint relay | B — Trace debugger |
|---|---|---|
| Established task family | Move one unit and mark every endpoint | Inspect, explain, and repair malformed measurement; then construct independently |
| Expected cognitive emphasis | Construct the operation from the first placement | Diagnose the first broken relation and prove construction after repair |
| Primary verbs | align, place, mark, move, inspect, undo | replay, step, stop, locate, edit, rerun, author |
| Visible mathematical state | Live paver plus pupil-authored interval ledger | Ordered submitted/authored trace with synchronized execution state |
| Source of challenge | Maintain origin, invariance, continuity, and count as support fades | Find the causal first fault, repair state, then author without a supplied plan |
| Error information and recovery | Invalid committed interval remains visible; direct undo/edit | Deterministic before/after replay; scrub and local edit |
| Intellectual-play opportunity | Build a reproducible endpoint relay and watch another crew follow it | Debug a causally linked process and see downstream state change |
| Main risk | Repetition becomes rote or motor-precision work | Debugger machinery/reading load displaces direct measurement |
| Strongest falsification | Auto-snap or final number replaces construction | Error label/corrected number replaces state repair, or independence is omitted |
| Downstream evidence | Full self-authored ledger and repair history | Fault diagnosis plus full independent authored ledger |

## Owner semantic-fit dispositions

Record one independent disposition per candidate. Allowed dispositions are `approve for catalog graybox`, `approve with named graybox constraints`, `revise rationale`, `reject candidate`, or `park checkpoint`.

| Date | Candidate | Disposition | Rationale / constraints | Catalog exercise authority |
|---|---|---|---|---|
| 2026-07-16 | `MES01-FIT-A-endpoint-relay` | `approve with named graybox constraints` | Historical approval; later owner replay found the implemented adaptation bad/broken. | historical graybox only; no replacement or expansion authority |
| 2026-07-16 | `MES01-FIT-B-trace-debugger` | `approve with named graybox constraints` | Historical approval; replaced after owner found the implemented adaptation bad/broken. | superseded for EX-0005; no expansion authority |
| 2026-07-17 | `MES01-FIT-A2-minecraft-attachment` | `revise rationale/card`, then superseded | Construction/adjacency tested the wrong skill; the owner later rejected that direction. | none |
| 2026-07-17 | `MES01-FIT-B2-log-roll-crossing` | `approve replacement for catalog graybox` | One discrete fixed-distance push/roll; no prospective slots/count; behavioral-only evidence; visible world consequence and cheap undo. | replacement EX-0005 low-fi catalog graybox |
| 2026-07-18 | `MES01-FIT-B2-log-roll-crossing` | `approve mechanic expansion` | Replay approval includes the retained-calibration prediction bridge; the owner explicitly withheld approval of any `MES-02` learning contract. | EX-0005 full progression, interaction, motion, and art-direction work only |
| 2026-07-17 | `MES01-FIT-A3-frog-jump-prediction` | `approve disposable bridge graybox` | Direct-tap tutorial; then integer prediction with automatic short/exact/over resolution; true square unit grid; horizontal/vertical transfer; later mandatory two-unit obstacle jump. Diagonal and direction-change mechanics remain deferred. | replacement EX-0004 low-fi bridge graybox only |

### Recorded owner responses

#### Historical 2026-07-16 responses

- **Candidate A exact response:** `Approve + constraints (Recommended)`
- **Candidate A normalized disposition:** `approve with named graybox constraints`
- **Candidate B exact response:** `Approve + constraints (Recommended)`
- **Candidate B normalized disposition:** `approve with named graybox constraints`
- **Shared pre-record artifact digest:** `sha256:81409988ab623d12ed27837ea63dcd20604a5d7dfaeb4a298ebd7e41ca1bd057`

#### 2026-07-17 replacement responses

- **Historical EX-0004 Minecraft-card exact response:** `Revise the card`
- **Historical EX-0004 normalized disposition:** `revise rationale/card`; later superseded and rejected for weak mathematical fit.
- **EX-0005 replacement-card exact response:** `Build graybox (Recommended)`
- **EX-0005 normalized disposition:** `approve replacement for catalog graybox`.
- **Evidence-mode exact response:** `Behavioral only (Recommended)`
- **Evidence-mode normalized disposition:** `behavioral-only`.
- **EX-0004 revised-graybox exact response:** `implement the graybox now`.
- **EX-0004 normalized disposition:** `approve disposable bridge graybox`; integer prediction is scoped to the bridge hypothesis and does not approve the MES-02 learning contract.
- **EX-0005 replay disposition (2026-07-18):** `approve mechanic expansion`; retained-calibration prediction remains a bounded bridge hypothesis and does not approve the `MES-02` learning contract.
- **Recorded by / role:** repository owner acting as product, classroom, and curriculum owner.
- **Recorded at:** 2026-07-18.

`MES01-FIT-A3-frog-jump-prediction` now has clear owner authority for UI/art expansion of EX-0004 in the active bridge scope. `MES01-FIT-B2-log-roll-crossing` retains replacement-graybox authority only and still needs its own replay/go-ahead. Neither decision approves the MES-02 learning contract, establishes efficacy, authorizes promotion, or propagates to unrelated scope.
