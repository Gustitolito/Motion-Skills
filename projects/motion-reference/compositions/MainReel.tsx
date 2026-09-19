import React from "react";
import { AbsoluteFill } from "remotion";
import { IntroScene } from "../scenes/IntroScene";
import { SafeZone } from "@shared/layout/SafeZone";

export interface MainReelProps {
  title?: string;
  subtitle?: string;
  showSafeZone?: boolean;
}

const MainReel: React.FC<MainReelProps> = ({
  title = "Design em Movimento",
  subtitle = "Formato Vertical 9:16 para Reels e Shorts",
  showSafeZone = false,
}) => {
  return (
    <AbsoluteFill className="bg-black">
      <IntroScene title={title} subtitle={subtitle} />
      <SafeZone type="reels-9-16" show={showSafeZone} />
    </AbsoluteFill>
  );
};

export default MainReel;
