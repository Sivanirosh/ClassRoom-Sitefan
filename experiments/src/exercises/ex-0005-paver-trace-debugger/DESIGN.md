# EX-0005 — Le contrôle des traces

## Workflow provenance

- **Roadmap / bounded-scope authority:** [`6h-mathematics-roadmap.md`](../../../curriculum/roadmaps/6h-mathematics-roadmap.md), bounded `MES-01 → MES-02` pilot only
- **Sequence spine and owner disposition:** [`SEQ-M1/SEQUENCE-SPINE.md`](../../../design/sequences/seq-m1/SEQUENCE-SPINE.md), `approve bounded pair spine`, `r0-bounded-measurement-pair`
- **Sequence / checkpoint ID:** `SEQ-M1 / MES-01`
- **Learning brief and owner learning-contract disposition:** [`MES-01/LEARNING-BRIEF.md`](../../../design/sequences/seq-m1/mes-01/LEARNING-BRIEF.md), `approve learning contract`, `r0-unit-iteration-contract`
- **Semantic-fit rationale and owner candidate disposition:** [`MES-01/MECHANIC-FIT.md`](../../../design/sequences/seq-m1/mes-01/MECHANIC-FIT.md), `MES01-FIT-B-trace-debugger`, `approve with named graybox constraints`, pre-record `sha256:81409988ab623d12ed27837ea63dcd20604a5d7dfaeb4a298ebd7e41ca1bd057`
- **Named graybox constraints:** direct state edits; no prepared answer list; exactly one focal fault before transfer; mandatory blank-plan transfer; non-motion step mode
- **Established classroom task sources:** [`mes-01-unit-iteration-mechanic-precedents.md`](../../../curriculum/research/mes-01-unit-iteration-mechanic-precedents.md), especially `[LT]²` *Mr. Mix-Up’s Measuring Mess*, Math Learning Center’s deliberate gap, and Illustrative Mathematics peer-measurement judgments
- **Optional graybox working script:** none; this document is the three-scene source of truth
- **Precedent records (`PRE-*`):** [`PRE-0004`](../../../game-mechanics/precedents/PRE-0004-human-resource-machine.md), [`PRE-0005`](../../../game-mechanics/precedents/PRE-0005-opus-magnum.md), [`PRE-0006`](../../../game-mechanics/precedents/PRE-0006-into-the-breach.md), [`PRE-0007`](../../../game-mechanics/precedents/PRE-0007-brilliant.md)
- **Mechanic records (`MEC-*`):** [`MEC-0002`](../../../game-mechanics/mechanics/MEC-0002-program-execute-inspect-revise.md), [`MEC-0003`](../../../game-mechanics/mechanics/MEC-0003-telegraphed-consequences-and-checkpoints.md), [`MEC-0004`](../../../game-mechanics/mechanics/MEC-0004-action-first-interactive-learning.md)
- **Application record (`APP-*`):** create after owner replay
- **Owner expansion gate:** pending; no `mechanic approved for expansion`

Follow [`prototype-production-workflow.md`](../../../design/prototype-production-workflow.md). Current authority covers this catalog graybox only.

## Decision summary

The approved candidate begins with the established task family in which pupils inspect and repair another measurer’s flawed process. The digital layer makes the ordered interval trace executable and directly editable. The pupil must locate the first faulty relation, alter its actual geometry, and rerun the consequence. To prevent error recognition from substituting for measurement, the independent scene starts from a blank plan.

The primary verbs are **replay, step, inspect, stop, mark, edit, rerun, author, justify**. The challenge is causal: one broken relation shifts downstream state. A corrected number or error-family choice cannot pass because no answer list exists and success requires a state edit plus a fresh authored trace.

## Approved learning contract

- **Core learning:** measuring a length with a shorter unit means repeating the same invariant unit from the length’s origin to its endpoint, placing each repetition exactly at the previous endpoint without gaps or overlaps; the repetition count expresses the length in that unit.
- **Successful-pupil statement:** **« J’ai gardé le même pavé de 50 cm. Je l’ai répété depuis le début du chemin, chaque fois juste au bout du précédent, sans trou ni chevauchement. Le pavé tient 6 fois : le chemin mesure 6 longueurs de pavé. »**
- **Expected cognitive process:** identify magnitude and rule → inspect ordered placements → locate first broken relation → edit state → rerun → coordinate count/unit → construct independently → explain reproducibility.
- **Required representation/evidence:** path endpoints; invariant unit; ordered causal trace; first-fault location; direct edit; before/after replay; count events; blank-plan construction; structured trace citations; retained pupil-authored unit-bearing explanation.
- **Downstream handoff:** fault family/location, repair, reruns, independent ledger, support/reveal status, and explanation. No `MES-02` estimate is collected.

## Semantic-fit mapping carried into the graybox

| Learning operation | Pupil/game action | System consequence or inspectable evidence | Scene(s) testing it |
|---|---|---|---|
| Identify magnitude/rule | Read origin, arrival, reference paver, and replay purpose | Target interval and invariant reference remain visible | 1–3 |
| Inspect origin/continuity | Advance the trace one interval at a time | Each start is derived from the prior end plus its stored offset | 1, 3 |
| Inspect invariance | Compare executed interval length with the reference | Changed unit length is visible without an error-label choice | 2 |
| Locate cause | Stop and mark the first faulty interval | Mark index is retained before any direct edit | 1–2 |
| Repair actual state | Shift the interval start or shorten its unit directly | Downstream intervals recompute from the repaired relation | 1–2 |
| Re-execute | Run the complete trace after editing | Before/after terminal endpoint and all intermediate relations are inspectable | 1–2 |
| Coordinate count | Add one count event to each authored interval | Missing/doubled events remain distinct from geometry | 3 |
| Construct independently | Add and align every interval on a blank plan | No supplied faulty trace remains available | 3 |
| Explain from trace | Cite unit, endpoint relation, and measure; write an explanation in the pupil’s own words | Citations derive from the repaired/authored intervals and pupil text is retained | 1–3 |
| State/transfer | Run the line-only plan and report named units | Independent valid ledger and retained pupil-authored statement | 3 |

If a corrected number, error label, or multiple-choice reason could replace direct edit and blank-plan authoring, reject this candidate.

## Curriculum alignment

- **Framework:** PER
- **Cycle / years:** Cycle 2 / 6H pilot
- **Objective codes:** MSN 24
- **Source IDs:** `src-per-0002`; roadmap statements `P24.02`, `P24.06`
- **Direct curriculum interpretation:** `MES-01` concerns constructing and repeating a unit to measure a length, with continuity and unit invariance.
- **Design interpretation:** the apprentice-crew fiction, executable trace, direct editor, exact faults, three scenes, and copy are local hypotheses. Source tasks do not establish digital effectiveness, accessibility equivalence, age fit, French comprehension, or fun.

## Observable learning objective

Given an ordered measurement trace, the pupil identifies and repairs its first invalid origin, continuity, or unit relation by editing the represented interval and rerunning it; then, without a supplied trace, the pupil independently constructs a valid whole-unit measurement with one count event per interval.

## Prerequisites and vocabulary

- **Stable prerequisites:** identify start/end; follow three or four ordered states; compare a repeated reference length; count a short ordered series.
- **Familiar representations:** straight line, paver-length bracket, ordered trace cards, start/end marks.
- **Essential French copy/vocabulary:** `rejouer`, `pas à pas`, `première relation`, `début`, `bout`, `décalage`, `unité`, `raccourcir`, `trace vide`, `sans trou ni chevauchement`.

Missing prerequisites pause the route; the graybox does not hide a debugging or ruler-reading lesson.

## Misconceptions and productive difficulty

The focal task errors are one gap produced by a shifted start and one changed-length unit. Each supplied scene contains exactly one root fault; downstream displacement is a consequence, not another authored fault. The blank scene tests whether diagnosis transfers to construction.

Productive difficulty is locating the earliest causal divergence and deciding which represented quantity to edit. Incidental difficulty must not come from command syntax, an error taxonomy, animation timing, text-heavy simultaneous panels, drag precision, or memory of a supplied answer.

## Evidence of learning

Retain locally for the replay only:

- step index reached before diagnosis;
- marked interval index;
- pre-edit offset/length and direct edit action;
- deterministic before/after terminal endpoint;
- run attempts;
- every independently authored interval and count event;
- first invalid relation found in the blank plan;
- the structured trace citations selected after a valid run;
- the retained pupil-authored unit-bearing explanation.

Selecting an error name, reading a highlighted answer, fixing only the final number, or passing supplied traces without the blank scene is not evidence.

## Core mechanic hypothesis

> If the pupil repeatedly **steps, marks, edits, reruns, and authors** an interval trace within **origin, invariant-unit, continuity, and one-count-per-interval constraints**, while **each causal state and downstream consequence remains inspectable**, then **the measuring procedure becomes debuggable and independently constructible**.

- **Primary verbs:** step forward/back, inspect, mark, shift/resize, run, add, count, cite, explain, declare.
- **State model:** chained intervals; each step stores a relative start offset, unit length, and count-event total; starts/ends derive deterministically in order; a bounded replay cursor can move backward without resetting edits; structured report citations and pupil-authored explanation text are retained after a valid run.
- **Source of challenge:** identify the first broken relation before editing and prove the rule on a blank plan.
- **Meaningful decisions:** when to stop; which interval caused divergence; whether start or unit length must change; when the trace warrants rerun; how to author the next relation.
- **Feedback/recovery loop:** execute/step → observe terminal or local consequence → mark → edit actual relation → rerun → inspect before/after → author independently.
- **Why mechanically distinct:** unlike Endpoint relay, the first two scenes foreground causal diagnosis of an existing ordered trace; the third scene is a required anti-substitution proof, not the initial loop.

## Three-scene catalog graybox

### Scene 1 — Orientation: « Le trou qui décale tout »

- **Supplied trace:** three invariant units; the second interval begins half a paver after the first endpoint; the third follows the shifted second correctly. Exactly one root fault exists.
- **Essential prompt:** **« Rejoue la trace pas à pas. Arrête-toi sur la première relation qui ne respecte plus “le début juste au bout du précédent”, puis modifie le vrai intervalle. »**
- **Actions:** step forward or backward through the recoverable replay; mark the second interval; shift its start left one relation-step; rerun.
- **Error probe:** run before diagnosis. Feedback names the terminal consequence without selecting the faulty interval: **« Le relevé finit après l’Arrivée. Une relation est encore invalide : rejoue la trace pas à pas et marque la première relation qui casse. »**
- **Required report evidence:** cites the invariant paver, endpoint-to-endpoint relation, and 3 named paver-lengths; final success confirms the repaired arrival and retains the pupil’s explanation.

### Scene 2 — Complication: « L’unité qui a grandi »

- **Supplied trace:** three continuous intervals; only the second unit is one half-step longer than the 50 cm reference. Downstream state follows that changed endpoint. Exactly one root fault exists.
- **Essential prompt:** **« La couleur peut changer, pas la longueur de l’unité. Rejoue, marque la première unité qui ne correspond plus au pavé-étalon, puis raccourcis l’intervalle lui-même. »**
- **Actions:** step; compare visible length/reference; mark; use direct **Raccourcir l’unité**; finish replay; rerun.
- **No answer list:** there is no menu of `trou / chevauchement / mauvaise unité`; the pupil acts on start or length.
- **Required report evidence:** cites the invariant paver, endpoint-to-endpoint relation, and 3 named paver-lengths; final success confirms invariant-unit repair and retains the pupil’s explanation.

### Scene 3 — Independent challenge: « Plan vierge »

- **Representation:** a relocated line-only path four paver-lengths long; no supplied trace, fault, highlighted interval, or model answer.
- **Essential prompt:** **« Le plan est vide. Ajoute chaque pavé, règle son début pour qu’il touche le bout du précédent, puis compte chaque intervalle une fois. Lance ensuite ta propre trace. »**
- **Authoring behavior:** the first interval begins at the origin; each later draft initially overlaps the previous interval and must be shifted through direct state controls. Adding an interval never creates its count event.
- **Closure:** four invariant, continuous intervals; four singly linked count events; final endpoint at arrival; structured citations to unit/continuity/4 named paver-lengths; retained pupil-authored explanation.
- **Why mandatory:** diagnosis alone cannot close `MES-01`; the pupil must produce the operation independently.

### Included before mechanic approval

- Exactly these three scenes
- Two supplied traces with one focal root fault each
- Non-motion manual step mode as the default and only replay mode
- Direct geometry edits; no answer list
- Mandatory blank-plan construction with independent counting
- Relation-level native controls for pointer, touch, and keyboard
- Deterministic smoke plans for failed run, diagnosis, repair, blank authoring, and completion

### Excluded before mechanic approval

- Additional fault families, levels, or randomized traces
- `MES-02` estimation, ruler use, conversion, area, partial-unit outcomes, and curved paths
- Command language, optimization, scoring, timer, autoplay, decorative checkpoints, generated artwork, persistence, telemetry, teacher integration, and production polish

## Owner playtest and mechanic gate

| Date | Owner observation or requested change | Disposition |
|---|---|---|
| 2026-07-16 | Semantic-fit rationale approved with named graybox constraints; catalog replay still pending | Build this low-fi catalog graybox only |

**Current gate:** pending owner replay. Expansion requires the exact phrase `mechanic approved for expansion` scoped to `EX-0005` + `SEQ-M1` + `MES-01`.

## Full exercise progression

Blocked until the current gate passes. No progression beyond the three graybox scenes is authorized.

## Full storyboard

Blocked until the current gate passes. The exact graybox interactions and copy are defined above.

## Feedback and scaffolding

Before diagnosis, **Lancer toute la trace** reports only the terminal consequence and invites step replay; it does not reveal the fault location. A wrong mark still receives only generic terminal/relationship feedback. Detailed fault text becomes available only when the pupil has marked the actual first invalid interval. Step mode reveals one interval at a time and **Pas précédent** lets the pupil recover after advancing beyond the focal relation without resetting edits. Direct edits clear stale error feedback and recompute downstream geometry.

Scene 2 changes the fault dimension from start relation to unit invariance. Scene 3 removes the supplied trace, diagnosis prompt, and highlighted fault. No auto-repair, autoplay, or final-number correction exists.

## Content model

A trace step stores `{offsetHalf, lengthHalf, countEvents}`. Its start is the origin plus `offsetHalf` for step 1, or the previous derived endpoint plus `offsetHalf` thereafter. Its end is `startHalf + lengthHalf`. The invariant unit length is two half-steps. The rendered reference bracket is visibly labelled `50 cm`, and it and every valid interval derive their width from `targetUnits`, so the reference remains one unit in both three- and four-unit scenes.

The half-step is an interaction coordinate for making errors visible, not a requested fractional measure. Valid closure requires:

1. exactly the target number of intervals;
2. every `offsetHalf = 0`;
3. every `lengthHalf = 2`;
4. every `countEvents = 1`;
5. the final derived endpoint equals `targetUnits × 2`.

Scene 1 has offsets `[0, 1, 0]`; Scene 2 has lengths `[2, 3, 2]`; Scene 3 begins empty. Editing a root interval shifts downstream derived starts deterministically.

## Interaction states

1. `intro` — purpose and manual replay controls.
2. `active-replay` — no auto motion; step reveals one derived interval.
3. `diagnosis` — pupil marks the current interval.
4. `direct-edit` — shift start or resize unit; downstream state recomputes.
5. `active-authoring` — blank trace; add, align, and count each interval.
6. `run-error` — active state with terminal or relation-specific evidence.
7. `report` — valid trace frozen for structured unit/continuity/measure citations and a pupil-authored explanation; reopening returns to replay/authoring and requires another valid run.
8. `success` — valid trace plus retained pupil-authored unit-bearing statement.
9. `complete` — bounded replay complete; no expansion claim.

## Accessibility and devices

- Replay is manual and non-motion by default; no information requires animation timing.
- Pointer, touch, and keyboard activate the same native step, mark, direct-edit, add, count, and run controls.
- Every revealed interval has a textual description of start, end, unit length, and count state.
- Forward and backward replay use native buttons and preserve the direct-edit state.
- The report uses a labelled textarea; deterministic smoke fills the same ordinary text control used by a pupil, with no smoke-only completion branch.
- The path and trace cards expose current/marked/fault consequences through text and structure, not colour alone.
- Controls target at least 44 px, preserve focus, and stack at 320 px without horizontal document overflow.
- No drag, exact pixel targeting, hover-only content, timer, or command syntax is required.
- The current interval is announced in a polite live region.

## Motion and artwork decisions

No motion or generated artwork is included. Manual stepping is itself an owner constraint; static CSS geometry and before/after text are sufficient for the graybox decision.

## Final validation evidence

Before owner replay, record only lightweight technical operability: catalog validation, typecheck, deterministic keyboard/touch contract, hidden pre-diagnosis fault location, recovery after stepping past the focal fault, direct edit, correctly scaled reference bracket, mandatory blank construction, and absence of console/network errors. These checks do not establish learning, French comprehension, accessibility equivalence, fun, or expansion readiness.

## Findings and decisions

- **2026-07-16 — Candidate authority:** owner chose `Approve + constraints (Recommended)`, normalized to `approve with named graybox constraints`.
- **2026-07-16 — Graybox implementation decision:** represent traces as chained relative intervals so one root edit changes downstream state; replay never animates automatically.
- **2026-07-16 — Anti-substitution boundary:** the third scene starts empty and requires direct construction plus count; supplied-trace diagnosis alone cannot complete the exercise.
- **2026-07-16 — Independent-review repair:** added bounded backward replay so advancing past the focal fault cannot dead-end diagnosis; added that recovery to both deterministic smoke paths; kept fault-location feedback hidden until the first invalid interval is actually marked; disabled no-op direct edits at their limits; derived the visible reference-unit width from each scene’s target; made error feedback focusable; added an explicit trace-citation and pupil-authored report gate before success.
- **2026-07-16 — Explanation boundary:** keyword checks only prevent an empty or unitless technical path. They do not establish the quality, truth, French comprehension, or learning value of the pupil’s explanation; owner/pupil review remains required.
- **Evidence still missing:** owner catalog replay, pupil reasoning, French comprehension, accessibility equivalence, fun, and any expansion disposition.

## Promotion criteria

No promotion is authorized. The immediate next decision is owner replay of this catalog graybox. Any later expansion must first record `mechanic approved for expansion` for `EX-0005` + `SEQ-M1` + `MES-01`; production promotion would still require later learning, accessibility, technical, and classroom evidence.
