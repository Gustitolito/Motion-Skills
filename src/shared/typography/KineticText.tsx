import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { motionSpring } from "../motion/springs";

export interface KineticTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number; // Delay em frames entre cada palavra
  animationType?: "fade-up" | "blur-in" | "bounce-pop" | "typewriter";
  /** Zero-based word indices, chosen for semantic importance. */
  emphasis?: number[];
  emphasisAnimation?: "fade-up" | "blur-in" | "bounce-pop" | "typewriter";
  emphasisStyle?: React.CSSProperties;
  emphasisLead?: number;
  /** Pause before the next word after an emphasized word. */
  emphasisHold?: number;
  style?: React.CSSProperties;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 3,
  animationType = "fade-up",
  emphasis = [],
  emphasisAnimation = "fade-up",
  emphasisStyle = { fontWeight: 800 },
  emphasisLead = 0,
  emphasisHold = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.trim().split(/\s+/).filter(Boolean);
  const emphasized = new Set(emphasis);

  return (
    <div
      className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}
      style={style}
    >
      {words.map((word, index) => {
        const isEmphasized = emphasized.has(index);
        const previousEmphasis = [...emphasized].filter(
          (i) => i >= 0 && i < index,
        ).length;
        const wordDelay = Math.max(
          0,
          delay +
            index * stagger +
            previousEmphasis * emphasisHold +
            (isEmphasized ? emphasisLead : 0),
        );
        const selectedAnimation = isEmphasized
          ? emphasisAnimation
          : animationType;

        let wordStyle: React.CSSProperties = {};

        if (selectedAnimation === "fade-up") {
          const progress = motionSpring({
            frame,
            fps,
            preset: "snappy",
            delay: wordDelay,
          });
          const translateY = interpolate(progress, [0, 1], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const opacity = interpolate(progress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          wordStyle = {
            transform: `translate3d(0, ${translateY}px, 0)`,
            opacity,
          };
        } else if (selectedAnimation === "blur-in") {
          const progress = motionSpring({
            frame,
            fps,
            preset: "smooth",
            delay: wordDelay,
          });
          const blur = interpolate(progress, [0, 1], [15, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const opacity = interpolate(progress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          wordStyle = {
            filter: `blur(${blur}px)`,
            opacity,
          };
        } else if (selectedAnimation === "bounce-pop") {
          const scale = motionSpring({
            frame,
            fps,
            preset: "bouncy",
            delay: wordDelay,
            from: 0,
            to: 1,
          });

          wordStyle = {
            transform: `scale(${scale})`,
            transformOrigin: "bottom center",
          };
        } else if (selectedAnimation === "typewriter") {
          const isVisible = frame >= wordDelay;
          wordStyle = {
            visibility: isVisible ? "visible" : "hidden",
          };
        }

        return (
          <span
            key={`${word}-${index}`}
            className={`inline-block will-change-transform ${wordClassName}`}
            style={{ ...wordStyle, ...(isEmphasized ? emphasisStyle : {}) }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
