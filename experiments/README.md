# Exercise Lab

A standalone Svelte laboratory for researching, designing, and prototyping short interactive exercises aligned with the **Plan d’études romand (PER)** for HarmoS years **6H–8H**.

The lab is intentionally independent from the classroom application. It does not import classroom routes, styles, components, student identity, storage, or database code.

## Approved production workflow

Roadmap-based prototypes follow [`design/prototype-production-workflow.md`](design/prototype-production-workflow.md): learning brief → mechanics-memory search → three precedent-grounded pitches → one selected three-scene graybox → explicit owner mechanic gate → full expansion → optional polish → final validation.

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
│   ├── sequence/                 # Brief, pitch, and graybox-script templates
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

1. **Curriculum roadmap** — cite authoritative PER material and obtain structural owner approval.
2. **Learning brief** — define checkpoints, evidence, prerequisites, representations, risks, and non-goals.
3. **Mechanics memory** — search existing `PRE-*`, `MEC-*`, and `APP-*` records; research only gaps.
4. **Paper pitches** — compare three mechanically distinct, precedent-cited directions.
5. **Selected graybox** — script and implement one three-scene mechanic test with minimal styling.
6. **Owner mechanic gate** — revise/reject, or record the exact phrase `mechanic approved for expansion`.
7. **Expansion** — write the full storyboard and complete the learning sequence through the flexible progression grammar.
8. **Interaction and optional polish** — build one coherent surface; add motion/art only for a named purpose.
9. **Final validation** — after all polish, run catalog, type/build, browser, responsive, reduced-motion, and accessibility evidence.
10. **Memory write-back** — synchronize `DESIGN.md`, append an `APP-*` outcome, then promote, retain, or archive honestly.

Frontend status labels are French; source values remain stable English codes:

- `planned`
- `prototyping`
- `testing`
- `validated`
- `promoted`
- `archived`

## Create a selected exercise record

First complete the sequence brief and three-pitch comparison from `templates/sequence/`. After the owner selects one direction for grayboxing, choose the next unused exercise ID and a short semantic slug:

```bash
cp -R templates/exercise src/exercises/ex-0001-short-name
```

Then:

1. update `id`, `slug`, dates, and all metadata in `exercise.ts`;
2. link `DESIGN.md` to the sequence brief, pitch decision, graybox script, and mechanics-memory records;
3. preserve the owner gate as pending;
4. leave the prototype file named `Prototype.example.svelte` until the three-scene graybox implementation begins.

The catalog discovers the record automatically. No central registry needs editing.

## Begin the prototype

Inside the exercise folder:

```bash
mv Prototype.example.svelte Prototype.svelte
```

Change the status from `planned` to `prototyping` in the same change. Implement only the selected three-scene graybox first. The runner will then become available; full expansion remains blocked until the owner records `mechanic approved for expansion`.

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

There are intentionally no exercise records or curriculum findings in the initial scaffold.
