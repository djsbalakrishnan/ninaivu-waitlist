# Deploying to Production

## Overview

| Layer | Service |
|-------|---------|
| Frontend | Vercel |
| Backend API | Render (web service) |
| Celery worker | Render (background worker) |
| Database | Neon (external PostgreSQL — free, no expiry) |
| Redis (Celery broker) | Upstash (external Redis — free tier) |
| Email | Brevo (transactional SMTP) |

---

## 1. Provision Neon (PostgreSQL)

1. Sign up at [neon.tech](https://neon.tech) — free tier, no expiry date
2. Create a new project, name it `ninaivu`
3. From the project dashboard copy the **connection string**:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Save this as `DATABASE_URL`

---

## 2. Provision Upstash (Redis)

1. Sign up at [upstash.com](https://upstash.com)
2. Create a new Redis database; select the region closest to your Render region
3. From the database console copy the **TLS connection string**:
   ```
   rediss://default:password@host.upstash.io:6379
   ```
4. Save this as `REDIS_URL`

---

## 3. Configure Brevo (email)

### 3a. Get SMTP credentials

1. Log in to [brevo.com](https://brevo.com)
2. Go to **SMTP & API** → **SMTP** tab
3. Click **Generate a new SMTP key**
4. Save:
   - `EMAIL_HOST_USER` → your Brevo **login email** (the account email, not the sender address)
   - `EMAIL_HOST_PASSWORD` → the **SMTP key** just generated

### 3b. Verify the sending domain

This lets you send from `hello@ninaivu.in` instead of a Brevo subdomain.

1. In Brevo → **Settings** → **Senders & IP** → **Domains** → **Add a domain** → enter `ninaivu.in`
2. Brevo shows you DNS records to add — copy them and add to Cloudflare (see `cloudflare.md` → Brevo section)
3. Click **Verify** in Brevo once the records are propagated (usually under 5 minutes with Cloudflare)

### 3c. Add the sender address

1. In Brevo → **Settings** → **Senders & IP** → **Senders** → **Add a sender**
2. Name: `Ninaivu`, Email: `hello@ninaivu.in`
3. Brevo will send a confirmation email to that address — confirm it

---

## 4. Deploy backend to Render

1. Push your repo to GitHub
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repo — Render detects `render.yaml` and previews both services
4. Click **Apply** — Render creates `ninaivu-api` and `ninaivu-worker`
5. For each `sync: false` env var, go to the service → **Environment** tab and paste in:

   **ninaivu-api and ninaivu-worker (both need these):**

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Neon connection string from step 1 |
   | `REDIS_URL` | Upstash TLS string from step 2 |
   | `EMAIL_HOST_USER` | Brevo login email from step 3a |
   | `EMAIL_HOST_PASSWORD` | Brevo SMTP key from step 3a |

6. Trigger a manual deploy on `ninaivu-api` after setting env vars — Render will run `preDeployCommand` (migrations) before starting gunicorn

> **Why preDeployCommand?** Migrations run in a separate phase that has access to env vars. The `buildCommand` runs earlier without them, so `migrate` cannot live there.

### Connect to the production database

To run management commands against production (e.g. create a superuser):

1. Go to `ninaivu-api` in Render → **Shell** tab
2. Run directly:
   ```bash
   python manage.py createsuperuser
   python manage.py migrate
   ```

For a live `psql` session via the Neon CLI:

```bash
brew install neonctl
neon auth
neon connection-string --project-id <your-neon-project-id> | xargs psql
```

> **Never hardcode `DATABASE_URL` or any secrets in the repo.** All production credentials live exclusively in Render's environment panel.

---

## 5. Deploy frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. Set **Root Directory** to `frontend`
3. Vercel auto-detects Vite — no build settings changes needed
4. Add one environment variable:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://ninaivu-api.onrender.com/api/v1/waitlist` (switch to `https://api.ninaivu.in/api/v1/waitlist` once DNS is live) |

5. Click **Deploy**

---

## 6. Post-deploy checklist

- [ ] Visit `https://ninaivu-api.onrender.com/admin/` — confirm Django admin loads
- [ ] Submit a test email on the landing page — confirm `201 Created` in the Network tab
- [ ] Check `ninaivu-worker` logs in Render — confirm `send_confirmation_email` task fires
- [ ] Check your inbox — confirm the Brevo confirmation email arrives from `hello@ninaivu.in`
- [ ] Verify the Neon dashboard shows the new row in `waitlist_waitlistentry`
- [ ] Once DNS is configured (see `cloudflare.md`), update `VITE_API_URL` in Vercel and `ALLOWED_HOSTS` / `CORS_ALLOWED_ORIGINS` in Render
