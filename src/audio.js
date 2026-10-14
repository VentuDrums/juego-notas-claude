let ctx = null;
let muted = false;

export function setMuted(value) {
  muted = value;
}

// Browsers only allow audio after a user gesture, so call this from a click handler.
export function unlockAudio() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
  } catch {
    ctx = null; // no Web Audio: the game keeps working silently
  }
}

function tone(freq, start, duration, type, volume) {
  if (muted || !ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const t0 = ctx.currentTime + start;
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export function playNote(freq) {
  tone(freq, 0, 1.2, 'triangle', 0.4);
}

export function playCorrect() {
  tone(1046.5, 0, 0.15, 'sine', 0.25);
  tone(1568, 0.1, 0.25, 'sine', 0.25);
}

export function playWrong() {
  tone(155.6, 0, 0.35, 'square', 0.12);
  tone(116.5, 0.15, 0.4, 'square', 0.12);
}
