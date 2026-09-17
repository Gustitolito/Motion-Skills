import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export interface ProgressBarProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  color = '#3b82f6',
  height = 6,
  position = 'bottom',
  className = '',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div
      className={`absolute left-0 right-0 z-40 bg-white/10 ${positionClass} ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full will-change-transform"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
