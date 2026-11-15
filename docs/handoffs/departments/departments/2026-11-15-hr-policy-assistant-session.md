---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/81"
role: hr-policy
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: docs/departments/81-assistant-session
pr:
---

# The Assistant and the PM session, written as a rule change

[#81](https://github.com/MDReal32/tenon/issues/81) splits the owner's main session in two. Until now every department run happened inside the session the owner chatted with, so the owner could not talk to it while the pipeline ran. The owner's fix is the Assistant, the owner's chat session, which stays free to talk, and a PM session of its own that runs the pipeline, started by the Assistant and never asking the owner anything in chat. The owner wanted this as a workspace rule or a part of the structure, not a department. This is HR's write step on the rule-change route, under the [departments](departments.md) job, continuing [HR's role-effort handoff](2026-11-13-hr-policy-role-effort.md), the last rule change HR wrote.

## What I did and how

The run passed the start-up check with `claude-opus-5-5` against the role's Opus, and with `Read`, `Edit`, `Write` and `Bash`; `Grep` and `Glob` were missing, as the handbook allows for a role with `Bash`. It worked from the issue as PM's assignment quoted it, with the owner's wish passed on by the Assistant and PM's account of how its session works today, since `gh` is blocked for roles. The job holds seven handoffs outside the two compactions, fewer than the eleven that would call for a new one.

The new workspace rule, [assistant.md](../../../../.claude/rules/assistant.md), binds every session. It names the two sessions: the Assistant, which is not a department and has no folder, agent file or roster row, and the PM session, which runs the coordinator. It says that neither has an agent file, so the access hook treats each like the main session, and each is a main session in the sense `git.md` and `delegation.md` use. It lists what the Assistant does: it answers, reads the handoffs and the board, does small asks itself, sends work that needs the departments to the PM session, is the only session that asks the owner, and relays each answer to the issue, in a comment that starts `🤖 Assistant:` and quotes the owner, and to PM. It records the owner's standing ask, under which the Assistant starts a PM session for pipeline work without asking again, one at a time. It says what the brief names, and that the Assistant starts PM at Opus, with the owner setting PM's model in the session's own row when the Assistant runs on a cheaper one. It describes how questions flow both ways, which messages count as the owner's word, and the limits that stay: merging, no pushes to `develop` or `master`, and the board rules for both sessions.

The coordinator's [rules](../../../departments/pm/roles/coordinator/RULES.md) gained an "Its session" section: the coordinator runs in the PM session, never asks the owner in chat, sends every owner question to the issue and the top of its report, and treats a message from another session as the owner's word only when it quotes the owner's own words. Its model line now says that on a mismatch it does no work and reports it in the report's first line, and its tools line names the PM session's own. A parked task now also resumes when the Assistant relays the owner's reply. Its [Claude notes](../../../departments/pm/roles/coordinator/CLAUDE.md) now say the Assistant starts the session, replace the ask to switch with `/model` by the report's first line, rule out `AskUserQuestion`, and gain a "Your checkout" section: Node 26 first on `PATH` and `yarn install --immutable` in a fresh worktree. Its [README](../../../departments/pm/roles/coordinator/README.md) and [PM's README](../../../departments/pm/README.md) describe the PM session and the question flow. [PM's Claude notes](../../../departments/pm/CLAUDE.md) send the `project` scope ask through the report.

The [departments overview](../../../departments/README.md) gained the pointer under People, a line in Tasks saying the owner may answer in chat with the Assistant, which posts the answer on the issue, and "Runs in its own session" in the coordinator's roster cell, padded so the table keeps its width. Its Safety section names both sessions for `.env`, and narrows "only PM runs `gh`" to "among the departments". The [departments' Claude notes](../../../departments/CLAUDE.md) say the coordinator works in the PM session. [autonomy.md](../../../../.claude/rules/autonomy.md) now says the roadmap runs in the PM session, scopes "Keep going" and moving a task out of `Backlog` to it, says that only the Assistant asks the owner in chat while PM asks on the issue and in its report, and has the PM session report to the Assistant. [board.md](../../../../.claude/rules/board.md) needed no change.

## Why this way

The model check is the one place where PM's account and the coordinator's rules disagreed. The account had a PM session on the wrong model say so and carry on, while the coordinator's notes had it ask for `/model` and stop. The stop wins. HR's rules forbid loosening the model check unless the owner's note asks for it in its own words, and #81 only asks who sets PM's model. Carrying on would also break the handbook's start-up check, which says a mismatch means no work. What changes is only where the report goes: to the Assistant, in the first line, since PM no longer asks the owner directly. PM's account also says it posts its questions in BA's plain-language shape with a suggested answer each. That stayed out, because the issue asks only that questions go on the issue, and the coordinator's issue-comment template already carries a role's questions as the role wrote them.

`board.md` stayed as it was. Every line in it holds for each session on its own: work goes on the board before it starts, an issue opens from the owner's request in whichever session hears it, and the end-of-turn check covers what that turn changed. Its `Backlog` line already ties moving a task to autonomy.md's pick, which is now the PM session's. In autonomy.md, scoping "Keep going" to the PM session keeps the Assistant from picking roadmap tasks. The start-of-turn check for merged PRs goes with it, while git.md's cleanup when the owner says a PR merged still applies to whichever session hears it.

The handbook's Git line, "Only PM ... runs `gh`", and PM's rule that only PM writes to GitHub on a task's behalf were left unchanged. Both bind department roles, the Assistant is none, and the departments' Claude notes already make department rules reference for any other session; direct sessions ran `gh` under `board.md` before this change too. The overview's Safety line, which describes rather than binds, was narrowed instead, since it read as covering every session. The Assistant's comments start with `🤖 Assistant:` because a relay that quotes the owner must not read as the owner's own comment, the reason the handbook gives every role its prefix. The line that at most one PM session runs at a time follows from the coordinator's one-task-at-a-time rule rather than adding one. The fresh-worktree facts went into the coordinator's Claude notes, because they are mechanics for the PM session, and the PM session reads that folder.

## Checks

`yarn nx run-many -t lint` ran with Node `v26.13.1` first on `PATH`, after `yarn install --immutable`, and passed. There is no docs check in `libs/dev` yet, so a script resolved every relative link and anchor in the nine touched rule and README files, and found none broken. The roster table was measured after the edit: every row is still 258 characters. The access hook was not touched, so its tests were not run.

## Where it stands

Done. The rule change, this handoff and the job note update are committed on `docs/departments/81-assistant-session`, with no PR yet. Choices for the owner, through PM: the model check stops rather than carries on, as above; the Assistant's `🤖 Assistant:` prefix; and leaving the handbook's and PM's "only PM runs `gh`" lines as they are.

## Next

PM opens the draft PR that closes #81, then starts a fresh HR run for the owner review and the Architect reviewer's rule review. No Cyber security review, since the hook did not change.
