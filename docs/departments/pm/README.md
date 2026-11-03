# PM

The project management department runs the pipeline. It takes a task in, decides which departments it goes through, hands the work from one to the next and turns the result into a pull request. It is the only department that pushes, talks to GitHub, comments on issues and moves tasks in the project.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                       | Model | Does                                               |
| ------------------------------------------ | ----- | -------------------------------------------------- |
| [coordinator](roles/coordinator/README.md) | Opus  | Runs one task from intake to a ready-for-review PR |

PM has no agent file. The coordinator is the main Claude Code session, because only the main session may start other agents, push and run `gh`.

## What it hands out and gets back

- **Out:** an assignment to one role at a time, in [`templates/assignment.md`](templates/assignment.md), carrying everything the role needs from earlier steps. Assignments are never written into the repo; what each step did is recorded in its handoff in `docs/handoffs/`, as [handoffs.md](../../../.claude/rules/handoffs.md) says.
- **Back:** the role's output in that role's own template, its handoff, and the commit it made, if any.
- **To the owner:** a short [issue comment](templates/issue-comment.md) whenever the task's state changes, and the full record in the PR description ([`templates/pr-description.md`](templates/pr-description.md)).

## Files

- [`pm-knowledge.md`](pm-knowledge.md): facts and lessons about running tasks in this repo.
- [`templates/`](templates): the three formats above.
- [`roles/coordinator/`](roles/coordinator/README.md): how a run goes, step by step.
