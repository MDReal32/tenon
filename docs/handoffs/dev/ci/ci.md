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

`.github/workflows/ci.yml` runs one job, `Nx affected`, on every pull request: it installs Node from `engines`, Corepack and the locked dependencies, then runs `yarn nx affected -t lint test build check` against the pull request's base commit. The workspace it will check is the root Nx project from [the Nx workspace job](../nx-workspace/nx-workspace.md).

## How it got here

The job starts with [#18](https://github.com/MDReal32/tenon/issues/18), the second code task of M0, stacked on the Nx workspace branch because it needs that workspace to run.

## Current state

[#18](https://github.com/MDReal32/tenon/issues/18) is in progress on `chore/dev/18-ci`, size S. [The BA readiness check](2026-11-14-ba-assistant-ci-readiness.md) returned a brief after the owner answered its questions: CI runs on Linux only, on a pinned `ubuntu-24.04`, on every pull request whatever its base and never on pushes, with a read-only `GITHUB_TOKEN` and no secrets. [The Programming dev analysis](2026-11-14-programming-dev-ci-analysis.md) planned one workflow with one job, and both halves of the gate approved it ([PO proxy](2026-11-15-po-proxy-ci-gate.md), [Architect gate](2026-11-15-architect-gate-ci.md)), which pinned the actions to commit SHAs, cancels superseded runs and names the check `Nx affected`. The Programming dev build wrote the workflow and its local checks passed, and its first run on PR 71 passed. [The DevOps review](2026-11-15-devops-engineer-ci-review.md) approved the workflow with no findings; it could not check the two action SHAs against their release tags, which PM checks with `gh`. Next is the owner's review of PR 71.

The three lines that said CI didn't exist yet (the overview's Running section, `pm-knowledge.md` and `devops-knowledge.md`) were updated in the same PR by the owner's direct session, since no role's part holds them: the Docs writer's rules leave department files out and PM writes no docs.
