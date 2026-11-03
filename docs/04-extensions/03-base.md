---
title: Tenon Base
prev: "[[02-authoring-tools]]"
next: "[[00-distribution]]"
covers:
  - extensions/base
---

# Tenon Base

Base is the extension that gives Tenon its default experience. This page covers what it holds, what it deliberately doesn't, and how CI keeps it from getting anything a community extension can't.

Base = an ordinary extension (`tenon.base`) in its own package/repo-path, with:
- generic decisions: project name, directory, language, project type, package manager, license, VCS, CI, formatting/testing …
- *no* language support itself — language packs are separate extensions (`tenon.lang-rust`, `tenon.lang-ts`, `tenon.lang-python`, …) that Base’s decisions let them hook into. Base may be bundled/pre-installed for first-run UX but is loaded through the exact same path as any extension.

**Anti-cheating enforcement** (CI):
1. Dependency lint: `tenon-base` may import only protocol/SDK crates.
2. Engine has no reference to the string `tenon.base` (grep test).
3. Run the full e2e suite with Base loaded from an *external directory* as a plain third-party extension.
4. Base is built with the same SDK users get; a public-API gap found by Base is fixed in the API.

The next chapter is [distribution](../05-distribution/00-distribution.md): how people get Tenon at all.
