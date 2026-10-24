import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, G } from '../utils/tokens';
import { float } from '../utils/animation';

/**
 * One continuous stage for the whole reel: soft mesh light, a fine grid and a
 * bottom scrim that keeps the caption area readable without a heavy box.
 */
export const VideoBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.bgTop} 0%, ${C.bgMid} 48%, ${C.bgBottom} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* fine grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(91,84,240,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(91,84,240,0.055) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'radial-gradient(ellipse 95% 70% at 50% 42%, #000 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 70% at 50% 42%, #000 25%, transparent 78%)',
        }}
      />

      {/* mesh lights */}
      <div
        style={{
          position: 'absolute',
          top: -220 + float(frame, 0, 0.012, 26),
          left: -240 + float(frame, 1.4, 0.014, 30),
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0) 68%)',
          filter: 'blur(28px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 520 + float(frame, 2.1, 0.011, 34),
          right: -300 + float(frame, 0.6, 0.013, 26),
          width: 980,
          height: 980,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,107,90,0.22) 0%, rgba(255,197,61,0.12) 42%, rgba(255,107,90,0) 72%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 120 + float(frame, 3.2, 0.01, 24),
          left: 90 + float(frame, 2.6, 0.012, 28),
          width: 820,
          height: 820,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,155,255,0.22) 0%, rgba(18,181,165,0.1) 45%, rgba(46,155,255,0) 72%)',
          filter: 'blur(34px)',
        }}
      />

      {/* soft brand ribbon */}
      <div
        style={{
          position: 'absolute',
          top: 1540,
          left: -160,
          width: 1400,
          height: 380,
          borderRadius: '50%',
          background: 'linear-gradient(90deg, rgba(106,92,255,0.14), rgba(244,85,124,0.12), rgba(18,181,165,0.12))',
          filter: 'blur(60px)',
          transform: `rotate(-6deg) translateY(${float(frame, 1, 0.008, 18)}px)`,
        }}
      />

      {/* caption scrim */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 520,
          background:
            'linear-gradient(180deg, rgba(240,235,255,0) 0%, rgba(242,237,255,0.72) 46%, rgba(245,241,255,0.96) 78%, rgba(245,241,255,0.98) 100%)',
        }}
      />

      {/* corner marks — quiet editorial detail */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          right: 60,
          width: 84,
          height: 84,
          borderTop: `2px solid ${C.line}`,
          borderRight: `2px solid ${C.line}`,
          borderTopRightRadius: 18,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 96,
          right: 96,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: G.brand,
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
