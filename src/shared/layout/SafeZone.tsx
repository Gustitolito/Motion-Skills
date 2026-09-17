import React from 'react';
import { AbsoluteFill } from 'remotion';

export interface SafeZoneProps {
  type?: 'reels-9-16' | 'standard-16-9';
  show?: boolean;
}

/**
 * Overlay de safe zones para conferir posicionamento de textos e botões
 * de interface em Reels/TikTok/Shorts.
 */
export const SafeZone: React.FC<SafeZoneProps> = ({
  type = 'reels-9-16',
  show = false,
}) => {
  if (!show) return null;

  if (type === 'reels-9-16') {
    return (
      <AbsoluteFill className="pointer-events-none z-50">
        {/* Top Header Safe Zone (Profile, search icons) */}
        <div className="absolute top-0 left-0 right-0 h-[15%] border-b-2 border-dashed border-red-500/60 bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 font-mono text-sm tracking-wider">
            REELS TOP SAFE ZONE (15%)
          </span>
        </div>

        {/* Bottom Actions Safe Zone (Caption, audio, like, comment, share) */}
        <div className="absolute bottom-0 left-0 right-0 h-[22%] border-t-2 border-dashed border-red-500/60 bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 font-mono text-sm tracking-wider">
            REELS BOTTOM SAFE ZONE (22%)
          </span>
        </div>

        {/* Right Side UI Buttons (Like, comment, share buttons) */}
        <div className="absolute top-[15%] bottom-[22%] right-0 w-[12%] border-l-2 border-dashed border-yellow-500/60 bg-yellow-500/10 flex items-center justify-center">
          <span className="text-yellow-400 font-mono text-xs rotate-90 whitespace-nowrap">
            RIGHT UI (12%)
          </span>
        </div>
      </AbsoluteFill>
    );
  }

  // 16:9 Action Safe Zone (90%)
  return (
    <AbsoluteFill className="pointer-events-none z-50 flex items-center justify-center">
      <div className="w-[90%] h-[90%] border-2 border-dashed border-cyan-500/60 flex items-start justify-end p-2">
        <span className="text-cyan-400 font-mono text-xs">
          ACTION SAFE (90%)
        </span>
      </div>
    </AbsoluteFill>
  );
};
