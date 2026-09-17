# Claude Code Compatibility

@AGENTS.md

This repository keeps its canonical always-on instructions in `AGENTS.md`, imported above so Claude Code receives the same project governance without duplicating it here.

## Agent Skills

- Claude Code discovers project skills from `.claude/skills/`.
- `.claude/skills/` is a generated compatibility mirror of the canonical `.agents/skills/` tree.
- Never edit `.claude/skills/` directly.
- Create or modify skills only in `.agents/skills/`, then run `npm run sync:agent-skills`.
- `npm run check:skills` verifies that the Claude mirror is identical to the canonical skill tree.

Skill-specific procedures belong in the relevant `SKILL.md`, not in this file.
