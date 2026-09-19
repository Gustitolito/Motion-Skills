---
name: studio-fast-promo
description: "Motion promocional rápido, rampas e transições orientadas a impacto. Use when: lançamento, urgência, performance ou edição de alta energia precisam de ataques curtos e micro-holds. NOT for: leitura longa, documental ou institucional sóbrio."
---

# Studio Fast Promo

## Sensação
Urgência, desejo, energia, lançamento e performance. A velocidade deve vir do contraste, não de movimento constante.

## Timing
- Ataques de 2–8 frames.
- Micro-holds de leitura entre eventos.
- Rampas comprimem passagens e expandem momentos importantes.
- Cortes podem ocorrer no pico de energia ou logo antes do settle.

## Remotion
Use `interpolate()` com input ranges não uniformes para rampas, `Sequence` para bursts e `TransitionSeries` quando a transição conecta planos. Motion blur deve acompanhar velocidade e desaparecer no repouso.

## Recipes
- pan direcional rápido com overscan + blur + novo plano herdando a direção;
- zoom acelerado com scale/crop e accent sonoro;
- product stack com stagger curto e saída encadeada;
- flash frame de 1–2f somente quando coerente com a estética.

## Parâmetros
`attackFrames`, `holdFrames`, `rampAggression`, `travel`, `blurPeak`, `cutLead`, `stagger`.

## Anti-patterns
cortar sem tempo de leitura; zoom em todo beat; transições diferentes a cada plano; blur constante; speed ramp sem relação com conteúdo.

## Done
A peça parece rápida porque o ritmo é bem dirigido, não porque tudo se move o tempo inteiro.

## Implementation references
When translating this language into code, load [the motion profile](references/motion-profile.md), then the linked executable recipe as needed.
