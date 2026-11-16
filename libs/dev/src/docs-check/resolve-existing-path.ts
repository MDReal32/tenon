import { join, relative as relativePath, sep } from "node:path";
import type { CheckContext } from "./check-context.ts";
import { isInside } from "./is-inside.ts";
import { pathKind } from "./path-kind.ts";

export const resolveExistingPath = async (
  root: string,
  target: string,
  listDirectory: CheckContext["listDirectory"],
) => {
  const relative = relativePath(root, target);
  if (!isInside(relative)) {
    return await pathKind(target);
  }

  let current = root;
  for (const segment of relative.split(sep).filter(Boolean)) {
    const entries = await listDirectory(current);
    if (!entries.includes(segment)) {
      return undefined;
    }
    current = join(current, segment);
  }
  return await pathKind(current);
};
