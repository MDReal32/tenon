---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: architect-gate
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/18-ci
pr: 71
---

# Architect gate verdict on the CI plan

PM asked the Architect gate to judge the technical fit of the plan for [#18](https://github.com/MDReal32/tenon/issues/18), CI on GitHub Actions, before any workflow is written. The gate sizes the task, names the roles the route needs, and settles three implementation choices the BA brief left as technical calls: how third-party actions are pinned, whether a newer push cancels a run still going, and the workflow and job names. This continues from [the BA readiness check](2026-11-14-ba-assistant-ci-readiness.md) and [the Programming dev analysis](2026-11-14-programming-dev-ci-analysis.md); the PO proxy judged product fit at the same time.

## What I did and how

I read the handbook, the Architect and gate rules, the [CI job note](ci.md) and both earlier handoffs, then checked the plan against [the repository layout](../../../06-project/00-repository-layout.md), [the roadmap](../../../06-project/01-roadmap.md)'s M0 section, [the decisions](../../../06-project/02-decisions.md), [the Programming dev rules](../../../departments/programming/roles/dev/RULES.md), [DevOps'](../../../departments/devops/RULES.md) and [Cyber security's](../../../departments/cyber-security/RULES.md), the workspace rules and the root config files.

The verdict is Approved, size S. All six gate checks pass: the plan adds one file, `.github/workflows/ci.yml`, in the dev role's part, reaches the workspace only through `yarn nx affected`, changes no contract and settles nothing the design leaves open. The route is Programming dev for the workflow and DevOps as reviewer, with no QA role and no Cyber security review.

I added one change to the plan. The analysis says Corepack ships with Node, which held for the Node 24 it ran on, but Node.js stopped bundling Corepack from Node 25. So the dev checks it against Node 26 and, if Corepack is missing, installs a pinned version through npm before `corepack enable`. I also fixed the details the analysis left loose: the trigger is plain `pull_request`, never `pull_request_target`; `contents: read` is set at the top; checkout drops its credentials and keeps GitHub's default merge commit; `nx affected` runs with `--head=HEAD` and the base SHA arrives through `env:`; and there is no package cache.

The three choices are settled this way. Every action is pinned to a full commit SHA, with each SHA's release tag recorded in the report and the PR description rather than a YAML comment. A `concurrency` group per PR number cancels superseded runs. The workflow is named `CI`, the job id is `nx-affected` and its name is `Nx affected`, which is what the required-check picker shows.

## Why this way

A SHA can't be moved to other code and a tag can, which is how the 2025 `tj-actions` compromise reached its users, so SHAs keep the run reproducible, which DevOps checks. The usual trailing version comment lost to the workspace rule that code carries no comments by default. Cyber security's review is not needed: its trigger list names extension capabilities, sandboxing, `exec`, signing, trust and the access hook, its rules give CI secrets to DevOps, and the workflow leaves nothing to steal, with no secret, a read-only token not kept in the checkout, and a trigger that gives forks no write access. Cancelling superseded runs saves the owner's runner minutes, since only a PR's newest commit matters. Branch protection lists a check by its job name, so the job stays out of any matrix, which would add values to the name, and a later macOS task has to plan for that. Testing the merge commit with `--head=HEAD` beat passing the PR head SHA, because Nx would otherwise compare one commit and read files from another. The size is S, not the M the task was planned at, because the owner's Linux-only answer cut the work to one job in one file of about 40 lines.

## Checks

Read-only, as Architect's rules require. I ran no command. The Corepack point and each action's current release are for the dev to check against the official sources, and the PR's first CI run shows them working.

## Where it stands

Done. The verdict is Approved with no question for the owner. Notes passed to PM: the stale "No code exists yet" line in the Architect knowledge, the unpinned `stable` channel in `rust-toolchain.toml` for DevOps once a crate exists, the job note's wording on which pull requests CI runs on, and three stale lines on CI not existing yet (the overview, `pm-knowledge.md`, `devops-knowledge.md`) to update in this PR.

## Next

PM sets the task's `Size` to S and starts the Programming dev role to write the workflow as the plan and this verdict settle it. The dev reports each action's SHA with its release tag, the Corepack check, and the local proof that a failing target makes `nx affected` exit non-zero. The Docs writer takes the stale lines, and DevOps reviews the workflow.
