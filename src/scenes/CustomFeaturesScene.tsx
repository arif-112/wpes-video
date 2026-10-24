import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 85.0;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

const CUSTOM_FEATURES = [
  { icon: '🎁', title: 'ডিসকাউন্ট ও কুপন ইঞ্জিন', tag: 'Promo Rules' },
  { icon: '📦', title: 'পাইকারি ও কম্বো বান্ডেল', tag: 'Dynamic Pricing' },
  { icon: '💳', title: 'পেমেন্ট গেটওয়ে ও ক্যাশ অন ডেলিভারি', tag: 'Flexible Pay' },
  { icon: '⚡', title: 'হাই-স্পিড কাস্টম ল্যান্ডিং পেজ', tag: 'Conversion UI' },
];

export const CustomFeaturesScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const partnershipPop = springPop(frame, fps, relFrame(90.48));

  return (
    <AbsoluteFill
      style={{
        opacity: env.opacity,
        transform: `scale(${env.scale})`,
        alignItems: 'center',
      }}
    >
      {/* Headline */}
      <div
        style={{
          marginTop: 155,
          textAlign: 'center',
          transform: `translateY(${titleAnim.translateY}px)`,
          opacity: titleAnim.opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.bengali,
            fontSize: 54,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
          }}
        >
          বিশেষ ফিচার?{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            কাস্টমভাবেই সম্ভব!
          </span>
        </div>
      </div>

      {/* 2x2 Grid of Custom Feature Modules (inspired by reference 2x2 grid at 0:49) */}
      <div
        style={{
          marginTop: 42,
          width: 900,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {CUSTOM_FEATURES.map((feat, i) => {
          const pop = springPop(frame, fps, 8 + i * 7);
          return (
            <div
              key={feat.title}
              style={{
                transform: `scale(${pop})`,
                opacity: pop,
                borderRadius: 30,
                background: TOKENS.colors.surfaceWhite,
                boxShadow: TOKENS.gradients.cardGlow,
                border: '2px solid rgba(255,255,255,0.95)',
                padding: 30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 245,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 20,
                    background: '#F5F3FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 38,
                  }}
                >
                  {feat.icon}
                </div>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: '#EDE9FE',
                    color: '#6D28D9',
                    fontFamily: FONTS.mono,
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {feat.tag}
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 28,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                  lineHeight: 1.25,
                }}
              >
                {feat.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* "আইডিয়া আপনার, সেটাকে বাস্তবে রূপ দেওয়ার দায়িত্ব আমাদের!" (90.48s) */}
      <div
        style={{
          marginTop: 30,
          width: 900,
          transform: `scale(${partnershipPop}) translateY(${(1 - partnershipPop) * 30}px)`,
          opacity: partnershipPop,
          borderRadius: 32,
          padding: '30px 38px',
          background: TOKENS.gradients.purplePink,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 26px 55px -12px rgba(124, 58, 237, 0.45)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 48 }}>💡</span>
          <div>
            <div
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 33,
                fontWeight: 700,
              }}
            >
              আইডিয়া আপনার, বাস্তবে রূপ দেওয়ার দায়িত্ব আমাদের!
            </div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 19,
                opacity: 0.92,
                marginTop: 4,
              }}
            >
              Custom WordPress & WooCommerce Engineering • WP Expert Solution
            </div>
          </div>
        </div>
        <span style={{ fontSize: 44 }}>⚙️</span>
      </div>
    </AbsoluteFill>
  );
};

