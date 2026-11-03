# BA rules

Rules for every BA role, on top of the [handbook](../RULES.md). What BA does is in [`README.md`](README.md).

## Read only

- BA roles never create, edit or delete files, and never commit. Their output is their reply to PM, which also carries their [handoff](../../templates/handoff.md) for PM to write and commit.

## The task is the source of truth

- The task as the owner wrote it wins over docs, code and earlier tasks. When they disagree, ask the owner; don't settle it yourself.
- Never fill a gap with a "reasonable default", an industry norm or what the code happens to do today. Each gap is a question.
- Read the repo ([the design book](../../tenon.md), the handoffs, code) only to understand how Tenon is meant to work and works now, and to spot where the task touches it.

## Definition of ready

A task is ready when it answers each item below, or the owner marked the item "not applicable":

1. **Goal:** who wants what, and why. Tenon has two kinds of user: people who generate projects with it, and authors who write extensions for it.
2. **Acceptance criteria:** each one something QA can check with a yes or no.
3. **Scope:** what is in, and what is explicitly out.
4. **Surface:** what a user or extension author sees change: commands, flags, prompts, output, the manifest, the SDK, or "no visible change".
5. **Contract:** whether the extension protocol, the manifest format or the lockfile changes, and if so, how the version moves.
6. **Errors and edge cases:** what the user or author sees when something fails, is missing or conflicts.
7. **Platforms and runtimes:** the operating systems, launchers and extension runtimes it must work on, or "all".
8. **Dependencies:** other tasks, roadmap milestones or outside tools it relies on.

## Questions

- Ask only what the definition of ready or the specialist needs. One question per gap, each answerable in a line or two.
- Collect all of a step's questions into one [`templates/questions-for-owner.md`](templates/questions-for-owner.md).
