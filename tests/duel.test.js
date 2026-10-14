import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newRound, answerRound, isRoundOver, newMatch, endRound, isMatchOver, matchWinner } from '../src/duel.js';

test('the first team to answer correctly wins the round', () => {
  let round = answerRound(newRound(), 'blue', true);
  assert.equal(round.winner, 'blue');
  assert.equal(isRoundOver(round), true);
  round = answerRound(round, 'red', true);
  assert.equal(round.winner, 'blue');
});

test('a team that misses is blocked and the other can still win', () => {
  let round = answerRound(newRound(), 'red', false);
  assert.equal(round.blocked.red, true);
  assert.equal(isRoundOver(round), false);
  round = answerRound(round, 'red', true);
  assert.equal(round.winner, null, 'blocked team cannot answer again');
  round = answerRound(round, 'blue', true);
  assert.equal(round.winner, 'blue');
});

test('if both teams miss nobody scores', () => {
  let round = answerRound(newRound(), 'red', false);
  round = answerRound(round, 'blue', false);
  assert.equal(isRoundOver(round), true);
  assert.equal(round.winner, null);
  assert.deepEqual(endRound(newMatch(10), round).score, { red: 0, blue: 0 });
});

test('a timeout ends the round with no points', () => {
  const match = endRound(newMatch(10), newRound());
  assert.deepEqual(match.score, { red: 0, blue: 0 });
  assert.equal(match.played, 1);
});

test('the match ends after its rounds and reports the winner', () => {
  let match = newMatch(5);
  for (const team of ['red', 'blue', 'red', 'red']) match = endRound(match, answerRound(newRound(), team, true));
  assert.equal(isMatchOver(match), false);
  match = endRound(match, newRound());
  assert.equal(isMatchOver(match), true);
  assert.deepEqual(match.score, { red: 3, blue: 1 });
  assert.equal(matchWinner(match), 'red');
});

test('a tied match has no winner', () => {
  let match = newMatch(2);
  match = endRound(match, answerRound(newRound(), 'red', true));
  match = endRound(match, answerRound(newRound(), 'blue', true));
  assert.equal(matchWinner(match), null);
});
