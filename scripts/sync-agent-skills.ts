import { parseDocument } from "yaml";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { join, relative, resolve } from "node:path";

const root = process.cwd();
const canonical = resolve(root, ".agents", "skills");
const claudeRoot = resolve(root, ".claude");
const claudeMirror = resolve(claudeRoot, "skills");
const legacySkills = resolve(root, "skills");
const checkOnly = process.argv.includes("--check");

function fail(message: string): never {
  console.error(`[agent-skills] ${message}`);
  process.exit(1);
}

if (!existsSync(canonical)) {
  fail("Canonical skill directory .agents/skills/ does not exist.");
}

if (existsSync(legacySkills)) {
  fail("Legacy root skills/ directory exists. Move skills to .agents/skills/.");
}

const listFiles = (directory: string): string[] => {
  const files: string[] = [];

  const walk = (current: string) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const absolute = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(absolute);
      } else if (entry.isFile()) {
        files.push(relative(directory, absolute).replaceAll("\\", "/"));
      }
    }
  };

  walk(directory);
  return files.sort();
};

const parseFrontmatter = (skillFile: string): Map<string, string> => {
  const source = readFileSync(skillFile, "utf8").replaceAll("\r\n", "\n");
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(source);
  if (!match) fail(`${skillFile}: missing YAML frontmatter delimiters.`);
  const document = parseDocument(match[1], { uniqueKeys: true });
  if (document.errors.length)
    fail(`${skillFile}: ${document.errors.map((e) => e.message).join("; ")}`);
  const data: unknown = document.toJS({ maxAliasCount: 50 });
  if (!data || typeof data !== "object" || Array.isArray(data))
    fail(`${skillFile}: frontmatter must be a mapping.`);
  const fields = new Map<string, string>();
  for (const key of ["name", "description"]) {
    const value = (data as Record<string, unknown>)[key];
    if (typeof value !== "string" || !value.trim())
      fail(`${skillFile}: ${key} must be a nonempty string.`);
    fields.set(key, value);
  }
  return fields;
};

const validateCanonical = () => {
  const skillDirs = readdirSync(canonical, { withFileTypes: true }).filter(
    (entry) => entry.isDirectory(),
  );
  if (skillDirs.length === 0) {
    fail("No skills found in .agents/skills/.");
  }

  const seenNames = new Set<string>();

  for (const skillDir of skillDirs) {
    const skillFile = join(canonical, skillDir.name, "SKILL.md");
    if (!existsSync(skillFile) || !statSync(skillFile).isFile()) {
      fail(`Missing SKILL.md in .agents/skills/${skillDir.name}/.`);
    }

    const frontmatter = parseFrontmatter(skillFile);
    const name = frontmatter.get("name");
    const description = frontmatter.get("description");

    if (!name) {
      fail(
        `.agents/skills/${skillDir.name}/SKILL.md: missing required frontmatter field "name".`,
      );
    }
    if (name !== skillDir.name) {
      fail(
        `.agents/skills/${skillDir.name}/SKILL.md: frontmatter name "${name}" must match directory "${skillDir.name}".`,
      );
    }
    if (seenNames.has(name)) {
      fail(`Duplicate skill name "${name}".`);
    }
    seenNames.add(name);

    if (!description?.trim()) {
      fail(
        `.agents/skills/${skillDir.name}/SKILL.md: missing required frontmatter field "description".`,
      );
    }

    if (name.startsWith("studio-")) {
      if (!description.includes("Use when:")) {
        fail(
          `.agents/skills/${skillDir.name}/SKILL.md: studio skill description must include "Use when:".`,
        );
      }
      if (!description.includes("NOT for:")) {
        fail(
          `.agents/skills/${skillDir.name}/SKILL.md: studio skill description must include "NOT for:".`,
        );
      }
    }
  }
};

const compareMirror = (): string[] => {
  if (!existsSync(claudeMirror)) {
    return [".claude/skills/ is missing"];
  }

  const canonicalFiles = listFiles(canonical);
  const mirrorFiles = listFiles(claudeMirror);
  const issues: string[] = [];

  if (canonicalFiles.join("\n") !== mirrorFiles.join("\n")) {
    issues.push("file lists differ");
  }

  const mirrorFileSet = new Set(mirrorFiles);
  for (const file of canonicalFiles) {
    if (!mirrorFileSet.has(file)) continue;

    const source = readFileSync(join(canonical, file));
    const mirror = readFileSync(join(claudeMirror, file));
    if (!source.equals(mirror)) {
      issues.push(`content differs: ${file}`);
    }
  }

  return issues;
};

validateCanonical();

if (checkOnly) {
  const issues = compareMirror();
  if (issues.length > 0) {
    fail(
      `Claude skill mirror is out of sync (${issues.join("; ")}). Run npm run sync:agent-skills.`,
    );
  }

  console.log(
    "[agent-skills] OK: skill frontmatter is valid and .claude/skills mirrors .agents/skills exactly.",
  );
  process.exit(0);
}

rmSync(claudeMirror, { recursive: true, force: true });
mkdirSync(claudeRoot, { recursive: true });
cpSync(canonical, claudeMirror, { recursive: true });

const issues = compareMirror();
if (issues.length > 0) {
  fail(`Sync completed but verification failed (${issues.join("; ")}).`);
}

console.log("[agent-skills] Synced .agents/skills -> .claude/skills.");
