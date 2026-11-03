---
title: Four independent axes
prev: "[[tenon]]"
next: "[[01-layers]]"
covers:
  - crates
  - dist
  - sdks
  - extensions
---

# Four independent axes

The first chapter sets out the ideas every other page is checked against. Tenon is four separate questions that must never leak into each other: what the engine is written in, how people get it, what extensions are written in, and what Tenon generates. This page names them; the next one shows how the code is layered to keep them apart.

These must never leak into each other. Every design decision below is checked against this table.

| Axis                 | Question                         | Examples                       | Constraint                                          |
| -------------------- | -------------------------------- | ------------------------------ | --------------------------------------------------- |
| A. Implementation    | What is the engine written in?   | Rust                           | Invisible to users and extension authors            |
| B. Distribution      | How does the user get/launch it? | npx, uvx, brew, winget, binary | Thin launchers only; never define extension runtime |
| C. Extension runtime | What is an extension written in? | TS, Rust, Python, Go, .NET     | Talks the TENON protocol; nothing else              |
| D. Output domain     | What does TENON generate?        | Anything                       | Defined only by installed extensions                |

Corollaries:
- Engine crates contain **zero** domain vocabulary (`rust`, `npm`, `react`, `docker` must not appear in core).
- A launcher package (npm, PyPI, brew formula) contains the same engine binary and a ~50-line shim. No logic.
- The extension SDK for language L is a *client* of the protocol, not of the engine's Rust types.

Next, [the layers](01-layers.md) show how the engine is built to keep these axes apart.
