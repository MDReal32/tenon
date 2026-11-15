---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-16"
status: done
branch: chore/dev/78-docs-check
pr: 84
---

# Owner review of the docs check

PM asked for the owner review of [#78](https://github.com/MDReal32/tenon/issues/78), attempt 1, from a fresh run of the Programming dev role that did not build the docs check, before the Architect reviewer sees it. The change adds the `docs-check` executor to `@tenon/dev` on the [libs/dev](libs-dev.md) job and runs it from the root project as `docs:check`. It continues [the build](2026-11-15-programming-dev-docs-check-analysis.md), [the Docs writer's step](2026-11-16-docs-writer-docs-check.md) and [the DevOps review](2026-11-16-devops-engineer-docs-check-review.md), and is judged against [the Architect gate's](2026-11-15-architect-gate-docs-check.md) eight build conditions. The verdict is approved, with three small non-blocking findings on the one-file-one-entity rule and one stale link I fixed in the job note.

## What I did and how

I read the handbook, Programming's rules and the dev role's rules with their `CLAUDE.md` files, passed the start-up check (model `claude-sonnet-5-5`, tools as the agent file lists), then read the gate verdict and the DevOps review, the diff against `develop` and every source file under `libs/dev/src/docs-check/`, the executor registration, `libs/dev/package.json`, `tsconfig.json`, the root `project.json` and the root `package.json` change. I changed no file under review.

On Node v26.13.1 I ran `yarn nx run @tenon/dev:test`, `@tenon/dev:typecheck`, `@tenon/dev:lint` and `yarn nx run @tenon/source:docs:check`, each with `--skip-nx-cache`; all four passed, and the check reports 178 Markdown files checked. I then planted throwaway untracked files under `docs/` and ran the check against them, deleting them after each round (`git status` was clean at the end). A page with a broken relative link, a broken anchor into `docs/tenon.md`, an unknown wikilink and a wikilink with an unknown heading was reported with the real lines (3, 7, 9, 11). A second file named like an existing page gave one problem on each of the two paths, both on line 1, each naming the other. A numbered page with a wrong `prev` and `next` was reported on frontmatter lines 2 and 3, and the neighbours' chain problems on their own `prev`/`next` lines; an unknown wikilink in frontmatter was reported on line 2. A link from `docs/` to a Markdown file outside it (`.claude/agents/architect-gate.md`) passed when the file existed and failed with a broken anchor when its heading did not. A link in a table cell was caught on its real line (15). A link to another website, a link to a directory, an indented code block, a fenced block and inline code (a link and a wikilink inside it) were all skipped. A link to a missing file outside `docs/` failed as a broken link. I also ran `yarn nx show project @tenon/source --json` (name `@tenon/source`, inferred `lint`, and `docs:check` with the executor, `cache: true` and the whole-workspace input) and `yarn nx show projects --affected --files=libs/dev/src/docs-check/executor.ts`, which lists `@tenon/dev` and `@tenon/source`.

## Why this way

The eight build conditions hold. Condition 1: the executor loads through Nx on Node 26 with the ESM-only parser graph, the test target runs and finds its files, and no file uses a top-level await. Condition 2: every dependency in `libs/dev/package.json` is an exact pin, `@types/node` included, and DevOps walked the lockfile. Condition 3: `typecheck` runs `tsc` with the plan's options and passes. Condition 4 is shown above. Condition 5: the frontmatter is split off and its offset added to every reported line, `link`, `image` and `definition` nodes are collected, a problem is reported once because `sortProblems` keys on its formatted text, a percent-encoded path is decoded, and the slugger is created per file in `collectHeadingSlugs`. Condition 6: only `.md` files are collected, and a test covers a JSON file. Condition 7: the executor prints through the `@nx/devkit` logger, takes the root from `context.root`, tests build their fixtures in a temporary directory, and no `console` call or inline comment exists in the source. Condition 8: the check passes on today's `docs/`; PM must run it once more after the last handoff commit, since my handoff and the job note change land after my run.

The code reads correctly. File existence goes through a directory listing so a link is case-sensitive on every platform, an anchor is checked only on Markdown targets, a wikilink may name a stem, a path or a folder, and an ambiguous stem passes when any of its files has the heading. The chain is built from the sorted numbered chapters and pages, so a stray numbered page joins the chain and shows up as chain problems on its neighbours, which is the right result.

Three findings, none blocking. First, the one-file-one-entity rule in [general.md](../../../../.claude/rules/code-style/general.md) asks for an extracted named helper in its own file, yet four files keep a helper beside the main function: `isInside` in `resolve-existing-path.ts`, `listEntries` in `create-directory-lister.ts`, and `stemOf`, `expectedLink` and `actualLink` in `check-chain.ts`. Moving each into its own file would fix it. Second, `FRONTMATTER_FIRST_LINE` is declared twice, in `collect-wikilinks.ts` and `find-frontmatter-value.ts`; one shared file would remove the duplicate. Third, `find-wikilinks.ts` exports the `WikilinkMatch` interface next to the function; a file of its own would match how the other interfaces are kept. Two behaviours are worth knowing, not changing: a wikilink line inside a text node assumes the node's value keeps its source newlines, and a link reference such as `[text][ref]` with no definition is not checked, since the task named only links, images and definitions.

A stale link in the job note was fixed with this handoff: the sentence about the crate generator linked `#78` to issue 21, so it now says `#21`. That edit falls under the job note's own update rule, not under the docs check.

## Checks

Test, typecheck, lint and `docs:check` passed as above. The planted-file trials covered the four failure cases and the skipped code, as above. A planted type error and a failing test were not re-run, since the DevOps review ran them on this branch. After writing this handoff and the job note update I ran `docs:check` again (see the result under "Where it stands").

## Where it stands

Done. After this handoff and the job note update, `docs:check` passed on 179 Markdown files. The verdict is approved with the three non-blocking findings above, for the Architect reviewer to weigh; fixing them is a small follow-up in this PR or a later one. This handoff and the job note's "Current state" are committed together. The size is XL, one PR over the guide for the one criterion, as the gate said. Nothing waits on the owner.

## Next

The Architect reviewer reviews PR 84. PM runs `yarn nx run @tenon/source:docs:check` once more after the last handoff commit. CI still does not run `typecheck` or `docs:check`, a Backlog candidate already reported.
