---
name: studio-stop-motion-collage
description: Stop motion, stepped animation, cutout e collage com poses quantizadas, imperfeições determinísticas e sensação artesanal.
---

# Studio Stop Motion & Collage

## Sensação
Tátil, humano, recortado, editorial, artesanal. O charme vem da imperfeição controlada.

## Timing
- Trabalhe em 2s/3s: uma pose pode durar 2–4 frames.
- Mantenha micro-holds e saltos visíveis.
- Evite suavizar demais; stepping é parte da linguagem.

## Remotion
Quantize o frame: `const stepped = Math.floor(frame / hold) * hold`. Derive posição, rotação e escala desse frame quantizado. Use `random(seed + stepped)` para jitter determinístico. Para recortes, prefira PNG/SVG com bordas/offsets deliberadamente imperfeitos.

## Recipes
- cutout entrance com 3–5 poses;
- jitter de papel com rotação ±0.5–2°;
- shadow offset também quantizado;
- troca abrupta de textura/pose no beat.

## Parâmetros
`holdFrames`, `jitterPx`, `jitterDeg`, `poseCount`, `shadowOffset`, `tearIntensity`.

## Anti-patterns
interpolação smooth entre todas as poses; jitter em todo frame; ruído não determinístico; textura excessiva escondendo a composição.

## Done
O resultado parece deliberadamente artesanal, não apenas uma animação com FPS baixo.
