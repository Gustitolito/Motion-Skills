import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  renderStill,
  selectComposition,
} from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import { studioBundlerOverride } from "../src/core/bundler/config";
import { RENDER_PRESETS } from "../src/core/render/render-presets";

async function main() {
  mkdirSync("out/validation", { recursive: true });
  const serveUrl = await bundle({
    entryPoint: "src/index.ts",
    bundlerOverride: studioBundlerOverride,
  });
  for (const kind of ["premium", "promo", "editorial", "data"]) {
    const composition = await selectComposition({
      serveUrl,
      id: `reference-${kind}`,
    });
    for (const frame of [12, 90, 225]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: `out/validation/${kind}-${frame}.png`,
        scale: 0.5,
      });
    }
    await renderMedia({
      serveUrl,
      composition,
      codec: "h264",
      outputLocation: `out/validation/${kind}.mp4`,
      scale: 0.5,
      concurrency: 2,
    });
  }
  const composition = await selectComposition({
    serveUrl,
    id: "reference-premium",
  });
  for (const [name, preset] of Object.entries(RENDER_PRESETS)) {
    if (!preset.codec) continue;
    await renderMedia({
      serveUrl,
      composition,
      codec: preset.codec,
      crf: preset.crf,
      pixelFormat: preset.pixelFormat,
      imageFormat: preset.imageFormat,
      proResProfile: preset.proResProfile,
      audioCodec: preset.audioCodec,
      audioBitrate: preset.audioBitrate,
      frameRange: [30, 32],
      scale: 0.5,
      concurrency: 2,
      outputLocation: `out/validation/preset-${name}.${preset.extension}`,
    });
  }
  console.log(
    "Four full studies and codec presets rendered. Visual/art-direction approval remains separate.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
