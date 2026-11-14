---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-14"
status: blocked
branch: chore/dev/18-ci
pr:
---

# BA readiness check of the CI task

PM asked the BA assistant to check [#18](https://github.com/MDReal32/tenon/issues/18) against BA's definition of ready, and to return either a brief or questions for the owner. The task adds CI on GitHub Actions: every pull request to `develop` runs the workspace's `lint`, `test`, `build` and `check` targets, for the projects the change affects, through Nx on Ubuntu and macOS runners, with no secrets, and a failing target fails the run. It is the first step on the [CI](ci.md) job and stacks on [#17](https://github.com/MDReal32/tenon/issues/17), whose [Nx workspace](../nx-workspace/nx-workspace.md) job built the root the workflow will run against. This first attempt ended in four questions for the owner.

## What I did and how

I took the task text from PM's assignment; the issue has no owner comments. To see what CI will run against, I read the root files on the task branch and the finished Nx workspace job's note and two handoffs, then [the repository layout](../../../06-project/00-repository-layout.md), the [roadmap](../../../06-project/01-roadmap.md)'s M0 section and the rules that place the work. [Programming dev's rules](../../../departments/programming/roles/dev/RULES.md) give it `.github/workflows/` except the release workflow, and require CI to run the checks through Nx and hold no secret; DevOps reviews CI changes.

Six of the eight definition-of-ready items are answered. Four gaps are left, each a question. Scope: the task names PRs to `develop` but says nothing of stacked PRs whose base is another task's branch, which includes this task's own PR, or of pushes to `develop`. Scope again: whether the run must be a required status check on `develop`, a branch-protection setting only the owner holds. Errors and edge cases: whether the automatic `GITHUB_TOKEN` that the checkout action uses counts as a secret. Platforms: whether the runner images are the moving `-latest` labels or pinned, and whether Intel macOS must run besides Apple silicon.

## Why this way

BA's rules turn every gap into a question and never into a default. Node, Corepack Yarn and the Rust `stable` channel were settled in #17, and the checks run through Nx as the task's own command says. `check` exists on no project today; `nx affected` runs only targets a project has, so that is no gap. Whether to pin third-party actions by commit is a security and DevOps call, not a requirement gap.

## Checks

Every definition-of-ready item was checked against the task text, the M0 defaults, the root files on `chore/dev/18-ci`, the Nx workspace handoffs and the pages above. No other checks apply to a read-only step.

## Where it stands

Blocked on the owner. PM posted the four questions on #18 and parked the task as `Waiting on owner`. Nothing is committed for the task yet and `.github/` doesn't exist. Seen in passing: three lines say CI doesn't exist yet and will go stale once it lands: the overview's Running section, `pm-knowledge.md` and `devops-knowledge.md`.

## Next

When the owner answers on #18, PM starts the BA assistant's attempt 2 with the answers, then the Programming dev role plans the workflow as specialist.
