import { staffStep, ledgerSteps } from './notes.js';

const BOTTOM_LINE_Y = 100;
const HALF_SPACE = 6;
const NOTE_X = 125;
const y = (step) => BOTTOM_LINE_Y - HALF_SPACE * step;

const CLEF =
  'M27 116 C22 121 35 124 34 115 L30 36 C30 25 43 29 38 42 C34 54 17 62 17 80 ' +
  'C17 100 47 102 47 88 C47 75 28 75 28 88 C28 94 34 96 37 93';

export function staffSvg(note, label) {
  const lines = [0, 2, 4, 6, 8]
    .map((s) => `<line x1="10" x2="190" y1="${y(s)}" y2="${y(s)}" />`)
    .join('');
  const ledgers = ledgerSteps(note)
    .map((s) => `<line x1="${NOTE_X - 15}" x2="${NOTE_X + 15}" y1="${y(s)}" y2="${y(s)}" />`)
    .join('');
  return `<svg viewBox="0 18 200 108" role="img" aria-label="${label}">
    <g stroke="currentColor" stroke-width="1.5">${lines}${ledgers}</g>
    <path d="${CLEF}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="${NOTE_X}" cy="${y(staffStep(note))}" rx="8" ry="5.5" transform="rotate(-20 ${NOTE_X} ${y(staffStep(note))})"
      fill="none" stroke="currentColor" stroke-width="3" />
  </svg>`;
}
