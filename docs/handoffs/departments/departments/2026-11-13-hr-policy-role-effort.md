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
pr: 70
---

# Role effort rule change, written and fixed after both reviews

[#69](https://github.com/MDReal32/tenon/issues/69) gives every department role an explicit reasoning effort in its agent file, and writes down when PM may set a different effort for a single run, with `max` never used. Until now no agent file set `effort`, so every role ran at the session's. The owner approved the mapping of roles to levels; the models stay as they are. This is HR's write step on the rule-change route, under the [departments](departments.md) job, continuing [PM's session handoff](2026-11-13-session-role-effort.md), on the rule-change route whose origin is folded into [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md).

## What I did and how

Before the rule change, the job held fourteen merged handoffs that no compacted handoff folded, so, as [handoffs.md](../../../../.claude/rules/handoffs.md) asks of whoever works on the job next, I folded the oldest ten into [the roster compaction](2026-11-06--2026-11-13-compacted-departments-roster.md) in a commit of its own. The ten are the Docs, DevOps, Cyber security and HR handoffs, and the session's and Architect reviewer's handoffs for #61, ordered by when each first entered the history; HR's own handoff for #61 started after those two and stays outside the fold. The commit deletes the ten, points the links in [HR's root-file handoff](2026-11-13-hr-policy-root-file-owners.md), [the start-up check handoff](2026-11-13-session-startup-check-search.md) and the job note at the compaction, and replaces the job note's story of those departments with one sentence.

For the rule change, each of the fourteen files under `.claude/agents/` gained an `effort` line after `model`, as the owner's mapping gives it: `high` for `architect-gate`, `architect-reviewer`, `hr-policy` and `devops-engineer`; `xhigh` for `cyber-security-reviewer`; `medium` for `ba-assistant`, `po-proxy`, the four Programming roles, both QA roles and `docs-writer`. No model changed. [delegation.md](../../../../.claude/rules/delegation.md) gained an "Effort" section: a department role runs at its agent file's `effort`, and the main session sets a different one for one run, through the Agent tool's `effort` parameter, only for the four cases #69 lists (the Architect reviewer at `xhigh` for an extension-protocol change, a Programming role at `high` for a harder or longer task, a bug whose cause is unknown at `xhigh` in the main session or an Opus subagent, and a read-only search on Haiku at `low`). A second bullet says `max` is never used, in an agent file or for a run, with Anthropic's cost reason.

Attempt 2 fixed what the two reviews of attempt 1 found, on draft PR 70: [HR's owner review](2026-11-13-hr-policy-role-effort-review.md) and [the Architect reviewer's rule review](2026-11-13-architect-reviewer-role-effort.md). The Architect's first clash was the unknown-cause bug case, which said the work ran at `xhigh` "in the main session" while the Agent tool's `effort` parameter, the means the same bullet names, only reaches a subagent; HR's owner review asked the same as a question for the owner. That case now names only an Opus subagent, and a separate bullet states the fact for the main session: work kept there runs at the session's effort, which the owner sets, and for such a bug the owner may set it to `xhigh`. The second clash, also HR's owner review's finding 1, was the file's opening line, which limited it to hand-offs to a Sonnet or an Opus subagent while the Effort section named a Haiku search. The opening now says the file decides who takes a piece of work and the effort it runs at, and "Who takes the work" gained a bullet that a short read-only search may go to a Haiku subagent.

The descriptions follow. The [overview's roster](../../../departments/README.md#roster) gained an Effort column, with "session's" for the coordinator, which has no agent file, and the paragraph under it says which roles run at which level and links the delegation rule's section. The agent file step of "Adding a department" now lists `effort` among the front matter keys. [HR's knowledge file](../../../departments/hr/hr-knowledge.md), whose fact about an agent file's keys would otherwise be stale, now lists `effort` too.

## Why this way

The delegation rule names the main session rather than PM, because `delegation.md` binds every session and only the main session has the Agent tool; when it runs the departments the main session is PM, so the rule reaches PM as the task asks while staying true for a direct session. "Raise" became "set a different effort", since the Haiku case lowers effort below Haiku's default. The `max` ban covers agent files as well as single runs, because the task states it without limit and the owner's verdict is about `max` itself.

In attempt 2 the main-session half of the bug case became a fact rather than a rule: it says who sets the session's effort and that the owner may choose `xhigh`, and puts no new duty on the owner or the session, such as asking for a higher effort, since the owner's mapping didn't ask for one; PM settled the reviews' question that way and tells the owner in the PR. The Haiku bullet says "may", because the owner's mapping names Haiku only for read-only searches without making it the only way to search, and the bullet keeps the file consistent with the Effort case without sending every search to Haiku. It sits before the small-asks bullet, which still keeps a search the session can finish itself in the session.

No role's `RULES.md` changed. Each role's "Model and tools" section serves the start-up check, which the task keeps out of scope because a role can't see its own effort; adding effort there would read as a check nobody can run. The department READMEs' role tables, which name each role's model, were left alone: the roster holds every role's effort in one place, and repeating it in ten tables would only add copies to keep in step. The owner review can ask for them if wanted. The roster's single Effort cell per department works because every role in a department shares one level.

## Checks

There is no `libs/dev` yet, so no Nx docs check exists; I checked by reading instead, as HR's rules say. The relative links I touched resolve: `../../.claude/rules/delegation.md#effort` from the overview matches the new `## Effort` heading, and the compaction's and this handoff's links point at files that exist. The roster table was re-aligned by a script and measured: all twelve rows are 258 characters, with every column as wide as its widest cell. A `git grep` for each folded file name over the tracked files found no link left to any of them. Every agent file was read after the edit: one `effort` line each, right after `model`, with the mapped level. The access hook was not touched, so its tests were not run. In attempt 2 I reread `delegation.md` whole against both findings: the opening no longer names a model, every model the Effort section names has a bullet in "Who takes the work", and every case in the Agent-tool list is a subagent run. Its only link, `#effort` from the overview, still matches the heading, and the overview's paragraph still describes the section truly.

## Where it stands

Partial: attempt 2 is committed on `docs/departments/69-role-effort`, in draft PR 70, and waits on HR's owner review and the Architect reviewer's rule review of the fixes. The `CLAUDE_CODE_EFFORT_LEVEL` override, noted in attempt 1, stays unrecorded, since both reviews agree it is no rule and nobody asked for it. The department READMEs' role tables and the start-up check stay unchanged.

## Next

PM starts a fresh HR run as owner review of attempt 2, then the Architect reviewer's rule review on attempt 2's commit only. With both approved, this handoff's `status` becomes `done` and PR 70 leaves draft for the owner.
