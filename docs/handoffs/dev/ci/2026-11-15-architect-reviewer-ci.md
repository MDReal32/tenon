---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/18-ci
pr: 71
---

# Architect review of the CI workflow

PM asked the Architect reviewer to review the change for [#18](https://github.com/MDReal32/tenon/issues/18), CI on GitHub Actions, against the plan the gate approved and the workspace rules. The change adds a GitHub Actions workflow that runs the affected Nx targets on every pull request. It continues from [the Architect gate's verdict](2026-11-15-architect-gate-ci.md), which is the approved plan, [the Programming dev analysis and build](2026-11-14-programming-dev-ci-analysis.md), which wrote the workflow, and [the DevOps review](2026-11-15-devops-engineer-ci-review.md), which approved it with no findings. Attempt 1 requested changes with one finding: the owner's direct-session commit that updated three department lines had no handoff. Attempt 2 found it fixed by [the session's handoff](2026-11-15-session-ci-department-lines.md) and approved the change.

## What I did and how

In attempt 1 I read the handbook, Architect's rules, the [CI](ci.md) job note and every handoff in the job folder, oldest first, then compared `.github/workflows/ci.yml` line by line with the gate's verdict. The workflow is named `CI` and runs on a plain `pull_request` trigger with no branch filter, no `push`, no `pull_request_target` and no path filter. It sets `contents: read`, cancels superseded runs per pull request, and has one job, `nx-affected`, named `Nx affected`, on `ubuntu-24.04` and outside any matrix. The checkout fetches full history, drops its credentials and keeps the merge commit; setup-node reads the version from `package.json` with no cache; Corepack 0.36.0 is installed through npm before `corepack enable`; dependencies install with `--immutable`; and `nx affected` runs against the base SHA from `env:` with `--head=HEAD`. Both actions are pinned to full commit SHAs with no comment. All of this is what the gate settled. I also checked the three updated department lines against the workflow, searched the design book and department files for CI statements the change could make untrue, and checked that every piece of work on the branch had its handoff. None existed for the direct session's commit `83c5e46`, which became the one finding.

In attempt 2 I first checked the finding was fixed: the session's handoff has every required field, follows the template's headings, says why no department role could make the change and why it follows in a new commit, and the job note links it. I then looked for new problems and found none.

## Why this way

The workflow passed every check in both attempts. The four axes and layers are untouched, since the workflow reaches the workspace only through `yarn nx affected`. A workflow has no unit tests, so the tests check rests on the passing run on PR 71, actionlint with shellcheck, and the dev's local proof that a failing target exits non-zero. The book needs no new page, since the docs rule asks for one only for a crate, SDK, extension, adapter or protocol message. The attempt 1 finding came from the handoff rules, which give a direct session a handoff for every piece of work; the job note's mention of the commit didn't take its place, and my rules approve only when every check passes. History can't be rewritten, so a handoff in a new commit was the most the rules allow.

## Checks

Both attempts were read-only, as Architect's rules require, and I ran no command. The evidence for the run came in PM's assignment: run 43692519782 passed, actionlint was clean, and PM checked both action SHAs against their release tags through the GitHub API.

## Where it stands

Done. Attempt 2 approved with no findings. Notes went to PM outside the task: the Corepack sentence in the repository layout page, which is already incomplete since Node 26 no longer bundles Corepack, and a gap in which role owns the departments overview and the knowledge files of departments with no code, a question for the owner.

## Next

The owner reviews PR 71. Once it merges, the owner makes `Nx affected` a required check.
