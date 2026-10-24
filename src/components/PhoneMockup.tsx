import React from 'react';
import { TOKENS } from '../utils/tokens';

interface PhoneMockupProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
  accentGlow?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  width = 500,
  height = 940,
  children,
  accentGlow = 'rgba(124, 58, 237, 0.20)',
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 64,
        padding: 14,
        background: 'linear-gradient(145deg, #2D2A4A 0%, #110F24 100%)',
        boxShadow: `0 40px 90px -15px ${accentGlow}, 0 20px 40px -15px rgba(17, 15, 36, 0.32), inset 0 2px 3px rgba(255,255,255,0.28)`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Inner Screen */}
      <div
        style={{
          flex: 1,
          borderRadius: 52,
          background: TOKENS.colors.surfaceWhite,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 132,
            height: 32,
            borderRadius: 20,
            background: '#110F24',
            zIndex: 30,
          }}
        />
        {children}
      </div>
    </div>
  );
};

