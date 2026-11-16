---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: devops-engineer
model: claude-opus-5-5
date: "2026-11-16"
status: done
branch: chore/dev/78-docs-check
pr: 84
---

# DevOps review of the docs check

PM asked the DevOps engineer to review [#78](https://github.com/MDReal32/tenon/issues/78), attempt 1, for CI, Nx and build-config soundness only, on the [libs/dev](libs-dev.md) job. #78 adds the docs check executor to `@tenon/dev` and runs it from the root project as `docs:check`. [The Architect gate](2026-11-15-architect-gate-docs-check.md) named DevOps because the change touches the root Nx config, the affected graph and the lockfile. The parts under review were the new root `project.json`, the `"@tenon/dev": "workspace:*"` dev dependency in the root `package.json`, `libs/dev/package.json` (the `executors` field, the `lint`, `typecheck` and `test` scripts, the exact pins and the `nx` dev dependency), `libs/dev/executors.json`, `libs/dev/tsconfig.json`, the `yarn.lock` change and the affected behaviour. The executor's logic was out of scope. The review continues [the build](2026-11-15-programming-dev-docs-check-analysis.md) and [the Docs writer's step](2026-11-16-docs-writer-docs-check.md), and builds on [my review of #77](2026-11-15-devops-engineer-libs-dev-review.md), which settled `"type": "module"`. The verdict is Approved, with no findings.

## What I did and how

I read the job note and the handoffs the brief pointed at: the gate verdict with its eight build conditions, the build handoff, my #77 review and the Docs writer's handoff. Then I read the branch's diff against `develop` for every file in scope, plus `nx.json`, `biome.json`, `.yarnrc.yml` and `.github/workflows/ci.yml`. The configuration lives in commit `c5fb886` (the `build(dev)` commit), and the executor source and tests in `c931afc`. I changed no file under review.

Every command ran on Node v26.13.1 and Yarn 4.18.1, with nvm's Node 26 first on `PATH`, the Nx daemon off and Nx Cloud off. For the lockfile, I listed every entry the diff adds and wrote a throwaway script in the scratchpad that walks the lockfile's dependency graph. The only other existing entry that changed is `@tenon/dev`'s own, which gains the `workspace:*` descriptor and the eight declared dependencies. I checked the platform packages and the peer requirements with `yarn explain peer-requirements`, and found where each `@nx/devkit` copy is installed and which one the executor's import resolves to.

For Nx, I read the resolved configuration of both projects with `yarn nx show project`, and the project graph's edges with `yarn nx graph --file`. I ran each target in scope with `--skip-nx-cache`, and listed the affected projects for the branch and for three made-up change sets. I ran CI's own command locally, `yarn nx affected -t lint test build check`, for the branch and for a change confined to `libs/dev`. To test the `docs:check` cache and its exit code, I ran the target twice. Then I added a throwaway untracked page, `docs/zz-devops-probe.md`, holding one broken link, ran the target again, deleted the page and ran it once more. `git status` was clean afterwards.

## Why this way

The root `project.json` is sound. Nx merges it with the root `package.json`, so `@tenon/source` keeps its inferred `lint` and gains `docs:check` with the executor `@tenon/dev:docs-check`, `cache: true` and the input `{workspaceRoot}/**/*`. The whole-workspace input is right, since a link can reach any tracked file. Nx hashes only files that are not gitignored, so `node_modules` and `.nx` stay out of the hash, while `yarn.lock` and the executor's own source stay in. The probe proved it: the second run was a cache hit; adding one file caused a miss and a failing run with exit 1, naming `docs/zz-devops-probe.md:3`; removing the file brought the cache hit back. Nx does not cache a failed run, so a broken page can never replay as a pass. The colon in `docs:check` resolves cleanly with `yarn nx run @tenon/source:docs:check`, and the name stays out of CI's `lint test build check` list and out of the `build` target's `dependsOn` in `nx.json`, as the plan meant.

The `workspace:*` dev dependency is what links the executor in. `node_modules/@tenon/dev` is a symlink to `libs/dev`, and Nx finds `executors.json` through the package's `executors` field. It also adds the static graph edge from `@tenon/source` to `@tenon/dev`. So a change confined to `libs/dev` affects both projects, while a docs-only change affects only `@tenon/source`, which owns `docs/`. That edge is one way, so there is no cycle.

The gap I flagged in #77 is closed. A change confined to `libs/dev` used to run 0 tasks under CI's command. It now runs `@tenon/dev:lint`, `@tenon/dev:test` and the root `lint`. The gate accepted the double lint over `libs/dev`, and it costs about one second.

The pins are exact, and the lockfile holds nothing that `libs/dev/package.json` doesn't ask for. Of the lockfile's 191 entries, 190 are reachable from the two workspaces. The one the walk doesn't reach is `typescript@patch:…#optional!builtin<compat/typescript>`, the compatibility patch Yarn adds for every `typescript` dependency, so it is expected. Every other new entry traces back to one of the eight declared packages. The `@typescript/typescript-*` platform binaries are optional, gated by `os`/`cpu` conditions and stored without a checksum, the same way the existing Biome and Nx platform packages are, so CI on `ubuntu-24.04` fetches only its own binary. The `nx` dev dependency is right. Without it, `@nx/devkit` 24.0.6's peer on `nx` would be unmet. With it, Yarn reports the peer as met by the same single `nx` 24.0.6 at the root, and no second copy is installed. `@nx/devkit` 24.0.6 is hoisted to the root, where the executor's import resolves it. The older 22.7.12 moved under `node_modules/@monodon/rust/node_modules`, where only `@monodon/rust` sees it. The only failing peer requirements, `pb1be7c` and `p2ae2fd`, come from `@monodon/rust`, which was already there, not from this change.

`libs/dev/tsconfig.json` fits the no-compile-step shape #77 settled. `noEmit`, `allowImportingTsExtensions`, `verbatimModuleSyntax`, `erasableSyntaxOnly` and `isolatedModules` keep the source runnable under Node 26's type stripping, and `types: ["node"]` makes the Node types explicit. The `test` script hands the glob to Node's own test runner, which expands it on every platform. The `lint` script finds the root `biome.json` and checks 47 files.

## Checks

On Node v26.13.1 and Yarn 4.18.1, `yarn install --immutable` exited 0 and left the tree clean, and its only warnings are the existing `@monodon/rust` ones. `yarn nx show projects` lists `@tenon/dev` and `@tenon/source`. `yarn nx show project @tenon/source --json` shows the name `@tenon/source`, the inferred `lint` and `docs:check` with its executor, `cache: true` and `{workspaceRoot}/**/*`. `@tenon/dev` shows `lint`, `typecheck` and `test` as `nx:run-script` targets. The graph has one edge, a static one from `@tenon/source` to `@tenon/dev`.

Each of these exited 0 with `--skip-nx-cache`. `yarn nx run @tenon/source:docs:check` passed on 177 Markdown files. `yarn nx run @tenon/dev:test` ran 21 tests, all passing. `yarn nx run @tenon/dev:typecheck` and `yarn nx run @tenon/dev:lint` passed, and `yarn nx run @tenon/source:lint` passed on 257 files.

For the affected list, `yarn nx show projects --affected --base=develop --head=HEAD` printed both projects. `--files=libs/dev/src/docs-check/executor.ts` and `--files=yarn.lock` printed both, and `--files=docs/tenon.md` printed only `@tenon/source`. `yarn nx affected -t lint test build check --base=develop --head=HEAD` ran `@tenon/dev:lint`, `@tenon/source:lint` and `@tenon/dev:test` and exited 0. With `--files=libs/dev/src/docs-check/executor.ts` it ran the same three tasks. The cache probe gave hit, miss with exit 1, then hit.

Not run: CI itself, and the tests on Linux. Docker is installed but its daemon is not running, and I did not start it. `@tenon/dev:test` will run on `ubuntu-24.04` for the first time on this PR's CI run, so that run is the Linux proof.

## Where it stands

Done. The verdict is Approved for #78, attempt 1, with no findings in DevOps' scope. Only this handoff is committed. As the brief asked, I left the job note's "Current state" for PM to bring up to date. Nothing waits on the owner. As the task settles, `typecheck` and `docs:check` still don't run in CI. That is the Backlog candidate already recorded, not a finding.

## Next

The task goes on along its route: the owner review, with this approval in the PR description, then the Architect reviewer. Once PR 84's CI has run, PM should check that `@tenon/dev:test` passed on `ubuntu-24.04`, since that is its first run on Linux. If it fails, the failure goes to Programming dev. PM runs `yarn nx run @tenon/source:docs:check` once more after the last handoff commit, as the gate asked.
