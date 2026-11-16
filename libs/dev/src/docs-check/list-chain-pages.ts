import { readdir } from "node:fs/promises";
import { join, posix } from "node:path";

const CHAPTER = /^\d\d-[^/]+$/;
const PAGE = /^\d\d-.+\.md$/;

export const listChainPages = async (root: string, docs: string) => {
  const entries = await readdir(join(root, docs), { withFileTypes: true });
  const chapters = entries
    .filter((entry) => entry.isDirectory() && CHAPTER.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const pages = [posix.join(docs, "tenon.md")];
  for (const chapter of chapters) {
    const files = await readdir(join(root, docs, chapter));
    for (const file of files.filter((name) => PAGE.test(name)).sort()) {
      pages.push(posix.join(docs, chapter, file));
    }
  }
  return pages;
};
