import { readdir } from "node:fs/promises";
import { isMissingPathError } from "./is-missing-path-error.ts";

const listEntries = async (directory: string) => {
  try {
    return await readdir(directory);
  } catch (error) {
    if (isMissingPathError(error)) {
      return [];
    }
    throw error;
  }
};

export const createDirectoryLister = () => {
  const cache = new Map<string, Promise<string[]>>();
  return (directory: string) => {
    const cached = cache.get(directory);
    if (cached) {
      return cached;
    }
    const entries = listEntries(directory);
    cache.set(directory, entries);
    return entries;
  };
};
