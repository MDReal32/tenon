import { isAbsolute, sep } from "node:path";

export const isInside = (relative: string) =>
  relative !== ".." &&
  !relative.startsWith(`..${sep}`) &&
  !isAbsolute(relative);
