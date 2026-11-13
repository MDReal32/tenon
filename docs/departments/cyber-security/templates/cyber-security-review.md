# Cyber security review

What a Cyber security role returns when it reviews a change the Architect gate named it for. PM puts the whole review in the PR description and, when changes are requested, pastes each finding into the next assignment of the role that owns it.

```md
🤖 Cyber security <role>: <Approved | Changes requested> for #<issue number> <task title>, attempt <n>

**Reviewed:** <the commits, from the first hash to the last, and the files in Cyber security's scope>

**Checked:**

- **Capabilities:** <yes / no / not touched: only what the manifest declares, enforced by the host, no direct side effects>
- **Sandbox:** <yes / no / not touched: WASM stays sandboxed, with no access beyond its capabilities>
- **`exec`:** <yes / no / not touched: allow-listed, shown in the output and `--dry-run`, no shell interpolation>
- **Files:** <yes / no / not touched: every operation stays inside the generated project>
- **Process extensions:** <yes / no / not touched: the user is told they run with the user's privileges>
- **Signing and trust:** <yes / no / not touched: checks run where the design asks, and no open failure behaviour is decided>
- **Access hook:** <yes / no / not touched: `.env`, `git` and `gh` limits kept, with tests>

**Findings, if any:**

1. `<file>:<line>`: <what is wrong and how it could be misused>. Breaks <boundary, rule or design section>. To pass: <what would fix it>

**Questions for the owner, if any:**

1. <the open item the change would settle, and the options>

**For other reviewers, if any:** <what you noticed for Architect or DevOps>
```
