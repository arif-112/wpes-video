import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserWindow } from '../components/BrowserWindow';
import { Icon, StarSolid } from '../components/Icon';
import { ProductPhoto } from '../components/ProductArt';
import { SceneShell } from '../components/SceneShell';
import { Button, IconTile, Pill } from '../components/UI';
import { at } from '../data/scenes';
import { pop, progress, riseIn } from '../utils/animation';
import { bn, taka } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('reveal', sec);
const URL = 'urbanstylebd.com';

const Skeleton: React.FC<{ width: number | string; height: number; radius?: number; style?: React.CSSProperties }> = ({
  width,
  height,
  radius = 10,
  style,
}) => {
  const frame = useCurrentFrame();
  const shimmer = ((frame / 26) % 1) * 220 - 60;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: `linear-gradient(100deg, #EFEDF7 20%, #F8F7FD ${shimmer}%, #EFEDF7 80%)`,
        ...style,
      }}
    />
  );
};

const Reveal: React.FC<{ show: boolean; children: React.ReactNode; delay: number; style?: React.CSSProperties }> = ({
  show,
  children,
  delay,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, delay, { damping: 14, stiffness: 210, mass: 0.65 });
  if (!show) return null;
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * 14}px) scale(${0.96 + s * 0.04})`, ...style }}>
      {children}
    </div>
  );
};

export const WebsiteRevealScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 2, 22);
  const browser = pop(frame, fps, T(53.2), { damping: 18, stiffness: 100, mass: 1 });
  const pageIn = progress(frame, T(55.14), T(55.7));
  const urlChars = Math.round(progress(frame, T(53.88), T(55.14)) * URL.length);

  const photo = frame >= T(57.28);
  const price = frame >= T(58.8);
  const sizes = frame >= T(59.62);
  const colors = frame >= T(60.34);
  const stock = frame >= T(61.18);
  const details = frame >= T(62.34);

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
          <Icon name="globe" size={22} color={C.teal} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            YOUR OWN WEBSITE
          </span>
        </div>
        <div style={{ ...bengali(52, 700), color: C.ink, lineHeight: 1.3 }}>
          এবার ভাবুন — <span style={{ color: C.brandDeep }}>নিজের ওয়েবসাইট!</span>
        </div>
      </div>

      {/* browser */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          transform: `translateY(${(1 - browser) * 80}px) scale(${0.94 + browser * 0.06})`,
          opacity: browser,
        }}
      >
        <BrowserWindow
          width={952}
          height={1010}
          url={URL}
          urlChars={urlChars}
          chromeHeight={76}
          accent={C.brand}
        >
          <div
            style={{
              padding: '22px 26px 0',
              opacity: 0.25 + pageIn * 0.75,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* store nav */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                paddingBottom: 16,
                borderBottom: '1.5px solid #F1EFF9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    background: G.inkCard,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="store" size={16} color="#FFFFFF" strokeWidth={2.2} />
                </div>
                <span style={{ ...display(21, 800), color: C.ink, letterSpacing: -0.8 }}>
                  urbanstyle<span style={{ color: C.violet }}>.</span>bd
                </span>
              </div>
              <div style={{ display: 'flex', gap: 18, marginLeft: 12 }}>
                {['শপ', 'নতুন', 'আমাদের'].map((l, i) => (
                  <span
                    key={l}
                    style={{
                      ...bengali(17, 600),
                      color: i === 0 ? C.brandDeep : C.inkMuted,
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div style={{ flex: 1 }} />
              <Icon name="search" size={20} color={C.inkMuted} />
              <div style={{ position: 'relative' }}>
                <Icon name="bag" size={21} color={C.inkSoft} />
                <div
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -8,
                    minWidth: 17,
                    height: 17,
                    borderRadius: 9,
                    background: C.coral,
                    color: '#FFF',
                    fontFamily: FONTS.display,
                    fontSize: 11,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                  }}
                >
                  2
                </div>
              </div>
            </div>

            {/* product row */}
            <div style={{ display: 'flex', gap: 26, paddingTop: 20 }}>
              {/* gallery */}
              <div style={{ width: 420, flexShrink: 0 }}>
                <div style={{ position: 'relative', width: 420, height: 400 }}>
                  {photo ? (
                    <Reveal show={photo} delay={T(57.28)}>
                      <ProductPhoto tone="ink" size={420} radius={26} badge="নতুন" />
                    </Reveal>
                  ) : (
                    <Skeleton width={420} height={400} radius={26} />
                  )}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  {['ink', 'coral', 'cream'].map((tone, i) => (
                    <div key={tone} style={{ opacity: photo ? 1 : 0.4 }}>
                      <ProductPhoto
                        tone={tone as 'ink' | 'coral' | 'cream'}
                        size={104}
                        radius={16}
                        style={{
                          border: i === 0 ? `2.5px solid ${C.brand}` : '2.5px solid transparent',
                          background: 'linear-gradient(150deg,#F5F2FF,#FFF4EF)',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* details */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ ...bengali(14, 600), color: C.inkMuted }}>শপ / টি-শার্ট</span>
                  <span style={{ width: 3, height: 3, borderRadius: 2, background: C.inkMuted }} />
                  <span
                    style={{
                      ...bengali(14, 700),
                      color: C.green,
                      background: C.mint,
                      borderRadius: 999,
                      padding: '2px 9px',
                    }}
                  >
                    বেস্ট সেলার
                  </span>
                </div>

                <div style={{ ...bengali(34, 700), color: C.ink, lineHeight: 1.3, marginTop: 8 }}>
                  ওভারসাইজড কটন টি-শার্ট
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarSolid key={i} size={19} color={C.amber} />
                  ))}
                  <span style={{ ...bengali(15, 600), color: C.inkSoft, marginLeft: 3 }}>
                    {bn('4.9')} ({bn(128)} রিভিউ)
                  </span>
                </div>

                <div style={{ height: 62, display: 'flex', alignItems: 'center', marginTop: 8 }}>
                  {price ? (
                    <Reveal show={price} delay={T(58.8)} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                      <span style={{ ...display(44, 800), color: C.brandDeep }}>{taka(1290)}</span>
                      <span
                        style={{
                          ...display(22, 600),
                          color: C.inkMuted,
                          textDecoration: 'line-through',
                        }}
                      >
                        {taka(1590)}
                      </span>
                      <span
                        style={{
                          ...bengali(15, 700),
                          color: '#C93F32',
                          background: C.peach,
                          padding: '3px 9px',
                          borderRadius: 999,
                        }}
                      >
                        {bn(19)}% ছাড়
                      </span>
                    </Reveal>
                  ) : (
                    <Skeleton width={250} height={38} />
                  )}
                </div>

                {/* size */}
                <div style={{ marginTop: 6, height: 82 }}>
                  <div style={{ ...bengali(16, 600), color: C.inkMuted, marginBottom: 7 }}>সাইজ</div>
                  <div style={{ display: 'flex', gap: 9 }}>
                    {['S', 'M', 'L', 'XL'].map((s, i) => {
                      const active = s === 'L';
                      return (
                        <div
                          key={s}
                          style={{
                            width: 54,
                            height: 42,
                            borderRadius: 13,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: FONTS.display,
                            fontSize: 17,
                            fontWeight: 700,
                            background: active ? G.brand : '#F6F5FB',
                            color: active ? '#FFFFFF' : C.inkSoft,
                            border: active ? 'none' : '1.5px solid #ECEAF6',
                            opacity: sizes ? 1 : 0,
                            transform: `translateY(${sizes ? 0 : 8}px) scale(${sizes ? 1 : 0.9})`,
                            transition: 'none',
                          }}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* colour */}
                <div style={{ marginTop: 4, height: 66 }}>
                  <div style={{ ...bengali(16, 600), color: C.inkMuted, marginBottom: 7 }}>কালার</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { hex: '#2A2540', name: 'ইঙ্ক' },
                      { hex: '#68724C', name: 'অলিভ' },
                      { hex: '#EF6558', name: 'কোরাল' },
                      { hex: '#E9DDC6', name: 'ক্রিম' },
                    ].map((c, i) => (
                      <div
                        key={c.name}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: c.hex,
                          opacity: colors ? 1 : 0,
                          transform: `scale(${colors ? 1 : 0.6})`,
                          boxShadow:
                            i === 0
                              ? `0 0 0 4px ${C.brand}, 0 0 0 7px #FFFFFF`
                              : '0 0 0 2px #FFFFFF, 0 3px 8px rgba(23,19,49,0.12)',
                          border: '1.5px solid rgba(23,19,49,0.08)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* stock */}
                <div style={{ marginTop: 10, height: 40 }}>
                  {stock ? (
                    <Reveal show={stock} delay={T(61.18)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Pill tone="teal" icon="checkCircle" fontSize={17} style={{ padding: '7px 14px' }}>
                        স্টকে আছে · {bn(24)} পিস
                      </Pill>
                      <span style={{ ...bengali(14, 500), color: C.inkMuted }}>আজই ডেলিভারি</span>
                    </Reveal>
                  ) : (
                    <Skeleton width={220} height={34} radius={999} />
                  )}
                </div>
              </div>
            </div>

            {/* description */}
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: '1.5px solid #F1EFF9',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                opacity: details ? 1 : 0,
                transform: `translateY(${details ? 0 : 10}px)`,
              }}
            >
              {[
                { icon: 'layers' as const, label: '১০০% কটন' },
                { icon: 'sync' as const, label: '৭ দিনে রিটার্ন' },
                { icon: 'truck' as const, label: 'সারা দেশে ডেলিভারি' },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#F7F6FC',
                    borderRadius: 12,
                    padding: '9px 13px',
                  }}
                >
                  <Icon name={f.icon} size={18} color={C.brandDeep} strokeWidth={2.1} />
                  <span style={{ ...bengali(15, 600), color: C.inkSoft }}>{f.label}</span>
                </div>
              ))}
            </div>

            {/* sticky cta */}
            <div
              style={{
                marginTop: 'auto',
                padding: '14px 0 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                opacity: details ? 1 : 0,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ ...bengali(14, 500), color: C.inkMuted }}>মোট দাম</div>
                <div style={{ ...display(26, 800), color: C.ink }}>{taka(1290)}</div>
              </div>
              <Button variant="ghost" width={190} height={62} fontSize={19} icon="bag">
                কার্টে যোগ করুন
              </Button>
              <Button variant="brand" width={250} height={62} fontSize={22} icon="bolt">
                Buy Now
              </Button>
            </div>
          </div>
        </BrowserWindow>
      </div>

      {/* floating reassurance */}
      <div
        style={{
          position: 'absolute',
          top: 1372,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: pageIn,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 20px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.86)',
            border: `1px solid ${C.line}`,
            boxShadow: SHADOW.cardSoft,
          }}
        >
          <IconTile name="shield" size={28} gradient={G.teal} iconSize={15} radius={9} />
          <span style={{ ...bengali(18, 600), color: C.inkSoft }}>
            কাস্টমার নিজেই সব তথ্য দেখতে পাচ্ছে
          </span>
        </div>
      </div>
    </SceneShell>
  );
};
