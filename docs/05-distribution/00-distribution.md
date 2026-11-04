---
title: Distribution
prev: "[[03-base]]"
next: "[[00-repository-layout]]"
covers:
  - dist
  - libs/dev
---

# Distribution

The fifth chapter is how people get Tenon: one engine binary per platform, and thin launchers for every ecosystem that only start it.

One engine binary per platform (`aarch64/x86_64` × macOS/Linux/Windows, musl for Linux). Everything else is a launcher.

| Channel         | What it contains                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------- |
| GitHub Releases | Raw archives + checksums + signatures (source of truth)                                        |
| `npx tenon`     | npm package with per-platform optional deps (esbuild/biome pattern) + tiny `bin` shim          |
| `uvx tenon`     | PyPI platform wheels containing the binary + entry point (ruff/uv pattern)                     |
| Homebrew        | Formula pointing to release archives                                                           |
| winget          | Manifest pointing to release archives                                                          |
| later           | scoop, nix, apt/rpm, cargo-binstall, `curl \| sh`, Docker, `dotnet tool`, `go install` wrapper |

Rules:
- Launchers **exec** the binary and forward argv/stdio/exit code. Nothing else.
- Launcher ecosystem ≠ extension ecosystem: `npx tenon` can run a Python extension; the engine resolves and runs it independent of how it was started. If an extension needs an interpreter that isn't present, the engine reports a clear, actionable error (or the extension ships WASM).
- Release pipeline is single-source: one tagged release produces all channel artifacts from the same binaries (same checksums).

The last chapter is about the project itself, starting with [the repository layout](../06-project/00-repository-layout.md).
