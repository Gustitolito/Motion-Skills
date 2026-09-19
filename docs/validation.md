# Validation and limits

- `npm run check`: YAML parser, discovery contracts, exact mirror, Git safety, lint, TypeScript.
- `npm run test:skills`: valid metadata/block YAML, malformed YAML, duplicate keys, wrong types/names and mirror drift, in a temporary directory.
- `npm run test:projects`: numeric and reserved slugs, identifier collisions, private assets, existing asset preservation, rollback and actual scaffold bundling with Tailwind utilities. Runs in a temporary directory.
- `npm run test:smoke`: checks plus one still and 30 frames of `SMOKE_COMPOSITION` (default demo-showcase-reel). This is a startup check, not production certification.
- `npm run test:render`: full eight-second renders of four reference compositions, entrance/hold/exit stills and three frames per video preset. Runs at half resolution for CI. Does not prove alpha correctness or audio quality because the studies are opaque and silent.
- `npm run eval:routing -- actual-routes.json`: scores independent agent selections against six briefs in `tests/routing/briefs.json`. Give the agent only prompts and the skills; record its real selections. Do not feed expected selections back as results. The scorer is not an LLM and does not test agent behavior on its own.

GitHub Actions uploads render artifacts. Human visual review should check readability, clipping, hierarchy, motion continuity and holds at normal/half/double speed. There are no approved golden-image baselines yet; generating screenshots is not a visual-regression assertion.

Local Work execution can compile/bundle here but renderer startup is blocked by `uv_interface_addresses` permissions. Do not patch network APIs or claim a render passed after skipping it. Use an ordinary supported machine or the GitHub Actions runner for real rendering.
