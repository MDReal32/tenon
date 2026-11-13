---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: devops-engineer
model: claude-opus-5-5
date: "2026-11-13"
status: partial
branch: chore/dev/17-nx-workspace
pr: 66
---

# DevOps engineer's root git files for the Nx workspace

PM asked the DevOps engineer, in the build step of [#17](https://github.com/MDReal32/tenon/issues/17), attempt 1, to add the root git entries the new workspace needs: new sections in `.gitignore` and a new `.gitattributes`. Both files are in the engineer's part since [#61](https://github.com/MDReal32/tenon/issues/61), as [the engineer's rules](../../../departments/devops/roles/engineer/RULES.md) say. The work continues [the Programming dev build](2026-11-13-programming-dev-workspace.md), which left `node_modules/`, `.nx/` and `.yarn/install-state.gz` untracked, and [the Architect gate's verdict](2026-11-13-architect-gate-workspace.md), which asked DevOps to decide whether `-diff` stays on the lockfiles. It serves the [Nx workspace](nx-workspace.md) job.

## What I did and how

I read the handbook, DevOps' rules and the engineer's rules, the job note, the Programming dev handoff with its plan and build, the gate's verdict, and the build commits `a20cc5c` and `beae498`. I then looked at what the installed tools write. The installed Nx 24.0.6 has two code paths that add `.nx/` subfolders to `.gitignore`: its init adds `.nx/cache`, `.nx/workspace-data` and `.nx/migrate-runs`, and its `.nx` installation path also adds `.nx/installation` and `.nx/self-healing`. The current `.nx/` holds only `workspace-data`, and `.yarn/` holds only `install-state.gz`. [The repository layout](../../../06-project/00-repository-layout.md) puts the launchers in a root `dist/` folder.

In `.gitignore` I kept the existing sections in their order and added five more in the file's `### <name>` style. `### Node` holds `node_modules/`. `### Yarn` holds Yarn's documented set for a project without zero-installs: `.pnp.*`, then `.yarn/*` with `!.yarn/patches`, `!.yarn/plugins`, `!.yarn/releases`, `!.yarn/sdks` and `!.yarn/versions`. `### TypeScript` holds `*.tsbuildinfo`. `### Nx` holds `/.nx/`, and `### Rust` holds `/target/`. The new `.gitattributes` holds two lines, `yarn.lock linguist-generated` and `Cargo.lock linguist-generated`, with no `-diff`. Both files went into one commit, `c29dd32`.

## Why this way

I left `dist/` out, although the plan's list named it. In [the repository layout](../../../06-project/00-repository-layout.md), the root `dist/` holds the launchers for npm, PyPI, Homebrew and winget, which are source that DevOps writes and git must track. Both an unanchored `dist/` and an anchored `/dist/` would ignore that folder, so the first launcher task would find its files silently left out of git. No TypeScript package exists yet that builds into a `dist/` of its own. The task that adds the first one can ignore that package's output by its own path, which DevOps then adds.

I anchored `target/` to the root as `/target/`. Cargo writes its build output only at the workspace root, since every crate shares the root workspace's target directory. An unanchored `target/` would also hide any source folder named `target` deeper in the tree, such as a `src/target/` module in a crate. That is a plausible name in a generator like Tenon, where a generation target is a domain word. I anchored `/.nx/` for the same reason. Nx keeps its local state only at the workspace root. Ignoring the whole folder, rather than Nx's own list of subfolders, also covers any subfolder a later Nx adds. That is safe because this workspace installs Nx as a dev dependency and has no `.nx/` file to track, such as the wrapper that a `.nx` installation commits. `node_modules/` stays unanchored, since nested workspaces get their own `node_modules/`.

I kept Yarn's documented `.yarn/*` block whole instead of ignoring only `install-state.gz`. That covers the cache and the other local state Yarn may write, while patches, plugins and a checked-in release stay trackable, and the block can be checked against Yarn's docs at a glance. `.pnp.*` is part of that block. It ignores nothing while `.yarnrc.yml` sets the `node-modules` linker, but it stops a `.pnp.cjs` from being committed by accident if the linker ever changes. I added `*.tsbuildinfo` because no one ever wants TypeScript's incremental build state tracked, and having it already in place spares the first TypeScript task a separate DevOps step for it. `Cargo.lock` stays out of `.gitignore`: once a crate exists, Cargo writes it and the dev role commits it.

I dropped `-diff` from the lockfiles. The overview's pull request size rules in [the departments overview](../../../departments/README.md) ask only for `linguist-generated`. That mark is enough to make GitHub collapse the file in a PR's diff and leave it out of the size and the language stats. `-diff` goes further: it makes git treat the lockfile as binary, so `git diff`, `git show` and `git log -p` print only "Binary files differ". Every department review reads changes through those commands, and the rules give a dependency bump its own PR, where the lockfile diff is the thing to review: which versions changed, and whether a dependency arrived that nobody asked for. Hiding that diff would cost the supply-chain check more than the noise it saves. `-diff` would also break a patch that carries a lockfile change, since `git format-patch` leaves the binary part out unless it gets `--binary`.

## Checks

On Node 26.13.1 with Yarn 4.18.1, `yarn nx lint --skipNxCache` succeeded: Biome checked 189 files with no errors. Biome reads the new `.gitignore` through `vcs.useIgnoreFile`. For criterion 9, `git status --short` after the change shows only the owner's modified `.idea/vcs.xml`, and before the commit it also showed the two files being changed. `node_modules/`, `.nx/` and `.yarn/` now appear only under `--ignored`. No `Cargo.lock` or `target/` exists, since the empty Cargo workspace writes neither.

To check the patterns on paths that don't exist yet, I created empty probe files and checked them with `git status --short --ignored --untracked-files=all`, then removed them. `target/debug/probe`, `.pnp.cjs` and `probe.tsbuildinfo` showed as ignored. `Cargo.lock`, `dist/npm/probe.js` and `crates/probe/src/target/probe.rs` showed as untracked, so they would still be committed. `git show --stat beae498 -- yarn.lock` still counts lines for the lockfile, so git diffs it as text. `git ls-files .env` printed nothing before the commit.

The project hook blocks `git check-attr` and `git check-ignore` for department roles, so PM must run the `git check-attr linguist-generated diff -- yarn.lock Cargo.lock` the assignment asked for. The expected output is `set` for `linguist-generated` and `unspecified` for `diff` on both files. An attempt to repeat the probe in a throwaway repository in the scratchpad was also blocked, at `git init`.

## Where it stands

Partial. The two git files are committed on `chore/dev/17-nx-workspace` as `c29dd32`, with this handoff in its own commit. The DevOps review of the whole PR is still to come, as a separate, fresh run. One note for the Programming dev role, outside this part: `biome.json` excludes `!**/dist` and `!**/target`. The first would hide the launcher sources in the root `dist/` from Biome, and the second would hide any source folder named `target`. The job note's "Current state" is out of date, and PM's assignment kept it out of this step.

## Next

PM runs `git check-attr linguist-generated diff -- yarn.lock Cargo.lock` and quotes it in the PR. Then the route goes on to the Docs writer, the Architect reviewer and the DevOps review. The first task that adds a TypeScript package with its own build output asks DevOps to ignore that output by its path, never as a bare `dist/`.
