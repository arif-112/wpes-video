import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Card, IconTile, Pill } from '../components/UI';
import { Icon, IconName } from '../components/Icon';
import { SceneShell } from '../components/SceneShell';
import { at } from '../data/scenes';
import { pop, progress, riseIn } from '../utils/animation';
import { bn } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { bengali, display } from '../utils/typography';

const T = (sec: number) => at('manual', sec);

const STEPS: Array<{
  at: number;
  title: string;
  detail: string;
  icon: IconName;
  gradient: string;
  seconds: string;
}> = [
  {
    at: 29.3,
    title: 'অর্ডার কনফার্ম',
    detail: 'প্রতিটি মেসেজ পড়ে হাতে কনফার্ম',
    icon: 'checkCircle',
    gradient: G.teal,
    seconds: '৪০',
  },
  {
    at: 30.76,
    title: 'স্টক চেক',
    detail: 'কোন সাইজ, কোন কালার আছে — মনে রাখুন',
    icon: 'box',
    gradient: G.amber,
    seconds: '৩৫',
  },
  {
    at: 31.9,
    title: 'কুরিয়ারের হিসাব',
    detail: 'নাম, ঠিকানা, চার্জ — আলাদা খাতায়',
    icon: 'truck',
    gradient: G.coral,
    seconds: '৫০',
  },
];

export const ManualWorkScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 4, 24);
  const tangle = progress(frame, T(33.34), T(33.9));
  const dim = 1 - progress(frame, T(35.66), T(36.1)) * 0.75;
  const question = pop(frame, fps, T(35.66), { damping: 15, stiffness: 150, mass: 0.8 });
  const punch = progress(frame, T(36.76), T(37.1));

  return (
    <SceneShell durationInFrames={durationInFrames}>
      {/* headline */}
      <div
        style={{
          position: 'absolute',
          top: 156,
          left: 64,
          right: 64,
          opacity: head.opacity * (1 - question * 0.55),
          transform: `translateY(${head.translateY}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Icon name="sync" size={22} color={C.amber} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            MANUAL WORK
          </span>
        </div>
        <div style={{ ...bengali(58, 700), color: C.ink, lineHeight: 1.3 }}>
          সব কাজ নিজে হাতে করলে
        </div>
      </div>

      {/* tangled manual wiring */}
      <AbsoluteFill style={{ opacity: tangle * (1 - question * 0.6) }}>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0 }}
        >
          <path
            d="M760 470 C880 520 700 620 830 700"
            stroke={C.coral}
            strokeWidth="4"
            strokeDasharray="10 12"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M800 590 C660 640 900 700 720 780"
            stroke={C.amber}
            strokeWidth="4"
            strokeDasharray="8 14"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          <circle cx={830} cy={700} r="9" fill={C.coral} opacity="0.8" />
          <circle cx={720} cy={780} r="9" fill={C.amber} opacity="0.8" />
        </svg>

        <div
          style={{
            position: 'absolute',
            top: 806,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: progress(frame, T(33.6), T(34.1)),
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#FFFFFF',
              borderRadius: 999,
              padding: '12px 22px',
              boxShadow: SHADOW.cardSoft,
              border: `1.5px solid ${C.peach}`,
            }}
          >
            <Icon name="clock" size={24} color={C.coral} strokeWidth={2.3} />
            <span style={{ ...bengali(23, 600), color: C.inkSoft }}>
              প্রতিদিন {bn('3')}+ ঘণ্টা শুধু ম্যানেজমেন্টে
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* steps */}
      <div
        style={{
          position: 'absolute',
          top: 356,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          opacity: dim,
        }}
      >
        {STEPS.map((step, i) => {
          const s = pop(frame, fps, T(step.at), { damping: 16, stiffness: 190, mass: 0.7 });
          const stamp = pop(frame, fps, T(step.at) + 6, { damping: 12, stiffness: 220, mass: 0.6 });
          return (
            <div
              key={step.title}
              style={{
                opacity: s,
                transform: `translateY(${(1 - s) * 36}px)`,
              }}
            >
              <Card
                radius={28}
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  boxShadow: SHADOW.cardSoft,
                }}
              >
                <IconTile name={step.icon} size={68} gradient={step.gradient} iconSize={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...bengali(31, 700), color: C.ink }}>{step.title}</div>
                  <div style={{ ...bengali(19, 500), color: C.inkMuted, marginTop: 2 }}>
                    {step.detail}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 6,
                  }}
                >
                  <Pill
                    tone="muted"
                    fontSize={16}
                    style={{
                      padding: '6px 14px',
                      background: `rgba(245,166,35,${0.12 + stamp * 0.1})`,
                      color: '#A76A00',
                    }}
                  >
                    ম্যানুয়াল
                  </Pill>
                  <span
                    style={{
                      ...display(20, 800),
                      color: C.coral,
                      opacity: stamp,
                      transform: `scale(${0.8 + stamp * 0.2})`,
                    }}
                  >
                    +{step.seconds}s
                  </span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* final question */}
      <div
        style={{
          position: 'absolute',
          top: 902,
          left: 56,
          right: 56,
          opacity: question,
          transform: `translateY(${(1 - question) * 50}px)`,
        }}
      >
        <div
          style={{
            borderRadius: 38,
            padding: '38px 42px 42px',
            background: G.inkCard,
            boxShadow: '0 40px 80px -30px rgba(23,19,49,0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -80,
              top: -80,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(106,92,255,0.55), rgba(106,92,255,0))',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="clock" size={22} color={C.yellow} strokeWidth={2.2} />
            <span style={{ ...bengali(20, 600), color: 'rgba(255,255,255,0.65)' }}>
              সময় কোথায় যাচ্ছে?
            </span>
          </div>

          <div style={{ ...bengali(56, 700), color: '#FFFFFF', lineHeight: 1.3, marginTop: 12 }}>
            তাহলে ব্যবসা
            <br />
            বড় করবেন
            <span
              style={{
                display: 'inline-block',
                marginLeft: 16,
                transform: `scale(${1 + punch * 0.14}) rotate(${-2 + punch * 2}deg)`,
                color: C.yellow,
                fontWeight: 700,
              }}
            >
              কখন?
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
              opacity: 0.9,
            }}
          >
            <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.16)' }} />
            <Icon name="arrowRight" size={22} color="rgba(255,255,255,0.5)" />
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
