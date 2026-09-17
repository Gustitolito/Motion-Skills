import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { RENDER_PRESETS, RenderPresetKey } from '../src/core/render/render-presets';

// Helper de parsing simples de argumentos CLI: --key=value ou --key value
function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  const rawArgs = process.argv.slice(2);

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg.startsWith('--')) {
      const equalIndex = arg.indexOf('=');
      if (equalIndex !== -1) {
        const key = arg.slice(2, equalIndex);
        const val = arg.slice(equalIndex + 1);
        args[key] = val;
      } else {
        const key = arg.slice(2);
        const nextArg = rawArgs[i + 1];
        if (nextArg && !nextArg.startsWith('--')) {
          args[key] = nextArg;
          i++;
        } else {
          args[key] = 'true';
        }
      }
    }
  }
  return args;
}

async function main() {
  const args = parseArgs();
  const compositionId = args.composition || args.id;
  const presetKey = (args.preset as RenderPresetKey) || 'preview';
  const customOut = args.out;
  const frameRangeStr = args.frames; // Ex: "0-30"
  const isStill = typeof args.still !== 'undefined' || presetKey === 'stillFrame';
  const stillFrameNumber =
    args.still && args.still !== 'true' ? parseInt(args.still, 10) : 0;

  if (!compositionId) {
    console.error('❌ Erro: Composição não informada.');
    console.error('Uso: npm run render -- --composition=<id> [--preset=preview|socialH264|masterProRes|transparentWebm|stillFrame] [--frames=0-30] [--out=caminho]');
    console.error('\nExemplo: npm run render -- --composition=demo-showcase-reel --preset=preview');
    process.exit(1);
  }

  const preset = RENDER_PRESETS[presetKey];
  if (!preset) {
    console.error(`❌ Erro: Preset "${presetKey}" desconhecido.`);
    console.log('Presets disponíveis:', Object.keys(RENDER_PRESETS).join(', '));
    process.exit(1);
  }

  console.log(`🎬 Iniciando processo de renderização...`);
  console.log(`📌 Composição: ${compositionId}`);
  console.log(`⚙️  Preset: ${preset.name} (${preset.description})`);

  // 1. Criar bundle da aplicação
  const entryPoint = path.join(process.cwd(), 'src', 'index.ts');
  console.log('📦 Empacotando projeto via Remotion Bundler...');
  const bundleLocation = await bundle({
    entryPoint,
  });

  // 2. Localizar composição
  console.log(`🔍 Selecionando composição "${compositionId}"...`);
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
  });

  if (!composition) {
    console.error(`❌ Composição "${compositionId}" não encontrada no bundle.`);
    process.exit(1);
  }

  // 3. Determinar pasta de destino
  let outputSubdir = 'renders';
  if (presetKey === 'preview') outputSubdir = 'previews';
  if (isStill) outputSubdir = 'stills';

  const outDir = path.join(process.cwd(), 'out', outputSubdir);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const fileExt = isStill ? (preset.imageFormat || 'png') : preset.extension;
  const defaultFileName = isStill
    ? `${compositionId}-frame-${stillFrameNumber}.${fileExt}`
    : `${compositionId}.${fileExt}`;

  const outputLocation = customOut || path.join(outDir, defaultFileName);

  // 4. Executar Renderização
  if (isStill) {
    console.log(`📸 Renderizando still frame ${stillFrameNumber} para: ${outputLocation}`);
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outputLocation,
      frame: stillFrameNumber,
      imageFormat: preset.imageFormat || 'png',
    });
    console.log(`\n✅ Still salvo com sucesso em: ${outputLocation}\n`);
  } else {
    console.log(`🎥 Renderizando vídeo para: ${outputLocation}`);

    let frameRange: [number, number] | null = null;
    if (frameRangeStr) {
      const [start, end] = frameRangeStr.split('-').map((s) => parseInt(s.trim(), 10));
      if (!isNaN(start) && !isNaN(end)) {
        frameRange = [start, end];
      }
    }

    let lastProgress = -1;
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: preset.codec || 'h264',
      outputLocation,
      crf: preset.crf,
      pixelFormat: preset.pixelFormat,
      imageFormat: preset.imageFormat,
      proResProfile: preset.proResProfile,
      audioCodec: preset.audioCodec,
      audioBitrate: preset.audioBitrate,
      frameRange: frameRange || undefined,
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 100);
        if (p !== lastProgress && p % 10 === 0) {
          lastProgress = p;
          console.log(`⏳ Progresso: ${p}%`);
        }
      },
    });

    console.log(`\n🎉 Vídeo renderizado com sucesso em: ${outputLocation}\n`);
  }
}

main().catch((err) => {
  console.error('❌ Falha na renderização:', err);
  process.exit(1);
});
