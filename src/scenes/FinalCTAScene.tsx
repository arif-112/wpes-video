import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloatingBadge } from '../components/FloatingBadge';
import { fadeSlideUp, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 112.2;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

export const FinalCTAScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const cardPop = springPop(frame, fps, 8);
  const brandRevealPop = springPop(frame, fps, relFrame(117.0));
  const nextStepPop = springPop(frame, fps, relFrame(119.5));

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity,
        alignItems: 'center',
      }}
    >
      {/* Top Headline */}
      <div
        style={{
          marginTop: 155,
          textAlign: 'center',
          transform: `translateY(${titleAnim.translateY}px)`,
          opacity: titleAnim.opacity,
          padding: '0 50px',
        }}
      >
        <div
          style={{
            fontFamily: FONTS.bengali,
            fontSize: 56,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
            lineHeight: 1.25,
          }}
        >
          আপনার ব্যবসার{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            পরবর্তী ধাপ শুরু হোক আজই!
          </span>
        </div>
      </div>

      {/* Floating Badges */}
      <FloatingBadge
        x={80}
        y={420}
        size={84}
        gradient={TOKENS.gradients.blueViolet}
        delay={10}
      >
        <span style={{ fontSize: 40 }}>💬</span>
      </FloatingBadge>

      <FloatingBadge
        x={916}
        y={440}
        size={84}
        gradient={TOKENS.gradients.orangeCoral}
        delay={16}
      >
        <span style={{ fontSize: 40 }}>🚀</span>
      </FloatingBadge>

      {/* Main WP Expert Solution Brand CTA Card */}
      <div
        style={{
          marginTop: 48,
          width: 900,
          transform: `scale(${cardPop})`,
          borderRadius: 40,
          background: TOKENS.colors.surfaceWhite,
          boxShadow: TOKENS.gradients.cardGlow,
          border: '2.5px solid rgba(139, 92, 246, 0.25)',
          padding: '46px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 26,
        }}
      >
        {/* Brand Identity Emblem */}
        <div
          style={{
            transform: `scale(${0.9 + brandRevealPop * 0.1})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 108,
              height: 108,
              borderRadius: 32,
              background: TOKENS.gradients.purplePink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: FONTS.display,
              fontSize: 54,
              fontWeight: 800,
              boxShadow: '0 22px 44px -8px rgba(124, 58, 237, 0.45)',
            }}
          >
            W
          </div>

          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 48,
              fontWeight: 800,
              color: TOKENS.colors.inkPrimary,
              letterSpacing: -0.8,
            }}
          >
            WP Expert Solution
          </div>

          <div
            style={{
              fontFamily: FONTS.bengali,
              fontSize: 25,
              fontWeight: 600,
              color: TOKENS.colors.inkSecondary,
            }}
          >
            আপনার ব্যবসার জন্য কেমন ওয়েবসাইট দরকার, কথা বলুন আমাদের সঙ্গে
          </div>
        </div>

        {/* Service Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          {[
            '🌐 ই-কমার্স ওয়েবসাইট',
            '⚡ Buy Now ও দ্রুত চেকআউট',
            '📦 স্টক ও কুরিয়ার অটোমেশন',
            '🛠️ কাস্টম ফিচার ডেভেলপমেন্ট',
          ].map((pill) => (
            <span
              key={pill}
              style={{
                padding: '12px 24px',
                borderRadius: 99,
                background: '#F5F3FF',
                border: '1.5px solid #DDD6FE',
                fontFamily: FONTS.bengali,
                fontSize: 22,
                fontWeight: 700,
                color: '#5B21B6',
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Final CTA Button Banner (117.0s -> 123.5s) */}
        <div
          style={{
            marginTop: 8,
            width: '100%',
            transform: `scale(${0.92 + nextStepPop * 0.08})`,
            borderRadius: 28,
            padding: '28px 36px',
            background: TOKENS.gradients.purplePink,
            color: '#FFFFFF',
            boxShadow: '0 22px 48px -10px rgba(236, 72, 153, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              আজই যোগাযোগ করুন WP Expert Solution-এর সঙ্গে
            </div>
            <div
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 21,
                opacity: 0.92,
                marginTop: 4,
              }}
            >
              পরবর্তী ধাপ শুরু হোক আপনার নিজের ওয়েবসাইট দিয়ে!
            </div>
          </div>

          <div
            style={{
              padding: '16px 28px',
              borderRadius: 99,
              background: '#FFFFFF',
              color: '#6D28D9',
              fontFamily: FONTS.bengali,
              fontSize: 24,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            মেসেজ দিন →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

