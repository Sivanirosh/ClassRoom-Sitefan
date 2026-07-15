# Exercise Lab mechanic-neutral smoke contract

`npm run test:smoke` launches Playwright in the installed system Google Chrome (`channel: chrome`). It starts the isolated Vite lab on a per-run `127.0.0.1` port (override with `SMOKE_PORT`) and does not import or exercise classroom code.

This is a **final technical-readiness** harness, not an early mechanic-approval gate and not evidence of pupil learning. Under [`../../design/prototype-production-workflow.md`](../../design/prototype-production-workflow.md), run the complete browser/responsive/accessibility suite only after all selected interaction, motion, and asset polish.

## Why the protocol is mechanic-neutral

The former harness forced every prototype through `start → answer → incorrect → retry → correct`. That encoded the rejected answer-card pattern into infrastructure.

The current protocol observes the mechanic's real controls:

```text
ready → active manipulation/construction/programming
      → recoverable error information (at least once per full path)
      → success → next active scene or complete
```

A prototype supplies deterministic smoke plans through DOM attributes. The harness can therefore traverse direct exchanges, command programs, ordered construction, or future mechanics without pretending that every action is an answer submission.

## Root contract

Exactly one visible root is present:

```html
<main
  data-smoke-root
  data-smoke-exercise="EX-NNNN"
  data-smoke-program="program-id"
  data-smoke-state="ready"
>
  ...
</main>
```

`data-smoke-state` is one of:

- `ready` — exactly one visible enabled `data-smoke-action="start"` control;
- `active` — real pupil controls carry stable `data-smoke-control` tokens and the root exposes a deterministic success plan;
- `success` — one detailed `data-smoke-feedback="success"` element and one `data-smoke-action="continue"` control;
- `complete` — one written `data-smoke-completion` element.

Legacy `data-smoke-answer`, retry, `incorrect`, and `correct` hooks are rejected.

## Active plans

During `active`, the root carries:

```html
<main
  data-smoke-state="active"
  data-smoke-success-plan="group-units,group-tens"
  data-smoke-error-plan="open-empty-container"
  data-smoke-recovery-plan="undo"
>
```

- `data-smoke-success-plan` is required and contains comma-separated control tokens in execution order.
- `data-smoke-error-plan` is optional per scene, but the complete prototype path must expose at least one.
- `data-smoke-recovery-plan` is optional when the error probe mutates state; it runs before the success plan.
- Repeated tokens are allowed, such as three identical deliveries.

Each token resolves to exactly one visible enabled real control at the moment it is used:

```html
<button data-smoke-control="group-units">Assembler</button>
```

Plans are deterministic test metadata, not alternate behavior. Smoke-only bypass controls are forbidden. Clicking a plan token must exercise the same event handler and state transition available to a pupil.

No error feedback may be present before the harness runs the probe. A recoverable probe keeps the prototype in `active` and creates one visible element with both:

```html
<p data-smoke-feedback="error" data-smoke-feedback-detail>
  Written, state-specific recovery information…
</p>
```

Error and success feedback must each contain at least 20 non-whitespace characters, contain words, and differ.

## What each browser path enforces

### Reduced-motion keyboard path

- uses Tab plus Enter only;
- proves every planned control is reachable, visible, unique, and enabled;
- completes every authored scene;
- executes at least one meaningful recoverable-error path;
- runs with reduced-motion emulation.

### 320 px touch path

- uses a new touch-enabled context exactly 320 CSS px wide;
- taps the same real plan controls;
- rejects horizontal document overflow after every action/state;
- scrolls each required control/feedback into view and requires its rendered box to fit the viewport.

### Isolation guards

For the whole path, the harness rejects:

- uncaught page errors and console errors;
- undeclared/external traffic, fetch/XHR/beacons, WebSockets, workers, frames, or auxiliary pages;
- local/session storage mutation, IndexedDB, cookies, and service workers.

Only declared same-origin documents, scripts, styles, images, fonts, and media may load.

## Selection

The catalog determines smoke targets; exercise IDs are not registered in the spec.

A filtered run uses discovered IDs:

```bash
SMOKE_EXERCISES=EX-0002,EX-0003 npm run test:smoke
```

Any non-empty set of distinct discovered prototypes may be selected. Discovery uses catalog metadata rather than a retired production-plan allocation: each non-legacy prototype needs a `program-*` or `pilot-*` tag, a `sequence-*` tag, and a discipline. A `lens-*` tag is optional.

## Required companion evidence

Automated smoke does not replace targeted manual review of:

- focus order and visible focus;
- labels, semantics, and announcements;
- touch-target sizing;
- non-color meaning;
- reduced-motion comprehension;
- French copy and exact mathematical state;
- assistive-technology behavior where relevant.

Record final commands, failures, fixes, and residual pupil-testing questions in the exercise `DESIGN.md` and linked `APP-*` record.
