---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: po-proxy
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/18-ci
pr: 71
---

# PO gate of the CI task

PM asked the PO proxy for the product half of the gate on [#18](https://github.com/MDReal32/tenon/issues/18): does the task, as the owner changed it and as planned, fit Tenon's design and roadmap, are its criteria outcome-based, and does it fit one reviewable change. The task adds a GitHub Actions workflow that runs the affected Nx targets on pull requests. This step continues from [the BA readiness check](2026-11-14-ba-assistant-ci-readiness.md) and [the Programming dev analysis](2026-11-14-programming-dev-ci-analysis.md), and ran in parallel with the Architect gate. The verdict is Approved.

## What I did and how

I took the task, the owner's four changes and the brief from PM's assignment, and read the [CI](ci.md) job note and both handoffs before this one. I checked the task against the [roadmap](../../../06-project/01-roadmap.md)'s M0 section, the [decisions](../../../06-project/02-decisions.md) and the [still open](../../../06-project/03-still-open.md) page, and searched the design book for every mention of CI, runners and macOS. Then I went through the five gate checks in the PO proxy's rules.

The roadmap names CI as part of M0's groundwork, between the Nx workspace and `libs/dev`, so the task fits the plan. The design book's other CI mentions (Base's enforcement checks, CI-side validation for publishing authors, the JSON/CI frontend) belong to later milestones, and this task neither claims nor decides them. The workflow runs the targets the [Nx workspace](../nx-workspace/nx-workspace.md) job set up, through `yarn nx affected`. As the owner changed them, the criteria describe what a contributor sees on a pull request: a run on a pinned `ubuntu-24.04` for every pull request, a failed run when a target fails, and no secret read beyond the read-only `GITHUB_TOKEN`. The plan is one workflow file with one job, which fits one PR of size M. Every decision the task needed, on triggers, the required check, the token and the runner, was made by the owner and is recorded on the issue.

## Why this way

CI doesn't serve project users or extension authors directly, and the first gate check asks about them. I passed it because the roadmap itself puts CI in M0 as groundwork for the product those people use. Linux-only CI leaves the roadmap's promise that M0 runs on macOS without a CI check. I didn't treat that as a contradiction: the roadmap says where Tenon runs, not what CI covers, and the owner made the choice for cost reasons, with macOS CI kept as a later task.

## Checks

The task, the owner's changes and the plan were checked against the gate checks, the roadmap's M0 section, the decisions and still-open pages, and a search of the design book for CI, runner and macOS mentions. No other checks apply to a read-only step.

## Where it stands

Done. The verdict is Approved, with no questions for the owner. Two notes went to PM: a `Backlog` issue for macOS CI would show on the board that macOS isn't checked in CI, and the CI job note described CI as running on pull requests to `develop` only, which the owner's answer of 2026-11-15 changed to every pull request.

## Next

Once the Architect gate also approves, a Programming dev run writes `.github/workflows/ci.yml` as the analysis plans, with DevOps as reviewer.
