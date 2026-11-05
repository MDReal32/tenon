# Programming rules

Rules for every Programming role, on top of the [handbook](../RULES.md). What Programming does is in [`README.md`](README.md).

## The plan

- Build what the approved plan says, no less and no more. The gate verdicts and the brief are the plan.
- When the plan is wrong, can't be built as written, or leaves a choice open, stop and report it to PM with what you found. Never redesign the change or fill the gap yourself: a change to the plan goes back to the gate.
- As specialist, plan only what the task and the brief ask. Anything they leave open is a question for the BA assistant, within the two-round limit, never an assumption in the analysis.

## What it may change

- Every rule in this section leaves out the work record: a role always writes and commits its own handoff under `docs/handoffs/`, brings its job note's "Current state", `tasks` and `updated` up to date when its work ends, and may add a lesson to [`programming-knowledge.md`](programming-knowledge.md).
- Change only the files in your role's part of the repository, as your role's `RULES.md` names it, and only the ones the plan touches.
- A change the task needs in another role's part goes to PM, who runs that role. A change in a part no role owns parks the task, and PM asks the owner.
- Never change the design book, any other page under `docs/` or a package `README.md`: those are the Docs writer's. Report a page the change makes untrue to PM, for Docs.
- Never read or change `.env`. Use `.env.example` to know which variables exist.

## The design

- Keep the four axes apart, as [Architect's rules](../architect/RULES.md#the-four-axes) list them, and keep to the layers and boundaries the gate approved. Add no dependency or import the plan didn't name.
- Extensions never cause a side effect themselves: they emit operations into the plan, and the engine applies them.

## Code and tests

- Follow the workspace rules under [`.claude/rules/`](../../../.claude/rules), the code-style rules for the files you touch above all.
- Create a new crate, package or extension with the `libs/dev` generator for it, once one exists.
- Every behaviour the task adds or changes has tests in the same change. A bug fix starts from QA's failing test and makes it pass without weakening it.
- Generation stays deterministic: the same extensions and answers give the same plan, and a test proves it where the change touches generation.
- Run the checks through Nx, as [nx-tasks.md](../../../.claude/rules/code-style/nx-tasks.md) says: lint, test and build for every project the change affects, until they pass. Report each command and its result. Until the Nx workspace exists, run the tools the task names and say so.

## Commits

- Commit your own work on the task branch PM checked out, as [commit.md](../../../.claude/rules/commit.md) says, split per feature or fix. Never leave a change uncommitted at the end of a step.
- Never create or switch branches, push, or rewrite history. The hook blocks it, and PM does the rest.

## Review findings

- On a later attempt, fix each finding the assignment lists, and only those. Say in the report how each one was fixed.
- A finding you think is wrong goes back to PM with the reason, never silently skipped.

## Work

- Work only on the task in PM's assignment, and give one output per assignment.
- Report anything you notice outside the task to PM, in a line after your output, and leave it unfixed.
