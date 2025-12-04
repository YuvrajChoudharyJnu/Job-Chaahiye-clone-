# API Integration Summary

## Overview
All frontend files have been updated to use the centralized API configuration instead of environment variables.

## Configuration File
**Location:** `src/config/config.js`

```javascript
export const API_BASE_URL = "http://localhost:5001/api";
```

**Note:** The API documentation specifies port 5001, but the config is set to 5001. Please verify which port your backend is running on and update accordingly.

## Files Updated

### 1. **LoginEmployer.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Login: `${API_BASE_URL}/auth/login/employer`
  - Register: `${API_BASE_URL}/auth/register/employer`

### 2. **LoginEmployee.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Send OTP: `${API_BASE_URL}/auth/login/employee`
  - Verify OTP: `${API_BASE_URL}/auth/verify-otp`

### 3. **Home.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Get Jobs: `${API_BASE_URL}/jobs`

### 4. **JobListings.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Get Jobs: `${API_BASE_URL}/jobs`

### 5. **JobDetail.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Get Job by ID: `${API_BASE_URL}/jobs/${id}`
  - Apply to Job: `${API_BASE_URL}/applications/${id}`

### 6. **EmployerDashboard.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Get User Profile: `${API_BASE_URL}/users/me`
  - Get Employer Jobs: `${API_BASE_URL}/jobs/employer/jobs`
  - Post Job: `${API_BASE_URL}/jobs`
  - Get Applicants: `${API_BASE_URL}/applications/job/${job._id}`
  - Update Application Status: `${API_BASE_URL}/applications/${applicationId}/status`

### 7. **EmployeeDashboard.jsx**
- Added import: `import { API_BASE_URL } from '../config/config';`
- Updated endpoints:
  - Get User Profile: `${API_BASE_URL}/users/me`
  - Get Jobs: `${API_BASE_URL}/jobs`

## API Endpoints Mapping

Based on the API documentation, here are all the endpoints being used:

### Authentication
- `POST /auth/register/employer` - Register employer
- `POST /auth/login/employer` - Login employer
- `POST /auth/login/employee` - Send OTP to employee
- `POST /auth/verify-otp` - Verify employee OTP

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/profile` - Update user profile (not yet implemented in frontend)

### Jobs
- `POST /jobs` - Create job (employer only)
- `GET /jobs` - Get all jobs (public)
- `GET /jobs/:id` - Get job by ID
- `GET /jobs/employer/jobs` - Get employer's jobs

### Applications
- `POST /applications/:jobId` - Apply to job (employee only)
- `GET /applications/employee/me` - Get employee's applications (not yet implemented in frontend)
- `GET /applications/job/:jobId` - Get applications for a job (employer)
- `PUT /applications/:id/status` - Update application status (employer)

## Important Notes

1. **Port Configuration**: The config file uses port `5001`, but the API documentation specifies port `5001`. Verify your backend port and update `src/config/config.js` accordingly.

2. **No Environment Variables**: The application no longer relies on `.env` files or `import.meta.env.VITE_API_URL`. All API calls now use the centralized `API_BASE_URL` from the config file.

3. **Easy Updates**: To change the API base URL (e.g., for production), simply update the `API_BASE_URL` in `src/config/config.js`.

## Testing Checklist

- [ ] Verify backend is running on the correct port
- [ ] Test employer registration and login
- [ ] Test employee OTP login
- [ ] Test job listing display
- [ ] Test job details page
- [ ] Test job application
- [ ] Test employer dashboard (create job, view applicants)
- [ ] Test employee dashboard

## Next Steps

1. Verify the backend port and update `src/config/config.js` if needed
2. Test all authentication flows
3. Test all CRUD operations
4. Consider adding error handling for network failures
5. Consider adding loading states for better UX
