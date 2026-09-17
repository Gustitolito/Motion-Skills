---
name: studio-conventions
description: Convenções de arquitetura, contratos tipados e organização do Motion Design Studio
---

# Studio Conventions (Motion Design Studio)

Este documento define as regras obrigatórias de arquitetura para todos os agentes de IA que criam ou modificam vídeos neste repositório.

## 1. Filosofia Single-Package Multi-Project
- Todos os projetos compartilham as dependências da raiz (`node_modules`).
- **NUNCA** execute `npm install` dentro de `projects/`.
- Novos projetos devem ser criados com:
  ```bash
  npm run new-project <slug-em-kebab-case>
  ```

## 2. Contrato Obrigatório por Projeto (`project.config.ts`)
Todo projeto deve residir em `projects/<slug>/` e exportar seu contrato `projectConfig`:
```typescript
import type { ProjectConfig } from '../../src/core/registry/project-contract';

export const projectConfig: ProjectConfig = {
  id: 'meu-video',
  name: 'Meu Vídeo',
  description: 'Breve descrição do projeto',
  status: 'active', // 'active' | 'draft' | 'archived'
  enabled: true,    // false oculta do Studio
  tags: ['reels', 'promo'],
  aspectRatios: ['9:16'],
  defaultFps: 30,
  assetsPath: 'projects/meu-video',
  createdAt: '2026-09-16',
};
```

## 3. Registro Automático de Projetos
- `src/core/registry/projects-registry.generated.ts` é gerado automaticamente pelo script `npm run new-project`.
- `src/core/registry/projects-registry.ts` consome os gerados e aplica filtros (`enabled: true`, `status !== 'archived'`).
- **NÃO edite `projects-registry.generated.ts` manualmente**.

## 4. Carregamento Lazy Obrigatório
No arquivo `projects/<slug>/index.tsx`, toda composição deve ser registrada com `lazyComponent`:
```typescript
{
  id: 'meu-video-reel',
  title: 'Reel (9:16)',
  component: () => import('./compositions/MainReel'),
  durationInFrames: 90,
  fps: 30,
  width: 1080,
  height: 1920,
}
```
O componente importado deve obrigatoriamente possuir `export default`.

## 5. Nomenclatura e Prevenção de Conflitos
- O `id` de cada composição deve ser prefixado com o slug do projeto (ex: `meu-video-reel`, `meu-video-landscape`).
- O `Folder name` aceita apenas caracteres alfanuméricos e hífens (`a-z`, `A-Z`, `0-9`, `-`). Espaços são proibidos.

## 6. Arquivamento
Para arquivar um vídeo antigo sem perder código:
- Mova a pasta para `projects/_archive/<slug>`.
- O TypeScript (`tsconfig.json: exclude`) ignora `projects/_archive`, garantindo que eventuais quebras futuras de código arquivado não impeçam o `npm run check`.
