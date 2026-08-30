# MVP Execution Plan

## Slice 0 — Preserve and migrate
- Inspect existing Wayfinder prototype if present.
- Preserve travel logic/tests that remain useful.
- Move travel-specific behavior under Wayfinder context.
- Introduce LIVED root architecture.

## Slice 1 — Head agent + state
Implement:
- movement router
- posture router
- expertise loader
- Life DNA schema
- Trip State schema
- excitement thread schema
- current edges schema
- Atlas schema
- reason codes
- conservative update rules

Acceptance:
- same request can invoke different posture based on context
- no committee simulation
- explicit feedback updates state
- one experience does not become a permanent preference

## Slice 2 — Wayshower opportunity engine
Fixture-driven opportunity generator for:
- Right Here
- Your Edge
- Surprise Me
- Rest

Use time, energy, budget, weather fixture, interests, excitement state, challenge preference.

## Slice 3 — Coaching + Flow
Implement coaching constitution and adaptive challenge.
Tests:
- beginner and expert receive different challenge
- over-challenge causes difficulty reduction
- boredom/easy feedback permits increase
- rest is valid
- advice is not forced when coaching discovery is appropriate
- teaching is used when knowledge is actually missing

## Slice 4 — Excitement Compass
Implement:
- thread states
- anticipated vs experienced measures
- more/same/less alive feedback
- persistence evidence
- organic next-step generation
- convergence hypotheses
- no forced passion/career conversion

## Slice 5 — Life Game
Implement:
- quests
- serendipity deck
- firsts & crossings
- moments
- journeys
- collections
- no XP/streak/leaderboard mechanics
- hidden developmental arc

## Slice 6 — Wayfinder integration
Restore/extend:
- multimodal transport
- accommodation
- true trip cost
- Destination Pulse
- WTF gate
- Recon
- Mythos
- surprise protection
- verification status
Use fixtures/provider interfaces if live integrations unavailable.

## Slice 7 — Life Board
Responsive UI from `docs/architecture/FRONTEND.md`.
Must work on desktop and mobile.
Use fixtures/state.
Prioritize calm signal over density.

## Slice 8 — Stress tests
Run all scenarios in `tests/acceptance/SCENARIOS.md`.
Document failures, fixes, remaining limitations.

## Definition of done for prototype
- runnable locally
- deterministic unit tests pass
- acceptance scenario report exists
- no fake live-data claims
- Life Board usable
- Wayfinder not regressed
- Wayshower usable
- state learns conservatively
- README includes run/test instructions
