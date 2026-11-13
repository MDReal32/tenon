---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-13"
status: done
branch: chore/dev/17-nx-workspace
pr: 66
---

# Programming dev owner review of the Nx workspace

PM asked a fresh Programming dev run to review, as the owner role of the root config, what the earlier run built for [#17](https://github.com/MDReal32/tenon/issues/17). It follows [the builder's handoff](2026-11-13-programming-dev-workspace.md) and [the gate's verdict](2026-11-13-architect-gate-workspace.md) on the [Nx workspace](nx-workspace.md) job. It is a separate handoff from the builder's, because owner review is a separate run. Nothing was fixed here.

## What I did and how

I read the handbook, Programming's and the dev role's rules, `nx-config.md`, then `git log` and the diff of `develop...HEAD`: `package.json`, `nx.json`, `biome.json`, `Cargo.toml`, `rust-toolchain.toml`, `.yarnrc.yml`, DevOps' `.gitignore` and `.gitattributes`, and the repository layout page change. The gate's nine criteria are not written in the repository (they sit in the gate's verdict on the issue, which I may not reach), so I took them from the job's handoffs: Corepack yarn install, the plugin registered and loading, `nx show projects`, Biome through Nx passing and failing on a violation, an empty Cargo workspace with no lockfile, no `xtask/`, and a clean `git status` apart from the owner's file.

## Why this way

On the two deviations. Biome's Markdown formatter and linter off: accepted. The Docs writer and markdownlint own the pages, Biome 2.6.7 failed about a hundred of them, and turning the language off keeps every other check running on those folders, which an ignore entry would not. `@nx/js` added then removed: accepted. No criterion needs it, it is gone from `package.json` and the lockfile, and the plan named no such dependency. The config fits `nx-config.md`: no `project.json`, no `nx` property, `build` pipeline once in `targetDefaults` with `^build` plus the finite checks, and the root `lint` inferred from the package script.

## Checks

On Node 26.13.1, after deleting `node_modules/` and `.nx/`: `yarn --version` 4.18.1 through Corepack. `yarn install` exit 0, with only the `@napi-rs/cli` peer warnings. `yarn nx show projects` prints `@tenon/source`. `yarn nx report` lists nx 24.0.6 and `@monodon/rust` 3.0.0. `yarn nx lint --skipNxCache` exit 0. With a temporary file holding `var` and `debugger`, exit 1; after removing it, exit 0. `cargo metadata --no-deps` exit 0, no `Cargo.lock`. No `xtask/`. `git status --short` shows only the owner's `.idea/vcs.xml`, so the ignores cover `node_modules/`, `.nx/` and `.yarn/install-state.gz`. `yarn.lock` was not changed by the install.

## Where it stands

Approved on the root config; no change to any config file is needed. One finding on the work record, in the builder's part: the builder's handoff still says `status: partial` and its "Where it stands" and "Next" say reviews and the DevOps step are to come, which is stale. The job note `nx-workspace.md` still says "Nothing is built yet" and "#17 waits on the owner", and its `updated` and "Current state" were not brought up to date when the build ended, as Programming's rules require. The `.gitignore`, `.gitattributes` and the docs change I read for fit only; they are DevOps' and the Docs writer's to judge.

## Next

PM sends the finding back to Programming dev (or does it with the final job-note update): set the builder's handoff to its true state, and rewrite the job note's "How it works" and "Current state" for the built workspace. Then the Architect reviewer and DevOps reviews finish, and the PR can leave draft.
