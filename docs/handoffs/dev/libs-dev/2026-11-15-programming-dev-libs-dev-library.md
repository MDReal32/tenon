---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/77"
role: programming-dev
model: claude-sonnet-5-5
date: "2026-11-15"
status: done
branch: chore/dev/77-libs-dev-library
pr:
---

# Programming dev build of the @tenon/dev library

PM asked the Programming dev role to create the `@tenon/dev` library at `libs/dev` as a project in the root Nx workspace, for [#77](https://github.com/MDReal32/tenon/issues/77), the first sub-issue of [#19](https://github.com/MDReal32/tenon/issues/19), on the [libs/dev](libs-dev.md) job. The plan is [the Architect gate's verdict](2026-11-15-architect-gate-libs-dev-library.md), which continues [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md).

## What I did and how

I added `libs/dev/package.json` with `name` `@tenon/dev`, `version` `0.0.0`, `private` true and `type` `module` (first built as `commonjs`, changed in attempt 2, see below), and nothing else: no source, `main`, `exports`, collections, `tsconfig` or targets. I added `libs/dev` to the root `package.json` `workspaces` beside `"."`, ran `yarn install` on Yarn 4.18.1, and the only `yarn.lock` change is the six-line `@tenon/dev@workspace:libs/dev` entry. `nx.json` is untouched: Nx found the project through the Yarn workspace without it. Nothing comes from libramigo. I staged files by path, so the owner's `.idea` files stay out.

## Why this way

I listed the explicit path `libs/dev` rather than the `libs/*` glob. Only one library exists, the verdict named this path, and a glob would silently turn any future folder under `libs/` into a workspace before a plan approves it. A later library adds its own line, or the list moves to a glob then.

I chose `"type": "module"`. Node 26's `require()` loads ES modules, so Nx's loader, which calls `require()` on the `.ts` file under native type stripping, works with the `import`/`export` syntax TypeScript source is normally written in. The one limit is that implementations in `@tenon/dev` must not use top-level await. Leaving the field out lost because the gate's condition 1 asks for one, and Node warns and reparses each file then. My first choice, `commonjs`, lost: it makes every `.ts` file in the package CommonJS, so an ESM-syntax file fails to load, and #78 would have to write `require()` and `module.exports` or add swc or ts-node, against the verdict's "no compile step". My recorded reason, that Nx's `require()` needs CommonJS, was wrong on Node 26.

## Review finding and fix

[The DevOps review](2026-11-15-devops-engineer-libs-dev-review.md) of attempt 1 asked for one change: `"type": "commonjs"` stops an ESM-syntax `.ts` file from loading under Nx 24.0.6's native type stripping, and the package should be `module`. PM reproduced it. I set `"type": "module"` in `libs/dev/package.json` and changed nothing else.

## Checks

All run on Node v26.13.1 (the shell default was 24.4.1, so I put the nvm Node 26 first on `PATH`), from the repository root.

`yarn install` completed. `yarn nx show projects` printed `["@tenon/dev","@tenon/source"]`. `yarn nx show project @tenon/dev --json` printed root `libs/dev`, name `@tenon/dev`, `"targets":{}` and tag `npm:private`. `yarn nx run-many -t lint` ran 1 task, 1 succeeded (the root project's Biome `lint`). `yarn biome check libs package.json` passed. After the fix to `module`, on the same Node: `yarn install --immutable` completed with no lockfile change, `yarn nx show projects` printed the same two projects, `yarn nx show project @tenon/dev --json` still showed root `libs/dev` and `"targets":{}`, and `yarn nx run-many -t lint` ran 1 task, 1 succeeded. No tests or build exist for this package, as the verdict says.

## Where it stands

Done and committed, attempt 2 included. Nothing is open for the owner. DevOps is named as reviewer for the root workspace change, as the dev role's rules require.

## Next

DevOps reviews attempt 2, then the owner review and the Architect reviewer. The shape #78 and #21 must fit, from the verdict: no compile step, since Nx 24.0.6 runs `.ts` source with native type stripping on Node 26. Erasable syntax only: no `enum`, runtime `namespace` or parameter properties, and #78's `tsconfig` sets `erasableSyntaxOnly`. An `exports` map, if ever added, must list `./package.json`. Collections are `./executors.json` and `./generators.json`, with `implementation` paths that name an export after `#`. `@nx/devkit` is added by #78 and #21 pinned to the workspace's Nx version, not the hoisted 22.7.12, whose peer range excludes Nx 24. The `type` is `module`: Node 26's `require()` loads ES modules, so Nx's loader works, and implementations must not use top-level await. #78 brings `typescript` with a `typecheck` target and a test runner with a `test` target, and must settle how the root `lint` runs under `nx affected` once only `libs/dev` changes.
