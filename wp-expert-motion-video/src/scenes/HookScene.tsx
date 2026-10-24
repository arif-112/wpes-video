import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avatar, Card, GradientText, IconTile, Pill } from '../components/UI';
import { Icon } from '../components/Icon';
import { PhoneMockup } from '../components/PhoneMockup';
import { ProductPhoto } from '../components/ProductArt';
import { SceneShell } from '../components/SceneShell';
import { at } from '../data/scenes';
import { float, pop, progress, riseIn } from '../utils/animation';
import { bn, taka } from '../utils/format';
import { C, G, R, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('hook', sec);

/* --------------------------------------------------------------- pieces */

const Notification: React.FC<{
  icon: 'box' | 'users';
  title: string;
  detail: string;
  gradient: string;
  frame: number;
  fps: number;
  delay: number;
  dim: number;
}> = ({ icon, title, detail, gradient, frame, fps, delay, dim }) => {
  const s = pop(frame, fps, delay, { damping: 15, stiffness: 200, mass: 0.7 });
  return (
    <div
      style={{
        width: 500,
        opacity: s * dim,
        transform: `translateX(${(1 - s) * 60}px) scale(${0.96 + s * 0.04})`,
      }}
    >
      <Card
        radius={26}
        style={{
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: SHADOW.cardSoft,
        }}
      >
        <IconTile name={icon} size={62} gradient={gradient} iconSize={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...bengali(27, 700), color: C.ink, lineHeight: 1.25 }}>{title}</div>
          <div style={{ ...bengali(19, 500), color: C.inkMuted, marginTop: 2 }}>{detail}</div>
        </div>
        <Pill tone="muted" fontSize={16} style={{ padding: '6px 12px' }}>
          এখন
        </Pill>
      </Card>
    </div>
  );
};

const DependencyCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = pop(frame, fps, T(7.42));
  const line = progress(frame, T(7.6), T(8.4));
  const wobble = Math.sin((frame - T(9.4)) * 0.16) * (frame > T(9.4) ? 1.6 : 0);

  return (
    <div style={{ width: 500, opacity: s, transform: `translateY(${(1 - s) * 26}px)` }}>
      <Card radius={26} style={{ padding: '20px 22px', boxShadow: SHADOW.cardSoft }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Icon name="warning" size={20} color={C.coral} strokeWidth={2.2} />
          <span style={{ ...bengali(19, 600), color: C.coral }}>একটাই ভরসা</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <IconTile name="store" size={54} gradient={G.violet} iconSize={26} />
          <div style={{ flex: 1 }}>
            <div style={{ ...bengali(24, 700), color: C.ink }}>আপনার ব্যবসা</div>
            <div style={{ ...bengali(17, 500), color: C.inkMuted }}>প্রতিদিনের অর্ডার, কাস্টমার</div>
          </div>
        </div>

        <div
          style={{
            height: 46,
            marginLeft: 26,
            borderLeft: `3px dashed ${line > 0.6 ? 'rgba(255,107,90,0.75)' : C.lineStrong}`,
            opacity: 0.4 + line * 0.6,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, transform: `translateX(${wobble}px)` }}>
          <IconTile name="chat" size={54} gradient={'linear-gradient(140deg,#3B8BFF,#1877F2)'} iconSize={26} />
          <div style={{ flex: 1 }}>
            <div style={{ ...bengali(24, 700), color: C.ink }}>Facebook Page</div>
            <div style={{ ...bengali(17, 500), color: C.inkMuted }}>একমাত্র প্ল্যাটফর্ম</div>
          </div>
          <Pill tone="coral" fontSize={17} solid style={{ padding: '6px 14px' }}>
            {bn(100)}%
          </Pill>
        </div>
      </Card>
    </div>
  );
};

/* ---------------------------------------------------------------- scene */

export const HookScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, T(0.18), 30);
  const phoneIn = pop(frame, fps, T(0.98), { damping: 16, stiffness: 120, mass: 0.9 });
  const question = pop(frame, fps, T(6.02), { damping: 16, stiffness: 190, mass: 0.7 });
  const dim = 1 - progress(frame, T(6.02), T(6.4)) * 0.6;
  const update = pop(frame, fps, T(10.54), { damping: 13, stiffness: 170, mass: 0.7 });
  const shimmer = ((frame - T(10.9)) / 34) % 1;

  const comments = frame >= T(5.6);

  return (
    <SceneShell durationInFrames={durationInFrames}>
      {/* ------------------------------------------------------- headline */}
      <div
        style={{
          position: 'absolute',
          top: 158,
          left: 64,
          right: 64,
          opacity: head.opacity,
          transform: `translateY(${head.translateY}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: C.coral,
              boxShadow: '0 0 0 6px rgba(255,107,90,0.15)',
            }}
          />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            SOCIAL SELLING
          </span>
        </div>
        <div style={{ ...bengali(62, 700), color: C.ink, lineHeight: 1.26 }}>
          Facebook Page দিয়ে{' '}
          <GradientText>দারুণ ব্যবসা!</GradientText>
        </div>
      </div>

      {/* ----------------------------------------------------------- phone */}
      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 402 + float(frame, 0.4, 0.014, 6),
          transform: `scale(${phoneIn}) rotate(${(1 - phoneIn) * -4}deg)`,
          transformOrigin: 'bottom center',
          opacity: phoneIn,
        }}
      >
        <PhoneMockup width={432} height={790} time="৯:৪১">
          {/* page header */}
          <div
            style={{
              height: 132,
              flexShrink: 0,
              background: 'linear-gradient(135deg, #1877F2 0%, #4A9BFF 100%)',
              padding: '10px 20px 0',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 18px rgba(9,40,90,0.25)',
              }}
            >
              <Icon name="store" size={28} color="#1877F2" strokeWidth={2.1} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...display(21, 800), letterSpacing: -0.3 }}>Urban Style BD</div>
              <div style={{ ...bengali(15, 500), opacity: 0.92 }}>ফ্যাশন স্টোর · {bn('12.5')}K ফলোয়ার</div>
            </div>
            <div
              style={{
                padding: '7px 16px',
                borderRadius: 999,
                border: '1.5px solid rgba(255,255,255,0.6)',
                fontSize: 15,
                fontFamily: FONTS.display,
                fontWeight: 700,
              }}
            >
              Follow
            </div>
          </div>

          {/* post */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div
              style={{
                borderRadius: 18,
                border: '1px solid #ECEAF6',
                overflow: 'hidden',
                background: '#FFFFFF',
              }}
            >
              <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', gap: 9 }}>
                <Avatar initial="আ" size={30} variant={0} />
                <div>
                  <div style={{ ...bengali(16, 700), color: C.ink, lineHeight: 1.2 }}>Urban Style BD</div>
                  <div style={{ ...bengali(12, 500), color: C.inkMuted, lineHeight: 1.2 }}>
                    ২ ঘণ্টা আগে · স্পনসর্ড
                  </div>
                </div>
              </div>
              <ProductPhoto tone="ink" size={330} radius={0} style={{ margin: '0 auto' }} />
              <div style={{ padding: '10px 14px 12px' }}>
                <div style={{ ...bengali(17, 600), color: C.ink }}>প্রিমিয়াম কটন ওভারসাইজড টি-শার্ট</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <span style={{ ...display(20, 800), color: C.brandDeep }}>{taka(1290)}</span>
                  <span
                    style={{
                      ...bengali(13, 600),
                      color: C.green,
                      background: C.mint,
                      borderRadius: 999,
                      padding: '2px 10px',
                    }}
                  >
                    স্টকে আছে
                  </span>
                </div>
              </div>
            </div>

            {/* comment stream */}
            {comments ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['ভাই, দাম কত?', 'কালার আছে?'].map((t, i) => {
                  const s = pop(frame, fps, T(6.02) + i * 10);
                  return (
                    <div
                      key={t}
                      style={{
                        opacity: s,
                        transform: `translateX(${(1 - s) * -18}px)`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#F4F5F9',
                        borderRadius: 999,
                        padding: '7px 14px',
                        width: 'fit-content',
                      }}
                    >
                      <Avatar initial={i === 0 ? 'রা' : 'সা'} size={24} variant={i + 2} />
                      <span style={{ ...bengali(15, 500), color: C.inkSoft }}>{t}</span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* dim + big question badge */}
          {frame >= T(6.02) ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `rgba(20,16,46,${0.42 * question})`,
                borderRadius: 51,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: G.brand,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${question})`,
                  boxShadow: '0 24px 50px rgba(20,16,46,0.45)',
                  border: '6px solid rgba(255,255,255,0.25)',
                }}
              >
                <span style={{ ...display(86, 800), color: '#FFFFFF' }}>?</span>
              </div>
            </div>
          ) : null}
        </PhoneMockup>
      </div>

      {/* --------------------------------------------------- right column */}
      <div style={{ position: 'absolute', left: 512, top: 418, width: 500 }}>
        <Notification
          icon="box"
          title="অর্ডার আসছে"
          detail={`আজ ${bn(24)}টি নতুন অর্ডার`}
          gradient={G.teal}
          frame={frame}
          fps={fps}
          delay={T(3.16)}
          dim={dim}
        />
      </div>

      <div style={{ position: 'absolute', left: 512, top: 566, width: 500 }}>
        <Notification
          icon="users"
          title="কাস্টমার আসছে"
          detail={`${bn(85)}টি নতুন মেসেজ`}
          gradient={G.coral}
          frame={frame}
          fps={fps}
          delay={T(4.46)}
          dim={dim}
        />
      </div>

      {/* question card */}
      <div
        style={{
          position: 'absolute',
          left: 512,
          top: 742,
          width: 500,
          opacity: question,
          transform: `translateY(${(1 - question) * 30}px) scale(${0.94 + question * 0.06})`,
        }}
      >
        <div
          style={{
            borderRadius: 28,
            padding: '24px 24px 26px',
            background: G.inkCard,
            color: '#FFFFFF',
            boxShadow: '0 30px 60px -24px rgba(23,19,49,0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -30,
              top: -30,
              width: 130,
              height: 130,
              borderRadius: '50%',
              background: 'rgba(106,92,255,0.4)',
              filter: 'blur(6px)',
            }}
          />
          <div style={{ ...bengali(17, 600), color: 'rgba(255,255,255,0.62)', letterSpacing: 0.4 }}>
            কিন্তু একটা প্রশ্ন
          </div>
          <div style={{ ...bengali(38, 700), lineHeight: 1.32, marginTop: 8 }}>
            শুধু Facebook-নির্ভর
            <br />
            হয়েই চলবে?
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 512, top: 966, width: 500 }}>
        <DependencyCard frame={frame} fps={fps} />
      </div>

      {/* ----------------------------------------------------- update pill */}
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 1244,
          opacity: update,
          transform: `translateY(${(1 - update) * 44}px) scale(${0.96 + update * 0.04})`,
        }}
      >
        <div
          style={{
            borderRadius: 30,
            padding: '24px 28px',
            background: G.brand,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: '0 30px 64px -22px rgba(106,92,255,0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <IconTile
            name="sparkle"
            size={64}
            gradient="rgba(255,255,255,0.22)"
            iconSize={32}
            radius={20}
          />
          <div style={{ flex: 1 }}>
            <div style={{ ...bengali(34, 700), lineHeight: 1.25 }}>এবার আপডেট হওয়ার সময়</div>
            <div style={{ ...bengali(19, 500), opacity: 0.85, marginTop: 2 }}>
              নিজের একটি ওয়েবসাইট দিয়ে শুরু
            </div>
          </div>
          <Icon name="arrowRight" size={34} color="#FFFFFF" strokeWidth={2.4} />

          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 160,
              left: `${-20 + shimmer * 120}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28), rgba(255,255,255,0))',
              transform: 'skewX(-18deg)',
            }}
          />
        </div>
      </div>

      {/* small anchor at the bottom of the phone */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 1200,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          opacity: 0.75,
        }}
      >
        <Icon name="heart" size={20} color={C.rose} strokeWidth={2.2} />
        <span style={{ ...bengali(18, 500), color: C.inkSoft }}>
          দিনে {bn(120)}+ মেসেজ
        </span>
      </div>
    </SceneShell>
  );
};
