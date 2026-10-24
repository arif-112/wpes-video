import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

export const BrandHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 0.92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 68,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 40,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 24px',
          borderRadius: TOKENS.radii.pill,
          background: 'rgba(255, 255, 255, 0.82)',
          border: '1.5px solid rgba(139, 92, 246, 0.18)',
          boxShadow: '0 8px 24px -6px rgba(99, 102, 241, 0.14)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 9,
            background: TOKENS.gradients.purplePink,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: -0.5,
          }}
        >
          W
        </div>
        <span
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 21,
            color: TOKENS.colors.inkPrimary,
            letterSpacing: -0.3,
          }}
        >
          WP Expert Solution
        </span>
      </div>
    </div>
  );
};

