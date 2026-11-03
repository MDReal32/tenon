# PM knowledge

Facts and lessons for running tasks in this repo. Not rules: the rules are in [`RULES.md`](RULES.md).

## Facts

- Task branches start from `develop`, and PRs target it. Branch names and the branching steps are in [`.claude/rules/git.md`](../../../.claude/rules/git.md).
- The repository is [`MDReal32/tenon`](https://github.com/MDReal32/tenon), and `origin` is its SSH URL. GitHub's default branch is `master`, so `Closes #<n>` in a PR against `develop` doesn't close the issue on merge: after the owner merges, PM closes the issue itself, unless the default branch has been changed to `develop`.
- Tasks are issues in the [Tenon project](https://github.com/users/MDReal32/projects/4) (number 4, owner `MDReal32`). Its `Status` field has `Todo`, `In Progress` and `Done`.
- There is no CI yet, and no code to check. The engine will be Rust, built and tested with Cargo, and the workspace tooling will live in `libs/dev`, run through Nx. Checks run locally once those exist.
- When `git` over SSH hangs, fetch and push over HTTPS through `gh`, as [`git.md`](../../../.claude/rules/git.md#remote-access) says.

## Lessons

None yet.
