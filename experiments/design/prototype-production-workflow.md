---
title: Roadmap prototype production workflow
status: approved
revision: r3-learning-contract-semantic-fit
approved_on: 2026-07-16
readiness: ready_for_design_package
owners:
  - repository owner acting as product, classroom, curriculum, and technical owner
---

# Roadmap Prototype Production Workflow

## Approval record

| Approver identifier | Accountable role | Approval scope | Revision/digest | Approved at | Disposition |
|---|---|---|---|---|---|
| User (chat approver) | Repository owner acting in product, classroom, curriculum, and technical roles | Prototype workflow, mechanic-memory model, owner gates, concurrency, polish, and validation timing | `r1-approved` | 2026-07-15T22:31:37+02:00 | Approved |
| User (chat approver) | Repository owner acting in product, classroom, curriculum, and technical roles | Sequence-spine planning with checkpoint-scoped mechanic prototyping and expansion | `r2-sequence-spine` | 2026-07-16T08:59:48+02:00 | Approved refinement |
| User (chat approver) | Repository owner acting in product, classroom, curriculum, and technical roles | Learning-contract gate, established-task grounding, semantic-fit rationales, one-or-more catalog grayboxes, and removal of the fixed three-pitch/throwaway-prototype phase | `r3-learning-contract-semantic-fit` | 2026-07-16 | Approved refinement |

Approval of this workflow does **not** approve a discipline roadmap, sequence spine, learning goal, mechanic rationale, catalog graybox, or prototype expansion. Record each authority separately.

## Revision history

| Revision | Date | Status | Material change | Author/editor |
|---|---|---|---|---|
| `r1-approved` | 2026-07-15 | Approved | Formalized the revised workflow from the first `SEQ-N1` owner-playtest retrospective | User and coding assistant |
| `r2-sequence-spine` | 2026-07-16 | Approved | Kept the sequence as the coherence unit while making one checkpoint exercise the mechanic-prototyping and expansion unit | User and coding assistant |
| `r3-learning-contract-semantic-fit` | 2026-07-16 | Approved | After the rejected `NUM-02` A/B/C set, moved owner approval of a precise learning contract before ideation; required established classroom-task grounding and explicit cognitive/semantic fit; removed the fixed quota of three pitches and throwaway comparison prototypes; allowed one or more approved candidates to proceed directly as low-fi catalog grayboxes | User and coding assistant |

## Executive intent

Produce concept-native, playable learning exercises by settling the educational meaning before implementation. Each approved sequence first defines a coherent spine. For each active checkpoint, the owner then approves one precise core-learning sentence, a successful-pupil statement, and the expected cognitive process. Mechanic proposals must begin from established classroom problem/task families, then explain exactly how player actions and system consequences trigger that cognition. One or more owner-approved candidates may proceed directly to low-fi grayboxes in the exercise catalog. Only owner replay and the scoped phrase `mechanic approved for expansion` authorize continued development and polish.

The workflow does not reward quotas of ideas. It rewards traceable learning-task-mechanic pairs.

## Workflow at a glance

```text
Approved roadmap slice
        ↓
Draft the sequence spine and checkpoint handoffs
        ↓
Owner sequence-spine gate
        ↓
Select one active checkpoint exercise
        ↓
Draft one precise core-learning sentence
+ one successful-pupil statement
+ the expected cognitive process
        ↓
Owner learning-contract gate
        ↓
Search established classroom task/problem precedents
→ search mechanics memory and game precedents
→ research only gaps
        ↓
Present one or more semantic-fit mechanic rationales
        ↓
Owner approves any candidates worth testing
        ↓
Build each approved candidate directly as a low-fi catalog graybox
        ↓
Owner replay
   ├─ reject/revise/archive
   └─ select one or more + record scoped
      “mechanic approved for expansion”
        ↓
Expand and validate each approved checkpoint exercise
        ↓
Check the handoff against the sequence spine
        ↓
Write findings back → select the next checkpoint exercise
        ↓
After all checkpoints: sequence integration review
```

## Authority and concurrency

| Work | May run concurrently? | Authority boundary |
|---|---|---|
| Source and task-precedent research | Yes | Preserve first-party sources and separate source facts from design interpretation. |
| Sequence-spine design | No; one active unapproved sequence slice at a time | The owner records a spine disposition before checkpoint implementation. |
| Learning-contract drafting | One active checkpoint at a time by default | No mechanic rationale may be approved until the checkpoint’s core learning and successful-pupil statement are approved. |
| Semantic-fit rationales | Research may overlap; disposition remains owner-led | Each candidate is judged independently. There is no required candidate count. |
| Owner-approved catalog grayboxes | One at a time by default; multiple only when explicitly approved and independently mutable | Approval to graybox is not mechanic approval or polish authority. |
| Expansion of approved mechanics | Yes, when mutation areas are independent | Every catalog exercise carries its own recorded gate scope and exact expansion phrase. |
| Final validation | Per finished exercise, then per assembled sequence | A technical pass cannot grant mechanic or pedagogical approval. |

No autonomous batch may implement unapproved rationales or expand unapproved mechanics. Approval for one checkpoint never propagates to another.

## Phase 0 — Structural input gate

### Required input

- An owner-approved discipline roadmap or explicitly bounded roadmap slice.
- One selected learning sequence bounded by a conceptual dependency arc.
- Named roadmap checkpoints and the evidence each checkpoint should make observable.
- One named active checkpoint exercise for the next learning/mechanic cycle.

### Gate

Do not treat a provisional roadmap idea as production authority. Approval of this workflow does not approve any particular roadmap. Record partial approval narrowly; unlisted sequences and dependencies remain unapproved.

## Phase 1A — Sequence spine and owner gate

Define the sequence before optimizing any one exercise:

- checkpoint order and why each checkpoint belongs there;
- direct curriculum traceability for every checkpoint;
- prerequisite inputs and evidence handed from one checkpoint to the next;
- the conceptual shift, inspectable representation, and learner-visible sign of progress at each checkpoint;
- recurring mathematical language and representations;
- a shared interaction grammar, if useful, without forcing every checkpoint into the same mechanic;
- one integration challenge that would require several checkpoints;
- any checkpoint whose position, dependency, or authority does not yet form a credible handoff.

A **sequence spine** is the coherence contract. It may standardize language, representations, and a predict/inspect/revise rhythm; it must not preselect one generic mechanic for every exercise.

### Sequence-spine gate

The owner records one disposition with date and revision/digest:

- **approve sequence spine;**
- **approve with named structural changes;**
- **return to roadmap/dependencies;**
- **park the sequence.**

The spine gate approves progression and handoffs only. It does not approve a checkpoint learning contract or mechanic. If dependency authority is incomplete, the spine remains pending. Research may continue, but no catalog graybox proceeds.

**Artifact:** `SEQUENCE-SPINE.md` created from `experiments/templates/sequence/SEQUENCE-SPINE.template.md`.

## Phase 1B — Active checkpoint learning contract

For one active checkpoint, write a focused brief containing:

1. **Core learning** — one precise sentence naming the relationship or procedure the pupil should learn, without UI or story language.
2. **Successful-pupil statement** — one concrete first-person sentence a pupil could say or demonstrate after learning.
3. **Expected cognitive process** — an ordered sequence from initial evidence through inference, action, feedback, revision, and transfer.
4. Direct curriculum support separated from project interpretation.
5. Prerequisites, content boundaries, vocabulary, and explicit non-goals.
6. Candidate errors labeled as evidence-backed, roadmap entry signals, or design hypotheses.
7. Observable evidence beyond one correct result.
8. Accessibility, dignity, privacy, and safety boundaries, including an equivalent route through the same cognitive process.
9. The evidence and representation handed to the next checkpoint.

A story, screen, control, score, or mechanic cannot define the learning goal.

### Learning-contract gate

Before mechanic ideation, the owner records one disposition with date and revision/digest:

- **approve learning contract;**
- **approve with named changes;**
- **revise the learning goal;**
- **park the checkpoint.**

Approval covers the core-learning sentence, successful-pupil statement, and expected cognitive process only. It does not approve a mechanic or implementation.

**Artifact:** `<checkpoint-id-lowercase>/LEARNING-BRIEF.md` created from `experiments/templates/sequence/LEARNING-BRIEF.template.md`.

## Phase 2 — Established-task and mechanics-memory pass

### Search order

1. Search the repository for established classroom problem/task precedents that already teach the approved outcome.
2. Search `experiments/game-mechanics/` by pupil verb, state model, challenge source, recovery loop, learning affordance, and prior application.
3. Research only missing or stale knowledge using first-party task publishers, official curricula, creator-owned resources, game rules/manuals, or platform documentation.
4. Add or update:
   - curriculum research notes for classroom task/problem families;
   - `PRE-*` records for factual game/platform or interactive-task precedents;
   - `MEC-*` records for reusable mechanic patterns.
5. Preserve source URLs and separate source-backed pupil actions from local adaptation hypotheses.

### Originality boundary

Do not invent an original mechanic merely to fill a quota. Adapt a known classroom task structure into play by adding purposeful decisions, consequences, recovery, and scenario while preserving the governing mathematics.

If no established task family supports the approved learning contract:

- report the evidence gap;
- revise or narrow the learning contract;
- or ask the owner for explicit permission to investigate a clearly labeled original synthesis.

Do not present an uncited synthesis as established practice. Context and fiction may be original; the claimed learning operation must remain traceable.

## Phase 3 — Semantic-fit mechanic rationales

Present **one or more** candidates only when each has a credible case. There is no minimum or maximum quota.

Each rationale must contain:

- the approved core-learning sentence and successful-pupil statement;
- the established classroom problem/task precedent(s);
- any relevant game/platform and `PRE-*` / `MEC-*` precedents;
- the source-backed task structure separated from the proposed adaptation;
- the expected pupil cognitive process;
- the proposed scenario and why it creates a genuine need for the mathematics;
- primary pupil verbs and the moment-to-moment loop;
- visible mathematical state;
- meaningful decisions and source of challenge;
- mistake information and recovery;
- downstream handoff;
- accessibility and implementation risks;
- copying boundary;
- kill criterion.

### Required semantic mapping

For every candidate, map the learning process explicitly:

| Learning operation | Pupil/game action | System consequence or inspectable evidence |
|---|---|---|
| | | |

Reject the rationale when:

- a generic answer form could replace the interaction without changing the reasoning;
- story, labels, values, or visuals carry more meaning than the player action;
- the game rewards a proxy such as speed, memory, area, or motor precision instead of the approved outcome;
- feedback reveals correctness without explaining the governing relationship;
- the established task family and proposed mechanic teach different mathematics.

### Owner semantic-fit disposition

The owner records a disposition **per candidate**:

- **approve for catalog graybox;**
- **approve with named graybox constraints;**
- **revise rationale;**
- **reject candidate;**
- **park checkpoint.**

The owner may approve one candidate, several candidates, or none. Approval authorizes only a low-fi catalog graybox for that named candidate and checkpoint. It does not approve expansion or polish.

**Artifact:** `<checkpoint-id-lowercase>/MECHANIC-FIT.md` created from `experiments/templates/sequence/MECHANIC-FIT.template.md`.

## Phase 4 — Low-fi catalog grayboxes

For each owner-approved semantic-fit rationale, create a stable exercise identity directly in `experiments/src/exercises/` and register it through normal typed metadata. Do not build an intermediate standalone HTML comparison or disposable pre-graybox prototype.

Each catalog graybox contains only enough to test the mechanic:

1. **Orientation** — teaches the action and representation.
2. **Complication** — exposes the real source of challenge.
3. **Independent challenge** — removes guidance and tests transfer.

The exercise `DESIGN.md` must preserve:

- approved learning-contract revision;
- approved semantic-fit rationale and sources;
- exact pupil actions and essential French copy;
- expected visible state changes;
- at least one meaningful incorrect path, feedback, and recovery;
- graybox boundaries and kill criterion;
- owner gate as pending.

The playable component uses minimal styling, no generated artwork, no decorative motion, no full narrative arc, and only lightweight checks needed for reliable owner replay. A separate `GRAYBOX-SCRIPT.md` may be used as a working aid, but it is not a required owner gate or a substitute for the catalog `DESIGN.md`.

When several candidates are approved, give each a distinct catalog exercise ID. Do not hide several mechanics behind one variant switcher.

## Phase 5 — Owner catalog-graybox gate

Advisory replay prompts:

- Does the player action actually trigger the approved cognitive process?
- Would replacing the interaction with a generic answer control change the learning?
- Does the scenario create a real need for the mathematics?
- Does the complication deepen the same relationship rather than add unrelated rules?
- Does a mistake produce useful evidence and permit revision?
- Is the activity intellectually playful and worth another turn?

### Gate dispositions

- **Revise the same graybox.**
- **Reject/archive this candidate.**
- **Keep for comparison without expansion.**
- **Approve:** record the exact phrase **`mechanic approved for expansion`** for the catalog exercise, sequence, and checkpoint.

The owner may approve one or more catalog grayboxes. Each approval is scoped separately. Positive comments, continued implementation, technical success, or silence do not imply approval.

## Phase 6 — Full exercise design and expansion

Only after explicit mechanic approval scoped to the catalog exercise, sequence, and checkpoint:

- write the complete exercise progression and exact pupil-facing copy;
- expand through the flexible learning grammar:

```text
orientation → exploration → constraint
→ complication → integration → independence
```

All six functions must be represented, but they may merge, repeat, or span several scenes when the design explains why. Each scene must change at least one of:

- the constraint;
- the available tools;
- the representation;
- the reasoning demand.

Changing only a value, name, or surface context is insufficient. If the final hint reveals an answer and explanation, require a fresh structurally equivalent case before recording independent closure.

Expansion completes one checkpoint exercise, not the whole sequence. After closeout, verify its promised handoff against the sequence spine, then start the next checkpoint’s learning contract. Never infer that an approved mechanic should be reused unchanged.

### Sequence integration review

After all intended checkpoint exercises have their own approvals and finished designs, review:

- prerequisite and evidence handoffs in implemented order;
- recurring language and representations that genuinely reduce relearning;
- learner-visible conceptual progress rather than cosmetic level changes;
- checkpoint-native mechanics rather than disconnected activities or one reskinned loop;
- an integration challenge requiring relationships from more than one checkpoint;
- regressions introduced when a later exercise changes an earlier representation.

A material mechanic change discovered during integration returns the affected exercise to its owner gate.

## Phase 7 — Interaction-surface pass

Before decorative polish, verify that:

- actions are visually connected to the objects and state they affect;
- controls, quantities, and availability are understandable without relying entirely on prose;
- unavailable actions are distinguishable and explainable;
- undo and reset are obvious when needed;
- motor imprecision cannot be mistaken for conceptual error;
- the experience feels like one coherent system rather than disconnected cards;
- precise mathematical state remains inspectable rather than baked into decorative imagery.

## Phase 8 — Optional motion and asset passes

Motion and generated artwork are late and optional. Each addition must name an explanatory, usability, or narrative purpose.

Appropriate motion includes press feedback, source/destination explanation, meaningful state transitions, scene transitions, and rare completion moments. Reject movement that makes quantities or intermediate states harder to inspect. Preserve reduced-motion behavior.

Generated assets may support characters, inventory illustration, intro/outro scenes, or decorative world art. Keep exact quantities, numbers, mathematical diagrams, controls, state indicators, and precision-dependent animation out of generated images. Preserve prompts/metadata, verify counts, and test actual rendered size.

## Phase 9 — Final technical validation

The full browser, responsive, and accessibility suite becomes mandatory only after all selected polish is complete. Final evidence should include:

1. Svelte and TypeScript checks;
2. catalog and metadata validation;
3. production build;
4. a complete desktop keyboard path;
5. a complete 320 px touch path;
6. reduced-motion behavior;
7. specific incorrect feedback, recovery, correct feedback, continuation, and completion;
8. no unintended network, persistence, identity, or analytics behavior;
9. a manual owner happy path.

The smoke surface must exercise real pupil controls and lifecycle states. A technical pass means testing readiness, not pupil validation or mastery.

## Phase 10 — Memory write-back and closeout

After semantic-fit disposition, catalog-graybox replay, and final production:

- link the sequence, checkpoint, catalog exercise, and used task/game precedents;
- create or update an `APP-*` application record;
- preserve rejected candidates and why they failed;
- distinguish rejection of an adaptation from evidence against an abstract mechanic;
- record owner observations and actual gate scope;
- identify accessibility and implementation lessons;
- note when the mechanic should or should not be reused;
- synchronize the exercise `DESIGN.md` with implementation truth.

The next checkpoint—and later sequence—starts by searching this accumulated memory.

## Critical invariants

- The approved learning contract precedes mechanic ideation and implementation.
- The expected pupil cognition is explicit before a semantic-fit claim.
- Established classroom problem/task families ground mechanics; an uncited original synthesis is never presented as established practice.
- Adventure or narrative creates purpose and consequence; it never substitutes for the learning operation.
- A concept-native mechanic would lose meaning if its educational labels were replaced with an unrelated topic.
- Sequence coherence comes from approved conceptual handoffs and shared language/representations, not from repeating one mechanic.
- Sequence-spine approval never implies learning-contract or mechanic approval.
- Learning-contract approval never implies mechanic approval.
- Semantic-fit approval authorizes only a catalog graybox.
- Mechanic expansion approval is scoped to one recorded catalog exercise, sequence, and checkpoint.
- Source inspiration never authorizes copied wording, branding, artwork, tasks, values, or recognizable screens.
- Generated imagery never carries unverified exact mathematical information.
- Technical checks cannot approve mechanics or claim pupil learning.
- No owner gate can be inferred.

## Explicit non-goals

- A fixed quota of mechanic pitches.
- Throwaway pre-graybox comparison prototypes.
- Original mechanics generated merely to appear creative.
- Full storyboarding before mechanic testing.
- Autonomous bulk prototype generation.
- An exhaustive catalog of games, tasks, or platforms.
- A vault maturity/certification bureaucracy.
- Mandatory motion or generated artwork.
- Pupil-validation or mastery claims from owner or automated testing alone.

## Success and review evidence

The workflow is functioning when:

- no mechanic rationale is implemented before its learning contract and semantic fit are owner-approved;
- every candidate cites an established classroom task family or explicitly records an evidence gap;
- the learning-operation → player-action → system-evidence mapping is concrete and falsifiable;
- rejected catalog grayboxes remain honest catalog/application records rather than disappearing or acquiring false approval;
- one or more candidates may be tested without a quota driving weak alternatives;
- no catalog exercise expands before its scoped recorded owner phrase;
- later work reuses research and application records instead of repeating it;
- completed exercises pass final technical validation;
- owner review no longer discovers only after implementation that the game teaches different mathematics from the brief.

## Open empirical hypotheses

- Learning-contract and semantic-fit gates will reject weak mechanics more cheaply than prototype comparison.
- Established classroom task families can gain play value without changing their governing mathematics.
- Direct catalog grayboxes will make rejected work more traceable without encouraging premature polish.
- The flexible six-function grammar will transfer across disciplines.
- The mechanics memory will materially reduce repeated research.
- Overlapping expansion of independently approved mechanics will preserve coherence.

These are learning questions, not reasons to bypass the workflow.

## Readiness declaration

**State:** `ready_for_design_package`

The workflow is approved. Discipline roadmaps, sequence spines, checkpoint learning contracts, semantic-fit candidates, catalog grayboxes, and expansion gates remain separately scoped owner decisions.
