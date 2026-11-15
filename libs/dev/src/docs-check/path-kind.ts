import { stat } from "node:fs/promises";
import { isMissingPathError } from "./is-missing-path-error.ts";

export const pathKind = async (target: string) => {
  try {
    const stats = await stat(target);
    return stats.isDirectory() ? "directory" : "file";
  } catch (error) {
    if (isMissingPathError(error)) {
      return undefined;
    }
    throw error;
  }
};
