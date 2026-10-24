import React from 'react';
import { C, G, R, SHADOW } from '../utils/tokens';
import { FONTS, bengali, display } from '../utils/typography';
import { Icon, IconName } from './Icon';

/* ------------------------------------------------------------------ card */

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  radius?: number;
  padding?: number | string;
  shadow?: string;
}> = ({ children, style, radius = R.lg, padding = 0, shadow = SHADOW.card }) => (
  <div
    style={{
      background: C.surface,
      borderRadius: radius,
      boxShadow: shadow,
      border: '1px solid rgba(255,255,255,0.9)',
      padding,
      position: 'relative',
      ...style,
    }}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ pills */

export type Tone = 'brand' | 'teal' | 'coral' | 'amber' | 'sky' | 'ink' | 'muted';

const TONES: Record<Tone, { bg: string; fg: string }> = {
  brand: { bg: C.lavender, fg: C.brandDeep },
  teal: { bg: C.mint, fg: '#0A7F72' },
  coral: { bg: C.peach, fg: '#C93F32' },
  amber: { bg: C.butter, fg: '#A76A00' },
  sky: { bg: C.icy, fg: '#146CC4' },
  ink: { bg: '#221C46', fg: '#FFFFFF' },
  muted: { bg: '#F1F0F7', fg: C.inkSoft },
};

export const Pill: React.FC<{
  children: React.ReactNode;
  tone?: Tone;
  icon?: IconName;
  style?: React.CSSProperties;
  solid?: boolean;
  fontSize?: number;
}> = ({ children, tone = 'brand', icon, style, solid = false, fontSize = 22 }) => {
  const t = TONES[tone];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 20px',
        borderRadius: R.pill,
        background: solid ? t.fg : t.bg,
        color: solid ? (tone === 'ink' ? C.ink : '#FFFFFF') : t.fg,
        fontFamily: FONTS.bengali,
        fontSize,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {icon ? <Icon name={icon} size={fontSize + 6} color="currentColor" strokeWidth={2} /> : null}
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>{children}</span>
    </div>
  );
};

/* ---------------------------------------------------------------- heading */

export const Eyebrow: React.FC<{
  children: React.ReactNode;
  icon?: IconName;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, icon, color = C.brand, style }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      color,
      ...style,
    }}
  >
    {icon ? <Icon name={icon} size={26} color={color} strokeWidth={2.2} /> : null}
    <span
      style={{
        fontFamily: FONTS.display,
        fontSize: 21,
        fontWeight: 800,
        letterSpacing: 2.2,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  </div>
);

export const BengaliHead: React.FC<{
  children: React.ReactNode;
  size?: number;
  weight?: 500 | 600 | 700;
  color?: string;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}> = ({ children, size = 58, weight = 700, color = C.ink, align = 'center', style }) => (
  <div
    style={{
      ...bengali(size, weight),
      color,
      textAlign: align,
      lineHeight: 1.32,
      ...style,
    }}
  >
    {children}
  </div>
);

export const GradientText: React.FC<{
  children: React.ReactNode;
  gradient?: string;
  style?: React.CSSProperties;
}> = ({ children, gradient = G.brand, style }) => (
  <span
    style={{
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'inline-block',
      ...style,
    }}
  >
    {children}
  </span>
);

/* ---------------------------------------------------------------- icon tile */

export const IconTile: React.FC<{
  name: IconName;
  size?: number;
  iconSize?: number;
  gradient?: string;
  color?: string;
  radius?: number;
  shadow?: boolean;
  style?: React.CSSProperties;
}> = ({
  name,
  size = 64,
  iconSize,
  gradient = G.violet,
  color = '#FFFFFF',
  radius,
  shadow = false,
  style,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? Math.round(size * 0.32),
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: shadow ? SHADOW.floating : 'none',
      flexShrink: 0,
      ...style,
    }}
  >
    <Icon name={name} size={iconSize ?? Math.round(size * 0.5)} color={color} strokeWidth={1.9} />
  </div>
);

/* ----------------------------------------------------------------- avatar */

const AVATAR_GRADIENTS = [G.violet, G.coral, G.teal, G.amber, G.skyTeal, 'linear-gradient(140deg,#7C5CFF,#2E9BFF)'];

export const Avatar: React.FC<{
  initial: string;
  size?: number;
  variant?: number;
  ring?: boolean;
  style?: React.CSSProperties;
}> = ({ initial, size = 56, variant = 0, ring = false, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: AVATAR_GRADIENTS[variant % AVATAR_GRADIENTS.length],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontFamily: FONTS.bengali,
      fontWeight: 700,
      fontSize: Math.round(size * 0.42),
      boxShadow: ring ? `0 0 0 4px #FFFFFF, 0 6px 16px rgba(38,26,96,0.18)` : 'none',
      flexShrink: 0,
      ...style,
    }}
  >
    {initial}
  </div>
);

/* -------------------------------------------------------------- progress */

export const ProgressBar: React.FC<{
  value: number;
  width?: number | string;
  height?: number;
  gradient?: string;
  track?: string;
  style?: React.CSSProperties;
}> = ({ value, width = 320, height = 12, gradient = G.brand, track = '#ECEAF6', style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 999,
      background: track,
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        width: `${Math.max(0, Math.min(1, value)) * 100}%`,
        height: '100%',
        borderRadius: 999,
        background: gradient,
      }}
    />
  </div>
);

/* ---------------------------------------------------------------- button */

export const Button: React.FC<{
  children: React.ReactNode;
  icon?: IconName;
  variant?: 'brand' | 'ink' | 'ghost' | 'coral';
  width?: number | string;
  height?: number;
  fontSize?: number;
  pressed?: number; // 0..1 press progress
  style?: React.CSSProperties;
}> = ({ children, icon, variant = 'brand', width, height = 84, fontSize = 30, pressed = 0, style }) => {
  const palette =
    variant === 'brand'
      ? { bg: G.brand, fg: '#FFFFFF', shadow: SHADOW.glowBrand }
      : variant === 'coral'
        ? { bg: G.coral, fg: '#FFFFFF', shadow: '0 20px 40px -14px rgba(244,85,124,0.55)' }
        : variant === 'ink'
          ? { bg: G.inkCard, fg: '#FFFFFF', shadow: '0 20px 40px -16px rgba(23,19,49,0.5)' }
          : { bg: 'rgba(255,255,255,0.9)', fg: C.ink, shadow: SHADOW.cardSoft };

  return (
    <div
      style={{
        width,
        height,
        borderRadius: R.pill,
        background: palette.bg,
        color: palette.fg,
        boxShadow: palette.shadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        fontFamily: FONTS.bengali,
        fontSize,
        fontWeight: 700,
        transform: `scale(${1 - pressed * 0.05})`,
        border: variant === 'ghost' ? `1.5px solid ${C.line}` : 'none',
        ...style,
      }}
    >
      {children}
      {icon ? <Icon name={icon} size={fontSize + 6} color="currentColor" strokeWidth={2.2} /> : null}
    </div>
  );
};

/* ------------------------------------------------------------- misc bits */

export const Divider: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ height: 1.5, background: '#F0EEF8', width: '100%', ...style }} />
);

export const Dot: React.FC<{ color?: string; size?: number }> = ({ color = C.teal, size = 10 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />
);

export const Stat: React.FC<{
  label: string;
  value: React.ReactNode;
  tone?: Tone;
  icon?: IconName;
  style?: React.CSSProperties;
}> = ({ label, value, tone = 'brand', icon, style }) => {
  const t = TONES[tone];
  return (
    <div
      style={{
        background: t.bg,
        borderRadius: R.md,
        padding: '18px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.fg }}>
        {icon ? <Icon name={icon} size={20} color={t.fg} strokeWidth={2} /> : null}
        <span style={{ ...bengali(18, 600), color: t.fg, opacity: 0.85 }}>{label}</span>
      </div>
      <div style={{ ...display(34, 800), color: t.fg }}>{value}</div>
    </div>
  );
};
