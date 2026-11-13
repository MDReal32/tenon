---
type: job
area: dev
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
updated: "2026-11-13"
---

# Nx workspace

The Nx workspace is the ground every other part of Tenon is built on: one Nx graph over Yarn for the TypeScript side and Cargo for the Rust crates, with `@monodon/rust` giving Nx the Cargo projects and Biome checking the code. It serves Tenon's own developers and the department roles, which run every build, lint and test through Nx, as [the repository layout](../../../06-project/00-repository-layout.md) says, with no separate `xtask/` runner.

## How it works

The repository root is the workspace and its first Nx project, `@tenon/source`, a private Yarn 4 package run through Corepack on the Node 26 LTS line. Its `lint` script runs Biome over the whole repository, and Nx infers the `lint` target from it. `nx.json` registers `@monodon/rust`, which reads the empty Cargo workspace in `Cargo.toml` and will give Nx each crate as a project with its dependencies, though it infers no `build`, `test` or `lint` targets for it; the task that adds the first crate settles where those targets come from. `targetDefaults` makes every `build` depend on `^build` and on the finite checks a project provides, and Nx analytics are off. `rust-toolchain.toml` pins the `stable` channel. DevOps keeps the `.gitignore` entries for the generated folders and the `.gitattributes` that marks the lockfiles `linguist-generated`. [The repository layout](../../../06-project/00-repository-layout.md) describes it for readers.

## How it got here

The job starts with [#17](https://github.com/MDReal32/tenon/issues/17), the first code task of M0, run through the departments.

## Current state

[#17](https://github.com/MDReal32/tenon/issues/17) is built on `chore/dev/17-nx-workspace`, in PR 66. After [the BA readiness check](2026-11-13-ba-assistant-workspace-readiness.md) and [the Programming dev analysis](2026-11-13-programming-dev-workspace.md), which proved Nx 24.0.6 with the plugin on a throwaway crate, both halves of the gate approved it ([PO proxy](2026-11-13-po-proxy-workspace-gate.md), [Architect gate](2026-11-13-architect-gate-workspace.md), size M). The Programming dev role built the root config, [the DevOps engineer](2026-11-13-devops-engineer-workspace-git-files.md) added the git files and later reviewed the whole change, the [Docs writer](2026-11-13-docs-writer-workspace.md) described the root in the repository layout, and [the owner review](2026-11-13-programming-dev-workspace-review.md) approved it. The DevOps review's one finding, Nx's analytics prompt rewriting `nx.json`, is fixed. The Architect reviewer is next, then the owner's review of the PR. Two things wait on the owner outside this task: [#67](https://github.com/MDReal32/tenon/issues/67), how Nx should treat the secrets file it loads into every task, and the choice for the first crate task between per-crate `project.json` targets and a local inference plugin.
