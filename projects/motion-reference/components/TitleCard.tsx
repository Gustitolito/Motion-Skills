import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { motionSpring } from "@shared/motion/springs";
import { KineticText } from "@shared/typography/KineticText";

export interface TitleCardProps {
  title: string;
  subtitle: string;
}

export const TitleCard: React.FC<TitleCardProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = motionSpring({
    frame,
    fps,
    preset: "snappy",
    delay: 0,
    from: 0.9,
    to: 1,
  });

  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center max-w-xl"
      style={{ transform: `scale(${cardScale})` }}
    >
      <KineticText
        text={title}
        className="text-white text-5xl font-black tracking-tight mb-4"
        animationType="fade-up"
        stagger={4}
      />
      <KineticText
        text={subtitle}
        className="text-neutral-400 text-xl font-medium"
        animationType="blur-in"
        delay={15}
        stagger={3}
      />
    </div>
  );
};
