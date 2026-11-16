import type { CheckContext } from "./check-context.ts";
import { checkWikilink } from "./check-wikilink.ts";
import { collectWikilinks } from "./collect-wikilinks.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Problem } from "./problem.ts";

export const checkWikilinks = async (
  document: LoadedDocument,
  context: CheckContext,
) => {
  const problems: Problem[] = [];
  for (const occurrence of collectWikilinks(document)) {
    const problem = await checkWikilink(document, occurrence, context);
    if (problem) {
      problems.push(problem);
    }
  }
  return problems;
};
