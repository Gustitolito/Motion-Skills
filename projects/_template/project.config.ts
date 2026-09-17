import type { ProjectConfig } from '@core/registry/project-contract';

export const projectConfig: ProjectConfig = {
  id: '_template',
  name: 'Template Starter',
  description: 'Boilerplate padronizado para novos projetos de motion design',
  status: 'draft',
  enabled: false, // Desabilitado por padrão para não poluir o Remotion Studio
  tags: ['template', 'boilerplate'],
  aspectRatios: ['9:16', '16:9'],
  defaultFps: 30,
  assetsPath: 'projects/_template',
  createdAt: '2026-09-16',
};
