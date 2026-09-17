---
name: studio-post-finishing
description: Pós-produção e acabamento: color, glow, grain, blur, vignette, lens-like effects, compositing e consistência final.
---

# Studio Post Finishing

## Objetivo
Finalizar a peça sem usar pós como correção para motion ruim.

## Ordem recomendada
1. composição e motion corretos;
2. contraste/cor;
3. depth/shadows;
4. blur/motion blur quando necessário;
5. glow/highlights;
6. grain/texture;
7. vignette/lens accents opcionais.

## Remotion
Use filtros CSS/SVG para ajustes leves; `@remotion/effects` quando aplicável; Canvas/Skia/shaders para efeitos mais complexos. Motion blur deve ser tratado como função da velocidade. Efeitos caros devem ser isolados e justificados.

## Recipes
- premium finish: contraste controlado + grain fino + glow restrito a highlights;
- analog: grain, flicker determinístico, chromatic offset sutil, gate weave quantizado;
- digital/glitch: deslocamentos curtos e raros, RGB split localizado, frame tears controlados;
- soft cosmetic: bloom leve + gradient + blur seletivo.

## Parâmetros
`grain`, `glow`, `blur`, `vignette`, `chromaticOffset`, `flicker`, `contrast`, `saturation`, `highlightBloom`.

## Anti-patterns
glow global; grain enorme; blur para esconder layout ruim; glitch contínuo; LUT/look desconectado da marca.

## Done
O acabamento é consistente entre cenas, não reduz legibilidade e continua visualmente forte quando efeitos opcionais são desligados.
