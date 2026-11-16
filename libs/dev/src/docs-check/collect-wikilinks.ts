import { findWikilinks } from "./find-wikilinks.ts";
import { FRONTMATTER_FIRST_LINE } from "./frontmatter-first-line.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import { walkNodes } from "./walk-nodes.ts";
import type { WikilinkOccurrence } from "./wikilink-occurrence.ts";

export const collectWikilinks = (document: LoadedDocument) => {
  const occurrences: WikilinkOccurrence[] = [];

  document.frontmatter.forEach((text, index) => {
    for (const match of findWikilinks(text)) {
      occurrences.push({
        target: match.target,
        heading: match.heading,
        line: FRONTMATTER_FIRST_LINE + index,
      });
    }
  });

  walkNodes(document.tree, (node) => {
    if (node.type !== "text" || !node.position) {
      return;
    }
    for (const match of findWikilinks(node.value)) {
      const newlines = node.value.slice(0, match.index).split("\n").length - 1;
      occurrences.push({
        target: match.target,
        heading: match.heading,
        line: node.position.start.line + document.lineOffset + newlines,
      });
    }
  });
  return occurrences;
};
