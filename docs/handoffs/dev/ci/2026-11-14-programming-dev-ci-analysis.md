---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-14"
status: done
branch: chore/dev/18-ci
pr: 71
---

# Programming dev analysis and build of the CI task

PM asked the Programming dev role, as specialist before the gate, to plan how the CI workflow for [#18](https://github.com/MDReal32/tenon/issues/18) would be built and tested, continuing from [the BA readiness check](2026-11-14-ba-assistant-ci-readiness.md). No workflow file is written in this step; the output is the analysis returned to PM.

## What I did and how

I read the handbook, Programming's and the dev role's rules, the job note and the BA brief, then checked facts read-only on the task branch. The workspace has one Nx project, `@tenon/source` (the root), and its only target is `lint`, inferred from the root `package.json` script (`biome check .`). `yarn nx affected -t lint test build check --base=develop` ran green locally: one task, the lint. No project defines `test`, `build` or `check` yet, and the Cargo workspace has no members, so `@monodon/rust` infers nothing. Nx skips targets a project lacks without an error.

I also checked two edge cases. With `--base=HEAD --head=HEAD` nothing is affected and Nx prints "0 tasks" and exits 0, so a run with no affected project passes. With a base ref that does not exist, `nx affected` fails with a git error, so CI must give it a real base: a shallow checkout would break it, and the planned fix is `fetch-depth: 0` plus `--base` set to the pull request's base commit (`github.event.pull_request.base.sha`). The root project is `.`, so any changed file, docs included, affects it and runs lint.

The local Node is 24.4.1 while the root `package.json` asks for `^26`; Yarn 4.18.1 is the one pinned in `packageManager`, and `yarn install --immutable` passes. I could not check offline that `actions/setup-node` serves Node 26 on `ubuntu-24.04`; the workflow would verify that on its first run. Corepack ships with Node, so `corepack enable` before `yarn install --immutable` reads the pinned Yarn.

## Why this way

The planned workflow is one job on `ubuntu-24.04`: checkout with full history, setup-node with the version from `engines`, `corepack enable`, `yarn install --immutable`, then `yarn nx affected -t lint test build check --base=<PR base sha> --head=<PR head sha>`, with `permissions: contents: read` and no `secrets.` reference. A failing target makes Nx exit non-zero, which fails the step and the run, so criterion 3 needs no extra code. Using `nx-set-shas` was rejected because it is a third-party action and the pull request event already gives the shas. A matrix or several jobs were rejected as the brief asks for one job. Rust setup is left out for now since nothing builds Rust yet; the runner's rustup reads `rust-toolchain.toml` when a Cargo target first appears.

## Checks

Read-only commands only: `yarn nx show projects`, `yarn nx show project @tenon/source`, `yarn nx affected -t lint test build check --base=develop` (green, 1 task), the same with a missing base (fails) and with no change (0 tasks, exit 0), and `yarn install --immutable` (clean). Nothing was written other than this note and the job note.

## The build

After both halves of the gate approved the plan, PM asked for the build, and I wrote `.github/workflows/ci.yml` as the Architect gate's verdict settles it: workflow `CI`, a plain `pull_request` trigger with no branch filter and no `push`, `permissions: contents: read`, a concurrency group per pull request that cancels superseded runs, and one job `nx-affected` named `Nx affected` on `ubuntu-24.04`, outside any matrix. The steps are checkout (`fetch-depth: 0`, `persist-credentials: false`), setup-node with `node-version-file: package.json`, `npm install --global corepack@0.36.0` then `corepack enable` (Node 26 no longer bundles Corepack), `yarn install --immutable`, and `yarn nx affected -t lint test build check --base="$BASE_SHA" --head=HEAD`, with `BASE_SHA` set through the step's `env:` so no `${{ }}` expression sits in a `run:` script. The actions are pinned to full commit SHAs without a version comment: `actions/checkout` v7.0.1 is `3d3c42e5aac5ba805825da76410c181273ba90b1` and `actions/setup-node` v7.1.0 is `949feb2413d6458794dcd2491c4babbbce0c15c1`. There is no secrets reference, no `nx-set-shas` and no Rust step.

## Build checks

`actionlint .github/workflows/ci.yml` passed with no findings. Ruby's YAML loader parses the file (it shows the `on` key as `true`, a YAML 1.1 quirk, not a defect). The grep for `macos`, `secrets.`, `pull_request_target` and `push:` found nothing. `yarn nx affected -t lint test build check --base=develop --head=HEAD` was green with one task. For criterion 3, an untracked temp file with Biome errors made `yarn nx affected -t lint --skip-nx-cache` exit 1; I deleted it and `git status` shows only the owner's `.idea` files and the new workflow. `yarn nx show projects` still lists `@tenon/source`. Biome printed nothing about the YAML, so it does not cover it. I could not run the workflow itself; its first run on the pull request will confirm that Node 26 and Corepack 0.36.0 install on the runner.

## Where it stands

Done. The workflow is written and committed together with this note. The three stale "CI doesn't exist yet" lines are untouched.

## Next

The Docs writer updates the three stale lines (`docs/departments/README.md`, `docs/departments/pm/pm-knowledge.md`, `docs/departments/devops/devops-knowledge.md`), then DevOps reviews the workflow, and the first CI run on the pull request confirms the Node 26 and Corepack steps.
