import GithubSlugger from "github-slugger";
import type { Root } from "mdast";
import { toString as nodeText } from "mdast-util-to-string";
import { walkNodes } from "./walk-nodes.ts";

export const collectHeadingSlugs = (tree: Root) => {
  const slugger = new GithubSlugger();
  const slugs = new Set<string>();
  walkNodes(tree, (node) => {
    if (node.type === "heading") {
      slugs.add(slugger.slug(nodeText(node)));
    }
  });
  return slugs;
};
