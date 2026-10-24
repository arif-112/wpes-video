import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloatingBadge } from '../components/FloatingBadge';
import { PhoneMockup } from '../components/PhoneMockup';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

export const HookScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 4, 35);
  const phonePop = springPop(frame, fps, 8);

  // Beat timings inside HookScene (starts at 0s)
  const orderBeat = springPop(frame, fps, Math.round(3.16 * fps));
  const customerBeat = springPop(frame, fps, Math.round(4.46 * fps));
  const questionBeat = springPop(frame, fps, Math.round(6.2 * fps));
  const updateBeat = springPop(frame, fps, Math.round(10.7 * fps));

  const questionMode = frame >= Math.round(6.2 * fps);

  return (
    <AbsoluteFill
      style={{
        opacity: env.opacity,
        transform: `scale(${env.scale})`,
        alignItems: 'center',
      }}
    >
      {/* Top Headline matching reference layout */}
      <div
        style={{
          marginTop: 155,
          textAlign: 'center',
          transform: `translateY(${titleAnim.translateY}px)`,
          opacity: titleAnim.opacity,
          padding: '0 60px',
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.bengali,
            fontSize: 58,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
            lineHeight: 1.22,
          }}
        >
          {questionMode ? (
            <>
              ব্যবসা কি শুধু{' '}
              <span
                style={{
                  background: TOKENS.gradients.brandText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Facebook-নির্ভরই
              </span>{' '}
              থাকবে?
            </>
          ) : (
            <>
              Facebook Page দিয়ে{' '}
              <span
                style={{
                  background: TOKENS.gradients.brandText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                দারুণ ব্যবসা!
              </span>
            </>
          )}
        </div>
      </div>

      {/* Floating 3D Squircle Icons around Phone */}
      <FloatingBadge
        x={96}
        y={470}
        gradient={TOKENS.gradients.blueViolet}
        delay={12}
        rotate={-10}
      >
        <span style={{ fontSize: 42 }}>👍</span>
      </FloatingBadge>

      <FloatingBadge
        x={895}
        y={520}
        gradient={TOKENS.gradients.orangeCoral}
        delay={18}
        rotate={12}
      >
        <span style={{ fontSize: 42 }}>🛍️</span>
      </FloatingBadge>

      <FloatingBadge
        x={110}
        y={1040}
        gradient={TOKENS.gradients.purplePink}
        delay={24}
        rotate={8}
      >
        <span style={{ fontSize: 40 }}>💬</span>
      </FloatingBadge>

      <FloatingBadge
        x={880}
        y={1080}
        gradient={TOKENS.gradients.emeraldTeal}
        delay={30}
        rotate={-8}
      >
        <span style={{ fontSize: 40 }}>🚀</span>
      </FloatingBadge>

      {/* Center Phone Mockup */}
      <div
        style={{
          marginTop: 48,
          transform: `scale(${phonePop})`,
          position: 'relative',
        }}
      >
        <PhoneMockup width={520} height={930}>
          {/* Facebook Page Banner Header */}
          <div
            style={{
              height: 185,
              background: 'linear-gradient(135deg, #1877F2 0%, #3B82F6 100%)',
              padding: '64px 28px 20px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              🏪
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                Urban Style BD
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 17,
                  opacity: 0.9,
                }}
              >
                ফ্যাশন ও লাইফস্টাইল পেজ • ১২.৫K ফলোয়ার
              </div>
            </div>
          </div>

          {/* Inside Phone Content */}
          <div style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Featured Product Post Card */}
            <div
              style={{
                borderRadius: 24,
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                padding: 20,
              }}
            >
              <div
                style={{
                  height: 190,
                  borderRadius: 18,
                  background:
                    'linear-gradient(135deg, #EDE9FE 0%, #FCE7F3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 76,
                }}
              >
                👟
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 22,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  প্রিমিয়াম স্নিকার্স কালেকশন
                </span>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: '#DBEAFE',
                    color: '#1D4ED8',
                    fontFamily: FONTS.display,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  Boosted
                </span>
              </div>
            </div>

            {/* Order Notification Badge (3.16s) */}
            <div
              style={{
                transform: `scale(${orderBeat})`,
                opacity: orderBeat,
                borderRadius: 20,
                padding: '16px 20px',
                background: '#ECFDF5',
                border: '1.5px solid #A7F3D0',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: '#10B981',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                📦
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 21,
                    fontWeight: 700,
                    color: '#065F46',
                  }}
                >
                  নতুন অর্ডার আসছে! (+২৪টি আজ)
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 16,
                    color: '#047857',
                  }}
                >
                  ইনবক্সে অর্ডার রিকোয়েস্ট বাড়ছে
                </div>
              </div>
            </div>

            {/* Customer Notification Badge (4.46s) */}
            <div
              style={{
                transform: `scale(${customerBeat})`,
                opacity: customerBeat,
                borderRadius: 20,
                padding: '16px 20px',
                background: '#EFF6FF',
                border: '1.5px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: '#3B82F6',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                👥
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 21,
                    fontWeight: 700,
                    color: '#1E3A8A',
                  }}
                >
                  নতুন কাস্টমার মেসেজ (+৮৫)
                </div>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 16,
                    color: '#1D4ED8',
                  }}
                >
                  কমেন্ট ও ইনবক্সে কাস্টমারের ভিড়
                </div>
              </div>
            </div>
          </div>

          {/* Question Overlay Card (6.2s) */}
          {frame >= Math.round(6.0 * fps) && (
            <div
              style={{
                position: 'absolute',
                inset: 22,
                top: 210,
                borderRadius: 34,
                background: 'rgba(255, 255, 255, 0.96)',
                boxShadow: '0 30px 60px rgba(19, 17, 41, 0.22)',
                border: '2px solid rgba(139, 92, 246, 0.28)',
                padding: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transform: `scale(${questionBeat})`,
                opacity: questionBeat,
              }}
            >
              <div
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: 26,
                  background: TOKENS.gradients.orangeCoral,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 46,
                  color: '#FFF',
                  marginBottom: 20,
                  boxShadow: '0 16px 32px rgba(244, 63, 94, 0.3)',
                }}
              >
                ❓
              </div>
              <div
                style={{
                  fontFamily: FONTS.bengali,
                  fontSize: 32,
                  fontWeight: 700,
                  color: TOKENS.colors.inkPrimary,
                  lineHeight: 1.3,
                }}
              >
                শুধুই কি <span style={{ color: '#1877F2' }}>Facebook</span>-এর ওপর নির্ভর করবেন?
              </div>

              {/* Update Badge (10.7s) */}
              <div
                style={{
                  marginTop: 28,
                  transform: `scale(${updateBeat})`,
                  opacity: interpolate(updateBeat, [0, 1], [0, 1]),
                  padding: '16px 28px',
                  borderRadius: 99,
                  background: TOKENS.gradients.purplePink,
                  color: '#FFFFFF',
                  fontFamily: FONTS.bengali,
                  fontSize: 25,
                  fontWeight: 700,
                  boxShadow: '0 14px 28px rgba(124, 58, 237, 0.35)',
                }}
              >
                ✨ এবার আপডেট হওয়ার সময়!
              </div>
            </div>
          )}
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};

