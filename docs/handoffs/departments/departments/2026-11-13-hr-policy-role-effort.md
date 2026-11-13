---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/69"
role: hr-policy
model: claude-opus-5-5
date: "2026-11-13"
status: partial
branch: docs/departments/69-role-effort
pr:
---

# Role effort rule change, written

[#69](https://github.com/MDReal32/tenon/issues/69) gives every department role an explicit reasoning effort in its agent file, and writes down when PM may set a different effort for a single run, with `max` never used. Until now no agent file set `effort`, so every role ran at the session's. The owner approved the mapping of roles to levels; the models stay as they are. This is HR's write step on the rule-change route, under the [departments](departments.md) job, continuing [PM's session handoff](2026-11-13-session-role-effort.md), on the rule-change route whose origin is folded into [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md).

## What I did and how

Before the rule change, the job held fourteen merged handoffs that no compacted handoff folded, so, as [handoffs.md](../../../../.claude/rules/handoffs.md) asks of whoever works on the job next, I folded the oldest ten into [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md) in a commit of its own. The ten are the Docs, DevOps, Cyber security and HR handoffs, and the session's and Architect reviewer's handoffs for #61, ordered by when each first entered the history; HR's own handoff for #61 started after those two and stays outside the fold. The commit deletes the ten, points the links in [HR's root-file handoff](2026-11-13-hr-policy-root-file-owners.md), [the start-up check handoff](2026-11-13-session-startup-check-search.md) and the job note at the compaction, and replaces the job note's story of those departments with one sentence.

For the rule change, each of the fourteen files under `.claude/agents/` gained an `effort` line after `model`, as the owner's mapping gives it: `high` for `architect-gate`, `architect-reviewer`, `hr-policy` and `devops-engineer`; `xhigh` for `cyber-security-reviewer`; `medium` for `ba-assistant`, `po-proxy`, the four Programming roles, both QA roles and `docs-writer`. No model changed. [delegation.md](../../../../.claude/rules/delegation.md) gained an "Effort" section: a department role runs at its agent file's `effort`, and the main session sets a different one for one run, through the Agent tool's `effort` parameter, only for the four cases #69 lists (the Architect reviewer at `xhigh` for an extension-protocol change, a Programming role at `high` for a harder or longer task, a bug whose cause is unknown at `xhigh` in the main session or an Opus subagent, and a read-only search on Haiku at `low`). A second bullet says `max` is never used, in an agent file or for a run, with Anthropic's cost reason.

The descriptions follow. The [overview's roster](../../../departments/README.md#roster) gained an Effort column, with "session's" for the coordinator, which has no agent file, and the paragraph under it says which roles run at which level and links the delegation rule's section. The agent file step of "Adding a department" now lists `effort` among the front matter keys. [HR's knowledge file](../../../departments/hr/hr-knowledge.md), whose fact about an agent file's keys would otherwise be stale, now lists `effort` too.

## Why this way

The delegation rule names the main session rather than PM, because `delegation.md` binds every session and only the main session has the Agent tool; when it runs the departments the main session is PM, so the rule reaches PM as the task asks while staying true for a direct session. "Raise" became "set a different effort", since the Haiku case lowers effort below Haiku's default. The `max` ban covers agent files as well as single runs, because the task states it without limit and the owner's verdict is about `max` itself.

No role's `RULES.md` changed. Each role's "Model and tools" section serves the start-up check, which the task keeps out of scope because a role can't see its own effort; adding effort there would read as a check nobody can run. The department READMEs' role tables, which name each role's model, were left alone: the roster holds every role's effort in one place, and repeating it in ten tables would only add copies to keep in step. The owner review can ask for them if wanted. The roster's single Effort cell per department works because every role in a department shares one level.

## Checks

There is no `libs/dev` yet, so no Nx docs check exists; I checked by reading instead, as HR's rules say. The relative links I touched resolve: `../../.claude/rules/delegation.md#effort` from the overview matches the new `## Effort` heading, and the compaction's and this handoff's links point at files that exist. The roster table was re-aligned by a script and measured: all twelve rows are 258 characters, with every column as wide as its widest cell. A `git grep` for each folded file name over the tracked files found no link left to any of them. Every agent file was read after the edit: one `effort` line each, right after `model`, with the mapped level. The access hook was not touched, so its tests were not run.

## Where it stands

Partial: the rule change is written and committed on `docs/departments/69-role-effort`, waiting on HR's owner review and the Architect reviewer's rule review. Notes for those reviews and the owner, through PM: the bug case says "in the main session", but the main session can't set its own effort through the Agent tool, so in practice that case runs at `xhigh` only when the session already does or the owner sets it; the delegation rule's opening still speaks of Sonnet and Opus subagents only, while the Haiku case now names Haiku for read-only searches; and the `CLAUDE_CODE_EFFORT_LEVEL` environment variable, when set, overrides every agent file's `effort`, which no note records.

## Next

PM reads this report and the diff, opens the draft PR that closes #69, and starts a fresh HR run as owner review, then the Architect reviewer's rule review. PM's own session handoff for #69, still uncommitted, links the folded HR handoff and needs that link pointed at [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md) before it is committed.
