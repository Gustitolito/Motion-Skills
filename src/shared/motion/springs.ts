import { spring, SpringConfig } from 'remotion';

export interface SpringPresetConfigs {
  snappy: Partial<SpringConfig>;
  bouncy: Partial<SpringConfig>;
  smooth: Partial<SpringConfig>;
  cinematic: Partial<SpringConfig>;
  gentle: Partial<SpringConfig>;
  stiff: Partial<SpringConfig>;
  wobbly: Partial<SpringConfig>;
}

export const SPRING_PRESETS: SpringPresetConfigs = {
  // Rápido e responsivo com quase nenhum bounce (UI moderna, cards)
  snappy: {
    damping: 24,
    mass: 0.8,
    stiffness: 220,
    overshootClamping: false,
  },

  // Efeito elástico expressivo (badges, pop-ups, reações)
  bouncy: {
    damping: 12,
    mass: 1.0,
    stiffness: 180,
    overshootClamping: false,
  },

  // Suave e elegante (câmera lenta, transições de tela cheia)
  smooth: {
    damping: 30,
    mass: 1.2,
    stiffness: 120,
    overshootClamping: false,
  },

  // Dramático e cinematográfico com desaceleração longa
  cinematic: {
    damping: 40,
    mass: 2.0,
    stiffness: 90,
    overshootClamping: false,
  },

  // Muito suave para elementos sutis de fundo
  gentle: {
    damping: 35,
    mass: 1.0,
    stiffness: 100,
    overshootClamping: false,
  },

  // Rígido e imediato (sem overshoot)
  stiff: {
    damping: 30,
    mass: 0.5,
    stiffness: 300,
    overshootClamping: true,
  },

  // Super elástico com múltiplos rebotes
  wobbly: {
    damping: 8,
    mass: 1.0,
    stiffness: 160,
    overshootClamping: false,
  },
};

export interface MotionSpringOptions {
  frame: number;
  fps: number;
  preset?: keyof SpringPresetConfigs;
  config?: Partial<SpringConfig>;
  delay?: number;
  from?: number;
  to?: number;
}

/**
 * Helper tipado para calcular animação física spring determinística no Remotion.
 */
export const motionSpring = ({
  frame,
  fps,
  preset = 'snappy',
  config = {},
  delay = 0,
  from = 0,
  to = 1,
}: MotionSpringOptions): number => {
  const selectedConfig = {
    ...SPRING_PRESETS[preset],
    ...config,
  };

  return spring({
    frame: frame - delay,
    fps,
    config: selectedConfig,
    from,
    to,
  });
};
