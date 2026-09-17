# Criação e Estrutura de Projetos

Este guia detalha como novos projetos são estruturados e como expandir composições criativas.

---

## 1. Estrutura Interna de um Projeto

Ao criar um projeto com `npm run new-project <slug>`, a seguinte pasta é gerada:

```
projects/<slug>/
├── project.config.ts        # Manifesto tipado (metadados do projeto)
├── index.tsx                # Declaração das composições (9:16, 16:9)
├── compositions/            # Componentes principais de montagem
│   ├── MainReel.tsx         # Composição vertical (1080x1920)
│   └── MainLandscape.tsx    # Composição horizontal (1920x1080)
├── scenes/                  # Cenas sequenciais divididas por ato
│   └── IntroScene.tsx
├── components/              # Elementos visuais exclusivos deste projeto
│   └── TitleCard.tsx
├── data/                    # Dados, roteiros ou textos estruturados
│   └── index.ts
├── README.md                # Briefing e documentação criativa
└── notes.md                 # Anotações de iteração rápida
```

---

## 2. Adicionando uma Nova Composição

Para adicionar um formato adicional (ex: post quadrado 1:1 de 1080x1080 para feed):

1. Crie `projects/<slug>/compositions/MainSquare.tsx`:
```tsx
import React from 'react';
import { AbsoluteFill } from 'remotion';

const MainSquare: React.FC = () => {
  return (
    <AbsoluteFill className="bg-neutral-900 flex items-center justify-center">
      <h1 className="text-white text-4xl font-bold">1:1 Square Post</h1>
    </AbsoluteFill>
  );
};

export default MainSquare;
```

2. Registre em `projects/<slug>/index.tsx`:
```tsx
{
  id: '<slug>-square',
  title: 'Post Quadrado (1:1)',
  component: () => import('./compositions/MainSquare'),
  durationInFrames: 90,
  fps: 30,
  width: 1080,
  height: 1080,
}
```

---

## 3. Gerenciamento de Assets

- Coloque arquivos específicos do projeto em:
  `public/projects/<slug>/imagem.png`
- No código React, carregue usando `staticFile()`:
```tsx
import { Img, staticFile } from 'remotion';

<Img src={staticFile('projects/<slug>/imagem.png')} />
```
> **Aviso**: Nunca use caminhos relativos como `../../assets/img.png` para mídias dentro do Remotion, pois o bundler headless pode não resolver o arquivo durante o render.
