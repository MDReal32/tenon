import { readdir } from "node:fs/promises";
import { isMissingPathError } from "./is-missing-path-error.ts";

export const listEntries = async (directory: string) => {
  try {
    return await readdir(directory);
  } catch (error) {
    if (isMissingPathError(error)) {
      return [];
    }
    throw error;
  }
};
