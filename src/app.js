import { LEVELS, LETTER_ORDER, frequency, noteName, randomNote } from './notes.js';
import { QUESTIONS, answer, isFinished, isNewRecord, newGame } from './scoring.js';
import { playCorrect, playNote, playWrong, setMuted, unlockAudio } from './audio.js';
import { t } from './i18n.js';
import { staffSvg } from './staff.js';
import { load, save } from './storage.js';

const $ = (id) => document.getElementById(id);

const saved = load();
const state = { ...saved, level: 1, note: null, game: null, deadline: 0, timer: null, locked: true };
setMuted(state.muted);

function show(screen) {
  document.querySelectorAll('[data-screen]').forEach((el) => (el.hidden = el.id !== screen));
}

function renderTexts() {
  document.documentElement.lang = state.lang;
  document.title = t(state.lang, 'title');
  document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(state.lang, el.dataset.i18n)));
  $('answers').innerHTML = LETTER_ORDER.map(
    (letter) => `<button type="button" data-letter="${letter}">${noteName(letter, state.lang)}</button>`,
  ).join('');
  document.querySelectorAll('[data-lang]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.lang === state.lang)));
  renderMute();
  renderLevels();
}

function persist() {
  save({ lang: state.lang, muted: state.muted, best: state.best });
}

function renderLevels() {
  $('levels').innerHTML = Object.keys(LEVELS)
    .map((level) => {
      const best = state.best[level];
      return `<button type="button" data-level="${level}">
        <span>${t(state.lang, `level${level}`)}</span>
        <small>${t(state.lang, 'best')}: ${best ?? '—'}</small>
      </button>`;
    })
    .join('');
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
  const record = isNewRecord(score, state.best[state.level]);
  if (record) {
    state.best[state.level] = score;
    persist();
  }
  $('new-record').hidden = !record;
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
  persist();
});

$('home').addEventListener('click', (event) => {
  const lang = event.target.closest('[data-lang]')?.dataset.lang;
  if (lang) {
    state.lang = lang;
    renderTexts();
    persist();
  }
  if (event.target.closest('#solo')) show('choose-level');
});

$('levels').addEventListener('click', (event) => {
  const button = event.target.closest('[data-level]');
  if (!button) return;
  unlockAudio();
  startGame(Number(button.dataset.level));
});

document.querySelectorAll('[data-go]').forEach((el) =>
  el.addEventListener('click', () => {
    renderLevels();
    show(el.dataset.go);
  }),
);

$('again').addEventListener('click', () => {
  unlockAudio();
  startGame(state.level);
});

renderTexts();
show('home');
