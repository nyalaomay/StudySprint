# StudySprint

A study aid web application that generates AI-powered practice questions and explanations from a student's notes or a chosen topic. Built for use in tutoring and Supplemental Instruction (SI) settings, where students or peer leaders need quick, targeted practice material without writing it from scratch.

## Status
The static frontend (M1), interactive frontend (M2), and Express backend with server-side AI integration (M3) are complete. Sessions are currently saved in the browser's localStorage. Database persistence and further error-handling polish are planned for M4.

## AI Integration
The browser sends the user's notes, subject, and question count to `POST /api/generate`. The Express server validates the request, calls the Groq API (model `openai/gpt-oss-120b`) using an API key stored in `.env`, and returns the generated questions as JSON. The key is only ever used on the server and never appears in client-side code. Rate limits, provider outages, timeouts, and malformed AI responses return clear error messages that are displayed to the user.

## Setup and Running
1. Install Node.js 18 or higher.
2. Clone the repo and run `npm install`.
3. Copy `.env.example` to `.env` (PowerShell: `Copy-Item .env.example .env`) and set `GROQ_API_KEY` to your key (free key at https://console.groq.com/keys).
4. Run `npm start`.
5. Open http://localhost:3000.

## Project Structure
- `server.js` — Express server: serves the frontend, validates requests, and calls the Groq API
- `package.json` — Dependencies (`express`, `dotenv`) and the `npm start` script
- `.env.example` — Template for required environment variables (the real `.env` is git-ignored)
- `public/` — Frontend files served to the browser:
  - `index.html` — Home
  - `submit.html` — New session form with client-side validation
  - `results.html` — Displays a session's generated questions, with show/hide answer buttons
  - `history.html` — Lists saved sessions, with a link to each session's results
  - `about.html` — About the app and how it works
  - `styles.css` — Shared styling for all pages
  - `storage.js` — Helpers for saving and loading sessions in localStorage
  - `submit.js` — Form validation, live character counter, and the API call
  - `results.js` — Loads and displays a saved session's questions
  - `history.js` — Builds the history table and handles clearing saved sessions

## API
`POST /api/generate`
- Request body: `{ "topic": string, "subject": "math" | "cs" | "science" | "history" | "other", "count": 1-10 }`
- Success: `200` with `{ "questions": [{ "question": string, "answer": string }] }`
- Errors: `400` invalid input, `429` AI rate limit, `502` AI service failure, `504` AI timeout, each with `{ "error": string }`

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js / Express REST API
- AI: Groq API (server-side only)
- Database: MySQL or MongoDB (planned for M4)