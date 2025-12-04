# JobChaahiye Backend API Documentation

Base URL: `http://localhost:5001`

---

## 📋 Table of Contents
- [Authentication Routes](#authentication-routes)
- [User Routes](#user-routes)
- [Job Routes](#job-routes)
- [Application Routes](#application-routes)

---

## 🔐 Authentication Routes

### 1. Register Employer
**POST** `/api/auth/register/employer`

Register a new employer account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "password": "password123",
  "companyName": "Tech Corp"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "userType": "employer",
    "name": "John Doe",
    "email": "john@company.com",
    "company": {
      "name": "Tech Corp"
    }
  }
}
```

---

### 2. Login Employer
**POST** `/api/auth/login/employer`

Login as an employer.

**Request Body:**
```json
{
  "email": "john@company.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "userType": "employer",
    "name": "John Doe",
    "email": "john@company.com"
  }
}
```

---

### 3. Login Employee (Send OTP)
**POST** `/api/auth/login/employee`

Request OTP for employee login.

**Request Body:**
```json
{
  "phone": "+919876543210"
}
```

**Response:**
```json
{
  "msg": "OTP sent",
  "phone": "+919876543210"
}
```

---

### 4. Verify OTP
**POST** `/api/auth/verify-otp`

Verify OTP and complete employee login.

**Request Body:**
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "userType": "employee",
    "phone": "+919876543210"
  }
}
```

**Note:** Mock OTP is `123456`

---

## 👤 User Routes

### 5. Get Current User Profile
**GET** `/api/users/me`

Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "user_id",
  "userType": "employee",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+919876543210",
  "profile": {
    "skills": ["JavaScript", "React"],
    "experience": "2 years",
    "education": "B.Tech CS",
    "resume": "resume_url",
    "location": "Mumbai"
  }
}
```

---

### 6. Update User Profile
**PUT** `/api/users/profile`

Update the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Employee):**
```json
{
  "name": "Jane Doe",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "3 years",
  "education": "B.Tech CS",
  "resume": "resume_url",
  "location": "Mumbai"
}
```

**Request Body (Employer):**
```json
{
  "name": "John Doe",
  "companyName": "Tech Corp",
  "description": "Leading tech company",
  "website": "https://techcorp.com",
  "logo": "logo_url",
  "location": "Bangalore"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "userType": "employee",
  "name": "Jane Doe",
  "profile": {
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "3 years",
    "education": "B.Tech CS",
    "resume": "resume_url",
    "location": "Mumbai"
  }
}
```

---

## 💼 Job Routes

### 7. Create Job (Employer Only)
**POST** `/api/jobs`

Create a new job posting.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Full Stack Developer",
  "description": "We are looking for a skilled full stack developer...",
  "category": "Technology",
  "location": "Bangalore",
  "salary": "₹8-12 LPA",
  "type": "Full-time",
  "requirements": ["React", "Node.js", "MongoDB"]
}
```

**Response:**
```json
{
  "_id": "job_id",
  "employer": "employer_id",
  "title": "Full Stack Developer",
  "description": "We are looking for a skilled full stack developer...",
  "category": "Technology",
  "location": "Bangalore",
  "salary": "₹8-12 LPA",
  "type": "Full-time",
  "requirements": ["React", "Node.js", "MongoDB"],
  "postedAt": "2025-11-28T02:28:44.000Z"
}
```

---

### 8. Get All Jobs (Public)
**GET** `/api/jobs`

Get all job listings (no authentication required).

**Response:**
```json
[
  {
    "_id": "job_id",
    "title": "Full Stack Developer",
    "description": "We are looking for a skilled full stack developer...",
    "category": "Technology",
    "location": "Bangalore",
    "salary": "₹8-12 LPA",
    "type": "Full-time",
    "requirements": ["React", "Node.js", "MongoDB"],
    "employer": {
      "_id": "employer_id",
      "company": {
        "name": "Tech Corp",
        "logo": "logo_url"
      }
    },
    "postedAt": "2025-11-28T02:28:44.000Z"
  }
]
```

---

### 9. Get Job by ID
**GET** `/api/jobs/:id`

Get a specific job by its ID.

**Example:** `GET /api/jobs/673f8a1b2c3d4e5f6a7b8c9d`

**Response:**
```json
{
  "_id": "job_id",
  "title": "Full Stack Developer",
  "description": "We are looking for a skilled full stack developer...",
  "category": "Technology",
  "location": "Bangalore",
  "salary": "₹8-12 LPA",
  "type": "Full-time",
  "requirements": ["React", "Node.js", "MongoDB"],
  "employer": {
    "_id": "employer_id",
    "company": {
      "name": "Tech Corp",
      "logo": "logo_url",
      "description": "Leading tech company",
      "website": "https://techcorp.com"
    }
  },
  "postedAt": "2025-11-28T02:28:44.000Z"
}
```

---

### 10. Get Employer's Jobs
**GET** `/api/jobs/employer/jobs`

Get all jobs posted by the authenticated employer.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "job_id",
    "employer": "employer_id",
    "title": "Full Stack Developer",
    "description": "We are looking for a skilled full stack developer...",
    "category": "Technology",
    "location": "Bangalore",
    "salary": "₹8-12 LPA",
    "type": "Full-time",
    "requirements": ["React", "Node.js", "MongoDB"],
    "postedAt": "2025-11-28T02:28:44.000Z"
  }
]
```

---

## 📝 Application Routes

### 11. Apply to a Job (Employee Only)
**POST** `/api/applications/:jobId`

Apply to a specific job.

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `POST /api/applications/673f8a1b2c3d4e5f6a7b8c9d`

**Response:**
```json
{
  "_id": "application_id",
  "job": "job_id",
  "applicant": "employee_id",
  "status": "pending",
  "appliedAt": "2025-11-28T02:28:44.000Z"
}
```

---

### 12. Get My Applications (Employee)
**GET** `/api/applications/employee/me`

Get all applications submitted by the authenticated employee.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "application_id",
    "job": {
      "_id": "job_id",
      "title": "Full Stack Developer",
      "location": "Bangalore",
      "salary": "₹8-12 LPA",
      "employer": {
        "_id": "employer_id",
        "company": {
          "name": "Tech Corp",
          "logo": "logo_url"
        }
      }
    },
    "applicant": "employee_id",
    "status": "pending",
    "appliedAt": "2025-11-28T02:28:44.000Z"
  }
]
```

---

### 13. Get Applications for a Job (Employer)
**GET** `/api/applications/job/:jobId`

Get all applications for a specific job (employer must own the job).

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `GET /api/applications/job/673f8a1b2c3d4e5f6a7b8c9d`

**Response:**
```json
[
  {
    "_id": "application_id",
    "job": "job_id",
    "applicant": {
      "_id": "employee_id",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+919876543210",
      "profile": {
        "skills": ["JavaScript", "React"],
        "experience": "2 years",
        "education": "B.Tech CS",
        "resume": "resume_url"
      }
    },
    "status": "pending",
    "appliedAt": "2025-11-28T02:28:44.000Z"
  }
]
```

---

### 14. Update Application Status (Employer)
**PUT** `/api/applications/:id/status`

Update the status of an application.

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `PUT /api/applications/673f8a1b2c3d4e5f6a7b8c9d/status`

**Request Body:**
```json
{
  "status": "accepted"
}
```

**Possible Status Values:**
- `pending`
- `accepted`
- `rejected`

**Response:**
```json
{
  "_id": "application_id",
  "job": "job_id",
  "applicant": "employee_id",
  "status": "accepted",
  "appliedAt": "2025-11-28T02:28:44.000Z"
}
```

---

## 🔑 Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## ⚠️ Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "msg": "Error message describing the issue"
}
```

**401 Unauthorized:**
```json
{
  "msg": "Not authorized"
}
```

**404 Not Found:**
```json
{
  "msg": "Resource not found"
}
```

**500 Server Error:**
```json
"Server Error"
```

---

## 📌 Notes

1. **Port:** Default port is `5001`, can be configured via environment variable `PORT`
2. **Database:** MongoDB connection required via `MONGODB_URI` environment variable
3. **JWT Secret:** Configure via `JWT_SECRET` environment variable (defaults to 'secret')
4. **OTP:** Currently using mock OTP `123456` for employee login
5. **CORS:** Enabled for all origins

---

## 🚀 Quick Start Examples

### Example 1: Register and Login as Employer
```bash
# Register
curl -X POST http://localhost:5001/api/auth/register/employer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "password": "password123",
    "companyName": "Tech Corp"
  }'

# Login
curl -X POST http://localhost:5001/api/auth/login/employer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@company.com",
    "password": "password123"
  }'
```

### Example 2: Create a Job
```bash
curl -X POST http://localhost:5001/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Full Stack Developer",
    "description": "We are looking for a skilled developer",
    "category": "Technology",
    "location": "Bangalore",
    "salary": "₹8-12 LPA",
    "type": "Full-time",
    "requirements": ["React", "Node.js"]
  }'
```

### Example 3: Employee Login and Apply
```bash
# Send OTP
curl -X POST http://localhost:5001/api/auth/login/employee \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210"
  }'

# Verify OTP
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "otp": "123456"
  }'

# Apply to job
curl -X POST http://localhost:5001/api/applications/JOB_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

