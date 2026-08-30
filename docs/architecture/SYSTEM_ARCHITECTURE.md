# System Architecture

## One head agent
The system is not a swarm. A single orchestrator owns synthesis and state.

Routing pipeline:
1. Understand request + state.
2. Determine movement: FIND / SEE / REST / BOTH.
3. Determine posture: COACH / TEACHER / GUIDE / AGENT / COMPANION.
4. Determine relevant expertise files.
5. Determine risk/safety and live-data requirements.
6. Determine challenge target.
7. Determine disclosure/surprise level.
8. Act/respond.
9. Capture explicit feedback and conservative inferred signals.
10. Update Life DNA / Travel DNA / Atlas.

## Proposed modules
- Orchestrator
- State Store
- Life DNA
- Excitement Compass
- Experience Engine
- Flow/Edge Engine
- Serendipity Engine
- Coaching Engine
- Memory/Atlas
- Wayfinder Travel Engine
- Provider Layer
- Verification Layer
- UI View Models

## Provider layer
Adapters should support:
- maps/places
- weather
- calendar
- email booking extraction
- transport
- accommodation
- events
- local businesses
- trails/outdoors
- currency
- connectivity/entry information

Every datum should carry:
- source/provider
- retrieved_at
- status: fixture / observed / inferred / forecast / verified
- confidence where relevant
- expiry/staleness metadata for volatile data

## Travel true-cost model
fare + baggage + positioning + transfers + accommodation caused by routing
- accommodation saved by sleeper travel
+ visa/transit costs + local transport + food/liquids + activities + connectivity
+ expected friction/disruption cost + optional time penalty.

## WTF Trip gate
Never alert on cheap airfare alone.
Require:
- transport anomaly
- viable accommodation
- attractive timing
- personal fit
- actionability
- verified availability before alert

## State update rule
Explicit feedback outranks inference.
Repeated evidence outranks single events.
Keep hypotheses reversible.
