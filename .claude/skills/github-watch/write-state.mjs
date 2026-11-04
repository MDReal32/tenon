import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { STATE_FILE } from "./config.mjs";

export const writeState = state => {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`);
};
