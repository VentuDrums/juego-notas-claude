export const TEXTS = {
  es: {
    title: 'Lee la nota',
    correct: '¡Bien!',
    wrong: 'Inténtalo otra vez',
  },
  en: {
    title: 'Read the note',
    correct: 'Well done!',
    wrong: 'Try again',
  },
};

export function t(lang, key) {
  return TEXTS[lang][key];
}
