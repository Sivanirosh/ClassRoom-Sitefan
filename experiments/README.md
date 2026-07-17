# Exercise Lab

A standalone Svelte laboratory for researching, designing, and prototyping short interactive exercises aligned with the **Plan d’études romand (PER)** for HarmoS years **6H–8H**.

The lab is intentionally independent from the classroom application. It does not import classroom routes, styles, components, student identity, storage, or database code.

## Approved production workflow

Roadmap-based prototypes follow [`design/prototype-production-workflow.md`](design/prototype-production-workflow.md): approved roadmap slice → sequence spine → owner spine gate → precise checkpoint learning contract → owner learning-contract gate → established classroom-task and mechanics-memory research → one or more semantic-fit rationales → owner-approved candidates become distinct low-fi catalog grayboxes → owner mechanic gate scoped to catalog exercise + sequence + checkpoint → expansion → handoff review → optional polish → final validation.

Reusable game/platform research and prototype outcomes live in [`game-mechanics/`](game-mechanics/). Search that memory before gathering the same precedent evidence again.

## Start

From this directory:

```bash
./dev.sh
```

The launcher:

1. installs locked dependencies on the first run;
2. releases the selected local port if another process is listening;
3. checks every TypeScript and Svelte file;
4. starts Vite with hot reload;
5. opens the laboratory home page.

The default URL is <http://127.0.0.1:4173/>. Override the port when needed:

```bash
PORT=4300 ./dev.sh
```

## Pages

- `/` — laboratory intent and workflow
- `/catalog/` — searchable catalog of paper designs and prototypes
- `/exercise/?id=EX-0001` — complete design record
- `/runner/?id=EX-0001` — isolated prototype runner

## Information architecture

```text
experiments/
├── curriculum/                   # PER research, citations, mappings, roadmaps
├── design/                       # Approved workflow and decision records
├── game-mechanics/               # PRE/MEC/APP reusable design memory
├── templates/
│   ├── sequence/                 # Spine, learning-contract, semantic-fit, and optional script templates
│   └── exercise/                 # Stable catalog/exercise record template
├── src/
│   ├── exercises/                # Flat collection of stable exercise records
│   │   └── ex-NNNN-short-name/
│   │       ├── exercise.ts       # Typed, searchable metadata
│   │       ├── DESIGN.md         # Full design and synchronized findings
│   │       ├── Prototype.svelte  # Playable graybox, then approved expansion
│   │       └── assets/           # Late, optional files owned by this exercise
│   ├── lib/catalog/              # Discovery, schema, and validation
│   └── pages/                    # Home, catalog, detail, and runner surfaces
└── dev.sh
```

The filesystem is deliberately flat. A folder gives an exercise a stable identity; it is not the taxonomy. Retrieval is driven by typed metadata: PER objectives, HarmoS years, disciplines, concepts, status, mechanics, input methods, and tags. This lets one exercise belong to several concepts without choosing an arbitrary parent folder.

Four digits support a large catalog while preserving readable, immutable IDs. Exercise folders are sorted and filtered by the application rather than manually registered.

## Lifecycle

1. **Curriculum roadmap** — cite authoritative PER material and obtain structural owner approval for a full roadmap or explicit slice.
2. **Sequence spine and gate** — define checkpoint order, source traceability, prerequisite routes, representations, evidence handoffs, and learner-visible progression; record owner approval or return it to the roadmap.
3. **Active checkpoint learning contract** — write one core-learning sentence, one successful-pupil statement, the expected cognitive process, boundaries, evidence, risks, equivalent-access route, and downstream handoff; record owner approval.
4. **Established-task and mechanics research** — start from known classroom problem/task families, then search existing `PRE-*`, `MEC-*`, and `APP-*` records and research only gaps.
5. **Semantic-fit rationales** — present only candidates with a causal learning-operation → player-action → system-evidence mapping. There is no fixed candidate count.
6. **Catalog grayboxes** — implement every owner-approved candidate directly as its own stable three-scene, low-fi catalog exercise. Skip standalone comparison prototypes.
7. **Owner mechanic decision** — revise/reject each catalog exercise, or record a clear natural-language approval to continue in the active sequence/checkpoint/exercise scope. No fixed phrase is required.
8. **Exercise expansion** — write the full exercise progression and complete it through the flexible learning grammar.
9. **Handoff, interaction, and optional polish** — verify the sequence handoff, build one coherent surface, and add motion/art only for a named purpose.
10. **Final validation and memory write-back** — after all polish, run the technical suite, synchronize `DESIGN.md`, append an `APP-*` outcome, then promote, retain, or archive honestly.

After all checkpoint exercises in a sequence are independently approved and expanded, run the sequence integration review. Approval never propagates from one checkpoint mechanic to another.

Frontend status labels are French; source values remain stable English codes:

- `planned`
- `prototyping`
- `testing`
- `validated`
- `promoted`
- `archived`

## Create an approved catalog-graybox record

First pass the owner gates for `SEQUENCE-SPINE.md` and the checkpoint learning contract. Complete `MECHANIC-FIT.md` from the sequence template, grounding each candidate in established classroom-task evidence. After the owner approves a named candidate for catalog grayboxing, choose the next unused exercise ID and a short semantic slug:

```bash
cp -R templates/exercise src/exercises/ex-0001-short-name
```

Then:

1. update `id`, `slug`, dates, and all metadata in `exercise.ts`;
2. link `DESIGN.md` to the sequence brief, semantic-fit disposition, task sources, and mechanics-memory records;
3. preserve the expansion owner gate as pending;
4. leave the prototype file named `Prototype.example.svelte` until the approved three-scene catalog-graybox implementation begins.

The catalog discovers the record automatically. No central registry needs editing.

## Begin the prototype

Inside the exercise folder:

```bash
mv Prototype.example.svelte Prototype.svelte
```

Change the status from `planned` to `prototyping` in the same change. Implement only the approved candidate’s three-scene catalog graybox first. The runner will then become available; expand it after the owner clearly approves continuing in the active catalog exercise, sequence, and checkpoint context. Use a bounded Khazad-Doom Issue Slice to authorize implementation paths and acceptance evidence when the next phase needs a hard execution fence.

## Isolation contract

Each exercise owns its component, state, styles, and assets.

- Do not import from the classroom application.
- Do not import from another exercise.
- Do not mutate global browser state at module load time.
- Keep CSS scoped to the prototype root; avoid global `html`, `body`, and element rules.
- Do not write to classroom storage or submit activity results.
- Prefer local duplication during exploration. Extract shared code only after several validated exercises demonstrate the same need.

Prototype modules are loaded only by the runner, preventing their runtime and styles from entering the catalog surface. However, `npm run check` and `npm run build` inspect the whole source tree, so a broken prototype fails fast rather than silently rotting.

## Commands

```bash
npm run dev       # Vite only; normally use ./dev.sh instead
npm run validate  # Catalog identity, files, metadata, and lifecycle consistency
npm run check     # Complete Svelte, TypeScript, and catalog validation
npm run build     # Full fail-fast production compilation
```

Catalog records are experimental evidence, not validated classroom content. Use `npm run validate` for current structural status and each exercise’s recorded owner/pupil evidence for its actual maturity.
