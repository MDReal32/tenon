import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

export const createFixture = async (files: Record<string, string>) => {
  const root = await mkdtemp(join(tmpdir(), "docs-check-"));
  for (const [relative, content] of Object.entries(files)) {
    const target = join(root, relative);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  return root;
};
