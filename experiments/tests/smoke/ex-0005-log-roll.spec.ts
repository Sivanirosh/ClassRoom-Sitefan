import { expect, test, type TestInfo } from '@playwright/test';
import { createGuardedPage } from './guard';

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
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
    await expect(input).toBeEnabled();
    await expect(stage).toHaveAttribute('data-covered-rolls', '1');
    await expect(stage).toHaveAttribute('data-outcome', 'idle');

    const smokeUnderprediction = Number(await input.getAttribute('data-smoke-input-value'));
    await input.fill(String(smokeUnderprediction));
    await expect(stage).toHaveAttribute('data-outcome', 'short');
    await expect(page.getByText('distance restante', { exact: true })).toBeVisible();
    await expect(page.locator('[data-smoke-feedback="error"]')).toContainText('avant l’Arrivée');

    await page.locator('[data-smoke-control="retry"]').click();
    await expect(stage).toHaveAttribute('data-covered-rolls', '1');
    await expect(stage).toHaveAttribute('data-outcome', 'idle');
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
    await expect(page.locator('.composition')).toContainText('1 tour observé');

    await page.locator('[data-smoke-action="continue"]').click();
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-representation', 'line');
    await expect(page.locator('[data-roll-stage]')).toHaveAttribute('data-covered-rolls', '1');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});
