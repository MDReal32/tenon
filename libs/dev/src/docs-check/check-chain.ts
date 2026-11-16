import { actualLink } from "./actual-link.ts";
import { expectedLink } from "./expected-link.ts";
import { findFrontmatterValue } from "./find-frontmatter-value.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Problem } from "./problem.ts";

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
