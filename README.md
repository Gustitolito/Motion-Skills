# Motion Design Studio

> Single-Package Multi-Project Remotion Workspace para produção de vídeos programáticos de alta performance com React 19, Tailwind CSS v4 e TypeScript.

---

## ⚡ Comandos Rápidos

```bash
# Abrir o Remotion Studio (Preview em tempo real na porta 3000)
npm run dev

# Criar um novo projeto versionável (público)
npm run new-project meu-video

# Criar um novo projeto privado/confidencial (ignorado pelo Git)
npm run new-project cliente-secreto --private

# Executar validação de código (Git Safety Check + Lint Remotion + TypeScript)
npm run check

# Executar suíte completa de testes de fumaça (Check + Still Frame + MP4 Render)
npm run test:smoke

# Renderizar vídeo usando presets centralizados
npm run render -- --composition=demo-showcase-reel --preset=socialH264
```

---

## 📦 Repository Portability

Este repositório contém o ambiente completo e independente do estúdio de motion design:
- **Portabilidade Total**: Para reproduzir o ambiente em um novo dispositivo, basta clonar o repositório e executar `npm ci`.
- **Projetos Privados Protegidos**: Projetos criados com `--private` residem em `projects/_private/` e nunca são versionados no Git.
- **Isolamento de Mídias Pesadas**: Pastas de vídeos brutos (`raw/`), mídias geradas por IA (`generated/`) e saídas de render (`out/` e `exports/`) não viajam pelo Git.
- **Configurações Locais**: Crie seu arquivo local `.env` a partir do modelo seguro [.env.example](file:///.env.example).

Consulte o guia completo em [docs/git-and-portability.md](file:///docs/git-and-portability.md) para detalhes de replicação e arquitetura.

---

## 📚 Documentação do Estúdio

- [docs/architecture.md](file:///docs/architecture.md): Princípios de arquitetura e camadas do estúdio.
- [docs/git-and-portability.md](file:///docs/git-and-portability.md): Política de Git, privacidade e portabilidade entre máquinas.
- [docs/getting-started.md](file:///docs/getting-started.md): Guia de início rápido e preview.
- [docs/creating-projects.md](file:///docs/creating-projects.md): Criação e contratos de projetos.
- [docs/render-presets.md](file:///docs/render-presets.md): Presets de renderização (social, master, alpha).
- [AGENTS.md](file:///AGENTS.md): Manual de governança obrigatório para agentes de IA.
