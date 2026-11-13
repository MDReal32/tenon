---
title: Repository layout
prev: "[[00-distribution]]"
next: "[[01-roadmap]]"
covers:
  - protocol
  - crates
  - sdks
  - extensions
  - dist
  - libs/dev
  - package.json
  - nx.json
  - Cargo.toml
  - rust-toolchain.toml
  - biome.json
---

# Repository layout

The sixth chapter is about the project itself: how the repository is laid out, the order things get built in, and what is decided and what is still open. This page shows the proposed layout.

```
tenon/
├─ package.json  nx.json     # the root Nx workspace: Yarn, Nx and Biome
├─ Cargo.toml                # the Cargo workspace, its members the crates below
├─ rust-toolchain.toml  biome.json
├─ protocol/                 # THE CONTRACT: schemas, WIT, versioning, changelog
│  ├─ schema/  wit/  examples/
├─ crates/
│  ├─ tenon-protocol/        # generated types + codecs
│  ├─ tenon-core/            # solver, state, plan, applier (no I/O frontends)
│  ├─ tenon-host-process/
│  ├─ tenon-host-wasm/
│  ├─ tenon-registry/        # resolve/install from package managers, lockfile
│  ├─ tenon-cli/             # frontends: TUI, plain, json
│  └─ tenon-conformance/
├─ sdks/
│  ├─ typescript/  rust/  python/  go/  dotnet/     # generated + hand-written ergonomics
├─ extensions/
│  ├─ base/                  # tenon.base
│  ├─ lang-*/                # first-party language packs (separate from base)
│  └─ create-extension/      # the scaffolder, itself an extension
├─ dist/
│  ├─ npm/  pypi/  homebrew/  winget/  ...           # launchers only
├─ docs/
└─ libs/
   └─ dev/                   # Nx generators and executors (scaffolds, docs check)
```

Every task runs through Nx, the Rust crates' build, test, release and codegen included, so there is no separate `xtask/` runner.

The root is itself the first Nx project: a private package whose `lint` script runs Biome over the whole repository, with the TypeScript side managed by Yarn and the Rust side by Cargo. Building from a checkout needs Node 26 with Corepack, which provides the Yarn version the root `package.json` pins, and rustup, whose `rust-toolchain.toml` selects the `stable` channel. The `@monodon/rust` plugin reads the Cargo workspace and gives Nx each crate as a project with its dependencies, but it infers no `build`, `test` or `lint` targets for it, and the task that adds the first crate settles where those targets come from. The `build` target of every project depends on its dependencies' builds and on whichever of the finite checks (typecheck, lint, test, format check, validation and code generation) the project provides.

Next, [the roadmap](01-roadmap.md) gives the order it all gets built in.
