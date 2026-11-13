---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/61"
role: session
model: claude-opus-5-5
date: "2026-11-13"
status: done
branch: docs/departments/61-root-file-owners
pr: 65
---

# Name the root git and package-manager files in the DevOps and dev parts

[#61](https://github.com/MDReal32/tenon/issues/61) carries out the owner's answer on [#17](https://github.com/MDReal32/tenon/issues/17), the Nx workspace task, about root files no role's part named: git files go to DevOps, and the package managers' own files to the Programming dev role. #17's branch will stack on this one, since its roles can't touch those files until their parts name them. It continues [the HR handoff](2026-11-13-session-hr-department.md), which set up the rule-change route this must follow.

## What I did and how

As PM I opened #61 from the owner's answer and cut its branch from `develop` at intake, as the rule-change route says. The `hr-policy` agent wasn't loaded in this session, which started before its agent file existed, so I drafted the change myself and ran the Architect reviewer's rule review on it. The rule text clashed with nothing, but the review found one clash in how it was made, in [the Architect rule review](2026-11-13-architect-reviewer-root-file-owners.md): rules change only through HR, and PM may not do HR's step or replace its owner review. When `hr-policy` did load later in the session, both of its runs stopped at the start-up check, as [HR's handoff](2026-11-13-hr-policy-root-file-owners.md) records, because agents loaded mid-session came up without `Grep` and `Glob`. The owner chose to pause #61 and #17 until the session restarts. I took the draft out of the working tree, so no rule file changed on this branch, and kept it below for HR.

The draft HR may adopt or rewrite: the DevOps engineer's "Its part" in `docs/departments/devops/roles/engineer/RULES.md` gains "The root git files: `.gitignore` and `.gitattributes`." The Programming dev role's "Its part" in `docs/departments/programming/roles/dev/RULES.md` gains "The package managers' own root files: `Cargo.lock`, `.yarnrc.yml` and `.yarn/`." The descriptions follow: the DevOps README's role table adds "and the root git files", the engineer's README says it "keeps the root git files", the dev role's README says "the workspace's root config with the package managers' own files", and the overview's DevOps roster row adds "Keeps the root git files." The overview's roster table also needs re-aligning, since its Status column kept the width of the "not written" cells the HR change removed.

## Why this way

`.gitattributes` was drafted next to `.gitignore` because both are git's own root files, and generated files will be marked `linguist-generated` there; the reviewer noted that this goes past the owner's words, which is for HR's owner review to judge. Removing the draft rather than committing it keeps PM to its rule of committing only the work record, and lets HR write the change as its own work.

## Checks

The link, anchor and table check passed on the draft. The Architect reviewer's attempt 1 returned one clash, on process only. The reviewer's other notes for the owner: engine and sdk tasks that add a dependency will now also touch files in the dev role's part, and `.idea/` is tracked but in no role's part.

## Where it stands

Done. The restart wasn't needed: [#62](https://github.com/MDReal32/tenon/issues/62) excused the missing `Grep` and `Glob` in the start-up check, and once it merged into this branch `hr-policy` wrote the change, as [HR's root-file handoff](2026-11-13-hr-policy-root-file-owners.md) records. A fresh HR run approved it as owner review, and [the Architect rule review](2026-11-13-architect-reviewer-root-file-owners.md), attempt 2, found no clashes. It is in PR 65, which closes #61.

## Next

The owner reviews PR 65 and its notes. #17's branch stacks on this one.
