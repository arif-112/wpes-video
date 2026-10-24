import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 76.2;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

const MGMT_MODULES = [
  {
    id: 'stock',
    sec: 78.8,
    badge: 'AUTO INVENTORY',
    title: 'স্টক ম্যানেজমেন্ট',
    desc: 'অর্ডার হলেই স্টক অটো আপডেট ও লো-স্টক অ্যালার্ট',
    stat: '১৮ → ১৭ পিস (Auto-Synced)',
    icon: '📊',
    gradient: TOKENS.gradients.blueViolet,
  },
  {
    id: 'tracking',
    sec: 80.22,
    badge: 'LIVE TRACKING',
    title: 'অর্ডার ট্র্যাকিং',
    desc: 'পেন্ডিং, প্রসেসিং ও ডেলিভারি স্ট্যাটাস এক ড্যাশবোর্ডে',
    stat: 'Order #1084 • Out for Delivery',
    icon: '📍',
    gradient: TOKENS.gradients.purplePink,
  },
  {
    id: 'courier',
    sec: 81.6,
    badge: '1-CLICK DISPATCH',
    title: 'কুরিয়ার ইন্টিগ্রেশন',
    desc: 'এক ক্লিকেই কুরিয়ার বুকিং ও ইনভয়েস প্রিন্ট',
    stat: 'Courier API Connected ✓',
    icon: '🚛',
    gradient: TOKENS.gradients.emeraldTeal,
  },
];

export const ManagementScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);

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
          পুরো ব্যবসার ম্যানেজমেন্ট{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            হাতের মুঠোয়!
          </span>
        </div>
      </div>

      {/* 3 Operational Cards */}
      <div
        style={{
          marginTop: 44,
          width: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        {MGMT_MODULES.map((mod) => {
          const pop = springPop(frame, fps, relFrame(mod.sec));
          return (
            <div
              key={mod.id}
              style={{
                transform: `scale(${pop}) translateY(${(1 - pop) * 35}px)`,
                opacity: pop,
                borderRadius: 32,
                background: TOKENS.colors.surfaceWhite,
                boxShadow: TOKENS.gradients.cardGlow,
                border: '2px solid rgba(255,255,255,0.95)',
                padding: '30px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 26,
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 26,
                  background: mod.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44,
                  color: '#FFF',
                  boxShadow: '0 16px 32px rgba(99, 102, 241, 0.25)',
                }}
              >
                {mod.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 15,
                    fontWeight: 700,
                    color: TOKENS.colors.brandPrimary,
                    letterSpacing: 1,
                  }}
                >
                  {mod.badge}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 34,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                    marginTop: 2,
                  }}
                >
                  {mod.title}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 21,
                    color: TOKENS.colors.inkSecondary,
                    marginTop: 4,
                  }}
                >
                  {mod.desc}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 22px',
                  borderRadius: 18,
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  fontFamily: FONTS.display,
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#0F172A',
                }}
              >
                {mod.stat}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

