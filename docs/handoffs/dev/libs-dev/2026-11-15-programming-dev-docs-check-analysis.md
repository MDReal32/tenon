---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-15"
status: done
branch: chore/dev/78-docs-check
pr:
---

# Programming dev analysis of the docs check

PM asked the Programming dev role, as specialist, to analyze [#78](https://github.com/MDReal32/tenon/issues/78), the docs check in `@tenon/dev`, before the gate: what it touches, how it would be built, which tests prove each criterion, and which open points the earlier handoffs left for its plan. The task is the second sub-issue of [#19](https://github.com/MDReal32/tenon/issues/19) on the [libs/dev](libs-dev.md) job. It builds on [the library task's gate verdict](2026-11-15-architect-gate-libs-dev-library.md), whose condition 7 fixes the shape #78 must keep. The step produced a plan only, in two attempts: no code, no config, no commit. Attempt 1 ended in two questions for [the BA assistant](2026-11-15-ba-assistant-docs-check-questions.md), whose answers and the owner's two answers shaped attempt 2. PM wrote this handoff from the role's replies, and the build run will update it instead of writing another.

## What I did and how

The role read the job note and every handoff, the rules the check enforces, the code-style rules, the layout page, the installed versions in `node_modules` and the CI workflow. It ran experiments in scratch copies outside the repository and left nothing in the repository.

The plan adds, in `libs/dev`, an executor `docs-check` declared in `executors.json` with an implementation path that names an export after `#`, a `tsconfig.json`, and about seventeen source files in `src/docs-check/`, one entity each, with a test beside each. The `package.json` gains `lint`, `typecheck` and `test` scripts that Nx infers as targets, and exactly pinned dependencies: `@nx/devkit` at the workspace's Nx version 24.0.6, `mdast-util-from-markdown`, `mdast-util-to-string` and `github-slugger`, plus `typescript` and `@types/node` as dev dependencies. The root gets a `project.json` holding the `docs:check` target, which runs the executor with `cache: true` and the whole workspace as `inputs`, and a `workspace:*` dev dependency on `@tenon/dev`, so a change to the library re-runs the check. `.github/workflows/ci.yml` is not touched, as the BA settled from the task's own wording.

The check parses Markdown with a real parser instead of line scanning, so code blocks and inline code are separate node types and "skips code" is true by construction. Links with a scheme are ignored. A link target must exist with exact case, found segment by segment through the directory listing, since macOS would let a wrong case pass and Linux would not. An anchor on a Markdown file must equal the GitHub slug of one of its headings, and by the owner's answer 1 this holds for a Markdown file outside `docs/` too, reading only that file's headings. Wikilinks are read from body text and every frontmatter line and must resolve to a file stem or folder path under `docs/`. By the owner's answer 2 a wikilink's heading must exist too, matched by slugging the written text with the same GitHub slugger as Markdown anchors. A wikilink name that several files share does not fail, since the criterion names no ambiguity case. Duplicate file names are grouped case-insensitively, and only `README.md`, `RULES.md` and `CLAUDE.md` under `docs/departments/` may repeat. The `prev`/`next` chain runs from `docs/tenon.md` through each `docs/NN-*/` page in folder and file order, with the two ends empty. Output is one `path:line message` per problem, sorted, then a count, and a failure returns `success: false` so Nx exits non-zero.

A throwaway script in the scratchpad read the 172 Markdown files under `docs/` and found no broken link, anchor or wikilink, no duplicate name outside the triplets and a consistent chain over 17 pages. The four anchors into `.claude/rules/*.md` point at headings that exist. The real run is expected to need zero to a few doc fixes.

## Why this way

The test runner is `node:test`, because it needs no dependency or transform, runs `.ts` natively on Node 26, and the repository already has one such test; Vitest and Jest each add a dependency tree and a transform for nothing. A Markdown parser beat a hand-written scanner, which is fragile on nested brackets, angle-bracket destinations, multi-line code spans and reference definitions. The `docs:check` target sits on the root project, because `docs/` is its files and a docs-only change would never make `@tenon/dev` affected; the fallback is the target on `@tenon/dev` with `implicitDependencies` on the root. The target is not named `check`, so CI's `lint test build check` does not run it silently. The cache inputs are the whole workspace, since links and outside anchors can reach any file and a narrower list would serve a stale pass after a linked file is deleted. Giving `@tenon/dev` its own `lint` script closes the gap where a change confined to `libs/dev` ran no lint under `nx affected`; the role tried it and Biome finds the root config. Slugging both sides of a wikilink heading with one function keeps "the same rule as Markdown anchors" literal, instead of adding an Obsidian-style text match as a second rule. An anchor on a non-Markdown file, such as a line anchor, is not checked: no such link exists in today's docs and a line anchor is not a heading.

## What the build did

The build run (Programming dev, attempt 1, on Node 26.13.1) followed the plan and the Architect gate's eight conditions. It added, in `libs/dev`, `executors.json` with the `docs-check` executor (`./src/docs-check/executor.ts#docsCheckExecutor`), `src/docs-check/schema.json`, a `tsconfig.json` and the `executors`, `lint`, `typecheck` and `test` entries of `package.json`. The source is one entity per file under `src/docs-check/`: frontmatter splitting with a line offset, a `load-document` step, a walker over mdast nodes, the collection of `link`, `image` and `definition` nodes, one function each for a link, a wikilink, the duplicate names and the `prev`/`next` chain, a case-exact path resolver that lists directories, a heading slug cache, and `run-docs-check.ts`, which the executor calls. The executor prints through the `@nx/devkit` logger, takes the root from `context.root` and returns `success: false` when any problem is found. The root got `project.json` with the `docs:check` target (executor, `cache: true`, whole-workspace `inputs`) and the `workspace:*` dev dependency on `@tenon/dev`. Tests are `node:test` files beside the code, with fixtures built in a temp directory by `create-fixture.ts`: 21 tests. They cover a link in a table row, a fenced block, an indented block and inline code, the real line below the frontmatter, percent-encoded paths, anchors inside and outside `docs/`, wikilinks and their headings in body and frontmatter, duplicates (a JSON file under `docs/` is not one) and the chain.

Pinned exactly, each confirmed on npm first: `@nx/devkit` 24.0.6, `github-slugger` 2.0.0, `mdast-util-from-markdown` 2.1.0, `mdast-util-to-string` 4.0.0, and as dev dependencies `@types/mdast` 4.0.4, `@types/node` 26.6.6, `typescript` 7.0.2, plus `nx` 24.0.6. Two additions go beyond the plan. `nx` is a dev dependency of `@tenon/dev` because `@nx/devkit` peers on it and Yarn otherwise warned that the package did not provide it, which condition 2 forbids. `@types/mdast` is declared because the code imports its types directly instead of relying on a hoisted copy. The tsconfig sets `types: ["node"]` explicitly.

Choices the plan left to the build: a markdown anchor is compared exactly with the GitHub slug; a wikilink heading is slugged with the same slugger and, with several `#` parts, the last one is used; a link target may be a directory, which passes; a `/`-rooted link resolves from the workspace root; a malformed percent-encoding is reported as a problem. Duplicate names are grouped case-insensitively, `README.md`, `RULES.md` and `CLAUDE.md` may repeat only under `docs/departments/`, and a triplet name that also exists outside it is reported with every path.

## Checks

All on Node 26.13.1 through Nx. `yarn nx run @tenon/dev:test` found and passed 21 tests, and a planted failing test made the target exit 1. `yarn nx run @tenon/dev:typecheck` passed, and a planted type error failed it with TS2322. TypeScript 7.0.2 accepted every `tsconfig.json` option. `yarn nx run @tenon/dev:lint` and `yarn biome check .` passed. `yarn install --immutable` passed, and the only remaining peer warning is the existing `@monodon/rust` one for `@napi-rs/cli`. `yarn nx show projects` still lists `@tenon/dev` and `@tenon/source`. `yarn nx show project @tenon/source --json` keeps `lint` and shows `docs:check` with the executor, cache and inputs. `yarn nx show projects --affected --files=libs/dev/src/docs-check/executor.ts` lists both projects. `yarn nx run @tenon/source:docs:check` loaded the executor through the `workspace:*` link, ran the ESM mdast graph and passed on 176 Markdown files.

## Where it stands

Done. The docs check is built and committed on the task branch, and it finds no problem in today's `docs/`, so no doc fix is needed. Nothing under `docs/` outside this handoff and the job note was changed. `typecheck` and `docs:check` still do not run in CI, which is outside this task.

## Next

The Docs writer updates the layout page's `libs/dev` sentence. DevOps reviews the root `project.json`, the `workspace:*` dependency, the added `nx` dev dependency and the affected behaviour. PM runs `yarn nx run @tenon/source:docs:check` once more after the last handoff commit. HR changes the Docs and HR rules afterwards as its own PR.
