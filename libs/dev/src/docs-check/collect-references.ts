import type { Root } from "mdast";
import type { Reference } from "./reference.ts";
import { walkNodes } from "./walk-nodes.ts";

export const collectReferences = (tree: Root, lineOffset: number) => {
  const references: Reference[] = [];
  walkNodes(tree, (node) => {
    if (
      (node.type === "link" ||
        node.type === "image" ||
        node.type === "definition") &&
      node.position
    ) {
      references.push({
        url: node.url,
        line: node.position.start.line + lineOffset,
      });
    }
  });
  return references;
};
