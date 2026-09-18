---
name: studio-cinematic-titles
description: "Títulos cinematográficos, teasers e aberturas com construção dramática. Use when: tipografia, câmera, atmosfera, escala e revelação sustentam tensão ou narrativa. NOT for: lower thirds utilitários, captions comuns ou peças editoriais discretas."
---

# Studio Cinematic Titles

## Sensação
Escala, tensão, atmosfera, intenção dramática. Movimento deve parecer motivado pela narrativa, não por preset de trailer.

## Direção
- Trabalhe com antecipação e revelação parcial.
- Use silêncio, espaço negativo e holds longos como ferramentas.
- Tipografia deve ter presença espacial e hierarquia forte.
- Câmera, depth, luz e textura devem apontar para o mesmo foco.

## Remotion
Use layers + `interpolate()` para câmera e reveal; SVG/masks para tipografia; `@remotion/three` apenas quando profundidade real trouxer ganho. Atmosfera pode usar particles sutis, grain e blur seletivo. Trate áudio com `studio-audio-sync`.

## Recipes
- slow title emerge: blur→focus + tracking settle + subtle push-in;
- teaser reveal: fragments/masks + hold + title complete;
- scale contrast: detalhe extremo→plano aberto ou inverso;
- title card com light sweep discreto e grain.

## Parâmetros
`revealDuration`, `trackingTravel`, `cameraDrift`, `depth`, `atmosphereDensity`, `holdFrames`, `contrast`.

## Anti-patterns
lens flare aleatório; partículas demais; fonte genérica de trailer; zoom constante; excesso de glow; cortes rápidos sem construção.

## Done
O título possui construção dramática, espaço para leitura e uma relação clara entre tipografia, câmera, atmosfera e áudio.
