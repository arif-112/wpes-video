import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS } from '../utils/typography';

/**
 * Small, unobtrusive brand label. It is a typographic treatment only —
 * no official logo has been supplied, so none is invented.
 */
export const BrandHeader: React.FC<{ hideAt?: number }> = ({ hideAt = Infinity }) => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(frame, [hideAt - 10, hideAt], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 62,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: enter * exit,
        transform: `translateY(${(1 - enter) * -12}px)`,
        zIndex: 70,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '9px 22px 9px 10px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.86)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: SHADOW.cardSoft,
          backdropFilter: 'blur(14px)',
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            background: G.brand,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: -1,
            boxShadow: '0 8px 18px -8px rgba(91,84,240,0.7)',
          }}
        >
          W
        </div>
        <span
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 23,
            color: C.ink,
            letterSpacing: -0.4,
          }}
        >
          WP Expert Solution
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: C.teal,
            marginRight: 4,
          }}
        />
      </div>
    </div>
  );
};
