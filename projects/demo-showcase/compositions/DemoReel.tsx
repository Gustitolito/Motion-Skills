import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ShowcaseIntro } from '../scenes/ShowcaseIntro';
import { SafeZone } from '../../../src/shared/layout/SafeZone';

export interface DemoReelProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  showSafeZone?: boolean;
}

const DemoReel: React.FC<DemoReelProps> = ({
  badge,
  headline,
  subheadline,
  showSafeZone = false,
}) => {
  return (
    <AbsoluteFill className="bg-neutral-950">
      <ShowcaseIntro
        badge={badge}
        headline={headline}
        subheadline={subheadline}
        isVertical={true}
      />
      <SafeZone type="reels-9-16" show={showSafeZone} />
    </AbsoluteFill>
  );
};

export default DemoReel;
