---
name: studio-motion-director
description: "Traduz um brief criativo resolvido em linguagem de movimento e roteia apenas as skills necessárias. Use when: uma peça relevante precisa de decisões de ritmo, hierarquia temporal, eyetrace, material ou linguagem de motion. NOT for: briefing criativo ainda ambíguo, mudanças puramente mecânicas ou QA final isolado."
---

# Studio Motion Director

## Papel

É o roteador de **craft de motion**. Decide como a mensagem se move, respira e conduz o olhar; não refaz o briefing e não deve carregar a biblioteca inteira por hábito.

Se objetivo, público, mensagem, formato ou restrições ainda estiverem materialmente ambíguos, volte para `studio-creative-director`.

## Loading policy: just in time

- Comece por esta skill e carregue somente o conhecimento que a decisão exige.
- Use `studio-motion-foundations` quando houver decisões de staging, peso, material, anticipation, follow-through ou continuidade.
- Use `studio-timing-spacing` quando ritmo, stagger, holds, overlap, contraste de velocidade ou eyetrace forem relevantes.
- Use `studio-audio-sync` somente quando áudio/SFX/transientes participarem da direção.
- Use skills de estilo/técnica apenas depois de escolher a linguagem dominante.
- Carregue `studio-qa-art-direction` na etapa de revisão, não como contexto obrigatório de toda implementação.
- Se a escolha entre famílias estiver incerta, leia `references/routing.md`.

Para uma peça original/substancial, foundations + timing normalmente são úteis; para uma alteração pequena, não force esse custo.

## Processo

1. Confirme a intenção emocional do brief em poucas palavras; não a reinvente.
2. Defina o **herói visual** de cada beat/cena.
3. Desenhe contraste temporal: impulso/hold, lento/rápido, silêncio/impacto.
4. Escolha no máximo 2 linguagens dominantes e poucas técnicas de apoio.
5. Planeje eyetrace: onde o olhar termina e onde a próxima ação começa.
6. Só então escolha springs, easings, blur, partículas, câmera ou transições.
7. Implemente em beats por frames; cada beat precisa de entrada, ação, settle/hold e saída.

## Regras

- Não anime tudo com a mesma curva e duração.
- Movimento forte exige contraste com repouso.
- Easing é consequência da intenção.
- Secondary motion deve reforçar massa, material ou continuidade.
- Efeito sem função de leitura, emoção, material ou transição é candidato a remoção.
- Não reabra decisões de briefing já resolvidas salvo conflito real descoberto na execução.

## Contrato de saída

Antes de implementar, o plano deve tornar claros:

- herói por beat;
- ritmo e pontos de repouso;
- direção dominante de movimento;
- comportamento de material/peso quando relevante;
- eyetrace entre cenas;
- skills adicionais realmente necessárias;
- técnica Remotion mais simples capaz de produzir o resultado.

## Remotion

Monte o beat sheet com `Sequence`/`Series`. Movimento deriva de `useCurrentFrame()` e `useVideoConfig()`; aleatoriedade visual usa `random(seed)`. Prefira transforms/interpolate/spring antes de subir para SVG avançado, Canvas, WebGL ou 3D.

## Definition of Done

- o brief de entrada está resolvido;
- a peça possui hierarquia temporal e contraste ação/repouso;
- o eyetrace é intencional;
- linguagem e técnicas escolhidas têm função perceptível;
- a implementação não carrega skills ou complexidade sem necessidade;
- o resultado segue para `studio-qa-art-direction` quando estiver pronto para revisão.
