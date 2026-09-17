import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { motionSpring } from '../../../src/shared/motion/springs';
import { Sparkles } from 'lucide-react';

export interface FeatureBadgeProps {
  label: string;
  delay?: number;
}

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  label,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = motionSpring({
    frame,
    fps,
    preset: 'bouncy',
    delay,
    from: 0,
    to: 1,
  });

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/5 backdrop-blur-md will-change-transform"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      <Sparkles size={16} className="text-blue-400" />
      <span>{label}</span>
    </div>
  );
};
