import assert from "node:assert/strict";
import { test } from "node:test";
import { createFixture } from "./create-fixture.ts";
import { runDocsCheck } from "./run-docs-check.ts";

const tenon = '---\nprev:\nnext: "[[00-a]]"\n---\n\n# Tenon\n';
const first = '---\nprev: "[[tenon]]"\nnext:\n---\n\n# First\n\n## Sub part\n';

const problemsOf = async (files: Record<string, string>) => {
  const root = await createFixture({
    "docs/tenon.md": tenon,
    "docs/01-a/00-a.md": first,
    ...files,
  });
  const result = await runDocsCheck(root);
  return result.problems.map(
    (problem) => `${problem.path}:${problem.line} ${problem.message}`,
  );
};

test("passes a clean docs tree", async () => {
  assert.deepEqual(await problemsOf({}), []);
});

test("reports a broken link at its real line, below the frontmatter", async () => {
  const problems = await problemsOf({
    "docs/note.md": "---\ntitle: n\n---\n\ntext\n\n[x](missing.md)\n",
  });
  assert.equal(problems.length, 1);
  assert.match(
    problems[0] ?? "",
    /^docs\/note\.md:7 broken link "missing\.md"/,
  );
});

test("checks a markdown anchor and a percent-encoded path", async () => {
  const problems = await problemsOf({
    "docs/note.md":
      "[ok](01-a/00-a.md#sub-part)\n\n[bad](01-a/00-a.md#nope)\n\n[enc](my%20file.md)\n",
    "docs/my file.md": "# f\n",
  });
  assert.equal(problems.length, 1);
  assert.match(problems[0] ?? "", /^docs\/note\.md:3 broken anchor "#nope"/);
});

test("checks a link from docs to a file outside docs, and its anchor", async () => {
  const problems = await problemsOf({
    "outside.md": "# Real heading\n",
    "docs/note.md":
      "[ok](../outside.md#real-heading)\n\n[bad](../outside.md#gone)\n\n[none](../absent.md)\n",
  });
  assert.equal(problems.length, 2);
});

test("ignores links to other websites and code", async () => {
  const problems = await problemsOf({
    "docs/note.md":
      "[w](https://example.com/x)\n\n`[c](nope.md)`\n\n```\n[d](nope.md)\n```\n",
  });
  assert.deepEqual(problems, []);
});

test("checks wikilinks and their headings, in the body and the frontmatter", async () => {
  const problems = await problemsOf({
    "docs/note.md":
      '---\nrelated: "[[ghost]]"\n---\n\n[[00-a#Sub part]] and [[00-a#Missing]] and [[nowhere]]\n',
  });
  assert.equal(problems.length, 3);
  assert.match(problems[0] ?? "", /^docs\/note\.md:2 unknown wikilink/);
});

test("reports a duplicate name with every path", async () => {
  const problems = await problemsOf({
    "docs/a/same.md": "# a\n",
    "docs/b/same.md": "# b\n",
  });
  assert.equal(problems.length, 2);
  assert.match(problems[0] ?? "", /^docs\/a\/same\.md:1 duplicate/);
});

test("reports a broken prev and next chain", async () => {
  const problems = await problemsOf({
    "docs/01-a/00-a.md":
      '---\nprev: "[[tenon]]"\nnext: "[[tenon]]"\n---\n\n# First\n',
  });
  assert.equal(problems.length, 1);
  assert.match(problems[0] ?? "", /^docs\/01-a\/00-a\.md:3 broken next chain/);
});

test("does not count a json file under docs as a duplicate", async () => {
  const problems = await problemsOf({
    "docs/.obsidian/app.json": "{}",
    "docs/other/app.json": "{}",
  });
  assert.deepEqual(problems, []);
});
