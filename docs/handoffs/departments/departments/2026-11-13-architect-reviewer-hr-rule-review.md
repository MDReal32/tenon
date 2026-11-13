---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/16"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/16-hr
pr: 59
---

# Rule review of the HR department

PM asked for the Architect reviewer's rule review of [#16](https://github.com/MDReal32/tenon/issues/16). The change writes the HR department and its policy role, and narrows every "until HR is written" clause. This continues [the session's HR handoff](2026-11-13-session-hr-department.md). Both attempts covered the staged, uncommitted tree on `docs/departments/16-hr`, which is stacked on the Cyber security branch of PR #57. It was a rule-change PR, so only the reviewer's "Rule changes" checks applied: no clash with the workspace rules, the handbook or another ruleset, and each level only narrowing the one above. Attempt 2 also checked that each clash from attempt 1 was fixed before looking for new ones.

## What I did and how

On attempt 1, I read every new and changed file: the [HR folder](../../../departments/hr/README.md), the `hr-policy` agent file, the overview, the handbook, the coordinator's rules and the work record. I compared them with every other `RULES.md` under `docs/departments/`, with the Cyber security files on the branch below, with the workspace rules under `.claude/rules/`, and with the access hook and its wiring in `.claude/settings.json`. That attempt found two clashes. First, the new route has PM start a Cyber security review for any rule-change PR that changes the access hook, but Cyber security reviewed only what the Architect gate named, and a rule change has no gate. Second, HR writes on a task branch PM has checked out, but the coordinator created branches only after the gate approved or at bug intake, so a rule change never got one. I also raised three notes. Two contradicted the rest: `hr/CLAUDE.md` on when agent files load, and the overview's role-gap sentence beside `pm/RULES.md:9`. The third, the small-change route's branch gap, was there before this change.

On attempt 2, I reread the fixed lines. `cyber-security/RULES.md:31` now takes a rule-change PR that changes the hook. `cyber-security/roles/reviewer/RULES.md:14` sends a change no plan named back to the HR run that wrote it. The Cyber security README, the reviewer's README and the review template describe the same thing. `pm/roles/coordinator/RULES.md:43` creates a rule change's branch at intake and opens its draft PR after HR's first report. The agent-loading line is gone from `hr/CLAUDE.md`, and `README.md:125` now matches `pm/RULES.md:9`. Then I searched for new clashes around every changed line and found none.

## Why this way

I counted both attempt-1 findings as clashes, not notes: in each, the new route reached a step that another rule wouldn't let run. That is the kind of gap HR's knowledge file records from the DevOps rule review. The fixes narrow a department or role rule and loosen nothing. The Cyber security rule still narrows the handbook, since it only adds a case in which PM hands it work. Sending a rule change's unnamed change to the HR run that wrote it matches PM's rule that findings go to the role that owns what they name. The role-gap wording no longer says the owner "accepts or declines in review", but no rule lost anything, because the owner still reviews and merges every rule-change PR under the handbook. Whether HR should own the workspace rules and the hook stays the owner's call. I judged only whether it fits.

## Checks

I only read files, as Architect's rules require; I ran no commands. No "until HR is written" clause is left under `docs/departments/` or `.claude/`. HR's part overlaps no other role's part. The hook already puts the git and `.env` limits on `hr-policy`. The new file names are unique in the vault. On attempt 2, both earlier clashes are fixed, no new clash was found, and every level the change touches only narrows the one above.

## Where it stands

Done. Attempt 1 returned "Clashes found" with two clashes. Attempt 2 returned "No clashes". No question for the owner is open. The notes left for PM were the job note's line on a full run, the session handoff's state, and a Backlog issue for the small-change route's branch gap.

## Next

PM passes the notes on, commits the change with this handoff, pushes, and opens the PR that closes #16, stacked on PR #57, with this rule review in the description.
