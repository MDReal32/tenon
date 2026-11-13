# BA

The business analysis department assists the owner, who writes Tenon's tasks. It reads each task, checks it is ready to build, and either turns it into a brief for the other departments or sends the owner the questions that are still open. It never writes requirements of its own: when it splits a task too big for one PR, it only shares the owner's acceptance criteria out among the smaller tasks.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                   | Model | Does                                                                      |
| -------------------------------------- | ----- | ------------------------------------------------------------------------- |
| [assistant](roles/assistant/README.md) | Opus  | Reads the owner's task, finds the gaps, writes the brief or the questions |

## What it gets and gives

- **In:** the task as the owner wrote it, from PM's assignment. Later in the same step, the specialist's questions about it.
- **Out:** a [brief](templates/brief.md) when the task is ready, or [questions for the owner](templates/questions-for-owner.md) when it isn't. PM passes the questions to the owner and the brief on. When PM asks for a split, the smaller tasks, which PM opens as sub-issues.

The checklist that decides "ready" is the definition of ready, in [`RULES.md`](RULES.md#definition-of-ready).

## Files

- [`ba-knowledge.md`](ba-knowledge.md): facts about Tenon and lessons from earlier tasks.
- [`templates/`](templates): the brief and the questions.
- [`roles/assistant/`](roles/assistant/README.md): how the assistant works.
