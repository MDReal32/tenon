import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fromMarkdown } from "mdast-util-from-markdown";
import type { LoadedDocument } from "./loaded-document.ts";
import { splitFrontmatter } from "./split-frontmatter.ts";

export const loadDocument = async (root: string, relativePath: string) => {
  const source = await readFile(join(root, relativePath), "utf8");
  const { frontmatter, body, lineOffset } = splitFrontmatter(source);
  const document: LoadedDocument = {
    path: relativePath,
    frontmatter,
    tree: fromMarkdown(body),
    lineOffset,
  };
  return document;
};
