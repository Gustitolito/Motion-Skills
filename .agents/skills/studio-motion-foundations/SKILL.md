---
name: studio-motion-foundations
description: "Fundamentos de staging, hierarchy, anticipation, follow-through, overlap, mass, material e continuidade. Use when: uma animação relevante precisa de craft de movimento, peso ou causalidade. NOT for: alterações mecânicas triviais ou tarefas puramente de render/export."
---

# Studio Motion Foundations

## Princípio central
Bom motion não é “elemento A vai de 0 para 1”. É uma sequência legível de causa, ação e resposta.

## Fundamentos obrigatórios
- **Staging:** uma ideia principal por beat; reduza concorrência visual.
- **Anticipation:** prepare movimentos importantes com deslocamento, compressão, pausa ou mudança de escala.
- **Follow-through:** elementos secundários terminam depois do herói.
- **Overlap:** partes relacionadas não iniciam e param no mesmo frame.
- **Squash & stretch:** use para comunicar elasticidade, impacto ou matéria — nunca por padrão.
- **Arcs:** trajetórias naturais raramente são linhas retas perfeitas.
- **Mass:** objetos pesados aceleram e assentam diferente de badges leves.
- **Material:** papel, vidro, tecido, gel e interface devem “mover diferente”.
- **Continuity:** preserve direção, eixo e momentum entre planos quando isso melhora compreensão.

## Implementação em Remotion
Use `interpolate()` para trajetórias controladas, `spring()` para resposta física e `Sequence` para sobreposição temporal. Combine transformações independentes (posição, escala, rotação, opacidade) com tempos diferentes, evitando um único progress global.

## Receita: entrada dirigida
1. antecipação curta 2–4 frames;
2. ação principal 6–14 frames;
3. overshoot apenas se o material permitir;
4. settle 3–8 frames;
5. hold suficiente para leitura.

## Parâmetros úteis
`mass`, `energy`, `elasticity`, `settleFrames`, `anticipationFrames`, `overlapFrames`, `travel`, `rotationBias`.

## Anti-patterns
- mesma duração para tudo;
- bounce em elementos premium sem motivo;
- fade + scale em todos os objetos;
- elementos entrando de direções arbitrárias;
- animação contínua sem holds;
- excesso de secondary motion.

## Definition of Done
A animação comunica peso/material, possui hierarquia, mantém legibilidade e cada movimento tem causa perceptível.
