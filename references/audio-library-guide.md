# Guia de Áudio e Sonoplastia

Boas práticas de áudio para composições no Remotion.

---

## 1. Organização de Arquivos

- **Trilhas e SFX Globais**: `public/shared/audio/`
  - Ex: `public/shared/audio/sfx/whoosh.mp3`
  - Ex: `public/shared/audio/sfx/pop.mp3`
  - Ex: `public/shared/audio/music/ambient-loop.mp3`
- **Áudios Específicos de Projeto**: `public/projects/<slug>/`
  - Ex: `public/projects/meu-video/voiceover.mp3`

---

## 2. Níveis de Volume Recomendados (Mixagem)

- **Voz / Narração Principal**: Volume `1.0` (0 dB)
- **Efeitos Sonoros (SFX)**: Volume `0.4` a `0.7` (-6 dB a -3 dB)
- **Música de Fundo (Background BGM com voz)**: Volume `0.10` a `0.18` (-18 dB a -15 dB)
- **Música de Fundo (Sem voz)**: Volume `0.5` a `0.8`

---

## 3. Fade In e Fade Out Determinísticos

Use o helper `calculateAudioFadeVolume`:

```tsx
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { calculateAudioFadeVolume } from '@/shared/audio/audio-utils';

export const BackgroundMusic = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const volume = calculateAudioFadeVolume({
    frame,
    totalDurationInFrames: durationInFrames,
    fadeInFrames: 15,
    fadeOutFrames: 30,
    maxVolume: 0.15,
  });

  return (
    <Audio
      src={staticFile('shared/audio/ambient-beat.mp3')}
      volume={() => volume}
    />
  );
};
```
