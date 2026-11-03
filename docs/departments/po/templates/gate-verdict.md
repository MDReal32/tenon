# Gate verdict

What the PO proxy returns from the gate. PM puts the whole verdict in the PR description, and passes the first line with any questions to the owner.

```md
🤖 PO proxy: <Approved | Rejected | Questions for the owner> for <task link or short name> <task title>

**Checked:**

- **Fits the design:** <yes / no, and why, naming the design section>
- **Consistent with what exists:** <yes / no, naming the part or term it matches or clashes with>
- **Outcome-based criteria:** <yes / no>
- **One reviewable change:** <yes / no; if no, the slices you'd suggest>
- **Owner decisions:** <none needed, or the decision the task still needs>

**To pass, if rejected:** <what would change the verdict>

**Questions for the owner, if any:**

1. <question>
```
