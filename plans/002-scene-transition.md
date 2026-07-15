# 002 — Bridge workshop scene changes

- **Status**: DONE
- **Commit**: c7a775b
- **Severity**: MEDIUM
- **Category**: Spatial consistency / missed opportunities
- **Estimated scope**: 1 file, one keyed wrapper and about 16 CSS lines

## Problem

`continueStory()` increments `sceneIndex`, replacing the title, reserve and actions in place. Because the existing `<article class="scene-card">` is not keyed, the next scene appears with no visual bridge.

Current code at `experiments/src/exercises/ex-0002-bip-exchange-workshop/Prototype.svelte:381`:

```svelte
<article class="scene-card">
  <div class="scene-heading">
```

Current update at lines 301–303:

```ts
sceneIndex += 1;
loadScene();
announcement = `Nouveau problème : ${scenes[sceneIndex].title}.`;
```

## Target

Use a Svelte key block so each new scene card gets a single entrance:

```svelte
{#key sceneIndex}
  <article class="scene-card scene-enter">
    ...existing article content unchanged...
  </article>
{/key}
```

Reuse the tokens introduced by plan 001:

```css
.scene-enter {
  animation: sceneEnter var(--duration-state) var(--ease-out) both;
}

@keyframes sceneEnter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Reduced motion must retain only a 120ms fade:

```css
@keyframes sceneFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .scene-enter {
    animation: sceneFade 120ms var(--ease-out) both !important;
  }
}
```

## Repo conventions to follow

- Plain scoped CSS and Svelte conditional/key blocks are used in the prototype.
- Use `--duration-state: 220ms` and `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` from plan 001; do not create another curve or duration.
- Focus is already moved to `#scene-title` after `tick()`; preserve that behavior.

## Steps

1. Apply plan 001 first.
2. Wrap only the `.scene-card` article in `{#key sceneIndex}` and add class `scene-enter`.
3. Keep the story rail outside the keyed block so Bip and the chapter list do not flash.
4. Add `sceneEnter` beside the other workshop keyframes.
5. Add `sceneFade` and its selector override inside the existing reduced-motion query after the universal rule.

## Boundaries

- Do NOT animate the sticky story rail, page scroll position, or focus jump.
- Do NOT add an exit animation; the next scene must remain immediately interactive.
- Do NOT change game logic, copy, layout, or completion behavior.
- Do NOT touch EX-0003 or add dependencies.
- If plan 001 tokens are absent, STOP rather than duplicating values elsewhere.

## Verification

- **Mechanical**: run `npm --prefix experiments run check`; expect zero errors.
- **Feel check**: complete scene 1, select “Voir la suite,” and confirm only the main scene card enters from 8px below over 220ms; the story rail remains stable.
- Trigger several scene changes at normal speed and confirm interaction never waits for animation.
- At 10% DevTools playback, confirm there is no overlapping old/new scene.
- Emulate reduced motion and confirm a 120ms opacity-only entrance.
- **Done when**: scene content no longer teleports and the stable surrounding shell does not animate.
