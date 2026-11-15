import assert from "node:assert/strict";
import { test } from "node:test";
import { splitFrontmatter } from "./split-frontmatter.ts";

test("splits the frontmatter from the body and keeps the line offset", () => {
  const result = splitFrontmatter("---\ntitle: A\n---\n\n# Body\n");
  assert.deepEqual(result.frontmatter, ["title: A"]);
  assert.equal(result.lineOffset, 3);
  assert.equal(result.body, "\n# Body\n");
});

test("leaves a document without frontmatter whole", () => {
  const result = splitFrontmatter("# Body\n");
  assert.deepEqual(result.frontmatter, []);
  assert.equal(result.lineOffset, 0);
});
