import { execFileSync } from "node:child_process";

export const runGh = args => {
  const output = execFileSync("gh", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  return JSON.parse(output);
};
