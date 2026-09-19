import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import { studioBundlerOverride } from "../src/core/bundler/config";

test("scaffold: numeric/reserved slugs, private assets, collision and transactional rollback", async () => {
  const root = process.cwd();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "motion-project-test-"));
  try {
    for (const name of [
      "scripts",
      "src",
      "projects",
      "public",
      "tsconfig.json",
      "package.json",
    ]) {
      fs.cpSync(path.join(root, name), path.join(dir, name), {
        recursive: true,
      });
    }
    fs.symlinkSync(
      path.join(root, "node_modules"),
      path.join(dir, "node_modules"),
      "dir",
    );
    const run = (...args: string[]) =>
      spawnSync(
        process.execPath,
        ["--import", "tsx", "scripts/new-project.ts", ...args],
        { cwd: dir, encoding: "utf8" },
      );
    for (const args of [
      ["2026-campanha"],
      ["class", "--private"],
      ["a-1"],
      ["a1"],
    ]) {
      const result = run(...args);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
    const privateConfig = fs.readFileSync(
      path.join(dir, "projects/_private/class/project.config.ts"),
      "utf8",
    );
    assert.match(privateConfig, /assetsPath: 'projects\/_private\/class'/);
    const registry = path.join(
      dir,
      "src/core/registry/projects-registry.generated.ts",
    );
    const local = path.join(
      dir,
      "src/core/registry/projects-registry.local.generated.ts",
    );
    const snapshot = fs.readFileSync(registry);
    const localSnapshot = fs.readFileSync(local);
    assert.notEqual(run("class").status, 0);
    fs.mkdirSync(path.join(dir, "public/projects/orphan"), { recursive: true });
    fs.writeFileSync(path.join(dir, "public/projects/orphan/keep.txt"), "keep");
    assert.notEqual(run("orphan").status, 0);
    assert.equal(
      fs.readFileSync(
        path.join(dir, "public/projects/orphan/keep.txt"),
        "utf8",
      ),
      "keep",
    );
    fs.writeFileSync(
      path.join(dir, "projects/_template/broken.ts"),
      'const invalid: number = "bad";',
    );
    assert.notEqual(run("rollback-test").status, 0);
    assert.equal(
      fs.existsSync(path.join(dir, "projects/rollback-test")),
      false,
    );
    assert.equal(
      fs.existsSync(path.join(dir, "public/projects/rollback-test")),
      false,
    );
    assert.deepEqual(fs.readFileSync(registry), snapshot);
    assert.deepEqual(fs.readFileSync(local), localSnapshot);
    fs.rmSync(path.join(dir, "projects/_template/broken.ts"));
    // Bundle the actual scaffold: resolves @shared aliases and emits Tailwind CSS.
    process.chdir(dir);
    const output = await bundle({
      entryPoint: path.join(dir, "src/index.ts"),
      bundlerOverride: studioBundlerOverride,
      outDir: path.join(dir, "bundle"),
    });
    const walk = (p: string): string[] =>
      fs
        .readdirSync(p, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory() ? walk(path.join(p, e.name)) : [path.join(p, e.name)],
        );
    const css = walk(output)
      .filter((f) => /\.(css|js)$/.test(f))
      .map((f) => fs.readFileSync(f, "utf8"))
      .join("\n");
    assert.match(css, /\.flex\b/);
    assert.match(css, /\.items-center\b/);
  } finally {
    process.chdir(root);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
