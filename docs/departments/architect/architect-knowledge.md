# Architect knowledge

Facts and lessons for the gate and the review. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- No code exists yet. The planned layout is in [the repository layout](../../06-project/00-repository-layout.md): `protocol/` holds the contract, `crates/` the Rust engine, `sdks/` one SDK per language, `extensions/` Base and the first-party extensions, `dist/` the launchers.
- The workspace tooling will live in `libs/dev`, a TypeScript library run through Nx that holds the workspace's own generators and executors, the docs check among them. New packages come from its generators once they exist.
- The layers, top to bottom: frontends, `tenon-core`, `tenon-protocol`, host adapters, extensions. `tenon-base` depends only on `tenon-protocol`, and CI is meant to enforce it with the four checks on the [Base](../../04-extensions/03-base.md) page.
- The protocol is the only thing every language shares. Its canonical form is JSON Schema, carried over stdio JSON-RPC and, for WASM, a WIT world with the same operations. A change to it moves its version and touches every SDK, adapter and the conformance suite.
- Extensions never write files themselves: they emit operations into the plan, and the engine applies them. A change that lets an extension cause a side effect directly breaks the design.
- The roster names task sizes S, M, L and XL, but no rule defines them yet. Until one does, the gate anchors them to the [PR size guide](../README.md#pull-request-size): S and M fit one PR well within the guide, L is near it, and XL is over it and needs a split.

## Lessons

None yet.
