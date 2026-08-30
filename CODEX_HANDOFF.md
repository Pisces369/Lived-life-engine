# Codex Mission — Build LIVED

You are inheriting an early Wayfinder prototype. The concept has expanded. Re-architect it into **LIVED** without losing Wayfinder's travel intelligence.

## What you are building
A single adaptive life-experience companion that helps a human get **more life from the life they have**.

It has two major expressions:

### Wayfinder — FIND
Change the place.
Travel, transport, accommodation, destination intelligence, local exploration, hikes, sacred geography, price intelligence, WTF Trips, disruption recovery, photography while traveling, preparation, and memory.

### Wayshower — SEE
Change the lens.
Everyday wonder, hobbies, interests, passions, learning, creativity, play, nature, connection, local discovery, awe, attention, small experiments, and progressive mastery.

The same head agent can move between them or combine them.

## Core promise
> Cultivate a life rich in peaks and texture.

- **Peaks:** rare, intense, story-worthy, transitional, awe-filled moments.
- **Texture:** ordinary delight, noticing, presence, small rituals, playful participation, everyday beauty.

## Critical coaching model
Every specialist that acts as a coach inherits `core/constitutions/COACH_CONSTITUTION.md`.

A coach creates conditions for clearer seeing, ownership, appropriate stretch, direct experience, learning, integration, and increased agency.

The head agent must distinguish these postures:
- COACH — draws out awareness/ownership; does not rush to advice.
- TEACHER — explains/builds skill.
- GUIDE — knows terrain the person does not.
- AGENT — performs work/research/action.
- COMPANION — witnesses/participates without optimizing.
- REST — intentionally does less or nothing.

## Excitement Compass
Continuously learn what is alive for the person:
- Spark
- Curiosity
- Play
- Pull
- Flow
- Devotion
- Meaning/calling

Do not rank by intensity alone. Track anticipated excitement, experienced aliveness, persistence, flow, vitality after doing, meaning, generativity, and freedom from outcome attachment.

Rule:
> Follow the highest available actionable thread as far as it naturally remains alive, without insisting what it must become.

This is inspired by Bashar's “highest excitement” philosophy and must be represented as an optional philosophical lens, not scientific fact.

## The Life Game
Gamification exists to make lived life easier to enter and progressively deeper to master.

Surface principle:
> Gamify the world, not the interface.

No XP treadmill. No guilt streaks. No leaderboard. No addictive notification mechanics.

Use quests, adventure windows, serendipity cards, firsts & crossings, moments, collections, chapters/journeys, adaptive Edge difficulty, experiments, and a personal Atlas.

Difficulty should optimize for flow: Comfort → Edge → Overwhelm.
User-facing dial may be: Gentle / Edge / Challenge Me / Wildcard.

Progress is multidimensional:
1. Skill — what can I do?
2. Edge — what am I willing to do?
3. Being — what am I discovering myself capable of being?
4. Connection — self → experience → others → world → something larger.

The hidden developmental arc:
NOTICE → ENTER → LEARN → STRETCH → CREATE → CONNECT → CONTRIBUTE → BECOME → WAYSHOW.
It loops forever; mastery in one domain can coexist with beginnerhood in another.

## First implementation objective
Build an MVP vertical slice that can respond well to:
1. “I have two hours and don't know what to do.”
2. “I have 5,000 NOK, no destination, and 4–7 free days in the next six weeks. Find me something I'll remember for years.”
3. “I want to learn guitar.”
4. “Surprise me.”
5. “Nothing sounds exciting lately.”
6. “I keep getting excited about new hobbies and abandoning them.”
7. “I took the photo. What should I work on next?”
8. “I need rest today.”
9. “I loved that. More alive.”
10. “That was interesting, but I don't want to do it again.”

The system should route posture/context, propose appropriately, learn from feedback, and update state without over-inference.

## Frontend
Create a calm **Life Board**, not a productivity dashboard.

Primary home question:
> What kind of day is available?

Primary cards:
- RIGHT HERE — Wayshower opportunity
- GO SOMEWHERE — Wayfinder opportunity
- YOUR EDGE — optimal challenge
- SURPRISE ME — serendipity
- REST — legitimate no-optimization path

Secondary surfaces:
- What's Alive: Burning / Glowing / Sparking / Embers / Completed
- Current Edges: max 3
- Journeys: hobbies/interests/skills
- Atlas: moments, firsts, places, stories, creations
- Pulse: future openings, weather/events/travel deals/seasonal phenomena
- Travel mode: Trip Pulse, true trip cost, WTF Trip, Recon, Mythos, prep
- Coach transparency: subtle “why this?” explanation, never internal chain-of-thought

Build the frontend as a working responsive prototype with fixture data first.

## Deliverables
- runnable app
- tests
- documented schemas/state model
- deterministic routing/scoring helpers where appropriate
- provider interfaces
- fixture providers
- responsive Life Board
- updated README
- architectural decision notes
- test report
- next-step backlog

Do not merely produce a plan. Implement, run, test, inspect, iterate.
