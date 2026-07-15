---
title: 6H exercise production strategy
status: draft
revision: r1-partial-strategy
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
| r1-partial-strategy | 2026-07-15 | Draft | Captured the Mathematics-first roadmap, owner-led sequence authoring, playable low-fi, language, scenario, hint, and recovery decisions; progression grammar and later rollout gates remain open | User and coding assistant |

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
| D-4 | Design and approve one learning sequence as the primary production unit | Mechanics, feedback, language, scenarios, and progression need one coherent authored arc rather than assembly from independently generated exercises | One concept lesson; one focused challenge; one world mission | Product/classroom owner | Sequence pilots prove too large to critique or iterate effectively |
| D-5 | Bound each learning sequence by a conceptual dependency arc | The sequence should follow what pupils must notice, construct, connect, and eventually use or explain; administrative curriculum grouping must not dictate pedagogy | PER objective block; authentic inquiry alone; fixed lesson count | Product/curriculum owner | A pilot cannot map its conceptual arc back to PER coverage without material gaps |
| D-6 | Establish a discipline-specific start-of-year → end-of-year roadmap before designing the catalog, with an explicit exercise idea associated to every PER roadmap node | The catalog needs visible progression and coverage coherence before individual interactions are authored | Generate independent exercises first and infer order later | Product/curriculum owner | Roadmap review shows that official PER ordering is not a usable learning progression |
| D-7 | Allow adjacent, conceptually dependent PER nodes to form one learning sequence while retaining a named, inspectable exercise idea/beat for every node | Preserves node-level traceability without fragmenting relationships that must be learned together | One standalone exercise per node; one full sequence per node; no default mapping | Product/curriculum owner | Roadmap review finds grouped nodes hiding distinct evidence requirements |
| D-8 | Anchor each discipline roadmap at expected 5H exit outcomes and progress toward explicit 6H targets, with diagnostic/remediation branches for missing prerequisites | Gives the catalog a canonical year-long direction without assuming uniform pupil mastery | Assume no mastery; teacher-defined baseline only; PER document order alone | Product/curriculum owner | Source review cannot distinguish a defensible 5H exit baseline from later expectations |
| D-9 | Require a full interaction storyboard for every roadmap node in a drastically simplified UI before visual production | Mechanics, exact language, feedback, and progression must be coherent and fun without relying on cosmetics; visual polish cannot rescue a weak learning loop | Compact learning contract only; citation plus idea; examples without interaction states | Product/classroom owner | Storyboarding proves too expensive to revise before a mechanic can be evaluated |
| D-10 | Require a playable low-fidelity prototype to pass before visual design starts | Real choices, timing, exact language, feedback, and progression must be experienced, not inferred from prose or static frames | Clickable storyboard; paper-only simulation; written storyboard review | Product/classroom owner | The low-fi implementation cost prevents rapid mechanic iteration |
| D-11 | Define low-fi fun primarily as intellectual play | Pupils should predict, manipulate a meaningful representation, observe consequences or surprise, revise their model, and want to continue; narrative and rewards cannot substitute for this loop | Agency alone; flow/mastery alone; narrative curiosity alone | Product/classroom owner | Pupil evidence shows another engagement driver is necessary for a specific discipline |
| D-12 | Require accountable owner-only approval before a low-fi sequence may enter visual production; make no pupil-validation claim at that gate | The owner retains direct authority over roadmap, mechanics, wording, feedback, progression, and intellectual play; pupil participation is explicitly excluded from this pre-visual gate | Owner plus pupils; owner plus teacher panel; pupils after visuals as part of this gate | Product/classroom owner | The owner later requires external pedagogical or learner evidence before visual investment |
| D-13 | Prove the replacement method with Mathematics first: approve its discipline roadmap, then complete one low-fi sequence before roadmapping other disciplines | Limits rework and tests the new roadmap/storyboard/mechanic gates before cross-domain scale | All discipline roadmaps first; sequence without discipline roadmap; parallel roadmaps | Product/curriculum owner | Mathematics proves unrepresentative of the content-direction risks in other disciplines |
| D-14 | Structure the Mathematics roadmap as parallel conceptual strands with explicit prerequisites, cross-strand convergence points, and suggested pacing | Mathematics domains develop partly in parallel; a dependency graph is more honest than one forced linear checklist | Single linear path; isolated strands; calendar-first organization | Product/curriculum owner | Teachers cannot navigate or schedule the graph in practice |
| D-15 | Define one Mathematics roadmap node as one observable conceptual checkpoint | A node captures a specific change in what a pupil can notice, represent, reason about, or explain; official PER statements map many-to-many onto checkpoints | Raw PER statement; broad topic heading; available exercise mechanic | Product/curriculum owner | Mapping review shows checkpoint interpretation obscures official requirements |
| D-16 | Use two-pass roadmap approval | First approve the complete Mathematics structure, dependencies, node contracts, and provisional exercise ideas; then approve full storyboards and low-fi mechanics sequence by sequence | Require all storyboards before structural approval; rolling section approval; structure-only approval | Product/curriculum owner | Sequence storyboards repeatedly force structural roadmap changes |
| D-17 | Use owner-led co-authoring for each sequence | The assistant proposes genuinely distinct mechanics with evidence and trade-offs; the owner chooses direction and jointly refines exact problems, language, feedback, and progression before code | Complete agent draft followed by review; owner-only brief; specialist-agent panel | Product/classroom owner | Owner attention makes progress impracticably slow or a proven exemplar supports bounded delegation |
| D-18 | Compare three mechanically distinct pitches before choosing a sequence direction | Alternatives must differ in the pupil’s reasoning action, not merely scenario, art, controls, or layout; the owner may combine deliberately or reject all | Two alternatives; one deep proposal; unbounded exploration | Product/classroom owner | Repeated pitches show only one conceptually honest mechanic exists for a node |
| D-19 | Permit only concept-native scenarios | Context is used only when its facts and constraints materially drive the mathematics; one sequence keeps a coherent context, changing it only for deliberate transfer evidence; neutral mechanics are preferable to forced stories | Continuous narrative always; varied decorative microcontexts; defer all context until after low-fi | Product/classroom owner | A sequence needs varied contexts earlier to demonstrate the target conceptual generalization |
| D-20 | Approve exact French pupil-facing copy as part of the low-fi gate | Every line is reviewed for one-action instructions, stable mathematical vocabulary, ambiguity, read-aloud clarity, and reasoning-specific feedback; placeholders cannot validate a mechanic | Style guide only; copy after mechanics; external proofreader as sole authority | Product/classroom owner | A specialist language review is later required in addition to owner approval |
| D-21 | Use authored escalating hints after incorrect reasoning moves | Feedback should progressively direct attention and support revision rather than immediately dumping a full solution or merely marking failure | Full solution immediately; consequence-plus-single-retry only; mismatch-only feedback | Product/classroom owner | Trials show hint ladders interrupt intellectual play or become repetitive |
| D-22 | Permit the final hint to reveal the answer and explanation | A pupil must not remain trapped after the full hint ladder; revealed completion must remain distinguishable from independent reasoning | Three levels without answer; two concise hints; unlimited decomposition | Product/classroom owner | Reveal behavior encourages hint-skipping or undermines the sequence’s learning evidence |
| D-23 | After a final-answer reveal, require a fresh structurally equivalent case before independent node closure | Changed values or representation test the same relationship without merely testing memory of the revealed answer | Continue as guided; repeat same case; enter a larger remediation branch | Product/classroom owner | The extra case consistently harms flow without adding diagnostic value |

## Fact ledger

| ID | Fact | Evidence/source | Consequence |
|---|---|---|---|
| F-1 | Technical completeness did not predict owner-perceived quality or coherence | Owner review of generated Geography prototypes; prior successful catalog/check/smoke/build evidence | Replacement gates must evaluate concept, pedagogy, writing, interaction, and collection coherence before scale |
| F-2 | Parallel workers independently optimized local slice acceptance | Withdrawn slice graph and generated commit history | Local acceptance contracts alone cannot own collection-level creative direction |
| F-3 | The PER evidence base and curriculum map exist independently of the rejected prototypes | `experiments/curriculum/research/`; `experiments/curriculum/mappings/6h-coverage-matrix.json` | Curriculum coverage can be reused without reusing the production method |
| F-4 | Owner review found the same underlying problem structure repeated behind different UI/UX, with clumsy mechanics, feedback, and progression; weak or ambiguous language; and inconsistent scenarios | Accountable owner review, 2026-07-15 | Visual variety and local completeness cannot stand in for distinct pedagogical design or editorial coherence |

## Hypothesis disposition

| ID | Hypothesis | Evidence sought | Disposition | Resulting item |
|---|---|---|---|---|
| H-1 | Three generic lenses per curriculum cluster reliably create depth and diversity | Owner review and prototype comparison | Rejected as a production rule | D-1 |
| H-2 | A detailed written contract plus independent automated review is enough to maintain pedagogical and creative quality at batch scale | Generated Geography collection | Rejected | F-1, F-2 |
| H-3 | A small number of deliberately authored and approved exemplars can establish a reusable quality grammar without becoming a generic template | Comparative review, teacher/pupil evidence, and successful adaptation to distinct concepts | Open | Q-1 and later pilot decisions |
| H-4 | Superficially different UI/UX can provide meaningful exercise diversity without changing the underlying reasoning structure | Owner comparison of the rejected Geography set | Rejected | F-4 |

## Open questions

| ID | Question | Blocking? | Owner | Resolution evidence |
|---|---|---|---|---|
| Q-1 | What human quality authority and approval gate must an exercise pass before any variants or parallel production begin? | Yes | Product/classroom owner | Explicit decision in the grill |
| Q-2 | What specifically made the rejected prototypes feel low-quality or incoherent? | Resolved | Product/classroom owner | F-4: repeated problem structure, clumsy mechanics/feedback/progression, weak ambiguous language, inconsistent scenarios |
| Q-3 | What is the right production unit? | Resolved | Product/curriculum owner | D-4: one learning sequence |
| Q-5 | What determines the boundary and internal arc of one learning sequence? | Resolved | Product/curriculum owner | D-5: conceptual dependency arc |
| Q-6 | Who holds authorship authority for the first complete sequence concept? | Resolved | Product/classroom owner | D-17: owner-led co-authoring, one sequence at a time |
| Q-7 | Must every PER roadmap node become a standalone exercise/sequence, or may dependent nodes be grouped while retaining a named idea for each node? | Resolved | Product/curriculum owner | D-7: group dependent nodes, preserve one named exercise beat per node |
| Q-8 | What evidence anchors the start-of-year baseline and end-of-year target for each roadmap? | Resolved | Product/curriculum owner | D-8: expected 5H exit → explicit 6H target, with diagnostic/remediation branches |
| Q-9 | What information must every roadmap node contain before exercise authoring can begin? | Resolved | Product/curriculum owner | D-9: full interaction storyboard in a drastically simplified UI, including exact mechanics, language, feedback, and progression |
| Q-10 | What executable or reviewable artifact must prove that the stripped-down mechanic feels fun before visual design begins? | Resolved | Product/classroom owner | D-10: playable low-fidelity prototype |
| Q-11 | What does “fun” mean at the low-fi gate, independently of cosmetic presentation? | Resolved | Product/classroom owner | D-11: intellectual play |
| Q-12 | Who must approve a low-fi sequence before visual design begins? | Resolved after reopening | Product/classroom owner | D-12: owner-only approval; the earlier owner-plus-pupils choice was explicitly superseded |
| Q-13 | What pupil-trial evidence constitutes a pass? | Not applicable to pre-visual gate | Product/classroom owner | Pupil participation was explicitly removed from this gate; no pupil-validation claim is allowed |
| Q-14 | Must all discipline roadmaps be approved before any low-fi pilot, or should one discipline prove the method first? | Resolved | Product/curriculum owner | D-13: Mathematics roadmap first, followed by one complete low-fi sequence |
| Q-15 | What topology should the Mathematics year roadmap use? | Resolved | Product/curriculum owner | D-14: conceptual strands plus dependencies and suggested pacing |
| Q-16 | What qualifies as one roadmap node within those strands? | Resolved | Product/curriculum owner | D-15: one observable conceptual checkpoint |
| Q-17 | Is the roadmap approved structurally before full node storyboards, or only after every storyboard exists? | Resolved | Product/curriculum owner | D-16: two-pass approval |
| Q-18 | How much mechanic divergence is required before choosing a sequence direction? | Resolved | Product/classroom owner | D-18: three mechanically distinct pitches; owner may reject all |
| Q-19 | What role may scenarios play in low-fi mechanics and sequence coherence? | Resolved | Product/classroom owner | D-19: concept-native context only; one coherent context except deliberate transfer |
| Q-20 | What language artifact and review must pass during low-fi approval? | Resolved | Product/classroom owner | D-20: exact-copy owner review within low-fi gate |
| Q-21 | What must feedback do after an incorrect reasoning move? | Resolved | Product/classroom owner | D-21: give escalating hints |
| Q-22 | How far may the hint ladder escalate before it becomes answer-revealing? | Resolved | Product/classroom owner | D-22: final hint may reveal answer and explanation |
| Q-23 | What must happen after an answer is revealed so progression remains honest? | Resolved | Product/classroom owner | D-23: fresh structurally equivalent case required for independent closure |
| Q-24 | What progression pattern should organize cases inside a sequence? | Yes | Product/classroom owner | Explicit progression grammar |
| Q-4 | Which evidence permits scale beyond the first exemplar? | Yes | Product/classroom owner | Named review and trial gates |

## Readiness declaration

**State:** `not_ready`

The prior strategy is withdrawn. Quality authority, failure taxonomy, production unit, exemplar policy, and scale-up evidence remain blocking decisions. No architecture, slices, or implementation should be generated from this draft.
