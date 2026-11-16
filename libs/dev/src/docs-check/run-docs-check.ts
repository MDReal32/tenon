import { resolve } from "node:path";
import { buildWikilinkIndex } from "./build-wikilink-index.ts";
import { checkChain } from "./check-chain.ts";
import type { CheckContext } from "./check-context.ts";
import { checkDuplicates } from "./check-duplicates.ts";
import { checkLinks } from "./check-links.ts";
import { checkWikilinks } from "./check-wikilinks.ts";
import { collectMarkdownFiles } from "./collect-markdown-files.ts";
import { createDirectoryLister } from "./create-directory-lister.ts";
import { createHeadingSlugCache } from "./create-heading-slug-cache.ts";
import { listChainPages } from "./list-chain-pages.ts";
import { loadDocument } from "./load-document.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Problem } from "./problem.ts";
import { sortProblems } from "./sort-problems.ts";

const DOCS = "docs";

export const runDocsCheck = async (root: string) => {
  const files = await collectMarkdownFiles(root, DOCS);
  const context: CheckContext = {
    root: resolve(root),
    listDirectory: createDirectoryLister(),
    headingSlugs: createHeadingSlugCache(),
    wikilinks: buildWikilinkIndex(DOCS, files),
  };

  const documents = new Map<string, LoadedDocument>();
  for (const file of files) {
    documents.set(file, await loadDocument(root, file));
  }

  const problems: Problem[] = checkDuplicates(files);
  for (const document of documents.values()) {
    problems.push(...(await checkLinks(document, context)));
    problems.push(...(await checkWikilinks(document, context)));
  }
  problems.push(...checkChain(await listChainPages(root, DOCS), documents));

  return { files: files.length, problems: sortProblems(problems) };
};
