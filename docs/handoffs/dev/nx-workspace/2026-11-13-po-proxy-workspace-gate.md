---
type: handoff
job: "[[nx-workspace]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/17"
role: po-proxy
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: chore/dev/17-nx-workspace
pr: 66
---

# PO gate verdict on the Nx workspace task

PM asked the PO proxy for the product half of the gate on [#17](https://github.com/MDReal32/tenon/issues/17), attempt 1. The question was whether the task and the specialist's plan fit Tenon's design and roadmap. The task sets up the root of Tenon's workspace: Yarn and Nx, a Cargo workspace with its toolchain file, the `@monodon/rust` plugin and Biome. It continues [the BA readiness check](2026-11-13-ba-assistant-workspace-readiness.md) and [the Programming dev analysis](2026-11-13-programming-dev-workspace.md) on the [Nx workspace](nx-workspace.md) job. The Architect gate ran at the same time and judges the technical side. The verdict is Approved. Later, PM brought the task back to the gate for its one re-plan, because [the Architect reviewer](2026-11-13-architect-reviewer-workspace.md) had requested changes twice on PR 66. PM asked whether the task still fits the design and roadmap as approved, or whether anything the reviews surfaced changes the product side of the plan. The re-plan verdict is Approved too, with the plan unchanged.

## What I did and how

I read the task text, the owner's answers, the BA brief with its edits and the Programming dev analysis (attempt 2), all as PM's assignment gave them. Then I read the job note and both handoffs before this one. I checked them against the design: [the repository layout](../../../06-project/00-repository-layout.md), [the roadmap](../../../06-project/01-roadmap.md)'s M0 section, [the decisions](../../../06-project/02-decisions.md), [still open](../../../06-project/03-still-open.md) and [the front page](../../../tenon.md). I also read the Architect gate's [M0 draft](../../docs/roadmap/2026-11-05-architect-gate-m0-draft.md), where the owner chose the tooling, and the Programming dev role's [rules](../../../departments/programming/roles/dev/RULES.md) to see which root files that role owns. I went through the five gate checks in [the proxy's rules](../../../departments/po/roles/proxy/RULES.md) one by one and returned the verdict to PM.

The task fits the design. The roadmap names the Nx workspace with these four tools as M0 groundwork, and the plan keeps the layout page's rule that every task runs through Nx with no `xtask/`. It is consistent with what exists, because no workspace exists yet and the task uses and redefines no product term. Its criteria, read with the owner's answers, describe what a Tenon developer can do on a clean clone, not only how the files are built. It is one reviewable change of root config files with no package or crate. The owner's answers on [#17](https://github.com/MDReal32/tenon/issues/17) record every decision it needed, and none of the book's open items is touched.

For the re-plan, I read the job note again and every handoff in the job's folder as it now stands. Those were [the Architect gate's verdict](2026-11-13-architect-gate-workspace.md), the builder's handoff with its owner review and its notes on the reviewer's findings, [the DevOps engineer's git files and review](2026-11-13-devops-engineer-workspace-git-files.md), [the Docs writer's update](2026-11-13-docs-writer-workspace.md) and the Architect reviewer's two attempts. I read the layout page's new paragraph on the root project, and the roadmap's M0 section, the decisions and still open again. I could not read GitHub. For [#67](https://github.com/MDReal32/tenon/issues/67) and [#68](https://github.com/MDReal32/tenon/issues/68) I worked from PM's assignment and the handoffs that raised them. The assignment carried no change to the task's text, so I judged it as my first verdict read it. I went through the five gate checks again.

The reviews found six things, and none of them changes what the task delivers. The reviewer's first attempt found five. The cache settings in `nx.json` were removed and `files.ignoreUnknown` was restored in `biome.json`, so both files match the approved plan again. The layout page and the job note were reworded so the crate-target choice stays with the first crate task. The second `programming-dev` handoff was folded into the builder's handoff, and the bare task mentions and empty `pr` fields were fixed. The second attempt found that `.idea/nx-angular-config.xml` had slipped into a commit, and it was untracked in a new commit. Every fix either returns the build to the plan both halves of the gate approved, or repairs the work record. Two owner decisions came out of the work, and PM opened them as separate issues. [#67](https://github.com/MDReal32/tenon/issues/67) asks how Nx should treat the root `.env` it loads into every task. [#68](https://github.com/MDReal32/tenon/issues/68) asks which JetBrains `.idea` files the repository shares.

## Why this way

The proxy's first check asks whether a task serves project users or extension authors. A workspace task serves neither directly. I passed it because the roadmap, which the owner settled, orders it as the groundwork the first user-facing slice is built on. Failing it on that wording would have rejected the roadmap's own order. I treated the plan's technical choices as the Architect gate's to judge: the root project inferred from a script, the `build` `dependsOn` list, the Biome options. I judged only whether they change anything a user or the book can see, and they don't.

I checked two points against the open items and decisions. The private root package name `@tenon/source` is never published, so it does not settle the open naming of plugin packages. Decision 5 on interpreters covers users' extensions, not Tenon's own Node pin. The specialist recalls, unverified, that Node 26 may not bundle Corepack. I didn't make that an owner question, because installing Corepack separately still meets the owner's answer "Latest stable via Corepack". So it stays a check for the build step. The finding that `@monodon/rust` infers no `build`, `test` or `lint` targets does not change [#17](https://github.com/MDReal32/tenon/issues/17), since the owner defined criterion 3 as "plugin loads". It affects the later crate tasks, so I reported it to PM outside the verdict instead of parking this task on it.

In the re-plan, the two rejections came from the build drifting from the plan and from the work record, not from a flaw in the plan. So the product plan needed no change, and a rejection or new slices would have answered a question nobody raised. I counted the reworded layout paragraph in favour of the second check, because it now leaves the crate-target choice open, as the gate did, instead of settling it in the book. I didn't make [#67](https://github.com/MDReal32/tenon/issues/67) a question that parks [#17](https://github.com/MDReal32/tenon/issues/17). The task adds no `.env` and no variable, and DevOps found nothing exposed today. The decision has to be made before the first value goes into `.env`, and it already waits on the owner as its own issue. It concerns the departments' secrets rule, not one of the book's open items. [#68](https://github.com/MDReal32/tenon/issues/68) is repository hygiene with no product side, and the task no longer carries any `.idea` change. Treating either one as a decision this task needs would have parked a finished task on work its criteria never asked for.

## Checks

All five gate checks passed: fits the design, consistent with what exists, outcome-based criteria, one reviewable change, and no owner decision outstanding. Each was checked against the pages listed above. A read-only step runs no lint, build or tests.

In the re-plan, all five checks passed again. They were checked against the roadmap's M0 section, the layout page's line 53 as reworded, the decisions, still open, and every handoff in the job's folder. I took the reviewers' and DevOps' command results as their handoffs report them.

## Where it stands

Done. The PO half of the gate approved [#17](https://github.com/MDReal32/tenon/issues/17) with no questions for the owner. The task goes on once the Architect gate approves too. Outside the verdict I sent PM four notes: the crate tasks' targets, contributor prerequisites if Node 26 lacks Corepack, the stale "Current state" in the job note, and an unrelated uncommitted `.idea/vcs.xml` change to keep out of the task's commits.

The re-plan is done too, and approved with the plan unchanged and no question for the owner. [#67](https://github.com/MDReal32/tenon/issues/67) and [#68](https://github.com/MDReal32/tenon/issues/68) wait on the owner outside this task. Outside the verdict I sent PM five more notes. The job note's "Current state" is stale again, and overstates the crate-target choice as waiting on the owner. The builder's handoff "Next" is stale. The layout page's "Node 26 with Corepack" could be read as Corepack coming with Node, which DevOps found it does not; that is the Docs writer's call. The `.idea` files on the working tree stay out of the task's commits until [#68](https://github.com/MDReal32/tenon/issues/68) is settled. And I judged the task text as my first verdict read it, since GitHub was out of reach.

## Next

PM combines this verdict with the Architect gate's. If both approve, the Programming dev role builds the root files as its analysis says, and the DevOps engineer then adds the `.gitignore` and `.gitattributes` entries. If the Architect gate's verdict changes the plan in a way a user or the book can see, PM sends the task back here for a fresh verdict.

After the re-plan, PM combines this verdict with the Architect gate's re-plan verdict and sends the task on the route that verdict names. If the task's text or criteria changed since my first verdict, or the Architect gate changes the plan in a way a user or the book can see, the task comes back here for a fresh verdict.
