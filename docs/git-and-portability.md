# Git, Portabilidade e Privacidade de Projetos

Este documento detalha a política de controle de versão, portabilidade entre dispositivos e isolamento de privacidade no **Motion Design Studio**.

---

## 1. Princípio Fundamental

O Git é a **fonte de verdade da infraestrutura e dos recursos reutilizáveis** do estúdio.

### O Que É Versionado no Git
- `src/`: Todo o código da engine, registro de projetos e componentes compartilhados.
- `scripts/`: Scripts TypeScript de automação (`new-project.ts`, `render.ts`, `smoke-test.ts`, `check-git-safety.ts`).
- `skills/`: Skills de inteligência artificial versionadas para guiar agentes.
- `docs/` e `references/`: Toda a documentação técnica, tokens e referências estéticas.
- `projects/_template/`: O molde padrão de novos projetos.
- `projects/<slug>/`: Projetos públicos/compartilháveis e seus assets leves essenciais em `public/projects/<slug>/assets/`.
- Configurações do projeto: `package.json`, `package-lock.json`, `tsconfig.json`, `remotion.config.ts`, `eslint.config.mjs`, `AGENTS.md`.
- `.env.example`: Modelo de configuração com placeholders.

### O Que NUNCA É Versionado no Git
- `node_modules/`: Dependências pesadas locais.
- `out/`: Todos os vídeos (`out/renders/`), previews (`out/previews/`) e imagens estáticas (`out/stills/`).
- `projects/_private/`: Projetos e vídeos confidenciais ou de clientes.
- `public/projects/_private/`: Assets de projetos privados.
- Pastas pesadas de mídia dentro de qualquer projeto:
  - `public/projects/*/raw/`: Vídeos brutos, takes de câmera, áudios brutos de alta taxa de bits.
  - `public/projects/*/generated/`: Mídias locais geradas por ferramentas ou IA.
  - `public/projects/*/exports/`: Exportações parciais ou locais.
- Arquivos de ambiente locais: `.env`, `.env.local`, `.env.*`.
- Chaves, tokens ou certificados (`.pem`, `.key`, `id_rsa`).
- Arquivos temporários e de IDE (`.vscode/`, `.idea/`, `.DS_Store`, `Thumbs.db`).

---

## 2. Estrutura Padrão de Assets por Projeto

Cada projeto possui a seguinte divisão em `public/projects/<slug>/`:

```
public/projects/<slug>/
├── assets/          # [Versionável] Vetores, logos, imagens pequenas e fontes essenciais
├── raw/             # [Gitignored] Material bruto de filmagem, áudios não editados
├── generated/       # [Gitignored] Imagens e mídias geradas por IA localmente
└── exports/         # [Gitignored] Renders intermediários ou exports específicos
```

O comando `npm run new-project` cria essa estrutura de pastas automaticamente.

---

## 3. Projetos Públicos vs. Projetos Privados

### Criar Projeto Versionável (Público)
```bash
npm run new-project meu-video
```
- Código criado em: `projects/meu-video/`
- Assets criados em: `public/projects/meu-video/`
- Registrado em: `src/core/registry/projects-registry.generated.ts`
- **Rastreado no Git normalmente**.

### Criar Projeto Privado (Confidencial / Cliente)
```bash
npm run new-project cliente-confidencial --private
```
- Código criado em: `projects/_private/cliente-confidencial/`
- Assets criados em: `public/projects/_private/cliente-confidencial/`
- Registrado em: `src/core/registry/projects-registry.local.generated.ts`
- **Totalmente protegido e ignorado pelo Git** via `.gitignore`.
- O clone em outro dispositivo continua compilando normalmente, pois o registry público não possui dependências estáticas dos projetos privados ausentes.

---

## 4. Como Reconstruir o Ambiente em Outro Dispositivo

Ao clonar o repositório em um novo computador (Windows, macOS ou Linux):

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd "Motion Design"

# 2. Instalar dependências exatamente como registradas no package-lock.json
npm ci

# 3. Configurar variáveis de ambiente caso necessário
cp .env.example .env

# 4. Executar verificação completa de tipos e integridade
npm run check

# 5. Abrir o Remotion Studio
npm run dev
```

> **Por que `npm ci`?**  
> O `npm ci` garante uma instalação 100% idêntica e reproduzível baseada no `package-lock.json`, acionando o hook `postinstall` que inicializa o registry local seguro.

---

## 5. Política de Git LFS (Large File Storage)

Por padrão de arquitetura, **o Git LFS não está ativado**. O repositório foi projetado para não depender de arquivos pesados no controle de versão:
- Material bruto reside localmente na pasta `raw/`.
- Renders finais residem na pasta `out/` ou em armazenamento externo/cloud (ex: AWS S3, Google Drive).

Se no futuro for estritamente necessário versionar arquivos binários grandes de forma intencional, o Git LFS poderá ser habilitado pontualmente via `git lfs track "*.extensao"`.

---

## 6. Verificação Automática de Segurança (`npm run check:git`)

O script `scripts/check-git-safety.ts` é executado automaticamente no `npm run check`. Ele audita o índice do Git e acusa erro se detectar:
1. Arquivos `.env` reais adicionados ao Git.
2. Qualquer arquivo dentro de `projects/_private/` ou `public/projects/_private/`.
3. Mídias em pastas `raw/`, `generated/` ou `exports/`.
4. Chaves privadas ou credenciais.
5. Arquivos com tamanho superior a 25 MB rastreados acidentalmente.
