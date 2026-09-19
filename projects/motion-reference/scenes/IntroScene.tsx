import React from "react";
import { AbsoluteFill } from "remotion";
import { BackgroundGrid } from "@shared/components/BackgroundGrid";
import { ProgressBar } from "@shared/components/ProgressBar";
import { TitleCard } from "../components/TitleCard";

export interface IntroSceneProps {
  title?: string;
  subtitle?: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  title = "Motion Design Studio",
  subtitle = "Criado com Remotion 4 e React 19",
}) => {
  return (
    <AbsoluteFill className="flex items-center justify-center">
      <BackgroundGrid glowColor="rgba(59, 130, 246, 0.2)" />
      <TitleCard title={title} subtitle={subtitle} />
      <ProgressBar color="#3b82f6" height={6} position="bottom" />
    </AbsoluteFill>
  );
};
