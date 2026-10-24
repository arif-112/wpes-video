import { interpolate, spring, SpringConfig } from 'remotion';

export interface SpringLike {
  damping: number;
  stiffness: number;
  mass: number;
  overshootClamping?: boolean;
}

const toSpringConfig = (c: SpringLike): SpringConfig => ({
  overshootClamping: false,
  ...c,
});

export const SPRING: Record<'pop' | 'soft' | 'snappy', SpringLike> = {
  pop: { damping: 14, stiffness: 190, mass: 0.7 },
  soft: { damping: 22, stiffness: 110, mass: 0.9 },
  snappy: { damping: 18, stiffness: 240, mass: 0.6 },
};

/** Spring that starts at `delay` frames and clamps at 1. */
export const pop = (frame: number, fps: number, delay = 0, config: SpringLike = SPRING.pop) =>
  spring({ frame: frame - delay, fps, config: toSpringConfig(config) });

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/** 0 → 1 progress between two frames, clamped. */
export const progress = (
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = (t) => t
) => {
  if (end === start) return frame >= end ? 1 : 0;
  return easing(clamp((frame - start) / (end - start)));
};

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Fade + rise entrance. */
export const riseIn = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 42,
  config: SpringLike = SPRING.soft
) => {
  const s = spring({ frame: frame - delay, fps, config: toSpringConfig(config) });
  return {
    progress: s,
    opacity: clamp(s * 1.25),
    translateY: (1 - s) * distance,
    scale: 0.94 + s * 0.06,
  };
};

/** Scene-level opacity envelope with a small push and settle. */
export const sceneEnvelope = (
  frame: number,
  durationInFrames: number,
  fadeIn = 7,
  fadeOut = 7
) => {
  const enter = interpolate(frame, [0, fadeIn], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(
    frame,
    [durationInFrames - fadeOut, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const scale = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0.985, 1, 1, 1.015],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  return { opacity: enter * exit, scale };
};

/** A gentle deterministic float, used for ambient layers. */
export const float = (frame: number, offset = 0, speed = 0.035, range = 10) =>
  Math.sin(frame * speed + offset) * range;

/** Counts up from `from` to `to` over [start, end] frames. */
export const countTo = (
  frame: number,
  start: number,
  end: number,
  from: number,
  to: number
) => Math.round(from + (to - from) * progress(frame, start, end, easeOut));
