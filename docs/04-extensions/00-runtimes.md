---
title: Extension runtimes
prev: "[[02-lifecycle-hooks]]"
next: "[[01-discovery-and-trust]]"
covers:
  - crates/tenon-host-process
  - crates/tenon-host-wasm
  - crates/tenon-conformance
---

# Extension runtimes

The fourth chapter is about extensions: how they run, how they are found and trusted, how they are written, and the first one Tenon ships. This page covers the host adapters that let the core talk to an extension in any language.

The core talks to one trait. Adapters implement it.

```rust
trait ExtensionHost {          // illustrative
    fn handshake(&mut self) -> Result<Manifest>;
    fn call(&mut self, req: TepRequest) -> Result<TepResponse>;
    fn shutdown(&mut self);
}
```

| Adapter                  | Use                           | Notes                                                                                                                                 |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `process`                | Any language                  | stdio JSON-RPC. Needs interpreter on the machine (or a bundled binary). Lowest barrier.                                               |
| `wasm`                   | Portable, sandboxed, compiled | Component Model. Works on every OS with zero interpreter. Strong capability isolation.                                                |
| `js-embedded` **[open]** | Zero-install JS/TS            | Recommended realization: **QuickJS compiled to WASM**, i.e. JS is “just a WASM guest”. Avoids embedding a second engine path in core. |

First-party plan: ship `process` first (fastest to prove the protocol, and TS SDK works with node/bun/deno), then `wasm`. JS embedded comes through `wasm` so core never grows a JS-specific code path.

**Conformance suite**: a language-agnostic test harness (`tenon-conformance`) that drives any extension through scripted protocol scenarios. Adding language N+1 = write an SDK + pass the suite.

Next, [discovery, install and trust](01-discovery-and-trust.md) covers where extensions come from.
