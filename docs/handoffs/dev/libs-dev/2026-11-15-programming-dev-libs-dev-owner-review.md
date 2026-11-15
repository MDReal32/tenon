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

# Programming dev owner review of the @tenon/dev library

PM asked a fresh run of the Programming dev role, not the one that built it, to review [#77](https://github.com/MDReal32/tenon/issues/77), attempt 1, as the owner of this code, on the [libs/dev](libs-dev.md) job. The change creates the bare `@tenon/dev` package at `libs/dev`. I reviewed it against the task, [the Architect gate's conditions](2026-11-15-architect-gate-libs-dev-library.md), [the build](2026-11-15-programming-dev-libs-dev-library.md) and its attempt 2 fix, and [the DevOps review](2026-11-15-devops-engineer-libs-dev-review.md). The verdict is Approved, with no findings that block it and two non-blocking notes.

## What I did and how

I read the handbook, Programming's rules and the dev role's rules, then the job note and every handoff on the job from oldest to newest. I read `git diff develop...HEAD` for the code and the book: `libs/dev/package.json`, the root `package.json` `workspaces`, the one `yarn.lock` entry and the one sentence on the layout page. I walked the gate's seven conditions against it. I changed no file under review.

To check the build's `type: module` reasoning I read `loadTsFile` in Nx 24.0.6's `node_modules/nx/dist/src/plugins/js/utils/register.js`. On the native type stripping path it calls plain `require()`, and it falls back to swc or ts-node only on a listed error (ESM syntax parsed as CommonJS, a type-strip error, module not found), which are not installed here. I then ran Node v26.13.1 in a scratchpad package that carries the committed `package.json`: an ESM-syntax `.ts` file loaded through `require()` and returned its export, and a `.ts` file with top-level await failed with `ERR_REQUIRE_ASYNC_MODULE`. Both claims in the build handoff hold. Then `yarn nx show projects` on Node 26 printed `["@tenon/dev","@tenon/source"]`.

## Why this way

Each gate condition holds. Condition 1: the package holds exactly `name`, `version` `0.0.0`, `private` true and `type`, with no source, `main`, `exports`, collections or `tsconfig`. Condition 2: no targets. Condition 3: `workspaces` is `[".", "libs/dev"]` and `yarn.lock` gains one six-line workspace entry, with no external package. Condition 4: `nx.json` is untouched, with the reason given in the handoff. Condition 5: the proof commands are recorded on Node 26, and I reproduced the project listing. Condition 6: nothing from libramigo. Condition 7: the shape for #78 and #21 is recorded in the build's "Next", with the `type` reason, which is now correct. The explicit `libs/dev` path over `libs/*` is a fair choice the plan left open, with its reason stated.

Scope is clean: the only extra is the layout sentence, which is the Docs writer's step and one the book rule requires. Commit hygiene is clean. Each commit is one concern in Conventional Commit form, the fix commit changes one line of code and carries its own handoff, no commit carries a `Co-Authored-By` trailer, and no `.idea` file is in the diff.

Two non-blocking notes. First, the job note's `status` is `planned` although the build exists, and its "Current state" has a double space after "#77 too." These are the job note's upkeep, and the status can move to `in progress`; I left both alone because my review does not change the state. Second, for #78: once `libs/dev` is a `"type": "module"` package, Nx's loader also falls back to a transpiler on a module-not-found error, such as an extensionless relative import, and no transpiler is installed. So #78's TypeScript must write relative imports with the `.ts` extension. This is not a #77 matter, but it belongs in #78's plan next to the shape already recorded.

## Checks

On Node v26.13.1 with the nvm Node 26 first on `PATH`: `yarn nx show projects` printed both projects, and the scratchpad `require()` test gave the two results above. I read `register.js` and the full branch diff. I did not rerun `yarn install --immutable` or `yarn nx run-many -t lint`, since DevOps ran both on attempt 2 and the code has not changed since.

## Where it stands

Done. The owner review of #77 is Approved, with no required change. Only this handoff is added; the code, the job note and `.idea` are untouched.

## Next

The Architect reviewer reviews #77, then PM pushes and opens the PR with the DevOps approval in its description. #78's plan should carry the lint-under-`nx affected` gap and the `.ts` extension note.
