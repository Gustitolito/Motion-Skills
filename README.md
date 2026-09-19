# Motion-Skills

Direção criativa e motion para agentes de código, com um estúdio Remotion executável.

Pedido → creative director quando necessário → motion director → skills sob demanda → implementação → QA.

Consulte o [catálogo e roteamento](docs/motion-skill-library.md), os [estudos executáveis](projects/motion-reference/notes.md), a [validação](docs/validation.md) e a [origem das skills oficiais](docs/upstream-skills.md).

# Remotion workspace

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

# Sincronizar compatibilidade de Agent Skills para Claude Code
npm run sync:agent-skills

# Executar validação de código (Skills + Git Safety + Lint Remotion + TypeScript)
npm run check

# Executar suíte completa de testes de fumaça (Check + Still Frame + MP4 Render)
npm run test:smoke

# Renderizar vídeo usando presets centralizados
npm run render -- --composition=demo-showcase-reel --preset=socialH264
```

---

## 🤖 Agent Skills

As skills do projeto usam uma fonte de verdade única:

- `.agents/skills/` — árvore canônica, usada por agentes compatíveis com o padrão de skills de projeto.
- `.claude/skills/` — espelho gerado para discovery nativo no Claude Code; não editar manualmente.
- `AGENTS.md` — governança canônica e regras permanentes do repositório.
- `CLAUDE.md` — shim mínimo que direciona o Claude Code para `AGENTS.md`.

Depois de alterar qualquer skill canônica, execute `npm run sync:agent-skills`. O comando `npm run check` inclui `check:skills` e falha se o espelho do Claude estiver divergente.

---

## 📦 Repository Portability

Este repositório contém o ambiente completo e independente do estúdio de motion design:
- **Portabilidade Total**: Para reproduzir o ambiente em um novo dispositivo, basta clonar o repositório e executar `npm ci`.
- **Projetos Privados Protegidos**: Projetos criados com `--private` residem em `projects/_private/` e nunca são versionados no Git.
- **Isolamento de Mídias Pesadas**: Pastas de vídeos brutos (`raw/`), mídias geradas por IA (`generated/`) e saídas de render (`out/` e `exports/`) não viajam pelo Git.
- **Configurações Locais**: Crie seu arquivo local `.env` a partir do modelo seguro [.env.example](file:///.env.example).

Consulte o guia completo em [docs/git-and-portability.md](docs/git-and-portability.md) para detalhes de replicação e arquitetura.

---

## 📚 Documentação do Estúdio

- [docs/architecture.md](docs/architecture.md): Princípios de arquitetura e camadas do estúdio.
- [docs/motion-skill-library.md](docs/motion-skill-library.md): Taxonomia e direção das skills de motion.
- [docs/git-and-portability.md](docs/git-and-portability.md): Política de Git, privacidade e portabilidade entre máquinas.
- [docs/getting-started.md](docs/getting-started.md): Guia de início rápido e preview.
- [docs/creating-projects.md](docs/creating-projects.md): Criação e contratos de projetos.
- [docs/render-presets.md](docs/render-presets.md): Presets de renderização (social, master, alpha).
- [AGENTS.md](file:///AGENTS.md): Manual de governança obrigatório para agentes de IA.
