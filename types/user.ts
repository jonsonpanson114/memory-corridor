export interface UserProgress {
  userId: string
  currentChapter: string
  currentSession: number
  totalCorrectAnswers: number
  totalSessions: number
  lastPlayedAt: Date
}

export interface UserMemory {
  userId: string
  memories: MemoryFragment[]
}

export interface MemoryFragment {
  id: string
  chapterId: string
  content: string
  unlockedAt: Date
}

export interface StoryBranch {
  chapterId: string
  userId: string
  choices: string[]
  flags: Record<string, boolean>
}
