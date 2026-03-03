export interface Palace {
  id: string
  userId: string
  name: string
  places: Place[]
  createdAt: Date
}

export interface Place {
  id: string
  name: string
  description?: string
  position: number
}

export interface TrainingSession {
  id: string
  userId: string
  chapterId: string
  sessionNumber: number
  items: TrainingItem[]
  answers: UserAnswer[]
  completedAt: Date
}

export interface TrainingItem {
  id: string
  content: string
  location: string
  type?: 'number' | 'story' | 'place' | 'word' | 'palace'
}

export interface UserAnswer {
  itemId: string
  answer: string
}

export interface ScoreResult {
  scores: Array<{
    itemId: string
    isCorrect: boolean
    feedback: string
  }>
  correctCount: number
  totalCount: number
  narrative: string
  feedback: string[]
}
