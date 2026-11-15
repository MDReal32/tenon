import path from "node:path";
import GithubSlugger from "github-slugger";
import type { CheckContext } from "./check-context.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Problem } from "./problem.ts";
import type { WikilinkOccurrence } from "./wikilink-occurrence.ts";

const MARKDOWN_EXTENSION = /\.md$/;

export const checkWikilink = async (
  document: LoadedDocument,
  occurrence: WikilinkOccurrence,
  context: CheckContext,
) => {
  const { target, heading, line } = occurrence;
  const problem = (message: string): Problem => ({
    path: document.path,
    line,
    message,
  });

  const name = target.replace(MARKDOWN_EXTENSION, "");
  let files: string[] = [];
  if (name === "") {
    files = [document.path];
  } else {
    const byPath = context.wikilinks.paths.get(name);
    files = context.wikilinks.stems.get(name) ?? (byPath ? [byPath] : []);
  }

  if (files.length === 0) {
    if (context.wikilinks.folders.has(name)) {
      return undefined;
    }
    return problem(`unknown wikilink "[[${target}]]"`);
  }

  if (heading === undefined || heading === "") {
    return undefined;
  }

  const wanted = new GithubSlugger().slug(heading.split("#").at(-1) ?? "");
  for (const file of files) {
    const slugs = await context.headingSlugs(path.join(context.root, file));
    if (slugs.has(wanted)) {
      return undefined;
    }
  }
  return problem(`unknown heading "${heading}" in wikilink "[[${target}]]"`);
};
