# HR policy rules

Rules for the policy role, on top of [HR's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/hr-policy.md) lists.

## Its part

- Everything under `docs/departments/`: the overview, the handbook, each department's and role's files, knowledge files and templates.
- The agent files under `.claude/agents/`.
- The workspace rules under `.claude/rules/`.
- The access hook under `.claude/hooks/department-access`, with its tests, and its wiring in `.claude/settings.json`.

Any other file is outside its part, as [HR's rules](../../RULES.md#what-it-may-change) say.
