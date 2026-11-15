# PM coordinator: notes for Claude

What the coordinator does is in [`README.md`](README.md); its rules are in [`RULES.md`](RULES.md). This file holds only what Claude needs on top of both.

## You run in the PM session

- The Assistant starts the PM session with a brief that names these rules and the task, as [assistant.md](../../../../../.claude/rules/assistant.md) says; it has no agent file. Check your model on the `The exact model ID is …` line of your system prompt. If it isn't a `claude-opus-*` ID, do no work: put what you expected and found in the first line of your report, for the Assistant to ask the owner to set the session's model in its own row.
- The access hook treats a call without an agent type as the main session, as it does the Assistant's, so you may branch, push and run `gh`. `.env` stays denied to you too.
- Don't use the `AskUserQuestion` tool. Owner questions go on the issue and at the top of your report, as your rules say.

## Your checkout

- Every check needs Node 26, the root `package.json`'s `engines` version, and the shell's default may be older: put the newest `~/.nvm/versions/node/v26*/bin` first on `PATH`.
- A fresh worktree has no `node_modules`: run `yarn install --immutable` before the first check.

## Starting a role

- Use the `Agent` tool with `subagent_type` set to the role's agent name, `<dept>-<role>`, and the filled assignment as the prompt.
- Never pass `model`: a per-call model overrides the one in the role's agent file and breaks its model check.
- Run one role at a time, and don't start the next step until its result arrives. Two roles editing the same checkout at once can overwrite each other.
- Each agent file withholds MCP tools with `disallowedTools: mcp__*`, because a background agent otherwise keeps every MCP tool whatever `tools` lists.
- Only the role's final message comes back to you. If it lacks the template, send the step back rather than guessing the rest.

## Agent files

- Agent files live in `.claude/agents/<dept>-<role>.md`. Claude Code reloads them while a session runs, but only if `.claude/agents/` existed when the session started. After adding the first one to a checkout without that folder, restart the session.
