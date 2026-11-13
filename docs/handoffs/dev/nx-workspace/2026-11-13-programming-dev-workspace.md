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

# Programming dev analysis of the Nx workspace task

PM asked the Programming dev role, as specialist, to plan how to build [#17](https://github.com/MDReal32/tenon/issues/17): one Nx workspace with Yarn, Cargo, `@monodon/rust` and Biome. It continues [the BA readiness check](2026-11-13-ba-assistant-workspace-readiness.md) and serves the [Nx workspace](nx-workspace.md) job. This step builds nothing in the repository. It returns a plan for the gate.

## What I did and how

I read the handbook, Programming's and the dev role's rules, the Nx config and Nx task rules, the job note and the BA handoff. I then checked every version against the registries and the installed tools, and proved the planned config shapes in a throwaway workspace in the session's scratchpad, outside the repository, with the exact packages the plan names. Nothing in the repository changed except this handoff.

Verified versions: `npm view` gives `nx` 24.0.6 (latest), `@nx/js` 24.0.6, `@monodon/rust` 3.0.0 (published 2026-06-01, the only major past 2.3.0), `@biomejs/biome` 2.6.7 (latest). The Yarn registry lists 4.18.1 as stable, and `corepack yarn --version` printed 4.18.1 for `packageManager: yarn@4.18.1` with Corepack 0.33.0. Local tools are Node 24.4.1, rustup 1.28.2, rustc and cargo 1.97.1. The Node release index shows the current LTS as 26 (Lithium, 26.13.1, LTS since 2026-10-28), with 24 (Krypton, 24.22.3) now in maintenance. The local Node 24.4.1 is therefore not the current LTS line.

Findings from the scratch workspace. A Cargo workspace with `members = []` is accepted by `cargo metadata`, which returns empty package lists, and it writes no `Cargo.lock`. `@monodon/rust` 3.0.0 registered as `"plugins": ["@monodon/rust"]` loads under Nx 24.0.6: `nx show projects` runs with no error and `nx report` lists the plugin. The plugin pins `@nx/devkit ^22`, and that devkit lists the peer `nx >=21 <=23`, so it sits beside Nx 24 outside its declared range. Yarn only warned that `@napi-rs/cli` is an unmet peer (needed for napi crates, not for this task). Plugin loading works regardless, and the real range test comes when a crate exists. A package script is the shape the Nx config rule prefers, so Biome runs as a root `package.json` script `"lint": "biome check ."`. With `"workspaces": ["."]` Yarn and Nx treat the root as a project and infer `lint` from the script, without `project.json` and without the forbidden `nx` property. `yarn nx show projects` then prints the root project and `yarn nx lint` runs Biome, exits non-zero on a violation, and passes when the violating files are in Biome's `files.includes` negations. Biome 2.6.7 deprecates `"recommended": true` and wants `"preset": "recommended"`.

## Why this way

The root project beats a `project.json` with `nx:run-commands`, because the rule forbids a `project.json` that only repeats a script. It beats a global `biome check` outside Nx, since the repository layout says every task runs through Nx. No official `@nx/biome` plugin exists (404 on the registry).

For the finite checks, `build.dependsOn` lists `^build` plus the names the rule lists. Nx ignores a dependency whose target the project doesn't have, so naming `typecheck`, `lint`, `test`, `format:check`, `check`, `validate`, `prebuild`, `codegen` and `generate` there is not an empty target and is not invented. The rule says "every applicable one the project provides", so the set is the rule's list.

The owner's Node answer is "each lts versions", and BA settled it as the 26 LTS line (Lithium), pinned only in `engines.node` as `^26`, with no `.nvmrc` or `.node-version`. The 24 on this machine is the older LTS line.

For the Nx major the owner wrote "i wanted latest nx. if possible. otherwise 23 is okay too". Nx 24.0.6 is possible: with `@monodon/rust` 3.0.0 a library crate added to the Cargo workspace is listed by `yarn nx show projects`, and with `build`, `test` and `lint` targets declared in its `project.json` (executors `@monodon/rust:build`, `:test`, `:lint`), `yarn nx build` and `yarn nx test` exit 0. A `build` run first ran `test` and `lint` through the `targetDefaults` `dependsOn`, so the default does not break it. The plugin source (`src/graph.js`) shows what it infers: the project and its dependencies, plus only a `nx-release-publish` target, with a TODO for other defaults. It infers no `build`, `test` or `lint`, so those must come from a crate's `project.json` or a `targetDefaults` entry keyed by executor. That holds for every Nx version, so it is not a reason to prefer 23. An attempt to repeat the proof on Nx 23.3.2 did not take effect (Yarn kept 24.0.6), and since 24 works it was dropped. The throwaway workspace and crate were deleted.

## Checks

Registry and tool queries above, plus the scratch-workspace runs (`yarn install`, `yarn nx show projects`, `yarn nx lint`, `cargo metadata`, `biome check`). The full repository `.claude/settings.json` fails `biome check` at the default line width because its `args` array is longer than 80 characters. That is the one existing file beyond the hook and Obsidian files that trips the check. The attempt 2 proof is described under "Why this way"; it ran on Node 24.4.1, not 26. The build step needs Node 26 installed to run the final checks, and Node 25 and later no longer bundle Corepack as far as I recall (not verified here), so Corepack may need installing separately.

## Build

PM then started the build of the approved plan, as attempt 1 of the build step. I wrote `package.json` (private root package `@tenon/source`, `packageManager` `yarn@4.18.1`, `engines.node` `^26`, `workspaces: ["."]`, a `lint` script running `biome check .`, and the three pinned dev dependencies: `nx`, `@monodon/rust` and `@biomejs/biome`), `.yarnrc.yml` (`nodeLinker: node-modules`, telemetry off), `nx.json` (the `@monodon/rust` plugin and `targetDefaults` with `build.dependsOn` holding `^build` plus the finite checks, and no cache on the root `lint`), `Cargo.toml` (empty workspace, resolver 3), `rust-toolchain.toml` (`stable`), `biome.json` and the generated `yarn.lock`. I added no crate, package or `project.json`.

Biome 2.6.7 also formats and lints Markdown by default, which made `biome check .` fail on about a hundred pages and agent files that the Docs writer and markdownlint own. I turned the Markdown formatter and linter off in `biome.json` instead of ignoring the files, so the rest of the check still sees them. Biome ignores come from `vcs.useIgnoreFile` and also from explicit `node_modules`, `target`, `dist`, `.nx` and `.yarn` entries, because `.gitignore` doesn't list them yet, plus the hook, `.claude/settings.json` and `docs/.obsidian`. The license field is left out, since no license is decided.

All checks ran on Node 26.13.1 with Corepack 0.36.0 (`corepack enable`, then `yarn` is 4.18.1). From a state with no `node_modules/` and no `.nx/`, `yarn install` exits 0 with only the peer warnings that `@tenon/source` does not provide `@napi-rs/cli` (requested by `@monodon/rust`), and the nx build-script notice. `yarn nx show projects` prints `@tenon/source`; `yarn nx report` lists `@monodon/rust` 3.0.0 on nx 24.0.6; `cargo metadata --no-deps` exits 0 and writes no `Cargo.lock`; `yarn nx lint` exits 0, exits 1 with a temporary `tmp-violation.js` (removed), and exits 0 again; there is no `xtask/`.

PM then asked about `@nx/js` 24.0.6, which my first build commit had added without being in the plan. No criterion needs it: I removed it, reinstalled from a clean state on Node 26, and `yarn install` (same peer warnings), `yarn nx show projects`, `yarn nx report` (nx 24.0.6, `@monodon/rust` 3.0.0) and `yarn nx lint` (exit 0, exit 1 on a temporary violation, exit 0 after removing it) all still pass. The lockfile shrank by about 1,900 lines. The Markdown deviation above (Biome's Markdown formatter and linter off in `biome.json`) stands: Biome 2.6.7 otherwise failed `biome check .` on pages the Docs writer and markdownlint own.

After DevOps committed the `.gitignore` entries, PM found that the explicit `!**/node_modules`, `!**/target`, `!**/dist`, `!**/.nx` and `!**/.yarn` ignores in `biome.json` would hide the launchers' root `dist/` sources and any source folder named `target`. I removed them, since `vcs.useIgnoreFile` now reads `.gitignore`; only the hook, `.claude/settings.json` and `docs/.obsidian` stay explicit. `yarn nx lint --skipNxCache` exits 0 and Biome checks 190 files, the same 190 the old config gives on today's tree (the one file more than the 189 before is DevOps' new `.gitattributes`), so the ignores changed nothing.

The DevOps review then found that `nx.json` set no `analytics` value, so in Nx 24.0.6 a person's first interactive `yarn nx` outside CI would ask "Share usage data with the Nx team?" and write the answer into the tracked file. I checked the installed `nx/dist/src/utils/analytics-prompt.js`, which skips the prompt when `nxJson.analytics` is a boolean, and added `"analytics": false`, matching `enableTelemetry: false` in `.yarnrc.yml`. On Node 26, `yarn nx show projects` and `yarn nx lint --skipNxCache` pass and `git status --short` shows only `.idea/vcs.xml`.

## Where it stands

Done. The root files are built and committed on the task branch (PR 66). The DevOps git files and the Docs writer are done, the Programming dev owner review approved ([the review](2026-11-13-programming-dev-workspace-review.md)), and the DevOps review's analytics fix is in. Analysis attempt 2 had been returned to PM before. BA and the owner settled the open questions: Nx 24.0.6, Node `^26` in `engines` only, `!.claude/settings.json` in Biome's ignores, no `@napi-rs/cli`, no `enableScripts`. The plugin infers no `build`, `test` or `lint` targets, which the crate tasks must handle.

## Next

The Architect reviewer reviews the change next.
