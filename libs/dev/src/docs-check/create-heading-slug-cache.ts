import { readHeadingSlugs } from "./read-heading-slugs.ts";

export const createHeadingSlugCache = () => {
  const cache = new Map<string, ReturnType<typeof readHeadingSlugs>>();
  return (absolutePath: string) => {
    const cached = cache.get(absolutePath);
    if (cached) {
      return cached;
    }
    const slugs = readHeadingSlugs(absolutePath);
    cache.set(absolutePath, slugs);
    return slugs;
  };
};
