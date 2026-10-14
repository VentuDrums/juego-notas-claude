import { LETTER_ORDER, noteName, randomNote } from './notes.js';
import { t } from './i18n.js';
import { staffSvg } from './staff.js';

const lang = 'es';
const level = 3;
let note = randomNote(level, null);
let waiting = false;

const staff = document.getElementById('staff');
const feedback = document.getElementById('feedback');
const answers = document.getElementById('answers');

document.documentElement.lang = lang;
document.getElementById('title').textContent = t(lang, 'title');

function showNote() {
  staff.innerHTML = staffSvg(note, t(lang, 'title'));
}

answers.innerHTML = LETTER_ORDER.map(
  (letter) => `<button type="button" data-letter="${letter}">${noteName(letter, lang)}</button>`,
).join('');

answers.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || waiting) return;
  const ok = button.dataset.letter === note[0];
  feedback.textContent = t(lang, ok ? 'correct' : 'wrong');
  feedback.className = ok ? 'ok' : 'ko';
  waiting = true;
  setTimeout(() => {
    note = randomNote(level, note);
    showNote();
    feedback.textContent = '';
    waiting = false;
  }, 700);
});

showNote();
