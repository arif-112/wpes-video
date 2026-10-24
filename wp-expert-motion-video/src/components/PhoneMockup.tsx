import React from 'react';
import { C } from '../utils/tokens';
import { FONTS } from '../utils/typography';
import { Icon } from './Icon';

/**
 * Phone frame used for the "Facebook page" side of the story.
 * Status bar is drawn with the same icon set as the rest of the video.
 */
export const PhoneMockup: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  time?: string;
}> = ({ children, width = 500, height = 940, style, time = '৯:৪১' }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 62,
      padding: 13,
      background: 'linear-gradient(155deg, #342E5C 0%, #16122B 65%, #0D0B1C 100%)',
      boxShadow:
        '0 46px 90px -26px rgba(31,22,84,0.55), 0 18px 36px -18px rgba(31,22,84,0.35), inset 0 2px 3px rgba(255,255,255,0.3)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      ...style,
    }}
  >
    <div
      style={{
        flex: 1,
        borderRadius: 51,
        background: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* status bar */}
      <div
        style={{
          height: 54,
          padding: '0 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'relative',
          zIndex: 20,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: C.ink }}>
          {time}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.ink }}>
          <Icon name="signal" size={15} strokeWidth={2} />
          <Icon name="wifi" size={16} strokeWidth={2} />
          <Icon name="battery" size={20} strokeWidth={1.6} />
        </div>
      </div>

      {/* dynamic island */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 118,
          height: 30,
          borderRadius: 20,
          background: '#100D20',
          zIndex: 30,
        }}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>{children}</div>
    </div>
  </div>
);
