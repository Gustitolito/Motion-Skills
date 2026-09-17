# Motion Skill Library — Direction Blueprint

Este documento organiza as skills de craft/direção de motion que complementam as skills oficiais do Remotion. O objetivo é ensinar agentes a tomar decisões estéticas coerentes e traduzi-las para implementações determinísticas em React/TypeScript.

## Discovery e portabilidade

- `.agents/skills/` é a fonte canônica das skills deste repositório.
- O agente deve descobrir skills pelo frontmatter (`name` + `description`) e carregar o corpo apenas quando relevante.
- `.claude/skills/` é um espelho gerado para Claude Code e nunca deve ser editado diretamente.
- `npm run sync:agent-skills` atualiza o espelho; `npm run check:skills` valida identidade entre as duas árvores.
- `agents/openai.yaml`, quando presente, é metadata específica da experiência OpenAI/Codex; a lógica essencial da skill continua em `SKILL.md` e recursos adjacentes.

## Core obrigatório
Carregue para qualquer peça relevante:
- `studio-motion-director`
- `studio-motion-foundations`
- `studio-timing-spacing`
- `studio-qa-art-direction`

Carregue quando aplicável:
- `studio-kinetic-typography`
- `studio-audio-sync`

## Linguagens / estilos
- `studio-smooth-premium`
- `studio-expressive-impact`
- `studio-stop-motion-collage`
- `studio-organic-liquid-soft`
- `studio-fast-promo`
- `studio-institutional-editorial`
- `studio-cinematic-titles`

## Técnicas e acabamento
- `studio-particles-bursts`
- `studio-paper-fabric-texture`
- `studio-depth-camera-2p5d`
- `studio-post-finishing`

## Formatos / sistemas
- `studio-youtube-social`
- `studio-brand-logo-ui`
- `studio-data-viz-explainer`

## Combinações recomendadas
### Promo energético
`studio-fast-promo` + `studio-expressive-impact` + `studio-kinetic-typography` + `studio-audio-sync` + `studio-particles-bursts`.

### Institucional premium
`studio-smooth-premium` + `studio-institutional-editorial` + `studio-data-viz-explainer` + `studio-post-finishing`.

### Collage artesanal
`studio-stop-motion-collage` + `studio-paper-fabric-texture` + `studio-post-finishing`.

### Cosmético / wellness
`studio-organic-liquid-soft` + `studio-smooth-premium` + `studio-post-finishing` + `studio-audio-sync`.

### YouTube explainer
`studio-youtube-social` + `studio-kinetic-typography` + `studio-data-viz-explainer` + `studio-audio-sync`.

### Brand / logo
`studio-brand-logo-ui` + `studio-smooth-premium` ou `studio-expressive-impact` + `studio-audio-sync`.

### Teaser cinematográfico
`studio-cinematic-titles` + `studio-depth-camera-2p5d` + `studio-post-finishing` + `studio-audio-sync`.

## Hierarquia técnica para Remotion
Escolha a solução mais simples que atinja a estética:
1. HTML/CSS transforms + `interpolate()` / `spring()`.
2. SVG, masks, paths e clipPath.
3. `@remotion/effects` / motion blur / utilities oficiais.
4. Canvas ou Skia para alto volume/procedural 2D.
5. WebGL/shaders para distorções e superfícies que realmente precisem.
6. `@remotion/three` para profundidade/3D real.
7. Asset pré-renderizado externo quando a técnica exige simulação física complexa.

## Classificação de viabilidade
- **A — Remotion nativo/ideal:** timing, typography, shapes, SVG, UI, 2.5D, particles simples, data viz, promo, institutional, stop-motion estilizado.
- **B — Remotion + técnica adicional:** metaballs, cloth estilizado, grande volume de partículas, shaders, 3D, deformações complexas.
- **C — produzir externamente:** fluidos fotorealistas, pyro realista, cloth complexo com colisões, destruição/simulações físicas pesadas.

## Estratégia anti-template
Antes de implementar, o agente deve responder internamente:
1. Qual é o herói de cada beat?
2. Onde está o pico de energia?
3. Onde está o hold de leitura?
4. Qual material/peso está sendo comunicado?
5. Onde o olhar deve terminar para preparar a próxima cena?
6. Qual efeito pode ser removido sem perda narrativa? Se a resposta for “quase todos”, o motion está decorativo demais.

## Definition of Done transversal
- movimento frame-based e determinístico;
- hierarquia temporal perceptível;
- contraste entre ação e repouso;
- efeitos justificáveis por leitura, material, emoção ou continuidade;
- render smoke test aprovado;
- QA final com `studio-qa-art-direction`.
