export const QUESTIONS = 20;

export function points(correct, secondsLeft) {
  return correct ? 10 + Math.floor(secondsLeft) : 0;
}

export function newGame() {
  return { score: 0, hits: 0, count: 0 };
}

export function answer(game, correct, secondsLeft) {
  return {
    score: game.score + points(correct, secondsLeft),
    hits: game.hits + (correct ? 1 : 0),
    count: game.count + 1,
  };
}

export function isFinished(game) {
  return game.count >= QUESTIONS;
}

export function isNewRecord(score, best) {
  return score > (best ?? 0);
}
