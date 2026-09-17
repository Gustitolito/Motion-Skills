---
name: studio-brand-logo-ui
description: Motion para logo, identidade de marca, UI e produto com comportamento consistente, reconhecível e reutilizável.
---

# Studio Brand, Logo & UI Motion

## Objetivo
Criar um sistema de movimento reconhecível, não uma coleção de reveals isolados.

## Direção
Defina 3–5 atributos de movimento da marca: ex. precise, warm, elastic, minimal, fast. Esses atributos controlam duração, overshoot, direção, stagger e transições.

## Logo
- Preserve silhueta e leitura.
- Reveals devem nascer da geometria, grid, stroke, máscara ou significado da marca.
- Evite partículas/glow sem relação com identidade.

## UI/Product
- Movimento explica causa e consequência.
- Elemento acionado deve liderar; resposta vem depois.
- Distâncias curtas pedem timings curtos e pouca elasticidade.

## Remotion
SVG/path animation, masks, transforms, `interpolate()` e springs são adequados. Para UI demos, sincronize cursor/estado visual por frames e mantenha determinismo.

## Recipes
logo path reveal; geometry assemble; card expand→detail; cursor→click→response; brand transition usando shape proprietária.

## Parâmetros
`brandEnergy`, `precision`, `elasticity`, `stagger`, `revealMode`, `interactionDelay`.

## Anti-patterns
logo girando/zoomando sem conceito; UI com bounce excessivo; transições diferentes em cada tela; motion que atrasa compreensão.

## Done
O comportamento é repetível em várias peças e parece pertencer à mesma marca.
