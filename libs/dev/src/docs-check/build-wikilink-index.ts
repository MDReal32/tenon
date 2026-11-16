import { posix } from "node:path";
import type { WikilinkIndex } from "./wikilink-index.ts";

export const buildWikilinkIndex = (docsDirectory: string, files: string[]) => {
  const index: WikilinkIndex = {
    stems: new Map(),
    paths: new Map(),
    folders: new Set(),
  };

  for (const file of files) {
    const relative = posix.relative(docsDirectory, file);
    const withoutExtension = relative.slice(0, -".md".length);
    const stem = posix.basename(withoutExtension);
    index.stems.set(stem, [...(index.stems.get(stem) ?? []), file]);
    index.paths.set(withoutExtension, file);

    let folder = posix.dirname(relative);
    while (folder !== ".") {
      index.folders.add(folder);
      folder = posix.dirname(folder);
    }
  }
  return index;
};
