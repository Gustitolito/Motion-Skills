import fs from "node:fs";
import assert from "node:assert/strict";
const cases: {
  id: string;
  prompt: string;
  required: string[];
  forbidden: string[];
}[] = JSON.parse(fs.readFileSync("tests/routing/briefs.json", "utf8"));
const file = process.argv[2];
if (!file)
  throw new Error(
    "Supply actual independent agent routes JSON: {caseId: [skillNames]}. Expected routes are not model outputs.",
  );
const actual: Record<string, string[]> = JSON.parse(
  fs.readFileSync(file, "utf8"),
);
for (const c of cases) {
  assert.ok(Array.isArray(actual[c.id]), `Missing case ${c.id}`);
  for (const skill of c.required)
    assert.ok(actual[c.id].includes(skill), `${c.id}: missing ${skill}`);
  for (const skill of c.forbidden)
    assert.ok(!actual[c.id].includes(skill), `${c.id}: unexpected ${skill}`);
}
console.log(
  `${cases.length} routing cases passed. This does not measure visual quality.`,
);
