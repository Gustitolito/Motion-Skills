---
name: studio-paper-fabric-texture
description: "Linguagem tátil de papel, recortes, tecido e ribbons. Use when: materialidade artesanal/editorial, dobras, rigidez ou follow-through flexível precisam aparecer no movimento. NOT for: peças sem função material ou simulação física de cloth realista."
---

# Studio Paper, Fabric & Texture

## Sensação
Tátil, artesanal, editorial, material. O comportamento deve denunciar o material antes mesmo da textura.

## Papel
- rigidez maior;
- rotações em pivôs e bordas;
- dobras simples por máscaras/gradients;
- sombras curtas e separação de camadas.

## Tecido/ribbons
- atraso entre segmentos;
- curvas e follow-through maiores;
- deformação contínua;
- direção guiada por tensão/arrasto.

## Remotion
**A:** transforms, máscaras, sombras e recortes simples.
**B:** SVG paths, Canvas/Skia ou malha segmentada para ribbons e deformações mais ricas.
**C:** cloth realista com colisão complexa deve ser simulado externamente e usado como asset.

## Recipes
- paper card flip por pivô lateral;
- torn-paper reveal com mask irregular;
- ribbon composto por segmentos com fase/overlap;
- cloth-like banner com curva base + secondary wave.

## Parâmetros
`stiffness`, `foldDepth`, `segmentCount`, `drag`, `waveAmplitude`, `textureStrength`, `shadowGap`, `edgeRoughness`.

## Anti-patterns
textura sem comportamento material; tecido se movendo como bloco rígido; papel com elasticidade de gel; shadow incoerente com profundidade.

## Done
Forma, timing, sombra e textura comunicam o mesmo material.
