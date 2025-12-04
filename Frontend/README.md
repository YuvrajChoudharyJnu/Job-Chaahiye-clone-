 # Frontend — Job Chaahiye Platform

 Author: Manya Shukla

 This folder contains the React + Vite frontend for the Job Chaahiye platform. It provides pages for job discovery, employer/employee login (mock OTP for employees), job posting, profile management and application tracking.

 ## Quick start

 1. Install dependencies (run inside `Frontend`)

    npm install

 2. Start local dev server

    npm run dev

 3. Build for production

    npm run build

 4. Preview production build

    npm run preview

 ## Environment / configuration

 The app reads the API base URL from `src/config/config.js`. By default it points to:

 ```js
 export const API_BASE_URL = "http://localhost:5001/api";
 ```

 For local development, run the backend and update this constant if your backend listens on a different port (common default is `http://localhost:5000/api`). You can optionally replace this file with an env-based approach (e.g. `import.meta.env.VITE_API_BASE_URL`) for easier deployment.

 ## Available scripts (from `package.json`)

 - `npm run dev` — start Vite dev server
 - `npm run build` — create production build
 - `npm run preview` — locally preview production build
 - `npm run lint` — run ESLint

 ## Project structure (important files)

 - `index.html` — app entry HTML
 - `src/main.jsx` — React bootstrap
 - `src/App.jsx` — routes and app shell
 - `src/pages/` — page components (Home, JobListings, JobDetail, LoginEmployee, LoginEmployer, Profile, dashboards, etc.)
 - `src/components/` — shared UI components (e.g., `Navbar.jsx`)
 - `src/config/config.js` — API base URL
 - `src/context/ToastContext.jsx` — toast notification provider
 - `src/assets/` — images and static assets

 ## API integration notes

 The frontend expects the backend API to follow the endpoints described in the Backend README. Important behaviors:

 - The frontend authenticates by storing a JWT and sending it in the `x-auth-token` header for protected calls.
 - Login flows use mocked OTP (OTP value `123456`) in the provided backend; replace with a real OTP provider before production.
 - User profile updates, job creation, and application endpoints require authentication and role checks (employer vs employee).

 Example axios usage (the project uses `axios`):

 ```js
 import axios from 'axios';
 import { API_BASE_URL } from './config/config';

 const api = axios.create({ baseURL: API_BASE_URL });

 // attach token (if present)
 api.interceptors.request.use((config) => {
   const token = localStorage.getItem('token');
   if (token) config.headers['x-auth-token'] = token;
   return config;
 });

 export default api;
 ```

 ## Dev tips

 - If CORS errors occur when calling the backend, ensure the backend `cors` middleware allows your frontend origin (or use `cors()` during development).
 - To switch the API URL without changing code, consider using a `VITE_API_BASE_URL` env variable and updating `config.js` to read from `import.meta.env`.
 - Use the browser devtools and network tab to inspect requests and JWT header values.

 ## Next steps (suggestions)

 - Move the hard-coded `API_BASE_URL` to a Vite env var (`VITE_API_BASE_URL`) and document `.env` usage here.
 - Add example `.env.example` and a short CONTRIBUTING.md describing how to run both frontend and backend locally.
 - Add end-to-end tests (Cypress / Playwright) to exercise login, job search, and application flows.

 If you want, I can add a `src/api.js` helper with axios instance + interceptor, an `.env.example`, or wire `VITE_API_BASE_URL` into the project now. Which would you prefer?
