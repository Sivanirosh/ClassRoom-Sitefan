# Exercise Lab smoke contract

`npm run test:smoke` launches Playwright in the installed system Google Chrome (`channel: chrome`). It starts the isolated Vite lab on a per-run `127.0.0.1` port (override with `SMOKE_PORT`); it does not import or exercise classroom code.

The harness loads the lab catalog through the same Vite discovery module used by catalog validation. A generated in-memory manifest joins each catalog prototype whose metadata includes `curriculum.years: ['6H', ...]` to its domain, cluster, lens, and `programId` in `design/6h-production-plan.json`. No 6H prototype ID is registered in the tests. `EX-0001` is the explicit legacy exception and receives only a load-and-keyboard-focus compatibility check.

A paired review can run its owned trio with exactly three distinct, discovered IDs:

```bash
SMOKE_EXERCISES=EX-0100,EX-0101,EX-0102 npm run test:smoke
```

Any other selection cardinality, duplicate, unknown ID, mixed-cluster trio, incomplete lens trio, or catalog 6H prototype missing from the production plan fails before browser scenarios run. With no filter, every discovered 6H prototype is exercised.

## Presentation-neutral data attributes

Every new 6H prototype implements this contract directly on its own visible pupil interface. The attributes are test hooks and observable state only; they do not prescribe markup, copy, layout, styling, component structure, or a shared exercise runtime.

The prototype has exactly one visible root:

```html
<main
  data-smoke-root
  data-smoke-exercise="EX-NNNN"
  data-smoke-program="per-6h-msn-shs"
  data-smoke-state="ready"
>
  ...
</main>
```

`data-smoke-state` is one of:

- `ready` — exactly one visible enabled pupil control has `data-smoke-action="start"`;
- `question` — exactly one deterministic visible enabled pupil answer has `data-smoke-answer="incorrect"`, and exactly one has `data-smoke-answer="correct"`;
- `incorrect` — a visible written feedback element has both `data-smoke-feedback="incorrect"` and `data-smoke-feedback-detail`, and exactly one visible enabled control has `data-smoke-action="retry"`;
- `correct` — a visible written feedback element has both `data-smoke-feedback="correct"` and `data-smoke-feedback-detail`, and exactly one visible enabled control has `data-smoke-action="continue"`;
- `complete` — exactly one visible written completion element has `data-smoke-completion`.

Only elements active in the current state carry state-specific smoke attributes. Contract elements must not be duplicated elsewhere in hidden markup. Answer attributes belong to the real pupil controls that submit the deterministic response; smoke-only bypass buttons are not allowed.

The incorrect and correct feedback text must each contain specific written detail (at least 20 non-whitespace characters) and must differ. Icons and color may reinforce a result, but the state attribute and visible feedback wording must make error and success distinguishable without color.

The complete transition is:

```text
ready → question → incorrect → question → correct → (question | complete)
          answer       retry       answer       continue
```

The harness repeats that sequence until `complete`, with a 50-question safety limit.

## What each scenario enforces

The desktop scenario uses only Tab plus Enter for actions and Space for answers. It never clicks, so hidden, disabled, duplicated, unfocusable, or keyboard-inoperable contract controls fail. Desktop runs with reduced-motion emulation.

A new browser context drives the same complete path with touch enabled and a viewport exactly 320px wide. It taps controls, rejects horizontal document overflow at every state, scrolls each required control or state into view, and then requires its rendered box to fit inside the viewport.

Before navigation, every context installs guards that remain active for the whole path. Only same-origin document, script, stylesheet, image, font, and media loads are declared; fetch/XHR/event-stream/beacon requests, auxiliary pages or frames, workers, and all WebSockets fail. The smoke server builds and previews the lab without HMR, so it needs no WebSocket exception. The scenario also fails on uncaught page errors, console errors, any localStorage or sessionStorage mutation, IndexedDB opens/deletes or databases, cookie writes or cookies, and service-worker registration or workers. Undeclared or external traffic is blocked rather than sent.
