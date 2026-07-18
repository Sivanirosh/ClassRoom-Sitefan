export type MotionPreference = 'full' | 'reduced';
export type SelectionSource = 'keyboard' | 'pointer' | 'drag';
export type RaceScreen = 'ready' | 'active' | 'success' | 'complete';
export type MessageKind = 'instruction' | 'action' | 'error';

export type RaceIntent =
  | { readonly type: 'start'; readonly motion: MotionPreference }
  | { readonly type: 'time' }
  | { readonly type: 'select'; readonly value: number; readonly source: SelectionSource }
  | { readonly type: 'place'; readonly index: number; readonly value?: number }
  | { readonly type: 'retry'; readonly motion: MotionPreference }
  | { readonly type: 'continue'; readonly motion: MotionPreference }
  | { readonly type: 'restart' };

export type FocusTarget =
  | 'intro-title'
  | 'scene-title'
  | 'active-gap'
  | 'success-feedback'
  | 'completion';

export type RaceEffect =
  | Readonly<{ type: 'announce'; message: string }>
  | Readonly<{ type: 'clear-announcement' }>
  | Readonly<{ type: 'focus'; target: FocusTarget }>;

export type SceneId = 'guided' | 'infer' | 'descending';

export interface SceneView {
  readonly id: SceneId;
  readonly eyebrow: string;
  readonly title: string;
  readonly prompt: string;
  readonly values: readonly number[];
  readonly missing: readonly number[];
  readonly step: number;
  readonly stepLabel: string;
  readonly tiles: readonly number[];
  readonly hint: string | null;
  readonly timeLimit: number;
}

export interface RaceView {
  readonly screen: RaceScreen;
  readonly sceneIndex: number;
  readonly sceneCount: number;
  readonly scene: SceneView;
  readonly completedRuleLabels: readonly string[];
  readonly selectedNumber: number | null;
  readonly placements: Readonly<Record<number, number>>;
  readonly solvedCount: number;
  readonly currentHole: number | null;
  readonly availableNumbers: readonly number[];
  readonly message: string;
  readonly messageKind: MessageKind;
  readonly raceStarted: boolean;
  readonly raceLost: boolean;
  readonly timeLeft: number;
  readonly opponentProgress: number;
  readonly runner: Readonly<{
    progress: number;
    durationMs: number;
    moving: boolean;
  }>;
  readonly mistakeIndex: number | null;
}

export interface RaceUpdate {
  readonly view: RaceView;
  readonly effects: readonly RaceEffect[];
  readonly needsTimeUpdates: boolean;
}

export interface NumberPatternRace {
  current(): RaceUpdate;
  send(intent: RaceIntent, nowMs: number): RaceUpdate;
}

type SceneInput = Omit<SceneView, 'step' | 'stepLabel' | 'hint'> & {
  readonly revealStep?: boolean;
};

type SessionStatus = 'ready' | 'racing' | 'finishing' | 'lost' | 'success' | 'complete';

type Session = {
  status: SessionStatus;
  sceneIndex: number;
  selectedNumber: number | null;
  placements: Readonly<Record<number, number>>;
  message: string;
  messageKind: MessageKind;
  mistakeIndex: number | null;
  mistakeUntil: number | null;
  motion: MotionPreference;
  startedAt: number;
  timeLeft: number;
  opponentProgress: number;
  runnerProgress: number;
  runnerDurationMs: number;
  runnerMoving: boolean;
  runnerArrivesAt: number | null;
  launchPending: boolean;
  lastNow: number;
};

const ERROR_DURATION_MS = 800;
const REDUCED_MOTION_TRAVEL_MS = 80;
const MINIMUM_TRAVEL_MS = 650;
const TRAVEL_MS_PER_PERCENT = 18;

const SCENES = defineScenes([
  {
    id: 'guided',
    eyebrow: 'Étape 1 · Le départ',
    title: 'Répare la première brèche',
    prompt: 'Complète la suite : retrouve le nombre de la portion de sentier effondrée.',
    values: [3, 6, 9, 12, 15],
    missing: [3],
    tiles: [11, 12, 13],
    revealStep: true,
    timeLimit: 22
  },
  {
    id: 'infer',
    eyebrow: 'Étape 2 · Le col',
    title: 'Traverse le col',
    prompt: 'Observe la suite et reconstruis les deux passages dans l’ordre.',
    values: [8, 13, 18, 23, 28, 33],
    missing: [1, 4],
    tiles: [12, 13, 15, 26, 28, 30],
    timeLimit: 34
  },
  {
    id: 'descending',
    eyebrow: 'Étape 3 · Le refuge',
    title: 'Redescends vers le refuge',
    prompt: 'La suite descend : retrouve les deux nombres manquants pour rejoindre le refuge.',
    values: [63, 56, 49, 42, 35, 28],
    missing: [1, 4],
    tiles: [54, 56, 58, 33, 35, 37],
    timeLimit: 32
  }
]);

const COMPLETED_RULE_LABELS = Object.freeze(SCENES.map((scene) => scene.stepLabel));

function signedStep(value: number): string {
  return value > 0 ? `+${value}` : `−${Math.abs(value)}`;
}

export function createNumberPatternRace(): NumberPatternRace {
  let session = initialSession();

  function current(): RaceUpdate {
    return updateFor(session, []);
  }

  function send(intent: RaceIntent, nowMs: number): RaceUpdate {
    const now = normalizeNow(nowMs);
    const effects: RaceEffect[] = [];

    if ((intent.type === 'select' || intent.type === 'place') && enforceDeadline(now, effects)) {
      return updateFor(session, effects);
    }

    switch (intent.type) {
      case 'start':
        if (session.status === 'ready') {
          loadScene(0, intent.motion, now);
          effects.push(
            { type: 'announce', message: 'Première étape lancée. Le coureur part vers la première brèche du sentier.' },
            { type: 'focus', target: 'scene-title' }
          );
        }
        break;
      case 'time':
        advanceTime(now, effects);
        break;
      case 'select':
        selectNumber(intent.value, intent.source, effects);
        break;
      case 'place':
        placeNumber(intent.index, intent.value, now, effects);
        break;
      case 'retry':
        if (session.status === 'lost') {
          loadScene(session.sceneIndex, intent.motion, now);
          effects.push(
            { type: 'announce', message: 'La même étape repart du début du sentier.' },
            { type: 'focus', target: 'scene-title' }
          );
        }
        break;
      case 'continue':
        if (session.status === 'success') {
          if (session.sceneIndex === SCENES.length - 1) {
            session.status = 'complete';
            effects.push(
              { type: 'announce', message: 'Mission accomplie. Les trois lignes sont rétablies.' },
              { type: 'focus', target: 'completion' }
            );
          } else {
            loadScene(session.sceneIndex + 1, intent.motion, now);
            effects.push(
              { type: 'announce', message: `${scene().eyebrow}. Nouvelle ligne chargée.` },
              { type: 'focus', target: 'scene-title' }
            );
          }
        }
        break;
      case 'restart':
        if (session.status === 'complete') {
          session = initialSession(now);
          effects.push(
            { type: 'announce', message: 'Retour à la présentation de la mission.' },
            { type: 'focus', target: 'intro-title' }
          );
        }
        break;
    }

    return updateFor(session, effects);
  }

  function normalizeNow(nowMs: number): number {
    if (!Number.isFinite(nowMs)) {
      throw new RangeError('Race timestamps must be finite milliseconds.');
    }
    session.lastNow = Math.max(session.lastNow, nowMs);
    return session.lastNow;
  }

  function loadScene(index: number, motion: MotionPreference, now: number): void {
    const nextScene = SCENES[index];
    session = {
      status: 'racing',
      sceneIndex: index,
      selectedNumber: null,
      placements: Object.freeze({}),
      message: baseMessage(nextScene),
      messageKind: 'instruction',
      mistakeIndex: null,
      mistakeUntil: null,
      motion,
      startedAt: now,
      timeLeft: nextScene.timeLimit,
      opponentProgress: 0,
      runnerProgress: 0,
      runnerDurationMs: MINIMUM_TRAVEL_MS,
      runnerMoving: false,
      runnerArrivesAt: null,
      launchPending: true,
      lastNow: now
    };
  }

  function advanceTime(now: number, effects: RaceEffect[]): void {
    settleRunner(now);

    if (session.status === 'finishing') {
      if (!session.runnerMoving) completeScene(effects);
      return;
    }

    if (session.status !== 'racing') return;

    const currentScene = scene();
    const elapsedSeconds = Math.max(0, (now - session.startedAt) / 1000);
    session.timeLeft = Math.max(0, currentScene.timeLimit - elapsedSeconds);
    if (session.motion === 'full') {
      session.opponentProgress = Math.min(100, (elapsedSeconds / currentScene.timeLimit) * 100);
    }

    if (session.timeLeft <= 0) {
      loseRace(effects);
      return;
    }

    expireMistake(now, effects);

    if (session.launchPending) {
      session.launchPending = false;
      const firstHole = currentScene.missing[0];
      moveRunnerTo(stopBeforeMissingTerm(firstHole, currentScene.values.length), now);
    }
  }

  function settleRunner(now: number): void {
    if (session.runnerArrivesAt === null || now < session.runnerArrivesAt) return;
    session.runnerMoving = false;
    session.runnerArrivesAt = null;
  }

  function expireMistake(now: number, effects: RaceEffect[]): void {
    if (session.mistakeUntil === null || now < session.mistakeUntil) return;
    const shouldResetMessage = session.messageKind === 'error';
    clearMistake();
    if (shouldResetMessage && session.status === 'racing') {
      session.message = baseMessage(scene());
      session.messageKind = 'instruction';
      effects.push({ type: 'clear-announcement' });
    }
  }

  function selectNumber(value: number, source: SelectionSource, effects: RaceEffect[]): void {
    if (!canAcceptPupilInput() || !availableNumbers().includes(value)) return;

    if (source === 'drag') {
      session.selectedNumber = value;
      return;
    }

    session.selectedNumber = session.selectedNumber === value ? null : value;
    session.message = session.selectedNumber === null
      ? 'Sélection annulée. Choisis un autre nombre.'
      : `${value} sélectionné. Place-le dans la brèche qui respecte le pas ${signedStep(scene().step)}.`;
    session.messageKind = 'action';
    effects.push({ type: 'announce', message: session.message });

    if (source === 'keyboard' && session.selectedNumber !== null && currentHole() !== null) {
      effects.push({ type: 'focus', target: 'active-gap' });
    }
  }

  function placeNumber(index: number, explicitValue: number | undefined, now: number, effects: RaceEffect[]): void {
    if (!canAcceptPupilInput() || session.placements[index] !== undefined) return;

    const activeHole = currentHole();
    if (index !== activeHole) {
      session.message = 'Reconstruis le sentier dans l’ordre. Commence par la première brèche qui bloque le coureur.';
      session.messageKind = 'instruction';
      effects.push({ type: 'announce', message: session.message });
      return;
    }

    const value = explicitValue ?? session.selectedNumber;
    if (value === null || value === undefined || !Number.isFinite(value)) {
      session.message = 'Choisis d’abord un nombre dans le quai, puis active la brèche.';
      session.messageKind = 'instruction';
      effects.push({ type: 'announce', message: session.message });
      return;
    }

    const currentScene = scene();
    const expected = currentScene.values[index];
    if (value !== expected) {
      clearMistake();
      session.message = `${value} ne suit pas le pas ${signedStep(currentScene.step)}. Le nombre manquant est ${expected} pour garder le même écart des deux côtés.`;
      session.messageKind = 'error';
      session.mistakeIndex = index;
      session.mistakeUntil = now + ERROR_DURATION_MS;
      session.selectedNumber = null;
      effects.push({ type: 'announce', message: session.message });
      return;
    }

    const shouldClearErrorAnnouncement = session.mistakeIndex !== null && session.messageKind === 'error';
    clearMistake();
    session.messageKind = 'action';
    session.message = `Portion ${index + 1} reconstruite avec ${expected}. Le coureur repart.`;
    session.placements = Object.freeze({ ...session.placements, [index]: value });
    session.selectedNumber = null;

    session.launchPending = false;
    const solvedCount = Object.keys(session.placements).length;
    const nextHole = currentHole();
    const destination = nextHole === null
      ? 100
      : stopBeforeMissingTerm(nextHole, currentScene.values.length);
    moveRunnerTo(destination, now);

    if (solvedCount === currentScene.missing.length) {
      session.status = 'finishing';
      if (shouldClearErrorAnnouncement) effects.push({ type: 'clear-announcement' });
      return;
    }

    const remaining = currentScene.missing.length - solvedCount;
    session.message = `Passage reconstruit avec ${expected}. Le coureur rejoint la prochaine brèche; il reste ${remaining} nombre manquant.`;
    effects.push({ type: 'announce', message: session.message });
  }

  function enforceDeadline(now: number, effects: RaceEffect[]): boolean {
    if (session.status !== 'racing') return false;
    const deadline = session.startedAt + scene().timeLimit * 1000;
    if (now < deadline) return false;
    session.timeLeft = 0;
    loseRace(effects);
    return true;
  }

  function loseRace(effects: RaceEffect[]): void {
    session.status = 'lost';
    session.selectedNumber = null;
    session.opponentProgress = 100;
    clearMistake();
    session.message = 'Le planeur a atteint l’arrivée pendant que le sentier restait coupé. Reprends la même étape et la même suite.';
    session.messageKind = 'error';
    effects.push({ type: 'announce', message: session.message });
  }

  function moveRunnerTo(progress: number, now: number): void {
    const distance = Math.abs(progress - session.runnerProgress);
    const duration = session.motion === 'reduced'
      ? REDUCED_MOTION_TRAVEL_MS
      : Math.max(MINIMUM_TRAVEL_MS, distance * TRAVEL_MS_PER_PERCENT);
    session.runnerDurationMs = duration;
    session.runnerProgress = progress;
    session.runnerMoving = true;
    session.runnerArrivesAt = now + duration;
  }

  function completeScene(effects: RaceEffect[]): void {
    session.status = 'success';
    session.message = `Suite complétée avec le pas ${signedStep(scene().step)}. Le sentier numérique est entièrement reconstruit.`;
    session.messageKind = 'action';
    effects.push(
      { type: 'announce', message: `Ligne rétablie. ${session.message}` },
      { type: 'focus', target: 'success-feedback' }
    );
  }

  function clearMistake(): void {
    session.mistakeIndex = null;
    session.mistakeUntil = null;
  }

  function canAcceptPupilInput(): boolean {
    return session.status === 'racing';
  }

  function currentHole(): number | null {
    return scene().missing.find((index) => session.placements[index] === undefined) ?? null;
  }

  function availableNumbers(): readonly number[] {
    const placedValues = new Set(Object.values(session.placements));
    return Object.freeze(scene().tiles.filter((tile) => !placedValues.has(tile)));
  }

  function scene(): SceneView {
    return SCENES[session.sceneIndex];
  }

  return { current, send };
}

function updateFor(session: Session, effects: readonly RaceEffect[]): RaceUpdate {
  const currentScene = SCENES[session.sceneIndex];
  const placedValues = new Set(Object.values(session.placements));
  const availableNumbers = Object.freeze(currentScene.tiles.filter((tile) => !placedValues.has(tile)));
  const currentHole = currentScene.missing.find((index) => session.placements[index] === undefined) ?? null;
  const screen = screenFor(session.status);
  const view: RaceView = Object.freeze({
    screen,
    sceneIndex: session.sceneIndex,
    sceneCount: SCENES.length,
    scene: currentScene,
    completedRuleLabels: COMPLETED_RULE_LABELS,
    selectedNumber: session.selectedNumber,
    placements: session.placements,
    solvedCount: Object.keys(session.placements).length,
    currentHole,
    availableNumbers,
    message: session.message,
    messageKind: session.messageKind,
    raceStarted: screen === 'active',
    raceLost: session.status === 'lost',
    timeLeft: session.timeLeft,
    opponentProgress: session.opponentProgress,
    runner: Object.freeze({
      progress: session.runnerProgress,
      durationMs: session.runnerDurationMs,
      moving: session.runnerMoving
    }),
    mistakeIndex: session.mistakeIndex
  });

  return Object.freeze({
    view,
    effects: Object.freeze([...effects]),
    needsTimeUpdates:
      session.status === 'racing' ||
      session.status === 'finishing' ||
      session.runnerMoving
  });
}

function screenFor(status: SessionStatus): RaceScreen {
  if (status === 'ready') return 'ready';
  if (status === 'success') return 'success';
  if (status === 'complete') return 'complete';
  return 'active';
}

function initialSession(now = 0): Session {
  return {
    status: 'ready',
    sceneIndex: 0,
    selectedNumber: null,
    placements: Object.freeze({}),
    message: '',
    messageKind: 'instruction',
    mistakeIndex: null,
    mistakeUntil: null,
    motion: 'full',
    startedAt: now,
    timeLeft: SCENES[0].timeLimit,
    opponentProgress: 0,
    runnerProgress: 0,
    runnerDurationMs: MINIMUM_TRAVEL_MS,
    runnerMoving: false,
    runnerArrivesAt: null,
    launchPending: false,
    lastNow: now
  };
}

function baseMessage(scene: SceneView): string {
  return scene.hint
    ? `${scene.hint} Choisis le nombre qui reconstruit le passage.`
    : 'La mission est lancée. Observe la suite et choisis le nombre manquant de la prochaine brèche.';
}

function stopBeforeMissingTerm(index: number, termCount: number): number {
  return index === 0 ? 0 : ((index - 0.5) / termCount) * 100;
}

function defineScenes(inputs: readonly SceneInput[]): readonly SceneView[] {
  const ids = new Set<SceneId>();
  const scenes = inputs.map((input, sceneIndex) => {
    const path = `scenes[${sceneIndex}]`;
    if (ids.has(input.id)) throw new Error(`Invalid number-pattern race at ${path}.id: duplicate id.`);
    ids.add(input.id);
    if (input.values.length < 2) throw new Error(`Invalid number-pattern race at ${path}.values: expected at least two terms.`);

    const step = input.values[1] - input.values[0];
    if (!Number.isSafeInteger(step) || step === 0) {
      throw new Error(`Invalid number-pattern race at ${path}.values: expected a non-zero integer step.`);
    }
    input.values.forEach((value, index) => {
      if (!Number.isSafeInteger(value)) throw new Error(`Invalid number-pattern race at ${path}.values[${index}]: expected a safe integer.`);
      if (index > 0 && value - input.values[index - 1] !== step) {
        throw new Error(`Invalid number-pattern race at ${path}.values[${index}]: expected the constant step ${signedStep(step)}.`);
      }
    });

    let previousHole = -1;
    input.missing.forEach((hole, index) => {
      if (!Number.isInteger(hole) || hole < 0 || hole >= input.values.length || hole <= previousHole) {
        throw new Error(`Invalid number-pattern race at ${path}.missing[${index}]: expected unique ascending in-range indexes.`);
      }
      previousHole = hole;
    });
    if (input.missing.length === 0) throw new Error(`Invalid number-pattern race at ${path}.missing: expected at least one hole.`);

    const uniqueTiles = new Set(input.tiles);
    if (uniqueTiles.size !== input.tiles.length || input.tiles.some((tile) => !Number.isSafeInteger(tile))) {
      throw new Error(`Invalid number-pattern race at ${path}.tiles: expected unique safe integers.`);
    }
    input.missing.forEach((hole) => {
      if (!uniqueTiles.has(input.values[hole])) {
        throw new Error(`Invalid number-pattern race at ${path}.tiles: missing the answer for term ${hole}.`);
      }
    });
    if (!Number.isFinite(input.timeLimit) || input.timeLimit <= 0) {
      throw new Error(`Invalid number-pattern race at ${path}.timeLimit: expected a positive duration.`);
    }

    const values = Object.freeze([...input.values]);
    const missing = Object.freeze([...input.missing]);
    const tiles = Object.freeze([...input.tiles]);
    return Object.freeze({
      id: input.id,
      eyebrow: input.eyebrow,
      title: input.title,
      prompt: input.prompt,
      values,
      missing,
      step,
      stepLabel: signedStep(step),
      tiles,
      hint: input.revealStep ? `Le pas est ${signedStep(step)}.` : null,
      timeLimit: input.timeLimit
    });
  });
  return Object.freeze(scenes);
}
