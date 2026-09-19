import React from "react";
import { AbsoluteFill } from "remotion";
import { IntroScene } from "../scenes/IntroScene";
import { SafeZone } from "@shared/layout/SafeZone";

export interface MainLandscapeProps {
  title?: string;
  subtitle?: string;
  showSafeZone?: boolean;
}

const MainLandscape: React.FC<MainLandscapeProps> = ({
  title = "Design em Movimento",
  subtitle = "Formato Horizontal 16:9 para YouTube e Desktop",
  showSafeZone = false,
}) => {
  return (
    <AbsoluteFill className="bg-black">
      <IntroScene title={title} subtitle={subtitle} />
      <SafeZone type="standard-16-9" show={showSafeZone} />
    </AbsoluteFill>
  );
};

export default MainLandscape;
