# 003 — Add tactile delivery-button feedback

- **Status**: DONE
- **Commit**: c7a775b
- **Severity**: LOW
- **Category**: Physicality and feedback
- **Estimated scope**: 1 file, about 12 CSS lines

## Problem

The exchange recipe buttons have a pressed state, but delivery controls only lift on hover. On touch and pointer press, the delivery action lacks immediate tactile confirmation.

Current code at `experiments/src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte:586`:

```css
.delivery-strip button {
  ...
  box-shadow: 0 4px 0 #9b8c73;
  cursor: pointer;
}
.delivery-strip button:hover {
  border-color: var(--teal);
  transform: translateY(-2px);
}
```

The hover transform is also ungated, allowing sticky hover behavior on touch browsers.

## Target

Reuse the ease-out token from plan 001 and apply the exact press budget from `AUDIT.md`:

```css
.delivery-strip button {
  transition: transform 120ms var(--ease-out),
              box-shadow 120ms var(--ease-out),
              border-color 120ms var(--ease-out);
}

.delivery-strip button:active {
  transform: translateY(3px) scale(.99);
  box-shadow: 0 1px 0 #9b8c73;
}

@media (hover: hover) and (pointer: fine) {
  .delivery-strip button:hover {
    border-color: var(--teal);
    transform: translateY(-2px);
  }
}
```

In reduced motion, preserve color feedback and remove displacement:

```css
@media (prefers-reduced-motion: reduce) {
  .delivery-strip button:active {
    transform: none;
    border-color: var(--teal);
  }
}
```

## Repo conventions to follow

- Plan 001 owns `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` in `.prototype-root`.
- The adjacent `.exchange-tools button:active` uses the same physical raised-button metaphor.
- Keep transitions scoped to named properties; never use `transition: all`.

## Steps

1. Apply plan 001 first.
2. Edit only the delivery-button CSS in `experiments/src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte`.
3. Add the three-property 120ms transition.
4. Add the `:active` pressed state.
5. Move the current hover transform into a fine-pointer hover media query.
6. Add the reduced-motion active override after the universal reduced-motion rule.

## Boundaries

- Do NOT alter delivery markup, arithmetic, labels, button dimensions, or colors beyond the specified active border.
- Do NOT add animation to Undo, reset, or narrative controls.
- Do NOT touch EX-0003 or add dependencies.
- If `--ease-out` is absent, STOP and report that plan 001 has not been applied.

## Verification

- **Mechanical**: run `npm --prefix experiments run check`; expect zero errors.
- **Feel check**: in the delivery scene, press and hold each delivery button. It must depress immediately by 3px and recover without a lag after release.
- Test with mouse and touch emulation; touch must not retain the hover lift after release.
- At 10% playback, confirm shadow depth decreases while the button moves down rather than appearing to float.
- Emulate reduced motion and confirm the border changes without positional movement.
- **Done when**: delivery buttons have coherent press feedback matching exchange recipe buttons on mouse, keyboard activation and touch.
