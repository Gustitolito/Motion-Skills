import type { ComponentType } from 'react';
import type { CalculateMetadataFunction } from 'remotion';

export type AspectRatioType = '9:16' | '16:9' | '1:1' | '4:5';

export interface CompositionDefinition<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  id: string;
  title: string;
  component: () => Promise<{ default: ComponentType<Props> }>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  defaultProps?: Props;
  calculateMetadata?: CalculateMetadataFunction<Props>;
  schema?: unknown;
}

export interface ProjectConfig {
  id: string; // Slug único em kebab-case (ex: "demo-showcase")
  name: string; // Nome visível no Remotion Studio (ex: "Demo Showcase")
  description?: string;
  status: 'active' | 'draft' | 'archived';
  enabled: boolean;
  tags: string[];
  aspectRatios: AspectRatioType[];
  defaultFps: number;
  assetsPath: string; // Caminho relativo em public/ (ex: "projects/demo-showcase")
  createdAt: string;
}

export interface RegisteredProject {
  config: ProjectConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compositions: CompositionDefinition<any>[];
}
