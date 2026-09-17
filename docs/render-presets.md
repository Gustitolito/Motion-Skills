# Presets de Renderização

O estúdio padroniza as exportações de vídeo e imagem para evitar divergências de bitrate, codecs ou resolução entre diferentes projetos.

---

## Tabela de Presets

### 1. `preview`
- **Container**: `.mp4`
- **Codec de Vídeo**: H.264
- **CRF**: 26 (tamanho reduzido, render ágil)
- **Pixel Format**: `yuv420p`
- **Áudio**: AAC 128 kbps
- **Uso**: Aprovação interna, testes de animação e envio rápido pelo WhatsApp/Slack.

### 2. `socialH264`
- **Container**: `.mp4`
- **Codec de Vídeo**: H.264 (perfil High)
- **CRF**: 18 (altíssima fidelidade perceptual sem artefatos de compressão)
- **Pixel Format**: `yuv420p`
- **Áudio**: AAC 320 kbps
- **Uso**: Publicação oficial no Instagram Reels, TikTok, YouTube Shorts e Feed.

### 3. `masterProRes`
- **Container**: `.mov`
- **Codec de Vídeo**: Apple ProRes
- **Perfil**: ProRes 422 HQ
- **Pixel Format**: `yuv422p10le` (10-bit)
- **Áudio**: PCM 16-bit sem compressão
- **Uso**: Arquivamento master e pós-produção em softwares de edição (Premiere, DaVinci Resolve, Final Cut).

### 4. `transparentWebm`
- **Container**: `.webm`
- **Codec de Vídeo**: Google VP9
- **Image Format**: `png`
- **Pixel Format**: `yuva420p` (com canal Alpha habilitado)
- **Uso**: Vídeos com fundo transparente para reprodução na web, vinhetas interativas, OBS Studio e stickers.

### 5. `transparentProRes`
- **Container**: `.mov`
- **Codec de Vídeo**: Apple ProRes
- **Perfil**: ProRes 4444
- **Pixel Format**: `yuva444p10le` (com canal Alpha de 16-bit)
- **Áudio**: PCM 16-bit
- **Uso**: Overlays para broadcast e composição com transparência em ilhas de edição profissionais.

### 6. `stillFrame`
- **Container**: `.png`
- **Uso**: Capa de vídeo, thumbnail ou poster frame estático em resolução nativa.

---

## Exemplos de Comando

```bash
# Renderizar socialH264
npm run render -- --composition=demo-showcase-reel --preset=socialH264

# Renderizar transparente
npm run render -- --composition=demo-showcase-reel --preset=transparentWebm

# Renderizar still do frame 45
npm run render -- --composition=demo-showcase-reel --still=45
```
