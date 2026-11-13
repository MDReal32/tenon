---
type: compacted-handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/7"
  - "https://github.com/MDReal32/tenon/issues/11"
  - "https://github.com/MDReal32/tenon/issues/12"
  - "https://github.com/MDReal32/tenon/issues/51"
from: "2026-11-03"
to: "2026-11-06"
folds:
  - "2026-11-03-session-basic-departments.md"
  - "2026-11-03-session-github-project-tracker.md"
  - "2026-11-04-session-board-rule.md"
  - "2026-11-04-session-project-statuses.md"
  - "2026-11-05-architect-reviewer-programming-department.md"
  - "2026-11-05-session-programming-department.md"
  - "2026-11-06-architect-reviewer-autonomy-rule-review.md"
  - "2026-11-06-session-autonomy-rules.md"
  - "2026-11-06-architect-reviewer-qa-department.md"
  - "2026-11-06-session-qa-department.md"
prs:
  - 1
  - 5
  - 8
  - 50
  - 52
  - 53
model: claude-opus-5-5
date: "2026-11-13"
---

# How the departments were set up, from the first four to QA

These ten handoffs are the first stretch of the [departments](departments.md) job, from 2026-11-03 to 2026-11-06. It starts with the owner asking for a department system copied from a sibling project but written for Tenon alone, then makes GitHub issues the task tracker, organizes the project board and writes the rule that keeps it current. It ends with the first two departments that write files, Programming for [#11](https://github.com/MDReal32/tenon/issues/11) and QA for [#12](https://github.com/MDReal32/tenon/issues/12), with the board rule for [#7](https://github.com/MDReal32/tenon/issues/7) and the autonomy rules for [#51](https://github.com/MDReal32/tenon/issues/51) in between. Nothing came before them; they open the job.

## What was built

The first session wrote four departments under `docs/departments/`: the [overview](../../../departments/README.md) and [handbook](../../../departments/RULES.md), PM with its coordinator, BA with its assistant, PO with its proxy, and Architect with its gate and reviewer. Every folder splits into `README.md`, `RULES.md` and `CLAUDE.md`, and each department has a knowledge file and a `templates/` folder with the exact formats it returns. The four read-only roles got agent files under `.claude/agents/`, on Opus with only `Read`, `Grep` and `Glob`. The content is Tenon's own: one owner who answers every question, a definition of ready built around a developer tool's surface, contract and platforms, and a PO proxy and Architect who judge against [the design book](../../../tenon.md), its four axes and its rule that Base gets nothing a community extension can't. Under `.claude/` came the generic workspace rules (git, commit, markdown, handoffs, delegation, language, docs, and the general, TypeScript and Nx code-style rules) and the `department-access` hook with its tests, wired in `.claude/settings.json`. The git rule gained the SSH-to-HTTPS fallback through `gh` that never changes `origin`. The overview gained an "Adding a department" section with six steps.

The tracker change made a GitHub issue in `MDReal32/tenon`, added to the [Tenon project](https://github.com/users/MDReal32/projects/4), the task and its source of truth. PM's owner message became an [issue comment](../../../departments/pm/templates/issue-comment.md) the owner answers in place, the PR description opens with `Closes #<n>`, and every template names the task as `#<issue number>`. The coordinator's rules gained reading the issue with its comments, moving `Status`, splitting into sub-issues, opening an issue for an unrelated finding, and an "After the merge" check that the issue closed. PM's Claude notes name the `gh` commands and the `project` scope they need. GitHub's default branch became `develop`.

The project then got eight statuses in place of GitHub's three, keeping the old three's option IDs: `Backlog`, `Todo`, `In Progress`, `Waiting on owner`, `Blocked`, `In Review`, `Done` and `Canceled`. It also got three single-select fields, `Kind` (Task, Epic, Bug, Decision), `Area` (the handoffs' areas) and `Size` (S, M, L, XL), and three views: `Board`, `By milestone` and `Roadmap`. The overview has a table of what each status means, the coordinator moves a task through them, and `Size` comes from the Architect gate. `.claude/rules/board.md` followed for #7: every piece of work is on the board before it starts, with an issue opened from the owner's request when there is none, `Status` changes in the same step as the work, and the board is checked before a turn ends.

For #11, `docs/departments/programming/` got its triplet, a knowledge file, an analysis template for the specialist step and a report template for the build and each fix. It has four roles on Sonnet with `Read`, `Grep`, `Glob`, `Edit`, `Write` and `Bash`, each with an agent file. Engine owns `protocol/` and `crates/`, sdk owns `sdks/`, extension owns `extensions/`, and dev owns `libs/dev`, the root workspace config and the CI workflows. A role builds what the approved plan says, stops and reports when the plan is wrong, changes only its own part and never `docs/` or a package README, keeps the four axes, writes tests with each behaviour, runs lint, test and build through Nx, and commits its own work. The first bullet of its "What it may change" section leaves the whole work record (its handoff, the job note update and a lesson in the knowledge file) out of those file rules. The sdk role's sample extension stays in `sdks/`, and the host adapter's tests are what load it.

For #51, `.claude/rules/autonomy.md` lets every session keep working through the roadmap. It picks the next task in a fixed order: answered `Waiting on owner` tasks and review comments, then `Todo`, then a split task's sub-issues in BA's order, then the lowest open milestone's `Backlog` by issue number. It may take that task out of `Backlog` itself. It caps open PRs at 3, keeps one task to one PR, sends a task too big for a PR to BA to split, gives an epic's sub-issues `Kind` `Task`, and has the sub-issue PR that merges last close the split task as well. It stacks a task that needs an open PR's code on that branch, grouped by git.md's stack section. A session stops only for an open design question, a destructive step, an ask another rule keeps for the owner, or being stuck. `board.md`, the overview, the coordinator's and BA assistant's rules and READMEs, and git.md's after-merge cleanup were brought into line with it.

For #12, [`docs/departments/qa/`](../../../departments/qa/README.md) followed Programming's shape, with the conformance and e2e roles on Sonnet. QA checks each acceptance criterion from the outside with a yes or no, writes only a bug's reproduction test with its fixtures, never product code or another role's test, and reports findings rather than fixing them. Conformance checks extensions, SDKs and host adapters through `tenon-conformance`, placing a protocol bug's reproduction as a scenario in the suite without touching the harness. E2e drives only the built `tenon` binary, each scenario in its own temporary directory with `HOME` inside it. Its templates are the QA report and the QA reproduction. Programming's rules now keep a bug's reproduction test QA's, PM creates a bug's task branch at intake and names the QA roles on the bug and small-change routes, and the Architect gate names the QA roles in its verdict.

## Decisions

Tenon gets its own copy of the department system rather than sharing the sibling project's, and names no other project, so it depends on nothing outside itself. Only PM, BA, PO and Architect were written first, because a project at the design stage can use only the departments that take a task in, check it and judge it; the others stayed on the roster as unwritten, each rule naming what happens until they are. The Nx and TypeScript rules and the yarn-based hook fixtures were kept because `libs/dev` will have the sibling project's shape; the stack rules for NestJS, Drizzle, React Native, Docker, Zod, Vite and the generators were left out until Tenon has those stacks, and the generator rule comes with `libs/dev`.

Tasks are issues rather than draft project items, because a draft item can't take comments and the comments are where PM asks and the owner answers. `develop` became GitHub's default branch, chosen by the owner over having PM close issues by hand, so a merge into `develop` with `Closes #<n>` closes the issue and moves it to `Done`. The first tracker version kept GitHub's three statuses to avoid changing the project, with parking shown in comments; the statuses change replaced that, because `Waiting on owner` and `Blocked` show at a glance what a comment couldn't. `Backlog` keeps the next milestones' epics apart from ready work, matching the owner's three tiers in the roadmap plan. Keeping the old option IDs was the only way to change the field without resetting items. `Canceled` and `Blocked` were added at the owner's request on top of the recommended flow.

The board rule lives under `.claude/rules/` rather than in PM's rules, because the board fell behind in a direct session, where the departments don't bind. A session opens an issue from the owner's request so the owner never has to open issues for small requests. The end-of-turn check exists because statuses left for later slipped.

Programming's roles follow the roster and the approved plan's routes, since the sibling project has no such department: `protocol/` goes to engine, and the workspace and CI to dev with DevOps reviewing. A Programming role reports an out-of-date page instead of editing it, because docs are the Docs writer's. The hook needed no change for Programming, and `dist/` and the release pipeline went to no role until M4. The work record became one exception covering the whole "What it may change" section rather than a carve-out on one line or rerouting handoffs through PM: rerouting would clash with PM's rule that roles which can write files write their own handoffs, and the job note was added to the record rather than moved to PM, which would have changed PM's ruleset. Loading the SDK's sample extension moved to the host adapter's tests so an SDK's tests never depend on a host adapter.

Every autonomy limit is the owner's choice. The cap is 3 rather than 5, because M0's tasks build on each other and a change at the bottom of a deep stack has to be merged up through every link. A big task becomes smaller tasks rather than several PRs, so review follows tasks one to one. BA does the split rather than the owner, so a split reaches the owner only as a question BA can't settle. Order follows milestone and issue number, because the Architect gate opened M0's issues in dependency order. The split keeps every acceptance criterion whole in exactly one smaller task, so it doesn't break BA's rule against splitting criteria. Planning a milestone's epics goes through the existing split route, not a new one. A parked, pushed task counts as finished for the one-task rule. A chained task's draft PR targets the previous link.

QA writes only a bug's reproduction test, because the roster says it never edits product code while the flow has it write a bug's failing test. Letting QA add tests where the plan placed them lost, because it overlapped Programming's ownership and a bug has no plan when it is reproduced; a criterion with no test is a finding for Programming. The reproduction stays QA's so Programming can't weaken it, and QA stops short of the conformance harness, which is engine code. E2e never points a scenario at a real home or root, because M0's last task tests the overwrite guard and a wrong test would touch the machine's real files. Conformance runs before e2e when a task needs both, since a protocol fault explains an end-to-end failure and not the reverse.

The Architect reviewer's rule reviews judge fit only, leaving wisdom to the owner. A README describes rather than binds, so a stale README or overview line is a note, not a clash.

## Still open

The owner still has to group the `By milestone` view by milestone, since GitHub's API can't, and decide whether to delete a second `Board` view (number 3) that appeared during the statuses change. Both wait on the owner. The Programming review's note that the roster's DevOps row named CI and `libs/dev` went to [#14](https://github.com/MDReal32/tenon/issues/14) for DevOps to review them. At the newest folded handoff, Docs ([#13](https://github.com/MDReal32/tenon/issues/13)), DevOps, Cyber security and HR were still unwritten.
