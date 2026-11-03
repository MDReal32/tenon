---
title: Roadmap
prev: "[[00-repository-layout]]"
next: "[[02-decisions]]"
covers:
  - docs
---

# Roadmap

This page lists the milestones, each a thin vertical slice that proves one thing before the next is built on it.

1. **M0 – Contract spike**: protocol v0 (handshake, contribute, answer, plan), process adapter, 20-line Python and TS extensions passing the same fixture. *This validates the language-independence thesis before anything else gets built.*
2. **M1 – Engine MVP**: facts/decisions solver, plan + virtual FS + merge ops, headless CLI, snapshot tests.
3. **M2 – Base + one language pack** built strictly on the public API (CI enforcement on).
4. **M3 – Authoring**: `create extension`, `ext dev/validate/test`, TS SDK, docs.
5. **M4 – Distribution**: binaries, npx + uvx + brew + winget from a single release pipeline.
6. **M5 – WASM adapter**, QuickJS-in-WASM for zero-install JS, Rust SDK; capability sandboxing.
7. **M6 – Registry, lockfile, signing**, more SDKs (Python, Go, .NET), TUI polish.

Next, [the decisions](02-decisions.md) record what is already settled.
