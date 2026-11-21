// Shows the session whose id is in the URL (results.html?id=...).
const params = new URLSearchParams(window.location.search);
const session = getSessionById(params.get("id"));
const topicLine = document.getElementById("topic-line");
const container = document.getElementById("questions");

if (!session) {
  topicLine.textContent = "We couldn't find that session. Try starting a new one.";
} else {
  const shortTopic = session.topic.length > 80 ? session.topic.slice(0, 80) + "..." : session.topic;
  topicLine.textContent = `Topic: ${shortTopic} (${SUBJECT_LABELS[session.subject]})`;

  session.questions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${q.question}`;

    const answer = document.createElement("p");
    answer.textContent = q.answer;
    answer.hidden = true; // answers start hidden

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "btn btn-secondary";
    toggle.textContent = "Show answer";
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      answer.hidden = !answer.hidden;
      toggle.textContent = answer.hidden ? "Show answer" : "Hide answer";
      toggle.setAttribute("aria-expanded", String(!answer.hidden));
    });

    card.append(heading, toggle, answer);
    container.appendChild(card);
  });
}