import { expect, test } from '@playwright/test';
import {
  createNumberPatternRace,
  type MotionPreference,
  type NumberPatternRace,
  type RaceUpdate
} from '../../src/exercises/ex-0007-number-pattern-graybox/race-model';

function startRace(motion: MotionPreference = 'full', at = 0): { race: NumberPatternRace; update: RaceUpdate } {
  const race = createNumberPatternRace();
  return { race, update: race.send({ type: 'start', motion }, at) };
}

function solveCurrentScene(race: NumberPatternRace, answers: readonly [number, number][], at: number): RaceUpdate {
  let update = race.current();
  for (const [index, value] of answers) {
    update = race.send({ type: 'place', index, value }, at);
  }
  const arrival = at + update.view.runner.durationMs;
  return race.send({ type: 'time' }, arrival);
}

test('EX-0007 model stages the runner and owns preceding-cell travel geometry', () => {
  const { race, update: started } = startRace('full', 0);
  expect(started.view.screen).toBe('active');
  expect(started.view.runner).toEqual({ progress: 0, durationMs: 650, moving: false });
  expect(started.needsTimeUpdates).toBe(true);

  const launched = race.send({ type: 'time' }, 16);
  expect(launched.view.runner.progress).toBe(50);
  expect(launched.view.runner.durationMs).toBe(900);
  expect(launched.view.currentHole).toBe(3);

  const finishing = race.send({ type: 'place', index: 3, value: 12 }, 20);
  expect(finishing.view.screen).toBe('active');
  expect(finishing.view.currentHole).toBeNull();
  expect(finishing.view.runner.progress).toBe(100);
  expect(finishing.view.runner.durationMs).toBe(900);
  const ignoredSelection = race.send({ type: 'select', value: 11, source: 'pointer' }, 21);
  expect(ignoredSelection.view.selectedNumber).toBeNull();
  expect(ignoredSelection.effects).toEqual([]);

  expect(race.send({ type: 'time' }, 919).view.screen).toBe('active');
  const success = race.send({ type: 'time' }, 920);
  expect(success.view.screen).toBe('success');
  expect(success.view.message).toContain('pas +3');
  expect(success.effects).toContainEqual({ type: 'focus', target: 'success-feedback' });

  race.send({ type: 'continue', motion: 'full' }, 921);
  const secondLaunch = race.send({ type: 'time' }, 937);
  expect(secondLaunch.view.scene.id).toBe('infer');
  expect(secondLaunch.view.runner.progress).toBeCloseTo(8.333333, 5);
  expect(secondLaunch.view.runner.durationMs).toBe(650);

  const nextStop = race.send({ type: 'place', index: 1, value: 13 }, 940);
  expect(nextStop.view.runner.progress).toBeCloseTo(58.333333, 5);
  expect(nextStop.view.runner.durationMs).toBe(900);
  expect(nextStop.view.currentHole).toBe(4);
});

test('EX-0007 model keeps wrong answers actionable and expires their feedback after 800ms', () => {
  const { race } = startRace('full', 0);
  race.send({ type: 'time' }, 16);
  let update = solveCurrentScene(race, [[3, 12]], 20);
  expect(update.view.screen).toBe('success');

  race.send({ type: 'continue', motion: 'full' }, 921);
  race.send({ type: 'time' }, 937);
  const wrong = race.send({ type: 'place', index: 1, value: 12 }, 1_000);
  expect(wrong.view.messageKind).toBe('error');
  expect(wrong.view.mistakeIndex).toBe(1);
  expect(wrong.view.availableNumbers).toContain(12);
  expect(wrong.view.currentHole).toBe(1);
  expect(wrong.view.timeLeft).toBeGreaterThan(0);

  const stillVisible = race.send({ type: 'time' }, 1_799);
  expect(stillVisible.view.mistakeIndex).toBe(1);
  const recovered = race.send({ type: 'time' }, 1_800);
  expect(recovered.view.mistakeIndex).toBeNull();
  expect(recovered.view.messageKind).toBe('instruction');
  expect(recovered.view.currentHole).toBe(1);
  expect(recovered.effects).toContainEqual({ type: 'clear-announcement' });

  const correct = race.send({ type: 'place', index: 1, value: 13 }, 1_801);
  expect(correct.view.placements[1]).toBe(13);
  expect(correct.view.availableNumbers).toContain(12);
  expect(correct.view.currentHole).toBe(4);
});

test('EX-0007 model preserves timeout outcomes while reduced motion keeps the rival static', () => {
  const { race } = startRace('reduced', 100);
  const launched = race.send({ type: 'time' }, 116);
  expect(launched.view.runner.progress).toBe(50);
  expect(launched.view.runner.durationMs).toBe(80);

  const halfway = race.send({ type: 'time' }, 11_100);
  expect(halfway.view.timeLeft).toBeCloseTo(11, 5);
  expect(halfway.view.opponentProgress).toBe(0);

  const lost = race.send({ type: 'time' }, 22_100);
  expect(lost.view.raceLost).toBe(true);
  expect(lost.view.timeLeft).toBe(0);
  expect(lost.view.opponentProgress).toBe(100);
  expect(lost.needsTimeUpdates).toBe(false);
  expect(lost.effects).toContainEqual(expect.objectContaining({ type: 'announce' }));

  const retried = race.send({ type: 'retry', motion: 'reduced' }, 22_101);
  expect(retried.view.scene.id).toBe('guided');
  expect(retried.view.raceLost).toBe(false);
  expect(retried.view.timeLeft).toBe(22);
  expect(retried.view.runner.progress).toBe(0);
});

test('EX-0007 model owns selection focus semantics and completes all authored scenes', () => {
  const { race } = startRace('reduced', 0);
  race.send({ type: 'time' }, 1);

  const keyboardSelection = race.send({ type: 'select', value: 12, source: 'keyboard' }, 2);
  expect(keyboardSelection.view.selectedNumber).toBe(12);
  expect(keyboardSelection.effects).toContainEqual({ type: 'focus', target: 'active-gap' });
  const pointerSelection = race.send({ type: 'select', value: 12, source: 'pointer' }, 3);
  expect(pointerSelection.view.selectedNumber).toBeNull();
  expect(pointerSelection.effects).not.toContainEqual(expect.objectContaining({ type: 'focus' }));

  let update = solveCurrentScene(race, [[3, 12]], 4);
  expect(update.view.screen).toBe('success');
  race.send({ type: 'continue', motion: 'reduced' }, 85);
  race.send({ type: 'time' }, 86);
  update = solveCurrentScene(race, [[1, 13], [4, 28]], 87);
  expect(update.view.screen).toBe('success');
  race.send({ type: 'continue', motion: 'reduced' }, 168);
  race.send({ type: 'time' }, 169);
  update = solveCurrentScene(race, [[1, 56], [4, 35]], 170);
  expect(update.view.screen).toBe('success');
  expect(update.view.scene.step).toBe(-7);
  expect(update.view.scene.stepLabel).toBe('−7');
  expect(update.view.completedRuleLabels).toEqual(['+3', '+5', '−7']);

  const complete = race.send({ type: 'continue', motion: 'reduced' }, 251);
  expect(complete.view.screen).toBe('complete');
  expect(complete.effects).toContainEqual({ type: 'focus', target: 'completion' });
  const restarted = race.send({ type: 'restart' }, 252);
  expect(restarted.view.screen).toBe('ready');
  expect(restarted.view.sceneIndex).toBe(0);
});

test('EX-0007 model resolves pupil input against the authoritative race deadline', () => {
  const beforeDeadline = startRace('full', 0).race;
  const accepted = beforeDeadline.send({ type: 'place', index: 3, value: 12 }, 21_999);
  expect(accepted.view.raceLost).toBe(false);
  expect(accepted.view.placements[3]).toBe(12);

  const atDeadline = startRace('full', 0).race;
  const lostAtBoundary = atDeadline.send({ type: 'place', index: 3, value: 12 }, 22_000);
  expect(lostAtBoundary.view.raceLost).toBe(true);
  expect(lostAtBoundary.view.placements[3]).toBeUndefined();
  expect(lostAtBoundary.view.opponentProgress).toBe(100);

  const afterDeadline = startRace('full', 0).race;
  const lostAfterBoundary = afterDeadline.send({ type: 'select', value: 12, source: 'pointer' }, 22_001);
  expect(lostAfterBoundary.view.raceLost).toBe(true);
  expect(lostAfterBoundary.view.selectedNumber).toBeNull();
});

test('EX-0007 model clamps stale timestamps and rejects non-finite time', () => {
  const { race } = startRace('full', 100);
  race.send({ type: 'time' }, 1_100);
  const stale = race.send({ type: 'time' }, 500);
  expect(stale.view.timeLeft).toBeCloseTo(21, 5);
  expect(() => race.send({ type: 'time' }, Number.NaN)).toThrow(/finite milliseconds/);
});
