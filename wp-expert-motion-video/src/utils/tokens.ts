/**
 * Central design tokens for the whole reel.
 * Every scene consumes these so the visual language stays consistent.
 */

export const C = {
  bgTop: '#F7F5FF',
  bgMid: '#F1ECFF',
  bgBottom: '#E9E3FF',

  ink: '#171331',
  inkSoft: '#4B4668',
  inkMuted: '#8B86A6',
  line: 'rgba(83, 71, 168, 0.12)',
  lineStrong: 'rgba(83, 71, 168, 0.22)',

  white: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceTint: '#FAF9FF',

  brand: '#5B54F0',
  brandDeep: '#3E37C9',
  violet: '#8B5CF6',
  sky: '#2E9BFF',
  teal: '#12B5A5',
  green: '#15A46E',
  coral: '#FF6B5A',
  rose: '#F4557C',
  amber: '#F5A623',
  yellow: '#FFC53D',
  facebook: '#1877F2',

  mint: '#E8FBF4',
  lavender: '#EFECFF',
  peach: '#FFF0EC',
  butter: '#FFF7E3',
  icy: '#EAF4FF',
} as const;

export const G = {
  brand: 'linear-gradient(135deg, #6A5CFF 0%, #9B5CF6 55%, #F4557C 100%)',
  brandSoft: 'linear-gradient(135deg, #EFECFF 0%, #FDEDF4 100%)',
  violet: 'linear-gradient(140deg, #7C5CFF 0%, #A855F7 100%)',
  coral: 'linear-gradient(140deg, #FF8A6B 0%, #F4557C 100%)',
  teal: 'linear-gradient(140deg, #1FD1B4 0%, #2E9BFF 100%)',
  amber: 'linear-gradient(140deg, #FFC53D 0%, #FF8A3D 100%)',
  skyTeal: 'linear-gradient(140deg, #38BDF8 0%, #12B5A5 100%)',
  inkCard: 'linear-gradient(150deg, #221C46 0%, #131026 100%)',
  white: 'linear-gradient(180deg, #FFFFFF 0%, #FBFAFF 100%)',
} as const;

export const SHADOW = {
  card: '0 30px 70px -28px rgba(38, 26, 96, 0.28), 0 10px 26px -14px rgba(38, 26, 96, 0.14)',
  cardSoft: '0 18px 44px -22px rgba(38, 26, 96, 0.22)',
  floating: '0 22px 44px -14px rgba(75, 54, 190, 0.38)',
  glowBrand: '0 26px 60px -18px rgba(91, 84, 240, 0.45)',
  inner: 'inset 0 1px 0 rgba(255,255,255,0.85)',
} as const;

export const R = {
  xl: 44,
  lg: 34,
  md: 24,
  sm: 16,
  xs: 11,
  pill: 999,
} as const;

/** Vertical safe area (Reels chrome: profile on top, actions at the bottom). */
export const SAFE = {
  top: 210,
  bottom: 300,
  side: 64,
  captionBottom: 300,
} as const;
