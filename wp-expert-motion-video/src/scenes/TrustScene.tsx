import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserWindow } from '../components/BrowserWindow';
import { Icon, StarSolid } from '../components/Icon';
import { ProductPhoto } from '../components/ProductArt';
import { SceneShell } from '../components/SceneShell';
import { Avatar, Card, IconTile, Pill, ProgressBar } from '../components/UI';
import { at } from '../data/scenes';
import { pop, progress, riseIn } from '../utils/animation';
import { bn } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('trust', sec);

const REVIEWS = [
  {
    name: 'মেহেদী হাসান',
    initial: 'মে',
    text: 'প্রোডাক্ট ঠিক ছবির মতো, ডেলিভারিও দ্রুত।',
    rating: 5,
  },
  {
    name: 'ফারজানা আক্তার',
    initial: 'ফা',
    text: 'সাইজ গাইড দেখে অর্ডার করেছি — একদম ঠিক হয়েছে।',
    rating: 5,
  },
];

export const TrustScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 2, 22);
  const shop = pop(frame, fps, T(95.0), { damping: 19, stiffness: 110, mass: 0.95 });
  const verified = pop(frame, fps, T(96.82), { damping: 13, stiffness: 200, mass: 0.65 });
  const meter = pop(frame, fps, T(99.36), { damping: 17, stiffness: 150, mass: 0.85 });
  const stars = progress(frame, T(102.62), T(103.4));
  const reviewsIn = pop(frame, fps, T(100.6), { damping: 16, stiffness: 170, mass: 0.8 });

  const phaseA = 1 - progress(frame, T(105.3), T(105.7));
  const phaseB = progress(frame, T(105.4), T(105.8));

  const borrow = pop(frame, fps, T(105.4), { damping: 16, stiffness: 170, mass: 0.8 });
  const owned = pop(frame, fps, T(106.3), { damping: 15, stiffness: 180, mass: 0.75 });
  const identity = pop(frame, fps, T(108.54), { damping: 15, stiffness: 140, mass: 0.9 });
  const strong = pop(frame, fps, T(110.42), { damping: 12, stiffness: 200, mass: 0.65 });

  return (
    <SceneShell durationInFrames={durationInFrames}>
      {/* headline */}
      <div
        style={{
          position: 'absolute',
          top: 148,
          left: 64,
          right: 64,
          opacity: head.opacity,
          transform: `translateY(${head.translateY}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Icon name="shield" size={22} color={C.teal} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            TRUST & IDENTITY
          </span>
        </div>
        <div style={{ ...bengali(52, 700), color: C.ink, lineHeight: 1.3 }}>
          নতুন কাস্টমারের <span style={{ color: C.brandDeep }}>বিশ্বাস</span>
        </div>
      </div>

      {/* ------------------------------------------------------- phase A */}
      <div style={{ position: 'absolute', inset: 0, opacity: phaseA }}>
        <div
          style={{
            position: 'absolute',
            top: 300,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: shop,
            transform: `translateY(${(1 - shop) * 40}px) scale(${0.96 + shop * 0.04})`,
          }}
        >
          <BrowserWindow width={952} height={648} chromeHeight={64} compact url="urbanstylebd.com" accent={C.teal}>
            <div style={{ padding: '16px 20px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* store hero */}
              <div
                style={{
                  borderRadius: 20,
                  padding: '14px 16px',
                  background: G.inkCard,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: -40,
                    top: -60,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(18,181,165,0.5), rgba(18,181,165,0))',
                  }}
                />
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 15,
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="store" size={24} color={C.ink} strokeWidth={2.1} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ ...display(22, 800) }}>Urban Style BD</span>
                    {frame >= T(96.5) ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          background: verified > 0.3 ? 'rgba(18,181,165,0.95)' : 'rgba(255,255,255,0.15)',
                          borderRadius: 999,
                          padding: '3px 9px',
                          transform: `scale(${0.8 + verified * 0.2})`,
                        }}
                      >
                        <Icon name="check" size={12} color="#FFFFFF" strokeWidth={3} />
                        <span style={{ ...bengali(12, 700) }}>ভেরিফায়েড</span>
                      </span>
                    ) : null}
                  </div>
                  <div style={{ ...bengali(14, 500), color: 'rgba(255,255,255,0.68)' }}>
                    {bn(500)}+ কাস্টমার · {bn(4)} বছর ধরে
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <StarSolid size={18} color={C.yellow} />
                  <span style={{ ...display(20, 800), color: C.yellow }}>{bn('4.9')}</span>
                </div>
              </div>

              {/* trust chips */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: 'shield' as const, label: 'নিরাপদ পেমেন্ট' },
                  { icon: 'truck' as const, label: 'সারা দেশে ডেলিভারি' },
                  { icon: 'sync' as const, label: '৭ দিনে রিটার্ন' },
                ].map((c) => (
                  <div
                    key={c.label}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#F7F6FC',
                      borderRadius: 14,
                      padding: '9px 12px',
                    }}
                  >
                    <Icon name={c.icon} size={18} color={C.brandDeep} strokeWidth={2.1} />
                    <span style={{ ...bengali(14, 600), color: C.inkSoft }}>{c.label}</span>
                  </div>
                ))}
              </div>

              {/* reviews */}
              <div style={{ display: 'flex', gap: 12, opacity: reviewsIn, transform: `translateY(${(1 - reviewsIn) * 16}px)` }}>
                {REVIEWS.map((r, i) => (
                  <div
                    key={r.name}
                    style={{
                      flex: 1,
                      borderRadius: 18,
                      border: '1px solid #F0EEF8',
                      padding: '14px 15px',
                      background: '#FFFFFF',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <Avatar initial={r.initial} size={34} variant={i + 1} />
                      <div style={{ flex: 1 }}>
                        <div style={{ ...bengali(15, 700), color: C.ink }}>{r.name}</div>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[0, 1, 2, 3, 4].map((k) => (
                            <StarSolid key={k} size={12} color={C.amber} />
                          ))}
                        </div>
                      </div>
                      <Icon name="checkCircle" size={16} color={C.green} strokeWidth={2.4} />
                    </div>
                    <div style={{ ...bengali(15, 500), color: C.inkSoft, marginTop: 8, lineHeight: 1.45 }}>
                      “{r.text}”
                    </div>
                  </div>
                ))}
              </div>

              {/* product strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                <ProductPhoto tone="ink" size={72} radius={14} />
                <ProductPhoto tone="coral" size={72} radius={14} />
                <ProductPhoto tone="cream" size={72} radius={14} />
                <div style={{ flex: 1 }} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: C.mint,
                    borderRadius: 12,
                    padding: '9px 13px',
                  }}
                >
                  <Icon name="lock" size={16} color="#0A7F72" strokeWidth={2.2} />
                  <span style={{ ...bengali(14, 600), color: '#0A7F72' }}>SSL সুরক্ষিত চেকআউট</span>
                </div>
              </div>
            </div>
          </BrowserWindow>
        </div>

        {/* trust meter */}
        <div
          style={{
            position: 'absolute',
            top: 986,
            left: 64,
            right: 64,
            opacity: meter,
            transform: `translateY(${(1 - meter) * 26}px)`,
          }}
        >
          <Card radius={26} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <IconTile name="shield" size={66} gradient={G.teal} iconSize={32} shadow />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ ...bengali(19, 600), color: C.inkMuted }}>বিশ্বাসযোগ্যতার স্কোর</span>
                <span style={{ ...display(24, 800), color: C.ink }}>{bn('4.9')} / ৫</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        opacity: progress(stars, i * 0.16, i * 0.16 + 0.4),
                        transform: `scale(${0.6 + progress(stars, i * 0.16, i * 0.16 + 0.4) * 0.4})`,
                      }}
                    >
                      <StarSolid size={26} color={C.amber} />
                    </div>
                  ))}
                </div>
                <ProgressBar value={0.98 * Math.min(1, stars + 0.1)} width={420} height={12} gradient={G.teal} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ------------------------------------------------------- phase B */}
      <div style={{ position: 'absolute', inset: 0, opacity: phaseB }}>
        <div
          style={{
            position: 'absolute',
            top: 300,
            left: 64,
            right: 64,
            display: 'flex',
            gap: 18,
          }}
        >
          <div style={{ flex: 1, opacity: borrow, transform: `translateY(${(1 - borrow) * 26}px)` }}>
            <Card radius={26} style={{ padding: '20px 20px', height: 300 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  background: '#F2F0F9',
                  borderRadius: 999,
                  padding: '6px 12px',
                }}
              >
                <Icon name="lock" size={14} color={C.inkMuted} strokeWidth={2.4} />
                <span style={{ ...bengali(13, 700), color: C.inkMuted }}>অন্যের প্ল্যাটফর্ম</span>
              </div>
              <div style={{ ...bengali(28, 700), color: C.inkSoft, marginTop: 14, lineHeight: 1.35 }}>
                নিয়ন্ত্রণ
                <br />
                সীমিত
              </div>
              <div style={{ ...bengali(15, 500), color: C.inkMuted, marginTop: 10 }}>
                রিচ, পলিসি, ডিজাইন — কিছুই আপনার হাতে নেই
              </div>
              <Icon name="close" size={22} color={C.coral} style={{ position: 'absolute', right: 18, top: 18 }} />
            </Card>
          </div>

          <div style={{ flex: 1, opacity: owned, transform: `translateY(${(1 - owned) * 30}px)` }}>
            <div
              style={{
                borderRadius: 26,
                padding: '20px 20px',
                height: 300,
                background: 'linear-gradient(150deg, #F3EFFF 0%, #FDF0F6 100%)',
                border: `1.5px solid rgba(139,92,246,0.2)`,
                boxShadow: SHADOW.cardSoft,
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  background: '#FFFFFF',
                  borderRadius: 999,
                  padding: '6px 12px',
                }}
              >
                <Icon name="globe" size={14} color={C.brandDeep} strokeWidth={2.4} />
                <span style={{ ...bengali(13, 700), color: C.brandDeep }}>নিজের ওয়েবসাইট</span>
              </div>
              <div style={{ ...bengali(28, 700), color: C.ink, marginTop: 14, lineHeight: 1.35 }}>
                নিয়ন্ত্রণ
                <br />
                আপনার হাতে
              </div>
              <div style={{ ...bengali(15, 500), color: '#5C4BB8', marginTop: 10 }}>
                নিজের ব্র্যান্ড, নিজের ডিজাইন, নিজের কাস্টমার
              </div>
              <Icon name="checkCircle" size={24} color={C.green} style={{ position: 'absolute', right: 18, top: 18 }} />
            </div>
          </div>
        </div>

        {/* identity card */}
        <div
          style={{
            position: 'absolute',
            top: 648,
            left: 64,
            right: 64,
            opacity: identity,
            transform: `translateY(${(1 - identity) * 50}px) scale(${0.95 + identity * 0.05})`,
          }}
        >
          <div
            style={{
              borderRadius: 34,
              padding: '30px 30px 28px',
              background: G.inkCard,
              color: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 40px 80px -30px rgba(23,19,49,0.6)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: -70,
                top: -90,
                width: 320,
                height: 320,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(106,92,255,0.6), rgba(106,92,255,0))',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -80,
                bottom: -140,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(18,181,165,0.35), rgba(18,181,165,0))',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <IconTile name="globe" size={58} gradient={G.brand} iconSize={28} shadow />
              <div style={{ flex: 1 }}>
                <div style={{ ...bengali(15, 600), color: 'rgba(255,255,255,0.6)' }}>
                  আপনার ব্যবসার
                </div>
                <div style={{ ...bengali(32, 700) }}>শক্তিশালী অনলাইন পরিচয়</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: strong > 0.3 ? 'rgba(18,181,165,0.95)' : 'rgba(255,255,255,0.12)',
                  transform: `scale(${0.86 + strong * 0.14})`,
                }}
              >
                <Icon name="shield" size={16} color="#FFFFFF" strokeWidth={2.4} />
                <span style={{ ...bengali(14, 700) }}>প্রফেশনাল</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 22,
                flexWrap: 'wrap',
              }}
            >
              {['নিজের ব্র্যান্ড', 'নিজের ডিজাইন', 'নিজের কাস্টমার ডেটা'].map((t, i) => {
                const s = pop(frame, fps, T(109.0) + i * 6, { damping: 14, stiffness: 200, mass: 0.6 });
                return (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      padding: '9px 13px',
                      opacity: s,
                      transform: `translateY(${(1 - s) * 12}px)`,
                    }}
                  >
                    <Icon name="check" size={15} color={C.teal} strokeWidth={3} />
                    <span style={{ ...bengali(15, 600), color: 'rgba(255,255,255,0.9)' }}>{t}</span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 22,
                paddingTop: 18,
                borderTop: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  background: G.brand,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.display,
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                W
              </div>
              <span style={{ ...bengali(16, 600), color: 'rgba(255,255,255,0.72)' }}>
                WP Expert Solution-এর সাথে নিজের অনলাইন ঠিকানা
              </span>
            </div>
          </div>
        </div>

        {/* mini website preview */}
        <div
          style={{
            position: 'absolute',
            top: 960,
            left: 120,
            right: 120,
            opacity: owned,
            transform: `translateY(${(1 - owned) * 30}px)`,
          }}
        >
          <BrowserWindow width={840} height={280} chromeHeight={46} compact url="urbanstylebd.com">
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flex: 1, padding: '20px 22px' }}>
                <div style={{ ...display(22, 800), color: C.ink }}>নিজের ব্র্যান্ডের দোকান</div>
                <div style={{ ...bengali(15, 500), color: C.inkMuted, marginTop: 4 }}>
                  প্রোডাক্ট, দাম, স্টক — সব এক জায়গায়
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {['ফ্রি ডেলিভারি', 'ক্যাশ অন ডেলিভারি'].map((t) => (
                    <Pill key={t} tone="brand" fontSize={12} style={{ padding: '4px 10px' }}>
                      {t}
                    </Pill>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: 190,
                  background: 'linear-gradient(140deg, #F3EFFF, #FDF0F6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductPhoto tone="ink" size={150} radius={16} />
              </div>
            </div>
          </BrowserWindow>
        </div>
      </div>
    </SceneShell>
  );
};
