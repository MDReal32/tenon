import type { Root } from "mdast";

export interface LoadedDocument {
  path: string;
  frontmatter: string[];
  tree: Root;
  lineOffset: number;
}
