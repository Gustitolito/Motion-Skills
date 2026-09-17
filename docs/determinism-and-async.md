# Determinismo e Controle Assíncrono

O motor do Remotion divide a renderização de um vídeo em múltiplos processos paralelos (workers headless do Chrome). Cada worker é responsável por renderizar um bloco de frames (ex: worker 1 renderiza frames 0-29; worker 2 renderiza 30-59).

Por essa razão, qualquer desvio não-determinístico gera discrepâncias visuais, quebra de transições ou texto piscando (*flickering*).

---

## 1. Regras de Determinismo

### ❌ Math.random() é Proibido
Se um elemento usar `Math.random()`, o worker 1 gerará um valor diferente do worker 2 para a mesma posição.
- **Correto**: Use `random(seed)` importado de `remotion`. O mesmo seed sempre produzirá o mesmo número em qualquer worker.

```tsx
import { random } from 'remotion';

// Produz um valor consistente entre 0 e 1 para a bolha no índice 5
const size = random('bubble-size-5') * 20 + 10;
```

### ❌ Relógio do Sistema é Proibido
Nunca use `Date.now()`, `new Date()`, `performance.now()` para calcular frames ou posições.
- **Correto**: Sempre derive o estado a partir do frame atual:
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
```

### ❌ Animações e Transições CSS são Proibidas
Classes CSS como `transition-all duration-300` ou `@keyframes` CSS utilizam o relógio interno do navegador (wall-clock time) e não pausam entre os frames que o Remotion captura.
- **Correto**: Toda transição visual deve ser controlada via `spring()`, `motionSpring()` ou `interpolate()`.

---

## 2. Controle de Recursos Assíncronos

### `delayRender()` e `continueRender()`
Se um componente precisar carregar dados externos, fontes locais ou imagens de rede, deve pausar o frame até que o recurso esteja pronto:

```tsx
import { useEffect, useState } from 'react';
import { delayRender, continueRender } from 'remotion';

export const AsyncDataComponent = () => {
  const [handle] = useState(() => delayRender('Carregando dados'));
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
      continueRender(handle);
    });
  }, [handle]);

  if (!data) return null;
  return <div>{data.title}</div>;
};
```
> O timeout padrão do `delayRender` é de 30 segundos.

---

## 3. Metadados Dinâmicos (`calculateMetadata`)

Quando as dimensões, duração em frames ou fps de uma composição dependem de um asset (ex: duração de um áudio ou dimensões de uma imagem):

```tsx
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { staticFile } from 'remotion';

<Composition
  id="podcast-audio"
  component={PodcastPlayer}
  fps={30}
  width={1080}
  height={1920}
  calculateMetadata={async () => {
    const duration = await getAudioDurationInSeconds(staticFile('podcast.mp3'));
    return {
      durationInFrames: Math.ceil(duration * 30),
    };
  }}
/>
```
