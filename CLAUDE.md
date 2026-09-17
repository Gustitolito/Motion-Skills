# Claude Code Compatibility

The canonical repository instructions live in `AGENTS.md`.

Before modifying code, projects, skills, scripts, configuration, or repository structure, read and follow `AGENTS.md` in full.

## Agent Skills

- Claude Code discovers project skills from `.claude/skills/`.
- `.claude/skills/` is a generated compatibility mirror of the canonical `.agents/skills/` tree.
- Never edit `.claude/skills/` directly.
- Create or modify skills only in `.agents/skills/`, then run `npm run sync:agent-skills`.
- `npm run check:skills` verifies that the Claude mirror is identical to the canonical skill tree.

Skill-specific procedures belong in the relevant `SKILL.md`, not in this file.
