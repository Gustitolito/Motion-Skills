---
name: studio-timing-spacing
description: "Direção temporal de timing, spacing, holds, stagger, overlap e eyetrace. Use when: ritmo, contraste de velocidade ou leitura temporal precisam ser desenhados com precisão. NOT for: tarefas sem animação relevante ou decisões puramente de marca/briefing."
---

# Studio Timing & Spacing

## Objetivo
Transformar tempo em linguagem visual. Use para impedir o “movimento genérico de template”.

## Doutrina
- Timing = quanto dura a ação; spacing = como a distância é distribuída entre frames.
- Não use curvas idênticas em elementos diferentes.
- Contraste é essencial: impulso rápido + leitura lenta costuma funcionar melhor que velocidade uniforme.
- Holds são parte da animação. Dê tempo para o cérebro ler.

## Padrões
### Premium
Aceleração curta, desaceleração longa, pouco/no overshoot, overlap sutil.
### Expressivo
Anticipation evidente, ataque rápido, overshoot e settle legíveis.
### Stop motion
Quantize o frame e mantenha poses por 2–4 frames.
### Fast promo
Micro-holds entre impactos; cortes no pico de energia, não depois que tudo assentou.

## Implementação Remotion
Crie progressos separados por propriedade. Use `interpolate()` + `Easing` quando quiser spacing desenhado; `spring()` quando houver resposta física. `Sequence` para stagger/overlap. Nunca use o mesmo `progress` para x, y, scale, rotate e opacity por conveniência.

## Recipe: stagger hierárquico
Herói no frame 0; suporte +2–4f; detalhe +4–8f; secondary motion +1–3f após o pai. Inverta a ordem na saída quando isso conduzir o olhar.

## QA
- Pause em 25%, 50%, 75%: a composição ainda é boa?
- Existe frame de leitura antes do próximo evento?
- Pico de velocidade coincide com ponto relevante?
- Eyetrace leva o olhar ao próximo herói?

## Anti-patterns
linearidade prolongada; stagger mecânico constante; todos os elementos começando no mesmo frame; excesso de slow motion; overshoot em todo evento.
