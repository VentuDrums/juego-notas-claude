export const TEXTS = {
  es: {
    title: 'Lee la nota',
    correct: '¡Bien!',
    wrong: 'Inténtalo otra vez',
    mute: 'Quitar sonido',
    unmute: 'Poner sonido',
  },
  en: {
    title: 'Read the note',
    correct: 'Well done!',
    wrong: 'Try again',
    mute: 'Sound off',
    unmute: 'Sound on',
  },
};

export function t(lang, key) {
  return TEXTS[lang][key];
}
