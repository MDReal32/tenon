---
type: job
area: dev
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
updated: "2026-11-14"
---

# CI

Continuous integration is how every change to Tenon is checked before the owner reviews it: a GitHub Actions workflow that runs the workspace's checks through Nx on every pull request to `develop`. It serves Tenon's own developers and the department roles, whose rules say to run the checks locally until CI exists.

## How it works

Nothing runs yet. The workspace it will check is the root Nx project from [the Nx workspace job](../nx-workspace/nx-workspace.md).

## How it got here

The job starts with [#18](https://github.com/MDReal32/tenon/issues/18), the second code task of M0, stacked on the Nx workspace branch because it needs that workspace to run.

## Current state

[#18](https://github.com/MDReal32/tenon/issues/18) is parked on `chore/dev/18-ci`: [the BA readiness check](2026-11-14-ba-assistant-ci-readiness.md) found four open questions about scope, the required check, the `GITHUB_TOKEN` and the runner images, and they wait on the owner's answers on the issue.
