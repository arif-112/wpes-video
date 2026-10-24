import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 37.4;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

export const PlatformRiskScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const riskCardPop = springPop(frame, fps, relFrame(38.5));
  const websitePillarPop = springPop(frame, fps, relFrame(47.0));
  const strongPlatformPop = springPop(frame, fps, relFrame(50.5));

  const showDualPlatform = frame >= relFrame(46.7);

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
          padding: '0 60px',
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
          {showDualPlatform ? (
            <>
              হাতে থাকুক{' '}
              <span
                style={{
                  background: TOKENS.gradients.brandText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                নিজের শক্তিশালী প্ল্যাটফর্ম!
              </span>
            </>
          ) : (
            <>
              হঠাৎ যেন ব্যবসা{' '}
              <span
                style={{
                  background: TOKENS.gradients.brandText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                বিপাকে না পড়ে!
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Comparison Stage */}
      <div
        style={{
          marginTop: 48,
          width: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {/* Card 1: Facebook Platform Uncertainties (38.5s) */}
        <div
          style={{
            transform: `scale(${riskCardPop})`,
            opacity: riskCardPop,
            borderRadius: 34,
            background: TOKENS.colors.surfaceWhite,
            boxShadow: TOKENS.gradients.cardGlow,
            padding: 34,
            border: '2px solid rgba(255,255,255,0.95)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 22,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: '#1877F2',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  fontWeight: 800,
                  fontFamily: FONTS.display,
                }}
              >
                f
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 28,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  Facebook অবশ্যই গুরুত্বপূর্ণ
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 19,
                    color: TOKENS.colors.inkSecondary,
                  }}
                >
                  কিন্তু শতভাগ নির্ভরশীলতায় যে ঝুঁকিগুলো থাকে:
                </div>
              </div>
            </div>
            <span
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                background: '#FEF3C7',
                color: '#B45309',
                fontFamily: FONTS.bengali,
                fontSize: 19,
                fontWeight: 700,
              }}
            >
              সতর্কতা ⚠️
            </span>
          </div>

          <div style={{ display: 'flex', gap: 18 }}>
            {[
              { title: 'অর্গানিক রিচ কমে যাওয়া', icon: '📉', bg: '#FEF2F2', border: '#FECACA' },
              { title: 'পলিসি বা অ্যাড রেস্ট্রিকশন', icon: '🛡️', bg: '#FFFBEB', border: '#FDE68A' },
              { title: 'পেজ বা একাউন্ট জটিলতা', icon: '🔒', bg: '#FAF5FF', border: '#E9D5FF' },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  flex: 1,
                  borderRadius: 22,
                  padding: '20px 18px',
                  background: item.bg,
                  border: `1.5px solid ${item.border}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 21,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Own Website Pillar Reveal (47.0s) */}
        <div
          style={{
            transform: `scale(${websitePillarPop}) translateY(${(1 - websitePillarPop) * 35}px)`,
            opacity: interpolate(websitePillarPop, [0, 1], [0, 1]),
            borderRadius: 34,
            background: TOKENS.colors.surfaceWhite,
            boxShadow: TOKENS.gradients.cardGlow,
            padding: 34,
            border: '2.5px solid rgba(139, 92, 246, 0.32)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 24,
                background: TOKENS.gradients.purplePink,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 42,
                color: '#FFF',
                boxShadow: '0 14px 28px rgba(124, 58, 237, 0.3)',
              }}
            >
              🌐
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: TOKENS.colors.brandViolet,
                }}
              >
                FACEBOOK + OWN WEBSITE
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 33,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                  marginTop: 4,
                }}
              >
                নিজের আলাদা ওয়েবসাইট = নিজস্ব অ্যাসেট
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 21,
                  color: TOKENS.colors.inkSecondary,
                  marginTop: 4,
                }}
              >
                ১০০% কন্ট্রোল, স্থায়ী ব্র্যান্ডিং এবং নিরবচ্ছিন্ন সেলস প্ল্যাটফর্ম
              </div>
            </div>
          </div>

          {/* Strong Platform Highlight Pill (50.5s) */}
          <div
            style={{
              marginTop: 24,
              transform: `scale(${strongPlatformPop})`,
              opacity: strongPlatformPop,
              borderRadius: 20,
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #ECFDF5 0%, #E0F2FE 100%)',
              border: '1.5px solid #6EE7B7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 24,
                fontWeight: 700,
                color: '#065F46',
              }}
            >
              ✅ Facebook পেজের পাশাপাশি আরেকটি শক্তিশালী প্ল্যাটফর্ম!
            </span>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: '#10B981',
                color: '#FFF',
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: 17,
              }}
            >
              100% Owned
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

