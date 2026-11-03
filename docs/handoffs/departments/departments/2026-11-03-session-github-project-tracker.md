---
type: handoff
job: "[[departments]]"
tasks: []
role: session
model: claude-opus-5-5
date: "2026-11-03"
status: done
branch: docs/departments/github-project-tracker
pr:
---

# GitHub issues and the Tenon project as the task tracker

The owner has no task management tool apart from GitHub, and chose the private [Tenon project](https://github.com/users/MDReal32/projects/4) as the place tasks live. The departments, written in [the first departments session](2026-11-03-session-basic-departments.md), had assumed no tracker yet, so a task was only the owner's request in the session and its original wording was lost when the session ended. This change makes a GitHub issue in `MDReal32/tenon`, added to that project, the task and its source of truth.

## What I did and how

The project is empty and uses GitHub's default `Status` field, with `Todo`, `In Progress` and `Done`. I wrote the departments around those three values instead of adding new ones. A run moves its issue to `In Progress` at intake. A parked task stays `In Progress`, and its latest issue comment says what it waits on. A task is `Done` once its issue closes. The [overview](../../../departments/README.md) gained this in its "Tasks" section, and the run order became the order of the `Todo` column.

PM's owner message became an [issue comment](../../../departments/pm/templates/issue-comment.md), posted on the task's issue, and the owner answers by replying there. The PR description opens with `Closes #<n>`. Every template names the task as `#<issue number>`, and the assignment carries the issue's body and the owner's answers. The coordinator's rules now cover reading the issue with its comments, moving `Status`, splitting a task into sub-issues, opening a new issue for an unrelated finding, and an "After the merge" step. PM's Claude notes name the `gh` commands, and the `project` scope they need. The handoff rule, the language rule and the three note templates link tasks by issue URL. PM's knowledge now records the repository, the project and its statuses in place of the "not a git repository" facts.

I also brought the two job notes' "Current state" up to date now that the work is committed, and filled the `branch` field of the two earlier handoffs with `master`, where they were committed. Their text is unchanged.

## Why this way

Issues rather than draft project items, because a draft item can't take comments, and the comments are where PM asks and the owner answers. Keeping the default three statuses avoids changing the project's configuration. Parking is visible in the issue comments instead of in a status of its own. If parked tasks get hard to spot, a `Waiting` status is a small change to the project.

GitHub's default branch is still `master`, so a PR into `develop` that says `Closes #<n>` won't close its issue on merge. The coordinator closes the issue itself after the merge until the default branch is `develop`. The owner hasn't decided whether to switch.

## Checks

`gh project view`, `field-list` and `item-list` read the project once the owner granted the `project` scope. The link, anchor and table check over `docs/` and `.claude/` passed, and no mention of the old "no tracker" wording is left outside the earlier handoffs.

## Where it stands

Done, on `docs/departments/github-project-tracker`, in a PR against `develop`. Open for the owner: whether to make `develop` GitHub's default branch.

## Next

After the merge, the first real task goes in as an issue in the project, and a new session on Opus runs it through the departments. The department agents load only in a session that starts with `.claude/agents/` present.
