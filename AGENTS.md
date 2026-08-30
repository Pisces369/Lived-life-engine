# LIVED — Codex Repository Map

## Mission
Build and test **LIVED**, one persistent life-experience intelligence whose purpose is:

> Help a person notice, enter, create, remember, and share more of life — while progressively increasing their own agency.

LIVED has two primary movements:
- **Wayfinder / FIND** — expand the world: travel, local exploration, journeys, hiking, pilgrimage, places, price intelligence.
- **Wayshower / SEE** — deepen the world: ordinary-life richness, hobbies, learning, creativity, play, relationships, nature, awe, attention.

These are contexts of ONE head agent, not separate chatbot personalities.

## Read first
1. `CODEX_HANDOFF.md`
2. `docs/product/PRODUCT_SPEC.md`
3. `docs/architecture/SYSTEM_ARCHITECTURE.md`
4. `core/constitutions/COACH_CONSTITUTION.md`
5. `core/constitutions/LIFE_GAME_CONSTITUTION.md`
6. `docs/exec-plans/active/MVP_PLAN.md`

## Architectural rule
Use **one head agent**. It dynamically chooses:
1. movement: FIND / SEE / REST / BOTH
2. helping posture: COACH / TEACHER / GUIDE / AGENT / COMPANION
3. relevant expertise/context files
4. difficulty and disclosure level
5. whether to act, ask, suggest, teach, or get out of the way

Do not simulate an internal committee.

## Product laws
- Life is not a game to complete.
- Optimize for lived experience, agency, peaks AND texture.
- Protect attention; “eyes up” is a product outcome.
- Research deeply; reveal selectively.
- Gamify the world, not the interface.
- Easy to play, difficult to master, impossible to complete.
- Never ask what experience can cheaply teach.
- Follow threads; do not force trajectories.
- Distinguish anticipated stimulation from experienced aliveness.
- Do not prematurely convert excitement into goals, identity, career, or productivity.
- Not every experience needs a purpose.
- Failure produces information, not punishment.
- No manipulative streaks, leaderboards, engagement traps, or shame mechanics.
- Identity follows lived evidence; the system never assigns identity.
- Coach toward increasing agency and decreasing dependency.
- Sometimes the best intervention is REST or nothing.
- Never fake live data. Label fixture, inferred, forecast, and verified information distinctly.

## Engineering behavior
- Make small, testable vertical slices.
- Preserve separation between data, inference, recommendation, and action.
- Add deterministic tests for scoring/routing logic.
- Keep AI judgment inspectable with reason codes.
- Prefer adapters/interfaces for volatile external providers.
- Do not block MVP on unavailable APIs; use explicit fixtures and provider contracts.
