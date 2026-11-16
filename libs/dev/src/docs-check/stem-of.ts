import path from "node:path";

export const stemOf = (file: string) => path.posix.basename(file, ".md");
