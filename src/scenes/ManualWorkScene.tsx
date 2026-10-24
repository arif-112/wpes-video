import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 28.6;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

const MANUAL_TASKS = [
  {
    step: 'STEP 01',
    sec: 29.3,
    title: 'অর্ডার কনফার্ম (ম্যানুয়াল নোট)',
    desc: 'ইনবক্স থেকে নাম, ঠিকানা ও ফোন নম্বর খাতায় বা শীটে কপি করা',
    icon: '📝',
    gradient: TOKENS.gradients.blueViolet,
  },
  {
    step: 'STEP 02',
    sec: 30.76,
    title: 'স্টক চেক (গুদামে খোঁজাখুঁজি)',
    desc: 'প্রোডাক্ট আদৌ স্টকে আছে কি না তা বারবার ম্যানুয়ালি মিলিয়ে দেখা',
    icon: '📦',
    gradient: TOKENS.gradients.purplePink,
  },
  {
    step: 'STEP 03',
    sec: 31.9,
    title: 'কুরিয়ারের হিসাব ও এন্ট্রি',
    desc: 'আলাদা করে কুরিয়ার পোর্টালে ঢুকে একটা একটা করে পার্সেল বুকিং',
    icon: '🚚',
    gradient: TOKENS.gradients.orangeCoral,
  },
];

export const ManualWorkScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const growthQuestionPop = springPop(frame, fps, relFrame(35.6));

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
            fontSize: 56,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
          }}
        >
          সবই যদি{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ম্যানুয়ালি করেন...
          </span>
        </div>
      </div>

      {/* 3 Connected Manual Task Cards inspired by reference step layout */}
      <div
        style={{
          marginTop: 44,
          width: 880,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          position: 'relative',
        }}
      >
        {MANUAL_TASKS.map((task, idx) => {
          const pop = springPop(frame, fps, relFrame(task.sec));
          return (
            <div
              key={task.step}
              style={{
                transform: `scale(${pop}) translateY(${(1 - pop) * 35}px)`,
                opacity: pop,
                borderRadius: 30,
                background: TOKENS.colors.surfaceWhite,
                boxShadow: TOKENS.gradients.cardGlow,
                border: '2px solid rgba(255,255,255,0.95)',
                padding: '28px 34px',
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 24,
                  background: task.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 42,
                  boxShadow: '0 14px 28px rgba(99, 102, 241, 0.25)',
                }}
              >
                {task.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: TOKENS.colors.inkMuted,
                    letterSpacing: 1.2,
                  }}
                >
                  {task.step} • MANUAL WORK
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 32,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                    marginTop: 4,
                  }}
                >
                  {task.title}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 21,
                    color: TOKENS.colors.inkSecondary,
                    marginTop: 4,
                  }}
                >
                  {task.desc}
                </div>
              </div>

              <div
                style={{
                  padding: '10px 20px',
                  borderRadius: 99,
                  background: '#FEF2F2',
                  border: '1.5px solid #FECACA',
                  color: '#EF4444',
                  fontFamily: FONTS.display,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Manual ⏳
              </div>

              {/* Connector line between cards */}
              {idx < MANUAL_TASKS.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 74,
                    bottom: -30,
                    width: 4,
                    height: 30,
                    background: '#DDD6FE',
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Bottom Growth Question Banner (35.6s) */}
        <div
          style={{
            transform: `scale(${growthQuestionPop})`,
            opacity: interpolate(growthQuestionPop, [0, 1], [0, 1]),
            borderRadius: 28,
            padding: '26px 36px',
            background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 24px 48px -12px rgba(76, 29, 149, 0.45)',
          }}
        >
          <div
            style={{
              fontFamily: FONTS.bengali,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            তাহলে <span style={{ color: '#FBBF24' }}>ব্যবসা বড় করবেন কখন?</span>
          </div>
          <span style={{ fontSize: 44 }}>📈</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

