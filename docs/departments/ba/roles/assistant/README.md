# BA assistant

Helps the owner get a task ready to build. It reads the task the owner wrote, checks it against the definition of ready, and returns either a brief for the other departments or the questions the owner still needs to answer. It is a department agent, [`ba-assistant`](../../../../../.claude/agents/ba-assistant.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [BA's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. PM hands it the task text.
2. It reads the parts of Tenon the task touches, to understand how they are meant to work.
3. It goes through the [definition of ready](../../RULES.md#definition-of-ready), item by item.
4. It returns a [brief](../../templates/brief.md) if every item is answered, or [questions for the owner](../../templates/questions-for-owner.md) if not.
5. When the owning department, as specialist, has questions about the brief, PM brings them back. The assistant answers what the task answers and turns the rest into questions for the owner. This happens at most twice.

Bugs skip this step: QA reproduces a bug first instead.

When a task turns out too big for one reviewable PR, PM sends it back to the assistant to split. It returns smaller tasks along meaningful seams, each with the original acceptance criteria it covers, each quoted whole, and PM opens them as sub-issues.

The assistant reads but never edits, and only PM passes on what it returns.
