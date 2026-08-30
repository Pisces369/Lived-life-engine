import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { recommend } from "../../src/domain/lived.js";

describe("Acceptance: I have two hours and don't know what to do", () => {
  it("returns a compact opportunity menu with route, posture, difficulty, surprise, and why", () => {
    const result = recommend({
      text: "I have two hours and don't know what to do.",
      available_minutes: 120,
      budget_nok: 200,
      energy: "medium"
    });

    assert.equal(result.route.movement, "BOTH");
    assert.equal(result.route.posture, "COACH");
    assert.ok(result.route.expertise.length > 0);
    assert.ok(result.candidates.length >= 3);

    for (const candidate of result.candidates) {
      assert.ok(candidate.title);
      assert.ok(candidate.summary);
      assert.ok(candidate.next_step);
      assert.ok(candidate.difficulty);
      assert.ok(candidate.surprise_level);
      assert.ok(candidate.reason_codes.length > 0);
      assert.ok(candidate.time_minutes <= 120);
      assert.ok(candidate.cost_nok <= 200);
    }

    assert.ok(result.candidates.some((candidate) => candidate.title.includes("Threshold") || candidate.title.includes("color")));
    assert.ok(result.candidates.some((candidate) => candidate.movement === "REST"));
    assert.match(result.response.feedback_prompt, /more alive, same, or less alive/i);
  });
});
