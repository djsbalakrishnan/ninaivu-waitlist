# Ninaivu — நினைவு

> *The spaced repetition platform for tech interview prep.*

Ninaivu helps engineers prepare for DSA and Data Engineering interviews using the FSRS spaced repetition algorithm — the same science behind Anki, applied specifically to the problems and concepts that come up in technical interviews.

This repo is the waitlist site and backend that collects early access signups.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Backend | Django 4.2 + Django REST Framework |
| Task queue | Celery + Upstash Redis |
| Database | Neon (PostgreSQL, free tier, no expiry) |
| Frontend hosting | Vercel |
| Backend hosting | Render |

## Monorepo layout

```
ninaivu/
├── frontend/          # React + Vite landing page
│   ├── src/
│   │   ├── components/    # Nav, Hero, sections, WaitlistForm
│   │   └── api/           # waitlist.js — fetch wrapper
│   └── .env.example
├── backend/           # Django API + Celery worker
│   ├── config/            # Django project (settings, urls, celery)
│   ├── waitlist/          # app — model, serializer, views, tasks
│   ├── requirements.txt
│   └── .env.example
├── help/
│   ├── dev.md         # local setup
│   ├── prod.md        # Vercel + Render deployment
│   └── cloudflare.md  # DNS records
└── render.yaml        # Render services (web + worker)
```

## Quick start

See [help/dev.md](help/dev.md).

## Deployment

See [help/prod.md](help/prod.md) for Vercel + Render steps.
See [help/cloudflare.md](help/cloudflare.md) for DNS configuration.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/waitlist/` | Join the waitlist |
| `GET`  | `/api/v1/waitlist/count/` | Total signup count (used by the landing page counter) |

### `POST /api/v1/waitlist/`

```json
{ "email": "user@example.com", "source": "hero_form" }
```

| Status | Meaning |
|--------|---------|
| `201` | Signed up successfully |
| `200` | Already on the list (intentionally indistinguishable from success to avoid leaking emails) |
| `400` | Validation error |
| `429` | Rate limited (3 submissions per IP per hour) |

On `201`, a Celery task fires asynchronously to send a confirmation email.
