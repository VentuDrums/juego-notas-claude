export const TEXTS = {
  es: {
    title: 'Juego de notas',
    readNote: 'Lee la nota',
    correct: '¡Bien!',
    wrong: 'Inténtalo otra vez',
    timeUp: '¡Se acabó el tiempo!',
    mute: 'Quitar sonido',
    unmute: 'Poner sonido',
    note: 'Nota',
    points: 'Puntos',
    hits: 'Aciertos',
    result: 'Resultado',
    newRecord: '¡Nuevo récord!',
    playAgain: 'Jugar otra vez',
  },
  en: {
    title: 'Note game',
    readNote: 'Read the note',
    correct: 'Well done!',
    wrong: 'Try again',
    timeUp: 'Time is up!',
    mute: 'Sound off',
    unmute: 'Sound on',
    note: 'Note',
    points: 'Points',
    hits: 'Correct',
    result: 'Your score',
    newRecord: 'New best score!',
    playAgain: 'Play again',
  },
};

export function t(lang, key) {
  return TEXTS[lang][key];
}
