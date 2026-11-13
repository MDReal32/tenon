---
type: job
area: departments
status: in progress
tasks:
  - "https://github.com/MDReal32/tenon/issues/11"
  - "https://github.com/MDReal32/tenon/issues/12"
  - "https://github.com/MDReal32/tenon/issues/13"
  - "https://github.com/MDReal32/tenon/issues/14"
  - "https://github.com/MDReal32/tenon/issues/15"
  - "https://github.com/MDReal32/tenon/issues/16"
  - "https://github.com/MDReal32/tenon/issues/51"
  - "https://github.com/MDReal32/tenon/issues/61"
  - "https://github.com/MDReal32/tenon/issues/62"
  - "https://github.com/MDReal32/tenon/issues/69"
updated: "2026-11-13"
---

# Departments

The departments are how Tenon's work is meant to be done: AI agents organized like a company's departments, each with a written ruleset, taking a task from the owner through a brief, a gate, the build and the reviews to a pull request. This job covers the rulesets themselves, the agent files that load them, the hook that enforces their access rules, and the record every piece of work leaves behind.

## How it works

The [departments overview](../../../departments/README.md) holds the idea, the roster, the flow and the safety rules, and the [handbook](../../../departments/RULES.md) holds the rules every role follows. All ten departments are written: PM, whose coordinator is the main session; BA, whose assistant checks a task against the definition of ready; PO, whose proxy judges product fit at the gate; Architect, whose gate and reviewer judge technical fit against [the design book](../../../tenon.md) and its four axes; Programming, whose engine, sdk, extension and dev roles build the code and its tests, each in its own part of the repository; QA, whose conformance and e2e roles check the change from the outside and write only a bug's reproduction test, never product code; Docs, whose writer keeps the design book and the package READMEs true to the change, never code; DevOps, whose engineer builds the release and the launchers, reviews CI and build config, and alone handles `.env`; Cyber security, whose reviewer checks every change the gate names it for against Tenon's trust boundary and the access hook, never editing; and HR, whose policy role writes and reviews every rule change, the workspace rules and the access hook included. Every role but the coordinator has an agent file under `.claude/agents/`, and a project hook under `.claude/hooks/department-access` blocks `.env` for everyone but the DevOps engineer, and keeps branching, pushing and `gh` with the main session. The work record follows `.claude/rules/handoffs.md`, with notes started from `docs/templates/`.

Every route now has a department for each step, so a task can run through the pipeline end to end.

## How it got here

The first stretch, from the first four departments, the workspace rules and the hook through the tracker, the board's statuses, the board rule, Programming, the autonomy rules and QA, is folded into [the departments foundation](2026-11-03--2026-11-06-compacted-departments-foundation.md). It was shaped after a sibling project's department system but written for Tenon alone. The second stretch, Docs, DevOps, Cyber security and HR, each written by a direct session and checked by the Architect reviewer's rule review, then the first rule change after HR existed, the root-file owners, is folded into [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md).

## Current state

Every department on the roster is written, with their agent files, templates and knowledge files; the hook and its tests are in place. Tasks live as issues in the [Tenon project](https://github.com/users/MDReal32/projects/4), with eight statuses and `Kind`, `Area` and `Size` fields. Programming came in [#11](https://github.com/MDReal32/tenon/issues/11) and QA in [#12](https://github.com/MDReal32/tenon/issues/12), both folded into [the departments foundation](2026-11-03--2026-11-06-compacted-departments-foundation.md). Since [#51](https://github.com/MDReal32/tenon/issues/51), folded there too, a run keeps going through the roadmap on its own, with at most 3 PRs open for review, and BA splits a task too big for one PR. Docs came in [#13](https://github.com/MDReal32/tenon/issues/13), DevOps in [#14](https://github.com/MDReal32/tenon/issues/14), Cyber security in [#15](https://github.com/MDReal32/tenon/issues/15), with the gate naming it for the access hook as well, and HR in [#16](https://github.com/MDReal32/tenon/issues/16), all folded into [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md). HR owns every ruleset, the workspace rules and the access hook, and PM has a rule-change route for it. [#62](https://github.com/MDReal32/tenon/issues/62), through [the start-up check handoff](2026-11-13-session-startup-check-search.md), excuses missing `Grep` and `Glob` in the start-up check for roles with `Bash`, which this environment never gives those tools, so the roles that write files can run. [#61](https://github.com/MDReal32/tenon/issues/61), which names the root git files in DevOps' part and the package managers' own files in the Programming dev role's, was written by `hr-policy`, approved by HR's owner review and the Architect rule review, and merged in PR #65, as [HR's root-file handoff](2026-11-13-hr-policy-root-file-owners.md) records. [#69](https://github.com/MDReal32/tenon/issues/69), through [HR's role-effort handoff](2026-11-13-hr-policy-role-effort.md), gives every agent file a reasoning `effort` and adds an "Effort" section to `.claude/rules/delegation.md` naming when PM sets a different effort for one run, with `max` never used; it is written by `hr-policy` and waits on HR's owner review and the Architect rule review.
