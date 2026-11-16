import { stemOf } from "./stem-of.ts";

export const expectedLink = (file: string | undefined) =>
  file === undefined ? "" : stemOf(file);
