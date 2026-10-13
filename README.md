# HireFlow

HireFlow is a polished applicant tracking system for candidate discovery, job publishing, application review, pipeline management, interviews, notes, and recruitment analytics.

## Included now

- Responsive landing page, public job search, filters-by-search, job details, and candidate application entry point.
- Recruiter workspace with overview metrics, application activity chart, interview agenda, and application table.
- Application status tabs, recruiter navigation, responsive sidebar, empty states, and demo API integration.
- Express health/public-jobs/dashboard/application endpoints with validation and security middleware.
- Supabase-ready relational migration covering profiles, organizations, memberships, candidates, jobs, applications, events, interviews, private notes, feedback, notifications, and audit logs.
- Vercel SPA rewrite, Render-compatible server startup, environment examples, API and architecture docs.

## Windows PowerShell setup

```powershell
cd E:\HireFlow
npm install
npm run install:all
npm run dev
```

Open `http://localhost:5173`. The demo UI works without credentials. To run the API alone: `npm run dev --prefix server`. To build the frontend: `npm run build --prefix client`.

## Supabase setup

1. Create a Supabase project and copy the URL, publishable key, and server-only secret key into `client/.env` and `server/.env` based on the examples.
2. Apply `supabase/migrations/202610130001_initial_schema.sql` in the Supabase SQL editor or with the Supabase CLI against the intended non-production project.
3. Create a private Storage bucket named `candidate-resumes`; add policies that restrict objects to the candidate owner and authorized organization members.
4. Configure Auth email confirmation and password-reset redirect URLs for local (`http://localhost:5173`) and production.
5. Bootstrap the initial administrator through a controlled server-side script or SQL process using `INITIAL_ADMIN_NAME`, `INITIAL_ADMIN_EMAIL`, and a local-only `INITIAL_ADMIN_PASSWORD`; never commit that password or permit public signup to assign recruiter or administrator roles.

## Deployment

For Vercel, set root directory to `client`, build command `npm run build`, output `dist`, and configure the `VITE_*` variables from [`client/.env.production.example`](client/.env.production.example). The included `client/vercel.json` enables SPA rewrites for React Router. Set `VITE_API_BASE_URL` to the deployed Render API ending in `/api`. For Render, create a Web Service rooted at `server`, start with `npm start`, set `PORT`, `FRONTEND_URL`, and backend-only Supabase variables, and use `/api/health` as the health check. See [`docs/VERCEL.md`](docs/VERCEL.md) for the complete checklist.

For a credential-free demo, the backend can run on Render without Supabase. Use [`docs/RENDER-NO-SUPABASE.md`](docs/RENDER-NO-SUPABASE.md). This mode uses in-memory demo data and is not suitable for real candidate information or durable production workflows.

## Verification status

The local demo surface and frontend production build are intended to be verified with the commands above. Supabase Auth, RLS, private resume storage, recruiter invitations, transactional persistence, and role-isolation tests remain external setup work until a Supabase project is configured. Do not treat demo metrics as production recruitment data.

## Next portfolio improvement

Connect the existing recruiter UI to the Supabase service layer and add end-to-end permission tests using isolated candidate and recruiter fixtures. That closes the largest gap between the polished workflow demo and a production ATS.
