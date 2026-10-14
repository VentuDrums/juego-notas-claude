import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS, noteName, frequency, staffStep, ledgerSteps, randomNote } from '../src/notes.js';

test('level notes match the spec', () => {
  assert.deepEqual(LEVELS[1].notes, ['E4', 'G4', 'B4', 'D5', 'F5']);
  assert.deepEqual(LEVELS[2].notes, ['F4', 'A4', 'C5', 'E5']);
  assert.deepEqual(LEVELS[3].notes, ['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5']);
  assert.deepEqual(LEVELS[4].notes, ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6']);
  assert.deepEqual([1, 2, 3, 4].map((l) => LEVELS[l].seconds), [10, 10, 7, 5]);
});

test('note names in Spanish and English', () => {
  assert.equal(noteName('G4', 'es'), 'Sol');
  assert.equal(noteName('C6', 'es'), 'Do');
  assert.equal(noteName('G4', 'en'), 'G');
});

test('frequencies', () => {
  assert.equal(frequency('A4'), 440);
  assert.ok(Math.abs(frequency('C4') - 261.63) < 0.01);
  assert.ok(Math.abs(frequency('C6') - 1046.5) < 0.01);
});

test('staff position: bottom line E4 is step 0, top line F5 is step 8', () => {
  assert.equal(staffStep('E4'), 0);
  assert.equal(staffStep('F5'), 8);
  assert.equal(staffStep('C4'), -2);
});

test('ledger lines only outside the staff', () => {
  assert.deepEqual(ledgerSteps('C4'), [-2]);
  assert.deepEqual(ledgerSteps('D4'), []);
  assert.deepEqual(ledgerSteps('E4'), []);
  assert.deepEqual(ledgerSteps('F5'), []);
  assert.deepEqual(ledgerSteps('G5'), []);
  assert.deepEqual(ledgerSteps('A5'), [10]);
  assert.deepEqual(ledgerSteps('B5'), [10]);
  assert.deepEqual(ledgerSteps('C6'), [10, 12]);
});

test('randomNote never repeats the previous note', () => {
  for (let i = 0; i < 200; i++) {
    assert.notEqual(randomNote(2, 'F4'), 'F4');
    assert.ok(LEVELS[2].notes.includes(randomNote(2, 'F4')));
  }
  // with random() = 0 the first allowed note is picked
  assert.equal(randomNote(1, 'E4', () => 0), 'G4');
});
