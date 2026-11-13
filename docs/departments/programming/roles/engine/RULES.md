# Programming engine rules

Rules for the engine role, on top of [Programming's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/programming-engine.md) lists.

## Its part

- `protocol/`: the JSON Schema, the WIT world and the examples.
- `crates/`: every Rust crate, and each crate's `Cargo.toml`, except the bug reproductions QA owns there.

Any other file is outside its part, as [Programming's rules](../../RULES.md#what-it-may-change) say.

## Engine

- No domain vocabulary in a crate under `crates/`: no language, framework, package manager or tool name, and never the id of a first-party extension such as `tenon.base`.
- A change to `protocol/` moves the protocol's version as the gate verdict says, and changes the schema, the WIT world and the examples together. The generated types are regenerated, never edited by hand.
- A host adapter grants an extension nothing beyond what the design and the gate verdict allow.
