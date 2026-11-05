---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/11"
role: session
model: claude-opus-5-5
date: "2026-11-05"
status: done
branch: docs/departments/11-programming
pr:
---

# Write the Programming department

The owner asked to run [#11](https://github.com/MDReal32/tenon/issues/11), the first M0 task: write the Programming department with its engine, sdk, extension and dev roles. The task's route has the owner as rule author and the Architect reviewer's rule review, so this direct session drafted the rules for the owner to review in the PR, as the overview says for a department that isn't written yet. This continues the [departments](departments.md) job.

## What I did and how

I followed the overview's "Adding a department". `docs/departments/programming/` got its `README.md`, `RULES.md` and `CLAUDE.md`, a `programming-knowledge.md`, and two templates: a Programming analysis, for when a role is the specialist before the gate, and a Programming report, for the build and each fix. Each of the four roles got its triplet under `roles/`, naming Sonnet and the tools `Read`, `Grep`, `Glob`, `Edit`, `Write` and `Bash`, and each got an agent file under `.claude/agents/` with the same front matter and body as the existing ones. The overview's status line and roster row now say Programming is written, and the roster's description of the engine and dev roles names the parts they own.

The department rules say a role builds what the approved plan says, no less and no more, and stops and reports when the plan is wrong or open instead of redesigning. A role changes only the files in its own part of the repository, never `docs/` or a package README, which are the Docs writer's. It keeps the four axes as Architect's rules list them, writes tests with every behaviour, runs lint, test and build through Nx, and commits its own work. Each role's rules name its part: `protocol/` and `crates/` for engine, `sdks/` for sdk, `extensions/` for extension, and `libs/dev`, the root workspace config and the CI workflows for dev. Each adds the checks specific to its part, such as no domain vocabulary in the engine and no engine dependency in an SDK.

## Why this way

There is no Programming department to copy in the sibling project, so the roles follow the roster's own description and the routes the approved plan gives them: the plan routes `protocol/` tasks to engine, and the workspace and CI tasks to dev with DevOps reviewing, so those parts sit with those roles. Writing the docs stays with the Docs writer, as the roster says, so a Programming role reports an out-of-date page instead of editing it. The hook needed no change: it already lets every department agent stage and commit and blocks the rest of git, and no Programming role needs `.env`. `dist/` and the release pipeline are left to no role for now, since nothing builds them before M4.

## Checks

The link, anchor and table check over `docs/` and `.claude/` passed. The [Architect reviewer's rule review](2026-11-05-architect-reviewer-programming-department.md) found clashes over three attempts, all from Programming's rules keeping roles out of `docs/` while the handoff rules need them to write their own handoff, job note update and lessons there. The fix is one bullet that leaves the whole work record out of the file rules. The reviewer also noted that an SDK's tests depending on a host adapter would pull against the SDK's own rule, so the sample extension is now loaded by the host adapter's tests instead. Attempt 4 found no clashes.

## Where it stands

Done, on `docs/departments/11-programming`, in a PR that closes #11. The reviewer's note for the owner: the roster's DevOps row also names CI and `libs/dev`, which the dev role now owns, so the DevOps task, [#14](https://github.com/MDReal32/tenon/issues/14), should say DevOps reviews them.

## Next

The owner reviews and merges the PR. The next M0 task is QA, [#12](https://github.com/MDReal32/tenon/issues/12).
