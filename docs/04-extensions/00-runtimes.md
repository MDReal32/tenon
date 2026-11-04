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

| Adapter   | Use                               | Notes                                                                                                                                                                                                                           |
| --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wasm`    | Portable, sandboxed, compiled     | Component Model. Works on every OS with zero interpreter. Strong capability isolation. The first runtime Tenon ships.                                                                                                           |
| `process` | Any language, on the user's tools | stdio JSON-RPC. Runs on the interpreter already on the user's `PATH` (Node, Python, …), with a clear, actionable error when it is missing; Tenon doesn't download interpreters. JS and TS plugins run here, on the user's Node. |

First-party plan: ship `wasm` first, then `process`. Tenon mostly uses the tools already on the user's system: TypeScript plugins run on the user's Node through `process`, and there is no embedded JS engine.

**Conformance suite**: a language-agnostic test harness (`tenon-conformance`) that drives any extension through scripted protocol scenarios. Adding language N+1 = write an SDK + pass the suite.

Next, [discovery, install and trust](01-discovery-and-trust.md) covers where extensions come from.
