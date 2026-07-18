# EX-0007 generated art manifest

Production art for **La Course du Sentier**. The supplied reference informed only broad traits—clean hand-drawn contours, flat pastel colour, and whimsical energy. All couriers, scenery, terrain, and compositions are original.

## Runtime assets

| Asset | Dimensions | Format | Runtime role | Crop / safe-area contract |
| --- | ---: | --- | --- | --- |
| `backgrounds/departure.webp` | 1915×821 | WebP | Round 1 departure meadow | Cover-cropped behind the fixed course; the horizontal middle remains low-detail. |
| `backgrounds/mountain-pass.webp` | 1672×941 | WebP | Round 2 mountain pass | Cover-cropped from the centre; cliffs frame rather than encode the course. |
| `backgrounds/refuge.webp` | 1915×821 | WebP | Round 3 refuge descent | Cover-cropped around the centre; the refuge remains distant scenery. |
| `screens/intro.webp` | 1672×941 | WebP | Intro hero | Characters occupy the right side; live title and controls remain separate HTML. |
| `screens/round-success.webp` | 1672×941 | WebP | Per-round success | Calm centre supports the live completed sequence and signed-step evidence. |
| `screens/final-victory.webp` | 1774×887 | WebP | Final completion | Refuge and couriers remain on the right; summary remains live HTML. |
| `screens/timeout-retry.webp` | 1672×941 | WebP | Timeout / retry | Calm, non-punitive interruption; retry copy and control remain live HTML. |
| `sprites/runner-{1..3}.png` | 512×460 | RGBA PNG | Three-frame courier run cycle | Stable 452px source baseline; wrapper feet remain owned by `--surface-y`. |
| `sprites/flyer-{1..3}.png` | 520×380 | RGBA PNG | Three-frame rival flight cycle | Stable centred flight canvas; model progress still owns horizontal position. |
| `terrain/ground-*.png` | 469–477×253–260 | RGBA PNG | Repeating intact/fallen numbered earth | Stretched inside existing `.term` geometry; artwork never owns hit targets. |
| `terrain/start-cap.png` / `finish-cap.png` | 476–478×259–262 | RGBA PNG | Decorative course ends | Rendered behind the sequence; start/finish labels remain HTML. |
| `terrain/gap-accent.png` | 243×145 | RGBA PNG | Stones and grass below a breach | Decorative only; the real 20px drop halo remains the `.slot`. |

All production WebP illustrations are re-encoded at quality 88 with Pillow (`method=6`). Full generation prompts and model metadata live in `sources/*.generation.json`.

## Source and extraction

- `sources/character-sheet.png`: 3×2 chroma-key source for runner and flyer frames.
- `sources/terrain-sheet.png`: 3×2 chroma-key source for modular terrain, caps, and the gap accent.
- `extract-assets.py`: deterministic chroma removal, edge decontamination, crop, and frame normalization.
- Re-run from this directory with `python extract-assets.py` (requires Pillow, NumPy, and SciPy).

## Integration boundary

Raster art contains no values, rules, score, timing, target order, drag target, focus state, smoke hook, or outcome authority. `race-model.ts` remains authoritative for deadlines, repair order, runner stops, travel duration, and progression. `Prototype.svelte` and `prototype.css` own asset selection, crop, sprite frames, and reduced-motion presentation.
