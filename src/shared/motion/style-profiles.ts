/** Starting points at 30 fps, not substitutes for art direction. Distances use a 1920px canvas. */
export const STYLE_PROFILES = {
  premium: {
    reveal: 24,
    hold: 45,
    travel: 28,
    stagger: 3,
    easing: [0.16, 1, 0.3, 1],
  },
  promo: {
    reveal: 8,
    hold: 24,
    travel: 96,
    stagger: 2,
    easing: [0.22, 1, 0.36, 1],
  },
  editorial: {
    reveal: 16,
    hold: 60,
    travel: 20,
    stagger: 4,
    easing: [0.25, 1, 0.5, 1],
  },
  data: {
    reveal: 30,
    hold: 60,
    travel: 0,
    stagger: 6,
    easing: [0.25, 1, 0.5, 1],
  },
} as const;
export const framesAtFps = (framesAt30: number, fps: number): number =>
  Math.max(1, Math.round((framesAt30 * fps) / 30));
