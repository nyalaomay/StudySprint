// Shared helpers: save/load study sessions in the browser's localStorage.
// (M3/M4 will replace this with a real backend + database.)
const STORAGE_KEY = "studysprintSessions";

const SUBJECT_LABELS = {
  math: "Math",
  cs: "Computer Science",
  science: "Science",
  history: "History",
  other: "Other",
};

// Mock "AI": builds fake questions from templates. Real AI arrives in M3.
function generateMockQuestions(topic, subject, count) {
  const short = topic.length > 60 ? topic.slice(0, 60) + "..." : topic;
  const templates = [
    `In your own words, what is the main idea of "${short}"?`,
    `List three key terms related to "${short}" and define each.`,
    `Why is "${short}" important in ${SUBJECT_LABELS[subject]}?`,
    `Give a real-world example that illustrates "${short}".`,
    `What is a common misconception about "${short}"?`,
    `How would you explain "${short}" to a classmate?`,
    `Compare "${short}" with a related concept you've studied.`,
    `What question would an instructor likely ask about "${short}" on an exam?`,
    `Describe the steps or process involved in "${short}".`,
    `What are the limitations or exceptions to "${short}"?`,
  ];
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push({
      question: templates[i % templates.length],
      answer:
        "Sample answer (mock response). Real AI-generated explanations will appear here once the backend is connected.",
    });
  }
  return questions;
}

function getSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // First visit: seed a few sample sessions so History isn't empty.
      const seeded = [
        { id: "seed-1", date: new Date(2026, 9, 12).getTime(), topic: "Newton's Laws of Motion", subject: "science" },
        { id: "seed-2", date: new Date(2026, 9, 8).getTime(), topic: "Big-O Notation", subject: "cs" },
        { id: "seed-3", date: new Date(2026, 9, 1).getTime(), topic: "The Cold War", subject: "history" },
      ].map((s) => ({ ...s, questions: generateMockQuestions(s.topic, s.subject, 3) }));
      saveSessions(seeded);
      return seeded;
    }
    return JSON.parse(raw) || [];
  } catch (error) {
    return [];
  }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function addSession(session) {
  const sessions = getSessions();
  sessions.unshift(session); // newest first
  saveSessions(sessions);
}

function getSessionById(id) {
  return getSessions().find((s) => s.id === id) || null;
}