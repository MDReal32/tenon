import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export const createFixture = async (files: Record<string, string>) => {
  const root = await mkdtemp(path.join(tmpdir(), "docs-check-"));
  for (const [relative, content] of Object.entries(files)) {
    const target = path.join(root, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  return root;
};
