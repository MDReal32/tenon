---
type: job
area: departments
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/11"
  - "https://github.com/MDReal32/tenon/issues/12"
  - "https://github.com/MDReal32/tenon/issues/13"
  - "https://github.com/MDReal32/tenon/issues/14"
  - "https://github.com/MDReal32/tenon/issues/51"
updated: "2026-11-06"
---

# Departments

The departments are how Tenon's work is meant to be done: AI agents organized like a company's departments, each with a written ruleset, taking a task from the owner through a brief, a gate, the build and the reviews to a pull request. This job covers the rulesets themselves, the agent files that load them, the hook that enforces their access rules, and the record every piece of work leaves behind.

## How it works

The [departments overview](../../../departments/README.md) holds the idea, the roster, the flow and the safety rules, and the [handbook](../../../departments/RULES.md) holds the rules every role follows. Eight departments are written: PM, whose coordinator is the main session; BA, whose assistant checks a task against the definition of ready; PO, whose proxy judges product fit at the gate; Architect, whose gate and reviewer judge technical fit against [the design book](../../../tenon.md) and its four axes; Programming, whose engine, sdk, extension and dev roles build the code and its tests, each in its own part of the repository; QA, whose conformance and e2e roles check the change from the outside and write only a bug's reproduction test, never product code; Docs, whose writer keeps the design book and the package READMEs true to the change, never code; and DevOps, whose engineer builds the release and the launchers, reviews CI and build config, and alone handles `.env`. Every role but the coordinator has an agent file under `.claude/agents/`, and a project hook under `.claude/hooks/department-access` blocks `.env` for everyone but the DevOps engineer, and keeps branching, pushing and `gh` with the main session. The work record follows `.claude/rules/handoffs.md`, with notes started from `docs/templates/`.

Nothing runs end to end yet: Cyber security and HR are on the roster but not written, so a route that needs them parks at their step.

## How it got here

The first four departments, the workspace rules and the hook came in [the session that set them up](2026-11-03-session-basic-departments.md), shaped after a sibling project's department system but written for Tenon alone. The tracker, the statuses and the board rule followed in their own handoffs. Programming, the first department that writes code, came in [the Programming handoff](2026-11-05-session-programming-department.md), written from the roster since the sibling project has no such department. QA followed in [the QA handoff](2026-11-06-session-qa-department.md), in Programming's shape, Docs in [the Docs handoff](2026-11-06-session-docs-department.md), and DevOps in [the DevOps handoff](2026-11-06-session-devops-department.md).

## Current state

PM, BA, PO, Architect, Programming, QA, Docs and DevOps are written, with their agent files, templates and knowledge files; the hook and its tests are in place. Tasks live as issues in the [Tenon project](https://github.com/users/MDReal32/projects/4), with eight statuses and `Kind`, `Area` and `Size` fields. Programming came in [#11](https://github.com/MDReal32/tenon/issues/11), through [the Programming handoff](2026-11-05-session-programming-department.md). QA came in [#12](https://github.com/MDReal32/tenon/issues/12), through [the QA handoff](2026-11-06-session-qa-department.md). Since [#51](https://github.com/MDReal32/tenon/issues/51), through [the autonomy handoff](2026-11-06-session-autonomy-rules.md), a run keeps going through the roadmap on its own, with at most 3 PRs open for review, and BA splits a task too big for one PR. Docs came in [#13](https://github.com/MDReal32/tenon/issues/13), through [the Docs handoff](2026-11-06-session-docs-department.md). DevOps came in [#14](https://github.com/MDReal32/tenon/issues/14), through [the DevOps handoff](2026-11-06-session-devops-department.md). The rest of the roster follows as M0's next tasks: Cyber security, then HR last.
