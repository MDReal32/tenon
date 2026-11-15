---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: devops-engineer
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/18-ci
pr: 71
---

# DevOps review of the CI workflow

PM asked the DevOps engineer to review the CI change for [#18](https://github.com/MDReal32/tenon/issues/18), the reviewer the [Architect gate](2026-11-15-architect-gate-ci.md) named. The review covers DevOps' scope only: that CI runs the checks through Nx, holds no secret value and can leak none, that the run stays reproducible, and that any variable the change reads is listed in `.env.example`. It continues from [the Programming dev analysis and build](2026-11-14-programming-dev-ci-analysis.md), which wrote `.github/workflows/ci.yml`, and from the owner's direct-session commit that updated three lines saying CI didn't exist yet. The verdict is Approved, with no findings.

## What I did and how

I read the [CI](ci.md) job note and every handoff before this one, then the whole diff of `chore/dev/18-ci` against `develop`: the 40-line workflow in `8373259` and the doc lines in `83c5e46`, the rest being handoffs. I compared the workflow line by line with the plan the gate approved. It matches: workflow `CI`, a plain `pull_request` trigger with no branch filter, no `push` and no `pull_request_target`, `permissions: contents: read` at the top, a concurrency group per pull request number that cancels superseded runs, and one job `nx-affected` named `Nx affected` on `ubuntu-24.04` outside any matrix. Its steps are a checkout with `fetch-depth: 0` and `persist-credentials: false`, setup-node with `node-version-file: package.json`, a global install of `corepack@0.36.0` then `corepack enable`, `yarn install --immutable`, and `yarn nx affected -t lint test build check --base="$BASE_SHA" --head=HEAD` with the base SHA passed through the step's `env:`. Both actions sit on the full commit SHAs the plan names.

I then checked the root files the workflow depends on. `package.json` gives `engines.node` `^26` and `packageManager` `yarn@4.18.1`, with no `volta` field that setup-node would read first; `.yarnrc.yml` disables Yarn telemetry; `nx.json` disables analytics and configures no Nx Cloud, so no run reaches an outside cache or needs a token; `.gitignore` keeps `.nx/`, `node_modules/` and every `.env` file but `.env.example` out of git. The workflow reads no environment variable from `.env`, and the repository has no `.env.example` yet, so there is nothing for it to list.

Last, I checked that the three updated lines are true, [`devops-knowledge.md`](../../../departments/devops/devops-knowledge.md) above all, as it is my department's file. Its new line says CI is `.github/workflows/ci.yml`, runs on every pull request on a pinned `ubuntu-24.04`, and has every action pinned to a full commit SHA; the workflow bears out each part. The overview's Running section and `pm-knowledge.md` say the same things in their own words and are also true.

## Why this way

[DevOps' rules](../../../departments/devops/RULES.md) keep a review to its scope and forbid changes during it, so I changed nothing and kept items outside the scope to notes for PM. I raised no finding because nothing in the workflow fails a DevOps check. Each security choice is in place: the token is read-only and not kept in the checkout's git config, the only `${{ }}` expressions sit in the concurrency group and in an `env:` value, never in a `run:` script, so a branch name or title can't inject shell, and nothing is uploaded as an artifact. Comparing the merge commit `HEAD` with `pull_request.base.sha` can only widen the affected set if the base moved since the event, never narrow it, so CI can't skip a project the change touched.

On reproducibility I judged the run reproducible within the bounds the plan set on purpose. `yarn install --immutable` holds every dependency to `yarn.lock`, Yarn is pinned by `packageManager`, Corepack by version and the actions by SHA. Two inputs still float: setup-node resolves `^26` to the newest 26.x release when the run starts, and GitHub updates the `ubuntu-24.04` image's contents. Both follow from the approved plan (Node from `engines`, the runner the owner chose), so they are notes, not findings; pinning Node more tightly would be a change to `engines` or the plan, for the gate.

## Checks

`actionlint -verbose .github/workflows/ci.yml` found 0 errors, with shellcheck installed so the `run:` scripts were checked too. A grep for `secrets.`, `pull_request_target`, `push:` and `macos` found nothing, and the only `${{ }}` uses are the two above. `yarn nx affected -t lint test build check --base=develop --head=HEAD` ran green locally, one task. `git ls-files .env` printed nothing before the commit. PM reports that the workflow's run on PR 71, run 43692519782, passed in 18 seconds, which shows Node 26, Corepack 0.36.0 and `yarn install --immutable` work on the runner; I could not open its log.

I could not check the two action SHAs against their release tags, since this role cannot reach GitHub. The SHAs in the file match the ones the plan names, which PM took from the GitHub API; a passing run shows each SHA resolves, but not that it is the tagged release commit and not a commit from a fork network. PM can confirm it with `gh api repos/actions/checkout/git/ref/tags/v7.0.1` and `gh api repos/actions/setup-node/git/ref/tags/v7.1.0`, dereferencing an annotated tag to its commit.

## Where it stands

Done. The review is Approved with no findings and was returned to PM in the DevOps review template's format. This handoff and the job note's "Current state" are committed; the workflow and the doc lines are unchanged. Four notes went to PM outside the review: the SHA-to-tag check above; the job has no `timeout-minutes`, so a hung run would hold a runner up to GitHub's 360-minute default, a possible `Backlog` item for the dev role; `packageManager` carries no `+sha512` hash, which would let Corepack check the Yarn it downloads against a fixed hash; and the default `pull_request` types leave out `edited`, so when GitHub retargets a stacked PR to `develop` CI reruns only on the next push, which the chain's merge of `develop` already makes.

## Next

PM puts the review in PR 71's description, checks the two SHAs against their tags, and takes the PR to the owner's review. The owner makes `Nx affected` a required check by hand once the PR merges.
