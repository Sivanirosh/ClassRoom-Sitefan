import { expect, test, type Locator, type Page, type TestInfo } from '@playwright/test';
import { createGuardedPage } from './guard';

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
}

async function expectDecodedArtwork(image: Locator, minimumWidth = 1_000): Promise<void> {
  await expect(image).toHaveCount(1);
  await expect.poll(() => image.evaluate((node) => {
    if (!(node instanceof HTMLImageElement)) return 0;
    return node.complete ? node.naturalWidth : 0;
  })).toBeGreaterThanOrEqual(minimumWidth);
}

async function solveScene(page: Page, repairs: ReadonlyArray<readonly [number, number]>): Promise<void> {
  for (const [value, slot] of repairs) {
    await page.locator(`[data-smoke-control="tile-${value}"]`).click();
    await page.locator(`[data-smoke-control="slot-${slot}"]`).click();
  }
}

test('EX-0007 aligns each race segment and keeps an ordinary mistake actionable', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 900 },
    hasTouch: false,
    reducedMotion: 'no-preference'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0007');
    await page.evaluate(() => {
      const state = window as Window & { __ex0007RunnerPositions?: string[] };
      state.__ex0007RunnerPositions = [];
      const capture = (): void => {
        const style = document.querySelector('.race-runner')?.getAttribute('style');
        if (style) state.__ex0007RunnerPositions?.push(style);
      };
      new MutationObserver(capture).observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
        childList: true,
        subtree: true
      });
    });

    await page.locator('[data-smoke-action="start"]').click();
    const runner = page.locator('.race-runner');
    await expect(page.locator('.sky-segment')).toHaveCount(5);
    await expect(page.locator('.term')).toHaveCount(5);
    await expect(runner).toHaveAttribute('style', /--runner-duration: 900ms; left: 50%/);
    await expect(runner).toHaveCSS('transition-duration', '0.9s');
    await expect(runner).toHaveCSS('transition-timing-function', 'linear');
    await expect.poll(() => page.evaluate(() => (
      (window as Window & { __ex0007RunnerPositions?: string[] }).__ex0007RunnerPositions ?? []
    ))).toEqual(expect.arrayContaining([expect.stringMatching(/left: 0%/), expect.stringMatching(/left: 50%/)]));

    await page.waitForTimeout(950);
    const firstStopAlignment = await page.evaluate(() => {
      const runnerRect = document.querySelector('.race-runner')!.getBoundingClientRect();
      const previousTermRect = document.querySelectorAll('.term')[2].getBoundingClientRect();
      return Math.abs((runnerRect.left + runnerRect.width / 2) - (previousTermRect.left + previousTermRect.width / 2));
    });
    expect(firstStopAlignment, 'runner must stop on the cell before the missing term').toBeLessThanOrEqual(1);

    await page.locator('[data-smoke-control="tile-12"]').click();
    await page.locator('[data-smoke-control="slot-3"]').click();
    await page.locator('[data-smoke-action="continue"]').click();

    await expect(page.locator('.sky-segment')).toHaveCount(6);
    await expect(page.locator('.term')).toHaveCount(6);
    await expect(runner).toHaveAttribute('style', /--runner-duration: 650ms; left: 8\.333/);
    await expect(runner).toHaveCSS('transition-duration', '0.65s');
    const secondScenePositions = await page.evaluate(() => (
      (window as Window & { __ex0007RunnerPositions?: string[] }).__ex0007RunnerPositions ?? []
    ));
    expect(secondScenePositions.filter((style) => /left: 0%/.test(style)).length).toBeGreaterThanOrEqual(2);

    const wrongTile = page.locator('[data-smoke-control="tile-12"]');
    const currentSlot = page.locator('[data-smoke-control="slot-1"]');
    await wrongTile.click();
    await currentSlot.click();

    const root = page.locator('[data-smoke-root]');
    await expect(root.locator('[data-smoke-feedback="error"][data-smoke-feedback-detail]')).toBeVisible();
    await expect(root.locator('[data-smoke-feedback="error"]')).toHaveCount(1);
    await expect(root.locator('.workbench [data-smoke-feedback="error"]')).toContainText('nombre manquant');
    await expect(root).not.toHaveAttribute('data-smoke-recovery-plan');
    await expect(page.locator('[data-smoke-control="retry"]')).toHaveCount(0);
    await expect(wrongTile).toBeEnabled();
    await expect(currentSlot).toBeEnabled();
    await expect(page.locator('.term').nth(1)).toHaveClass(/mistake/);
    await expect(page.locator('.term').nth(1).locator('.mistake-mark')).toContainText('×');

    const liveRegion = root.locator(':scope > [aria-live="polite"]');
    await expect(liveRegion).toContainText('12 ne suit pas');
    await expect(root.locator('[data-smoke-feedback="error"]')).toHaveCount(0, { timeout: 1_500 });
    await expect(page.locator('.term').nth(1)).not.toHaveClass(/mistake/);
    await expect(liveRegion).toHaveText('');

    await wrongTile.click();
    await currentSlot.click();
    await expect(liveRegion).toContainText('12 ne suit pas');

    await page.locator('[data-smoke-control="tile-13"]').click();
    await currentSlot.click();

    const repairedTerm = page.locator('.term').nth(1);
    await expect(repairedTerm).toHaveClass(/filled/);
    await expect(repairedTerm).not.toHaveClass(/mistake/);
    await expect(repairedTerm).toContainText('13');
    await expect(repairedTerm.locator('.slot')).toHaveCount(0);
    await expect(root.locator('[data-smoke-feedback="error"]')).toHaveCount(0);
    await expect(runner).toHaveAttribute('style', /--runner-duration: 900ms; left: 58\.333/);
    await expect(runner).toHaveCSS('transition-duration', '0.9s');
    await expect(runner).toHaveCSS('transition-timing-function', 'linear');

    const runnerBox = await runner.boundingBox();
    expect(runnerBox, 'runner must remain visibly recognizable on the track').not.toBeNull();
    expect(runnerBox!.width).toBeGreaterThanOrEqual(36);
    expect(runnerBox!.height).toBeGreaterThanOrEqual(30);
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0007 presents the side-profile path race and supports keyboard tile-to-slot placement', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 900 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0007');

    const root = page.locator('[data-smoke-root]');
    await expect(page.locator('#intro-title')).toHaveText('La Course du Sentier');
    await expect(page.getByText('Le pas caché · Mission du matin')).toBeVisible();
    await expect(page.locator('.intro .tutorial-steps, .intro .round-tutorial')).toHaveCount(0);
    await expect(page.locator('[data-smoke-action="start"]')).toHaveText('Commencer la mission');
    expect(await root.evaluate((element) => getComputedStyle(element).colorScheme)).toBe('light');
    expect(await root.evaluate((element) => {
      const style = getComputedStyle(element);
      return ['--ink', '--sky', '--leaf', '--sun', '--coral'].map((token) => style.getPropertyValue(token).trim());
    })).toEqual(['#345b73', '#99e2f2', '#9bd991', '#f2d06b', '#f29f80']);
    await expect(page.locator('meta[name="darkreader-lock"]')).toHaveCount(1);

    await page.locator('[data-smoke-action="start"]').click();
    await expect(page.locator('#scene-title')).toHaveText('Répare la première brèche');
    const firstRoundTutorial = page.locator('.round-tutorial');
    await expect(firstRoundTutorial.locator('.tutorial-steps li')).toHaveCount(3);
    await expect(firstRoundTutorial).toContainText('Repère le pas qui se répète');
    await expect(firstRoundTutorial).toContainText('Glisse un nombre sur le ?');
    await expect(firstRoundTutorial).toContainText('En cas d’erreur, essaie encore');
    const tutorialLayout = await page.evaluate(() => {
      const workbench = document.querySelector('.workbench')!.getBoundingClientRect();
      const steps = document.querySelector('.round-tutorial')!.getBoundingClientRect();
      return { workbenchBottom: workbench.bottom, stepsTop: steps.top };
    });
    expect(tutorialLayout.stepsTop - tutorialLayout.workbenchBottom, 'first-round tutorial belongs below the answer dock').toBeGreaterThanOrEqual(12);
    await expect(page.locator('.ground-piece')).toHaveCount(5);
    await expect(page.locator('.course-label, .race-callout, .panel-label, .repair-count')).toHaveCount(0);
    await expect(page.locator('.term small:not(.sr-only), .slot small:not(.sr-only), .selection-guidance:not(.sr-only)')).toHaveCount(0);
    await expect(page.locator('.scene-heading .sr-only')).toContainText('Complète la suite');
    await expect(page.locator('.given-rule')).toHaveText('+3');

    const flyer = page.locator('.race-flyer');
    const flyerStartX = (await flyer.boundingBox())?.x;
    await page.waitForTimeout(400);
    const flyerLaterX = (await flyer.boundingBox())?.x;
    expect(flyerStartX).toBeDefined();
    expect(flyerLaterX).toBeDefined();
    expect(Math.abs(flyerLaterX! - flyerStartX!), 'reduced motion keeps the rival visually static while the clock runs').toBeLessThanOrEqual(1);

    const profileGeometry = await page.evaluate(() => {
      const rectangle = (selector: string): DOMRect => document.querySelector(selector)!.getBoundingClientRect();
      const timer = rectangle('.timer');
      const timerValue = rectangle('.timer span');
      const timerUnit = rectangle('.timer small');
      const runner = rectangle('.race-runner');
      const intactGround = rectangle('.term:nth-child(3) .ground-piece');
      const fallenGround = rectangle('.term:nth-child(4) .ground-piece');
      const timerStyle = getComputedStyle(document.querySelector('.timer')!);
      const timerCrown = getComputedStyle(document.querySelector('.timer')!, '::before');
      return {
        runnerFootOffset: runner.bottom - intactGround.top,
        fallenOffset: fallenGround.top - intactGround.top,
        timerContentCenterX: (Math.min(timerValue.left, timerUnit.left) + Math.max(timerValue.right, timerUnit.right)) / 2,
        timerContentCenterY: (Math.min(timerValue.top, timerUnit.top) + Math.max(timerValue.bottom, timerUnit.bottom)) / 2,
        timerCenterX: timer.left + timer.width / 2,
        timerCenterY: timer.top + timer.height / 2,
        timerPosition: timerStyle.position,
        timerCrownTop: timerCrown.top,
        timerCrownTransform: timerCrown.transform
      };
    });
    expect(Math.abs(profileGeometry.runnerFootOffset), 'runner feet must sit on the intact ground surface').toBeLessThanOrEqual(5);
    expect(profileGeometry.fallenOffset, 'the missing numbered ground section must visibly lie below the running surface').toBeGreaterThanOrEqual(40);
    expect(Math.abs(profileGeometry.timerContentCenterX - profileGeometry.timerCenterX), 'timer value must be horizontally centered').toBeLessThanOrEqual(3);
    expect(Math.abs(profileGeometry.timerContentCenterY - profileGeometry.timerCenterY), 'timer value must be vertically centered').toBeLessThanOrEqual(4);
    expect(profileGeometry.timerPosition).toBe('relative');
    expect(profileGeometry.timerCrownTop).toBe('-12px');
    expect(profileGeometry.timerCrownTransform).not.toBe('none');
    await expect(page.locator('.term > .ground-piece')).toHaveCount(5);

    await expect(page.locator('.topbar li[aria-current="step"]')).toHaveCount(1);
    await expect(page.locator('.topbar li[aria-current="step"]')).toHaveAttribute('aria-label', 'Étape 1 en cours');
    await expect(page.locator('[data-smoke-control="slot-3"]')).toContainText('À réparer');

    const tile = page.locator('[data-smoke-control="tile-12"]');
    const tileNumber = tile.locator('.tile-number');
    const slot = page.locator('#path-slot-3');
    await expect(tileNumber).toHaveCSS('background-color', 'rgb(255, 250, 240)');
    await expect(tileNumber).toHaveCSS('border-top-width', '2px');
    await expect(tileNumber).toHaveCSS('text-shadow', 'none');
    const tileNumberGeometry = await tile.evaluate((button) => {
      const tileRect = button.getBoundingClientRect();
      const numberRect = button.querySelector('.tile-number')!.getBoundingClientRect();
      return {
        horizontalOffset: Math.abs((tileRect.left + tileRect.width / 2) - (numberRect.left + numberRect.width / 2)),
        verticalOffset: Math.abs((tileRect.top + tileRect.height / 2) - (numberRect.top + numberRect.height / 2)),
        badgeNarrowerThanTile: numberRect.width < tileRect.width,
        badgeShorterThanTile: numberRect.height < tileRect.height
      };
    });
    expect(tileNumberGeometry.horizontalOffset).toBeLessThanOrEqual(1);
    expect(tileNumberGeometry.verticalOffset).toBeLessThanOrEqual(1);
    expect(tileNumberGeometry.badgeNarrowerThanTile).toBe(true);
    expect(tileNumberGeometry.badgeShorterThanTile).toBe(true);
    await tile.focus();
    await tile.press('Enter');
    await expect(slot).toBeFocused();
    await expect(page.locator('#dock-guidance')).toContainText('12 sélectionné → brèche 4');
    await slot.press('Enter');
    await expect(page.locator('.term').nth(3)).toContainText('✓ Reconstruite');

    await page.locator('[data-smoke-action="continue"]').click();
    await expect(page.locator('#scene-title')).toHaveText('Traverse le col');
    await expect(page.locator('.round-tutorial, .tutorial-steps')).toHaveCount(0);
    await expect(page.locator('[data-smoke-control="slot-1"]')).toContainText('À réparer');
    await expect(page.locator('[data-smoke-control="slot-4"]')).toContainText('Ensuite');
    await expect(page.locator('.topbar li').first()).toHaveText('✓');
    await expect(page.locator('.topbar li').first()).toHaveAttribute('aria-label', 'Étape 1 terminée');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0007 accepts a correct drag near the outer edge of its real drop halo', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 900 },
    hasTouch: false,
    reducedMotion: 'no-preference'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0007');
    await page.locator('[data-smoke-action="start"]').click();
    await page.locator('[data-smoke-control="tile-12"]').click();
    await page.locator('[data-smoke-control="slot-3"]').click();
    await page.locator('[data-smoke-action="continue"]').click();

    const runner = page.locator('.race-runner');
    await expect(runner).toHaveAttribute('style', /left: 8\.333/);

    const target = page.locator('[data-smoke-control="slot-1"]');
    const targetTerm = page.locator('.term').nth(1);
    const [targetBox, termBox] = await Promise.all([target.boundingBox(), targetTerm.boundingBox()]);
    expect(targetBox).not.toBeNull();
    expect(termBox).not.toBeNull();
    expect(termBox!.y - targetBox!.y, 'real drop target must extend into a forgiving halo').toBeGreaterThanOrEqual(16);

    const source = page.locator('[data-smoke-control="tile-13"]');
    const sourceBox = await source.boundingBox();
    expect(sourceBox).not.toBeNull();
    const visualTransfer = await page.evaluateHandle(() => new DataTransfer());
    await source.dispatchEvent('dragstart', {
      dataTransfer: visualTransfer,
      clientX: sourceBox!.x + sourceBox!.width / 2,
      clientY: sourceBox!.y + sourceBox!.height / 2
    });
    await target.dispatchEvent('dragover', {
      dataTransfer: visualTransfer,
      clientX: targetBox!.x + targetBox!.width / 2,
      clientY: targetBox!.y + 4
    });

    const dragPreview = page.locator('[data-drag-preview]');
    await expect(dragPreview).toBeVisible();
    await expect(dragPreview).toHaveText('13');
    await expect(dragPreview.locator(':scope > span')).toHaveClass(/over-target/);
    await expect(dragPreview.locator('.tile-number')).toHaveCSS('background-color', 'rgb(255, 250, 240)');
    await expect(source).toHaveClass(/dragging/);
    await expect(targetTerm).toHaveClass(/drag-over/);
    await source.dispatchEvent('dragend', { dataTransfer: visualTransfer });
    await expect(dragPreview).toHaveCount(0);
    await expect(targetTerm).not.toHaveClass(/drag-over/);

    await page.evaluate(() => {
      document.documentElement.dataset.ex0007LandingAnimation = 'false';
      const recordLanding = (event: AnimationEvent) => {
        if (event.animationName !== 'ex0007-ground-land') return;
        document.documentElement.dataset.ex0007LandingAnimation = 'true';
        document.removeEventListener('animationstart', recordLanding);
      };
      document.addEventListener('animationstart', recordLanding);
    });

    const haloDropY = 4;
    expect(targetBox!.y + haloDropY, 'drop point must sit above the visible term card').toBeLessThan(termBox!.y);
    await source.dragTo(target, {
      targetPosition: { x: targetBox!.width / 2, y: haloDropY }
    });

    const repairedTerm = page.locator('.term').nth(1);
    await expect(repairedTerm).toHaveClass(/filled/);
    await expect(repairedTerm).toContainText('13');
    await expect(repairedTerm.locator('.slot')).toHaveCount(0);
    await expect(page.locator('html')).toHaveAttribute('data-ex0007-landing-animation', 'true');
    await expect(runner).toHaveAttribute('style', /--runner-duration: 900ms; left: 58\.333/);
    await expect(runner).toHaveCSS('transition-duration', '0.9s');
    await expect(runner).toHaveCSS('transition-timing-function', 'linear');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});


test('EX-0007 loads three generated locations and three-frame courier sprites without moving the race geometry into art', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 900 },
    hasTouch: false,
    reducedMotion: 'no-preference'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0007');
    await expectDecodedArtwork(page.locator('[data-ex0007-art="intro"] img'));

    await page.locator('[data-smoke-action="start"]').click();
    const card = page.locator('.race-card');
    await expect(card).toHaveAttribute('data-location', 'guided');
    expect(await card.evaluate((node) => getComputedStyle(node).backgroundImage)).toContain('departure');

    const runner = page.locator('[data-ex0007-sprite="runner"]');
    const flyer = page.locator('[data-ex0007-sprite="flyer"]');
    await expect(runner).toHaveAttribute('data-frame-count', '3');
    await expect(flyer).toHaveAttribute('data-frame-count', '3');
    await expect(runner.locator('.sprite-frame')).toHaveCount(3);
    await expect(flyer.locator('.sprite-frame')).toHaveCount(3);
    await expect.poll(() => runner.locator('.sprite-frame').evaluateAll((images) => images.every((node) => node instanceof HTMLImageElement && node.complete && node.naturalWidth === 512))).toBe(true);
    await expect.poll(() => flyer.locator('.sprite-frame').evaluateAll((images) => images.every((node) => node instanceof HTMLImageElement && node.complete && node.naturalWidth === 520))).toBe(true);
    await expect(runner).toHaveClass(/running/);
    expect(await runner.locator('.sprite-frame').first().evaluate((node) => getComputedStyle(node).animationName)).toBe('ex0007-runner-frame-one');
    expect(await flyer.locator('.sprite-frame').first().evaluate((node) => getComputedStyle(node).animationName)).toBe('ex0007-flyer-frame-one');

    const groundImages = await page.locator('.ground-piece').evaluateAll((pieces) => pieces.map((node) => getComputedStyle(node).backgroundImage));
    expect(groundImages).toHaveLength(5);
    expect(groundImages.every((image) => image.includes('ground-'))).toBe(true);

    await solveScene(page, [[12, 3]]);
    await expect(page.locator('[data-smoke-action="continue"]')).toBeVisible();
    await page.locator('[data-smoke-action="continue"]').click();
    await expect(card).toHaveAttribute('data-location', 'infer');
    expect(await card.evaluate((node) => getComputedStyle(node).backgroundImage)).toContain('mountain-pass');

    await solveScene(page, [[13, 1], [28, 4]]);
    await expect(page.locator('[data-smoke-action="continue"]')).toBeVisible();
    await page.locator('[data-smoke-action="continue"]').click();
    await expect(card).toHaveAttribute('data-location', 'descending');
    expect(await card.evaluate((node) => getComputedStyle(node).backgroundImage)).toContain('refuge');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test('EX-0007 renders generated success, victory, and dignified retry art with reduced-motion sprite fallbacks', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 900 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0007');
    await page.locator('[data-smoke-action="start"]').click();
    const spriteFrames = page.locator('[data-ex0007-sprite] .sprite-frame');
    expect(await spriteFrames.evaluateAll((frames) => frames.every((node) => getComputedStyle(node).animationName === 'none'))).toBe(true);

    await solveScene(page, [[12, 3]]);
    await expectDecodedArtwork(page.locator('[data-ex0007-art="round-success"] .outcome-art'));
    await page.locator('[data-smoke-action="continue"]').click();
    await solveScene(page, [[13, 1], [28, 4]]);
    await page.locator('[data-smoke-action="continue"]').click();
    await solveScene(page, [[56, 1], [35, 4]]);
    await page.locator('[data-smoke-action="continue"]').click();
    await expectDecodedArtwork(page.locator('[data-ex0007-art="final-victory"] .outcome-art'));
    await expect(page.locator('[data-smoke-completion]')).toContainText('−7');
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }

  const timeout = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 900 },
    hasTouch: false,
    reducedMotion: 'reduce'
  });

  try {
    await timeout.context.addInitScript(() => {
      const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
      Object.defineProperty(window, 'requestAnimationFrame', {
        configurable: true,
        value(callback: FrameRequestCallback) {
          return nativeRequestAnimationFrame((timestamp) => callback(timestamp + 60_000));
        }
      });
    });
    await timeout.page.goto('/runner/?id=EX-0007');
    await timeout.page.locator('[data-smoke-action="start"]').click();
    await expect(timeout.page.locator('[data-smoke-control="retry"]')).toBeVisible();
    await expect(timeout.page.locator('.round-tutorial')).toHaveCount(0);
    await expectDecodedArtwork(timeout.page.locator('[data-ex0007-art="timeout-retry"] > img'));
    await expect(timeout.page.locator('[data-smoke-feedback="error"]')).toContainText('planeur');
    await timeout.assertClean();
  } finally {
    await timeout.close();
  }
});

test('EX-0007 keeps six shared course divisions in one aligned row at 320px', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 320, height: 800 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce'
  });

  try {
    const page = guarded.page;
    await page.goto('/runner/?id=EX-0007');
    await page.locator('[data-smoke-action="start"]').tap();
    await page.locator('[data-smoke-control="tile-12"]').tap();
    await page.locator('[data-smoke-control="slot-3"]').tap();
    await page.locator('[data-smoke-action="continue"]').tap();

    await expect(page.locator('.sky-segment')).toHaveCount(6);
    await expect(page.locator('.term')).toHaveCount(6);
    await expect(page.locator('.race-runner')).toHaveAttribute('style', /left: 8\.333/);
    await page.waitForTimeout(100);
    const geometry = await page.evaluate(() => {
      const rectangles = (selector: string): DOMRect[] => Array.from(document.querySelectorAll(selector), (node) => node.getBoundingClientRect());
      const sky = rectangles('.sky-segment');
      const terms = rectangles('.term');
      const firstTile = document.querySelector('[data-smoke-control^="tile-"]')?.getBoundingClientRect();
      const timerElement = document.querySelector('.timer')!;
      const timer = timerElement.getBoundingClientRect();
      const timerValue = timerElement.querySelector('span')!.getBoundingClientRect();
      const timerUnit = timerElement.querySelector('small')!.getBoundingClientRect();
      const arena = document.querySelector('.race-card')!.getBoundingClientRect();
      const runner = document.querySelector('.race-runner')!.getBoundingClientRect();
      const flyer = document.querySelector('.race-flyer')!.getBoundingClientRect();
      return {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        firstTileTop: firstTile?.top ?? Number.POSITIVE_INFINITY,
        termTops: terms.map((rect) => Math.round(rect.top)),
        centerOffsets: terms.map((rect, index) => Math.abs((rect.left + rect.width / 2) - (sky[index].left + sky[index].width / 2))),
        timerContentCenterX: (Math.min(timerValue.left, timerUnit.left) + Math.max(timerValue.right, timerUnit.right)) / 2,
        timerContentCenterY: (Math.min(timerValue.top, timerUnit.top) + Math.max(timerValue.bottom, timerUnit.bottom)) / 2,
        timerCenterX: timer.left + timer.width / 2,
        timerCenterY: timer.top + timer.height / 2,
        timerCrownContent: getComputedStyle(timerElement, '::before').content,
        timerPusherContent: getComputedStyle(timerElement, '::after').content,
        spriteVerticalGap: runner.top - flyer.bottom,
        runnerInset: Math.min(runner.left - arena.left, arena.right - runner.right),
        flyerInset: Math.min(flyer.left - arena.left, arena.right - flyer.right)
      };
    });

    expect(geometry.documentWidth).toBe(geometry.viewportWidth);
    expect(geometry.firstTileTop, 'the first actionable number must appear in the initial mobile viewport').toBeLessThan(geometry.viewportHeight);
    expect(new Set(geometry.termTops).size, 'all six terms must stay in one row').toBe(1);
    expect(Math.max(...geometry.centerOffsets), 'sky and ground segment centers must align').toBeLessThanOrEqual(1);
    expect(Math.abs(geometry.timerContentCenterX - geometry.timerCenterX), 'mobile timer value must stay horizontally centered').toBeLessThanOrEqual(3);
    expect(Math.abs(geometry.timerContentCenterY - geometry.timerCenterY), 'mobile timer value must stay vertically centered').toBeLessThanOrEqual(4);
    expect(geometry.timerCrownContent).not.toBe('none');
    expect(geometry.timerPusherContent).not.toBe('none');
    expect(geometry.spriteVerticalGap, 'runner and flyer canvases must not overlap at the first scene-two stop').toBeGreaterThanOrEqual(-1);
    expect(geometry.runnerInset, 'the runner sprite must remain inside the mobile arena').toBeGreaterThanOrEqual(0);
    expect(geometry.flyerInset, 'the flyer sprite must remain inside the mobile arena').toBeGreaterThanOrEqual(0);
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});
