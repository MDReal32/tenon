# Programming sdk rules

Rules for the sdk role, on top of [Programming's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/programming-sdk.md) lists.

## Its part

- `sdks/`: one folder per language SDK, with its own package manifest.

Any other file is outside its part, as [Programming's rules](../../RULES.md#what-it-may-change) say.

## SDK

- An SDK depends on the protocol only: never on a crate under `crates/` or on the engine's Rust types.
- Its bindings come from the protocol's schema or WIT world. When the protocol changes, regenerate them rather than editing them by hand.
- Each SDK has a sample extension in its tests that a host adapter loads.
