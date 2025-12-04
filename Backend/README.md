
# Backend — Job Chaahiye Platform

Author: Manya Shukla

This folder contains the Express + MongoDB backend for the Job Chaahiye platform. It provides authentication (OTP mock for employees, password-based for employers), job posting and listing, and application tracking.

## Contents

- `server.js` — app entrypoint
- `routes/` — route handlers: `authRoutes.js`, `jobRoutes.js`, `userRoutes.js`, `applicationRoutes.js`
- `models/` — Mongoose models: `User.js`, `Job.js`, `Application.js`
- `middleware/auth.js` — JWT-based auth middleware
- `package.json` — scripts and deps

## Quick start

1. Install dependencies

	 npm install

2. Create a `.env` file in this folder (or set environment variables) and populate the variables described below.

3. Run the server

	 - Production: `npm start` (runs `node server.js`)
	 - Development: `npm run dev` (runs `nodemon server.js`)

The server listens on the port configured in `server.js` (defaults to 5000 if not set).

## Required environment variables

- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/job-chaahiye`)
- `PORT` — port to run the server (optional; defaults provided)
- `JWT_SECRET` — secret used to sign JWT tokens (defaults to `secret` in dev)

Keep secrets out of source control. Use a `.env` file or your deployment platform's secret manager.

## Available npm scripts

- `npm start` — start server with Node
- `npm run dev` — start server with nodemon for development

## API Summary

All endpoints return JSON. Authenticated routes require an `x-auth-token` header with a valid JWT.

Base route prefixes (as used in `server.js`):

- `/api/auth` — authentication routes
- `/api/jobs` — job-related routes
- `/api/users` — user profile routes
- `/api/applications` — job application routes

### Authentication (`/api/auth`)

- POST `/register/employer` — Register an employer (body: `{ name, email, password, companyName }`). Returns `{ token, user }` on success.
- POST `/login/employer` — Employer login (mock OTP flow; body: `{ phone }`) — responds with `{ msg, phone, otp }` (OTP is mocked as `123456`).
- POST `/login/employee` — Employee login (mock OTP flow; body: `{ phone }`) — responds with `{ msg, phone, otp }`.
- POST `/verify-otp` — Verify OTP and return JWT (body: `{ phone, otp, userType }`). Creates a user record if DB connected and user doesn't exist. Returns `{ token, user }`.

Notes: OTP flows are mocked for development. Replace with a real OTP provider (Twilio, MessageBird, etc.) before production.

### Jobs (`/api/jobs`)

- POST `/` — Create a job (requires auth; employer only). Body: `{ title, description, category, location, salary, type, requirements }`.
- GET `/` — List jobs (public). Supports query filters: `title`, `location`, `datePosted` (`24h`, `3d`, `7d`, `all`), `experience` (placeholder).
- GET `/:id` — Get job details by ID.
- GET `/employer/jobs` — Get jobs posted by current employer (requires auth and employer role).

### Users (`/api/users`)

- GET `/me` — Get current user profile (requires auth).
- PUT `/profile` — Update profile fields (requires auth). Employee and employer have different profile shapes (see Models below).

### Applications (`/api/applications`)

- POST `/:jobId` — Apply to a job (requires auth; employee only).
- GET `/check/:jobId` — Check if current employee has applied to job.
- GET `/employee/me` — Get applications of the logged-in employee.
- GET `/job/:jobId` — Get applications for a job (requires auth; employer and owner of job).
- PUT `/:id/status` — Update application status (requires auth; employer who owns the job).

## Data models (summary)

- User (`models/User.js`)
	- userType: `employee | employer`
	- Common: `name`, `email?`, `phone?`, `password?`
	- Employee: `profile` (skills, experience, education, resume, location, company, position)
	- Employer: `company` (name, description, website, logo, location)

- Job (`models/Job.js`)
	- employer (ObjectId -> User)
	- title, description, category, location, salary, type (Full-time/Part-time/Contract/Internship), requirements[], postedAt, status

- Application (`models/Application.js`)
	- job (ObjectId -> Job), applicant (ObjectId -> User), status (`applied`, `shortlisted`, `rejected`, `hired`), appliedAt
	- Composite index prevents duplicate (job, applicant)

## Auth middleware

`middleware/auth.js` reads the token from the `x-auth-token` header and verifies it with `JWT_SECRET`. On success it sets `req.user = decoded.user` where `req.user` contains `{ id, type }`.

## Development notes & next steps

- Replace mocked OTP flows with a real SMS provider for production.
- Add input validation (e.g., using `express-validator`) for all routes.
- Add tests and CI pipeline.
- Consider rate-limiting and brute-force protection for auth endpoints.

## Troubleshooting

- If MongoDB connection fails, verify `MONGO_URI` and that your DB is running.
- If tokens are rejected, confirm `JWT_SECRET` matches the one used to sign tokens.



