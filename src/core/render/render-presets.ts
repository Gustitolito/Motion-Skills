import type { Codec, PixelFormat } from '@remotion/renderer';

export type StudioProResProfile =
  | '4444'
  | '4444-xq'
  | 'hq'
  | 'standard'
  | 'light'
  | 'proxy';

export type BitrateString = `${number}k` | `${number}K` | `${number}M`;

export interface RenderPreset {
  name: string;
  description: string;
  extension: 'mp4' | 'webm' | 'mov' | 'png' | 'jpg';
  codec?: Codec;
  crf?: number;
  pixelFormat?: PixelFormat;
  imageFormat?: 'jpeg' | 'png';
  proResProfile?: StudioProResProfile;
  audioCodec?: 'aac' | 'mp3' | 'pcm-16' | 'opus';
  audioBitrate?: BitrateString;
  scale?: number;
  concurrency?: number | null;
}

export const RENDER_PRESETS: Record<string, RenderPreset> = {
  // 1. Preview rápido para validação de layout e animação
  preview: {
    name: 'Preview Rápido',
    description: 'Render rápido com qualidade média para revisão interna ágil',
    extension: 'mp4',
    codec: 'h264',
    crf: 26,
    pixelFormat: 'yuv420p',
    imageFormat: 'jpeg',
    audioCodec: 'aac',
    audioBitrate: '128k',
  },

  // 2. Entrega final para Redes Sociais (Instagram, TikTok, Reels, YouTube)
  socialH264: {
    name: 'Social Media H.264',
    description: 'Alta fidelidade visual com compatibilidade máxima e áudio 320k',
    extension: 'mp4',
    codec: 'h264',
    crf: 18,
    pixelFormat: 'yuv420p',
    imageFormat: 'jpeg',
    audioCodec: 'aac',
    audioBitrate: '320k',
  },

  // 3. Master ProRes para arquivamento ou edição em NLE (Premiere, DaVinci, Final Cut)
  masterProRes: {
    name: 'Master ProRes 422 HQ',
    description: 'Master sem perda perceptual com áudio PCM para pós-produção',
    extension: 'mov',
    codec: 'prores',
    proResProfile: 'hq',
    pixelFormat: 'yuv422p10le',
    audioCodec: 'pcm-16',
  },

  // 4. WebM com Alpha transparente (para stickers, overlays web)
  transparentWebm: {
    name: 'WebM Transparente (VP9 Alpha)',
    description: 'Vídeo com canal alfa transparente para web e overlays interativos',
    extension: 'webm',
    codec: 'vp9',
    imageFormat: 'png',
    pixelFormat: 'yuva420p',
  },

  // 5. ProRes 4444 com Alpha transparente para motion graphics broadcast
  transparentProRes: {
    name: 'ProRes 4444 Transparente',
    description: 'Master ProRes 4444 com canal alfa completo para composição externa',
    extension: 'mov',
    codec: 'prores',
    imageFormat: 'png',
    proResProfile: '4444',
    pixelFormat: 'yuva444p10le',
    audioCodec: 'pcm-16',
  },

  // 6. Frame Estático / Thumbnail
  stillFrame: {
    name: 'Still Frame PNG',
    description: 'Exportação de frame estático em resolução nativa para capa/thumbnail',
    extension: 'png',
    imageFormat: 'png',
  },
};

export type RenderPresetKey = keyof typeof RENDER_PRESETS;
