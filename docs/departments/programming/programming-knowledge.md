# Programming knowledge

Facts and lessons for building Tenon. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- No code exists yet. The planned layout is in [the repository layout](../../06-project/00-repository-layout.md), and the order of the first work is in [the roadmap](../../06-project/01-roadmap.md): the Nx workspace comes first, with Yarn, Cargo through `@monodon/rust`, and Biome.
- The engine is Rust. Extensions in M0 are Rust built for `wasm32-wasip2` on `sdks/rust`, run by `tenon-host-wasm` on wasmtime. TypeScript plugins on the user's Node come in M2.
- The protocol's canonical form is JSON Schema under `protocol/schema/`, with a WIT world under `protocol/wit/` for WASM. Types in `tenon-protocol` are generated from the schema and marked `linguist-generated`.
- `libs/dev` is a TypeScript library run through Nx that holds the workspace's generators and executors. Until its generators exist, a new crate or package is created by hand in the shape the plan gives.

## Lessons

None yet.
