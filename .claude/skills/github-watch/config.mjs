import { homedir } from "node:os";
import { join } from "node:path";

export const REPOSITORY = "MDReal32/tenon";
export const PROJECT_OWNER = "MDReal32";
export const PROJECT_NUMBER = "4";
export const POLL_SECONDS = 60;
export const STATE_FILE = join(homedir(), ".cache", "tenon", "github-watch.json");
export const OWN_COMMENT_PREFIX = "🤖";
