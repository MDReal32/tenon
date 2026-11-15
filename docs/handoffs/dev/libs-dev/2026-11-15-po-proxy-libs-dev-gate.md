---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/77"
role: po-proxy
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/77-libs-dev-library
pr:
---

# PO gate verdict on the @tenon/dev library task

PM asked the PO proxy for the product half of the gate on [#77](https://github.com/MDReal32/tenon/issues/77), attempt 1. #77 is the first of two sub-issues of [#19](https://github.com/MDReal32/tenon/issues/19). It creates the `@tenon/dev` library at `libs/dev` as a project in the root Nx workspace, where the docs check ([#78](https://github.com/MDReal32/tenon/issues/78)) and the crate generator ([#21](https://github.com/MDReal32/tenon/issues/21)) will be built later. It continues [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md) on the [libs/dev](libs-dev.md) job, which split #19. PM also asked whether this one-criterion task should be merged back into #78. The verdict is Approved, and the task stays split.

## What I did and how

I took the task text and the BA brief from PM's assignment, since I can't reach GitHub. I read the job note and the BA readiness check. Then I checked the task against the design: [the repository layout](../../../06-project/00-repository-layout.md), [the roadmap](../../../06-project/01-roadmap.md)'s M0 section, [still open](../../../06-project/03-still-open.md) and the PO knowledge file. I searched `docs/` for every mention of `libs/dev` and `@tenon/dev` to check that the task's terms match what the departments' notes already say about the library. I also read my own [gate verdict on the Nx workspace](../nx-workspace/2026-11-13-po-proxy-workspace-gate.md) for how the proxy treated groundwork before. Then I went through the five gate checks in [the proxy's rules](../../../departments/po/roles/proxy/RULES.md).

The layout page puts `libs/dev` in the tree as the home of the workspace's generators and executors, and the roadmap names it as M0 groundwork. So the task fits the design. It builds on the merged [#17](https://github.com/MDReal32/tenon/issues/17) workspace and uses the name and place every note already gives the library, so it is consistent with what exists. Its one criterion is the owner's own wording from #19. Read with its scope, it says what a Tenon developer sees: the workspace lists the project at `libs/dev`. It is one small change, a new library project plus root `package.json` and `nx.json` entries. It touches no open item and needs no owner decision.

## Why this way

The first check asks whether a task serves project users or extension authors. A tooling library serves neither directly. As with #17, I passed it because the roadmap the owner settled orders this groundwork ahead of the first user-facing slice. Failing it on that wording would reject the roadmap's own order.

For the third check, I accepted a criterion that only says where the library lives. The library has no behaviour yet, so the project being in the workspace is the whole outcome. The criterion is the owner's own text, and asking for more would mean inventing requirements.

On merging #77 back into #78, I kept the split. The BA assistant found #78 already the smallest it can be and possibly over the size guide, so adding the library would make it bigger. #21 needs the library but not the docs check, and a merged task would make the crate generator wait on the docs check for no product reason. The library and the tools built in it are a real seam, not a file count.

I didn't treat `@tenon/dev` as touching the open question on plugin package naming. It is a private workspace library, not a plugin package.

## Checks

All five gate checks passed: fits the design, consistent with what exists, outcome-based criteria, one reviewable change, and no owner decision outstanding. I checked each against the pages above. A read-only step runs no lint, build or tests. GitHub was out of reach, so I judged the issue text as PM's assignment gave it.

## Where it stands

Done. The PO half of the gate approved #77 with no questions for the owner, and the task goes on once the Architect gate approves too. Outside the verdict I sent PM three notes. The job note's "Current state" will need updating once #77 is under way. The uncommitted `.idea/vcs.xml` change and the untracked `.idea/nx-angular-config.xml` stay out of the task's commits until [#68](https://github.com/MDReal32/tenon/issues/68) is settled. And, as the BA assistant reported, the owner's answers to #19 belong on its issue.

## Next

PM combines this verdict with the Architect gate's. If both approve, the task follows its route: Programming dev, then Docs writer, then Architect reviewer. If the Architect gate changes the plan in a way a user or the book can see, or the task's text or criterion changes, the task comes back here for a fresh verdict.
