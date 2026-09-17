---
name: studio-motion-recipes
description: Primitivas de física, presets de spring, tipografia cinética e componentes de motion design do estúdio
---

# Studio Motion Recipes

Este guia contém as receitas e utilitários recomendados para animações neste estúdio.

## 1. Presets de Física Spring (`@shared/motion/springs`)

Use o helper `motionSpring` para movimentação física com amortecimento natural e determinístico:

```typescript
import { motionSpring } from '@/shared/motion/springs';
import { useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// 1. Snappy (rápido, responsivo, ideal para UI)
const progress = motionSpring({ frame, fps, preset: 'snappy', delay: 10 });

// 2. Bouncy (elástico, ideal para badges e popups)
const scale = motionSpring({ frame, fps, preset: 'bouncy', delay: 15, from: 0, to: 1 });

// 3. Smooth (suave, transições de tela)
const fade = motionSpring({ frame, fps, preset: 'smooth', delay: 0 });

// 4. Cinematic (desaceleração longa e dramática)
const pan = motionSpring({ frame, fps, preset: 'cinematic', delay: 0, from: 100, to: 0 });
```

## 2. Tipografia Cinética (`@shared/typography/KineticText`)

Animar texto palavra por palavra sem boilerplate:

```tsx
import { KineticText } from '@/shared/typography/KineticText';

<KineticText
  text="Motion Design Moderno e Escalável"
  animationType="fade-up" // 'fade-up' | 'blur-in' | 'bounce-pop' | 'typewriter'
  delay={10}
  stagger={3} // 3 frames de intervalo por palavra
  className="text-white text-6xl font-black"
/>
```

## 3. Fundos Procedurais e SafeZones

```tsx
import { BackgroundGrid } from '@/shared/components/BackgroundGrid';
import { SafeZone } from '@/shared/layout/SafeZone';

<AbsoluteFill>
  <BackgroundGrid glowColor="rgba(37, 99, 235, 0.25)" />
  {/* Conteúdo do vídeo */}
  <SafeZone type="reels-9-16" show={process.env.NODE_ENV === 'development'} />
</AbsoluteFill>
```

## 4. Regras Estritas de Determinismo (ESLint Enforced)
- **NUNCA** use `Math.random()`. Use `random(seed)` importado de `remotion`.
- **NUNCA** use transições CSS (`transition-all`, `transition-opacity`). Animações puras de CSS dependem do relógio e causam flickering durante o render headless.
- Todo frame renderizado em paralelo deve produzir exatamente os mesmos pixels.
