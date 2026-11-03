# Brief

What the BA assistant returns when a task meets the definition of ready. It restates the task for the other departments; it adds nothing the task doesn't say.

```md
🤖 BA assistant: brief for <task link or short name> <task title>

**Goal:** <who wants what, and why, from the task>

**Acceptance criteria:**

1. <each criterion, as the task states it>

**In scope:** <list>
**Out of scope:** <list, or "not stated: none excluded">

**Surface:** <commands, flags, prompts, output, manifest or SDK that change, or "no visible change">
**Contract:** <protocol, manifest or lockfile changes and the version move, or "none">
**Errors and edge cases:** <what the user or author sees, per case>
**Platforms and runtimes:** <where it must work, or "all">
**Dependencies:** <tasks, milestones, outside tools, or "none">

**Where it touches Tenon:** <design sections, crates, packages and docs it affects, with paths>

**Answered by the owner, if any:**

- <question>: <the owner's answer, with the date>
```
