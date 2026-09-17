import type { ProjectConfig } from '../../src/core/registry/project-contract';

export const projectConfig: ProjectConfig = {
  id: 'demo-showcase',
  name: 'Demo Showcase',
  description: 'Projeto demonstrativo funcional com animações em Tailwind v4 e Remotion 4',
  status: 'active',
  enabled: true,
  tags: ['demo', 'showcase', 'kinetic-text', 'springs'],
  aspectRatios: ['9:16', '16:9'],
  defaultFps: 30,
  assetsPath: 'projects/demo-showcase',
  createdAt: '2026-09-16',
};
