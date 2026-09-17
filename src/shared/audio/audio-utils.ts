import { interpolate } from 'remotion';

export interface AudioFadeOptions {
  frame: number;
  totalDurationInFrames: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  maxVolume?: number;
}

/**
 * Calcula o volume determinístico para um elemento <Audio /> com fade-in e fade-out.
 */
export const calculateAudioFadeVolume = ({
  frame,
  totalDurationInFrames,
  fadeInFrames = 15,
  fadeOutFrames = 30,
  maxVolume = 1.0,
}: AudioFadeOptions): number => {
  if (frame < fadeInFrames) {
    return interpolate(frame, [0, fadeInFrames], [0, maxVolume], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  const fadeOutStart = totalDurationInFrames - fadeOutFrames;
  if (frame > fadeOutStart) {
    return interpolate(frame, [fadeOutStart, totalDurationInFrames], [maxVolume, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  return maxVolume;
};
