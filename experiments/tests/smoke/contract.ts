import { expect, type Locator, type Page } from '@playwright/test';
import type { SmokeTarget } from './catalog';

const STATES = ['ready', 'question', 'incorrect', 'correct', 'complete'] as const;
type SmokeState = (typeof STATES)[number];
type AssertClean = () => Promise<void>;

function rootFor(page: Page, target: SmokeTarget): Locator {
  return page.locator(
    `[data-smoke-root][data-smoke-exercise="${target.id}"][data-smoke-program="${target.programId}"]`
  );
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

const stateHooks: Record<SmokeState, string[]> = {
  ready: ['[data-smoke-action="start"]'],
  question: ['[data-smoke-answer="incorrect"]', '[data-smoke-answer="correct"]'],
  incorrect: [
    '[data-smoke-feedback="incorrect"][data-smoke-feedback-detail]',
    '[data-smoke-action="retry"]'
  ],
  correct: [
    '[data-smoke-feedback="correct"][data-smoke-feedback-detail]',
    '[data-smoke-action="continue"]'
  ],
  complete: ['[data-smoke-completion]']
};
const allStateHooks = Object.values(stateHooks).flat();

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
}

async function expectState(root: Locator, state: SmokeState): Promise<void> {
  await expect(root, `smoke state must become "${state}"`).toHaveAttribute(
    'data-smoke-state',
    state
  );
  await expectStateShape(root, state);
}

async function currentState(root: Locator): Promise<SmokeState> {
  const state = await root.getAttribute('data-smoke-state');
  if (!STATES.includes(state as SmokeState)) {
    throw new Error(`Unknown or missing data-smoke-state: ${String(state)}`);
  }
  return state as SmokeState;
}

async function feedbackText(root: Locator, kind: 'incorrect' | 'correct'): Promise<string> {
  const feedback = await exactVisible(
    root,
    `[data-smoke-feedback="${kind}"][data-smoke-feedback-detail]`,
    `${kind} feedback`
  );
  const text = (await feedback.innerText()).replace(/\s+/g, ' ').trim();
  expect(text.length, `${kind} feedback must contain specific written detail`).toBeGreaterThanOrEqual(
    20
  );
  expect(text, `${kind} feedback must contain words, not only a color or icon`).toMatch(/\p{L}/u);
  return text;
}

async function focusByTab(page: Page, control: Locator, label: string): Promise<void> {
  for (let press = 0; press < 100; press += 1) {
    await page.keyboard.press('Tab');
    if (await control.evaluate((element) => element === document.activeElement)) return;
  }

  throw new Error(`${label} could not be reached with Tab.`);
}

async function keyboardActivate(
  page: Page,
  control: Locator,
  label: string,
  key: 'Enter' | 'Space'
): Promise<void> {
  await focusByTab(page, control, label);
  await page.keyboard.press(key);
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

async function waitForQuestionOrCompletion(root: Locator): Promise<SmokeState> {
  await expect
    .poll(() => currentState(root), { message: 'continue must reveal another question or completion' })
    .toMatch(/^(question|complete)$/);
  return currentState(root);
}

async function assertCompletion(root: Locator): Promise<void> {
  await expectState(root, 'complete');
  const completion = await exactVisible(root, '[data-smoke-completion]', 'completion state');
  const text = (await completion.innerText()).replace(/\s+/g, ' ').trim();
  expect(text.length, 'completion must contain written confirmation').toBeGreaterThanOrEqual(10);
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
  await keyboardActivate(page, start, 'start control', 'Enter');
  await expectState(root, 'question');
  await assertClean();

  let completedQuestions = 0;
  while ((await currentState(root)) !== 'complete') {
    if (completedQuestions >= 50) {
      throw new Error(`${target.id} exceeded the 50-question smoke safety limit.`);
    }

    await expectState(root, 'question');
    const incorrectAnswer = await exactControl(
      root,
      '[data-smoke-answer="incorrect"]',
      'known incorrect answer'
    );
    const correctAnswerBeforeRetry = await exactControl(
      root,
      '[data-smoke-answer="correct"]',
      'known correct answer'
    );
    expect(
      await incorrectAnswer.evaluate(
        (element, correct) => element !== correct,
        await correctAnswerBeforeRetry.elementHandle()
      ),
      'known correct and incorrect answers must be distinct controls'
    ).toBe(true);
    await keyboardActivate(page, incorrectAnswer, 'known incorrect answer', 'Space');
    await expectState(root, 'incorrect');
    const incorrectText = await feedbackText(root, 'incorrect');
    await assertClean();

    const retry = await exactControl(root, '[data-smoke-action="retry"]', 'retry control');
    await keyboardActivate(page, retry, 'retry control', 'Enter');
    await expectState(root, 'question');
    await assertClean();

    const correctAnswer = await exactControl(
      root,
      '[data-smoke-answer="correct"]',
      'known correct answer after retry'
    );
    await keyboardActivate(page, correctAnswer, 'known correct answer after retry', 'Space');
    await expectState(root, 'correct');
    const correctText = await feedbackText(root, 'correct');
    expect(correctText, 'correct and incorrect feedback must be distinguishable in writing').not.toBe(
      incorrectText
    );
    await assertClean();

    const continueControl = await exactControl(
      root,
      '[data-smoke-action="continue"]',
      'continue control'
    );
    await keyboardActivate(page, continueControl, 'continue control', 'Enter');
    completedQuestions += 1;
    await waitForQuestionOrCompletion(root);
    await assertClean();
  }

  expect(completedQuestions, 'the primary loop must contain at least one question').toBeGreaterThan(0);
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

  const start = await exactControl(root, '[data-smoke-action="start"]', 'start control');
  await prepareTouchTarget(start, 'start control', viewport);
  await start.tap();
  await expectState(root, 'question');
  await assertNoHorizontalOverflow(page);
  await assertClean();

  let completedQuestions = 0;
  while ((await currentState(root)) !== 'complete') {
    if (completedQuestions >= 50) {
      throw new Error(`${target.id} exceeded the 50-question smoke safety limit.`);
    }

    await expectState(root, 'question');
    const correctAnswerBeforeRetry = await exactControl(
      root,
      '[data-smoke-answer="correct"]',
      'known correct answer'
    );
    await prepareTouchTarget(correctAnswerBeforeRetry, 'known correct answer', viewport);
    const incorrectAnswer = await exactControl(
      root,
      '[data-smoke-answer="incorrect"]',
      'known incorrect answer'
    );
    expect(
      await incorrectAnswer.evaluate(
        (element, correct) => element !== correct,
        await correctAnswerBeforeRetry.elementHandle()
      ),
      'known correct and incorrect answers must be distinct controls'
    ).toBe(true);
    await prepareTouchTarget(incorrectAnswer, 'known incorrect answer', viewport);
    await assertNoHorizontalOverflow(page);
    await incorrectAnswer.tap();
    await expectState(root, 'incorrect');

    const incorrectFeedback = await exactVisible(
      root,
      '[data-smoke-feedback="incorrect"][data-smoke-feedback-detail]',
      'incorrect feedback'
    );
    await prepareTouchTarget(incorrectFeedback, 'incorrect feedback', viewport);
    const incorrectText = await feedbackText(root, 'incorrect');
    const retry = await exactControl(root, '[data-smoke-action="retry"]', 'retry control');
    await prepareTouchTarget(retry, 'retry control', viewport);
    await assertNoHorizontalOverflow(page);
    await assertClean();
    await retry.tap();
    await expectState(root, 'question');
    await assertClean();

    const correctAnswer = await exactControl(
      root,
      '[data-smoke-answer="correct"]',
      'known correct answer after retry'
    );
    await prepareTouchTarget(correctAnswer, 'known correct answer after retry', viewport);
    await assertNoHorizontalOverflow(page);
    await correctAnswer.tap();
    await expectState(root, 'correct');

    const correctFeedback = await exactVisible(
      root,
      '[data-smoke-feedback="correct"][data-smoke-feedback-detail]',
      'correct feedback'
    );
    await prepareTouchTarget(correctFeedback, 'correct feedback', viewport);
    const correctText = await feedbackText(root, 'correct');
    expect(correctText, 'correct and incorrect feedback must be distinguishable in writing').not.toBe(
      incorrectText
    );
    const continueControl = await exactControl(
      root,
      '[data-smoke-action="continue"]',
      'continue control'
    );
    await prepareTouchTarget(continueControl, 'continue control', viewport);
    await assertNoHorizontalOverflow(page);
    await assertClean();
    await continueControl.tap();
    completedQuestions += 1;
    await waitForQuestionOrCompletion(root);
    await assertNoHorizontalOverflow(page);
    await assertClean();
  }

  expect(completedQuestions, 'the primary loop must contain at least one question').toBeGreaterThan(0);
  await assertCompletion(root);
  const completion = root.locator('[data-smoke-completion]');
  await prepareTouchTarget(completion, 'completion state', viewport);
  await assertNoHorizontalOverflow(page);
  await assertClean();
}
