---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/77"
role: architect-gate
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/77-libs-dev-library
pr:
---

# Architect gate on the @tenon/dev library

PM asked the Architect gate for the technical half of the gate on [#77](https://github.com/MDReal32/tenon/issues/77), the first of two sub-issues of [#19](https://github.com/MDReal32/tenon/issues/19). It creates the `@tenon/dev` library at `libs/dev` on the [libs/dev](libs-dev.md) job. It continues [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md), which split #19 into this library and the docs check executor in [#78](https://github.com/MDReal32/tenon/issues/78). PM also asked which targets the library should have now, whether it needs a TypeScript compile step and a test runner yet, and which package shape the plan must settle so that #78 and [#21](https://github.com/MDReal32/tenon/issues/21), the crate generator, fit without rework. The verdict is Approved, size S, with build conditions, DevOps added to the route, and no question for the owner.

## What I did and how

I read the handbook, Architect's rules and the gate's rules, then passed the start-up check: the model is `claude-opus-5-5` and the tools are Read, Grep and Glob. I read the job note, the BA handoff, the [Nx workspace](../nx-workspace/nx-workspace.md) job note and [the gate's verdict on #17](../nx-workspace/2026-11-13-architect-gate-workspace.md). Then I read the workspace as the task branch has it: the root `package.json` with `workspaces: ["."]`, `nx.json` with only analytics off, the `@monodon/rust` plugin and `build.dependsOn`, `biome.json`, `rust-toolchain.toml`, `.yarnrc.yml` with `nodeLinker: node-modules`, and `.gitignore`. I also read [the repository layout](../../../06-project/00-repository-layout.md), [the roadmap](../../../06-project/01-roadmap.md), [nx-config.md](../../../../.claude/rules/code-style/nx-config.md), nx-tasks.md, [typescript.md](../../../../.claude/rules/code-style/typescript.md), and [Programming's rules](../../../departments/programming/RULES.md) with the dev role's.

To answer the shape question from the installed code rather than from memory, I checked the versions in `node_modules`. Nx is 24.0.6. `@monodon/rust` is 3.0.0. The hoisted `@nx/devkit` is 22.7.12, pulled in by the plugin, with a peer range that excludes Nx 24. TypeScript is not installed. I then read how Nx 24.0.6 resolves and loads executors and generators: `schema-utils.js`, `executor-utils.js`, `generator-utils.js`, `resolve-plugin.js`, `in-process-loader.js`, `transpiler.js`, `register.js` and `package-json.js` under `node_modules/nx/dist/src`. For a workspace package, Nx looks for an implementation in source first. It loads `.ts` with Node's native type stripping when the runtime has it, which Node 26 does by default, and registers no transpiler then. It reads the package's `package.json` by module resolution and falls back to the local project only on `MODULE_NOT_FOUND`. And it takes a named export after `#` in a collection's `implementation`.

I went through the six gate checks. The task adds no crate and no engine code, so the four axes hold. The package sits where the layout page puts it, and nothing imports it but Nx. It follows the layout and roadmap and settles nothing open. It changes no contract. It fits one PR with room to spare.

## Why this way

The library gets no targets now. nx-config.md forbids empty targets, and the package has no source to lint, test, build or type-check. The root `lint` already reaches its `package.json`, and this PR changes the root `package.json` too, so CI lints it once [#18](https://github.com/MDReal32/tenon/issues/18) merges. Adding a `lint` script now lost, because it would check one JSON file twice for no gain. It belongs with #78, when there is code that the root `lint` would otherwise miss under `nx affected`.

Neither a compile step nor a test runner is needed now, and a compile step isn't needed for #78 either. Nx runs `.ts` source directly on Node 26, so a `build` target would only make output nothing reads. #78 brings `typescript` with a `typecheck` target and a test runner, because it adds the first behaviour, and Programming's rules require tests with behaviour. Adding them in #77 lost, because nothing would exercise them, and the rules forbid adding dependencies or targets the plan doesn't need. Choosing the test runner is left to #78's plan. I named `node:test` only as an option, since the gate doesn't decide what the rules leave to the plan.

The package carries no `src/main.ts`, `exports`, `executors.json` or `generators.json` yet. Each would be a placeholder with nothing behind it. Instead, the verdict records the shape the later tasks must keep, so they need no rework: collections with named-export `implementation` paths, no `exports` map unless it lists `./package.json`, erasable TypeScript syntax only, a pinned `@nx/devkit` that matches Nx rather than the hoisted 22.7.12, and a `type` field chosen once in #77.

I added DevOps to the route. PM's route said DevOps had nothing to do. But widening `workspaces` changes the Nx project graph that #18's `nx affected` reads, and both the gate's rules and the dev role's rules name DevOps for Nx or build config. QA and Cyber security have nothing to check. I sized the task S rather than M: unlike #17, it wires no new tools together and adds no dependency.

## The verdict

Approved for #77, size S. The build must settle these conditions:

1. Package shape now: `libs/dev` holds only `package.json`, with `"name": "@tenon/dev"`, `"private": true`, `"version": "0.0.0"` and the `type` field condition 7 settles. No `src/`, `main`, `exports`, `executors`/`generators` fields, collection files or `tsconfig`.
2. Targets now: none. No `lint`, `test`, `build`, `check` or `typecheck` on `@tenon/dev`; nx-config.md forbids empty targets and Biome already reaches `libs/dev/package.json` through the root `lint`.
3. Workspaces: add `libs/dev` to the root `workspaces` and keep `"."`. The plan picks the explicit path or `libs/*` and says why. Run `yarn install` and commit `yarn.lock`.
4. `nx.json`: change it only if the build proves Nx needs it to find the project; otherwise say in the PR description that it stays untouched.
5. Proof on Node 26 through Nx: `yarn nx show projects` lists `@tenon/dev` next to `@tenon/source`; `yarn nx show project @tenon/dev --json` shows root `libs/dev` and no targets; `yarn nx run-many -t lint` passes. Report each command and its result.
6. Nothing from libramigo, in files, config or dependencies.
7. The shape #78 and #21 must fit, recorded in the build's handoff: no compile step (Nx 24.0.6 runs `.ts` source with native type stripping on Node 26); erasable syntax only (no `enum`, runtime `namespace` or parameter properties, with `erasableSyntaxOnly` in #78's `tsconfig`); an `exports` map, if ever added, must list `./package.json`; collections `./executors.json` and `./generators.json` with `implementation` paths that name an export after `#`; `@nx/devkit` added by #78 and #21 pinned to the workspace's Nx version, not the hoisted 22.7.12; and the `type` field chosen in #77 with its reason (Nx loads implementations with `require()`, so no top-level await if `"type": "module"`). The first behaviour, in #78, brings `typescript` with a `typecheck` target and a test runner with a `test` target; the runner is #78's plan to choose.

Route: Programming dev, Docs writer, the owner review (Programming dev plus the DevOps review), then the Architect reviewer. QA none; Cyber security none.

## Checks

I ran the six gate checks in the gate's rules against the layout page, the roadmap, the workspace rules and the branch's root files. I read the installed Nx 24.0.6 source for executor and generator resolution and loading, and the installed versions of Nx, `@monodon/rust` and `@nx/devkit`. I ran no commands, since Architect roles never do. The build's own proof on Node 26 is a condition of the verdict.

## Where it stands

Done. The verdict is Approved for #77, size S. The route is Programming dev, Docs writer, the owner review with the DevOps review, and the Architect reviewer, with no QA role. No question for the owner parks the task. Reported to PM: once #78 adds TypeScript source, a PR touching only `libs/dev` makes only `@tenon/dev` affected, so the root `lint` would not run under `nx affected` and #78's plan must settle that; the stale "no CI yet" line in PM's knowledge file, which #18 already fixes; and keeping the owner's `.idea` files out of the commits.

## Next

Once the PO proxy approves too, PM runs Programming dev with this verdict's conditions as the plan. The dev role adds `libs/dev/package.json`, widens the root `workspaces`, runs `yarn install`, commits `yarn.lock`, and records the chosen `type` field and the shape for #78 and #21 in its handoff. It proves on Node 26 that `yarn nx show projects` lists `@tenon/dev` and that `yarn nx run-many -t lint` passes. Then the Docs writer, the owner review with DevOps, and the Architect reviewer follow.
