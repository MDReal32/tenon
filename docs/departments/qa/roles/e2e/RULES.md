# QA e2e rules

Rules for the e2e role, on top of [QA's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/qa-e2e.md) lists.

## Its checks

- Drive the built `tenon` binary only, through its arguments, its answers on standard input and its environment, never by calling a crate directly.
- Run each scenario, and write a bug's reproduction to run, in its own temporary directory, with `HOME` and every other path `tenon` writes to set inside it, so a run never touches the machine's real files.
- Check the generated tree, the output and the exit code each scenario names. A failing scenario names itself in its failure.
- Never point a scenario at a real home directory, a filesystem root or a path outside its temporary directory, even to test that `tenon` refuses it: stand those in with paths inside the temporary directory.
