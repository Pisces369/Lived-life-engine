const requestText = document.querySelector("#requestText");
const minutes = document.querySelector("#minutes");
const budget = document.querySelector("#budget");
const energy = document.querySelector("#energy");
const recommendButton = document.querySelector("#recommendButton");
const cards = document.querySelector("#cards");
const movement = document.querySelector("#movement");
const posture = document.querySelector("#posture");
const verification = document.querySelector("#verification");
const recommendationLead = document.querySelector("#recommendationLead");
const stateView = document.querySelector("#stateView");

recommendButton.addEventListener("click", () => loadRecommendations());

await fetch("/api/reset", { method: "POST" });
await loadRecommendations();
await loadState();

async function loadRecommendations() {
  const response = await fetch("/api/recommend", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: requestText.value,
      available_minutes: Number(minutes.value),
      budget_nok: Number(budget.value),
      energy: energy.value
    })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message ?? "Recommendation failed");

  movement.textContent = result.route.movement;
  posture.textContent = result.route.posture;
  verification.textContent = result.verification.status;
  recommendationLead.textContent = result.response.lead;
  cards.replaceChildren(...result.candidates.map(renderCard));
}

function renderCard(candidate, index) {
  const article = document.createElement("article");
  article.className = `card ${index === 0 ? "featured" : ""}`;
  article.innerHTML = `
    <div class="card-top">
      <p>${candidate.surface ?? candidate.movement}</p>
      <strong>${candidate.difficulty}</strong>
    </div>
    <h3>${candidate.title}</h3>
    <p>${candidate.summary}</p>
    <dl>
      <div><dt>Time</dt><dd>${candidate.time_minutes} min</dd></div>
      <div><dt>Cost</dt><dd>${candidate.cost_nok} NOK</dd></div>
      <div><dt>Energy</dt><dd>${candidate.energy}</dd></div>
    </dl>
    <details>
      <summary>Why this?</summary>
      <div class="reasons">${candidate.reason_codes.map((reason) => `<span>${formatReason(reason)}</span>`).join("")}</div>
    </details>
    <p class="next">${candidate.next_step}</p>
    <div class="feedback" aria-label="Feedback for ${candidate.title}">
      <button data-feedback="more_alive">More alive</button>
      <button data-feedback="same">Same</button>
      <button data-feedback="less_alive">Less alive</button>
    </div>
  `;

  article.querySelectorAll("[data-feedback]").forEach((button) => {
    button.addEventListener("click", async () => {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ candidate_id: candidate.id, feedback: button.dataset.feedback })
      });
      await loadState();
    });
  });

  return article;
}

async function loadState() {
  const response = await fetch("/api/state");
  const state = await response.json();
  const evidenceCount = state.atlas.evidence.length;
  const threads = state.person.excitement_threads.map((thread) => renderThread(thread, evidenceCount));

  const evidence = document.createElement("article");
  evidence.className = "thread-card quiet";
  evidence.innerHTML = `<span>Evidence captured</span><strong>${evidenceCount}</strong><p>User feedback changes confidence slowly. No identity label is assigned.</p>`;

  stateView.replaceChildren(...threads, evidence);
}

function renderThread(thread) {
  const article = document.createElement("article");
  article.className = "thread-card";
  const confidence = Math.round((thread.confidence ?? 0) * 100);
  article.innerHTML = `
    <span>${thread.state}</span>
    <strong>${thread.label}</strong>
    <p>${thread.evidence_ids.length} evidence point${thread.evidence_ids.length === 1 ? "" : "s"}. Confidence ${confidence}%.</p>
  `;
  return article;
}

function formatReason(reason) {
  return reason.replaceAll("_", " ");
}
