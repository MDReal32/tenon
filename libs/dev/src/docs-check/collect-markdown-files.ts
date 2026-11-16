import { readdir } from "node:fs/promises";
import { join, posix, sep } from "node:path";

export const collectMarkdownFiles = async (root: string, directory: string) => {
  const entries = await readdir(join(root, directory), {
    recursive: true,
  });
  return entries
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => posix.join(directory, entry.split(sep).join("/")))
    .sort();
};
