'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PalaceSetup from '@/components/training/PalaceSetup'
import WalkThrough from '@/components/training/WalkThrough'
import BlankTime from '@/components/training/BlankTime'
import RecallInput from '@/components/training/RecallInput'
import NumberConversion from '@/components/training/NumberConversion'
import LinkMethod from '@/components/training/LinkMethod'
import StoryMethod from '@/components/training/StoryMethod'
import { getSession } from '@/lib/story-data'
import { getPalace, savePalace, getProgress, saveProgress } from '@/lib/user-progress'
import { useRouter } from 'next/navigation'

type TrainingPhase = 'setup' | 'walkthrough' | 'blank' | 'recall' | 'number-conversion' | 'link-method' | 'story-method' | 'palace-final'

export default function TrainingPage() {
  const searchParams = useSearchParams()
  const chapterId = searchParams.get('chapter') || 'chapter1'
  const sessionNumber = parseInt(searchParams.get('session') || '1')

  const session = getSession(chapterId, sessionNumber)
  const progress = getProgress()
  const [phase, setPhase] = useState<TrainingPhase>('setup')
  const [palace, setPalace] = useState<{ name: string; places: string[] } | null>(null)
  const [userWords, setUserWords] = useState<Record<number, string>>({})
  const router = useRouter()

  // 既存の記憶の宮殿をロード
  useEffect(() => {
    const existingPalace = getPalace()
    if (existingPalace) {
      setPalace(existingPalace)

      // 第二章の場合は数字変換法、第三章の場合は連想法、第四章の場合はストーリー法、第五章の場合は宮殿統合から開始
      if (chapterId === 'chapter2') {
        setPhase('number-conversion')
      } else if (chapterId === 'chapter3') {
        setPhase('link-method')
      } else if (chapterId === 'chapter4') {
        setPhase('story-method')
      } else if (chapterId === 'chapter5') {
        setPhase('walkthrough') // 第五章は記憶の宮殿の統合、walkthroughから開始
      } else {
        setPhase('walkthrough')
      }
    }
  }, [chapterId])

  const handlePalaceComplete = (newPalace: { name: string; places: string[] }) => {
    setPalace(newPalace)
    savePalace(newPalace)
    setPhase('walkthrough')
  }

  const handleWalkThroughComplete = () => {
    setPhase('blank')
  }

  const handleBlankComplete = () => {
    setPhase('recall')
  }

  const handleNumberConversionComplete = (words: Record<number, string>) => {
    setUserWords(words)
    localStorage.setItem('number-conversion-words', JSON.stringify(words))
    setPhase('blank')
  }

  const handleLinkMethodComplete = (links: Record<number, any>) => {
    localStorage.setItem('link-method-links', JSON.stringify(links))
    setPhase('blank')
  }

  const handleStoryMethodComplete = (order: Array<{ id: string; content: string }>) => {
    localStorage.setItem('story-method-order', JSON.stringify(order))
    setPhase('blank')
  }

  const handlePalaceFinalComplete = () => {
    // 第五章の記憶の宮殿統合が完了したら、空白時間へ
    setPhase('blank')
  }

  const handleRecallSubmit = (answers: Array<{ itemId: string; answer: string }>) => {
    // 結果をローカルストレージに保存
    localStorage.setItem('training-answers', JSON.stringify(answers))
    localStorage.setItem('training-palace', JSON.stringify(palace))

    // 結果画面へ遷移
    router.push('/result')
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-primary">セッションが見つかりません</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-8">
      {/* ヘッダー */}
      <div className="max-w-md mx-auto w-full mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-sans text-text-secondary text-sm hover:text-accent transition-colors"
          >
            ← 戻る
          </Link>
          <p className="font-sans text-text-secondary text-sm">
            セッション {sessionNumber}
          </p>
        </div>
      </div>

      {phase === 'setup' && (
        <PalaceSetup onComplete={handlePalaceComplete} />
      )}

      {phase === 'walkthrough' && palace && (
        <WalkThrough
          items={session.trainingData}
          places={palace.places}
          onComplete={handleWalkThroughComplete}
        />
      )}

      {phase === 'blank' && (
        <BlankTime duration={30} onComplete={handleBlankComplete} />
      )}

      {phase === 'number-conversion' && session && (
        <NumberConversion
          numbers={session.trainingData.map(item => item.content)}
          onComplete={handleNumberConversionComplete}
        />
      )}

      {phase === 'link-method' && session && (
        <LinkMethod
          items={session.trainingData}
          onComplete={handleLinkMethodComplete}
        />
      )}

      {phase === 'story-method' && session && (
        <StoryMethod
          items={session.trainingData}
          onComplete={handleStoryMethodComplete}
        />
      )}

      {phase === 'palace-final' && palace && (
        <WalkThrough
          items={session.trainingData}
          places={palace.places}
          onComplete={handlePalaceFinalComplete}
        />
      )}

      {phase === 'recall' && palace && (
        <RecallInput
          items={session.trainingData}
          places={palace.places}
          onSubmit={handleRecallSubmit}
        />
      )}
    </main>
  )
}

import Link from 'next/link'
