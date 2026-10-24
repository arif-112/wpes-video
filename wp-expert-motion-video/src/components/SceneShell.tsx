import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { sceneEnvelope } from '../utils/animation';

/**
 * Shared scene envelope: a short fade/scale in and out so neighbouring
 * scenes hand over cleanly on top of the continuous background.
 */
export const SceneShell: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  fadeIn?: number;
  fadeOut?: number;
}> = ({ durationInFrames, children, style, fadeIn = 5, fadeOut = 8 }) => {
  const frame = useCurrentFrame();
  const env = sceneEnvelope(frame, durationInFrames, fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        opacity: env.opacity,
        transform: `scale(${env.scale})`,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
