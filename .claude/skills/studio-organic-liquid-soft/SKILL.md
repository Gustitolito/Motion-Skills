---
name: studio-organic-liquid-soft
description: "Motion orgânico, líquido e macio com blobs, morphs e floating. Use when: fluidez, viscosidade estilizada, cosmético, wellness ou naturalidade são centrais. NOT for: fluidos fotorealistas, cloth complexo ou impacto rígido/cartoon."
---

# Studio Organic, Liquid & Soft

## Sensação
Maciez, fluidez, cosmético, wellness, dreamy, natural. Movimento deve parecer contínuo e respirável.

## Classes técnicas
- **A — nativo/ideal:** transforms, border-radius animado, SVG paths simples, masks, gradients.
- **B — viável com SVG/Canvas/Skia/WebGL:** blobs complexos, metaballs, displacement, shader noise.
- **C — externo:** fluidos fisicamente realistas, splash fotorealista e simulações complexas.

## Timing
Use ciclos longos, aceleração baixa e pequenas diferenças de fase. Pouco ou nenhum overshoot seco.

## Remotion
Para formas simples, combine SVG/path, clipPath/mask e `interpolate()`. Para organicidade procedural, use `random(seed)` e ondas senoidais determinísticas. Canvas/Skia/shaders só quando o SVG/CSS não sustentar a estética.

## Recipes
- blob breathing: scaleX/scaleY em fases diferentes;
- droplet reveal: máscara circular alongada + settle viscoso;
- soft float: y + rotation + scale com frequências distintas e amplitudes baixas;
- liquid logo reveal: máscara/orgânico → hold → limpeza visual.

## Parâmetros
`viscosity`, `amplitude`, `frequency`, `phase`, `softness`, `morphAmount`, `drift`, `surfaceTension`.

## Anti-patterns
ondas senoidais idênticas em tudo; morph aleatório; blur excessivo; “gel” que se move como badge elástico.

## Done
A organicidade tem ritmo próprio, mantém silhueta legível e não parece apenas um círculo com border-radius animado.
