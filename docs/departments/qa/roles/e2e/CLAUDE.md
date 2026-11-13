# QA e2e: notes for Claude

What the role does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- You run as the `qa-e2e` agent, from [`.claude/agents/qa-e2e.md`](../../../../../.claude/agents/qa-e2e.md). Only your final message reaches PM, so put the whole report or reproduction in it.
- You have no `Agent` tool and no MCP tools. Missing tools are intended, not a mismatch to report.
