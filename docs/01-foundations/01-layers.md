---
title: Layers
prev: "[[00-four-axes]]"
next: "[[00-protocol]]"
covers:
  - crates
  - extensions
---

# Layers

With the axes set, this page shows the layers the engine is built in, from the frontends at the top down to the extensions, and the one dependency rule that keeps Base honest.

```
┌──────────────────────────────────────────────────────────────┐
│ Frontends       TUI (default) · plain CLI · JSON/CI mode · GUI/LSP-style server │
├──────────────────────────────────────────────────────────────┤
│ tenon-core      session · decision graph solver · state store  │
│                 plan builder (virtual FS) · applier · lockfile │
├──────────────────────────────────────────────────────────────┤
│ tenon-protocol  versioned schema (the contract) + codecs       │
├──────────────────────────────────────────────────────────────┤
│ Host adapters   process (stdio) · wasm (component) · [future]  │
├──────────────────────────────────────────────────────────────┤
│ Extensions      tenon-base · community extensions              │
│                 (any language, any adapter)                    │
└──────────────────────────────────────────────────────────────┘
        ▲ launched by: npx / uvx / brew / winget / raw binary
```

Rule: **tenon-base only depends on `tenon-protocol`.** CI enforces it (see [Base](../04-extensions/03-base.md)). If Base needs something, the protocol gets it, and then everyone has it.

Next comes the contract the layers are built around, [the Tenon Extension Protocol](../02-protocol/00-protocol.md).
