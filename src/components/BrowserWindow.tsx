import React from 'react';
import { FONTS } from '../utils/typography';
import { TOKENS } from '../utils/tokens';

interface BrowserWindowProps {
  url?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  url = 'yourbrandshop.com',
  width = 920,
  height = 840,
  children,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: TOKENS.radii.cardLg,
        background: TOKENS.colors.surfaceWhite,
        boxShadow: TOKENS.gradients.cardGlow,
        border: '2px solid rgba(255, 255, 255, 0.95)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Browser Chrome */}
      <div
        style={{
          height: 68,
          background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: '50%',
              background: '#FB7185',
            }}
          />
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: '50%',
              background: '#FBBF24',
            }}
          />
          <div
            style={{
              width: 15,
              height: 15,
              borderRadius: '50%',
              background: '#34D399',
            }}
          />
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            height: 40,
            borderRadius: 12,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontFamily: FONTS.display,
            fontSize: 18,
            fontWeight: 600,
            color: TOKENS.colors.inkSecondary,
          }}
        >
          <span style={{ color: '#10B981', fontSize: 18 }}>🔒</span>
          <span>{url}</span>
        </div>
      </div>

      {/* Browser Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

