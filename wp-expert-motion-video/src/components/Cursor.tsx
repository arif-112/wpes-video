import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SPRING } from '../utils/animation';
import { C } from '../utils/tokens';

/**
 * Convincing cursor: spring-driven travel, anticipation dip, click ripple.
 * Coordinates are relative to the surrounding positioned container.
 */
export const Cursor: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  moveStart: number;
  moveEnd?: number;
  clickFrame?: number;
  hideAfter?: number;
  size?: number;
  rippleColor?: string;
}> = ({ fromX, fromY, toX, toY, moveStart, moveEnd, clickFrame, hideAfter, size = 46, rippleColor = C.coral }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const travel = spring({
    frame: frame - moveStart,
    fps,
    config: SPRING.soft,
  });

  // optional extra glide for a second target
  const settle =
    moveEnd !== undefined
      ? interpolate(frame, [moveEnd, moveEnd + 18], [1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  const x = interpolate(travel, [0, 1], [fromX, toX]) * settle;
  const y = interpolate(travel, [0, 1], [fromY, toY]) * settle;

  const press =
    clickFrame !== undefined
      ? interpolate(frame, [clickFrame - 3, clickFrame, clickFrame + 9], [1, 0.8, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  const ripple =
    clickFrame !== undefined
      ? interpolate(frame, [clickFrame, clickFrame + 22], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  const visible =
    frame >= moveStart - 2 && (hideAfter === undefined || frame <= hideAfter);

  if (!visible) return null;

  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 90, pointerEvents: 'none' }}>
      {clickFrame !== undefined && ripple > 0 && ripple < 1 ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: -30,
              top: -30,
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: `4px solid ${rippleColor}`,
              opacity: (1 - ripple) * 0.85,
              transform: `scale(${0.35 + ripple * 1.5})`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -18,
              top: -18,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: rippleColor,
              opacity: (1 - ripple) * 0.22,
              transform: `scale(${0.5 + ripple * 2})`,
            }}
          />
        </>
      ) : null}

      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          transform: `scale(${press})`,
          filter: 'drop-shadow(0 10px 16px rgba(23,19,49,0.35))',
          display: 'block',
        }}
      >
        <path
          d="M5 2.6 19.4 12l-6.9 1.9-3.2 6.6Z"
          fill={clickFrame !== undefined && frame >= clickFrame ? rippleColor : '#171331'}
          stroke="#FFFFFF"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
