import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon } from '../components/Icon';
import { SceneShell } from '../components/SceneShell';
import { Avatar, Card, IconTile, Pill, ProgressBar } from '../components/UI';
import { at } from '../data/scenes';
import { pop, progress, riseIn } from '../utils/animation';
import { bn } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { bengali, display } from '../utils/typography';

const T = (sec: number) => at('management', sec);

export const ManagementScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 2, 22);
  const board = pop(frame, fps, 4, { damping: 19, stiffness: 120, mass: 0.95 });

  const stockIn = pop(frame, fps, T(77.6), { damping: 16, stiffness: 180, mass: 0.8 });
  const trackIn = pop(frame, fps, T(79.6), { damping: 16, stiffness: 180, mass: 0.8 });
  const courierIn = pop(frame, fps, T(81.0), { damping: 16, stiffness: 180, mass: 0.8 });

  const stockDrop = progress(frame, T(78.8), T(79.2));
  const stockCount = 24 - stockDrop;
  const tracking = progress(frame, T(80.22), T(81.2));
  const sync = progress(frame, T(81.6), T(82.0));
  const more = pop(frame, fps, T(83.04), { damping: 14, stiffness: 180, mass: 0.7 });
  const easy = pop(frame, fps, T(83.82), { damping: 12, stiffness: 200, mass: 0.6 });

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
          <Icon name="grid" size={22} color={C.brand} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            OPERATIONS
          </span>
        </div>
        <div style={{ ...bengali(52, 700), color: C.ink, lineHeight: 1.3 }}>
          অর্ডারের বাইরেও <span style={{ color: C.brandDeep }}>অনেক কাজ</span>
        </div>
      </div>

      {/* dashboard */}
      <div
        style={{
          position: 'absolute',
          top: 356,
          left: 64,
          right: 64,
          opacity: board,
          transform: `translateY(${(1 - board) * 40}px) scale(${0.97 + board * 0.03})`,
        }}
      >
        <Card radius={32} style={{ padding: '20px 22px 22px' }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <IconTile name="chart" size={46} gradient={G.brand} iconSize={22} />
            <div style={{ flex: 1 }}>
              <div style={{ ...display(23, 800), color: C.ink }}>Business Dashboard</div>
              <div style={{ ...bengali(14, 500), color: C.inkMuted }}>আপনার স্টোর, এক জায়গায়</div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: C.mint,
                padding: '6px 12px',
                borderRadius: 999,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
              <span style={{ ...bengali(14, 700), color: '#0A7F72' }}>Live</span>
            </div>
            <Avatar initial="আ" size={36} variant={0} />
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            {/* stock */}
            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: '#F8F7FD',
                padding: '16px 16px 18px',
                opacity: stockIn,
                transform: `translateY(${(1 - stockIn) * 20}px)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <IconTile name="box" size={34} gradient={G.amber} iconSize={17} radius={11} />
                <span style={{ ...bengali(18, 700), color: C.ink, flex: 1 }}>স্টক ম্যানেজমেন্ট</span>
                <span
                  style={{
                    ...bengali(12, 700),
                    color: '#A76A00',
                    background: C.butter,
                    padding: '3px 8px',
                    borderRadius: 999,
                    opacity: stockDrop,
                  }}
                >
                  লো স্টক
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 10 }}>
                <span style={{ ...display(46, 800), color: C.ink }}>{bn(stockCount)}</span>
                <span style={{ ...bengali(16, 500), color: C.inkMuted }}>পিস বাকি</span>
                <span
                  style={{
                    ...bengali(14, 700),
                    color: C.coral,
                    opacity: stockDrop,
                    marginLeft: 'auto',
                  }}
                >
                  −১
                </span>
              </div>

              <ProgressBar
                value={0.62 - stockDrop * 0.04}
                width={'100%'}
                height={9}
                gradient={G.amber}
                track="#EFECF7"
                style={{ marginTop: 8 }}
              />

              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#FFFFFF',
                  borderRadius: 12,
                  padding: '8px 10px',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: G.inkCard,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...bengali(13, 600), color: C.ink, lineHeight: 1.2 }}>
                    ওভারসাইজড টি-শার্ট
                  </div>
                  <div style={{ ...bengali(11, 500), color: C.inkMuted }}>L · ইঙ্ক</div>
                </div>
                <span style={{ ...display(15, 800), color: C.inkMuted }}>{bn(stockCount)}</span>
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#FFFFFF',
                  borderRadius: 12,
                  padding: '8px 10px',
                  opacity: 0.9,
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 8, background: G.coral }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...bengali(13, 600), color: C.ink, lineHeight: 1.2 }}>
                    প্রিমিয়াম হুডি
                  </div>
                  <div style={{ ...bengali(11, 500), color: C.inkMuted }}>M · কোরাল</div>
                </div>
                <span style={{ ...display(15, 800), color: C.inkMuted }}>{bn(8)}</span>
              </div>
            </div>

            {/* tracking */}
            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: '#F8F7FD',
                padding: '16px 16px 18px',
                opacity: trackIn,
                transform: `translateY(${(1 - trackIn) * 20}px)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <IconTile name="truck" size={34} gradient={G.teal} iconSize={17} radius={11} />
                <span style={{ ...bengali(18, 700), color: C.ink, flex: 1 }}>অর্ডার ট্র্যাকিং</span>
                <span style={{ ...bengali(12, 600), color: C.inkMuted }}>#১০৪২</span>
              </div>

              <div style={{ position: 'relative', marginTop: 14, paddingLeft: 26 }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 7,
                    top: 8,
                    bottom: 16,
                    width: 3,
                    borderRadius: 2,
                    background: '#E9E6F4',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 7,
                    top: 8,
                    height: `${tracking * 78}%`,
                    width: 3,
                    borderRadius: 2,
                    background: G.teal,
                  }}
                />
                {[
                  { label: 'অর্ডার কনফার্ম', t: 0 },
                  { label: 'প্যাক করা হয়েছে', t: 0.5 },
                  { label: 'কুরিয়ারে পাঠানো', t: 1 },
                ].map((s) => {
                  const done = tracking >= s.t;
                  return (
                    <div
                      key={s.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 9,
                        marginBottom: 18,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: -26,
                          width: 17,
                          height: 17,
                          borderRadius: '50%',
                          background: done ? C.teal : '#FFFFFF',
                          border: `3px solid ${done ? C.teal : '#E1DDF0'}`,
                        }}
                      />
                      <span
                        style={{
                          ...bengali(14, done ? 600 : 500),
                          color: done ? C.ink : C.inkMuted,
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* courier */}
          <div
            style={{
              marginTop: 16,
              borderRadius: 22,
              background: '#F8F7FD',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              opacity: courierIn,
              transform: `translateY(${(1 - courierIn) * 18}px)`,
            }}
          >
            <IconTile name="sync" size={40} gradient={G.skyTeal} iconSize={20} radius={13} />
            <div style={{ flex: 1 }}>
              <div style={{ ...bengali(17, 700), color: C.ink }}>কুরিয়ার ইন্টিগ্রেশন</div>
              <div style={{ ...bengali(13, 500), color: C.inkMuted }}>
                {sync > 0.6 ? 'কানেক্টেড · অটো সিঙ্ক চালু' : 'এক ক্লিকে কুরিয়ারে পাঠান'}
              </div>
            </div>
            <div
              style={{
                width: 54,
                height: 30,
                borderRadius: 999,
                background: sync > 0.4 ? C.teal : '#DCD8E9',
                padding: 3,
                display: 'flex',
                justifyContent: sync > 0.4 ? 'flex-end' : 'flex-start',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 6px rgba(23,19,49,0.25)',
                }}
              />
            </div>
            <Pill tone={sync > 0.4 ? 'teal' : 'muted'} fontSize={13} style={{ padding: '5px 10px' }}>
              {sync > 0.4 ? 'Synced' : 'Off'}
            </Pill>
          </div>

          {/* footer stats */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {[
              { label: 'আজকের অর্ডার', value: bn(24), tone: C.brandDeep, bg: C.lavender },
              { label: 'পেন্ডিং', value: bn(3), tone: '#A76A00', bg: C.butter },
              { label: 'ডেলিভারড', value: bn(21), tone: '#0A7F72', bg: C.mint },
            ].map((st) => (
              <div
                key={st.label}
                style={{
                  flex: 1,
                  borderRadius: 16,
                  background: st.bg,
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <span style={{ ...bengali(13, 600), color: st.tone, opacity: 0.8 }}>{st.label}</span>
                <span style={{ ...display(26, 800), color: st.tone }}>{st.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* more capabilities */}
      <div
        style={{
          position: 'absolute',
          top: 900,
          left: 64,
          right: 64,
          opacity: more,
          transform: `translateY(${(1 - more) * 28}px)`,
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { icon: 'card' as const, label: 'ইনভয়েস' },
            { icon: 'chat' as const, label: 'SMS' },
            { icon: 'chart' as const, label: 'রিপোর্ট' },
            { icon: 'tag' as const, label: 'ডিসকাউন্ট' },
          ].map((c, i) => {
            const s = pop(frame, fps, T(83.04) + i * 4, { damping: 14, stiffness: 200, mass: 0.6 });
            return (
              <div
                key={c.label}
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  borderRadius: 18,
                  padding: '14px 8px',
                  boxShadow: SHADOW.cardSoft,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 7,
                  opacity: s,
                  transform: `translateY(${(1 - s) * 18}px)`,
                }}
              >
                <Icon name={c.icon} size={24} color={C.brandDeep} strokeWidth={2} />
                <span style={{ ...bengali(15, 600), color: C.inkSoft }}>{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* easy confirmation */}
      <div
        style={{
          position: 'absolute',
          top: 1050,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: easy,
          transform: `scale(${0.92 + easy * 0.08})`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 24px',
            borderRadius: 999,
            background: G.inkCard,
            color: '#FFFFFF',
            boxShadow: '0 24px 48px -22px rgba(23,19,49,0.6)',
          }}
        >
          <Icon name="checkCircle" size={24} color={C.teal} strokeWidth={2.4} />
          <span style={{ ...bengali(22, 600) }}>সব কাজ সহজ হয়েছে</span>
        </div>
      </div>
    </SceneShell>
  );
};
