---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/21"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-14"
status: blocked
branch: chore/dev/21-rust-crate-generator
pr:
---

# BA readiness check of the rust-crate generator task

PM asked the BA assistant to check [#21](https://github.com/MDReal32/tenon/issues/21) against BA's definition of ready. The task adds a `@tenon/dev:rust-crate` Nx generator that creates a Cargo crate under `crates/<name>` as a workspace member with `lint`, `test` and `build` targets. It is on the libs-dev job, whose note lives on the branch of [#19](https://github.com/MDReal32/tenon/issues/19) until that merges. PM asked for three things to be checked closely: whether the task can be built without #19, which creates `libs/dev`; the open choice of where a crate's targets come from, which [the Architect gate on the Nx workspace](../nx-workspace/2026-11-13-architect-gate-workspace.md) left to this task; and whether it fits one reviewable PR. The check ended in six questions for the owner.

## What I did and how

I read the task text from PM's assignment and went through the eight definition-of-ready items. I read [the repository layout](../../../06-project/00-repository-layout.md), which places `libs/dev` as the home of the workspace's generators and leaves the choice of crate targets to the task that adds the first crate, [the roadmap](../../../06-project/01-roadmap.md)'s M0 section, the Nx workspace job's note and handoffs, and the root files on the branch. [The Programming dev analysis](../nx-workspace/2026-11-13-programming-dev-workspace.md) proved that `@monodon/rust` 3.0.0 lists a crate as a project but creates only `nx-release-publish`, so `build`, `test` and `lint` must be declared another way. `libs/` and `crates/` are both empty.

Six gaps remain, each a question. Whether #21 depends on #19, since the generator lives in the package #19 creates. Where a crate's targets come from: a `project.json` per crate with shared options in `targetDefaults`, or a local inference plugin in `libs/dev`. Whether the "empty crate" stays in the repository or exists only in tests. Whether the generator makes a library, or also a binary. Which names it accepts and what counts as a duplicate. And what `lint` runs, which decides the components `rust-toolchain.toml` needs.

## Why this way

Building #21 first would mean creating `libs/dev` here and settling what #19's open questions are about, so the dependency became a question with two options. [nx-config.md](../../../../.claude/rules/code-style/nx-config.md) leans both ways on the targets and settles nothing, and the gate said an unsettled choice goes to the owner. Asking it in the same round saves a second wait. Questions 3 to 6 are gaps the criteria leave; no defaults were written. The task fits one PR once #19 exists and the targets come from per-crate `project.json` files. An inference plugin would be the natural seam for a split.

## Checks

Every definition-of-ready item was checked against the task text, the pages and rules above and the root files on the branch. No other checks apply to a read-only step.

## Where it stands

Blocked on the owner: six questions are open on #21, and the task is parked as `Waiting on owner`. No brief exists yet. If the owner makes #19 a dependency, the task chains after #19's branch.

## Next

When the owner answers on #21, PM sends BA the answers for attempt 2, then the Programming dev role plans as specialist.
