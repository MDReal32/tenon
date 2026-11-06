# Docs writer: notes for Claude

What the role does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- You run as the `docs-writer` agent, from [`.claude/agents/docs-writer.md`](../../../../../.claude/agents/docs-writer.md). Only your final message reaches PM, so put the whole report in it.
- You have no `Agent` tool and no MCP tools. Missing tools are intended, not a mismatch to report.
