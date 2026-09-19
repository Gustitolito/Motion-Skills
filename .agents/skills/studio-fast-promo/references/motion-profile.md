# Calibrated starting profile

These are starting ranges, not definitions of the style. Timing is at 30 fps; convert with `framesAtFps(n, fps)`. Distances assume a 1920px-wide canvas; scale by width / 1920. Extend holds for the actual text and narration.

| Parameter | Starting range |
|---|---|
| Reveal including settle | 4–10 frames |
| Reading hold after settle | 12–30 frames |
| Travel | 50–120 px |
| Stagger | 1–3 frames |

Use impact once per beat; hold the CTA after the attack.

The executable baseline is `STYLE_PROFILES.promo` in `src/shared/motion/style-profiles.ts`. Its easing is explicit; do not combine that timing curve with a second spring. Use springs for an object response, not as a mandatory camera easing.

Read [recipe.md](recipe.md) when implementing. Verify at intended playback speed and revise timing for the brief.
