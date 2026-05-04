# Deploying to Production

## Overview

| Layer | Service |
|-------|---------|
| Frontend | Vercel |
| Backend API | Render (web service) |
| Celery worker | Render (background worker) |
| Database | Neon (external PostgreSQL — free, no expiry) |
| Redis (Celery broker) | Upstash (external Redis — free tier) |

---

## 1. Provision Neon (PostgreSQL)

1. Sign up at [neon.tech](https://neon.tech) — free tier, no expiry date
2. Create a new project, name it `ninaivu`
3. From the project dashboard copy the **connection string**:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Save this as `DATABASE_URL` — you'll paste it into Render in step 3

---

## 2. Provision Upstash (Redis)

1. Sign up at [upstash.com](https://upstash.com)
2. Create a new Redis database; select the region closest to your Render region
3. From the database console copy the **TLS connection string**:
   ```
   rediss://default:password@host.upstash.io:6379
   ```
4. Save this as `REDIS_URL` — you'll paste it into Render in step 3

---

## 3. Deploy backend to Render

1. Push your repo to GitHub
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repo — Render detects `render.yaml` and previews the two services (`ninaivu-api`, `ninaivu-worker`)
4. Click **Apply** — Render creates both services
5. For each `sync: false` env var, go to the service → **Environment** tab and paste in the values:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Neon connection string from step 1 |
   | `REDIS_URL` | Upstash TLS string from step 2 |
   | `EMAIL_HOST` | Your SMTP host (e.g. `smtp.resend.com`, `smtp.postmarkapp.com`) |
   | `EMAIL_HOST_USER` | SMTP username |
   | `EMAIL_HOST_PASSWORD` | SMTP password / API key |

   Repeat for `ninaivu-worker` — it needs the same `DATABASE_URL`, `REDIS_URL`, and email vars.

6. Render runs `migrate` as part of the build command — no manual migration step needed on first deploy

### Connect to the production database

To run management commands against the production database (e.g. create a superuser, run a one-off migration):

1. Go to `ninaivu-api` in the Render dashboard → **Shell** tab
2. Run any Django management command directly:
   ```bash
   python manage.py createsuperuser
   python manage.py migrate
   ```

For a live `psql` session against Neon:

1. Install the [Neon CLI](https://neon.tech/docs/reference/neon-cli):
   ```bash
   brew install neonctl
   neon auth
   ```
2. Connect:
   ```bash
   neon connection-string --project-id <your-neon-project-id> | xargs psql
   ```

> **Never hardcode `DATABASE_URL` or any secrets in the repo.** All production credentials live exclusively in Render's environment panel.

---

## 4. Deploy frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. Set **Root Directory** to `frontend`
3. Vercel auto-detects Vite — no build settings changes needed
4. Add one environment variable:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://ninaivu-api.onrender.com/api/v1/waitlist` (use your actual Render URL until custom domain is set up, then switch to `https://api.ninaivu.in/api/v1/waitlist`) |

5. Click **Deploy**

---

## 5. Post-deploy checklist

- [ ] Visit `https://ninaivu-api.onrender.com/admin/` — confirm Django admin loads
- [ ] Submit a test email on the landing page — confirm `201 Created` in the Network tab
- [ ] Check Celery worker logs in Render — confirm `send_confirmation_email` task fires
- [ ] Verify the Neon dashboard shows the new row in `waitlist_waitlistentry`
- [ ] Once DNS is configured (see `cloudflare.md`), update `VITE_API_URL` in Vercel and `ALLOWED_HOSTS` / `CORS_ALLOWED_ORIGINS` in Render
