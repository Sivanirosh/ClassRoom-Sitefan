export type TugOutcome = 'playing' | 'won' | 'lost';

export type TugRound = Readonly<{
  position: number;
  queuedOpponentPull: number;
  outcome: TugOutcome;
}>;

export type TugConfig = Readonly<{
  goal: number;
  opponentPace: number;
}>;

const ANSWER_PULL = 1;
const MISTAKE_PULL_RATE = 0.8;

export function createTugRound(): TugRound {
  return { position: 0, queuedOpponentPull: 0, outcome: 'playing' };
}

export function answerTugRound(
  round: TugRound,
  isCorrect: boolean,
  config: TugConfig
): TugRound {
  if (round.outcome !== 'playing') return round;

  if (!isCorrect) {
    return {
      ...round,
      queuedOpponentPull: round.queuedOpponentPull + ANSWER_PULL
    };
  }

  const position = Math.max(-config.goal, round.position - ANSWER_PULL);
  return {
    ...round,
    position,
    outcome: position <= -config.goal ? 'won' : 'playing'
  };
}

export function advanceTugRound(
  round: TugRound,
  elapsedSeconds: number,
  config: TugConfig
): TugRound {
  if (round.outcome !== 'playing') return round;

  const duration = Number.isFinite(elapsedSeconds) ? Math.max(0, elapsedSeconds) : 0;
  const penaltyStep = Math.min(round.queuedOpponentPull, MISTAKE_PULL_RATE * duration);
  const position = Math.min(
    config.goal,
    round.position + config.opponentPace * duration + penaltyStep
  );

  return {
    position,
    queuedOpponentPull: Math.max(0, round.queuedOpponentPull - penaltyStep),
    outcome: position >= config.goal ? 'lost' : 'playing'
  };
}
