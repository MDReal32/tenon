import { REPOSITORY } from "./config.mjs";
import { runGh } from "./run-gh.mjs";

export const fetchRepoEvents = () => {
  return runGh(["api", `repos/${REPOSITORY}/events?per_page=100`]);
};
