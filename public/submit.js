// Handles validation and submission for the New Session form.
// M3: the form now calls the Express backend (POST /api/generate).
const form = document.getElementById("session-form");
const topicInput = document.getElementById("topic");
const subjectInput = document.getElementById("subject");
const countInput = document.getElementById("count");
const counter = document.getElementById("topic-counter");
const statusMsg = document.getElementById("form-status");
const submitBtn = document.getElementById("generate-btn");

const MIN_LENGTH = 10;
const MAX_LENGTH = 5000;

// Show (or clear) an error message under a field.
function setError(input, message) {
  document.getElementById(input.id + "-error").textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function validateTopic() {
  const value = topicInput.value.trim();
  if (value === "") {
    setError(topicInput, "Please enter your notes or a topic.");
    return false;
  }
  if (value.length < MIN_LENGTH) {
    setError(topicInput, `Please enter at least ${MIN_LENGTH} characters.`);
    return false;
  }
  if (value.length > MAX_LENGTH) {
    setError(topicInput, `Please keep it under ${MAX_LENGTH} characters.`);
    return false;
  }
  setError(topicInput, "");
  return true;
}

function validateSubject() {
  if (subjectInput.value === "") {
    setError(subjectInput, "Please select a subject.");
    return false;
  }
  setError(subjectInput, "");
  return true;
}

function validateCount() {
  const n = Number(countInput.value);
  if (!Number.isInteger(n) || n < 1 || n > 10) {
    setError(countInput, "Enter a whole number from 1 to 10.");
    return false;
  }
  setError(countInput, "");
  return true;
}

// Ask the backend for questions. Throws an Error with a user-friendly message.
async function requestQuestions(topic, subject, count) {
  let response;
  try {
    response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, subject, count }),
    });
  } catch (networkError) {
    // The server itself couldn't be reached.
    throw new Error("Can't reach the StudySprint server. Make sure it is running and try again.");
  }

  let data = {};
  try {
    data = await response.json();
  } catch (parseError) {
    // Non-JSON response; fall through to the generic message below.
  }

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data.questions;
}

// Live character counter; re-validate while typing once an error is showing.
topicInput.addEventListener("input", () => {
  counter.textContent = `${topicInput.value.length} / ${MAX_LENGTH}`;
  if (topicInput.classList.contains("invalid")) validateTopic();
});

// Validate fields when the user leaves them.
topicInput.addEventListener("blur", validateTopic);
subjectInput.addEventListener("change", validateSubject);
countInput.addEventListener("blur", validateCount);

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop the page from reloading / posting

  // Run all three checks (array so none are skipped).
  const allValid = [validateTopic(), validateSubject(), validateCount()].every(Boolean);
  if (!allValid) {
    form.querySelector(".invalid").focus(); // jump to first problem
    return;
  }

  const topic = topicInput.value.trim();
  const subject = subjectInput.value;
  const count = Number(countInput.value);

  submitBtn.disabled = true;
  statusMsg.classList.remove("error");
  statusMsg.textContent = "Generating your practice questions...";

  try {
    const questions = await requestQuestions(topic, subject, count);
    const session = {
      id: String(Date.now()),
      date: Date.now(),
      topic,
      subject,
      questions,
    };
    addSession(session); // saved in localStorage until M4 adds the database
    window.location.href = "results.html?id=" + session.id;
  } catch (error) {
    // Graceful failure: show the message and let the user try again.
    statusMsg.classList.add("error");
    statusMsg.textContent = error.message;
    submitBtn.disabled = false;
  }
});