---
name: studio-smooth-premium
description: "Motion suave, refinado e premium com desaceleração longa e micro-overlap. Use when: confiança, luxo, precisão, calma ou sofisticação pedem movimento contido. NOT for: cartoon, impacto exagerado, promo agressivo ou bounce como linguagem."
---

# Studio Smooth Premium

## Sensação
Confiança, luxo, precisão, calma, sofisticação. Movimento parece inevitável e controlado.

## Timing
- Ataque curto ou médio; desaceleração longa.
- Overshoot mínimo ou zero.
- Stagger pequeno e não mecânico.
- Holds generosos para leitura.

## Construção
Camadas: fundo/depth → herói → suporte → microdetalhes. O herói deve mover menos propriedades simultaneamente do que em estilos expressivos.

## Remotion
Prefira `interpolate()` + `Easing` desenhado para movimentos de câmera e layout; use `spring()` com alto damping quando houver resposta física. Blur pode acompanhar velocidade, mas deve desaparecer completamente no settle.

## Parâmetros
`travel`, `easeOutLength`, `microOverlap`, `depthShift`, `blurPeak`, `scaleDrift`, `holdFrames`.

## Recipes
### Premium reveal
mask/clip + translate pequeno + opacity secundária + settle longo.
### Floating card
parallax muito sutil, scale 0.98→1, sombra/blur controlados.
### Camera drift
movimento contínuo quase imperceptível, sem mudar direção abruptamente.

## Quando NÃO usar spring
Movimentos de câmera/editoriais, wipes geométricos e keyframing com spacing específico costumam funcionar melhor com `interpolate()` + easing explícito.

## Anti-patterns
bounce; grandes escalas 0→1; glow forte; velocidade uniforme; muitos elementos flutuando; blur permanente.

## Done
Movimento é suave sem parecer lento, há precisão no settle e nenhuma propriedade chama atenção para a técnica em vez do conteúdo.
