import { deepEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import { splitFrontmatter } from "./split-frontmatter.ts";

test("splits the frontmatter from the body and keeps the line offset", () => {
  const result = splitFrontmatter("---\ntitle: A\n---\n\n# Body\n");
  deepEqual(result.frontmatter, ["title: A"]);
  equal(result.lineOffset, 3);
  equal(result.body, "\n# Body\n");
});

test("leaves a document without frontmatter whole", () => {
  const result = splitFrontmatter("# Body\n");
  deepEqual(result.frontmatter, []);
  equal(result.lineOffset, 0);
});
