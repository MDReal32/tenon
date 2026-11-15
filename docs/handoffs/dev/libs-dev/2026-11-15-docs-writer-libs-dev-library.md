---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/77"
role: docs-writer
model: claude-sonnet-5-5
date: "2026-11-15"
status: done
branch: chore/dev/77-libs-dev-library
pr:
---

# Docs for the @tenon/dev library

The Docs writer was asked whether [#77](https://github.com/MDReal32/tenon/issues/77), which adds the bare private package `@tenon/dev` at `libs/dev` and lists it in the root `workspaces`, changes anything the design book or a README says. It continues [the build](2026-11-15-programming-dev-libs-dev-library.md) and [the Architect gate](2026-11-15-architect-gate-libs-dev-library.md).

## What I did and how

I read the build's `libs/dev/package.json`, then [the repository layout](../../../06-project/00-repository-layout.md) and [the roadmap](../../../06-project/01-roadmap.md). The layout page already lists `libs/dev/` in its tree, with its purpose, and covers `libs/dev` in its frontmatter, so the tree needed no change. Its prose said the root "is itself the first Nx project", which is still true but now leaves out the second project, so I added one sentence after it: `libs/dev` is the second, the private package `@tenon/dev`, listed in the root `workspaces`, holding only its `package.json` with no source or targets yet. The roadmap only speaks of `libs/dev` as a milestone item ("with its docs check and generators") and stays true, so I left it alone.

## Why this way

The M0 docs rule names crates, SDKs and extensions, not libraries, so it did not strictly require a page change. I made the one-sentence edit anyway because the page describes the Nx projects of the workspace and would otherwise show one where there are two. I did not word it as "will" or promise the docs check, since that belongs to #78. I did not touch the Node 26 "with Corepack" sentence, which has its own task (#74), nor any `RULES.md` or knowledge file. The sentence is plain about the empty state, so #78 only needs to extend it. I also brought the job note's "Current state" up to date as the rules ask.

## Checks

The docs check does not exist yet, so I checked by reading. No link, anchor, `prev`/`next` pair or `covers` path changed: the page's `covers` already includes `libs/dev`, and its `prev`/`next` are untouched.

## Where it stands

Done and committed. Nothing is open for the owner from this step.

## Next

The owner, DevOps review and the Architect reviewer review the build. Then #78 builds the docs check in `libs/dev` and should update the sentence on the layout page to say what the library now holds.
