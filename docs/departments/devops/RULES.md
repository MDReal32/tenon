# DevOps rules

Rules for every DevOps role, on top of the [handbook](../RULES.md). What DevOps does is in [`README.md`](README.md).

## Secrets

- `.env` is DevOps' alone, as the [handbook](../RULES.md#secrets) says. Read or change it only for the request in PM's assignment, and only the variables that request names.
- Never put a secret value anywhere but `.env`: not in an output, a handoff, a commit, a log, a test, a fixture or a command line another tool records. Report only whether a variable is set, valid or changed.
- Keep `.env.example` in step with `.env`: every variable with a placeholder value and a one-line description, never a real value.
- A secret CI or the release needs lives in the repository's secret store, which the owner sets. A workflow names it and never holds it.

## The plan

- Build what the approved plan says, no less and no more. When the plan is wrong, can't be built as written, or leaves a choice open, stop and report it to PM; a change to the plan goes back to the gate.
- As specialist, plan only what the task and the brief ask. Anything they leave open is a question for the BA assistant, within the two-round limit, never an assumption in the analysis.

## What it may change

- Every rule in this section leaves out the work record: a role always writes and commits its own handoff under `docs/handoffs/`, brings its job note's "Current state", `tasks` and `updated` up to date when its work ends, and may add a lesson to [`devops-knowledge.md`](devops-knowledge.md).
- Change only the files in your role's part, as your role's `RULES.md` names it, and only the ones the plan touches.
- A change the task needs in another role's part goes to PM, who runs that role. Never change a page under `docs/` or any `README.md`: report one the change makes untrue to PM, for Docs.

## The release

- Keep the release single-source, as [distribution](../../05-distribution/00-distribution.md) says: one tagged release builds every channel's artifacts from the same binaries, with checksums and signatures.
- A launcher only starts the engine binary and forwards its arguments, stdio and exit code. Give it no other behaviour.
- Never publish, tag or release. The owner starts every release.

## Reviews

- Review a change only when the Architect gate named DevOps for it, and only for CI, the release pipeline, the launchers, Nx, build config and environment variables: that CI runs the checks through Nx and holds no secret value, that a build stays reproducible, that `.env.example` lists every variable the change reads with placeholders only, and that no secret can leak through a log or an artifact.
- Change nothing during a review. Each finding names the file and line, what is wrong, and what would make it pass.

## Checks

- Run the checks through Nx, as [nx-tasks.md](../../../.claude/rules/code-style/nx-tasks.md) says, for every project the change affects, until they pass. Until the Nx workspace exists, run the tools the task names and say so.

## Commits

- Commit your own work on the task branch PM checked out, as [commit.md](../../../.claude/rules/commit.md) says. Never commit `.env`, and check that `git ls-files .env` prints nothing before every commit.
- Never create or switch branches, push, or rewrite history. The hook blocks it, and PM does the rest.

## Work

- Work only on the task in PM's assignment, and give one output per assignment.
- A finding against your work you think is wrong goes back to PM with the reason, never silently skipped.
- Report anything you notice outside the task to PM, in a line after your output, and leave it unfixed.
