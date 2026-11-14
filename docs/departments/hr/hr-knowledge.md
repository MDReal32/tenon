# HR knowledge

Facts and lessons for keeping the departments' rules. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- Rules come in three levels: the [handbook](../RULES.md), each department's `RULES.md`, and each role's. On top of them sit the workspace rules under `.claude/rules/`, which bind every session, a direct session outside the departments included.
- Every department and role folder splits into `README.md`, `RULES.md` and `CLAUDE.md`. Claude Code auto-loads a folder's `CLAUDE.md` into any session that reads a file there, so it never holds rules for one role only.
- An agent file under `.claude/agents/<dept>-<role>.md` carries `name`, `description`, `tools`, `disallowedTools: mcp__*`, `model` and `effort`, and a body that lists the three `RULES.md` files to read in order. No agent file gives the `Agent` tool.
- The access hook, [`.claude/hooks/department-access`](../../../.claude/hooks/department-access), is wired in `.claude/settings.json`. It lets only `devops-engineer` reach `.env`, limits every department agent's `git` to staging, committing and reading history, and blocks `gh` for all of them. Its tests run with `node --test find-access-violation.test.mjs` inside the hook's folder.
- Every file name under `docs/` is unique, since the folder is an Obsidian vault, except the triplets under `docs/departments/`.
- The [departments job note](../../handoffs/departments/departments/departments.md) and its handoffs record why each department and rule came in.

## Lessons

- A rule change that gives a department new work has to give that work a step in PM's routes too. DevOps' build and specialist steps were missed this way and caught in its rule review.
