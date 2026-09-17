import type { RegisteredProject } from '@core/registry/project-contract';
import { projectConfig } from './project.config';

export const project: RegisteredProject = {
  config: projectConfig,
  compositions: [
    {
      id: '_template-reel',
      title: 'Reel Vertical (9:16)',
      component: () => import('./compositions/MainReel'),
      durationInFrames: 90, // 3 segundos a 30fps
      fps: 30,
      width: 1080,
      height: 1920,
      defaultProps: {
        title: 'Design em Movimento',
        subtitle: 'Template Base para Novos Projetos',
        showSafeZone: false,
      },
    },
    {
      id: '_template-landscape',
      title: 'Vídeo Horizontal (16:9)',
      component: () => import('./compositions/MainLandscape'),
      durationInFrames: 90,
      fps: 30,
      width: 1920,
      height: 1080,
      defaultProps: {
        title: 'Design em Movimento',
        subtitle: 'Template Base para Novos Projetos',
        showSafeZone: false,
      },
    },
  ],
};
