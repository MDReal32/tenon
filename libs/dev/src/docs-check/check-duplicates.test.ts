import assert from "node:assert/strict";
import { test } from "node:test";
import { checkDuplicates } from "./check-duplicates.ts";

test("reports every path that shares a name, on line 1", () => {
  const problems = checkDuplicates(["docs/a/x.md", "docs/b/X.md", "docs/y.md"]);
  assert.deepEqual(
    problems.map((problem) => [problem.path, problem.line]),
    [
      ["docs/a/x.md", 1],
      ["docs/b/X.md", 1],
    ],
  );
});

test("allows the triplet names under docs/departments only", () => {
  assert.equal(
    checkDuplicates([
      "docs/departments/README.md",
      "docs/departments/a/README.md",
    ]).length,
    0,
  );
  assert.equal(
    checkDuplicates(["docs/departments/README.md", "docs/x/README.md"]).length,
    2,
  );
});
