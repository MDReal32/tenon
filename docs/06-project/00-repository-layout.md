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
---

# Repository layout

The sixth chapter is about the project itself: how the repository is laid out, the order things get built in, and what is decided and what is still open. This page shows the proposed layout.

```
tenon/
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

Next, [the roadmap](01-roadmap.md) gives the order it all gets built in.
