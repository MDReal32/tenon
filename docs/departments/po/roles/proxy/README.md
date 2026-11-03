# PO proxy

Stands in for the owner at the gate. Before any code is written, it checks that a task fits Tenon: that it serves the people Tenon is for, matches the design and what already exists, and can ship as one reviewable change. The Architect gate checks the technical side, and work starts only when both approve. It is a department agent, [`po-proxy`](../../../../../.claude/agents/po-proxy.md), started by PM. Its rules are in [`RULES.md`](RULES.md), on top of [PO's](../../RULES.md) and the [handbook](../../../RULES.md).

## How it works

1. PM hands it the task and the BA assistant's brief.
2. It reads the design sections and job notes for the parts the task touches.
3. It goes through the gate checks in its rules and returns a [gate verdict](../../templates/gate-verdict.md):
   - **Approved:** the task goes on once the Architect gate approves too.
   - **Rejected:** with what would make it pass. A re-planned task comes back for a fresh verdict.
   - **Questions for the owner:** the task parks until the owner answers.

The proxy reads but never edits, and only PM passes on what it returns.
