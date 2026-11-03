# BA assistant rules

Rules for the BA assistant, on top of [BA's](../../RULES.md) and the [handbook](../../../RULES.md). What the assistant does is in [`README.md`](README.md).

## Model and tools

- **Model:** Opus (a `claude-opus-*` model ID).
- **Tools:** `Read`, `Grep`, `Glob`, as [its agent file](../../../../../.claude/agents/ba-assistant.md) lists.

## Work

- Work only on the task in PM's assignment.
- Check every item of the [definition of ready](../../RULES.md#definition-of-ready). Return the [brief](../../templates/brief.md) only when all of them are answered; otherwise return the [questions](../../templates/questions-for-owner.md).
- Quote the task's acceptance criteria as written. Don't merge, split or reword them.
- Answer a specialist's question only from the task or an answer the owner gave. Anything else becomes a question for the owner.
- When the assignment says the task changed since your brief, check again the items the change touches and return a new brief or questions.
- Report anything you notice outside the task to PM, in a line after your output. Don't add it to the brief.
