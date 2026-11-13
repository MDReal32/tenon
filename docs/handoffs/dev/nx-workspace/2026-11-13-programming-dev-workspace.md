---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-13"
status: partial
branch: chore/dev/17-nx-workspace
pr:
---

# Programming dev analysis of the Nx workspace task

PM asked the Programming dev role, as specialist, to plan how to build [#17](https://github.com/MDReal32/tenon/issues/17): one Nx workspace with Yarn, Cargo, `@monodon/rust` and Biome. It continues [the BA readiness check](2026-11-13-ba-assistant-workspace-readiness.md) and serves the [Nx workspace](nx-workspace.md) job. This step builds nothing in the repository. It returns a plan for the gate.

## What I did and how

I read the handbook, Programming's and the dev role's rules, the Nx config and Nx task rules, the job note and the BA handoff. I then checked every version against the registries and the installed tools, and proved the planned config shapes in a throwaway workspace in the session's scratchpad, outside the repository, with the exact packages the plan names. Nothing in the repository changed except this handoff.

Verified versions: `npm view` gives `nx` 24.0.6 (latest), `@nx/js` 24.0.6, `@monodon/rust` 3.0.0 (published 2026-06-01, the only major past 2.3.0), `@biomejs/biome` 2.6.7 (latest). The Yarn registry lists 4.18.1 as stable, and `corepack yarn --version` printed 4.18.1 for `packageManager: yarn@4.18.1` with Corepack 0.33.0. Local tools are Node 24.4.1, rustup 1.28.2, rustc and cargo 1.97.1. The Node release index shows the current LTS as 26 (Lithium, 26.13.1, LTS since 2026-10-28), with 24 (Krypton, 24.22.3) now in maintenance. The local Node 24.4.1 is therefore not the current LTS line.

Findings from the scratch workspace. A Cargo workspace with `members = []` is accepted by `cargo metadata`, which returns empty package lists, and it writes no `Cargo.lock`. `@monodon/rust` 3.0.0 registered as `"plugins": ["@monodon/rust"]` loads under Nx 24.0.6: `nx show projects` runs with no error and `nx report` lists the plugin. The plugin pins `@nx/devkit ^22`, and that devkit lists the peer `nx >=21 <=23`, so it sits beside Nx 24 outside its declared range. Yarn only warned that `@napi-rs/cli` is an unmet peer (needed for napi crates, not for this task). Plugin loading works regardless, and the real range test comes when a crate exists. A package script is the shape the Nx config rule prefers, so Biome runs as a root `package.json` script `"lint": "biome check ."`. With `"workspaces": ["."]` Yarn and Nx treat the root as a project and infer `lint` from the script, without `project.json` and without the forbidden `nx` property. `yarn nx show projects` then prints the root project and `yarn nx lint` runs Biome, exits non-zero on a violation, and passes when the violating files are in Biome's `files.includes` negations. Biome 2.6.7 deprecates `"recommended": true` and wants `"preset": "recommended"`.

## Why this way

The root project beats a `project.json` with `nx:run-commands`, because the rule forbids a `project.json` that only repeats a script. It beats a global `biome check` outside Nx,, since the repository layout says every task runs through Nx. No official `@nx/biome` plugin exists (404 on the registry).

For the finite checks, `build.dependsOn` lists `^build` plus the names the rule lists. Nx ignores a dependency whose target the project doesn't have, so naming `typecheck`, `lint`, `test`, `format:check`, `check`, `validate`, `prebuild`, `codegen` and `generate` there is not an empty target and is not invented. The rule says "every applicable one the project provides", so the set is the rule's list.

The owner's Node answer is "each lts versions". The newest LTS is 26, not the 24 on this machine. The plan pins `engines.node` to `>=26` only if the gate accepts 26. The alternative, 24, is the maintenance line.

## Checks

Registry and tool queries above, plus the scratch-workspace runs (`yarn install`, `yarn nx show projects`, `yarn nx lint`, `cargo metadata`, `biome check`). The full repository `.claude/settings.json` fails `biome check` at the default line width because its `args` array is longer than 80 characters. That is the one existing file beyond the hook and Obsidian files that trips the check. Nothing else was run: no build exists to check.

## Where it stands

Partial: the analysis is returned to PM and this handoff is committed. Two things are open for the gate or the owner: the Node line (26 against 24) and what to do with `.claude/settings.json` (ignore all of `.claude`, or set a wider `lineWidth`, untested).

## Next

After both gate approvals, build as the analysis says, run `yarn install`, `yarn nx show projects` and `yarn nx lint` in the real repository, commit, and write the programming report. DevOps then adds the `.gitignore` and `.gitattributes` entries the analysis lists.
