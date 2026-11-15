import type { createDirectoryLister } from "./create-directory-lister.ts";
import type { createHeadingSlugCache } from "./create-heading-slug-cache.ts";
import type { WikilinkIndex } from "./wikilink-index.ts";

export interface CheckContext {
  root: string;
  listDirectory: ReturnType<typeof createDirectoryLister>;
  headingSlugs: ReturnType<typeof createHeadingSlugCache>;
  wikilinks: WikilinkIndex;
}
