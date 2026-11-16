import type { CheckContext } from "./check-context.ts";
import { checkLink } from "./check-link.ts";
import { collectReferences } from "./collect-references.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Problem } from "./problem.ts";

export const checkLinks = async (
  document: LoadedDocument,
  context: CheckContext,
) => {
  const problems: Problem[] = [];
  for (const reference of collectReferences(
    document.tree,
    document.lineOffset,
  )) {
    const problem = await checkLink(document, reference, context);
    if (problem) {
      problems.push(problem);
    }
  }
  return problems;
};
