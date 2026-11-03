---
type: handoff
job:
tasks: []
role:
model:
date: "{{date:YYYY-MM-DD}}"
status:
branch:
pr:
---

# What this job did, in a few words

Open with a paragraph on what this job was asked to do and why, written so someone who has never seen the work can follow it. Link the task it serves, by its tracker URL where it has one, and the handoff it continues from where the sentence mentions them, for example `continuing [the gate's verdict](2026-10-31-architect-gate-handshake.md)`.

## What I did and how

Tell what changed and how you went about it, in paragraphs: the approach, the files, crates and packages it touched, protocol or schema changes, and anything non-obvious about how the pieces fit. Link the design sections and pages you touched, such as `[generation](../../../03-engine/01-generation.md)`.

## Why this way

Explain the decisions you made and the alternatives you considered, and why each alternative lost. This is the part a later session needs most, so it can build on your choices instead of reopening them.

## Checks

Say which checks you ran (lint, typecheck, tests, build, a browser check) and what they showed. If something was not run, say so and why.

## Where it stands

Say whether the job is done, partial or blocked, what is committed and what is not, and every open question with the person it waits on.

## Next

Describe the exact next step for whoever continues, precise enough that they can start without asking.
