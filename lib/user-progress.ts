import type { UserProgress, UserMemory, StoryBranch } from '@/types/user'

const STORAGE_KEYS = {
  PROGRESS: 'user-progress',
  MEMORIES: 'user-memories',
  BRANCHES: 'story-branches',
  PALACE: 'user-palace',
}

// ユーザー進捗管理
export function getProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
  if (!stored) {
    return {
      userId: 'local-user',
      currentChapter: 'chapter1',
      currentSession: 1,
      totalCorrectAnswers: 0,
      totalSessions: 0,
      lastPlayedAt: new Date(),
    }
  }
  return JSON.parse(stored)
}

export function saveProgress(progress: Partial<UserProgress>) {
  const current = getProgress()
  const updated = { ...current, ...progress }
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated))
  return updated
}

export function incrementSession() {
  const current = getProgress()
  return saveProgress({
    currentSession: current.currentSession + 1,
    totalSessions: current.totalSessions + 1,
    lastPlayedAt: new Date(),
  })
}

export function updateScore(correctCount: number, totalCount: number) {
  const current = getProgress()
  return saveProgress({
    totalCorrectAnswers: current.totalCorrectAnswers + correctCount,
    lastPlayedAt: new Date(),
  })
}

// 記憶の断片管理
export function getMemories(): UserMemory {
  const stored = localStorage.getItem(STORAGE_KEYS.MEMORIES)
  if (!stored) {
    return {
      userId: 'local-user',
      memories: [],
    }
  }
  return JSON.parse(stored)
}

export function unlockMemory(chapterId: string, content: string) {
  const current = getMemories()
  const newMemory = {
    id: `${chapterId}-${Date.now()}`,
    chapterId,
    content,
    unlockedAt: new Date(),
  }
  current.memories.push(newMemory)
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(current))
  return newMemory
}

// 物語分岐管理
export function getBranches(): StoryBranch[] {
  const stored = localStorage.getItem(STORAGE_KEYS.BRANCHES)
  if (!stored) {
    return []
  }
  return JSON.parse(stored)
}

export function saveBranch(chapterId: string, userId: string, choices: string[], flags: Record<string, boolean>) {
  const current = getBranches()
  const newBranch = {
    chapterId,
    userId,
    choices,
    flags,
  }
  current.push(newBranch)
  localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(current))
  return newBranch
}

// 記憶の宮殿管理
export function getPalace() {
  const stored = localStorage.getItem(STORAGE_KEYS.PALACE)
  if (!stored) {
    return null
  }
  return JSON.parse(stored)
}

export function savePalace(palace: { name: string; places: string[] }) {
  localStorage.setItem(STORAGE_KEYS.PALACE, JSON.stringify(palace))
  return palace
}
