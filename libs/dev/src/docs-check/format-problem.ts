import type { Problem } from "./problem.ts";

export const formatProblem = (problem: Problem) =>
  `${problem.path}:${problem.line} ${problem.message}`;
