# SEQ-N2 / NUM-02 — Estimer avec des repères — Learning brief

**Status:** paused on 2026-07-16 after rejection of the A/B/C mechanic set
**Mechanic authority:** none; `NUM-02` is not the active workflow pilot

## Authority and active scope

- **Sequence spine:** [`../SEQUENCE-SPINE.md`](../SEQUENCE-SPINE.md), owner-approved `r1-dependency-closed` on 2026-07-16.
- **Roadmap boundary:** `NUM-02` is the proposed first checkpoint exercise in the bounded `SEQ-N2` review scope.
- **Checkpoint prerequisite closure:** `NUM-01` is explicitly imported as evidence and supplies organized groups of 10/100. This closes the route into `NUM-02` without authorizing `NUM-01` mechanic production.
- **Mechanic-cycle status:** all three prior directions and their temporary comparison were rejected for unclear learning purpose and semantic misalignment. The comparison was deleted. No replacement cycle is authorized while `NUM-02` is paused.
- **Mechanic-gate scope:** `SEQ-N2 / NUM-02` only; no mechanic or expansion is approved by this brief.
- **Curriculum source:** PER Cycle 2 v3.0, MSN 22, `src-per-0002`, progression `P22.03`; see [`6h-mathematics-coverage.md`](../../../../curriculum/research/6h-mathematics-coverage.md).
- **Proposed downstream checkpoint:** `NUM-05`; `NUM-04` place-value evidence is now an approved imported prerequisite only, with no mechanic-production authority.

## Learning objective

Given an unknown collection and at least one known collection reference represented through an equivalent sensory channel, the pupil commits to an ordered lower/upper interval before exact counting, uses a reference to justify that interval, and revises or confirms it after a grouped reveal makes the discrepancy inspectable.

## Curriculum boundary

- **Directly supported:** PER `P22.03` names estimation of a collection within the 5H–6H natural-number domain. The same source places natural numbers in `0–10’000`; an explicit 6H expectation separately names organized exact counting below `1’000`.
- **Design interpretation:** make estimation observable through a lower/upper uncertainty interval, a selected collection reference, and calibration after a grouped reveal. This interpretation aligns the checkpoint with the proposed N2 relation/interval arc.
- **Not established by the source:** mandatory timed exposure, a “flash window”, particular benchmark sizes, a digital interface, this scene order, likely pupil misconceptions, fun, accessibility, or learning effectiveness.

## Prerequisites

- Organize and verify a collection using groups of 10 (`NUM-01`).
- Read and compare familiar natural numbers in the pilot range.
- Understand that a lower bound must not exceed an upper bound.
- Distinguish “exactly” from “about/approximately”.

## Required vocabulary

- **Pupil-facing French:** `environ`, `repère`, `entre`, `au moins`, `au plus`, `borne basse`, `borne haute`, `révéler`, `ajuster`.
- **Contextual help needed:** `intervalle`; formal `borne inférieure` / `borne supérieure`; the difference between a defensible wide interval and a random very wide interval.

## Reasoning errors and productive difficulty

| Candidate error or strategy | Status | Evidence / rationale | What the mechanic should make inspectable |
|---|---|---|---|
| Gives one isolated number or recounts immediately | Roadmap entry signal; not yet observed with pupils | Current `NUM-02` checkpoint contract | Why a reference-based interval is useful before exact counting |
| Uses visible footprint while ignoring object density or overlap | Design hypothesis | Area and cardinality can diverge; [[MEC-0006-benchmark-chunking-and-bracketing]] records this adaptation risk | Comparable density/object size, or an explicit reason the chosen reference is invalid |
| Chooses a named reference but does not relate it to the unknown collection | Design hypothesis | A label can become decorative rather than a reasoning tool | Estimated reference groups and visible remainder/shortfall |
| Places reversed bounds or an implausibly narrow interval around one guess | Design hypothesis | Interval construction adds a relation beyond entering one number | Ordered bounds and a visible statement of what each bound claims |
| Makes the interval so wide that it cannot fail and treats that as optimal | Design hypothesis | Coverage and usefulness trade off | Both whether truth is captured and how much uncertainty remains, without competitive scoring |
| Treats a non-containing estimate as personal failure | Dignity risk, not a misconception | Estimation is calibration under uncertainty | Neutral discrepancy evidence and one meaningful revision path |
| Counts items one by one during the estimation phase | Design hypothesis | Exact counting would bypass `P22.03` | Bounded evidence that preserves estimation without relying on speed or sensory-memory performance |

## Productive difficulty

The pupil must decide which known collection is informative, how many such groups plausibly fit, and how much uncertainty to preserve. The challenge should come from interpreting partial structure—not from tiny targets, rapid motor input, visual clutter, or memorizing a transient scene.

## Required representations

- an original unknown collection or equivalent nonvisual evidence whose exact cardinality is author-verified;
- one or more labeled reference collections represented through the same unit and sensory channel;
- ordered lower and upper bounds visible or semantically available simultaneously;
- the original interval preserved after commitment;
- a staged reveal that reorganizes or annotates the same collection into countable groups of 10/known chunks plus a remainder;
- a comparison among original interval, revised interval, and exact total;
- all exact quantities and controls represented in inspectable DOM/CSS/state, not baked into generated imagery.

## Evidence beyond correctness

- commits before exact reveal rather than immediately counting;
- selects a relevant reference and expresses a relation such as “more than two 50s, less than three”;
- keeps bounds ordered and can explain why one is lower and one higher;
- revises the appropriate bound after seeing specific evidence;
- distinguishes “truth inside my interval” from “my interval was informative”;
- transfers the strategy when clustering, reference usefulness, or representation changes;
- optionally names whether the first interval sat too low/high without a public score.

A single interval containing the answer is not mastery evidence. Response speed is not learning evidence.

## Proposed downstream handoff to NUM-05

`NUM-02` should leave the learner with two explicit written bounds, an exact revealed total, and language for `entre`. If the sequence spine closes the route into `NUM-05`, that checkpoint can replace perceptual uncertainty with exact numbers and ask which place determines order or how to construct another number between fixed bounds. Preserve the lower → current/exact → upper arrangement while explicitly explaining that its meaning changes:

- in `NUM-02`, the interval is a claim under uncertainty;
- in `NUM-05`, the exact number is deterministically inside or outside fixed numerical bounds.

## Accessibility, dignity, privacy, and safety

### Equivalent access to the core reasoning action

The invariant is **choose and use a known-size reference to bracket an unknown cardinality before exact reveal**, not “see dots quickly.” Every selected pitch must specify an equivalent nonvisual route that preserves uncertainty and reference choice. A viable route may offer learner-controlled, region-by-region tactile or audio grouping cues for both unknown and reference collections, with the same bounded evidence and without enumerating every item or announcing the total. This is an equivalence boundary, not a selected mechanic.

If the chosen graybox cannot provide a credible equivalent route, record that limitation explicitly and do not claim accessibility readiness; do not substitute alt text that leaks the exact total.

### Additional constraints

- A brief glimpse may be pitched, but visual memory and reaction speed cannot be mandatory success conditions. Provide a learner-controlled start, no speed score, and a persistent/replayable evidence alternative.
- Do not require drag precision; every bound/reference action needs keyboard, pointer, and touch controls with 44×44 px minimum targets.
- Do not encode lower/upper, included/excluded, or revision status by color alone.
- Keep quantities readable at 200% zoom and on a 320 px viewport; avoid dense fields that become inaccessible noise.
- Announce state changes and bound values semantically; reduced motion must preserve the reveal’s mathematical meaning.
- Describe estimates as evidence to calibrate, never as intelligence, courage, or personal worth. No leaderboard, public comparison, streak pressure, or “fastest eye” framing.
- Keep prototype traces local and ephemeral. No identity, analytics, persistence, confidence profiling, or teacher-surveillance claim.

## Content boundaries for the first graybox

- **Preliminary quantity range:** approximately 30–240 objects; large enough to discourage subitising, small enough for an inspectable grouped reveal. Final values depend on pitch selection.
- **Reference candidates:** groups of 10, 50, and 100, using the same unit and controlled comparable density when spatial comparison matters.
- **Authored variation dimensions:** regular versus moderately clustered layout; one useful versus one tempting-but-poor reference; full benchmark groups plus remainder; changed representation at transfer.
- **Minimum cases:** three authored scenes with verified counts. At least one path must test a committed interval that does **not** contain the exact total, followed by dignified evidence-based revision; the script must not force that error on every pupil.
- **Ambiguity guards:** no occluded uncountable objects in the final reveal; no density mismatch presented as a valid area-to-number equivalence; no overlapping controls; no exact total accidentally exposed in accessibility labels, DOM text, or decorative copy before commitment.
- **Excluded:** quantities above 1’000; decimal/fraction estimates; arithmetic word problems; percent error; public scoring; adaptive claims; random generation before authored boundary cases are understood.

## Possible concept-native contexts

- deciding whether a finite set of storage trays or transport spaces is likely sufficient before unloading;
- choosing supplies for an expedition when exact counting is temporarily costly but later verification is possible;
- planning how many labeled group containers will be needed for a loose parts collection.

A context is valid only if the interval affects a real next action such as capacity selection. “Guess the dots” with decorative narrative is not enough.

## Explicit non-goals

- Teach exact organized counting from scratch; that is the `NUM-01` prerequisite.
- Test approximate-number-system speed, photographic memory, or reaction time.
- Reward one exact guess as better than a reasoned interval.
- Produce mechanics, scripts, or prototypes for `NUM-05`, `NUM-06`, or relocated `NUM-07` in this cycle.
- Approve the provisional “Fenêtre-éclair” beat merely because it appears in the roadmap.
- Claim pupil learning, French comprehension, accessibility, or classroom validity from owner/technical replay.

## Observation plan

### Owner graybox questions

- Is the central decision genuinely about choosing/using a reference, or can the pupil succeed by arbitrary bound adjustment?
- Does the interval express useful uncertainty rather than a disguised single answer?
- Does the reveal explain *why* the interval missed or contained the total?
- Can a meaningful mistake be revised without restarting or receiving the answer immediately?
- Does the scene preserve the lower → exact/current → upper representation needed by the proposed `NUM-05` handoff?
- If viewing is brief, does the task still test estimation when speed and memory pressure are removed?
- Does the equivalent-access route preserve the same reference-and-bracket reasoning rather than leak the answer or become a different task?

### Later pupil evidence, not established by technical testing

- Which reference pupils choose and what relation they verbalize.
- Whether they count immediately, estimate globally, chunk, or compare density.
- How they set and revise each bound after partial and grouped evidence.
- Whether they can reuse the strategy on a new collection without mandatory hints.
- Which French labels, sensory representations, or controls are misunderstood independently of the mathematics.

### Hypothesis weakened when

- pupils manipulate bounds until feedback accepts them without reasoning from a reference;
- the best strategy is one-by-one counting, sensory memory, or exploiting layout artifacts;
- the reveal supplies an answer but does not support diagnosis or revision;
- wide intervals always dominate and precision has no meaningful role;
- no equivalent access route preserves the core relationship;
- the representation cannot hand cleanly into exact comparison and interval work if `NUM-05` remains next.

## Conditions before any future restart

- Reconfirm or replace the learning objective through one precise core-learning sentence and one successful-pupil statement.
- Ground candidate mechanics in established classroom task/problem precedents before using game precedents or original synthesis.
- Explain the expected cognitive process and map each learning operation to the proposed player action and system response.
- Obtain owner approval for one or more semantic-fit rationales before creating any catalog graybox.
- Do not revive the rejected A/B/C implementations by changing their story, values, visuals, or labels.
