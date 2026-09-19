# Remotion upstream skills

Source: https://github.com/remotion-dev/skills. The imported router in repository commit `64ec28f95b352be6712c1f8561eab10beb9f0488` identifies version 4.0.525. This is the provenance we can verify; it is not an invented upstream commit hash.

The full reference tree lives inside `.agents/skills/remotion-best-practices/`. Other `remotion-*` directories are discovery wrappers with links to that tree. The nested markup/maps copy was removed in favor of the router's sibling maps package. Host metadata is preserved. This eliminates divergent 4.0.524 standalone markup and duplicate map techniques without changing APIs or upgrading dependencies.

`skills-lock.json` records the original installer import, not integrity of our normalized layout. `docs/remotion-vendor-manifest.json` records actual normalized file hashes. Do not represent the installer hashes as current local content hashes.

To update: import the intended version from upstream in a dedicated branch, inspect its router bundle and API compatibility with the pinned Remotion packages, run `python scripts/normalize-remotion-skills.py`, then `npm run sync:agent-skills`, `npm run check`, `npm run test:projects`, and `npm run test:smoke`. Update version/provenance in the normalizer when upgrading. Review the diff before commit; do not blindly update every skill during unrelated video work.

## Licensing
No new blanket license is granted by this change. First-party license selection belongs to the repository owner; upstream material retains its own applicable terms. Public visibility alone is not a license. A future root LICENSE must distinguish studio-authored material from vendored content.
