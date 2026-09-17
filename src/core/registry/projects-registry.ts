import type { RegisteredProject } from './project-contract';
import { generatedProjects } from './projects-registry.generated';
import { localProjects } from './projects-registry.local.generated';

/**
 * Todos os projetos registrados (versionáveis e locais/privados).
 */
export const allProjects: RegisteredProject[] = [
  ...generatedProjects,
  ...localProjects,
];

/**
 * Projetos ativos para carregamento no Remotion Studio.
 * Exclui projetos desabilitados (enabled: false) e arquivados (status: 'archived').
 */
export const activeProjects: RegisteredProject[] = allProjects
  .filter((project) => project.config.enabled)
  .filter((project) => project.config.status !== 'archived');
