---
type: handoff
job: "[[ci]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/18"
role: session
model: claude-sonnet-5-5
date: "2026-11-15"
status: done
branch: chore/dev/18-ci
pr: 71
---

# Department lines that said CI doesn't exist yet

[#18](https://github.com/MDReal32/tenon/issues/18) adds the CI workflow, and three department lines said CI didn't exist yet: the Running section of [the departments overview](../../../departments/README.md), line 10 of `pm-knowledge.md` and line 7 of `devops-knowledge.md`. They would have been untrue the moment the PR merged, so the Architect gate and the BA brief both asked for them to be updated in the same PR.

## What I did and how

I changed each line to match what the workflow does. The overview now says departments run the checks locally through Nx and that CI runs the affected checks on every pull request. `pm-knowledge.md` says CI runs `yarn nx affected -t lint test build check` on every pull request, on Linux only, and keeps its statement that the engine will be Rust and the workspace tooling will live in `libs/dev`. `devops-knowledge.md` names `.github/workflows/ci.yml` and says it runs on every pull request on a pinned `ubuntu-24.04`, with every action pinned to a full commit SHA. [The DevOps engineer's review](2026-11-15-devops-engineer-ci-review.md) confirmed all three statements are true.

## Why this way

No department role could make the change. The Docs writer's rules leave department files out of its part, PM writes no docs, and the Programming dev role may not change a `README.md` or a knowledge file of another department. So I made it as the owner's direct session, in its own commit, `83c5e46`, instead of leaving the lines untrue. The commit went in before this handoff, which handoffs.md asks to be committed together with the work. The Architect reviewer found that gap, and since history can't be rewritten, this handoff follows in a new commit. The gap in who owns such lines is for the owner: a role that owns the departments overview and the knowledge files of departments with no code of their own would close it.

## Checks

The link, anchor and table check over the repository found no new problem; its only findings are the example links inside the note templates. [The DevOps engineer's review](2026-11-15-devops-engineer-ci-review.md) read the three lines against the workflow.

## Where it stands

Done. The three lines are updated and recorded.

## Next

The Architect reviewer's second attempt confirms the finding is fixed.
