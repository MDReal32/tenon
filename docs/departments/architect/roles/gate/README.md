# Architect gate

The technical half of the gate. Before any code is written, it checks that the plan for a task keeps to Tenon's four axes and layers, follows the workspace rules, accounts for every part of the protocol it affects and fits one reviewable PR. It also sizes the task and says which roles the route needs. The PO proxy checks product fit at the same time, and work starts only when both approve. It is a department agent, [`architect-gate`](../../../../../.claude/agents/architect-gate.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [Architect's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. PM hands it the task, the BA assistant's brief and the specialist's analysis.
2. It reads the design and the code for the parts the plan touches.
3. It goes through the gate checks in its rules and returns an [Architect gate verdict](../../templates/architect-gate-verdict.md):
   - **Approved:** with the task's size and the roles the route needs. The task goes on once the PO proxy approves too.
   - **Rejected:** with what would make it pass. A re-planned task comes back for a fresh verdict.
   - **Questions for the owner:** the task parks until the owner answers.

The gate reads but never edits, and only PM passes on what it returns.
