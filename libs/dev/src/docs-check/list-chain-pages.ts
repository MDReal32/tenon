import { readdir } from "node:fs/promises";
import path from "node:path";

const CHAPTER = /^\d\d-[^/]+$/;
const PAGE = /^\d\d-.+\.md$/;

export const listChainPages = async (root: string, docs: string) => {
  const entries = await readdir(path.join(root, docs), { withFileTypes: true });
  const chapters = entries
    .filter((entry) => entry.isDirectory() && CHAPTER.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const pages = [path.posix.join(docs, "tenon.md")];
  for (const chapter of chapters) {
    const files = await readdir(path.join(root, docs, chapter));
    for (const file of files.filter((name) => PAGE.test(name)).sort()) {
      pages.push(path.posix.join(docs, chapter, file));
    }
  }
  return pages;
};
