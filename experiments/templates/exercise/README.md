# Exercise template

Use this template only after all of the following are recorded for one checkpoint:

1. its sequence spine is owner-approved;
2. its precise learning contract is owner-approved;
3. an established-task-grounded semantic-fit rationale is owner-approved for catalog grayboxing.

Then:

1. Follow [`../../design/prototype-production-workflow.md`](../../design/prototype-production-workflow.md).
2. Use the learning-contract and `MECHANIC-FIT` templates from [`../sequence/`](../sequence/).
3. Search and cite relevant [`../../game-mechanics/`](../../game-mechanics/) records and primary task sources.
4. Choose the next unused stable exercise ID. Every approved candidate receives a distinct catalog identity.
5. Copy this directory to `src/exercises/ex-NNNN-short-name/`.
6. Update `exercise.ts` and the graybox-relevant portions of `DESIGN.md`; `DESIGN.md` is the required three-scene source of truth.
7. Keep `status: 'planned'` and `Prototype.example.svelte` until implementation of the approved candidate begins.
8. Rename the component to `Prototype.svelte` and set `status: 'prototyping'` when implementation begins.
9. Build only the approved three-scene low-fi mechanic test first. Do not create a separate throwaway comparison page.
10. Do not expand until the owner clearly approves continuing in the active exercise, sequence, and checkpoint context. No prescribed phrase is required; use a validated Khazad-Doom Issue Slice when a hard implementation fence is needed.

Do not import classroom application code into the experiment.
