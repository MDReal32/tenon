import { dirname, join, relative, resolve } from "node:path";
import type { CheckContext } from "./check-context.ts";
import { decodePercent } from "./decode-percent.ts";
import type { LoadedDocument } from "./loaded-document.ts";
import type { Reference } from "./reference.ts";
import { resolveExistingPath } from "./resolve-existing-path.ts";

const EXTERNAL = /^([a-z][a-z0-9+.-]*:|\/\/)/i;

export const checkLink = async (
  document: LoadedDocument,
  reference: Reference,
  context: CheckContext,
) => {
  const { url, line } = reference;
  if (url === "" || EXTERNAL.test(url)) {
    return undefined;
  }

  const problem = (message: string) => ({
    path: document.path,
    line,
    message,
  });

  const hashIndex = url.indexOf("#");
  const rawPath = (hashIndex === -1 ? url : url.slice(0, hashIndex)).split(
    "?",
  )[0];
  const rawFragment = hashIndex === -1 ? "" : url.slice(hashIndex + 1);
  const decodedPath = decodePercent(rawPath ?? "");
  const fragment = decodePercent(rawFragment);
  if (decodedPath === undefined || fragment === undefined) {
    return problem(`broken link "${url}": invalid percent-encoding`);
  }

  const documentPath = join(context.root, document.path);
  let target = documentPath;
  if (decodedPath.startsWith("/")) {
    target = join(context.root, decodedPath);
  } else if (decodedPath !== "") {
    target = resolve(dirname(documentPath), decodedPath);
  }

  const kind = await resolveExistingPath(
    context.root,
    target,
    context.listDirectory,
  );
  const shown = relative(context.root, target) || document.path;
  if (kind === undefined) {
    return problem(`broken link "${url}": ${shown} does not exist`);
  }

  if (fragment !== "" && kind === "file" && target.endsWith(".md")) {
    const slugs = await context.headingSlugs(target);
    if (!slugs.has(fragment)) {
      return problem(
        `broken anchor "#${fragment}": no such heading in ${shown}`,
      );
    }
  }
  return undefined;
};
