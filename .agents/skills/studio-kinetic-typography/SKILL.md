---
name: studio-kinetic-typography
description: "Direção de tipografia cinética com ritmo e hierarquia verbal. Use when: texto é protagonista em títulos, frases, manifesto, captions ou explainers. NOT for: texto passivo que só precisa permanecer legível ou motion sem ênfase tipográfica."
---

# Studio Kinetic Typography

## Carregue quando
Texto é protagonista: títulos, frases de impacto, captions, manifesto, promo, YouTube, institucional.

## Direção
- Anime a **semântica**, não apenas caracteres.
- Palavras-chave recebem maior contraste de escala, duração, peso ou timing.
- Evite revelar tudo letra a letra sem motivo.
- Quebra de linha, largura, tracking e alinhamento fazem parte do motion.

## Modos
- **Editorial:** máscaras, slides, wipes, tracking discreto.
- **Expressivo:** escala, rotação, compressão e palavras em conflito/impacto.
- **Premium:** pequenas translações, blur controlado, opacity secundária.
- **Captions:** leitura primeiro; motion curto e previsível.

## Remotion
Use medição real de texto quando necessário, `Sequence` para blocos/palavras e `interpolate()` para propriedades. Para revelar por máscara, prefira wrapper com `overflow:hidden`, clip-path/SVG mask ou transform. Não dependa de CSS transitions.

## Receita: frase de impacto
1. palavra de preparação entra suave;
2. hold curto;
3. palavra-chave entra 2–3x mais energética;
4. secondary accent 1–3f depois;
5. hold para leitura antes da saída.

## Parâmetros
`granularity: word|line|char`, `stagger`, `emphasisIndex`, `travel`, `blur`, `overshoot`, `trackingShift`, `holdFrames`.

## Anti-patterns
- typewriter para qualquer texto;
- bounce em cada palavra;
- stagger constante de todas as palavras;
- motion que compromete leitura;
- fonte ou tracking mudando sem justificativa.

## Done
Texto é legível no ritmo real, hierarquia verbal é evidente e a animação reforça o significado da frase.
