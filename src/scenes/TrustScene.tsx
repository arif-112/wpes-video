import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserWindow } from '../components/BrowserWindow';
import { FloatingBadge } from '../components/FloatingBadge';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 94.2;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

export const TrustScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const browserPop = springPop(frame, fps, 8);
  const identityBannerPop = springPop(frame, fps, relFrame(108.5));

  const checklistItems = [
    { sec: 96.2, text: 'নতুন কাস্টমারের কাছে তাৎক্ষণিক গ্রহণযোগ্যতা ও আস্থা' },
    { sec: 100.2, text: 'সুন্দর, গোছানো ও প্রফেশনাল প্রোডাক্ট প্রেজেন্টেশন' },
    { sec: 102.6, text: 'কাস্টমার রিভিউ, ক্লিয়ার পলিসি ও ভেরিফায়েড ব্র্যান্ড লুক' },
    { sec: 106.3, text: 'অন্যের প্ল্যাটফর্মে সীমাবদ্ধ না থেকে নিজস্ব অনলাইন পরিচয়' },
  ];

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
          marginTop: 150,
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
          কাস্টমারের{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            বিশ্বাস ও শক্তিশালী পরিচয়!
          </span>
        </div>
      </div>

      <FloatingBadge
        x={66}
        y={390}
        size={82}
        gradient={TOKENS.gradients.emeraldTeal}
        delay={10}
      >
        <span style={{ fontSize: 40 }}>🛡️</span>
      </FloatingBadge>

      <FloatingBadge
        x={932}
        y={410}
        size={82}
        gradient={TOKENS.gradients.purplePink}
        delay={16}
      >
        <span style={{ fontSize: 40 }}>⭐</span>
      </FloatingBadge>

      {/* Browser + Checklist Layout inspired by reference 0:54 */}
      <div
        style={{
          marginTop: 34,
          transform: `scale(${browserPop})`,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <BrowserWindow url="yourtrustedbrand.com" width={900} height={370}>
          <div
            style={{
              padding: '32px 38px',
              background: 'linear-gradient(135deg, #F5F3FF 0%, #FDF2F8 100%)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 520 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 99,
                  background: '#ECFDF5',
                  color: '#047857',
                  fontFamily: FONTS.display,
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                ✓ Verified Official Brand Store
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 36,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                  lineHeight: 1.25,
                }}
              >
                প্রফেশনাল ওয়েবসাইটে আপনার ব্র্যান্ডের প্রিমিয়াম উপস্থাপনা
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: FONTS.display,
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#F59E0B',
                }}
              >
                ★★★★★ 4.9/5 Customer Trust Score
              </div>
            </div>

            <div
              style={{
                width: 240,
                height: 210,
                borderRadius: 26,
                background: '#FFFFFF',
                boxShadow: '0 18px 36px rgba(99, 102, 241, 0.14)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 64 }}>🏆</span>
              <span
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 22,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                }}
              >
                বিশ্বস্ত অনলাইন শপ
              </span>
            </div>
          </div>
        </BrowserWindow>

        {/* Animated Checklist Card */}
        <div
          style={{
            width: 900,
            borderRadius: 32,
            background: TOKENS.colors.surfaceWhite,
            boxShadow: TOKENS.gradients.cardGlow,
            padding: '28px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {checklistItems.map((item, idx) => {
            const checked = frame >= relFrame(item.sec);
            const checkPop = springPop(frame, fps, relFrame(item.sec));
            return (
              <div
                key={item.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '12px 16px',
                  borderRadius: 18,
                  background: checked ? '#F0FDF4' : '#F8FAFC',
                  border: checked ? '1.5px solid #86EFAC' : '1.5px solid #E2E8F0',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: checked ? '#10B981' : '#E2E8F0',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONTS.display,
                    fontSize: 22,
                    fontWeight: 800,
                    transform: `scale(${checked ? 0.8 + checkPop * 0.2 : 1})`,
                  }}
                >
                  {checked ? '✓' : idx + 1}
                </div>
                <span
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 26,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}

          {/* Bottom Strong Online Identity Banner (108.5s) */}
          {frame >= relFrame(108.3) && (
            <div
              style={{
                transform: `scale(${identityBannerPop})`,
                opacity: identityBannerPop,
                borderRadius: 20,
                padding: '16px 24px',
                background: TOKENS.gradients.purplePink,
                color: '#FFFFFF',
                textAlign: 'center',
                fontFamily: FONTS.bengali,
                fontSize: 27,
                fontWeight: 700,
              }}
            >
              🌟 নিজের ব্যবসার জন্য তৈরি করুন একটি শক্তিশালী অনলাইন পরিচয়!
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

