---
title: Roadmap
prev: "[[00-repository-layout]]"
next: "[[02-decisions]]"
covers:
  - docs
---

# Roadmap

This page lists the milestones, each a thin vertical slice that proves one thing before the next is built on it. M0 to M4 are the priority: they are settled and stay valid until the end. M5 and everything after it can change at any time. The current milestone's tasks and the next milestone's epics are issues in the [Tenon project](https://github.com/users/MDReal32/projects/4), grouped by GitHub milestones. The plan came from [#2](https://github.com/MDReal32/tenon/issues/2).

## M0 – First version

The front page's first version: run `tenon new`, answer a couple of questions, and see a TypeScript project scaffolded in its directory. M0 starts with the groundwork: the missing departments, then the Nx workspace with Yarn, Cargo, `@monodon/rust` and Biome, CI, and `libs/dev` with its docs check and generators. Then comes the thinnest slice of the product. The protocol ships as `tep/0`, which may still break: the `tenon.toml` manifest, the `handshake`, `contribute`, `validate` and `generate` messages, and their WIT world. On the engine side come `tenon-protocol`, the `tenon-host` trait, a `tenon-core` with the decision solver, a narrow `validate` phase and the plan applier, and `tenon-host-wasm` on wasmtime. Extensions are written in Rust on `sdks/rust`: a minimal `tenon.base` and `tenon.lang-ts`, both built into the `tenon` binary but loaded through the same path as any extension. `tenon-cli` asks plain prompts, re-asks an answer a `validate` diagnostic names, and asks before emptying an existing target directory, never a filesystem root or the home directory. An end-to-end test and the axis checks close it. It runs on macOS and Linux, built from source, and WASM is the only extension runtime.

## M1 – Engine

The full decision graph with extension points, cycle detection, user-driven back-navigation and headless answers, and the condition matchers. Then the operation kinds and `tenon.std-ops` with the templating engine, and handler ordering and conflict rules, which [decision 3](02-decisions.md) settles before M1 ends. The remaining lifecycle hooks, `exec` (decision 7), `--dry-run`, `plan --json` and `tenon explain`, the TUI and JSON/CI frontends, declarative contributions, the conformance suite and snapshot tests, and Base's enforcement checks and remaining generic decisions.

## M2 – Process runtime and TypeScript plugins

`tenon-host-process` carries the same `tep` messages over newline-delimited JSON-RPC on stdio, and the TypeScript SDK runs plugins on the user's Node, with a clear error when the interpreter is missing (decision 5). The conformance suite passes over both transports, which proves the language-independence thesis. `tep/1` freezes when M2 ends.

## M3 – Authoring

`tenon create extension` as a generator extension shipped with Base, with its language options contributed by SDK extensions, plus `ext dev`, `validate`, `test`, `pack` and `publish`, and the authoring docs.

## M4 – Distribution

One engine binary per platform (aarch64 and x86_64 on macOS, Linux and Windows, musl on Linux), GitHub Releases with checksums and signatures, and the `npx`, `uvx`, Homebrew and winget launchers that only exec the binary, all from one release pipeline. Windows support starts here.

## Later milestones, changeable

M5 to M9 are the current intent and can change at any time.

- **M5 – Install, lockfile and trust:** Base and `tenon.lang-ts` stop being built in and load from a user-data folder, whose location on each OS is settled at the start. `tenon-registry` installs extensions from language package managers, git and local paths. `tenon.lock` arrives and records `exec` too. CI-side validation for publishing authors, optional signature verification, and the reworked capability and trust model.
- **M6 – More SDKs and language packs:** Python, Go and .NET SDKs that pass the conformance suite, and more first-party language packs.
- **M7 – AI support:** opt-in AI briefing Markdown files in the generated project, and Tenon's terminal AI that helps answer the questions and edits the planned project before anything is written. The open item on AI-powered generation is settled at the start.
- **M8 – Plugin catalogue website:** gathers published plugins with install instructions (decision 6). Plugin naming is settled at the start.
- **M9 – GUI or editor server frontend:** the fourth frontend on [the layers page](../01-foundations/01-layers.md), over the same solver.

Further transports stay **[open]** and have no milestone.

Next, [the decisions](02-decisions.md) record what is already settled.
