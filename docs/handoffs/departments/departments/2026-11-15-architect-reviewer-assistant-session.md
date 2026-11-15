---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/81"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: docs/departments/81-assistant-session
pr: 82
---

# Architect rule review of the Assistant and the PM session

PM asked for the Architect rule review of PR 82, the rule change for [#81](https://github.com/MDReal32/tenon/issues/81). The change splits the owner's chat session from the pipeline: a new workspace rule `.claude/rules/assistant.md` adds the Assistant, and the PM coordinator moves into a session of its own. The review checks only that the change clashes with no workspace rule, the handbook or another ruleset, and that each level it touches only narrows the one above. It follows [HR's Assistant handoff](2026-11-15-hr-policy-assistant-session.md), whose third attempt HR's owner review approved.

## What I did and how

The run passed the start-up check: `claude-opus-5-5` against the role's Opus, and `Read`, `Grep` and `Glob` as the agent file lists. It read the handbook, Architect's and the reviewer's rules and the Claude notes beside them. It then read the rules diff and the handoffs diff PM provided, the final state of `assistant.md`, `autonomy.md`, `git.md`, PM's and the coordinator's `RULES.md` and `CLAUDE.md`, and the department-access hook's `main.mjs` and `find-access-violation.mjs`. It searched the workspace rules, the departments folder and the hook for "main session" to find lines that still assume a single session. It compared every changed line with the handbook's Git, Escalation, Scope, Start-up check and Communication sections, with PM's rules, and with `git.md`, `autonomy.md`, `board.md`, `delegation.md`, `commit.md` and `docs.md`.

The verdict is "Clashes found", with three clashes. First, `assistant.md` line 37 lets the PM session use `git.md`'s owner-asks exception for pushing to `develop` and `master`, while the handbook's Git line, which binds the coordinator, has no such exception. Second, putting the PM session in its own worktree makes `git.md`'s `git checkout develop` and `git branch -d` cleanup steps fail, and makes the `git fetch origin develop:develop` branching step stop to ask, whenever `develop` or the merged branch is checked out in another worktree. Third, `docs/departments/CLAUDE.md` line 24 still says `gh` is for PM only, though `assistant.md` and the hook let the Assistant run it. The review also flagged a point for Cyber security, a relayed owner quote standing in for `git.md`'s explicit confirmations, and an out-of-scope stale hook message for PM.

## Why this way

HR left the handbook's "Only PM ... runs `gh`" and PM's "Only PM writes to GitHub" as they are. The review did not count them as clashes: the handbook binds department roles, the Assistant is none, and the departments' Claude notes make department rules reference for other sessions. The handbook's "nobody pushes to `develop` or `master`" is a different case. It does bind the coordinator, and `assistant.md` applied `git.md`'s looser rule to the PM session by name, so it counted as a clash even though the handbook-to-`git.md` tension predates this PR. The worktree problem counted as a clash, not only a note for the PR description: no single line is wrong, but together the rules require steps that git refuses, and the branching half had not been named before. The Claude-note line counted because the PR narrowed the matching overview line and left this one, and it loads into the Assistant's own session. Whether any of these rules is a good idea was not judged; that is the owner's call.

## Checks

None to run: the role is read-only and runs no commands. Line numbers were confirmed by reading the files on the checked-out branch and by searching them.

## Where it stands

Done. The review returned "Clashes found" with three clashes, a note for Cyber security and one note outside the task. Clash 1 and clash 3 are wording fixes for HR, which PM sent for attempt 4. Clash 2 needs the owner to decide how worktrees and `develop` fit together, and it goes to the owner in the PR description with the branching case added to the cleanup case HR had named.

## Next

After the fix, a new Architect rule review run checks that clashes 1 and 3 are settled. PM puts clash 2 and the Cyber security question, whether a relayed quote of the owner may stand in for `git.md`'s explicit confirmations of a push to `develop`, a force-push or a branch deletion, to the owner. PM opens a Backlog issue for the hook's stale deny message, which says a forbidden git call runs only in the main session, which is PM.
