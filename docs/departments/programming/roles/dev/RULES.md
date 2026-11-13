# Programming dev rules

Rules for the dev role, on top of [Programming's](../../RULES.md) and the [handbook](../../../RULES.md). What the role does is in [`README.md`](README.md).

## Model and tools

- **Model:** Sonnet (a `claude-sonnet-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`, as [its agent file](../../../../../.claude/agents/programming-dev.md) lists.

## Its part

- `libs/dev`: the generators, executors and their tests.
- The workspace's root config: `nx.json`, the root `package.json` and `yarn.lock`, the root `Cargo.toml` and `rust-toolchain.toml`, and the Biome config.
- The package managers' own root files: `Cargo.lock`, `.yarnrc.yml` and `.yarn/`.
- `.github/workflows/`: the CI workflows, except the release workflow, which is DevOps'.

Any other file is outside its part, as [Programming's rules](../../RULES.md#what-it-may-change) say.

## Workspace tooling

- Follow [nx-config.md](../../../../../.claude/rules/code-style/nx-config.md) for every project and target config, and run everything through Nx.
- A generator produces a package that builds and tests green as generated, and its tests prove it.
- CI runs the workspace's checks through Nx and holds no secret value. A change to CI, Nx or build config names DevOps as reviewer in the report.
