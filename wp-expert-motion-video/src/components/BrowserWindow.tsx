import React from 'react';
import { C, SHADOW } from '../utils/tokens';
import { FONTS } from '../utils/typography';
import { Icon } from './Icon';

/**
 * Clean browser chrome for the "own website" sequences.
 * `urlChars` lets scenes type the address in sync with the narration.
 */
export const BrowserWindow: React.FC<{
  children: React.ReactNode;
  url?: string;
  urlChars?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  chromeHeight?: number;
  accent?: string;
  compact?: boolean;
}> = ({
  children,
  url = 'urbanstylebd.com',
  urlChars,
  width = 940,
  height = 1000,
  style,
  chromeHeight = 74,
  accent = C.teal,
  compact = false,
}) => {
  const shownUrl = urlChars === undefined ? url : url.slice(0, Math.max(0, urlChars));
  const typing = urlChars !== undefined && urlChars < url.length;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: compact ? 26 : 38,
        background: '#FFFFFF',
        boxShadow: SHADOW.card,
        border: '1px solid rgba(255,255,255,0.95)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          height: chromeHeight,
          background: 'linear-gradient(180deg, #F8F8FD 0%, #F1F0F9 100%)',
          borderBottom: '1px solid #E9E6F4',
          display: 'flex',
          alignItems: 'center',
          gap: compact ? 12 : 18,
          padding: compact ? '0 16px' : '0 24px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: compact ? 7 : 9 }}>
          {['#FF7A6B', '#FFC53D', '#37CBA0'].map((c) => (
            <div
              key={c}
              style={{ width: compact ? 10 : 13, height: compact ? 10 : 13, borderRadius: '50%', background: c }}
            />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            height: compact ? 34 : 42,
            borderRadius: 12,
            background: '#FFFFFF',
            border: '1px solid #E7E4F2',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 14px',
            boxShadow: '0 2px 6px rgba(38,26,96,0.04)',
          }}
        >
          <Icon name="lock" size={compact ? 15 : 17} color={accent} strokeWidth={2.2} />
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: compact ? 15 : 18,
              fontWeight: 600,
              color: C.inkSoft,
              letterSpacing: -0.2,
            }}
          >
            {shownUrl}
            {typing ? <span style={{ color: C.brand, opacity: 0.85 }}>|</span> : null}
          </span>
        </div>

        {compact ? null : (
          <div style={{ display: 'flex', gap: 12, color: C.inkMuted }}>
            <Icon name="arrowRight" size={20} />
            <Icon name="grid" size={20} />
          </div>
        )}
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
        {children}
      </div>
    </div>
  );
};
