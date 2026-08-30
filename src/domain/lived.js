export const MOVEMENTS = Object.freeze(["FIND", "SEE", "REST", "BOTH"]);
export const POSTURES = Object.freeze(["COACH", "TEACHER", "GUIDE", "AGENT", "COMPANION", "NOTHING"]);
export const FEEDBACK = Object.freeze(["more_alive", "same", "less_alive", "loved_it", "nice", "meh", "uncomfortable_interesting", "never_again"]);

const DEFAULT_STATE = Object.freeze({
  person: {
    preferences: [],
    constraints: [],
    current_edges: [
      {
        id: "edge-local-novelty",
        domain: "local_discovery",
        description: "Choose a small unfamiliar route or place nearby",
        challenge: "edge",
        evidence_ids: []
      }
    ],
    excitement_threads: [
      {
        id: "thread-photography",
        label: "noticing and photography",
        state: "Sparking",
        evidence_ids: [],
        confidence: 0.35
      },
      {
        id: "thread-walks",
        label: "wandering walks",
        state: "Glowing",
        evidence_ids: [],
        confidence: 0.45
      }
    ],
    domain_skill_estimates: {
      local_discovery: "beginner",
      photography: "beginner"
    },
    challenge_preference: "edge"
  },
  moment_state: {
    available_minutes: null,
    energy: null,
    budget: null,
    location: null,
    weather: null
  },
  trip_state: null,
  atlas: {
    moments: [],
    firsts_crossings: [],
    collections: [],
    places: [],
    creations: [],
    evidence: []
  }
});

const CANDIDATES = Object.freeze([
  {
    id: "right-here-threshold-walk",
    surface: "RIGHT HERE",
    title: "Threshold walk",
    movement: "SEE",
    posture: "GUIDE",
    expertise: ["local_discovery", "attention"],
    time_minutes: 45,
    cost_nok: 0,
    energy: "low",
    difficulty: "Gentle",
    surprise_level: "low",
    summary: "Walk for 45 minutes and notice every doorway, bridge, gate, and transition point.",
    next_step: "Leave with no headphones. Turn back when you find the third threshold that makes you pause.",
    reason_codes: ["changes_lens_not_place", "low_friction", "attention_returned_to_world"],
    scores: { fit: 7, aliveness: 6, novelty: 4, attention_cost: 1, friction: 1, rest: 2 }
  },
  {
    id: "edge-one-new-place",
    surface: "YOUR EDGE",
    title: "One unfamiliar table",
    movement: "BOTH",
    posture: "COACH",
    expertise: ["local_discovery", "courage"],
    time_minutes: 90,
    cost_nok: 120,
    energy: "medium",
    difficulty: "Edge",
    surprise_level: "medium",
    summary: "Go to a cafe, library, hotel lobby, or public place you have not used before and sit there for one honest hour.",
    next_step: "Pick the nearest unfamiliar place that is open. Bring a notebook and write only what the place makes easier to think.",
    reason_codes: ["small_novelty", "courage_edge", "real_world_experiment"],
    scores: { fit: 7, aliveness: 7, novelty: 7, attention_cost: 2, friction: 3, rest: 1 }
  },
  {
    id: "surprise-color-thread",
    surface: "SURPRISE ME",
    title: "Follow one color",
    movement: "SEE",
    posture: "COMPANION",
    expertise: ["play", "photography"],
    time_minutes: 60,
    cost_nok: 0,
    energy: "low",
    difficulty: "Gentle",
    surprise_level: "protected",
    summary: "Choose a color and let it lead you through the neighborhood. Do not decide the route in advance.",
    next_step: "Pick the first color your eye lands on after leaving the building. Follow five appearances of it.",
    reason_codes: ["serendipity", "purposeless_play", "surprise_preserved"],
    scores: { fit: 6, aliveness: 7, novelty: 6, attention_cost: 1, friction: 1, rest: 2 }
  },
  {
    id: "rest-soft-reset",
    surface: "REST",
    title: "Soft reset",
    movement: "REST",
    posture: "NOTHING",
    expertise: ["recovery"],
    time_minutes: 30,
    cost_nok: 0,
    energy: "depleted",
    difficulty: "Gentle",
    surprise_level: "none",
    summary: "Eat, hydrate, lie down, and let the next hour stay unoptimized.",
    next_step: "Put the phone away for 30 minutes. Reopen LIVED only if something naturally returns.",
    reason_codes: ["rest_is_valid", "protect_attention", "least_controlling_posture"],
    scores: { fit: 7, aliveness: 4, novelty: 1, attention_cost: 0, friction: 0, rest: 9 }
  }
]);

export function cloneDefaultState() {
  return structuredClone(DEFAULT_STATE);
}

export function normalizeInput(input) {
  const text = String(input?.text ?? "").trim();
  const available = Number(input?.available_minutes ?? input?.availableMinutes ?? NaN);
  const budget = Number(input?.budget_nok ?? input?.budgetNok ?? NaN);
  const energy = String(input?.energy ?? "").toLowerCase();

  return {
    text,
    available_minutes: Number.isFinite(available) ? available : inferMinutes(text),
    budget_nok: Number.isFinite(budget) ? budget : inferBudget(text),
    energy: ["depleted", "low", "medium", "high"].includes(energy) ? energy : inferEnergy(text)
  };
}

export function routeMovement(input) {
  const text = input.text.toLowerCase();
  if (text.includes("rest") || text.includes("tired") || text.includes("exhausted") || input.energy === "depleted") return "REST";
  if (text.includes("trip") || text.includes("flight") || text.includes("go somewhere") || text.includes("destination")) return "FIND";
  if (text.includes("two hours") || text.includes("2 hours") || text.includes("don't know what to do")) return "BOTH";
  return "SEE";
}

export function routePosture(input, movement) {
  if (movement === "REST") return "NOTHING";
  if (input.text.toLowerCase().includes("book") || input.text.toLowerCase().includes("research")) return "AGENT";
  if (input.text.toLowerCase().includes("learn")) return "TEACHER";
  if (movement === "FIND") return "GUIDE";
  if (input.text.toLowerCase().includes("don't know") || input.text.toLowerCase().includes("not sure")) return "COACH";
  return "COMPANION";
}

export function recommend(inputLike, stateLike = cloneDefaultState()) {
  const input = normalizeInput(inputLike);
  const state = validateState(stateLike);
  const movement = routeMovement(input);
  const posture = routePosture(input, movement);
  const candidates = selectCandidates(input, state, movement);

  return {
    request: input,
    route: {
      movement,
      posture,
      expertise: [...new Set(candidates.flatMap((candidate) => candidate.expertise))],
      disclosure: candidates.some((candidate) => candidate.surprise_level === "protected") ? "protect_surprise" : "explain_lightly"
    },
    verification: {
      status: "fixture",
      retrieved_at: null,
      note: "Prototype uses deterministic local fixtures only. No live venue, weather, price, or opening-hour claims are made."
    },
    candidates,
    response: renderRecommendation(input, movement, posture, candidates)
  };
}

export function applyFeedback(stateLike, feedbackLike) {
  const state = validateState(stateLike);
  const feedback = validateFeedback(feedbackLike);
  const evidence = {
    id: `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: "experience_feedback",
    candidate_id: feedback.candidate_id,
    feedback: feedback.feedback,
    observation: feedback.note ?? "",
    created_at: new Date().toISOString(),
    source: "user_explicit"
  };

  const next = structuredClone(state);
  next.atlas.evidence = Array.isArray(next.atlas.evidence) ? next.atlas.evidence : [];
  next.atlas.evidence.push(evidence);

  const thread = next.person.excitement_threads.find((item) => feedback.candidate_id?.includes("color") && item.id === "thread-photography")
    ?? next.person.excitement_threads.find((item) => item.id === "thread-walks");

  if (thread) {
    thread.evidence_ids = Array.isArray(thread.evidence_ids) ? thread.evidence_ids : [];
    thread.evidence_ids.push(evidence.id);
    if (feedback.feedback === "more_alive" || feedback.feedback === "loved_it") {
      thread.confidence = clamp((thread.confidence ?? 0.2) + 0.08, 0, 0.9);
      thread.state = thread.confidence > 0.6 ? "Glowing" : thread.state;
    }
    if (feedback.feedback === "less_alive" || feedback.feedback === "never_again") {
      thread.confidence = clamp((thread.confidence ?? 0.2) - 0.08, 0, 0.9);
      if (feedback.feedback === "never_again") thread.state = "Ember";
    }
  }

  return {
    state: next,
    evidence,
    update: {
      durable_identity_assigned: false,
      note: "Feedback was stored as explicit evidence. Thread confidence changed conservatively; no identity label was assigned."
    }
  };
}

export function validateFeedback(feedbackLike) {
  const candidate_id = String(feedbackLike?.candidate_id ?? feedbackLike?.candidateId ?? "").trim();
  const feedback = String(feedbackLike?.feedback ?? "").trim();
  if (!candidate_id) throw new LivedError("INVALID_FEEDBACK", "Feedback must include candidate_id.");
  if (!FEEDBACK.includes(feedback)) throw new LivedError("INVALID_FEEDBACK", `Feedback must be one of: ${FEEDBACK.join(", ")}.`);
  return {
    candidate_id,
    feedback,
    note: typeof feedbackLike?.note === "string" ? feedbackLike.note.trim() : ""
  };
}

export function validateState(stateLike) {
  const state = structuredClone(stateLike ?? cloneDefaultState());
  if (!state.person || !Array.isArray(state.person.excitement_threads)) {
    throw new LivedError("INVALID_STATE", "State must include person.excitement_threads.");
  }
  if (!state.atlas || !Array.isArray(state.atlas.moments)) {
    throw new LivedError("INVALID_STATE", "State must include atlas.moments.");
  }
  state.atlas.evidence = Array.isArray(state.atlas.evidence) ? state.atlas.evidence : [];
  return state;
}

function selectCandidates(input, state, movement) {
  const minutes = input.available_minutes ?? 120;
  const budget = input.budget_nok ?? 200;
  const energy = input.energy;
  const allowed = CANDIDATES.filter((candidate) => {
    if (candidate.time_minutes > minutes) return false;
    if (candidate.cost_nok > budget) return false;
    if (energy === "depleted") return candidate.movement === "REST" || candidate.energy === "low";
    if (movement === "REST") return candidate.movement === "REST";
    return movement === "BOTH" || candidate.movement === movement || candidate.movement === "BOTH";
  });

  const scored = allowed.map((candidate) => ({
    ...candidate,
    score: scoreCandidate(candidate, state, input, movement)
  })).sort((a, b) => b.score - a.score);

  if (movement === "REST" || energy === "depleted") return scored.slice(0, 3);

  const rest = scored.find((candidate) => candidate.movement === "REST")
    ?? CANDIDATES.find((candidate) => candidate.movement === "REST");
  const active = scored.filter((candidate) => candidate.movement !== "REST").slice(0, 3);

  if (rest && !active.some((candidate) => candidate.id === rest.id)) {
    active.push({ ...rest, score: Math.min(rest.score ?? 6.5, 6.5) });
  }

  return active;
}

function scoreCandidate(candidate, state, input, movement) {
  const base = candidate.scores.fit + candidate.scores.aliveness + candidate.scores.novelty + candidate.scores.rest;
  const cost = candidate.scores.attention_cost + candidate.scores.friction;
  const energyPenalty = input.energy === "low" && candidate.energy === "medium" ? 2 : 0;
  const restPenalty = candidate.movement === "REST" && movement !== "REST" && input.energy !== "depleted" ? 10 : 0;
  const threadBonus = state.person.excitement_threads.some((thread) => candidate.summary.toLowerCase().includes("walk") && thread.id === "thread-walks") ? 1 : 0;
  return Number((base - cost - energyPenalty - restPenalty + threadBonus).toFixed(2));
}

function renderRecommendation(input, movement, posture, candidates) {
  const lead = movement === "REST"
    ? "Rest is a legitimate answer today. I would keep this very light."
    : `For ${input.available_minutes ?? 120} minutes, I would offer a small menu rather than one overconfident answer.`;
  return {
    lead,
    posture_sentence: `Posture: ${posture}. Movement: ${movement}.`,
    options: candidates.map((candidate) => `${candidate.title}: ${candidate.summary}`),
    feedback_prompt: "Afterward: more alive, same, or less alive?"
  };
}

function inferMinutes(text) {
  const lower = text.toLowerCase();
  if (lower.includes("two hours") || lower.includes("2 hours")) return 120;
  const match = lower.match(/(\d+)\s*(minutes|min|hours|hour)/);
  if (!match) return null;
  const value = Number(match[1]);
  return match[2].startsWith("hour") ? value * 60 : value;
}

function inferBudget(text) {
  const lower = text.toLowerCase();
  const match = lower.match(/(\d+)\s*(nok|kr|kroner)/);
  return match ? Number(match[1]) : null;
}

function inferEnergy(text) {
  const lower = text.toLowerCase();
  if (lower.includes("exhausted") || lower.includes("depleted")) return "depleted";
  if (lower.includes("tired") || lower.includes("low energy")) return "low";
  return "medium";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export class LivedError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "LivedError";
    this.code = code;
  }
}
