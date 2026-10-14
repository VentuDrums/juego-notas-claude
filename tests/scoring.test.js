import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, points, newGame, answer, isFinished, isNewRecord } from '../src/scoring.js';

test('a correct answer is worth 10 plus 1 per whole second left', () => {
  assert.equal(points(true, 6.8), 16);
  assert.equal(points(true, 0), 10);
});

test('a wrong answer or a timeout is worth 0', () => {
  assert.equal(points(false, 5), 0);
  assert.equal(points(false, 0), 0);
});

test('a game has 20 notes and counts score and hits', () => {
  assert.equal(QUESTIONS, 20);
  let game = newGame();
  game = answer(game, true, 3);
  game = answer(game, false, 2);
  assert.deepEqual(game, { score: 13, hits: 1, count: 2 });
  assert.equal(isFinished(game), false);
  for (let i = 0; i < 18; i++) game = answer(game, true, 0);
  assert.equal(isFinished(game), true);
  assert.equal(game.hits, 19);
});

test('new record only when the score beats the previous best', () => {
  assert.equal(isNewRecord(50, undefined), true);
  assert.equal(isNewRecord(0, undefined), false);
  assert.equal(isNewRecord(50, 50), false);
  assert.equal(isNewRecord(51, 50), true);
});
