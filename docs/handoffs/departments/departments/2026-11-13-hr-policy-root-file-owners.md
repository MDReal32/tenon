---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/61"
role: hr-policy
model: claude-opus-5-5
date: "2026-11-13"
status: partial
branch: docs/departments/61-root-file-owners
pr:
---

# Root-file owners rule change, written after three blocked starts

[#61](https://github.com/MDReal32/tenon/issues/61) carries out the owner's answer on [#17](https://github.com/MDReal32/tenon/issues/17), the Nx workspace task, about root files no role's part named: the git files go to DevOps, and the package managers' own files, Cargo's and Yarn's, to the Programming dev role. This is HR's record of the task under the [departments](departments.md) job. It continues [the root-file handoff](2026-11-13-session-root-file-owners.md), which drafted the change outside HR, and [the Architect rule review](2026-11-13-architect-reviewer-root-file-owners.md), which found that the change must come from HR.

## What I did and how

Three runs of this role stopped at the [handbook](../../../departments/RULES.md)'s start-up check before any work. The first two were started for the owner review of the session's draft: each read the handbook, HR's rules, the policy role's rules, the `CLAUDE.md` beside each, the role's README and its agent file, matched the model (`claude-opus-5-5` against the role's Opus), and found only `Read`, `Edit`, `Write` and `Bash` where the agent file lists `Grep` and `Glob` too, with neither deferred. The third was started after the session restarted, this time to write the change, and found the same four tools. None of them changed a file. [#62](https://github.com/MDReal32/tenon/issues/62), through [the start-up check handoff](2026-11-13-session-startup-check-search.md), then added the handbook's exception that a role whose agent file lists `Bash` may find `Grep` and `Glob` missing, and PM merged it into this branch.

The fourth run, this one, passed the check under that exception: model `claude-opus-5-5`, tools `Read`, `Edit`, `Write` and `Bash`, with `Grep` and `Glob` missing as allowed, and the harness's hand-back tool as the channel the final report goes through. It worked from the owner's answer as PM's assignment quoted it, since only PM runs `gh`. It adopted the session's draft with one change in wording and wrote it. [The DevOps engineer's rules](../../../departments/devops/roles/engineer/RULES.md) gain "The root git files: `.gitignore` and `.gitattributes`" in their part. [The Programming dev role's rules](../../../departments/programming/roles/dev/RULES.md) gain "The package managers' own root files: `Cargo.lock`, `.yarnrc.yml` and `.yarn/`", next to the root config they already held (`yarn.lock`, the root `package.json` and `Cargo.toml`, `rust-toolchain.toml`). The descriptions follow: [the engineer's README](../../../departments/devops/roles/engineer/README.md) says it keeps the root git files, the role table in [the DevOps README](../../../departments/devops/README.md) adds them to what the engineer owns, [the dev role's README](../../../departments/programming/roles/dev/README.md) names the package managers' own files with the root config, and the DevOps row of [the overview's roster](../../../departments/README.md#roster) adds the root git files. The roster table was re-aligned, since its Status column had kept the width of the "not written" cells the HR change removed. This run also renamed this handoff from its `-review` name to fit its topic, and fixed the one link to it, in the session's handoff.

## Why this way

`.gitattributes` goes next to `.gitignore`. The owner's answer gives a rule by kind ("if its git then maybe DevOps"), not a list of files, and `.gitattributes` is git's own file just as `.gitignore` is, so naming it carries out the answer rather than adding to it. The overview's pull request size rules already expect lockfiles and generated code to be marked `linguist-generated`, and that mark lives in `.gitattributes`: left unnamed, it would be the next root file in no role's part, and the first task that needs the mark, likely #17 with its `yarn.lock`, would park on it. The alternative, leaving it out and asking the owner, lost because the answer's own wording already covers it; HR's owner review and the Architect review can still weigh it.

The parts name exact files, as every other role's part does, rather than the owner's categories, so a role can tell from its rules alone whether a file is its own. The files named are those the existing rules already imply: Yarn, since `yarn.lock` is the dev role's, with its `.yarnrc.yml` and `.yarn/` folder, and Cargo, since the root `Cargo.toml` is, with its `Cargo.lock`. The new dev line stays its own bullet rather than joining the root config line, so the owner's split between the workspace config and the package managers' own files stays visible. The Programming README's role table and the overview's Programming row stay as they were, since "the workspace's root config" and "the workspace config" still describe the dev role truly. No department `RULES.md`, knowledge file or agent file needed a change: the departments' "What it may change" rules already send a change in another role's part to PM, and the hook enforces only `.env` and git, not parts.

## Checks

`git diff --cached` was read before the commit: the five department files, the overview, the renamed handoff and the session handoff's link, with `.idea/vcs.xml` left unstaged. Until `libs/dev` has the docs check, every link and anchor in the touched files was checked by reading them: each relative link points at a file that exists, and `#roster` and `#what-it-may-change` match their headings. Both changed tables, the overview's roster and the DevOps role table, were re-aligned by a script and then read to confirm every pipe lines up, with each column as wide as its widest cell; the overview's status table was already aligned and is unchanged. A search of `docs/departments/` and `.claude/` found no other ruleset that names these files or claims the repository root.

## Where it stands

Partial. The rule change and this handoff are committed on `docs/departments/61-root-file-owners`, not pushed. The fresh HR owner review and the Architect rule review, attempt 2, have still to run. Open for the owner, through PM: whether `.gitattributes` belongs with DevOps, as argued above; the "maybe" in the owner's answer, which this change reads as a decision since #61 was opened from it; and, from the Architect's notes, that engine and sdk tasks adding a dependency will now touch `Cargo.lock` or `yarn.lock` in the dev role's part, and that `.idea/` is tracked but in no role's part.

## Next

PM starts a fresh `hr-policy` run for the owner review of this commit, then the Architect reviewer's rule review as attempt 2, which first checks that the process clash from attempt 1 is settled. Then PM pushes the branch and opens the PR, and #17's branch stacks on this one.
