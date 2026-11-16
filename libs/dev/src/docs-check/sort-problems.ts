import { formatProblem } from "./format-problem.ts";
import type { Problem } from "./problem.ts";

export const sortProblems = (problems: Problem[]) => {
  const unique = new Map(
    problems.map((problem) => [formatProblem(problem), problem]),
  );
  return [...unique.values()].sort(
    (a, b) =>
      a.path.localeCompare(b.path) ||
      a.line - b.line ||
      a.message.localeCompare(b.message),
  );
};
