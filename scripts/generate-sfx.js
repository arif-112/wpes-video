const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

function createWavBuffer(durationSec, generatorFn) {
  const numSamples = Math.floor(SAMPLE_RATE * durationSec);
  const dataSize = numSamples * 2; // 16-bit mono
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // PCM chunk size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(1, 22);  // Mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);  // Block align
  buffer.writeUInt16LE(16, 34); // Bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const raw = generatorFn(t, progress);
    const clamped = Math.max(-1, Math.min(1, raw));
    const intSample = Math.floor(clamped * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  return buffer;
}

const sfxDefinitions = {
  // Crisp bubble pop for incoming messages & badges
  'pop.wav': () =>
    createWavBuffer(0.14, (t, p) => {
      const freq = 320 + 520 * Math.pow(p, 0.45);
      const env = Math.sin(p * Math.PI) * Math.exp(-t * 18);
      return Math.sin(2 * Math.PI * freq * t) * env * 0.75;
    }),

  // Tactile UI click for cursor presses
  'click.wav': () =>
    createWavBuffer(0.06, (t, p) => {
      const freq = 1100 * Math.exp(-t * 45) + 180;
      const env = Math.exp(-t * 65);
      const noise = (Math.sin(t * 43758.5453) % 1) * 0.25;
      return (Math.sin(2 * Math.PI * freq * t) * 0.75 + noise) * env * 0.8;
    }),

  // Smooth airy transition whoosh
  'whoosh.wav': () =>
    createWavBuffer(0.38, (t, p) => {
      const env = Math.sin(p * Math.PI) * Math.pow(1 - Math.abs(p - 0.45), 1.4);
      const sweepFreq = 140 + 420 * Math.sin(p * Math.PI);
      const deterministicNoise =
        Math.sin(t * 9431.7) * 0.35 +
        Math.sin(t * 17389.3) * 0.25 +
        Math.sin(2 * Math.PI * sweepFreq * t) * 0.4;
      return deterministicNoise * env * 0.55;
    }),

  // Pleasant notification ding
  'ding.wav': () =>
    createWavBuffer(0.45, (t) => {
      const f1 = 1046.5; // C6
      const f2 = 1567.98; // G6
      const env1 = Math.exp(-t * 8.5);
      const env2 = Math.exp(-t * 14);
      return (
        (Math.sin(2 * Math.PI * f1 * t) * env1 * 0.6 +
          Math.sin(2 * Math.PI * f2 * t) * env2 * 0.35) *
        0.7
      );
    }),

  // Subtle alert tone for manual overload / platform risk
  'warning.wav': () =>
    createWavBuffer(0.32, (t) => {
      const freq = t < 0.15 ? 440 : 370;
      const localT = t < 0.15 ? t : t - 0.15;
      const env = Math.exp(-localT * 14);
      return (
        (Math.sin(2 * Math.PI * freq * t) * 0.65 +
          Math.sin(2 * Math.PI * (freq * 2) * t) * 0.25) *
        env *
        0.65
      );
    }),

  // Upward two-note confirmation chime
  'success.wav': () =>
    createWavBuffer(0.55, (t) => {
      const isSecond = t >= 0.11;
      const freq = isSecond ? 783.99 : 587.33; // D5 -> G5
      const localT = isSecond ? t - 0.11 : t;
      const env = Math.exp(-localT * 7.5);
      return (
        (Math.sin(2 * Math.PI * freq * t) * 0.65 +
          Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.25) *
        env *
        0.75
      );
    }),

  // Shimmering chord for website reveal transformation
  'reveal.wav': () =>
    createWavBuffer(0.85, (t, p) => {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5 Major 7 shimmer
      const attack = Math.min(1, p * 8);
      const decay = Math.exp(-t * 3.8);
      const sum = freqs.reduce(
        (acc, f, idx) =>
          acc + Math.sin(2 * Math.PI * f * t + idx * 0.4) * (0.3 - idx * 0.04),
        0
      );
      return sum * attack * decay * 0.75;
    }),

  // Warm brand resolution chime for final CTA
  'chime.wav': () =>
    createWavBuffer(1.1, (t, p) => {
      const freqs = [440, 554.37, 659.25, 880]; // A Major warm triad
      const attack = Math.min(1, p * 10);
      const decay = Math.exp(-t * 2.9);
      const sum = freqs.reduce(
        (acc, f) => acc + Math.sin(2 * Math.PI * f * t) * 0.25,
        0
      );
      return sum * attack * decay * 0.8;
    }),

  // Soft counter/step tick
  'tick.wav': () =>
    createWavBuffer(0.04, (t) => {
      const env = Math.exp(-t * 95);
      return Math.sin(2 * Math.PI * 1650 * t) * env * 0.55;
    }),
};

function main() {
  const sfxDir = path.join(__dirname, '..', 'public', 'sfx');
  const audioDir = path.join(__dirname, '..', 'public', 'audio');
  fs.mkdirSync(sfxDir, { recursive: true });
  fs.mkdirSync(audioDir, { recursive: true });

  for (const [filename, buildFn] of Object.entries(sfxDefinitions)) {
    const filePath = path.join(sfxDir, filename);
    fs.writeFileSync(filePath, buildFn());
  }

  // Check if user placed cartesia voiceover in project root or public/audio
  const targetVoiceover = path.join(audioDir, 'voiceover.wav');
  const possibleRootAudio = path.join(
    __dirname,
    '..',
    'cartesia_2026-10-21T15_15_40Z_Rupam_sonic-3.6_bn-BD.wav'
  );

  if (!fs.existsSync(targetVoiceover)) {
    if (fs.existsSync(possibleRootAudio)) {
      fs.copyFileSync(possibleRootAudio, targetVoiceover);
      console.log('Copied cartesia voiceover into public/audio/voiceover.wav');
    } else {
      // Create a silent fallback WAV (123.5s) only if real voiceover has not been placed yet
      const fallbackWav = createWavBuffer(1.0, () => 0);
      fs.writeFileSync(targetVoiceover, fallbackWav);
      console.log(
        'Note: Created placeholder public/audio/voiceover.wav. Replace it with your actual voiceover audio file before rendering.'
      );
    }
  }

  console.log('SFX assets ready in public/sfx/');
}

main();

