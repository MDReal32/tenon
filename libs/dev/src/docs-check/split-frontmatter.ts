import type { SplitDocument } from "./split-document.ts";

const FENCE = "---";

export const splitFrontmatter = (source: string): SplitDocument => {
  const lines = source.split(/\r?\n/);
  if (lines[0]?.trimEnd() !== FENCE) {
    return { frontmatter: [], body: source, lineOffset: 0 };
  }

  const end = lines.findIndex(
    (line, index) => index > 0 && line.trimEnd() === FENCE,
  );
  if (end === -1) {
    return { frontmatter: [], body: source, lineOffset: 0 };
  }

  return {
    frontmatter: lines.slice(1, end),
    body: lines.slice(end + 1).join("\n"),
    lineOffset: end + 1,
  };
};
