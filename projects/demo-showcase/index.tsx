import type { RegisteredProject } from '../../src/core/registry/project-contract';
import { projectConfig } from './project.config';

export const project: RegisteredProject = {
  config: projectConfig,
  compositions: [
    {
      id: 'demo-showcase-reel',
      title: 'Demo Reel (9:16)',
      component: () => import('./compositions/DemoReel'),
      durationInFrames: 90, // 3 segundos a 30 fps
      fps: 30,
      width: 1080,
      height: 1920,
      defaultProps: {
        showSafeZone: false,
      },
    },
    {
      id: 'demo-showcase-landscape',
      title: 'Demo Landscape (16:9)',
      component: () => import('./compositions/DemoLandscape'),
      durationInFrames: 90,
      fps: 30,
      width: 1920,
      height: 1080,
      defaultProps: {
        showSafeZone: false,
      },
    },
  ],
};
