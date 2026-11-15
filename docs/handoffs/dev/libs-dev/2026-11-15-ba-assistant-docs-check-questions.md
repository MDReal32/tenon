---
type: handoff
job: "[[libs-dev]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/78"
role: ba-assistant
model: claude-opus-5-5
date: "2026-11-15"
status: done
branch: chore/dev/78-docs-check
pr:
---

# BA answers and final brief for the docs check

PM brought the Programming dev role's specialist questions on [#78](https://github.com/MDReal32/tenon/issues/78) to the BA assistant in two rounds. #78 is the docs check in `@tenon/dev`, the second sub-issue that [the BA readiness check](2026-11-14-ba-assistant-docs-check-readiness.md) split from [#19](https://github.com/MDReal32/tenon/issues/19), on the [libs/dev](libs-dev.md) job. In round 1 the specialist asked two questions: is an anchor on a linked file outside `docs/` checked, and does this PR wire `docs:check` and `typecheck` into CI? PM also asked whether the task settles how the chain and the wikilink forms are read. In round 2 (attempt 2), PM relayed the owner's answers to the two questions round 1 left open and asked for the final brief.

## What I did and how

In round 1 I read the task text in PM's assignment, including the owner's chat answers of 2026-11-15. I also read the job note, my readiness handoff and `.claude/rules/docs.md`. I checked the `prev`/`next` frontmatter of `docs/tenon.md`, `docs/01-foundations/` and `docs/06-project/`. I searched `docs/` for wikilinks with a heading, an alias, a folder path or a triplet name, and found none. I read the `nx affected` line in `.github/workflows/ci.yml`. From the task's out-of-scope line, I answered that CI wiring is not part of this PR. From docs.md, I answered the chain question. The criterion names exactly which cases fail, so I ruled out a failure for a wikilink name that several files share. I left two gaps for the owner: is an anchor on a file outside `docs/` checked, and is a wikilink's heading checked?

In round 2 I read the owner's two answers on #78 and [the specialist's analysis](2026-11-15-programming-dev-docs-check-analysis.md). I put the answers into a brief in BA's template, with every acceptance criterion quoted as written. Then I checked each item of the definition of ready. I searched `docs/` for wikilinks with a heading and found none. I searched for repository links with an anchor and found that all of them point at Markdown files, some of them outside `docs/`, such as `.claude/rules/git.md#remote-access`. The brief says the task is ready.

## Why this way

BA answers a specialist only from the task and the owner's answers, and turns every remaining gap into a question. In round 1 the outside-anchor question stayed open because two of the owner's chat answers pointed different ways. The wikilink-heading question stayed open because the criterion lists anchors apart from unknown wikilinks. The owner's answers close both questions: an outside Markdown anchor is checked against that file's headings only, and a wikilink heading must exist, with the same rule as Markdown anchors.

I left some things to the plan instead of asking the owner. How a heading written as text is compared with a slugged anchor is a plan choice, as is how the parser pulls a name out of each wikilink form. An anchor on a file that is not Markdown has no case in today's `docs/`, so it is a note for PM, not a blocking gap. It becomes a question only if the plan needs a rule for it. The CI answer rests on the task's own out-of-scope line rather than on the specialist's default.

## Checks

I checked the brief against the task text, the owner's answers and the definition of ready, item by item. The acceptance criteria are quoted as written. The searches over `docs/` and `ci.yml` are listed above. No other checks apply to a read-only step.

## Where it stands

Done. #78 is ready, and the final brief is in BA's round-2 reply to PM. These points are settled: no CI change in this PR; the chain order follows docs.md; a wikilink name that several files share does not fail; anchors on Markdown files outside `docs/` are checked against that file's headings only; a wikilink's heading is checked with the same rule as Markdown anchors; wikilink parsing and how headings are matched are plan choices. Reported to PM: in round 1, CI runs no `typecheck`, and running `docs:check` in CI could be a later Backlog task; in round 2, the analysis's existence-only default for outside anchors no longer holds, and anchors on non-Markdown files are not covered, since none exist today.

## Next

PM gives the brief and the owner's answers to the Programming dev role, which finishes its analysis: it reads the headings of outside Markdown files and adds a check for wikilink headings. Then the PO proxy and the Architect gate judge it. If the plan needs a rule for anchors on files that are not Markdown, that goes to the owner as a question. This was BA's last round on the task.
