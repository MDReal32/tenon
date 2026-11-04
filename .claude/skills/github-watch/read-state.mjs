import { existsSync, readFileSync } from "node:fs";

import { STATE_FILE } from "./config.mjs";

export const readState = () => {
  if (!existsSync(STATE_FILE)) {
    return null;
  }
  return JSON.parse(readFileSync(STATE_FILE, "utf8"));
};
