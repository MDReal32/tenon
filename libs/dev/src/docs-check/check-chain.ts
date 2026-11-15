import path from "node:path";
import { findFrontmatterValue } from "./find-frontmatter-value.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Problem } from "./problem.ts";

const WIKILINK_VALUE = /^\[\[(.+)\]\]$/;

const stemOf = (file: string) => path.posix.basename(file, ".md");

const expectedLink = (file: string | undefined) =>
  file === undefined ? "" : stemOf(file);

const actualLink = (value: string) => value.match(WIKILINK_VALUE)?.[1] ?? value;

export const checkChain = (
  pages: string[],
  documents: Map<string, LoadedDocument>,
) => {
  const problems: Problem[] = [];
  pages.forEach((page, index) => {
    const document = documents.get(page);
    if (!document) {
      return;
    }
    const expected = {
      prev: expectedLink(pages[index - 1]),
      next: expectedLink(pages[index + 1]),
    };
    for (const key of ["prev", "next"] as const) {
      const found = findFrontmatterValue(document.frontmatter, key);
      const actual = found ? actualLink(found.value) : undefined;
      if (actual === expected[key]) {
        continue;
      }
      problems.push({
        path: page,
        line: found?.line ?? 1,
        message: `broken ${key} chain: expected "${expected[key]}", found "${actual ?? "(missing)"}"`,
      });
    }
  });
  return problems;
};
