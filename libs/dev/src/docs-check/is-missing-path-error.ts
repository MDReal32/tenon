const MISSING_CODES = new Set(["ENOENT", "ENOTDIR"]);

export const isMissingPathError = (error: unknown) =>
  error instanceof Error &&
  "code" in error &&
  typeof error.code === "string" &&
  MISSING_CODES.has(error.code);
