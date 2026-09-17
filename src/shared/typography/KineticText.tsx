import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { motionSpring } from '../motion/springs';

export interface KineticTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number; // Delay em frames entre cada palavra
  animationType?: 'fade-up' | 'blur-in' | 'bounce-pop' | 'typewriter';
  style?: React.CSSProperties;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 3,
  animationType = 'fade-up',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div
      className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}
      style={style}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * stagger;

        let wordStyle: React.CSSProperties = {};

        if (animationType === 'fade-up') {
          const progress = motionSpring({
            frame,
            fps,
            preset: 'snappy',
            delay: wordDelay,
          });
          const translateY = interpolate(progress, [0, 1], [40, 0]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);

          wordStyle = {
            transform: `translate3d(0, ${translateY}px, 0)`,
            opacity,
          };
        } else if (animationType === 'blur-in') {
          const progress = motionSpring({
            frame,
            fps,
            preset: 'smooth',
            delay: wordDelay,
          });
          const blur = interpolate(progress, [0, 1], [15, 0]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);

          wordStyle = {
            filter: `blur(${blur}px)`,
            opacity,
          };
        } else if (animationType === 'bounce-pop') {
          const scale = motionSpring({
            frame,
            fps,
            preset: 'bouncy',
            delay: wordDelay,
            from: 0,
            to: 1,
          });

          wordStyle = {
            transform: `scale(${scale})`,
            transformOrigin: 'bottom center',
          };
        } else if (animationType === 'typewriter') {
          const isVisible = frame >= wordDelay;
          wordStyle = {
            visibility: isVisible ? 'visible' : 'hidden',
          };
        }

        return (
          <span
            key={`${word}-${index}`}
            className={`inline-block will-change-transform ${wordClassName}`}
            style={wordStyle}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
