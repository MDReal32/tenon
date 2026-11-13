# HR review

What a fresh HR run returns as owner review of a rule change. PM puts the whole review in the PR description and, when changes are requested, pastes each finding into the next assignment of the run that wrote the change.

```md
🤖 HR <role>: <Approved | Changes requested> for #<issue number> <task title>, attempt <n>

**Reviewed:** <the commits, from the first hash to the last>

**Checked:**

- **Carries out the note:** <yes / no: it does what the note asks, nothing more>
- **Levels:** <yes / no: each level only narrows the one above>
- **Safety:** <yes / no: no safety rule loosened that the note doesn't name>
- **Split:** <yes / no: each changed folder keeps its `README.md`, `RULES.md` and `CLAUDE.md` split>
- **Hook:** <yes / no / not touched: a test for each call it newly allows or denies, all passing>

**Findings, if any:**

1. `<file>:<line>`: <what is wrong>. To pass: <what would fix it>
```
