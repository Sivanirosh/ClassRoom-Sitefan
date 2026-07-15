# 6H Independent Review Rubric

**Rubric ID:** `6H-REVIEW-1`

**Binding contract:** `experiments/design/6h-exercise-quality-contract.md`

Use this rubric in every paired 6H review slice. It is a release gate from `prototyping` to `testing`, not a scoring guide and not a pupil-validation protocol. A reviewer must inspect all three records in the cluster together, exercise the prototypes, run the filtered browser evidence and record concrete file/state evidence. A plausible design description is not a pass when the prototype does something else.

## 1. Review outcome and severities

| Severity | Meaning | Required disposition |
|---|---|---|
| Blocker | Curriculum contradiction, unsupported 6H or validation claim, isolation/privacy/network/persistence breach, copied protected content, inaccessible core path, missing exercise or inability to review safely. | Fix inside the authorized prefixes or stop and escalate. Never promote. |
| High | Any other failed binding item in this rubric, including an incomplete loop, generic lens reskin, nonspecific feedback, smoke-path failure, keyboard/touch failure or 320 px overflow. | Fix and re-run the affected evidence before promotion. |
| Medium | A real quality defect that does not invalidate the objective, required path or testing-readiness evidence. | Fix when clearly in scope or document for pupil testing; it cannot conceal a blocker/high issue. |
| Note | Observation or residual pupil-testing hypothesis without a demonstrated defect. | Preserve in the independent-review entry. |

An exercise passes only with zero unresolved blocker or high findings and all automated and manual gates below passing. Numeric averages and “mostly passes” are not allowed. One passing exercise does not excuse a failing sibling.

## 2. Evidence the reviewer must record

For each exercise, record in its `DESIGN.md`:

- review date and role (“independent 6H review”);
- reviewed exercise ID and incoming revision or commit when available;
- curriculum/metadata evidence inspected;
- manual interaction and accessibility paths inspected;
- filtered smoke command and result;
- findings, fixes and re-check evidence;
- remaining pupil-testing hypotheses; and
- outcome: remain `prototyping` or advance to `testing`.

Do not delete implementation decisions or rewrite hypotheses as facts. Append the review entry under **Findings and decisions**.

## 3. Per-exercise binding checklist

Mark every row **pass**, **fail** or **blocked**, with a file, UI state or command as evidence.

### A. Identity, curriculum and evidence honesty

| ID | Pass condition |
|---|---|
| A1 | Folder, `exercise.ts`, `DESIGN.md` and prototype agree on the immutable allocated ID, semantic slug, title and one objective. |
| A2 | Metadata uses `years: ['6H']`, exact approved objective/source mappings, `program-per-6h`, the normalized cluster tag, all normalized statement tags and exactly one approved lens tag. `DESIGN.md` preserves canonical source, cluster and statement IDs. |
| A3 | Every mapped statement is classified honestly as 5H–6H progression, explicit 6H endpoint or unbanded end-of-cycle expectation. No end-of-cycle expectation is presented as a mandatory 6H endpoint. |
| A4 | Direct/source-backed curriculum content is clearly separated from design interpretation. The citation supports the stated objective; the design does not imply the source prescribed this interface. |
| A5 | The objective is observable and bounded. Evidence requires meaningful action, explanation, revision or transfer beyond completion, time or one correct click. |
| A6 | Source-supported misconceptions are distinguished from untested design hypotheses or possible strategies. Neither metadata nor pupil feedback labels a pupil. |
| A7 | Prerequisites, at least three deliberate variations, valid-answer rules, authored/generated cases, edge cases and ambiguity guards form a bounded inspectable content model. Sample all authored cases and representative generated boundaries. |
| A8 | The observation plan identifies evidence that would support and weaken the interaction hypothesis, distinguishes concept errors from interface friction and preserves residual pupil-testing questions. |
| A9 | Status is `prototyping` on entry. No artifact claims mastery, measured learning, pupil validation or a stronger year-band claim than the coverage matrix supports. |

### B. Complete concept-led loop and feedback

| ID | Pass condition |
|---|---|
| B1 | A readable French introduction states the purpose, pupil action and necessary controls/vocabulary. |
| B2 | The pupil actively manipulates, predicts, arranges, compares, constructs or tests the target concept. Replacing labels with an unrelated topic would break the mechanic’s meaning. |
| B3 | A deliberate decision/submission commits an interpretable response and cannot be triggered accidentally by pointer movement alone. |
| B4 | At least one planned incorrect response reaches immediate, specific explanatory feedback tied to the submitted evidence and target relationship. Color, score, “Réessaie” or “Faux” alone fails. |
| B5 | Incorrect feedback leads to a recoverable retry or scaffold without reload, shame or automatic answer/advance. The pupil can use the explanation to change the response. |
| B6 | A correct response reaches specific explanatory feedback stating why it fits. The submitted response remains understandable beside or through the explanation. |
| B7 | A visible continuation action leads through at least three concept-relevant variations, and a distinct completion state summarizes the strategy without claiming mastery. |
| B8 | French is concise, age-appropriate and actionable; disciplinary terms are defined in context, accents/representations are correct and testing/curriculum jargon is absent from pupil text. |

### C. Accessibility and responsive operation

| ID | Pass condition |
|---|---|
| C1 | Starting from the runner, the complete loop is operable with keyboard alone. Tab order follows reading/visual order; native Enter/Space/arrow behavior works; there is no pointer-only step. |
| C2 | Focus is clearly visible on every interactive element, never trapped or lost, and handled or announced sensibly after feedback, retry, continuation and completion transitions. |
| C3 | All controls have meaningful accessible names, instructions expose current operation/value and feedback is available as text through status/focus semantics. |
| C4 | Primary pupil controls and manipulation targets provide non-overlapping targets of at least 44 × 44 CSS px for pointer and touch. |
| C5 | Every drag, draw, hover or precision-placement mechanic has a visible keyboard/touch alternative such as select-then-place or discrete controls. Snapping/undo prevents motor errors from masquerading as concept errors. |
| C6 | Selection, correctness, progression and focus use text, symbol, pattern, position or another accessible cue in addition to color. |
| C7 | With reduced motion, all information and controls remain available, nonessential movement is removed and no timing or animation is required to understand the result. |
| C8 | At an actual 320 CSS-pixel touch viewport, the document has no horizontal overflow; labels, values, feedback and required controls do not clip, overlap or become unreachable; stacked relationships remain understandable. |
| C9 | Text remains readable and essential content does not depend on sound, hover, motion, transient display or text embedded only in an image. |

### D. Isolation, privacy and source-content integrity

| ID | Pass condition |
|---|---|
| D1 | The prototype imports no classroom application code and no sibling exercise; its runtime, state, styles and assets are exercise-owned. |
| D2 | There is no shared exercise engine, global-state mutation, analytics, telemetry, identity, result submission or classroom connection. |
| D3 | Answers, scores, observations and error-family codes remain only in component memory and reset on reload. There are no cookie, local/session storage, IndexedDB, Cache Storage API or service-worker writes. |
| D4 | Before the smoke root is ready, traffic is limited to same-origin GET/HEAD requests for runner navigation and lab-build modules/styles/fonts/exercise-owned assets. There are no external, mutation, fetch/XHR or beacon requests at any time and no request at all after the smoke root becomes visible. |
| D5 | Curriculum text is bounded paraphrase/reference, not a committed source PDF or substantial protected copy. Assets are original or permissively reusable with documented attribution. |
| D6 | The visual study and French interaction text are independently created. General inspiration from Brilliant.org quality is allowed; copied Brilliant.org content, branding, logos, assets, proprietary wording or a recognizable wholesale screen copy fails. |

### E. Smoke-marker and browser evidence

| ID | Pass condition |
|---|---|
| E1 | The root exposes `data-smoke-contract="6h-v1"` and the correct `data-exercise-id`. Required `data-smoke-state`, `data-smoke-action`, `data-smoke-attempt` and per-state `data-smoke-variation` values follow `6H-SMOKE-1`. |
| E2 | Markers decorate real visible pupil controls/states only. They are not hidden shortcuts, stale duplicates or alternate test logic; current actions are unique and multi-control attempts use unique contiguous `data-smoke-step` values. |
| E3 | The desktop scenario reaches controls with Tab and activates with Enter/Space through incorrect feedback, retry, correct feedback, continuation and completion only after at least three distinct variation values reach correct feedback. No Playwright click substitutes for pupil keyboard operation. |
| E4 | A separate touch-enabled browser context at exactly 320 CSS px taps through the same complete path, with no horizontal document overflow and no required control that is horizontally off-screen, clipped, overlapping or unreachable after vertical scrolling. |
| E5 | At least one complete path under reduced-motion emulation preserves every state, explanation and action safely. |
| E6 | Both paths enforce the contract’s initial same-origin GET/HEAD allowlist and zero-request boundary after smoke readiness, fail on page/console errors, forbidden network activity, storage/cookie/IndexedDB/Cache Storage API writes or service-worker registration, and produce none. |
| E7 | Incorrect and correct marked states expose specific accessible explanatory text and non-color cues; retry, continuation and completion are directly observable. |

## 4. Three-exercise cluster review

Review the cluster as a set after each exercise passes its per-exercise checks.

| ID | Pass condition |
|---|---|
| L1 — Construction | The construction study makes the target relationship visible through manipulation and consequence, rather than asking for prior rule recall under a generic question shell. |
| L2 — Practice | The practice study deliberately varies concept-relevant cases and connects feedback to an invariant strategy. Authored values may carry the variation when they deliberately change magnitude, order, boundary structure or another documented conceptual dimension; arbitrary substitutions of values, labels, colors or scenery alone fail. |
| L3 — Transfer/diagnosis | The transfer study uses a genuinely novel context, representation or decision structure, defines a small authored error-family vocabulary and records the applicable code for submitted attempts in component memory only. The planned incorrect smoke attempt records a documented non-success family, and reload resets it. |
| L4 — Diversity | The reviewer can state three different one-sentence mechanic purposes. The studies are not the same choice/submit loop with cosmetic changes. |
| L5 — Collective coverage | Together the studies address the cluster’s mapped statement IDs without silently dropping a statement, claiming an unbanded expectation as 6H or duplicating one lens while missing another. |
| L6 — Coherence | The set shares accessible operating conventions but retains independently created visual and interaction expression; no exercise imports or controls another. |

Failure of L1–L6 is a high finding for the affected records. If fixing it would materially change the approved objective, lens or cluster boundary, the reviewer must stop under the slice’s `must_ask_if` rule rather than redesign outside authority.

## 5. Required review paths

### 5.1 Manual desktop inspection

For each exercise:

1. Start at introduction and use pointer once to inspect ordinary pointer behavior and target precision.
2. Reload and complete the primary path with keyboard only.
3. Deliberately submit the marked wrong attempt; read the feedback for specificity and verify the response remains interpretable.
4. Use retry/scaffold, then submit the correct attempt and continue through all variations.
5. Inspect focus order/visibility after every transition and verify selection/correctness without color.
6. Enable reduced motion and repeat a complete path or inspect the automated complete reduced-motion path plus all manual motion-sensitive states.
7. Confirm completion has no score/mastery/validation claim and reload resets local observations.

### 5.2 Manual 320 px touch inspection

In a touch-enabled viewport exactly 320 CSS px wide:

1. Tap through the complete incorrect → retry → correct → continuation → completion path.
2. Inspect every required control and feedback state for clipping, overlap, target size and reachable vertical flow.
3. Verify `document.documentElement.scrollWidth <= document.documentElement.clientWidth` throughout the path.
4. Use the visible non-drag alternative for any fine-motor interaction.

### 5.3 Automated evidence

Run the slice’s required commands, including:

```bash
cd experiments && npm run check
cd experiments && SMOKE_EXERCISES=EX-NNNN,EX-NNNN,EX-NNNN npm run test:smoke
```

The filtered value must contain exactly the three IDs owned by the paired review. A test pass cannot override a failed manual, curriculum, content or lens check.

## 6. Promotion decision

A reviewer may change an individual record from `prototyping` to `testing` only when:

- A1–E7 pass for that exercise;
- L1–L6 pass for the three-exercise set;
- every blocker/high finding has been fixed inside the authorized prefixes and re-checked;
- catalog/check and the complete filtered browser smoke pass; and
- the dated independent-review entry, fixes, evidence and residual pupil-testing hypotheses are appended to `DESIGN.md`.

If any condition fails, leave the affected record `prototyping` and record the reason. Do not weaken metadata, the smoke path, acceptance language or this rubric to obtain a pass.

Never assign `validated` or `promoted`. `testing` means ready to observe with pupils; only documented pupil trials plus authorized teacher/curriculum review may later support `validated`.

## 7. Review entry template

```markdown
- **YYYY-MM-DD — Independent 6H review:**
  - Reviewer role: independent review slice
  - Reviewed revision: <commit or revision>
  - Curriculum/evidence: <files, source/statement checks>
  - Manual paths: <keyboard, pointer, 320 px touch, focus, non-color, reduced motion>
  - Automated evidence: `<commands>` — <result>
  - Findings and fixes: <IDs/severities/dispositions>
  - Residual pupil-testing hypotheses: <what still requires pupils>
  - Outcome: remains `prototyping` | advanced to `testing`
```
