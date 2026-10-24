import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloatingBadge } from '../components/FloatingBadge';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

// Scene starts at 12.6s (frame 378)
const SCENE_START_SEC = 12.6;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

const INBOX_QUESTIONS = [
  {
    id: 'q1',
    sec: 17.58,
    user: 'রহিম আহমেদ',
    avatar: '🧑🏽',
    question: 'ভাই, দাম কত? Inbox please!',
    tag: 'Price?',
    color: '#6366F1',
    bg: '#EEF2FF',
  },
  {
    id: 'q2',
    sec: 18.92,
    user: 'সাদিয়া ইসলাম',
    avatar: '👩🏽',
    question: 'কালার আছে? অন্য কালার দেখান তো!',
    tag: 'Color?',
    color: '#EC4899',
    bg: '#FDF2F8',
  },
  {
    id: 'q3',
    sec: 19.8,
    user: 'তানভীর হাসান',
    avatar: '🧔🏽',
    question: 'সাইজ কী কী আছে? L বা XL হবে?',
    tag: 'Size?',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
  {
    id: 'q4',
    sec: 20.66,
    user: 'নুসরাত জাহান',
    avatar: '🧕🏽',
    question: 'ঢাকার বাইরে ডেলিভারি চার্জ কত?',
    tag: 'Delivery?',
    color: '#F97316',
    bg: '#FFF7ED',
  },
];

export const InboxScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const headerAnim = fadeSlideUp(frame, fps, 2, 30);

  // Animated hours counter as inbox messages pile up
  const unreadCount = Math.floor(
    interpolate(frame, [0, relFrame(21.74), relFrame(27.5)], [12, 99, 248], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const quizMode = frame >= relFrame(24.5);
  const quizPop = springPop(frame, fps, relFrame(24.5));

  return (
    <AbsoluteFill
      style={{
        opacity: env.opacity,
        transform: `scale(${env.scale})`,
        alignItems: 'center',
      }}
    >
      {/* Top Clock + Headline */}
      <div
        style={{
          marginTop: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateY(${headerAnim.translateY}px)`,
          opacity: headerAnim.opacity,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '10px 26px',
            borderRadius: 99,
            background: '#FEF2F2',
            border: '1.5px solid #FECACA',
            marginBottom: 18,
          }}
        >
          <span style={{ fontSize: 28 }}>⏱️</span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 28,
              fontWeight: 700,
              color: '#DC2626',
            }}
          >
            INBOX REPLIES: {unreadCount}+ UNREAD
          </span>
        </div>

        <div
          style={{
            fontFamily: FONTS.bengali,
            fontSize: 54,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
            textAlign: 'center',
          }}
        >
          সারাদিন শুধু{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            একই প্রশ্নের রিপ্লাই!
          </span>
        </div>
      </div>

      <FloatingBadge
        x={76}
        y={420}
        size={80}
        gradient={TOKENS.gradients.orangeCoral}
        delay={8}
      >
        <span style={{ fontSize: 38 }}>📨</span>
      </FloatingBadge>

      <FloatingBadge
        x={920}
        y={450}
        size={80}
        gradient={TOKENS.gradients.purplePink}
        delay={15}
      >
        <span style={{ fontSize: 38 }}>⏳</span>
      </FloatingBadge>

      {/* Main Inbox Container Card */}
      <div
        style={{
          marginTop: 38,
          width: 900,
          borderRadius: TOKENS.radii.cardLg,
          background: TOKENS.colors.surfaceWhite,
          boxShadow: TOKENS.gradients.cardGlow,
          border: '2px solid rgba(255,255,255,0.95)',
          padding: 34,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
        }}
      >
        {/* Inbox Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            borderBottom: '1.5px solid #F1F5F9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#1877F2',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              💬
            </div>
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 26,
                fontWeight: 800,
                color: TOKENS.colors.inkPrimary,
              }}
            >
              Page Inbox Queue
            </span>
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: 99,
              background: '#FEE2E2',
              color: '#DC2626',
              fontFamily: FONTS.bengali,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            অপেক্ষমাণ মেসেজ: {unreadCount}টি
          </div>
        </div>

        {/* 4 Synchronized Customer Question Cards */}
        {INBOX_QUESTIONS.map((item) => {
          const pop = springPop(frame, fps, relFrame(item.sec));
          return (
            <div
              key={item.id}
              style={{
                transform: `scale(${pop}) translateY(${(1 - pop) * 30}px)`,
                opacity: pop,
                borderRadius: 24,
                padding: '22px 26px',
                background: item.bg,
                border: `2px solid ${item.color}30`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 10px 24px -8px rgba(19, 17, 41, 0.08)',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                }}
              >
                {item.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 19,
                    fontWeight: 600,
                    color: TOKENS.colors.inkSecondary,
                  }}
                >
                  {item.user}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 30,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  “{item.question}”
                </div>
              </div>
              <div
                style={{
                  padding: '10px 20px',
                  borderRadius: 99,
                  background: item.color,
                  color: '#FFFFFF',
                  fontFamily: FONTS.display,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {item.tag}
              </div>
            </div>
          );
        })}

        {/* Quiz Show Metaphor Banner (24.5s - 28.6s) */}
        {quizMode && (
          <div
            style={{
              marginTop: 8,
              transform: `scale(${quizPop})`,
              opacity: quizPop,
              borderRadius: 26,
              padding: '22px 30px',
              background: TOKENS.gradients.purplePink,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 20px 45px -10px rgba(124, 58, 237, 0.45)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ fontSize: 44 }}>🎙️</span>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  ব্যবসা করছি, নাকি সারাদিন প্রশ্নোত্তর প্রতিযোগিতা?
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 19,
                    opacity: 0.9,
                  }}
                >
                  কপি-পেস্ট রিপ্লাই দিতেই দিনের সেরা সময় শেষ!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

