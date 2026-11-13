# HR

The HR department keeps the departments' rules. It turns the owner's notes, a retro's proposal or a role no department covers into a rule-change PR, writes the new or changed rulesets, agent files and workspace rules, and keeps the access hook in step with them. As owner review, a fresh HR run checks every rule change before the Architect reviewer does. HR writes rules; it never decides Tenon's design, and never writes product code.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                             | Model | Owns                                                                                                                 |
| -------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------- |
| [policy](roles/policy/README.md) | Opus  | The files under `docs/departments/`, the agent files, the workspace rules under `.claude/rules/` and the access hook |

## What it gets and gives

- **Write, in:** the task with the owner's note, a retro's proposal or the role gap PM parked, and on a later attempt the findings to fix, from PM's assignment, with the task branch checked out.
- **Write, out:** the rule change, committed on the task branch, and an [HR report](templates/hr-report.md): the commits, each file changed and the note or proposal it carries out, and the checks run.
- **Owner review, in:** a rule change written by another HR run, with the task and the commits, from PM's assignment.
- **Owner review, out:** an [HR review](templates/hr-review.md), approved or with findings, each sent by PM to the run that wrote the change.

## Files

- [`hr-knowledge.md`](hr-knowledge.md): facts about how the rulesets fit together and lessons from earlier rule changes.
- [`templates/`](templates): the report and the review.
- [`roles/`](roles): how the policy role works.
