import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyFeedback, cloneDefaultState, recommend, validateFeedback } from "../../src/domain/lived.js";

describe("LIVED domain prototype", () => {
  it("routes the two-hour scenario through one head intelligence", () => {
    const result = recommend({ text: "I have two hours and don't know what to do.", available_minutes: 120, budget_nok: 200, energy: "medium" });

    assert.equal(result.route.movement, "BOTH");
    assert.equal(result.route.posture, "COACH");
    assert.ok(result.route.expertise.includes("local_discovery"));
    assert.ok(result.candidates.length >= 3);
    assert.ok(result.candidates.some((candidate) => candidate.movement === "REST"));
    assert.equal(result.verification.status, "fixture");
  });

  it("keeps rest as a valid outcome when energy is depleted", () => {
    const result = recommend({ text: "I need rest today.", available_minutes: 120, budget_nok: 200, energy: "depleted" });

    assert.equal(result.route.movement, "REST");
    assert.equal(result.route.posture, "NOTHING");
    assert.equal(result.candidates[0].movement, "REST");
  });

  it("rejects malformed feedback before state mutation", () => {
    assert.throws(() => validateFeedback({ candidate_id: "x", feedback: "became_adventurous" }), /Feedback must be one of/);
  });

  it("stores feedback as evidence without assigning identity", () => {
    const state = cloneDefaultState();
    const result = applyFeedback(state, { candidate_id: "surprise-color-thread", feedback: "more_alive" });

    assert.equal(result.update.durable_identity_assigned, false);
    assert.equal(result.state.atlas.evidence.length, 1);
    assert.ok(result.state.person.excitement_threads.every((thread) => !thread.identity));
  });
});
