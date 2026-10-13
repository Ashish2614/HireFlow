# HireFlow API

The API uses `{ success, message, data }` responses. In production, protected endpoints require `Authorization: Bearer <Supabase access token>` and derive identity from the validated token.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Service health |
| GET | `/api/public/jobs` | Published jobs; supports `q` |
| GET | `/api/public/jobs/:slug` | Published job details |
| GET | `/api/auth/me` | Current profile and memberships |
| GET/POST | `/api/jobs` | Organization jobs / create draft |
| PATCH | `/api/jobs/:id/status` | Publish, pause, close |
| POST | `/api/jobs/:jobId/applications` | Candidate application |
| GET | `/api/candidate/applications` | Candidate-owned applications |
| GET/PATCH | `/api/applications/:id` | Authorized application review/status |
| GET/POST | `/api/applications/:id/notes` | Private recruiter notes |
| GET/POST | `/api/interviews` | Authorized interview scheduling |
| GET/PATCH | `/api/notifications` | Recipient-owned notifications |
| GET | `/api/dashboard/recruiter` | Organization-scoped metrics |

Validation errors use `400`; missing/invalid auth uses `401`; insufficient scope uses `403`; missing resources use `404`; duplicate applications use `409`.
