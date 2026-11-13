---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: architect-gate
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: chore/dev/17-nx-workspace
pr: 66
---

# Architect gate on the Nx workspace plan

PM asked the Architect gate for the technical half of the gate on [#17](https://github.com/MDReal32/tenon/issues/17), the root Nx workspace with Yarn, Cargo, `@monodon/rust` and Biome, on the [Nx workspace](nx-workspace.md) job. It continues [the BA readiness check](2026-11-13-ba-assistant-workspace-readiness.md) and judges attempt 2 of [the Programming dev analysis](2026-11-13-programming-dev-workspace.md) against the design and the workspace rules, then sizes the task and names the route. The PO proxy ran at the same time. The verdict is Approved, size M, with no question that parks the task.

## What I did and how

I read the handbook, Architect's rules and the gate's rules, then PM's assignment. It held the task text for [#17](https://github.com/MDReal32/tenon/issues/17), the owner's answers, the BA brief with its edits and the specialist's analysis. I read the job note and both earlier handoffs, then the design pages the plan touches: [the repository layout](../../../06-project/00-repository-layout.md), which says every task runs through Nx with no `xtask/`, [the roadmap](../../../06-project/01-roadmap.md)'s M0 groundwork, [the decisions](../../../06-project/02-decisions.md) and [what is still open](../../../06-project/03-still-open.md). Against the rules, I read [nx-config.md](../../../../.claude/rules/code-style/nx-config.md) closely, plus the dev role's and the DevOps engineer's parts as this branch has them after [#61](https://github.com/MDReal32/tenon/issues/61). I also looked at the files at the repository root today, its `.gitignore` among them, to see what Biome and the DevOps entries will meet.

I went through the six gate checks. The plan keeps the four axes apart, because it adds no crate and no engine code, and tool names live only in the dev tooling. Each root file sits in the part of the role that owns it. It follows the layout page and the roadmap, and settles nothing open. The root package's name `@tenon/source` is private and never published, so it doesn't decide the open question of how plugin packages are named. It changes no contract. It follows nx-config.md: Biome runs as a root package script inferred as a target, with no `project.json` and no `nx` property, and `build` sits once in `targetDefaults` with `^build` and the finite checks. And it fits one PR with room to spare.

## Why this way

PM raised four points for judgement. The first was the specialist's finding that `@monodon/rust` 3.0.0 infers no `build`, `test` or `lint`. It doesn't fail [#17](https://github.com/MDReal32/tenon/issues/17), because the owner defined the third criterion's pass as the plugin loading with no Cargo project, and the plan meets that. It does shape the later crate tasks. Nx applies `targetDefaults` only to targets a project already has, so it can't give a crate its targets. A per-crate `project.json` that declares them with the plugin's executors fits nx-config.md line 11: the executor is Nx-specific config, and there is no inferred target or script for it to repeat. Shared options then go in `targetDefaults` keyed by executor. The other option is a local inference plugin in `libs/dev`. That choice belongs to the task that adds the first crate or `libs/dev`'s crate generator, and goes to the owner if the rules don't settle it then. The gate doesn't decide it now. I passed the finding to the owner as information, since the criterion's words "infers the Cargo targets" hold only as the owner redefined them.

The second point was `workspaces: ["."]`, which makes the root a project so Nx infers `lint` from its script. It is the shape the rules leave. A root `project.json` would repeat a script, which line 10 forbids, and the `nx` property is forbidden by line 13. I approved it with a warning for later. Once a sub-project exists, Nx gives that project's files to it, not to the root, while `biome check .` still reads them. Caching the root `lint` would then return stale results, so it must not be cached without workspace-wide inputs, or it must narrow once sub-projects get their own Biome target.

The third point was Nx 24.0.6 outside the plugin's declared peer range. The owner asked for the latest Nx "if possible", allowing 23. The specialist showed it is possible: the plugin loads, and a crate's `build` and `test` through the plugin's executors exit 0. So I accepted 24.0.6, on the condition that the PR description states the risk, quotes the peer warnings and names 23.3.2 as the fallback. Asking the owner again would reopen an answer already given.

The fourth point was Node 26 and Corepack. I made it a build condition, not a question. The proof ran on Node 24.4.1, so the final checks must run on Node 26. If Corepack isn't bundled, installing it on its own still meets "via Corepack". If the pins fail on Node 26, the build returns to the gate instead of changing a version on its own.

For the route, QA has nothing to run. No protocol, SDK, host adapter or extension changes, which would call for conformance, and nothing a user sees or `tenon` generates changes, which would call for e2e. So the verdict gives the criteria the build runs and the Architect reviewer and DevOps re-check. DevOps reviews, since the change is Nx and build config. Cyber security is not needed, because the access hook's files are only excluded from Biome, not changed. I sized the task M rather than S: the change is small, but it spans two roles' parts, wires five tools together on a Nx version outside the plugin's declared range, and must be re-checked on Node 26.

## Checks

The six gate checks in the gate's rules, each against the design pages and rules named above. I ran no commands, since Architect roles never do. The specialist's proof, the version queries and the scratch-workspace runs are its own, recorded in its handoff, and I took them as reported.

## Where it stands

Done. The verdict is Approved for [#17](https://github.com/MDReal32/tenon/issues/17), size M. The route is Programming dev for the root config, the DevOps engineer for `.gitignore` and `.gitattributes`, the Docs writer, the Architect reviewer and the DevOps review, with no QA role. There is no question that parks the task. The note on what the plugin infers goes to the owner as information. For DevOps, the verdict flags that `-diff` on the lockfiles hides dependency changes from `git diff`. For PM, it notes that installing Node 26 and Corepack touches the owner's machine, that the uncommitted `.idea/vcs.xml` change stays out of #17, and two items for later tasks: `defaultBase: "develop"` for CI, and clippy and rustfmt in the toolchain file for the first crate.

## Next

Once the PO proxy also approves, PM starts Programming dev on the build. It installs Node 26, and Corepack on its own if Node 26 lacks it. It writes the seven root files as the analysis says, in Biome's format, and runs the nine criteria in the verdict from a state with no `node_modules/` and no `.nx/`, recording the Node version and the peer warnings. If the pins fail on Node 26, it stops and returns to the gate. The DevOps engineer then adds its `.gitignore` and `.gitattributes` entries and decides whether `-diff` stays, and the route goes on to the Docs writer and the reviews.
