---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/69"
role: session
model: claude-opus-5-5
date: "2026-11-13"
status: partial
branch: docs/departments/69-role-effort
pr:
---

# Set a reasoning effort for each department role

[#69](https://github.com/MDReal32/tenon/issues/69) gives every department role an explicit reasoning effort, and writes down when PM may raise one run's effort. The owner brought a routing table of models and effort levels per kind of work and asked for a researched review of how it fits the departments. After the review the owner dropped every non-Claude model, kept the role models as they are, and added that `max` is not worth its cost over `xhigh`. This handoff records the review, the decisions that came out of it, and the run of the rule change. It follows the rule-change route that HR's coming-in set up, now folded into [the departments roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md).

## What I did and how

I first reviewed the owner's table against the departments in chat. Each row was mapped to the roles that do that work: "new feature" to the BA assistant, the gate and the specialist; "building" to the Programming roles; "tester" to QA; "audit/security" to the Cyber security reviewer; "code review" to the Architect reviewer; "hard bugs" to the main session under [delegation.md](../../../../.claude/rules/delegation.md); and "research/rename" to read-only searches. Two rows, frontend and auth/payments, have no work in Tenon, which is a CLI and engine with no web UI, accounts or payments, so they were dropped. I then checked Anthropic's effort documentation for the owner's added claim about `max`, which also settled which levels each model supports.

With the owner's approval I opened #69 from the agreed mapping, put it on the board in `In Progress` with `Kind` Task and `Area` departments, and cut `docs/departments/69-role-effort` from `develop` at intake, as the coordinator's rule-change route says. The `hr-policy` agent then wrote the change in `1704ac4`, as [HR's effort handoff](2026-11-13-hr-policy-role-effort.md) records. Before it, HR folded the job's oldest ten merged handoffs into the roster compaction in `ac15bfb`, as the handoff rules require of whoever works on the job next. I checked that the PRs of every folded handoff (54, 56, 57, 59 and 65) are merged, and read HR's whole diff against the issue's mapping.

## Why this way

The non-Claude models (the GPT-6 family) lost because the departments are Claude Code subagents. The access hook tells roles apart by the `agent_type` field of Claude Code's PreToolUse payload, so a model run through another agent tool would have no `.env` block and no git limits. The agent files' tool lists would also mean nothing there, and the start-up check would fail on the model. Such a model could only ever be the owner's own second-opinion reviewer outside the pipeline.

Fable lost for the Cyber security reviewer because Fable passes requests its cyber classifier flags to Opus 4.8. Tenon's security reviews (sandboxing, exec, signing) are exactly what it flags, so a Fable run could quietly answer with an older model, and the handoff's `model` field would then record the wrong one. Fable for the Architect gate was left for later: M0 is mostly scaffolding, and Fable costs twice what Opus does.

`max` is never used. Anthropic's docs say it costs more than `xhigh` often for only a small gain, and that above `high` gains are uneven. They describe `xhigh` as made for long agentic and coding runs, so `high` is the normal top level and `xhigh` is kept for where a miss costs most: the security review, protocol reviews, and bugs whose cause is unknown. The QA e2e role got `medium` rather than the `low` first proposed, since Anthropic's docs warn that `low` in long agent prompts skips searches and checks, and the e2e role runs a long, rule-bound prompt. Haiku stays limited to short read-only searches for the same reason.

The start-up check is left alone: a role can't see its own effort, so it has nothing to compare.

## Checks

None yet for the rule text; the HR owner review and the Architect rule review follow HR's step.

## Where it stands

Partial. HR's step is committed. The owner review and the Architect rule review are next.

## Next

PM reads HR's report and diff, opens the draft PR, then starts a fresh HR run as owner review and the Architect reviewer's rule review.
