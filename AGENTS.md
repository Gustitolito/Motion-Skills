# AGENTS.md — Motion Design Studio Operating Manual

> **Atenção para Agentes de IA (Codex, Claude, Cursor, Antigravity, etc.)**:  
> Este repositório é um **Single-Package Multi-Project Remotion Workspace**.  
> Leia atentamente as regras abaixo antes de criar ou modificar qualquer arquivo.

---

## 1. Hierarquia de Conhecimento e Precedência

1. **Skills Oficiais do Remotion (`skills/remotion-*`)**:
   - São a autoridade máxima em relação às APIs do Remotion (`useCurrentFrame`, `interpolate`, `spring`, `Sequence`, `Series`, `delayRender`, `staticFile`, etc.).
   - Consulte `skills/remotion-best-practices`, `skills/remotion-markup` e `skills/remotion-render`.
2. **AGENTS.md & Skills do Estúdio (`skills/studio-*`)**:
   - Têm **precedência estrita** sobre qualquer decisão de organização interna do repositório, estrutura de pastas, convenções de contratos, presets de renderização e scripts CLI.

---

## 2. Estrutura do Repositório

```
Motion Design/
├── package.json                         # Dependências compartilhadas da raiz (Remotion 4.0.525, React 19)
├── remotion.config.ts                   # Tailwind v4 bundler override
├── src/
│   ├── index.ts                         # Entry point Remotion (registerRoot)
│   ├── core/                            # Engine do estúdio (registry, presets, Studio Root)
│   └── shared/                          # Primitivas compartilhadas (springs, tipografia, fontes, fundos)
├── projects/
│   ├── _template/                       # Molde para novos projetos (não alterar sem motivo)
│   ├── _archive/                        # Projetos legados/arquivados (ignorados pelo tsc)
│   └── <slug>/                          # Cada vídeo/projeto vive aqui em sua própria pasta
├── public/
│   ├── shared/                          # Assets globais (fontes, áudio comum)
│   └── projects/<slug>/                 # Assets específicos do projeto
└── out/                                 # Renders gerados (previews/, renders/, stills/)
```

---

## 3. Como Iniciar um Novo Projeto

**REGRA DE OURO**: Nunca crie pastas de projeto manualmente sem registrar, e nunca tente instalar dependências dentro de `projects/`.

### Fluxo Automatizado (Obrigatório):
Execute o script de scaffolding no terminal:
```bash
# Projeto público/versionável
npm run new-project meu-novo-video

# Projeto confidencial/privado (ignorado pelo Git)
npm run new-project cliente-secreto --private
```
O script executa automaticamente:
1. Valida o slug (apenas letras minúsculas, números e hífens).
2. Clona `projects/_template/` para `projects/meu-novo-video/` (ou `projects/_private/...`).
3. Renomeia identificadores e instancia `project.config.ts`.
4. Cria a estrutura padrão de assets (`assets/`, `raw/`, `generated/`, `exports/`).
5. Regenera os registros de projetos (`projects-registry.generated.ts` e `projects-registry.local.generated.ts`).
6. Roda `npm run typecheck` para garantir integridade imediata.

---

## 4. Contrato de Projeto (`project.config.ts`)

Todo projeto possui um manifesto tipado:
```typescript
import type { ProjectConfig } from '../../src/core/registry/project-contract';

export const projectConfig: ProjectConfig = {
  id: 'meu-video',                     // Slug kebab-case
  name: 'Meu Vídeo',                   // Nome de exibição
  description: 'Objetivo do vídeo',
  status: 'active',                    // 'active' | 'draft' | 'archived'
  enabled: true,                       // false desativa do Remotion Studio
  tags: ['reels', 'promo'],
  aspectRatios: ['9:16'],
  defaultFps: 30,
  assetsPath: 'projects/meu-video',
  createdAt: '2026-09-16',
};
```

### Carregamento Lazy Obrigatório (`lazyComponent`):
Em `projects/<slug>/index.tsx`, toda composição deve ser lazy:
```typescript
{
  id: 'meu-video-reel',
  title: 'Reel Vertical (9:16)',
  component: () => import('./compositions/MainReel'),
  durationInFrames: 150,
  fps: 30,
  width: 1080,
  height: 1920,
}
```
> O arquivo importado (`MainReel.tsx`) deve possuir `export default`.

---

## 5. Regras Absolutas de Determinismo no Remotion

O Remotion renderiza frames em paralelo em múltiplos workers headless. Desvios não-determinísticos causam glitches, frames piscando ou falhas de renderização:

1. **PROIBIDO `Math.random()`**:
   - Use exclusivamente `random(seed)` importado de `remotion`.
2. **PROIBIDO relógio do sistema**:
   - Nunca use `Date.now()`, `performance.now()` ou timers de parede para calcular posições ou cores.
3. **PROIBIDO `setTimeout` / `setInterval`**:
   - Toda animação deve ser função matemática de `frame = useCurrentFrame()` e `fps = useVideoConfig().fps`.
4. **PROIBIDO animações e transições puras de CSS**:
   - Nunca use classes como `transition-all`, `transition-opacity` ou `@keyframes` CSS não sincronizados. O ESLint bloqueará (`@remotion/non-pure-animation`).
5. **Física Spring**:
   - Use `motionSpring` de `@/shared/motion/springs` ou `spring()` de `remotion`.
6. **Interpolação**:
   - Sempre utilize `interpolate(frame, [inMin, inMax], [outMin, outMax], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })`.

---

## 6. Recursos Assíncronos & Metadados Dinâmicos

- **Fontes e Imagens Pesadas**:
  - Se carregar recursos externos ou fontes personalizadas, controle a sincronização com `delayRender()` e `continueRender()`. O timeout padrão é de 30 segundos.
  - Para fontes, prefira `@/shared/fonts` (que gerencia o `waitUntilDone()` nativamente).
- **Duração Calculada a partir de Áudio**:
  - Se a duração da composição depender do áudio, utilize `calculateMetadata`:
    ```typescript
    calculateMetadata: async ({ defaultProps }) => {
      const duration = await getAudioDurationInSeconds(staticFile('audio.mp3'));
      return {
        durationInFrames: Math.ceil(duration * 30),
      };
    }
    ```

---

## 7. Props e Zod

No Remotion 4.0.525, o Studio infere controles visuais automaticamente a partir de `defaultProps`.
- Use `defaultProps` para controles simples (textos, cores, flags booleanas).
- Use `schema: z.object({...})` apenas quando precisar de validação estrita, limites numéricos (`.min()`, `.max()`) ou seleção específica.

---

## 8. Exportação & Presets

Nunca renderize com parâmetros arbitrários na linha de comando. Utilize os presets centralizados:
```bash
# Preview rápido para validação
npm run render -- --composition=demo-showcase-reel --preset=preview

# Produção para Redes Sociais
npm run render -- --composition=demo-showcase-reel --preset=socialH264

# Master ProRes
npm run render -- --composition=demo-showcase-reel --preset=masterProRes

# WebM com canal Alfa transparente
npm run render -- --composition=demo-showcase-reel --preset=transparentWebm

# Still / Thumbnail
npm run render -- --composition=demo-showcase-reel --still=20
```

---

## 9. Critério de Aceite (Definition of Done)

Um agente de IA **NÃO** encerra sua tarefa dizendo que "o código foi modificado".
Antes de finalizar, o agente deve obrigatoriamente executar:

```bash
# Validação de Tipos e Regras do ESLint Remotion
npm run check

# Validação Completa com Render Real (Still + MP4)
npm run test:smoke
```

Se o `npm run check` ou `npm run test:smoke` retornar qualquer erro, o trabalho está incompleto e deve ser corrigido imediatamente.

---

## 10. Git, Privacy and Repository Safety

O repositório é a fonte de verdade da infraestrutura do estúdio. Todo agente de IA deve respeitar estritamente a política de isolamento e privacidade:

1. **PROIBIDO Adicionar ao Git Conteúdo Privado/Local**:
   - `projects/_private/`
   - `projects/_local/`
   - `public/projects/_private/`
   - `public/projects/_local/`
   - Qualquer pasta `raw/` (mídias brutas de filmagem)
   - Qualquer pasta `generated/` (mídias geradas por IA localmente)
   - Qualquer pasta `exports/` (renders e saídas intermediárias)
2. **PROIBIDO Adicionar Segredos ou Credenciais**:
   - Arquivos `.env`, `.env.local` ou `.env.*` (exceto `.env.example`)
   - Chaves privadas, tokens, senhas ou certificados (`.pem`, `.key`, `id_rsa`)
3. **PROIBIDO Modificar o `.gitignore` para Expor Dados**:
   - Nunca altere o `.gitignore` para rastrear áreas protegidas sem solicitação explícita e consciente do usuário humano.
4. **Verificação Prévia de Operações Git**:
   - Antes de realizar operações Git com múltiplos arquivos, execute `npm run check:git` para validar o índice.
5. **PROIBIDO Ações Destrutivas Automáticas**:
   - Nunca execute `git push --force`.
   - Nunca destrua branches ou apague histórico de commits.
   - Nunca force a inclusão de arquivos previamente ignorados (`git add -f`).
6. **Integridade de Projetos Privados**:
   - Projetos criados com `npm run new-project <slug> --private` devem permanecer estritamente privados em `projects/_private/`, mesmo que seja conveniente ao agente incluí-los em um commit.
7. **Princípio da Dúvida**:
   - Se houver dúvida sobre a natureza pública ou privada de um arquivo ou asset, trate-o como **privado/local** e **NÃO** o adicione ao Git.

