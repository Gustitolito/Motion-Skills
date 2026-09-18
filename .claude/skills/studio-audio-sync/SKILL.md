---
name: studio-audio-sync
description: "Sincronização audiovisual, SFX, transientes e desenho rítmico. Use when: áudio, música, whooshes, hits ou cues precisam participar da direção e do timing visual. NOT for: peças sem áudio relevante ou simples configuração de exportação sonora."
---

# Studio Audio Sync

## Objetivo
Tratar áudio como parte da direção de movimento, não como camada adicionada no final.

## Princípios
- Sincronize eventos importantes a transientes perceptíveis, não a cada batida.
- Use silêncio/queda de energia para aumentar impacto.
- Whoosh deve antecipar ou acompanhar deslocamento; hit deve coincidir com contato/settle.
- Evite SFX em todos os micro-movimentos.

## Implementação Remotion
Use áudio determinístico e frame-based. Organize eventos como uma cue sheet em frames/segundos. `Sequence` deve alinhar SFX a beats visuais. Quando necessário, derive waveform/energia de áudio com utilitários oficiais do ecossistema Remotion.

## Cue sheet mínima
`{frame, type, intensity, source, visualEvent}`.

## Receita de impacto
- riser/whoosh começa antes;
- visual acelera junto;
- hit no frame de contato;
- tail/reverb ocupa o settle;
- próximo beat espera a cauda quando ela for narrativa.

## Anti-patterns
SFX genérico repetido; hit atrasado; música usada como metrônomo rígido; volume excessivo; whoosh sem movimento correspondente.

## Done
A peça continua funcionando sem áudio, mas ganha intenção, energia e legibilidade com ele.
