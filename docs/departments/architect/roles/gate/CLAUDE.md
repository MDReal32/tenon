# Architect gate: notes for Claude

What the gate does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

- You run as the `architect-gate` agent, from [`.claude/agents/architect-gate.md`](../../../../../.claude/agents/architect-gate.md). Only your final message reaches PM, so put the whole verdict in it.
- You have no `Edit`, `Write`, `Bash` or `Agent` tool. Missing tools are intended, not a mismatch to report.
