---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-14"
status: done
branch: chore/dev/18-ci
pr: 71
---

# BA readiness check of the CI task

PM asked the BA assistant to check [#18](https://github.com/MDReal32/tenon/issues/18) against BA's definition of ready, and to return either a brief or questions for the owner. The task adds CI on GitHub Actions: pull requests run the workspace's `lint`, `test`, `build` and `check` targets through Nx, for the projects the change affects, with no secrets, and a failing target fails the run. It is the first step on the [CI](ci.md) job and stacks on [#17](https://github.com/MDReal32/tenon/issues/17), whose [Nx workspace](../nx-workspace/nx-workspace.md) job built the root the workflow runs against. Attempt 1 ended in four questions for the owner. Attempt 2 folded the owner's answers into a brief, and the task is ready.

## What I did and how

In attempt 1 I took the task text from PM's assignment, read the root files on the task branch, the Nx workspace job's note and handoffs, [the repository layout](../../../06-project/00-repository-layout.md), the [roadmap](../../../06-project/01-roadmap.md)'s M0 section and the rules that place the work. [Programming dev's rules](../../../departments/programming/roles/dev/RULES.md) give it `.github/workflows/` except the release workflow and require CI to run the checks through Nx and hold no secret; DevOps reviews CI changes. Six of the eight definition-of-ready items were answered, and four gaps became questions: stacked PRs and pushes to `develop`, whether the run is a required check, whether the automatic `GITHUB_TOKEN` counts as a secret, and which runner images.

In attempt 2 PM passed on the owner's four answers, given in chat on 2026-11-14 and posted on #18. CI runs on pull requests to `develop` and on stacked pull requests whose base is another task's branch, and not on pushes to `develop`. The required check is out of this task: the owner turns it on, and PM gives the exact click path in the PR description. `GITHUB_TOKEN` is allowed read-only, and nothing comes from the secret store. CI runs on Linux only, on a pinned `ubuntu-24.04`, because the owner doesn't want to pay for macOS runs; macOS can come as a later task. I folded these into the brief, marking the first criterion as changed by the owner with the task's wording beside the new one, and rechecked the merged workspace: `nx.json` configures no Nx Cloud, Node `^26` and Yarn `4.18.1` come from the root `package.json`, Rust from `rust-toolchain.toml`, and no `.github/` folder exists yet.

The Programming dev analysis then asked five questions. Four were settled from the brief: pinning actions by commit, cancelling a superseded run and the workflow's names are implementation choices the brief allows, and skipping docs-only PRs would break the first criterion. One, which pull request bases CI checks beyond `develop` and task branches, went to the owner, who answered on 2026-11-15 that CI checks every pull request, `master` included, so the trigger carries no branch filter.

## Why this way

BA's rules turn every gap into a question and let a criterion's wording change only where the owner changed it, which is why the first criterion carries both versions. `check` exists on no project today, and `nx affected` runs only the targets a project has, so that is no gap. Pull requests to a base other than `develop` or a task's branch, such as `master`, are named by neither the task nor the answers, so they went under out of scope and were flagged, not asked, since no M0 task targets them.

## Checks

Every definition-of-ready item was checked against the task text, the owner's four answers, the root files on the branch, the Nx workspace handoffs and the pages above. No other checks apply to a read-only step.

## Where it stands

Done. The brief stands with one addition from the owner: every pull request is checked, `master` included, on a pinned `ubuntu-24.04`, never on pushes to `develop`. Passed to PM as notes outside the brief: a possible `Backlog` issue for macOS CI, three lines that go stale once CI lands (the overview's Running section, `pm-knowledge.md` and `devops-knowledge.md`), and the Rust toolchain step the workflow needs once a crate exists.

## Next

The two halves of the gate judge the plan. The Architect gate settles action pinning, run cancelling and naming, and names DevOps as reviewer.
