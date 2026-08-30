# LIVED — Prototype

LIVED is one adaptive life-experience intelligence with two movements:

- Wayfinder: expand the world.
- Wayshower: deepen the world.

Core promise:

> More life from the life you have.

Core product objective:

> Cultivate a life rich in peaks and texture while increasing agency.

This prototype implements the first local vertical slice:

> I have two hours and don't know what to do.

It uses deterministic fixtures only. It does not call live providers and does not make live availability, weather, price, or venue claims.

## Run

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Test

```bash
npm test
```

## What Works

- movement routing: FIND / SEE / REST / BOTH
- posture routing: COACH / TEACHER / GUIDE / AGENT / COMPANION / NOTHING
- fixture-based opportunity candidates
- recommendation response for the two-hour scenario
- REST as a valid outcome
- feedback capture
- conservative excitement-thread update
- explicit evidence storage without identity assignment
- static Life Board prototype

## Architecture

Core logic lives in `src/domain/lived.js`. The UI and HTTP server call the domain layer but do not own routing, scoring, or state mutation rules.

The implementation intentionally separates:
- coaching posture from expertise
- Wayfinder from Wayshower while keeping one head agent
- observed data from inference/forecast
- game mechanics from manipulative engagement
- excitement from permanent identity
- research from what is revealed to the user

## Epistemic Status

This prototype is based on repository files and attached kickoff text available during implementation. No hidden conversation history was accessible during the build.
