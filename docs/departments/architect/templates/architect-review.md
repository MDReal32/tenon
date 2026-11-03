# Architect review

What the Architect reviewer returns after the owner review. PM puts the whole review in the PR description and, when changes are requested, pastes each finding into the next assignment of the role that owns it.

```md
🤖 Architect reviewer: <Approved | Changes requested> for <task link or short name> <task title>, attempt <n>

**Reviewed:** <the commits, from the first hash to the last>

**Checked:**

- **Matches the approved plan:** <yes / no, naming any step it skips or goes beyond>
- **Four axes:** <yes / no>
- **Layers and boundaries:** <yes / no>
- **Rules:** <yes / no>
- **Tests:** <yes / no: the behaviour the task adds or changes has tests, and generation stays deterministic>
- **Only the task:** <yes / no: nothing unrelated changed>
- **One reviewable PR:** <yes / no, with the changed files and lines>
- **Design and docs:** <yes / no: the design and the changed pages match the code, and no page the change makes untrue was left>

**Findings, if any:**

1. `<file>:<line>`: <what is wrong>. Breaks <rule, design section or boundary>. To pass: <what would fix it>

**For other reviewers, if any:** <what you noticed for Cyber security or DevOps>
```
