import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avatar, Card, IconTile, Pill, ProgressBar } from '../components/UI';
import { Icon } from '../components/Icon';
import { SceneShell } from '../components/SceneShell';
import { at } from '../data/scenes';
import { countTo, pop, progress, riseIn } from '../utils/animation';
import { bn } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('risk', sec);

export const PlatformRiskScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 4, 24);
  const panelIn = pop(frame, fps, 6, { damping: 18, stiffness: 130, mass: 0.9 });

  const drop = progress(frame, T(39.38), T(40.4));
  const reach = countTo(frame, T(38.0), T(40.4), 7800, 1200);
  const reachLabel = drop < 0.5 ? `${bn('7.8')}K` : `${bn('1.2')}K`;

  const policy = progress(frame, T(40.0), T(40.35));
  const restricted = progress(frame, T(41.52), T(42.0));
  const shake = frame > T(43.16) && frame < T(44.3) ? Math.sin(frame * 1.5) * 4 : 0;
  const recover = progress(frame, T(44.76), T(45.4));

  const siteIn = pop(frame, fps, T(48.68), { damping: 15, stiffness: 150, mass: 0.8 });
  const twoChannels = pop(frame, fps, T(50.26), { damping: 14, stiffness: 180, mass: 0.7 });

  const businessIn = pop(frame, fps, 12, { damping: 18, stiffness: 140, mass: 0.9 });
  const fbIn = pop(frame, fps, T(38.5), { damping: 16, stiffness: 170, mass: 0.8 });

  const linkDraw = progress(frame, T(39.2), T(41.0));
  const linkRisk = progress(frame, T(41.5), T(42.2)) * (1 - recover * 0.75);

  return (
    <SceneShell durationInFrames={durationInFrames}>
      {/* headline */}
      <div
        style={{
          position: 'absolute',
          top: 154,
          left: 64,
          right: 64,
          opacity: head.opacity,
          transform: `translateY(${head.translateY}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Icon name="shield" size={22} color={C.violet} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            PLATFORM RISK
          </span>
        </div>
        <div style={{ ...bengali(54, 700), color: C.ink, lineHeight: 1.3 }}>
          প্ল্যাটফর্ম বদলালে{' '}
          <span
            style={{
              background: G.coral,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ব্যবসা থামবে?
          </span>
        </div>
      </div>

      {/* insights panel */}
      <div
        style={{
          position: 'absolute',
          top: 352,
          left: 64,
          right: 64,
          opacity: panelIn,
          transform: `translateY(${(1 - panelIn) * 34}px)`,
        }}
      >
        <Card radius={30} style={{ padding: '20px 24px 22px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <IconTile name="chart" size={50} gradient={G.violet} iconSize={24} />
            <div style={{ flex: 1 }}>
              <div style={{ ...display(24, 800), color: C.ink }}>Page Insights</div>
              <div style={{ ...bengali(15, 500), color: C.inkMuted }}>শেষ ৭ দিনের পারফরম্যান্স</div>
            </div>
            <Pill tone="muted" fontSize={16} style={{ padding: '7px 14px' }}>
              ৭ দিন
            </Pill>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ ...bengali(19, 600), color: C.inkSoft }}>Reach</span>
                <span style={{ ...display(30, 800), color: drop > 0.5 ? C.coral : C.ink }}>
                  {reachLabel}
                </span>
                <Icon
                  name="trendDown"
                  size={20}
                  color={C.coral}
                  strokeWidth={2.4}
                  style={{ opacity: drop }}
                />
              </div>
              <ProgressBar
                value={1 - drop * 0.78}
                width={560}
                height={14}
                gradient={drop > 0.4 ? G.coral : G.brand}
              />
              <div style={{ ...bengali(15, 500), color: C.inkMuted, marginTop: 7 }}>
                বিনিয়োগ না করলেও রিচ কমে যেতে পারে
              </div>
            </div>

            <div
              style={{
                width: 210,
                borderRadius: 18,
                padding: '12px 14px',
                background: policy > 0.5 ? C.peach : C.mint,
                border: `1.5px solid ${policy > 0.5 ? '#FFD5CB' : '#C9F0E2'}`,
                opacity: 0.35 + policy * 0.65,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon
                  name={policy > 0.5 ? 'warning' : 'checkCircle'}
                  size={18}
                  color={policy > 0.5 ? C.coral : C.green}
                  strokeWidth={2.3}
                />
                <span style={{ ...bengali(18, 700), color: policy > 0.5 ? '#C93F32' : '#0A7F72' }}>
                  {policy > 0.5 ? 'Policy review' : 'সব ঠিক আছে'}
                </span>
              </div>
              <div style={{ ...bengali(15, 500), color: C.inkMuted, marginTop: 4 }}>
                {policy > 0.5 ? 'পেজে সীমাবদ্ধতা' : 'স্বাভাবিক অবস্থা'}
              </div>
            </div>
          </div>

          {/* restricted overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 30,
              background: 'rgba(255,247,245,0.92)',
              opacity: restricted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 20,
                background: C.peach,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="lock" size={30} color={C.coral} strokeWidth={2.1} />
            </div>
            <div>
              <div style={{ ...bengali(27, 700), color: '#B23A2D' }}>
                হঠাৎ পেজে সমস্যা — অর্ডার বন্ধ
              </div>
              <div style={{ ...bengali(17, 500), color: C.inkSoft }}>
                রিচ, পলিসি বা পেজ ইস্যু আপনার হাতে নেই
              </div>
            </div>
          </div>
          {/* quick stats */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, opacity: 0.5 + drop * 0.5 }}>
            {[
              { label: 'রিচ ড্রপ', value: `−${bn(84)}%`, color: C.coral, bg: C.peach },
              { label: 'পলিসি অ্যালার্ট', value: bn(2), color: '#A76A00', bg: C.butter },
              { label: 'ঝুঁকিতে অর্ডার', value: bn(24), color: '#C93F32', bg: C.peach },
            ].map((st) => (
              <div
                key={st.label}
                style={{
                  flex: 1,
                  borderRadius: 14,
                  background: st.bg,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ ...bengali(14, 600), color: st.color, opacity: 0.85 }}>{st.label}</span>
                <span style={{ ...display(22, 800), color: st.color }}>{st.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* channel diagram */}
      <AbsoluteFill>
        {/* connectors */}
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, opacity: businessIn }}
        >
          <path
            d="M372 878 C470 878 500 793 592 793"
            stroke={linkRisk > 0.3 ? C.coral : C.lineStrong}
            strokeWidth="3.5"
            strokeDasharray="9 10"
            fill="none"
            opacity={0.35 + linkDraw * 0.65}
          />
          <path
            d="M372 892 C470 892 500 1011 592 1011"
            stroke={C.violet}
            strokeWidth="3.5"
            strokeDasharray="9 10"
            fill="none"
            opacity={siteIn * 0.9}
          />
        </svg>

        {/* business */}
        <div
          style={{
            position: 'absolute',
            left: 64,
            top: 780,
            width: 308,
            opacity: businessIn,
            transform: `translateX(${(1 - businessIn) * -30}px)`,
          }}
        >
          <Card radius={28} style={{ padding: '20px 20px', boxShadow: SHADOW.cardSoft }}>
            <IconTile name="store" size={58} gradient={G.violet} iconSize={28} />
            <div style={{ ...bengali(27, 700), color: C.ink, marginTop: 12 }}>আপনার ব্যবসা</div>
            <div style={{ ...bengali(17, 500), color: C.inkMuted, marginTop: 2 }}>
              অর্ডার, কাস্টমার, আয়
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 14,
                opacity: twoChannels,
              }}
            >
              <Avatar initial="১" size={26} variant={0} />
              <Avatar initial="২" size={26} variant={4} style={{ marginLeft: -10 }} />
              <span style={{ ...bengali(15, 600), color: C.brandDeep }}>২টি চ্যানেল</span>
            </div>
          </Card>
        </div>

        {/* facebook channel */}
        <div
          style={{
            position: 'absolute',
            left: 592,
            top: 746,
            width: 424,
            opacity: fbIn,
            transform: `translateX(${(1 - fbIn) * 40}px) translateY(${shake}px)`,
          }}
        >
          <Card
            radius={26}
            style={{
              padding: '18px 20px',
              boxShadow: SHADOW.cardSoft,
              border: `1.5px solid ${linkRisk > 0.35 ? '#FFD2C9' : 'rgba(255,255,255,0.9)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <IconTile
                name="chat"
                size={58}
                gradient={'linear-gradient(140deg,#3B8BFF,#1877F2)'}
                iconSize={28}
              />
              <div style={{ flex: 1 }}>
                <div style={{ ...bengali(25, 700), color: C.ink }}>Facebook Page</div>
                <div style={{ ...bengali(16, 500), color: C.inkMuted }}>
                  {recover > 0.5 ? 'অবশ্যই গুরুত্বপূর্ণ' : 'রিচ কমছে, নিয়ন্ত্রণ সীমিত'}
                </div>
              </div>
              <div style={{ position: 'relative', width: 34, height: 34 }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 1 - recover }}>
                  <Icon name="warning" size={28} color={C.coral} strokeWidth={2.2} />
                </div>
                <div style={{ position: 'absolute', inset: 0, opacity: recover }}>
                  <Icon name="checkCircle" size={28} color={C.green} strokeWidth={2.2} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* own website channel */}
        <div
          style={{
            position: 'absolute',
            left: 592,
            top: 964,
            width: 424,
            opacity: siteIn,
            transform: `translateX(${(1 - siteIn) * 70}px) scale(${0.94 + siteIn * 0.06})`,
          }}
        >
          <div
            style={{
              borderRadius: 26,
              padding: '18px 20px',
              background: 'linear-gradient(135deg, #F2EEFF 0%, #FDF0F6 100%)',
              border: '1.5px solid rgba(139,92,246,0.22)',
              boxShadow: SHADOW.cardSoft,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <IconTile name="globe" size={58} gradient={G.brand} iconSize={28} shadow />
            <div style={{ flex: 1 }}>
              <div style={{ ...bengali(25, 700), color: C.ink }}>নিজের ওয়েবসাইট</div>
              <div style={{ ...bengali(16, 500), color: '#5C4BB8' }}>নিয়ন্ত্রণ পুরোটাই আপনার হাতে</div>
            </div>
            <div
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                background: '#FFFFFF',
                ...bengali(14, 700),
                color: C.brandDeep,
              }}
            >
              নতুন
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* conclusion */}
      <div
        style={{
          position: 'absolute',
          top: 1128,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: twoChannels,
          transform: `translateY(${(1 - twoChannels) * 34}px) scale(${0.94 + twoChannels * 0.06})`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 26px',
            borderRadius: 999,
            background: G.inkCard,
            color: '#FFFFFF',
            boxShadow: '0 24px 50px -20px rgba(23,19,49,0.6)',
          }}
        >
          <Icon name="layers" size={26} color={C.yellow} strokeWidth={2.2} />
          <span style={{ ...bengali(27, 600), color: '#FFFFFF' }}>
            আরও একটি শক্তিশালী প্ল্যাটফর্ম
          </span>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: C.teal,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONTS.display,
              fontSize: 17,
              fontWeight: 800,
            }}
          >
            ✓
          </span>
        </div>
      </div>
    </SceneShell>
  );
};
