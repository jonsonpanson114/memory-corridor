// Vercel KV ユーティリティ
// 本番環境ではVercel KVを使用し、開発環境ではローカルストレージを使用

type KVStore = {
  get: (key: string) => Promise<string | null>
  set: (key: string, value: string) => Promise<void>
  delete: (key: string) => Promise<void>
  lrange: (key: string, start: number, stop: number) => Promise<string[]>
  lpush: (key: string, value: string) => Promise<number>
  lindex: (key: string, index: number) => Promise<string | null>
}

// 開発環境用のモックKV（ローカルストレージ）
class LocalKV implements KVStore {
  private storage: Record<string, string[]> = {}

  async get(key: string): Promise<string | null> {
    const list = this.storage[key]
    if (!list || list.length === 0) return null
    return JSON.stringify(list)
  }

  async set(key: string, value: string): Promise<void> {
    const parsed = JSON.parse(value)
    this.storage[key] = parsed
  }

  async delete(key: string): Promise<void> {
    delete this.storage[key]
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    const list = this.storage[key] || []
    if (stop === -1) {
      return list.slice(start)
    }
    return list.slice(start, stop + 1)
  }

  async lpush(key: string, value: string): Promise<number> {
    if (!this.storage[key]) {
      this.storage[key] = []
    }
    this.storage[key].push(value)
    return this.storage[key].length
  }

  async lindex(key: string, index: number): Promise<string | null> {
    const list = this.storage[key] || []
    return list[index] || null
  }
}

// KVインスタンスの取得
export function getKV(): KVStore {
  // 本番環境ではVercel KVを使用
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    // Vercel KVの実装が必要な場合はここに追加
    // 現在は開発環境のみ対応
    return new LocalKV()
  }

  // 開発環境ではローカルストレージ
  return new LocalKV()
}

// ユーザー進捗管理
export async function getUserProgress(userId: string) {
  const kv = getKV()
  const data = await kv.get(`user:${userId}:progress`)
  if (!data) return null
  return JSON.parse(data)
}

export async function saveUserProgress(userId: string, progress: any) {
  const kv = getKV()
  await kv.set(`user:${userId}:progress`, JSON.stringify(progress))
}

// 記憶の断片管理
export async function getUserMemories(userId: string) {
  const kv = getKV()
  const data = await kv.get(`user:${userId}:memories`)
  if (!data) return []
  return JSON.parse(data)
}

export async function addMemory(userId: string, memory: any) {
  const kv = getKV()
  const current = await getUserMemories(userId)
  current.push(memory)
  await kv.set(`user:${userId}:memories`, JSON.stringify(current))
}

// セッション履歴管理
export async function getSessionHistory(userId: string) {
  const kv = getKV()
  const data = await kv.lrange(`user:${userId}:sessions`, 0, -1)
  if (!data || data.length === 0) return []
  return data.map((d) => JSON.parse(d))
}

export async function addSession(userId: string, session: any) {
  const kv = getKV()
  await kv.lpush(`user:${userId}:sessions`, JSON.stringify(session))
}

// 忘却曲線計算（エビングハウスの忘却曲線）
export function calculateRetention(sessionHistory: any[]): number {
  if (sessionHistory.length === 0) return 0

  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000
  let totalScore = 0
  let weight = 0

  sessionHistory.forEach((session: any) => {
    const daysSinceSession = (now - session.timestamp) / oneDay
    // エビングハウスの忘却曲線: R = e^(-t/S)
    // R: 保持率, t: 時間, S: 記憶の強度（初期値1日）
    const retention = Math.exp(-daysSinceSession / 1)
    const score = (session.correctCount / session.totalCount) * retention

    totalScore += score
    weight += retention
  })

  return weight > 0 ? totalScore / weight : 0
}
