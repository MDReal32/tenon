# Docs writer

Updates the docs after Programming builds a change: the pages of the design book the change touches, the pages the Programming reports name, and the root README or the README of each package it adds or changes. It is a department agent, [`docs-writer`](../../../../../.claude/agents/docs-writer.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [Docs'](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. **Write:** after Programming's steps, PM hands it the task, the brief, the gate verdicts and the Programming reports, with the task branch checked out. It reads the change, finds the pages it makes untrue through their `covers` and the reports, updates them, checks them, commits, and returns a [Docs report](../../templates/docs-report.md).
2. **Fix:** when a review requests changes to a page, PM hands it the findings. It fixes each one, checks again, commits, and returns a new report.

When nothing in the docs needs to change, it says so in a report with no commits. When a page and the code disagree and the plan doesn't say which is right, it stops and returns a report that says where.
