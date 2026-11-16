import { readFile } from "node:fs/promises";
import { fromMarkdown } from "mdast-util-from-markdown";
import { collectHeadingSlugs } from "./collect-heading-slugs.ts";
import { splitFrontmatter } from "./split-frontmatter.ts";

export const readHeadingSlugs = async (absolutePath: string) => {
  const source = await readFile(absolutePath, "utf8");
  const { body } = splitFrontmatter(source);
  return collectHeadingSlugs(fromMarkdown(body));
};
