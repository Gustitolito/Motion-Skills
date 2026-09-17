import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ShowcaseIntro } from '../scenes/ShowcaseIntro';
import { SafeZone } from '../../../src/shared/layout/SafeZone';

export interface DemoLandscapeProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  showSafeZone?: boolean;
}

const DemoLandscape: React.FC<DemoLandscapeProps> = ({
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
        isVertical={false}
      />
      <SafeZone type="standard-16-9" show={showSafeZone} />
    </AbsoluteFill>
  );
};

export default DemoLandscape;
