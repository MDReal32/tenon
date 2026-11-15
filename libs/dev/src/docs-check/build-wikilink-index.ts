import path from "node:path";
import type { WikilinkIndex } from "./wikilink-index.ts";

export const buildWikilinkIndex = (docsDirectory: string, files: string[]) => {
  const index: WikilinkIndex = {
    stems: new Map(),
    paths: new Map(),
    folders: new Set(),
  };

  for (const file of files) {
    const relative = path.posix.relative(docsDirectory, file);
    const withoutExtension = relative.slice(0, -".md".length);
    const stem = path.posix.basename(withoutExtension);
    index.stems.set(stem, [...(index.stems.get(stem) ?? []), file]);
    index.paths.set(withoutExtension, file);

    let folder = path.posix.dirname(relative);
    while (folder !== ".") {
      index.folders.add(folder);
      folder = path.posix.dirname(folder);
    }
  }
  return index;
};
