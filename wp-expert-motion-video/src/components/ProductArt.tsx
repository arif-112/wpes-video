import React from 'react';
import { C } from '../utils/tokens';

export type ProductTone = 'ink' | 'olive' | 'coral' | 'cream';

const TONE: Record<ProductTone, { base: string; light: string; dark: string }> = {
  ink: { base: '#2A2540', light: '#3B3457', dark: '#1B1829' },
  olive: { base: '#68724C', light: '#7C8759', dark: '#4C5438' },
  coral: { base: '#EF6558', light: '#FF8375', dark: '#C74A40' },
  cream: { base: '#E9DDC6', light: '#F7EFDF', dark: '#CDBFA3' },
};

/**
 * Original vector product illustration (oversized tee) used for the demo store.
 * The colourway is driven by the selected product variant.
 */
export const ProductArt: React.FC<{
  tone?: ProductTone;
  width?: number;
  height?: number;
  glow?: boolean;
}> = ({ tone = 'ink', width = 520, height = 520, glow = true }) => {
  const t = TONE[tone];
  const uid = `tee-${tone}`;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 440"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={uid} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={t.light} />
          <stop offset="55%" stopColor={t.base} />
          <stop offset="100%" stopColor={t.dark} />
        </linearGradient>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4F0FF" />
          <stop offset="60%" stopColor="#FFF3EE" />
          <stop offset="100%" stopColor="#F0F7FF" />
        </linearGradient>
        <radialGradient id={`${uid}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(35,25,80,0.28)" />
          <stop offset="100%" stopColor="rgba(35,25,80,0)" />
        </radialGradient>
      </defs>

      {glow ? (
        <ellipse cx="200" cy="404" rx="140" ry="26" fill={`url(#${uid}-shadow)`} />
      ) : null}

      <path
        d="M150 100 C168 120 232 120 250 100 L304 124 L336 186 L292 214 L274 178 L274 392 C240 406 160 406 126 392 L126 178 L108 214 L64 186 L96 124 Z"
        fill={`url(#${uid})`}
      />

      {/* shoulder / collar band */}
      <path
        d="M150 100 C168 124 232 124 250 100"
        fill="none"
        stroke={t.dark}
        strokeWidth="13"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M152 112 C170 134 230 134 248 112"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity="0.18"
      />

      {/* sleeve seams */}
      <path d="M126 178 L108 214" stroke={t.dark} strokeWidth="3" opacity="0.55" />
      <path d="M274 178 L292 214" stroke={t.dark} strokeWidth="3" opacity="0.55" />

      {/* chest mark */}
      <circle cx="200" cy="196" r="21" fill="#FFFFFF" opacity="0.92" />
      <path
        d="M191 190 L200 200 L209 190 M191 202 L200 212 L209 202"
        fill="none"
        stroke={t.dark}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* fabric folds */}
      <path d="M166 236 C160 288 162 336 170 378" stroke={t.dark} strokeWidth="4" opacity="0.16" fill="none" />
      <path d="M234 236 C240 288 238 336 230 378" stroke={t.dark} strokeWidth="4" opacity="0.16" fill="none" />
      <path d="M204 250 C208 300 206 340 202 382" stroke="#FFFFFF" strokeWidth="3" opacity="0.10" fill="none" />

      {/* hem */}
      <path d="M126 374 C160 388 240 388 274 374" fill="none" stroke={t.dark} strokeWidth="3.5" opacity="0.5" />
    </svg>
  );
};

/** Soft rounded photo tile with the product illustration inside. */
export const ProductPhoto: React.FC<{
  tone?: ProductTone;
  size?: number;
  radius?: number;
  badge?: string;
  style?: React.CSSProperties;
}> = ({ tone = 'ink', size = 520, radius = 32, badge, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: 'linear-gradient(150deg, #F3EFFF 0%, #FFF1EC 55%, #EDF6FF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: size * 0.62,
        height: size * 0.62,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)',
        top: -size * 0.1,
        right: -size * 0.08,
      }}
    />
    <ProductArt tone={tone} width={size * 0.86} height={size * 0.86} glow={false} />
    {badge ? (
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          padding: '7px 16px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.92)',
          color: C.brandDeep,
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "'Hind Siliguri', sans-serif",
          boxShadow: '0 8px 18px -10px rgba(38,26,96,0.4)',
        }}
      >
        {badge}
      </div>
    ) : null}
  </div>
);
