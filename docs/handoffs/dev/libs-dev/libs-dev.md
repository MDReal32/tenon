---
type: job
area: dev
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/19"
  - "https://github.com/MDReal32/tenon/issues/77"
  - "https://github.com/MDReal32/tenon/issues/78"
updated: "2026-11-16"
---

# libs/dev

`libs/dev` is Tenon's own tooling library, `@tenon/dev`: a TypeScript package run through Nx that holds the workspace's generators and executors, the docs check among them. It serves Tenon's developers and the department roles, which run the checks and create new packages with what it builds, as [the repository layout](../../../06-project/00-repository-layout.md) says.

## How it works

The library is a project in the root Nx workspace of [the Nx workspace job](../nx-workspace/nx-workspace.md), listed in the root `workspaces`. It holds the `docs-check` executor under `src/docs-check/`, with `lint`, `typecheck` and `test` as inferred targets, and the root project runs it as `docs:check`.

## How it got here

The job starts with [#19](https://github.com/MDReal32/tenon/issues/19), the docs check, stacked on the Nx workspace branch because it needs that workspace.

## Current state

[#19](https://github.com/MDReal32/tenon/issues/19) was split by [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md) after the owner answered its five questions on 2026-11-15: first [#77](https://github.com/MDReal32/tenon/issues/77), the `@tenon/dev` library at `libs/dev`, then [#78](https://github.com/MDReal32/tenon/issues/78), the docs check executor built in it. [#77](https://github.com/MDReal32/tenon/issues/77) passed both halves of the gate ([PO proxy](2026-11-15-po-proxy-libs-dev-gate.md), [Architect gate](2026-11-15-architect-gate-libs-dev-library.md), size S) and merged into `develop` as PR 79. [#21](https://github.com/MDReal32/tenon/issues/21), the crate generator, needs #77 too. [The build](2026-11-15-programming-dev-libs-dev-library.md) created the bare `@tenon/dev` package and proved Nx lists it; [the Docs writer](2026-11-15-docs-writer-libs-dev-library.md) added one sentence on the layout page naming `libs/dev` as the second Nx project. [The DevOps review](2026-11-15-devops-engineer-libs-dev-review.md) requested one change in attempt 1: `"type": "commonjs"` stops Nx 24.0.6 from loading ESM-syntax `.ts` under Node 26's native type stripping, so the package is `"type": "module"`; attempt 2 approved it. [The owner review](2026-11-15-programming-dev-libs-dev-owner-review.md) and [the Architect reviewer](2026-11-15-architect-reviewer-libs-dev-library.md) approved with no findings. The library is bare on purpose: no source and no targets, which arrive with #78 and #21. #78's plan must still keep a lint running under `nx affected` for a change confined to `libs/dev`. With `"type": "module"`, its TypeScript must also use `.ts` extensions in relative imports and no top-level await.

[#78](https://github.com/MDReal32/tenon/issues/78) is on `chore/dev/78-docs-check`, cut from `develop` after PR 79 merged. [The Programming dev analysis](2026-11-15-programming-dev-docs-check-analysis.md) plans an `@tenon/dev` executor with a root `docs:check` target, a Markdown parser and the `node:test` runner. [The BA assistant](2026-11-15-ba-assistant-docs-check-questions.md) settled that CI stays untouched in this PR and asked the owner two questions, which the owner answered: an anchor on a Markdown file outside `docs/` is checked against that file's headings, and so is a wikilink's heading. Both gate halves approved: [the PO proxy](2026-11-15-po-proxy-docs-check-gate.md) with no questions, and [the Architect gate](2026-11-15-architect-gate-docs-check.md) at size XL as one PR over the size guide, with eight build conditions and DevOps added to the route. The build then added the executor, its 21 tests, the root `docs:check` target and the pinned dependencies, and the check passes on today's `docs/` ([the build handoff](2026-11-15-programming-dev-docs-check-analysis.md) has the details). [The Docs writer](2026-11-16-docs-writer-docs-check.md) updated the layout page, and [the DevOps review](2026-11-16-devops-engineer-docs-check-review.md) approved with no findings. [The owner review](2026-11-16-programming-dev-docs-check-owner-review.md) approved with three non-blocking findings on the one-file-one-entity rule and one shared constant, after running all four targets and the four failure cases against throwaway pages. The build's second and third attempts fixed those three findings and then the [Architect reviewer](2026-11-16-architect-reviewer-docs-check.md)'s attempt 1 findings: explicit return types and default imports removed, a test added for the case-exact link resolution (22 tests now), the Docs knowledge page and the layout page's `covers` brought up to date, and `pr: 84` set on this PR's handoffs. Its attempt 2, a fresh run, approved with no findings. What is left over, for later PRs: the Docs and HR rules still say the check does not exist yet, which is HR's own rule-change PR, the other departments' knowledge files still say no code exists, and CI does not run `typecheck` or `docs:check` yet. PR 84 is ready for the owner's review.
