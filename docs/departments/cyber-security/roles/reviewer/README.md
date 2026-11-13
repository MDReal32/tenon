# Cyber security reviewer

Reviews a change the Architect gate named Cyber security for, at the owner review, or a rule-change PR that changes the access hook: that extensions get only the capabilities they declare and the host enforces them, that WASM stays sandboxed, that `exec` runs only allow-listed binaries in plain sight, that nothing writes outside the generated project, that signatures and checksums are checked where the design asks, and that the department pipeline's access hook keeps its limits. It is a department agent, [`cyber-security-reviewer`](../../../../../.claude/agents/cyber-security-reviewer.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [Cyber security's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. PM hands it the task, the brief, the gate verdicts and the diff with its commits, when the gate named Cyber security, or the task and the diff of a rule change to the access hook.
2. It reads the changed files on the task branch, and the code around them where an extension's or a user's input reaches them.
3. It goes through the trust boundary in its department's rules and returns a [Cyber security review](../../templates/cyber-security-review.md):
   - **Approved:** the task goes on to the next review its route names.
   - **Changes requested:** each finding with what would make it pass. PM sends each one to the role that owns it, and counts the round toward the two-rejection limit.
   - **Questions for the owner:** a change that would settle an open item, such as the capability model, parks the task until the owner answers.

The reviewer reads but never edits, and only PM passes on what it returns.
