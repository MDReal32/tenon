---
type: job
area: departments
status: in progress
tasks: []
updated: "2026-11-03"
---

# Departments

The departments are how Tenon's work is meant to be done: AI agents organized like a company's departments, each with a written ruleset, taking a task from the owner through a brief, a gate, the build and the reviews to a pull request. This job covers the rulesets themselves, the agent files that load them, the hook that enforces their access rules, and the record every piece of work leaves behind.

## How it works

The [departments overview](../../../departments/README.md) holds the idea, the roster, the flow and the safety rules, and the [handbook](../../../departments/RULES.md) holds the rules every role follows. Four departments are written: PM, whose coordinator is the main session; BA, whose assistant checks a task against the definition of ready; PO, whose proxy judges product fit at the gate; and Architect, whose gate and reviewer judge technical fit against [the design book](../../../tenon.md) and its four axes. The read-only roles each have an agent file under `.claude/agents/`, and a project hook under `.claude/hooks/department-access` blocks `.env` for everyone but a future DevOps engineer, and keeps branching, pushing and `gh` with the main session. The work record follows `.claude/rules/handoffs.md`, with notes started from `docs/templates/`.

Nothing runs end to end yet: Programming, QA, Docs, Cyber security, DevOps and HR are on the roster but not written, so a route that needs them parks at their step.

## How it got here

The first four departments, the workspace rules and the hook came in [the session that set them up](2026-11-03-session-basic-departments.md), shaped after a sibling project's department system but written for Tenon alone.

## Current state

PM, BA, PO and Architect are written, with their agent files, templates and knowledge files; the hook and its tests are in place. The work is committed on `master` and `develop` in [`MDReal32/tenon`](https://github.com/MDReal32/tenon), and tasks now live as issues in the [Tenon project](https://github.com/users/MDReal32/projects/4), as [the tracker handoff](2026-11-03-session-github-project-tracker.md) set up. Next come the departments the first code will need, Programming and QA, and `libs/dev`, which the owner plans to build with the same shape and rules as the sibling project's.
