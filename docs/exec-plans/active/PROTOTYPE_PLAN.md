# Prototype Engineering Plan

## Current State
The repository is a documentation scaffold. It contains product, architecture, constitution, engine, state, and acceptance scenario notes. It has no runnable application stack, source code, package manifest, or automated tests yet.

## Available Context
Only repository files and pasted kickoff material were available in this build session. No hidden ChatGPT project history or historical conversation exports were accessible, so this prototype is based on the repository evidence and attached directive text.

## Chosen Stack
Use dependency-free Node.js with ES modules, the built-in HTTP server, static HTML/CSS/JS, and `node --test`.

Why:
- runs locally without package installation
- keeps the first domain slice inspectable
- makes failure paths visible
- avoids framework churn before the domain model proves itself

## First Vertical Slice
The first slice supports:

> I have two hours and don't know what to do.

Implemented flow:
input -> context normalization -> movement route -> posture route -> deterministic candidate generation -> recommendation response -> feedback capture -> conservative Life DNA evidence update.

## Invariants
- One head intelligence routes movement and posture; no committee simulation.
- REST is a valid recommendation.
- All recommendations are fixture-status unless verified by a provider.
- User feedback becomes evidence, not an identity label.
- Malformed feedback is rejected before state mutation.
- State updates are conservative and reversible.

## State Model
The prototype keeps an in-memory version of the existing example state:
- person preferences, constraints, current edges, excitement threads, domain skill estimates
- moment state
- trip state placeholder
- atlas with moments and evidence

Persistence is intentionally deferred until the mutation rules are tested.

## Test Strategy
- Unit tests cover routing, rest handling, invalid feedback, and conservative state update.
- Acceptance test covers the two-hour scenario shape from `tests/acceptance/SCENARIOS.md`.

## Failure Strategy
Errors return structured JSON with visible error codes. The server does not silently accept malformed feedback or invalid state.

## Intentionally Not Built Yet
- live place/weather/event/travel providers
- durable database persistence
- authentication
- LLM calls
- full Wayfinder travel search
- multi-user state
- production deployment
