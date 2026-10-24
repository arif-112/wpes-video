import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CursorProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  moveStartFrame: number;
  clickFrame?: number;
}

export const Cursor: React.FC<CursorProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  moveStartFrame,
  clickFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const moveProgress = spring({
    frame: frame - moveStartFrame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const x = interpolate(moveProgress, [0, 1], [fromX, toX]);
  const y = interpolate(moveProgress, [0, 1], [fromY, toY]);

  const isClicking =
    clickFrame !== undefined && frame >= clickFrame && frame <= clickFrame + 12;

  const cursorScale =
    clickFrame !== undefined
      ? interpolate(
          frame,
          [clickFrame - 2, clickFrame + 2, clickFrame + 8],
          [1, 0.82, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      : 1;

  const rippleProgress =
    clickFrame !== undefined
      ? interpolate(frame, [clickFrame, clickFrame + 16], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  if (frame < moveStartFrame - 5) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 60,
        pointerEvents: 'none',
      }}
    >
      {/* Click Ripple */}
      {rippleProgress > 0 && rippleProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            left: -32,
            top: -32,
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '4px solid #EC4899',
            transform: `scale(${0.4 + rippleProgress * 1.4})`,
            opacity: 1 - rippleProgress,
          }}
        />
      )}

      {/* Pointer SVG */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 36 36"
        style={{
          transform: `scale(${cursorScale})`,
          filter: 'drop-shadow(0 8px 14px rgba(19, 17, 41, 0.35))',
        }}
      >
        <path
          d="M7 4L29 15.5L18.5 19L14.5 29.5L7 4Z"
          fill={isClicking ? '#EC4899' : '#131129'}
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

