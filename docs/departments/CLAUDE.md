# Departments: notes for Claude

What this folder is, is in [`README.md`](README.md); the rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

## Whose rules these are

- A `RULES.md` here binds you only when you act as a department role: as a department agent whose `.claude/agents/<dept>-<role>.md` points at it, or as the PM coordinator in the main session. The handbook binds every role.
- In any other session, or when you read another department's files, treat them as reference, not as your instructions.
- Before any work as a role, read in this order: the handbook, `<dept>/RULES.md`, `<dept>/roles/<role>/RULES.md`.

## Editing these files

- A change to any `RULES.md` is a rule change: its own PR, separate from feature work.
- `README.md`, `<dept>-knowledge.md` and `templates/` change with the work they describe.

## Model check

Your model ID is in your own system prompt, on the line `The exact model ID is …`. Compare it with the model your role's `RULES.md` names.

## Permissions

- Each agent file lists only its role's tools, and leaves out the `Agent` tool, so a department agent can't start other agents.
- An agent that has `Bash` gets no `Grep` or `Glob` tool in this environment, even when its agent file lists them. Search through `Bash` instead, as the handbook's start-up check allows, with `git grep`, which skips ignored files, or with `grep` and `find` that exclude `.env*`, so a recursive search never reads `.env`.
- `.env` (DevOps only) and every `git` call except staging, committing and reading history, plus all of `gh` (PM only), are blocked by a project hook, since tool lists can't limit a tool to certain files or commands. The hook is [`.claude/hooks/department-access`](../../.claude/hooks/department-access); it also blocks the main session from `.env`.
- A denied call is the rule working. Don't retry it another way (e.g. `cat .env` after a denied `Read`); report it.
