# StudySprint

A study aid web application that generates AI-powered practice questions and explanations from a student's notes or a chosen topic. Built for use in tutoring and Supplemental Instruction (SI) settings, where students or peer leaders need quick, targeted practice material without writing it from scratch.

## Status
This repository currently contains the M1 static frontend and the M2 interactive frontend for the COMP 322 Honors Contract project: HTML structure and CSS styling for all planned pages, with navigation between them, plus client-side form validation, event handling, and mock responses saved in the browser's localStorage. Backend routes, AI integration, and database persistence are not yet implemented and will be added in later milestones.

## Pages
- `index.html` — Home
- `submit.html` — New session form with client-side validation (notes/topic input, subject, question count)
- `results.html` — Displays the mock practice questions for a session, with show/hide answer buttons
- `history.html` — Lists saved sessions from localStorage, with a link to each session's results
- `about.html` — About the app and how it works

## Scripts
- `storage.js` — Shared helpers for saving and loading sessions in localStorage, plus the mock question generator
- `submit.js` — Form validation, live character counter, and mock submission
- `results.js` — Loads and displays a saved session's questions
- `history.js` — Builds the history table and handles clearing saved sessions

## Styles
- `styles.css` — Shared styling for all pages

## Planned AI Provider
Groq (free tier) — to be integrated server-side in M3.

## Tech Stack (planned, full project)
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js / Express REST API
- AI: Groq API (server-side only)
- Database: MySQL or MongoDB

## Running Locally
No build step or backend is required for this milestone. Clone the repo and serve the folder with a static file server, such as the Live Server extension in VS Code, then open `index.html`. Opening the file directly in a browser also works, but a local server is recommended because the pages share session data through localStorage and pass session IDs in the URL.
