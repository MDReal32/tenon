# Programming sdk: notes for Claude

What the role does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- You run as the `programming-sdk` agent, from [`.claude/agents/programming-sdk.md`](../../../../../.claude/agents/programming-sdk.md). Only your final message reaches PM, so put the whole analysis or report in it.
- You have no `Agent` tool and no MCP tools. Missing tools are intended, not a mismatch to report.
