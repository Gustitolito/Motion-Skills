import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { SPRING_PRESETS } from '../motion/springs';

/**
 * Utilitários de transições padronizados para o estúdio.
 */
export const STUDIO_TRANSITIONS = {
  // Fade linear clássico
  fade: (durationInFrames = 15) => ({
    presentation: fade(),
    timing: linearTiming({ durationInFrames }),
  }),

  // Slide lateral com física spring snappy
  slideLeft: (durationInFrames = 20) => ({
    presentation: slide({ direction: 'from-right' }),
    timing: springTiming({
      config: SPRING_PRESETS.snappy,
      durationInFrames,
    }),
  }),

  // Slide vertical de baixo para cima
  slideUp: (durationInFrames = 20) => ({
    presentation: slide({ direction: 'from-bottom' }),
    timing: springTiming({
      config: SPRING_PRESETS.smooth,
      durationInFrames,
    }),
  }),
};

export { TransitionSeries };
