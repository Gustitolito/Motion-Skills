---
name: studio-depth-camera-2p5d
description: Profundidade, parallax, câmera 2.5D, perspectiva e movimentos de cena que preservam eyetrace e hierarquia.
---

# Studio Depth, Camera & 2.5D

## Objetivo
Criar sensação de espaço sem transformar toda peça em pseudo-3D.

## Princípios
- Separe foreground, subject e background por velocidades diferentes.
- Movimento de câmera deve revelar informação ou aumentar foco.
- Parallax forte demais denuncia o truque.
- Preserve eyetrace entre movimentos e cortes.

## Remotion
Para 2.5D simples, use transforms CSS, `perspective`, scale e translations em camadas. Para câmera/objetos 3D reais, use `@remotion/three` sob demanda. Não adote Three.js quando transforms 2D resolvem.

## Recipes
- push-in premium: foreground move 1.2x, subject 1x, background 0.5x;
- orbit fake: x + rotateY + parallax sutil;
- photo depth: recortes em layers com deslocamentos diferentes;
- rack-focus estilizado: blur muda entre planos junto com atenção narrativa.

## Parâmetros
`cameraTravel`, `depthScale`, `parallaxRatio`, `perspective`, `focusDepth`, `foregroundBias`, `overscan`.

## Anti-patterns
zoom constante; parallax em toda cena; perspectiva exagerada em texto; blur sem mudança de foco narrativa.

## Done
A profundidade ajuda a leitura e o movimento de câmera parece dirigido, não um preset Ken Burns contínuo.
