import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { TOKENS } from '../utils/tokens';

export const VideoBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const orb1X = interpolate(Math.sin(frame / 55), [-1, 1], [-80, 120]);
  const orb1Y = interpolate(Math.cos(frame / 70), [-1, 1], [-60, 90]);

  const orb2X = interpolate(Math.cos(frame / 65), [-1, 1], [80, -100]);
  const orb2Y = interpolate(Math.sin(frame / 50), [-1, 1], [-90, 70]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${TOKENS.colors.bgBase} 0%, #F4EFFF 62%, #EDE5FF 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Top-left soft violet mesh orb */}
      <div
        style={{
          position: 'absolute',
          top: 120 + orb1Y,
          left: -120 + orb1X,
          width: 680,
          height: 680,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(167, 139, 250, 0.28) 0%, rgba(167, 139, 250, 0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Center-right warm pink/peach mesh orb */}
      <div
        style={{
          position: 'absolute',
          top: 580 + orb2Y,
          right: -140 + orb2X,
          width: 720,
          height: 720,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(244, 114, 182, 0.20) 0%, rgba(251, 146, 60, 0.08) 45%, rgba(244, 114, 182, 0) 72%)',
          filter: 'blur(36px)',
        }}
      />

      {/* Lower sky-blue ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 180 - orb1Y * 0.6,
          left: 180 - orb2X * 0.5,
          width: 640,
          height: 640,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Subtle studio floor horizon glow matching reference style */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          background:
            'linear-gradient(180deg, rgba(237, 229, 255, 0) 0%, rgba(216, 199, 255, 0.42) 70%, rgba(250, 248, 255, 0.9) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

