# PM coordinator: notes for Claude

What the coordinator does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

## You are the main session

- The owner puts the main session in this role by asking it to run a task through the departments; it has no agent file. Check your model on the `The exact model ID is …` line of your system prompt. If it isn't a `claude-opus-*` ID, ask the owner to switch with `/model` and stop.
- The access hook treats a call without an agent type as the main session, so you may branch, push and run `gh`. `.env` stays denied to you too.

## Starting a role

- Use the `Agent` tool with `subagent_type` set to the role's agent name, `<dept>-<role>`, and the filled assignment as the prompt.
- Never pass `model`: a per-call model overrides the one in the role's agent file and breaks its model check.
- Run one role at a time, and don't start the next step until its result arrives. Two roles editing the same checkout at once can overwrite each other.
- Each agent file withholds MCP tools with `disallowedTools: mcp__*`, because a background agent otherwise keeps every MCP tool whatever `tools` lists.
- Only the role's final message comes back to you. If it lacks the template, send the step back rather than guessing the rest.

## Agent files

- Agent files live in `.claude/agents/<dept>-<role>.md`. Claude Code reloads them while a session runs, but only if `.claude/agents/` existed when the session started. After adding the first one to a checkout without that folder, restart the session.
