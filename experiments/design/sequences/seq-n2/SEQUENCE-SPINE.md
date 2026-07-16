# SEQ-N2 — Relations entre nombres — Sequence spine

**Spine status:** owner-approved on 2026-07-16
**Approved revision:** `r1-dependency-closed`, reviewed pre-record digest `sha256:a65cbb9a85b27b671515983370122575387e07845a238cf4aa651473c1f779e9`
**Mechanic authority:** none
**First checkpoint cycle:** `NUM-02 — Estimer avec des repères`, paused after owner rejection of A/B/C

## Authority and status

- **Roadmap record:** bounded exception in [`6h-mathematics-roadmap.md`](../../../curriculum/roadmaps/6h-mathematics-roadmap.md) and [`6h-exercise-production-strategy-decision-record.draft.md`](../../6h-exercise-production-strategy-decision-record.draft.md), revised by the owner on 2026-07-16.
- **Approved revised N2 membership:** `NUM-02`, `NUM-05`, and `NUM-06`.
- **Imported prerequisite evidence:** `NUM-01` for `NUM-02`; `NUM-04` for `NUM-05`. The owner authorized these only as prerequisite evidence plus a short diagnostic handoff. This grants no mechanic, prototype, expansion, or broader production authority for either node.
- **Relocated checkpoint:** `NUM-07` moves after `NUM-03`/`NUM-04` in `SEQ-N1`, where place-value transformation closes that arc more naturally. The placement is approved; production for `NUM-07` or `SEQ-N1` is not.
- **Dependency-closure status:** closed through imported evidence. A missing prerequisite pauses the relevant N2 route and hands the pupil to teacher-directed/out-of-slice remediation; N2 must not quietly reteach an unapproved checkpoint.
- **Spine gate:** passed on 2026-07-16 and remains valid as a structural decision.
- **NUM-02 mechanic-cycle disposition:** all A/B/C directions were rejected on 2026-07-16 for unclear learning purpose and semantic misalignment. Their temporary comparison was deleted; no script, catalog graybox, mechanic, or expansion was authorized.
- **Pilot status:** N2 is paused. The active workflow pilot moves to the bounded measurement pair `MES-01 → MES-02`; that pivot grants no production authority to this spine or any N2 checkpoint.
- **Mechanic-gate scope:** one named checkpoint exercise at a time. This spine approval does not select a direction, approve a mechanic, or authorize expansion.

## Sequence intent

- **Conceptual arc:** move from a reference-based uncertainty claim about an unknown collection to exact symbolic order, then represent exact order and distance on a scaled number line.
- **Why these checkpoints belong together:** each sharpens the answer to *where is this quantity or number relative to things I know?* The learner creates defensible bounds from a collection (`NUM-02`), formalizes exact comparisons and constructs numbers between bounds (`NUM-05`), then turns those exact relationships into scaled spatial location (`NUM-06`).
- **Learner-visible progress:** “about this many, between my plausible bounds” → “exactly before/after/between because this place decides” → “at this location because these bounds and this scale constrain it”.
- **Provisional integration challenge:** estimate an unknown collection with a known reference and commit an uncertainty interval; reveal and organize the exact total; compare/intercalate that exact value among fixed numerical bounds; then place it on a number line whose graduation unit must be inferred. This is a sequence-level design probe, not an approved scene or curriculum requirement.

## Curriculum traceability

| Checkpoint | Direct source codes | Directly supported relationship | Sequence-level interpretation | Source limits |
|---|---|---|---|---|
| `NUM-02` Estimer avec des repères | `P22.03` | Estimation of a collection in the 5H–6H natural-number domain | Make the estimate observable through a chosen reference collection and lower/upper uncertainty bounds | PER does not prescribe reference sizes, intervals, a flash, interface, or exercise order; no separate explicit 6H endpoint is named for estimation |
| `NUM-05` Comparer et ordonner par valeur de position | `P22.07`, `E6-22.04` | Compare, order/classify, bracket, and intercalate natural numbers; the expectation is explicitly marked for 6e | Change the same lower/current/upper grammar from uncertainty to exact order; justify through the first decisive place | PER does not prescribe a left-to-right reveal mechanic or make `NUM-02` its prerequisite |
| `NUM-06` Localiser un nombre sur une ligne | `P22.08` | Represent and read numbers on a number band/line within the 5H–6H progression | Use exact bounds and an inferred graduation unit to place/read a natural number | No separate explicit 6H endpoint is named here; sequence order and any narrowing mechanic are project interpretations |

Source synthesis: [`6h-mathematics-coverage.md`](../../../curriculum/research/6h-mathematics-coverage.md), based on `src-per-0002`. The PER progressions do not establish this project’s sequence, mechanics, likely misconceptions, accessibility, fun, or learning effectiveness.

## Dependency closure and handoff routes

| Checkpoint | Required prerequisite evidence | Authority/status | Diagnostic handoff | Production consequence |
|---|---|---|---|---|
| `NUM-02` | `NUM-01`: organize and audit exact collections through groups of 10/100 | Imported evidence approved; no `NUM-01` production authority | Confirm the pupil can recognize/use an organized known-size group without recounting every item. If not, pause and route outside this slice. | Route into the active `NUM-02` brief is closed for pupils showing the evidence |
| `NUM-05` | `NUM-04`: coordinate quantity, spoken/written numeral, and place-value decomposition | Imported evidence approved; no `NUM-04` production authority | Confirm the pupil can align/decompose a natural by place and name the value of a digit. If not, pause and route outside this slice rather than embedding a hidden `NUM-04` lesson. | Makes the `NUM-02 → NUM-05` handoff conditional but explicit; no unapproved remediation beat is produced |
| `NUM-06` | `NUM-05`: exact comparison, bracketing, and intercalation | Internal prerequisite | Use `NUM-05` evidence directly; no separate external route | Closed once the `NUM-05` checkpoint evidence is present |

Imported evidence closes authority and traceability; it does not assert that every pupil already has the prerequisite. The diagnostic handoff prevents a missing prerequisite from being misread as failure in the new mechanic.

## Progression spine

| Order | Checkpoint | Prerequisite input | New conceptual shift | Inspectable representation | Observable evidence | Handoff to next checkpoint | Mechanical role, not a selected mechanic |
|---|---|---|---|---|---|---|---|
| Entry A | `NUM-01` imported evidence | Familiar natural numbers and one-to-one counting | Exact quantity is reliable through groups of 10/100 rather than repeated one-by-one counting | Organized known-size group ↔ exact numeral | Recognizes and audits a grouped reference | Known-size groups can become estimation references | prerequisite check only |
| 1 | `NUM-02` Estimer avec des repères | Closed `NUM-01` route | An estimate becomes a reasoned uncertainty interval anchored to known collections | Unknown collection + labeled reference(s) + lower/upper bounds + grouped reveal | Commits a plausible interval, uses a reference, and adjusts after inspectable evidence | Two written bounds and the exact total become candidates for exact comparison | inspect evidence, choose reference, bracket, calibrate |
| Entry B | `NUM-04` imported evidence | Coordinate numeral and place-value decomposition | Exact written naturals can be compared through place value | Aligned place-value columns ↔ numeral | Names digit value and identifies a meaningful place | Makes exact order reasoning available | prerequisite check only |
| 2 | `NUM-05` Comparer et ordonner par valeur de position | `NUM-02` bound language plus imported `NUM-04` evidence | Move from uncertain quantity bounds to exact symbolic order; the first unequal place decides and a number can be constructed between exact bounds | Ordered band + aligned place-value columns + explicit `<`, `>`, `entre` relation | Orders, brackets, and intercalates naturals while justifying the decisive place | Exact intervals and relative order can be represented spatially | compare, order, construct-between, justify |
| 3 | `NUM-06` Localiser un nombre sur une ligne | `NUM-05` exact order/interval evidence | Relative order becomes location and distance on a chosen scale | Number line with labeled bounds, interval, and inspectable graduation unit | Infers scale, places/reads a number, and verifies its relative position | Closes N2 by coordinating bounds, exact value, order, and scale | choose bounds, infer scale, place, verify |

## Coherence contract

### Recurring mathematical language

- `quantité exacte`, `quantité approximative`, `repère`;
- `borne inférieure`, `borne supérieure`, `entre`, `intervalle`;
- `plus petit`, `plus grand`, `avant`, `après`;
- `unité`, `dizaine`, `centaine`, `millier`, `rang` when place-value evidence matters;
- `je prévois`, `j’observe`, `je révise`, `je justifie`, `je vérifie`.

Pupil copy may begin with shorter labels (`minimum plausible`, `maximum plausible`) before formalizing `borne inférieure/supérieure`.

### Representations that carry forward

- two ordered bounds with a current quantity/number visibly between or outside them;
- groups of 10/100 connected to the written numeral rather than decorative piles;
- an original commitment preserved beside a revised or verified state;
- explicit links among quantity, numeral, exact order, and number-line position.

### Shared interaction grammar

```text
inspect or request evidence
→ commit a relation or interval
→ expose a mathematical consequence
→ inspect why it happened
→ revise, justify, or verify
```

This grammar supplies familiarity. It is not a generic runtime and does not authorize the same mechanic for every checkpoint.

### What must evolve

- `NUM-02` reasons from incomplete sensory evidence and reference collections.
- `NUM-05` reasons from exact symbolic/place-value evidence.
- `NUM-06` reasons from exact interval scale and spatial position.

Difficulty must evolve through evidence quality, constraints, representation coordination, and independence—not only larger values, shorter timers, or new scenery.

### Important semantic distinction

The interval in `NUM-02` expresses **uncertainty**: the pupil claims a plausible range before exact knowledge. The interval in `NUM-05`/`NUM-06` expresses **exact order/location**: once the total is known, it is mathematically inside or outside fixed bounds. Shared lower → current → upper visuals must explicitly mark this change in meaning.

## Checkpoint handoff review contract

After each approved exercise is expanded, review only its interface with the spine before opening the next mechanic cycle:

1. Is the promised evidence observable without inferring intent from a correct answer?
2. Are the named representation and French terms available to the next checkpoint?
3. Is the changed meaning of `intervalle` made explicit rather than hidden by a reused visual?
4. Did the exercise accidentally teach or contradict an unapproved prerequisite?
5. Does the next brief need a dated spine amendment? A material amendment returns affected mechanics to review; it never grants approval.

## Owner sequence-spine gate

Approval applies only to the revised N2 membership, imported prerequisite routes, progression, representations, and handoffs. It does not select or approve mechanics.

Allowed dispositions:

- approve sequence spine;
- approve with named structural changes;
- return to roadmap/dependencies;
- park the sequence.

- **Owner structural choices already recorded:** import `NUM-01`/`NUM-04` evidence only; move `NUM-07` to `SEQ-N1` after `NUM-03`/`NUM-04` (2026-07-16).
- **Owner response:** `Approve spine (Recommended)`
- **Normalized disposition:** `approve sequence spine`
- **Required changes:** none
- **Revision/digest reviewed:** `r1-dependency-closed`; pre-record `sha256:a65cbb9a85b27b671515983370122575387e07845a238cf4aa651473c1f779e9`
- **Recorded by:** repository owner
- **Recorded at:** 2026-07-16

This approval opened the now-closed `NUM-02` mechanic cycle. On 2026-07-16 the owner rejected all three directions, deleted the comparison aid, and paused N2. The structural approval remains recorded, but no `NUM-02` script, catalog graybox, mechanic, or expansion is authorized.
