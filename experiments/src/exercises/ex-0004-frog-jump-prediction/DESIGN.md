# EX-0004 — Le saut juste

## Authority and gate boundary

- **Bounded spine:** `SEQ-M1 / MES-01 → MES-02`, revision `r0-bounded-measurement-pair`.
- **MES-01 contract:** mathematical relation remains approved; its `behavioral-only` evidence rule is unchanged.
- **Replacement candidate:** `MES01-FIT-A3-frog-jump-prediction`.
- **Owner design direction:** tutorial taps followed by integer prediction and automatic resolution; a true square unit grid; horizontal then vertical orthogonal transfer; and a mandatory two-unit obstacle leap.
- **Owner implementation response:** exact wording `implement the graybox now`; normalized disposition `approve disposable bridge graybox`; recorded 2026-07-17.
- **Current authority:** this replacement low-fi catalog graybox only. It does not approve a MES-02 learning contract, expansion, polish, efficacy claims, or unrelated scope.

The integer prediction is a deliberately scoped bridge hypothesis. It is not retroactively added to MES-01’s behavioral-only evidence contract.

## Recognizable source relationship

Chinese Checkers rules permit an adjacent move and a jump over an adjacent piece to the empty position beyond; jumped pieces remain and jumps may chain. EX-0004 retains the abstract unit lattice, one-unit move / two-unit jump-over relationship, and chained movement. It does not copy the source board shape, holes, pieces, layouts, artwork, scoring, or branded presentation.

Source provenance and adaptation boundaries are recorded in [`mes-01-calm-game-mechanic-precedents.md`](../../../curriculum/research/mes-01-calm-game-mechanic-precedents.md).

## Corrected game model

The tutorial is separate from the challenge loop.

### Tutorial

```text
tap the frog → one immediate invariant jump → one consequence mark
```

This lets the pupil see what one unit-jump means. It is onboarding, not independent evidence.

### Round 2 onward

```text
inspect span + visible unit
→ enter one integer prediction
→ automatic execution of exactly that many actions
→ inspect short / exact / over
→ retry after failure
```

There is no manual jump queue, wind-up control, separate launch button, timing window, aiming, drag, explanation, or written report. Entering a valid one-digit integer triggers execution immediately.

## Learning Microgame Card

| Field | Graybox decision |
|---|---|
| **Player feeling** | Anticipation followed by a readable physical reveal: “Will the last jump land exactly?” |
| **Tutorial command** | **Fais sauter** |
| **Challenge command** | **Combien de sauts ?** |
| **Primary challenge action** | Enter one integer; resolution is automatic. |
| **Opening state** | One frog at a named origin, one endpoint, and a square grid whose cell side is exactly one unit-saut. |
| **Goal** | Predict the number of physical actions that lands the frog exactly at the endpoint. |
| **Failure** | Too few actions leave a visible gap; too many leave the frog visibly beyond the endpoint. |
| **Recovery** | Inspect the retained trace, retry, and enter a revised integer. |
| **Success** | Final action lands exactly at the endpoint; the completed trace remains visible. |
| **Accessibility** | Native text input with numeric keyboard hint, ordinary keyboard entry, large controls, reduced-motion instant resolution, and no precision route. |

## Bounded rounds

### Round 1 — Tutorial: one-unit jumps

- Horizontal four-unit span.
- Tapping the frog immediately advances exactly one unit.
- Four taps reach the endpoint.
- Each action leaves one same-length consequence segment.

### Round 2 — Horizontal prediction

- Horizontal five-unit span on a true square unit grid; no target number is shown.
- Every horizontal cell side is exactly one unit-saut.
- The pupil enters one integer.
- The frog automatically performs exactly that many one-unit jumps.
- A short prediction is the deterministic smoke error; retry preserves cheap recovery.

### Round 3 — Vertical orthogonal transfer

- Six-unit straight vertical span on the same square unit grid.
- Every vertical cell side is exactly the same one-unit length as a horizontal cell side.
- The pupil predicts before any verification trace appears.
- This tests orientation transfer without diagonal-length ambiguity, aiming, or route planning.

### Round 4 — One mandatory double jump

- Horizontal six-unit span.
- A stationary obstacle frog occupies the third unit position.
- An ordinary action covers one unit; the forced jump over the obstacle covers two units in one action.
- Correct prediction is five physical actions: `1 + 1 + 2 + 1 + 1 = 6 units`.
- The obstacle remains; no piece is captured or removed.

The integer in Round 4 means **physical actions**, not the path’s unit-length measure. This is a later additive-composition hypothesis, not MES-01 evidence.

## Mathematical and diagnostic mapping

| Relation | Game state/action | Observable signal |
|---|---|---|
| One invariant unit | Square grid with 10-by-10 viewBox cells and equal ordinary displacements | Every horizontal or vertical cell side and ordinary trace segment has length 10 |
| Mental projection | Integer is committed before trace appears | First prediction exists independently of verification |
| Verification | Automatic chain executes exactly the entered action count | Landing is spatially short, exact, or over |
| Calibration | Retry follows retained discrepancy | Revised prediction can respond directionally to the gap/overshoot |
| Orthogonal transfer | Same square-side unit appears on horizontal and vertical straight spans | Success cannot rely only on left-to-right progression |
| Two-unit composition | Visible obstacle forces one double displacement | Six unit-lengths require five actions |

A final success after sequential guessing is supported completion, not mastery. Stronger evidence would require a fresh first prediction after practice. The graybox does not persist or submit that evidence.

## Smoke contract

Runner states remain `ready → active → success → complete`.

- Tutorial success: four real `jump` activations.
- First prediction recoverable error: fill the real prediction input with an under-target integer.
- Recovery: activate the real `retry` control.
- Prediction success: fill the same input with the ordinary pupil-facing correct integer.
- Vertical and obstacle rounds use the same prediction control.
- Reduced-motion and 320px touch paths traverse all four rounds.

## Technical validation record

Completed 2026-07-17:

- `npm --prefix experiments run check` — 0 Svelte errors/warnings; catalog valid with 5 exercises.
- `npm --prefix experiments run build` — production build passed.
- `SMOKE_EXERCISES=EX-0004 npm --prefix experiments run test:smoke` — 6/6 passed, including reduced-motion keyboard and 320px touch paths.
- root `npm run check` — 0 errors/warnings.
- `git diff --check` — passed.
- manual desktop and 320px browser traversal — no console/page errors or horizontal overflow; tutorial, shortage, horizontal/vertical grid, and obstacle states inspected.
- unit-grid geometry inspection — SVG viewBox cells are 10-by-10, ordinary orthogonal displacement is exactly 10, origins/endpoints lie on grid intersections, and the CSS viewport preserves the 6:5 viewBox ratio so cells render as squares.

A first smoke run exposed `Cannot read properties of undefined (reading 'chapter')` after continuing; the next scene index is now captured before scene loading. Independent review then found that a separate tutorial button weakened direct action and that success removed the exact trace. The tutorial control now overlays the visible world frog, and every success view retains the completed trace, endpoint, frog, and obstacle where applicable. The full smoke suite passed again after both repairs.

These checks establish operability only. Owner replay, pupil reasoning, non-guessing behavior, French comprehension, and practical accessibility remain untested.

## Kill criteria

Reject or revise if:

1. pupils solve by trying consecutive numbers without attending to the unit;
2. the result reads as a hidden-number guessing game rather than spatial projection;
3. pupils count decorative pixels rather than use the explicit square-side unit relation;
4. vertical performance depends on aiming, scrolling, or pointer precision;
5. the obstacle reads as decoration rather than a causal two-unit action;
6. pupils confuse physical action count with length in unit-lengths;
7. failure animation replaces or hides the actual shortage/overshoot state.

## Deferred advanced mechanics

- **Diagonal movement:** intentionally deferred because one square’s diagonal is `√2` times its side. A later contract must decide whether that longer displacement is a new unit or a distinct action value.
- **Direction-changing component:** a later board element may rotate the frog’s heading by 90°. That would create a polyline path and a new planning mechanic, so it is not silently added to this straight-span graybox.

## Scope exclusions

- No diagonal move, curved path, turn within a path, direction-changing component, branching route, optional obstacle, capture/removal, timer, lives, score, random events, ruler, conversion, fractions, area, persistence, network activity, teacher UI, generated artwork, or pupil prose.
- No claim of learning, fun, French comprehension, accessibility equivalence, efficacy, or promotion readiness.

## Current disposition

The disposable loop is operable and replayable. On 2026-07-17 the owner replayed the orthogonal-grid revision, validated the mechanic, and clearly approved continuing into UI/art expansion. That natural-language approval is sufficient; no prescribed phrase is required. The implementation phase is bounded by a Khazad-Doom Issue Slice. Pupil learning, accessibility equivalence, efficacy, MES-02 contract approval, and promotion remain separate later decisions.
