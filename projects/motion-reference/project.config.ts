import type { ProjectConfig } from "@core/registry/project-contract";

export const projectConfig: ProjectConfig = {
  id: "motion-reference",
  name: "Motion Reference",
  description: "Boilerplate padronizado para novos projetos de motion design",
  status: "active",
  enabled: true, // Desabilitado por padrão para não poluir o Remotion Studio
  tags: ["template", "boilerplate"],
  aspectRatios: ["9:16", "16:9"],
  defaultFps: 30,
  assetsPath: "projects/motion-reference",
  createdAt: "2026-09-19",
};
