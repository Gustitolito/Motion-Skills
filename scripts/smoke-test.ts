import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';

async function main() {
  console.log('══════════════════════════════════════════════════════════════');
  console.log('🧪 MOTION DESIGN STUDIO - SMOKE TEST SUITE');
  console.log('══════════════════════════════════════════════════════════════\n');

  // NÍVEL 1: Check estático (ESLint Remotion + TypeScript)
  console.log('🔹 Nível 1: Validação Estática (Lint Remotion + Typecheck)...');
  try {
    execSync('npm run check', { stdio: 'inherit' });
    console.log('✅ Nível 1 Aprovado: TypeScript e ESLint em 100% de conformidade.\n');
  } catch {
    console.error('❌ Nível 1 Falhou: Erros de Lint ou Tipos encontrados.');
    process.exit(1);
  }

  // Empacotamento para os testes de render
  const entryPoint = path.join(process.cwd(), 'src', 'index.ts');
  console.log('🔹 Empacotando bundle para testes visuais...');
  const bundleLocation = await bundle({ entryPoint });

  const testCompId = 'demo-showcase-reel';
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: testCompId,
  });

  if (!composition) {
    console.error(`❌ Composição de teste "${testCompId}" não encontrada.`);
    process.exit(1);
  }

  // NÍVEL 2: Sanity Check de 1 Still Frame
  console.log('🔹 Nível 2: Sanity Check Visual (Render de 1 Still Frame)...');
  const stillsDir = path.join(process.cwd(), 'out', 'stills');
  if (!fs.existsSync(stillsDir)) fs.mkdirSync(stillsDir, { recursive: true });

  const stillPath = path.join(stillsDir, 'smoke-test.png');
  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: stillPath,
    frame: 20, // Frame intermediário com animação ativa
    imageFormat: 'png',
  });

  if (fs.existsSync(stillPath) && fs.statSync(stillPath).size > 0) {
    console.log(`✅ Nível 2 Aprovado: Still salvo com ${fs.statSync(stillPath).size} bytes em: ${stillPath}\n`);
  } else {
    console.error('❌ Nível 2 Falhou: Still não foi gerado ou está vazio.');
    process.exit(1);
  }

  // NÍVEL 3: Render Curto de 30 Frames (Headless Video Render)
  console.log('🔹 Nível 3: Renderização Curta de Vídeo (30 Frames @ H.264)...');
  const previewsDir = path.join(process.cwd(), 'out', 'previews');
  if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });

  const videoPath = path.join(previewsDir, 'smoke-test.mp4');
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: videoPath,
    frameRange: [0, 29],
  });

  if (fs.existsSync(videoPath) && fs.statSync(videoPath).size > 0) {
    console.log(`✅ Nível 3 Aprovado: Vídeo gerado com ${fs.statSync(videoPath).size} bytes em: ${videoPath}\n`);
  } else {
    console.error('❌ Nível 3 Falhou: Vídeo não foi gerado ou está vazio.');
    process.exit(1);
  }

  console.log('══════════════════════════════════════════════════════════════');
  console.log('🎉 TODOS OS SMOKE TESTS PASSARAM COM SUCESSO!');
  console.log('O ambiente Remotion está 100% validado para produção.');
  console.log('══════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('❌ Falha na suíte de smoke tests:', err);
  process.exit(1);
});
