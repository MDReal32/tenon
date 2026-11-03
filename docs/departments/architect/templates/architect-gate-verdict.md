# Architect gate verdict

What the Architect gate returns from the gate. PM puts the whole verdict in the PR description, takes the route from it, and passes the first line to the owner.

```md
🤖 Architect gate: <Approved | Rejected | Questions for the owner> for #<issue number> <task title>

**Checked:**

- **Four axes:** <yes / no, naming any axis the plan lets leak>
- **Layers and boundaries:** <yes / no, naming the crates and packages it touches and how they talk>
- **Design:** <yes / no, naming the design section it follows, changes or leaves open>
- **Contract impact:** <none, or each message, schema or field it changes, the version move, and every SDK, adapter and test affected>
- **Rules:** <yes / no, naming the rule the plan follows or breaks>
- **One reviewable PR:** <yes / no; if no, the technical slices you'd suggest>

**Size:** <S | M | L | XL>, because <one sentence>

**Route needs, if approved:**

- **Programming:** <the roles for each part touched: engine, sdk, extension, dev>
- **Extra reviewers:** <Cyber security, DevOps, or none, each with the reason>

**To pass, if rejected:** <what would change the verdict>

**Questions for the owner, if any:**

1. <question>
```
