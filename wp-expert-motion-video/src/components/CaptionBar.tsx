import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CAPTION_CUES } from '../data/captions';
import { C, G, SAFE } from '../utils/tokens';
import { FONTS } from '../utils/typography';

/**
 * Bengali caption engine.
 *
 * - Cues are short phrases derived from the word-level Cartesia timings.
 * - A word becomes visible on its exact spoken frame; future words never
 *   appear early. Space is reserved up front so the block never reflows.
 * - Keyword highlights use the brand accent.
 */
export const CaptionBar: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = CAPTION_CUES.find((c) => frame >= c.startFrame && frame <= c.endFrame);

  if (!cue) return null;

  // Cues are chained almost back-to-back, so only a 2-frame soften is used —
  // anything longer reads as flicker at every phrase boundary.
  const enter = interpolate(frame, [cue.startFrame, cue.startFrame + 2], [0.35, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(frame, [cue.endFrame - 2, cue.endFrame], [1, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.side,
        width: 900,
        bottom: SAFE.captionBottom,
        height: 176,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 80,
        pointerEvents: 'none',
        opacity: enter * exit,
      }}
    >
      {/* accent bar */}
      <div
        style={{
          width: 5,
          height: 96,
          borderRadius: 999,
          background: G.brand,
          opacity: 0.9,
          marginRight: 22,
          flexShrink: 0,
        }}
      />

      <div
        style={{
          width: 846,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px 10px',
        }}
      >
        {cue.words.map((word, i) => {
          const spoken = frame >= word.startFrame;
          const speaking = frame >= word.startFrame && frame <= word.endFrame + 3;
          const pop = interpolate(
            frame,
            [word.startFrame, word.startFrame + 6],
            [0.86, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <span
              key={`${cue.id}-${i}`}
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 46,
                fontWeight: word.highlight ? 700 : 600,
                lineHeight: 1.42,
                color: word.highlight ? '#4B3BC9' : C.ink,
                opacity: spoken ? 1 : 0,
                transform: spoken ? `scale(${speaking ? 1.02 : 1})` : 'scale(0.9)',
                transformOrigin: 'left center',
                display: 'inline-block',
                padding: word.highlight ? '1px 12px' : '0',
                marginLeft: word.highlight ? 0 : 2,
                borderRadius: 12,
                background: word.highlight
                  ? 'linear-gradient(135deg, rgba(106,92,255,0.16) 0%, rgba(244,85,124,0.14) 100%)'
                  : 'transparent',
                textShadow: word.highlight ? 'none' : '0 2px 14px rgba(247,245,255,0.95)',
                letterSpacing: 0,
                whiteSpace: 'pre',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {/* subtle spoken progress */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 92,
          height: 3,
          borderRadius: 999,
          background: 'rgba(91,84,240,0.14)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(
              1,
              Math.max(0, (frame - cue.startFrame) / Math.max(1, cue.endFrame - cue.startFrame))
            ) * 100}%`,
            height: '100%',
            background: G.brand,
          }}
        />
      </div>
    </div>
  );
};
