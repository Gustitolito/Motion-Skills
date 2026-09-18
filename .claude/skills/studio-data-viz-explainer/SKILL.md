---
name: studio-data-viz-explainer
description: "Motion para gráficos, infográficos e explainers orientado a causalidade e comparação. Use when: dados, relações, progressões ou estados precisam ser explicados visualmente. NOT for: gráficos puramente decorativos ou motion sem conteúdo informacional."
---

# Studio Data Viz & Explainer

## Objetivo
Usar movimento para explicar relações e mudanças, não para decorar gráficos.

## Princípios
- Revele dados na ordem da narrativa.
- Destaque comparação antes de detalhe.
- Anime mudanças de estado preservando posição sempre que possível.
- Labels importantes devem permanecer estáveis tempo suficiente para leitura.

## Remotion
Use SVG para linhas, barras, áreas e paths; `interpolate()` para progressão e `Sequence` para narrativa passo a passo. Para path drawing, anime `strokeDasharray/strokeDashoffset` ou helpers compatíveis. Para grandes volumes, considere Canvas.

## Recipes
- bar growth com labels atrasados 2–4f;
- line chart draw + focus point;
- before/after morph mantendo eixo e escala;
- number count-up apenas quando a progressão importa.

## Parâmetros
`revealFrames`, `stagger`, `focusSeries`, `labelDelay`, `axisHold`, `comparisonMode`.

## Anti-patterns
animar todos os dados simultaneamente; mudar escala durante comparação sem sinalizar; count-up em todo número; gráficos 3D decorativos.

## Done
O espectador entende a conclusão visual sem depender da narração para decodificar o gráfico.
