"""Normalize a reviewed router bundle without fetching or upgrading upstream."""
from pathlib import Path
import shutil
import json
import hashlib

root = Path('.agents/skills')
router = root / 'remotion-best-practices'
nested_maps = router / 'remotion-markup/remotion-maps'
if nested_maps.exists():
    ref = router / 'remotion-markup/REFERENCE.md'
    ref.write_text(ref.read_text().replace('./remotion-maps/', '../remotion-maps/'))
    shutil.rmtree(nested_maps)

for bundled in sorted(router.glob('remotion-*')):
    reference = bundled / 'REFERENCE.md'
    if not reference.is_file():
        raise RuntimeError(f'Missing {reference}')
    target = root / bundled.name
    header = reference.read_text().split('---', 2)[1]
    # Discovery entrypoints stay stable; implementation lives in the router bundle.
    preserved = {str(f.relative_to(target)): f.read_bytes() for folder in ['agents', 'assets'] for f in (target / folder).rglob('*') if f.is_file()}
    if target.exists():
        shutil.rmtree(target)
    target.mkdir()
    for relative, data in preserved.items():
        dest = target / relative
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
    (target / 'SKILL.md').write_text('---' + header + '---\n\n'
        f'Load [the canonical reference](../remotion-best-practices/{bundled.name}/REFERENCE.md) '
        'when this skill applies. Supporting files are relative to that reference.\n')

manifest = {'source': 'remotion-dev/skills', 'importedFromRepositoryCommit': '64ec28f95b352be6712c1f8561eab10beb9f0488',
            'version': '4.0.525', 'layout': 'router bundle + discovery wrappers', 'sha256': {}}
for directory in sorted(root.glob('remotion-*')):
    digest = hashlib.sha256()
    for f in sorted(directory.rglob('*')):
        if f.is_file():
            digest.update(str(f.relative_to(directory)).encode() + b'\0' + f.read_bytes() + b'\0')
    manifest['sha256'][str(directory)] = digest.hexdigest()
Path('docs/remotion-vendor-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
