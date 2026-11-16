---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: architect-gate
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/78-docs-check
pr: 84
---

# Architect gate on the docs check

PM asked the Architect gate for the technical half of the gate on [#78](https://github.com/MDReal32/tenon/issues/78), the docs check in `@tenon/dev`, on the [libs/dev](libs-dev.md) job. I was to judge [the Programming dev analysis](2026-11-15-programming-dev-docs-check-analysis.md) against the design and the workspace rules, size the task, name the route's extra needs, say who makes any `docs/` fixes, and say whether it is one PR. The analysis follows [the BA answers and final brief](2026-11-15-ba-assistant-docs-check-questions.md). The shape it must keep comes from [the gate verdict on the library](2026-11-15-architect-gate-libs-dev-library.md). The verdict is Approved, size XL, as one PR over the size guide with its reason stated. DevOps is added as a reviewer, there is no QA role, and no question goes to the owner.

## What I did and how

I read the handbook, Architect's rules and the gate's rules with their `CLAUDE.md` files, and passed the start-up check. I read the job note and all ten handoffs in the job folder, oldest first. I read the code-style rules (general, nx-config, nx-tasks, typescript), the docs, handoffs and markdown rules, the Programming and dev role rules, the Docs and writer rules, [the repository layout](../../../06-project/00-repository-layout.md), the roadmap's M0 paragraph and the pull request size guide in the departments overview. Then I read the files as they stand on the branch: the root `package.json`, `nx.json`, `biome.json`, `.gitignore`, `libs/dev/package.json` and `.github/workflows/ci.yml`.

To check the plan's Nx claims against the installed code, I read Nx 24.0.6's sources. In `plugins/package-json/create-nodes.js`, a sibling `project.json` is merged with the root `package.json`, and a script is dropped only when `project.json` redefines the same target name. `plugins/project-json/build-nodes/project-json.js` leaves the name unset when `project.json` has none, so the `package.json` name stands. `plugins/js/project-graph/build-dependencies/explicit-package-json-dependencies.js` turns a root devDependency on a workspace package into a static edge, so a change confined to `libs/dev` also makes the root project affected. `utils/split-target.js` resolves a target name that contains a colon against the graph. The hoisted `@nx/devkit` is 22.7.12, with a peer range of `>= 21 <= 23`. TypeScript and the Markdown packages are not installed.

I searched `docs/` for footnotes, raw HTML anchors, images and wikilinks with a heading or a template placeholder, and found none. The one `<a …>` match sits in a QA template.

## Why this way

The root `project.json` passes [nx-config.md](../../../../.claude/rules/code-style/nx-config.md). Executor, `cache` and `inputs` are the project-specific metadata that rule names as a reason for one, and the target belongs only to the root, which owns `docs/`. Putting the target on `@tenon/dev` with an implicit dependency on the root lost: a change to `docs/` would not make `@tenon/dev` affected, and together with the `workspace:*` edge it would form a cycle. Inputs covering the whole workspace are right, because links and outside anchors can reach any tracked file. Gitignored paths stay out of the hash.

The dependency set is right, and `@nx/devkit` 24.0.6 keeps the #77 rule against the hoisted 22.7.12. I accepted the library's own `lint` script, even though the `workspace:*` edge now also makes the root `lint` run for a `libs/dev` change. It closes the gap explicitly, without depending on that edge, and the extra run costs little.

I sized the task XL, not L. At 2.5 to 3 times the guide it is not "near it", and the size should say so. One PR still holds. The guide lets a coherent PR go over with its reason stated, and the issue already says so. I looked at a seam between the structural checks and the link checks. Each half could ship on its own, but neither meets the one acceptance criterion BA kept whole. A tooling-only first PR would leave a placeholder executor.

QA is not needed, since nothing touches the protocol, an SDK, an adapter, an extension or what a user sees. DevOps is added because the change touches root Nx config, the affected graph and the lockfile. Cyber security is not needed.

The `docs/` fixes split by ownership. The Docs writer's part is the book and the README files, so it covers the layout sentence and any fix in the book. A fix in handoffs, job notes, templates or department files belongs to another owner. A `RULES.md` fix would clash with the owner's "same PR" answer and would go to the owner. The analysis's scan found nothing, so this is likely moot.

## Checks

I ran the six gate checks against the plan, the rules, the design pages and the branch files, and read the installed Nx 24.0.6 code listed above. I ran no commands, since Architect roles never do. Eight build conditions carry what only a run can prove: Node 26 loading through Nx including the ESM graph, test discovery, exact pins and npm existence, the TypeScript options and the `types` default, the merged root project and the affected list, frontmatter line offsets and the parser cases, Markdown-only duplicates, and the final `docs:check` run after every handoff of the PR.

## Where it stands

Done. The verdict is Approved for #78, size XL, as one PR, with eight build conditions. The route is Programming dev, then the Docs writer, then the owner review with DevOps, then the Architect reviewer. QA none, Cyber security none. Nothing waits on the owner. Reported to PM: example links in this PR's handoffs belong in inline code; `typecheck` and `docs:check` are not in CI, a Backlog candidate; two lints now cover `libs/dev`; the dev role's part does not name a root `project.json`; Architect's knowledge file has a stale fact and a size anchor to revisit; the Docs and HR rule changes follow later as HR's own PR.

The eight build conditions, as the verdict states them:

1. Run every proof on Node 26. Through Nx, prove that `@tenon/dev:docs-check` loads and runs with the `workspace:*` link installed, including the ESM-only mdast and micromark graph, since a top-level await anywhere in it would fail with `ERR_REQUIRE_ASYNC_MODULE`. Prove that `yarn nx run @tenon/dev:test` finds the `.test.ts` files, report the count, and show that a deliberately failing test fails the target.
2. Before pinning, check that each version exists on npm and pin every one exactly, `@types/node` included. `typescript` 7.0.2 and `mdast-util-from-markdown` 2.1.0 are unconfirmed. Check that `@nx/devkit` 24.0.6 accepts Nx 24.0.6 with no new peer warning. `yarn install --immutable` must pass afterwards, and `yarn nx show projects` must list the same projects as before.
3. Check that the pinned TypeScript provides `tsc` and accepts every option the plan's `tsconfig.json` lists, and whether `@types/node` is picked up without an explicit `types` entry. Show that `typecheck` fails on a planted type error and passes without it.
4. `yarn nx show project @tenon/source --json` shows the name `@tenon/source`, keeps the inferred `lint`, and shows `docs:check` with the executor, `cache: true` and the whole-workspace `inputs`. `yarn nx show projects --affected --files=libs/dev/src/docs-check/executor.ts` lists both projects.
5. Strip the frontmatter before the parser reads the body and keep the line offset, so a problem below the frontmatter names the file's real line. Collect `link`, `image` and `definition` nodes, report each problem once, decode percent-encoded paths, and use a fresh slugger per file. Test a link in a table cell, a fenced block, an indented block and inline code.
6. The duplicate-name check covers the Markdown files under `docs/` only.
7. No `console.log`: print through the `@nx/devkit` logger or `process.stdout`. The executor takes the workspace root from `context.root`, and tests build their fixtures in a temporary directory.
8. "Passes on today's `docs/`" is proved by running `yarn nx run @tenon/source:docs:check` on the branch last, after every handoff of this PR is committed.

## Next

Once the PO proxy approves too, PM runs Programming dev with the analysis and this verdict's conditions as the plan, on Node 26. Then the Docs writer updates the layout page's `libs/dev` sentence and makes any book fix the check finds. Then come the owner review with DevOps and the Architect reviewer. PM runs `yarn nx run @tenon/source:docs:check` once more after the last handoff commit and before opening the PR against `develop`, with the size reason in its description.
