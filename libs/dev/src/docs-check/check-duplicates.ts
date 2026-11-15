import path from "node:path";
import type { Problem } from "./problem.ts";

const TRIPLET_NAMES = new Set(["readme.md", "rules.md", "claude.md"]);
const TRIPLET_ROOT = "docs/departments/";

export const checkDuplicates = (files: string[]) => {
  const byName = new Map<string, string[]>();
  for (const file of files) {
    const name = path.posix.basename(file).toLowerCase();
    byName.set(name, [...(byName.get(name) ?? []), file]);
  }

  const problems: Problem[] = [];
  for (const [name, paths] of byName) {
    if (paths.length < 2) {
      continue;
    }
    const outside = paths.filter((file) => !file.startsWith(TRIPLET_ROOT));
    if (TRIPLET_NAMES.has(name) && outside.length === 0) {
      continue;
    }
    for (const file of paths) {
      const others = paths.filter((other) => other !== file).join(", ");
      problems.push({
        path: file,
        line: 1,
        message: `duplicate file name "${path.posix.basename(file)}", also at ${others}`,
      });
    }
  }
  return problems;
};
