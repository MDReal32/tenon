---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: docs-writer
model: claude-sonnet-5-5
date: "2026-11-13"
status: done
branch: chore/dev/17-nx-workspace
pr: 66
---

# Docs writer update for the Nx workspace

PM asked the Docs writer to bring the design book and any package README up to date with the root workspace that [#17](https://github.com/MDReal32/tenon/issues/17) built, for the [Nx workspace](nx-workspace.md) job. It continues [the gate's verdict](2026-11-13-architect-gate-workspace.md), which called a line on the root project optional, and [the specialist's build](2026-11-13-programming-dev-workspace.md).

## What I did and how

I read the change against `develop`, then [the repository layout](../../../06-project/00-repository-layout.md) and the [roadmap](../../../06-project/01-roadmap.md). The roadmap already names the workspace as M0 groundwork and stays true. The layout page was the one that left the root out: its tree showed no root files and its Nx paragraph said nothing of the root. I added the root files to the tree, and one paragraph saying the root is the first Nx project with a Biome `lint` script, that a build needs Node 26 with Corepack and rustup with the `stable` channel, that `@monodon/rust` gives Nx each crate as a project but infers no `build`, `test` or `lint` target, and that `build` depends on its dependencies' builds and the finite checks a project provides. I added the root files to the page's `covers`. There is no root or package README in the repository, so none changed.

## Review finding fixed

The Architect reviewer found that the layout page's sentence saying each crate declares its own targets presented an open choice as settled. The gate left it open between a `project.json` per crate and a local inference plugin in `libs/dev`. I reworded it to say the plugin infers no `build`, `test` or `lint` targets and that the task adding the first crate settles where they come from, and changed nothing else.

## Why this way

A reader building from a checkout needs the prerequisites and the plugin's limit, and both are facts of the design, not process. I left out versions of Yarn, Nx and Biome, which `package.json` already pins, and all handoff detail. Peer-range warnings stay out of the book since they belong to the PR.

## Checks

Read only: the page adds no links, its `prev` and `next` are unchanged, and the new `covers` paths exist at the root. The docs check through Nx does not exist yet.

## Where it stands

Done and committed on the task branch.

## Next

Reviews follow. PM updates the job note's "Current state".
