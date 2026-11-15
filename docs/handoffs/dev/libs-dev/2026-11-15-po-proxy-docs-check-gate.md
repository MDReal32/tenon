---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: po-proxy
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/78-docs-check
pr:
---

# PO gate verdict on the docs check task

PM asked the PO proxy for the product half of the gate on [#78](https://github.com/MDReal32/tenon/issues/78), attempt 1. #78 is the docs check in `@tenon/dev`, the second sub-issue of [#19](https://github.com/MDReal32/tenon/issues/19) on the [libs/dev](libs-dev.md) job. It continues [the BA answers and final brief](2026-11-15-ba-assistant-docs-check-questions.md) and [the Programming dev analysis](2026-11-15-programming-dev-docs-check-analysis.md). PM also asked for anything about the PR's size, or about the check not being wired into CI, that the owner should decide. The verdict is Approved, with no questions for the owner.

## What I did and how

I took the task text, the owner's answers and the summary of the BA brief from PM's assignment, since I can't reach GitHub. I read the job note, [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md), the BA answers, the Programming dev analysis, and my own [gate verdict on the library task](2026-11-15-po-proxy-libs-dev-gate.md). Against the design I read [the roadmap](../../../06-project/01-roadmap.md)'s M0 section, [the repository layout](../../../06-project/00-repository-layout.md), [still open](../../../06-project/03-still-open.md), the departments overview's pull request size section and the PO knowledge file. I searched `docs/` outside the handoffs for every mention of the docs check and `libs/dev`, to confirm that the task's terms match what the rules and knowledge files already expect. Then I went through the five gate checks in [the proxy's rules](../../../departments/po/roles/proxy/RULES.md).

The roadmap names `libs/dev` "with its docs check" as M0 groundwork, and the layout page gives `libs/dev` as the home of the docs check, so the task fits the design. It builds in the library that #77 created and is run through Nx, as the Docs and HR rules already say it will be. So it is consistent with what exists. Its criterion says what a developer or role sees: `docs:check` fails naming path and line on four named breakages, ignores code, and passes on today's docs. The owner's answers bound every case. It touches no open item.

## Why this way

On the first check I passed a tool for Tenon's own developers and roles, as I did for [#17](https://github.com/MDReal32/tenon/issues/17) and [#77](https://github.com/MDReal32/tenon/issues/77). The roadmap the owner fixed orders this groundwork ahead of the first user-facing slice, and failing it on the check's wording would reject the roadmap's own order.

On the fourth check I passed the task as one reviewable change even though the analysis expects it 2.5 to 3 times over the size guide. The guide is not a cutoff, and a coherent PR may go over it with the reason in its description. The four failure cases are one criterion, and a check that covers only some of them still passes broken docs, so a slice would deliver nothing on its own. The real seam, the library, is already split off as #77. Judging the plan's size against the guide is the Architect gate's work, not PO's.

I didn't turn CI wiring into a question that parks the task. The task's own out-of-scope line leaves it out, and the BA assistant settled that from the task's text. Whether CI should enforce the check later is a priority choice for the owner, so I report it as a decision the owner may take, not as a gap in this task.

## Checks

All five gate checks passed: fits the design, consistent with what exists, outcome-based criteria, one reviewable change, and no owner decision outstanding. A read-only step runs no lint, build or tests. GitHub was out of reach, so I judged the task as PM's assignment gave it.

## Where it stands

Done. The PO half of the gate approved #78 with no questions. For the owner, not blocking: after this PR `docs:check` and `typecheck` don't run in CI, and a later Backlog task could add them. The PR will go over the size guide with its reason stated. Reported to PM outside the verdict: the layout page's "no source or targets yet" sentence needs the Docs writer's update; HR's later rule change to the Docs and HR rules will leave the Docs knowledge file's docs-check line stale; anchors on non-Markdown files have no case today; and the job note's "Current state" still described #78 as chained on #77 and waiting on the owner, which PM updates.

## Next

PM combines this verdict with the Architect gate's. If both approve, the task follows its route: Programming dev, then Docs writer, then Architect reviewer. The task comes back here for a fresh verdict if the Architect gate changes the plan in a way a user or the book can see, or if the task's text or criteria change.
