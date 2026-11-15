import assert from "node:assert/strict";
import { test } from "node:test";
import { fromMarkdown } from "mdast-util-from-markdown";
import { collectReferences } from "./collect-references.ts";

const urls = (markdown: string) =>
  collectReferences(fromMarkdown(markdown), 0).map(
    (reference) => reference.url,
  );

test("collects link, image and definition nodes", () => {
  const markdown = "[a](a.md)\n\n![b](b.png)\n\n[c]: c.md\n";
  assert.deepEqual(urls(markdown), ["a.md", "b.png", "c.md"]);
});

test("collects a link inside a table row", () => {
  assert.deepEqual(urls("| a | b |\n| - | - |\n| [x](x.md) | y |\n"), ["x.md"]);
});

test("skips a fenced block, an indented block and inline code", () => {
  const markdown = [
    "```",
    "[f](fenced.md)",
    "```",
    "",
    "    [i](indented.md)",
    "",
    "text `[c](code.md)` text",
    "",
  ].join("\n");
  assert.deepEqual(urls(markdown), []);
});

test("adds the line offset to the reported line", () => {
  const [reference] = collectReferences(fromMarkdown("\n[a](a.md)\n"), 5);
  assert.equal(reference?.line, 7);
});
