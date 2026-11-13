# DevOps knowledge

Facts and lessons for shipping Tenon and keeping its secrets. Not rules: the rules are in [`RULES.md`](RULES.md) and [`.claude/rules/`](../../../.claude/rules).

## Facts

- No code, CI or release exists yet. The release and its channels are in [distribution](../../05-distribution/00-distribution.md), and the launchers' place is `dist/` in [the repository layout](../../06-project/00-repository-layout.md).
- One engine binary per platform is the only thing built for users: aarch64 and x86_64 on macOS, Linux and Windows, with musl on Linux. GitHub Releases is the source of truth, and the npm, PyPI, Homebrew and winget launchers point at its archives.
- Every task runs through Nx, the Rust release build included, so there is no separate task runner.
- The CI workflows that run the checks are the Programming dev role's. The release workflow is DevOps'.
- The access hook is [`.claude/hooks/department-access`](../../../.claude/hooks/department-access): it lets only `devops-engineer` touch `.env`, and its tests are in `find-access-violation.test.mjs`.

## Lessons

None yet.
