# Vercel deployment

HireFlow is a monorepo. Deploy the React/Vite frontend to Vercel and deploy the Express API separately on Render.

## Vercel project settings

1. Import `https://github.com/Ashish2614/HireFlow`.
2. Select the `main` branch.
3. Set **Root Directory** to `client`.
4. Use **Build Command** `npm run build`.
5. Use **Output Directory** `dist`.
6. Leave the install command as the default `npm install`.
7. Keep the included `client/vercel.json`; it enables React Router direct navigation and refreshes for `/jobs/:slug` and `/app/*` routes.

## Environment variables

Add these in Vercel for both Preview and Production:

- `VITE_API_BASE_URL`: the deployed Render API URL ending in `/api`.
- `VITE_SUPABASE_URL`: the Supabase project URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: the Supabase publishable/anon key only.

Never add `SUPABASE_SECRET_KEY`, SMTP passwords, or any backend-only secret to Vercel frontend variables. Vite variables are public in the browser bundle.

## Deployment order

Deploy the Express API on Render first, set its `FRONTEND_URL` to the Vercel domain, then set `VITE_API_BASE_URL` in Vercel and redeploy the frontend. Verify `/api/health`, `/`, `/jobs`, `/jobs/senior-frontend-engineer`, and `/app` after deployment.

## Current limitation

The interface has a credential-free local demo fallback. Supabase Auth, persistent application data, and private resume storage become active only after the Supabase-backed API service is configured and its migrations/RLS policies are applied.
