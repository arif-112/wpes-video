/**
 * Deterministic SFX generator — produces the WAV files in public/sfx/.
 *
 *   node scripts/generate-sfx.js
 *
 * Every effect is synthesised from sine/noise primitives with an explicit
 * attack/release envelope, so there are no external audio dependencies and
 * the files are identical on every machine.
 */
const fs = require('fs');
const path = require('path');

const SR = 44100;

function createWav(durationSec, makeSample) {
  const n = Math.floor(SR * durationSec);
  const data = Buffer.alloc(n * 2);
  let peak = 0;
  const samples = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = i / Math.max(1, n - 1);
    let s = makeSample(t, p);
    // 2 ms de-click attack + 30 ms release
    const attack = Math.min(1, t / 0.002);
    const release = Math.min(1, (durationSec - t) / 0.03);
    s *= attack * release;
    samples[i] = s;
    peak = Math.max(peak, Math.abs(s));
  }

  const gain = peak > 0 ? 0.82 / peak : 0;
  for (let i = 0; i < n; i++) {
    const v = Math.max(-1, Math.min(1, samples[i] * gain));
    data.writeInt16LE(Math.round(v * 32767), i * 2);
  }

  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SR, 24);
  header.writeUInt32LE(SR * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);

  return Buffer.concat([header, data]);
}

// deterministic noise (no Math.random → reproducible assets)
function makeNoise(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s / 4294967296) * 2 - 1;
  };
}

const noise = makeNoise(90210);
const noise2 = makeNoise(7331);

const sine = (freq, t) => Math.sin(2 * Math.PI * freq * t);

const DEFINITIONS = {
  // soft bubble pop — incoming message / card
  'pop.wav': () =>
    createWav(0.18, (t, p) => {
      const f = 360 + 620 * Math.pow(p, 0.5);
      const env = Math.exp(-t * 24) * Math.min(1, t / 0.004);
      return sine(f, t) * env * 0.8 + sine(f * 2, t) * env * 0.12;
    }),

  // chat message blip
  'message.wav': () =>
    createWav(0.26, (t) => {
      const f = t < 0.07 ? 784 : 1046;
      const local = t < 0.07 ? t : t - 0.07;
      const env = Math.exp(-local * 22);
      return (sine(f, t) * 0.62 + sine(f * 2, t) * 0.08) * env;
    }),

  // tactile UI click
  'click.wav': () =>
    createWav(0.075, (t) => {
      const env = Math.exp(-t * 90);
      const ping = sine(1750 * Math.exp(-t * 20) + 420, t);
      return (ping * 0.55 + noise() * 0.35 * Math.exp(-t * 140)) * env;
    }),

  // tiny soft toggle / tab switch
  'switch.wav': () =>
    createWav(0.11, (t, p) => {
      const f = 880 - 300 * p;
      const env = Math.exp(-t * 40);
      return (sine(f, t) * 0.5 + sine(f * 1.5, t) * 0.12) * env;
    }),

  // airy transition sweep
  'whoosh.wav': () =>
    createWav(0.52, (t, p) => {
      const env = Math.sin(Math.pow(p, 0.75) * Math.PI) ** 1.4;
      const sweep = 180 + 900 * Math.sin(p * Math.PI);
      const air = noise() * 0.55 + noise2() * 0.25;
      const tone = sine(sweep, t) * 0.22;
      return (air * 0.5 + tone) * env;
    }),

  // gentle riser for build-ups
  'riser.wav': () =>
    createWav(0.95, (t, p) => {
      const env = Math.pow(p, 1.6) * (1 - Math.max(0, p - 0.92) * 12);
      const f = 220 + 780 * p;
      const shimmer = sine(f, t) * 0.28 + sine(f * 1.5, t) * 0.1;
      return (shimmer + noise() * 0.12) * env;
    }),

  // clean notification ding
  'ding.wav': () =>
    createWav(0.62, (t) => {
      const env = Math.exp(-t * 7.5);
      return (
        sine(1046.5, t) * 0.5 + sine(1567.98, t) * 0.26 + sine(2093, t) * 0.08
      ) * env;
    }),

  // two-note confirmation
  'success.wav': () =>
    createWav(0.8, (t) => {
      const second = t >= 0.12;
      const f = second ? 880 : 659.25;
      const local = second ? t - 0.12 : t;
      const env = Math.exp(-local * 7);
      return (sine(f, t) * 0.52 + sine(f * 1.5, t) * 0.16 + sine(f * 2, t) * 0.06) * env;
    }),

  // soft alert (never harsh)
  'warning.wav': () =>
    createWav(0.55, (t) => {
      const second = t >= 0.18;
      const f = second ? 392 : 466.16;
      const local = second ? t - 0.18 : t;
      const env = Math.exp(-local * 9);
      return (sine(f, t) * 0.42 + sine(f * 2, t) * 0.1) * env;
    }),

  // reveal shimmer (website transformation)
  'reveal.wav': () =>
    createWav(1.15, (t, p) => {
      const env = Math.min(1, t / 0.05) * Math.exp(-t * 2.8);
      const notes = [523.25, 659.25, 783.99, 1046.5];
      return notes.reduce(
        (acc, f, i) => acc + sine(f, t + i * 0.012) * (0.24 - i * 0.03),
        0
      ) * env;
    }),

  // warm brand resolution
  'chime.wav': () =>
    createWav(1.6, (t) => {
      const env = Math.min(1, t / 0.02) * Math.exp(-t * 2.2);
      const notes = [440, 554.37, 659.25, 880];
      return notes.reduce((acc, f) => acc + sine(f, t) * 0.2, 0) * env;
    }),

  // confirmation stamp (order placed)
  'stamp.wav': () =>
    createWav(0.42, (t) => {
      const thud = sine(150 * Math.exp(-t * 8) + 60, t) * Math.exp(-t * 16);
      const tick = noise() * Math.exp(-t * 120) * 0.4;
      return thud * 0.75 + tick;
    }),

  // soft counter tick
  'tick.wav': () =>
    createWav(0.06, (t) => sine(1650, t) * Math.exp(-t * 110) * 0.4),
};

const OUT = path.join(__dirname, '..', 'public', 'sfx');
fs.mkdirSync(OUT, { recursive: true });

for (const [name, build] of Object.entries(DEFINITIONS)) {
  fs.writeFileSync(path.join(OUT, name), build());
}

console.log(`Generated ${Object.keys(DEFINITIONS).length} SFX files in public/sfx/`);
