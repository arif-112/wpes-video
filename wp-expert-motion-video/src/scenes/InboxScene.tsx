import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Avatar, Card, IconTile, Pill } from '../components/UI';
import { Icon } from '../components/Icon';
import { SceneShell } from '../components/SceneShell';
import { at } from '../data/scenes';
import { countTo, pop, progress, riseIn } from '../utils/animation';
import { bn } from '../utils/format';
import { C, G, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';

const T = (sec: number) => at('inbox', sec);

const QUESTIONS = [
  {
    at: 17.58,
    name: 'রহিম আহমেদ',
    initial: 'রা',
    text: 'ভাই, দাম কত?',
    tag: 'দাম',
    tone: '#5B54F0',
    bg: '#F3F1FF',
    avatar: 0,
  },
  {
    at: 18.92,
    name: 'সাদিয়া ইসলাম',
    initial: 'সা',
    text: 'কালার আছে?',
    tag: 'কালার',
    tone: '#F4557C',
    bg: '#FFF1F5',
    avatar: 1,
  },
  {
    at: 19.8,
    name: 'তানভীর হাসান',
    initial: 'তা',
    text: 'সাইজ কী কী?',
    tag: 'সাইজ',
    tone: '#8B5CF6',
    bg: '#F7F2FF',
    avatar: 2,
  },
  {
    at: 20.66,
    name: 'নুসরাত জাহান',
    initial: 'নু',
    text: 'ডেলিভারি চার্জ কত?',
    tag: 'ডেলিভারি',
    tone: '#F5A623',
    bg: '#FFF8E8',
    avatar: 3,
  },
];

const QuestionRow: React.FC<{
  q: (typeof QUESTIONS)[number];
  frame: number;
  fps: number;
  dim: number;
  index: number;
}> = ({ q, frame, fps, dim, index }) => {
  const s = pop(frame, fps, T(q.at), { damping: 15, stiffness: 210, mass: 0.65 });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 16px',
        borderRadius: 22,
        background: q.bg,
        opacity: s * dim,
        transform: `translateY(${(1 - s) * 26}px) scale(${0.97 + s * 0.03})`,
        border: `1px solid ${q.tone}18`,
      }}
    >
      <Avatar initial={q.initial} size={54} variant={q.avatar} ring />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ ...bengali(17, 600), color: C.inkMuted }}>{q.name}</span>
          <span style={{ ...bengali(13, 500), color: C.inkMuted, opacity: 0.7 }}>
            {bn(2 + index)} মিনিট
          </span>
        </div>
        <div style={{ ...bengali(27, 700), color: C.ink, lineHeight: 1.35 }}>“{q.text}”</div>
      </div>
      <div
        style={{
          padding: '7px 15px',
          borderRadius: 999,
          background: q.tone,
          color: '#FFFFFF',
          fontFamily: FONTS.bengali,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {q.tag}
      </div>
    </div>
  );
};

export const InboxScene: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = riseIn(frame, fps, 4, 26);
  const panel = pop(frame, fps, 6, { damping: 18, stiffness: 120, mass: 0.9 });

  const minutes = countTo(frame, T(12.9), T(17.5), 0, 260);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const quiz = progress(frame, T(26.24), T(26.7));
  const quizPop = pop(frame, fps, T(26.24), { damping: 14, stiffness: 170, mass: 0.7 });
  const punch = pop(frame, fps, T(27.88), { damping: 12, stiffness: 210, mass: 0.6 });

  const dim = 1 - quiz * 0.55;

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
          <Icon name="clock" size={22} color={C.coral} strokeWidth={2.4} />
          <span style={{ ...display(19, 800), letterSpacing: 3, color: C.inkMuted }}>
            THE INBOX PROBLEM
          </span>
        </div>
        <div style={{ ...bengali(54, 700), color: C.ink, lineHeight: 1.3 }}>
          দিনের{' '}
          <span
            style={{
              background: G.coral,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            কতটা সময়
          </span>{' '}
          শুধু রিপ্লাইতে!
        </div>
      </div>

      {/* time counter card */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 64,
          right: 64,
          opacity: panel,
          transform: `translateY(${(1 - panel) * 30}px)`,
        }}
      >
        <Card radius={28} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <IconTile name="clock" size={70} gradient={G.coral} iconSize={34} shadow />
          <div style={{ flex: 1 }}>
            <div style={{ ...bengali(20, 600), color: C.inkMuted }}>শুধু ইনবক্সের উত্তর দিতেই</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span style={{ ...display(50, 800), color: C.ink }}>
                {bn(String(hours).padStart(2, '0'))}
              </span>
              <span style={{ ...bengali(22, 600), color: C.inkMuted }}>ঘণ্টা</span>
              <span style={{ ...display(50, 800), color: C.ink }}>
                {bn(String(mins).padStart(2, '0'))}
              </span>
              <span style={{ ...bengali(22, 600), color: C.inkMuted }}>মিনিট / দিন</span>
            </div>
          </div>
          <div
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              background: C.peach,
              color: '#C93F32',
              fontFamily: FONTS.bengali,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            প্রতিদিন
          </div>
        </Card>
      </div>

      {/* chat panel */}
      <div
        style={{
          position: 'absolute',
          top: 574,
          left: 64,
          right: 64,
          transform: `translateY(${(1 - panel) * 40}px) scale(${0.97 + panel * 0.03})`,
          opacity: panel,
        }}
      >
        <div style={{ position: 'relative' }}>
        <Card radius={32} style={{ padding: '18px 18px 20px', overflow: 'hidden', position: 'relative', zIndex: 3 }}>
          {/* panel header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '4px 6px 14px',
              borderBottom: '1.5px solid #F2F0FA',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: 'linear-gradient(140deg,#3B8BFF,#1877F2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="chat" size={24} color="#FFFFFF" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...display(24, 800), color: C.ink }}>Page Inbox</div>
              <div style={{ ...bengali(15, 500), color: C.inkMuted }}>একই প্রশ্ন, বারবার</div>
            </div>
            <Pill tone="coral" icon="bell" fontSize={18} style={{ padding: '8px 16px' }}>
              {bn(countTo(frame, T(17.5), T(24), 12, 247))} মেসেজ
            </Pill>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QUESTIONS.map((q, i) => (
              <QuestionRow key={q.name} q={q} frame={frame} fps={fps} dim={dim} index={i} />
            ))}
          </div>
        </Card>

        {/* ghost pile */}
        {[22.8, 23.4, 24.0].map((t, i) => {
          const s = pop(frame, fps, T(t), { damping: 16, stiffness: 200, mass: 0.7 });
          return (
            <div
              key={t}
              style={{
                position: 'absolute',
                right: 14 + i * 10,
                bottom: -26 - i * 12,
                width: 560,
                opacity: s * 0.5,
                transform: `rotate(${-1.6 + i * 1.2}deg) translateY(${(1 - s) * 30}px)`,
                zIndex: 1,
              }}
            >
              <Card radius={20} shadow={SHADOW.cardSoft} style={{ padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initial="?" size={36} variant={i + 2} />
                  <div style={{ ...bengali(20, 600), color: C.inkSoft }}>
                    “একই প্রশ্ন... আবার?”
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
        </div>
      </div>

      {/* quiz scoreboard */}
      <div
        style={{
          position: 'absolute',
          top: 936,
          left: 88,
          right: 88,
          opacity: quizPop,
          transform: `translateY(${(1 - quizPop) * 40}px) scale(${0.94 + quizPop * 0.06})`,
        }}
      >
        <div
          style={{
            borderRadius: 30,
            padding: '22px 24px',
            background: G.inkCard,
            color: '#FFFFFF',
            boxShadow: '0 30px 66px -24px rgba(23,19,49,0.55)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -50,
              top: -60,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,85,124,0.55), rgba(244,85,124,0))',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Icon name="bolt" size={20} color={C.yellow} strokeWidth={2.2} />
            <span style={{ ...display(17, 800), letterSpacing: 2.6, color: 'rgba(255,255,255,0.62)' }}>
              ROUND {bn(48)} · SAME QUESTION
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ ...bengali(32, 700), lineHeight: 1.35, flex: 1 }}>
              সারাদিন প্রশ্নোত্তর
              <br />
              প্রতিযোগিতা!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '7px 12px',
                }}
              >
                <Avatar initial="আ" size={28} variant={0} />
                <span style={{ ...bengali(18, 600) }}>আপনি</span>
                <span style={{ ...display(20, 800), color: C.yellow }}>{bn(48)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '7px 12px',
                }}
              >
                <Avatar initial="কা" size={28} variant={3} />
                <span style={{ ...bengali(18, 600) }}>কাস্টমার</span>
                <span style={{ ...display(20, 800), color: C.yellow }}>{bn(48)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* punchline stamp */}
      <div
        style={{
          position: 'absolute',
          top: 1228,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: punch,
          transform: `rotate(-2.4deg) scale(${0.9 + punch * 0.1})`,
        }}
      >
        <div
          style={{
            padding: '16px 30px',
            borderRadius: 20,
            background: '#FFFFFF',
            border: `3px solid ${C.brand}`,
            boxShadow: SHADOW.cardSoft,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon name="clock" size={28} color={C.brand} strokeWidth={2.4} />
          <span style={{ ...bengali(32, 700), color: C.brandDeep }}>দিনটা শেষ, ব্যবসা নেই!</span>
        </div>
      </div>
    </SceneShell>
  );
};
