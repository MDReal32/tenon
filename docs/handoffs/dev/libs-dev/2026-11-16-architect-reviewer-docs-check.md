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

PM asked the Architect reviewer to review [#78](https://github.com/MDReal32/tenon/issues/78) on the [libs/dev](libs-dev.md) job. The task adds the `docs-check` executor to `@tenon/dev` and runs it from the root project as `docs:check`. The review judged the change against the design book and the workspace rules, after [the Architect gate](2026-11-15-architect-gate-docs-check.md), [the build](2026-11-15-programming-dev-docs-check-analysis.md), [the Docs writer's step](2026-11-16-docs-writer-docs-check.md), [the DevOps review](2026-11-16-devops-engineer-docs-check-review.md) and [the owner review](2026-11-16-programming-dev-docs-check-owner-review.md). Attempt 1 requested changes, with six findings. Attempt 2 was a fresh run that did not write attempt 1. It checked each of those findings and reviewed the whole change again, and the verdict is Approved.

## What I did and how

In attempt 1 I read the handbook, Architect's rules and the reviewer's rules with their `CLAUDE.md` files, and passed the start-up check. I read the job note, the BA answers, the analysis and build handoff, the gate verdict with its eight conditions, and the Docs writer's, DevOps' and owner review's handoffs. I read the full code diff PM provided and the files on the branch at 46881b4. I checked the plan's shape against `.claude/rules/code-style/` (general, typescript, nx-config, nx-tasks), `docs.md`, `handoffs.md` and `markdown.md`, and against [the repository layout](../../../06-project/00-repository-layout.md). I searched the repository for every mention of the docs check outside the handoffs, read github-slugger's exports and `mdast-util-from-markdown`'s dependencies in `node_modules`, and compared the `pr` field on this job's handoffs with the `ci` and `nx-workspace` jobs.

In attempt 2, for [#78](https://github.com/MDReal32/tenon/issues/78), I passed the start-up check again and read this handoff for attempt 1's findings and what it judged settled. I read the diff of the fixes since 46881b4 and the final files on the branch at 2fbdb83. The fixes are d420baa by PM, b55793a by Programming dev and 2fbdb83 by the Docs writer. I searched all of `libs/dev/src` for any explicit return type, default import, `any`, unsafe cast, `function` declaration or default export left over, and found none apart from the one intended default import. I checked that nothing still imports the two deleted interfaces, `split-document.ts` and `wikilink-match.ts`. I read github-slugger's `index.js` to confirm that its named `slug` function gives the same result as a fresh slugger's first `slug()` call. I also read the new case-exact test against its fixture, the root `project.json` against the command the Docs knowledge file now gives, and the `pr` field on every handoff in the job folder.

## Why this way

Attempt 1 found that the design side holds. Only dev tooling changed, so the four axes are untouched. The root `project.json` carries only project-specific executor, cache and input settings, as `nx-config.md` allows. The executor is exposed through `executors.json` in the shape the #77 gate settled. The two dependencies the plan did not name, `nx` and `@types/mdast`, add no package to the install. One meets `@nx/devkit`'s peer with the single root copy, which gate condition 2 requires. The other is already a dependency of the planned parser. So attempt 1 judged them inside the plan and did not send the change back to the gate. Its six findings were rule breaks the earlier reviews had not caught. The first was explicit return types on four functions and callbacks. The second was default imports where `node:path`, `node:assert/strict` and github-slugger have named exports. The third was no test for the case-exact path resolution. The fourth was the Docs knowledge file still saying the check did not exist. The fifth was the layout page's `covers` missing the root `project.json`. The sixth was four handoffs of this PR with an empty `pr`. Attempt 1 judged moving small module-local sets such as `TRIPLET_NAMES` into a `const.ts` too small to count as "non-trivial constant data", and left it out.

Attempt 2 found every finding fixed and nothing new, so it approved. The fixes do more than the findings in one place: they delete the `SplitDocument` and `WikilinkMatch` interfaces. That follows from finding 1, since those interfaces existed only as the return types that `typescript.md` forbids, and leaving them unused would be dead code. The `GithubSlugger` default import in `collect-heading-slugs.ts` stays, because the package exports that class only as its default and a named import is impossible. Replacing `new GithubSlugger().slug(...)` with the named `slug` in `check-wikilink.ts` keeps the behaviour, because a fresh slugger's first call is that same function. Typing the lister in `resolve-existing-path.ts` as `CheckContext["listDirectory"]` derives it from an existing type, as `typescript.md` prefers. It also settles attempt 1's optional `DirectoryLister` note without adding a type. The empty `pr` left on `2026-11-14-ba-assistant-docs-check-readiness.md` is not a seventh finding: that handoff served #19 on another branch and is one of the merged #77-era handoffs that may not be rewritten.

## Checks

Architect roles never run commands, so I read files only and ran none. In attempt 1 I used PM's results at 46881b4 on Node v26.13.1: 21 of 21 tests passed and `docs:check` passed on 179 Markdown files. I also used the owner review's and DevOps' runs of the four failure cases, the cache probe and the affected list. In attempt 2 I used PM's re-run at 2fbdb83 on Node v26.13.1 with `--skip-nx-cache`. `@tenon/dev:test` passed 22 of 22, the new case-exact test included. `@tenon/dev:typecheck`, `@tenon/dev:lint` and `@tenon/source:lint` passed, and `@tenon/source:docs:check` passed on 180 Markdown files. The build handoff records that the new test fails when the path comparison is made case-insensitive. I did not see the PR description, so PM should confirm it still gives the reason the PR is over the size guide.

## Where it stands

Done, with the verdict Approved for [#78](https://github.com/MDReal32/tenon/issues/78), attempt 2. All six findings of attempt 1 are fixed, and there are no new ones. Nothing waits on the owner. In attempt 1 I reported to PM, outside the task: the empty `pr` on the merged #77 handoffs, the stale line in Architect's knowledge file, links that leave the repository being checked only with `stat` on the local machine, and an optional shared `DirectoryLister` type, which the fixes have since settled. In attempt 2 I reported that `docs/departments/hr/RULES.md` still has the same "Until `libs/dev` has it" line as Docs' rules, which belongs to HR's later rule-change PR.

## Next

PM confirms the PR description gives the reason the PR is over the size guide, puts this review in the PR description, and hands #78 on to QA.
