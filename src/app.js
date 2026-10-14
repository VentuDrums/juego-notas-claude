import { LEVELS, LETTER_ORDER, frequency, noteName, randomNote } from './notes.js';
import { QUESTIONS, answer, isFinished, isNewRecord, newGame } from './scoring.js';
import { playCorrect, playNote, playWrong, setMuted, unlockAudio } from './audio.js';
import { t } from './i18n.js';
import { staffSvg } from './staff.js';

const $ = (id) => document.getElementById(id);

const state = { lang: 'es', muted: false, level: 3, note: null, game: null, deadline: 0, timer: null, locked: true };

function show(screen) {
  document.querySelectorAll('[data-screen]').forEach((el) => (el.hidden = el.id !== screen));
}

function renderTexts() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(state.lang, el.dataset.i18n)));
  $('answers').innerHTML = LETTER_ORDER.map(
    (letter) => `<button type="button" data-letter="${letter}">${noteName(letter, state.lang)}</button>`,
  ).join('');
  renderMute();
}

function renderMute() {
  $('mute').textContent = state.muted ? '🔇' : '🔊';
  $('mute').setAttribute('aria-label', t(state.lang, state.muted ? 'unmute' : 'mute'));
  $('mute').setAttribute('aria-pressed', String(state.muted));
}

function startGame(level) {
  state.level = level;
  state.game = newGame();
  state.note = null;
  show('play');
  nextNote();
}

function nextNote() {
  if (isFinished(state.game)) return showResult();
  state.note = randomNote(state.level, state.note);
  $('staff').innerHTML = staffSvg(state.note, t(state.lang, 'readNote'));
  $('feedback').textContent = '';
  $('progress').textContent = `${t(state.lang, 'note')} ${state.game.count + 1} / ${QUESTIONS}`;
  $('score').textContent = `${t(state.lang, 'points')}: ${state.game.score}`;
  playNote(frequency(state.note));
  state.deadline = performance.now() + LEVELS[state.level].seconds * 1000;
  state.locked = false;
  state.timer = setInterval(tick, 100);
  tick();
}

function secondsLeft() {
  return Math.max(0, state.deadline - performance.now()) / 1000;
}

function tick() {
  const left = secondsLeft();
  $('time').style.width = `${(left / LEVELS[state.level].seconds) * 100}%`;
  if (left === 0) resolve(false, 0, 'timeUp');
}

function resolve(ok, left, message) {
  state.locked = true;
  clearInterval(state.timer);
  state.game = answer(state.game, ok, left);
  (ok ? playCorrect : playWrong)();
  $('feedback').textContent = t(state.lang, message);
  $('feedback').className = ok ? 'ok' : 'ko';
  $('score').textContent = `${t(state.lang, 'points')}: ${state.game.score}`;
  setTimeout(nextNote, 900);
}

function showResult() {
  const { score, hits } = state.game;
  $('final-score').textContent = `${t(state.lang, 'points')}: ${score}`;
  $('final-hits').textContent = `${t(state.lang, 'hits')}: ${hits} / ${QUESTIONS}`;
  $('new-record').hidden = !isNewRecord(score, undefined);
  show('result');
}

$('answers').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || state.locked) return;
  unlockAudio();
  const ok = button.dataset.letter === state.note[0];
  resolve(ok, secondsLeft(), ok ? 'correct' : 'wrong');
});

$('mute').addEventListener('click', () => {
  state.muted = !state.muted;
  setMuted(state.muted);
  renderMute();
});

$('again').addEventListener('click', () => {
  unlockAudio();
  startGame(state.level);
});

renderTexts();
startGame(state.level);
