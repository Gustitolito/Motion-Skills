import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export interface BackgroundGridProps {
  glowColor?: string;
  gridColor?: string;
  animateGlow?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  glowColor = 'rgba(59, 130, 246, 0.15)',
  gridColor = 'rgba(255, 255, 255, 0.05)',
  animateGlow = true,
}) => {
  const frame = useCurrentFrame();

  const glowScale = animateGlow
    ? interpolate(Math.sin(frame * 0.05), [-1, 1], [0.9, 1.1])
    : 1;

  return (
    <AbsoluteFill className="bg-neutral-950 overflow-hidden">
      {/* Dynamic Ambient Glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none -top-40 -left-40 will-change-transform"
        style={{
          backgroundColor: glowColor,
          transform: `scale(${glowScale})`,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </AbsoluteFill>
  );
};
