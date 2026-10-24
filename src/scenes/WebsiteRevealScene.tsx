import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserWindow } from '../components/BrowserWindow';
import { FloatingBadge } from '../components/FloatingBadge';
import { fadeSlideUp, sceneEnvelope, springPop } from '../utils/animation';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

const SCENE_START_SEC = 52.9;
const relFrame = (absSec: number) => Math.round((absSec - SCENE_START_SEC) * 30);

export const WebsiteRevealScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const env = sceneEnvelope(frame, durationInFrames);

  const titleAnim = fadeSlideUp(frame, fps, 2, 30);
  const browserPop = springPop(frame, fps, 6);

  // Exact narration-synced element reveals
  const photoPop = springPop(frame, fps, relFrame(57.3));
  const pricePop = springPop(frame, fps, relFrame(58.8));
  const sizePop = springPop(frame, fps, relFrame(59.62));
  const colorPop = springPop(frame, fps, relFrame(60.34));
  const stockPop = springPop(frame, fps, relFrame(61.18));
  const detailsPop = springPop(frame, fps, relFrame(62.2));

  return (
    <AbsoluteFill
      style={{
        opacity: env.opacity,
        transform: `scale(${env.scale})`,
        alignItems: 'center',
      }}
    >
      {/* Top Headline */}
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
            fontSize: 56,
            fontWeight: 700,
            color: TOKENS.colors.inkPrimary,
          }}
        >
          আপনার নিজের{' '}
          <span
            style={{
              background: TOKENS.gradients.brandText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            প্রফেশনাল ওয়েবসাইট!
          </span>
        </div>
      </div>

      <FloatingBadge
        x={64}
        y={390}
        size={82}
        gradient={TOKENS.gradients.purplePink}
        delay={10}
      >
        <span style={{ fontSize: 40 }}>✨</span>
      </FloatingBadge>

      <FloatingBadge
        x={934}
        y={420}
        size={82}
        gradient={TOKENS.gradients.emeraldTeal}
        delay={16}
      >
        <span style={{ fontSize: 40 }}>🛒</span>
      </FloatingBadge>

      {/* Browser Mockup Showing Structured Product Page */}
      <div
        style={{
          marginTop: 38,
          transform: `scale(${browserPop})`,
        }}
      >
        <BrowserWindow url="urbanstylebd.com/product/premium-sneaker" width={920} height={880}>
          <div style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 26 }}>
            {/* Top section: Product Photo + Key Info */}
            <div style={{ display: 'flex', gap: 32 }}>
              {/* Product Photo Card (57.3s) */}
              <div
                style={{
                  width: 340,
                  height: 360,
                  borderRadius: 28,
                  background: 'linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${0.85 + photoPop * 0.15})`,
                  border:
                    photoPop > 0.1
                      ? '3px solid #8B5CF6'
                      : '2px solid transparent',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 135 }}>👟</span>
                <div
                  style={{
                    marginTop: 14,
                    padding: '6px 18px',
                    borderRadius: 99,
                    background: '#FFFFFF',
                    fontFamily: FONTS.bengali,
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#6D28D9',
                  }}
                >
                  📸 এইচডি প্রোডাক্ট ছবি
                </div>
              </div>

              {/* Right Column: Title, Price, Size, Color, Stock */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 32,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  প্রিমিয়াম এয়ার কুশন স্নিকার্স
                </div>

                {/* Price (58.8s) */}
                <div
                  style={{
                    transform: `scale(${pricePop})`,
                    opacity: pricePop,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 22px',
                    borderRadius: 18,
                    background: '#EEF2FF',
                    border: '2px solid #818CF8',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.bengali,
                      fontSize: 22,
                      fontWeight: 600,
                      color: '#4338CA',
                    }}
                  >
                    দাম:
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 32,
                      fontWeight: 800,
                      color: '#312E81',
                    }}
                  >
                    ৳ ২,৪৫০
                  </span>
                </div>

                {/* Size Selector (59.62s) */}
                <div
                  style={{
                    transform: `scale(${sizePop})`,
                    opacity: sizePop,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.bengali,
                      fontSize: 22,
                      fontWeight: 700,
                      color: TOKENS.colors.inkSecondary,
                      width: 80,
                    }}
                  >
                    সাইজ:
                  </span>
                  {['40', '41', '42', '43'].map((sz, i) => (
                    <div
                      key={sz}
                      style={{
                        width: 58,
                        height: 48,
                        borderRadius: 14,
                        background: i === 2 ? '#6D28D9' : '#F8FAFC',
                        color: i === 2 ? '#FFFFFF' : TOKENS.colors.inkPrimary,
                        border: i === 2 ? 'none' : '1.5px solid #CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONTS.display,
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    >
                      {sz}
                    </div>
                  ))}
                </div>

                {/* Color Swatches (60.34s) */}
                <div
                  style={{
                    transform: `scale(${colorPop})`,
                    opacity: colorPop,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.bengali,
                      fontSize: 22,
                      fontWeight: 700,
                      color: TOKENS.colors.inkSecondary,
                      width: 80,
                    }}
                  >
                    কালার:
                  </span>
                  {[
                    { name: 'ভায়োলেট', hex: '#7C3AED', active: true },
                    { name: 'টিল', hex: '#0EA5E9', active: false },
                    { name: 'কোরাল', hex: '#F43F5E', active: false },
                  ].map((c) => (
                    <div
                      key={c.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 16px',
                        borderRadius: 99,
                        background: c.active ? '#F5F3FF' : '#F8FAFC',
                        border: c.active
                          ? `2px solid ${c.hex}`
                          : '1.5px solid #E2E8F0',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: c.hex,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: FONTS.bengali,
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stock Status (61.18s) */}
                <div
                  style={{
                    transform: `scale(${stockPop})`,
                    opacity: stockPop,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 20px',
                    borderRadius: 99,
                    background: '#ECFDF5',
                    border: '1.5px solid #6EE7B7',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span style={{ color: '#10B981', fontSize: 20 }}>●</span>
                  <span
                    style={{
                      fontFamily: FONTS.bengali,
                      fontSize: 21,
                      fontWeight: 700,
                      color: '#065F46',
                    }}
                  >
                    স্টক এভেইলেবল (১৮ পিস রেডি)
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Full Info Bar (62.2s) */}
            <div
              style={{
                transform: `scale(${detailsPop})`,
                opacity: detailsPop,
                borderRadius: 24,
                padding: '22px 28px',
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F5F3FF 100%)',
                border: '1.5px solid #DDD6FE',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {[
                '✅ বিস্তারিত বিবরণ',
                '🚚 ডেলিভারি চার্জ অটো-হিসাব',
                '🔄 সহজ রিটার্ন পলিসি',
              ].map((txt) => (
                <span
                  key={txt}
                  style={{
                    fontFamily: FONTS.bengali,
                    fontSize: 22,
                    fontWeight: 700,
                    color: TOKENS.colors.inkPrimary,
                  }}
                >
                  {txt}
                </span>
              ))}
            </div>
          </div>
        </BrowserWindow>
      </div>
    </AbsoluteFill>
  );
};

