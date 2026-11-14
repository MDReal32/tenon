---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-14"
status: partial
branch: chore/dev/18-ci
pr:
---

# Programming dev analysis of the CI task

PM asked the Programming dev role, as specialist before the gate, to plan how the CI workflow for [#18](https://github.com/MDReal32/tenon/issues/18) would be built and tested, continuing from [the BA readiness check](2026-11-14-ba-assistant-ci-readiness.md). No workflow file is written in this step; the output is the analysis returned to PM.

## What I did and how

I read the handbook, Programming's and the dev role's rules, the job note and the BA brief, then checked facts read-only on the task branch. The workspace has one Nx project, `@tenon/source` (the root), and its only target is `lint`, inferred from the root `package.json` script (`biome check .`). `yarn nx affected -t lint test build check --base=develop` ran green locally: one task, the lint. No project defines `test`, `build` or `check` yet, and the Cargo workspace has no members, so `@monodon/rust` infers nothing. Nx skips targets a project lacks without an error.

I also checked two edge cases. With `--base=HEAD --head=HEAD` nothing is affected and Nx prints "0 tasks" and exits 0, so a run with no affected project passes. With a base ref that does not exist, `nx affected` fails with a git error, so CI must give it a real base: a shallow checkout would break it, and the planned fix is `fetch-depth: 0` plus `--base` set to the pull request's base commit (`github.event.pull_request.base.sha`). The root project is `.`, so any changed file, docs included, affects it and runs lint.

The local Node is 24.4.1 while the root `package.json` asks for `^26`; Yarn 4.18.1 is the one pinned in `packageManager`, and `yarn install --immutable` passes. I could not check offline that `actions/setup-node` serves Node 26 on `ubuntu-24.04`; the workflow would verify that on its first run. Corepack ships with Node, so `corepack enable` before `yarn install --immutable` reads the pinned Yarn.

## Why this way

The planned workflow is one job on `ubuntu-24.04`: checkout with full history, setup-node with the version from `engines`, `corepack enable`, `yarn install --immutable`, then `yarn nx affected -t lint test build check --base=<PR base sha> --head=<PR head sha>`, with `permissions: contents: read` and no `secrets.` reference. A failing target makes Nx exit non-zero, which fails the step and the run, so criterion 3 needs no extra code. Using `nx-set-shas` was rejected because it is a third-party action and the pull request event already gives the shas. A matrix or several jobs were rejected as the brief asks for one job. Rust setup is left out for now since nothing builds Rust yet; the runner's rustup reads `rust-toolchain.toml` when a Cargo target first appears.

## Checks

Read-only commands only: `yarn nx show projects`, `yarn nx show project @tenon/source`, `yarn nx affected -t lint test build check --base=develop` (green, 1 task), the same with a missing base (fails) and with no change (0 tasks, exit 0), and `yarn install --immutable` (clean). Nothing was written other than this note and the job note.

## Where it stands

Partial. The analysis is returned to PM, with five questions for the BA assistant. No workflow file exists.

## Next

The BA assistant answers the questions, then both halves of the gate. After approval, a dev run writes `.github/workflows/ci.yml`, with DevOps as reviewer, and the three stale lines named in the brief are reported to PM for the Docs writer (they sit outside this role's part).
