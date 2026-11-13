---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/15"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/15-cyber-security
pr:
---

# Rule review of the Cyber security department

PM asked for the Architect rule review of the change that writes the Cyber security department for [#15](https://github.com/MDReal32/tenon/issues/15), continuing [the session's handoff](2026-11-13-session-cyber-security-department.md). Attempt 1 reviewed the staged, uncommitted change on `docs/departments/15-cyber-security`, and attempt 2 reviewed the fixes to it. There is no PR yet. A rule review checks only that the change clashes with no workspace rule, the handbook or another ruleset, and that each level only narrows the one above. Whether a rule is a good idea stays the owner's call.

## What I did and how

In attempt 1 I read every new file under [Cyber security](../../../departments/cyber-security/README.md) and its agent file, and the three changed rulesets: the [overview](../../../departments/README.md), [Architect's rules](../../../departments/architect/RULES.md) and the [gate's rules](../../../departments/architect/roles/gate/RULES.md). I compared them with the handbook, the workspace rules under `.claude/rules/`, PM's and the coordinator's rules, DevOps' rules and the access hook. I also read the design pages the department judges against. I found one clash. The signing rule in `cyber-security/RULES.md:25`, repeated in the review template at line 17, said a failed check stops the install. The design leaves signing open and verification optional until M5, so the rule decided an open item, against the handbook's "The design" section and the department's own line 14.

In attempt 2 the session took option (a). Line 25 now leaves what a failed check does to the owner, and the template's line 17 asks only that no open failure behaviour is decided. I checked both against the handbook, the department's line 14 and the design's signing pages, and found they agree. I then read the attempt 1 notes the session took: the knowledge file's lines 7 and 14, the reviewer README's line 10, and the session handoff's summary of the signing check. None of them adds a clash. Attempt 2 found no clashes.

## Why this way

I counted the original signing rule as a clash because what a failed check does is part of an item the book lists as open. Option (a) fixes it without the owner first deciding the design. I did not count the files check or the WASM sandbox check as clashes, since neither settles a listed open item. They stay as notes for the owner in the PR description. Line 25 now repeats part of line 14. That is not a clash, since the two agree.

## Checks

I read the files with Read, Grep and Glob. In attempt 1, a regex row-width match confirmed that both changed tables are aligned, and a repository-wide search found the phrase "Cyber security is written" only in the session handoff's prose. In attempt 2 I reread each fixed line against the rules and design pages it touches. I ran no commands, since the role runs none.

## Where it stands

Done: attempt 2 finds no clashes, and the rule review passes. The files and WASM sandbox notes wait on the owner in the PR description and don't block.

## Next

PM commits the change with the handoffs, pushes the branch, and opens the rule-change PR that closes #15. The PR description carries this review and the two notes for the owner. The owner's review is the second and last review before merge, since HR isn't written yet.
