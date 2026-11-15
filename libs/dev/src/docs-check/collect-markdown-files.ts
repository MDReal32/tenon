import { readdir } from "node:fs/promises";
import path from "node:path";

export const collectMarkdownFiles = async (root: string, directory: string) => {
  const entries = await readdir(path.join(root, directory), {
    recursive: true,
  });
  return entries
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => path.posix.join(directory, entry.split(path.sep).join("/")))
    .sort();
};
