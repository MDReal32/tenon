---
type: job
area: dev
status: planned
tasks:
  - "https://github.com/MDReal32/tenon/issues/19"
  - "https://github.com/MDReal32/tenon/issues/77"
  - "https://github.com/MDReal32/tenon/issues/78"
updated: "2026-11-15"
---

# libs/dev

`libs/dev` is Tenon's own tooling library, `@tenon/dev`: a TypeScript package run through Nx that holds the workspace's generators and executors, the docs check among them. It serves Tenon's developers and the department roles, which run the checks and create new packages with what it builds, as [the repository layout](../../../06-project/00-repository-layout.md) says.

## How it works

The library exists as a project in the root Nx workspace of [the Nx workspace job](../nx-workspace/nx-workspace.md): `libs/dev/package.json` only, listed in the root `workspaces`, with no source and no targets yet.

## How it got here

The job starts with [#19](https://github.com/MDReal32/tenon/issues/19), the docs check, stacked on the Nx workspace branch because it needs that workspace.

## Current state

[#19](https://github.com/MDReal32/tenon/issues/19) was split by [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md) after the owner answered its five questions on 2026-11-15: first [#77](https://github.com/MDReal32/tenon/issues/77), the `@tenon/dev` library at `libs/dev`, then [#78](https://github.com/MDReal32/tenon/issues/78), the docs check executor built in it. Both sub-issues are open in `Backlog` and wait for the gate. #78 chains on #77's branch, and [#21](https://github.com/MDReal32/tenon/issues/21), the crate generator, needs #77 too.  [The build of #77](2026-11-15-programming-dev-libs-dev-library.md) created the bare `@tenon/dev` package (`type` `commonjs`) and proved Nx lists it; [the Docs writer](2026-11-15-docs-writer-libs-dev-library.md) added one sentence on the layout page naming `libs/dev` as the second Nx project; the build waits on the owner and DevOps review, and the Architect reviewer.
