import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Cursor } from '../components/Cursor';
import { Icon } from '../components/Icon';
import { ProductPhoto } from '../components/ProductArt';
import { SceneShell } from '../components/SceneShell';
import { Avatar, Button, Card, IconTile, Pill } from '../components/UI';
import { at } from '../data/scenes';
import { pop, progress, riseIn } from '../utils/animation';
import { bn, taka } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('ordering', sec);

const STEPS = ['প্রোডাক্ট', 'ভ্যারিয়েন্ট', 'অর্ডার'];

const SummaryCard: React.FC = () => (
  <Card radius={30} style={{ padding: 16, display: 'flex', gap: 18, alignItems: 'center' }}>
    <ProductPhoto tone="ink" size={150} radius={22} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ ...bengali(26, 700), color: C.ink, lineHeight: 1.3 }}>
        ওভারসাইজড কটন টি-শার্ট
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
        <span style={{ ...display(28, 800), color: C.brandDeep }}>{taka(1290)}</span>
        <Pill tone="teal" fontSize={14} style={{ padding: '4px 10px' }} icon="checkCircle">
          স্টকে আছে
        </Pill>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        {[
          { label: 'সাইজ', value: 'L' },
          { label: 'কালার', value: 'ইঙ্ক' },
          { label: 'পরিমাণ', value: '১' },
        ].map((v) => (
          <div
            key={v.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#F6F5FC',
              borderRadius: 10,
              padding: '6px 10px',
            }}
          >
            <span style={{ ...bengali(13, 500), color: C.inkMuted }}>{v.label}</span>
            <span style={{ ...bengali(15, 700), color: C.ink }}>{v.value}</span>
          </div>
        ))}
      </div>
    </div>
    <Icon name="heart" size={26} color={C.rose} strokeWidth={2.2} />
  </Card>
);

export const OrderingScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 2, 22);
  const summary = pop(frame, fps, T(64.06), { damping: 17, stiffness: 150, mass: 0.85 });
  const stepper = pop(frame, fps, T(64.9), { damping: 16, stiffness: 170, mass: 0.8 });
  const buyIn = pop(frame, fps, T(66.5), { damping: 15, stiffness: 190, mass: 0.7 });
  const sheet = pop(frame, fps, T(68.06), { damping: 17, stiffness: 130, mass: 0.9 });
  const success = pop(frame, fps, T(69.94), { damping: 13, stiffness: 200, mass: 0.65 });
  const pressed = progress(frame, T(67.64), T(67.72)) * (1 - progress(frame, T(67.9), T(68.1)));

  const phaseA = 1 - progress(frame, T(70.4), T(70.8));
  const phaseB = progress(frame, T(70.8), T(71.15));
  const before = pop(frame, fps, T(70.8), { damping: 16, stiffness: 170, mass: 0.8 });
  const after = pop(frame, fps, T(71.4), { damping: 15, stiffness: 180, mass: 0.75 });
  const saved = pop(frame, fps, T(73.28), { damping: 13, stiffness: 180, mass: 0.7 });
  const easy = pop(frame, fps, T(75.52), { damping: 12, stiffness: 210, mass: 0.6 });

  const stepState = [
    { done: frame >= T(64.9), active: frame < T(65.6) },
    { done: frame >= T(65.62), active: frame >= T(65.62) && frame < T(68.06) },
    { done: frame >= T(69.94), active: frame >= T(68.06) && frame < T(69.94) },
  ];

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
          <Icon name="cart" size={22} color={C.teal} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            EASY ORDER
          </span>
        </div>
        <div style={{ ...bengali(52, 700), color: C.ink, lineHeight: 1.3 }}>
          কয়েকটা সহজ ধাপেই <span style={{ color: C.brandDeep }}>অর্ডার</span>
        </div>
      </div>

      {/* ------------------------------------------------------ phase A */}
      <div style={{ position: 'absolute', inset: 0, opacity: phaseA }}>
        <div
          style={{
            position: 'absolute',
            top: 316,
            left: 64,
            right: 64,
            opacity: summary,
            transform: `translateY(${(1 - summary) * 30}px)`,
          }}
        >
          <SummaryCard />
        </div>

        {/* stepper */}
        <div
          style={{
            position: 'absolute',
            top: 540,
            left: 64,
            right: 64,
            opacity: stepper,
            transform: `translateY(${(1 - stepper) * 24}px)`,
          }}
        >
          <Card radius={26} style={{ padding: '20px 28px', boxShadow: SHADOW.cardSoft }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {STEPS.map((label, i) => {
                const state = stepState[i];
                const active = state.active || state.done;
                return (
                  <React.Fragment key={label}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                      <div
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: '50%',
                          background: state.done ? G.teal : active ? G.brand : '#F2F0F9',
                          color: active ? '#FFFFFF' : C.inkMuted,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: active ? 'none' : `1.5px solid #E7E4F2`,
                          transform: `scale(${state.active ? 1.05 : 1})`,
                          boxShadow: state.active ? '0 10px 22px -10px rgba(91,84,240,0.6)' : 'none',
                        }}
                      >
                        {state.done ? (
                          <Icon name="check" size={26} color="#FFFFFF" strokeWidth={2.6} />
                        ) : (
                          <span style={{ ...display(22, 800) }}>{bn(i + 1)}</span>
                        )}
                      </div>
                      <span
                        style={{
                          ...bengali(16, state.active ? 700 : 500),
                          color: active ? C.ink : C.inkMuted,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 ? (
                      <div
                        style={{
                          flex: 1,
                          height: 3,
                          margin: '0 12px',
                          marginBottom: 26,
                          borderRadius: 2,
                          background: '#F1EFF8',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${progress(
                              frame,
                              i === 0 ? T(64.9) : T(65.62),
                              i === 0 ? T(65.4) : T(67.9)
                            ) * 100}%`,
                            height: '100%',
                            background: G.brand,
                          }}
                        />
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </Card>
        </div>

        {/* buy now */}
        <div
          style={{
            position: 'absolute',
            top: 700,
            left: 100,
            right: 100,
            opacity: buyIn,
            transform: `translateY(${(1 - buyIn) * 30}px)`,
          }}
        >
          <div style={{ position: 'relative' }}>
            <Button variant="brand" height={94} fontSize={30} icon="arrowRight" pressed={pressed}>
              Buy Now · {taka(1290)}
            </Button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 12,
                opacity: 0.85,
              }}
            >
              <Icon name="lock" size={16} color={C.inkMuted} strokeWidth={2.2} />
              <span style={{ ...bengali(15, 500), color: C.inkMuted }}>
                ক্যাশ অন ডেলিভারি · নিরাপদ চেকআউট
              </span>
            </div>

            {/* hover glow */}
            <div
              style={{
                position: 'absolute',
                inset: -10,
                borderRadius: 999,
                border: `2px solid rgba(91,84,240,${0.35 * buyIn * (1 - pressed)})`,
                opacity: frame > T(67.0) ? 1 : 0,
              }}
            />
          </div>
        </div>

        {/* cursor */}
        <Cursor
          fromX={300}
          fromY={1000}
          toX={742}
          toY={742}
          moveStart={T(67.05)}
          clickFrame={T(67.64)}
          hideAfter={T(68.8)}
        />

        {/* order sheet */}
        <div
          style={{
            position: 'absolute',
            top: 856,
            left: 64,
            right: 64,
            opacity: sheet,
            transform: `translateY(${(1 - sheet) * 80}px)`,
          }}
        >
          <Card radius={30} style={{ padding: '22px 24px', boxShadow: SHADOW.card }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ ...display(23, 800), color: C.ink, flex: 1 }}>অর্ডার সামারি</div>
              <Icon name="close" size={20} color={C.inkMuted} />
            </div>

            {[
              { label: 'প্রোডাক্ট', value: 'ওভারসাইজড টি-শার্ট × ১' },
              { label: 'সাইজ / কালার', value: 'L / ইঙ্ক' },
              { label: 'ডেলিভারি', value: 'ঢাকার ভিতরে · ২ দিন' },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '9px 0',
                  borderBottom: '1px solid #F4F2FA',
                }}
              >
                <span style={{ ...bengali(17, 500), color: C.inkMuted }}>{r.label}</span>
                <span style={{ ...bengali(18, 600), color: C.ink }}>{r.value}</span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14 }}>
              <span style={{ ...bengali(18, 600), color: C.inkSoft }}>সর্বমোট</span>
              <span style={{ ...display(28, 800), color: C.brandDeep }}>{taka(1350)}</span>
            </div>

            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              {['bKash', 'Nagad', 'Cash on Delivery'].map((m) => (
                <div
                  key={m}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '9px 6px',
                    borderRadius: 12,
                    background: '#F6F5FC',
                    fontFamily: FONTS.display,
                    fontSize: 15,
                    fontWeight: 600,
                    color: C.inkSoft,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* success overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 30,
                background: '#FFFFFF',
                opacity: success,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transform: `scale(${0.94 + success * 0.06})`,
              }}
            >
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  background: G.teal,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 18px 34px -14px rgba(18,181,165,0.6)',
                }}
              >
                <Icon name="check" size={40} color="#FFFFFF" strokeWidth={3} />
              </div>
              <div style={{ ...bengali(30, 700), color: C.ink }}>অর্ডার কনফার্মড!</div>
              <div style={{ ...bengali(17, 500), color: C.inkMuted }}>
                কাস্টমারকে কিছুই টাইপ করতে হয়নি
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ------------------------------------------------------ phase B */}
      <div style={{ position: 'absolute', inset: 0, opacity: phaseB }}>
        <div
          style={{
            position: 'absolute',
            top: 316,
            left: 64,
            right: 64,
            display: 'flex',
            gap: 18,
          }}
        >
          {/* before */}
          <div style={{ flex: 1, opacity: before, transform: `translateY(${(1 - before) * 26}px)` }}>
            <Card radius={26} style={{ padding: '16px 16px 18px', height: 556 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Icon name="close" size={18} color={C.coral} strokeWidth={2.6} />
                <span style={{ ...bengali(18, 700), color: C.coral }}>আগে: বারবার একই তথ্য</span>
              </div>
              {['দাম কত?', 'কালার আছে?', 'সাইজ কী কী?', 'ডেলিভারি চার্জ?'].map((q, i) => (
                <div
                  key={q}
                  style={{
                    background: '#F7F6FB',
                    borderRadius: 14,
                    padding: '10px 13px',
                    marginBottom: 8,
                    opacity: 0.55 + i * 0.08,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar initial="কা" size={24} variant={i + 1} />
                    <span style={{ ...bengali(16, 500), color: C.inkMuted }}>{q}</span>
                  </div>
                </div>
              ))}
              <div
                style={{
                  marginTop: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Icon name="clock" size={18} color={C.coral} strokeWidth={2.2} />
                <span style={{ ...bengali(15, 600), color: C.coral }}>প্রতিটির উত্তর আলাদা</span>
              </div>
            </Card>
          </div>

          {/* after */}
          <div
            style={{
              flex: 1,
              opacity: after,
              transform: `translateY(${(1 - after) * 30}px)`,
            }}
          >
            <Card radius={26} style={{ padding: '16px', height: 556 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Icon name="checkCircle" size={18} color={C.green} strokeWidth={2.4} />
                <span style={{ ...bengali(18, 700), color: '#0A7F72' }}>এখন: সব এক জায়গায়</span>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '1px solid #EEECF7',
                  background: '#FFFFFF',
                }}
              >
                <ProductPhoto tone="ink" size={250} radius={0} style={{ width: '100%' }} />
                <div style={{ padding: '10px 12px 12px' }}>
                  <div style={{ ...bengali(17, 700), color: C.ink }}>ওভারসাইজড টি-শার্ট</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ ...display(20, 800), color: C.brandDeep }}>{taka(1290)}</span>
                    <span style={{ ...bengali(13, 600), color: C.green }}>স্টকে আছে</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: C.mint,
                  borderRadius: 12,
                  padding: '9px 11px',
                }}
              >
                <Icon name="bolt" size={18} color="#0A7F72" strokeWidth={2.2} />
                <span style={{ ...bengali(15, 600), color: '#0A7F72' }}>লিংক দিলেই সব তথ্য</span>
              </div>
            </Card>
          </div>
        </div>

        {/* time saved */}
        <div
          style={{
            position: 'absolute',
            top: 916,
            left: 64,
            right: 64,
            opacity: saved,
            transform: `translateY(${(1 - saved) * 28}px)`,
          }}
        >
          <Card radius={28} style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <IconTile name="clock" size={72} gradient={G.teal} iconSize={34} shadow />
            <div style={{ flex: 1 }}>
              <div style={{ ...bengali(19, 600), color: C.inkMuted }}>প্রতিদিন সময় বাঁচছে প্রায়</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ ...display(46, 800), color: C.ink }}>{bn(42)}</span>
                <span style={{ ...bengali(22, 600), color: C.inkSoft }}>মিনিট</span>
                <span style={{ ...bengali(16, 500), color: C.inkMuted }}>
                  ({bn(2)} ঘণ্টা {bn(30)} মিনিট)
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <Icon name="trendUp" size={26} color={C.green} strokeWidth={2.4} />
              <span style={{ ...bengali(14, 600), color: C.green }}>প্রতিদিন</span>
            </div>
          </Card>
        </div>

        {/* easy badge */}
        <div
          style={{
            position: 'absolute',
            top: 1096,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 14,
            opacity: easy,
            transform: `translateY(${(1 - easy) * 24}px)`,
          }}
        >
          <Pill tone="teal" icon="checkCircle" fontSize={21} style={{ padding: '12px 22px' }}>
            আপনার সময় বাঁচছে
          </Pill>
          <Pill tone="brand" icon="heart" fontSize={21} style={{ padding: '12px 22px' }}>
            কাস্টমারের কাজও সহজ
          </Pill>
        </div>
      </div>
    </SceneShell>
  );
};
