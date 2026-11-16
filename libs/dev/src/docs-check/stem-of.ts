import { posix } from "node:path";

export const stemOf = (file: string) => posix.basename(file, ".md");
