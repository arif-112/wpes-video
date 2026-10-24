import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Cursor } from '../components/Cursor';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 64.0;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

export const OrderingScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const clickFrame = relFrame(67.45);
  const isClicked = frame >= clickFrame;
  const orderConfirmedPop = springPop(frame, fps, relFrame(68.2));
  const timeSavedPop = springPop(frame, fps, relFrame(72.9));

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
            fontSize: 56,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
          }}
        >
          কয়েকটি সহজ ধাপেই{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            সরাসরি অর্ডার!
          </span>
        </div>
      </div>

      {/* Main Interactive Checkout Card */}
      <div
        style={{
          marginTop: 42,
          width: 880,
          borderRadius: TOKENS.radii.cardLg,
          background: TOKENS.colors.surfaceWhite,
          boxShadow: TOKENS.gradients.cardGlow,
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
        }}
      >
        {/* 3 Step Pill Progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          {[
            { label: '১. পছন্দ করুন', active: true },
            { label: '২. Buy Now ক্লিক', active: frame >= relFrame(67.0) },
            { label: '৩. অর্ডার কনফার্মড!', active: frame >= relFrame(68.2) },
          ].map((step) => (
            <div
              key={step.label}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: 99,
                background: step.active ? TOKENS.gradients.purplePink : '#F1F5F9',
                color: step.active ? '#FFFFFF' : TOKENS.colors.inkSecondary,
                fontFamily: FONTS.bengali,
                fontSize: 22,
                fontWeight: 700,
                textAlign: 'center',
                boxShadow: step.active
                  ? '0 10px 24px rgba(124, 58, 237, 0.25)'
                  : 'none',
              }}
            >
              {step.label}
            </div>
          ))}
        </div>

        {/* Product Summary + Buy Now Button */}
        <div
          style={{
            borderRadius: 28,
            background: '#F8FAFC',
            border: '2px solid #E2E8F0',
            padding: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 22,
                background: '#EDE9FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 52,
              }}
            >
              👟
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
                প্রিমিয়াম স্নিকার্স • সাইজ 42
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#6D28D9',
                  marginTop: 4,
                }}
              >
                ৳ ২,৪৫০ (ডেলিভারিসহ)
              </div>
            </div>
          </div>

          {/* Interactive Buy Now Button */}
          <div
            style={{
              padding: '22px 42px',
              borderRadius: 22,
              background: isClicked
                ? TOKENS.gradients.emeraldTeal
                : TOKENS.gradients.orangeCoral,
              color: '#FFFFFF',
              fontFamily: FONTS.display,
              fontSize: 26,
              fontWeight: 800,
              transform: `scale(${
                frame >= clickFrame && frame <= clickFrame + 6 ? 0.92 : 1
              })`,
              boxShadow: '0 16px 32px rgba(249, 115, 22, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span>{isClicked ? '✓ Ordered' : '⚡ Buy Now'}</span>
          </div>
        </div>

        {/* Instant Order Confirmation Card (68.2s) */}
        <div
          style={{
            transform: `scale(${orderConfirmedPop})`,
            opacity: orderConfirmedPop,
            borderRadius: 26,
            padding: '24px 30px',
            background: '#ECFDF5',
            border: '2px solid #34D399',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: '#10B981',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
            }}
          >
            🎉
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 28,
                fontWeight: 700,
                color: '#065F46',
              }}
            >
              অর্ডার #1084 স্বয়ংক্রিয়ভাবে কনফার্ম হয়েছে!
            </div>
            <div
              style={{
                fontFamily: FONTS.bengali,
                fontSize: 20,
                color: '#047857',
              }}
            >
              বারবার ইনবক্সে একই তথ্য পাঠানোর কোনো ঝামেলা নেই
            </div>
          </div>
        </div>

        {/* Time Saved & Customer Ease Dual Benefit (72.9s) */}
        <div
          style={{
            transform: `scale(${timeSavedPop})`,
            opacity: timeSavedPop,
            display: 'flex',
            gap: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              padding: '22px 26px',
              background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
              border: '1.5px solid #C4B5FD',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 40 }}>⚡</span>
            <div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 25,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                }}
              >
                আপনার মূল্যবান সময় বাঁচছে
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 18,
                  color: TOKENS.colors.inkSecondary,
                }}
              >
                ২৪/৭ অটোমেটেড অর্ডার গ্রহণ
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 24,
              padding: '22px 26px',
              background: 'linear-gradient(135deg, #FDF2F8 0%, #FFF1F2 100%)',
              border: '1.5px solid #FBCFE8',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 40 }}>😊</span>
            <div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 25,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                }}
              >
                কাস্টমারের কেনাকাটা সহজ
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 18,
                  color: TOKENS.colors.inkSecondary,
                }}
              >
                অপেক্ষা ছাড়াই তাৎক্ষণিক চেকআউট
              </div>
            </div>
          </div>
        </div>

        {/* Animated Cursor clicking Buy Now */}
        <Cursor
          fromX={450}
          fromY={480}
          toX={720}
          toY={210}
          moveStartFrame={relFrame(66.5)}
          clickFrame={clickFrame}
        />
      </div>
    </AbsoluteFill>
  );
};

