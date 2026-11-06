---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/14"
role: session
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/departments/14-devops
pr:
---

# Write the DevOps department

[#14](https://github.com/MDReal32/tenon/issues/14) asks for the DevOps department with its one role, the engineer, in the shape [#11](https://github.com/MDReal32/tenon/issues/11) gave Programming. On top of that, the access hook must let only `devops-engineer` read or change `.env`, with tests for it, and the owner reviews the hook in place of Cyber security. It continues [the Docs handoff](2026-11-06-session-docs-department.md), and its branch is stacked on Docs', since all three change the overview's status line and roster. The route has the owner write it, which a direct session does while HR isn't written, then the Architect reviewer's rule review.

## What I did and how

I wrote [`docs/departments/devops/`](../../../departments/devops/README.md) with three duties: building the release pipeline and the launchers, reviewing changes to CI, Nx and build config when the gate names DevOps, and handling every request that needs `.env`. The department's rules come first with secrets: `.env` only for the variables PM's request names, no secret value anywhere but `.env`, `.env.example` kept in step with placeholders, and CI secrets named from the repository's secret store, never held. Then come its part, the release (single-source, launchers that only start the binary, never publishing), reviews, checks and commits, with `.env` checked untracked before every commit. The engineer's part is `dist/`, the release workflow and `.env` with `.env.example`. The two templates are the DevOps report, which never holds a secret value, and the DevOps review. The agent file `devops-engineer` names Opus, as the roster does, with the same tools as Programming's roles. In the [overview](../../../departments/README.md), the status line and the roster row now say DevOps is written, and the two "until DevOps is written" clauses, in the overview's safety section and the handbook's secrets section, are gone.

The hook already let only `devops-engineer` touch `.env`, by exact name. Its tests gave the DevOps engineer every `.env` call, but proved "only" against a single other agent named `programming-backend`, a role that no longer exists. I changed that agent to `programming-engine` and added a test per `.env` call that denies it to agents named like the DevOps engineer: `devops`, `devops-reviewer`, `Devops-engineer` and `devops-engineer-2`. The hook itself is unchanged.

The Architect reviewer's [rule review](2026-11-06-architect-reviewer-devops-department.md) found four clashes, and I fixed them all. Architect's rules still had two "until written" clauses covering DevOps, and they now name only Cyber security: infrastructure notes go to DevOps, and only a Cyber security step parks a route. The gate named DevOps for environment variables, which DevOps' review didn't cover, so DevOps' review scope and its template now check that `.env.example` lists every variable a change reads. DevOps had a build step no route started, so the overview's flow and PM's feature and small-change routes now name the build step as the Programming or DevOps role for each part touched. I also took the review's notes. The commit check now uses `git ls-files .env`, since `git status` never lists an ignored file. The Programming READMEs now leave the release workflow out of the dev role's part. Attempt 2 found that DevOps, as the owner of its part, had no specialist step for the feature route, so it now has one: a plan section in its rules like Programming's, a step in the engineer's README, and a DevOps analysis template in Programming's shape.

## Why this way

The roster gave DevOps "CI, `libs/dev` tooling and build config", while Programming's dev role already owns `libs/dev`, the root config and the CI workflows, and names DevOps as their reviewer. I kept the code with the dev role and made DevOps their reviewer, and gave DevOps only the release workflow among the workflows, narrowing the dev role's part to match and rewording the roster row. One owner per file keeps PM's routing of findings simple. Environment variables went to DevOps' review rather than off the gate's list, since the variables a change reads are exactly where a secret could slip into a commit. The engineer runs on Opus, as the roster says, because its work is mostly judgment about secrets and releases rather than volume. Releasing stays with the owner, since publishing can't be undone.

## Checks

The hook's tests pass under `node --test find-access-violation.test.mjs`: 168, up from 155. The link, anchor and table check over `docs/` and `.claude/` passed. The Architect reviewer's [rule review](2026-11-06-architect-reviewer-devops-department.md) found four clashes on attempt 1 and one on attempt 2, all fixed, and none on attempt 3. For the owner's hook review: the hook trusts the agent type alone, so a session started with `claude --agent devops-engineer` also reaches `.env`, which matches the rule's intent.

## Where it stands

Done on `docs/departments/14-devops`, with the rule review passed. The PR that closes #14 is stacked on the Docs PR and waits for the owner's review, the hook's included, in place of Cyber security.

## Next

The owner reviews and merges the QA, Docs and DevOps PRs in order. Cyber security, [#15](https://github.com/MDReal32/tenon/issues/15), comes next once a PR slot frees.
