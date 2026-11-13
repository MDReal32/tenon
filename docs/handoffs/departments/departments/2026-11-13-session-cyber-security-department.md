---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/15"
role: session
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/15-cyber-security
pr:
---

# Write the Cyber security department

[#15](https://github.com/MDReal32/tenon/issues/15) asks for the Cyber security department with its one role, the reviewer, in the shape [#11](https://github.com/MDReal32/tenon/issues/11) gave Programming: a triplet and an agent file for the role, the department's template and knowledge file, the roster row set to written, and every "until written" clause narrowed. The route has the owner write it, which a direct session does while HR isn't written, then the Architect reviewer's rule review. It continues [the DevOps handoff](2026-11-06-session-devops-department.md). Before starting, the job held fourteen merged handoffs, so the oldest ten were folded into [the departments foundation](2026-11-03--2026-11-06-compacted-departments-foundation.md) in a commit of their own.

## What I did and how

I wrote [`docs/departments/cyber-security/`](../../../departments/cyber-security/README.md) after Architect's shape, since the overview's "Adding a department" names Architect for a read-only reviewer. The department's rules keep it read-only and command-free, judge against the design book's pages on runtimes, discovery and trust, the manifest and the decisions, and send any change that would settle the capability model, signing or another open item to the owner. Their core is a trust-boundary checklist every review goes through: capabilities only as the manifest declares and enforced by the host, WASM sandboxed by default, `exec` only for allow-listed binaries shown in the output and `--dry-run` with no shell interpolation, every operation inside the generated project, process extensions shown as running with the user's privileges, checksums and signatures checked where the design asks with what a failure does left to the owner, and the access hook keeping its `.env`, `git` and `gh` limits with tests. The department judges security only, reviews only when the Architect gate names it, and never writes a working exploit into a finding. The reviewer role names Opus with `Read`, `Grep` and `Glob`, and its agent file `cyber-security-reviewer` copies `architect-reviewer`'s front matter and body. The one template is the Cyber security review, with a "not touched" answer for checks a change doesn't reach and a section for owner questions. The knowledge file gathers the design's facts about the trust boundary and the hook.

In the [overview](../../../departments/README.md), the status line and the roster row now say Cyber security is written, and the row names the access hook. The two "until Cyber security is written" clauses are gone: Architect's rules now pass Cyber security notes to that department, and the gate's rule no longer parks the route, and names the access hook among the changes that call for Cyber security.

## Why this way

The access hook joined Cyber security's scope because [#14](https://github.com/MDReal32/tenon/issues/14) had the owner review the hook "standing in for Cyber security", so the hook's review was always meant to be this department's; leaving it off the gate's list would have left the hook with no reviewer once the owner stops standing in. Secrets in CI, the release and `.env` stay DevOps', so the two reviews don't overlap. The department has no specialist or build step, unlike DevOps, because it owns no part of the repository; a security concern found before the build is the gate's, which already names Cyber security for the route. The checks that go beyond the design's words, no shell interpolation in `exec` and no path outside the generated project, follow from decision 3's rule that extensions only emit operations and from the overwrite guard M0's end-to-end test checks; they are checks of how the design is built, not new design. The hook needed no change, since a read-only role needs no privilege and the hook already denies `.env` to every agent but the DevOps engineer.

## Checks

The link, anchor and table check over `docs/` and `.claude/` passed for every file this change touches. The agent file's front matter keys match `architect-reviewer`'s, and the hook's 168 tests still pass. The Architect reviewer's [rule review](2026-11-13-architect-reviewer-cyber-security-rule-review.md) found one clash on attempt 1: the signing check said a failed check stops the install, which decides an item the design leaves open. It now leaves what a failure does to the owner. Attempt 2 found no clashes. I also took its notes: the knowledge file states facts only, and an approved review goes on to whatever review the route names next, not always the Architect reviewer.

## Where it stands

Done on `docs/departments/15-cyber-security`, with the rule review passed, in the PR that closes #15. Two notes from the review wait on the owner in the PR description: the files check goes past what the book says, resting on M0's target-directory guard, so the owner may want it written on the [generation](../../../03-engine/01-generation.md) page; and the sandbox check reads WASM capability enforcement as complete, while the manifest page says how strictly each runtime enforces capabilities isn't final.

## Next

The owner reviews and merges the PR. HR, [#16](https://github.com/MDReal32/tenon/issues/16), is the last department, and the next M0 task.
