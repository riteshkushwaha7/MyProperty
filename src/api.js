const BASE = 'http://localhost:4000/api'

export async function fetchProperties() {
  const res = await fetch(`${BASE}/properties`)
  if (!res.ok) throw new Error('Failed to fetch properties')
  return res.json()
}

export async function createProperty(payload) {
  const res = await fetch(`${BASE}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create property')
  return res.json()
}
