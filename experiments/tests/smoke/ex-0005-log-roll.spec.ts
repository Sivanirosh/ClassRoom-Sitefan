import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { createGuardedPage } from './guard';

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect.poll(() => page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth
  }))).toEqual({ viewport: 320, document: 320 });
}

test('EX-0005 retains calibration through over, short, retry, and exact resolution', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0005');
    await page.locator('[data-smoke-action="start"]').click();

    const tutorialRoll = page.locator('[data-smoke-control="roll"]');
    for (let count = 0; count < 4; count += 1) await tutorialRoll.click();
    await expect(page.locator('[data-smoke-state="success"]')).toBeVisible();
    await page.locator('[data-smoke-action="continue"]').click();

    const input = page.locator('[data-smoke-control="prediction"]');
    const stage = page.locator('[data-roll-stage]');
    const variantId = await stage.getAttribute('data-variant-id');
    if (variantId === null) throw new Error('Exploration variant id missing.');
    await expect(input).toBeEnabled();
    await expect(stage).toHaveAttribute('data-covered-rolls', '1');
    await expect(stage).toHaveAttribute('data-trace-intervals', '1');
    await expect(stage).toHaveAttribute('data-rotation-turns', '1');
    await expect(stage).toHaveAttribute('data-outcome', 'idle');
    await expect(stage.locator('[data-roll-interval="1"]')).toBeVisible();
    const atmosphere = stage.locator('[data-decorative-atmosphere="stage"]');
    await expect(atmosphere).toBeVisible();
    await expect(atmosphere).toHaveAttribute('aria-hidden', 'true');
    expect(await atmosphere.getAttribute('href')).toMatch(/terrace-atmosphere-safe(?:-[\w-]+)?\.webp$/);

    const smokeUnderprediction = Number(await input.getAttribute('data-smoke-input-value'));
    await input.fill(String(smokeUnderprediction));
    await expect(stage).toHaveAttribute('data-outcome', 'short');
    await expect(page.getByText('distance restante', { exact: true })).toBeVisible();
    await expect(page.locator('[data-smoke-feedback="error"]')).toContainText('avant l’Arrivée');

    await page.locator('[data-smoke-control="retry"]').click();
    await expect(stage).toHaveAttribute('data-covered-rolls', '1');
    await expect(stage).toHaveAttribute('data-trace-intervals', '1');
    await expect(stage).toHaveAttribute('data-rotation-turns', '1');
    await expect(stage).toHaveAttribute('data-outcome', 'idle');
    await expect(stage).toHaveAttribute('data-variant-id', variantId);
    await expect(page.getByText('1 tour observé', { exact: true })).toBeVisible();

    const required = Number(await input.getAttribute('data-smoke-input-value'));
    expect(required).toBeGreaterThan(1);
    expect(required).toBeLessThan(7);
    await input.fill(String(required + 1));
    await expect(stage).toHaveAttribute('data-outcome', 'over');
    await expect(page.getByText('distance dépassée', { exact: true })).toBeVisible();
    await expect(page.locator('[data-smoke-feedback="error"]')).toContainText('dépasse');

    await page.locator('[data-smoke-control="retry"]').click();
    await expect(stage).toHaveAttribute('data-covered-rolls', '1');
    await input.fill(String(required));

    await expect(page.locator('[data-smoke-state="success"]')).toBeVisible();
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-outcome', 'exact');
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-trace-intervals', String(required + 1));
    await expect(page.locator('.composition')).toContainText('1 tour observé');

    await page.locator('[data-smoke-action="continue"]').click();
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-representation', 'line');
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-covered-rolls', '1');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0005 couples each ordinary tutorial roll to one interval and one signed turn', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1100, height: 760 },
    hasTouch: false,
    reducedMotion: 'no-preference'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0005');
    await page.locator('[data-smoke-action="start"]').click();

    const stage = page.locator('[data-roll-stage]');
    const roll = page.locator('[data-smoke-control="roll"]');
    const readRollState = () => stage.evaluate((element) => ({
      x: Number(element.getAttribute('data-roller-x')),
      y: Number(element.getAttribute('data-roller-y')),
      turns: Number(element.getAttribute('data-rotation-turns')),
      intervals: Number(element.getAttribute('data-trace-intervals'))
    }));

    const origin = await readRollState();
    await roll.focus();
    await page.keyboard.press('Enter');
    await expect(stage).toHaveAttribute('data-roll-phase', 'added-roll');
    await expect(roll).toBeDisabled();
    await expect(stage).toHaveAttribute('data-covered-rolls', '1');
    const roller = stage.locator('.roller');
    expect(await roller.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0.29s');
    expect(await stage.locator('[data-roll-interval="1"] line').evaluate((element) => getComputedStyle(element).animationName)).not.toBe('none');
    const midpoint = await roller.evaluate((element) => {
      const animation = element.getAnimations()[0];
      if (!(animation?.effect instanceof KeyframeEffect)) return null;
      const duration = Number(animation.effect.getTiming().duration);
      animation.pause();
      animation.currentTime = duration * .4;
      const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
      animation.play();
      return { x: matrix.e, rotationComponent: matrix.b };
    });
    expect(midpoint).not.toBeNull();
    expect(midpoint!.x).toBeGreaterThan(origin.x);
    expect(midpoint!.x).toBeLessThan(origin.x + 20);
    expect(Math.abs(midpoint!.rotationComponent)).toBeGreaterThan(.1);
    await expect(roll).toBeEnabled();
    const first = await readRollState();

    await roll.click();
    await expect(stage).toHaveAttribute('data-covered-rolls', '2');
    await expect(roll).toBeEnabled();
    const second = await readRollState();

    expect(first.x - origin.x).toBe(second.x - first.x);
    expect(first.y - origin.y).toBe(second.y - first.y);
    expect(first.turns - origin.turns).toBe(1);
    expect(second.turns - first.turns).toBe(1);
    expect(first.intervals - origin.intervals).toBe(1);
    expect(second.intervals - first.intervals).toBe(1);

    await roll.click();
    await expect(roll).toBeEnabled();
    await roll.click();
    await expect(stage).toHaveAttribute('data-roll-phase', 'added-roll');
    await expect(page.locator('[data-smoke-state="active"]')).toBeVisible();
    await expect(page.locator('[data-smoke-state="success"]')).toBeVisible();
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-trace-intervals', '4');

    await page.locator('[data-smoke-action="continue"]').click();
    const predictionStage = page.locator('[data-roll-stage]');
    const input = page.locator('[data-smoke-control="prediction"]');
    await expect(predictionStage).toHaveAttribute('data-roll-phase', 'calibration');
    await expect(input).toBeDisabled();
    expect(await predictionStage.locator('.roller').evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0.42s');
    await expect(input).toBeEnabled();
    await expect(predictionStage).toHaveAttribute('data-covered-rolls', '1');

    const underprediction = await input.getAttribute('data-smoke-input-value');
    if (underprediction === null) throw new Error('Ordinary-motion underprediction missing.');
    await input.fill(underprediction);
    await expect(predictionStage).toHaveAttribute('data-roll-phase', 'added-roll');
    expect(await predictionStage.locator('.roller').evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0.29s');
    await expect(predictionStage).toHaveAttribute('data-outcome', 'short');
    await page.locator('[data-smoke-control="retry"]').click();
    await expect(predictionStage).toHaveAttribute('data-covered-rolls', '1');
    await expect(predictionStage).toHaveAttribute('data-trace-intervals', '1');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0005 completes all six scenes by touch at 320px without overflow', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 320, height: 720 },
    hasTouch: true,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0005');
    await expectNoHorizontalOverflow(page);
    await page.locator('[data-smoke-action="start"]').tap();
    await expect(page.locator('#scene-title')).toBeFocused();

    const tutorialRoll = page.locator('[data-smoke-control="roll"]');
    for (let count = 0; count < 4; count += 1) await tutorialRoll.tap();
    await expect(page.locator('[data-smoke-state="success"]')).toBeVisible();
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-trace-intervals', '4');
    await expectNoHorizontalOverflow(page);

    const predictionScenes = ['exploration', 'constraint', 'complication', 'integration', 'independence'];
    for (const sceneId of predictionScenes) {
      const continueButton = page.locator('[data-smoke-action="continue"]');
      await continueButton.tap();
      await expect(page.locator('[data-smoke-scene]')).toHaveAttribute('data-smoke-scene', sceneId);
      await expect(page.locator('#scene-title')).toBeFocused();

      const stage = page.locator('[data-roll-stage]');
      const input = page.locator('[data-smoke-control="prediction"]');
      await expect(input).toBeEnabled();
      await expect(stage).toHaveAttribute('data-covered-rolls', '1');
      await expect(stage).toHaveAttribute('data-trace-intervals', '1');
      await expect(stage.locator('.target-path')).toHaveCount(1);
      await expectNoHorizontalOverflow(page);

      let required = await input.getAttribute('data-smoke-input-value');
      if (required === null) throw new Error(`${sceneId}: smoke prediction value missing.`);
      await input.tap();
      await input.fill(required);

      if (sceneId === 'exploration') {
        await expect(stage).toHaveAttribute('data-outcome', 'short');
        await page.locator('[data-smoke-control="retry"]').tap();
        await expect(stage).toHaveAttribute('data-covered-rolls', '1');
        await expect(input).toBeFocused();
        required = await input.getAttribute('data-smoke-input-value');
        if (required === null) throw new Error(`${sceneId}: recovery prediction value missing.`);
        await input.fill(required);
      }

      await expect(page.locator('[data-smoke-state="success"]')).toBeVisible();
      const finalStage = page.locator('[data-roll-stage]');
      await expect(finalStage).toHaveAttribute('data-outcome', 'exact');
      await expect(finalStage.locator('.exact-halo')).toHaveCount(1);
      expect(await finalStage.getAttribute('data-trace-intervals')).toBe(await finalStage.getAttribute('data-covered-rolls'));
      await expect(page.locator('[data-smoke-feedback="success"]')).toBeFocused();
      await expectNoHorizontalOverflow(page);
      if (sceneId === 'independence') {
        await expect(page.locator('[data-smoke-feedback="success"]')).toContainText('première prévision');
      }
    }

    const closeButton = page.locator('[data-smoke-action="continue"]');
    await closeButton.tap();
    await expect(page.locator('[data-smoke-state="complete"]')).toBeVisible();
    await expect(page.locator('[data-smoke-completion]')).toBeFocused();
    await expectNoHorizontalOverflow(page);
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0005 completes all six scenes with keyboard-only controls', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1024, height: 760 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0005');
    const start = page.locator('[data-smoke-action="start"]');
    await start.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#scene-title')).toBeFocused();

    const tutorialRoll = page.locator('[data-smoke-control="roll"]');
    await tutorialRoll.focus();
    for (let count = 0; count < 4; count += 1) await page.keyboard.press('Enter');
    await expect(page.locator('[data-smoke-feedback="success"]')).toBeFocused();

    const predictionScenes = ['exploration', 'constraint', 'complication', 'integration', 'independence'];
    for (const sceneId of predictionScenes) {
      await page.keyboard.press('Tab');
      const continueButton = page.locator('[data-smoke-action="continue"]');
      await expect(continueButton).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-smoke-scene]')).toHaveAttribute('data-smoke-scene', sceneId);
      await expect(page.locator('#scene-title')).toBeFocused();

      const input = page.locator('[data-smoke-control="prediction"]');
      await expect(input).toBeEnabled();
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
      let required = await input.getAttribute('data-smoke-input-value');
      if (required === null) throw new Error(`${sceneId}: keyboard prediction value missing.`);
      await page.keyboard.type(required);

      if (sceneId === 'exploration') {
        await expect(page.locator('[data-smoke-feedback="error"]')).toBeFocused();
        await page.keyboard.press('Tab');
        const retry = page.locator('[data-smoke-control="retry"]');
        await expect(retry).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(input).toBeFocused();
        required = await input.getAttribute('data-smoke-input-value');
        if (required === null) throw new Error(`${sceneId}: keyboard recovery value missing.`);
        await page.keyboard.type(required);
      }

      await expect(page.locator('[data-smoke-feedback="success"]')).toBeFocused();
      if (sceneId === 'integration') {
        const signedTurns = Number(await page.locator('[data-roll-stage]').getAttribute('data-rotation-turns'));
        expect(signedTurns).toBeLessThan(0);
      }
    }

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-smoke-action="continue"]')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-smoke-completion]')).toBeFocused();
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});
