# Exercise records

This directory is the flat source collection discovered by the catalog.

Every exercise folder must be named:

```text
ex-NNNN-short-name/
```

Required files:

- `exercise.ts` — typed metadata and stable identity
- `DESIGN.md` — curriculum evidence, learning design, interaction hypothesis, and decisions

Optional implementation:

- `Prototype.svelte` — one self-contained prototype
- `assets/` — assets owned by this exercise

The `id` and `slug` in metadata must exactly match the folder name. Duplicate IDs, orphan documents, missing design files, invalid metadata, and lifecycle/prototype mismatches stop the catalog.

Start from `../../templates/exercise/`; do not add records directly from memory. A new low-fi catalog graybox requires a recorded owner-approved sequence spine, checkpoint learning contract, and semantic-fit candidate. Each approved candidate receives its own stable exercise folder; full expansion requires a clear owner go-ahead in the active scope, not prescribed wording. When implementation needs a hard boundary, encode it as a validated Khazad-Doom Issue Slice rather than making the owner recite an approval formula.
