import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

test("frontmatter accepts YAML metadata and rejects malformed/duplicate/non-string fields; mirror detects drift", () => {
  const root = process.cwd();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "motion-skills-test-"));
  const skill = path.join(dir, ".agents/skills/studio-test");
  const run = (...args: string[]) =>
    spawnSync(
      process.execPath,
      [
        "--import",
        path.join(root, "node_modules/tsx/dist/loader.mjs"),
        path.join(root, "scripts/sync-agent-skills.ts"),
        ...args,
      ],
      { cwd: dir, encoding: "utf8" },
    );
  fs.mkdirSync(skill, { recursive: true });
  const write = (header: string) =>
    fs.writeFileSync(
      path.join(skill, "SKILL.md"),
      `---\n${header}\n---\nBody\n`,
    );
  try {
    write(
      "name: studio-test\ndescription: >\n  Use when: testing.\n  NOT for: production.\nmetadata:\n  owner: studio",
    );
    let result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(run("--check").status, 0);
    fs.appendFileSync(path.join(skill, "SKILL.md"), "Changed");
    assert.notEqual(run("--check").status, 0);
    for (const header of [
      'name: studio-test\nname: studio-test\ndescription: "Use when: X. NOT for: Y."',
      "name: studio-test\ndescription: Use when: X. NOT for: Y.",
      "name: studio-test\ndescription: 42",
      'name: wrong\ndescription: "Use when: X. NOT for: Y."',
      "name: studio-test\ndescription: [unterminated",
    ]) {
      write(header);
      result = run();
      assert.notEqual(result.status, 0, header);
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
