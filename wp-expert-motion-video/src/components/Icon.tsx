import React from 'react';

/**
 * Original line-icon set used across the reel.
 * Drawn on a 24×24 grid, stroke-based, so every glyph shares the same
 * optical weight and inherits `currentColor`.
 */
export type IconName =
  | 'chat'
  | 'tag'
  | 'palette'
  | 'ruler'
  | 'truck'
  | 'clock'
  | 'check'
  | 'checkCircle'
  | 'shield'
  | 'star'
  | 'sparkle'
  | 'cart'
  | 'bag'
  | 'bolt'
  | 'grid'
  | 'chart'
  | 'layers'
  | 'code'
  | 'globe'
  | 'lock'
  | 'bell'
  | 'search'
  | 'plus'
  | 'arrowRight'
  | 'arrowUpRight'
  | 'close'
  | 'phone'
  | 'mail'
  | 'box'
  | 'sync'
  | 'eye'
  | 'heart'
  | 'user'
  | 'users'
  | 'store'
  | 'megaphone'
  | 'card'
  | 'wallet'
  | 'image'
  | 'warning'
  | 'info'
  | 'wifi'
  | 'battery'
  | 'signal'
  | 'play'
  | 'trendUp'
  | 'trendDown'
  | 'camera'
  | 'whatsapp';

const P: Record<IconName, React.ReactNode> = {
  chat: (
    <>
      <path d="M20.5 11.6c0 4.2-3.8 7.6-8.5 7.6-1.1 0-2.2-.2-3.2-.5L4 20.5l1.4-3.9A7.1 7.1 0 0 1 3.5 11.6C3.5 7.4 7.3 4 12 4s8.5 3.4 8.5 7.6Z" />
      <path d="M8.5 11.7h.01M12 11.7h.01M15.5 11.7h.01" />
    </>
  ),
  tag: (
    <>
      <path d="M20.2 12.6 12.7 20a1.7 1.7 0 0 1-2.4 0l-6.3-6.3a1.7 1.7 0 0 1-.5-1.4l.6-5.4a1.7 1.7 0 0 1 1.5-1.5l5.4-.6a1.7 1.7 0 0 1 1.4.5l6.3 6.3a1.7 1.7 0 0 1 .1 2Z" />
      <circle cx="8.9" cy="8.9" r="1.3" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.9-.8 1.9-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8h1.6a4.2 4.2 0 0 0 4.2-4.2c0-3.8-3.8-6.8-8.5-6.8Z" />
      <circle cx="7.6" cy="11.4" r="1.05" />
      <circle cx="10.2" cy="7.6" r="1.05" />
      <circle cx="14.6" cy="7.9" r="1.05" />
    </>
  ),
  ruler: (
    <>
      <rect x="2.6" y="8.6" width="18.8" height="6.8" rx="2" transform="rotate(-12 12 12)" />
      <path d="M7.4 9.2v2.2M10.6 8.5v3.1M13.8 7.8v2.2M17 7.1v3.1" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.8h10.2v9.4H2.5z" />
      <path d="M12.7 10.2h3.9l3 3.2v2.8h-6.9z" />
      <circle cx="6.6" cy="18.2" r="1.9" />
      <circle cx="17.2" cy="18.2" r="1.9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.1 1.9" />
    </>
  ),
  check: <path d="m4.8 12.6 4.4 4.4L19.2 7" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8 12.2 2.8 2.8L16.2 9.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.4 19 6v5.6c0 4.1-2.9 7.4-7 9-4.1-1.6-7-4.9-7-9V6l7-2.6Z" />
      <path d="m8.9 11.9 2.2 2.2 4-4.2" />
    </>
  ),
  star: (
    <path
      d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8Z"
      strokeLinejoin="round"
    />
  ),
  sparkle: (
    <>
      <path d="M12 3.4c.6 3.9 2.3 5.6 6.2 6.2-3.9.6-5.6 2.3-6.2 6.2-.6-3.9-2.3-5.6-6.2-6.2 3.9-.6 5.6-2.3 6.2-6.2Z" strokeLinejoin="round" />
      <path d="M18.4 15.2c.3 1.8 1.1 2.6 2.9 2.9-1.8.3-2.6 1.1-2.9 2.9-.3-1.8-1.1-2.6-2.9-2.9 1.8-.3 2.6-1.1 2.9-2.9Z" strokeLinejoin="round" />
    </>
  ),
  cart: (
    <>
      <path d="M3.3 4.4h2.2l2.2 10.3h10l2-7.6H6.5" />
      <circle cx="9" cy="18.7" r="1.6" />
      <circle cx="16.6" cy="18.7" r="1.6" />
    </>
  ),
  bag: (
    <>
      <rect x="4.2" y="7.6" width="15.6" height="12.4" rx="3" />
      <path d="M8.6 7.6V6.3a3.4 3.4 0 0 1 6.8 0v1.3" />
    </>
  ),
  bolt: <path d="M13.4 2.8 5.6 13.4h5.1l-.7 7.8 8-10.8h-5.2l.6-7.6Z" strokeLinejoin="round" />,
  grid: (
    <>
      <rect x="3.6" y="3.6" width="7" height="7" rx="2" />
      <rect x="13.4" y="3.6" width="7" height="7" rx="2" />
      <rect x="3.6" y="13.4" width="7" height="7" rx="2" />
      <rect x="13.4" y="13.4" width="7" height="7" rx="2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V9.6M10 20V4.6M16 20v-7.2M21 20H3.2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.4 8.4 4.3-8.4 4.3-8.4-4.3Z" strokeLinejoin="round" />
      <path d="m4.2 12.2 7.8 4 7.8-4M4.2 16.4l7.8 4 7.8-4" />
    </>
  ),
  code: <path d="m8.4 8.2-4 3.8 4 3.8M15.6 8.2l4 3.8-4 3.8M13.4 5.2l-2.8 13.6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.5 12h17M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6S14.3 18.2 12 20.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.8" y="10.2" width="14.4" height="10.2" rx="3" />
      <path d="M8.4 10.2V7.8a3.6 3.6 0 0 1 7.2 0v2.4M12 14.4v2.2" />
    </>
  ),
  bell: (
    <>
      <path d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0v4l1.6 2.4H4.8l1.6-2.4v-4Z" />
      <path d="M10.2 19.4a2 2 0 0 0 3.6 0" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m15.8 15.8 4 4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrowRight: <path d="M4.5 12h14.4M13.4 6.4 19 12l-5.6 5.6" />,
  arrowUpRight: <path d="M6.6 17.4 17.4 6.6M8.6 6.6h8.8v8.8" />,
  close: <path d="m6.2 6.2 11.6 11.6M17.8 6.2 6.2 17.8" />,
  phone: (
    <>
      <rect x="6.6" y="2.8" width="10.8" height="18.4" rx="3" />
      <path d="M10.6 5.4h2.8M11 18.3h2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="3" />
      <path d="m4.6 8 6.3 4.6a2 2 0 0 0 2.2 0L19.4 8" />
    </>
  ),
  box: (
    <>
      <path d="m12 3.2 8.2 4v9.6l-8.2 4-8.2-4V7.2Z" strokeLinejoin="round" />
      <path d="m3.9 7.3 8.1 4 8.1-4M12 11.3v9.4" />
    </>
  ),
  sync: (
    <>
      <path d="M20.2 11.4a8.2 8.2 0 0 0-14.4-4M3.8 12.6a8.2 8.2 0 0 0 14.4 4" />
      <path d="M5.8 2.9v4.7h4.7M18.2 21.1v-4.7h-4.7" />
    </>
  ),
  eye: (
    <>
      <path d="M2.4 12S6 5.8 12 5.8 21.6 12 21.6 12 18 18.2 12 18.2 2.4 12 2.4 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  heart: (
    <path d="M12 20.3S3.6 15.4 3.6 9.6a4.5 4.5 0 0 1 8.4-2.3 4.5 4.5 0 0 1 8.4 2.3c0 5.8-8.4 10.7-8.4 10.7Z" strokeLinejoin="round" />
  ),
  user: (
    <>
      <circle cx="12" cy="8.4" r="3.8" />
      <path d="M4.8 20.2a7.4 7.4 0 0 1 14.4 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9.4" cy="8.6" r="3.4" />
      <path d="M3.2 19.6a6.4 6.4 0 0 1 12.4 0" />
      <path d="M16.2 5.6a3.4 3.4 0 0 1 0 6.6M17.6 13.4a6.4 6.4 0 0 1 3.2 5.4" />
    </>
  ),
  store: (
    <>
      <path d="M3.8 9.4 5.4 4.2h13.2l1.6 5.2" />
      <path d="M3.8 9.4a2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.2 0" />
      <path d="M5.4 12v8.2h13.2V12M9.8 20.2v-4.4h4.4v4.4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3.4 10.2v3.6a1.6 1.6 0 0 0 1.6 1.6h1.8l9.6 4.4V4.2L6.8 8.6H5a1.6 1.6 0 0 0-1.6 1.6Z" />
      <path d="M6.8 15.4v4.4h3.2v-2.8M19.4 9a4 4 0 0 1 0 6" />
    </>
  ),
  card: (
    <>
      <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="3" />
      <path d="M2.8 10h18.4M6.4 14.6h3.4" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="5.8" width="18" height="13" rx="3.2" />
      <path d="M3 10.2h13.4a2.4 2.4 0 0 1 0 4.8H3" />
    </>
  ),
  image: (
    <>
      <rect x="3.2" y="4.4" width="17.6" height="15.2" rx="3" />
      <circle cx="8.8" cy="9.6" r="1.6" />
      <path d="m4.6 17.4 4.6-4.2 3.2 2.8 3.2-3 3.8 3.6" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.6 21.2 19.4H2.8Z" strokeLinejoin="round" />
      <path d="M12 9.2v4.4M12 16.6h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11v5.2M12 7.9h.01" />
    </>
  ),
  wifi: <path d="M3.4 9.2a13 13 0 0 1 17.2 0M6.4 12.6a8.6 8.6 0 0 1 11.2 0M9.4 15.9a4 4 0 0 1 5.2 0M12 19h.01" />,
  battery: (
    <>
      <rect x="2.6" y="7.6" width="16" height="8.8" rx="2.6" />
      <path d="M21.4 10.8v2.4" />
      <rect x="4.8" y="9.8" width="11" height="4.4" rx="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  signal: (
    <>
      <path d="M4.4 19v-4M9.6 19v-7.6M14.8 19v-11M20 19V4.4" strokeWidth="2.4" />
    </>
  ),
  play: <path d="M8.4 5.6 18 12l-9.6 6.4Z" strokeLinejoin="round" />,
  trendUp: <path d="M3.6 17.2 9.6 11l3.6 3.4 7-7.2M15 7.2h5.2V12.4" />,
  trendDown: <path d="M3.6 7.4 9.6 13l3.6-3.4 7 7M15 16.6h5.2V11.4" />,
  camera: (
    <>
      <path d="M3.2 8.6h3.4l1.6-2.4h7.6l1.6 2.4h3.4v10.2H3.2Z" strokeLinejoin="round" />
      <circle cx="12" cy="13.2" r="3.2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.4 11.6a8.4 8.4 0 0 1-12.4 7.4L3.6 20.4l1.4-4.4a8.4 8.4 0 1 1 15.4-4.4Z" />
      <path d="M9.4 8.6c.4 2.6 2 4.3 4.6 5 .6.1 1.1-.3 1.1-.9v-.8l-2-.8-.9.8c-.8-.4-1.4-1-1.8-1.8l.8-.9-.8-2h-.8c-.6 0-1 .5-.9 1.1" strokeLinejoin="round" />
    </>
  ),
};

export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
  fill?: string;
}> = ({ name, size = 24, color = 'currentColor', strokeWidth = 1.8, style, fill = 'none' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', flexShrink: 0, ...style }}
  >
    {P[name]}
  </svg>
);

/** Filled star for rating rows. */
export const StarSolid: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#F5A623',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
    <path
      d="m12 3.2 2.7 5.5 6 .9-4.35 4.2 1.03 6-5.38-2.85L6.62 19.8l1.03-6L3.3 9.6l6-.9Z"
      fill={color}
    />
  </svg>
);
