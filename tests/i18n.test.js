import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEXTS, t } from '../src/i18n.js';

test('Spanish and English have the same keys', () => {
  assert.deepEqual(Object.keys(TEXTS.es).sort(), Object.keys(TEXTS.en).sort());
});

test('no empty texts', () => {
  for (const lang of ['es', 'en']) {
    for (const [key, value] of Object.entries(TEXTS[lang])) assert.ok(value, `${lang}.${key}`);
  }
});

test('t returns the text for the language', () => {
  assert.equal(t('es', 'correct'), '¡Bien!');
  assert.equal(t('en', 'correct'), 'Well done!');
});
