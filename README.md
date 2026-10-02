# StudySprint

A study aid web application that generates AI-powered practice questions and explanations from a student's notes or a chosen topic. Built for use in tutoring and Supplemental Instruction (SI) settings, where students or peer leaders need quick, targeted practice material without writing it from scratch.

## Status
This repository currently contains the M1 static frontend milestone for the COMP 322 Honors Contract project — HTML structure and CSS styling for all planned pages, with navigation between them. JavaScript functionality, backend routes, AI integration, and database persistence are not yet implemented and will be added in later milestones.

## Pages
- `index.html` — Home
- `submit.html` — New session form (notes/topic input, subject, question count)
- `results.html` — Generated practice questions (static mockup for this milestone)
- `history.html` — Past sessions (static mockup for this milestone)
- `about.html` — About the app and how it works

## Planned AI Provider
Groq (free tier) — to be integrated server-side in M3.

## Tech Stack (planned, full project)
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js / Express REST API
- AI: Groq API (server-side only)
- Database: MySQL or MongoDB

## Running Locally
No build step required for this milestone. Clone the repo and open `index.html` in a browser, or serve the folder with any static file server.