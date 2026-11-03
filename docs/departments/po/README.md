# PO

The product owner department stands in for the owner at the gate. Before any code is written, it checks that a task fits Tenon: its design, its roadmap and what already exists. The Architect gate checks the technical side at the same time, and work starts only when both approve.

How it fits with the other departments is in the [overview](../README.md). Its rules are in [`RULES.md`](RULES.md), on top of the [handbook](../RULES.md).

## Roles

| Role                           | Model | Does                                                              |
| ------------------------------ | ----- | ----------------------------------------------------------------- |
| [proxy](roles/proxy/README.md) | Opus  | The product half of the gate: approves, rejects or asks the owner |

## What it gets and gives

- **In:** the task and the BA assistant's brief, from PM's assignment.
- **Out:** a [gate verdict](templates/gate-verdict.md): approved, rejected with what would make it pass, or questions for the owner that park the task.

The proxy decides fit only. Which tasks come first, and whether finished work is accepted, stay with the owner.

## Files

- [`po-knowledge.md`](po-knowledge.md): facts about Tenon and lessons from earlier gates.
- [`templates/`](templates): the gate verdict.
- [`roles/proxy/`](roles/proxy/README.md): how the proxy works.
