---
type: job
area: dev
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
updated: "2026-11-15"
---

# CI

Continuous integration is how every change to Tenon is checked before the owner reviews it: a GitHub Actions workflow that runs the workspace's checks through Nx on every pull request. It serves Tenon's own developers and the department roles, whose rules say to run the checks locally until CI exists.

## How it works

Nothing runs yet. The workspace it will check is the root Nx project from [the Nx workspace job](../nx-workspace/nx-workspace.md).

## How it got here

The job starts with [#18](https://github.com/MDReal32/tenon/issues/18), the second code task of M0, stacked on the Nx workspace branch because it needs that workspace to run.

## Current state

[#18](https://github.com/MDReal32/tenon/issues/18) is in progress on `chore/dev/18-ci`, size S. [The BA readiness check](2026-11-14-ba-assistant-ci-readiness.md) returned a brief after the owner answered its questions: CI runs on Linux only, on a pinned `ubuntu-24.04`, on every pull request whatever its base and never on pushes, with a read-only `GITHUB_TOKEN` and no secrets. [The Programming dev analysis](2026-11-14-programming-dev-ci-analysis.md) planned one workflow with one job, and both halves of the gate approved it ([PO proxy](2026-11-15-po-proxy-ci-gate.md), [Architect gate](2026-11-15-architect-gate-ci.md)), which pinned the actions to commit SHAs, cancels superseded runs and names the check `Nx affected`. The Programming dev build is next, then the Docs writer for three stale lines, and DevOps' review.
