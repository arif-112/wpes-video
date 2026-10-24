import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CAPTION_CUES } from '../data/captions';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

export const CaptionBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeCue = CAPTION_CUES.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame
  );

  if (!activeCue) return null;

  const cueProgress = spring({
    frame: frame - activeCue.startFrame,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.7 },
  });

  const exitOpacity = interpolate(
    frame,
    [activeCue.endFrame - 5, activeCue.endFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const containerY = interpolate(cueProgress, [0, 1], [24, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 205,
        left: 56,
        right: 56,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 80,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 940,
          padding: '22px 38px',
          borderRadius: 30,
          background: 'rgba(255, 255, 255, 0.94)',
          border: '2px solid rgba(139, 92, 246, 0.22)',
          boxShadow:
            '0 22px 50px -10px rgba(19, 17, 41, 0.16), 0 6px 18px -4px rgba(99, 102, 241, 0.12)',
          backdropFilter: 'blur(16px)',
          transform: `translateY(${containerY}px) scale(${0.96 + cueProgress * 0.04})`,
          opacity: cueProgress * exitOpacity,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px 12px',
        }}
      >
        {activeCue.words.map((word, idx) => {
          const isSpoken = frame >= word.startFrame;
          const isCurrentlySpeaking =
            frame >= word.startFrame && frame <= word.endFrame + 4;

          const wordPop = spring({
            frame: Math.max(0, frame - word.startFrame),
            fps,
            config: { damping: 14, stiffness: 220 },
          });

          const scale = isCurrentlySpeaking
            ? interpolate(wordPop, [0, 0.6, 1], [0.95, 1.07, 1.03])
            : 1;

          const isHighlighted = word.highlight && isSpoken;

          return (
            <span
              key={`${activeCue.id}-${idx}`}
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 40,
                fontWeight: isHighlighted || isCurrentlySpeaking ? 700 : 600,
                lineHeight: 1.32,
                padding: isHighlighted ? '2px 14px' : '2px 4px',
                borderRadius: 14,
                background: isHighlighted
                  ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.14) 0%, rgba(236, 72, 153, 0.14) 100%)'
                  : 'transparent',
                color: !isSpoken
                  ? '#94A3B8'
                  : isHighlighted
                  ? '#6D28D9'
                  : TOKENS.colors.inkPrimary,
                transform: `scale(${scale})`,
                transition: 'color 0.06s ease',
                display: 'inline-block',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

