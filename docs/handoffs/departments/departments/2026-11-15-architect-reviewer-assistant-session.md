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

PM asked for the Architect rule review of PR 82, the rule change for [#81](https://github.com/MDReal32/tenon/issues/81). The change splits the owner's chat session from the pipeline: a new workspace rule `.claude/rules/assistant.md` adds the Assistant, and the PM coordinator moves into a session of its own. The review checks only that the change clashes with no workspace rule, the handbook or another ruleset, and that each level it touches only narrows the one above. It follows [HR's Assistant handoff](2026-11-15-hr-policy-assistant-session.md). The first review covered HR's third attempt, with the fourth attempt's fixes pending. PM then asked for a second review, by a fresh run, of the final state after HR's fifth attempt, which rewrote the rule for the owner's two answers of 2026-11-15: the Assistant does no task, and a relayed message confirms a destructive step only when it quotes the owner's words naming that exact action. PM asked in particular whether the earlier clashes are settled, whether the Assistant's use of `gh` clashes with the handbook's and PM's "only PM" lines, whether `board.md`, `autonomy.md`, `delegation.md` and `git.md` still read right, and whether the confirmation line only narrows `git.md`'s Safety section.

## What I did and how

The first run passed the start-up check: `claude-opus-5-5` against the role's Opus, and `Read`, `Grep` and `Glob` as the agent file lists. It read the handbook, Architect's and the reviewer's rules and the Claude notes beside them. It then read the rules diff and the handoffs diff PM provided, the final state of `assistant.md`, `autonomy.md`, `git.md`, PM's and the coordinator's `RULES.md` and `CLAUDE.md`, and the department-access hook's `main.mjs` and `find-access-violation.mjs`. It searched the workspace rules, the departments folder and the hook for "main session" to find lines that still assume a single session. It compared every changed line with the handbook's Git, Escalation, Scope, Start-up check and Communication sections, with PM's rules, and with `git.md`, `autonomy.md`, `board.md`, `delegation.md`, `commit.md` and `docs.md`.

The first run's verdict was "Clashes found", with three clashes. First, `assistant.md` let the PM session use `git.md`'s owner-asks exception for pushing to `develop` and `master`, while the handbook's Git line, which binds the coordinator, has no such exception. Second, putting the PM session in its own worktree made `git.md`'s `git checkout develop` and `git branch -d` cleanup steps fail, and made the `git fetch origin develop:develop` branching step stop to ask, whenever `develop` or the merged branch is checked out in another worktree. Third, `docs/departments/CLAUDE.md` still said `gh` is for PM only, though `assistant.md` and the hook let the Assistant run it. It also flagged a point for Cyber security, a relayed owner quote standing in for `git.md`'s explicit confirmations, and an out-of-scope stale hook message for PM.

The second run, a fresh run of the same role, passed the same start-up check. It read the same rules, the rules and handoffs diffs for the first to the sixth commit, and the final state of `assistant.md`, `git.md`, `autonomy.md`, the departments overview, PM's and the coordinator's `RULES.md` and `CLAUDE.md`, and the hook's `find-access-violation.mjs`. It searched the rules and departments for "main session" and for every line that has a session or PM ask the owner. It first checked the three earlier clashes, then looked for new ones. Its verdict is again "Clashes found", with three clashes. The first is the open half of the earlier worktree clash. `git.md` step 2 leaves each PM session that cleaned up with `develop` checked out in its worktree. The next PM session works in a fresh worktree, so git refuses its `git checkout develop`, and branching step 1 then stops to ask on every task. The new step 3 sentence covers only the merged branch. The second is the relayed-confirmation line's force-push example. Only the PM session acts on a relayed confirmation, and the handbook keeps every history rewrite from it, so the example hands it `git.md`'s looser exception, the same pattern as the first run's first clash. The third is `assistant.md`'s "the only session that asks the owner questions". Read literally, it contradicts `autonomy.md`, PM's rules and the handbook, which have PM ask on the issue; adding "in chat" settles it.

## Why this way

The first run left the handbook's "Only PM ... runs `gh`" and PM's "Only PM writes to GitHub" alone, as HR did. It did not count them as clashes: the handbook binds department roles, the Assistant is none, and the departments' Claude notes make department rules reference for other sessions. The handbook's "nobody pushes to `develop` or `master`" is a different case. It does bind the coordinator, and `assistant.md` applied `git.md`'s looser rule to the PM session by name, so it counted as a clash even though the tension between the handbook and `git.md` predates this PR. The worktree problem counted as a clash: no single line is wrong, but together the rules require steps that git refuses. The Claude-note line counted because the PR narrowed the matching overview line and left this one.

The second run judged the Assistant's `gh` use the same way and found no clash. It found `board.md`, `delegation.md` and the "Keep going" part of `autonomy.md` still right with the Assistant doing no task. The `develop` half of the worktree clash still counts, although PM's assignment called step 2's assumption decided. That decision rests on the PM session owning `develop`, which removes the Assistant's checkout as a holder of the branch, but not an ended PM session's worktree. The rules' own cleanup step leaves that worktree on `develop`, and the new step 3 sentence already expects such worktrees to remain. The force-push example counts because the line's own condition, "where a rule lets a step happen", leaves open whether `git.md` or the handbook decides for the coordinator. The handbook says that when two rules conflict, the agent stops and reports rather than picks, so the example has to agree with the handbook. The "only session that asks" wording counts because it literally contradicts three rules, even though the same file's later line shows the intended meaning; a one-word fix settles it. Whether any of these rules is a good idea was not judged; that is the owner's call.

## Checks

None to run: the role is read-only and runs no commands. Line numbers were confirmed by reading the files on the checked-out branch and by searching them. That git refuses to check out a branch used by another worktree, and refuses to fetch into a checked-out branch, comes from git's documented behaviour and was not run here.

## Where it stands

Done. The second review returned "Clashes found" with three clashes. The first run's push clash and its Claude-note clash are fixed. The owner's answers settled its Cyber security question. Its worktree clash is fixed only for the merged branch and stays open for `develop`. The new force-push example and the "only session that asks" wording are the other two clashes. The second run also passed two notes outside the task to PM: the hook's stale deny message, filed as [#83](https://github.com/MDReal32/tenon/issues/83), and an older problem, where the cleanup leaves a session on `develop` so that the next fetch into `develop` in the same worktree is refused.

## Next

PM sends the three clashes to HR for a sixth attempt. After the fix, a fresh HR owner review and a new Architect rule review check the final state. PM opens a Backlog issue for the older fetch refusal after a cleanup.
