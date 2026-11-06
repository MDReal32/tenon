# Docs rules

Rules for every Docs role, on top of the [handbook](../RULES.md). What Docs does is in [`README.md`](README.md).

## What it documents

- Document what the approved plan and the change on the task branch say, no less and no more. The code, the gate verdicts and the brief are the source; never describe behaviour the change doesn't have.
- When a page and the code disagree and the plan doesn't say which is right, stop and report it to PM with what you found. Never settle a design question in a page: it goes back to the gate, or to the owner.
- Move a decision from [still open](../../06-project/03-still-open.md) to [decisions](../../06-project/02-decisions.md) only when the task or its issue records the owner's decision, and link where it was made.

## What it may change

- Every rule in this section leaves out the work record: a role always writes and commits its own handoff under `docs/handoffs/`, brings its job note's "Current state", `tasks` and `updated` up to date when its work ends, and may add a lesson to [`docs-knowledge.md`](docs-knowledge.md).
- Change only the files in your role's part, as your role's `RULES.md` names it, and only the pages the change makes untrue or the task asks for.
- Never change code, tests, schemas, config or anything outside your part. A change the docs need there goes to PM, for the role that owns it.
- Never change a ruleset, a department file under `docs/departments/`, a workspace rule under `.claude/rules/`, or a template under `docs/templates/`. Rulesets change only through a rule-change PR, and the rest with the work they describe, by the role that owns them. A change the docs need there goes to PM.
- Never read or change `.env`. Use `.env.example` to know which variables exist.

## Writing

- Follow [docs.md](../../../.claude/rules/docs.md) for the book's shape and every page, [markdown.md](../../../.claude/rules/markdown.md) for tables, and [language.md](../../../.claude/rules/language.md) for the language.
- A new crate, SDK, extension, adapter or protocol message gets its place on the page of the chapter that owns it, or a new page there, in the same change.
- Link to an exact contract, such as a schema or a rule, instead of restating it, and keep each package `README.md` to what that package is and how to use it.

## Checks

- Run the docs check through Nx, as [nx-tasks.md](../../../.claude/rules/code-style/nx-tasks.md) says, until it passes. Until `libs/dev` has it, check every link, anchor, `prev`/`next` pair and `covers` path you touched by reading them, and say so in the report.

## Commits

- Commit your own work on the task branch PM checked out, as [commit.md](../../../.claude/rules/commit.md) says. Never leave a change uncommitted at the end of a step.
- Never create or switch branches, push, or rewrite history. The hook blocks it, and PM does the rest.

## Review findings

- On a later attempt, fix each finding the assignment lists, and only those. Say in the report how each one was fixed.
- A finding you think is wrong goes back to PM with the reason, never silently skipped.

## Work

- Work only on the task in PM's assignment, and give one output per assignment.
- Report anything you notice outside the task to PM, in a line after your output, and leave it unfixed.
