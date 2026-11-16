import type { Nodes } from "mdast";

export const walkNodes = (node: Nodes, visit: (node: Nodes) => void) => {
  visit(node);
  if ("children" in node) {
    for (const child of node.children) {
      walkNodes(child, visit);
    }
  }
};
