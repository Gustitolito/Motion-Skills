---
name: studio-motion-director
description: Diretor de motion que traduz um briefing criativo já resolvido em linguagem de movimento, combina skills e define hierarquia temporal antes da implementação.
---

# Studio Motion Director

## Objetivo
Esta é a skill roteadora de craft. Use antes de animar qualquer peça relevante. Ela não cria efeitos; decide **como o movimento deve se comportar** e quais skills especializadas carregar.

Esta skill pressupõe que a intenção criativa já esteja suficientemente resolvida. Se ainda houver dúvida material sobre objetivo, público, mensagem, formato, restrições ou intenção do usuário, carregue primeiro `studio-creative-director`.

## Carregue quando
- O briefing pede uma peça nova, campanha, institucional, promo, reel, explainer, title sequence ou identidade animada.
- Há dúvida entre “smooth”, “expressivo”, “rápido”, “orgânico”, “editorial”, “premium” etc.
- O brief criativo já permite decidir comportamento, ritmo e hierarquia do movimento.

## Dependências
Entrada upstream quando necessária: `studio-creative-director`.

Sempre carregar junto: `studio-motion-foundations`, `studio-timing-spacing`, `studio-qa-art-direction`. Para áudio relevante, também `studio-audio-sync`.

## Processo obrigatório
1. Confirme a intenção emocional já resolvida no brief em 3 palavras.
2. Defina o **herói visual** de cada beat/cena.
3. Defina contraste temporal: lento/rápido, hold/impulso, silêncio/impacto.
4. Escolha no máximo 2 linguagens dominantes + 2 técnicas de apoio.
5. Planeje eyetrace: onde o olhar termina e onde a próxima ação começa.
6. Só então escolha springs, easings, blur, partículas ou transições.

## Matriz de roteamento
- Premium/institucional: `studio-smooth-premium` + `studio-institutional-editorial`.
- Promo agressivo: `studio-fast-promo` + `studio-expressive-impact` + `studio-audio-sync`.
- Collage/papel: `studio-stop-motion-collage` + `studio-paper-fabric-texture`.
- Cosmético/maciez: `studio-organic-liquid-soft` + `studio-post-finishing`.
- YouTube/explainer: `studio-youtube-social` + `studio-kinetic-typography` + `studio-data-viz-explainer`.
- Logo/brand/UI: `studio-brand-logo-ui` + `studio-smooth-premium` ou `studio-expressive-impact`.

## Regras de direção
- Não anime todos os elementos com a mesma curva e duração.
- Um movimento forte exige contraste com repouso.
- Easing é consequência da intenção, não a intenção em si.
- Use secondary motion apenas para reforçar massa, material ou continuidade.
- Evite “efeito por efeito”. Cada recurso deve melhorar leitura, emoção ou transição.
- Não reabra decisões de briefing que já foram resolvidas pelo usuário ou pelo `studio-creative-director`, salvo se surgir conflito real durante a execução.

## Implementação em Remotion
Monte um beat sheet por frames usando `Sequence`/`Series`. Cada beat deve declarar: entrada, ação principal, settle/hold e saída. Movimento deriva de `useCurrentFrame()` e `useVideoConfig()`. Para aleatoriedade visual, use `random(seed)`.

## Definition of Done
- O brief de entrada não contém ambiguidade material não resolvida.
- A peça tem hierarquia clara de movimento.
- Existem contrastes de velocidade e momentos de repouso.
- O eyetrace entre cenas é intencional.
- As skills carregadas são justificáveis pelo briefing.
- Nenhum efeito existe apenas para “parecer motion”.
