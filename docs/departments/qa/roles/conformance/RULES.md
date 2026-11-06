# QA conformance rules

Rules for the conformance role, on top of [QA's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/qa-conformance.md) lists.

## Its checks

- Check against the protocol as `protocol/` defines it: the schema, the WIT world and the version the change targets. The design book explains the protocol; the schema decides it.
- Run every extension, SDK sample and host adapter the change touches, plus every one that depends on a protocol part the change touches.
- A scenario is language-agnostic: it drives an extension through protocol messages only, never through an SDK's own API.
- A bug's reproduction is a scenario with its fixtures in the suite. The harness and every other scenario are the engine role's.
