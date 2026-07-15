# 6H Exercise Quality and Testing-Readiness Contract

**Contract ID:** `6H-QC-1`

**Applies to:** all 111 exercises in `experiments/design/6h-production-plan.json`

**Companion review gate:** `experiments/design/6h-review-rubric.md`

This document is binding for the 6H implementation and paired independent-review slices. “Must” and “must not” are pass/fail requirements. The approved decision record, finalized curriculum map, Exercise Lab schema and isolation contract remain authoritative; a worker must stop rather than weaken this contract or invent a conflicting curriculum claim.

## 1. Product boundary

Each exercise is an original, self-contained French-language interactive study for pupils working toward the end of 6H. It must make one curriculum relationship available for the pupil to manipulate, inspect and use. A question skin, decorative animation or sequence of generic multiple-choice prompts is not sufficient when the same interaction could teach an unrelated concept by replacing labels.

The collection may use shared quality grammar—clear instructions, predictable focus, specific feedback and consistent smoke markers—but not a shared exercise runtime, cross-exercise imports or one generic visual shell. Each cluster’s three studies must have distinct learning purposes and meaningfully different concept-led loops.

Technical review can establish **testing readiness**, not pupil learning or pedagogical validation.

## 2. Required record and evidence

Every implementation must contain `exercise.ts`, a complete `DESIGN.md` and `Prototype.svelte`. The three files must agree about the objective, curriculum scope, lens, content, states and lifecycle.

### 2.1 Catalog traceability

`exercise.ts` must:

- use the immutable allocated `EX-NNNN` ID and `years: ['6H']`;
- use objective codes and canonical source IDs from the finalized 6H coverage matrix;
- include `program-per-6h`;
- include `cluster-<cluster-id>` after normalizing the canonical cluster ID to a lowercase slug;
- include exactly one of `lens-construction`, `lens-practice` or `lens-transfer-diagnosis`;
- include every mapped statement as `statement-<statement-id>` after the same normalization; and
- remain `prototyping` when the implementation slice finishes.

For these tags, normalization means lowercasing, replacing every run outside `a-z0-9` with `-`, and removing leading or trailing `-`. `DESIGN.md` must preserve the exact canonical cluster and statement IDs so normalized tags never become the sole trace.

### 2.2 Curriculum and claim honesty

`DESIGN.md` must identify:

1. the one observable learning objective;
2. the exact source IDs, objective codes and statement IDs supporting it;
3. whether each statement is a 5H–6H progression, an explicit 6H endpoint, or an unbanded end-of-Cycle-2 expectation;
4. a concise source-backed curriculum account, separated from design interpretation; and
5. what the exercise does **not** establish.

An unbanded end-of-cycle expectation may guide or diagnose a study, but must not be presented as a mandatory 6H endpoint. A source citation supports a curriculum statement; it does not prove that the proposed interaction teaches it.

The learning evidence must be observable in pupil action, choice, explanation, revision or transfer. Completion, time-on-task, a correct click or an automated pass alone is not evidence of understanding.

A response pattern may be called a **documented misconception** only when the cited curriculum research or another named source supports that label. Otherwise it must be recorded as a **design hypothesis** or **possible strategy to observe**. The interface and review notes must describe the observed response, not label the pupil.

### 2.3 Bounded design evidence

`DESIGN.md` must define:

- prerequisites and necessary vocabulary;
- at least three deliberate content variations that vary a concept-relevant dimension rather than surface decoration;
- the complete authored or generated content model, valid-answer rules, edge cases and ambiguity guards;
- the expected observable evidence beyond correctness;
- specific feedback and the recovery/scaffold strategy;
- an observation plan stating what would support or weaken the interaction hypothesis and how concept errors will be distinguished from interface friction;
- remaining pupil-testing hypotheses; and
- promotion criteria that require future pupil evidence.

Generated or authored content must be bounded and inspectable. It must not silently introduce unsupported facts, impossible cases, ambiguous answers or an unlimited model whose correctness cannot be reviewed.

## 3. Complete learning loop

Every prototype must implement the following reachable states. Adjacent states may share a screen, but none may be merely documented or hidden from the pupil path.

| State | Minimum evidence |
|---|---|
| Introduction | Names the purpose in readable French, shows what the pupil will do and gives essential controls or vocabulary. |
| Active concept manipulation | The pupil changes, arranges, predicts, compares, constructs or tests something whose consequence exposes the target relationship. |
| Decision/submission | The pupil commits an interpretable answer or decision; accidental pointer movement is not treated as a final answer. |
| Specific explanatory feedback | Incorrect and correct outcomes name the relevant relationship, evidence or error in this exact situation; “Bravo”, “Réessaie”, a score or color alone is insufficient. |
| Recoverable retry or scaffold | An incorrect attempt preserves dignity, explains a useful next step and permits correction without reload. A scaffold may reveal one relationship at a time but must not simply give the final answer and auto-advance. |
| Continuation | A visible pupil action moves to another deliberate variation after feedback has been available to read. |
| Completion | A distinct final state confirms the loop is finished and summarizes the concept or strategy without claiming mastery or validation. |

The normal path must include at least three deliberate variations. The pupil must be able to make an incorrect attempt, recover, make a correct attempt, continue and reach completion. Feedback may not erase the submitted response before the pupil can relate the explanation to it.

## 4. Three-lens contract

The three exercises for one cluster are complementary studies, not difficulty levels or visual reskins.

### 4.1 Construction — `lens-construction`

Construction must make a relationship visible through manipulation and consequence. It should let the pupil predict or act, inspect what changes and coordinate representations where useful. The central interaction must help build the concept; recalling a rule before any relationship is shown is not construction.

### 4.2 Varied practice — `lens-practice`

Practice must deliberately vary concept-relevant cases while preserving a usable strategy. Variation may concern representation, magnitude, order, evidence, distractor logic or degree of scaffold, but not only names, colors or decorative context. Feedback must connect each case to the invariant relationship and prevent blind repetition.

### 4.3 Transfer/diagnosis — `lens-transfer-diagnosis`

Transfer/diagnosis must use a genuinely novel context, representation or decision structure that was not rehearsed verbatim in the construction or practice study. It must make the pupil’s strategy interpretable rather than merely produce a total score.

The design must define a small, authored error-family vocabulary tied to observable answers or actions. On each submitted diagnostic attempt, the prototype must update the current response path and applicable interpretable error-family code in component memory only; the planned incorrect smoke attempt must produce a documented non-success error family. The code describes the response pattern, not the pupil, and must reset on reload. No identity, free-text profile, persistence, analytics, result submission or network transmission is permitted.

### 4.4 Cluster-level diversity test

The three studies fail this contract if they share the same repeated question/choice/submit loop with only different wording, values, colors or scenery. Reviewers must be able to state, in one sentence each, the different relationship-building, deliberate-practice and novel-transfer work performed by the three mechanics.

## 5. French language and feedback

Pupil-facing content must be French, age-appropriate for 6H and directly actionable.

- Use short sentences and familiar verbs; define necessary disciplinary vocabulary in context.
- State one action at a time and keep essential instructions available while acting.
- Avoid implementation, testing, diagnostic-code and curriculum-mapping jargon in the pupil interface.
- Give incorrect feedback that identifies the submitted evidence and the relationship to reconsider.
- Give correct feedback that explains why the response fits, not only that it fits.
- Never shame, rank or characterize a pupil from an error.
- Use accents, French punctuation and representations appropriate to the content, such as the decimal comma where applicable.

## 6. Accessibility and responsive behavior

All required paths must work without sight of color, without fine pointer precision and without animation.

### 6.1 Keyboard and focus

- Every pupil action must be operable with the keyboard alone.
- Use native semantic controls where possible. `Tab` order must follow the visual/reading order; `Enter`, `Space` and arrow keys must behave according to the control pattern.
- Focus must always be visible, must not be trapped or lost on state changes, and must move or be announced sensibly when feedback or a new variation appears.
- Instructions and accessible names must describe the operation and current value/state.

### 6.2 Pointer and touch

- Primary pupil controls and manipulation targets must provide a target of at least 44 × 44 CSS pixels without overlap.
- Touch and pointer paths must produce the same learning decisions and feedback as keyboard operation.
- A required drag, drawing gesture, hover or pixel-exact placement must have a visible alternative such as select-then-place, discrete steps, buttons or typed/discrete choices.
- Snapping, coarse regions and undo/retry must prevent motor imprecision from being misclassified as a concept error.

### 6.3 Perception, language and motion

- Correctness, selection, progression and focus may not be communicated by color alone; pair color with text, symbol, pattern, position or another programmatically available cue.
- Feedback must be available as text and exposed through an appropriate status or focus transition.
- Essential information may not depend on sound, hover, transient animation or spatial motion alone.
- `prefers-reduced-motion: reduce` must remove nonessential movement and preserve every state, control and explanation. No timed response is required.
- Text must remain readable without clipped labels, unexplained abbreviations or text embedded only in an image.

### 6.4 Actual 320 px behavior

At an actual 320 CSS-pixel-wide touch viewport:

- the document must not have horizontal overflow;
- every required control, label, value and feedback message must remain visible and usable without horizontal page panning;
- vertical scrolling is allowed, but required controls may not be clipped, overlap or become unreachable;
- control order and relationships must remain understandable when columns stack; and
- the full incorrect → retry → correct → continuation → completion path must remain available.

## 7. Presentation-neutral browser smoke contract

Every 6H prototype must expose `6H-SMOKE-1`. These attributes are a testability surface, not a shared runtime or hidden solution API.

### 7.1 Root, state and control markers

The prototype root must carry:

```html
<main data-smoke-contract="6h-v1" data-exercise-id="EX-NNNN">
```

Visible observable regions use exactly these state values:

```text
data-smoke-state="intro"
data-smoke-state="active"
data-smoke-state="incorrect"
data-smoke-state="retry"
data-smoke-state="correct"
data-smoke-state="continuation"
data-smoke-state="complete"
```

Every active, incorrect, retry, correct and continuation region must also expose a non-empty `data-smoke-variation` value. The value must be stable for that authored variation and different for each of the at least three variations in the loop.

Visible pupil controls use:

```text
data-smoke-action="start"       optional; required only when introduction gates the activity
data-smoke-action="submit"      commits the current attempt
data-smoke-action="retry"       enters the recoverable/scaffolded path
data-smoke-action="continue"    advances after correct explanatory feedback
data-smoke-attempt="incorrect"  real manipulation/response controls producing the planned wrong attempt
data-smoke-attempt="correct"    real manipulation/response controls producing the correct attempt
```

If an attempt needs more than one control activation, every control in that attempt must also have a unique contiguous `data-smoke-step="1"`, `"2"`, … value. If no step is supplied, exactly one control may carry that attempt value in the current state.

### 7.2 Marker semantics

- Markers may decorate only ordinary visible pupil controls and visible, non-empty observable regions. They must not be placed on hidden duplicates, disabled substitutes, scripted back doors or controls created only for tests.
- Activating marked controls must execute the same state transitions, answer rules and feedback used by an unassisted pupil. A marker identifies a reviewable path; it must not bypass the concept manipulation.
- At the moment the harness expects a marker, its control must be visible, enabled, uniquely identifiable and keyboard focusable. There must be exactly one visible current `start`, `submit`, `retry` or `continue` action. Multiple attempt controls are allowed only with unambiguous ordered steps.
- `incorrect` and `correct` state regions must contain specific accessible explanatory text and a non-color cue. `retry`, `continuation` and `complete` must be observable states, not inferred from a variable or console message.
- On each later variation, the currently valid `correct` attempt and submit controls must remain marked so the harness can continue until `complete`.

The deterministic transition protocol is:

| Current evidence | Pupil/harness action | Required next evidence |
|---|---|---|
| `intro` | activate the unique `start` action, when present | `active` with the first `data-smoke-variation` |
| `active` | activate the ordered `incorrect` attempt controls, then the unique `submit` | `incorrect` with the same variation, specific feedback and unique `retry` action |
| `incorrect` | activate `retry` | visible `retry` with the same variation, scaffold text and enabled correct-attempt controls |
| `retry` (or later `active`) | activate the ordered `correct` attempt controls, then `submit` | `correct` with the same variation and specific feedback, plus `continuation` and a unique `continue` action |
| `continuation` | activate `continue` | `active` with a new variation, or `complete` only after at least three distinct variations have reached `correct` |

An introduction that does not gate manipulation may show `intro` and first `active` evidence together and omit `start`. Exactly one visible region for each expected state value and current variation is allowed. The harness records distinct `data-smoke-variation` values and must reject completion before three distinct variations have reached `correct`.

### 7.3 Required automated paths

The generic harness must exercise each prototype through:

1. introduction/start when applicable;
2. active manipulation using the marked incorrect attempt;
3. submission and visible specific incorrect feedback;
4. visible retry/scaffold and a recoverable retry action;
5. active manipulation using the marked correct attempt;
6. submission and visible specific correct feedback;
7. visible continuation through every remaining variation, with at least three distinct variations reaching correct feedback; and
8. distinct completion.

The desktop scenario must reach the marked controls using `Tab` and activate them using `Enter` or `Space`, never Playwright `click()`. A separate browser context must repeat the path using taps with touch enabled and viewport width exactly 320 CSS pixels. At least one complete scenario must emulate reduced motion.

Through the complete exercised path, the harness must fail on:

- uncaught page errors or unexpected error-level console output;
- horizontal document overflow or required controls clipped outside the 320 px layout;
- a required marker that is hidden, disabled, ambiguous or keyboard-inoperable;
- feedback or state exposed only by color;
- any external request, non-GET/HEAD request or prototype-initiated `fetch`, XHR or beacon at any time; after the smoke root is visible, **any** further network request;
- writes to `localStorage` or `sessionStorage`, cookies, IndexedDB or the Cache Storage API; or
- service-worker registration.

The network allowlist before the smoke root is visible is limited to same-origin GET/HEAD requests needed by the runner navigation and its lab-build modules, styles, fonts and exercise-owned assets. They must finish before the root is considered ready. Ordinary browser HTTP-cache behavior is not a prototype storage write; calls to the Cache Storage API are forbidden.

A passing smoke proves only that the declared interaction path and guards work. It does not prove content validity, usability or learning.

## 8. Isolation, privacy and source-content boundary

A 6H exercise must not:

- import classroom application code, routes, styles, components, identity or persistence;
- import any sibling exercise;
- mutate global browser state or require a shared exercise engine;
- persist scores, answers, error families or observations;
- use analytics, telemetry, identity, cookies, storage, service workers or network calls;
- submit results or connect to classroom data;
- include substantial copyrighted curriculum text, copied source documents or unlicensed media; or
- claim pupil validation, mastery or measured learning.

Exercise-owned assets must be original, permissively licensed with documented attribution, or clearly reusable under the repository’s policy. Short source references and bounded paraphrases belong in `DESIGN.md`; source PDFs and substantial protected text do not.

## 9. Independent visual studies

Independent studies may be inspired by general qualities of high-quality interactive learning, including progressive disclosure, meaningful manipulation, immediate consequences, restrained motion, clear hierarchy and polished editorial composition. In particular, inspiration from Brilliant.org is allowed at the level of general quality and learning principles.

No exercise may copy Brilliant.org content, branding, logos, assets, proprietary interaction text, question wording or a recognizable protected screen wholesale. The curriculum account, scenarios, French copy, visual system, assets and interaction expression must be independently created for this program.

## 10. Lifecycle ceiling

- An implementation slice must leave all three records `prototyping`, even when its own checks pass.
- Its paired independent-review slice may fix findings only inside its authorized exercise prefixes.
- The review may advance an exercise to `testing` only after every binding rubric item passes, the complete filtered browser paths pass and the independent review entry is appended to `DESIGN.md`.
- A failing exercise remains `prototyping`; acceptance text, metadata or this contract may not be weakened to promote it.
- `testing` means technically and internally ready for pupil trials. It is not evidence of pupil learning.
- `validated` is reserved for documented pupil trials and authorized teacher/curriculum review outside automated production. No worker, automated check, domain audit or final gate may assign it.
