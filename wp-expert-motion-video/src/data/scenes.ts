export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  /**
   * Narration: 0.20s → 122.12s (voiceover.wav is 122.16s long).
   * 3705 frames = 123.5s → a calm 1.4s resolve after the last word.
   */
  durationInFrames: 3705,
  voiceover: 'audio/voiceover.wav',
} as const;

export interface SceneDefinition {
  id: SceneId;
  title: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}

export type SceneId =
  | 'hook'
  | 'inbox'
  | 'manual'
  | 'risk'
  | 'reveal'
  | 'ordering'
  | 'management'
  | 'custom'
  | 'trust'
  | 'cta';

/** Scene boundaries derived from the narration's beats (seconds). */
const RAW: Array<{ id: SceneId; title: string; startSec: number; endSec: number }> = [
  { id: 'hook', title: 'Hook — Facebook dependence', startSec: 0.0, endSec: 12.6 },
  { id: 'inbox', title: 'Problem — repeated inbox questions', startSec: 12.6, endSec: 28.6 },
  { id: 'manual', title: 'Problem — manual operations', startSec: 28.6, endSec: 37.4 },
  { id: 'risk', title: 'Problem — platform risk', startSec: 37.4, endSec: 52.9 },
  { id: 'reveal', title: 'Solution — own website', startSec: 52.9, endSec: 64.0 },
  { id: 'ordering', title: 'Solution — easy ordering', startSec: 64.0, endSec: 76.2 },
  { id: 'management', title: 'Solution — operations', startSec: 76.2, endSec: 85.0 },
  { id: 'custom', title: 'Solution — custom features', startSec: 85.0, endSec: 94.2 },
  { id: 'trust', title: 'Trust — professional identity', startSec: 94.2, endSec: 112.2 },
  { id: 'cta', title: 'CTA — WP Expert Solution', startSec: 112.2, endSec: 123.5 },
];

const f = (sec: number) => Math.round(sec * VIDEO.fps);

export const SCENES: SceneDefinition[] = RAW.map((s) => ({
  ...s,
  startFrame: f(s.startSec),
  endFrame: f(s.endSec),
  durationInFrames: f(s.endSec) - f(s.startSec),
}));

export const SCENE = (id: SceneId): SceneDefinition => {
  const scene = SCENES.find((s) => s.id === id);
  if (!scene) throw new Error(`Unknown scene: ${id}`);
  return scene;
};

/** Absolute scene frame from an absolute narration timestamp. */
export const at = (id: SceneId, seconds: number): number =>
  Math.round(seconds * VIDEO.fps) - SCENE(id).startFrame;

/** Absolute frame from a timestamp in seconds. */
export const frameAt = (seconds: number): number => Math.round(seconds * VIDEO.fps);
