const LETTERS = 'CDEFGAB';
const SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export const LEVELS = {
  1: { notes: ['E4', 'G4', 'B4', 'D5', 'F5'], seconds: 10 },
  2: { notes: ['F4', 'A4', 'C5', 'E5'], seconds: 10 },
  3: { notes: ['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'], seconds: 7 },
  4: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'], seconds: 5 },
};

const NAMES = {
  es: { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' },
  en: { C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', A: 'A', B: 'B' },
};

// Button order: Do Re Mi Fa Sol La Si
export const LETTER_ORDER = [...LETTERS];

export function noteName(note, lang) {
  return NAMES[lang][note[0]];
}

export function frequency(note) {
  const midi = 12 * (Number(note[1]) + 1) + SEMITONES[note[0]];
  return 440 * 2 ** ((midi - 69) / 12);
}

// Steps above the bottom staff line (E4 = 0); even steps are lines, odd are spaces.
export function staffStep(note) {
  return Number(note[1]) * 7 + LETTERS.indexOf(note[0]) - (4 * 7 + 2);
}

export function ledgerSteps(note) {
  const step = staffStep(note);
  const lines = [];
  for (let s = -2; s >= step; s -= 2) lines.push(s);
  for (let s = 10; s <= step; s += 2) lines.push(s);
  return lines;
}

export function randomNote(level, previous, random = Math.random) {
  const pool = LEVELS[level].notes.filter((n) => n !== previous);
  return pool[Math.floor(random() * pool.length)];
}
