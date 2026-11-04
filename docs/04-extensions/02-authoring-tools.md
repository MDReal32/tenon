---
title: Tooling for extension authors
prev: "[[01-discovery-and-trust]]"
next: "[[03-base]]"
covers:
  - crates/tenon-cli
  - extensions/create-extension
---

# Tooling for extension authors

This page covers the commands an extension author works with, from the scaffold to publishing, and how the scaffold is itself an extension.

```
tenon create extension          # interactive scaffold (itself driven by the engine!)
tenon ext dev                   # live-reload, runs extension against a sandboxed temp project
tenon ext validate              # manifest + protocol + decision-graph lint (cycles, dead options, missing deps)
tenon ext test                  # snapshot tests of generated plans; conformance suite
tenon ext pack / publish         # to the plugin language's own package manager
tenon explain / tenon plan --dry-run --json
```

`tenon create extension` is a *generator extension* shipped with Base — dogfooding. Language choice for the scaffold is a decision with options contributed by language-SDK extensions (`tenon.sdk-ts`, `tenon.sdk-rust`, `tenon.sdk-python`, …), so adding an SDK language doesn’t touch core either.

Scaffold output: manifest, entrypoint, SDK dependency, example decision + generator, tests with snapshot fixtures, CI workflow, README, dev script.

Next, [Tenon Base](03-base.md) is the first extension written with them.
