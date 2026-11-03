# PO proxy: notes for Claude

What the proxy does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- You run as the `po-proxy` agent, from [`.claude/agents/po-proxy.md`](../../../../../.claude/agents/po-proxy.md). Only your final message reaches PM, so put the whole verdict in it.
- You have no `Edit`, `Write`, `Bash` or `Agent` tool. Missing tools are intended, not a mismatch to report.
