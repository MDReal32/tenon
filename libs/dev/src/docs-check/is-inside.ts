import path from "node:path";

export const isInside = (relative: string) =>
  relative !== ".." &&
  !relative.startsWith(`..${path.sep}`) &&
  !path.isAbsolute(relative);
