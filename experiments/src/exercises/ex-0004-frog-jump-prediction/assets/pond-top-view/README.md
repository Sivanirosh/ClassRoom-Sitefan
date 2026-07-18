# EX-0004 true-overhead pond assets

This directory contains the static ImageGen asset family used by `PondBoard.svelte`.

## Art direction

The previous checker-sheet sprites were discarded. This replacement family comes from one coherent pond scene generated against the owner-supplied reference and reviewed for a genuine 90° overhead read.

- No horizon, isometric camera, side profile, upright plant, or perspective prop is integrated.
- The source scene is not rendered on the board; only transparent object crops are used.
- No production sprite contains baked water, grid geometry, text, UI, or branding.
- All sprites remain static. Existing caustic drift and the short landing response are the only motion.
- Decorative rocks, flowers, and repeated nénuphars sit below the exact grid. Semantic frogs and endpoint nénuphars sit above route evidence.

Removing this directory must not change the authored `120 × 100` view box, `10 × 10` lattice, route vectors, quantities, traces, hit targets, or outcomes.

## Files

- `source-sheet.png`: preserved 1024 × 1536 ImageGen pond scene used only as an extraction source.
- `frog-green.png`: directly overhead frog used as the pupil-controlled subject.
- `frog-orange.png`: local hue-derived obstacle variant preserving the same overhead silhouette.
- `lily-pad.png`: directly overhead start nénuphar.
- `lily-pad-flowering.png`: directly overhead flowering finish nénuphar.
- `lotus-coral.png`, `lotus-red.png`: directly overhead decorative flowers.
- `rock-round.png`, `rock-light.png`, `rock-cluster.png`: directly overhead, partially submerged stones.
- `extract-assets.py`: deterministic local crop, masking, alpha-cleanup, and palette-derivation script.
- `provenance.json`: source prompt, crop boxes, derivations, checksums, and responsibility boundary.

The extraction script removes the generated turquoise water locally, retains the intended central silhouettes, reconstructs antialiased edge color from interior object pixels, and adds no new generative content.
