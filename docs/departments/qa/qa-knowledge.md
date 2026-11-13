# QA knowledge

Facts and lessons for checking Tenon. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- No code exists yet. The planned layout is in [the repository layout](../../06-project/00-repository-layout.md), and the Nx workspace comes first, as [the roadmap](../../06-project/01-roadmap.md) says.
- The conformance suite is the `tenon-conformance` crate: a language-agnostic harness that drives any extension through scripted protocol scenarios, as [runtimes](../../04-extensions/00-runtimes.md) describes. A new SDK is ready when its sample extension passes it.
- In M0 the only runtime is WASM: extensions are Rust built for `wasm32-wasip2`, run by `tenon-host-wasm` on wasmtime.
- M0's end-to-end test builds `tenon` and drives `tenon new` with scripted answers, as the M0 milestone's last task sets out. Base's own checks run the e2e suite with Base loaded from an external directory, as [Base](../../04-extensions/03-base.md) describes.
- Generation is deterministic: the same extensions and answers give the same plan, so a generated tree can be compared against an expected one.

## Lessons

None yet.
