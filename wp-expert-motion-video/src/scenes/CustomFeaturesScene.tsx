import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon } from '../components/Icon';
import { ProductPhoto } from '../components/ProductArt';
import { SceneShell } from '../components/SceneShell';
import { Card, IconTile, Pill } from '../components/UI';
import { at } from '../data/scenes';
import { pop, progress, riseIn } from '../utils/animation';
import { bn, taka } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('custom', sec);

export const CustomFeaturesScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 2, 22);
  const idea = pop(frame, fps, T(86.36), { damping: 15, stiffness: 170, mass: 0.8 });
  const blueprint = pop(frame, fps, T(88.22), { damping: 16, stiffness: 160, mass: 0.85 });
  const draw = progress(frame, T(88.52), T(89.4));
  const built = pop(frame, fps, T(89.58), { damping: 14, stiffness: 160, mass: 0.8 });
  const split = pop(frame, fps, T(90.48), { damping: 16, stiffness: 160, mass: 0.85 });
  const ours = pop(frame, fps, T(92.9), { damping: 13, stiffness: 190, mass: 0.7 });
  const saved = progress(frame, T(89.9), T(90.3));

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
          <Icon name="code" size={22} color={C.violet} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            CUSTOM BUILD
          </span>
        </div>
        <div style={{ ...bengali(52, 700), color: C.ink, lineHeight: 1.3 }}>
          আপনার ব্যবসার <span style={{ color: C.brandDeep }}>নিজস্ব ফিচার</span>
        </div>
      </div>

      {/* idea */}
      <div
        style={{
          position: 'absolute',
          top: 306,
          left: 64,
          right: 64,
          opacity: idea,
          transform: `translateY(${(1 - idea) * 28}px)`,
        }}
      >
        <div
          style={{
            borderRadius: 26,
            padding: '20px 22px',
            background: 'linear-gradient(135deg, #FFFBEE 0%, #FFF5F0 100%)',
            border: `2px dashed ${C.amber}`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <IconTile name="sparkle" size={62} gradient={G.amber} iconSize={30} />
          <div style={{ flex: 1 }}>
            <div style={{ ...bengali(17, 600), color: '#A76A00' }}>আপনার আইডিয়া</div>
            <div style={{ ...bengali(27, 700), color: C.ink, lineHeight: 1.35 }}>
              নিজের মতো কাস্টম মাপে অর্ডার নেওয়ার ব্যবস্থা
            </div>
          </div>
          <Pill tone="amber" fontSize={15} style={{ padding: '6px 12px' }}>
            বিশেষ ফিচার
          </Pill>
        </div>
      </div>

      {/* blueprint */}
      <div
        style={{
          position: 'absolute',
          top: 486,
          left: 64,
          right: 64,
          opacity: blueprint,
          transform: `translateY(${(1 - blueprint) * 26}px)`,
        }}
      >
        <Card radius={26} style={{ padding: '18px 20px', display: 'flex', gap: 18, alignItems: 'center' }}>
          <div
            style={{
              width: 250,
              height: 138,
              borderRadius: 16,
              background: '#F8F7FE',
              border: `1.5px solid ${C.line}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg width="250" height="138" viewBox="0 0 250 138">
              {[
                { x: 16, y: 16, w: 218, h: 22, r: 7 },
                { x: 16, y: 48, w: 104, h: 74, r: 10 },
                { x: 130, y: 48, w: 104, h: 30, r: 8 },
                { x: 130, y: 86, w: 104, h: 36, r: 8 },
              ].map((b, i) => (
                <rect
                  key={i}
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx={b.r}
                  fill="none"
                  stroke={C.violet}
                  strokeWidth="1.6"
                  strokeDasharray="6 6"
                  opacity={0.28 + draw * 0.55}
                />
              ))}
              <path
                d="M20 108 h60 M196 108 h34"
                stroke={C.brand}
                strokeWidth="2"
                strokeLinecap="round"
                opacity={draw}
              />
              <path
                d="M118 60 l-10 12 10 12"
                fill="none"
                stroke={C.brandDeep}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={draw}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 8,
                right: 10,
                ...display(11, 800),
                color: C.violet,
                letterSpacing: 1.4,
                opacity: 0.7,
              }}
            >
              WIREFRAME
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...bengali(16, 600), color: C.inkMuted }}>ডিজাইন → ডেভেলপমেন্ট</div>
            <div style={{ ...bengali(26, 700), color: C.ink, lineHeight: 1.35, marginTop: 2 }}>
              কাস্টমভাবে তৈরি করা সম্ভব
            </div>
            <div
              style={{
                display: 'flex',
                gap: 7,
                marginTop: 10,
                flexWrap: 'wrap',
              }}
            >
              {['পরিকল্পনা', 'ডিজাইন', 'কোড', 'টেস্ট'].map((s, i) => {
                const active = draw > i * 0.22;
                return (
                  <span
                    key={s}
                    style={{
                      ...bengali(14, 600),
                      color: active ? C.brandDeep : C.inkMuted,
                      background: active ? C.lavender : '#F6F5FB',
                      borderRadius: 999,
                      padding: '5px 11px',
                    }}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* built module */}
      <div
        style={{
          position: 'absolute',
          top: 692,
          left: 64,
          right: 64,
          opacity: built,
          transform: `translateY(${(1 - built) * 30}px) scale(${0.97 + built * 0.03})`,
        }}
      >
        <Card radius={28} style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <IconTile name="ruler" size={38} gradient={G.brand} iconSize={19} radius={12} />
            <div style={{ flex: 1 }}>
              <div style={{ ...bengali(20, 700), color: C.ink }}>কাস্টম সাইজ গাইড</div>
              <div style={{ ...bengali(13, 500), color: C.inkMuted }}>কাস্টমার নিজেই মাপ দেবে</div>
            </div>
            <Pill tone="teal" fontSize={13} style={{ padding: '5px 11px' }}>
              লাইভ
            </Pill>
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <ProductPhoto tone="ink" size={118} radius={16} />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ ...bengali(15, 600), color: C.inkSoft }}>বুকের মাপ</span>
                <span style={{ ...display(23, 800), color: C.brandDeep }}>
                  {bn(38)} ইঞ্চি
                </span>
              </div>

              <div
                style={{
                  marginTop: 8,
                  height: 10,
                  borderRadius: 999,
                  background: '#EFECF8',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '58%',
                    height: '100%',
                    borderRadius: 999,
                    background: G.brand,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '58%',
                    top: -7,
                    width: 24,
                    height: 24,
                    marginLeft: -12,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: `3px solid ${C.brand}`,
                    boxShadow: '0 4px 10px rgba(91,84,240,0.35)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                {['S', 'M', 'L', 'XL'].map((s, i) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: 34,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONTS.display,
                      fontSize: 14,
                      fontWeight: 700,
                      background: i === 2 ? G.brand : '#F5F3FB',
                      color: i === 2 ? '#FFFFFF' : C.inkMuted,
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                width: 160,
                borderRadius: 18,
                background: C.mint,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: 0.4 + saved * 0.6,
              }}
            >
              <Icon name="checkCircle" size={22} color="#0A7F72" strokeWidth={2.3} />
              <span style={{ ...bengali(15, 700), color: '#0A7F72' }}>মাপ সেভ হয়েছে</span>
              <span style={{ ...bengali(13, 500), color: '#0A7F72', opacity: 0.8 }}>
                {taka(1290)} · {bn(1)} পিস
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* split line */}
      <div
        style={{
          position: 'absolute',
          top: 1002,
          left: 64,
          right: 64,
          opacity: split,
          transform: `translateY(${(1 - split) * 30}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              background: '#FFFFFF',
              boxShadow: SHADOW.cardSoft,
              padding: '18px 18px',
            }}
          >
            <div style={{ ...bengali(15, 600), color: C.inkMuted }}>আইডিয়া</div>
            <div style={{ ...bengali(30, 700), color: C.ink }}>আপনার</div>
          </div>

          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: G.brand,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: SHADOW.glowBrand,
            }}
          >
            <Icon name="arrowRight" size={26} color="#FFFFFF" strokeWidth={2.4} />
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 22,
              background: G.inkCard,
              padding: '18px 18px',
              transform: `scale(${0.96 + ours * 0.04})`,
            }}
          >
            <div style={{ ...bengali(15, 600), color: 'rgba(255,255,255,0.6)' }}>বাস্তবায়ন</div>
            <div style={{ ...bengali(30, 700), color: '#FFFFFF' }}>আমাদের</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            marginTop: 16,
            opacity: ours,
          }}
        >
          <Icon name="shield" size={20} color={C.brand} strokeWidth={2.2} />
          <span style={{ ...bengali(19, 600), color: C.inkSoft }}>
            WP Expert Solution · ডিজাইন থেকে ডেলিভারি
          </span>
        </div>
      </div>
    </SceneShell>
  );
};
