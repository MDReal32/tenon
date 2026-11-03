# PM knowledge

Facts and lessons for running tasks in this repo. Not rules: the rules are in [`RULES.md`](RULES.md).

## Facts

- Task branches start from `develop`, and PRs target it. Branch names and the branching steps are in [`.claude/rules/git.md`](../../../.claude/rules/git.md).
- Tenon is not a git repository yet. Until it is, a run ends with the work and its handoffs in the working tree for the owner to review, and the branch and PR steps are skipped.
- There is no task tracker yet: the task is the owner's request in the session that starts the run.
- There is no CI yet, and no code to check. The engine will be Rust, built and tested with Cargo, and the workspace tooling will live in `libs/dev`, run through Nx. Checks run locally once those exist.
- When `git` over SSH hangs, fetch and push over HTTPS through `gh`, as [`git.md`](../../../.claude/rules/git.md#remote-access) says.

## Lessons

None yet.
