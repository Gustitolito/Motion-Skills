---
name: studio-expressive-impact
description: "Motion expressivo/cartoon com anticipation, squash/stretch, overshoot e recoil. Use when: impacto, humor, atitude ou energia exagerada são parte da linguagem. NOT for: institucional sóbrio, premium contido ou animação sem resposta física."
---

# Studio Expressive Impact

## Sensação
Energia, humor, atitude, impacto e personalidade. O movimento pode ser exagerado, mas precisa continuar legível.

## Timing
Anticipation curta e clara → ataque muito rápido → overshoot/recoil → settle. Use holds entre explosões de energia.

## Remotion
`spring()` é apropriado para pops, recoil, badges e objetos elásticos. Combine com `interpolate()` para anticipation e trajetórias desenhadas. Separe scaleX/scaleY para squash/stretch quando necessário.

## Recipes
- **Punch-in:** scale 0.8→1.08→1 com pequeno rotate/recoil.
- **Impact card:** anticipation oposta ao travel, entrada rápida, micro-shake determinístico e settle.
- **Elastic tag:** compressão no eixo do movimento + expansão perpendicular.

## Parâmetros
`energy`, `anticipation`, `overshoot`, `recoil`, `squash`, `stretch`, `shake`, `settleFrames`.

## Regras
- Exagero deve seguir direção e massa.
- Shake é resposta ao impacto, não decoração.
- Secondary motion deve atrasar 1–4 frames.

## Anti-patterns
bounce infinito; wobble em tudo; shake aleatório; rotação sem eixo; todos os elementos “popando” igual.

## Done
O impacto tem preparação, contato e resposta; a energia varia entre beats e o movimento transmite personalidade sem virar ruído.
