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

#17 waits on the owner. [The BA assistant's readiness check](2026-11-13-ba-assistant-workspace-readiness.md) found four gaps, posted on the issue with a fifth from PM: how to check that `@monodon/rust` infers Cargo targets when no crate is in scope, what makes Biome "configured", whether Biome covers the files already in the repository, which Yarn, Node and Rust versions to pin, and who owns the root files no role's part names, such as `.gitignore` entries, `Cargo.lock` and Yarn's own files. Once the owner answers, the BA assistant's second attempt writes the brief, then come the Programming dev role's analysis and the gate.
