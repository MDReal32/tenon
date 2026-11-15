import path from "node:path";
import type { createDirectoryLister } from "./create-directory-lister.ts";
import { pathKind } from "./path-kind.ts";

type DirectoryLister = ReturnType<typeof createDirectoryLister>;

const isInside = (relative: string) =>
  relative !== ".." &&
  !relative.startsWith(`..${path.sep}`) &&
  !path.isAbsolute(relative);

export const resolveExistingPath = async (
  root: string,
  target: string,
  listDirectory: DirectoryLister,
) => {
  const relative = path.relative(root, target);
  if (!isInside(relative)) {
    return await pathKind(target);
  }

  let current = root;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    const entries = await listDirectory(current);
    if (!entries.includes(segment)) {
      return undefined;
    }
    current = path.join(current, segment);
  }
  return await pathKind(current);
};
