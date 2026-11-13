# Delegation Rules

These decide who does a piece of work a session hands off, and the effort it runs at.

## Who takes the work

- Work that needs detailed thinking goes to Opus: architecture and design choices, a change to the extension protocol, a bug whose cause is unknown, security, a change across many crates or packages, or a brief that can't be written without judgment calls left open. Keep it in the main session, or start an Opus subagent.
- Programming work with a clear brief goes to a Sonnet subagent: implementing a described change, writing tests for known behaviour, a mechanical refactor, fixing a bug whose cause is found.
- A short read-only search may go to a Haiku subagent.
- Small asks the session can finish in a few tool calls stay in the session.

## Effort

- A department role runs at the `effort` its agent file under `.claude/agents/` sets. The main session sets a different effort for one run, through the Agent tool's `effort` parameter, only in these cases:
  - the Architect reviewer at `xhigh`, for a change to the extension protocol;
  - a Programming role at `high`, for a harder or longer task;
  - a bug whose cause is unknown at `xhigh`, in an Opus subagent;
  - a read-only search on Haiku at `low`.
- Work kept in the main session runs at the session's effort, which the owner sets. For a bug whose cause is unknown, the owner may set it to `xhigh`.
- `max` is never used, neither in an agent file nor for a run: it costs more than `xhigh`, often for only a small gain.

## Handing work off

- Write the brief like a department assignment: the goal, the exact files or modules, what done looks like, the checks to run, and what is out of scope. A subagent does well with a precise brief and badly with an open one.
- Point the subagent at the rules that bind it, such as [`code-style/`](code-style) and the other rules for the files it touches, instead of restating them, and never pass a rule in the brief that contradicts them.
- Run it in the background when it will take long.
- Keep `.env` out of the brief: the department-access hook blocks any call that mentions it.

## After the hand-off

- The subagent commits its own work, as [commit.md](commit.md) says. Read its whole diff, run the brief's checks yourself, and fix or send back what fails.
- Record in the handoff which parts the subagent did, so a later session knows where to look first.
