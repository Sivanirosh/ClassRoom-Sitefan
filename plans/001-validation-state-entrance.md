# 001 — Bridge the validation state change

- **Status**: DONE
- **Commit**: c7a775b
- **Severity**: MEDIUM
- **Category**: Missed opportunities / easing and duration
- **Estimated scope**: 1 file, about 20 CSS lines

## Problem

When an exchange reaches the goal, the interactive workshop controls disappear and the validation content is inserted immediately. The state is correct but visually teleports.

`experiments/src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte:445` currently renders the new state without an entrance bridge:

```svelte
<div class="feedback correct" role="status" tabindex="-1" data-smoke-feedback="correct" data-smoke-feedback-detail>
...
<div class="transformation" aria-label={`Après l’échange : ${scene.afterNumber}`}>
```

The file has no shared motion tokens; existing rules use hand-authored durations and generic easing.

## Target

Add these tokens to `.prototype-root`:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--duration-state: 220ms;
```

Animate the three inserted validation blocks with transform and opacity only:

```css
.feedback.correct,
.transformation,
.feedback-actions {
  animation: validationEnter var(--duration-state) var(--ease-out) both;
}

@keyframes validationEnter {
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
```

Reduced motion must keep a short opacity bridge while dropping movement:

```css
@keyframes validationFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .feedback.correct,
  .transformation,
  .feedback-actions {
    animation: validationFade 120ms var(--ease-out) both !important;
  }
}
```

## Repo conventions to follow

- Motion is plain component-scoped CSS in the same Svelte file.
- Existing reduced-motion handling lives at the end of `Prototype.svelte`.
- Existing animation properties are limited to transform and opacity for entrances.

## Steps

1. Edit `experiments/src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte` only.
2. Add `--ease-out` and `--duration-state` inside `.prototype-root` beside the existing color variables.
3. Add the validation entrance selectors and `validationEnter` keyframes beside the existing workshop keyframes.
4. Add `validationFade` and override these three selectors inside the existing reduced-motion media query after its universal rule.
5. Do not alter the exchange overlay or material-token animations.

## Boundaries

- Do NOT change markup, game state, copy, dimensions, colors, or interaction behavior.
- Do NOT touch EX-0003.
- Do NOT add dependencies.
- If cited selectors no longer exist, STOP and report drift.

## Verification

- **Mechanical**: run `npm --prefix experiments run check`; expect zero errors.
- **Feel check**: complete scene 1 and confirm the green feedback, decomposition, and continue control enter as one fast coherent response without delaying interaction.
- In DevTools Animations, play at 10% and confirm the content starts at `scale(.98)`, never `scale(0)`.
- Emulate `prefers-reduced-motion: reduce` and confirm only opacity changes for 120ms.
- **Done when**: the validation state no longer appears instantaneously and no movement remains in reduced-motion mode.
