import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { motionSpring } from '../motion/springs';

export interface WordRevealProps {
  children: React.ReactNode;
  delay?: number;
  highlightColor?: string;
  className?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  children,
  delay = 0,
  highlightColor = '#3b82f6',
  className = '',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = motionSpring({
    frame,
    fps,
    preset: 'snappy',
    delay,
  });

  const scale = interpolate(progress, [0, 1], [0.85, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <span
      className={`inline-block font-bold tracking-tight ${className}`}
      style={{
        transform: `scale(${scale})`,
        opacity,
        color: highlightColor,
      }}
    >
      {children}
    </span>
  );
};
