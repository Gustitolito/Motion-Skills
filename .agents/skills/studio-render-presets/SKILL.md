---
name: studio-render-presets
description: "Presets de exportação, render headless e smoke test do estúdio. Use when: renderizar, exportar, validar codec/preset ou executar testes de saída. NOT for: direção de motion, composição visual ou escolha estética."
---

# Studio Render Presets

Guia de exportação e renderização de projetos no Motion Design Studio.

## 1. Presets de Renderização Disponíveis (`src/core/render/render-presets.ts`)

| Preset | Formato | Codec | Pixel Format | Áudio | Caso de Uso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`preview`** | `.mp4` | H.264 (CRF 26) | `yuv420p` | AAC 128k | Validação rápida e envio interno |
| **`socialH264`** | `.mp4` | H.264 (CRF 18) | `yuv420p` | AAC 320k | Reels, TikTok, YouTube Shorts, Feed |
| **`masterProRes`**| `.mov` | ProRes HQ | `yuv422p10le` | PCM 16-bit| Master arquivamento e edição em NLE |
| **`transparentWebm`** | `.webm`| VP9 | `yuva420p` (Alpha) | - | Overlays web, vinhetas transparentes |
| **`transparentProRes`**| `.mov` | ProRes 4444 | `yuva444p10le` (Alpha)| PCM 16-bit | Overlays broadcast em alta fidelidade |
| **`stillFrame`** | `.png` | - | PNG nativo | - | Thumbnails e capas de vídeo |

## 2. Como Renderizar via CLI

```bash
# Render rápido de preview
npm run render -- --composition=demo-showcase-reel --preset=preview

# Render final de alta qualidade para redes sociais
npm run render -- --composition=demo-showcase-reel --preset=socialH264

# Render de trecho específico (ex: frames 0 a 60)
npm run render -- --composition=demo-showcase-reel --frames=0-60

# Render de capa / thumbnail estática no frame 25
npm run render -- --composition=demo-showcase-reel --still=25
```

## 3. Rotina de Smoke Test
Sempre que finalizar alterações, execute:
```bash
npm run test:smoke
```
O script executa os 3 níveis de validação:
1. `npm run check` (Lint com `@remotion/eslint-plugin` + Typecheck).
2. Render visual de 1 frame still.
3. Render headless de vídeo curto (30 frames em MP4).
