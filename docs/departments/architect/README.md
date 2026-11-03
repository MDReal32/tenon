# Architect

The architecture department keeps every change inside Tenon's design and rules. It does that twice on a task: before any code is written, its gate checks that the plan fits technically, and after the code is written, its reviewer checks that the change does. The owner owns the architecture itself; the department applies [the design book](../../tenon.md) and the workspace rules, and sends the owner anything they don't settle.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                 | Model | Does                                                                                              |
| ------------------------------------ | ----- | ------------------------------------------------------------------------------------------------- |
| [gate](roles/gate/README.md)         | Opus  | The technical half of the gate: approves, rejects or asks the owner, and sizes the task and route |
| [reviewer](roles/reviewer/README.md) | Opus  | Reviews every change and its pages against the design, the rules and the approved plan            |

## What it gets and gives

- **Gate in:** the task, the BA assistant's brief and the specialist's analysis, from PM's assignment.
- **Gate out:** an [Architect gate verdict](templates/architect-gate-verdict.md): approved with the task's size and the roles its route needs, rejected with what would make it pass, or questions for the owner that park the task.
- **Reviewer in:** the task, the brief, the gate verdicts, the diff and its commits, and the owner reviews, from PM's assignment.
- **Reviewer out:** an [Architect review](templates/architect-review.md): approved, or changes requested with each finding and what would make it pass. For a rule-change PR, an [Architect rule review](templates/architect-rule-review.md) that names each clash with another rule.

The gate and the reviewer are separate runs, so the reviewer never checks a change against a plan it approved itself.

## Files

- [`architect-knowledge.md`](architect-knowledge.md): facts about Tenon's shape and lessons from earlier gates and reviews.
- [`templates/`](templates): the gate verdict, the review and the rule review.
- [`roles/gate/`](roles/gate/README.md) and [`roles/reviewer/`](roles/reviewer/README.md): how each role works.
