# Exercise template

Use this template only after a sequence learning brief and three mechanically distinct pitches are complete and the owner has selected one direction for grayboxing.

1. Follow [`../../design/prototype-production-workflow.md`](../../design/prototype-production-workflow.md).
2. Create the brief, pitch comparison, and graybox script from [`../sequence/`](../sequence/).
3. Search and cite relevant [`../../game-mechanics/`](../../game-mechanics/) records.
4. Choose the next unused stable exercise ID.
5. Copy this directory to `src/exercises/ex-NNNN-short-name/`.
6. Update `exercise.ts` and the graybox-relevant portions of `DESIGN.md`.
7. Keep `status: 'planned'` and `Prototype.example.svelte` until graybox implementation begins.
8. Rename the component to `Prototype.svelte` and set `status: 'prototyping'` when implementation begins.
9. Build only the selected three-scene mechanic test first.
10. Do not expand until the owner records `mechanic approved for expansion`.

Do not import classroom application code into the experiment.
