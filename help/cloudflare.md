# Cloudflare DNS Records

DNS records to connect `ninaivu.in` to Vercel (frontend), Render (backend), and Brevo (email).

## Prerequisites

- `ninaivu.in` added to Cloudflare (nameservers updated at your registrar)
- Vercel project deployed and domain verification initiated
- Render `ninaivu-api` service deployed — note your `.onrender.com` hostname
- Brevo domain verification initiated (Settings → Senders & IP → Domains)

---

## Frontend — Vercel (`ninaivu.in` and `www.ninaivu.in`)

| Type  | Name | Target | Proxy status |
|-------|------|--------|--------------|
| CNAME | `www` | `cname.vercel-dns.com` | DNS only (grey cloud) |
| CNAME | `@`   | `cname.vercel-dns.com` | DNS only (grey cloud) |

**Notes:**
- Keep Cloudflare proxy **off** (grey cloud) for both records. Vercel handles TLS termination and certificate provisioning; proxying through Cloudflare before Vercel's cert is issued breaks the ACME challenge.
- Cloudflare supports CNAME flattening for the apex (`@`) — non-standard DNS but Cloudflare resolves it correctly.
- After adding the records, go to Vercel → Project → **Settings → Domains** → add `ninaivu.in` and `www.ninaivu.in`. Vercel verifies and issues the cert automatically.

---

## Backend — Render (`api.ninaivu.in`)

| Type  | Name  | Target | Proxy status |
|-------|-------|--------|--------------|
| CNAME | `api` | `ninaivu-api.onrender.com` | DNS only (grey cloud) |

Replace `ninaivu-api.onrender.com` with the actual hostname from your Render dashboard.

**After adding this record:**

1. Go to Render → `ninaivu-api` → **Settings → Custom Domains** → add `api.ninaivu.in`
2. Render issues a TLS cert automatically
3. Update env vars in Render:
   - `ALLOWED_HOSTS` → `.onrender.com,api.ninaivu.in`
   - `CORS_ALLOWED_ORIGINS` → `https://ninaivu.in,https://www.ninaivu.in`
4. Update `VITE_API_URL` in Vercel → `https://api.ninaivu.in/api/v1/waitlist`

---

## Email authentication — Brevo (`ninaivu.in`)

These records tell receiving mail servers that Brevo is authorised to send email on behalf of `ninaivu.in`. Without them, emails from `hello@ninaivu.in` will land in spam.

Go to Brevo → **Settings → Senders & IP → Domains** → select `ninaivu.in` → copy the exact values Brevo shows you, then add them here.

### SPF

| Type | Name | Value | Proxy status |
|------|------|-------|--------------|
| TXT | `@` | `v=spf1 include:spf.brevo.com mx ~all` | DNS only |

> If `@` already has an SPF record (e.g. from another service), merge them into one: `v=spf1 include:spf.brevo.com include:other mx ~all`. There must only be one SPF TXT record on `@`.

### DKIM

Brevo provides a CNAME record — copy the exact name and value from the Brevo dashboard.

| Type  | Name | Value | Proxy status |
|-------|------|-------|--------------|
| CNAME | `mail._domainkey` | *(copy from Brevo dashboard)* | DNS only |

### DMARC (recommended)

Tells receiving servers what to do with mail that fails SPF/DKIM. Start with `p=none` (monitor only) then tighten to `p=quarantine` once you've confirmed legitimate mail passes.

| Type | Name | Value | Proxy status |
|------|------|-------|--------------|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@ninaivu.in` | DNS only |

**After adding all three records:**
1. Go back to Brevo → Domains → click **Verify** next to `ninaivu.in`
2. Brevo confirms the domain is authenticated
3. You can now send from `hello@ninaivu.in`

---

## TTL

Set TTL to **Auto** for all records (Cloudflare default).

---

## SSL / TLS mode

Once Vercel and Render have issued their certificates (usually within a few minutes):

- Set Cloudflare SSL/TLS mode to **Full (strict)**
- This ensures end-to-end encryption between browser, Cloudflare edge, and your origin servers
