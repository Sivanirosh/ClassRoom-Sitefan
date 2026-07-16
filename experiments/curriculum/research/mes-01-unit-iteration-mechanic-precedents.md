# Research: MES-01 unit-iteration and measurement-repair precedents

**Research/access date:** 2026-07-16

## Summary

Primary sources establish two closely connected classroom-task families for the approved MES-01 contract: pupils **iterate one invariant unit end-to-end while preserving endpoint marks**, and pupils **inspect a flawed measurement, name the broken relation, and repair it**. University learning-trajectory activities directly cover one-unit iteration, placeholder marks, gaps/overlaps, and erroneous measuring; official game sources separately support build–test–inspect, visible consequence, replayable constructions, and undo as interaction patterns. These are precedents, not evidence that a proposed digital adaptation is effective, and they grant no mechanic, catalog, code, or implementation authority.

## Source facts — classroom task families

1. **Progressively “build down” from a row of units to one repeatedly moved unit.** The University of Denver’s Learning and Teaching with Learning Trajectories (`[LT]²`) describes *Building Down to Iteration*: the teacher removes physical units until the child must iterate one unit accurately and appreciate the need for precision and a placeholder. This is a direct precedent for moving one invariant endpoint-to-endpoint while retaining where the last placement ended. [[LT]²: Building Down to Iteration](https://www.learningtrajectories.org/math-activities/building-down-to-iteration)

2. **Leapfrog one or two units and mark each endpoint.** In *The Helpful Elf*, children measure a castle-floor “crack” with one or two one-inch manipulatives, either leapfrogging two or moving one and marking each unit end; the measured length determines the tape needed for repair. This joins invariant iteration, a persistent trace, and a concrete repair purpose; any digital undo or recovery loop remains a local adaptation hypothesis. The Math Learning Center independently asks how to measure a distance with a single “giant foot” and names partner-marking of the tip before moving the unit as a way to set the next heel accurately. [[LT]²: The Helpful Elf](https://www.learningtrajectories.org/math-activities/the-helpful-elf-length-unit-relater-and-repeater) · [Math Learning Center, Grade 2 Supplement D2](https://www.mathlearningcenter.org/sites/default/files/pdfs/SecB2SUP-D2_MeasLengCust-201304.pdf)

3. **Construct a ruler by iterating one unit, marking intervals, then labeling counts.** `[LT]²`’s *Make a Ruler*, *The “Accidental” Ruler*, and *Workin’ on the Railroad* use repeated placement of one unit to create interval marks; the ruler’s numerals express how many units extend from zero, and the constructed ruler is then used to choose repair pieces. These are strong precedents for a trace whose geometry and count can be checked separately. [[LT]²: Make a Ruler](https://www.learningtrajectories.org/math-activities/make-a-ruler) · [[LT]²: The “Accidental” Ruler](https://www.learningtrajectories.org/math-activities/the-accidental-ruler) · [[LT]²: Workin’ on the Railroad](https://www.learningtrajectories.org/math-activities/workin-on-the-railroad-length-unit-relater-and-repeater)

4. **Make errors visible and ask pupils to diagnose and teach the repair.** In *Mr. Mix-Up’s Measuring Mess*, the adult deliberately models class-relevant errors, including sliding a one-inch cube while merely counting, losing track of the next endpoint and creating large spaces/overlaps, and using a ruler incorrectly. Pupils answer what was wrong, teach the correct procedure, and explain how to keep track. This directly supports an inspect–explain–repair family rather than answer-only correction. [[LT]²: Mr. Mix-Up’s Measuring Mess](https://www.learningtrajectories.org/math-activities/mr-mixups-measuring-mess-length-unit-relater-and-repeater)

5. **Use deliberate malformed examples for gap repair.** The Math Learning Center’s Grade 1 non-standard-length unit has a teacher lay identical sticks heel-to-toe but intentionally leave a large gap, invite pupils to object, and discuss why spaces are not acceptable before counting. Its wider sequence measures end-to-end with identical units. This is first-party curriculum evidence for diagnosing continuity before accepting the count. [Math Learning Center, Grade 1 Supplement D2](https://www.mathlearningcenter.org/sites/default/files/pdfs/SecB1SUP-D2_MeasureNonStdLngth-201304.pdf)

6. **Vary irrelevant attributes while preserving equal along-path unit length.** Illustrative Mathematics asks pupils to assess peers’ cube measurements and distinguish irrelevant colour from governing conditions: same-size units placed end-to-end with no gaps or overlaps. The lesson also compares measurements made with differently sized units. It supports both unit invariance and “changed unit” detection, without making appearance itself the target. [Illustrative Mathematics, Grade 1 Unit 6 Lesson 7](https://curriculum.illustrativemathematics.org/k5/teachers/grade-1/unit-6/lesson-7/lesson.html)

7. **Treat origin and count as interval relations, not printed-number reading.** `[LT]²`’s *Make a Ruler* explicitly relates labels to the number of iterated intervals from zero. *Broken Ruler* removes initial labels (including 0 and 1) and asks pupils still to measure correctly. This is source evidence for reasoning from the object’s two endpoints and interval difference when the printed origin is displaced or absent; it is not a reason to introduce graduated-ruler reading into MES-01. [[LT]²: Broken Ruler](https://www.learningtrajectories.org/math-activities/broken-ruler) · [[LT]²: Make a Ruler](https://www.learningtrajectories.org/math-activities/make-a-ruler)

8. **The official curriculum basis remains measurement, not loose-object counting.** PER MSN 24 specifies organizing a measurement, choosing a conventional or non-conventional unit and procedure, and estimating lengths by reporting/repeating a given unit. This supports keeping the trace, invariant unit, origin, and continuity causally prior to the numerical answer. [CIIP/PER MSN 24](https://per.ciip.ch/api/files/18)

## Source facts — game interaction patterns

9. **Build, test, and visibly inspect consequence.** Headup’s official *Bridge Constructor* page says players create constructions and then watch vehicles cross or fall when a construction collapses; stress tests expose whether it withstands loads, and a colour-coded load indicator shows material stress. An official platform manual also documents separate simulation/edit modes and undo of the last construction step. These are first-party facts about an inspectable build–test–edit loop with visible failure and cheap local recovery. [Headup: Bridge Constructor](https://www.headupgames.com/game/bridge-constructor) · [Official game manual hosted by Xbox](https://dlassets-ssl.xboxlive.com/public/content/43055778-5414-42b8-9aec-cca0e7b11e70/GameManual/8bd1e8a6-1056-4c4d-a593-9e86c158b95f/en-SG/index.html)

10. **Preserve a construction and replay it as an inspectable artifact.** Zachtronics describes *Opus Magnum* as designing and building machines that carry out processes, with symbol-programmed machinery; solutions can be exported as animated GIFs. The source supports visible constructed state and repeatable playback/export, but does **not** itself document a pedagogical debugger or prove deterministic replay semantics. [Zachtronics: Opus Magnum](https://zachtronics.com/opus-magnum/) · [Zachtronics: Zachademics](https://www.zachtronics.com/zachademics/)

11. **Make governing rules manipulable and recovery stateful.** Hempuli’s official *Baba Is You* page states that rules are physical objects in the world and can be manipulated; developer patch notes explicitly refer to an “undo buffer.” This supports the general patterns “make the operative rule inspectable” and “allow reversible local actions,” not copying its Sokoban movement or word-block rule system. [Hempuli: Baba Is You](https://www.hempuli.com/baba/) · [Developer patch notes, v1.0.5](https://www.hempuli.com/blog/index.php?rule=id&ruleid=484)

## Repository mechanics-memory relevance

The repository search retained existing patterns rather than inventing a new `MEC-*` record before replay:

- [`MEC-0001 — Constrained spatial organization`](../../game-mechanics/mechanics/MEC-0001-constrained-spatial-organization.md) plus [`MEC-0004 — Action-first interactive learning`](../../game-mechanics/mechanics/MEC-0004-action-first-interactive-learning.md) support a construction-first hypothesis in which direct placement changes a visible interval trace and undo preserves the mathematics.
- [`APP-0002`](../../game-mechanics/applications/APP-0002-seq-n1-exchange-workbench.md) warns that discrete controls, visible invariants, inverse actions, and one coherent surface worked better than text-heavy controls or drag precision. That is an adaptation lesson, not evidence for measurement learning.
- [`MEC-0002 — Program, execute, inspect, revise`](../../game-mechanics/mechanics/MEC-0002-program-execute-inspect-revise.md), [`MEC-0003 — Telegraphed consequences and ordered checkpoints`](../../game-mechanics/mechanics/MEC-0003-telegraphed-consequences-and-checkpoints.md), and `MEC-0004` support a plan/replay/repair hypothesis only if each intermediate state is a real paver interval rather than command syntax.
- [`APP-0003`](../../game-mechanics/applications/APP-0003-seq-n1-transformation-console.md) preserves a useful warning: procedural sequencing is honest only when order and intermediate states matter, and the trace must remain editable; too much simultaneous route information or machine language competes with the learning.
- [`APP-0004`](../../game-mechanics/applications/APP-0004-num02-semantic-fit-rejection.md) remains the controlling failure precedent: technical interactivity and game lineage do not rescue a candidate whose actions could be replaced by generic answer controls without changing the reasoning.

The newly inspected *Bridge Constructor* and *Baba Is You* facts remain in this research note only. No candidate needs their distinctive systems, so no new `PRE-*` or `MEC-*` record is warranted before a local adaptation outcome exists.

## Adaptation hypotheses for MES-01 (not source claims or approvals)

- **Endpoint ledger:** each placement could leave an ordered start/end segment and count label. The pupil moves the same unit again from the previous endpoint; the system retains the trace rather than spawning a collection of loose pavers. This adapts `[LT]²` endpoint marking and ruler construction.
- **Fault injection and relational repair:** a task could present exactly one inspectable flaw—gap, overlap, changed along-path unit length, displaced start, or count/trace mismatch—and require changing that relation before recounting. A generic corrected number must not repair the trace.
- **Deterministic trace playback:** a “replay” control could traverse placements in order, showing unit identity, start, endpoint, and count event on every step. Identical saved actions should yield identical displayed states. This is an engineering/design hypothesis inspired by constructed-machine playback; explicit deterministic semantics are not established by the game sources.
- **Consequence without mathematical drift:** after validation, an object could traverse the measured path and stop/fail exactly at the first unmeasured or double-measured interval. The consequence should reveal the faulty measurement relation, not add probabilistic physics, resource optimization, speed, or motor precision.
- **Cheap recovery:** undo one placement, scrub to an earlier endpoint, or switch from test back to edit while retaining the rest of the trace. Recovery should preserve diagnostic before/after history for the teacher and should not auto-snap away the pupil’s gap/overlap decision.
- **Inspectable invariant:** the reference unit could remain pinned beside every segment, with non-colour cues for any changed along-path length. The rule “same unit, next start at prior end” may be visible, but must not solve the placement automatically.

## Error-family coverage

| MES-01 flaw | Strongest primary precedent | Supported fact | Remaining adaptation work |
|---|---|---|---|
| Gap / overlap | *Mr. Mix-Up*; MLC D2; IM Lesson 7 | Pupils inspect spaces/overlaps and explain correction | Encode exact interval and require direct repair |
| Changed unit | IM Lesson 7; PER MSN 24 | Same-size units govern valid iteration; different unit sizes change the measure | Distinguish along-path mutation from irrelevant appearance |
| Displaced origin | *Make a Ruler*; *Broken Ruler* | Measure is coordinated with intervals from zero/endpoints, even when labels are missing | Create a non-ruler straight-path case so MES-01 does not become ruler reading |
| Count mismatch | *Make/Accidental Ruler*; *Mr. Mix-Up* | Marks/intervals and their labels/count are coordinated; merely sliding while counting is erroneous | Find or test an explicit skipped/double-count classroom example |
| Retained one-unit trace | *Helpful Elf*; *Building Down* | Mark endpoints or use a placeholder when one unit is moved repeatedly | Ensure marks expose, rather than conceal, continuity |

## Copying boundaries

- Copy only the **abstract task relations**: one fixed unit; aligned origin; next start at prior endpoint; persistent ordered marks; one count per completed interval; inspect, explain, and repair.
- Do **not** copy `[LT]²` text, documents, videos, character names, castle crack, elf, worm, railroad, teacher dialogue, values, artwork, or lesson sequence. The site expressly says its materials may not be copied or distributed separately without permission.
- Do **not** copy Math Learning Center or Illustrative Mathematics worksheets, images, exact dialogue, peer characters, shoe/cube scenes, values, or layouts.
- Do **not** copy *Bridge Constructor*’s bridge/material/budget/load simulation, *Opus Magnum*’s alchemy/machine components/scoring, or *Baba Is You*’s word blocks, levels, Sokoban controls, audiovisual identity, or rule syntax.
- A 50 cm paver and straight path are project context substitutions only; no retained primary source establishes that exact dressing.

## Sources

- **Kept:** CIIP/PER MSN 24 — official curricular basis and measurement-unit boundary.
- **Kept:** University of Denver `[LT]²` activities — closest first-party task descriptions for single-unit iteration, endpoint placeholders/marks, constructing a trace, and diagnosing measurement errors.
- **Kept:** Math Learning Center Grade 1 Supplement D2 and Illustrative Mathematics Grade 1 Unit 6 Lesson 7 — first-party classroom tasks exposing continuity and equal-unit errors.
- **Kept:** Headup/Xbox manual, Zachtronics, and Hempuli — official developer/publisher evidence for build–test–inspect, replayable construction, visible consequence, and undo patterns.
- **Dropped:** teacher blogs, marketplaces, uploaded worksheets, gameplay wikis, reviews, walkthroughs, and SEO activity lists — not primary/first-party sources.
- **Dropped:** generic ruler worksheets — most test answer reading rather than constructing and repairing unit iteration.
- **Dropped:** area-tiling activities — gaps/overlaps are analogous, but area coverage would widen or distort this one-dimensional contract.

## Gaps and cautions

- No retained primary classroom source was found that combines **all five** requested flaws in one task. Gap/overlap and invariance are direct; displaced-origin evidence is mainly ruler/interval based; explicit skipped-versus-doubled count repair remains least directly documented.
- Accessed 2026-07-16. Direct first-party page retrieval exposed objectives and detailed activity/scaffolding text for *Mr. Mix-Up’s Measuring Mess* and *Broken Ruler*; some other activity routes exposed only indexed descriptions or the site citation/copyright notice in this environment. Claims above are limited to the content actually visible through those first-party pages/indexes. No exact prompt is copied, and changing page access should trigger source recheck.
- Official game pages establish interaction features, not learning effectiveness, age suitability, accessibility, or deterministic implementation details. Any MES-01 use requires disposable testing against the approved evidence contract.
- This note catalogs precedents only. It does not approve a candidate, create `MECHANIC-FIT.md`, authorize a catalog exercise, or authorize code.
