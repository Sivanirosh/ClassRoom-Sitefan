import { expect, test, type Locator, type TestInfo } from '@playwright/test';
import { createGuardedPage } from './guard';

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
}

async function expectInsideViewport(locator: Locator, width: number, height: number): Promise<void> {
  const box = await locator.boundingBox();
  expect(box, 'required element must have a rendered box').not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(height);
}

test('EX-0004 uses generated pond art as a cohesive hero and exact game world', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0004');

    const root = page.locator('[data-smoke-root]');
    const hero = root.locator('[data-visual-role="pond-hero"]');
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute('alt', '');
    await expect(hero).toHaveAttribute('aria-hidden', 'true');
    await expect(root.locator('.intro-card, .intro-art, .boundary')).toHaveCount(0);
    await expect(root.locator('[data-visual-intro] svg')).toHaveCount(0);
    await expect(root).not.toContainText('EX-0004');
    await expect(root).not.toContainText('aucun chronomètre');

    const heroPresentation = await hero.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        width: box.width,
        height: box.height,
        opacity: Number(style.opacity),
        maskImage: style.maskImage,
        naturalWidth: (element as HTMLImageElement).naturalWidth
      };
    });
    expect(heroPresentation.width).toBeGreaterThanOrEqual(1280 * 0.9);
    expect(heroPresentation.height).toBeGreaterThanOrEqual(800 * 0.85);
    expect(heroPresentation.opacity).toBeGreaterThanOrEqual(0.9);
    expect(heroPresentation.maskImage).toBe('none');
    expect(heroPresentation.naturalWidth).toBeGreaterThan(0);

    await root.locator('[data-smoke-action="start"]').click();

    await expect(
      root.locator('.pond-frame, .frame-plaque, .board-measure, .garden-scenery, .brand-mark')
    ).toHaveCount(0);
    await expect(root.locator('[data-game-hud]')).toBeVisible();

    const stage = root.locator('[data-pond-stage]');
    const atmosphere = stage.locator('[data-decorative-atmosphere="stage"]');
    const board = stage.locator('svg');
    await expect(stage).toBeVisible();
    await expect(atmosphere).toBeVisible();
    await expect(atmosphere).toHaveAttribute('aria-hidden', 'true');
    expect(await atmosphere.evaluate((element) => getComputedStyle(element).filter)).toContain('blur');
    expect(
      await stage.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopWidth))
    ).toBeLessThanOrEqual(2);

    await expect(board).toHaveAttribute('viewBox', '0 0 120 100');
    const pattern = board.locator('pattern[id^="unit-grid-"]');
    await expect(pattern).toHaveAttribute('width', '10');
    await expect(pattern).toHaveAttribute('height', '10');
    expect(Number(await pattern.locator('path').getAttribute('stroke-opacity'))).toBeLessThanOrEqual(
      0.25
    );

    const unitReference = board.locator('.unit-reference');
    await expect(unitReference).toHaveCount(1);
    await expect(unitReference).toHaveAttribute(
      'aria-label',
      'Un côté de carré vaut une unité-saut'
    );
    await expect(unitReference.locator('text')).toHaveText('1 saut');
    await expect(unitReference.locator('rect')).toHaveCount(0);
    const unitVector = await unitReference.locator('line').evaluate((line) => ({
      dx: Math.abs(Number(line.getAttribute('x2')) - Number(line.getAttribute('x1'))),
      dy: Math.abs(Number(line.getAttribute('y2')) - Number(line.getAttribute('y1')))
    }));
    expect([unitVector.dx, unitVector.dy].sort((a, b) => a - b)).toEqual([0, 10]);

    const headingBox = await root.locator('.scene-heading').boundingBox();
    const stageBox = await stage.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(stageBox).not.toBeNull();
    expect(stageBox!.x).toBeGreaterThan(headingBox!.x + headingBox!.width);
    for (const required of [
      root.locator('[data-game-hud]'),
      root.locator('#scene-title'),
      stage,
      root.locator('.tutorial-control'),
      root.locator('.world-message')
    ]) {
      await expectInsideViewport(required, 1280, 800);
    }

    const frogControl = root.locator('[data-smoke-control="jump"]');
    for (let jump = 0; jump < 4; jump += 1) await frogControl.click();
    await expect(root).toHaveAttribute('data-smoke-state', 'success');
    const successMap = root.locator('.success-map');
    await expect(successMap.locator('.board-atmosphere')).toBeVisible();
    await expect(successMap.locator('svg')).toHaveAttribute('viewBox', '0 0 120 100');
    await expect(successMap.locator('.completed-line')).toHaveCount(4);
    await expect(successMap.locator('.frog.arrived')).toBeVisible();
    await expect(successMap.locator('.garden-scenery')).toHaveCount(0);
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0004 keeps its pond hierarchy and direct frog control usable at 320px', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 320, height: 800 },
    hasTouch: true,
    isMobile: true
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0004');
    const root = page.locator('[data-smoke-root]');
    const hero = root.locator('[data-visual-role="pond-hero"]');
    await expect(hero).toBeVisible();
    const heroBox = await hero.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(heroBox!.width).toBeGreaterThanOrEqual(320);
    expect(heroBox!.height).toBeGreaterThanOrEqual(400);
    for (const introElement of [
      root.locator('#intro-title'),
      root.locator('.intro-copy .lead'),
      root.locator('[data-smoke-action="start"]')
    ]) {
      await expectInsideViewport(introElement, 320, 800);
    }

    await root.locator('[data-smoke-action="start"]').tap();
    const frogControl = root.locator('[data-smoke-control="jump"]');
    const required = [
      root.locator('[data-game-hud]'),
      root.locator('#scene-title'),
      root.locator('[data-pond-stage]'),
      frogControl,
      root.locator('.tutorial-control'),
      root.locator('.world-message')
    ];
    for (const locator of required) await expectInsideViewport(locator, 320, 800);

    const frogBox = await frogControl.boundingBox();
    expect(frogBox).not.toBeNull();
    expect(frogBox!.width).toBeGreaterThanOrEqual(44);
    expect(frogBox!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0004 reduced motion keeps authored evidence while removing animation', async ({
  browser
}, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0004');
    const root = page.locator('[data-smoke-root]');
    await root.locator('[data-smoke-action="start"]').click();
    await root.locator('[data-smoke-control="jump"]').click();

    const trace = root.locator('.completed-line');
    await expect(trace).toHaveCount(1);
    await expect(root.locator('.landing')).toHaveCount(1);
    await expect(root.locator('.frog')).toHaveAttribute('transform', 'translate(30 60)');
    expect(await trace.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    expect(
      await root.locator('.frog-figure').evaluate((element) => getComputedStyle(element).animationName)
    ).toBe('none');
    await expect(root.locator('.landing-ripple')).toBeHidden();
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});
