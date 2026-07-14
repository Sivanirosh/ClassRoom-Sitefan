# Exercise Lab

A standalone Svelte laboratory for researching, designing, and prototyping short interactive exercises aligned with the **Plan d’études romand (PER)** for HarmoS years **6H–8H**.

The lab is intentionally independent from the classroom application. It does not import classroom routes, styles, components, student identity, storage, or database code.

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
├── curriculum/                   # PER research, citations, and mappings
├── templates/exercise/           # Copy to begin a paper design
├── src/
│   ├── exercises/                # Flat collection of stable exercise records
│   │   └── ex-NNNN-short-name/
│   │       ├── exercise.ts       # Typed, searchable metadata
│   │       ├── DESIGN.md         # Full paper design and decisions
│   │       ├── Prototype.svelte  # Optional; added after paper design
│   │       └── assets/           # Files owned by this exercise
│   ├── lib/catalog/              # Discovery, schema, and validation
│   └── pages/                    # Home, catalog, detail, and runner surfaces
└── dev.sh
```

The filesystem is deliberately flat. A folder gives an exercise a stable identity; it is not the taxonomy. Retrieval is driven by typed metadata: PER objectives, HarmoS years, disciplines, concepts, status, mechanics, input methods, and tags. This lets one exercise belong to several concepts without choosing an arbitrary parent folder.

Four digits support a large catalog while preserving readable, immutable IDs. Exercise folders are sorted and filtered by the application rather than manually registered.

## Lifecycle

1. **Curriculum research** — cite authoritative PER material under `curriculum/`.
2. **Paper design** — copy the template and complete `exercise.ts` plus `DESIGN.md`.
3. **Prototype** — rename `Prototype.example.svelte` to `Prototype.svelte`, implement one bounded learning loop, and change the status to `prototyping`.
4. **Testing** — document observations and update the status.
5. **Promotion or archive** — extract validated work into the classroom application, or preserve the decision history.

Frontend status labels are French; source values remain stable English codes:

- `planned`
- `prototyping`
- `testing`
- `validated`
- `promoted`
- `archived`

## Create a paper design

Choose the next unused ID and a short semantic slug:

```bash
cp -R templates/exercise src/exercises/ex-0001-short-name
```

Then:

1. update `id`, `slug`, dates, and all metadata in `exercise.ts`;
2. complete `DESIGN.md` using cited curriculum research;
3. leave the prototype file named `Prototype.example.svelte` while the exercise is only on paper.

The catalog discovers the record automatically. No central registry needs editing.

## Begin the prototype

Inside the exercise folder:

```bash
mv Prototype.example.svelte Prototype.svelte
```

Change the status from `planned` to `prototyping` in the same change. The runner will then become available.

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
