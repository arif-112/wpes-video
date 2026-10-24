import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserWindow } from '../components/BrowserWindow';
import { Icon } from '../components/Icon';
import { ProductPhoto } from '../components/ProductArt';
import { SceneShell } from '../components/SceneShell';
import { Button, Card, GradientText, IconTile, Pill } from '../components/UI';
import { at } from '../data/scenes';
import { float, pop, progress, riseIn } from '../utils/animation';
import { bn } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('cta', sec);

export const FinalCTAScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, T(112.28), 24);
  const preview = pop(frame, fps, T(113.2), { damping: 17, stiffness: 120, mass: 0.9 });
  const ask = pop(frame, fps, T(115.0), { damping: 14, stiffness: 180, mass: 0.75 });
  const contact = pop(frame, fps, T(115.94), { damping: 13, stiffness: 200, mass: 0.7 });

  const phaseA = 1 - progress(frame, T(116.9), T(117.3));
  const brandIn = pop(frame, fps, T(117.06), { damping: 14, stiffness: 140, mass: 0.9 });
  const phaseB = progress(frame, T(117.06), T(117.4));
  const underline = progress(frame, T(117.3), T(117.9));
  const finalLine = pop(frame, fps, T(119.02), { damping: 15, stiffness: 150, mass: 0.85 });
  const nextStep = pop(frame, fps, T(120.5), { damping: 13, stiffness: 180, mass: 0.7 });
  const shimmer = ((frame - T(117.6)) / 46) % 1;

  return (
    <SceneShell durationInFrames={durationInFrames} fadeOut={12}>
      {/* ------------------------------------------------------- phase A */}
      <div style={{ position: 'absolute', inset: 0, opacity: phaseA }}>
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: 64,
            right: 64,
            opacity: head.opacity,
            transform: `translateY(${head.translateY}px)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon name="chat" size={22} color={C.brand} strokeWidth={2.4} />
            <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
              LET&apos;S TALK
            </span>
          </div>
          <div style={{ ...bengali(56, 700), color: C.ink, lineHeight: 1.32 }}>
            আপনার ব্যবসার জন্য
            <br />
            <GradientText>কেমন ওয়েবসাইট দরকার?</GradientText>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 430,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: preview,
            transform: `translateY(${(1 - preview) * 50 + float(frame, 0.4, 0.014, 6)}px) scale(${0.94 + preview * 0.06})`,
          }}
        >
          <BrowserWindow width={912} height={620} chromeHeight={56} compact url="yourbusiness.com">
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flex: 1, padding: '26px 28px', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    background: C.mint,
                    borderRadius: 999,
                    padding: '6px 12px',
                    width: 'fit-content',
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
                  <span style={{ ...bengali(13, 700), color: '#0A7F72' }}>আপনার নিজের ব্র্যান্ড</span>
                </div>

                <div style={{ ...bengali(34, 700), color: C.ink, lineHeight: 1.32, marginTop: 14 }}>
                  আপনার ব্যবসার
                  <br />
                  <span style={{ color: C.brandDeep }}>অনলাইন ঠিকানা</span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  {['প্রোডাক্ট', 'অর্ডার', 'ট্র্যাকিং'].map((t, i) => (
                    <Pill key={t} tone={i === 0 ? 'brand' : 'muted'} fontSize={13} style={{ padding: '6px 12px' }}>
                      {t}
                    </Pill>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      padding: '10px 18px',
                      borderRadius: 999,
                      background: G.brand,
                      color: '#FFFFFF',
                      ...bengali(15, 700),
                      boxShadow: '0 12px 24px -12px rgba(91,84,240,0.7)',
                    }}
                  >
                    অর্ডার করুন
                  </div>
                  <span style={{ ...bengali(13, 500), color: C.inkMuted }}>
                    {bn(24)} ঘণ্টায় ডেলিভারি
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: 330,
                  background: 'linear-gradient(150deg,#F3EFFF,#FDF0F6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductPhoto tone="ink" size={280} radius={22} />
              </div>
            </div>
          </BrowserWindow>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 1090,
            left: 64,
            right: 64,
            opacity: ask,
            transform: `translateY(${(1 - ask) * 26}px)`,
          }}
        >
          <Card radius={26} style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconTile name="chat" size={48} gradient={G.violet} iconSize={24} />
            <div style={{ flex: 1 }}>
              <div style={{ ...bengali(20, 700), color: C.ink }}>আপনার আইডিয়া শুনতে চাই</div>
              <div style={{ ...bengali(15, 500), color: C.inkMuted }}>
                কেমন ওয়েবসাইট দরকার — সেটাই প্রথম প্রশ্ন
              </div>
            </div>
            <Icon name="arrowUpRight" size={26} color={C.brand} strokeWidth={2.2} />
          </Card>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 1230,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: contact,
            transform: `translateY(${(1 - contact) * 26}px) scale(${0.94 + contact * 0.06})`,
          }}
        >
          <Button variant="brand" width={640} height={96} fontSize={32} icon="arrowRight">
            আজই কথা বলুন
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------- phase B */}
      <div style={{ position: 'absolute', inset: 0, opacity: phaseB }}>
        {/* depth cards behind the lockup */}
        {[
          { rotate: -9, x: -150, y: 24, opacity: 0.5 },
          { rotate: 8, x: 150, y: 18, opacity: 0.42 },
        ].map((c) => (
          <div
            key={c.rotate}
            style={{
              position: 'absolute',
              top: 372 + c.y,
              left: '50%',
              width: 320,
              height: 210,
              marginLeft: c.x - 160,
              borderRadius: 24,
              background: '#FFFFFF',
              border: `1px solid ${C.line}`,
              boxShadow: SHADOW.cardSoft,
              transform: `rotate(${c.rotate}deg) translateY(${float(frame, c.rotate, 0.012, 5)}px)`,
              opacity: brandIn * c.opacity,
            }}
          >
            <div style={{ padding: 16 }}>
              <div style={{ width: 54, height: 8, borderRadius: 4, background: '#EEECF7' }} />
              <div style={{ width: 110, height: 8, borderRadius: 4, background: '#EEECF7', marginTop: 8 }} />
              <div
                style={{
                  marginTop: 16,
                  height: 92,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg,#F3EFFF,#FDF0F6)',
                }}
              />
            </div>
          </div>
        ))}

        {/* brand lockup */}
        <div
          style={{
            position: 'absolute',
            top: 330,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: brandIn,
            transform: `translateY(${(1 - brandIn) * 34}px) scale(${0.92 + brandIn * 0.08})`,
          }}
        >
          <div
            style={{
              width: 152,
              height: 152,
              borderRadius: 46,
              background: G.brand,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 38px 70px -26px rgba(91,84,240,0.65)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{ ...display(78, 800), color: '#FFFFFF', letterSpacing: -4 }}>W</span>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 70,
                left: `${-30 + shimmer * 160}%`,
                background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))',
                transform: 'skewX(-16deg)',
              }}
            />
          </div>

          <div
            style={{
              ...display(64, 800),
              color: C.ink,
              marginTop: 24,
              letterSpacing: -2.2,
              textAlign: 'center',
            }}
          >
            WP Expert Solution
          </div>

          <div
            style={{
              height: 6,
              width: 260 * underline,
              borderRadius: 999,
              background: G.brand,
              marginTop: 12,
              opacity: 0.9,
            }}
          />

          <div
            style={{
              ...bengali(24, 500),
              color: C.inkSoft,
              marginTop: 16,
              textAlign: 'center',
              opacity: underline,
              padding: '0 90px',
              lineHeight: 1.5,
            }}
          >
            ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট — আপনার আইডিয়া থেকে বাস্তব সমাধান
          </div>
        </div>

        {/* final line */}
        <div
          style={{
            position: 'absolute',
            top: 830,
            left: 56,
            right: 56,
            opacity: finalLine,
            transform: `translateY(${(1 - finalLine) * 40}px)`,
            textAlign: 'center',
          }}
        >
          <div style={{ ...bengali(26, 600), color: C.inkMuted, marginBottom: 10 }}>
            আপনার ব্যবসার পরবর্তী ধাপ
          </div>
          <div style={{ ...bengali(58, 700), color: C.ink, lineHeight: 1.34 }}>
            শুরু হোক <GradientText>নিজের ওয়েবসাইট</GradientText> দিয়ে
          </div>
        </div>

        {/* contact card */}
        <div
          style={{
            position: 'absolute',
            top: 1088,
            left: 64,
            right: 64,
            opacity: nextStep,
            transform: `translateY(${(1 - nextStep) * 28}px)`,
          }}
        >
          <div
            style={{
              borderRadius: 30,
              padding: '24px 26px',
              background: '#FFFFFF',
              boxShadow: SHADOW.card,
              border: '1px solid rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <IconTile name="chat" size={64} gradient={G.brand} iconSize={30} shadow />
            <div style={{ flex: 1 }}>
              <div style={{ ...bengali(25, 700), color: C.ink }}>আজই যোগাযোগ করুন</div>
              <div style={{ ...bengali(17, 500), color: C.inkMuted }}>
                WP Expert Solution-এর সঙ্গে কথা বলুন
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 20px',
                borderRadius: 999,
                background: G.inkCard,
                color: '#FFFFFF',
              }}
            >
              <span style={{ ...bengali(18, 700) }}>শুরু করুন</span>
              <Icon name="arrowRight" size={20} color="#FFFFFF" strokeWidth={2.4} />
            </div>
          </div>
        </div>

        {/* footer mark */}
        <div
          style={{
            position: 'absolute',
            top: 1262,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            opacity: nextStep * 0.9,
          }}
        >
          <span style={{ ...bengali(16, 500), color: C.inkMuted }}>
            ফেসবুক পেজ + নিজের ওয়েবসাইট = পূর্ণ ব্যবস্থা
          </span>
        </div>
      </div>
    </SceneShell>
  );
};
