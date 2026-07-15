# Animation implementation plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](001-validation-state-entrance.md) | Bridge the validation state change | MEDIUM | DONE |
| [002](002-scene-transition.md) | Bridge workshop scene changes | MEDIUM | DONE |
| [003](003-delivery-press-feedback.md) | Add tactile delivery-button feedback | LOW | DONE |

## Recommended execution order

1. **001** introduces the shared `--ease-out` and `--duration-state` tokens and fixes the highest-leverage teleporting state.
2. **002** depends on those tokens and adds the scene-level entrance.
3. **003** depends on `--ease-out` and aligns delivery controls with the existing exchange-button physicality.

All three plans are intentionally scoped to `experiments/src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte`. They must not change game logic, copy, layout, or EX-0003.
