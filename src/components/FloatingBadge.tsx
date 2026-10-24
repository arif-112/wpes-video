import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { springPop } from '../utils/animation';

export interface FloatingBadgeProps {
  x: number;
  y: number;
  size?: number;
  gradient: string;
  shadowColor?: string;
  delay?: number;
  floatSpeed?: number;
  floatRange?: number;
  rotate?: number;
  children: React.ReactNode;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  x,
  y,
  size = 88,
  gradient,
  shadowColor = 'rgba(99, 102, 241, 0.32)',
  delay = 0,
  floatSpeed = 0.06,
  floatRange = 10,
  rotate = -6,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = springPop(frame, fps, delay);
  const bobY = Math.sin((frame + delay * 5) * floatSpeed) * floatRange;
  const bobRot = rotate + Math.cos((frame + delay * 3) * floatSpeed * 0.8) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: gradient,
        boxShadow: `0 18px 34px -6px ${shadowColor}, inset 0 3px 6px rgba(255,255,255,0.55), inset 0 -4px 8px rgba(0,0,0,0.12)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${bobY}px) scale(${pop}) rotate(${bobRot}deg)`,
        zIndex: 15,
      }}
    >
      {children}
    </div>
  );
};

