import { listEntries } from "./list-entries.ts";

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
