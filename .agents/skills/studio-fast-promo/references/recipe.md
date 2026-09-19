# Executable reference

Use the `promo` branch of `projects/motion-reference/scenes/ReferenceScene.tsx`, registered as `reference-promo`. It includes entrance, reading hold and exit, and imports the shared calibrated profile. The complete implementation is compiled and rendered by `npm run test:render`.

```tsx
const profile = STYLE_PROFILES.promo;
const progress = interpolate(frame, [0, framesAtFps(profile.reveal, fps)], [0, 1], {
  extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  easing: Easing.bezier(...profile.easing),
});
```

Imports: `interpolate`, `Easing` from `remotion`; `STYLE_PROFILES`, `framesAtFps` from `@shared/motion/style-profiles`. Scale distances to the canvas. Preserve explicit brand constraints. Change the composition, content and hierarchy for the actual brief; copying colors does not reproduce a direction.
