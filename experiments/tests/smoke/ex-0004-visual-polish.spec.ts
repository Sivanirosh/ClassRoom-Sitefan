import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test, type Locator, type TestInfo } from '@playwright/test';
import { createGuardedPage } from './guard';

const lockedIntroPath = fileURLToPath(
  new URL('../../src/exercises/ex-0004-frog-jump-prediction/assets/pond-garden-intro.webp', import.meta.url)
);
const lockedIntroSha256 = '49db4ae90b24ff78b6c5e3c0361615af5735477548c67f4979211116cd857e85';

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

async function lineGeometry(locator: Locator): Promise<[number, number, number, number]> {
  return locator.evaluate((element) => [
    Number(element.getAttribute('x1')),
    Number(element.getAttribute('y1')),
    Number(element.getAttribute('x2')),
    Number(element.getAttribute('y2'))
  ]);
}

test('EX-0004 keeps the owner-locked intro artwork pixels', () => {
  const digest = createHash('sha256').update(readFileSync(lockedIntroPath)).digest('hex');
  expect(digest).toBe(lockedIntroSha256);
});

test('EX-0004 keeps the locked hero and a stable learning world', async ({
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
    const introSource = await hero.getAttribute('src');
    expect(introSource).toContain('pond-garden-intro');

    await root.locator('[data-smoke-action="start"]').click();

    await expect(
      root.locator('.pond-frame, .frame-plaque, .board-measure, .garden-scenery, .brand-mark')
    ).toHaveCount(0);
    await expect(root.locator('[data-game-hud]')).toBeVisible();

    const stage = root.locator('[data-pond-stage]');
    const board = stage.locator('svg');
    await expect(stage).toBeVisible();
    await expect(stage.locator('[data-decorative-atmosphere="stage"]')).toHaveCount(0);
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

    const pondCues = board.locator('[data-pond-cue]');
    await expect(pondCues).toHaveCount(2);
    await expect(
      board.locator('[data-pond-cue="origin-pad"] [data-generated-asset="lily-pad"]')
    ).toBeVisible();
    await expect(
      board.locator('[data-pond-cue="finish-pad"] [data-generated-asset="lily-pad-flowering"]')
    ).toBeVisible();
    await expect(board.locator('[data-pond-cue="origin-pad"] > circle, .tap-ring')).toHaveCount(0);
    expect(
      await pondCues.first().evaluate((element) => getComputedStyle(element).animationName)
    ).toBe('none');
    await expect(board.locator('[data-water-waves], .water-lines')).toHaveCount(0);

    const caustics = board.locator('[data-water-caustics]');
    await expect(caustics).toHaveCount(1);
    await expect(board.locator('pattern[id^="water-noise-"] image')).toHaveCount(2);
    await expect(caustics.locator('.caustic-highlight')).toHaveCount(2);
    const waterNoiseA = caustics.locator('.water-noise-a');
    const waterNoiseB = caustics.locator('.water-noise-b').first();
    expect(
      await waterNoiseA.evaluate((element) => getComputedStyle(element).animationName)
    ).toMatch(/water-noise-a$/);
    expect(
      await waterNoiseA.evaluate((element) => getComputedStyle(element).animationDuration)
    ).toBe('8s');
    expect(
      await waterNoiseB.evaluate((element) => getComputedStyle(element).animationName)
    ).toMatch(/water-noise-b$/);
    expect(
      await waterNoiseB.evaluate((element) => getComputedStyle(element).animationDuration)
    ).toBe('11s');
    const pondDecor = board.locator('[data-pond-decor]');
    await expect(pondDecor).toHaveCount(1);
    await expect(pondDecor.locator('[data-generated-asset]')).toHaveCount(12);
    expect(
      await pondDecor.locator('[data-generated-asset]').evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-generated-asset'))
      )
    ).toEqual([
      'rock-round',
      'lily-pad',
      'rock-cluster',
      'lotus-coral',
      'lily-pad',
      'lotus-coral',
      'lily-pad-flowering',
      'lily-pad',
      'lotus-red',
      'lily-pad',
      'lotus-red',
      'rock-light'
    ]);
    await expect(pondDecor.locator('[data-generated-asset][transform]')).toHaveCount(9);
    for (const asset of await pondDecor.locator('[data-generated-asset]').all()) {
      expect(await asset.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    }
    expect(
      await caustics.evaluate((element) =>
        element.nextElementSibling?.hasAttribute('data-pond-decor')
      )
    ).toBe(true);
    expect(
      await pondDecor.evaluate((element) =>
        element.nextElementSibling?.classList.contains('grid-surface')
      )
    ).toBe(true);
    expect(
      await board.locator('.grid-surface').evaluate((element) => ({
        animation: getComputedStyle(element).animationName,
        filter: getComputedStyle(element).filter,
        transform: getComputedStyle(element).transform
      }))
    ).toEqual({ animation: 'none', filter: 'none', transform: 'none' });

    const frogFigure = board.locator('.frog-figure');
    await expect(frogFigure.locator('[data-generated-asset="frog-green"]')).toBeVisible();
    await expect(frogFigure.locator('.frog-facing')).toHaveClass(/horizontal/);
    expect(
      await frogFigure.evaluate((element) => getComputedStyle(element).animationName)
    ).toBe('none');
    expect(
      await board.locator('.frog').evaluate((element) => getComputedStyle(element).transitionDuration)
    ).toBe('0s');

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
    await frogControl.click();
    await expect(board.locator('.landing-wave')).toHaveCount(1);
    await expect(board.locator('.landing-ripple')).toHaveCount(2);
    expect(
      await board.locator('.landing-ripple').first().evaluate((element) => getComputedStyle(element).animationName)
    ).toBe('none');
    for (let jump = 1; jump < 4; jump += 1) await frogControl.click();
    await expect(root).toHaveAttribute('data-smoke-state', 'success');
    const successMap = root.locator('.success-map');
    await expect(successMap.locator('.board-atmosphere')).toHaveCount(0);
    await expect(successMap.locator('svg')).toHaveAttribute('viewBox', '0 0 120 100');
    await expect(successMap.locator('.completed-line')).toHaveCount(4);
    await expect(successMap.locator('[data-pond-cue]')).toHaveCount(2);
    await expect(successMap.locator('.frog.arrived')).toBeVisible();
    await expect(successMap.locator('[data-pond-decor] [data-generated-asset]')).toHaveCount(12);

    await root.locator('[data-smoke-action="continue"]').click();
    await expect(board.locator('.target-line')).toHaveCount(1);
    expect(await lineGeometry(board.locator('.target-line'))).toEqual([20, 60, 70, 60]);
    await expect(board.locator('desc')).toContainText('séparés par 5 unités-saut');

    let input = root.locator('[data-smoke-input-value]');
    await input.fill('3');
    await expect(root.locator('[data-smoke-feedback="error"]')).toBeVisible();
    expect(await lineGeometry(board.locator('.discrepancy line'))).toEqual([50, 60, 70, 60]);
    await root.locator('[data-smoke-control="retry"]').click();
    input = root.locator('[data-smoke-input-value]');
    await input.fill('5');
    await expect(root).toHaveAttribute('data-smoke-state', 'success');
    expect(await lineGeometry(successMap.locator('.target-line'))).toEqual([20, 60, 70, 60]);

    await root.locator('[data-smoke-action="continue"]').click();
    expect(await lineGeometry(board.locator('.target-line'))).toEqual([60, 80, 60, 20]);
    await expect(board.locator('.frog-facing')).not.toHaveClass(/horizontal/);
    await expect(board.locator('desc')).toContainText('séparés par 6 unités-saut sur un trajet vertical');
    input = root.locator('[data-smoke-input-value]');
    await input.fill('6');
    await expect(root).toHaveAttribute('data-smoke-state', 'success');
    expect(await lineGeometry(successMap.locator('.target-line'))).toEqual([60, 80, 60, 20]);

    await root.locator('[data-smoke-action="continue"]').click();
    expect(await lineGeometry(board.locator('.target-line'))).toEqual([20, 60, 80, 60]);
    await expect(board.locator('.obstacle')).toHaveAttribute('transform', 'translate(50 60)');
    await expect(board.locator('.obstacle [data-generated-asset="frog-orange"]')).toBeVisible();
    await expect(board.locator('desc')).toContainText('impose un saut de deux unités comptant pour une action');
    input = root.locator('[data-smoke-input-value]');
    await input.fill('5');
    await expect(root).toHaveAttribute('data-smoke-state', 'success');
    expect(await lineGeometry(successMap.locator('.target-line'))).toEqual([20, 60, 80, 60]);
    expect(await lineGeometry(successMap.locator('.completed-line.double'))).toEqual([40, 60, 60, 60]);
    await root.locator('[data-smoke-action="continue"]').click();

    const completion = root.locator('[data-smoke-completion]');
    await expect(completion).toBeVisible();
    const outro = completion.locator('[data-visual-role="pond-outro"]');
    await expect(outro).toBeVisible();
    await expect(outro).toHaveAttribute('alt', '');
    await expect(outro).toHaveAttribute('aria-hidden', 'true');
    const outroSource = await outro.getAttribute('src');
    expect(outroSource).toContain('pond-garden-outro');
    expect(outroSource).not.toBe(introSource);
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
    await expect(root.locator('.landing-ripple')).toHaveCount(2);
    await expect(root.locator('.landing-ripple').first()).toBeVisible();
    expect(
      await root.locator('.landing-ripple').first().evaluate((element) => getComputedStyle(element).animationName)
    ).toBe('none');

    const caustics = root.locator('[data-pond-stage] [data-water-caustics]');
    await expect(caustics).toBeVisible();
    for (const layer of [
      caustics.locator('.water-noise-a'),
      caustics.locator('.water-noise-b').first()
    ]) {
      expect(
        await layer.evaluate((element) => ({
          animation: getComputedStyle(element).animationName,
          transform: getComputedStyle(element).transform,
          opacity: Number(getComputedStyle(element).opacity)
        }))
      ).toMatchObject({ animation: 'none', transform: 'none' });
      expect(
        await layer.evaluate((element) => Number(getComputedStyle(element).opacity))
      ).toBeGreaterThan(0);
    }
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});
