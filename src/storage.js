const KEY = 'juego-notas';

export function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY)) ?? {};
    return {
      lang: data.lang === 'en' ? 'en' : 'es',
      muted: data.muted === true,
      best: typeof data.best === 'object' && data.best ? data.best : {},
    };
  } catch {
    return { lang: 'es', muted: false, best: {} };
  }
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // private mode or storage full: records just aren't kept
  }
}
