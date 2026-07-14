---
title: 6H PER curriculum coverage program
status: approved
revision: r1-approved
approved_on: 2026-07-14
readiness: conditionally_ready
owners:
  - repository owner acting as classroom and curriculum owner
---

# 6H PER Curriculum Coverage Program

## Approval record

| Approver identifier | Accountable role | Approval scope | Revision/digest | Approved at | Disposition |
|---|---|---|---|---|---|
| User (chat approver) | Classroom and curriculum owner | Product scope, curriculum authority, quality bar, and KD execution policy | `47f6e78d6966928a` | 2026-07-14T23:48:12+02:00 | Approved |

A participant without authority for curriculum scope may propose acceptance, but curriculum approval remains pending until confirmed by the accountable classroom or curriculum owner.

## Revision history

| Revision | Date | Status | Material change | Author/editor |
|---|---|---|---|---|
| r1-pending-approval | 2026-07-14 | Draft | Initial convergence record from the 6H coverage interview | Coding assistant with user decisions |
| r1-approved | 2026-07-14 | Approved | Accountable owner approved revision digest `47f6e78d6966928a`; readiness advanced to conditionally ready | User and coding assistant |

## Executive intent

Create a comprehensive French-language Exercise Lab collection covering the official PER 5H–6H progression needed for success in 6H across Mathematics, Science, Geography, and History. Every coherent curriculum cluster receives three self-contained interactive studies—concept construction, varied practice, and transfer/diagnosis—with curriculum evidence, a complete paper design, and a testing-ready prototype. The collection should combine concept-led mechanics with strong independent visual studies inspired by the interaction quality of Brilliant.org, without copying its content or reducing the curriculum to reskinned generic questions.

## Users and operating context

- **Primary users:** pupils working toward the end of 6H in a French-speaking PER context.
- **Secondary users:** teachers selecting activities and observing reasoning or misconceptions.
- **Triggering situations:** concept introduction, focused practice, diagnosis, remediation, and transfer.
- **Environment and material constraints:** standalone local Exercise Lab; desktop and tablet first; pointer, touch, and keyboard access; no dependency on classroom identity, persistence, or network services at runtime.

## Problem and desired outcomes

### Current problem

The lab has an evidence-backed workflow and one decimal-ordering prototype, but no systematic 6H curriculum map or dense cross-domain collection. A large batch risks shallow repetition, unsupported curriculum claims, inaccessible interactions, and false claims of pedagogical validation.

### Desired outcomes

- Every official 5H–6H progression statement in the four selected domains is traceable to a coherent curriculum cluster.
- Every cluster is covered through three complementary learning lenses.
- Each catalog record contains valid metadata, a rigorous `DESIGN.md`, and a complete isolated prototype.
- Exercises expose concepts through meaningful manipulation and specific explanatory feedback.
- The resulting catalog is internally reviewed and ready for pupil testing, while remaining explicitly unvalidated until classroom evidence exists.

### Why existing alternatives are insufficient

- One exercise per broad objective is too sparse to cover construction, practice, and transfer.
- Atomic exercise generation for every sentence creates large numbers of shallow duplicates.
- A single reusable quiz template optimizes volume rather than conceptual visibility.
- Marking agent-reviewed exercises as pedagogically validated would overstate the available evidence.

## Authority and accountability

| Decision or action | System role | Human role | Accountable owner |
|---|---|---|---|
| Transcribe and map official curriculum evidence | Propose mappings with citations and evidence boundaries | Review disputed interpretations | Curriculum owner |
| Define curriculum clusters | Propose the smallest coherent grouping without dropping statements | Approve material regrouping or exclusions | Curriculum owner |
| Design and implement exercises | Generate bounded records and prototypes under slice contracts | Review escalated pedagogical or scope decisions | Product/classroom owner |
| Automated verification | Run schema, type, build, interaction, and accessibility checks | Decide any verification-policy changes | Technical owner |
| Advance lifecycle status | May advance passing work to `testing` only | Authorize later `validated` status from pupil evidence | Teacher/curriculum owner |
| Resolve unclear or conflicting PER evidence | Stop and ask; do not invent a rule | Decide interpretation or authorize a documented assumption | Curriculum owner |

## Core workflows

1. **Coverage workflow:** collect authoritative PER sources → normalize progression statements → build a no-gap coverage matrix → form coherent clusters → assign three learning lenses.
2. **Production workflow:** create bounded KD slices → research/design/implement in dependency order → independently review curriculum traceability and interaction quality → verify the complete catalog.
3. **Clarification workflow:** when source authority, intended year, copyrighted content, cluster boundaries, or verification policy is uncertain, stop the affected slice and request an operator decision.
4. **Recovery workflow:** a failing or weak exercise remains `prototyping`; it may be revised in its authorized area or replaced by a follow-up slice without weakening global acceptance gates.
5. **Promotion workflow:** passing prototypes become `testing`; only documented pupil trials and teacher review may later produce `validated` status.

## Trust, safety, privacy, and compliance

### Critical invariants

- Curriculum claims cite authoritative CIIP/PER sources and distinguish direct text from interpretation.
- The full 5H–6H half-cycle progression is in scope; explicit 6H endpoints and prerequisites are labeled separately.
- Every mapped cluster receives construction, practice, and transfer/diagnostic coverage.
- Feedback explains the relevant relationship or misconception; correctness is never communicated only by color.
- Student-facing language is French and age-appropriate.
- Prototypes remain isolated from classroom routes, storage, identity, and result submission.
- Automated work may not claim pupil learning evidence.

### Unacceptable failures

- Omitted official progression statements hidden by broad objective labels.
- Invented 6H requirements or canton-specific additions presented as PER requirements.
- Copyrighted source files or substantial protected text copied into the repository without permission.
- Generic multiple-choice skins whose interaction does not expose the target concept.
- Inaccessible pointer-only activities or essential information conveyed only through color, animation, or fine motor precision.
- Exercise status advanced to `validated` without classroom evidence.
- KD workers mutating paths outside their declared slice areas.

### Required evidence and fail-closed behavior

- Coverage matrix with source IDs and statement-level mappings.
- Catalog/schema validation, strict Svelte/TypeScript checks, and production build.
- Per-exercise curriculum and interaction acceptance evidence.
- Independent curriculum-traceability and interaction/accessibility reviews.
- Any unresolved source or scope ambiguity blocks the affected slice rather than being guessed.

### Privacy, security, and data handling

Prototypes store observations only in component memory for the current session. They do not persist identity, scores, activity results, analytics, images, audio, or free text. Any future persistence is outside this program and requires a separate trust decision.

## Scope

### Included capabilities

- Mathematics, Science, Geography, and History.
- Official PER 5H–6H progression, with explicit 6H endpoints and prerequisites distinguished.
- Evidence-based curriculum source records and normalized notes.
- A statement-level coverage matrix and gap report.
- Three exercises per coherent curriculum cluster:
  1. concept construction;
  2. varied practice;
  3. transfer/diagnosis.
- One complete `exercise.ts`, `DESIGN.md`, and `Prototype.svelte` per exercise.
- Concept-led mechanics, immediate specific feedback, multiple representations where useful, and distinct visual studies within a shared accessibility grammar.
- Full-batch production through dependency-ordered Khazad-Doom JSON Issue Slices using real Pi workers.
- Lifecycle ceiling of `testing` for automated production.

### Explicit non-goals

| ID | Non-goal | Why excluded | Revisit trigger |
|---|---|---|---|
| N-1 | French, German, English, Arts, Music, Movement, or Formation générale coverage | The approved first program is limited to four domains | A separately approved expansion program |
| N-2 | Canton-specific enrichment beyond the PER | The PER is the sole approved curriculum authority for this batch | A named canton and source set are approved |
| N-3 | Classroom identity, progress persistence, scores, or teacher analytics | The lab isolation contract forbids production coupling during exploration | Validated exercises are promoted through a separate product slice |
| N-4 | AI-generated pupil evaluation or surveillance | No authority or evidence model has been approved | Separate trust and pedagogy decision record |
| N-5 | Claiming pedagogical validation | Automated review cannot establish pupil learning | Documented pupil trials and teacher approval |
| N-6 | Copying Brilliant.org content, branding, or proprietary interaction assets | It is an inspiration for interaction quality, not a content source | Never, absent explicit rights |

### External constraints and integrations

- Official CIIP/PER pages and PDFs are the curriculum authority.
- Source availability and copyright restrictions may constrain quotations and local copies.
- Khazad-Doom slice areas, dependencies, questions, and verification profiles are hard authorization boundaries.
- The existing Exercise Lab catalog schema and isolation contract remain authoritative unless a separate approved slice changes them.

## Operational expectations

- **Deployment and connectivity:** prototypes build into the standalone static lab and must run without network calls after loading.
- **Observability and support:** KD evidence, validation reports, coverage matrices, and design findings provide the production trail.
- **Data lifecycle:** no pupil data persists; temporary prototype state resets on reload.
- **Degraded/offline behavior:** exercises remain usable from the locally served build; external curriculum links are documentation-only.
- **Reversibility and recovery:** each exercise has a stable ID and isolated folder, enabling revision, archival, or replacement without cross-exercise runtime coupling.

## Success and rollout

| Outcome | Measure | Baseline | Target | Evidence required |
|---|---|---:|---:|---|
| Curriculum completeness | Official in-scope progression statements mapped | 0 systematic mappings | 100% mapped or explicitly blocked with owner | Reviewed coverage matrix and gap report |
| Three-lens depth | Clusters with all three exercise lenses | 0 | 100% | Catalog-to-cluster matrix |
| Artifact completeness | Exercises with metadata, design, and prototype | 1 prototype outside 6H target scope | 100% of planned 6H records | Catalog validation |
| Technical integrity | Type/check/build failures | 0 current known failures | 0 | `npm run check` and `npm run build` |
| Interaction completeness | Exercises with intro, manipulation, specific feedback, recovery, and completion | Not yet measured | 100% | Automated interaction smoke evidence plus review |
| Accessibility readiness | Keyboard/touch operation, non-color cues, reduced motion, readable responsive layout | Not yet measured | 100% reviewed; no blocking findings | Per-slice checks and independent review |
| Evidence honesty | Exercises falsely marked `validated` | 0 | 0 | Lifecycle audit |
| Pupil validation | Exercises observed with pupils | 0 | Deferred; not a batch completion claim | Future observation records |

### Pilot and promotion policy

The user selected a full batch rather than a separate pilot release. Risk is controlled through KD dependencies and gates inside the batch: source/matrix work precedes implementation, shared quality contracts precede exercise slices, and independent review precedes the final catalog gate. Passing work may end at `testing`; no exercise is automatically promoted or marked `validated`.

## Decision ledger

| ID | Decision | Rationale | Rejected alternatives | Owner | Revisit trigger |
|---|---|---|---|---|---|
| D-1 | Cover Mathematics, Science, Geography, and History | Matches the requested first 6H program boundary | Mathematics only; Math and French; all PER domains | Curriculum owner | Approved scope expansion |
| D-2 | Treat the full PER 5H–6H progression as authoritative and label explicit 6H endpoints/prerequisites | PER commonly specifies progression by half-cycle; avoids fabricated yearly splits and missing foundations | 6H labels only; unspecified local curriculum | Curriculum owner | A supplied official yearly authority supersedes the half-cycle rule |
| D-3 | Use three lenses per coherent cluster | Balances depth, diversity, and manageable complexity | One exercise per cluster; atomic per-statement records; shared adaptive engines | Product/curriculum owner | Coverage review shows systematic redundancy or gaps |
| D-4 | Produce the full collection as dependency-ordered KD slices in one batch | User explicitly requested full-batch KD orchestration | Gated pilot waves; domain-by-domain delivery | Product/technical owner | Preflight shows the run cannot be bounded safely |
| D-5 | Automated production may advance exercises only to `testing` | Preserves the distinction between technical readiness and pupil evidence | `prototyping` ceiling; internal-only pedagogical validation | Teacher/curriculum owner | Approved classroom validation protocol and evidence |
| D-6 | Balance concept-led mechanics with independent visual studies, inspired by Brilliant.org quality | Preserves conceptual rigor and creative diversity without one generic shell | Unified campaign; small template set; unrelated interfaces with no common grammar | Product owner | Usability review finds inconsistency or production cost unacceptable |
| D-7 | Follow the PER for Geography and History context without adding an assumed canton layer | Avoids unsupported localization | Romandy-neutral enrichment; specific canton; global substitution | Curriculum owner | Canton-specific sources and scope are explicitly approved |

## Fact ledger

| ID | Fact | Evidence/source | Architectural consequence |
|---|---|---|---|
| F-1 | The Exercise Lab discovers flat exercise folders and requires metadata plus `DESIGN.md`; prototype status requires `Prototype.svelte` | `experiments/README.md`; `experiments/src/lib/catalog/discovery.ts` | Every generated record can remain independently discoverable and fail fast |
| F-2 | The lab forbids imports from the classroom app, cross-exercise imports, global state, and classroom persistence | `experiments/README.md` isolation contract | Shared runtime engines are not the default production strategy |
| F-3 | The lab lifecycle distinguishes `prototyping`, `testing`, and `validated` | `experiments/README.md`; catalog schema | KD can enforce the approved `testing` ceiling |
| F-4 | Official PER evidence may group progression by half-cycle and label only selected expectations by year | `experiments/curriculum/sources/src-per-0001.md` demonstrates the pattern for MSN 22 | Source mapping must preserve year-band evidence boundaries |
| F-5 | Khazad-Doom slices bound goals, paths, dependencies, acceptance, verification, and stop conditions | Khazad-Doom `SLICES.md` contract | Full-batch execution requires complete validated slice authority before launch |

## Assumption ledger

| ID | Assumption | Consequence if false | Owner | Validation method | Required by |
|---|---|---|---|---|---|
| A-1 | Authoritative CIIP/PER sources are accessible for all four selected domains | Mapping may contain blocked gaps and the batch cannot claim completeness | Research lead | Retrieve and record every source before cluster finalization | Coverage gate |
| A-2 | Coherent clusters can cover all statements without hiding materially distinct outcomes | Three-lens records could become overloaded | Curriculum reviewer | Statement-to-cluster review with explicit gap and overlap checks | Slice generation |
| A-3 | The static isolated lab can support the required manipulations without new runtime dependencies | Some mechanics may require a separately approved platform slice | Technical lead | Representative mechanic feasibility checks during contract preparation | Implementation |
| A-4 | Agent review plus automated interaction checks can establish testing readiness | Manual teacher review may still be needed before `testing` | Quality owner | Review rubric and sampled human inspection | Lifecycle transition |

## Hypothesis disposition

| ID | Hypothesis | Evidence sought | Disposition | Resulting fact/assumption/question |
|---|---|---|---|---|
| H-1 | Three lenses provide enough depth for each cluster without atomic duplication | Coverage, overlap, and review results | Retained for validation | A-2 |
| H-2 | Concept-led independent studies can remain coherent through a shared quality grammar | Cross-catalog usability and accessibility review | Retained for validation | A-4 |
| H-3 | One full KD batch can remain bounded despite the collection size | Final cluster count, slice graph validation, clean preflight, and verification budget | Retained for validation | Q-1 |

## Open questions

| ID | Question | Blocking? | Owner | Resolution evidence |
|---|---|---|---|---|
| Q-1 | What exact cluster and exercise count results from authoritative statement mapping? | Non-blocking for approval; blocking for KD launch | Research/curriculum lead | Reviewed coverage matrix and validated slice graph |
| Q-2 | Which interaction mechanics require capabilities beyond the current isolated Svelte lab? | Non-blocking; affected slices must stop if discovered | Technical lead | Mechanic feasibility report and explicit replan if needed |
| Q-3 | Who will conduct and document pupil trials after the batch reaches `testing`? | Non-blocking for this batch; blocking for later validation | Classroom owner | Named trial owner and observation protocol |

## Architecture-shaping tensions

- Full-batch parallelism versus consistency and cross-slice review.
- Exercise isolation versus opportunities for reusable interaction infrastructure.
- Distinct visual studies versus predictable operation for 6H pupils.
- Statement-level traceability versus coherent learning clusters.
- Dense coverage versus cognitive load and catalog discoverability.
- Automated production scale versus evidence honesty and pupil validation.

## Convergence summary

The approved direction would build a complete PER-based 5H–6H learning collection for Mathematics, Science, Geography, and History, organized into coherent curriculum clusters with three testing-ready interactive studies each. Agents may research, map, design, implement, and technically review within validated KD slice boundaries; humans retain authority over disputed curriculum interpretation and all claims of pupil validation. Critical invariants are source traceability, no hidden coverage gaps, concept-revealing feedback, accessibility, lab isolation, copyright restraint, and a lifecycle ceiling of `testing`. Explicit non-goals include other school domains, canton-specific additions, classroom persistence, surveillance, and copied Brilliant.org content. Exact catalog size and mechanic feasibility remain owned technical research questions, not hidden product decisions.

## Readiness declaration

**State:** `conditionally_ready`

The accountable classroom/curriculum owner approved revision digest `47f6e78d6966928a`. Q-1 and Q-2 are named, owned technical research questions that may be resolved during evidence mapping and technical-contract preparation; no unresolved product decision is delegated to workers. KD launch remains blocked until the coverage matrix fixes the exact cluster count, every intended mutation path is covered by validated slices, and repository preflight is admissible.
