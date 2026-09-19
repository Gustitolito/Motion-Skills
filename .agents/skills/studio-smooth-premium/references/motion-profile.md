# Calibrated starting profile

These are starting ranges, not definitions of the style. Timing is at 30 fps; convert with `framesAtFps(n, fps)`. Distances assume a 1920px-wide canvas; scale by width / 1920. Extend holds for the actual text and narration.

| Parameter | Starting range |
|---|---|
| Reveal including settle | 18–30 frames |
| Reading hold after settle | 18–45 frames |
| Travel | 12–40 px |
| Stagger | 0–3 frames |

Zero overshoot; shorten travel before shortening the reading hold.

The executable baseline is `STYLE_PROFILES.premium` in `src/shared/motion/style-profiles.ts`. Its easing is explicit; do not combine that timing curve with a second spring. Use springs for an object response, not as a mandatory camera easing.

Read [recipe.md](recipe.md) when implementing. Verify at intended playback speed and revise timing for the brief.
