---
type: handoff
job: "[[departments]]"
tasks:
  - "https://github.com/MDReal32/tenon/issues/51"
role: architect-reviewer
model: claude-opus-5-5
date: "2026-11-06"
status: done
branch: docs/claude-rules/51-autonomy
pr:
---

# Clash check of the autonomy rules

PM asked for the Architect reviewer's rule-change check on the autonomy rules for [#51](https://github.com/MDReal32/tenon/issues/51), continuing [the session's handoff](2026-11-06-session-autonomy-rules.md). The check asks whether the change clashes with any workspace rule under `.claude/rules/` or any ruleset under `docs/departments/`, and whether each level it touches only narrows the one above. PM came back with attempt 2 the same day, after fixing the six clashes in the working tree and making a few other changes, and I updated this handoff instead of writing another. A third attempt followed the same day, and I updated it again.

## What I did and how

I read the new `.claude/rules/autonomy.md` and the changed `board.md`, [departments overview](../../../departments/README.md), coordinator and BA assistant rules and READMEs. I compared them against `git.md`, `handoffs.md`, `commit.md`, `delegation.md`, `docs.md`, `language.md`, `markdown.md`, the handbook, the PM, BA and Architect rulesets and the Claude notes. I grepped `.claude/` and `docs/departments/` for `Backlog`, `Todo`, splits, sub-issues, draft PRs and the owner-only wording. The verdict was clashes found, six of them. First, autonomy.md's closed "stop only" list left out the asks that git.md and the PM Claude notes require. Second, the coordinator's one-task rule forbade carrying on past a parked task. Third, the coordinator opened every draft PR against `develop`, while chained links target the previous branch. Fourth, the start-of-turn merge cleanup was wider than git.md's cleanup trigger and its exemption from confirmation. Fifth, milestone planning had no route in the coordinator's, BA's or PM's rules. Sixth, `gh stack link` was unconditional, while git.md has conditions and a fallback.

On attempt 2 I first checked each earlier clash against the edited files, and all six are fixed: the owner-say bullet in `autonomy.md`, parked tasks counting as having no unfinished step in the coordinator's intake, the chained draft PR's base, git.md's widened cleanup trigger and scope, epics planned through the existing split route, and the conditional stack grouping. Then I checked the other changes. Two new clashes came in with the split sub-issues. autonomy.md placed them third in the pick order, but the coordinator's explicit order and the overview's didn't include that step. autonomy.md also gave sub-issues the split task's `Kind`, which would make every sub-issue of an epic an `Epic`. The verdict stayed clashes found, two of them, each a one-line fix.

On attempt 3 I checked the two attempt-2 clashes first, and both are fixed. The coordinator's intake and the overview's run order now include the split's sub-issues, in BA's order, between `Todo` and the milestone's `Backlog`, as `autonomy.md` does, and `autonomy.md` gives an epic's sub-issues `Kind` `Task`. A grep over `docs/departments/` for sub-issues and the PR cap found no leftovers. The verdict is no clashes.

## Why this way

I judged fit only, as the reviewer's rules say, and left whether each rule is wise to the owner. BA's rule against splitting acceptance criteria doesn't clash with its new split duty, because the split keeps every criterion whole in one task. Stale descriptions in the READMEs went to PM as notes, not clashes, since READMEs hold no rules. On attempt 2, the coordinator's missing pick-order step counted as a clash, not a narrowing, because its explicit order put lower-numbered `Backlog` tasks before a split's sub-issues. The `Kind` inheritance counted as a clash because two lines of the same change contradicted each other once an epic is split. On attempt 3, closing the parent with the sub-issue PR that merges last stayed a note, not a clash: it needs PM to add the parent's `Closes` once a sub-issue PR is the last one open, which PM then wrote into `autonomy.md`.

## Checks

A read-only review of the working tree with Read, Grep and Glob, since there were no commits yet. Attempt 2 was also read-only over the working tree, with a grep over `docs/departments/` for `Backlog`, splits, sub-issues and the pick order that found no other leftovers. Attempt 3 was read-only with Read and Grep as well.

## Where it stands

Done: attempt 3 returned no clashes, so the change can go to the owner's review. Nothing waits on the owner from this review.

## Next

None for this review.
