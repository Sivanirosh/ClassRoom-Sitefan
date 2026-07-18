import { expect, test, type Locator, type TestInfo } from '@playwright/test';
import {
  advanceTugRound,
  answerTugRound,
  createTugRound,
  type TugConfig
} from '../../src/exercises/ex-0006-addition-tug-graybox/tug-engine';
import { createGuardedPage } from './guard';

const engineConfig: TugConfig = { goal: 2, opponentPace: 0 };

function advanceUntilPenaltyEnds(config: TugConfig, mistakes = 1) {
  let round = createTugRound();
  for (let index = 0; index < mistakes; index += 1) {
    round = answerTugRound(round, false, config);
  }
  while (round.queuedOpponentPull > 0 && round.outcome === 'playing') {
    round = advanceTugRound(round, 0.1, config);
  }
  return round;
}

test('tug engine keeps answer pulls symmetric and continuous', () => {
  const correct = answerTugRound(createTugRound(), true, engineConfig);
  const missed = answerTugRound(createTugRound(), false, engineConfig);

  expect(correct.position).toBe(-1);
  expect(missed.position).toBe(0);
  expect(missed.queuedOpponentPull).toBe(1);
  expect(advanceUntilPenaltyEnds(engineConfig).position).toBeCloseTo(1, 8);
});

test('tug engine consumes the full elapsed opponent pull', () => {
  const config: TugConfig = { goal: 3, opponentPace: 0.2 };
  const missed = answerTugRound(createTugRound(), false, config);
  const advanced = advanceTugRound(missed, 1.25, config);

  expect(advanced.position).toBeCloseTo(1.25, 8);
  expect(advanced.queuedOpponentPull).toBe(0);
  expect(advanced.outcome).toBe('playing');
});

test('tug engine freezes exactly at the red threshold', () => {
  const config: TugConfig = { goal: 2, opponentPace: 0.04 };
  const firstPull = answerTugRound(createTugRound(), true, config);
  const won = answerTugRound(firstPull, true, config);

  expect(won).toEqual({ position: -2, queuedOpponentPull: 0, outcome: 'won' });
  expect(answerTugRound(won, false, config)).toEqual(won);
  expect(advanceTugRound(won, 3, config)).toEqual(won);
});

test('tug engine stops exactly at the opponent threshold', () => {
  const lost = advanceUntilPenaltyEnds(engineConfig, 2);

  expect(lost).toEqual({ position: 2, queuedOpponentPull: 0, outcome: 'lost' });
  expect(advanceTugRound(lost, 0.1, engineConfig)).toEqual(lost);
  expect(answerTugRound(lost, true, engineConfig)).toEqual(lost);
});

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
}

async function ropeShift(line: Locator): Promise<number> {
  return line.evaluate((element) => {
    const value = (element as HTMLElement).style.getPropertyValue('--rope-shift');
    return Number.parseFloat(value);
  });
}

test('EX-0006 ends the round when the opponent reaches its goal', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0006');
    await page.locator('[data-smoke-action="start"]').click();

    await page.locator('[data-smoke-control="wrong"]').click();
    await page.locator('[data-smoke-control="wrong"]').click();

    await expect(page.locator('[data-round-outcome="loss"]')).toBeVisible({ timeout: 4_000 });
    await expect(page.locator('[data-smoke-state="active"]')).toHaveCount(0);
  } finally {
    await guarded.close();
  }
});

test('EX-0006 applies an equal opposite pull after a miss', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0006');
    await page.locator('[data-smoke-action="start"]').click();

    const line = page.locator('.tug-line');
    const initialShift = await ropeShift(line);
    await page.waitForTimeout(1_200);
    const idleShift = await ropeShift(line);
    expect(idleShift).toBeGreaterThan(initialShift + 0.15);

    await page.locator('[data-smoke-control="answer"]').click();
    const answerShift = await ropeShift(line);
    expect(answerShift).toBeLessThan(idleShift - 6.5);

    await expect(page.getByRole('button', { name: /pause|relancer/i })).toHaveCount(0);

    const beforeMiss = await ropeShift(line);
    await page.locator('[data-smoke-control="wrong"]').click();
    const afterMiss = await ropeShift(line);
    expect(Math.abs(afterMiss - beforeMiss)).toBeLessThan(0.2);

    await page.waitForTimeout(1_500);
    const penalizedShift = await ropeShift(line);
    expect(penalizedShift).toBeGreaterThan(afterMiss + 7);
    expect(penalizedShift).toBeLessThan(afterMiss + 8.2);
  } finally {
    await guarded.close();
  }
});
