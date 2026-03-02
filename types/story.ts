export interface Chapter {
  id: string
  title: string
  mnemonicType: 'palace' | 'number' | 'link' | 'story' | 'integrated'
  sessions: Session[]
}

export interface Session {
  id: string
  chapterId: string
  sessionNumber: number
  storyText: string
  choices?: Choice[]
  trainingData: TrainingItem[]
  memoryFragment?: string
}

export interface Choice {
  id: string
  text: string
  affectsBranch?: string
}

export interface TrainingItem {
  id: string
  content: string
  type: 'place' | 'number' | 'word' | 'story'
  location?: string
}
