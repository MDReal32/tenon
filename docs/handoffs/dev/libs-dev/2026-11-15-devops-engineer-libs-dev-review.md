---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/77"
role: devops-engineer
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/77-libs-dev-library
pr:
---

# DevOps review of the @tenon/dev library

PM asked the DevOps engineer to review [#77](https://github.com/MDReal32/tenon/issues/77), attempt 1, for CI, Nx and build-config soundness. #77 adds the bare private package `@tenon/dev` at `libs/dev` and lists it in the root `workspaces`, on the [libs/dev](libs-dev.md) job. [The Architect gate](2026-11-15-architect-gate-libs-dev-library.md) named DevOps as reviewer because widening `workspaces` changes the Nx project graph that the CI of [#18](https://github.com/MDReal32/tenon/issues/18) reads with `nx affected`. The review continues [the build](2026-11-15-programming-dev-libs-dev-library.md) and [the Docs writer's step](2026-11-15-docs-writer-libs-dev-library.md). PM asked four questions: whether a target-less project in `workspaces` makes CI fail or skip something that matters, whether `yarn install --immutable` accepts the committed `yarn.lock`, whether the `type` `commonjs` choice and the explicit `workspaces` path hold up, and whether the root `lint` gap under `nx affected` bites in this task. The verdict is Changes requested, with one finding, on the `type` field.

## What I did and how

I read the job note and its five handoffs, the build commit `0e13acf` and the docs commit `a324e43`, the root `package.json`, `nx.json`, `.yarnrc.yml`, `biome.json` and `.gitignore`, and the CI workflow `.github/workflows/ci.yml` as the local `chore/dev/18-ci` branch holds it. That workflow runs `yarn install --immutable` and then `yarn nx affected -t lint test build check --base="$BASE_SHA" --head=HEAD` on every pull request. I changed no file under review.

On Node v26.13.1 and Yarn 4.18.1, with the nvm Node 26 first on `PATH`, I ran the commands CI runs. `yarn install --immutable` exited 0 and left the working tree clean apart from the owner's `.idea` files; its only warnings are the `@monodon/rust` peer warnings, which come from the workspace of [#17](https://github.com/MDReal32/tenon/issues/17), not from this change. With the Nx daemon off and the cache reset, `yarn nx show projects --affected --base=develop --head=HEAD` printed `["@tenon/source","@tenon/dev"]`, and the CI command itself ran one task, the root's `lint`, which passed. `yarn nx show project @tenon/dev --json` shows root `libs/dev` and `"targets":{}`. `yarn nx show project @tenon/source --json` shows the root `lint` as the inferred `nx:run-script` target with no `cache` setting, so it is not cached. For the gap the gate flagged, `yarn nx show projects --affected --files=libs/dev/package.json` printed only `["@tenon/dev"]`, and the CI command with the same `--files` ran 0 tasks and exited 0.

To check the `type` field against the shape [the gate's verdict](2026-11-15-architect-gate-libs-dev-library.md) set for [#78](https://github.com/MDReal32/tenon/issues/78) and [#21](https://github.com/MDReal32/tenon/issues/21), I read how the installed Nx 24.0.6 loads an implementation: `getImplementationFactory` in `node_modules/nx/dist/src/config/schema-utils.js` sends a `.ts` path to `loadTsFile` in `node_modules/nx/dist/src/plugins/js/utils/register.js`, which, under Node's native type stripping, calls plain `require()` and falls back to swc or ts-node on a syntax error. Neither is installed. In the scratchpad I then made three throwaway packages, typed `commonjs`, `module` and no type, each with one `.ts` file in ESM syntax (`import`/`export`) and one in CommonJS syntax (`require`/`module.exports`), and loaded each file both with Node's `require()` and with Nx's own `loadTsFile` from the workspace's `node_modules`. Under `commonjs`, the ESM-syntax file fails in both: Node says "Cannot use import statement outside a module", and Nx stops with "could not be loaded under Node's native TypeScript stripping … Install @swc-node/register and @swc/core (or ts-node)". Under `module`, the ESM-syntax file loads through both. With no type field it loads too, but only after Node's module-syntax detection reparses it, with a warning.

## Why this way

The four questions get these answers. First, a project with no targets in `workspaces` does not fail CI: `nx affected -t …` simply has nothing to run on it. In this PR it skips nothing that matters, because the root `package.json` and `yarn.lock` change too, so `@tenon/source` is affected and its Biome `lint`, which checks `.` and so `libs/dev/package.json`, runs. Second, `yarn install --immutable` accepts the lockfile; the new entry has the same `0.0.0-use.local`, `unknown`, `soft` shape as the root's own workspace entry, and the change adds no external package, so the build stays reproducible. Third, the explicit `libs/dev` path is sound: Nx turns into projects only the `package.json` files the `workspaces` patterns match, so a glob would make any later folder under `libs/` a project before a plan approves it, and the explicit path costs one line per library. Fourth, the root `lint` gap does not bite in #77, for the reason in the first answer, but it is real: a later change confined to `libs/dev` runs zero tasks and passes green, which #78's plan must close, as the gate already said.

The `type` field is the one finding. The build chose `commonjs` because Nx loads implementations with `require()`, and set it against `module` for the top-level-await trap. Both facts are true, but the conclusion does not follow on Node 26: `require()` loads an ES module there unless it uses top-level await, and Nx's loader proved it with the `module` package. What `commonjs` does instead is make every `.ts` file in the package CommonJS, so the ESM `import`/`export` syntax TypeScript source is normally written in cannot run under the no-compile-step shape the gate set. #78 would then have to write `require()` and `module.exports` in TypeScript, where `import x = require()` is ruled out by `erasableSyntaxOnly` and a bare `require()` loses the import types, or add swc or ts-node, against the verdict's "no compile step". That is the rework condition 7 asked #77's choice to avoid, which is why I ask for the change now rather than leave it to #78. Leaving the field out lost because condition 1 asks for one, and Node warns and reparses each file then. I did not treat this as a gate matter: condition 7 leaves the value to #77, and only asks that it be recorded with its reason.

Leaving `nx.json` untouched is right: Nx finds the project through the Yarn workspace, and nothing in the graph needs a setting there.

## Checks

On Node v26.13.1 and Yarn 4.18.1: `yarn install --immutable` exited 0. `yarn nx affected -t lint test build check --base=develop --head=HEAD` ran one task, the root `lint`, and passed. `yarn nx show projects --affected` listed both projects for this branch and only `@tenon/dev` for a `libs/dev`-only change, where the same CI command ran 0 tasks and exited 0. The `type` behaviour was checked with throwaway packages in the scratchpad, through Node's `require()` and through Nx 24.0.6's `loadTsFile`, with the results above. I did not run CI itself: it lives on the unmerged #18 branch, and a `pull_request` workflow only runs on #77's PR once #18 is in `develop` and the PR gets a new push or is reopened.

## Where it stands

Done. The review is Changes requested, attempt 1, with one finding against `libs/dev/package.json` line 5, which is Programming dev's to fix, and the build handoff's reason for the `type` field with it. Everything else in DevOps' scope passes. Nothing waits on the owner.

## Next

PM sends the finding to Programming dev: set `"type": "module"` in `libs/dev/package.json`, keep `yarn install --immutable` passing, and record in the build handoff that Node 26 `require()` loads ES modules, so Nx's loader works, with no top-level await allowed in implementations. Then DevOps reviews attempt 2, which needs only the `type` change, a clean `yarn install --immutable`, and the same `nx affected` run.
