import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BackgroundGrid } from '../../../src/shared/components/BackgroundGrid';
import { ProgressBar } from '../../../src/shared/components/ProgressBar';
import { KineticText } from '../../../src/shared/typography/KineticText';
import { FeatureBadge } from '../components/FeatureBadge';
import { demoShowcaseData } from '../data';

export interface ShowcaseIntroProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  isVertical?: boolean;
}

export const ShowcaseIntro: React.FC<ShowcaseIntroProps> = ({
  badge = demoShowcaseData.badge,
  headline = demoShowcaseData.headline,
  subheadline = demoShowcaseData.subheadline,
  isVertical = false,
}) => {
  return (
    <AbsoluteFill className="flex items-center justify-center p-8 select-none">
      <BackgroundGrid glowColor="rgba(37, 99, 235, 0.25)" />

      <div
        className={`flex flex-col items-center justify-center text-center z-10 ${
          isVertical ? 'max-w-md gap-6' : 'max-w-2xl gap-5'
        }`}
      >
        {/* Badge */}
        <FeatureBadge label={badge} delay={5} />

        {/* Headline */}
        <KineticText
          text={headline}
          className={`text-white font-black tracking-tight justify-center ${
            isVertical ? 'text-5xl leading-tight' : 'text-6xl leading-tight'
          }`}
          animationType="fade-up"
          delay={12}
          stagger={3}
        />

        {/* Subheadline */}
        <KineticText
          text={subheadline}
          className="text-neutral-400 text-lg md:text-xl font-medium justify-center max-w-lg"
          animationType="blur-in"
          delay={25}
          stagger={2}
        />

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {demoShowcaseData.features.map((feat, idx) => (
            <div
              key={feat}
              className="px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-xs font-mono"
            >
              {idx + 1}. {feat}
            </div>
          ))}
        </div>
      </div>

      <ProgressBar color="#2563eb" height={8} position="bottom" />
    </AbsoluteFill>
  );
};
