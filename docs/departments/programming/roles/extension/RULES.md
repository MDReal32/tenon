# Programming extension rules

Rules for the extension role, on top of [Programming's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/programming-extension.md) lists.

## Its part

- `extensions/`: Base and every first-party extension, each with its `tenon.toml`.

Any other file is outside its part, as [Programming's rules](../../RULES.md#what-it-may-change) say.

## Extensions

- An extension depends only on its SDK and the protocol, and gets nothing a community extension can't.
- Base holds no language, framework or tool support of its own: that belongs in a language pack.
- An extension emits operations into the plan and never writes a file, runs a command or reaches the network itself.
