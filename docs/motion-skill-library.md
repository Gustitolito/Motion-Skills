# Motion Skill Library — Direction Blueprint

Este documento descreve a arquitetura das skills de direção/craft que complementam as skills oficiais do Remotion. O objetivo é dar aos agentes **bom julgamento de motion com baixo custo de contexto**, sem transformar o repositório em um prompt monolítico.

## Discovery e portabilidade

- `.agents/skills/` é a fonte canônica.
- O agente descobre skills pelo frontmatter (`name` + `description`).
- Em `studio-*`, `description` é um contrato de roteamento explícito com `Use when:` e `NOT for:`.
- `.claude/skills/` é um espelho gerado; nunca edite manualmente.
- `npm run sync:agent-skills` atualiza o espelho.
- `npm run check:skills` valida frontmatter, correspondência nome↔diretório e paridade exata entre as árvores.
- `agents/openai.yaml`, quando presente, é metadata específica de host; regras essenciais continuam em `SKILL.md`/resources adjacentes.

## Princípio arquitetural

**AGENTS.md guarda invariantes; SKILL.md guarda decisão procedural; references guardam detalhe sob demanda.**

Não duplique um catálogo de roteamento em `AGENTS.md`. Não carregue todas as skills porque “podem ajudar”. Use progressive disclosure:

1. descubra pela descrição;
2. carregue a skill necessária;
3. abra `references/` somente quando a decisão exigir detalhe adicional.

## Pipeline

```text
pedido do usuário
   │
   ├─ brief materialmente ambíguo? ── sim ─→ studio-creative-director
   │                                      │
   └──────────────────────────────────────┘
                                          ↓
                                studio-motion-director
                                          ↓
                         skills de linguagem/formato/técnica
                                          ↓
                                implementação Remotion
                                          ↓
                                studio-qa-art-direction
```

`studio-creative-director` não é ritual obrigatório: pule quando o brief já estiver resolvido. `studio-qa-art-direction` é uma camada de revisão e não precisa ocupar contexto durante toda a implementação.

## Core sob demanda

- `studio-motion-director`: roteador de craft para peças relevantes.
- `studio-motion-foundations`: staging, hierarchy, mass, material, anticipation, overlap e continuidade quando esses problemas existem.
- `studio-timing-spacing`: ritmo, holds, stagger, overlap, settle e eyetrace quando a sequência não é trivial.
- `studio-qa-art-direction`: revisão final.
- `studio-audio-sync`: somente quando áudio participa da direção.

Não existe mais um “carregue todos sempre”.

## Linguagens

- `studio-smooth-premium`
- `studio-expressive-impact`
- `studio-stop-motion-collage`
- `studio-organic-liquid-soft`
- `studio-fast-promo`
- `studio-institutional-editorial`
- `studio-cinematic-titles`

## Formatos e sistemas

- `studio-youtube-social`
- `studio-brand-logo-ui`
- `studio-data-viz-explainer`
- `studio-kinetic-typography`

## Técnicas e acabamento

- `studio-particles-bursts`
- `studio-paper-fabric-texture`
- `studio-depth-camera-2p5d`
- `studio-post-finishing`
- `studio-motion-recipes`
- `studio-render-presets`
- `studio-conventions`

O roteamento detalhado de craft vive em `.agents/skills/studio-motion-director/references/routing.md`, para não inflar o contexto básico.

## Hierarquia técnica para Remotion

Escolha a solução mais simples que atinja a estética:

1. HTML/CSS transforms + `interpolate()` / `spring()`;
2. SVG, masks, paths e clipPath;
3. utilities/effects oficiais;
4. Canvas/Skia para procedural 2D ou grande volume;
5. WebGL/shaders quando a superfície/distorção realmente exigir;
6. `@remotion/three` para 3D real;
7. asset externo pré-renderizado quando a simulação física não é um bom problema para Remotion.

## Estratégia anti-template

Antes de implementar, o agente deve conseguir responder:

1. Qual é a intenção e a resposta desejada?
2. Qual é o herói de cada beat?
3. Onde estão pico de energia e hold de leitura?
4. Que massa/material o movimento comunica?
5. Onde o olhar termina para preparar a próxima cena?
6. Que efeito pode ser removido sem perda narrativa?

## Definition of Done transversal

- intenção resolvida quando necessário;
- movimento frame-based e determinístico;
- hierarquia temporal perceptível;
- contraste entre ação e repouso;
- efeitos justificáveis por leitura, emoção, material ou continuidade;
- `npm run check` e smoke test aprovados;
- QA final com `studio-qa-art-direction`.
