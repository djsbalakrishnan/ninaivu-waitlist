const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1/waitlist').replace(/\/$/, '')

export async function joinWaitlist(email, source = '') {
  return fetch(`${BASE}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  })
}

export async function getWaitlistCount() {
  const res = await fetch(`${BASE}/count/`)
  return res.json()
}
