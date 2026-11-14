---
type: job
area: dev
status: planned
tasks:
  - "https://github.com/MDReal32/tenon/issues/19"
updated: "2026-11-14"
---

# libs/dev

`libs/dev` is Tenon's own tooling library, `@tenon/dev`: a TypeScript package run through Nx that holds the workspace's generators and executors, the docs check among them. It serves Tenon's developers and the department roles, which run the checks and create new packages with what it builds, as [the repository layout](../../../06-project/00-repository-layout.md) says.

## How it works

Nothing is built yet. It will sit on the root Nx workspace of [the Nx workspace job](../nx-workspace/nx-workspace.md).

## How it got here

The job starts with [#19](https://github.com/MDReal32/tenon/issues/19), the docs check, stacked on the Nx workspace branch because it needs that workspace.

## Current state

[#19](https://github.com/MDReal32/tenon/issues/19) is parked on `chore/dev/19-docs-check`: [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md) found five open questions, and proposed splitting the task into the `@tenon/dev` library and the docs check executor. The questions wait on the owner's answers on the issue.
