---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/16"
role: session
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/16-hr
pr: 59
---

# Write the HR department

[#16](https://github.com/MDReal32/tenon/issues/16) asks for the HR department with its one role, policy, in the shape [#11](https://github.com/MDReal32/tenon/issues/11) gave Programming, and for every "until HR is written" clause to be narrowed. HR is the last department on the roster. The route has the owner write it, which a direct session does, then the Architect reviewer's rule review. It continues [the Cyber security handoff](2026-11-13-session-cyber-security-department.md), and its branch is stacked on Cyber security's, since both change the overview's status line and roster and this change names Cyber security for hook changes.

## What I did and how

I wrote [`docs/departments/hr/`](../../../departments/hr/README.md) after the Docs department's shape, since HR is a department that writes files. The department's rules say a rule change carries out only the owner's note, a retro's proposal or a parked role gap, never a rule nobody asked for; it leaves design items open, never loosens a safety rule unless the owner's note says so in its own words, keeps the three levels and each folder's three-file split, and adds departments in the overview's order. A hook change comes with a test for every call it newly allows or denies and gets the Cyber security review. A fresh HR run does the owner review, checking that the change carries out its note and nothing more. The policy role names Opus with `Read`, `Grep`, `Glob`, `Edit`, `Write` and `Bash`, and its agent file `hr-policy` follows `docs-writer`'s. Its part is everything under `docs/departments/`, the agent files, the workspace rules under `.claude/rules/`, and the access hook with its tests and its wiring in `.claude/settings.json`. The two templates are the HR report and the HR review. The knowledge file records how the rulesets fit and one lesson from the DevOps rule review: new work for a department needs a step in PM's routes.

The "until HR is written" clauses are gone. The overview's status line now says every department is written. The rule-change section names Cyber security for hook changes, has HR write a retro's proposal, and has HR draft a new role once the owner agrees to add it, as PM's rules already ask the owner first. The handbook says rules change through HR, which the owner reviews and merges. PM's coordinator gained a rule-change route: HR policy, a fresh HR run as owner review, the Architect reviewer's rule review, and Cyber security when the hook changes. Its retro step now runs the proposal as a rule change through HR, and a rule change gets its task branch at intake, since it has no gate. The rule review's first attempt brought the last part, a role-gap bullet in the overview that now asks the owner first as PM's rules do, the removal of a note in HR's Claude notes that wrongly said a new agent file loads only in a later session (the coordinator's note, that Claude Code reloads them while a session runs, is right, and this session picked up the new agents that way), and also Cyber security's side of the hook review: its rules now take a rule-change PR that changes the hook when PM hands one over, and send a change no plan named back to the HR run that wrote it.

## Why this way

HR's part takes the workspace rules as well as the department rulesets, because the roster gives HR "every ruleset" and the overview says a rule change is always its own PR; leaving `.claude/rules/` out would leave the rules every role follows with no owner. It takes the access hook too, since the overview's "Adding a department" changes the hook in the same PR as a role that needs a new privilege, and HR is the one adding roles; the hook's code is small and its tests are its spec, so it needs no Programming role, and Cyber security reviews every change to it. Owning the hook means HR needs `Bash` to run its tests, which a read-only role couldn't. Knowledge files sit in HR's part for their facts, while each department's lessons stay that department's work record, so HR never edits another department's lesson. The rule-change route had to be added to PM, because a department whose work no route reaches can't run, the lesson DevOps' review taught. HR runs on Opus as the roster says, since its work is judgment about how rules fit, not volume.

## Checks

The link, anchor and table check over every tracked markdown file passed. The agent file's front matter keys match `docs-writer`'s. The hook's 168 tests pass. The Architect reviewer's [rule review](2026-11-13-architect-reviewer-hr-rule-review.md) found two clashes on attempt 1, both from the new rule-change route reaching steps other rules didn't let run: Cyber security reviewed only what the gate named, and PM had no point at which to create a rule change's branch. Both are fixed, and attempt 2 found no clashes. The reviewer also noticed the small-change route has the same branch gap from before this change, so it went to [#58](https://github.com/MDReal32/tenon/issues/58) in `Backlog`.

## Where it stands

Done on `docs/departments/16-hr`, with the rule review passed, in the PR that closes #16, stacked on the Cyber security PR. HR's part, the workspace rules and the access hook included, is the owner's call in review.

## Next

The owner reviews and merges the Cyber security PR, then this one. After them, M0's code tasks start with the Nx workspace, [#17](https://github.com/MDReal32/tenon/issues/17).
