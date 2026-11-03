# Architect rule review

What the Architect reviewer returns when PM hands it a rule-change PR instead of a task. PM puts it in the PR description, and when it finds clashes, sends them back to whoever wrote the change.

```md
🤖 Architect reviewer: <No clashes | Clashes found> for rule-change PR #<number> <PR title>, attempt <n>

**Reviewed:** <the commits, from the first hash to the last>

**Checked:**

- **Workspace rules:** <yes / no: it clashes with nothing under `.claude/rules/`>
- **Handbook and rulesets:** <yes / no: it clashes with no other `RULES.md`>
- **Only narrows:** <yes / no: each level it touches only narrows the one above>

**Clashes, if any:**

1. `<changed file>:<line>` clashes with `<other file>:<line>`: <how they disagree>. To pass: <what would settle it>
```
