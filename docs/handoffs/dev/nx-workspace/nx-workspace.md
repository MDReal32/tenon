---
type: job
area: dev
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
updated: "2026-11-13"
---

# Nx workspace

The Nx workspace is the ground every other part of Tenon is built on: one Nx graph over Yarn for the TypeScript side and Cargo for the Rust crates, with `@monodon/rust` inferring the Cargo targets and Biome checking the code. It serves Tenon's own developers and the department roles, which run every build, lint and test through Nx, as [the repository layout](../../../06-project/00-repository-layout.md) says, with no separate `xtask/` runner.

## How it works

Nothing is built yet. [#17](https://github.com/MDReal32/tenon/issues/17) sets up the root workspace: `package.json` with Yarn, `nx.json`, a Cargo workspace with its `rust-toolchain.toml`, `@monodon/rust` and the Biome config.

## How it got here

The job starts with #17, the first code task of M0, run through the departments.

## Current state

#17 waits on the owner. [The BA assistant's readiness check](2026-11-13-ba-assistant-workspace-readiness.md) is done: the owner answered its questions, and the brief is posted on the issue with the versions the owner chose, Node's LTS line, the Rust `stable` channel and the latest stable Yarn through Corepack. The root files the workspace needs are split between DevOps and the Programming dev role by [#61](https://github.com/MDReal32/tenon/issues/61), a rule change this branch will stack on. #61 waits for `hr-policy`, which can't run in the session that parked it, so both wait on the owner restarting the session. Next comes the Programming dev role's analysis, then the gate.
