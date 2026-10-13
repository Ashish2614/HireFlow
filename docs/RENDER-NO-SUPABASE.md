# Render deployment without Supabase

The current Express API can be deployed to Render without Supabase because its local demo records are held in memory. This is suitable for presenting the UI and testing the API, but it is not production persistence: data resets whenever the service restarts, redeploys, sleeps, or is moved to another instance.

## Render settings

- Service type: Web Service
- Repository: `Ashish2614/HireFlow`
- Branch: `main`
- Root Directory: `server`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

## Environment variables

Set these in Render:

```env
NODE_ENV=production
FRONTEND_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
```

Render supplies `PORT` automatically. The server listens on `0.0.0.0` and uses `process.env.PORT`.

After the service deploys, verify:

```powershell
Invoke-RestMethod https://YOUR-RENDER-SERVICE.onrender.com/api/health
Invoke-RestMethod https://YOUR-RENDER-SERVICE.onrender.com/api/public/jobs
```

## Connect Vercel

Set this Vercel variable and redeploy:

```env
VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com/api
```

## What this mode does not provide

Without Supabase or another database, this deployment does not provide persistent user accounts, secure authentication, private resume storage, RLS, durable applications, or durable recruiter notes. The current demo login is only a UI route and must not be used as real authentication.

For a real deployment later, add Render Postgres or another PostgreSQL provider and replace the in-memory stores with authenticated, persistent database services before accepting real candidate data.
