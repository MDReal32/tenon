---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-16"
status: done
branch: chore/dev/78-docs-check
pr: 84
---

# Architect review of the docs check

PM asked the Architect reviewer to review [#78](https://github.com/MDReal32/tenon/issues/78), attempt 1, on the [libs/dev](libs-dev.md) job. The task adds the `docs-check` executor to `@tenon/dev` and runs it from the root project as `docs:check`. I was to judge the change against the design book and the workspace rules, after [the Architect gate](2026-11-15-architect-gate-docs-check.md), [the build](2026-11-15-programming-dev-docs-check-analysis.md), [the Docs writer's step](2026-11-16-docs-writer-docs-check.md), [the DevOps review](2026-11-16-devops-engineer-docs-check-review.md) and [the owner review](2026-11-16-programming-dev-docs-check-owner-review.md). The verdict is Changes requested, with six findings: three for Programming dev, two for the Docs writer, and one on handoff frontmatter for PM and Programming dev.

## What I did and how

I read the handbook, Architect's rules and the reviewer's rules with their `CLAUDE.md` files, and passed the start-up check. I read the job note, the BA answers, the analysis and build handoff, the gate verdict with its eight conditions, and the Docs writer's, DevOps' and owner review's handoffs. I read the full code diff PM provided and the files on the branch at 46881b4. I checked the plan's shape against `.claude/rules/code-style/` (general, typescript, nx-config, nx-tasks), `docs.md`, `handoffs.md` and `markdown.md`, and against [the repository layout](../../../06-project/00-repository-layout.md). I searched the repository for every mention of the docs check outside the handoffs, read github-slugger's exports and `mdast-util-from-markdown`'s dependencies in `node_modules`, and compared the `pr` field on this job's handoffs with the `ci` and `nx-workspace` jobs.

## Why this way

The design side holds. Only dev tooling changed, so the four axes are untouched. The root `project.json` carries only project-specific executor, cache and input settings, as `nx-config.md` allows. The executor is exposed through `executors.json` in the shape the #77 gate settled. The two dependencies the plan did not name, `nx` and `@types/mdast`, add no package to the install. One meets `@nx/devkit`'s peer with the single root copy, which gate condition 2 requires. The other is already a dependency of the planned parser. So I judged them inside the plan and did not send the change back to the gate.

The findings are rule breaks the earlier reviews did not catch. Explicit return types appear on four functions and callbacks, which `typescript.md` forbids even for readability. Default imports are used where `node:path`, `node:assert/strict` and github-slugger have named exports; the one default import that stays is the slugger class, which the package exports only as its default. The case-exact path resolution has no test, though it exists only to make macOS fail like Linux. In the docs, the Docs knowledge file still says the check does not exist yet, and the layout page's `covers` misses the root `project.json` it now describes. Finally, four of this PR's handoffs leave `pr` empty while PR 84 is open. I judged the possible `const.ts` move of small module-local sets such as `TRIPLET_NAMES` too small to be "non-trivial constant data", and left it out.

## Checks

I read files only and ran no commands, since Architect roles never do. I used PM's results: on Node v26.13.1, 21 of 21 tests pass and `docs:check` passes on 179 Markdown files at 46881b4. I also used the owner review's and DevOps' runs of the four failure cases, the cache probe and the affected list. I did not see the PR description, so PM should confirm it states why the PR is over the size guide.

## Where it stands

Done, with the verdict Changes requested for #78, attempt 1. Findings 1 to 3 go to Programming dev, findings 4 and 5 to the Docs writer, and finding 6 to PM and Programming dev. Nothing waits on the owner. Reported to PM outside the task: the empty `pr` on the merged #77 handoffs, the stale line in Architect's knowledge file, links that leave the repository being checked only with `stat` on the local machine, and an optional shared `DirectoryLister` type.

## Next

PM sends each finding to its owner. Then `@tenon/dev:test`, `typecheck` and `lint` and `@tenon/source:docs:check` run again, and the Architect reviewer runs attempt 2, which first checks that each of the six findings is fixed.
