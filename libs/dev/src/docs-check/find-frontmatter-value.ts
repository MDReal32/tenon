import type { FrontmatterValue } from "./frontmatter-value.ts";

const FRONTMATTER_FIRST_LINE = 2;

export const findFrontmatterValue = (frontmatter: string[], key: string) => {
  const prefix = `${key}:`;
  const index = frontmatter.findIndex((line) => line.startsWith(prefix));
  if (index === -1) {
    return undefined;
  }
  const raw = (frontmatter[index] ?? "").slice(prefix.length).trim();
  const value: FrontmatterValue = {
    value: raw.replace(/^(["'])(.*)\1$/, "$2"),
    line: FRONTMATTER_FIRST_LINE + index,
  };
  return value;
};
