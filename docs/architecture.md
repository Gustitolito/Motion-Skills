# Arquitetura do Motion Design Studio

O **Motion Design Studio** foi projetado como um ambiente estático, permanente e de manutenção sustentável a longo prazo, resolvendo o problema comum de acúmulo de dívida técnica quando múltiplos vídeos são criados em um mesmo repositório.

---

## 1. Modelo Single-Package Multi-Project

Diferente de uma estrutura de múltiplos pacotes (monorepo complexo com dezenas de `package.json`), adotamos um modelo **Single-Package Multi-Project**:
- Todas as dependências (Remotion, React, Tailwind v4, ESLint, TypeScript) ficam instaladas exclusivamente na raiz.
- Novos vídeos/projetos criados em `projects/` nunca precisam de `npm install`.
- O tempo para iniciar um novo projeto é inferior a 1 segundo.

---

## 2. Separação de Camadas

```
src/
├── core/                # Infraestrutura e motor
│   ├── registry/        # Gerenciamento de contratos e descoberta de projetos
│   ├── render/          # Presets de renderização profissionais
│   └── studio/          # Ponto de montagem no Remotion Studio
│
└── shared/              # Biblioteca criativa compartilhada
    ├── motion/          # Física spring e curvas de interpolação
    ├── typography/      # Tipografia cinética
    ├── transitions/     # Transições de cena
    ├── fonts/           # Gerenciamento e preload de fontes
    ├── audio/           # Controle determinístico de áudio
    ├── layout/          # SafeZones e enquadramentos
    └── components/      # Fundos dinâmicos e barras de progresso

projects/                # Produções criativas isoladas
├── _template/           # Molde clonado pelo scaffolder
├── _archive/            # Projetos legados (excluídos do tsc)
└── <slug>/              # Projetos ativos
```

---

## 3. Isolamento e Carregamento Lazy

Com o passar do tempo, um estúdio de motion design acumula dezenas de projetos. Se todos fossem importados sincronamente na raiz:
1. O tempo de inicialização do Remotion Studio aumentaria progressivamente.
2. O consumo de memória no bundler se tornaria impraticável.

**Solução adotada**:
- Cada composição utiliza `lazyComponent={() => import('./compositions/...')}`.
- O bundler do Remotion compila apenas o código do projeto e da composição selecionada no Studio.

---

## 4. Preservação de Projetos Antigos (`projects/_archive/`)

Projetos finalizados que não estão mais em desenvolvimento podem ser movidos para `projects/_archive/`:
- São removidos da lista do Remotion Studio.
- O `tsconfig.json` exclui `projects/_archive` da verificação de tipos, garantindo que mudanças em APIs ou dependências futuras não façam o `npm run check` falhar devido a código antigo arquivado.
