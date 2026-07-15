import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { discoverSmokeManifest, selectSmokeTargets, type SmokeTarget } from './catalog';
import { runKeyboardContract, runTouchContract } from './contract';
import { createGuardedPage } from './guard';

const manifest = await discoverSmokeManifest();
const targets = selectSmokeTargets(manifest.targets);
const fixtureTarget: SmokeTarget = {
  id: 'harness-fixture',
  title: 'Harness contract fixture',
  programId: 'smoke-fixture',
  domain: 'verification',
  cluster: 'verification',
  lens: 'verification'
};

function baseUrlFor(testInfo: TestInfo): string {
  const baseUrl = testInfo.project.use.baseURL;
  if (typeof baseUrl !== 'string') throw new Error('Playwright baseURL is not configured.');
  return baseUrl;
}

async function focusLegacyPrototype(page: Page): Promise<void> {
  const mount = page.locator('.prototype-mount');
  await expect(mount).toBeVisible();
  await expect(mount.locator('.prototype-root')).toBeVisible();

  for (let press = 0; press < 100; press += 1) {
    await page.keyboard.press('Tab');
    const focusedInside = await mount.evaluate(
      (element) => document.activeElement !== document.body && element.contains(document.activeElement)
    );
    if (focusedInside) return;
  }

  throw new Error('EX-0001 did not expose a focusable prototype control.');
}

test('SMOKE_EXERCISES accepts any explicit set of distinct discovered prototypes', () => {
  const discovered = ['alpha', 'beta', 'gamma'].map(
    (id, index): SmokeTarget => ({ ...fixtureTarget, id, lens: `lens-${index + 1}` })
  );

  expect(selectSmokeTargets(discovered, 'alpha').map((target) => target.id)).toEqual(['alpha']);
  expect(selectSmokeTargets(discovered, 'alpha,gamma').map((target) => target.id)).toEqual([
    'alpha',
    'gamma'
  ]);
  expect(() => selectSmokeTargets(discovered, '')).toThrow(/one or more distinct/);
  expect(() => selectSmokeTargets(discovered, 'alpha,alpha')).toThrow(/one or more distinct/);
  expect(() => selectSmokeTargets(discovered, 'alpha,unknown')).toThrow(/not discovered/);
});

test('the harness rejects stale, ambiguous, non-tabbable, networked, and auxiliary-realm fixtures', async ({
  browser
}, testInfo) => {
  for (const violation of ['stale-error', 'inactive', 'focus', 'fetch', 'frame']) {
    await test.step(violation, async () => {
      const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
        viewport: { width: 1280, height: 800 },
        hasTouch: false,
        reducedMotion: 'reduce'
      });

      try {
        await guarded.page.goto(
          `/tests/smoke/contract-fixture.html?violation=${encodeURIComponent(violation)}`
        );
        await expect(
          runKeyboardContract(guarded.page, fixtureTarget, guarded.assertClean)
        ).rejects.toThrow();
      } finally {
        await guarded.close();
      }
    });
  }
});

test('the generic contract driver completes its keyboard and touch paths', async ({
  browser
}, testInfo) => {
  await test.step('reduced-motion keyboard path', async () => {
    const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
      viewport: { width: 1280, height: 800 },
      hasTouch: false,
      reducedMotion: 'reduce'
    });

    try {
      await guarded.page.goto('/tests/smoke/contract-fixture.html');
      await runKeyboardContract(guarded.page, fixtureTarget, guarded.assertClean);
    } finally {
      await guarded.close();
    }
  });

  await test.step('320px touch path', async () => {
    const viewport = { width: 320 as const, height: 800 };
    const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
      viewport,
      hasTouch: true,
      isMobile: true
    });

    try {
      await guarded.page.goto('/tests/smoke/contract-fixture.html');
      await runTouchContract(guarded.page, fixtureTarget, viewport, guarded.assertClean);
    } finally {
      await guarded.close();
    }
  });
});

test('EX-0001 remains loadable and focusable', async ({ browser }, testInfo) => {
  const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
    viewport: { width: 1280, height: 800 },
    hasTouch: false
  });

  try {
    await guarded.page.goto(`/runner/?id=${encodeURIComponent(manifest.legacyId)}`);
    await focusLegacyPrototype(guarded.page);
    await guarded.assertClean();
  } finally {
    await guarded.close();
  }
});

test(`all selected ${manifest.programId} prototypes complete the keyboard mechanic path`, async ({
  browser
}, testInfo) => {
  testInfo.annotations.push({
    type: 'smoke-targets',
    description: targets.length > 0 ? targets.map((target) => target.id).join(',') : 'none discovered'
  });

  for (const target of targets) {
    await test.step(`${target.id} · ${target.domain} · ${target.cluster} · ${target.lens}`, async () => {
      const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
        viewport: { width: 1280, height: 800 },
        hasTouch: false,
        reducedMotion: 'reduce'
      });

      try {
        await guarded.page.goto(`/runner/?id=${encodeURIComponent(target.id)}`);
        await runKeyboardContract(guarded.page, target, guarded.assertClean);
      } finally {
        await guarded.close();
      }
    });
  }
});

test(`all selected ${manifest.programId} prototypes complete the 320px touch mechanic path`, async ({
  browser
}, testInfo) => {
  testInfo.annotations.push({
    type: 'smoke-targets',
    description: targets.length > 0 ? targets.map((target) => target.id).join(',') : 'none discovered'
  });

  for (const target of targets) {
    await test.step(`${target.id} · ${target.domain} · ${target.cluster} · ${target.lens}`, async () => {
      const viewport = { width: 320 as const, height: 800 };
      const guarded = await createGuardedPage(browser, baseUrlFor(testInfo), {
        viewport,
        hasTouch: true,
        isMobile: true
      });

      try {
        await guarded.page.goto(`/runner/?id=${encodeURIComponent(target.id)}`);
        await runTouchContract(guarded.page, target, viewport, guarded.assertClean);
      } finally {
        await guarded.close();
      }
    });
  }
});
