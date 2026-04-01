'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PalaceSetup from '@/components/training/PalaceSetup'
import WalkThrough from '@/components/training/WalkThrough'
import BlankTime from '@/components/training/BlankTime'
import RecallInput from '@/components/training/RecallInput'
import NumberConversion from '@/components/training/NumberConversion'
import LinkMethod from '@/components/training/LinkMethod'
import StoryMethod from '@/components/training/StoryMethod'
import MethodExplanation from '@/components/training/MethodExplanation'
import { getSession } from '@/lib/story-data'
import { getPalace, savePalace, getProgress, saveProgress } from '@/lib/user-progress'
import { useRouter } from 'next/navigation'

type TrainingPhase = 'setup' | 'explanation' | 'walkthrough' | 'blank' | 'recall' | 'number-conversion' | 'link-method' | 'story-method' | 'palace-final'

function TrainingPageContent() {
  const searchParams = useSearchParams()
  const progress = getProgress()
  const chapterId = searchParams.get('chapter') || progress.currentChapter || 'chapter1'
  const sessionNumber = parseInt(
    searchParams.get('session') || String(progress.currentSession || 1)
  )

  const session = getSession(chapterId, sessionNumber)
  const [phase, setPhase] = useState<TrainingPhase>('setup')
  const [palace, setPalace] = useState<{ name: string; places: string[] } | null>(null)
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)
  const router = useRouter()

  // 初期化とマウント状態の管理
  useEffect(() => {
    setHasMounted(true)
    const existingPalace = getPalace()
    if (existingPalace) {
      setPalace(existingPalace)
    }

    if (!session) {
      setLoadingItems(false)
      return
    }

    // トレーニングアイテムの動的取得
    async function fetchDynamicItems() {
      try {
        const mainType = session?.trainingData[0]?.type || 'place'
        
        const response = await fetch('/api/generate-training', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chapterId,
            sessionNumber,
            type: mainType,
            count: session?.trainingData.length || 5
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setTrainingData(data)
            localStorage.setItem('training-items', JSON.stringify(data))
          } else {
            const fallback = session?.trainingData || []
            setTrainingData(fallback)
            localStorage.setItem('training-items', JSON.stringify(fallback))
          }
        } else {
          const fallback = session?.trainingData || []
          setTrainingData(fallback)
          localStorage.setItem('training-items', JSON.stringify(fallback))
        }
      } catch (error) {
        console.error('Failed to fetch dynamic training items:', error)
        const fallback = session?.trainingData || []
        setTrainingData(fallback)
        localStorage.setItem('training-items', JSON.stringify(fallback))
      } finally {
        setLoadingItems(false)
      }
    }

    fetchDynamicItems()

    // フェーズの決定ロジック
    if (!existingPalace) {
      setPhase('setup')
    } else {
      setPhase('explanation')
    }
  }, [chapterId, sessionNumber])

  // クライアントサイドでのみレンダリングを開始
  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // ヘルパー関数: 連想法(LinkMethod)の判定
  function hasLink(data: any[]) {
    return data.some(item => item.type === 'word')
  }

  // 記憶法のタイプを取得
  const getMethodType = () => {
    if (!session) return 'place'
    if (session.trainingData.some(item => item.type === 'number')) return 'number'
    if (session.trainingData.some(item => item.type === 'word')) return 'word'
    if (session.trainingData.some(item => item.type === 'story')) return 'story'
    return 'place'
  }

  const handlePalaceComplete = (newPalace: { name: string; places: string[] }) => {
    setPalace(newPalace)
    savePalace(newPalace)
    setPhase('explanation')
  }

  const handleExplanationComplete = () => {
    const targetSession = session
    if (!targetSession) return

    const method = getMethodType()
    const isClimax = sessionNumber === 5

    if (method === 'number' && !isClimax) {
      setPhase('number-conversion')
    } else if (method === 'word' || (chapterId === 'chapter3' && method !== 'number')) {
      setPhase('link-method')
    } else if (method === 'story') {
      setPhase('story-method')
    } else {
      setPhase('walkthrough')
    }
  }

  const handleWalkThroughComplete = () => {
    setPhase('blank')
  }

  const handleBlankComplete = () => {
    setPhase('recall')
  }

  const handleNumberConversionComplete = () => {
    setPhase('blank')
  }

  const handleLinkMethodComplete = () => {
    setPhase('blank')
  }

  const handleStoryMethodComplete = (order: Array<{ id: string; content: string }>) => {
    localStorage.setItem('story-method-order', JSON.stringify(order))
    setPhase('blank')
  }

  const handlePalaceFinalComplete = () => {
    setPhase('blank')
  }

  const handleRecallSubmit = (answers: Array<{ itemId: string; answer: string }>) => {
    localStorage.setItem('training-answers', JSON.stringify(answers))
    localStorage.setItem('training-palace', JSON.stringify(palace))
    router.push('/result')
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-primary">セッションが見つかりません</p>
      </div>
    )
  }

  const methodType = getMethodType()

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

      {loadingItems ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-serif text-accent animate-pulse">新しい訓練課題を生成中...</p>
        </div>
      ) : (
        <>
          {phase === 'setup' && (
            <PalaceSetup onComplete={handlePalaceComplete} />
          )}

          {phase === 'explanation' && (
            <MethodExplanation 
              type={methodType as any} 
              onComplete={handleExplanationComplete} 
            />
          )}

          {phase === 'walkthrough' && palace && (
            <WalkThrough
              items={trainingData}
              places={palace.places}
              onComplete={handleWalkThroughComplete}
            />
          )}

          {phase === 'blank' && (
            <BlankTime duration={30} onComplete={handleBlankComplete} />
          )}

          {phase === 'number-conversion' && session && (
            <NumberConversion
              numbers={trainingData.map(item => item.content)}
              onComplete={handleNumberConversionComplete}
            />
          )}

          {phase === 'link-method' && session && (
            <LinkMethod
              items={trainingData}
              onComplete={handleLinkMethodComplete}
            />
          )}

          {phase === 'story-method' && session && (
            <StoryMethod
              items={trainingData}
              onComplete={handleStoryMethodComplete}
            />
          )}

          {phase === 'palace-final' && palace && (
            <WalkThrough
              items={trainingData}
              places={palace.places}
              onComplete={handlePalaceFinalComplete}
            />
          )}

          {phase === 'recall' && palace && (
            <RecallInput
              items={trainingData}
              places={palace.places}
              mode={methodType === 'word' || methodType === 'story' ? 'list' : 'place'}
              onSubmit={handleRecallSubmit}
            />
          )}
        </>
      )}
    </main>
  )
}

export default function TrainingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-text-primary">読み込み中...</p></div>}>
      <TrainingPageContent />
    </Suspense>
  )
}
