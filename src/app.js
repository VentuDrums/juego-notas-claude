import { LEVELS, LETTER_ORDER, frequency, noteName, randomNote } from './notes.js';
import { QUESTIONS, answer, isFinished, isNewRecord, newGame } from './scoring.js';
import { playCorrect, playNote, playWrong, setMuted, unlockAudio } from './audio.js';
import { t } from './i18n.js';
import { staffSvg } from './staff.js';
import { load, save } from './storage.js';
import { answerRound, endRound, isMatchOver, isRoundOver, matchWinner, newMatch, newRound } from './duel.js';

const $ = (id) => document.getElementById(id);

const saved = load();
const state = { ...saved, level: 1, note: null, game: null, deadline: 0, timer: null, pending: null, locked: true };
setMuted(state.muted);
const board = { level: 1, rounds: 10, match: null, round: null };
const teams = () => document.querySelectorAll('.team');

function show(screen) {
  document.querySelectorAll('[data-screen]').forEach((el) => (el.hidden = el.id !== screen));
  document.body.classList.toggle('wide', screen === 'board-play');
}

function answerButtons() {
  return LETTER_ORDER.map(
    (letter) => `<button type="button" data-letter="${letter}">${noteName(letter, state.lang)}</button>`,
  ).join('');
}

function renderTexts() {
  document.documentElement.lang = state.lang;
  document.title = t(state.lang, 'title');
  document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = t(state.lang, el.dataset.i18n)));
  $('answers').innerHTML = answerButtons();
  document.querySelectorAll('.team-answers').forEach((el) => (el.innerHTML = answerButtons()));
  document.querySelectorAll('[data-lang]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.lang === state.lang)));
  renderMute();
  renderLevels();
  renderBoardSetup();
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

function renderBoardSetup() {
  $('board-levels').innerHTML = Object.keys(LEVELS)
    .map((level) => `<button type="button" data-board-level="${level}">${t(state.lang, `level${level}`)}</button>`)
    .join('');
  document.querySelectorAll('[data-board-level]').forEach((el) =>
    el.setAttribute('aria-pressed', String(Number(el.dataset.boardLevel) === board.level)),
  );
  document.querySelectorAll('[data-rounds]').forEach((el) =>
    el.setAttribute('aria-pressed', String(Number(el.dataset.rounds) === board.rounds)),
  );
}

function startMatch() {
  board.match = newMatch(board.rounds);
  state.level = board.level;
  state.note = null;
  show('board-play');
  nextRound();
}

function nextRound() {
  if (isMatchOver(board.match)) return showBoardResult();
  board.round = newRound();
  state.note = randomNote(state.level, state.note);
  teams().forEach((team) => {
    team.classList.remove('blocked');
    team.querySelector('.team-staff').innerHTML = staffSvg(state.note, t(state.lang, 'readNote'));
    team.querySelector('.team-feedback').textContent = '';
  });
  $('round').textContent = `${t(state.lang, 'round')} ${board.match.played + 1} / ${board.match.rounds}`;
  renderBoardScore();
  playNote(frequency(state.note));
  state.locked = false;
  startTimer($('board-time'), () => finishRound(true));
}

function renderBoardScore() {
  teams().forEach((team) => (team.querySelector('.team-score').textContent = board.match.score[team.dataset.team]));
}

function teamFeedback(team, key, ok) {
  const el = team.querySelector('.team-feedback');
  el.textContent = t(state.lang, key);
  el.className = `team-feedback ${ok ? 'ok' : 'ko'}`;
}

function finishRound(timedOut) {
  stopGame();
  if (timedOut) {
    playWrong();
    teams().forEach((team) => !board.round.blocked[team.dataset.team] && teamFeedback(team, 'timeUp', false));
  }
  board.match = endRound(board.match, board.round);
  renderBoardScore();
  state.pending = setTimeout(nextRound, 1500);
}

function showBoardResult() {
  const winner = matchWinner(board.match);
  const { red, blue } = board.match.score;
  $('board-winner').textContent = t(state.lang, winner ? `${winner}Wins` : 'draw');
  $('board-winner').className = winner ?? '';
  $('board-score').textContent = `${t(state.lang, 'red')} ${red} – ${blue} ${t(state.lang, 'blue')}`;
  show('board-result');
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
  state.locked = false;
  startTimer($('time'), () => resolve(false, 0, 'timeUp'));
}

function secondsLeft() {
  return Math.max(0, state.deadline - performance.now()) / 1000;
}

function startTimer(bar, onTimeout) {
  const seconds = LEVELS[state.level].seconds;
  state.deadline = performance.now() + seconds * 1000;
  const tick = () => {
    const left = secondsLeft();
    bar.style.width = `${(left / seconds) * 100}%`;
    if (left === 0) onTimeout();
  };
  state.timer = setInterval(tick, 100);
  tick();
}

function stopGame() {
  state.locked = true;
  clearInterval(state.timer);
  clearTimeout(state.pending);
}

function resolve(ok, left, message) {
  stopGame();
  state.game = answer(state.game, ok, left);
  (ok ? playCorrect : playWrong)();
  $('feedback').textContent = t(state.lang, message);
  $('feedback').className = ok ? 'ok' : 'ko';
  $('score').textContent = `${t(state.lang, 'points')}: ${state.game.score}`;
  state.pending = setTimeout(nextNote, 900);
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
const board = { level: 1, rounds: 10, match: null, round: null };
const teams = () => document.querySelectorAll('.team');
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
  if (event.target.closest('#board')) show('board-setup');
});

$('levels').addEventListener('click', (event) => {
  const button = event.target.closest('[data-level]');
  if (!button) return;
  unlockAudio();
  startGame(Number(button.dataset.level));
});

$('board-setup').addEventListener('click', (event) => {
  const level = event.target.closest('[data-board-level]')?.dataset.boardLevel;
  const rounds = event.target.closest('[data-rounds]')?.dataset.rounds;
  if (level) board.level = Number(level);
  if (rounds) board.rounds = Number(rounds);
  renderBoardSetup();
});

$('board-start').addEventListener('click', () => {
  unlockAudio();
  startMatch();
});

$('board-again').addEventListener('click', () => {
  unlockAudio();
  startMatch();
});

// pointerdown, not click: each team taps on its own half at the same time.
document.querySelectorAll('.team').forEach((team) =>
  team.addEventListener('pointerdown', (event) => {
    const button = event.target.closest('[data-letter]');
    const side = team.dataset.team;
    if (!button || state.locked || board.round.blocked[side]) return;
    unlockAudio();
    const ok = button.dataset.letter === state.note[0];
    board.round = answerRound(board.round, side, ok);
    (ok ? playCorrect : playWrong)();
    teamFeedback(team, ok ? 'point' : 'missed', ok);
    if (!ok) team.classList.add('blocked');
    if (isRoundOver(board.round)) finishRound(false);
  }),
);

document.querySelectorAll('[data-go]').forEach((el) =>
  el.addEventListener('click', () => {
    stopGame();
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
