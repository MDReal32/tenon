import type { ExecutorContext } from "@nx/devkit";
import { logger } from "@nx/devkit";
import { formatProblem } from "./format-problem.ts";
import { runDocsCheck } from "./run-docs-check.ts";

export const docsCheckExecutor = async (
  _options: unknown,
  context: ExecutorContext,
) => {
  const { files, problems } = await runDocsCheck(context.root);
  for (const problem of problems) {
    logger.error(formatProblem(problem));
  }
  if (problems.length > 0) {
    logger.error(`docs:check found ${problems.length} problem(s)`);
    return { success: false };
  }
  logger.info(`docs:check passed: ${files} Markdown files checked`);
  return { success: true };
};
