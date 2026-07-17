import { expect, test, type TestInfo } from '@playwright/test';
import { createGuardedPage } from './guard';

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
}

test('EX-0004 retries a failed prediction in the same round', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0004');
    await page.locator('[data-smoke-action="start"]').click();

    const tutorialJump = page.locator('[data-smoke-control="jump"]');
    for (let count = 0; count < 4; count += 1) await tutorialJump.click();
    await page.locator('[data-smoke-action="continue"]').click();

    const root = page.locator('[data-smoke-root]');
    await expect(root).toHaveAttribute('data-smoke-scene', 'horizontal');

    const prediction = page.locator('[data-smoke-control="prediction"]');
    await prediction.fill('3');
    await expect(page.locator('[data-smoke-feedback="error"]')).toBeVisible();

    await page.locator('[data-smoke-control="retry"]').click();

    await expect(root).toHaveAttribute('data-smoke-state', 'active');
    await expect(root).toHaveAttribute('data-smoke-scene', 'horizontal');
    await expect(page.locator('.world-message')).toContainText('Le passage 2 recommence ici.');
    await expect(prediction).toBeEnabled();
    await expect(prediction).toHaveValue('');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});
