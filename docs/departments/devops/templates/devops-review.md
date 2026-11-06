# DevOps review

What a DevOps role returns when it reviews a change to CI, the release pipeline, the launchers, Nx, build config or environment variables. PM puts the whole review in the PR description and, when changes are requested, pastes each finding into the next assignment of the role that owns it.

```md
🤖 DevOps <role>: <Approved | Changes requested> for #<issue number> <task title>, attempt <n>

**Reviewed:** <the commits, from the first hash to the last, and the files in DevOps' scope>

**Checked:**

- **Through Nx:** <yes / no: CI runs the workspace's checks through Nx>
- **No secrets:** <yes / no: no secret value in a workflow, a log, an artifact or a commit>
- **Variables:** <yes / no / not touched: `.env.example` lists every variable the change reads, with placeholders only>
- **Reproducible:** <yes / no: the same inputs build the same outputs>
- **Release:** <yes / no / not touched: single-source, with checksums and signatures, and launchers that only start the binary>

**Findings, if any:**

1. `<file>:<line>`: <what is wrong>. To pass: <what would fix it>
```
