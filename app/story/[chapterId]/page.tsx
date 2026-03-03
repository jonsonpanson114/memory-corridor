'use client'

import { use, useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getSession } from '@/lib/story-data'
import TextReveal from '@/components/story/TextReveal'
import ChoiceButton from '@/components/story/ChoiceButton'
import CandleAmbient from '@/components/story/CandleAmbient'

interface GeneratedStory {
  storyText: string
  miraResponse: string
  nextHint: string
}

function StoryPageContent({
  params,
}: {
  params: Promise<{ chapterId: string }>
}) {
  const { chapterId } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()

  const sessionNumber = parseInt(searchParams.get('session') || '1')
  const session = getSession(chapterId, sessionNumber)
  const [showChoices, setShowChoices] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [miraResponse, setMiraResponse] = useState<string | null>(null)

  // ユーザーの前回スコアを取得
  const lastScore = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('last-score') || 'null') : null

  // 選択肢を選んだときにGeminiからミラの反応を生成
  useEffect(() => {
    async function fetchMiraResponse() {
      if (!selectedChoice || loadingResponse) return

      setLoadingResponse(true)
      try {
        const response = await fetch('/api/generate-story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chapterId,
            sessionNumber,
            lastScore,
            userChoice: selectedChoice,
            memoryFragment: null,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setMiraResponse(data.miraResponse)
          // 次回予告を保存
          if (data.nextHint) {
            localStorage.setItem('next-hint', data.nextHint)
          }
        }
      } catch (error) {
        console.error('Failed to fetch mira response:', error)
      } finally {
        setLoadingResponse(false)
      }
    }

    fetchMiraResponse()
  }, [selectedChoice, chapterId, sessionNumber, lastScore, loadingResponse])

  // 選択肢をクリックしたとき
  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId)
    // 選択した選択肢を保存
    localStorage.setItem('selected-choice', choiceId)
  }

  // トレーニングへ進むとき
  const handleProceedToTraining = () => {
    localStorage.setItem('current-chapter', chapterId)
    localStorage.setItem('current-session', sessionNumber.toString())
    router.push('/training')
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-primary">章が見つかりません</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-8">
      <CandleAmbient />

      <div className="flex-1 max-w-2xl mx-auto w-full">
        {/* 章タイトル */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl md:text-3xl text-accent mb-2">
            {chapterId === 'chapter1' && '第一章「館の扉」'}
            {chapterId === 'chapter2' && '第二章「時計塔の秘密」'}
            {chapterId === 'chapter3' && '第三章「霧の図書館」'}
            {chapterId === 'chapter4' && '第四章「廃墟の庭園」'}
            {chapterId === 'chapter5' && '第五章「鏡の回廊」'}
          </h1>
          <p className="font-sans text-text-secondary text-sm">
            セッション {sessionNumber}
          </p>
        </div>

        {/* 物語テキスト */}
        <div className="mb-8 min-h-[400px]">
          <TextReveal
            text={session.storyText}
            speed={150}
            onComplete={() => setShowChoices(true)}
          />
        </div>

        {/* 選択肢 */}
        {showChoices && !selectedChoice && session.choices && (
          <div className="space-y-2">
            {session.choices.map((choice, index) => (
              <ChoiceButton
                key={choice.id}
                text={choice.text}
                onClick={() => handleChoiceSelect(choice.id)}
                delay={index * 0.2}
              />
            ))}
          </div>
        )}

        {/* ミラの反応 */}
        {selectedChoice && miraResponse && (
          <div className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded">
            <p className="font-serif text-text-primary leading-relaxed">
              **ミラ：**
            </p>
            <p className="font-serif text-text-primary leading-relaxed mt-2">
              {miraResponse}
            </p>
          </div>
        )}

        {/* ローディング */}
        {selectedChoice && loadingResponse && (
          <div className="mt-8 text-center">
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-12 h-12 bg-accent/20 rounded-full mx-auto"
            />
          </div>
        )}

        {/* 選択後の遷移ボタン */}
        {selectedChoice && miraResponse && (
          <div className="mt-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <button
                onClick={handleProceedToTraining}
                className="btn-primary font-serif text-lg"
              >
                記憶術へ進む
              </button>
              <p className="font-sans text-text-secondary text-sm mt-4">
                自分の場所——記憶の宮殿を準備してください
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function StoryPage({
  params,
}: {
  params: Promise<{ chapterId: string }>
}) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-text-primary">読み込み中...</p></div>}>
      <StoryPageContent params={params} />
    </Suspense>
  )
}
