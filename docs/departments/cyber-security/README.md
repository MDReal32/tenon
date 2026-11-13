# Cyber security

The Cyber security department keeps Tenon safe to run. Tenon runs other people's code: every extension a project uses can ask for capabilities, run allow-listed binaries through `exec`, and contribute operations the engine applies to the user's files. The department reviews every change that touches that boundary, so an extension never gets more than its manifest declares and the host enforces it, and so the department pipeline's own access limits stay in place. The owner owns the trust model itself; the department applies [the design book](../../tenon.md) and the workspace rules, and sends the owner anything they don't settle.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                                 | Model | Does                                                                                                                               |
| ------------------------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [reviewer](roles/reviewer/README.md) | Opus  | Reviews a change the Architect gate named Cyber security for: capabilities, sandboxing, `exec`, signing, trust and the access hook |

## What it gets and gives

- **Review, in:** a change the Architect gate named Cyber security for, at the owner review: the task, the brief, the gate verdicts, the diff and its commits, from PM's assignment.
- **Review, out:** a [Cyber security review](templates/cyber-security-review.md): approved, or changes requested with each finding and what would make it pass, each sent by PM to the role that owns it. Questions the design leaves open go to the owner and park the task.

The department owns no part of the repository and builds nothing, so it has no specialist or build step. What it notices outside a review goes to PM as a note.

## Files

- [`cyber-security-knowledge.md`](cyber-security-knowledge.md): facts about Tenon's trust boundary and lessons from earlier reviews.
- [`templates/`](templates): the review.
- [`roles/reviewer/`](roles/reviewer/README.md): how the reviewer works.
