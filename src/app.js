import { LETTER_ORDER, frequency, noteName, randomNote } from './notes.js';
import { playCorrect, playNote, playWrong, setMuted, unlockAudio } from './audio.js';
import { t } from './i18n.js';
import { staffSvg } from './staff.js';

const lang = 'es';
const level = 3;
let note = randomNote(level, null);
let waiting = false;
let muted = false;

const staff = document.getElementById('staff');
const feedback = document.getElementById('feedback');
const answers = document.getElementById('answers');
const muteButton = document.getElementById('mute');

function renderMute() {
  muteButton.textContent = muted ? '🔇' : '🔊';
  muteButton.setAttribute('aria-label', t(lang, muted ? 'unmute' : 'mute'));
  muteButton.setAttribute('aria-pressed', String(muted));
}

muteButton.addEventListener('click', () => {
  muted = !muted;
  setMuted(muted);
  renderMute();
});

document.documentElement.lang = lang;
document.getElementById('title').textContent = t(lang, 'title');

function showNote() {
  staff.innerHTML = staffSvg(note, t(lang, 'title'));
  playNote(frequency(note));
}

answers.innerHTML = LETTER_ORDER.map(
  (letter) => `<button type="button" data-letter="${letter}">${noteName(letter, lang)}</button>`,
).join('');

answers.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || waiting) return;
  unlockAudio();
  const ok = button.dataset.letter === note[0];
  (ok ? playCorrect : playWrong)();
  feedback.textContent = t(lang, ok ? 'correct' : 'wrong');
  feedback.className = ok ? 'ok' : 'ko';
  waiting = true;
  setTimeout(() => {
    note = randomNote(level, note);
    renderMute();
showNote();
    feedback.textContent = '';
    waiting = false;
  }, 700);
});

renderMute();
showNote();
