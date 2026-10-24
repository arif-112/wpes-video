import { interpolate, spring } from 'remotion';

export const springPop = (
  frame: number,
  fps: number,
  delay = 0,
  config = { damping: 13, stiffness: 160, mass: 0.8 }
) => {
  return spring({
    frame: frame - delay,
    fps,
    config,
  });
};

export const springSmooth = (
  frame: number,
  fps: number,
  delay = 0,
  config = { damping: 20, stiffness: 110, mass: 0.9 }
) => {
  return spring({
    frame: frame - delay,
    fps,
    config,
  });
};

export const fadeSlideUp = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 40
) => {
  const progress = springSmooth(frame, fps, delay);
  const opacity = interpolate(progress, [0, 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(progress, [0, 1], [distance, 0]);
  return { opacity, translateY, progress };
};

export const sceneEnvelope = (
  frame: number,
  durationInFrames: number,
  fadeInFrames = 10,
  fadeOutFrames = 10
) => {
  const enter = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(
    frame,
    [durationInFrames - fadeOutFrames, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const scale = interpolate(
    frame,
    [0, fadeInFrames, durationInFrames - fadeOutFrames, durationInFrames],
    [0.95, 1, 1, 1.03],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  return { opacity: enter * exit, scale };
};

