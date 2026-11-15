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

[#18](https://github.com/MDReal32/tenon/issues/18) is built on `chore/dev/18-ci`, in PR 71, and waits for the owner's review. [The BA readiness check](2026-11-14-ba-assistant-ci-readiness.md) returned a brief after the owner answered its questions: CI runs on Linux only, on a pinned `ubuntu-24.04`, on every pull request whatever its base and never on pushes, with a read-only `GITHUB_TOKEN` and no secrets. [The Programming dev analysis and build](2026-11-14-programming-dev-ci-analysis.md) wrote one workflow with one job, after both halves of the gate approved the plan ([PO proxy](2026-11-15-po-proxy-ci-gate.md), [Architect gate](2026-11-15-architect-gate-ci.md)), which pinned the actions to commit SHAs, cancels superseded runs and names the check `Nx affected`. [DevOps](2026-11-15-devops-engineer-ci-review.md) approved it with no findings, the owner review found nothing, and [the Architect reviewer](2026-11-15-architect-reviewer-ci.md) approved it on attempt 2, after one finding about a missing handoff for [the department lines change](2026-11-15-session-ci-department-lines.md). The workflow ran on the PR and passed. Once PR 71 merges, the owner makes `Nx affected` a required check by hand, as the PR description says. Open for later, as Backlog issues: macOS CI, a job timeout and a hash on `packageManager`, the layout page's Corepack sentence, and who owns the overview and the knowledge files of departments with no code.
