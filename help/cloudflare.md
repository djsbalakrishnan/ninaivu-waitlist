# Cloudflare DNS Records

DNS records to connect `ninaivu.in` to Vercel (frontend) and Render (backend).

## Prerequisites

- `ninaivu.in` added to Cloudflare (nameservers updated at your registrar)
- Vercel project deployed and domain verification initiated
- Render `ninaivu-api` service deployed — note your `.onrender.com` hostname

---

## Frontend — Vercel (`ninaivu.in` and `www.ninaivu.in`)

| Type  | Name | Target | Proxy status |
|-------|------|--------|--------------|
| CNAME | `www` | `cname.vercel-dns.com` | DNS only (grey cloud) |
| CNAME | `@`   | `cname.vercel-dns.com` | DNS only (grey cloud) |

**Notes:**
- Keep Cloudflare proxy **off** (grey cloud) for both records. Vercel handles TLS termination and certificate provisioning via Let's Encrypt; proxying through Cloudflare before Vercel's cert is issued breaks the ACME challenge.
- Cloudflare supports CNAME flattening for the apex (`@`) record — this is non-standard DNS but Cloudflare resolves it correctly.
- After adding the records, go to Vercel → Project → **Settings → Domains** → add `ninaivu.in` and `www.ninaivu.in`. Vercel will verify and issue the cert automatically.

---

## Backend — Render (`api.ninaivu.in`)

| Type  | Name  | Target | Proxy status |
|-------|-------|--------|--------------|
| CNAME | `api` | `ninaivu-api.onrender.com` | DNS only (grey cloud) |

Replace `ninaivu-api.onrender.com` with the actual hostname shown in your Render dashboard (Render assigns a unique subdomain per service).

**After adding this record:**

1. Go to Render → `ninaivu-api` → **Settings → Custom Domains** → add `api.ninaivu.in`
2. Render will issue a TLS cert automatically
3. Update the `ALLOWED_HOSTS` env var in Render to include the custom domain:
   ```
   .onrender.com,api.ninaivu.in
   ```
4. Update `CORS_ALLOWED_ORIGINS` in Render:
   ```
   https://ninaivu.in,https://www.ninaivu.in
   ```
5. Update `VITE_API_URL` in Vercel:
   ```
   https://api.ninaivu.in/api/v1/waitlist
   ```

---

## TTL

Set TTL to **Auto** for all records (Cloudflare default).

---

## SSL / TLS mode

Once both Vercel and Render have issued their certificates (usually within a few minutes of domain verification):

- Set Cloudflare SSL/TLS mode to **Full (strict)**
- This ensures end-to-end encryption between the browser, Cloudflare edge, and your origin servers
