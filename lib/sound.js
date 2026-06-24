// Tiny Web Audio FX synth. No external assets.
// Lazy-inits the AudioContext on first user gesture (browser policy).

let ctx = null;
let master = null;
let enabled = true;

function ensureCtx() {
  if (typeof window === 'undefined') return null;
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);
  } catch (_) {
    ctx = null;
  }
  return ctx;
}

function tone({ freq = 440, dur = 0.08, type = 'square', vol = 0.5, attack = 0.005, decay = 0.04, sweep = 0 }) {
  if (!enabled) return;
  const c = ensureCtx();
  if (!c || !master) return;
  if (c.state === 'suspended') c.resume().catch(() => {});

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (sweep) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, freq + sweep),
      c.currentTime + dur,
    );
  }
  gain.gain.setValueAtTime(0, c.currentTime);
  gain.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur + decay);

  osc.connect(gain).connect(master);
  osc.start();
  osc.stop(c.currentTime + dur + decay + 0.02);
}

export const Sound = {
  init() {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('meet:sound');
      if (stored !== null) enabled = stored === '1';
    } catch (_) {}
  },
  isEnabled() { return enabled; },
  setEnabled(v) {
    enabled = !!v;
    try { window.localStorage.setItem('meet:sound', enabled ? '1' : '0'); } catch (_) {}
    if (enabled) {
      ensureCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    }
  },
  hover() { tone({ freq: 1400, dur: 0.04, type: 'square', vol: 0.18, sweep: -200 }); },
  click() {
    tone({ freq: 880, dur: 0.06, type: 'square', vol: 0.4, sweep: -300 });
    setTimeout(() => tone({ freq: 1320, dur: 0.05, type: 'square', vol: 0.25 }), 30);
  },
  ping() {
    tone({ freq: 1800, dur: 0.05, type: 'sine', vol: 0.35, sweep: 600 });
    setTimeout(() => tone({ freq: 2400, dur: 0.06, type: 'sine', vol: 0.25 }), 40);
  },
  match() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((f, i) => {
      setTimeout(() => tone({ freq: f, dur: 0.1, type: 'square', vol: 0.45 }), i * 90);
    });
  },
  headshot() {
    tone({ freq: 2200, dur: 0.05, type: 'square', vol: 0.5, sweep: -800 });
    setTimeout(() => tone({ freq: 180, dur: 0.08, type: 'sawtooth', vol: 0.3, sweep: -80 }), 20);
  },
  defeat() { tone({ freq: 220, dur: 0.4, type: 'sawtooth', vol: 0.3, sweep: -120 }); },
  round() {
    tone({ freq: 300, dur: 0.18, type: 'sawtooth', vol: 0.25, sweep: 500 });
    setTimeout(() => tone({ freq: 1320, dur: 0.12, type: 'square', vol: 0.3 }), 120);
  },
};

export default Sound;
