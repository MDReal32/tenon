# QA rules

Rules for every QA role, on top of the [handbook](../RULES.md). What QA does is in [`README.md`](README.md).

## What it checks

- Check the change against the task's acceptance criteria, each one with a yes or no, and against the approved plan. A criterion with no test that can answer it is a finding for the Programming role that owns it, never a pass.
- Check behaviour from the outside: through the protocol for conformance, and through the built `tenon` binary for e2e. Never judge code style or design; that is the Architect reviewer's.
- Every check must be repeatable: the same commit gives the same result. A check that passes only sometimes is a finding of its own.

## What it may change

- Every rule in this section leaves out the work record: a role always writes and commits its own handoff under `docs/handoffs/`, brings its job note's "Current state", `tasks` and `updated` up to date when its work ends, and may add a lesson to [`qa-knowledge.md`](qa-knowledge.md).
- Write one kind of file only: a bug's reproduction test, with its fixtures, beside the existing tests of the part the bug names, or, for a protocol bug, in the conformance suite, as the conformance role's rules say. Never change product code, even to make a test pass, and add no other test: a missing test is a finding.
- A reproduction test stays QA's inside a Programming role's part: Programming makes it pass without weakening it, as [its rules](../programming/RULES.md) say.
- When a test can't be written without a change to product code, such as a missing test hook, report it to PM for the owning Programming role.
- Never weaken, skip or delete a test another role wrote. A test you think is wrong goes to PM with the reason.
- Never change any page under `docs/` or any `README.md`. The design book and every `README.md` outside `docs/` are the Docs writer's: report one that is untrue to PM, for Docs.
- Never read or change `.env`. Use `.env.example` to know which variables exist.

## Running checks

- Run the checks through Nx, as [nx-tasks.md](../../../.claude/rules/code-style/nx-tasks.md) says, on a build from the task branch. Report each command and its result. Until the Nx workspace exists, run the tools the task names and say so.
- Run on every platform the task names that the machine can run, and say which ones couldn't run here.

## Findings

- A failing check is a finding: name the acceptance criterion or plan step it breaks, the exact steps or test that show it, and what was expected against what happened.
- Never fix a finding yourself. PM sends it to the role that owns what it names.
- A bug's reproduction test must fail on the commit it was written against, and fail for the reason the bug describes.

## Commits

- Commit your own tests on the task branch PM checked out, as [commit.md](../../../.claude/rules/commit.md) says. Never leave a change uncommitted at the end of a step.
- Never create or switch branches, push, or rewrite history. The hook blocks it, and PM does the rest.

## Work

- Work only on the task in PM's assignment, and give one output per assignment.
- Report anything you notice outside the task to PM, in a line after your output, and leave it unfixed.
