import { expect, type Locator, type Page } from '@playwright/test';
import type { SmokeTarget } from './catalog';

const STATES = ['ready', 'active', 'success', 'complete'] as const;
type SmokeState = (typeof STATES)[number];
type AssertClean = () => Promise<void>;
type Activate = (control: Locator, label: string) => Promise<void>;
type PrepareFeedback = (feedback: Locator, label: string) => Promise<void>;

const stateHooks: Record<SmokeState, string[]> = {
  ready: ['[data-smoke-action="start"]'],
  active: ['[data-smoke-control]', '[data-smoke-feedback="error"][data-smoke-feedback-detail]'],
  success: [
    '[data-smoke-feedback="success"][data-smoke-feedback-detail]',
    '[data-smoke-action="continue"]'
  ],
  complete: ['[data-smoke-completion]']
};
const allStateHooks = Object.values(stateHooks).flat();
const legacyHooks =
  '[data-smoke-answer], [data-smoke-action="retry"], [data-smoke-feedback="incorrect"], [data-smoke-feedback="correct"]';

function rootFor(page: Page, target: SmokeTarget): Locator {
  return page.locator(
    `[data-smoke-root][data-smoke-exercise="${target.id}"][data-smoke-program="${target.programId}"]`
  );
}

function escapeAttributeValue(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}

async function exactVisible(root: Locator, selector: string, label: string): Promise<Locator> {
  const locator = root.locator(selector);
  await expect(locator, `${label} must be unique`).toHaveCount(1);
  await expect(locator, `${label} must be visible`).toBeVisible();
  return locator;
}

async function exactControl(root: Locator, selector: string, label: string): Promise<Locator> {
  const locator = await exactVisible(root, selector, label);
  await expect(locator, `${label} must be enabled`).toBeEnabled();
  return locator;
}

async function expectStateShape(root: Locator, state: SmokeState): Promise<void> {
  const allowed = new Set(stateHooks[state]);
  for (const selector of allStateHooks) {
    if (!allowed.has(selector)) {
      await expect(
        root.locator(selector),
        `${selector} must not remain in the DOM during smoke state "${state}"`
      ).toHaveCount(0);
    }
  }

  await expect(root.locator(legacyHooks), 'legacy answer-card smoke hooks are not allowed').toHaveCount(0);

  if (state === 'ready') {
    await exactControl(root, '[data-smoke-action="start"]', 'start control');
    await expect(root, 'ready state must not expose a success plan').not.toHaveAttribute(
      'data-smoke-success-plan'
    );
  } else if (state === 'active') {
    await expect(root, 'active state must expose a non-empty success plan').toHaveAttribute(
      'data-smoke-success-plan',
      /\S/
    );
    expect(
      await root.locator('[data-smoke-control]').count(),
      'active state must expose at least one real pupil control'
    ).toBeGreaterThan(0);
  } else if (state === 'success') {
    await exactVisible(
      root,
      '[data-smoke-feedback="success"][data-smoke-feedback-detail]',
      'success feedback'
    );
    await exactControl(root, '[data-smoke-action="continue"]', 'continue control');
    await expect(root, 'success state must not retain an active plan').not.toHaveAttribute(
      'data-smoke-success-plan'
    );
  } else {
    await exactVisible(root, '[data-smoke-completion]', 'completion state');
    await expect(root, 'complete state must not retain an active plan').not.toHaveAttribute(
      'data-smoke-success-plan'
    );
  }
}

async function expectState(root: Locator, state: SmokeState): Promise<void> {
  await expect(root, `smoke state must become "${state}"`).toHaveAttribute('data-smoke-state', state);
  await expectStateShape(root, state);
}

async function currentState(root: Locator): Promise<SmokeState> {
  const state = await root.getAttribute('data-smoke-state');
  if (!STATES.includes(state as SmokeState)) {
    throw new Error(`Unknown or missing data-smoke-state: ${String(state)}`);
  }
  return state as SmokeState;
}

async function feedbackText(
  root: Locator,
  kind: 'error' | 'success',
  prepare?: PrepareFeedback
): Promise<string> {
  const label = `${kind} feedback`;
  const feedback = await exactVisible(
    root,
    `[data-smoke-feedback="${kind}"][data-smoke-feedback-detail]`,
    label
  );
  if (prepare) await prepare(feedback, label);
  const text = (await feedback.innerText()).replace(/\s+/g, ' ').trim();
  expect(text.length, `${kind} feedback must contain specific written detail`).toBeGreaterThanOrEqual(
    20
  );
  expect(text, `${kind} feedback must contain words, not only a color or icon`).toMatch(/\p{L}/u);
  return text;
}

function parsePlan(raw: string | null, label: string, required: boolean): string[] {
  if (raw === null || raw.trim() === '') {
    if (required) throw new Error(`${label} is missing or empty.`);
    return [];
  }

  const tokens = raw.split(',').map((token) => token.trim());
  if (tokens.some((token) => token.length === 0)) {
    throw new Error(`${label} contains an empty control token.`);
  }
  return tokens;
}

async function planFor(
  root: Locator,
  attribute: 'data-smoke-success-plan' | 'data-smoke-error-plan' | 'data-smoke-recovery-plan',
  required = false
): Promise<string[]> {
  return parsePlan(await root.getAttribute(attribute), attribute, required);
}

async function focusByTab(page: Page, control: Locator, label: string): Promise<void> {
  for (let press = 0; press < 100; press += 1) {
    await page.keyboard.press('Tab');
    if (await control.evaluate((element) => element === document.activeElement)) return;
  }

  throw new Error(`${label} could not be reached with Tab.`);
}

async function keyboardActivate(page: Page, control: Locator, label: string): Promise<void> {
  await focusByTab(page, control, label);
  const inputValue = await control.getAttribute('data-smoke-input-value');
  if (inputValue !== null) {
    await control.fill(inputValue);
    return;
  }
  await page.keyboard.press('Enter');
}

async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    bodyWidth: document.body?.scrollWidth ?? 0
  }));
  expect(
    Math.max(dimensions.documentWidth, dimensions.bodyWidth),
    `document must not overflow the ${dimensions.viewportWidth}px viewport horizontally`
  ).toBeLessThanOrEqual(dimensions.viewportWidth);
}

async function prepareTouchTarget(
  locator: Locator,
  label: string,
  viewport: { width: number; height: number }
): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  expect(box, `${label} must have a rendered box`).not.toBeNull();
  if (!box) return;

  expect(box.width, `${label} must have positive width`).toBeGreaterThan(0);
  expect(box.height, `${label} must have positive height`).toBeGreaterThan(0);
  expect(box.x, `${label} must not start left of the viewport`).toBeGreaterThanOrEqual(-0.5);
  expect(box.x + box.width, `${label} must fit within the viewport width`).toBeLessThanOrEqual(
    viewport.width + 0.5
  );
  expect(box.y, `${label} must be vertically reachable`).toBeGreaterThanOrEqual(-0.5);
  expect(box.y + box.height, `${label} must fit in the visible viewport after scrolling`).toBeLessThanOrEqual(
    viewport.height + 0.5
  );
}

async function executePlan(
  root: Locator,
  tokens: string[],
  label: string,
  activate: Activate,
  finalState: 'active' | 'success',
  afterAction: () => Promise<void>
): Promise<void> {
  for (const [index, token] of tokens.entries()) {
    const control = await exactControl(
      root,
      `[data-smoke-control="${escapeAttributeValue(token)}"]`,
      `${label} control "${token}"`
    );
    await activate(control, `${label} control "${token}"`);

    const expectedState = finalState === 'success' && index === tokens.length - 1 ? 'success' : 'active';
    await expect
      .poll(() => currentState(root), {
        message: `${label} step ${index + 1} (${token}) must leave the prototype in ${expectedState}`
      })
      .toBe(expectedState);
    await afterAction();
  }
}

async function waitForActiveOrCompletion(root: Locator): Promise<SmokeState> {
  await expect
    .poll(() => currentState(root), { message: 'continue must reveal another active scene or completion' })
    .toMatch(/^(active|complete)$/);
  return currentState(root);
}

async function assertCompletion(root: Locator): Promise<void> {
  await expectState(root, 'complete');
  const completion = await exactVisible(root, '[data-smoke-completion]', 'completion state');
  const text = (await completion.innerText()).replace(/\s+/g, ' ').trim();
  expect(text.length, 'completion must contain written confirmation').toBeGreaterThanOrEqual(10);
}

async function driveActiveScene(
  root: Locator,
  activate: Activate,
  afterAction: () => Promise<void>,
  errorAlreadyExercised: boolean,
  prepareFeedback?: PrepareFeedback
): Promise<{ errorExercised: boolean; errorText: string | null }> {
  await expectState(root, 'active');
  let errorExercised = errorAlreadyExercised;
  let errorText: string | null = null;
  const errorFeedback = root.locator(
    '[data-smoke-feedback="error"][data-smoke-feedback-detail]'
  );
  await expect(
    errorFeedback,
    'an active scene must not expose stale error feedback before the harness attempts its error plan'
  ).toHaveCount(0);
  const errorPlan = await planFor(root, 'data-smoke-error-plan');

  if (errorPlan.length > 0 && !errorAlreadyExercised) {
    await executePlan(root, errorPlan, 'recoverable-error plan', activate, 'active', afterAction);
    await expectState(root, 'active');
    errorText = await feedbackText(root, 'error', prepareFeedback);
    errorExercised = true;

    const recoveryPlan = await planFor(root, 'data-smoke-recovery-plan');
    if (recoveryPlan.length > 0) {
      await executePlan(root, recoveryPlan, 'recovery plan', activate, 'active', afterAction);
      await expectState(root, 'active');
    }
  }

  const successPlan = await planFor(root, 'data-smoke-success-plan', true);
  await executePlan(root, successPlan, 'success plan', activate, 'success', afterAction);
  await expectState(root, 'success');
  const successText = await feedbackText(root, 'success');
  if (errorText !== null) {
    expect(successText, 'success and recoverable-error feedback must differ in writing').not.toBe(
      errorText
    );
  }

  return { errorExercised, errorText };
}

export async function runKeyboardContract(
  page: Page,
  target: SmokeTarget,
  assertClean: AssertClean
): Promise<void> {
  const root = rootFor(page, target);
  await expect(root, `${target.id} smoke root must be unique`).toHaveCount(1);
  await expect(root, `${target.id} smoke root must be visible`).toBeVisible();
  await expectState(root, 'ready');
  expect(
    await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
    'desktop smoke must emulate reduced motion'
  ).toBe(true);
  await assertClean();

  const start = await exactControl(root, '[data-smoke-action="start"]', 'start control');
  await keyboardActivate(page, start, 'start control');
  await expectState(root, 'active');
  await assertClean();

  let completedScenes = 0;
  let errorExercised = false;
  while ((await currentState(root)) !== 'complete') {
    if (completedScenes >= 50) {
      throw new Error(`${target.id} exceeded the 50-scene smoke safety limit.`);
    }

    const result = await driveActiveScene(
      root,
      (control, label) => keyboardActivate(page, control, label),
      assertClean,
      errorExercised
    );
    errorExercised = result.errorExercised;

    const continueControl = await exactControl(
      root,
      '[data-smoke-action="continue"]',
      'continue control'
    );
    await keyboardActivate(page, continueControl, 'continue control');
    completedScenes += 1;
    await waitForActiveOrCompletion(root);
    await assertClean();
  }

  expect(completedScenes, 'the primary loop must contain at least one active scene').toBeGreaterThan(0);
  expect(errorExercised, 'the complete path must expose one recoverable error probe').toBe(true);
  await assertCompletion(root);
  await assertClean();
}

export async function runTouchContract(
  page: Page,
  target: SmokeTarget,
  viewport: { width: 320; height: number },
  assertClean: AssertClean
): Promise<void> {
  const environment = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    touchPoints: navigator.maxTouchPoints
  }));
  expect(environment.innerWidth, 'touch window width must be exactly 320px').toBe(320);
  expect(environment.clientWidth, 'touch document viewport must be exactly 320px').toBe(320);
  expect(environment.touchPoints, 'touch emulation must expose touch input').toBeGreaterThan(0);

  const root = rootFor(page, target);
  await expect(root, `${target.id} smoke root must be unique`).toHaveCount(1);
  await expect(root, `${target.id} smoke root must be visible`).toBeVisible();
  await expectState(root, 'ready');
  await assertNoHorizontalOverflow(page);
  await assertClean();

  const activateTouch: Activate = async (control, label) => {
    await prepareTouchTarget(control, label, viewport);
    await assertNoHorizontalOverflow(page);
    const inputValue = await control.getAttribute('data-smoke-input-value');
    await control.tap();
    if (inputValue !== null) await control.fill(inputValue);
  };
  const afterTouchAction = async (): Promise<void> => {
    await assertNoHorizontalOverflow(page);
    await assertClean();
  };

  const start = await exactControl(root, '[data-smoke-action="start"]', 'start control');
  await activateTouch(start, 'start control');
  await expectState(root, 'active');
  await afterTouchAction();

  let completedScenes = 0;
  let errorExercised = false;
  while ((await currentState(root)) !== 'complete') {
    if (completedScenes >= 50) {
      throw new Error(`${target.id} exceeded the 50-scene smoke safety limit.`);
    }

    const result = await driveActiveScene(
      root,
      activateTouch,
      afterTouchAction,
      errorExercised,
      (feedback, label) => prepareTouchTarget(feedback, label, viewport)
    );
    errorExercised = result.errorExercised;

    const successFeedback = await exactVisible(
      root,
      '[data-smoke-feedback="success"][data-smoke-feedback-detail]',
      'success feedback'
    );
    await prepareTouchTarget(successFeedback, 'success feedback', viewport);
    const continueControl = await exactControl(
      root,
      '[data-smoke-action="continue"]',
      'continue control'
    );
    await activateTouch(continueControl, 'continue control');
    completedScenes += 1;
    await waitForActiveOrCompletion(root);
    await afterTouchAction();
  }

  expect(completedScenes, 'the primary loop must contain at least one active scene').toBeGreaterThan(0);
  expect(errorExercised, 'the complete path must expose one recoverable error probe').toBe(true);
  await assertCompletion(root);
  const completion = root.locator('[data-smoke-completion]');
  await prepareTouchTarget(completion, 'completion state', viewport);
  await assertNoHorizontalOverflow(page);
  await assertClean();
}
