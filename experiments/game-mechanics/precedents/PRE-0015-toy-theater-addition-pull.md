---
id: PRE-0015
record_type: precedent
title: "Toy Theater — Addition Pull"
summary: "Four-choice addition retrieval drives a tug-of-war counter-pull while an opponent applies continuous pressure."
precedent_kind: digital-fluency-game
publisher_or_creator: "Toy Theater"
primary_verbs:
  - calculate
  - choose
  - retrieve
  - counter-pull
challenge_sources:
  - continuous-opponent-pressure
  - nearby-number-distractors
  - escalating-speed
mechanics:
  - timed-retrieval
  - spatial-progress-consequence
created: 2026-07-18
updated: 2026-07-18
tags:
  - game-mechanics/record
  - game-mechanics/precedent
---

# PRE-0015 — Toy Theater Addition Pull

## Why this record exists

The owner requested a bounded catalog graybox based on this reference. This record separates source-observed behavior from the local adaptation and preserves the copying boundary.

## Source-backed loop

- The player is assigned the red tug-of-war team and starts a level explicitly.
- Each problem adds two integers from 1 to 9; the result is therefore within 2–18.
- Four numeric choices are shown. Distractors are sampled near the correct sum.
- While a problem is available, the opponent pulls continuously toward the pool.
- A correct choice produces a strong counter-pull and then a new problem.
- An incorrect choice removes the options and replaces the problem shortly afterward; it does not produce written mathematical feedback.
- Crossing one rope threshold wins the level; crossing the opposite threshold loses it.
- Five levels change the opposing character and increase opponent pull speed.

These observations come from the public game page, its rendered interaction, its descriptive copy, and the public JavaScript loaded by that page on 2026-07-18.

## Transferable observations

- A spatial contest can make each retrieved fact feel consequential without requiring a separate score counter.
- Continuous opposing motion turns response latency into part of the challenge, while a correct response creates a visibly stronger discrete action.
- Nearby numeric distractors keep the choice set plausible.
- The same pressure also confounds mathematical accuracy with retrieval speed, reading speed, motor access, attention, and device performance. It should not be treated as mastery evidence.
- Immediate replacement after an error sustains pace but provides little information for correction.

## Local adaptation

`EX-0006` keeps four-choice addition, opposing pressure, counter-pulls, and stronger late pressure. It changes the activity by:

- applying a slow constant opponent pull from the orientation scene onward;
- making a wrong answer add one continuous blue cran—equal and opposite to a correct-answer red cran—without a discrete position jump;
- replacing the equality immediately after every choice so play never pauses;
- using brief non-verbal arena feedback for misses while retaining an accessible correction announcement;
- stopping the round at either spatial threshold, with an explicit same-round retry after a blue win rather than silently resetting the rope;
- using deterministic authored questions and original French copy;
- using original generated storybook characters, arena art, and outcome scenes rather than copied characters or art;
- ending after three mechanic-test scenes instead of reproducing five levels.

## Copying boundary

Do not copy Toy Theater branding, wording, source code, characters, SVG paths, animations, sounds, exact layout, level values, timings, or choice-generation constants. Reuse only the abstract relationship between four-choice fact retrieval, continuous opposing pressure, discrete counter-pulls, and spatial win/loss thresholds.

## Sources

| Source | Owner/authority | Supports | Accessed |
|---|---|---|---|
| [Addition Pull](https://toytheater.com/addition-pull/) | Toy Theater product/game page | Instructions, addition-within-20 scope, four choices, continuous opponent pull, correct/incorrect behavior, five levels | 2026-07-18 |
| `https://toytheater.com/page/addition_pull/scripts/main3.js` | JavaScript served by the game page | Generated addends, nearby distractors, movement thresholds, level count, escalating opponent speed | 2026-07-18 |

## Related application

- Catalog graybox: `EX-0006` — La corde des sommes.
