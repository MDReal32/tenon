import assert from "node:assert/strict";
import { test } from "node:test";
import { checkChain } from "./check-chain.ts";
import type { LoadedDocument } from "./loaded-document.ts";

const page = (path: string, prev: string, next: string) => {
  const document: LoadedDocument = {
    path,
    frontmatter: [`prev: ${prev}`, `next: ${next}`],
    tree: { type: "root", children: [] },
    lineOffset: 4,
  };
  return [path, document] as const;
};

const pages = ["docs/tenon.md", "docs/01-a/00-a.md"];

test("passes a consistent chain", () => {
  const documents = new Map([
    page(pages[0] ?? "", "", '"[[00-a]]"'),
    page(pages[1] ?? "", '"[[tenon]]"', ""),
  ]);
  assert.deepEqual(checkChain(pages, documents), []);
});

test("names the file and the line of a broken link", () => {
  const documents = new Map([
    page(pages[0] ?? "", "", '"[[wrong]]"'),
    page(pages[1] ?? "", '"[[tenon]]"', ""),
  ]);
  const [problem] = checkChain(pages, documents);
  assert.equal(problem?.path, "docs/tenon.md");
  assert.equal(problem?.line, 3);
});
