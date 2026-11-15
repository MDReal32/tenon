---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-15"
status: blocked
branch: chore/dev/78-docs-check
pr:
---

# BA answers to the dev specialist's questions on the docs check

PM brought the Programming dev role's specialist questions on [#78](https://github.com/MDReal32/tenon/issues/78) back to the BA assistant. This was BA round 1 of at most 2, attempt 1. #78 is the docs check executor in `@tenon/dev`, the second sub-issue that [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md) split from [#19](https://github.com/MDReal32/tenon/issues/19), on the [libs/dev](libs-dev.md) job. The specialist asked two questions: whether an anchor on a linked file outside `docs/` is checked, and whether this PR wires `docs:check` and `typecheck` into CI. PM also asked whether the task settles how the specialist reads the `prev`/`next` chain and the wikilink forms.

## What I did and how

I read the task text in PM's assignment, including the owner's chat answers of 2026-11-15. I read the job note and my readiness handoff, and `.claude/rules/docs.md` for the chain and file-name rules. I checked the `prev`/`next` frontmatter of `docs/tenon.md`, `docs/01-foundations/` and `docs/06-project/`. I searched `docs/` for wikilinks with a heading, an alias, a folder path or a triplet name, and found none. I also read the `nx affected` line in `.github/workflows/ci.yml`. I answered the CI question from the task: its out-of-scope line and its Surface item settle that CI wiring is not in this PR. I answered the chain question from docs.md. On wikilinks, I found that the criterion's four failure cases do not include an ambiguity failure. Two gaps became questions for the owner: whether an anchor on a file outside `docs/` is checked, and whether a wikilink's heading is checked.

## Why this way

BA answers a specialist only from the task and the owner's answers, and turns every remaining gap into a question. The outside-anchor question stays open because two of the owner's answers point different ways. One counts repository files "and their #anchors"; the other says outside files are "checked to exist". The wikilink heading question stays open because the criterion lists links and anchors separately from unknown wikilinks. I ruled out an ambiguity failure without asking the owner, because the criterion names exactly which cases fail, and adding one would invent a requirement. The way the parser pulls a name out of each wikilink form is a plan choice, not an owner question. The CI answer follows the task's own out-of-scope line instead of the specialist's default, so it rests on the task rather than on a guess.

## Checks

I checked each answer against the task text, the owner's answers and docs.md. The searches over `docs/` and `ci.yml` are listed above. No other checks apply to a read-only step.

## Where it stands

Blocked on the owner, who has two questions on #78: whether an anchor on a file outside `docs/` is checked, and whether a wikilink's heading is checked. Each has a suggested answer, and either choice passes today's docs. Settled: no CI change in this PR; the chain order follows docs.md; there is no ambiguity failure; wikilink parsing is a plan choice. Reported to PM: CI runs no `typecheck`, and `docs:check` in CI could be a later Backlog task.

## Next

PM posts the two questions on #78 and sets it to `Waiting on owner`. When the owner answers, PM gives the answers to the Programming dev role to finish its analysis. If the answers raise new specialist questions, BA round 2 is the last one.
