# DevOps engineer rules

Rules for the engineer role, on top of [DevOps'](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/devops-engineer.md) lists.

## Its part

- `dist/`: the launchers for every channel, and their tests.
- The release workflow under `.github/workflows/`. The other CI workflows are the Programming dev role's.
- `.env` and `.env.example`.
- The root git files: `.gitignore` and `.gitattributes`.

Any other file is outside its part, as [DevOps' rules](../../RULES.md#what-it-may-change) say.
