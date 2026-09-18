---
name: studio-particles-bursts
description: "Partículas, bursts, confetes e sparks com emissão determinística. Use when: impacto, celebração, atmosfera ou trilhas de movimento pedem partículas causadas por um evento. NOT for: preenchimento decorativo genérico ou efeitos contínuos sem origem narrativa."
---

# Studio Particles & Bursts

## Objetivo
Adicionar energia, celebração, impacto ou atmosfera sem transformar partículas em preenchimento genérico.

## Princípios
- Partículas devem nascer de uma causa: impacto, emissão, transição, ambiente.
- Direção, velocidade e dispersão devem refletir o evento emissor.
- Densidade alta exige vida curta; densidade baixa pode sustentar cauda maior.

## Remotion
Gere parâmetros por partícula com `random(seed + index)`. Nunca use `Math.random()`. Calcule posição diretamente a partir de frame local, velocidade, aceleração e lifetime. Para centenas de partículas simples, SVG/DOM pode bastar; para volume maior, considere Canvas/Skia/WebGL.

## Modelo conceitual
`position = origin + velocity*t + 0.5*acceleration*t²`; opacity e scale dependem do lifetime normalizado.

## Parâmetros
`count`, `spread`, `speed`, `gravity`, `drag`, `lifetime`, `sizeRange`, `rotationSpeed`, `burstRadius`, `seed`.

## Recipes
- radial burst curto;
- confetti directional;
- dust trail seguindo objeto;
- sparkle accent em 3–7 partículas, não chuva contínua.

## Anti-patterns
partículas no fundo sem propósito; todas com mesma trajetória; excesso de density; lifetime longo demais; random não determinístico.

## Done
A emissão tem origem e física visual coerentes, reforça o evento principal e continua legível em render final.
