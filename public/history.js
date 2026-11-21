// Builds the History table from saved sessions.
const tbody = document.getElementById("history-body");
const emptyMsg = document.getElementById("history-empty");
const clearBtn = document.getElementById("clear-history");

function renderHistory() {
  tbody.innerHTML = "";
  const sessions = getSessions();
  emptyMsg.hidden = sessions.length > 0;
  clearBtn.hidden = sessions.length === 0;

  sessions.forEach((s) => {
    const row = document.createElement("tr");

    const date = document.createElement("td");
    date.textContent = new Date(s.date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });

    const topic = document.createElement("td");
    topic.textContent = s.topic.length > 60 ? s.topic.slice(0, 60) + "..." : s.topic;

    const subject = document.createElement("td");
    subject.textContent = SUBJECT_LABELS[s.subject];

    const view = document.createElement("td");
    const link = document.createElement("a");
    link.href = "results.html?id=" + s.id;
    link.textContent = "View";
    view.appendChild(link);

    row.append(date, topic, subject, view);
    tbody.appendChild(row);
  });
}

clearBtn.addEventListener("click", () => {
  if (confirm("Delete all saved sessions?")) {
    saveSessions([]);
    renderHistory();
  }
});

renderHistory();