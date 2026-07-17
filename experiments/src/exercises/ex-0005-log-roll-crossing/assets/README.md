# EX-0005 asset boundary

No raster asset is currently required by the prototype. The implemented visual study uses authored CSS and semantic SVG so the mathematical path remains exact, responsive, and inspectable.

## Approved visual direction

Reference supplied by the owner on 2026-07-17:

`/tmp/herdr-clipboard-images-1000/client-2-clipboard-1784327218595458004-0.png`

The reference is ephemeral and is **not** copied into the repository. It authorizes general qualities only: stylized painterly 2D adventure scenery, coral terraces, pale waterfalls and mist, lush teal foliage, atmospheric blue depth, warm accents, and foreground framing. It does not authorize copying text, logo, landmarks, characters, or composition.

## Optional future generated assets

| Asset | Role | Safe crop | Forbidden content |
|---|---|---|---|
| `terrace-atmosphere.webp` | Non-countable background atmosphere behind horizontal scenes | 16:10 master; center 70% quiet | Text, numbers, flags, paths, logs, repeated objects, marks, endpoints |
| `mist-ramp-atmosphere.webp` | Background atmosphere behind diagonal scenes | 16:10 master; center diagonal corridor quiet | Ramps, arrows, route choices, stepping stones, subdivisions |
| `canopy-frame.webp` | Edge-only foliage framing | Must tolerate 16:10 and 18:11 crops; transparent center | Central landmarks or anything that can obscure the path |

Generated decoration must remain replaceable without changing `content.ts`, `RollStage.svelte`, controls, copy, or outcome logic.

## Required provenance for any committed generation

Record beside each generated file:

- model and generation date;
- exact prompt;
- reference-image provenance;
- dimensions and crop variants;
- manual edits and export settings;
- review outcome at desktop and 320 px;
- confirmation that the image encodes no quantity, answer, path geometry, or state.

Do not integrate a generated asset until it passes the mathematical-state and crop checks in [`../DESIGN.md`](../DESIGN.md).
