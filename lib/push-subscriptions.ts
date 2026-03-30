import { createHash } from 'crypto'

export interface StoredPushSubscription {
  endpoint: string
  expirationTime: number | null
  keys: {
    p256dh: string
    auth: string
  }
}

const STORE_KEY = 'push:subscription_ids'
const FALLBACK_STORE = new Map<string, StoredPushSubscription>()

function hasKVConfig(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function hashEndpoint(endpoint: string): string {
  return createHash('sha256').update(endpoint).digest('hex').slice(0, 24)
}

function toPathPart(value: string): string {
  return encodeURIComponent(value)
}

async function kvRequest<T = unknown>(command: string, ...args: string[]): Promise<T | null> {
  const baseUrl = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!baseUrl || !token) return null

  const path = [command, ...args.map(toPathPart)].join('/')
  const response = await fetch(`${baseUrl}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`KV request failed (${response.status})`)
  }

  const json = (await response.json()) as { result?: T }
  return json.result ?? null
}

function subscriptionKey(id: string): string {
  return `push:sub:${id}`
}

export async function savePushSubscription(subscription: StoredPushSubscription): Promise<void> {
  const id = hashEndpoint(subscription.endpoint)
  if (!hasKVConfig()) {
    FALLBACK_STORE.set(id, subscription)
    return
  }

  await kvRequest('set', subscriptionKey(id), JSON.stringify(subscription))
  await kvRequest('sadd', STORE_KEY, id)
}

export async function removePushSubscription(endpoint: string): Promise<void> {
  const id = hashEndpoint(endpoint)
  if (!hasKVConfig()) {
    FALLBACK_STORE.delete(id)
    return
  }

  await kvRequest('del', subscriptionKey(id))
  await kvRequest('srem', STORE_KEY, id)
}

export async function listPushSubscriptions(): Promise<StoredPushSubscription[]> {
  if (!hasKVConfig()) {
    return Array.from(FALLBACK_STORE.values())
  }

  const ids = (await kvRequest<string[]>('smembers', STORE_KEY)) ?? []
  if (ids.length === 0) return []

  const rows = await Promise.all(ids.map((id) => kvRequest<string>('get', subscriptionKey(id))))
  const subscriptions: StoredPushSubscription[] = []

  for (const row of rows) {
    if (!row) continue
    try {
      subscriptions.push(JSON.parse(row) as StoredPushSubscription)
    } catch {
      // ignore malformed payloads
    }
  }

  return subscriptions
}
