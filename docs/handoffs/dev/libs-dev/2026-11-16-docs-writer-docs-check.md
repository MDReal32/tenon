---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: docs-writer
model: claude-sonnet-5-5
date: "2026-11-16"
status: done
branch: chore/dev/78-docs-check
pr: 84
---

# Docs writer: the layout page after the docs check

The Docs writer step of [#78](https://github.com/MDReal32/tenon/issues/78), the docs check in `@tenon/dev`, was to bring the book in line with what the build added, which the [libs-dev job](libs-dev.md) records. The one claim the build made untrue was the repository layout page's sentence saying `libs/dev` had no source or targets yet.

## What I did and how

I rewrote that sentence on [the repository layout page](../../../06-project/00-repository-layout.md). It now says `libs/dev` holds the docs check executor with its tests and has `lint`, `typecheck` and `test` targets, and that the root project runs the executor as its cached `docs:check` target, naming what it fails on. The `covers` frontmatter already lists `libs/dev` and the tree comment already says "docs check", so neither changed. I then searched every Markdown file outside `docs/handoffs` and `docs/departments` for `libs/dev`, `@tenon/dev` and the docs check. The roadmap sentence describes the check as future M0 work in a way that stays true as a roadmap, and `libs/dev` has no README, so nothing else needed a fix.

## Attempt 2

The [Architect review](2026-11-16-architect-reviewer-docs-check.md) raised two findings, both fixed. Finding 4: [the Docs knowledge page](../../../departments/docs/docs-knowledge.md) still said no code exists and that the docs check is future work. It now says no package has a `README.md` yet, and that the check exists as the `docs-check` executor in `libs/dev`, run with `yarn nx run @tenon/source:docs:check`. Finding 5: the layout page's `covers` now lists `project.json`, where the root `docs:check` target lives. I searched `docs/departments` outside `RULES.md` files for other lines saying the check does not exist. Only the Docs knowledge page was about it, so nothing else changed. Both checks, the docs check with `--skip-nx-cache` and the root `lint`, passed.

## Why this way

I kept the package's details (the file layout, the individual rules beyond a one-clause summary) out of the book, as the brief and the docs rules ask, since the executor's own code and tests are the contract. I left the roadmap alone because it states what M0 contains, not that the check is missing.

## Checks

I ran `yarn nx run @tenon/source:docs:check --skip-nx-cache` with Node 26 first on `PATH` after the edit, and it passed. `yarn install --immutable` ran first and succeeded.

## Where it stands

Done, attempt 2 included. The edit and this handoff are committed together on the task branch. No open questions. The Docs rules still say to check by reading until `libs/dev` has the check; that line lives in a `RULES.md`, which is outside my part, so I left it for PM to route to HR.

## Next

PM continues the pipeline with the next review step. `docs/departments/architect/architect-knowledge.md` line 8 still says the tooling "will live in" `libs/dev`, and the Programming and PM knowledge files have similar future-tense lines; they belong to other departments, so I left them for PM. HR may update the Docs checks rule to name `yarn nx run @tenon/source:docs:check` now that it exists.
